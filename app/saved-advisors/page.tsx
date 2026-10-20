import { SiteShell } from "@/components/layout/site-shell";
export default function Page() {
  return (
    <SiteShell>
      <section className="section">
        <div
          className="container"
          style={{ maxWidth: 720, textAlign: "center" }}
        >
          <h1 className="section-title">Saved advisors</h1>
          <div className="card profile-section">
            <h2>No saved advisors yet</h2>
            <p className="muted">
              Save profiles while browsing to build your shortlist. Sign in to
              keep them synced across devices.
            </p>
            <a className="btn btn-primary" href="/advisors">
              Browse advisors
            </a>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
