import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

const contactSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  subject: z.string().min(3),
  message: z.string().min(5)
});

const requestMap = new Map<string, { count: number; ts: number }>();
const WINDOW_MS = 60 * 1000;
const MAX_COUNT = 5;

const getClientId = (request: Request) => request.headers.get("x-forwarded-for") || "unknown";

const isRateLimited = (clientId: string) => {
  const now = Date.now();
  const value = requestMap.get(clientId);
  if (!value || now - value.ts > WINDOW_MS) {
    requestMap.set(clientId, { count: 1, ts: now });
    return false;
  }
  if (value.count >= MAX_COUNT) {
    return true;
  }
  requestMap.set(clientId, { count: value.count + 1, ts: value.ts });
  return false;
};

export async function POST(request: Request) {
  const clientId = getClientId(request);
  if (isRateLimited(clientId)) {
    return NextResponse.json({ message: "Too many requests" }, { status: 429 });
  }

  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ message: "Invalid payload", errors: parsed.error.flatten() }, { status: 400 });
    }

    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(process.env.SMTP_PORT || "587");
    const toEmail = process.env.ADMIN_EMAIL_1;

    if (!smtpUser || !smtpPass || !smtpHost || !toEmail) {
      return NextResponse.json({ message: "Mail service not configured" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: { user: smtpUser, pass: smtpPass }
    });

    await transporter.sendMail({
      from: smtpUser,
      to: toEmail,
      subject: `[Portfolio Contact] ${parsed.data.subject}`,
      text: `From: ${parsed.data.name} (${parsed.data.email})\n\n${parsed.data.message}`
    });

    return NextResponse.json({ message: "Message sent" });
  } catch {
    return NextResponse.json({ message: "Unable to send message" }, { status: 500 });
  }
}
