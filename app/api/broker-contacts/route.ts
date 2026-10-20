import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";
import {
  brokerCheckRecords,
  brokerCheckUrl,
} from "@/lib/brokercheck-data";
import { getBrokerContactRecipient } from "@/lib/broker-contact";

const contactSchema = z.object({
  crd: z.string().regex(/^\d{1,10}$/),
  fullName: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  location: z.string().trim().min(2).max(120),
  phone: z.string().trim().max(40),
  subject: z
    .string()
    .trim()
    .min(3)
    .max(160)
    .refine((value) => !/[\r\n]/.test(value)),
  message: z.string().trim().min(10).max(4000),
  website: z.string().max(0),
});

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid contact form data." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success)
    return NextResponse.json(
      { error: "Please complete all required fields with valid information." },
      { status: 400 },
    );

  const record = brokerCheckRecords.find(
    (item) => item.crd === parsed.data.crd,
  );
  if (!record)
    return NextResponse.json({ error: "Broker record not found." }, { status: 404 });

  const { recipient, error: mappingError } = getBrokerContactRecipient(record.crd);
  if (mappingError) {
    console.error("Invalid BrokerCheck contact email configuration:", mappingError);
    return NextResponse.json(
      { error: "Direct contact is temporarily unavailable. Please try again later." },
      { status: 503 },
    );
  }
  if (!recipient)
    return NextResponse.json(
      { error: "Direct contact is not configured for this broker yet." },
      { status: 503 },
    );

  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const password = process.env.SMTP_PASSWORD;
  const port = Number(process.env.SMTP_PORT || 465);
  const secure =
    process.env.SMTP_SECURE === undefined
      ? port === 465
      : process.env.SMTP_SECURE === "true";
  if (
    !host ||
    !user ||
    !password ||
    !Number.isInteger(port) ||
    port < 1 ||
    port > 65535
  )
    return NextResponse.json(
      { error: "The email service is not configured. Please try again later." },
      { status: 503 },
    );

  const { fullName, email, location, phone, subject, message } = parsed.data;
  const lines = [
    `Name: ${fullName}`,
    `Email: ${email}`,
    `Location: ${location}`,
    `Phone: ${phone || "Not provided"}`,
    "",
    message,
    "",
    `Broker: ${record.name} (CRD ${record.crd})`,
    `BrokerCheck: ${brokerCheckUrl(record.crd)}`,
  ];

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass: password },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 20000,
    });
    await transporter.sendMail({
      from: { name: "Findanadvisor", address: user },
      to: recipient,
      replyTo: email,
      subject,
      text: lines.join("\n"),
      html: `<p>${escapeHtml(lines.join("\n")).replace(/\n/g, "<br>")}</p>`,
    });
  } catch (error) {
    const code =
      typeof error === "object" && error !== null && "code" in error
        ? String(error.code)
        : "unknown";
    console.error(`Broker contact SMTP delivery failed (${code}).`);
    return NextResponse.json(
      { error: "We could not send your message. Please try again later." },
      { status: 502 },
    );
  }

  return NextResponse.json({ sent: true }, { status: 201 });
}
