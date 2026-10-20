import { notFound } from "next/navigation";
import { SiteShell } from "@/components/layout/site-shell";
import { AdvisorCard } from "@/components/advisors/advisor-card";
import { specialties, slugify } from "@/lib/demo-data";
import { getAdvisors } from "@/lib/data";
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = specialties.find(([n]) => slugify(n) === slug);
  if (!item) notFound();
  const list = await getAdvisors({ specialty: slug, limit: 6 });
  return (
    <SiteShell>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Advisor specialty</span>
          <h1>{item[0]}</h1>
          <p className="muted" style={{ maxWidth: 680 }}>
            {item[1]} Compare professional backgrounds, services and fee
            structures before choosing who to contact.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <h2 className="section-title">
            Advisors focused on {item[0].toLowerCase()}
          </h2>
          <div className="advisor-grid">
            {list.map((a) => (
              <AdvisorCard key={a.id} advisor={a} />
            ))}
          </div>
          <div className="card profile-section" style={{ marginTop: 35 }}>
            <h2>Questions to ask</h2>
            <details>
              <summary>
                How does an advisor approach {item[0].toLowerCase()}?
              </summary>
              <p className="muted">
                Ask about planning methods, ongoing monitoring and how
                recommendations connect to your wider financial picture.
              </p>
            </details>
            <details>
              <summary>What should I compare?</summary>
              <p className="muted">
                Review experience, credentials, services, fee structure,
                minimums and whether the advisor works with clients like you.
              </p>
            </details>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
