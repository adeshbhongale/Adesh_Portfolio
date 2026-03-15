import { isRequestFromAdmin } from "@/lib/admin";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

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
    await connectDB();
    const slugs = await Blog.find({}, { slug: 1 }).lean<{ slug: string }[]>();
    slugs.forEach((item) => revalidatePath(`/blog/${item.slug}`));

    return NextResponse.json({ message: "Cache revalidated. Refresh pages to see updates." }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ message: "Unable to revalidate cache" }, { status: 500 });
  }
}
