import { connectDB } from "@/lib/mongodb";
import Upload from "@/models/Upload";
import { mkdir, writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ message: "PDF file is required" }, { status: 400 });
    }

    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      return NextResponse.json({ message: "Only PDF files are allowed" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const dirPath = path.join(process.cwd(), "public", "assets", "cv");

    try {
      await mkdir(dirPath, { recursive: true });
    } catch (mkdirError) {
      console.error("Directory creation error:", mkdirError);
    }

    const fileName = "latest-cv.pdf";
    const filePath = path.join(dirPath, fileName);

    try {
      await writeFile(filePath, buffer);
    } catch (writeError) {
      console.error("File write error:", writeError);
      // Don't fail if disk write fails; MongoDB is the backup
    }

    // Save PDF to MongoDB for production/rebuild
    try {
      await connectDB();
      await Upload.findOneAndUpdate(
        { filename: fileName },
        { filename: fileName, originalName: file.name, contentType: "application/pdf", data: buffer },
        { upsert: true }
      );
    } catch (dbError) {
      console.error("Database save error:", dbError);
      return NextResponse.json({ message: "Failed to save CV to database" }, { status: 500 });
    }

    return NextResponse.json({ url: `/api/uploads/${fileName}` });
  } catch (error) {
    console.error("CV upload error:", error);
    return NextResponse.json({ message: "Unable to upload PDF" }, { status: 500 });
  }
}
