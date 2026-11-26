export type ToolCategory = 'Development' | 'Design' | 'Platform' | 'Marketing' | 'Analytics';

export interface Tool {
  name: string;
  category: ToolCategory;
  note: string;
  /**
   * simple-icons slug for the tool's official brand mark (rendered from the
   * `simple-icons` package). `null` means simple-icons has no entry for the
   * tool — the UI falls back to a neutral monogram tile for that one only.
   * As of simple-icons v16, Adobe's brand icons and Ahrefs were removed
   * from the set, so those four use the fallback.
   */
  icon: string | null;
}

export const tools: Tool[] = [
  {
    name: 'Next.js',
    category: 'Development',
    note: 'Fast, modern websites and web apps.',
    icon: 'nextdotjs',
  },
  {
    name: 'React',
    category: 'Development',
    note: 'Interactive interfaces for the web.',
    icon: 'react',
  },
  {
    name: 'Tailwind CSS',
    category: 'Development',
    note: 'Clean, consistent styling.',
    icon: 'tailwindcss',
  },
  {
    name: 'Node.js',
    category: 'Development',
    note: 'Servers and integrations behind your site.',
    icon: 'nodedotjs',
  },
  {
    name: 'Firebase',
    category: 'Development',
    note: 'Forms, data, and real-time features.',
    icon: 'firebase',
  },
  {
    name: 'Figma',
    category: 'Design',
    note: 'Where every design starts, with you in the loop.',
    icon: 'figma',
  },
  {
    name: 'Vercel',
    category: 'Development',
    note: 'Fast, reliable hosting for modern sites.',
    icon: 'vercel',
  },
  {
    name: 'GitHub',
    category: 'Development',
    note: 'Version control and safe deployments.',
    icon: 'github',
  },
  {
    name: 'Shopify',
    category: 'Platform',
    note: 'Online stores that are easy to run.',
    icon: 'shopify',
  },
  {
    name: 'WordPress',
    category: 'Platform',
    note: 'Flexible sites you can update yourself.',
    icon: 'wordpress',
  },
  {
    name: 'WooCommerce',
    category: 'Platform',
    note: 'Selling on WordPress, your way.',
    icon: 'woocommerce',
  },
  {
    name: 'Google Analytics',
    category: 'Analytics',
    note: 'See how visitors use your site.',
    icon: 'googleanalytics',
  },
  {
    name: 'Google Ads',
    category: 'Marketing',
    note: 'Reach people searching for what you do.',
    icon: 'googleads',
  },
  {
    name: 'Meta Ads',
    category: 'Marketing',
    note: 'Ads on Facebook and Instagram.',
    icon: 'meta',
  },
  {
    name: 'Google Search Console',
    category: 'Analytics',
    note: 'How Google sees and ranks your site.',
    icon: 'googlesearchconsole',
  },
  {
    name: 'Semrush',
    category: 'Analytics',
    note: 'Keyword and competitor research.',
    icon: 'semrush',
  },
  {
    name: 'Ahrefs',
    category: 'Analytics',
    note: 'Backlink and SEO research.',
    icon: null,
  },
  {
    name: 'Adobe Photoshop',
    category: 'Design',
    note: 'Photo and image craft.',
    icon: null,
  },
  {
    name: 'Adobe Illustrator',
    category: 'Design',
    note: 'Logos and vector design.',
    icon: null,
  },
  {
    name: 'Adobe Premiere Pro',
    category: 'Design',
    note: 'Video editing and production.',
    icon: null,
  },
];
