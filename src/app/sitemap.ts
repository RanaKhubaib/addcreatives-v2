import type { MetadataRoute } from 'next';
import { services } from '@/data/services';
import { caseStudies } from '@/data/case-studies';
import { siteUrl } from '@/lib/seo';

const blogSlugs = [
  'a-practical-guide-to-a-better-agency-website',
  'how-to-choose-the-right-digital-marketing-mix',
  'brand-consistency-without-being-boring',
  'ecommerce-conversion-tips-that-actually-work',
  'local-seo-for-pakistani-businesses',
  'how-to-brief-a-design-agency',
] as const;

const blogDates: Record<string, string> = {
  'a-practical-guide-to-a-better-agency-website': '2026-11-20',
  'how-to-choose-the-right-digital-marketing-mix': '2026-11-21',
  'brand-consistency-without-being-boring': '2026-11-22',
  'ecommerce-conversion-tips-that-actually-work': '2026-11-23',
  'local-seo-for-pakistani-businesses': '2026-11-24',
  'how-to-brief-a-design-agency': '2026-11-25',
};

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${siteUrl}/services`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    ...services.map((service) => ({
      url: `${siteUrl}/services/${service.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    { url: `${siteUrl}/case-studies`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    ...caseStudies.map((study) => ({
      url: `${siteUrl}/case-studies/${study.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    { url: `${siteUrl}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    ...blogSlugs.map((slug) => ({
      url: `${siteUrl}/blog/${slug}`,
      lastModified: new Date(blogDates[slug]),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    { url: `${siteUrl}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${siteUrl}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];
  return entries;
}
