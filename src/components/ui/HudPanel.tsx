import { cn } from '@/lib/cn';
import { Mono } from './Mono';

export function HudPanel({
  label,
  value,
  unit,
  status,
  className,
  tone = 'violet',
}: {
  label: string;
  value: React.ReactNode;
  unit?: string;
  status?: 'good' | 'warn' | 'optimal' | 'active';
  className?: string;
  tone?: 'violet' | 'lime' | 'scan' | 'ember';
}) {
  const accent = {
    violet: { border: 'border-violet-400/30', glow: 'shadow-glow-subtle', text: 'text-violet-200' },
    lime: { border: 'border-lime-500/40', glow: 'shadow-glow-lime', text: 'text-lime-400' },
    scan: { border: 'border-scan-500/40', glow: 'shadow-glow-scan', text: 'text-scan-400' },
    ember: { border: 'border-ember-500/40', glow: 'shadow-glow-ember', text: 'text-ember-400' },
  }[tone];

  return (
    <div
      className={cn(
        'inline-flex min-w-[180px] flex-col gap-1.5 rounded-xl border bg-ink-900/70 px-4 py-3 backdrop-blur-md',
        accent.border,
        accent.glow,
        className
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <Mono tone={tone}>{label}</Mono>
        {status && (
          <span className="flex items-center gap-1 text-[10px] font-mono uppercase tracking-widest">
            <span className={cn('h-1.5 w-1.5 rounded-full animate-pulse', tone === 'lime' ? 'bg-lime-500' : tone === 'scan' ? 'bg-scan-500' : tone === 'ember' ? 'bg-ember-500' : 'bg-violet-400')} />
            <span className="text-white/55">{status}</span>
          </span>
        )}
      </div>
      <div className="flex items-baseline gap-1">
        <span className={cn('font-display text-2xl font-semibold', accent.text)}>{value}</span>
        {unit && <span className="text-xs text-white/45">{unit}</span>}
      </div>
    </div>
  );
}
