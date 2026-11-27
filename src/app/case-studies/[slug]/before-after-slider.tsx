'use client';

import { useState } from 'react';
import Image from 'next/image';

interface BeforeAfterProps {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel?: string;
  afterLabel?: string;
}

/**
 * Concept preview slider: drag the divider (or use the range input) to
 * compare two images. Keyboard accessible via the range input.
 */
export default function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeLabel = 'Before',
  afterLabel = 'After',
}: BeforeAfterProps) {
  const [position, setPosition] = useState(50);

  return (
    <div>
      {/* touch-pan-y (not touch-none): the image never traps vertical
          page scroll on a phone — the range input below is the control. */}
      <div className="relative aspect-[16/10] w-full touch-pan-y overflow-hidden rounded-3xl select-none">
        <Image
          src={afterSrc}
          alt="After — concept preview"
          fill
          sizes="(max-width: 1024px) 100vw, 66vw"
          quality={75}
          className="object-cover"
          draggable={false}
        />
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <Image
            src={beforeSrc}
            alt="Before — concept preview"
            fill
            sizes="(max-width: 1024px) 100vw, 66vw"
            quality={75}
            className="object-cover"
            draggable={false}
          />
        </div>
        <span className="absolute left-4 top-4 rounded-full bg-ink/70 px-3 py-1 text-xs font-semibold text-white">
          {beforeLabel}
        </span>
        <span className="absolute right-4 top-4 rounded-full bg-ink/70 px-3 py-1 text-xs font-semibold text-white">
          {afterLabel}
        </span>
        <div
          aria-hidden="true"
          className="absolute inset-y-0 w-0.5 bg-white shadow"
          style={{ left: `${position}%` }}
        >
          <span className="absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white font-bold text-navy shadow-lg">
            ↔
          </span>
        </div>
      </div>
      <label htmlFor="before-after-range" className="mt-4 block text-sm font-semibold">
        Drag to compare the concept
      </label>
      <input
        id="before-after-range"
        type="range"
        min={0}
        max={100}
        value={position}
        onChange={(event) => setPosition(Number(event.target.value))}
        className="mt-2 w-full accent-royal"
        aria-label="Before and after comparison slider"
      />
    </div>
  );
}
