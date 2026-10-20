import Link from "next/link";
import { ArrowRight, LockKeyhole, ShieldCheck } from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";

export const metadata = {
  title: "Privacy policy",
  description:
    "Learn how Findanadvisor handles information when you browse the directory or use account features.",
};

const sections = [
  ["information-we-handle", "Information we handle"],
  ["how-we-use-information", "How information is used"],
  ["cookies-and-sessions", "Cookies and session data"],
  ["sharing", "When information may be shared"],
  ["retention-and-security", "Retention and security"],
  ["your-choices", "Your choices and rights"],
  ["children-and-changes", "Children and policy updates"],
];

export default function PrivacyPage() {
  return (
    <SiteShell>
      <section className="legal-hero">
        <div className="container legal-hero-inner">
          <span className="eyebrow">Your information</span>
          <h1>Privacy, explained clearly.</h1>
          <p>
            This policy describes the information Findanadvisor may handle
            when you browse the site and, where available, use account or
            directory features.
          </p>
          <span className="legal-updated">Last updated October 20, 2026</span>
        </div>
      </section>
      <section className="legal-layout-section">
        <div className="container legal-layout">
          <aside className="legal-sidebar">
            <div className="legal-sidebar-card">
              <span className="eyebrow">On this page</span>
              <nav aria-label="Privacy policy sections">
                {sections.map(([id, title], index) => (
                  <a href={`#${id}`} key={id}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    {title}
                  </a>
                ))}
              </nav>
              <div className="legal-sidebar-note">
                <ShieldCheck size={19} />
                <p>Share only the information needed to use a feature.</p>
              </div>
            </div>
          </aside>
          <article className="legal-content">
            <div className="legal-lead">
              <span className="legal-lead-icon"><LockKeyhole size={21} /></span>
              <div>
                <h2>Privacy matters</h2>
                <p>
                  We aim to handle personal information responsibly and to
                  explain what is involved when you use the site. Features may
                  differ depending on whether account services are enabled.
                </p>
              </div>
            </div>

            <section id="information-we-handle" className="legal-section">
              <span className="legal-section-number">01</span>
              <div>
                <h2>Information we handle</h2>
                <p>
                  The information involved depends on how you use Findanadvisor.
                  Browsing public pages does not require you to create an
                  account. If you choose to use a feature that requests
                  information, it may include:
                </p>
                <ul>
                  <li>
                    <strong>Information you provide:</strong> details included
                    in an account, advisor inquiry, profile claim, review, or
                    message, where that feature is available and submitted.
                  </li>
                  <li>
                    <strong>Broker contact form:</strong> your name, email,
                    location, optional phone number, subject, and message when
                    you contact a broker through a profile.
                  </li>
                  <li>
                    <strong>Advisor reports:</strong> the advisor name or
                    profile URL, issue category, report details, and optional
                    email address you provide when submitting a report.
                  </li>
                  <li>
                    <strong>Account information:</strong> such as an email
                    address and authentication data if account sign-in is
                    configured and you choose to use it.
                  </li>
                  <li>
                    <strong>Directory information:</strong> professional
                    details displayed in advisor profiles, which may be
                    supplied by an advisor or firm, entered by an administrator,
                    or obtained from public or other sources.
                  </li>
                  <li>
                    <strong>Technical information:</strong> basic request,
                    device, and security information that may be recorded by
                    the hosting or authentication services needed to deliver
                    and protect the site.
                  </li>
                </ul>
                <p>
                  Please avoid including account passwords, payment card
                  information, government identifiers, or other sensitive
                  information in free-text fields unless a feature specifically
                  requests it.
                </p>
              </div>
            </section>

            <section id="how-we-use-information" className="legal-section">
              <span className="legal-section-number">02</span>
              <div>
                <h2>How information is used</h2>
                <p>Information may be used, where relevant, to:</p>
                <ul>
                  <li>Provide directory, search, and account functionality.</li>
                  <li>Route and respond to inquiries or profile requests.</li>
                  <li>Review reports about potentially inaccurate or outdated professional information.</li>
                  <li>Review, moderate, and display submitted content.</li>
                  <li>Maintain site security, diagnose technical issues, and prevent misuse.</li>
                  <li>Meet applicable legal obligations and enforce site terms.</li>
                </ul>
                <p>
                  We do not use the information described here to build
                  advertising profiles or to target advertisements. If our
                  purposes for handling information change, this policy will
                  be updated.
                </p>
              </div>
            </section>

            <section id="cookies-and-sessions" className="legal-section">
              <span className="legal-section-number">03</span>
              <div>
                <h2>Cookies and session data</h2>
                <p>
                  If account authentication is enabled, the site’s
                  authentication provider may use cookies or similar
                  technologies to maintain a secure session and support
                  sign-in. Essential technical storage may also be used to
                  deliver the site reliably.
                </p>
                <p>
                  Your browser can manage or block cookies. Blocking essential
                  session cookies may prevent sign-in or other features from
                  working correctly. The site does not describe optional
                  advertising cookies for targeted advertising.
                </p>
              </div>
            </section>

            <section id="sharing" className="legal-section">
              <span className="legal-section-number">04</span>
              <div>
                <h2>When information may be shared</h2>
                <p>
                  Information may be processed by service providers that host
                  the site, provide database or authentication functionality,
                  or help maintain its security. For example, Supabase
                  integration is present in the project and may handle account
                  or database information when configured.
                </p>
                <p>
                  Information may also be shared when you ask us to connect
                  you with an advisor, when you choose to make a submission
                  public, when disclosure is required by law, or when needed
                  to protect users, the site, or legal rights. Findanadvisor
                  does not sell personal information. If data-sharing
                  practices change, this policy will be updated.
                </p>
                <p>
                  Reports submitted through the advisor verification page are
                  stored in the site database and made available to authorized
                  administrators for review. Please do not include passwords,
                  account numbers, or other sensitive personal information in a
                  report.
                </p>
                <p>
                  When direct broker contact is enabled, the details you submit
                  through a broker profile are sent to that broker&apos;s
                  individually configured email address using the site&apos;s
                  email delivery provider. The form does not send your message
                  to other brokers. Do not include passwords, account numbers,
                  or other sensitive information.
                </p>
              </div>
            </section>

            <section id="retention-and-security" className="legal-section">
              <span className="legal-section-number">05</span>
              <div>
                <h2>Retention and security</h2>
                <p>
                  Information should be retained only for as long as needed
                  for the purpose it was collected, to maintain appropriate
                  records, or to meet legal requirements. Actual retention
                  periods may depend on the feature and the service providers
                  in use.
                </p>
                <p>
                  Reasonable technical and organizational safeguards should
                  be used to protect information. No website or transmission
                  method can be guaranteed completely secure, so please use
                  care when sharing information online.
                </p>
              </div>
            </section>

            <section id="your-choices" className="legal-section">
              <span className="legal-section-number">06</span>
              <div>
                <h2>Your choices and rights</h2>
                <p>
                  Depending on where you live, you may have rights to request
                  access to, correction of, or deletion of personal
                  information, or to object to or restrict certain processing.
                  These rights may be subject to legal exceptions.
                </p>
                <p>
                  You can choose not to submit optional information and can
                  manage cookies through your browser. To ask about a privacy
                  request, use the site’s available contact or inquiry
                  channels. We may need to verify your identity before
                  responding.
                </p>
              </div>
            </section>

            <section id="children-and-changes" className="legal-section">
              <span className="legal-section-number">07</span>
              <div>
                <h2>Children and policy updates</h2>
                <p>
                  Findanadvisor is intended for adults researching financial
                  professionals and is not designed for children. We do not
                  knowingly seek personal information from children.
                </p>
                <p>
                  This policy may be updated as site features or legal
                  requirements change. The date at the top of this page shows
                  when it was most recently revised. Continued use after an
                  update means the revised policy is available for review;
                  where required, additional notice or consent will be
                  provided.
                </p>
              </div>
            </section>

            <div className="legal-endnote">
              <p>
                Questions about using the directory? Visit our{" "}
                <Link href="/guides">financial guides</Link> or read the{" "}
                <Link href="/terms">Terms of Use</Link>.
              </p>
              <ArrowRight size={18} />
            </div>
          </article>
        </div>
      </section>
    </SiteShell>
  );
}
