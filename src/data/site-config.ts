export const siteConfig = {
  companyName: 'ADD Creatives',
  tagline: 'Digital Solutions That Drive Growth',
  phone: '+92 332 4687045',
  whatsapp: '+92 322 4687045',
  whatsappUrl: 'https://wa.me/923224687045',
  email: 'info@addcreatives.com',
  address: '405 E Block PIA Main Boulevard, Block C PIA Housing Scheme, Lahore 54000, Pakistan',
  website: 'www.addcreatives.com',
  hours: 'Mon–Sat, 10:00–19:00 PKT',
  socials: {
    // TODO: Replace "#" placeholders with the real profile URLs.
    instagram: '#',
    facebook: '#',
    linkedin: '#',
    x: '#',
    youtube: '#',
  },
  features: {
    SHOW_CLIENT_LOGOS: false,
    SHOW_STATS: false,
    SHOW_TESTIMONIALS: false,
  },
  analytics: {
    gaId: process.env.NEXT_PUBLIC_GA_ID ?? '',
    metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID ?? '',
  },
} as const;

export type SiteConfig = typeof siteConfig;
