import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, MapPin, ShieldCheck } from "lucide-react";
import { BrokerContactForm } from "@/components/advisors/broker-contact-form";
import { SiteShell } from "@/components/layout/site-shell";
import {
  brokerCheckRecords,
  brokerCheckRetrievedAt,
  brokerCheckUrl,
} from "@/lib/brokercheck-data";
import { getBrokerContactRecipient } from "@/lib/broker-contact";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ crd: string }>;
}) {
  const { crd } = await params;
  const record = brokerCheckRecords.find((item) => item.crd === crd);
  return {
    title: record ? `${record.name} — Broker profile` : "Broker not found",
    description: record
      ? `Public registration summary for ${record.name}, sourced from FINRA BrokerCheck.`
      : undefined,
  };
}

export default async function BrokerProfilePage({
  params,
}: {
  params: Promise<{ crd: string }>;
}) {
  const { crd } = await params;
  const record = brokerCheckRecords.find((item) => item.crd === crd);
  if (!record) notFound();

  const { recipient } = getBrokerContactRecipient(record.crd);
  const isRegistered = record.registrations.length > 0;
  const contactReady = Boolean(
    recipient &&
      process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASSWORD &&
      process.env.SMTP_PORT,
  );

  return (
    <SiteShell>
      <main className="broker-profile-page">
        <section className="broker-profile-hero">
          <div className="container">
            <Link className="broker-profile-back" href="/advisors">
              <ArrowLeft size={15} /> Back to records
            </Link>
            <span className="eyebrow">Public professional record</span>
            <h1>{record.name}</h1>
            <p className="broker-profile-status">
              <span aria-hidden="true" />
              {isRegistered
                ? record.registrations.join(" · ")
                : "Not currently registered"}
            </p>
            <p className="broker-profile-meta">
              CRD {record.crd}
              {record.firm ? ` · ${record.firm}` : ""}
              {record.city && record.state
                ? ` · ${record.city}, ${record.state}`
                : ""}
            </p>
          </div>
        </section>

        <div className="container broker-profile-layout">
          <section className="broker-profile-details">
            <article className="card broker-profile-card">
              <div className="broker-profile-card-heading">
                <span className="broker-profile-icon"><ShieldCheck size={19} /></span>
                <div>
                  <h2>Registration summary</h2>
                  <p>Information shown in the BrokerCheck summary.</p>
                </div>
              </div>
              <dl className="broker-profile-data">
                <div>
                  <dt>Registration status</dt>
                  <dd>{isRegistered ? record.registrations.join(" · ") : "Not currently registered"}</dd>
                </div>
                <div>
                  <dt>Current firm</dt>
                  <dd>{record.firm || "Not listed as currently registered"}</dd>
                </div>
                <div>
                  <dt>Office location</dt>
                  <dd>
                    {record.city && record.state ? (
                      <><MapPin size={14} /> {record.city}, {record.state}</>
                    ) : "Not listed"}
                  </dd>
                </div>
                <div>
                  <dt>Years of experience</dt>
                  <dd>
                    {record.experience
                      ? `${record.experience}${record.experience === "<1" ? " year" : " years"}`
                      : "See source record"}
                  </dd>
                </div>
                <div>
                  <dt>Disclosure indicator</dt>
                  <dd>
                    {record.disclosures === "none-reported"
                      ? "None shown in BrokerCheck summary"
                      : "Review the linked source record for details"}
                  </dd>
                </div>
                <div>
                  <dt>Record checked</dt>
                  <dd>{brokerCheckRetrievedAt}</dd>
                </div>
              </dl>
              <a
                className="btn btn-outline broker-profile-source"
                href={brokerCheckUrl(record.crd)}
                target="_blank"
                rel="noreferrer"
              >
                View official FINRA BrokerCheck record <ExternalLink size={15} />
              </a>
            </article>
            <p className="broker-profile-disclaimer">
              Findanadvisor reformats public record information for reference.
              This page is not an endorsement or recommendation. Confirm current
              details directly with FINRA BrokerCheck.
            </p>
          </section>

          <aside className="card broker-profile-contact">
            <span className="eyebrow">Get in touch</span>
            <h2>Contact {record.name.split(" ")[0]}</h2>
            <BrokerContactForm
              crd={record.crd}
              brokerName={record.name}
              enabled={contactReady}
            />
          </aside>
        </div>
      </main>
    </SiteShell>
  );
}
