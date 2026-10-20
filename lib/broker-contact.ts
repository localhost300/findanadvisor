import { z } from "zod";
import { brokerCheckRecords } from "@/lib/brokercheck-data";

const recipientMapSchema = z.record(
  z.string().regex(/^\d{1,10}$/),
  z.string().email().max(254),
);

export function getBrokerContactRecipient(crd: string) {
  const raw = process.env.BROKERCHECK_CONTACT_EMAILS;
  if (!raw) return { recipient: null, error: null };

  let value: unknown;
  try {
    value = JSON.parse(raw);
  } catch {
    return { recipient: null, error: "BROKERCHECK_CONTACT_EMAILS is not valid JSON." };
  }

  const parsed = recipientMapSchema.safeParse(value);
  if (!parsed.success)
    return {
      recipient: null,
      error: "BROKERCHECK_CONTACT_EMAILS must map CRD numbers to valid email addresses.",
    };

  const knownCRDs = new Set(brokerCheckRecords.map((record) => record.crd));
  if (Object.keys(parsed.data).some((crd) => !knownCRDs.has(crd)))
    return {
      recipient: null,
      error: "BROKERCHECK_CONTACT_EMAILS contains an unknown CRD number.",
    };

  const recipients = Object.values(parsed.data).map((email) =>
    email.toLowerCase(),
  );
  if (new Set(recipients).size !== recipients.length)
    return {
      recipient: null,
      error: "Each broker must have a unique contact email address.",
    };

  return { recipient: parsed.data[crd] ?? null, error: null };
}
