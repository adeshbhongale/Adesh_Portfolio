import { isRequestFromAdmin } from "@/lib/admin";
import { getSiteContent } from "@/lib/content";
import { connectDB, isMongoConfigured } from "@/lib/mongodb";
import SiteContent from "@/models/SiteContent";
import { NextResponse } from "next/server";
import { z } from "zod";

export const dynamic = "force-dynamic";

const contentSchema = z.object({
  about: z.object({
    headline: z.string().min(1),
    subheadline: z.string().min(1),
    description: z.string().min(1),
    cvUrl: z.string().min(1),
    image: z.string().min(1)
  }),
  skills: z.array(
    z.object({
      title: z.string().min(1),
      skills: z.array(
        z.object({
          name: z.string().min(1),
          logo: z.string().min(1)
        })
      )
    })
  )
});

export async function GET() {
  const content = await getSiteContent();
  return NextResponse.json(content, {
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
    const parsed = contentSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ message: "Invalid payload", errors: parsed.error.flatten() }, { status: 400 });
    }

    await connectDB();
    const payload = { ...parsed.data, updatedAt: new Date() };
    await SiteContent.findOneAndUpdate({}, payload, { upsert: true });
    return NextResponse.json({ message: "Content updated successfully" });
  } catch {
    return NextResponse.json({ message: "Unable to update content" }, { status: 500 });
  }
}
