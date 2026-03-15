import { NextResponse } from "next/server";
import { z } from "zod";
import { isAllowedAdmin } from "@/lib/admin";

const loginSchema = z.object({
  email: z.string().email()
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ message: "Invalid email" }, { status: 400 });
    }

    const { email } = parsed.data;
    if (!isAllowedAdmin(email)) {
      return NextResponse.json({ message: "Access denied" }, { status: 403 });
    }

    const response = NextResponse.json({ message: "Login successful" });
    response.cookies.set("admin_session", email.toLowerCase(), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 8,
      path: "/"
    });
    return response;
  } catch {
    return NextResponse.json({ message: "Unable to login" }, { status: 500 });
  }
}
