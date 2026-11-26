export interface Service {
  slug: string;
  title: string;
  shortDescription: string;
  icon: string;
  heroTitle: string;
  introduction: string;
  image: string;
  imageAlt: string;
  imageLayout: "right" | "left" | "wide" | "dark" | "portrait";
  features: string[];
  benefits: [string, string, string];
  process: [string, string, string];
  processDetails: [string, string, string];
}

export interface SiteConfig {
  company: {
    name: string;
    tagline: string;
    phone: string;
    whatsapp: string;
    email: string;
    address: string;
    website: string;
    logoPath: string;
  };
  menuItems: { label: string; href: string }[];
  socialLinks: { label: string; href: string }[];
  services: Service[];
}

export const siteConfig: SiteConfig = {
  company: {
    name: "ADD Creatives",
    tagline: "Digital Solutions That Drive Growth",
    phone: "+92 332 4687045",
    whatsapp: "923224687045",
    email: "info@addcreatives.com",
    address:
      "405 E Block PIA Main Boulevard, Block C PIA Housing Scheme, Lahore 54000, Pakistan",
    website: (process.env.NEXT_PUBLIC_SITE_URL || "https://www.addcreatives.com").replace(
      /\/+$/,
      "",
    ),
    logoPath: "",
  },
  menuItems: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  socialLinks: [
    { label: "Instagram", href: "" },
    { label: "Facebook", href: "" },
    { label: "LinkedIn", href: "" },
  ],
  services: [
    {
      slug: "web-design-development",
      title: "Web Design and Development",
      shortDescription:
        "Clear, responsive websites that make it easier for the right people to choose your business.",
      icon: "PanelsTopLeft",
      heroTitle: "Digital experiences that make brands stand out.",
      introduction:
        "We plan and build websites around the people who use them and the goals they need to support. From the first page structure to launch, every decision has a clear job.",
      image: "/images/web-development.jpg",
      imageAlt:
        "A laptop showing a website development workspace, photographed in a bright studio. Illustrative stock image.",
      imageLayout: "right",
      features: [
        "Website strategy and structure",
        "User experience and interface design",
        "Responsive website development",
        "E-commerce development",
        "Search-ready technical foundations",
        "Integrations, testing, and launch support",
      ],
      benefits: [
        "Clearer journeys through the pages that matter",
        "A considered experience across screen sizes",
        "A practical, maintainable foundation for future updates",
      ],
      process: ["Discover", "Design", "Build and launch"],
      processDetails: [
        "We align on your audience, priorities, existing content, and the job the website needs to do.",
        "We shape the structure and visual direction, then refine the details together.",
        "We develop, test, and prepare the site for handover with a clear next-step plan.",
      ],
    },
    {
      slug: "seo",
      title: "SEO",
      shortDescription:
        "Practical search optimisation that helps the people looking for you find you.",
      icon: "Search",
      heroTitle: "Be found. Be relevant. Keep growing.",
      introduction:
        "Search visibility starts with a useful website and a clear understanding of what people are looking for. We focus on practical improvements to technical foundations, content, and local discovery—without promising rankings.",
      image: "/images/seo-analytics.jpg",
      imageAlt:
        "A laptop displaying an analytics dashboard, used as illustrative stock photography rather than client data.",
      imageLayout: "left",
      features: [
        "Technical SEO reviews",
        "Keyword and audience research",
        "On-page optimisation",
        "Content planning and improvement",
        "Local SEO foundations",
        "Measurement and clear reporting",
      ],
      benefits: [
        "A clearer view of technical search priorities",
        "Content aligned with real audience questions",
        "Progress measured without ranking guarantees",
      ],
      process: ["Review", "Prioritise", "Improve and learn"],
      processDetails: [
        "We review your website, content, and search presence to identify useful opportunities.",
        "We agree on the improvements that best fit your audience and available resources.",
        "We make and review changes over time, sharing what the data can and cannot tell us.",
      ],
    },
    {
      slug: "social-media-marketing",
      title: "Social Media Marketing",
      shortDescription:
        "A considered social presence that gives your brand a consistent, useful voice.",
      icon: "MessagesSquare",
      heroTitle: "Make your brand impossible to ignore.",
      introduction:
        "A strong social presence is more than a posting schedule. We bring audience insight, a recognizable point of view, and useful creative together so each channel has a reason to exist.",
      image: "/images/creative-collaboration.jpg",
      imageAlt:
        "A small group reviewing creative work together around a laptop. Illustrative stock photography, not ADD Creatives staff.",
      imageLayout: "wide",
      features: [
        "Social media strategy",
        "Channel and audience planning",
        "Content calendars",
        "Creative development and copy",
        "Publishing support",
        "Community engagement guidance",
        "Performance reviews",
      ],
      benefits: [
        "A consistent voice across selected channels",
        "A manageable plan for creating and publishing content",
        "A review cycle that informs what to do next",
      ],
      process: ["Set the direction", "Create and publish", "Review and refine"],
      processDetails: [
        "We clarify your audience, channels, voice, and the role social should play.",
        "We plan and develop content around a realistic calendar and available assets.",
        "We review audience response and adjust the plan based on useful signals.",
      ],
    },
    {
      slug: "branding-graphic-design",
      title: "Branding and Graphic Design",
      shortDescription:
        "Distinctive visual systems that help your business show up with confidence.",
      icon: "Shapes",
      heroTitle: "Build a brand people remember.",
      introduction:
        "A practical identity gives people a consistent way to recognise and understand your business. We connect positioning, visual direction, and useful brand tools without forcing every touchpoint into the same template.",
      image: "/images/brand-system.jpg",
      imageAlt:
        "A desktop screen showing a visual identity and design system. Illustrative stock image, not ADD Creatives client work.",
      imageLayout: "portrait",
      features: [
        "Brand discovery and positioning",
        "Logo design and identity direction",
        "Colour and typography systems",
        "Marketing collateral",
        "Digital and print applications",
        "Practical brand guidelines",
      ],
      benefits: [
        "A clearer foundation for brand decisions",
        "Flexible visual rules for everyday use",
        "Useful assets your team can apply consistently",
      ],
      process: ["Discover", "Shape", "Apply and refine"],
      processDetails: [
        "We learn about your business, audience, current materials, and the place you want the brand to occupy.",
        "We develop and refine a visual direction that reflects the agreed strategy.",
        "We prepare the identity for real-world use and document the system for your team.",
      ],
    },
    {
      slug: "performance-ads",
      title: "Performance Ads",
      shortDescription:
        "Focused Google and Meta campaigns designed to connect spend with meaningful action.",
      icon: "ChartNoAxesCombined",
      heroTitle: "Creative that captures attention. Campaigns that invite action.",
      introduction:
        "Paid media works best when the audience, offer, creative, and landing experience support the same goal. We plan focused campaigns and use reporting to guide the next decision—not to promise a particular result.",
      image: "/images/campaign-workshop.jpg",
      imageAlt:
        "A team reviewing campaign materials around a table. Illustrative stock photography, not a client campaign.",
      imageLayout: "dark",
      features: [
        "Campaign and conversion planning",
        "Audience and keyword research",
        "Google Ads and Meta Ads",
        "Ad creative and copywriting",
        "Budget and bid management",
        "Measurement and optimisation reviews",
      ],
      benefits: [
        "A campaign plan linked to a clear objective",
        "Creative and landing pages designed to work together",
        "Transparent reporting to support informed adjustments",
      ],
      process: ["Plan", "Launch and learn", "Optimise"],
      processDetails: [
        "We agree the audience, offer, budget, destination, and measures before launch.",
        "We prepare campaign creative and set up tracking for the agreed actions.",
        "We review delivery and make considered changes based on available evidence.",
      ],
    },
    {
      slug: "content-video-production",
      title: "Content and Video Production",
      shortDescription:
        "Useful stories and polished video that make your brand easier to remember.",
      icon: "Clapperboard",
      heroTitle: "Stories that make people stop and look.",
      introduction:
        "Good content starts with a clear story and an understanding of where it will be used. We help shape the idea, plan the production, and prepare visual assets for the formats your audience actually sees.",
      image: "/images/camera-equipment.jpg",
      imageAlt:
        "Camera equipment arranged for a photography shoot. Illustrative stock photography, not ADD Creatives' own production.",
      imageLayout: "left",
      features: [
        "Content strategy and creative concepts",
        "Scripting and storyboarding",
        "Photography direction",
        "Short-form video production",
        "Video editing and motion graphics",
        "Platform-ready exports",
      ],
      benefits: [
        "A story shaped for the intended audience and format",
        "A consistent creative direction across a content set",
        "Ready-to-use assets for agreed channels",
      ],
      process: ["Find the story", "Produce", "Edit and deliver"],
      processDetails: [
        "We define the audience, message, format, and practical production needs.",
        "We create the agreed assets with a clear plan for the shoot or recording.",
        "We edit, refine, and export the final work in formats agreed for your channels.",
      ],
    },
  ],
};
