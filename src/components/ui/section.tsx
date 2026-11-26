import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";

interface SectionProps {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
}

export function Section({
  children,
  className = "",
  description,
  eyebrow,
  title,
}: SectionProps) {
  return (
    <section className={`py-16 sm:py-20 lg:py-24 ${className}`.trim()}>
      <Container>
        <div className="max-w-3xl">
          {eyebrow ? (
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-blue">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-[-0.05em] text-ink sm:text-4xl">
            {title}
          </h2>
          {description ? (
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
              {description}
            </p>
          ) : null}
        </div>
        {children ? <div className="mt-9">{children}</div> : null}
      </Container>
    </section>
  );
}
