import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

// More flexible schema that doesn't require subject
const contactSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  subject: z.string().min(1, "Subject is required").optional().default("Portfolio Contact"),
  message: z.string().min(10, "Message must be at least 10 characters")
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
    return NextResponse.json({ message: "Too many requests. Please try again later." }, { status: 429 });
  }

  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      const errors = parsed.error.flatten().fieldErrors;
      return NextResponse.json(
        {
          message: "Invalid form data",
          errors: errors
        },
        { status: 400 }
      );
    }

    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(process.env.SMTP_PORT || "587");
    const toEmail = process.env.ADMIN_EMAIL_1;

    // Check if email is properly configured (not placeholder text)
    const isEmailConfigured =
      smtpUser &&
      smtpPass &&
      !smtpPass.includes("your-") &&
      smtpHost &&
      toEmail;

    if (!isEmailConfigured) {
      // In development or if email not configured, log the submission to console
      if (process.env.NODE_ENV !== "production") {
        console.log("📧 [DEV MODE] Contact Form Submission:");
        console.log(JSON.stringify({
          name: parsed.data.name,
          email: parsed.data.email,
          subject: parsed.data.subject,
          message: parsed.data.message,
          receivedAt: new Date().toISOString()
        }, null, 2));
        
        return NextResponse.json({ 
          success: true,
          message: "Message received! (Development mode - check console)",
          isDevelopment: true
        }, { status: 200 });
      }

      console.error("❌ Email not configured in production!");
      return NextResponse.json(
        { 
          message: "Email service not configured. Please contact admin directly.",
        }, 
        { status: 503 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: { user: smtpUser, pass: smtpPass },
      connectionTimeout: 10000,
      socketTimeout: 10000
    });

    // Verify connection before sending
    try {
      await transporter.verify();
    } catch (verifyError) {
      console.error("❌ SMTP Authentication Failed:", verifyError);
      return NextResponse.json(
        { 
          message: "Email service authentication failed. Please check SMTP credentials.",
          isDevelopment: process.env.NODE_ENV !== "production"
        }, 
        { status: 503 }
      );
    }

    // Send email to admin
    await transporter.sendMail({
      from: smtpUser,
      to: toEmail,
      subject: `Contact: ${parsed.data.subject}`,
      html: `
        <h2>New Message Inquiry</h2>
        <p><strong>Name:</strong> ${parsed.data.name}</p>
        <p><strong>Email:</strong> ${parsed.data.email}</p>
        <p><strong>Subject:</strong> ${parsed.data.subject}</p>
        <hr />
        <h3>Message:</h3>
        <p>${parsed.data.message.replace(/\n/g, "<br />")}</p>
      `,
      replyTo: parsed.data.email
    });

    // Send confirmation email to user
    await transporter.sendMail({
      from: smtpUser,
      to: parsed.data.email,
      subject: "Thank you for contacting me - Adesh Bhongale",
      html: `
        <h2>Thank you, ${parsed.data.name}!</h2>
        <p>I received your message and will get back to you within 24 hours.</p>
        <hr />
        <h3>Your Message:</h3>
        <p><strong>Subject:</strong> ${parsed.data.subject}</p>
        <p>${parsed.data.message.replace(/\n/g, "<br />")}</p>
        <hr />
        <p>Best regards,<br /><strong>Adesh Bhongale</strong></p>
      `
    });

    return NextResponse.json({
      success: true,
      message: "Message sent successfully! I'll respond within 24 hours."
    }, { status: 200 });

  } catch (error) {
    console.error("❌ Contact API error:", error instanceof Error ? error.message : error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Validation error", errors: error.flatten() },
        { status: 400 }
      );
    }

    const isDev = process.env.NODE_ENV !== "production";
    return NextResponse.json(
      {
        message: isDev ? `Error: ${error instanceof Error ? error.message : "Unknown error"}` : "Unable to send message. Please try again later.",
        isDevelopment: isDev
      },
      { status: 500 }
    );
  }
}
