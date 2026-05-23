'use client';

import { useIntersect } from '@/lib/use-intersect';
import { cn } from '@/lib/cn';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { GlowOrb } from '@/components/ui/GlowOrb';
import { StatRing } from '@/components/ui/StatRing';

const days = Array.from({ length: 30 }, (_, i) => i + 1);
const completed = 7;
const today = 8;

export function ProgressShowcase() {
  // PR 4.3 — IntersectionObserver replaces the per-cell motion.div that
  // previously drove the 30-day calendar reveal. Single observer for the
  // whole grid; cells stagger via CSS transition-delay tied to day index.
  const calendar = useIntersect({ once: true, amount: 0.4 });

  return (
    <section className="relative isolate overflow-hidden py-24 sm:py-32 lg:py-40">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <GlowOrb tone="violet" size="xl" className="-bottom-40 -left-40 opacity-30" />
      </div>

      <Container className="relative">
        <div className="grid items-center gap-16 lg:grid-cols-[1fr_1fr]">
          {/* Visual: 30-day calendar */}
          <Reveal direction="right" className="relative">
            <div className="relative overflow-hidden rounded-3xl border border-violet-400/15 bg-gradient-to-b from-ink-800 to-ink-900 p-2 shadow-[0_40px_120px_-20px_rgba(124,92,255,0.4)]">
              <div className="rounded-2xl bg-ink-950 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Eyebrow tone="ember">30 günlük program</Eyebrow>
                    <div className="mt-1 font-display text-lg font-semibold text-white">
                      Gün {today} · 23 gün kaldı
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-full border border-ember-500/40 bg-ember-500/10 px-3 py-1">
                    <FlameSm />
                    <span className="font-mono text-[10px] uppercase tracking-widest text-ember-400">7 günlük seri</span>
                  </div>
                </div>

                <div ref={calendar.ref} className="mt-6 grid grid-cols-7 gap-2">
                  {days.map((d) => {
                    const isCompleted = d <= completed;
                    const isToday = d === today;
                    const isLocked = d > today;
                    return (
                      <div
                        key={d}
                        className={cn(
                          'relative flex aspect-square items-center justify-center rounded-xl border font-display text-sm font-medium transition-all duration-300 ease-out-back',
                          calendar.inView ? 'opacity-100 scale-100' : 'opacity-0 scale-75',
                          isToday
                            ? 'border-violet-400/60 bg-violet-500/20 text-white shadow-[0_0_20px_rgba(124,92,255,0.45)]'
                            : isCompleted
                              ? 'border-violet-400/30 bg-violet-500/[0.08] text-violet-200'
                              : isLocked
                                ? 'border-white/[0.04] bg-white/[0.015] text-white/25'
                                : ''
                        )}
                        style={{
                          transitionDelay: calendar.inView ? `${d * 0.012}s` : '0s',
                        }}
                      >
                        {isCompleted ? <CheckIcon /> : d}
                        {isToday && (
                          <span className="absolute -bottom-1 right-1 h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Bottom row: stats */}
                <div className="mt-6 grid grid-cols-3 gap-3">
                  <MiniStat label="Tamamlama" value="%23" tone="violet" />
                  <MiniStat label="Yakılan" value="1750 kcal" tone="ember" />
                  <MiniStat label="Toplam set" value="84" tone="scan" />
                </div>
              </div>
            </div>
          </Reveal>

          {/* Copy */}
          <div>
            <Reveal>
              <div className="flex items-center gap-2">
                <span className="h-px w-8 bg-ember-500/70" />
                <Eyebrow tone="ember">Gelişim · streak</Eyebrow>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 text-display-lg font-display text-balance text-gradient">
                Disiplin bir grafiktir. <br />
                <span className="text-ember-400">FormAI onu sürdürür.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-white/65 sm:text-lg">
                Streakler. Rozetler. Haftalık retrospektifler. Yapay zekâ koçun, son yedi gününü
                okur — neyi geliştirdiğini söyler, neyi bıraktığını fark eder.
                Motivasyonu bir his değil, sürekli ölçülen bir veriye çevirir.
              </p>
            </Reveal>

            <div className="mt-10 grid grid-cols-2 gap-5">
              <Reveal delay={0.18}>
                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
                  <Eyebrow tone="ember">Aktif seri</Eyebrow>
                  <div className="mt-3 flex items-center gap-3">
                    <span className="font-display text-4xl font-semibold text-ember-400">7</span>
                    <span className="text-sm text-white/55">gün</span>
                  </div>
                  <p className="mt-2 text-xs text-white/45">Bozma uyarısı 22:00&apos;de</p>
                </div>
              </Reveal>
              <Reveal delay={0.24}>
                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
                  <Eyebrow>Açılan rozet</Eyebrow>
                  <div className="mt-3 flex items-center gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-b from-violet-400 to-violet-700 shadow-[0_0_24px_rgba(124,92,255,0.5)]">
                      <TargetIcon />
                    </span>
                    <div>
                      <div className="font-display text-sm font-semibold text-white">İlk Adım</div>
                      <div className="text-xs text-white/45">7 gün tamam</div>
                    </div>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="col-span-2 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Eyebrow>Haftalık retrospektif</Eyebrow>
                      <p className="mt-2 text-sm text-white/65">
                        Push gücün %12 arttı. Hip alignment sapması son 3 antrenmanda 5°&apos;ye düştü.
                      </p>
                    </div>
                    <StatRing value={72} label="haftalık" tone="violet" size={84} stroke={6} />
                  </div>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.42}>
              <div className="mt-10">
                <Button href="/gelisim" variant="secondary" arrow>
                  Gelişim sistemini gör
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}

function MiniStat({ label, value, tone }: { label: string; value: string; tone: 'violet' | 'lime' | 'scan' | 'ember' }) {
  const colorClass = {
    violet: 'text-violet-300',
    lime: 'text-lime-400',
    scan: 'text-scan-400',
    ember: 'text-ember-400',
  }[tone];
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
      <div className="font-mono text-[9px] uppercase tracking-widest text-white/45">{label}</div>
      <div className={`mt-1 font-display text-base font-semibold ${colorClass}`}>{value}</div>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M3 6.5 L5 8.5 L9 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function FlameSm() {
  return (
    <svg width="10" height="10" viewBox="0 0 12 12" fill="currentColor" className="text-ember-400">
      <path d="M6 11 C3 11 1.5 9 1.5 7 C1.5 5.5 3 4 3.5 4 C3.5 5 4.5 5 4.5 4 C4.5 2.5 5.5 1 6 1 C6 3 7.5 4 8.5 5.5 C9.5 7 10.5 8 10.5 8.5 C10.5 10 8 11 6 11 Z" />
    </svg>
  );
}
function TargetIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="7" stroke="white" strokeWidth="1.5" />
      <circle cx="10" cy="10" r="4" stroke="white" strokeWidth="1.5" />
      <circle cx="10" cy="10" r="1.5" fill="white" />
    </svg>
  );
}
