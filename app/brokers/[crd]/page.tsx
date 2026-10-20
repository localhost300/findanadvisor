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
import { siteUrl } from "@/lib/site-url";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ crd: string }>;
}) {
  const { crd } = await params;
  const record = brokerCheckRecords.find((item) => item.crd === crd);
  if (!record) {
    return {
      title: "Broker not found",
      robots: { index: false, follow: false },
    };
  }

  const location =
    record.city && record.state ? `${record.city}, ${record.state}` : null;
  const registration =
    record.registrations.length > 0
      ? record.registrations.join(" and ")
      : "professional";
  const description = [
    `${record.name} (FINRA CRD ${record.crd})`,
    `public ${registration} record`,
    record.firm ? `listed with ${record.firm}` : null,
    location ? `in ${location}` : null,
    `sourced from FINRA BrokerCheck and retrieved ${brokerCheckRetrievedAt}.`,
  ]
    .filter(Boolean)
    .join(" ");
  const tinaRecord = record.crd === "5889228";
  const metadataDescription = tinaRecord
    ? "Tina Renee Graves (FINRA CRD 5889228) is a broker at MWA Financial Services Inc. in Lexington, TN. See her public FINRA BrokerCheck record."
    : description;
  const canonical = `/brokers/${record.crd}`;

  return {
    title: `${record.name} | FINRA BrokerCheck Record`,
    description: metadataDescription,
    alternates: tinaRecord ? { canonical } : undefined,
    robots: { index: tinaRecord, follow: true },
    openGraph: {
      type: "profile",
      url: new URL(canonical, siteUrl).toString(),
      title: `${record.name} | FINRA BrokerCheck Record`,
      description: metadataDescription,
      siteName: "Findanadvisor",
      locale: "en_US",
    },
    twitter: {
      card: "summary",
      title: `${record.name} | FINRA BrokerCheck Record`,
      description: metadataDescription,
    },
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
  const profileUrl = new URL(`/brokers/${record.crd}`, siteUrl).toString();
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: record.name,
    identifier: {
      "@type": "PropertyValue",
      propertyID: "FINRA CRD",
      value: record.crd,
    },
    url: profileUrl,
    mainEntityOfPage: profileUrl,
    sameAs: brokerCheckUrl(record.crd),
    description: `Public ${record.registrations.join(" and ") || "professional"} registration summary sourced from FINRA BrokerCheck. Record retrieved ${brokerCheckRetrievedAt}.`,
    ...(record.registrations.length > 0 && {
      jobTitle: record.registrations.join(", "),
    }),
    ...(record.firm && {
      worksFor: { "@type": "Organization", name: record.firm },
    }),
    ...(record.city &&
      record.state && {
        address: {
          "@type": "PostalAddress",
          addressLocality: record.city,
          addressRegion: record.state,
          addressCountry: "US",
        },
      }),
  };

  return (
    <SiteShell>
      <main className="broker-profile-page">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
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
