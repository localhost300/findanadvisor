import Link from "next/link";
import { SiteShell } from "@/components/layout/site-shell";
import { ArrowRight, Clock3, LibraryBig } from "lucide-react";
import { financialGuides } from "@/lib/guides";
export default function Page() {
  return (
    <SiteShell>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Financial guides</span>
          <h1>Understand your options with confidence</h1>
          <p className="muted">
            Straightforward, practical reading to help you prepare, compare
            financial advice, and ask better questions.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container guide-grid">
          {financialGuides.map((guide, i) => (
            <article className="card guide-card" key={guide.slug}>
              <div className="guide-card-top">
                <span className="guide-icon"><LibraryBig size={20} /></span>
                <span className="guide-number">0{i + 1}</span>
              </div>
              <span className="eyebrow">{guide.category}</span>
              <h2>{guide.title}</h2>
              <p className="muted">{guide.summary}</p>
              <div className="guide-card-bottom">
                <span className="guide-read-time"><Clock3 size={15} /> {guide.readTime}</span>
                <Link className="guide-read-link" href={`/guides/${guide.slug}`}>
                  Read guide <ArrowRight size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
