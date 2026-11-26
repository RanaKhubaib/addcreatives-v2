import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Inner-page header: mono eyebrow, huge display title (with serif-accent
 * words where the caller wants them), short description, optional image.
 */
export function PageIntro({
  eyebrow,
  title,
  description,
  back,
  image,
  imageAlt,
  imageNote,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  back?: { label: string; href: string };
  image?: string;
  imageAlt?: string;
  imageNote?: string;
}) {
  return (
    <div className="wrap pb-12 pt-32 sm:pt-40 md:pb-16">
      {back ? (
        <Link
          href={back.href}
          className="group mb-10 inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors duration-300 hover:text-royal"
        >
          <span aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
          {back.label}
        </Link>
      ) : null}
      <p className="eyebrow flex items-center gap-3 text-royal">
        <span aria-hidden="true" className="inline-block h-px w-10 bg-royal" />
        {eyebrow}
      </p>
      <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.5rem,6.5vw,4.5rem)] font-extrabold leading-[1.02] tracking-[-0.03em] text-ink md:mt-8">
        {title}
      </h1>
      {description ? (
        <p className="mt-6 max-w-2xl text-base leading-7 text-steel sm:text-lg sm:leading-8 md:mt-8">
          {description}
        </p>
      ) : null}
      {image ? (
        <figure className="mt-12 md:mt-16">
          <div className="relative aspect-[21/9] overflow-hidden rounded-xl bg-ice">
            <Image
              src={image}
              alt={imageAlt ?? ""}
              fill
              quality={75}
              sizes="(max-width: 1280px) 100vw, 80rem"
              className="object-cover"
            />
          </div>
          {imageNote ? (
            <figcaption className="mt-2 text-xs text-steel">{imageNote}</figcaption>
          ) : null}
        </figure>
      ) : null}
    </div>
  );
}
