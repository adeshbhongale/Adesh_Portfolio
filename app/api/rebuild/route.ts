import { isRequestFromAdmin } from "@/lib/admin";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import Upload from "@/models/Upload";
import { mkdir, writeFile } from "fs/promises";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import path from "path";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!isRequestFromAdmin(request)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    revalidatePath("/");
    revalidatePath("/projects");
    revalidatePath("/blog");
    revalidatePath("/about");
    revalidatePath("/contact");
    try {
      await connectDB();
      const slugs = await Blog.find({}, { slug: 1 }).lean<{ slug: string }[]>();
      slugs.forEach((item) => revalidatePath(`/blog/${item.slug}`));
      // restore images from DB into public assets so CDN/publish contains them
      try {
        const uploads = await Upload.find({}).lean<{ filename: string; data: Buffer }[]>();
        const dirPath = path.join(process.cwd(), "public", "assets", "uploads");
        await mkdir(dirPath, { recursive: true });
        for (const up of uploads) {
          try {
            const target = path.join(dirPath, up.filename);
            await writeFile(target, up.data as unknown as Buffer);
          } catch {
            // ignore individual write errors
          }
        }
      } catch {
        // ignore errors restoring uploads
      }
    } catch {
    }

    return NextResponse.json({ message: "Cache revalidated. Refresh pages to see updates." }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ message: "Unable to revalidate cache" }, { status: 500 });
  }
}
