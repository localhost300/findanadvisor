"use client";
import Link from "next/link";
import { Bookmark, CheckCircle2, MapPin, Video } from "lucide-react";
import type { Advisor } from "@/types";
import { initials, money } from "@/lib/utils";
import { RatingStars } from "./rating-stars";
import { toast } from "sonner";
export function AdvisorCard({ advisor }: { advisor: Advisor }) {
  return (
    <article className="card advisor-card">
      <div className="advisor-head">
        <div className="avatar" aria-hidden>
          {initials(advisor.display_name)}
        </div>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <h3>
              <Link href={`/advisor/${advisor.slug}`}>
                {advisor.display_name}
              </Link>
            </h3>
            {advisor.verified && (
              <CheckCircle2
                size={17}
                color="#24785d"
                aria-label="Verified profile"
              />
            )}
          </div>
          <div className="muted" style={{ fontSize: 13 }}>
            {advisor.credentials.join(", ")} · {advisor.professional_title}
          </div>
          <RatingStars
            rating={advisor.average_rating}
            reviews={advisor.review_count}
          />
        </div>
      </div>
      <div>
        <strong>{advisor.firm?.name}</strong>
        <div
          className="muted"
          style={{
            display: "flex",
            gap: 6,
            alignItems: "center",
            fontSize: 14,
          }}
        >
          <MapPin size={14} />
          {advisor.city}, {advisor.state}
          {advisor.virtual_consultation && (
            <>
              <span>·</span>
              <Video size={14} /> Virtual
            </>
          )}
        </div>
      </div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {advisor.specialties.slice(0, 2).map((s) => (
          <span className="badge" key={s}>
            {s}
          </span>
        ))}
      </div>
      <div className="advisor-meta">
        <div>
          <span className="muted">Experience</span>
          <strong>{advisor.years_experience} years</strong>
        </div>
        <div>
          <span className="muted">Minimum</span>
          <strong>{money(advisor.minimum_investment)}</strong>
        </div>
      </div>
      {advisor.accepting_new_clients && (
        <span className="badge badge-green" style={{ alignSelf: "flex-start" }}>
          Accepting new clients
        </span>
      )}
      <div className="card-actions">
        <Link className="btn btn-primary" href={`/advisor/${advisor.slug}`}>
          View profile
        </Link>
        <button
          type="button"
          className="btn btn-outline"
          aria-label={`Save ${advisor.display_name}`}
          onClick={() =>
            toast.success("Advisor saved", {
              description: "Sign in to keep saved advisors across devices.",
            })
          }
        >
          <Bookmark size={17} />
        </button>
      </div>
    </article>
  );
}
