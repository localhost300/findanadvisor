"use client";

import { useState } from "react";
import { Send } from "lucide-react";

const issueOptions = [
  ["inaccurate", "Inaccurate information"],
  ["outdated", "Outdated information"],
  ["registration", "Registration or licensing concern"],
  ["conduct", "Professional conduct concern"],
  ["other", "Other"],
] as const;

export function AdvisorReportForm() {
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState("");
  const [submitted, setSubmitted] = useState(false);

  async function submitReport(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setNotice("");
    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("/api/advisor-verification-reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          profile: data.get("profile"),
          issue: data.get("issue"),
          details: data.get("details"),
          email: data.get("email"),
          website: data.get("website"),
        }),
      });
      const result = (await response.json()) as { error?: string };
      if (!response.ok) {
        setNotice(
          result.error ||
            "We could not submit your report. Please try again later.",
        );
        return;
      }
      form.reset();
      setSubmitted(true);
      setNotice("Thank you. Your report has been submitted for review.");
    } catch {
      setNotice("We could not reach the report service. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="verification-report-form" onSubmit={submitReport}>
      <label>
        Advisor name or profile URL <span aria-hidden="true">*</span>
        <input
          className="field"
          name="profile"
          required
          minLength={2}
          maxLength={300}
          placeholder="Name or link to the profile"
        />
      </label>
      <label>
        What would you like to report? <span aria-hidden="true">*</span>
        <select className="field" name="issue" required defaultValue="">
          <option value="" disabled>Select an issue</option>
          {issueOptions.map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </label>
      <label>
        Details <span aria-hidden="true">*</span>
        <textarea
          className="field"
          name="details"
          rows={5}
          required
          minLength={10}
          maxLength={3000}
          placeholder="Share what you believe needs attention"
        />
      </label>
      <label>
        Your email <span className="muted">(optional)</span>
        <input
          className="field"
          type="email"
          name="email"
          autoComplete="email"
          maxLength={254}
          placeholder="you@example.com"
        />
      </label>
      <label className="brokercheck-honeypot" aria-hidden="true">
        Website
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <button
        className="btn btn-primary"
        type="submit"
        disabled={submitting || submitted}
      >
        <Send size={16} />
        {submitting ? "Submitting…" : submitted ? "Report submitted" : "Submit report"}
      </button>
      <span className="verification-report-status" role="status" aria-live="polite">
        {notice}
      </span>
    </form>
  );
}
