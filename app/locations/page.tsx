import Link from "next/link";
import { MapPin } from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";
import { stateNames } from "@/lib/demo-data";
export default function Page() {
  return (
    <SiteShell>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Browse locally</span>
          <h1>Financial advisors by location</h1>
          <p className="muted">
            Explore published advisor profiles in cities across the United
            States.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container specialty-grid">
          {Object.entries(stateNames).map(([s, n]) => (
            <Link
              className="card specialty-card"
              href={`/financial-advisors/${s}`}
              key={s}
            >
              <span className="icon-box">
                <MapPin />
              </span>
              <h3>{n}</h3>
              <p className="muted">Browse financial advisors in {n}.</p>
            </Link>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
