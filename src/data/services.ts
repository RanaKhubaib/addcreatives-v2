export type ServiceCategory = 'Build' | 'Grow' | 'Brand';

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface Service {
  slug: string;
  title: string;
  short: string;
  description: string;
  category: ServiceCategory;
  /** Lucide icon key, e.g. "Globe". Resolved to a component at render time. */
  icon: string;
  subServices: string[];
  tools: string[];
  benefits: string[];
  processSteps: string[];
  faqs: ServiceFaq[];
}

const processSteps = ['Discover', 'Define', 'Create', 'Evolve'];

export const services: Service[] = [
  {
    slug: 'web-development',
    title: 'Web Development',
    short: 'Fast, beautiful websites built to turn visitors into customers.',
    description:
      'We plan, design, and build websites that load quickly, look great on every device, and make it easy for visitors to get in touch or buy. Every site is built around your goals — not a template.',
    category: 'Build',
    icon: 'Globe',
    subServices: ['Website strategy', 'UX/UI design', 'Responsive development'],
    tools: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Vercel', 'Figma'],
    benefits: [
      'A website that loads fast and feels effortless to use',
      'Clear calls to action so visitors know exactly what to do next',
      'Easy for your team to update without touching code',
      'Built to rank well on Google from day one',
    ],
    processSteps,
    faqs: [
      {
        question: 'How long does a website take to build?',
        answer:
          'Most business websites take 3–6 weeks from kick-off to launch, depending on the number of pages and features. We give you a clear timeline before we start.',
      },
      {
        question: 'Will I own my website?',
        answer:
          'Yes. You own the website, the domain, and all the content. We hand over everything at launch and show you how to manage it.',
      },
    ],
  },
  {
    slug: 'ecommerce',
    title: 'E-Commerce',
    short: 'Online stores that are easy to shop, easy to manage, and built to sell.',
    description:
      'From product pages to checkout, we build stores that feel smooth for shoppers and simple for you to run. Payments, shipping, and discounts are set up properly, so you can focus on your products.',
    category: 'Build',
    icon: 'ShoppingBag',
    subServices: ['Shopify', 'WooCommerce', 'Custom Next.js stores'],
    tools: ['Shopify', 'WooCommerce', 'WordPress', 'Next.js', 'Stripe'],
    benefits: [
      'A checkout that customers trust and complete',
      'Product pages that show your products at their best',
      'Discounts, shipping, and taxes set up correctly',
      'A store you can manage yourself, day to day',
    ],
    processSteps,
    faqs: [
      {
        question: 'Which platform should I choose — Shopify or WooCommerce?',
        answer:
          'It depends on your products, budget, and how hands-on you want to be. Shopify is the simplest all-in-one option; WooCommerce gives you more control. We recommend the right fit after a short discovery call — never before.',
      },
      {
        question: 'Can you move my existing store to a new platform?',
        answer:
          'Yes. We migrate products, customers, and orders carefully, and we check every page before the new store goes live so nothing is lost.',
      },
    ],
  },
  {
    slug: 'seo',
    title: 'SEO',
    short: 'Get found on Google by the people already looking for what you do.',
    description:
      'We fix the technical issues holding your site back, research the keywords your customers actually search for, and improve your pages so Google — and your visitors — understand what you offer.',
    category: 'Grow',
    icon: 'Search',
    subServices: ['Technical SEO', 'Keyword research', 'On-page SEO'],
    tools: ['Google Search Console', 'Google Analytics', 'Semrush', 'Ahrefs'],
    benefits: [
      'More visitors from Google without paying for every click',
      'A clear picture of which keywords bring you business',
      'Pages that answer real customer questions',
      'Monthly reporting you can actually understand',
    ],
    processSteps,
    faqs: [
      {
        question: 'How long does SEO take to work?',
        answer:
          'SEO is a steady climb, not a switch. Most sites see meaningful movement in 3–6 months. We focus on changes that last rather than quick tricks that fade.',
      },
      {
        question: 'Do you guarantee first-page rankings?',
        answer:
          'No honest agency can guarantee a specific ranking — Google decides that. What we guarantee is the work: fixes, content, and reporting, every month.',
      },
    ],
  },
  {
    slug: 'social-media',
    title: 'Social Media',
    short: 'Social content that keeps your brand in front of the right people.',
    description:
      'We plan and create social content that fits your brand and speaks to your audience — from strategy and content calendars to posts and reels that people actually stop for.',
    category: 'Grow',
    icon: 'Share2',
    subServices: ['Social strategy', 'Audience planning', 'Content calendars'],
    tools: ['Meta Ads', 'Adobe Photoshop', 'Adobe Illustrator', 'Figma'],
    benefits: [
      'A consistent presence without the daily scramble',
      'Content planned around your goals, not guesswork',
      'Posts that look and sound like your brand',
      'A clear view of what is working each month',
    ],
    processSteps,
    faqs: [
      {
        question: 'Which platforms should my business be on?',
        answer:
          'Wherever your customers spend time — usually one or two platforms done well beats five done poorly. We help you choose based on your audience, not trends.',
      },
      {
        question: 'Do you reply to comments and messages for us?',
        answer:
          'We can manage posting and planning; community replies are agreed per project so your customers always get a genuine, on-brand answer.',
      },
    ],
  },
  {
    slug: 'advertising',
    title: 'Paid Advertising',
    short: 'Ads that reach the right people and bring back measurable results.',
    description:
      'We plan and run Google and Meta ad campaigns aimed at real outcomes — enquiries, sales, and sign-ups — not just clicks. Every campaign is tracked, tested, and reported in plain language.',
    category: 'Grow',
    icon: 'Megaphone',
    subServices: ['Campaign planning', 'Audience research', 'Google Ads', 'Meta Ads'],
    tools: ['Google Ads', 'Meta Ads', 'Google Analytics'],
    benefits: [
      'Your budget spent on people likely to buy, not everyone',
      'Ads tested and improved every week, not set and forgotten',
      'Clear reporting: what you spent, what came back',
      'Landing pages that turn clicks into enquiries',
    ],
    processSteps,
    faqs: [
      {
        question: 'How much should I budget for ads?',
        answer:
          'It depends on your market and goals. We recommend a starting budget after understanding your margins and targets — and we never ask you to spend more than the results justify.',
      },
      {
        question: 'How soon will I see results from ads?',
        answer:
          'Paid ads can bring traffic within days of launch, but the first 2–4 weeks are for testing. That is when we learn which audiences and messages convert best.',
      },
    ],
  },
  {
    slug: 'branding',
    title: 'Branding',
    short: 'A brand people remember — from the logo to the smallest detail.',
    description:
      'We shape brands that feel clear and confident: a name and story people understand, a logo that works everywhere, and colours and type that stay consistent across every touchpoint.',
    category: 'Brand',
    icon: 'Palette',
    subServices: ['Brand discovery', 'Logo design', 'Colour/type systems'],
    tools: ['Adobe Illustrator', 'Adobe Photoshop', 'Figma'],
    benefits: [
      'A brand that looks professional everywhere it appears',
      'A logo and colours that work on screen and in print',
      'Clear guidelines so anyone can use your brand correctly',
      'A story your customers can repeat to others',
    ],
    processSteps,
    faqs: [
      {
        question: 'What do I get at the end of a branding project?',
        answer:
          'Your logo in every format you need, a colour and type system, brand guidelines, and the source files — all yours to keep.',
      },
      {
        question: 'Can you refresh my existing brand instead of starting over?',
        answer:
          'Yes. Many clients need a careful refresh, not a reinvention. We keep what already works and fix what does not.',
      },
    ],
  },
  {
    slug: 'content-creation',
    title: 'Content Creation',
    short: 'Photos, video, and words that show your work at its best.',
    description:
      'From campaign shoots to product photography and short-form video, we plan and produce content that makes your brand look like the quality you deliver — then shape it for every channel you use.',
    category: 'Brand',
    icon: 'PenLine',
    subServices: ['Content strategy', 'Scripting', 'Storyboarding', 'Photography direction'],
    tools: ['Adobe Premiere Pro', 'Adobe Photoshop', 'Adobe Illustrator', 'Figma'],
    benefits: [
      'Content planned around a clear message, not random posts',
      'Photos and video that make your products look their best',
      'One shoot, many uses — website, social, and ads',
      'A library of assets you can reuse for months',
    ],
    processSteps,
    faqs: [
      {
        question: 'Do you handle the shoot, or do we need our own photographer?',
        answer:
          'We plan and direct the shoot and work with trusted photographers and videographers, so you deal with one team from idea to finished files.',
      },
      {
        question: 'Who owns the content you create for us?',
        answer: 'You do. All finished photos, videos, and copy are yours to use wherever you like.',
      },
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
