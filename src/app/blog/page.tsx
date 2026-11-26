import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BlogList } from "@/components/site/blog-list";
import { PageHero } from "@/components/site/page-hero";
import { Container } from "@/components/ui/container";
import { FadeIn } from "@/components/ui/fade-in";
import { getBlogPosts } from "@/lib/content";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Journal | ADD Creatives",
  description:
    "Practical ideas on brand strategy, websites, and digital marketing from ADD Creatives.",
  alternates: {
    canonical: "/blog",
  },
};

export default async function BlogPage() {
  const blogPosts = await getBlogPosts();
  const featuredPost = blogPosts[0];

  return (
    <main>
      <PageHero
        description="Straightforward ideas and practical notes on building brands, improving websites, and making digital marketing work harder."
        eyebrow="Journal"
        title="Good ideas are better when shared."
      />
      {featuredPost ? (
        <section className="py-12 sm:py-16">
          <Container>
            <FadeIn>
              <Link
                className="group grid gap-6 border-y border-slate-300 py-6 md:grid-cols-[1.05fr_0.95fr] md:items-center md:gap-10 lg:gap-16"
                href={`/blog/${featuredPost.slug}`}
              >
                <figure className="image-frame relative order-2 aspect-[1.45] overflow-hidden rounded-[1.5rem] bg-light-blue md:order-1">
                  <Image
                    alt={featuredPost.coverImageAlt}
                    className="object-cover"
                    fill
                    sizes="(max-width: 768px) 100vw, 52vw"
                    src={featuredPost.coverImage}
                  />
                </figure>
                <div className="order-1 md:order-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-blue">
                    Featured article <span aria-hidden="true">/</span>{" "}
                    {featuredPost.category}
                  </p>
                  <h2 className="mt-4 max-w-xl font-display text-2xl font-semibold leading-tight tracking-[-0.04em] text-ink transition-colors group-hover:text-brand-blue sm:text-3xl lg:text-4xl">
                    {featuredPost.title}
                  </h2>
                  <p className="mt-4 max-w-xl text-sm leading-6 text-muted sm:text-base">
                    {featuredPost.excerpt}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-navy">
                    Read the article <ArrowRight aria-hidden="true" size={16} />
                  </span>
                  <p className="mt-3 text-xs text-muted">
                    <time dateTime={featuredPost.date}>
                      {new Date(`${featuredPost.date}T12:00:00`).toLocaleDateString(
                        "en",
                        { day: "numeric", month: "long", year: "numeric" },
                      )}
                    </time>
                    <span aria-hidden="true"> · </span>
                    {featuredPost.readTime}
                  </p>
                </div>
              </Link>
              <p className="mt-2 text-xs text-muted">
                Illustrative stock image accompanying this article.
              </p>
            </FadeIn>
          </Container>
        </section>
      ) : null}
      <section className="border-t border-slate-200 bg-soft py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="mb-9">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-blue">
              The journal
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.04em] text-ink sm:text-4xl">
              Ideas to put to work.
            </h2>
          </div>
          <BlogList posts={blogPosts} />
        </Container>
      </section>
    </main>
  );
}
