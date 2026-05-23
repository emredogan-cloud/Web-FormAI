import { cn } from '@/lib/cn';

export function Pill({
  children,
  className,
  tone = 'violet',
  icon,
}: {
  children: React.ReactNode;
  className?: string;
  tone?: 'violet' | 'lime' | 'ember' | 'scan' | 'neutral';
  icon?: React.ReactNode;
}) {
  const tones = {
    violet: 'border-violet-400/30 bg-violet-500/10 text-violet-200',
    lime: 'border-lime-500/30 bg-lime-500/10 text-lime-400',
    ember: 'border-ember-500/30 bg-ember-500/10 text-ember-400',
    scan: 'border-scan-500/30 bg-scan-500/10 text-scan-400',
    neutral: 'border-white/10 bg-white/[0.04] text-white/75',
  }[tone];
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium backdrop-blur-sm',
        tones,
        className
      )}
    >
      {icon && <span className="-ml-0.5 flex h-3.5 w-3.5 items-center justify-center">{icon}</span>}
      {children}
    </span>
  );
}
