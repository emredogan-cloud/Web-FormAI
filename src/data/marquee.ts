// ─────────────────────────────────────────────────────────────────────────────
// MarqueeBand content
//
// The MarqueeBand component reads this file and renders in one of two modes:
//   - TECH mode (default today): scrolling text strip of 6 verifiable
//     product facts.
//   - PRESS mode: auto-activates when `press.length >= 3`. The same
//     component swaps text phrases for outlet logo images.
//
// Activating press mode is data-only — no component change.
// ─────────────────────────────────────────────────────────────────────────────

export interface TechFact {
  id: string;
  label: string;
}

export interface PressMention {
  id: string;
  name: string;
  logoSrc: string; // /press/{slug}.svg — monochrome SVG preferred
  url?: string;
  date?: string; // ISO date
}

// ── TECH mode (active today) ────────────────────────────────────────────────
// Six strongest verifiable claims, each one mappable to the FormAI codebase
// or shipped legal/product docs. Kept tight to preserve the marquee rhythm.
export const techFacts: TechFact[] = [
  { id: 'pose-detection', label: 'on-device pose detection' },
  { id: 'exercises-138', label: '138 exercises' },
  { id: 'analyzers-8', label: '8 pose analyzers' },
  { id: 'plan-30', label: '30-day personal plan' },
  { id: 'nutrition-tr', label: 'turkish nutrition library' },
  { id: 'kvkk-gdpr', label: 'kvkk · gdpr ready' },
];

// ── PRESS mode (dormant) ────────────────────────────────────────────────────
// Add entries here when coverage lands. Mode auto-flips at length >= 3 (see
// getMarqueeMode below — keep this gate conservative; one or two mentions
// don't yet warrant "Featured in" framing).
//
// Schema example (commented; remove the comment markers and fill in real data):
// {
//   id: 'webrazzi-2026-05',
//   name: 'Webrazzi',
//   logoSrc: '/press/webrazzi.svg',
//   url: 'https://webrazzi.com/2026/05/...',
//   date: '2026-05-15',
// },
export const press: PressMention[] = [];

export const MARQUEE_PRESS_THRESHOLD = 3;

export type MarqueeMode = 'tech' | 'press';

export function getMarqueeMode(): MarqueeMode {
  return press.length >= MARQUEE_PRESS_THRESHOLD ? 'press' : 'tech';
}
