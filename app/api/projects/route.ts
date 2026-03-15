import { NextResponse } from "next/server";
import { z } from "zod";
import { getProjects } from "@/lib/content";
import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";

const projectSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(10),
  image: z.string().url(),
  github: z.string().url(),
  live: z.string().url(),
  techStack: z.array(z.string()).default([]),
  featured: z.boolean().default(false)
});

export async function GET() {
  const data = await getProjects();
  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "s-maxage=31536000, stale-while-revalidate=86400"
    }
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = projectSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ message: "Invalid payload", errors: parsed.error.flatten() }, { status: 400 });
    }

    await connectDB();
    const created = await Project.create(parsed.data);
    return NextResponse.json(created, { status: 201 });
  } catch {
    return NextResponse.json({ message: "Unable to create project" }, { status: 500 });
  }
}
