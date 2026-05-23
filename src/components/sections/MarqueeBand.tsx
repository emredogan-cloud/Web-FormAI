import { cn } from '@/lib/cn';

const phrases = [
  'on-device pose detection',
  '138 exercises',
  '30-day personal plan',
  'adaptive recalculation',
  'turkish nutrition library',
  'live activities · widgets',
  'RLS-gated backend',
  'streak intelligence',
  'kvkk · gdpr ready',
];

export function MarqueeBand({ className }: { className?: string }) {
  const repeated = [...phrases, ...phrases];
  return (
    <div className={cn('relative overflow-hidden border-y border-white/[0.05] bg-white/[0.015] py-5', className)}>
      <div className="flex animate-ticker whitespace-nowrap will-change-transform">
        {repeated.map((p, i) => (
          <span
            key={i}
            className="mx-8 font-mono text-xs uppercase tracking-[0.3em] text-white/40"
          >
            <span className="mr-8 text-violet-400/60">★</span>
            {p}
          </span>
        ))}
      </div>
    </div>
  );
}
