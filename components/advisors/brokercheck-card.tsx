"use client";

import { useState } from "react";
import Link from "next/link";
import { AlertTriangle, ExternalLink, MapPin, ShieldCheck } from "lucide-react";
import {
  brokerCheckUrl,
  brokerCheckRetrievedAt,
  type BrokerCheckRecord,
} from "@/lib/brokercheck-data";

export function BrokerCheckCard({ record }: { record: BrokerCheckRecord }) {
  const [reportOpen, setReportOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [notice, setNotice] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const currentlyRegistered = record.registrations.length > 0;

  async function submitReport(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setNotice("");
    const formData = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/brokercheck-reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          crd: record.crd,
          message,
          email,
          website: String(formData.get("website") ?? ""),
        }),
      });
      const result = (await response.json()) as { error?: string };
      if (!response.ok) {
        setNotice(result.error || "We could not submit your report. Please try again.");
        return;
      }
      setMessage("");
      setEmail("");
      setNotice("Thank you. Your correction report has been submitted for review.");
    } catch {
      setNotice("We could not reach the report service. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <article className="card brokercheck-card">
      <div className="brokercheck-card-top">
        <div className="brokercheck-avatar" aria-hidden="true">
          {record.name.split(/\s+/).slice(0, 2).map((part) => part[0]).join("")}
        </div>
        <div className="brokercheck-person">
          <h2><Link href={`/brokers/${record.crd}`}>{record.name}</Link></h2>
          <span className={`brokercheck-status${currentlyRegistered ? " is-active" : ""}`}>
            <span aria-hidden="true" />
            {currentlyRegistered ? record.registrations.join(" · ") : "Not currently registered"}
          </span>
        </div>
      </div>
      <div className="brokercheck-record-details">
        <div>
          <span>Current firm</span>
          <strong>{record.firm || "Not listed as currently registered"}</strong>
        </div>
        <div>
          <span>Office location</span>
          <strong className="brokercheck-location">
            {record.city && record.state ? (
              <><MapPin size={14} /> {record.city}, {record.state}</>
            ) : "Not listed"}
          </strong>
        </div>
        <div>
          <span>Years of experience</span>
          <strong>{record.experience ? `${record.experience}${record.experience === "<1" ? " year" : " years"}` : "See source record"}</strong>
        </div>
        <div>
          <span>Disclosure indicator</span>
          <strong>
            {record.disclosures === "none-reported"
              ? "None shown in BrokerCheck summary"
              : "Review the linked source record for details"}
          </strong>
        </div>
      </div>
      <div className="brokercheck-card-footer">
        <span>CRD {record.crd} · Checked {brokerCheckRetrievedAt}</span>
        <div className="brokercheck-actions">
          <Link
            className="brokercheck-source-link"
            href={`/brokers/${record.crd}`}
          >
            View profile
          </Link>
          <a
            className="brokercheck-source-link"
            href={brokerCheckUrl(record.crd)}
            target="_blank"
            rel="noreferrer"
          >
            View BrokerCheck <ExternalLink size={14} />
          </a>
          <button
            className="brokercheck-report-button"
            type="button"
            aria-expanded={reportOpen}
            onClick={() => setReportOpen((open) => !open)}
          >
            <AlertTriangle size={14} /> Report an issue
          </button>
        </div>
      </div>
      {reportOpen && (
        <form className="brokercheck-report-form" onSubmit={submitReport}>
          <p>
            Tell us what appears incorrect or out of date. For an error in
            FINRA&apos;s source record, please also notify FINRA through the
            linked BrokerCheck profile.
          </p>
          <label>
            Correction details
            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              required
              minLength={10}
              maxLength={2000}
              rows={3}
              placeholder="Describe the information that needs review"
            />
          </label>
          <label>
            Email for follow-up (optional)
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              maxLength={254}
              placeholder="you@example.com"
            />
          </label>
          <label className="brokercheck-honeypot" aria-hidden="true">
            Website
            <input
              name="website"
              tabIndex={-1}
              autoComplete="off"
            />
          </label>
          <div className="brokercheck-report-actions">
            <button className="btn btn-primary" type="submit" disabled={submitting}>
              {submitting ? "Submitting…" : "Send report"}
            </button>
            <span role="status" aria-live="polite">{notice}</span>
          </div>
        </form>
      )}
      <a
        className="brokercheck-card-verify"
        href="https://brokercheck.finra.org/"
        target="_blank"
        rel="noreferrer"
      >
        <ShieldCheck size={14} /> Verify current details with FINRA
      </a>
    </article>
  );
}
