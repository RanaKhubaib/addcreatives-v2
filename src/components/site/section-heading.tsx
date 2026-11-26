interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  light?: boolean;
}

export function SectionHeading({
  description,
  eyebrow,
  light = false,
  title,
}: SectionHeadingProps) {
  return (
    <div className="max-w-3xl">
      <p
        className={`flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] ${
          light ? "text-sky" : "text-royal"
        }`}
      >
        <span aria-hidden="true" className="h-px w-8 bg-current" />
        {eyebrow}
      </p>
      <h2
        className={`mt-4 font-display text-3xl font-semibold leading-tight tracking-[-0.055em] sm:text-4xl lg:text-5xl ${
          light ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-4 max-w-2xl text-base leading-7 ${
            light ? "text-blue-100/70" : "text-muted"
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
