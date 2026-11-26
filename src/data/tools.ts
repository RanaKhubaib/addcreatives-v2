export type ToolCategory = 'Development' | 'Design' | 'Platform' | 'Marketing' | 'Analytics';

export interface Tool {
  name: string;
  category: ToolCategory;
  note: string;
  /**
   * simple-icons slug for the tool's official brand mark (rendered from the
   * `simple-icons` package). `null` means simple-icons has no entry for the
   * tool — see `brandTile` below for those four.
   */
  icon: string | null;
  /**
   * Faithful official-style tile for tools simple-icons v16 no longer
   * carries (Adobe's product icons and Ahrefs were removed from the set).
   * Drawn in the brand's own published tile colours — dark tile + light
   * two-letter mark for the Adobe apps, orange lowercase "a" on white
   * for Ahrefs — at the same 48px tile size as the simple-icons marks.
   * These are style recreations in the brands' colours, not the official
   * vector assets.
   */
  brandTile?: {
    /** Tile background (the product's official dark tile colour). */
    bg: string;
    /** Letter colour (the product's official light mark colour). */
    fg: string;
    /** Letters as on the official icon, e.g. "Ps" / "a". */
    label: string;
    /** Tailwind text-size class for the letters. */
    textClass: string;
  };
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
    // Ahrefs anchor orange #FF8800 — verified against Ahrefs' published
    // brand palette (colorcodeguide.com/official/ahrefs: Orange #FF8800,
    // Blue #054ADA). Lowercase "a" is the brand's own mark.
    brandTile: { bg: '#FFFFFF', fg: '#FF8800', label: 'a', textClass: 'text-[22px]' },
  },
  {
    name: 'Adobe Photoshop',
    category: 'Design',
    note: 'Photo and image craft.',
    icon: null,
    // Official Photoshop tile: "Ps" #31A8FF on #001E36 (Adobe Spectrum
    // product colours; confirmed via Adobe brand-colour references).
    brandTile: { bg: '#001E36', fg: '#31A8FF', label: 'Ps', textClass: 'text-[15px]' },
  },
  {
    name: 'Adobe Illustrator',
    category: 'Design',
    note: 'Logos and vector design.',
    icon: null,
    // Official Illustrator tile: "Ai" #FF9A00 on #330000.
    brandTile: { bg: '#330000', fg: '#FF9A00', label: 'Ai', textClass: 'text-[15px]' },
  },
  {
    name: 'Adobe Premiere Pro',
    category: 'Design',
    note: 'Video editing and production.',
    icon: null,
    // Official Premiere Pro tile: "Pr" #EA77FF on #00005B.
    brandTile: { bg: '#00005B', fg: '#EA77FF', label: 'Pr', textClass: 'text-[15px]' },
  },
];
