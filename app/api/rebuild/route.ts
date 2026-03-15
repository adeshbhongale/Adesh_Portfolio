import { NextResponse } from "next/server";
import { isRequestFromAdmin } from "@/lib/admin";

export async function POST(request: Request) {
  if (!isRequestFromAdmin(request)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const hook = process.env.VERCEL_DEPLOY_HOOK;
  if (!hook) {
    return NextResponse.json({ message: "VERCEL_DEPLOY_HOOK missing" }, { status: 400 });
  }

  try {
    const result = await fetch(hook, { method: "POST" });
    if (!result.ok) {
      return NextResponse.json({ message: "Failed to trigger deploy hook" }, { status: 500 });
    }

    return NextResponse.json({ message: "Deploy hook triggered" });
  } catch {
    return NextResponse.json({ message: "Unable to trigger rebuild" }, { status: 500 });
  }
}
