import type { MetadataRoute } from "next";
import { financialGuides } from "@/lib/guides";
import {
  brokerCheckRecords,
  brokerCheckRetrievedAt,
} from "@/lib/brokercheck-data";
import { specialties, slugify } from "@/lib/demo-data";
import { siteUrl } from "@/lib/site-url";

const tinaCrd = "5889228";
const publicPages = [
  "",
  "/advisors",
  "/specialties",
  "/locations",
  "/guides",
  "/advisor-match",
  "/advisor-verification",
  "/certifications",
  "/for-advisors",
  "/privacy",
  "/terms",
  "/disclaimer",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const tina = brokerCheckRecords.find((record) => record.crd === tinaCrd);

  return [
    ...publicPages.map((path) => ({
      url: new URL(path, siteUrl).toString(),
    })),
    ...financialGuides.map((guide) => ({
      url: new URL(`/guides/${guide.slug}`, siteUrl).toString(),
    })),
    ...specialties.map(([specialty]) => ({
      url: new URL(`/specialty/${slugify(specialty)}`, siteUrl).toString(),
    })),
    ...(tina
      ? [
          {
            url: new URL(`/brokers/${tina.crd}`, siteUrl).toString(),
            lastModified: new Date(
              `${brokerCheckRetrievedAt}T00:00:00.000Z`,
            ),
          },
        ]
      : []),
  ];
}
