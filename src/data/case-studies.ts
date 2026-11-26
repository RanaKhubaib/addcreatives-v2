// TODO: Replace with real case study — these are sample concepts only.
export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  category: string;
  tags: string[];
  excerpt: string;
  image: string;
  year: string;
  challenge: string;
  approach: string;
  deliverables: string[];
  /** Plain-text outcomes only — no invented metrics or numbers. */
  outcomes: string[];
  gallery: string[];
  /** True while this entry is a sample concept, not a real client project. */
  illustrative: boolean;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'northwind-retail-rebrand',
    title: 'A Fresh Identity for Northwind Retail',
    client: 'Sample concept',
    category: 'Branding',
    tags: ['Brand identity', 'Logo design', 'Guidelines'],
    excerpt:
      'A full brand refresh for a neighbourhood retailer — a clearer story, a modern logo, and a system the whole team can use.',
    image: '/images/brand-creative.jpg',
    year: '2026',
    challenge:
      'The retailer had grown beyond its original look. The logo, colours, and shop materials no longer matched the quality of the products on the shelves, and customers found the brand hard to remember.',
    approach:
      'We started with brand discovery — talking to the owners and regular customers — then built a simple, confident identity around what people already loved about the shop.',
    deliverables: ['Logo suite', 'Colour and type system', 'Brand guidelines', 'Shop signage'],
    outcomes: [
      'A single, consistent look across the shop, packaging, and social media',
      'Staff can create on-brand materials without waiting on a designer',
      'Customers recognise the brand at a glance, online and in person',
    ],
    gallery: [
      '/images/brand-creative.jpg',
      '/images/brand-system.jpg',
      '/images/team-strategy.jpg',
    ],
    illustrative: true,
  },
  {
    slug: 'atlas-fitness-online-store',
    title: 'Atlas Fitness: From Gym Floor to Online Store',
    client: 'Sample concept',
    category: 'E-Commerce',
    tags: ['Shopify', 'Store design', 'Checkout'],
    excerpt:
      'A fitness studio selling classes and gear in one place — a store that is as easy to use as the gym is to join.',
    image: '/images/digital-product.jpg',
    year: '2026',
    challenge:
      'The studio sold memberships in person and merchandise through messages. There was no single place to browse, buy, or book — and the team was spending hours answering the same questions.',
    approach:
      'We built one store for classes, memberships, and products, with a checkout that takes minutes to complete and a dashboard the team can manage between sessions.',
    deliverables: [
      'Shopify store',
      'Product photography direction',
      'Class booking flow',
      'Email setup',
    ],
    outcomes: [
      'Customers can join, book, and buy without messaging the team first',
      'The team spends less time on admin and more time coaching',
      'The store works the same on phones, tablets, and desktops',
    ],
    gallery: [
      '/images/digital-product.jpg',
      '/images/web-development.jpg',
      '/images/digital-studio.jpg',
    ],
    illustrative: true,
  },
  {
    slug: 'bloom-skincare-launch-campaign',
    title: 'Bloom Skincare: A Launch Campaign That Felt Like the Brand',
    client: 'Sample concept',
    category: 'Content & Campaigns',
    tags: ['Campaign', 'Photography', 'Social media'],
    excerpt:
      'A launch campaign for a new skincare range — photography, short video, and social content built around one clear idea.',
    image: '/images/campaign-workshop.jpg',
    year: '2026',
    challenge:
      'A new skincare range was ready, but the launch had no story. Product shots alone would not explain why this range was different from everything else on the shelf.',
    approach:
      'We built the campaign around a single idea — honest, everyday skincare — and planned one shoot that produced photos, video, and social content for the whole launch.',
    deliverables: [
      'Campaign concept',
      'Product photography',
      'Short-form video',
      'Social content calendar',
    ],
    outcomes: [
      'One shoot produced assets for the website, social media, and ads',
      'The launch had a clear story customers could understand in seconds',
      'The brand now has a content library it can reuse for months',
    ],
    gallery: [
      '/images/campaign-workshop.jpg',
      '/images/camera-equipment.jpg',
      '/images/film-production.jpg',
    ],
    illustrative: true,
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}
