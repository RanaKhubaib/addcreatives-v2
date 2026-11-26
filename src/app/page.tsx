import type { Metadata } from 'next';
import Preloader from '@/components/sections/preloader';
import Hero from '@/components/sections/hero';
import TrustedMarquee from '@/components/sections/trusted-marquee';
import ServicesBento from '@/components/sections/services-bento';
import Manifesto from '@/components/sections/manifesto';
import SelectedWork from '@/components/sections/selected-work';
import ProcessSection from '@/components/sections/process-section';
import ResultsNumbers from '@/components/sections/results-numbers';
import { ToolsWall } from '@/components/sections/tools-wall';
import { ProjectPlanner } from '@/components/sections/project-planner';
import { AuditMagnet } from '@/components/sections/audit-magnet';
import { Testimonials } from '@/components/sections/testimonials';
import { BlogPreview } from '@/components/sections/blog-preview';
import { FaqSection } from '@/components/sections/faq-section';
import { FinalCta } from '@/components/sections/final-cta';
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
        <SelectedWork />
        <ProcessSection />
        <ResultsNumbers />
        <ToolsWall />
        <ProjectPlanner />
        <AuditMagnet />
        <Testimonials />
        <BlogPreview />
        <FaqSection />
        <FinalCta />
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
