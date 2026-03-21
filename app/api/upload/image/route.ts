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
    const normalizedBuffer = await sharp(buffer).rotate().webp({ quality: 92 }).toBuffer();
    const dirPath = path.join(process.cwd(), "public", "assets", "uploads");
    await mkdir(dirPath, { recursive: true });
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const timestamp = Date.now();
    const baseName = sanitizedName.replace(/\.[a-zA-Z0-9]+$/, "");
    const fileName = `${timestamp}-${baseName}.webp`;
    const filePath = path.join(dirPath, fileName);
    await writeFile(filePath, normalizedBuffer);

    // Save a copy into MongoDB for rebuild/CDN restores
    try {
      await connectDB();
      await Upload.findOneAndUpdate(
        { filename: fileName },
        { filename: fileName, originalName: file.name, contentType: "image/webp", data: normalizedBuffer },
        { upsert: true }
      );
    } catch {
      // Don't fail upload if DB save fails; file is still available on disk
    }

    return NextResponse.json({ url: `/api/uploads/${fileName}` });
  } catch {
    return NextResponse.json({ message: "Unable to upload image" }, { status: 500 });
  }
}
