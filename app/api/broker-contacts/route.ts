import { NextResponse } from "next/server";
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

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !from)
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

  let response: Response;
  try {
    response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [recipient],
        reply_to: email,
        subject: subject,
        text: lines.join("\n"),
        html: `<p>${escapeHtml(lines.join("\n")).replace(/\n/g, "<br>")}</p>`,
      }),
    });
  } catch (error) {
    console.error("Broker contact email delivery failed:", error);
    return NextResponse.json(
      { error: "We could not send your message. Please try again later." },
      { status: 502 },
    );
  }

  if (!response.ok) {
    console.error("Email provider rejected broker contact message:", response.status);
    return NextResponse.json(
      { error: "We could not send your message. Please try again later." },
      { status: 502 },
    );
  }

  return NextResponse.json({ sent: true }, { status: 201 });
}
