import type { Metadata } from 'next';
import { siteConfig } from '@/data/site-config';
import type { Service } from '@/data/services';

/** Canonical base URL for the public site. */
export const siteUrl = 'https://www.addcreatives.com';

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `ADD Creatives — ${siteConfig.tagline}`,
    template: '%s | ADD Creatives',
  },
  description: `${siteConfig.tagline}. Web development, e-commerce, SEO, social media, advertising, branding and content creation — built in Lahore, for businesses everywhere.`,
  openGraph: {
    type: 'website',
    siteName: 'ADD Creatives',
    url: siteUrl,
    title: `ADD Creatives — ${siteConfig.tagline}`,
    description: `${siteConfig.tagline}. Web development, e-commerce, SEO, social media, advertising, branding and content creation.`,
  },
  twitter: {
    card: 'summary_large_image',
    title: `ADD Creatives — ${siteConfig.tagline}`,
    description: `${siteConfig.tagline}. Web development, e-commerce, SEO, social media, advertising, branding and content creation.`,
  },
};

/** Minimal shape a blog post needs for its Article JSON-LD. */
export interface ArticlePost {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  image: string;
  author?: string;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * Organization + LocalBusiness JSON-LD for the homepage / global layout.
 * sameAs is intentionally empty: the social profile URLs are still
 * placeholders in site-config and must not be published until real.
 */
export function jsonLdOrganization(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness'],
    name: 'ADD Creatives',
    description: siteConfig.tagline,
    url: siteUrl,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '405 E Block PIA Main Boulevard, Block C PIA Housing Scheme',
      addressLocality: 'Lahore',
      postalCode: '54000',
      addressCountry: 'PK',
    },
    sameAs: [],
    openingHours: 'Mo-Sa 10:00-19:00',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: siteConfig.phone,
      email: siteConfig.email,
      contactType: 'sales',
      areaServed: 'PK',
      availableLanguage: ['English', 'Urdu'],
    },
  };
}

/** Service JSON-LD for a single service page. */
export function jsonLdService(service: Service): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.description,
    url: `${siteUrl}/services/${service.slug}`,
    provider: {
      '@type': 'Organization',
      name: 'ADD Creatives',
      url: siteUrl,
      telephone: siteConfig.phone,
      email: siteConfig.email,
    },
    areaServed: {
      '@type': 'Country',
      name: 'Pakistan',
    },
    serviceType: service.title,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${service.title} services`,
      itemListElement: service.subServices.map((sub, index) => ({
        '@type': 'Offer',
        position: index + 1,
        itemOffered: {
          '@type': 'Service',
          name: sub,
        },
      })),
    },
  };
}

/** BlogPosting JSON-LD for a single blog article page. */
export function jsonLdArticle(post: ArticlePost): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    url: `${siteUrl}/blog/${post.slug}`,
    datePublished: post.date,
    dateModified: post.date,
    image: `${siteUrl}${post.image}`,
    author: {
      '@type': 'Organization',
      name: post.author ?? 'ADD Creatives Team',
      url: siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'ADD Creatives',
      url: siteUrl,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/blog/${post.slug}`,
    },
  };
}

/** FAQPage JSON-LD for a list of question/answer pairs. */
export function jsonLdFaq(faqs: FaqItem[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/** BreadcrumbList JSON-LD for a page's breadcrumb trail. */
export function jsonLdBreadcrumb(items: BreadcrumbItem[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${siteUrl}${item.url}`,
    })),
  };
}
