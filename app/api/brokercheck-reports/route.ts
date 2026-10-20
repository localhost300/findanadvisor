import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const reportSchema = z.object({
  crd: z.string().regex(/^\d{1,10}$/),
  message: z.string().trim().min(10).max(2000),
  email: z.string().trim().email().max(254).or(z.literal("")),
  website: z.string().max(0),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid report data." }, { status: 400 });
  }

  const parsed = reportSchema.safeParse(body);
  if (!parsed.success)
    return NextResponse.json(
      { error: "Enter a CRD number and at least 10 characters of correction details." },
      { status: 400 },
    );

  const supabase = await createClient();
  if (!supabase)
    return NextResponse.json(
      { error: "The correction service is not configured. Please try again later." },
      { status: 503 },
    );

  const { error } = await supabase.from("brokercheck_correction_reports").insert({
    crd_number: parsed.data.crd,
    message: parsed.data.message,
    reporter_email: parsed.data.email || null,
  });

  if (error) {
    console.error("Failed to save a BrokerCheck correction report:", error);
    return NextResponse.json(
      { error: "We could not save your report. Please try again later." },
      { status: 500 },
    );
  }

  return NextResponse.json({ submitted: true }, { status: 201 });
}
