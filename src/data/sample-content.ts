export interface ContentSection {
  heading: string;
  body: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  isSample: boolean;
  client: string;
  industry: string;
  services: string[];
  result: string;
  coverStyle: string;
  coverImage: string;
  coverImageAlt: string;
  sections: ContentSection[];
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  coverStyle: string;
  coverImage: string;
  coverImageAlt: string;
  sections: ContentSection[];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "the-next-chapter",
    title: "A clearer digital home for a growing brand",
    excerpt:
      "A sample project direction showing how strategy, identity, and web design can work as one.",
    category: "Digital experience",
    isSample: true,
    client: "Illustrative brand",
    industry: "Retail",
    services: ["Brand strategy", "Web design", "Development"],
    result: "A more considered path from first visit to enquiry",
    coverStyle: "from-[#102b56] via-[#2761a8] to-[#a4c7f5]",
    coverImage: "/images/web-development.jpg",
    coverImageAlt:
      "A laptop displaying a website development workspace, used to illustrate this sample concept rather than client work.",
    sections: [
      {
        heading: "The opportunity",
        body: "This sample concept represents a growing retailer whose old website made it difficult for customers to understand the offer and take the next step.",
      },
      {
        heading: "The approach",
        body: "We begin by clarifying the audience, the product story, and the actions that matter. The resulting experience uses a confident visual system, simpler navigation, and clear paths to enquiry.",
      },
      {
        heading: "The outcome",
        body: "The concept demonstrates how a joined-up brand and digital experience can make a business easier to discover, understand, and choose. Replace this illustrative entry with a verified client project before launch.",
      },
    ],
  },
  {
    slug: "making-the-message-clear",
    title: "Turning a complex offer into a simple story",
    excerpt:
      "A sample brand and content direction for a service business ready to explain its value with confidence.",
    category: "Brand and content",
    isSample: true,
    client: "Illustrative brand",
    industry: "Professional services",
    services: ["Branding", "Content strategy", "Social media"],
    result: "One consistent story across every customer touchpoint",
    coverStyle: "from-[#122c50] via-[#516fd0] to-[#eabf9b]",
    coverImage: "/images/brand-system.jpg",
    coverImageAlt:
      "A desktop screen showing a visual identity system, used as illustrative stock photography.",
    sections: [
      {
        heading: "The opportunity",
        body: "When a service is hard to explain, every channel ends up telling a slightly different story. This concept starts by finding the simplest, most useful way to describe the value.",
      },
      {
        heading: "The approach",
        body: "We align the audience, messaging, and visual direction before creating a practical set of assets that can be used across the website and social channels.",
      },
      {
        heading: "The outcome",
        body: "A single, recognizable story gives a team a stronger foundation for campaigns and customer conversations. This is a sample project and should be replaced with approved client work.",
      },
    ],
  },
  {
    slug: "a-smarter-campaign-launch",
    title: "Launching a campaign with a connected plan",
    excerpt:
      "A sample performance-marketing concept connecting useful creative with a focused digital campaign.",
    category: "Growth marketing",
    isSample: true,
    client: "Illustrative brand",
    industry: "Education",
    services: ["Paid media", "Landing page", "Creative"],
    result: "A connected journey from ad click to useful next step",
    coverStyle: "from-[#102946] via-[#148a94] to-[#c3e3d3]",
    coverImage: "/images/campaign-workshop.jpg",
    coverImageAlt:
      "A team reviewing campaign materials, shown as a stock image for an illustrative concept.",
    sections: [
      {
        heading: "The opportunity",
        body: "A campaign performs best when the message, audience, creative, and landing page support the same goal. This sample brief illustrates that joined-up approach.",
      },
      {
        heading: "The approach",
        body: "We define one primary action, develop creative for the audience, and build a landing page that answers questions before asking people to take that action.",
      },
      {
        heading: "The outcome",
        body: "The result is a more coherent campaign that can be measured and improved over time. This illustrative example is not a claim of real client results.",
      },
    ],
  },
];

export const blogPosts: BlogPost[] = [
  {
    slug: "a-practical-guide-to-a-better-agency-website",
    title: "A practical guide to a better agency website",
    excerpt:
      "A useful website does more than look polished. It helps the right people understand what you do and what to do next.",
    category: "Web strategy",
    date: "2026-10-12",
    readTime: "6 min read",
    coverStyle: "from-[#102b56] via-[#2761a8] to-[#a4c7f5]",
    coverImage: "/images/digital-studio.jpg",
    coverImageAlt:
      "A notebook with interface sketches and planning notes, shown as illustrative stock photography.",
    sections: [
      {
        heading: "Start with what visitors need to know",
        body: "Before choosing colours or animations, write down the questions a new visitor needs answered: who you help, what you do, why it matters, and how to begin. Make those answers easy to find.",
      },
      {
        heading: "Give every page a clear job",
        body: "A services page should explain the offer. A case study should show how a problem was approached. A contact page should remove friction. When every page has a purpose, navigation becomes simpler and content gets more useful.",
      },
      {
        heading: "Make the next step obvious",
        body: "Choose one primary action for each page, use plain language, and repeat it where it naturally helps. Avoid turning every paragraph into a sales pitch; clarity is more persuasive than pressure.",
      },
      {
        heading: "Build for phones and accessibility",
        body: "Check the page at small widths, use semantic headings, keep contrast readable, and make interactive elements keyboard-friendly. These improvements help real visitors and make the site easier to maintain.",
      },
    ],
  },
  {
    slug: "how-to-choose-the-right-digital-marketing-mix",
    title: "How to choose the right digital marketing mix",
    excerpt:
      "A simple way to decide whether your next move should be content, search, social, or paid advertising.",
    category: "Digital marketing",
    date: "2026-09-24",
    readTime: "5 min read",
    coverStyle: "from-[#152b4c] via-[#516fd0] to-[#eabf9b]",
    coverImage: "/images/seo-analytics.jpg",
    coverImageAlt:
      "An analytics dashboard on a laptop, shown as illustrative stock photography rather than client data.",
    sections: [
      {
        heading: "Begin with the business goal",
        body: "Choose a clear outcome first: awareness, qualified enquiries, sales, or retention. The right channel depends on the audience and the action you want to make easier.",
      },
      {
        heading: "Match the channel to the audience",
        body: "Search can help when people are already looking for a solution. Social content can build familiarity. Paid campaigns can test a focused offer. These channels work best when their roles are clear.",
      },
      {
        heading: "Make a small, measurable start",
        body: "Select a few meaningful measures before you launch. Review what people do, learn from the signals, and improve the weakest part of the journey rather than changing everything at once.",
      },
    ],
  },
  {
    slug: "brand-consistency-without-being-boring",
    title: "Brand consistency without being boring",
    excerpt:
      "A strong brand system helps your business feel recognizable while still giving creative work room to grow.",
    category: "Branding",
    date: "2026-08-19",
    readTime: "4 min read",
    coverStyle: "from-[#182847] via-[#148a94] to-[#c3e3d3]",
    coverImage: "/images/brand-creative.jpg",
    coverImageAlt:
      "A person using a tablet to review visual design work, shown as illustrative stock photography.",
    sections: [
      {
        heading: "Consistency is a set of signals",
        body: "A recognizable brand is built from repeated choices: tone, type, colour, image style, and the way information is organized. A good system makes those choices easier to repeat.",
      },
      {
        heading: "Create flexible rules",
        body: "Instead of locking every asset into one template, define a few strong principles and show how they can flex. That keeps the brand coherent across different formats and audiences.",
      },
      {
        heading: "Review the whole experience",
        body: "Look at the website, social profiles, proposals, and email together. A practical brand system feels connected without making every touchpoint identical.",
      },
    ],
  },
  {
    slug: "what-to-prepare-before-a-website-project",
    title: "What to prepare before a website project",
    excerpt:
      "A short checklist to help your team make better decisions before design and development begin.",
    category: "Web strategy",
    date: "2026-07-07",
    readTime: "5 min read",
    coverStyle: "from-[#102b56] via-[#26628a] to-[#dbc49d]",
    coverImage: "/images/digital-product.jpg",
    coverImageAlt:
      "A desktop monitor and tablet displaying digital product designs, shown as illustrative stock photography.",
    sections: [
      {
        heading: "Gather what already exists",
        body: "Collect the current website, brand files, product information, analytics access, and any content that already works. It is easier to improve a real starting point than to guess.",
      },
      {
        heading: "Agree on priorities",
        body: "Write down the most important audiences, pages, and actions. Decide what must be ready for launch and what can be improved later.",
      },
      {
        heading: "Choose one decision maker",
        body: "A clear review process helps a project move. Gather stakeholder feedback before sending it, and nominate one person to make final decisions.",
      },
    ],
  },
];
