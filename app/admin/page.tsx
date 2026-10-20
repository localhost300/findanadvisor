import Link from "next/link";
import {
  Users,
  CheckCircle2,
  FileClock,
  ShieldCheck,
  Star,
  FileCheck,
  Mail,
  Eye,
} from "lucide-react";
import { advisors } from "@/lib/demo-data";
export default function AdminDashboard() {
  const stats = [
    ["Total advisors", advisors.length, Users],
    ["Published", advisors.length, CheckCircle2],
    ["Drafts", 0, FileClock],
    ["Verified", advisors.filter((a) => a.verified).length, ShieldCheck],
    ["Pending reviews", 4, Star],
    ["Pending claims", 2, FileCheck],
    ["Total inquiries", 18, Mail],
    ["Profile views", "12.8k", Eye],
  ] as const;
  return (
    <>
      <div className="admin-title">
        <div>
          <span className="eyebrow">Overview</span>
          <h1>Good morning</h1>
          <p className="muted">
            Here’s what’s happening across your directory.
          </p>
        </div>
        <Link href="/admin/advisors/new" className="btn btn-primary">
          Add advisor
        </Link>
      </div>
      <div className="stat-grid">
        {stats.map(([label, value, Icon]) => (
          <div className="card stat-card" key={label}>
            <Icon size={19} color="#24785d" />
            <strong>{value}</strong>
            <span className="muted">{label}</span>
          </div>
        ))}
      </div>
      <div className="card data-card">
        <div className="data-toolbar">
          <div>
            <strong>Most viewed advisors</strong>
            <div className="muted" style={{ fontSize: 13 }}>
              Last 30 days
            </div>
          </div>
          <Link href="/admin/advisors" className="btn btn-outline">
            Manage advisors
          </Link>
        </div>
        <table>
          <thead>
            <tr>
              <th>Advisor</th>
              <th>Location</th>
              <th>Status</th>
              <th>Views</th>
            </tr>
          </thead>
          <tbody>
            {advisors.slice(0, 6).map((a) => (
              <tr key={a.id}>
                <td>
                  <strong>{a.display_name}</strong>
                  <br />
                  <span className="muted">{a.firm?.name}</span>
                </td>
                <td>
                  {a.city}, {a.state}
                </td>
                <td>
                  <span className="badge badge-green">Published</span>
                </td>
                <td>{a.profile_views}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
