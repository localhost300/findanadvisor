import {
  advisors as demoAdvisors,
  specialties,
  slugify,
  stateNames,
} from "@/lib/demo-data";
import { createClient } from "@/lib/supabase/server";
import type { Advisor } from "@/types";
const normalizeSearch = (value: string) =>
  value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();

export async function getAdvisors(filters?: {
  q?: string;
  location?: string;
  state?: string;
  specialty?: string;
  credential?: string;
  feeStructure?: string;
  verified?: boolean;
  accepting?: boolean;
  virtual?: boolean;
  fiduciary?: boolean;
  sort?: string;
  limit?: number;
}): Promise<Advisor[]> {
  const sb = await createClient();
  const specialtyName = specialties.find(
    ([name]) => slugify(name) === filters?.specialty,
  )?.[0] ?? filters?.specialty;
  const stateCode = Object.entries(stateNames).find(
    ([, name]) => name.toLowerCase() === filters?.location?.trim().toLowerCase(),
  )?.[0];
  if (sb) {
    const safeFilterValue = (value: string) =>
      value
        .replace(/[^\p{L}\p{N}\s]/gu, " ")
        .replace(/\s+/g, " ")
        .trim();
    let q = sb
      .from("advisors_public")
      .select("*")
      .eq("is_demo", false);
    if (filters?.q && safeFilterValue(filters.q))
      q = q.or(
        `display_name.ilike.%${safeFilterValue(filters.q)}%,firm_name.ilike.%${safeFilterValue(filters.q)}%,search_document.wfts.${safeFilterValue(filters.q)}`,
      );
    if (filters?.location && safeFilterValue(filters.location)) {
      if (stateCode) q = q.eq("state", stateCode.toUpperCase());
      else
        q = q.textSearch(
          "search_document",
          safeFilterValue(filters.location),
          { type: "websearch" },
        );
    }
    if (filters?.state) q = q.eq("state", filters.state.toUpperCase());
    if (specialtyName) q = q.contains("specialties", [specialtyName]);
    if (filters?.credential) q = q.contains("credentials", [filters.credential]);
    if (filters?.feeStructure)
      q = q.contains("fee_structures", [filters.feeStructure]);
    if (filters?.verified) q = q.eq("verified", true);
    if (filters?.accepting) q = q.eq("accepting_new_clients", true);
    if (filters?.virtual) q = q.eq("virtual_consultation", true);
    if (filters?.fiduciary) q = q.eq("fiduciary", true);
    if (filters?.sort === "rating")
      q = q.order("average_rating", { ascending: false });
    if (filters?.sort === "experience")
      q = q.order("years_experience", { ascending: false });
    if (filters?.sort === "name")
      q = q.order("display_name", { ascending: true });
    q = q.limit(filters?.limit || 20);
    const { data, error } = await q;
    if (error) throw error;
    if (data) return data as Advisor[];
  }
  let list = [...demoAdvisors];
  const needle = filters?.q ? normalizeSearch(filters.q) : "";
  if (needle)
    list = list.filter((a) =>
      normalizeSearch(
        [
          a.display_name,
          a.firm?.name,
          a.city,
          a.state,
          stateNames[a.state.toLowerCase()],
          ...a.specialties,
          ...a.credentials,
        ]
          .filter(Boolean)
          .join(" "),
      ).includes(needle),
    );
  const location = filters?.location ? normalizeSearch(filters.location) : "";
  if (location)
    list = list.filter((a) =>
      normalizeSearch(
        [a.city, a.state, a.zip_code, stateNames[a.state.toLowerCase()]]
          .filter(Boolean)
          .join(" "),
      ).includes(location),
    );
  if (filters?.state)
    list = list.filter(
      (a) => a.state.toLowerCase() === filters.state!.toLowerCase(),
    );
  if (filters?.specialty) {
    const specialty = specialtyName?.toLowerCase();
    list = list.filter((a) =>
      a.specialties.some((value) => value.toLowerCase() === specialty),
    );
  }
  if (filters?.credential)
    list = list.filter((a) =>
      a.credentials.some(
        (value) => value.toLowerCase() === filters.credential!.toLowerCase(),
      ),
    );
  if (filters?.feeStructure)
    list = list.filter((a) =>
      a.fee_structures.some(
        (value) =>
          value.toLowerCase() === filters.feeStructure!.toLowerCase(),
      ),
    );
  if (filters?.verified) list = list.filter((a) => a.verified);
  if (filters?.accepting) list = list.filter((a) => a.accepting_new_clients);
  if (filters?.virtual) list = list.filter((a) => a.virtual_consultation);
  if (filters?.fiduciary) list = list.filter((a) => a.fiduciary);
  if (filters?.sort === "rating")
    list.sort((a, b) => b.average_rating - a.average_rating);
  if (filters?.sort === "experience")
    list.sort((a, b) => b.years_experience - a.years_experience);
  if (filters?.sort === "name")
    list.sort((a, b) => a.display_name.localeCompare(b.display_name));
  return list.slice(0, filters?.limit || 20);
}
export async function getAdvisor(slug: string) {
  const sb = await createClient();
  if (sb) {
    const { data } = await sb
      .from("advisors_public")
      .select("*")
      .eq("is_demo", false)
      .eq("slug", slug)
      .single();
    if (data) return data as Advisor;
  }
  return demoAdvisors.find((a) => a.slug === slug) || null;
}
