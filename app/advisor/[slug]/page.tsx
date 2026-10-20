import { notFound } from "next/navigation";
import Link from "next/link";
import { Bookmark, CheckCircle2, Globe, Mail, MapPin, Phone, Scale, Share2, Video } from "lucide-react";
import { getAdvisor } from "@/lib/data";
import { SiteShell } from "@/components/layout/site-shell";
import { RatingStars } from "@/components/advisors/rating-stars";
import { initials, money } from "@/lib/utils";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const a = await getAdvisor((await params).slug);
  return { title: a ? `${a.display_name}, ${a.credentials.join(", ")} — ${a.city}, ${a.state}` : "Advisor not found", description: a?.short_bio };
}

export default async function AdvisorPage({ params }: { params: Promise<{ slug: string }> }) {
  const a = await getAdvisor((await params).slug);
  if (!a) notFound();
  const jsonLd = { "@context": "https://schema.org", "@type": "FinancialService", name: a.display_name, address: { "@type": "PostalAddress", addressLocality: a.city, addressRegion: a.state }, description: a.short_bio };
  return <SiteShell>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <section className="profile-hero"><div className="container"><div className="advisor-head" style={{ alignItems: "center" }}>
      <div className="avatar" style={{ width: 105, height: 105, fontSize: 30, background: "#dcefe7" }}>{initials(a.display_name)}</div>
      <div><div style={{ display: "flex", alignItems: "center", gap: 9, flexWrap: "wrap" }}><h1 style={{ fontSize: "2.8rem", margin: 0 }}>{a.display_name}</h1>{a.verified && <span className="badge badge-green"><CheckCircle2 size={14} /> Verified profile</span>}</div>
        <p style={{ margin: "3px 0", color: "#cbd9df" }}>{a.credentials.join(", ")} · {a.professional_title} at {a.firm?.name}</p>
        <div style={{ display: "flex", gap: 18, alignItems: "center", flexWrap: "wrap" }}><span><MapPin size={15} /> {a.city}, {a.state}</span><RatingStars rating={a.average_rating} reviews={a.review_count} /><span>{a.years_experience} years experience</span></div>
      </div>
    </div></div></section>
    <div className="container profile-layout"><div>
      <section className="card profile-section"><h2>Overview</h2><p>{a.short_bio}</p><div className="stat-row"><div><span className="muted">Experience</span><strong>{a.years_experience} years</strong></div><div><span className="muted">Minimum</span><strong>{money(a.minimum_investment)}</strong></div><div><span className="muted">Fee structure</span><strong>{a.fee_structures.join(", ")}</strong></div></div></section>
      <section className="card profile-section"><h2>About {a.first_name}</h2><p>{a.biography}</p></section>
      <section className="card profile-section"><h2>Specialties & services</h2><div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>{a.specialties.map(s => <span className="badge badge-green" key={s}>{s}</span>)}</div><h3>Client experience</h3><ul><li>{a.accepting_new_clients ? "Currently accepting new clients" : "Not currently accepting new clients"}</li><li>{a.virtual_consultation ? "Virtual consultations available" : "In-person consultations"}</li><li>Languages: {a.languages.join(", ")}</li></ul></section>
      <section className="card profile-section"><h2>Credentials & disclosures</h2><p><strong>Certifications on profile:</strong> {a.credentials.join(", ")}</p><p className="muted">Credentials should be independently verified with the issuing organization. No disciplinary disclosures are listed for this demo profile.</p></section>
      <section className="card profile-section"><h2>Reviews</h2><RatingStars rating={a.average_rating} reviews={a.review_count} /><p className="muted">Only approved reviews appear publicly. Review content for demo profiles is not displayed.</p></section>
    </div><aside><div className="card contact-card"><h2 style={{ marginTop: 0 }}>Contact {a.first_name}</h2><p className="muted">Share what you’re looking for. There’s no obligation.</p>
      <form style={{ display: "grid", gap: 12 }}><input className="field" aria-label="Name" placeholder="Your name" /><input className="field" type="email" aria-label="Email" placeholder="Email address" /><select className="field" aria-label="Financial goal"><option>What would you like help with?</option>{a.specialties.map(s => <option key={s}>{s}</option>)}</select><textarea className="field" rows={4} aria-label="Message" placeholder="Tell the advisor a little about your goals" /><label style={{ fontSize: 12, display: "flex", gap: 8 }}><input type="checkbox" /> I consent to being contacted about this inquiry.</label><button className="btn btn-green" type="button"><Mail size={16} /> Contact advisor</button></form>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 10 }}><button className="btn btn-outline"><Bookmark size={16} /> Save</button><Link className="btn btn-outline" href={`/compare?ids=${a.id}`}><Scale size={16} /> Compare</Link></div><button className="btn btn-ghost" style={{ width: "100%", marginTop: 7 }}><Share2 size={16} /> Share profile</button><hr style={{ border: 0, borderTop: "1px solid #dbe2e5", margin: "17px 0" }} /><div style={{ fontSize: 14, display: "grid", gap: 9 }}><span><Phone size={14} /> Phone available after inquiry</span><span><Globe size={14} /> Professional website</span>{a.virtual_consultation && <span><Video size={14} /> Virtual meetings available</span>}</div>
    </div></aside></div>
  </SiteShell>;
}
