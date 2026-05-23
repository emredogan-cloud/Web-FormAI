import { cn } from '@/lib/cn';

// ─────────────────────────────────────────────────────────────────────────────
// Eyebrow
//
// The subtle, sans-serif counterpart to <Mono>. Use for section eyebrows,
// category labels, and any small uppercase tracked text that is NOT a
// data readout or HUD overlay.
//
// Usage rules (codified in WEB_BRANDING_DECISIONS.md):
//
//   ✅ Use <Eyebrow> for:
//     - Section eyebrows above a heading ("Yapan kim", "Manifesto")
//     - Footer column titles, navigation category labels
//     - Generic "label" treatment in non-data UI
//
//   ✅ Use <Mono> only for:
//     - HUD data readouts (inside HudPanel, AppRating, UserCountBadge)
//     - One eyebrow per page hero (Pre-launch · Türkiye, etc.)
//     - System tags pretending to be terminal output
//
// Visual difference:
//   - Mono   : JetBrains Mono, 10px, tracking 0.25em, full brand-color saturation
//   - Eyebrow: Inter (sans), 10-11px, tracking 0.2em, slightly muted color
//
// The split keeps the HUD aesthetic feeling like data and gives "section
// labels" a softer, less repetitive rhythm.
// ─────────────────────────────────────────────────────────────────────────────

type Tone = 'violet' | 'lime' | 'scan' | 'ember' | 'neutral';

const toneClass: Record<Tone, string> = {
  violet: 'text-violet-300/70',
  lime: 'text-lime-400/75',
  scan: 'text-scan-400/75',
  ember: 'text-ember-400/75',
  neutral: 'text-white/45',
};

export function Eyebrow({
  children,
  className,
  tone = 'neutral',
}: {
  children: React.ReactNode;
  className?: string;
  tone?: Tone;
}) {
  return (
    <span
      className={cn(
        'inline-block text-[10px] font-medium uppercase tracking-[0.2em]',
        toneClass[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
