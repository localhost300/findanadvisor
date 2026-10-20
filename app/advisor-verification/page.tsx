import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  FileSearch,
  RefreshCw,
  Scale,
  UserRoundCheck,
} from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";
import { AdvisorReportForm } from "@/components/verification/advisor-report-form";

export const metadata = {
  title: "Advisor verification and review process",
  description:
    "Learn how Findanadvisor presents public professional records and report information that may need review.",
};

const reviewSteps = [
  {
    icon: UserRoundCheck,
    title: "Identity & professional information",
    text: "Directory entries are based on public professional records and the identifying information shown in those sources. A listing alone does not mean Findanadvisor has independently confirmed a person’s identity.",
  },
  {
    icon: BadgeCheck,
    title: "Registration & licensing",
    text: "Registration categories and status are presented from the linked BrokerCheck summary as of the retrieval date. Use the official record to confirm current registrations and licensing details.",
  },
  {
    icon: Building2,
    title: "Firm affiliation",
    text: "A firm name is shown when it appears in the public source summary. It reflects what the source reported when checked and is not a separate endorsement or ongoing confirmation by Findanadvisor.",
  },
  {
    icon: FileSearch,
    title: "Credentials",
    text: "Credentials are not inferred from registration status. Where a credential is not shown in the linked public record, check directly with the relevant issuing organization.",
  },
  {
    icon: Scale,
    title: "Regulatory history",
    text: "Disclosure indicators are reported only as represented in the available source summary. Review the full official record for context, updates, and details.",
  },
  {
    icon: RefreshCw,
    title: "Ongoing review",
    text: "Public records can change. We display when the directory information was checked and accept reports about information that may be inaccurate or outdated. Always confirm current details with the official source.",
  },
];

export default function AdvisorVerificationPage() {
  return (
    <SiteShell>
      <main className="verification-page">
        <section className="verification-hero">
          <div className="container verification-hero-inner">
            <span className="eyebrow">Our review approach</span>
            <h1>Advisors you can research with confidence.</h1>
            <p>
              Finding a financial advisor shouldn’t mean taking a profile at
              face value. We make public professional information easier to
              explore and link you to the records where you can verify it.
            </p>
            <Link className="btn btn-primary" href="/advisors">
              Explore public records <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        <section className="container verification-content">
          <div className="verification-intro card">
            <span className="verification-intro-icon"><FileSearch size={20} /></span>
            <div>
              <h2>What “reviewed” means here</h2>
              <p>
                The current directory presents selected information from public
                FINRA BrokerCheck summaries. Findanadvisor does not claim to
                independently verify every professional’s identity, credentials,
                firm affiliation, or conduct. Treat each listing as a starting
                point for your own research and confirm details with the linked
                official record.
              </p>
            </div>
          </div>

          <div className="verification-section-heading">
            <span className="eyebrow">Our verification process</span>
            <h2>How we review profile information</h2>
            <p>
              We identify the source and limits of information, and avoid
              presenting a public record as a personal recommendation.
            </p>
          </div>

          <div className="verification-steps">
            {reviewSteps.map(({ icon: Icon, title, text }, index) => (
              <article className="card verification-step" key={title}>
                <span className="verification-step-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="verification-step-icon"><Icon size={19} /></span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>

          <section className="verification-report-section" id="report-an-advisor">
            <div className="verification-report-copy">
              <span className="eyebrow">Help us keep records current</span>
              <h2>Report an advisor</h2>
              <p>
                See information that may be inaccurate, outdated, or concerning?
                Send us the details. Reports are reviewed by our team; if the
                information is in a FINRA source record, please also contact FINRA.
              </p>
              <a
                className="verification-source-link"
                href="https://brokercheck.finra.org/"
                target="_blank"
                rel="noreferrer"
              >
                Visit FINRA BrokerCheck <ArrowRight size={15} />
              </a>
            </div>
            <div className="card verification-report-card">
              <AdvisorReportForm />
            </div>
          </section>
        </section>
      </main>
    </SiteShell>
  );
}
