import type { Metadata } from "next";
import { Instrument_Serif, Inter, Sora } from "next/font/google";
import type { ReactNode } from "react";
import { Cursor } from "@/components/site/cursor";
import { Footer } from "@/components/site/footer";
import { Nav } from "@/components/site/nav";
import { siteConfig } from "@/data/site-config";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif-accent",
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
  style: ["italic", "normal"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.company.website),
  title: "ADD Creatives | Digital Solutions That Drive Growth",
  description:
    "ADD Creatives helps ambitious brands grow with thoughtful digital strategy, creative work, and measurable results.",
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: siteConfig.company.website,
    siteName: siteConfig.company.name,
    title: "ADD Creatives | Digital Solutions That Drive Growth",
    description:
      "Thoughtful digital strategy, creative work, and measurable growth for ambitious brands.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ADD Creatives | Digital Solutions That Drive Growth",
    description:
      "Thoughtful digital strategy, creative work, and measurable growth for ambitious brands.",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.company.name,
    url: siteConfig.company.website,
    email: siteConfig.company.email,
    telephone: siteConfig.company.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.company.address,
      addressLocality: "Lahore",
      addressCountry: "PK",
    },
  };

  return (
    <html
      lang="en"
      className={`${sora.variable} ${inter.variable} ${instrumentSerif.variable}`}
    >
      <body className="min-h-screen bg-white font-sans text-ink antialiased">
        <Cursor />
        <Nav />
        {children}
        <Footer />
        <script
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationData).replace(/</g, "\\u003c"),
          }}
          type="application/ld+json"
        />
      </body>
    </html>
  );
}
