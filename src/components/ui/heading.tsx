'use client';

import { motion, useReducedMotion } from 'framer-motion';

type HeadingTag = 'h1' | 'h2' | 'h3' | 'p' | 'span';

export interface SplitTextProps {
  text: string;
  as?: HeadingTag;
  className?: string;
  /** Delay before the first word starts, in seconds. */
  delay?: number;
  /** Per-word stagger, in seconds. */
  stagger?: number;
}

/**
 * Word-mask reveal heading: each word slides up out of an overflow-hidden
 * mask with a stagger. Respects prefers-reduced-motion (renders plainly).
 */
export function SplitText({
  text,
  as = 'h2',
  className,
  delay = 0,
  stagger = 0.045,
}: SplitTextProps) {
  const reduceMotion = useReducedMotion();
  const words = text.split(' ').filter(Boolean);

  if (reduceMotion) {
    const Tag = as;
    return <Tag className={className}>{text}</Tag>;
  }

  const MotionTag = {
    h1: motion.h1,
    h2: motion.h2,
    h3: motion.h3,
    p: motion.p,
    span: motion.span,
  }[as] as typeof motion.h2;

  return (
    <MotionTag className={className} aria-label={text}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`} aria-hidden="true">
          <span className="-mb-[0.08em] inline-block overflow-hidden pb-[0.08em] align-bottom">
            <motion.span
              className="inline-block will-change-transform"
              initial={{ y: '110%' }}
              whileInView={{ y: '0%' }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.7,
                delay: delay + index * stagger,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {word}
            </motion.span>
          </span>
          {index < words.length - 1 ? ' ' : null}
        </span>
      ))}
    </MotionTag>
  );
}
