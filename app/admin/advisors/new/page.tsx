import Link from "next/link";
import { createAdvisor } from "../actions";
const Field = ({
  label,
  name,
  type = "text",
  required = false,
  placeholder = "",
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) => (
  <div>
    <label className="label" htmlFor={name}>
      {label}
      {required && " *"}
    </label>
    <input
      className="field"
      id={name}
      name={name}
      type={type}
      required={required}
      placeholder={placeholder}
    />
  </div>
);
export default async function NewAdvisor({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; preview?: string }>;
}) {
  const sp = await searchParams;
  return (
    <>
      <div className="admin-title">
        <div>
          <span className="eyebrow">Directory records</span>
          <h1>Add advisor</h1>
          <p className="muted">
            Create a complete profile, save a draft, or publish it now.
          </p>
        </div>
      </div>
      {sp.error && (
        <p
          className="notice"
          style={{
            borderColor: "#d8b6b6",
            background: "#fff0f0",
            color: "#8c2828",
          }}
        >
          {sp.error}
        </p>
      )}
      {sp.preview && (
        <p className="notice">
          Form validated successfully. Connect Supabase to save this advisor.
        </p>
      )}
      <form action={createAdvisor}>
        <div className="card form-card">
          <h2 style={{ marginTop: 0 }}>Identity & role</h2>
          <div className="form-grid">
            <Field label="First name" name="first_name" required />
            <Field label="Middle name" name="middle_name" />
            <Field label="Last name" name="last_name" required />
            <Field
              label="Display name"
              name="display_name"
              placeholder="Defaults to first + last"
            />
            <Field
              label="Professional title"
              name="professional_title"
              required
            />
            <Field label="Firm" name="firm_name" />
            <div>
              <label className="label">Advisor type</label>
              <select className="field" name="advisor_type">
                <option>Independent Advisor</option>
                <option>Registered Investment Adviser</option>
                <option>Financial Planner</option>
                <option>Wealth Manager</option>
              </select>
            </div>
            <Field label="Profile photo" name="profile_photo" type="file" />
          </div>
        </div>
        <div className="card form-card" style={{ marginTop: 18 }}>
          <h2 style={{ marginTop: 0 }}>Contact & location</h2>
          <div className="form-grid">
            <Field label="Email" name="email" type="email" />
            <Field label="Phone" name="phone" />
            <Field label="Website" name="website" />
            <Field label="LinkedIn" name="linkedin_url" />
            <Field label="Address" name="address" />
            <Field label="City" name="city" required />
            <Field label="State" name="state" required />
            <Field label="ZIP code" name="zip_code" required />
            <Field
              label="Country"
              name="country"
              required
              placeholder="United States"
            />
          </div>
        </div>
        <div className="card form-card" style={{ marginTop: 18 }}>
          <h2 style={{ marginTop: 0 }}>Profile details</h2>
          <div className="form-grid">
            <div className="span-2">
              <label className="label">Short biography *</label>
              <textarea className="field" rows={3} name="short_bio" required />
            </div>
            <div className="span-2">
              <label className="label">Biography *</label>
              <textarea className="field" rows={7} name="biography" required />
            </div>
            <Field
              label="Years of experience"
              name="years_experience"
              type="number"
              required
            />
            <Field
              label="Minimum investment"
              name="minimum_investment"
              type="number"
              required
            />
            <Field label="CRD number" name="crd_number" />
            <Field label="SEC number" name="sec_number" />
            <Field label="Specialties (comma-separated)" name="specialties" />
            <Field
              label="Certifications (comma-separated)"
              name="certifications"
            />
            <Field label="Languages (comma-separated)" name="languages" />
            <Field
              label="Fee structures (comma-separated)"
              name="fee_structures"
            />
          </div>
          <div className="switch-row" style={{ marginTop: 20 }}>
            {[
              ["Accepting new clients", "accepting_new_clients"],
              ["Virtual consultation", "virtual_consultation"],
              ["Fiduciary", "fiduciary"],
              ["Verified", "verified"],
              ["Featured", "featured"],
            ].map(([l, n]) => (
              <label key={n}>
                <input type="checkbox" name={n} /> {l}
              </label>
            ))}
          </div>
        </div>
        <div className="card form-card" style={{ marginTop: 18 }}>
          <h2 style={{ marginTop: 0 }}>Publishing</h2>
          <div className="form-grid">
            <div>
              <label className="label">Status</label>
              <select className="field" name="status">
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
            <Field
              label="External verification URL"
              name="external_verification_url"
            />
            <Field label="SEO title" name="seo_title" />
            <Field label="SEO description" name="seo_description" />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 10,
            marginTop: 20,
          }}
        >
          <Link href="/admin/advisors" className="btn btn-outline">
            Cancel
          </Link>
          <button className="btn btn-outline" type="submit">
            Save draft
          </button>
          <button className="btn btn-primary" type="submit">
            Publish advisor
          </button>
        </div>
      </form>
    </>
  );
}
