import { createClient } from "@/lib/supabase/server";

export default async function BrokerCheckReportsPage() {
  const supabase = await createClient();
  if (!supabase)
    return <div className="notice">Connect Supabase to review correction reports.</div>;

  const { data, error } = await supabase
    .from("brokercheck_correction_reports")
    .select("id, crd_number, message, reporter_email, created_at")
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) throw error;

  return (
    <>
      <div className="admin-title">
        <div>
          <span className="eyebrow">Source accuracy</span>
          <h1>BrokerCheck reports</h1>
          <p className="muted">Review visitor reports about outdated or incorrect BrokerCheck details.</p>
        </div>
      </div>
      <div className="card data-card">
        <table>
          <thead>
            <tr>
              <th>Received</th>
              <th>CRD</th>
              <th>Report</th>
              <th>Reply email</th>
              <th>FINRA record</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((report) => (
              <tr key={report.id}>
                <td>{new Date(report.created_at).toLocaleString()}</td>
                <td>{report.crd_number}</td>
                <td>{report.message}</td>
                <td>{report.reporter_email || "Not provided"}</td>
                <td>
                  <a
                    href={`https://brokercheck.finra.org/individual/summary/${report.crd_number}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open record
                  </a>
                </td>
              </tr>
            ))}
            {!data?.length && (
              <tr>
                <td colSpan={5}>No correction reports have been submitted.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
