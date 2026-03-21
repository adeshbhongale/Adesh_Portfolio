import { connectDB } from "@/lib/mongodb";
import Upload from "@/models/Upload";
import { readFile } from "fs/promises";
import path from "path";
import sharp from "sharp";

const getContentType = (fileName: string) => {
  const lower = fileName.toLowerCase();
  if (lower.endsWith(".pdf")) return "application/pdf";
  if (lower.endsWith(".webp")) return "image/webp";
  if (lower.endsWith(".png")) return "image/png";
  if (lower.endsWith(".jpg") || lower.endsWith(".jpeg")) return "image/jpeg";
  if (lower.endsWith(".gif")) return "image/gif";
  if (lower.endsWith(".svg")) return "image/svg+xml";
  return "application/octet-stream";
};

const getFallbackBuffer = async () => {
  const fallbackPath = path.join(process.cwd(), "public", "assets", "Adesh.png");
  return readFile(fallbackPath);
};

export async function GET(_request: Request, { params }: { params: { name: string } }) {
  const rawName = decodeURIComponent(params.name || "").trim();
  if (!rawName || !/^[a-zA-Z0-9._-]+$/.test(rawName)) {
    const fallbackBuffer = await getFallbackBuffer();
    return new Response(fallbackBuffer, { headers: { "Content-Type": "image/png", "Cache-Control": "no-store" } });
  }

  const filePath = path.join(process.cwd(), "public", "assets", "uploads", rawName);
  try {
    const buffer = await readFile(filePath);
    if (!rawName.toLowerCase().endsWith(".pdf")) {
      await sharp(buffer).metadata();
    }
    return new Response(buffer, {
      headers: {
        "Content-Type": getContentType(rawName),
        "Cache-Control": "public, max-age=31536000, immutable"
      }
    });
  } catch {
    // If file not on disk, try MongoDB
    try {
      await connectDB();
      const uploadRecord = await Upload.findOne({ filename: rawName });
      if (uploadRecord && uploadRecord.data) {
        return new Response(uploadRecord.data, {
          headers: {
            "Content-Type": getContentType(rawName),
            "Cache-Control": "public, max-age=31536000, immutable"
          }
        });
      }
    } catch (dbError) {
      console.error("MongoDB fetch error:", dbError);
    }

    // Fallback for images only
    if (rawName.toLowerCase().endsWith(".pdf")) {
      return new Response("PDF not found", { status: 404 });
    }

    const fallbackBuffer = await getFallbackBuffer();
    return new Response(fallbackBuffer, { headers: { "Content-Type": "image/png", "Cache-Control": "no-store" } });
  }
}
