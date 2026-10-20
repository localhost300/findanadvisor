"use client";

import { useState } from "react";
import { Mail, Send } from "lucide-react";

type BrokerContactFormProps = {
  crd: string;
  brokerName: string;
  enabled: boolean;
};

export function BrokerContactForm({
  crd,
  brokerName,
  enabled,
}: BrokerContactFormProps) {
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState("");
  const [sent, setSent] = useState(false);

  async function submitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setNotice("");
    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/broker-contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          crd,
          fullName: formData.get("fullName"),
          email: formData.get("email"),
          location: formData.get("location"),
          phone: formData.get("phone"),
          subject: formData.get("subject"),
          message: formData.get("message"),
          website: formData.get("website"),
        }),
      });
      const result = (await response.json()) as { error?: string };
      if (!response.ok) {
        setNotice(result.error || "We could not send your message. Please try again.");
        return;
      }
      form.reset();
      setSent(true);
      setNotice(`Your message has been sent to ${brokerName}.`);
    } catch {
      setNotice("We could not reach the contact service. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="broker-contact-form" onSubmit={submitForm}>
      <fieldset disabled={!enabled || submitting || sent}>
      <label>
        Full name
        <input
          className="field"
          name="fullName"
          autoComplete="name"
          minLength={2}
          maxLength={120}
          required
        />
      </label>
      <label>
        Email address
        <input
          className="field"
          type="email"
          name="email"
          autoComplete="email"
          maxLength={254}
          required
        />
      </label>
      <label>
        Location
        <input
          className="field"
          name="location"
          autoComplete="address-level2"
          maxLength={120}
          placeholder="City, state or country"
          required
        />
      </label>
      <label>
        Phone <span className="muted">(optional)</span>
        <input
          className="field"
          type="tel"
          name="phone"
          autoComplete="tel"
          maxLength={40}
        />
      </label>
      <label>
        Subject
        <input
          className="field"
          name="subject"
          minLength={3}
          maxLength={160}
          required
        />
      </label>
      <label>
        Message
        <textarea
          className="field"
          name="message"
          rows={5}
          minLength={10}
          maxLength={4000}
          required
        />
      </label>
      <label className="brokercheck-honeypot" aria-hidden="true">
        Website
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      </fieldset>
      <button
        className="btn btn-primary"
        type="submit"
        disabled={!enabled || submitting || sent}
      >
        {sent ? <Mail size={16} /> : <Send size={16} />}
        {submitting ? "Sending…" : sent ? "Message sent" : "Send message"}
      </button>
      <span className="broker-contact-status" role="status" aria-live="polite">
        {notice}
      </span>
    </form>
  );
}
