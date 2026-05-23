import { cn } from '@/lib/cn';

export function Card({
  children,
  className,
  interactive = false,
  padding = 'lg',
}: {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
  padding?: 'sm' | 'md' | 'lg' | 'xl' | 'none';
}) {
  const padMap = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10',
  } as const;
  return (
    <div
      className={cn(
        'relative rounded-3xl border border-white/[0.06] bg-gradient-to-b from-white/[0.04] to-white/[0.015] backdrop-blur-xl',
        'shadow-[0_1px_0_0_rgba(255,255,255,0.05)_inset,0_30px_80px_-30px_rgba(0,0,0,0.6)]',
        interactive &&
          'transition-all duration-500 hover:border-violet-400/20 hover:shadow-[0_1px_0_0_rgba(255,255,255,0.08)_inset,0_30px_100px_-30px_rgba(124,92,255,0.4)] hover:-translate-y-0.5',
        padMap[padding],
        className
      )}
    >
      {children}
    </div>
  );
}
