import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Compass,
  Scale,
} from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";
import { HeroSearch } from "@/components/search/hero-search";
import { specialties, slugify } from "@/lib/demo-data";

export default function Home() {
  return (
    <SiteShell>
      <section className="home-hero">
        <div className="container home-hero-grid">
          <div className="home-hero-copy">
            <span className="home-eyebrow">A clear place to start</span>
            <h1>Make your financial search a little simpler.</h1>
            <p>
              Explore planning topics and search by location or specialty.
              Advisor profiles will be added when they’re ready.
            </p>
            <div className="home-hero-actions">
              <Link href="/specialties" className="btn home-primary-button">
                Explore specialties <ArrowRight size={17} />
              </Link>
              <Link href="/for-advisors" className="home-text-link">
                Are you an advisor?
              </Link>
            </div>
            <div className="home-trust-row">
              <span>
                <CheckCircle2 size={17} /> Search by specialty
              </span>
              <span>
                <Scale size={17} /> Simple next steps
              </span>
              <span>
                <Compass size={17} /> Browse at your pace
              </span>
            </div>
          </div>
          <HeroSearch />
        </div>
      </section>

      <section className="home-section home-specialties">
        <div className="container">
          <div className="home-section-heading">
            <div>
              <span className="home-eyebrow home-eyebrow-dark">Browse topics</span>
              <h2>What would you like help with?</h2>
              <p>
                Start with what’s on your mind. Explore the areas where you
                would like expert guidance.
              </p>
            </div>
            <Link href="/specialties" className="home-section-link">
              All specialties <ArrowRight size={16} />
            </Link>
          </div>
          <div className="home-specialty-list">
            {specialties.slice(0, 6).map(([name], index) => (
              <Link
                href={`/specialty/${slugify(name)}`}
                className="home-specialty-link"
                key={name}
              >
                <span className="home-specialty-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{name}</span>
                <ArrowRight size={17} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section home-process">
        <div className="container home-process-inner">
          <div className="home-process-intro">
            <span className="home-eyebrow home-eyebrow-dark">Know what to ask</span>
            <h2>Make a more informed choice.</h2>
            <p>
              A few practical questions can help you understand whether an
              advisor is right for your needs.
            </p>
            <Link href="/guides" className="home-section-link">
              Read our guides <ArrowRight size={16} />
            </Link>
          </div>
          <div className="home-steps">
            {[
              ["01", "Credentials", "Ask about licenses, designations, and the experience behind them."],
              ["02", "Fees", "Understand how the advisor is paid and what services are included."],
              ["03", "Working style", "Discuss how you’ll communicate and how advice is tailored to you."],
            ].map(([number, title, description]) => (
              <div className="home-step" key={number}>
                <span>{number}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </SiteShell>
  );
}
