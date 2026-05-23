'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// PR 4.4 — GPU-friendly ambient motion gate.
//
// A single shared IntersectionObserver pauses the site's infinite
// background animations whenever their host element scrolls out of the
// viewport, and resumes them on scroll-back. This removes the dominant
// always-running cost of the site's ambient motion — chiefly the ~30
// `text-gradient-violet` headings (which animate background-position
// and therefore *repaint* every frame, off-screen or not), plus the
// Hero conic ring, the marquee ticker, the scan lines, and the
// Antrenman Akış pulse.
//
// Why ONE shared observer (not per-component observers, not Framer
// Motion): the alternative is 30+ paint-heavy animations running
// continuously regardless of visibility. A single observer that freezes
// the off-screen majority is a large net win for a negligible,
// centralised cost. Identity is preserved — in-viewport motion is
// untouched; only the off-screen timeline is frozen, and it resumes
// seamlessly because animation-play-state holds the animation's
// position.
//
// Honoured (per masterplan PR 4.4 + standing rules):
//   • prefers-reduced-motion → the global globals.css @media killswitch
//     already neutralises every animation; the gate simply no-ops.
//   • prefers-reduced-data   → freeze ALL ambient motion permanently.
//   • no JS / no IO support  → animations run exactly as before
//     (graceful degradation — the static neon look is intact).
//
// The component renders nothing. It is mounted once in the root layout
// and re-scans the DOM on every client navigation (pathname change),
// so newly-rendered pages get their ambient elements observed too.

// Element-level animations (text-gradient-violet, conic-ring,
// animate-ticker, animate-scan) carry the animation on the matched node.
// The Akış card is matched too — its animations live on descendants
// (.akis-accent / .akis-dot-ping), which the paired globals.css rule
// pauses via the [data-motion-paused] ancestor.
const AMBIENT_SELECTOR = [
  '.text-gradient-violet',
  '.conic-ring',
  '.animate-ticker',
  '.animate-scan',
  '.akis-card',
].join(',');

export function MotionGate() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!('IntersectionObserver' in window)) return;

    // Reduced motion is already fully handled by the global CSS @media
    // block (animation-duration → 0.001ms). Nothing left to gate.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const els = Array.from(document.querySelectorAll<HTMLElement>(AMBIENT_SELECTOR));
    if (els.length === 0) return;

    // Data-saver users: freeze everything up front, skip the observer.
    if (window.matchMedia('(prefers-reduced-data: reduce)').matches) {
      els.forEach((el) => el.setAttribute('data-motion-paused', ''));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            el.removeAttribute('data-motion-paused');
          } else {
            el.setAttribute('data-motion-paused', '');
          }
        }
      },
      // Resume a little before the element scrolls in so the user never
      // catches a frozen frame snapping back to life.
      { rootMargin: '200px 0px' }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
