"use client";
import Link from "next/link";
import { Menu, Search } from "lucide-react";
import { useState } from "react";
import { BrandMark } from "./brand-mark";
export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand brand-icon-only" aria-label="Findanadvisor home">
          <BrandMark />
        </Link>
        <nav className="nav" aria-label="Main navigation">
          <Link href="/specialties">Specialties</Link>
          <Link href="/guides">Financial Guides</Link>
          <Link href="/advisor-verification">Advisor Verification</Link>
          <Link href="/for-advisors">For Advisors</Link>
        </nav>
        <div className="nav header-actions">
          <Link className="btn header-cta" href="/advisor-match">
            <Search size={16} /> Find an Advisor
          </Link>
        </div>
        <button
          className="mobile-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen(!open)}
        >
          <Menu />
        </button>
      </div>
      {open && (
        <div className="mobile-navigation" id="mobile-navigation">
          <Link href="/specialties" onClick={() => setOpen(false)}>Specialties</Link>
          <Link href="/guides" onClick={() => setOpen(false)}>Financial Guides</Link>
          <Link href="/advisor-verification" onClick={() => setOpen(false)}>Advisor Verification</Link>
          <Link href="/for-advisors" onClick={() => setOpen(false)}>For Advisors</Link>
          <Link className="btn header-cta" href="/advisor-match" onClick={() => setOpen(false)}>
            <Search size={16} /> Find your advisor
          </Link>
        </div>
      )}
    </header>
  );
}
