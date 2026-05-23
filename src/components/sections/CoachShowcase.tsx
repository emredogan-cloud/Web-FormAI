'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { Mono } from '@/components/ui/Mono';
import { Reveal } from '@/components/ui/Reveal';
import { HudPanel } from '@/components/ui/HudPanel';
import { StatRing } from '@/components/ui/StatRing';
import { GlowOrb } from '@/components/ui/GlowOrb';
import { Button } from '@/components/ui/Button';

export function CoachShowcase() {
  const prefersReduced = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden py-24 sm:py-32 lg:py-40">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <GlowOrb tone="violet" size="xl" className="-top-32 -right-40 opacity-30" />
        <GlowOrb tone="scan" size="lg" className="bottom-0 -left-20 opacity-25" />
      </div>

      <Container className="relative">
        <div className="grid items-center gap-16 lg:grid-cols-[1fr_1.15fr]">
          {/* Showcase image */}
          <Reveal direction="right" className="relative">
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[2.5rem] border border-violet-400/15 bg-ink-900 shadow-[0_50px_120px_-20px_rgba(124,92,255,0.45)]">
              <Image
                src="/images/pose-analysis.png"
                alt="FormAI plank analizi — kamera ile pose detection"
                fill
                sizes="(max-width: 1024px) 90vw, 540px"
                className="object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-transparent" />

              {/* Animated scanline */}
              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-x-4 h-px bg-gradient-to-r from-transparent via-violet-400 to-transparent shadow-[0_0_24px_rgba(124,92,255,0.7)]"
                initial={{ top: '15%' }}
                animate={prefersReduced ? { top: '50%' } : { top: ['15%', '85%', '15%'] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* HUD readouts */}
              <div className="absolute left-5 top-5 hud-panel max-w-[180px] p-3">
                <Mono tone="violet">ML Pose · live</Mono>
                <div className="mt-2 space-y-1 font-mono text-[10px] text-white/70">
                  <div className="flex justify-between"><span>SHOULDERS</span><span className="text-lime-400">0.98</span></div>
                  <div className="flex justify-between"><span>ELBOWS</span><span className="text-lime-400">0.97</span></div>
                  <div className="flex justify-between"><span>CORE</span><span className="text-lime-400">0.98</span></div>
                  <div className="flex justify-between"><span>HIPS</span><span className="text-violet-300">0.95</span></div>
                  <div className="flex justify-between"><span>KNEES</span><span className="text-violet-300">0.96</span></div>
                </div>
              </div>

              <div className="absolute bottom-5 right-5 hud-panel p-3">
                <Mono tone="scan">Elbow angle</Mono>
                <div className="mt-1 font-display text-2xl font-semibold text-scan-400">92°</div>
              </div>

              <div className="absolute bottom-5 left-5 hud-panel p-3">
                <Mono tone="lime">Core stability</Mono>
                <div className="mt-1 font-display text-sm font-semibold uppercase tracking-widest text-lime-400">Optimal</div>
              </div>
            </div>
          </Reveal>

          {/* Copy */}
          <div className="relative">
            <Reveal>
              <div className="flex items-center gap-2">
                <span className="h-px w-8 bg-violet-400/70" />
                <Mono>AI Coach · gerçek zamanlı</Mono>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 text-display-lg font-display text-balance text-gradient">
                Aynaya bakar gibi.
                <br />
                <span className="text-gradient-violet">Sadece ayna senin formunu okuyor.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-white/65 sm:text-lg">
                FormAI&apos;nin pose motoru, BlazePose iskeleti üzerinden omuz, dirsek, kalça
                ve diz açılarını saniyede 30 kez ölçer. Sapma fark edildiği anda
                sesli koçun seni hizalar — hareket tamamlanmadan, sakatlığı önler.
              </p>
            </Reveal>

            <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-5">
              <Reveal delay={0.18}>
                <div className="flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
                  <StatRing value={98} label="Form skoru" tone="violet" size={84} stroke={6} />
                  <div>
                    <div className="font-display text-lg font-semibold text-white">Form skoru</div>
                    <p className="mt-1 text-xs text-white/55">Her tekrarın anlık güveni</p>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.24}>
                <div className="flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
                  <StatRing value={82} label="Hız tempo" tone="lime" size={84} stroke={6} />
                  <div>
                    <div className="font-display text-lg font-semibold text-white">Tempo kilit</div>
                    <p className="mt-1 text-xs text-white/55">Eccentric/concentric ritmi</p>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.3}>
                <HudPanel label="Hip alignment" value="5°" unit="dev" tone="scan" status="warn" className="w-full" />
              </Reveal>
              <Reveal delay={0.36}>
                <HudPanel label="Rep" value="12 / 15" tone="ember" status="active" className="w-full" />
              </Reveal>
            </div>

            <Reveal delay={0.42}>
              <div className="mt-10">
                <Button href="/antrenman" variant="secondary" arrow>
                  Antrenman zekâsını gör
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
