import { ArrowUpRight, Clock3 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { BlogPost, CaseStudy } from "@/data/sample-content";

function Artwork({
  imageAlt,
  imageSrc,
}: {
  imageAlt: string;
  imageSrc: string;
}) {
  return (
    <div className="image-frame relative aspect-[1.55] overflow-hidden rounded-[1.15rem] bg-mist">
      <Image
        alt={imageAlt}
        className="object-cover"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        src={imageSrc}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/45 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </div>
  );
}

const cardShell =
  "h-full rounded-[1.5rem] border border-slate-200 bg-white p-3 transition-all duration-300 group-hover:-translate-y-1.5 group-hover:border-royal/50 group-hover:shadow-[0_28px_55px_-36px_rgba(17,65,114,0.7)]";

export function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <Link className="group block h-full" href={`/case-studies/${study.slug}`}>
      <article className={cardShell}>
        <Artwork imageAlt={study.coverImageAlt} imageSrc={study.coverImage} />
        <div className="px-2 pb-2 pt-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-royal">
              {study.category}
            </span>
            {study.isSample ? (
              <span className="rounded-full bg-mist px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted transition-colors group-hover:bg-navy group-hover:text-white">
                Illustrative concept
              </span>
            ) : null}
          </div>
          <h3 className="mt-3 font-display text-xl font-semibold leading-snug tracking-[-0.03em] text-ink transition-colors group-hover:text-royal">
            {study.title}
          </h3>
          <p className="mt-2 text-sm leading-6 text-muted">{study.excerpt}</p>
          <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-navy">
            Read concept
            <ArrowUpRight
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-royal"
              size={16}
            />
          </span>
        </div>
      </article>
    </Link>
  );
}

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link className="group block h-full" href={`/blog/${post.slug}`}>
      <article className={cardShell}>
        <Artwork imageAlt={post.coverImageAlt} imageSrc={post.coverImage} />
        <div className="px-2 pb-2 pt-4">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-medium text-muted">
            <span className="font-semibold text-royal">{post.category}</span>
            <span aria-hidden="true" className="h-1 w-1 rounded-full bg-slate-300" />
            <time dateTime={post.date}>
              {new Date(`${post.date}T12:00:00`).toLocaleDateString("en", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </time>
            <span aria-hidden="true" className="h-1 w-1 rounded-full bg-slate-300" />
            <span className="inline-flex items-center gap-1">
              <Clock3 aria-hidden="true" size={13} />
              {post.readTime}
            </span>
          </div>
          <h3 className="mt-3 font-display text-xl font-semibold leading-snug tracking-[-0.03em] text-ink transition-colors group-hover:text-royal">
            {post.title}
          </h3>
          <p className="mt-2 text-sm leading-6 text-muted">{post.excerpt}</p>
          <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-navy">
            Read article
            <ArrowUpRight
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-royal"
              size={15}
            />
          </span>
        </div>
      </article>
    </Link>
  );
}
