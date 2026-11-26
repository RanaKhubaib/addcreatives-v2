import { siteConfig } from './site-config';

export interface Client {
  name: string;
  industry: string;
  /** True while this is a placeholder name, not a real client. */
  placeholder: boolean;
}

// TODO: Replace these placeholder names with real clients (with permission).
export const clients: Client[] = [
  { name: 'Northwind Retail', industry: 'Retail', placeholder: true },
  { name: 'Atlas Fitness', industry: 'Health & Fitness', placeholder: true },
  { name: 'Bloom Skincare', industry: 'Beauty', placeholder: true },
  { name: 'Orbit SaaS', industry: 'Software', placeholder: true },
  { name: 'Khan Textiles', industry: 'Textiles', placeholder: true },
  { name: 'Lumen Cafe', industry: 'Hospitality', placeholder: true },
];

/** Re-exported from site config: client logos stay hidden until real logos are approved. */
export const SHOW_CLIENT_LOGOS = siteConfig.features.SHOW_CLIENT_LOGOS;
