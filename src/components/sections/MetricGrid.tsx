'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { Mono } from '@/components/ui/Mono';
import { Reveal } from '@/components/ui/Reveal';
import { cn } from '@/lib/cn';

interface Metric {
  value: string;
  label: string;
  description?: string;
  tone?: 'violet' | 'lime' | 'scan' | 'ember';
}

export function MetricGrid({ metrics, eyebrow }: { metrics: Metric[]; eyebrow?: string }) {
  return (
    <section className="relative py-24 sm:py-28">
      <Container>
        {eyebrow && (
          <div className="mb-10 flex items-center gap-3">
            <span className="h-px w-12 bg-gradient-to-r from-violet-400/60 to-transparent" />
            <Mono>{eyebrow}</Mono>
          </div>
        )}
        <div className="grid gap-px overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.04] sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((m, i) => (
            <Reveal key={m.label} delay={i * 0.06}>
              <motion.div
                whileHover={{ y: -2 }}
                transition={{ duration: 0.3 }}
                className="group relative h-full bg-ink-900/80 p-7 transition-colors hover:bg-ink-850"
              >
                <div
                  className={cn(
                    'pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent opacity-50 transition-opacity group-hover:opacity-100',
                    m.tone === 'lime'
                      ? 'via-lime-500'
                      : m.tone === 'scan'
                        ? 'via-scan-500'
                        : m.tone === 'ember'
                          ? 'via-ember-500'
                          : 'via-violet-400'
                  )}
                />
                <div
                  className={cn(
                    'font-display text-4xl font-semibold tracking-tight sm:text-5xl',
                    m.tone === 'lime'
                      ? 'text-lime-400'
                      : m.tone === 'scan'
                        ? 'text-scan-400'
                        : m.tone === 'ember'
                          ? 'text-ember-400'
                          : 'text-gradient-violet'
                  )}
                >
                  {m.value}
                </div>
                <div className="mt-3 text-sm font-medium text-white/85">{m.label}</div>
                {m.description && (
                  <p className="mt-2 text-xs leading-relaxed text-white/45">{m.description}</p>
                )}
              </motion.div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
