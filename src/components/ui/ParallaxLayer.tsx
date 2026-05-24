'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/cn';

/* ────────────────────────────────────────────────────────────────────────────
 * ParallaxLayer — PR 6.2 · subtle scroll-tied depth for the Manifesto visual.
 *
 * Translates its children vertically as the element travels through the
 * viewport, so the image panel DRIFTS against its (static) violet glow and the
 * line-by-line text → cinematic depth without any zoom.
 *
 * WHY THIS SHAPE (audit-driven):
 *   • No Framer Motion (rule #2): a passive scroll listener + a single rAF tick,
 *     gated to the viewport by an IntersectionObserver — it only computes while
 *     visible and frees `will-change` when out of view (the conic-ring /
 *     MotionGate discipline from PR 4.4).
 *   • TRANSLATE ONLY (translate3d) — GPU-composited, no repaint, no layout
 *     shift, and crucially NO image scaling. The Manifesto source is a
 *     landscape webp shown object-cover in a portrait card (already mildly
 *     upscaled on retina); an internal "zoom" parallax would soften it and
 *     break the blur rule (#1). Moving the whole panel keeps every pixel at its
 *     current scale → blur rule untouched.
 *   • Parity (rule #4): scroll-driven, so touch / mobile get the same depth —
 *     it's not hover-gated.
 *   • prefers-reduced-motion / prefers-reduced-data → no transform at all; the
 *     panel sits still. (The global CSS reduced-motion killswitch covers CSS
 *     animation; this JS transform has to opt out itself.)
 * ──────────────────────────────────────────────────────────────────────────── */

export function ParallaxLayer({
  children,
  className,
  amplitude = 30,
}: {
  children: React.ReactNode;
  className?: string;
  /** Max vertical drift in px (the panel moves within ±amplitude). */
  amplitude?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      window.matchMedia('(prefers-reduced-data: reduce)').matches
    ) {
      return; // static — no parallax under reduced motion / data
    }

    let inView = false;
    let ticking = false;

    const apply = () => {
      ticking = false;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      // progress: -1 just entering from the bottom → 0 centred → +1 leaving at
      // the top. The panel drifts opposite to scroll for a "receding" depth feel.
      const center = rect.top + rect.height / 2;
      const denom = vh / 2 + rect.height / 2;
      const p = Math.max(-1, Math.min(1, (center - vh / 2) / denom));
      el.style.transform = `translate3d(0, ${(-p * amplitude).toFixed(2)}px, 0)`;
    };

    const onScroll = () => {
      if (inView && !ticking) {
        ticking = true;
        requestAnimationFrame(apply);
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) {
          el.style.willChange = 'transform';
          apply();
          window.addEventListener('scroll', onScroll, { passive: true });
        } else {
          el.style.willChange = 'auto';
          window.removeEventListener('scroll', onScroll);
        }
      },
      { rootMargin: '100px 0px' }
    );
    io.observe(el);
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      el.style.transform = '';
      el.style.willChange = '';
    };
  }, [amplitude]);

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
