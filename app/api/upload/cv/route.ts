import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

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
    await mkdir(dirPath, { recursive: true });
    const fileName = "latest-cv.pdf";
    const filePath = path.join(dirPath, fileName);
    await writeFile(filePath, buffer);

    return NextResponse.json({ url: `/assets/cv/${fileName}` });
  } catch {
    return NextResponse.json({ message: "Unable to upload PDF" }, { status: 500 });
  }
}
