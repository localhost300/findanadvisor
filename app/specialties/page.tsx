import Link from "next/link";
import { SiteShell } from "@/components/layout/site-shell";
import { specialties, slugify } from "@/lib/demo-data";
import { Compass } from "lucide-react";
export default function Page() {
  return (
    <SiteShell>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Areas of expertise</span>
          <h1>Financial advisor specialties</h1>
          <p className="muted">
            Start with the question you want help answering.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container specialty-grid">
          {specialties.map(([n, d]) => (
            <Link
              className="card specialty-card"
              href={`/specialty/${slugify(n)}`}
              key={n}
            >
              <span className="icon-box">
                <Compass size={19} />
              </span>
              <h3>{n}</h3>
              <p className="muted">{d}</p>
            </Link>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
