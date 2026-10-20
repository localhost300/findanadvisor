import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  UserPlus,
  Upload,
  Building2,
  Tags,
  Award,
  Star,
  Mail,
  FileCheck,
  BookOpen,
  BarChart3,
  Settings,
  ExternalLink,
} from "lucide-react";
const items = [
  ["Dashboard", "/admin", LayoutDashboard],
  ["Advisors", "/admin/advisors", Users],
  ["BrokerCheck Reports", "/admin/brokercheck-reports", FileCheck],
  ["Advisor Reports", "/admin/advisor-verification-reports", FileCheck],
  ["Add Advisor", "/admin/advisors/new", UserPlus],
  ["Import Advisors", "/admin/advisors/import", Upload],
  ["Firms", "/admin/coming-soon?section=Firms", Building2],
  ["Specialties", "/admin/coming-soon?section=Specialties", Tags],
  ["Certifications", "/admin/coming-soon?section=Certifications", Award],
  ["Reviews", "/admin/coming-soon?section=Reviews", Star],
  ["Inquiries", "/admin/inquiries", Mail],
  ["Profile Claims", "/admin/coming-soon?section=Claims", FileCheck],
  ["Articles", "/admin/coming-soon?section=Articles", BookOpen],
  ["Analytics", "/admin/coming-soon?section=Analytics", BarChart3],
  ["Settings", "/admin/coming-soon?section=Settings", Settings],
] as const;
export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-shell">
      <aside className="admin-side">
        <Link href="/" className="brand" style={{ color: "white" }}>
          <b
            className="brand-mark"
            style={{ background: "white", color: "#0b2239" }}
          >
            F
          </b>
          <span>Findanadvisor</span>
        </Link>
        <nav className="admin-nav">
          {items.map(([label, href, Icon]) => (
            <Link key={label} href={href}>
              <Icon size={17} />
              <span>{label}</span>
            </Link>
          ))}
        </nav>
      </aside>
      <div className="admin-main">
        <header className="admin-top">
          <strong>Directory administration</strong>
          <Link href="/" className="btn btn-outline">
            <ExternalLink size={16} /> View site
          </Link>
        </header>
        <main className="admin-content">{children}</main>
      </div>
    </div>
  );
}
