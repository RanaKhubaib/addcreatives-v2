import { ArrowLeft, ArrowUpRight, Clock3 } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogCard } from "@/components/site/content-cards";
import { PageHero } from "@/components/site/page-hero";
import { ReadingProgress } from "@/components/site/reading-progress";
import { Container } from "@/components/ui/container";
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
      <ReadingProgress />
      <PageHero
        actionLabel="All articles"
        actionHref="/blog"
        description={post.excerpt}
        eyebrow={post.category}
        image={post.coverImage}
        imageAlt={post.coverImageAlt}
        imageNote="Illustrative stock image accompanying this article."
        title={post.title}
      />
      <article className="py-12 sm:py-16">
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-16">
          <div className="mx-auto w-full max-w-3xl">
            <div className="flex flex-wrap items-center gap-3 border-b border-slate-200 pb-5 text-xs font-medium text-muted">
              <span>{post.category}</span>
              <span aria-hidden="true" className="h-1 w-1 bg-slate-300" />
              <time dateTime={post.date}>
                {new Date(`${post.date}T12:00:00`).toLocaleDateString("en", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
              <span aria-hidden="true" className="h-1 w-1 bg-slate-300" />
              <span className="inline-flex items-center gap-1">
                <Clock3 aria-hidden="true" size={13} />
                {post.readTime}
              </span>
            </div>
            <div className="article-content mt-7">
              {post.sections.map((section, index) => (
                <section
                  className="mt-10 scroll-mt-32"
                  id={`section-${index + 1}`}
                  key={section.heading}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-blue">
                    0{index + 1}
                  </p>
                  <h2 className="mt-2">{section.heading}</h2>
                  <p>{section.body}</p>
                </section>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-6">
              <Link
                className="inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-brand-blue"
                href="/blog"
              >
                <ArrowLeft aria-hidden="true" size={16} />
                Back to the journal
              </Link>
              <a
                className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-brand-blue"
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`}
                rel="noreferrer"
                target="_blank"
              >
                Share article <ArrowUpRight aria-hidden="true" size={15} />
              </a>
            </div>
          </div>
          <aside className="h-fit border-y border-slate-300 py-5 lg:sticky lg:top-32">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-blue">
              In this article
            </p>
            <nav aria-label="Article contents" className="mt-4 space-y-3">
              {post.sections.map((section, index) => (
                <a
                  className="block text-sm leading-5 text-muted transition-colors hover:text-brand-blue"
                  href={`#section-${index + 1}`}
                  key={section.heading}
                >
                  {section.heading}
                </a>
              ))}
            </nav>
            <div className="mt-7 border-t border-slate-300 pt-5">
              <p className="text-sm font-semibold text-ink">Have a question?</p>
              <p className="mt-2 text-xs leading-5 text-muted">
                Talk to our team about a challenge you are working through.
              </p>
              <Link
                className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-navy transition-colors hover:text-brand-blue"
                href="/contact"
              >
                Get in touch <ArrowUpRight aria-hidden="true" size={14} />
              </Link>
            </div>
          </aside>
        </Container>
      </article>
      {relatedPosts.length ? (
        <section className="border-t border-slate-200 bg-soft py-16 sm:py-20">
          <Container>
            <h2 className="mb-8 font-display text-2xl font-semibold text-ink sm:text-3xl">
              Keep exploring
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              {relatedPosts.map((related) => (
                <BlogCard key={related.slug} post={related} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}
    </main>
  );
}
