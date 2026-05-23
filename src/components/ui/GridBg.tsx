import { cn } from '@/lib/cn';

export function GridBg({ className, fade = true }: { className?: string; fade?: boolean }) {
  return (
    <div
      aria-hidden
      className={cn(
        'pointer-events-none absolute inset-0 bg-grid-violet opacity-50',
        fade && 'mask-fade-b',
        className
      )}
    />
  );
}
