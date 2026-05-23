'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { cn } from '@/lib/cn';

interface Feature {
  title: string;
  body: string;
  icon?: React.ReactNode;
}

export function FeatureBlock({
  eyebrow,
  title,
  description,
  features,
  imageSrc,
  imageAlt,
  flip = false,
  tone = 'violet',
  imageMode = 'phone',
}: {
  eyebrow: string;
  title: React.ReactNode;
  description: React.ReactNode;
  features: Feature[];
  imageSrc: string;
  imageAlt: string;
  flip?: boolean;
  tone?: 'violet' | 'lime' | 'scan' | 'ember';
  imageMode?: 'phone' | 'card' | 'full';
}) {
  const accent = {
    violet: { dot: 'bg-violet-400', mono: 'violet' as const, glow: 'tone-violet' },
    lime: { dot: 'bg-lime-500', mono: 'lime' as const, glow: 'tone-lime' },
    scan: { dot: 'bg-scan-500', mono: 'scan' as const, glow: 'tone-scan' },
    ember: { dot: 'bg-ember-500', mono: 'ember' as const, glow: 'tone-ember' },
  }[tone];

  return (
    <section className="relative isolate py-24 sm:py-32 lg:py-36">
      <Container>
        <div className={cn('grid items-center gap-16 lg:grid-cols-2', flip && 'lg:[&>:first-child]:order-2')}>
          <Reveal className="relative">
            {imageMode === 'phone' ? (
              <PhoneCard src={imageSrc} alt={imageAlt} tone={tone} />
            ) : imageMode === 'card' ? (
              <ImageCard src={imageSrc} alt={imageAlt} tone={tone} />
            ) : (
              <FullImage src={imageSrc} alt={imageAlt} tone={tone} />
            )}
          </Reveal>

          <div>
            <Reveal>
              <div className="flex items-center gap-2">
                <span className={cn('h-px w-8', accent.dot.replace('bg-', 'bg-'))} />
                <Eyebrow tone={accent.mono}>{eyebrow}</Eyebrow>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 text-display-lg font-display text-balance text-gradient">
                {title}
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-white/65 sm:text-lg">
                {description}
              </p>
            </Reveal>

            <ul className="mt-10 grid gap-5">
              {features.map((f, i) => (
                <Reveal key={f.title} delay={0.18 + i * 0.06}>
                  <li className="group flex items-start gap-4 rounded-2xl border border-white/[0.05] bg-white/[0.025] p-5 transition-all duration-300 hover:border-white/[0.1] hover:bg-white/[0.04]">
                    <span className={cn('mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border', tone === 'lime' ? 'border-lime-500/30 bg-lime-500/10 text-lime-400' : tone === 'scan' ? 'border-scan-500/30 bg-scan-500/10 text-scan-400' : tone === 'ember' ? 'border-ember-500/30 bg-ember-500/10 text-ember-400' : 'border-violet-400/30 bg-violet-500/10 text-violet-300')}>
                      {f.icon ?? <Sparkle />}
                    </span>
                    <div className="flex-1">
                      <h3 className="font-display text-base font-semibold text-white">{f.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-white/55">{f.body}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}

function PhoneCard({ src, alt, tone }: { src: string; alt: string; tone: 'violet' | 'lime' | 'scan' | 'ember' }) {
  const ring = {
    violet: 'shadow-[0_40px_120px_-10px_rgba(124,92,255,0.5)] border-violet-400/25',
    lime: 'shadow-[0_40px_120px_-10px_rgba(200,255,0,0.4)] border-lime-500/30',
    scan: 'shadow-[0_40px_120px_-10px_rgba(31,207,255,0.45)] border-scan-500/30',
    ember: 'shadow-[0_40px_120px_-10px_rgba(255,122,26,0.4)] border-ember-500/30',
  }[tone];

  return (
    <div className="relative mx-auto w-full max-w-md">
      <motion.div
        whileHover={{ y: -6, rotate: -0.5 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'relative aspect-[9/19.5] overflow-hidden rounded-[3rem] border bg-ink-900 p-1.5',
          ring
        )}
      >
        <div className="relative h-full w-full overflow-hidden rounded-[2.5rem] bg-ink-950">
          <Image src={src} alt={alt} fill sizes="(max-width: 1024px) 90vw, 480px" className="object-cover" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-white/[0.05]" />
        </div>
      </motion.div>
    </div>
  );
}

function ImageCard({ src, alt }: { src: string; alt: string; tone: string }) {
  return (
    <div className="relative mx-auto w-full">
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-white/[0.08] bg-ink-900 shadow-[0_50px_120px_-20px_rgba(0,0,0,0.7)]"
      >
        <Image src={src} alt={alt} fill sizes="(max-width: 1024px) 90vw, 560px" className="object-cover" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/60 via-transparent to-transparent" />
      </motion.div>
    </div>
  );
}

function FullImage({ src, alt }: { src: string; alt: string; tone: string }) {
  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-white/[0.06] bg-ink-900">
      <div className="relative aspect-[4/3] w-full">
        <Image src={src} alt={alt} fill sizes="(max-width: 1024px) 90vw, 560px" className="object-cover" />
      </div>
    </div>
  );
}

function Sparkle() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 1L9.5 6.5L15 8L9.5 9.5L8 15L6.5 9.5L1 8L6.5 6.5L8 1Z" fill="currentColor" />
    </svg>
  );
}
