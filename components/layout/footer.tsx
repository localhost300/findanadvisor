import Link from "next/link";
import { BrandMark } from "./brand-mark";
export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="brand" style={{ color: "white" }}>
              <BrandMark />
              <span>Findanadvisor</span>
            </div>
            <p style={{ maxWidth: 390 }}>
              Independent guidance to help you find a financial advisor who
              fits your needs.
            </p>
          </div>
          <div>
            <h3>Explore</h3>
            <Link href="/advisors">Find an advisor</Link>
            <Link href="/specialties">Specialties</Link>
          </div>
          <div>
            <h3>Resources</h3>
            <Link href="/guides">Financial guides</Link>
            <Link href="/for-advisors">For advisors</Link>
            <Link href="/advisor-verification">Advisor verification</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Findanadvisor. All rights reserved.</span>
          <div className="footer-legal-links">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
