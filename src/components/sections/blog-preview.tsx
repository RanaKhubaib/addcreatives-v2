"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";

/**
 * Blog preview — featured post + two cards.
 *
 * TODO: wire to MDX frontmatter when available. Blog posts live as MDX in
 * /content/blog/ (written by another agent); until that data is exposed,
 * this section reads a small local list of slugs/titles/excerpts below.
 * Keep this list minimal and in sync with the real posts when they land.
 */

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
}

const POSTS: BlogPost[] = [
  {
    slug: "a-practical-guide-to-a-better-agency-website",
    title: "A practical guide to a better agency website",
    excerpt:
      "What makes a website actually bring in work — clear services, honest proof, and one obvious next step. A checklist you can run on your own site today.",
    category: "Websites",
    readTime: "6 min read",
    date: "24 Nov 2026",
    image: "/images/web-development.jpg",
  },
  {
    slug: "how-to-choose-the-right-digital-marketing-mix",
    title: "How to choose the right digital marketing mix",
    excerpt:
      "SEO, ads, and social all work — but not all at once, and not for every business. How to pick the mix that fits your budget and your customers.",
    category: "Marketing",
    readTime: "5 min read",
    date: "18 Nov 2026",
    image: "/images/digital-studio.jpg",
  },
  {
    slug: "brand-consistency-without-being-boring",
    title: "Brand consistency without being boring",
    excerpt:
      "Staying recognisable without repeating yourself: a simple system for colours, type, and tone that keeps every post feeling like you.",
    category: "Branding",
    readTime: "4 min read",
    date: "11 Nov 2026",
    image: "/images/brand-system.jpg",
  },
  {
    slug: "ecommerce-conversion-tips-that-work-for-small-stores",
    title: "Ecommerce conversion tips that work for small stores",
    excerpt:
      "Small fixes with outsized returns: clearer product pages, honest shipping, and a checkout that stops losing people at the last step.",
    category: "Ecommerce",
    readTime: "5 min read",
    date: "4 Nov 2026",
    image: "/images/digital-product.jpg",
  },
  {
    slug: "local-seo-for-pakistani-businesses",
    title: "Local SEO for Pakistani businesses: getting found in your city",
    excerpt:
      "Most customers search close to home first. How to show up for “near me” searches in Lahore and beyond, without a big budget.",
    category: "SEO",
    readTime: "6 min read",
    date: "28 Oct 2026",
    image: "/images/seo-analytics.jpg",
  },
  {
    slug: "how-to-brief-a-design-agency",
    title: "How to brief a design agency (and get what you asked for)",
    excerpt:
      "A good brief saves weeks of back-and-forth. What to include, what to leave out, and the three questions every agency wishes you would answer.",
    category: "Process",
    readTime: "4 min read",
    date: "21 Oct 2026",
    image: "/images/creative-collaboration.jpg",
  },
];

function ReadTimeChip({ readTime }: { readTime: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-navy shadow-sm backdrop-blur">
      <Clock className="h-3.5 w-3.5" aria-hidden="true" />
      {readTime}
    </span>
  );
}

export function BlogPreview() {
  const [featured, ...rest] = POSTS;
  const cards = rest.slice(0, 2);

  return (
    <section aria-labelledby="blog-heading" className="w-full bg-white py-20 sm:py-24">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-royal">
              From the blog
            </p>
            <h2
              id="blog-heading"
              className="mt-3 font-display text-3xl font-bold leading-tight text-ink sm:text-4xl"
            >
              Notes worth reading
            </h2>
            <p className="mt-3 leading-relaxed text-ink/70">
              Practical thinking on websites, branding, and marketing — written
              for business owners, not marketers.
            </p>
          </div>
          <Link
            href="/blog"
            className="group flex items-center gap-2 rounded-full border border-ink/15 px-5 py-3 text-sm font-semibold text-ink transition-colors hover:border-royal/50 hover:text-royal"
          >
            View all posts
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {/* Featured post — large, left */}
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="group overflow-hidden rounded-[24px] border border-ink/10 bg-mist shadow-[0_8px_32px_rgba(22,62,115,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(22,62,115,0.14)]"
          >
            <Link href={`/blog/${featured.slug}`} className="block">
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={featured.image}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  quality={75}
                  loading="lazy"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4">
                  <ReadTimeChip readTime={featured.readTime} />
                </span>
              </div>
              <div className="p-6 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-wider text-royal">
                  {featured.category} · {featured.date}
                </p>
                <h3 className="mt-3 font-display text-2xl font-bold leading-snug text-ink transition-colors group-hover:text-royal sm:text-[1.75rem]">
                  {featured.title}
                </h3>
                <p className="mt-3 leading-relaxed text-ink/70">{featured.excerpt}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-royal">
                  Read the post
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </div>
            </Link>
          </motion.article>

          {/* Two cards — right */}
          <div className="grid gap-6">
            {cards.map((post, i) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 + i * 0.08 }}
                className="group overflow-hidden rounded-[24px] border border-ink/10 bg-mist shadow-[0_8px_32px_rgba(22,62,115,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(22,62,115,0.14)]"
              >
                <Link href={`/blog/${post.slug}`} className="grid sm:grid-cols-[220px_1fr]">
                  <div className="relative aspect-[16/9] overflow-hidden sm:aspect-auto sm:min-h-full">
                    <Image
                      src={post.image}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 220px"
                      quality={75}
                      loading="lazy"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col p-6">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-xs font-semibold uppercase tracking-wider text-royal">
                        {post.category} · {post.date}
                      </p>
                      <ReadTimeChip readTime={post.readTime} />
                    </div>
                    <h3 className="mt-3 font-display text-lg font-bold leading-snug text-ink transition-colors group-hover:text-royal sm:text-xl">
                      {post.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink/70">
                      {post.excerpt}
                    </p>
                    <span className="mt-auto inline-flex items-center gap-2 pt-4 text-sm font-semibold text-royal">
                      Read the post
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
