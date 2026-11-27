import type { Metadata } from 'next';
import { Bricolage_Grotesque, Manrope } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import './globals.css';
import { CustomCursor } from '@/components/effects/cursor';
import { GrainOverlay } from '@/components/effects/grain';
import { RouteTransition } from '@/components/effects/route-transition';
import { ScrollProgress } from '@/components/effects/scroll-progress';
import { AmbientSoundToggle } from '@/components/effects/sound-toggle';
import { CommandPaletteLazy } from '@/components/layout/command-palette-lazy';
import { CookieBanner } from '@/components/layout/cookie-banner';
import { Footer } from '@/components/layout/footer';
import { Nav } from '@/components/layout/nav';
import { WhatsAppFloat } from '@/components/layout/whatsapp-float';

const display = Bricolage_Grotesque({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

const sans = Manrope({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ADD Creatives — Digital Solutions That Drive Growth',
  description:
    'ADD Creatives is a digital agency in Lahore, Pakistan. We design and build websites, brands, and campaigns that help businesses grow.',
  metadataBase: new URL('https://www.addcreatives.com'),
  openGraph: {
    title: 'ADD Creatives — Digital Solutions That Drive Growth',
    description:
      'ADD Creatives is a digital agency in Lahore, Pakistan. We design and build websites, brands, and campaigns that help businesses grow.',
    url: 'https://www.addcreatives.com',
    siteName: 'ADD Creatives',
    type: 'website',
    locale: 'en_PK',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ADD Creatives — Digital Solutions That Drive Growth',
    description:
      'ADD Creatives is a digital agency in Lahore, Pakistan. We design and build websites, brands, and campaigns that help businesses grow.',
  },
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-white font-sans text-ink dark:bg-ink dark:text-white">
        {/* Site is light-only: forcedTheme="light" never adds the `.dark`
            class, and globals.css redefines the `dark:` variant as
            class-based (Tailwind v4's default is `prefers-color-scheme`,
            which would have applied on dark-mode devices regardless).
            Together, no `dark:` rule can ever fire anywhere. */}
        <ThemeProvider attribute="class" defaultTheme="light" forcedTheme="light" enableSystem={false}>
          <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-navy focus:px-4 focus:py-2 focus:text-white"
            >
              Skip to content
            </a>
            <CustomCursor />
            <GrainOverlay />
            <ScrollProgress />
            <Nav />
            {/* Palette loads on first Cmd/Ctrl+K — cmdk is not in first-load JS. */}
            <CommandPaletteLazy />
            {/* Preloader mount point — the preloader component itself comes
                from another agent and mounts into this element. */}
            <div id="preloader-root" />
            <RouteTransition>{children}</RouteTransition>
            <Footer />
            <WhatsAppFloat />
            <CookieBanner />
            <AmbientSoundToggle />
        </ThemeProvider>
      </body>
    </html>
  );
}
