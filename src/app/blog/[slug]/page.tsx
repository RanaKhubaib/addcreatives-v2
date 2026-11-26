import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import {
  estimateReadingMinutes,
  extractHeadings,
  getAllPosts,
  getAllPostSlugs,
  getFallbackPost,
  getPost,
  slugifyHeading,
} from '../posts';
import { siteConfig } from '@/data/site-config';
import ReadingProgress from './reading-progress';
import ShareButtons from './share-buttons';

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  const fallback = getFallbackPost(slug);
  const title = post?.title ?? fallback?.title ?? 'Blog post';
  const description =
    post?.excerpt || fallback?.excerpt || 'A post from the ADD Creatives blog.';
  return {
    title: `${title} | ADD Creatives Blog`,
    description,
    openGraph: {
      title: `${title} | ADD Creatives Blog`,
      description,
    },
  };
}

function headingText(children: ReactNode): string {
  if (typeof children === 'string') return children;
  if (Array.isArray(children)) {
    return children.filter((child) => typeof child === 'string').join('');
  }
  return '';
}

const mdxComponents = {
  h2: ({ children, ...props }: React.ComponentProps<'h2'>) => {
    const text = headingText(children);
    return (
      <h2
        id={text ? slugifyHeading(text) : undefined}
        className="mt-10 scroll-mt-20 font-display text-2xl font-bold"
        {...props}
      >
        {children}
      </h2>
    );
  },
  h3: (props: React.ComponentProps<'h3'>) => (
    <h3 className="mt-8 font-display text-xl font-bold" {...props} />
  ),
  p: (props: React.ComponentProps<'p'>) => (
    <p className="mt-4 leading-relaxed text-ink/80 dark:text-white/80" {...props} />
  ),
  a: (props: React.ComponentProps<'a'>) => {
    const href = props.href ?? '';
    const external = href.startsWith('http');
    return (
      <a
        className="font-semibold text-royal underline underline-offset-2 hover:text-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-royal"
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        {...props}
      />
    );
  },
  ul: (props: React.ComponentProps<'ul'>) => (
    <ul className="mt-4 list-disc space-y-2 pl-6 text-ink/80 dark:text-white/80" {...props} />
  ),
  ol: (props: React.ComponentProps<'ol'>) => (
    <ol className="mt-4 list-decimal space-y-2 pl-6 text-ink/80 dark:text-white/80" {...props} />
  ),
  blockquote: (props: React.ComponentProps<'blockquote'>) => (
    <blockquote
      className="mt-6 border-l-4 border-royal bg-mist px-5 py-4 text-ink/80 dark:bg-white/5 dark:text-white/80"
      {...props}
    />
  ),
  code: (props: React.ComponentProps<'code'>) => (
    <code
      className="rounded bg-mist px-1.5 py-0.5 text-sm font-semibold text-navy dark:bg-white/10 dark:text-white"
      {...props}
    />
  ),
  pre: (props: React.ComponentProps<'pre'>) => (
    <pre
      className="mt-4 overflow-x-auto rounded-3xl bg-ink p-5 text-sm text-white dark:bg-white/10"
      {...props}
    />
  ),
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  const fallback = getFallbackPost(slug);

  // Graceful placeholder when the MDX file has not been written yet.
  if (!post) {
    return (
      <main id="main-content" className="bg-white text-ink dark:bg-ink dark:text-white">
        <section className="px-6 py-16 sm:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-royal">
              Blog
            </p>
            <h1 className="mt-4 font-display text-4xl font-bold leading-tight sm:text-5xl">
              {fallback?.title ?? 'Post coming soon'}
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-ink/70 dark:text-white/70">
              {fallback?.excerpt ??
                'This post is being written and will be published here soon.'}
            </p>
            <p className="mt-2 text-ink/60 dark:text-white/60">
              Check back soon — or browse the other posts in the meantime.
            </p>
            <Link
              href="/blog"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 font-semibold text-white transition hover:bg-royal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-royal"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to the blog
            </Link>
          </div>
        </section>
      </main>
    );
  }

  const headings = extractHeadings(post.content);
  const minutes = estimateReadingMinutes(post.content);
  const url = `https://${siteConfig.website}/blog/${post.slug}`;
  const related = getAllPosts()
    .filter((item) => item.slug !== post.slug && item.category === post.category && !item.comingSoon)
    .slice(0, 2);

  return (
    <main id="main-content" className="bg-white text-ink dark:bg-ink dark:text-white">
      <ReadingProgress />
      <article className="px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-semibold text-royal hover:text-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-royal"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All posts
          </Link>
          <p className="mt-8 text-xs font-semibold uppercase tracking-wide text-royal">
            {post.category}
            {post.date ? ` · ${post.date}` : ''} · {minutes} min read
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold leading-tight sm:text-5xl">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="mt-4 text-lg text-ink/70 dark:text-white/70">{post.excerpt}</p>
          )}

          {headings.length > 0 && (
            <nav
              aria-label="On this page"
              className="mt-8 rounded-3xl bg-mist p-6 dark:bg-white/5"
            >
              <h2 className="font-display text-sm font-bold uppercase tracking-wide">
                On this page
              </h2>
              <ul className="mt-3 space-y-2">
                {headings.map((heading) => (
                  <li key={heading.id}>
                    <a
                      href={`#${heading.id}`}
                      className="text-royal hover:text-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-royal"
                    >
                      {heading.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          <div className="mt-8">
            <MDXRemote source={post.content} components={mdxComponents} />
          </div>

          <hr className="my-10 border-ink/10 dark:border-white/10" />

          <ShareButtons url={url} title={post.title} />

          <aside
            aria-label="About the author"
            className="mt-10 flex items-start gap-4 rounded-3xl bg-mist p-6 dark:bg-white/5"
          >
            <span
              aria-hidden="true"
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-navy font-display text-lg font-bold text-white"
            >
              AC
            </span>
            <div>
              <h2 className="font-display text-lg font-bold">ADD Creatives Team</h2>
              <p className="mt-1 text-sm text-ink/70 dark:text-white/70">
                We are a digital agency in Lahore, Pakistan. We design and build
                websites, brands, and campaigns that help businesses grow.
              </p>
            </div>
          </aside>

          {related.length > 0 && (
            <section aria-labelledby="related-heading" className="mt-12">
              <h2 id="related-heading" className="font-display text-2xl font-bold">
                Related posts
              </h2>
              <ul className="mt-6 grid gap-6 sm:grid-cols-2">
                {related.map((item) => (
                  <li
                    key={item.slug}
                    className="rounded-3xl border border-ink/10 p-6 dark:border-white/10"
                  >
                    <p className="text-xs font-semibold uppercase tracking-wide text-royal">
                      {item.category}
                    </p>
                    <h3 className="mt-2 font-display text-lg font-bold">{item.title}</h3>
                    <Link
                      href={`/blog/${item.slug}`}
                      className="mt-3 inline-flex items-center gap-2 font-semibold text-royal hover:text-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-royal"
                    >
                      Read post <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </article>
    </main>
  );
}
