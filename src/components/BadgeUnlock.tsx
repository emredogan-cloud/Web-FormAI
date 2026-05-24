'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useConsent } from '@/components/consent/ConsentProvider';
import { cn } from '@/lib/cn';

/* ────────────────────────────────────────────────────────────────────────────
 * BadgeUnlock — PR 6.4 · the final signature micro-interaction.
 *
 * When a visitor genuinely reaches the bottom of the site, a small in-app-style
 * "keşif" (discovery) badge slides into the corner — echoing the app's real
 * badge system (/gelisim: İlk Adım, İlk 7 Gün, Form Ustası …) without faking an
 * accomplishment. It's a one-time delight, not a notification.
 *
 * TRUTHFULNESS (rule #7): framed honestly as a discovery marker — "siteyi baştan
 * sona gezdin" is literally true — and the copy states plainly that the REAL
 * badges unlock in the app with real progress. No fabricated achievement.
 *
 * NO-FATIGUE design (the brief's hard constraint):
 *   • Shows AT MOST ONCE, EVER, per browser (localStorage flag).
 *   • Only after a real milestone (the footer scrolls into view).
 *   • Only once the cookie banner is resolved (hasDecided) → never stacks with
 *     it, never two bottom surfaces at once.
 *   • Non-blocking corner toast (z below the consent banner), auto-dismisses
 *     after a few seconds, and is manually dismissible. No sound, no repeat.
 *
 * TECH (rule #2 — no Framer Motion): IntersectionObserver to trigger + a CSS
 * transition for enter/exit. prefers-reduced-motion is honoured globally (the
 * transition collapses to ~0ms, so it simply appears — still dismissible).
 * Mounted once in the root layout (dynamic, ssr:false) inside ConsentProvider.
 * ──────────────────────────────────────────────────────────────────────────── */

const BADGE_KEY = 'formai_badge_v1';
const AUTO_DISMISS_MS = 7000;
const EXIT_MS = 450;

function alreadyShown(): boolean {
  try {
    return window.localStorage.getItem(BADGE_KEY) === '1';
  } catch {
    return false;
  }
}
function markShown(): void {
  try {
    window.localStorage.setItem(BADGE_KEY, '1');
  } catch {
    /* private mode / disabled storage → it just may show again next visit */
  }
}

export function BadgeUnlock() {
  const { hasDecided } = useConsent();
  const [mounted, setMounted] = useState(false); // in the DOM
  const [shown, setShown] = useState(false); // CSS "in" state
  const armedRef = useRef(false);
  const autoTimer = useRef<number>(0);
  const exitTimer = useRef<number>(0);

  const dismiss = useCallback(() => {
    window.clearTimeout(autoTimer.current);
    setShown(false);
    exitTimer.current = window.setTimeout(() => setMounted(false), EXIT_MS);
  }, []);

  useEffect(() => {
    if (armedRef.current || !hasDecided || alreadyShown()) return;
    const footer = document.querySelector('footer');
    if (!footer) return;
    armedRef.current = true;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || alreadyShown()) return;
        markShown();
        io.disconnect();
        setMounted(true);
        // Two rAFs so the element paints in its "out" state first, then
        // transitions in (the CSS-only equivalent of an enter animation).
        requestAnimationFrame(() => requestAnimationFrame(() => setShown(true)));
        autoTimer.current = window.setTimeout(dismiss, AUTO_DISMISS_MS);
      },
      // Fire a touch before the absolute bottom so it lands as the footer arrives.
      { rootMargin: '0px 0px -8% 0px' }
    );
    io.observe(footer);
    return () => io.disconnect();
  }, [hasDecided, dismiss]);

  useEffect(
    () => () => {
      window.clearTimeout(autoTimer.current);
      window.clearTimeout(exitTimer.current);
    },
    []
  );

  if (!mounted) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'fixed bottom-4 right-4 z-[70] w-[min(21rem,calc(100vw-2rem))]',
        'transition-all duration-500 ease-out motion-reduce:transition-none',
        shown ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      )}
    >
      <div className="relative overflow-hidden rounded-2xl border border-violet-400/25 bg-ink-950/85 p-4 backdrop-blur-2xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7),0_0_0_1px_rgba(124,92,255,0.18)]">
        {/* violet edge wash — matches the consent banner's polish */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-violet-400/60 to-transparent"
        />

        <button
          type="button"
          onClick={dismiss}
          aria-label="Kapat"
          className="absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full text-white/40 transition-colors hover:bg-white/[0.06] hover:text-white/80"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>

        <div className="flex items-start gap-3.5 pr-6">
          <Medallion />
          <div className="min-w-0">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-violet-300/80">
              Rozet · Keşif
            </div>
            <div className="mt-1 font-display text-lg font-semibold text-white">
              Web Ziyaretçisi
            </div>
            <p className="mt-1 text-[13px] leading-relaxed text-white/55">
              Siteyi baştan sona gezdin. Küçük bir keşif rozeti — gerçek rozetler
              uygulamada, gerçek ilerlemeyle açılır.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// In-app-style medallion — violet→scan gradient ring + check. Vector (crisp).
function Medallion() {
  return (
    <span className="relative flex h-11 w-11 flex-none items-center justify-center">
      <span
        aria-hidden
        className="absolute inset-0 rounded-full bg-violet-500/25 blur-md motion-safe:animate-pulse-glow"
      />
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none" className="relative" aria-hidden>
        <defs>
          <linearGradient id="badge-ring" x1="6" y1="6" x2="38" y2="38" gradientUnits="userSpaceOnUse">
            <stop stopColor="#A98AFF" />
            <stop offset="1" stopColor="#5FE3FF" />
          </linearGradient>
        </defs>
        <circle cx="22" cy="22" r="15" fill="#0A0714" stroke="url(#badge-ring)" strokeWidth="2" />
        <path
          d="M15.5 22.5l4.2 4.2 8.8-9.4"
          stroke="url(#badge-ring)"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
