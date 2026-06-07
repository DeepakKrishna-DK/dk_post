import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Log the contact (in production, integrate with Resend/SendGrid/Formspree)
    console.log("Contact form submission:", { name, email, subject, message });

    // To integrate with a real email service, replace below with your provider:
    // await resend.emails.send({ from: "noreply@deepakps.dev", to: "deepakkrishnark@gmail.com", subject, html: `...` });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
