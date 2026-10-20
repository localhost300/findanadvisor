import { SiteShell } from "@/components/layout/site-shell";
import { AdvisorCard } from "@/components/advisors/advisor-card";
import { getAdvisors } from "@/lib/data";
import { stateNames } from "@/lib/demo-data";
export default async function Page({
  params,
}: {
  params: Promise<{ state: string }>;
}) {
  const { state } = await params;
  const name = stateNames[state] || state;
  const list = await getAdvisors({ state, limit: 20 });
  return (
    <SiteShell>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Location directory</span>
          <h1>Financial advisors in {name}</h1>
          <p className="muted">
            Compare experience, services and fee structures from published
            profiles.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="advisor-grid">
            {list.map((a) => (
              <AdvisorCard key={a.id} advisor={a} />
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
