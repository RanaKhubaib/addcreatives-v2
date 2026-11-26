import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { AuthProvider } from "@/components/site/auth-provider";
import { BackToTop } from "@/components/site/back-to-top";
import { CursorGlow } from "@/components/site/cursor-glow";
import { ScrollProgress } from "@/components/site/scroll-progress";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { WhatsAppButton } from "@/components/site/whatsapp-button";
import { siteConfig } from "@/data/site-config";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
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

export default function RootLayout({ children }: LayoutProps<"/">) {
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
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="min-h-screen antialiased">
        <AuthProvider>
          <ScrollProgress />
          <CursorGlow />
          <SiteHeader />
          {children}
          <SiteFooter />
          <WhatsAppButton />
          <BackToTop />
        </AuthProvider>
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
