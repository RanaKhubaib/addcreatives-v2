export type ToolCategory = 'Development' | 'Design' | 'Platform' | 'Marketing' | 'Analytics';

export interface Tool {
  name: string;
  category: ToolCategory;
  note: string;
  /**
   * Official SVG logos may be added where licensing allows.
   * `null` means the UI falls back to a neutral icon.
   */
  logo: string | null;
}

export const tools: Tool[] = [
  {
    name: 'Next.js',
    category: 'Development',
    note: 'Fast, modern websites and web apps.',
    logo: null,
  },
  {
    name: 'React',
    category: 'Development',
    note: 'Interactive interfaces for the web.',
    logo: null,
  },
  { name: 'TypeScript', category: 'Development', note: 'Safer, more reliable code.', logo: null },
  { name: 'Tailwind CSS', category: 'Development', note: 'Clean, consistent styling.', logo: null },
  {
    name: 'Node.js',
    category: 'Development',
    note: 'Servers and integrations behind your site.',
    logo: null,
  },
  {
    name: 'Firebase',
    category: 'Development',
    note: 'Forms, data, and real-time features.',
    logo: null,
  },
  {
    name: 'Figma',
    category: 'Design',
    note: 'Where every design starts, with you in the loop.',
    logo: null,
  },
  {
    name: 'Vercel',
    category: 'Development',
    note: 'Fast, reliable hosting for modern sites.',
    logo: null,
  },
  {
    name: 'GitHub',
    category: 'Development',
    note: 'Version control and safe deployments.',
    logo: null,
  },
  {
    name: 'Shopify',
    category: 'Platform',
    note: 'Online stores that are easy to run.',
    logo: null,
  },
  {
    name: 'WordPress',
    category: 'Platform',
    note: 'Flexible sites you can update yourself.',
    logo: null,
  },
  {
    name: 'WooCommerce',
    category: 'Platform',
    note: 'Selling on WordPress, your way.',
    logo: null,
  },
  {
    name: 'Google Analytics',
    category: 'Analytics',
    note: 'See how visitors use your site.',
    logo: null,
  },
  {
    name: 'Google Ads',
    category: 'Marketing',
    note: 'Reach people searching for what you do.',
    logo: null,
  },
  { name: 'Meta Ads', category: 'Marketing', note: 'Ads on Facebook and Instagram.', logo: null },
  {
    name: 'Search Console',
    category: 'Analytics',
    note: 'How Google sees and ranks your site.',
    logo: null,
  },
  {
    name: 'Semrush / Ahrefs',
    category: 'Analytics',
    note: 'Keyword and competitor research.',
    logo: null,
  },
  {
    name: 'Adobe Photoshop / Illustrator / Premiere',
    category: 'Design',
    note: 'Design, photo, and video craft.',
    logo: null,
  },
];
