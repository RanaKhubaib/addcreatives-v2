"use client";

import { useEffect, useRef, useState, type MouseEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { caseStudies, type CaseStudy } from '@/data/case-studies';
import { useLenis } from '@/components/effects/lenis-provider';

function WorkCard({ study, widthClass }: { study: CaseStudy; widthClass: string }) {
  const [bubble, setBubble] = useState<{ x: number; y: number; show: boolean }>({
    x: 0,
    y: 0,
    show: false,
  });

  const onMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setBubble({ x: e.clientX - rect.left, y: e.clientY - rect.top, show: true });
  };

  return (
    <Link
      href={`/case-studies/${study.slug}`}
      onMouseMove={onMove}
      onMouseLeave={() => setBubble((b) => ({ ...b, show: false }))}
      className={`group relative block shrink-0 overflow-hidden rounded-card bg-ink ${widthClass}`}
      aria-label={`${study.title} — view case study`}
    >
      {/* Parallax wrapper: GSAP shifts this as the track scrolls. */}
      <div
        data-parallax
        className="relative aspect-[4/3] w-full will-change-transform"
      >
        <Image
          src={study.image}
          alt={study.title}
          fill
          sizes="(max-width: 768px) 82vw, (max-width: 1280px) 46vw, 40vw"
          quality={75}
          loading="lazy"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent"
        />
      </div>

      {/* Cursor-follow "View" bubble. */}
      <span
        aria-hidden
        style={{
          transform: `translate(${bubble.x}px, ${bubble.y}px) translate(-50%, -50%) scale(${bubble.show ? 1 : 0})`,
        }}
        className="pointer-events-none absolute top-0 left-0 z-10 flex h-20 w-20 items-center justify-center rounded-full bg-white text-sm font-bold text-navy shadow-xl transition-[scale] duration-200 ease-out"
      >
        View
      </span>

      <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-7">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-white px-3 py-1 text-[11px] font-bold tracking-wide text-navy uppercase">
            Illustrative concept
          </span>
          <span className="rounded-full border border-white/40 bg-white/10 px-3 py-1 text-[11px] font-bold tracking-wide uppercase backdrop-blur-sm">
            {study.category}
          </span>
        </div>
        <h3 className="font-display mt-4 text-2xl leading-tight font-bold text-balance sm:text-3xl">
          {study.title}
        </h3>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-white/75">
          {study.excerpt}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {study.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white/85 backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

export default function SelectedWork() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { getLenis, setGsapDriven } = useLenis();

  useEffect(() => {
    // GSAP is loaded lazily, only on desktop and only when motion is
    // allowed — it is not part of the initial bundle. On mobile and with
    // prefers-reduced-motion the cards render as a plain vertical stack.
    if (reduceMotion) return;
    if (!window.matchMedia('(min-width: 768px)').matches) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    (async () => {
      let gsap: typeof import('gsap').default;
      let ScrollTrigger: typeof import('gsap/ScrollTrigger').ScrollTrigger;
      try {
        [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
          import('gsap'),
          import('gsap/ScrollTrigger'),
        ]);
      } catch {
        // GSAP failed to load: the gallery stays a static track and the
        // provider's own rAF loop keeps driving Lenis — scroll never breaks.
        return;
      }
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      // Lenis + ScrollTrigger integration (the scroll-stuck root cause):
      // Lenis smooths scroll in its own rAF loop while ScrollTrigger
      // measures the native scroll position, so a pinned trigger's start/end
      // desynced from where Lenis thought the page was and the pin trapped
      // scroll at its boundaries. Standard fix: drive Lenis from the GSAP
      // ticker instead of its own loop, and push every Lenis scroll event
      // into ScrollTrigger. On touch devices there is no Lenis instance
      // (native scroll), so ScrollTrigger already reads the true position
      // and no wiring is needed.
      const lenis = getLenis();
      let teardownIntegration: (() => void) | undefined;
      if (lenis) {
        const onLenisScroll = () => ScrollTrigger.update();
        const driveLenis = (time: number) => {
          lenis.raf(time * 1000);
        };
        lenis.on('scroll', onLenisScroll);
        gsap.ticker.add(driveLenis);
        gsap.ticker.lagSmoothing(0);
        setGsapDriven(true);
        teardownIntegration = () => {
          lenis.off('scroll', onLenisScroll);
          gsap.ticker.remove(driveLenis);
          setGsapDriven(false);
        };
      }

      // Pin positions depend on fonts and images: refresh once everything
      // has landed so the pin starts/ends at the true offsets. Resize is
      // already covered by invalidateOnRefresh + ScrollTrigger's own
      // resize handling.
      const refreshTriggers = () => {
        if (!cancelled) ScrollTrigger.refresh();
      };
      window.addEventListener('load', refreshTriggers);
      void document.fonts?.ready.then(refreshTriggers);

      const mm = gsap.matchMedia();

      mm.add('(min-width: 768px)', () => {
        const section = sectionRef.current;
        const track = trackRef.current;
        if (!section || !track) return;

        const distance = () => track.scrollWidth - window.innerWidth;
        const parallaxEls = () =>
          Array.from(track.querySelectorAll<HTMLElement>('[data-parallax]'));

        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.5,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              // Subtle image parallax inside each card as the track moves.
              const shift = (0.5 - self.progress) * 48;
              parallaxEls().forEach((el) => {
                el.style.transform = `translateX(${shift}px) scale(1.12)`;
              });
            },
          },
        });

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
          gsap.set(track, { clearProps: 'x' });
          parallaxEls().forEach((el) => {
            el.style.transform = '';
          });
        };
      });

      cleanup = () => {
        teardownIntegration?.();
        window.removeEventListener('load', refreshTriggers);
        mm.revert();
      };
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [reduceMotion, getLenis, setGsapDriven]);

  return (
    <section aria-label="Selected work" className="bg-ink py-24 text-white sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs font-bold tracking-[0.28em] text-peri uppercase">
              Selected work
            </p>
            <h2 className="font-display mt-4 text-4xl leading-[1.05] font-bold tracking-tight sm:text-5xl">
              Work we are proud to show.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-white/65">
              A few recent concepts across branding, stores, and campaigns. Every
              project below is an illustrative concept — real client work replaces
              these before launch.
            </p>
          </div>
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-white hover:text-navy"
          >
            All case studies
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>

      {/* Mobile + reduced-motion: vertical stack. */}
      <div
        className={`mt-12 grid gap-5 px-6 sm:px-8 ${reduceMotion ? '' : 'md:hidden'}`}
      >
        {caseStudies.map((study) => (
          <WorkCard key={study.slug} study={study} widthClass="w-full" />
        ))}
      </div>

      {/* Desktop: pinned horizontal scroll gallery (motion allowed only). */}
      {!reduceMotion ? (
        <div ref={sectionRef} className="relative hidden md:block">
        <div className="flex min-h-svh items-center overflow-hidden">
          <div ref={trackRef} className="flex gap-6 px-6 will-change-transform sm:px-8">
            {caseStudies.map((study) => (
              <WorkCard
                key={study.slug}
                study={study}
                widthClass="w-[62vw] lg:w-[46vw] xl:w-[40vw]"
              />
            ))}
            {/* End card. */}
            <Link
              href="/case-studies"
              className="group flex w-[32vw] shrink-0 flex-col items-start justify-center gap-4 rounded-card border border-white/20 bg-white/5 p-8 transition-colors hover:bg-white/10"
            >
              <ArrowUpRight
                className="h-8 w-8 text-peri transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                aria-hidden
              />
              <p className="font-display text-2xl font-bold">
                See the full collection of work
              </p>
              <p className="text-sm text-white/65">
                Branding, e-commerce, and campaigns — all in one place.
              </p>
            </Link>
          </div>
        </div>
        </div>
      ) : null}
    </section>
  );
}
