import { SiteShell } from "@/components/layout/site-shell";
const items = [
  ["CFP®", "Certified Financial Planner"],
  ["CFA", "Chartered Financial Analyst"],
  ["CPA", "Certified Public Accountant"],
  ["ChFC", "Chartered Financial Consultant"],
  ["CLU", "Chartered Life Underwriter"],
  ["CIMA®", "Certified Investment Management Analyst"],
  ["AIF®", "Accredited Investment Fiduciary"],
];
export default function Page() {
  return (
    <SiteShell>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Professional designations</span>
          <h1>Financial certifications</h1>
          <p className="muted">
            Learn what common credentials mean and verify them with the issuing
            organization.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container specialty-grid">
          {items.map(([a, n]) => (
            <div className="card specialty-card" key={a}>
              <span className="eyebrow">{a}</span>
              <h3>{n}</h3>
              <p className="muted">
                Profiles display this designation only when it is stored on the
                advisor record.
              </p>
            </div>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
