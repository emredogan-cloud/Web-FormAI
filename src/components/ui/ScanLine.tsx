import { cn } from '@/lib/cn';

export function ScanLine({ className, tone = 'violet' }: { className?: string; tone?: 'violet' | 'lime' | 'scan' }) {
  const tones = {
    violet: 'via-violet-400/80',
    lime: 'via-lime-500/80',
    scan: 'via-scan-500/80',
  }[tone];
  return (
    <div
      aria-hidden
      className={cn(
        'pointer-events-none absolute inset-x-0 h-px bg-gradient-to-r from-transparent to-transparent animate-scan',
        tones,
        className
      )}
    />
  );
}
