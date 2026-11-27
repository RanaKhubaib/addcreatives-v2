'use client';

import dynamic from 'next/dynamic';
import { LazySection } from '@/components/sections/lazy-section';

// Below-fold home sections. The dynamic() calls MUST live in this client
// module, not in the server page: a next/dynamic import referenced from a
// Server Component is preloaded as an initial <script> even when the
// component never renders, which defeats the lazy load. Here each chunk
// is only fetched when its <LazySection> observes the viewport and mounts
// the component (ssr:false — these sections never render on the server;
// they already animate in on scroll, and the FAQ structured data stays
// inlined in page.tsx for SEO).
const SelectedWork = dynamic(() => import('@/components/sections/selected-work'), {
  ssr: false,
});
const ProcessSection = dynamic(
  () => import('@/components/sections/process-section'),
  { ssr: false },
);
const ResultsNumbers = dynamic(
  () => import('@/components/sections/results-numbers'),
  { ssr: false },
);
const ToolsWall = dynamic(
  () => import('@/components/sections/tools-wall').then((m) => m.ToolsWall),
  { ssr: false },
);
const ProjectPlanner = dynamic(
  () => import('@/components/sections/project-planner').then((m) => m.ProjectPlanner),
  { ssr: false },
);
const AuditMagnet = dynamic(
  () => import('@/components/sections/audit-magnet').then((m) => m.AuditMagnet),
  { ssr: false },
);
const Testimonials = dynamic(
  () => import('@/components/sections/testimonials').then((m) => m.Testimonials),
  { ssr: false },
);
const BlogPreview = dynamic(
  () => import('@/components/sections/blog-preview').then((m) => m.BlogPreview),
  { ssr: false },
);
const FaqSection = dynamic(
  () => import('@/components/sections/faq-section').then((m) => m.FaqSection),
  { ssr: false },
);
const FinalCta = dynamic(
  () => import('@/components/sections/final-cta').then((m) => m.FinalCta),
  { ssr: false },
);

/**
 * Every below-fold home section, each gated by its own
 * IntersectionObserver (200px rootMargin) with a min-height placeholder
 * to avoid layout shift. Hero, TrustedMarquee, ServicesBento and
 * Manifesto stay static in page.tsx — they are the first paint.
 */
export function BelowFoldSections() {
  return (
    <>
      <LazySection label="selected-work" minHeight={900}>
        <SelectedWork />
      </LazySection>
      <LazySection label="process" minHeight={800}>
        <ProcessSection />
      </LazySection>
      <LazySection label="results" minHeight={400}>
        <ResultsNumbers />
      </LazySection>
      <LazySection label="tools" minHeight={600}>
        <ToolsWall />
      </LazySection>
      <LazySection label="project-planner" minHeight={700}>
        <ProjectPlanner />
      </LazySection>
      <LazySection label="audit" minHeight={600}>
        <AuditMagnet />
      </LazySection>
      <LazySection label="testimonials" minHeight={600}>
        <Testimonials />
      </LazySection>
      <LazySection label="blog" minHeight={700}>
        <BlogPreview />
      </LazySection>
      <LazySection label="faq" minHeight={600}>
        <FaqSection />
      </LazySection>
      <LazySection label="final-cta" minHeight={400}>
        <FinalCta />
      </LazySection>
    </>
  );
}
