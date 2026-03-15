import { isRequestFromAdmin } from "@/lib/admin";
import { connectDB, isMongoConfigured } from "@/lib/mongodb";
import Project from "@/models/Project";
import { NextResponse } from "next/server";
import { z } from "zod";

const projectSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(10),
  image: z.string().min(1),
  github: z.string().url(),
  live: z.string().url(),
  techStack: z.array(z.string()).default([]),
  featured: z.boolean().default(false)
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
    const parsed = projectSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ message: "Invalid payload", errors: parsed.error.flatten() }, { status: 400 });
    }

    await connectDB();
    const updated = await Project.findByIdAndUpdate(params.id, parsed.data, { new: true });
    if (!updated) {
      return NextResponse.json({ message: "Project not found" }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ message: "Unable to update project" }, { status: 500 });
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
    const deleted = await Project.findByIdAndDelete(params.id);
    if (!deleted) {
      return NextResponse.json({ message: "Project not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Project deleted" });
  } catch {
    return NextResponse.json({ message: "Unable to delete project" }, { status: 500 });
  }
}
