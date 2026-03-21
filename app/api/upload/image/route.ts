import { connectDB } from "@/lib/mongodb";
import Upload from "@/models/Upload";
import { mkdir, writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";
import sharp from "sharp";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ message: "Image file is required" }, { status: 400 });
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ message: "Only image files are allowed" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    let normalizedBuffer;
    try {
      normalizedBuffer = await sharp(buffer).rotate().webp({ quality: 92 }).toBuffer();
    } catch (sharpError) {
      console.error("Image processing error:", sharpError);
      return NextResponse.json({ message: "Failed to process image" }, { status: 400 });
    }

    const dirPath = path.join(process.cwd(), "public", "assets", "uploads");

    try {
      await mkdir(dirPath, { recursive: true });
    } catch (mkdirError) {
      console.error("Directory creation error:", mkdirError);
      return NextResponse.json({ message: "Failed to create upload directory" }, { status: 500 });
    }

    const sanitizedName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const timestamp = Date.now();
    const baseName = sanitizedName.replace(/\.[a-zA-Z0-9]+$/, "");
    const fileName = `${timestamp}-${baseName}.webp`;
    const filePath = path.join(dirPath, fileName);

    try {
      await writeFile(filePath, normalizedBuffer);
    } catch (writeError) {
      console.error("File write error:", writeError);
      return NextResponse.json({ message: "Failed to write file to disk" }, { status: 500 });
    }

    // Save a copy into MongoDB for rebuild/CDN restores
    try {
      await connectDB();
      await Upload.findOneAndUpdate(
        { filename: fileName },
        { filename: fileName, originalName: file.name, contentType: "image/webp", data: normalizedBuffer },
        { upsert: true }
      );
    } catch (dbError) {
      console.error("Database save error:", dbError);
      // Don't fail upload if DB save fails; file is still available on disk
    }

    return NextResponse.json({ url: `/api/uploads/${fileName}` });
  } catch (error) {
    console.error("Image upload error:", error);
    return NextResponse.json({ message: "Unable to upload image" }, { status: 500 });
  }
}
