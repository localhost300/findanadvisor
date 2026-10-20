"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  ExternalLink,
  MapPin,
  RotateCcw,
  Search,
  ShieldCheck,
} from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";
import {
  brokerCheckRecords,
  brokerCheckUrl,
} from "@/lib/brokercheck-data";

const registrationOptions = [
  ["any", "Any registration status"],
  ["Broker", "Currently registered broker"],
  ["Investment adviser", "Currently registered investment adviser"],
  ["not-registered", "Not currently registered"],
] as const;

const experienceOptions = [
  [0, "Any experience"],
  [10, "10 or more years"],
  [20, "20 or more years"],
] as const;

const progressSteps = [
  "Reviewing your preferences",
  "Checking available registration details",
  "Comparing office locations and experience",
  "Preparing your matching records",
];

type RegistrationFilter = (typeof registrationOptions)[number][0];

const stateNames: Record<string, string> = {
  AL: "Alabama",
  AZ: "Arizona",
  CA: "California",
  CO: "Colorado",
  FL: "Florida",
  IA: "Iowa",
  IL: "Illinois",
  KS: "Kansas",
  MA: "Massachusetts",
  MI: "Michigan",
  NC: "North Carolina",
  NJ: "New Jersey",
  NY: "New York",
  PA: "Pennsylvania",
  TN: "Tennessee",
  TX: "Texas",
  VA: "Virginia",
  WA: "Washington",
};

function normalize(value: string) {
  return value.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, " ").replace(/\s+/g, " ").trim();
}

export default function AdvisorMatchPage() {
  const [phase, setPhase] = useState<"form" | "checking" | "results">("form");
  const [location, setLocation] = useState("");
  const [registration, setRegistration] = useState<RegistrationFilter>("any");
  const [minimumExperience, setMinimumExperience] = useState(0);
  const [progress, setProgress] = useState(0);

  const matchingRecords = useMemo(() => {
    const locationQuery = normalize(location);
    const locationTokens = locationQuery.split(" ").filter(Boolean);

    return brokerCheckRecords
      .filter((record) => {
        if (registration === "not-registered" && record.registrations.length)
          return false;
        if (
          registration !== "any" &&
          registration !== "not-registered" &&
          !record.registrations.includes(registration)
        )
          return false;

        if (minimumExperience) {
          const years = Number.parseFloat(record.experience || "0");
          if (years < minimumExperience) return false;
        }

        if (locationQuery) {
          const stateCode = locationQuery.toUpperCase();
          if (stateNames[stateCode]) return record.state === stateCode;

          const enteredStateName = Object.entries(stateNames).find(
            ([, name]) => name.toLowerCase() === locationQuery,
          )?.[0];
          if (enteredStateName) return record.state === enteredStateName;

          const stateName = stateNames[record.state || ""] || "";
          const recordLocationTokens = normalize(
            `${record.city || ""} ${record.state || ""} ${stateName}`,
          ).split(" ");
          if (!locationTokens.every((token) => recordLocationTokens.includes(token)))
            return false;
        }

        return true;
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [location, minimumExperience, registration]);

  useEffect(() => {
    if (phase !== "checking") return;

    let step = 0;
    let timer: number;
    const advance = () => {
      step += 1;
      setProgress(step);
      if (step >= progressSteps.length) {
        timer = window.setTimeout(() => setPhase("results"), 450);
      } else {
        timer = window.setTimeout(advance, 450);
      }
    };

    timer = window.setTimeout(advance, 350);
    return () => window.clearTimeout(timer);
  }, [phase]);

  function submitPreferences(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setProgress(0);
    setPhase("checking");
  }

  function resetPreferences() {
    setLocation("");
    setRegistration("any");
    setMinimumExperience(0);
    setProgress(0);
    setPhase("form");
  }

  const matchCount = matchingRecords.length;

  return (
    <SiteShell>
      <main className="match-page">
        <section className="match-hero">
          <div className="container">
            <span className="eyebrow">Advisor record search</span>
            <h1>Find records that fit your preferences.</h1>
            <p>
              Tell us where you are looking and what registration or experience
              matters to you. We’ll compare your answers with the public record
              details available for each professional.
            </p>
          </div>
        </section>

        <section className="match-content">
          <div className="container">
            {phase === "form" && (
              <div className="match-layout">
                <form className="match-form card" onSubmit={submitPreferences}>
                  <div className="match-form-heading">
                    <div>
                      <span className="match-step-label">YOUR PREFERENCES</span>
                      <h2>What are you looking for?</h2>
                    </div>
                    <button
                      className="match-reset-button"
                      type="button"
                      onClick={resetPreferences}
                    >
                      <RotateCcw size={14} /> Clear answers
                    </button>
                  </div>

                  <section className="match-form-section">
                    <div className="match-section-title">
                      <span className="match-section-number">01</span>
                      <div>
                        <h3>Where are you looking?</h3>
                        <p>Enter a city, state abbreviation, or state name.</p>
                      </div>
                    </div>
                    <label className="match-input-wrap" htmlFor="match-location">
                      <MapPin size={17} aria-hidden="true" />
                      <input
                        id="match-location"
                        value={location}
                        onChange={(event) => setLocation(event.target.value)}
                        placeholder="City or state, for example: Boston or MA"
                      />
                    </label>
                  </section>

                  <section className="match-form-section">
                    <div className="match-section-title">
                      <span className="match-section-number">02</span>
                      <div>
                        <h3>Which registration are you looking for?</h3>
                        <p>Choose a registration type shown in the public records.</p>
                      </div>
                    </div>
                    <label className="match-field-label" htmlFor="match-registration">
                      Registration status
                    </label>
                    <select
                      id="match-registration"
                      className="field"
                      value={registration}
                      onChange={(event) =>
                        setRegistration(event.target.value as RegistrationFilter)
                      }
                    >
                      {registrationOptions.map(([value, label]) => (
                        <option key={value} value={value}>{label}</option>
                      ))}
                    </select>
                  </section>

                  <section className="match-form-section">
                    <div className="match-section-title">
                      <span className="match-section-number">03</span>
                      <div>
                        <h3>How much experience?</h3>
                        <p>Use the years shown in each BrokerCheck summary.</p>
                      </div>
                    </div>
                    <label className="match-field-label" htmlFor="match-experience">
                      Minimum years of experience
                    </label>
                    <select
                      id="match-experience"
                      className="field"
                      value={minimumExperience}
                      onChange={(event) =>
                        setMinimumExperience(Number(event.target.value))
                      }
                    >
                      {experienceOptions.map(([value, label]) => (
                        <option key={value} value={value}>{label}</option>
                      ))}
                    </select>
                  </section>

                  <div className="match-form-actions">
                    <button className="btn btn-primary match-submit" type="submit">
                      Find matching records <ArrowRight size={17} />
                    </button>
                  </div>
                </form>

                <aside className="match-aside">
                  <div className="match-aside-card">
                    <span className="match-aside-icon"><Search size={18} /></span>
                    <h2>Matches based on public details</h2>
                    <p>
                      The available records include registration, office
                      location, and reported experience. Those are the details
                      used to filter your results.
                    </p>
                    <div className="match-aside-divider" />
                    <h3>How it works</h3>
                    <ul>
                      <li><span>1</span> Select your preferences</li>
                      <li><span>2</span> Review the matching criteria</li>
                      <li><span>3</span> Open individual records</li>
                    </ul>
                  </div>
                  <div className="match-aside-note">
                    <ShieldCheck size={18} />
                    <p>
                      A directory match is not a recommendation. Confirm every
                      detail with FINRA BrokerCheck.
                    </p>
                  </div>
                </aside>
              </div>
            )}

            {phase === "checking" && (
              <section className="match-processing card" aria-live="polite">
                <span className="match-processing-spinner" aria-hidden="true" />
                <h2>Finding records for you</h2>
                <p>We’re checking the available public information.</p>
                <ul>
                  {progressSteps.map((step, index) => (
                    <li
                      key={step}
                      className={index < progress ? "is-complete" : ""}
                    >
                      <span aria-hidden="true">
                        {index < progress ? <Check size={13} /> : index + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {phase === "results" && (
              <section className="match-results">
                <div className="match-results-heading">
                  <div>
                    <span className="eyebrow">Your matching records</span>
                    <h2>
                      {matchCount
                        ? `${matchCount} ${matchCount === 1 ? "record" : "records"} found`
                        : "No records match those preferences"}
                    </h2>
                    <p>
                      Results reflect only location, registration, and
                      experience information available in BrokerCheck.
                    </p>
                  </div>
                  <button
                    className="btn btn-outline match-adjust"
                    type="button"
                    onClick={() => setPhase("form")}
                  >
                    <RotateCcw size={15} /> Adjust answers
                  </button>
                </div>

                {matchCount ? (
                  <>
                    <div className="match-applied-criteria" aria-label="Applied filters">
                      {location && <span><Check size={14} /> Location: {location}</span>}
                      {registration !== "any" && (
                        <span>
                          <Check size={14} />
                          {registrationOptions.find(([value]) => value === registration)?.[1]}
                        </span>
                      )}
                      {minimumExperience > 0 && (
                        <span><Check size={14} /> {minimumExperience}+ years experience</span>
                      )}
                      {!location && registration === "any" && minimumExperience === 0 && (
                        <span><Check size={14} /> Showing all available records</span>
                      )}
                    </div>
                    <div className="broker-match-grid">
                      {matchingRecords.map((record) => (
                        <article className="card broker-match-card" key={record.crd}>
                          <div className="broker-match-card-heading">
                            <div className="brokercheck-avatar" aria-hidden="true">
                              {record.name.split(/\s+/).slice(0, 2).map((part) => part[0]).join("")}
                            </div>
                            <div>
                              <h3><Link href={`/brokers/${record.crd}`}>{record.name}</Link></h3>
                              <span className="broker-match-registration">
                                {record.registrations.length
                                  ? record.registrations.join(" · ")
                                  : "Not currently registered"}
                              </span>
                            </div>
                          </div>
                          <dl>
                            <div><dt>Firm</dt><dd>{record.firm || "Not listed"}</dd></div>
                            <div>
                              <dt>Location</dt>
                              <dd>{record.city && record.state ? `${record.city}, ${record.state}` : "Not listed"}</dd>
                            </div>
                            <div>
                              <dt>Experience</dt>
                              <dd>{record.experience ? `${record.experience} years` : "See source record"}</dd>
                            </div>
                          </dl>
                          <div className="broker-match-card-actions">
                            <Link className="btn btn-primary" href={`/brokers/${record.crd}`}>
                              View profile
                            </Link>
                            <a
                              href={brokerCheckUrl(record.crd)}
                              target="_blank"
                              rel="noreferrer"
                              aria-label={`View ${record.name} on FINRA BrokerCheck`}
                            >
                              FINRA record <ExternalLink size={14} />
                            </a>
                          </div>
                        </article>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="card match-no-results">
                    <span className="match-aside-icon"><Search size={19} /></span>
                    <h3>Try adjusting your answers</h3>
                    <p>Broaden the location, registration, or experience criteria to see more records.</p>
                    <button className="btn btn-primary" type="button" onClick={resetPreferences}>
                      Start again
                    </button>
                  </div>
                )}
              </section>
            )}
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
