import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

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
    const dirPath = path.join(process.cwd(), "public", "assets", "uploads");
    await mkdir(dirPath, { recursive: true });
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const timestamp = Date.now();
    const fileName = `${timestamp}-${sanitizedName}`;
    const filePath = path.join(dirPath, fileName);
    await writeFile(filePath, buffer);

    return NextResponse.json({ url: `/assets/uploads/${fileName}` });
  } catch {
    return NextResponse.json({ message: "Unable to upload image" }, { status: 500 });
  }
}
