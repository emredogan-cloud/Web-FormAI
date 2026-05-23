import { cn } from '@/lib/cn';

export function Mono({
  children,
  className,
  tone = 'violet',
}: {
  children: React.ReactNode;
  className?: string;
  tone?: 'violet' | 'lime' | 'scan' | 'ember' | 'neutral';
}) {
  const tones = {
    violet: 'text-violet-300/80',
    lime: 'text-lime-400/90',
    scan: 'text-scan-400/90',
    ember: 'text-ember-400/90',
    neutral: 'text-white/55',
  }[tone];
  return (
    <span
      className={cn(
        'font-mono text-[10px] uppercase tracking-[0.25em]',
        tones,
        className
      )}
    >
      {children}
    </span>
  );
}
