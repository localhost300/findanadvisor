import Link from "next/link";
import { ArrowRight, FileCheck2, Scale } from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";

export const metadata = {
  title: "Terms of use",
  description:
    "Read the terms for accessing and using the Findanadvisor financial professional directory.",
};

const sections = [
  ["acceptance", "Acceptance and eligibility"],
  ["directory", "Directory information"],
  ["not-advice", "Information, not professional advice"],
  ["accounts", "Accounts and submissions"],
  ["acceptable-use", "Acceptable use"],
  ["third-parties", "Third-party services and links"],
  ["availability", "Availability and liability"],
  ["changes", "Changes and contact"],
];

export default function TermsPage() {
  return (
    <SiteShell>
      <section className="legal-hero legal-hero-terms">
        <div className="container legal-hero-inner">
          <span className="eyebrow">Using the directory</span>
          <h1>Clear terms for using Findanadvisor.</h1>
          <p>
            These terms explain the basic rules and limitations that apply
            when you visit or use the Findanadvisor website.
          </p>
          <span className="legal-updated">Last updated October 20, 2026</span>
        </div>
      </section>
      <section className="legal-layout-section">
        <div className="container legal-layout">
          <aside className="legal-sidebar">
            <div className="legal-sidebar-card">
              <span className="eyebrow">On this page</span>
              <nav aria-label="Terms of use sections">
                {sections.map(([id, title], index) => (
                  <a href={`#${id}`} key={id}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    {title}
                  </a>
                ))}
              </nav>
              <div className="legal-sidebar-note">
                <Scale size={19} />
                <p>Review the details and verify information independently.</p>
              </div>
            </div>
          </aside>
          <article className="legal-content">
            <div className="legal-lead">
              <span className="legal-lead-icon"><FileCheck2 size={21} /></span>
              <div>
                <h2>Using the site</h2>
                <p>
                  By accessing Findanadvisor, you agree to these terms. If
                  you do not agree, do not use the site. These terms apply
                  alongside any additional terms shown for a particular
                  feature.
                </p>
              </div>
            </div>

            <section id="acceptance" className="legal-section">
              <span className="legal-section-number">01</span>
              <div>
                <h2>Acceptance and eligibility</h2>
                <p>
                  You must be legally able to enter into these terms in your
                  location. If you use the site on behalf of another person
                  or organization, you confirm that you are authorized to
                  accept these terms on its behalf.
                </p>
              </div>
            </section>

            <section id="directory" className="legal-section">
              <span className="legal-section-number">02</span>
              <div>
                <h2>Directory information</h2>
                <p>
                  Findanadvisor provides an informational directory to help
                  people explore financial professionals, services, and
                  specialties. Profiles and related information may be
                  supplied by professionals or firms, entered by site
                  administrators, or drawn from other sources. Information
                  may be incomplete, outdated, or contain errors.
                </p>
                <p>
                  A listing, profile, credential, rating, or other inclusion
                  does not by itself mean that Findanadvisor has endorsed,
                  certified, or recommended a professional. Unless a profile
                  clearly explains the scope of a verification, do not assume
                  that all profile details have been independently verified.
                </p>
                <p>
                  You are responsible for checking credentials, registrations,
                  disciplinary history, services, fees, and current eligibility
                  with the relevant regulator, credentialing organization, or
                  professional before making a decision.
                </p>
              </div>
            </section>

            <section id="not-advice" className="legal-section">
              <span className="legal-section-number">03</span>
              <div>
                <h2>Information, not professional advice</h2>
                <p>
                  Site content is general information. It is not investment,
                  financial, tax, legal, or other professional advice and is
                  not a substitute for advice tailored to your circumstances.
                  You are responsible for evaluating your own situation and
                  seeking qualified professional advice where appropriate.
                </p>
                <p>
                  Investing and other financial decisions involve risk,
                  including the possible loss of principal. Past performance,
                  ratings, reviews, and profile descriptions do not guarantee
                  future results or a particular experience.
                </p>
              </div>
            </section>

            <section id="accounts" className="legal-section">
              <span className="legal-section-number">04</span>
              <div>
                <h2>Accounts and submissions</h2>
                <p>
                  Some features may require an account or request information
                  from you. You agree to provide information that is accurate
                  to the best of your knowledge, keep your sign-in details
                  secure, and notify the site operator if you believe your
                  account has been misused.
                </p>
                <p>
                  You are responsible for content you submit, including
                  inquiries, profile information, claims, and reviews. Do not
                  submit content that is unlawful, misleading, confidential
                  without authorization, infringing, abusive, or otherwise
                  harmful. Do not include another person’s personal
                  information unless you have a valid basis and permission.
                </p>
                <p>
                  Where a submission feature is available, you grant the site
                  permission to host, process, moderate, and display that
                  content as needed to operate the feature. You retain any
                  rights you hold in your submission. Content may be rejected,
                  edited for formatting, restricted, or removed where
                  appropriate.
                </p>
              </div>
            </section>

            <section id="acceptable-use" className="legal-section">
              <span className="legal-section-number">05</span>
              <div>
                <h2>Acceptable use</h2>
                <p>You agree not to:</p>
                <ul>
                  <li>Use the site in violation of law or another person’s rights.</li>
                  <li>Attempt to gain unauthorized access to accounts, systems, or data.</li>
                  <li>Interfere with site operation, security, or availability.</li>
                  <li>Scrape, harvest, or republish directory data at scale without permission.</li>
                  <li>Upload malware, spam, deceptive material, or false reviews.</li>
                  <li>Misrepresent your identity or affiliation with a professional or firm.</li>
                </ul>
                <p>
                  Access may be limited or suspended where necessary to protect
                  the site, its users, or others, or to address a breach of
                  these terms.
                </p>
              </div>
            </section>

            <section id="third-parties" className="legal-section">
              <span className="legal-section-number">06</span>
              <div>
                <h2>Third-party services and links</h2>
                <p>
                  The site may link to third-party websites or rely on
                  third-party services for hosting, authentication, or other
                  functionality. Those services are governed by their own
                  terms and privacy practices. Findanadvisor does not control
                  and is not responsible for third-party content, availability,
                  or policies.
                </p>
              </div>
            </section>

            <section id="availability" className="legal-section">
              <span className="legal-section-number">07</span>
              <div>
                <h2>Availability and liability</h2>
                <p>
                  The site is provided on an “as available” basis. To the
                  extent permitted by applicable law, no guarantee is made
                  that the site will be uninterrupted, error-free, secure, or
                  suitable for every purpose. Nothing in these terms limits
                  rights or remedies that cannot legally be limited.
                </p>
                <p>
                  To the extent permitted by law, Findanadvisor is not liable
                  for indirect or consequential loss arising from use of the
                  site, reliance on directory information, or dealings between
                  you and a professional. This does not exclude liability
                  where exclusion is not permitted by law.
                </p>
              </div>
            </section>

            <section id="changes" className="legal-section">
              <span className="legal-section-number">08</span>
              <div>
                <h2>Changes and contact</h2>
                <p>
                  These terms may be updated when the site or its features
                  change. The revision date at the top of this page indicates
                  when the terms were last updated. Continued use after
                  revised terms are posted means you can review the revised
                  terms; where required, additional consent will be requested.
                </p>
                <p>
                  If you have a question about these terms, use the contact
                  or inquiry options available on the site. Nothing in these
                  terms is intended to limit consumer rights or protections
                  that cannot be excluded under the laws that apply to you.
                </p>
              </div>
            </section>

            <div className="legal-endnote">
              <p>
                For information about data handling, read our{" "}
                <Link href="/privacy">Privacy Policy</Link> or return to the{" "}
                <Link href="/">Findanadvisor homepage</Link>.
              </p>
              <ArrowRight size={18} />
            </div>
          </article>
        </div>
      </section>
    </SiteShell>
  );
}
