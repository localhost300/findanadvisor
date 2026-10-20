import { SiteShell } from "@/components/layout/site-shell";
export default function Page() {
  return (
    <SiteShell>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Profile ownership</span>
          <h1>Claim an advisor profile</h1>
          <p className="muted">
            Submit your professional details for manual administrator review.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <form
            className="card form-card"
            style={{ maxWidth: 760, margin: "auto" }}
          >
            <div className="form-grid">
              {[
                ["Advisor profile", "Search an advisor by name"],
                ["Full name", "Your legal name"],
                ["Work email", "name@firm.com"],
                ["Phone", "Phone number"],
                ["Firm", "Firm name"],
                ["Position", "Your title"],
              ].map(([l, p]) => (
                <div key={l}>
                  <label className="label">{l}</label>
                  <input className="field" placeholder={p} />
                </div>
              ))}
              <div className="span-2">
                <label className="label">Message</label>
                <textarea
                  className="field"
                  rows={5}
                  placeholder="Explain your relationship to this profile"
                />
              </div>
              <div className="span-2">
                <label className="label">Supporting document</label>
                <input className="field" type="file" />
              </div>
            </div>
            <button
              type="button"
              className="btn btn-primary"
              style={{ marginTop: 20 }}
            >
              Submit claim for review
            </button>
          </form>
        </div>
      </section>
    </SiteShell>
  );
}
