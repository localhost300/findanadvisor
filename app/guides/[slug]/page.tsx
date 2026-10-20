import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock3 } from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";
import { financialGuides } from "@/lib/guides";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = financialGuides.find((item) => item.slug === slug);
  return guide
    ? { title: guide.title, description: guide.summary }
    : { title: "Financial guide" };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = financialGuides.find((item) => item.slug === slug);
  if (!guide) notFound();

  const relatedGuides = financialGuides.filter((item) => item.slug !== slug);

  return (
    <SiteShell>
      <article className="guide-article">
        <div className="container guide-article-container">
          <Link href="/guides" className="guide-back-link">
            <ArrowLeft size={16} /> All guides
          </Link>
          <div className="guide-article-layout">
            <main className="guide-article-main">
              <header className="guide-article-header">
                <span className="eyebrow">{guide.category}</span>
                <h1>{guide.title}</h1>
                <p className="guide-summary">{guide.summary}</p>
                <span className="guide-read-time"><Clock3 size={15} /> {guide.readTime}</span>
              </header>
              <div className="guide-article-body">
                <p className="guide-introduction">{guide.introduction}</p>
                {guide.sections.map((section, index) => (
                  <section className="guide-content-section" key={section.heading}>
                    <h2 id={`guide-section-${index + 1}`}>{section.heading}</h2>
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                    {section.points && (
                      <ul>
                        {section.points.map((point) => <li key={point}>{point}</li>)}
                      </ul>
                    )}
                  </section>
                ))}
                <Link href="/guides" className="guide-back-link">
                  <ArrowLeft size={16} /> Back to all guides
                </Link>
              </div>
            </main>
            <aside className="guide-sidebar" aria-label="Guide navigation and resources">
              <section className="guide-sidebar-card">
                <span className="eyebrow">In this guide</span>
                <nav className="guide-toc" aria-label="On this page">
                  {guide.sections.map((section, index) => (
                    <a href={`#guide-section-${index + 1}`} key={section.heading}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      {section.heading}
                    </a>
                  ))}
                </nav>
              </section>
              <section className="guide-sidebar-card guide-sidebar-highlight">
                <span className="eyebrow">Keep exploring</span>
                <h2>More practical guidance</h2>
                {relatedGuides.map((item) => (
                  <Link className="guide-sidebar-link" href={`/guides/${item.slug}`} key={item.slug}>
                    {item.title} <ArrowRight size={15} />
                  </Link>
                ))}
              </section>
              <Link href="/advisor-match" className="guide-sidebar-note">
                <span className="eyebrow">Next step</span>
                <span>Start exploring advisors who match your needs.</span>
                <span className="guide-sidebar-action">Find an advisor <ArrowRight size={15} /></span>
              </Link>
            </aside>
          </div>
        </div>
      </article>
      <section className="guide-related">
        <div className="container">
          <span className="eyebrow">Keep exploring</span>
          <h2>More practical guides</h2>
          <div className="guide-related-grid">
            {relatedGuides.map((item) => (
              <Link className="guide-related-card" href={`/guides/${item.slug}`} key={item.slug}>
                <span>{item.category}</span>
                <h3>{item.title}</h3>
                <span className="guide-read-link">Read guide <ArrowRight size={15} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
