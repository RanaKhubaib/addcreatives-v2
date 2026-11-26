"use client";

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { ArrowRight, Mail, MessageCircle, TrendingUp } from 'lucide-react';
import { siteConfig } from '@/data/site-config';

// Lazy-loaded WebGL gradient mesh — never blocks the first paint.
const WebGLHero = dynamic(() => import('./webgl-hero'), {
  ssr: false,
  loading: () => null,
});

const ROTATING_WORDS = ['Websites', 'Stores', 'Brands', 'Growth'] as const;

const LINE_1 = ['Digital', 'Solutions'];
const LINE_2 = ['That', 'Drive'];

/**
 * One masked word: slides up out of an overflow-hidden mask. Words are
 * laid out in a flex row with a fixed gap (see the <h1> below), so every
 * gap between words is exactly the same — no literal whitespace, no
 * per-word margins that collapse or differ at line wraps.
 */
function MaskedWord({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span className="overflow-hidden pb-[0.08em] -mb-[0.08em]">
      <motion.span
        className="inline-block will-change-transform"
        initial={{ y: '110%' }}
        animate={{ y: 0 }}
        transition={{
          duration: 0.9,
          delay,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.span>
    </span>
  );
}

function RotatingWord() {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(ROTATING_WORDS.length - 1);

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % ROTATING_WORDS.length);
    }, 2600);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  if (reduceMotion) {
    return <span className="text-peri">Growth</span>;
  }

  return (
    <span className="relative inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-bottom">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={ROTATING_WORDS[index]}
          className="inline-block text-peri will-change-transform"
          initial={{ y: '110%' }}
          animate={{ y: 0 }}
          exit={{ y: '-110%' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {ROTATING_WORDS[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

interface MagneticLinkProps {
  href: string;
  className?: string;
  external?: boolean;
  children: React.ReactNode;
}

/** Magnetic-feel link: drifts toward the cursor, springs back on leave. */
function MagneticLink({ href, className, external, children }: MagneticLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 14, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 180, damping: 14, mass: 0.4 });

  const onMove = (e: React.MouseEvent) => {
    if (reduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.3);
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.3);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      {...(external
        ? { target: '_blank', rel: 'noopener noreferrer' }
        : {})}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.97 }}
      className={className}
    >
      {children}
    </motion.a>
  );
}

function AnalyticsCard({ className }: { className?: string }) {
  return (
    <div
      className={`rounded-card border border-white/25 bg-white/10 p-4 shadow-xl backdrop-blur-md ${className ?? ''}`}
    >
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold tracking-wide text-white/70 uppercase">
          Website traffic
        </p>
        <span className="flex items-center gap-1 rounded-full bg-emerald-400/20 px-2 py-0.5 text-[11px] font-bold text-emerald-300">
          <TrendingUp className="h-3 w-3" aria-hidden />
          +38%
        </span>
      </div>
      <p className="font-display mt-1 text-2xl font-bold text-white">12,480</p>
      <p className="text-[11px] text-white/60">visitors this month</p>
      <svg
        viewBox="0 0 220 64"
        className="mt-3 h-14 w-full"
        role="img"
        aria-label="Rising traffic chart"
      >
        <defs>
          <linearGradient id="hero-chart-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5b7fc0" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#5b7fc0" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d="M0 52 L28 46 L56 48 L84 36 L112 40 L140 26 L168 30 L196 14 L220 8 L220 64 L0 64 Z"
          fill="url(#hero-chart-fill)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        />
        <motion.path
          d="M0 52 L28 46 L56 48 L84 36 L112 40 L140 26 L168 30 L196 14 L220 8"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.9, duration: 1.4, ease: 'easeOut' }}
        />
        <motion.circle
          cx="220"
          cy="8"
          r="4"
          fill="#5b7fc0"
          stroke="#ffffff"
          strokeWidth="2"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 2.2, type: 'spring', stiffness: 300, damping: 12 }}
        />
      </svg>
    </div>
  );
}

function LeadCard({ className }: { className?: string }) {
  return (
    <div
      className={`flex items-start gap-3 rounded-card border border-white/25 bg-white/10 p-4 shadow-xl backdrop-blur-md ${className ?? ''}`}
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-royal text-white">
        <Mail className="h-5 w-5" aria-hidden />
      </span>
      <div className="min-w-0">
        <p className="text-sm font-bold text-white">New lead</p>
        <p className="truncate text-xs text-white/70">Website enquiry — “Need a new store”</p>
        <p className="mt-1 text-[11px] font-semibold text-peri">Just now · via contact form</p>
      </div>
      <span className="ml-auto h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-400" aria-hidden />
    </div>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const cardY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const leadY = useTransform(scrollYProgress, [0, 1], [0, -130]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const scrollToNext = () => {
    const next = document.querySelector('#services, #manifesto, main > section:nth-of-type(2)');
    if (next) {
      next.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
    } else {
      window.scrollTo({
        top: window.innerHeight,
        behavior: reduceMotion ? 'auto' : 'smooth',
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      aria-label="Intro"
      className="relative flex min-h-svh flex-col overflow-hidden bg-ink text-white"
    >
      {/* Background: WebGL mesh when available, static gradient otherwise. */}
      {reduceMotion ? (
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(135deg,#0a0f1c_0%,#163e73_45%,#0b4da2_75%,#5b7fc0_100%)]"
        >
          <div className="absolute inset-0 bg-[repeating-linear-gradient(-45deg,rgba(255,255,255,0.05)_0_2px,transparent_2px_26px)]" />
        </div>
      ) : (
        <WebGLHero />
      )}
      {/* Readability veil over the mesh. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/20 to-ink/70"
      />

      {/* Floating glass cards (desktop). */}
      <motion.div
        style={{ y: cardY }}
        aria-hidden
        className="absolute top-[22%] right-[6%] z-10 hidden w-60 lg:block xl:right-[9%] xl:w-72"
      >
        <AnalyticsCard className="rotate-2" />
      </motion.div>
      <motion.div
        style={{ y: leadY }}
        aria-hidden
        className="absolute right-[16%] bottom-[24%] z-10 hidden w-72 lg:block xl:right-[20%]"
      >
        <LeadCard className="-rotate-1" />
      </motion.div>

      <motion.div
        style={{ opacity: contentOpacity }}
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 pt-28 pb-16 sm:px-8"
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold tracking-[0.2em] text-white/85 uppercase backdrop-blur-sm"
        >
          <span className="h-2 w-2 rounded-full bg-peri" aria-hidden />
          Lahore-based digital agency
        </motion.p>

        <h1 className="font-display max-w-5xl text-[clamp(2.75rem,8vw,6.5rem)] leading-[0.98] font-bold tracking-tight">
          {/* Each line is one flex row with a fixed 0.28em gap — the rotating
              word is a flex item in the second row, so its gap matches every
              other word gap exactly, at desktop and mobile widths. */}
          <span className="flex flex-wrap gap-x-[0.28em]">
            {LINE_1.map((word, i) => (
              <MaskedWord key={word} delay={0.25 + i * 0.09}>
                {word}
              </MaskedWord>
            ))}
          </span>
          <span className="flex flex-wrap gap-x-[0.28em]">
            {LINE_2.map((word, i) => (
              <MaskedWord key={word} delay={0.45 + i * 0.09}>
                {word}
              </MaskedWord>
            ))}
            <MaskedWord delay={0.63}>
              <RotatingWord />
            </MaskedWord>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.7 }}
          className="mt-6 max-w-xl text-lg leading-relaxed text-white/75"
        >
          We design, build, and grow websites, stores, and brands for businesses
          that want to be found, remembered, and chosen.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.7 }}
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          <MagneticLink
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-navy shadow-lg transition-colors hover:bg-peri hover:text-white"
          >
            Start a project
            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden
            />
          </MagneticLink>
          <MagneticLink
            href={siteConfig.whatsappUrl}
            external
            className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-colors hover:border-white hover:bg-white/20"
          >
            <MessageCircle className="h-4 w-4" aria-hidden />
            Chat on WhatsApp
          </MagneticLink>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.7 }}
          className="mt-8 text-sm font-medium text-white/60"
        >
          Lahore-based · Strategy, design, technology &amp; marketing
        </motion.p>

        {/* Mobile glass cards, shown below the CTAs. */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:hidden">
          <AnalyticsCard />
          <LeadCard />
        </div>
      </motion.div>

      {/* Rotating circular scroll badge. */}
      <motion.button
        type="button"
        onClick={scrollToNext}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.7 }}
        aria-label="Scroll to next section"
        className="absolute right-6 bottom-6 z-10 hidden h-28 w-28 items-center justify-center rounded-full text-white/80 transition-colors hover:text-white sm:flex"
      >
        <svg
          viewBox="0 0 120 120"
          className="absolute inset-0 h-full w-full animate-[spin_14s_linear_infinite]"
          aria-hidden
        >
          <defs>
            <path
              id="hero-scroll-circle"
              d="M 60,60 m -44,0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0"
            />
          </defs>
          <text className="fill-current text-[11px] font-semibold tracking-[0.28em] uppercase">
            <textPath href="#hero-scroll-circle">
              Scroll to explore · Scroll to explore ·
            </textPath>
          </text>
        </svg>
        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-sm">
          <ArrowRight className="h-4 w-4 rotate-90" aria-hidden />
        </span>
      </motion.button>
    </section>
  );
}
