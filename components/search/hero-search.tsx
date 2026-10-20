"use client";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { specialties, slugify } from "@/lib/demo-data";
export function HeroSearch() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [specialty, setSpecialty] = useState("");
  function go(e: React.FormEvent) {
    e.preventDefault();
    const p = new URLSearchParams();
    if (q) p.set("q", q);
    if (specialty) p.set("specialty", specialty);
    router.push(`/advisors?${p}`);
  }
  return (
    <form className="hero-panel search-grid" onSubmit={go}>
      <div>
        <label className="label" htmlFor="hero-q">
          Who or where are you looking for?
        </label>
        <input
          id="hero-q"
          className="field"
          placeholder="Name, firm, city, state or ZIP"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>
      <div>
        <label className="label" htmlFor="hero-specialty">
          What do you need help with?
        </label>
        <select
          id="hero-specialty"
          className="field"
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
        >
          <option value="">All specialties</option>
          {specialties.map(([s]) => (
            <option key={s} value={slugify(s)}>
              {s}
            </option>
          ))}
        </select>
      </div>
      <button className="btn btn-green" type="submit">
        <Search size={17} /> Find Advisors
      </button>
    </form>
  );
}
