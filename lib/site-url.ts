const configuredSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://findanadvisor.icu";

const parsedSiteUrl = new URL(configuredSiteUrl);

if (
  parsedSiteUrl.hostname === "findanadvisor.icu" ||
  parsedSiteUrl.hostname === "www.findanadvisor.icu"
) {
  parsedSiteUrl.protocol = "https:";
}

export const siteUrl = parsedSiteUrl;
