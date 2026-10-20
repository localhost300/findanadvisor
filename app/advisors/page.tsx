import { MapPin, Search, ShieldCheck } from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";
import { BrokerCheckCard } from "@/components/advisors/brokercheck-card";
import {
  brokerCheckRecords,
  brokerCheckRetrievedAt,
} from "@/lib/brokercheck-data";

const pageSize = 12;

export const metadata = {
  title: "FINRA BrokerCheck Directory",
  description:
    "Browse financial professional registration information from FINRA BrokerCheck.",
};

export default async function AdvisorsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const first = (value: string | string[] | undefined) =>
    (Array.isArray(value) ? value[0] : value) || "";
  const query = first(params.q).trim().toLowerCase();
  const location = first(params.location).trim().toLowerCase();
  const registration = first(params.registration);
  const sort = first(params.sort) || "name";
  const selectedPage = Math.max(
    1,
    Number.parseInt(first(params.page) || "1", 10) || 1,
  );

  const filtered = brokerCheckRecords.filter((record) => {
    const searchableText = [
      record.name,
      record.crd,
      record.firm || "",
      record.city || "",
      record.state || "",
    ]
      .join(" ")
      .toLowerCase();
    const locationText = [record.city || "", record.state || ""]
      .join(" ")
      .toLowerCase();
    if (query && !searchableText.includes(query)) return false;
    if (location && !locationText.includes(location)) return false;
    if (registration === "current" && !record.registrations.length)
      return false;
    if (registration === "previous" && record.registrations.length)
      return false;
    return true;
  });

  if (sort === "experience") {
    filtered.sort(
      (a, b) =>
        (Number.parseFloat(b.experience || "") || 0) -
        (Number.parseFloat(a.experience || "") || 0),
    );
  } else if (sort === "state") {
    filtered.sort((a, b) =>
      `${a.state || "ZZ"} ${a.name}`.localeCompare(`${b.state || "ZZ"} ${b.name}`),
    );
  } else {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  }

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(selectedPage, totalPages);
  const records = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const states = [...new Set(brokerCheckRecords.map((record) => record.state).filter(Boolean))]
    .sort();

  function pageHref(page: number) {
    const next = new URLSearchParams();
    if (first(params.q)) next.set("q", first(params.q));
    if (first(params.location)) next.set("location", first(params.location));
    if (first(params.registration))
      next.set("registration", first(params.registration));
    if (first(params.sort)) next.set("sort", first(params.sort));
    if (page > 1) next.set("page", String(page));
    const search = next.toString();
    return search ? `/advisors?${search}` : "/advisors";
  }

  return (
    <SiteShell>
      <main className="brokercheck-directory">
        <section className="directory-hero">
          <div className="container">
            <div className="directory-hero-copy">
              <span className="eyebrow">Public professional records</span>
              <h1>Explore FINRA BrokerCheck records.</h1>
              <p>
                Search public registration summaries by name, firm, CRD number,
                or office location. Check each official record for the latest details.
              </p>
            </div>
            <form method="get" className="brokercheck-search-panel">
              <label className="directory-search-field">
                <span><Search size={17} /> Name, firm, or CRD number</span>
                <input
                  className="field"
                  name="q"
                  defaultValue={params.q}
                  placeholder="Search a person, firm, or CRD"
                />
              </label>
              <label className="directory-search-field">
                <span><MapPin size={17} /> Office location</span>
                <select className="field" name="location" defaultValue={params.location}>
                  <option value="">Any state</option>
                  {states.map((state) => (
                    <option key={state} value={state?.toLowerCase()}>
                      {state}
                    </option>
                  ))}
                </select>
              </label>
              <label className="directory-search-field">
                <span>Registration status</span>
                <select className="field" name="registration" defaultValue={registration}>
                  <option value="">All records</option>
                  <option value="current">Currently registered</option>
                  <option value="previous">Not currently registered</option>
                </select>
              </label>
              <label className="directory-search-field">
                <span>Sort by</span>
                <select className="field" name="sort" defaultValue={sort}>
                  <option value="name">Name A–Z</option>
                  <option value="state">State</option>
                  <option value="experience">Years of experience</option>
                </select>
              </label>
              <button className="btn directory-search-button" type="submit">
                <Search size={17} /> Search records
              </button>
            </form>
          </div>
        </section>

        <section className="container brokercheck-results">
          <div className="brokercheck-results-heading">
            <div>
              <strong>{filtered.length} {filtered.length === 1 ? "record" : "records"}</strong>
              <p>Showing page {currentPage} of {totalPages}</p>
            </div>
            <a className="brokercheck-clear-link" href="/advisors">Clear search</a>
          </div>

          <div className="brokercheck-terms-notice">
            <ShieldCheck size={19} />
            <p>
              <strong>Source and use:</strong> This noncommercial directory is
              provided for investor-protection purposes. We reformat the name,
              CRD number, registration category, firm, primary office location,
              experience, and disclosure indicator shown in BrokerCheck; we do
              not rate or recommend professionals. Records were checked on{" "}
              <strong>{brokerCheckRetrievedAt}</strong> and may have changed.
              Confirm details with{" "}
              <a href="https://brokercheck.finra.org/" target="_blank" rel="noreferrer">
                FINRA BrokerCheck
              </a>
              . Use is subject to the{" "}
              <a href="https://brokercheck.finra.org/terms-of-use" target="_blank" rel="noreferrer">
                BrokerCheck Terms of Use
              </a>
              . Report an error using the form on a record card; if the error is
              in FINRA&apos;s source record, please notify FINRA as well.
            </p>
          </div>

          {records.length ? (
            <div className="brokercheck-record-grid">
              {records.map((record) => (
                <BrokerCheckCard key={record.crd} record={record} />
              ))}
            </div>
          ) : (
            <div className="card directory-empty">
              <span className="directory-filter-icon"><Search size={19} /></span>
              <h2>No matching records</h2>
              <p className="muted">Try a different name, CRD number, location, or registration status.</p>
              <a className="btn btn-outline" href="/advisors">Clear search</a>
            </div>
          )}

          {totalPages > 1 && (
            <nav className="brokercheck-pagination" aria-label="Directory pages">
              <a
                className={`brokercheck-page-link${currentPage === 1 ? " is-disabled" : ""}`}
                href={pageHref(Math.max(1, currentPage - 1))}
                aria-disabled={currentPage === 1}
              >
                Previous
              </a>
              <div className="brokercheck-page-numbers">
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                  <a
                    key={page}
                    className={`brokercheck-page-number${page === currentPage ? " is-current" : ""}`}
                    href={pageHref(page)}
                    aria-current={page === currentPage ? "page" : undefined}
                  >
                    {page}
                  </a>
                ))}
              </div>
              <a
                className={`brokercheck-page-link${currentPage === totalPages ? " is-disabled" : ""}`}
                href={pageHref(Math.min(totalPages, currentPage + 1))}
                aria-disabled={currentPage === totalPages}
              >
                Next
              </a>
            </nav>
          )}
        </section>
      </main>
    </SiteShell>
  );
}
