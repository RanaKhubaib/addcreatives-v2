const NOISE_SVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

/**
 * Subtle film-grain overlay: fixed SVG noise, pointer-events-none,
 * very low opacity, with a slow stepped shift (see .grain-overlay).
 */
export function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      className="grain-overlay pointer-events-none fixed inset-0 z-[70] opacity-[0.05]"
      style={{ backgroundImage: NOISE_SVG }}
    />
  );
}
