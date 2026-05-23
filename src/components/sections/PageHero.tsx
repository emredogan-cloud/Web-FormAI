import { Container } from '@/components/ui/Container';
import { Mono } from '@/components/ui/Mono';
import { GlowOrb } from '@/components/ui/GlowOrb';
import { cn } from '@/lib/cn';

// PR 4.3 — was a client component with Framer Motion fade-up animations.
// Mount-time fade-up doesn't need a 50 KB animation library; Tailwind's
// `animate-fade-up` keyframe (defined in tailwind.config.ts) + inline
// animation-delay does the same job in pure CSS. Component is now a server
// component again. prefers-reduced-motion is respected globally via the
// @media block in globals.css that zeros all animations.

const ACCENT_LINE = {
  violet: 'bg-violet-400/70',
  lime: 'bg-lime-500/70',
  scan: 'bg-scan-500/70',
  ember: 'bg-ember-500/70',
} as const;

export function PageHero({
  eyebrow,
  title,
  description,
  tone = 'violet',
  align = 'left',
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  tone?: 'violet' | 'lime' | 'scan' | 'ember';
  align?: 'left' | 'center';
  children?: React.ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden pt-36 pb-20 sm:pt-44 sm:pb-28">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <GlowOrb tone={tone} size="xl" className="-top-32 left-1/2 -translate-x-1/2 opacity-40" />
        <div className="absolute inset-0 bg-grid-violet mask-fade-b opacity-50" />
      </div>

      <Container className="relative">
        <div className={cn(align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl')}>
          <div
            className={cn(
              'animate-fade-up flex items-center gap-2.5',
              align === 'center' && 'justify-center'
            )}
          >
            <span className={cn('h-px w-8', ACCENT_LINE[tone])} />
            <Mono tone={tone}>{eyebrow}</Mono>
          </div>

          <h1
            className="animate-fade-up mt-5 font-display text-display-xl text-balance text-gradient"
            style={{ animationDelay: '0.08s' }}
          >
            {title}
          </h1>

          {description && (
            <p
              className={cn(
                'animate-fade-up mt-6 text-pretty text-base leading-relaxed text-white/65 sm:text-lg',
                align !== 'center' && 'max-w-2xl'
              )}
              style={{ animationDelay: '0.18s' }}
            >
              {description}
            </p>
          )}

          {children && (
            <div
              className="animate-fade-up mt-8"
              style={{ animationDelay: '0.26s' }}
            >
              {children}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
