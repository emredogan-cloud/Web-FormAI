import { site } from '@/lib/site';
import { cn } from '@/lib/cn';

// ─────────────────────────────────────────────────────────────────────────────
// UserCountBadge
//
// PR 1.6 — renders ONLY when site.userCount.value is set AND meets
// minDisplayCount. Returns null otherwise (no fabricated numbers, no
// fake "10,000+" claims). When active, replaces the hero stats row with
// a single tasteful "Beta · X erken kullanıcı" line.
//
// Use `isUserCountReady()` in parent components to decide which surface
// (this badge vs the default stats row) to render.
// ─────────────────────────────────────────────────────────────────────────────

const STAGE_LABEL: Record<'beta' | 'launch' | 'production', string> = {
  beta: 'Beta',
  launch: 'Launch',
  production: 'Production',
};

export function isUserCountReady(): boolean {
  const uc = site.userCount;
  return uc.value !== null && uc.value >= uc.minDisplayCount;
}

export function UserCountBadge({ className }: { className?: string }) {
  const { userCount } = site;
  if (!isUserCountReady() || userCount.value === null) return null;

  const stageLabel = STAGE_LABEL[userCount.stage];
  const formattedCount = userCount.value.toLocaleString('tr-TR');
  const formattedDate = userCount.capturedAt ? formatTrDate(userCount.capturedAt) : null;

  return (
    <div
      className={cn(
        'inline-flex flex-col items-start gap-1.5',
        className
      )}
      aria-label={`${stageLabel}: ${formattedCount} erken kullanıcı`}
    >
      <div className="inline-flex items-center gap-3 rounded-full border border-violet-400/25 bg-violet-500/[0.08] px-4 py-2 backdrop-blur-md">
        {/* Live pulse — reinforces "real data" */}
        <span aria-hidden className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-400" />
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-violet-200">
          {stageLabel}
        </span>
        <span aria-hidden className="text-white/25">·</span>
        <span className="font-display text-base font-semibold tabular-nums text-white">
          {formattedCount}
        </span>
        <span className="text-sm text-white/65">erken kullanıcı</span>
      </div>
      {formattedDate && (
        <span className="font-mono text-[10px] uppercase tracking-widest text-white/35 pl-1">
          Son ölçüm: {formattedDate}
        </span>
      )}
    </div>
  );
}

function formatTrDate(iso: string): string {
  // ISO → "14 Mayıs 2026". Defensive: returns the raw string on parse fail
  // so a malformed config doesn't break the build.
  try {
    return new Intl.DateTimeFormat('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}
