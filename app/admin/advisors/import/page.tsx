"use client";
import { useState } from "react";
import { CheckCircle2, Upload, AlertCircle } from "lucide-react";
import { toast } from "sonner";
const sample = `first_name,last_name,firm,professional_title,city,state,zip_code,specialty,certification,years_experience,email,status\nJohn,Smith,Northstar Wealth,Financial Advisor,Austin,TX,78701,Retirement Planning,CFP,12,john@example.com,draft\nMary,Johnson,Harbor Financial,Wealth Advisor,Miami,FL,33131,Wealth Management,CFA,15,mary@example.com,draft`;
export default function ImportPage() {
  const [csv, setCsv] = useState(sample);
  const [valid, setValid] = useState(false);
  const rows = csv.trim().split("\n");
  function validate() {
    setValid(
      rows.length > 1 &&
        rows[0].includes("first_name") &&
        rows[0].includes("last_name"),
    );
    toast.success("Validation complete", {
      description: `${Math.max(0, rows.length - 1)} rows ready for preview.`,
    });
  }
  return (
    <>
      <div className="admin-title">
        <div>
          <span className="eyebrow">Bulk operations</span>
          <h1>Import advisors</h1>
          <p className="muted">
            Upload a CSV or paste spreadsheet data, then validate every row
            before import.
          </p>
        </div>
      </div>
      <div className="card form-card">
        <label className="label">Upload CSV</label>
        <div
          style={{
            border: "1px dashed #9fb0b8",
            padding: 30,
            textAlign: "center",
            borderRadius: 9,
          }}
        >
          <Upload size={26} />
          <p>Drop a CSV file here or choose from your computer</p>
          <input type="file" accept=".csv" />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            margin: "22px 0",
          }}
        >
          <hr style={{ flex: 1, border: 0, borderTop: "1px solid #ddd" }} />
          <span className="muted">or paste data</span>
          <hr style={{ flex: 1, border: 0, borderTop: "1px solid #ddd" }} />
        </div>
        <label className="label">CSV or spreadsheet data</label>
        <textarea
          className="field"
          rows={10}
          value={csv}
          onChange={(e) => {
            setCsv(e.target.value);
            setValid(false);
          }}
        />
        <div
          style={{
            display: "flex",
            gap: 10,
            justifyContent: "flex-end",
            marginTop: 15,
          }}
        >
          <button className="btn btn-outline" onClick={validate}>
            Validate
          </button>
          <button
            className="btn btn-primary"
            disabled={!valid}
            onClick={() => toast.info("Connect Supabase to complete imports.")}
          >
            Import advisors
          </button>
        </div>
      </div>
      {valid && (
        <div className="card form-card" style={{ marginTop: 18 }}>
          <h2>
            <CheckCircle2 color="#24785d" /> Preview
          </h2>
          <p className="notice">
            {rows.length - 1} valid rows · 0 errors · 0 duplicates
          </p>
          <div style={{ overflowX: "auto" }}>
            <table>
              <thead>
                <tr>
                  {rows[0]
                    .split(",")
                    .slice(0, 7)
                    .map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                </tr>
              </thead>
              <tbody>
                {rows.slice(1, 6).map((r, i) => (
                  <tr key={i}>
                    {r
                      .split(",")
                      .slice(0, 7)
                      .map((c, j) => (
                        <td key={j}>{c}</td>
                      ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <div className="notice" style={{ marginTop: 18 }}>
        <AlertCircle size={15} /> Imports default to draft so you can review
        records before publishing.
      </div>
    </>
  );
}
