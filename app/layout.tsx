import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),
  title: {
    default: "Findanadvisor | Find the right financial advisor",
    template: "%s | Findanadvisor",
  },
  description:
    "Search financial advisors by specialty and location, and find guidance that fits your needs.",
  openGraph: {
    title: "Findanadvisor",
    description: "Find the right financial advisor for you.",
    type: "website",
  },
  twitter: { card: "summary", title: "Findanadvisor" },
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
