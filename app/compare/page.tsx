import { SiteShell } from "@/components/layout/site-shell";
import { advisors } from "@/lib/demo-data";
import { money } from "@/lib/utils";
import type { Advisor } from "@/types";
import type { ReactNode } from "react";
export default function Page() {
  const list = advisors.slice(0, 3);
  const rows: Array<[string, (a: Advisor) => ReactNode]> = [
    ["Location", (a) => `${a.city}, ${a.state}`],
    ["Experience", (a) => `${a.years_experience} years`],
    ["Specialties", (a) => a.specialties.join(", ")],
    ["Credentials", (a) => a.credentials.join(", ")],
    ["Fee structure", (a) => a.fee_structures.join(", ")],
    ["Minimum", (a) => money(a.minimum_investment)],
    ["Rating", (a) => `${a.average_rating} (${a.review_count})`],
    ["Languages", (a) => a.languages.join(", ")],
    ["Accepting clients", (a) => (a.accepting_new_clients ? "Yes" : "No")],
    ["Virtual consultation", (a) => (a.virtual_consultation ? "Yes" : "No")],
  ];
  return (
    <SiteShell>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Side-by-side</span>
          <h1>Compare advisors</h1>
          <p className="muted">
            Review up to three profiles across the details that matter.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container card" style={{ overflowX: "auto" }}>
          <table>
            <thead>
              <tr>
                <th>Compare</th>
                {list.map((a) => (
                  <th key={a.id}>
                    {a.display_name}
                    <br />
                    <small>{a.firm?.name}</small>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(([label, fn]) => (
                <tr key={label}>
                  <th>{label}</th>
                  {list.map((a) => (
                    <td key={a.id}>{fn(a)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </SiteShell>
  );
}
