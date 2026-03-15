import { NextResponse } from "next/server";
import { z } from "zod";
import { getBlogs } from "@/lib/content";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";

const blogSchema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2),
  content: z.string().min(10),
  excerpt: z.string().min(10),
  coverImage: z.string().url(),
  tags: z.array(z.string()).default([]),
  publishedAt: z.string().optional()
});

export async function GET() {
  const data = await getBlogs();
  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "s-maxage=31536000, stale-while-revalidate=86400"
    }
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = blogSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ message: "Invalid payload", errors: parsed.error.flatten() }, { status: 400 });
    }

    await connectDB();
    const payload = {
      ...parsed.data,
      publishedAt: parsed.data.publishedAt ? new Date(parsed.data.publishedAt) : new Date()
    };
    const created = await Blog.create(payload);
    return NextResponse.json(created, { status: 201 });
  } catch {
    return NextResponse.json({ message: "Unable to create blog" }, { status: 500 });
  }
}
