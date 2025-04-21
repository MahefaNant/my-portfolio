import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const body = await req.json();

  const { name, email, message, recaptchaToken  } = body;

  const recaptchaRes = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
    { method: "POST" }
  );

  const recaptchaJson = await recaptchaRes.json();

  if (!recaptchaJson.success) {
    return NextResponse.json({ error: "reCAPTCHA failed" }, { status: 400 });
  }

  try {
    const data = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "mahefanant@gmail.com",
      subject: `Nouveau message de ${name}`,
      replyTo: email,
      text: message,
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
