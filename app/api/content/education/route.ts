import { isRequestFromAdmin } from "@/lib/admin";
import { getSiteContent } from "@/lib/content";
import { connectDB, isMongoConfigured } from "@/lib/mongodb";
import SiteContent from "@/models/SiteContent";
import { NextResponse } from "next/server";
import { z } from "zod";

const educationSchema = z.array(
  z.object({
    id: z.number(),
    img: z.string().min(1),
    school: z.string().min(1),
    date: z.string().min(1),
    grade: z.string().min(1),
    desc: z.string().min(1),
    degree: z.string().min(1)
  })
);

export async function GET() {
  const content = await getSiteContent();
  return NextResponse.json(content.educations || [], {
    headers: {
      "Cache-Control": "s-maxage=31536000, stale-while-revalidate=86400"
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
    const parsed = educationSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ message: "Invalid payload", errors: parsed.error.flatten() }, { status: 400 });
    }

    await connectDB();
    await SiteContent.findOneAndUpdate({}, { educations: parsed.data, updatedAt: new Date() }, { upsert: true });
    return NextResponse.json({ message: "Educations updated successfully" });
  } catch {
    return NextResponse.json({ message: "Unable to update educations" }, { status: 500 });
  }
}
