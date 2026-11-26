import { ArrowUpRight, Clock3 } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/site/cta-band";
import { JournalList } from "@/components/site/journal-list";
import { Reveal } from "@/components/motion/reveal";
import { PageIntro } from "@/components/site/page-intro";
import { siteConfig } from "@/data/site-config";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/content";

export const revalidate = 60;

export function generateStaticParams() {
  return getBlogPosts().then((posts) => posts.map((post) => ({ slug: post.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} | ADD Creatives Journal`,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      images: [post.coverImage],
    },
  };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const posts = await getBlogPosts();
  const relatedPosts = posts.filter((item) => item.slug !== post.slug).slice(0, 2);
  const articleUrl = `${siteConfig.company.website}/blog/${post.slug}`;

  return (
    <main>
      <PageIntro
        eyebrow={post.category}
        title={post.title}
        description={post.excerpt}
        back={{ label: "All articles", href: "/blog" }}
        image={post.coverImage}
        imageAlt={post.coverImageAlt}
        imageNote="Illustrative stock image accompanying this article."
      />

      <article className="pb-24 md:pb-32">
        <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-16">
          <div className="mx-auto w-full max-w-3xl">
            <div className="flex flex-wrap items-center gap-3 border-b border-slate-300 pb-5 text-xs font-medium text-steel">
              <span>{post.category}</span>
              <span aria-hidden="true" className="h-1 w-1 rounded-full bg-slate-300" />
              <time dateTime={post.date}>
                {new Date(`${post.date}T12:00:00`).toLocaleDateString("en", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
              <span aria-hidden="true" className="h-1 w-1 rounded-full bg-slate-300" />
              <span className="inline-flex items-center gap-1">
                <Clock3 aria-hidden="true" size={13} />
                {post.readTime}
              </span>
            </div>
            <div className="article-content mt-4">
              {post.sections.map((section, index) => (
                <Reveal key={section.heading} delay={index * 0.03}>
                  <section className="mt-10">
                    <p className="font-mono text-xs font-semibold text-royal">
                      0{index + 1}
                    </p>
                    <h2>{section.heading}</h2>
                    <p>{section.body}</p>
                  </section>
                </Reveal>
              ))}
            </div>
            <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-slate-300 pt-6">
              <Link
                href="/blog"
                className="group inline-flex items-center gap-2 text-sm font-bold text-navy transition-colors duration-300 hover:text-royal"
              >
                <span aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
                Back to the journal
              </Link>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`}
                rel="noreferrer"
                target="_blank"
                className="inline-flex items-center gap-2 text-sm font-medium text-steel transition-colors duration-300 hover:text-royal"
              >
                Share article <ArrowUpRight aria-hidden="true" size={15} />
              </a>
            </div>
          </div>

          <aside className="h-fit border-y border-slate-300 py-6 lg:sticky lg:top-28">
            <p className="eyebrow text-royal">Keep reading</p>
            <ul className="mt-5 space-y-5">
              {relatedPosts.map((related) => (
                <li key={related.slug}>
                  <Link
                    href={`/blog/${related.slug}`}
                    className="group block"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-steel">
                      {related.category} · {related.readTime}
                    </p>
                    <p className="mt-1.5 font-display text-base font-semibold leading-snug text-ink transition-colors duration-300 group-hover:text-royal">
                      {related.title}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </div>

        {relatedPosts.length > 0 ? (
          <div className="wrap mt-20">
            <p className="eyebrow text-royal">More from the journal</p>
            <div className="mt-8">
              <JournalList posts={relatedPosts} />
            </div>
          </div>
        ) : null}
      </article>

      <CtaBand />
    </main>
  );
}
