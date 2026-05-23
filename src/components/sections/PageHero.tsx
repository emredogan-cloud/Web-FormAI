'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { Mono } from '@/components/ui/Mono';
import { GlowOrb } from '@/components/ui/GlowOrb';
import { cn } from '@/lib/cn';

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
  const prefersReduced = useReducedMotion();
  const fade = (delay = 0) => ({
    initial: { opacity: 0, y: prefersReduced ? 0 : 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section className="relative isolate overflow-hidden pt-36 pb-20 sm:pt-44 sm:pb-28">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <GlowOrb tone={tone} size="xl" className="-top-32 left-1/2 -translate-x-1/2 opacity-40" />
        <div className="absolute inset-0 bg-grid-violet mask-fade-b opacity-50" />
      </div>

      <Container className="relative">
        <div className={cn(align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl')}>
          <motion.div {...fade(0)} className={cn('flex items-center gap-2.5', align === 'center' && 'justify-center')}>
            <span className={cn('h-px w-8', tone === 'lime' ? 'bg-lime-500/70' : tone === 'scan' ? 'bg-scan-500/70' : tone === 'ember' ? 'bg-ember-500/70' : 'bg-violet-400/70')} />
            <Mono tone={tone}>{eyebrow}</Mono>
          </motion.div>

          <motion.h1
            {...fade(0.08)}
            className="mt-5 font-display text-display-xl text-balance text-gradient"
          >
            {title}
          </motion.h1>

          {description && (
            <motion.p
              {...fade(0.18)}
              className={cn('mt-6 text-pretty text-base leading-relaxed text-white/65 sm:text-lg', align !== 'center' && 'max-w-2xl')}
            >
              {description}
            </motion.p>
          )}

          {children && <motion.div {...fade(0.26)} className="mt-8">{children}</motion.div>}
        </div>
      </Container>
    </section>
  );
}
