import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/site/cta-band";
import { JournalList } from "@/components/site/journal-list";
import { Reveal } from "@/components/motion/reveal";
import { PageIntro } from "@/components/site/page-intro";
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
  const rest = blogPosts.slice(1);

  return (
    <main>
      <PageIntro
        eyebrow="Journal"
        title={
          <>
            Good ideas are better{" "}
            <span className="serif-accent text-royal">when shared.</span>
          </>
        }
        description="Straightforward ideas and practical notes on building brands, improving websites, and making digital marketing work harder."
      />

      {featuredPost ? (
        <section className="pb-16 sm:pb-20">
          <div className="wrap">
            <Reveal>
              <Link
                href={`/blog/${featuredPost.slug}`}
                className="group grid gap-8 border-y border-slate-300 py-8 md:grid-cols-[1.05fr_0.95fr] md:items-center lg:gap-14"
              >
                <figure className="relative order-2 aspect-[1.45] overflow-hidden rounded-xl bg-ice md:order-1">
                  <Image
                    alt={featuredPost.coverImageAlt}
                    src={featuredPost.coverImage}
                    fill
                    quality={75}
                    sizes="(max-width: 768px) 100vw, 52vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </figure>
                <div className="order-1 md:order-2">
                  <p className="eyebrow text-royal">
                    Featured article · {featuredPost.category}
                  </p>
                  <h2 className="mt-4 max-w-xl font-display text-2xl font-semibold leading-tight tracking-[-0.02em] text-ink transition-colors duration-300 group-hover:text-royal sm:text-3xl lg:text-4xl">
                    {featuredPost.title}
                  </h2>
                  <p className="mt-4 max-w-xl text-sm leading-6 text-steel sm:text-base">
                    {featuredPost.excerpt}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-navy">
                    Read the article
                    <ArrowRight
                      aria-hidden="true"
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </span>
                  <p className="mt-3 text-xs text-steel">
                    <time dateTime={featuredPost.date}>
                      {new Date(`${featuredPost.date}T12:00:00`).toLocaleDateString("en", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </time>
                    <span aria-hidden="true"> · </span>
                    {featuredPost.readTime}
                  </p>
                </div>
              </Link>
              <p className="mt-2 text-xs text-steel">
                Illustrative stock image accompanying this article.
              </p>
            </Reveal>
          </div>
        </section>
      ) : null}

      <section className="border-t border-slate-200 bg-mist py-24 md:py-32">
        <div className="wrap">
          <Reveal>
            <p className="eyebrow text-royal">The journal</p>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.02em] text-ink sm:text-4xl">
              Ideas to{" "}
              <span className="serif-accent text-royal">put to work.</span>
            </h2>
          </Reveal>
          <div className="mt-10">
            <JournalList posts={rest} />
          </div>
        </div>
      </section>

      <CtaBand />
    </main>
  );
}
