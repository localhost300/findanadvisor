import { SiteShell } from "@/components/layout/site-shell";
export default function Page() {
  return (
    <SiteShell>
      <section className="section">
        <div className="container" style={{ maxWidth: 820 }}>
          <span className="eyebrow">Legal</span>
          <h1 className="section-title">Disclaimer</h1>
          <div className="card profile-section">
            <p>
              <strong>
                Findanadvisor is an informational directory and does not provide
                investment, financial, legal or tax advice.
              </strong>{" "}
              Users should independently verify the credentials, registration
              status and professional history of any financial professional
              before engaging their services.
            </p>
            <p>
              Profile information may be supplied by advisors, firms,
              administrators or third-party sources. Inclusion does not
              constitute an endorsement. Ratings and reviews reflect individual
              experiences and should not be treated as guarantees of future
              results.
            </p>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
