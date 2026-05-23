import { site } from '@/lib/site';
import { cn } from '@/lib/cn';

// ─────────────────────────────────────────────────────────────────────────────
// AppRating
//
// Trust badge — PR 1.3. Renders only when at least one store has a real
// `average` AND a `count` that meets `site.ratings.minReviewCount`. When no
// store qualifies, the component returns null (no visual artifact, no fake
// stars, no "coming soon" filler). This makes fabricated ratings structurally
// impossible.
//
// Once ratings cross the threshold, fill the four fields per store in
// src/lib/site.ts → ratings — the badge appears automatically on every
// surface that mounts <AppRating />.
// ─────────────────────────────────────────────────────────────────────────────

type StoreKey = 'appStore' | 'play';

interface StoreLabel {
  short: string;
  full: string;
  icon: React.ReactNode;
}

const STORE_LABELS: Record<StoreKey, StoreLabel> = {
  appStore: { short: 'App Store', full: 'iOS · App Store', icon: <AppleGlyph /> },
  play: { short: 'Google Play', full: 'Android · Google Play', icon: <PlayGlyph /> },
};

export function AppRating({
  className,
  align = 'left',
  size = 'sm',
}: {
  className?: string;
  align?: 'left' | 'center';
  size?: 'sm' | 'md';
}) {
  const { ratings } = site;
  const min = ratings.minReviewCount;

  const isStoreLive = (key: StoreKey): boolean => {
    const s = ratings[key];
    return s.average !== null && (s.count ?? 0) >= min;
  };

  const liveStores = (['appStore', 'play'] as StoreKey[]).filter(isStoreLive);

  // Invisible until real data crosses the credibility threshold.
  if (liveStores.length === 0) return null;

  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-3',
        align === 'center' && 'justify-center',
        className
      )}
      aria-label="Mağaza puanları"
    >
      {liveStores.map((key) => (
        <RatingBadge key={key} storeKey={key} size={size} />
      ))}
    </div>
  );
}

function RatingBadge({ storeKey, size }: { storeKey: StoreKey; size: 'sm' | 'md' }) {
  const s = site.ratings[storeKey];
  const label = STORE_LABELS[storeKey];

  // Defensive: parent already filtered, but type-narrow for TS.
  if (s.average === null || s.count === null) return null;

  const sizing =
    size === 'md'
      ? { wrap: 'gap-3 px-4 py-2.5', avg: 'text-base', count: 'text-xs', iconBox: 'h-7 w-7' }
      : { wrap: 'gap-2.5 px-3 py-2', avg: 'text-sm', count: 'text-[11px]', iconBox: 'h-6 w-6' };

  const formattedCount = formatReviewCount(s.count);
  const Wrapper = s.url ? 'a' : ('div' as const);
  const wrapperProps =
    s.url && Wrapper === 'a'
      ? { href: s.url, target: '_blank' as const, rel: 'noopener noreferrer' }
      : {};

  return (
    <Wrapper
      {...wrapperProps}
      className={cn(
        'group inline-flex items-center rounded-full border border-white/[0.08] bg-white/[0.025] backdrop-blur-md transition-all',
        s.url && 'hover:border-violet-400/30 hover:bg-white/[0.05] hover:shadow-glow-subtle',
        sizing.wrap
      )}
    >
      <span
        className={cn(
          'flex shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-white/75',
          sizing.iconBox
        )}
      >
        {label.icon}
      </span>
      <Stars value={s.average} />
      <span className={cn('font-display font-semibold text-white tabular-nums', sizing.avg)}>
        {s.average.toFixed(1)}
      </span>
      <span className={cn('text-white/45', sizing.count)}>
        · {formattedCount} yorum
      </span>
      <span
        className={cn(
          'hidden font-mono uppercase tracking-widest text-white/40 sm:inline',
          sizing.count
        )}
      >
        · {label.short}
      </span>
    </Wrapper>
  );
}

function Stars({ value }: { value: number }) {
  const id = `stars-grad-${value.toString().replace('.', '-')}`;
  const pct = Math.max(0, Math.min(100, (value / 5) * 100));
  return (
    <svg
      viewBox="0 0 80 16"
      width="80"
      height="16"
      role="img"
      aria-label={`${value.toFixed(1)} / 5`}
      className="shrink-0"
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="100%" y2="0">
          <stop offset={`${pct}%`} stopColor="#C8FF00" />
          <stop offset={`${pct}%`} stopColor="rgba(255,255,255,0.16)" />
        </linearGradient>
      </defs>
      {[0, 16, 32, 48, 64].map((x) => (
        <path
          key={x}
          d={`M${x + 8} 1.5l1.95 4.45 4.85.45-3.65 3.25 1.1 4.75L${x + 8} 11.95 3.75 14.4l1.1-4.75-3.65-3.25 4.85-.45z`}
          transform={`translate(${x - 8} 0)`}
          fill={`url(#${id})`}
        />
      ))}
    </svg>
  );
}

function formatReviewCount(n: number): string {
  if (n >= 1000) {
    const k = n / 1000;
    return `${k % 1 === 0 ? k.toFixed(0) : k.toFixed(1).replace('.', ',')}K`;
  }
  return n.toLocaleString('tr-TR');
}

// ── Store glyphs (inline SVG, consistent with existing icon weight) ────────

function AppleGlyph() {
  return (
    <svg width="11" height="13" viewBox="0 0 18 18" fill="currentColor" aria-hidden>
      <path d="M13.1 9.4c0-2.2 1.8-3.2 1.9-3.3-1-1.4-2.6-1.7-3.1-1.7-1.3-.1-2.6.8-3.3.8-.7 0-1.7-.8-2.8-.8C4.4 4.4 3 5.3 2.2 6.8 1.5 9.7 2.6 14 4 16.3c.7 1.1 1.4 2.3 2.4 2.3 1 0 1.4-.6 2.6-.6s1.5.6 2.6.6c1.1 0 1.8-1.1 2.4-2.2.8-1.3 1.1-2.5 1.1-2.6-.1 0-2.1-.8-2.1-3.2zM11 3.1c.5-.6.9-1.4.8-2.3-.8 0-1.7.5-2.2 1.1-.5.5-.9 1.4-.8 2.2.8.1 1.7-.4 2.2-1z" />
    </svg>
  );
}
function PlayGlyph() {
  return (
    <svg width="11" height="11" viewBox="0 0 18 18" fill="currentColor" aria-hidden>
      <path d="M3 1.5 L13.5 9 L3 16.5 Z" />
    </svg>
  );
}
