'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// useIntersect — minimal IntersectionObserver hook for scroll-reveal patterns.
//
// PR 4.3 — replaces Framer Motion's whileInView for the simple "fade-up when
// scrolled into view" case. ~50 lines vs ~50 KB of Framer Motion bundle.
//
// Returns a callback ref + an `inView` boolean. Callback ref so the hook works
// when the consumer needs the element ref for other purposes too; if not, just
// spread it into the element's `ref` prop.
//
// Behavior matches the prior Framer Motion Reveal usage:
//   - default: fires once, then disconnects
//   - amount: 0.2 means 20% of the element must be in viewport
//   - SSR-safe: server render emits initial CSS state (hidden); the hook
//     activates on client mount and flips to in-view when scrolled.
// ─────────────────────────────────────────────────────────────────────────────

interface IntersectOptions {
  once?: boolean;
  amount?: number;
  rootMargin?: string;
}

export function useIntersect({
  once = true,
  amount = 0.2,
  rootMargin = '0px',
}: IntersectOptions = {}) {
  const [inView, setInView] = useState(false);
  const elRef = useRef<HTMLElement | null>(null);
  const onceFired = useRef(false);

  const setRef = useCallback((el: HTMLElement | null) => {
    elRef.current = el;
  }, []);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    // SSR / no-IntersectionObserver fallback: just reveal immediately.
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) {
            onceFired.current = true;
            obs.disconnect();
          }
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold: amount, rootMargin }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [once, amount, rootMargin]);

  return { ref: setRef, inView };
}
