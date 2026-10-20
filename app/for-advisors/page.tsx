import Link from "next/link";
import { SiteShell } from "@/components/layout/site-shell";
export default function Page() {
  return (
    <SiteShell>
      <section className="hero">
        <div
          className="container"
          style={{ maxWidth: 850, textAlign: "center" }}
        >
          <span className="eyebrow" style={{ color: "#76c4a6" }}>
            For financial professionals
          </span>
          <h1>Present your practice with clarity.</h1>
          <p style={{ margin: "auto" }}>
            Claim your profile, keep professional details current and help
            prospective clients understand how you work.
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 10,
              marginTop: 25,
            }}
          >
            <Link href="/claim-profile" className="btn btn-green">
              Claim your profile
            </Link>
            <Link href="/login" className="btn btn-outline">
              Advisor sign in
            </Link>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container steps">
          {[
            [
              "01",
              "Be discoverable",
              "Appear in relevant location and specialty searches.",
            ],
            [
              "02",
              "Build confidence",
              "Present services, credentials, fees and minimums clearly.",
            ],
            [
              "03",
              "Start conversations",
              "Receive inquiries from people exploring financial advice.",
            ],
          ].map(([n, t, d]) => (
            <div key={n}>
              <span className="step-num">{n}</span>
              <h2>{t}</h2>
              <p className="muted">{d}</p>
            </div>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
