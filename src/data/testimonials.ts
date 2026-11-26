import { siteConfig } from './site-config';

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
  /** True while this is placeholder copy, not a real client quote. */
  placeholder: boolean;
}

// TODO: Replace with real client testimonials (with permission).
export const testimonials: Testimonial[] = [
  {
    name: 'Ayesha Khan',
    role: 'Founder',
    company: 'Bloom Skincare',
    quote:
      'ADD Creatives took our scattered ideas and turned them into a brand we are proud to show everywhere. The launch felt effortless on our side.',
    rating: 5,
    placeholder: true,
  },
  {
    name: 'Danish Ali',
    role: 'Owner',
    company: 'Atlas Fitness',
    quote:
      'Our new store finally works the way our gym does — simple, fast, and easy for customers. The team answers quickly and explains everything clearly.',
    rating: 5,
    placeholder: true,
  },
  {
    name: 'Sara Malik',
    role: 'Marketing Manager',
    company: 'Northwind Retail',
    quote:
      'They rebuilt our website and our social content in one project, and it all feels like one brand now. Our customers notice the difference.',
    rating: 5,
    placeholder: true,
  },
];

/** Re-exported from site config: testimonials stay hidden until real quotes are approved. */
export const SHOW_TESTIMONIALS = siteConfig.features.SHOW_TESTIMONIALS;
