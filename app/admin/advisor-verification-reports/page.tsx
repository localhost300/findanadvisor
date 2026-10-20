import { createClient } from "@/lib/supabase/server";

export default async function AdvisorVerificationReportsPage() {
  const supabase = await createClient();
  if (!supabase)
    return <div className="notice">Connect Supabase to review advisor reports.</div>;

  const { data, error } = await supabase
    .from("advisor_verification_reports")
    .select("id, advisor_reference, issue_type, details, reporter_email, created_at")
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) throw error;

  return (
    <>
      <div className="admin-title">
        <div>
          <span className="eyebrow">Profile accuracy</span>
          <h1>Advisor reports</h1>
          <p className="muted">Review reports about public advisor information.</p>
        </div>
      </div>
      <div className="card data-card">
        <table>
          <thead>
            <tr>
              <th>Received</th>
              <th>Advisor / URL</th>
              <th>Issue</th>
              <th>Details</th>
              <th>Reply email</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((report) => (
              <tr key={report.id}>
                <td>{new Date(report.created_at).toLocaleString()}</td>
                <td>{report.advisor_reference}</td>
                <td>{report.issue_type}</td>
                <td>{report.details}</td>
                <td>{report.reporter_email || "Not provided"}</td>
              </tr>
            ))}
            {!data?.length && (
              <tr>
                <td colSpan={5}>No advisor reports have been submitted.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
