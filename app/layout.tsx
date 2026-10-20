import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { siteUrl } from "@/lib/site-url";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const metadata: Metadata = {
  metadataBase: siteUrl,
  applicationName: "Findanadvisor",
  title: {
    default: "Findanadvisor | Financial Advisor Records & Guides",
    template: "%s | Findanadvisor",
  },
  description:
    "Explore financial professional records sourced from FINRA BrokerCheck, browse by location, and use practical guides to make informed decisions.",
  openGraph: {
    title: "Findanadvisor | Financial Advisor Records & Guides",
    description:
      "Explore financial professional records sourced from FINRA BrokerCheck and practical guides for making informed decisions.",
    type: "website",
    siteName: "Findanadvisor",
    url: siteUrl,
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Findanadvisor | Financial Advisor Records & Guides",
    description:
      "Explore public financial professional records and practical guides from Findanadvisor.",
  },
  icons: { icon: "/favicon.svg" },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={geist.variable} data-scroll-behavior="smooth">
      <body>
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
