import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const reportSchema = z.object({
  profile: z.string().trim().min(2).max(300),
  issue: z.enum(["inaccurate", "outdated", "registration", "conduct", "other"]),
  details: z.string().trim().min(10).max(3000),
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
      { error: "Please complete the required fields and check the email address." },
      { status: 400 },
    );

  const supabase = await createClient();
  if (!supabase)
    return NextResponse.json(
      { error: "The report service is not configured. Please try again later." },
      { status: 503 },
    );

  const { error } = await supabase.from("advisor_verification_reports").insert({
    advisor_reference: parsed.data.profile,
    issue_type: parsed.data.issue,
    details: parsed.data.details,
    reporter_email: parsed.data.email || null,
  });

  if (error) {
    console.error("Failed to save an advisor verification report:", error);
    return NextResponse.json(
      { error: "We could not save your report. Please try again later." },
      { status: 500 },
    );
  }

  return NextResponse.json({ submitted: true }, { status: 201 });
}
