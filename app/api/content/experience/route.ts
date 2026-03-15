import { isRequestFromAdmin } from "@/lib/admin";
import { getSiteContent } from "@/lib/content";
import { aboutData, educationData, skillsInfo } from "@/lib/data";
import { connectDB, isMongoConfigured } from "@/lib/mongodb";
import SiteContent from "@/models/SiteContent";
import { NextResponse } from "next/server";
import { z } from "zod";

export const dynamic = "force-dynamic";

const experienceSchema = z.array(
  z.object({
    id: z.coerce.number(),
    img: z.string().trim().min(1),
    role: z.string().trim().min(1),
    company: z.string().trim().min(1),
    date: z.string().trim().min(1),
    desc: z.string().trim().min(1),
    skills: z.array(z.string().trim()).default([])
  })
);

export async function GET() {
  const content = await getSiteContent();
  return NextResponse.json(content.experiences || [], {
    headers: {
      "Cache-Control": "no-store, max-age=0"
    }
  });
}

export async function PUT(request: Request) {
  if (!isRequestFromAdmin(request)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  if (!isMongoConfigured()) {
    return NextResponse.json({ message: "Database is not configured" }, { status: 500 });
  }

  try {
    const body = await request.json();
    const parsed = experienceSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ message: "Invalid payload", errors: parsed.error.flatten() }, { status: 400 });
    }

    await connectDB();
    await SiteContent.findOneAndUpdate(
      {},
      {
        $set: { experiences: parsed.data, updatedAt: new Date() },
        $setOnInsert: { about: aboutData, skills: skillsInfo, educations: educationData }
      },
      { upsert: true, runValidators: true, setDefaultsOnInsert: true }
    );
    return NextResponse.json({ message: "Experiences updated successfully" });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to update experiences";
    return NextResponse.json({ message }, { status: 500 });
  }
}
