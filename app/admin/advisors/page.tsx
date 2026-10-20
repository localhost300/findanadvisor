import Link from "next/link";
import { MoreHorizontal, Upload, Download } from "lucide-react";
import { getAdvisors } from "@/lib/data";
export default async function AdminAdvisors({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const list = await getAdvisors({ q, limit: 100 });
  return (
    <>
      <div className="admin-title">
        <div>
          <span className="eyebrow">Directory records</span>
          <h1>Advisors</h1>
          <p className="muted">
            Search, publish and maintain advisor profiles.
          </p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Link href="/admin/advisors/import" className="btn btn-outline">
            <Upload size={16} /> Import
          </Link>
          <Link href="/api/advisors/export" className="btn btn-outline">
            <Download size={16} /> Export
          </Link>
          <Link href="/admin/advisors/new" className="btn btn-primary">
            Add advisor
          </Link>
        </div>
      </div>
      <div className="card data-card">
        <div className="data-toolbar">
          <form style={{ display: "flex", gap: 8, flex: 1 }}>
            <input
              className="field"
              name="q"
              defaultValue={q}
              placeholder="Search advisors instantly"
              style={{ maxWidth: 380 }}
            />
            <button className="btn btn-outline">Search</button>
          </form>
          <select
            className="field"
            aria-label="Filter status"
            style={{ width: 170 }}
          >
            <option>All statuses</option>
            <option>Published</option>
            <option>Draft</option>
            <option>Verified</option>
            <option>Featured</option>
            <option>Archived</option>
          </select>
        </div>
        <table>
          <thead>
            <tr>
              <th>
                <input type="checkbox" aria-label="Select all" />
              </th>
              <th>Name</th>
              <th>Firm</th>
              <th>Location</th>
              <th>Specialties</th>
              <th>Verification</th>
              <th>Status</th>
              <th>Views</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.map((a) => (
              <tr key={a.id}>
                <td>
                  <input
                    type="checkbox"
                    aria-label={`Select ${a.display_name}`}
                  />
                </td>
                <td>
                  <strong>{a.display_name}</strong>
                  <br />
                  <small>{a.credentials.join(", ")}</small>
                </td>
                <td>{a.firm?.name}</td>
                <td>
                  {a.city}, {a.state}
                </td>
                <td>{a.specialties[0]}</td>
                <td>
                  {a.verified ? (
                    <span className="badge badge-green">Verified</span>
                  ) : (
                    <span className="badge">Unverified</span>
                  )}
                </td>
                <td>
                  <span className="badge badge-green">{a.status}</span>
                </td>
                <td>{a.profile_views}</td>
                <td>
                  <Link
                    aria-label={`Edit ${a.display_name}`}
                    href={`/admin/advisors/${a.id}/edit`}
                  >
                    <MoreHorizontal />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
