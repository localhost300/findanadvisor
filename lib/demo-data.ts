import type { Advisor } from "@/types";

export const advisors: Advisor[] = [];

export const specialties = [
  [
    "Retirement Planning",
    "Build an income plan designed to last through retirement.",
  ],
  [
    "Investment Management",
    "Align your portfolio with your goals, timeline and risk.",
  ],
  ["Financial Planning", "Create a clear plan for your whole financial life."],
  [
    "Wealth Management",
    "Coordinate investments, planning and long-term strategy.",
  ],
  ["Tax Planning", "Make thoughtful, tax-aware financial decisions."],
  ["Estate Planning", "Prepare a considered plan for your family and legacy."],
  [
    "Insurance Planning",
    "Understand and address the risks your plan may face.",
  ],
  ["College Planning", "Plan ahead for education costs and funding choices."],
  [
    "Small Business Planning",
    "Connect business decisions with personal financial goals.",
  ],
  [
    "High-Net-Worth Planning",
    "Navigate the added complexity of significant wealth.",
  ],
  [
    "Debt Management",
    "Build a practical path toward stronger financial footing.",
  ],
];
export const stateNames: Record<string, string> = {
  tx: "Texas",
  fl: "Florida",
  ga: "Georgia",
  co: "Colorado",
  wa: "Washington",
  il: "Illinois",
  ma: "Massachusetts",
  nc: "North Carolina",
  az: "Arizona",
  ny: "New York",
};
export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
