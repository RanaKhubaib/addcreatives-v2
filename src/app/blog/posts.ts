import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

export interface BlogPostMeta {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  /** True when no MDX file exists yet — the post is a planned title only. */
  comingSoon: boolean;
}

export interface BlogPost extends BlogPostMeta {
  content: string;
}

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

/**
 * Fallback list used when /content/blog/*.mdx do not exist yet.
 * Titles and slugs come from the content brief; posts are marked coming soon.
 */
// TODO: Remove this fallback once the MDX posts in /content/blog/ are written.
const FALLBACK_POSTS: BlogPostMeta[] = [
  {
    slug: 'a-practical-guide-to-a-better-agency-website',
    title: 'A Practical Guide to a Better Agency Website',
    excerpt: 'What makes an agency website actually work — clear services, honest proof, and a next step a visitor can take.',
    category: 'Web Design',
    date: '',
    comingSoon: true,
  },
  {
    slug: 'how-to-choose-the-right-digital-marketing-mix',
    title: 'How to Choose the Right Digital Marketing Mix',
    excerpt: 'SEO, ads, social, and content all compete for the same budget. Here is how to pick the mix that fits your goals.',
    category: 'Marketing',
    date: '',
    comingSoon: true,
  },
  {
    slug: 'brand-consistency-without-being-boring',
    title: 'Brand Consistency Without Being Boring',
    excerpt: 'Staying recognisable does not mean repeating yourself. How to keep a brand consistent and still interesting.',
    category: 'Branding',
    date: '',
    comingSoon: true,
  },
  {
    slug: 'ecommerce-conversion-tips-that-actually-work',
    title: 'E-Commerce Conversion Tips That Actually Work',
    excerpt: 'Small, practical changes to product pages and checkout that help more visitors become customers.',
    category: 'E-Commerce',
    date: '',
    comingSoon: true,
  },
  {
    slug: 'local-seo-for-pakistani-businesses',
    title: 'Local SEO for Pakistani Businesses',
    excerpt: 'How local businesses in Pakistan can show up when nearby customers search for what they offer.',
    category: 'SEO',
    date: '',
    comingSoon: true,
  },
  {
    slug: 'how-to-brief-a-design-agency',
    title: 'How to Brief a Design Agency',
    excerpt: 'A good brief saves weeks. What to include before you ask an agency for a quote.',
    category: 'Business',
    date: '',
    comingSoon: true,
  },
];

function readMdxSlugs(): string[] {
  try {
    return fs
      .readdirSync(BLOG_DIR)
      .filter((file) => file.endsWith('.mdx'))
      .map((file) => file.replace(/\.mdx$/, ''));
  } catch {
    return [];
  }
}

function parsePostFile(slug: string): BlogPost | null {
  try {
    const raw = fs.readFileSync(path.join(BLOG_DIR, `${slug}.mdx`), 'utf8');
    const { data, content } = matter(raw);
    const record = data as Record<string, unknown>;
    return {
      slug,
      title: typeof record.title === 'string' ? record.title : slug,
      excerpt:
        typeof record.excerpt === 'string'
          ? record.excerpt
          : typeof record.description === 'string'
            ? record.description
            : '',
      category: typeof record.category === 'string' ? record.category : 'General',
      date: typeof record.date === 'string' ? record.date : '',
      comingSoon: false,
      content,
    };
  } catch {
    return null;
  }
}

export function getAllPostSlugs(): string[] {
  const mdxSlugs = readMdxSlugs();
  const slugs = new Set([...FALLBACK_POSTS.map((post) => post.slug), ...mdxSlugs]);
  return Array.from(slugs);
}

export function getAllPosts(): BlogPostMeta[] {
  const mdxSlugs = readMdxSlugs();
  if (mdxSlugs.length === 0) return FALLBACK_POSTS;
  const posts: BlogPostMeta[] = [];
  for (const slug of getAllPostSlugs()) {
    const post = parsePostFile(slug);
    if (post) {
      posts.push({
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        category: post.category,
        date: post.date,
        comingSoon: post.comingSoon,
      });
    } else {
      const fallback = FALLBACK_POSTS.find((item) => item.slug === slug);
      if (fallback) posts.push(fallback);
    }
  }
  posts.sort((a, b) => (a.date && b.date ? b.date.localeCompare(a.date) : 0));
  return posts;
}

export function getPost(slug: string): BlogPost | null {
  return parsePostFile(slug);
}

export function getFallbackPost(slug: string): BlogPostMeta | undefined {
  return FALLBACK_POSTS.find((post) => post.slug === slug);
}

export function estimateReadingMinutes(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

export function extractHeadings(content: string): { id: string; text: string }[] {
  const headings: { id: string; text: string }[] = [];
  for (const match of content.matchAll(/^##\s+(.+)$/gm)) {
    const text = match[1].trim();
    headings.push({ id: slugifyHeading(text), text });
  }
  return headings;
}
