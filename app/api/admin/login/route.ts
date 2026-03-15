import { isAllowedAdmin, isPasswordValid } from "@/lib/admin";
import { NextResponse } from "next/server";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 400 });
    }

    const { email, password } = parsed.data;
    if (!isAllowedAdmin(email) || !isPasswordValid(password)) {
      return NextResponse.json({ message: "Access denied" }, { status: 403 });
    }

    const response = NextResponse.json({ message: "Login successful" });
    response.cookies.set("admin_session", email.trim().toLowerCase(), {
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
