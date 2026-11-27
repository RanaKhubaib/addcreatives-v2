import type { Metadata } from 'next';
import Preloader from '@/components/sections/preloader';
import Hero from '@/components/sections/hero';
import TrustedMarquee from '@/components/sections/trusted-marquee';
import ServicesBento from '@/components/sections/services-bento';
import Manifesto from '@/components/sections/manifesto';
import { BelowFoldSections } from '@/components/sections/below-fold-sections';
import { defaultMetadata, jsonLdOrganization, jsonLdFaq } from '@/lib/seo';
import { faqs } from '@/data/faq';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'ADD Creatives — Digital Solutions That Drive Growth',
  description:
    'Lahore-based creative and digital agency connecting strategy, design, technology and marketing. Web design, ecommerce, SEO, social media, performance ads, branding and content.',
};

export default function Home() {
  return (
    <>
      <Preloader />
      <main id="main-content">
        <Hero />
        <TrustedMarquee />
        <ServicesBento />
        <Manifesto />
        {/* Below-fold sections: lazy-loaded on approach (see
            below-fold-sections.tsx). FAQ structured data is still inlined
            below, so search engines see it even before the FAQ mounts. */}
        <BelowFoldSections />
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq(faqs)) }}
      />
    </>
  );
}
