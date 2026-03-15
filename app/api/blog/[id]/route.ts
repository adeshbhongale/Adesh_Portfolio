import { isRequestFromAdmin } from "@/lib/admin";
import { connectDB, isMongoConfigured } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { NextResponse } from "next/server";
import { z } from "zod";

const blogSchema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2),
  content: z.string().min(10),
  excerpt: z.string().min(10),
  coverImage: z.string().min(1),
  tags: z.array(z.string()).default([]),
  publishedAt: z.string().optional()
});

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  if (!isRequestFromAdmin(request)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  if (!isMongoConfigured()) {
    return NextResponse.json({ message: "Database is not configured" }, { status: 500 });
  }

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
    const updated = await Blog.findByIdAndUpdate(params.id, payload, { new: true });
    if (!updated) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ message: "Unable to update blog" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  if (!isRequestFromAdmin(request)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  if (!isMongoConfigured()) {
    return NextResponse.json({ message: "Database is not configured" }, { status: 500 });
  }

  try {
    await connectDB();
    const deleted = await Blog.findByIdAndDelete(params.id);
    if (!deleted) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Blog deleted" });
  } catch {
    return NextResponse.json({ message: "Unable to delete blog" }, { status: 500 });
  }
}
