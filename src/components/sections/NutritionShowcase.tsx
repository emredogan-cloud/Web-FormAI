'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { GlowOrb } from '@/components/ui/GlowOrb';

const macros = [
  { name: 'Protein', current: 60, target: 174, color: '#1FCFFF', class: 'text-scan-400' },
  { name: 'Karbonhidrat', current: 87, target: 131, color: '#FF3D8E', class: 'text-macro-carb' },
  { name: 'Yağ', current: 29, target: 58, color: '#E0FF1A', class: 'text-macro-fat' },
];

const meals = [
  { tag: 'Kahvaltı', name: 'Fıstık Ezmeli Protein Tost', kcal: 420, img: '/images/meal-breakfast-1.jpeg' },
  { tag: 'Öğle', name: 'Etli Tarhana Çorbası', kcal: 380, img: '/images/meal-lunch-1.jpeg' },
  { tag: 'Akşam', name: 'Tavuklu Bulgur Salatası', kcal: 440, img: '/images/meal-dinner-1.jpeg' },
  { tag: 'Ara öğün', name: 'Fit Ara Öğün', kcal: 180, img: '/images/meal-snack-1.jpeg' },
];

export function NutritionShowcase() {
  return (
    <section className="relative isolate overflow-hidden py-24 sm:py-32 lg:py-40">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <GlowOrb tone="lime" size="xl" className="-top-40 -left-40 opacity-25" />
        <GlowOrb tone="violet" size="lg" className="bottom-0 -right-32 opacity-25" />
      </div>

      <Container className="relative">
        <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_1fr]">
          {/* Copy */}
          <div>
            <Reveal>
              <div className="flex items-center gap-2">
                <span className="h-px w-8 bg-lime-500/70" />
                <Eyebrow tone="lime">Beslenme · adaptive</Eyebrow>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 text-display-lg font-display text-balance text-gradient">
                Diyet değil. <span className="text-lime-400">Hizalanmış bir gün.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-white/65 sm:text-lg">
                Tarhana çorbasından bulgur salatasına — Türk mutfağıyla eğitilmiş zekâ,
                makrolarını günün hedefine göre dengeler. Protein hedefini kaçırırsan
                bir sonraki öğünü senin için yeniden hesaplar.
              </p>
            </Reveal>

            <div className="mt-10 grid gap-4">
              {macros.map((m, i) => (
                <Reveal key={m.name} delay={0.16 + i * 0.06}>
                  <MacroBar {...m} />
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.4}>
              <div className="mt-10">
                <Button href="/beslenme" variant="secondary" arrow>
                  Beslenme zekâsını gör
                </Button>
              </div>
            </Reveal>
          </div>

          {/* Meals card */}
          <Reveal direction="left">
            <div className="relative">
              <div className="relative overflow-hidden rounded-3xl border border-lime-500/15 bg-gradient-to-b from-ink-800 to-ink-900 p-2 shadow-[0_40px_120px_-20px_rgba(200,255,0,0.25),0_40px_120px_-20px_rgba(0,0,0,0.6)]">
                <div className="rounded-2xl bg-ink-950 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Eyebrow tone="lime">Bugünün menüsü</Eyebrow>
                      <div className="mt-1 font-display text-lg font-semibold text-white">
                        4 öğün · 1420 kcal
                      </div>
                    </div>
                    <div className="rounded-full border border-lime-500/30 bg-lime-500/10 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-lime-400">
                      hedefe %85
                    </div>
                  </div>

                  <ul className="mt-6 space-y-3">
                    {meals.map((meal, i) => (
                      <motion.li
                        key={meal.name}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.5, delay: i * 0.08 }}
                        className="group flex items-center gap-4 rounded-2xl border border-white/[0.05] bg-white/[0.02] p-3 transition-colors hover:border-white/[0.12] hover:bg-white/[0.04]"
                      >
                        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-white/10">
                          <Image src={meal.img} alt={meal.name} fill sizes="56px" className="object-cover" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-mono text-[10px] uppercase tracking-widest text-violet-300/80">{meal.tag}</div>
                          <div className="truncate font-display text-sm font-medium text-white">{meal.name}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-display text-sm font-semibold text-lime-400">{meal.kcal}</div>
                          <div className="font-mono text-[10px] uppercase text-white/40">kcal</div>
                        </div>
                      </motion.li>
                    ))}
                  </ul>

                  <div className="mt-6 rounded-2xl border border-violet-400/20 bg-violet-500/[0.08] p-4">
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-md bg-violet-500/20 text-violet-300">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1 L7 5 L11 6 L7 7 L6 11 L5 7 L1 6 L5 5 Z" fill="currentColor" /></svg>
                      </span>
                      <div className="flex-1">
                        <div className="font-display text-sm font-medium text-white">Protein hedefini kaçırıyorsun</div>
                        <div className="mt-0.5 text-xs text-white/55">→ Akşama tavuk/balık bazlı bir ana öğün ekle.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function MacroBar({
  name,
  current,
  target,
  color,
  class: textClass,
}: {
  name: string;
  current: number;
  target: number;
  color: string;
  class: string;
}) {
  const pct = Math.min(100, (current / target) * 100);
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
      <div className="flex items-end justify-between">
        <span className="font-display text-sm font-medium text-white/90">{name}</span>
        <span className="font-mono text-xs">
          <span className={textClass}>{current}g</span>
          <span className="text-white/40"> / {target}g</span>
        </span>
      </div>
      <div className="relative mt-3 h-1.5 overflow-hidden rounded-full bg-white/[0.05]">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ background: color, boxShadow: `0 0 12px ${color}` }}
        />
      </div>
    </div>
  );
}
