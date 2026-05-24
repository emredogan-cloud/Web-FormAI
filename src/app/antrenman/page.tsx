import type { Metadata } from 'next';
import { alternatesFor } from '@/lib/metadata';
import Image from 'next/image';
import { PageHero } from '@/components/sections/PageHero';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal, RevealItem, RevealStagger } from '@/components/ui/Reveal';
import { Card } from '@/components/ui/Card';
import { Pill } from '@/components/ui/Pill';
import { Button } from '@/components/ui/Button';
import { HudPanel } from '@/components/ui/HudPanel';
import { StatRing } from '@/components/ui/StatRing';
import { GlowOrb } from '@/components/ui/GlowOrb';
import { CtaBlock } from '@/components/sections/CtaBlock';
import { MetricGrid } from '@/components/sections/MetricGrid';

export const metadata: Metadata = {
  title: 'Antrenman — Kameran formunu okur',
  description:
    'BlazePose tabanlı pose detection ile gerçek zamanlı form düzeltme. 138 egzersiz, 8 analiz modülü, 30 günlük adaptif program.',
  alternates: alternatesFor('/antrenman'),
};

const steps = [
  { no: '01', title: 'Kamera açılır', body: 'On-device ML Kit BlazePose, 33 keypoint çıkartır. Saniyede 30 kare.' },
  { no: '02', title: 'İskelet kalibre olur', body: 'Omuz, dirsek, kalça, diz açıları sıfırlanır. Vücut tipine göre yeniden ayarlanır.' },
  { no: '03', title: 'AI koç konuşur', body: 'Sapma anında flutter_tts ile sesli komut. Hareket tamamlanmadan müdahale.' },
  { no: '04', title: 'Veri saklanır', body: 'Form skoru ve tempo Riverpod state üzerinden Supabase RLS satırına yazılır.' },
];

const analyzers = [
  { name: 'Push / Press', count: '28 egzersiz', tone: 'violet' as const },
  { name: 'Squat / Lunge', count: '21 egzersiz', tone: 'lime' as const },
  { name: 'Core / Plank', count: '19 egzersiz', tone: 'scan' as const },
  { name: 'Hinge / Deadlift', count: '14 egzersiz', tone: 'ember' as const },
  { name: 'Pull', count: '17 egzersiz', tone: 'violet' as const },
  { name: 'Mobility / Hold', count: '12 hareket', tone: 'scan' as const },
  { name: 'Cardio / HIIT', count: '15 modül', tone: 'ember' as const },
  { name: 'Silent (no-form)', count: '12 hareket', tone: 'lime' as const },
];

export default function AntrenmanPage() {
  return (
    <>
      <PageHero
        eyebrow="Antrenman zekâsı · BlazePose"
        title={<>Sahanda <span className="text-gradient-violet">eğitmen var.</span><br />Sadece görünmez.</>}
        description="FormAI'nin kamera çekirdeği, hareketi nicel hale getirir. Form skoru, açı sapması, tempo kilidi — hepsi kameran üzerinden anlık çalışır. Bulut yok. Gecikme yok. Gözetim yok."
        tone="ember"
      >
        <div className="flex flex-wrap gap-2">
          <Pill tone="ember">8 pose analyzer</Pill>
          <Pill tone="lime">138 egzersiz</Pill>
          <Pill tone="scan">30 fps · on-device</Pill>
          <Pill tone="violet">7s cold start</Pill>
        </div>
      </PageHero>

      {/* Big interactive coach panel */}
      <section className="relative isolate py-12 sm:py-20">
        <GlowOrb tone="ember" size="xl" className="-top-32 left-1/2 -translate-x-1/2 opacity-30" />
        <Container className="relative">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2.5rem] border border-violet-400/15 bg-gradient-to-b from-ink-800 to-ink-900 shadow-[0_60px_120px_-20px_rgba(124,92,255,0.4)]">
              <div className="grid lg:grid-cols-[1.1fr_1fr]">
                {/* MP.3 — image area framed as a centered phone-style mock.
                    Source is 853×1844 (FormAI app ceiling); a phone-bounded
                    display (max-w 320 mobile / 360 desktop) keeps the
                    rendered CSS pixels close to source-native so the browser
                    barely upscales, removing the perceived blur. Combined
                    with the q95 webp re-encode this brings the HUD text
                    overlays back to crisp. */}
                <div className="relative flex items-center justify-center bg-gradient-to-b from-ink-950/40 via-transparent to-ink-950/60 py-10 sm:py-12 lg:py-16">
                  <div className="relative aspect-[9/19.5] w-full max-w-[300px] overflow-hidden rounded-[2.4rem] border border-violet-400/25 bg-ink-900 p-[3px] shadow-[0_40px_100px_-20px_rgba(124,92,255,0.45)] sm:max-w-[320px] lg:max-w-[360px]">
                    <div className="relative h-full w-full overflow-hidden rounded-[2.15rem] bg-ink-950">
                      <Image
                        src="/images/pose-analysis.webp"
                        alt="FormAI pose analizi — gerçek zamanlı form ölçümü"
                        fill
                        sizes="(max-width: 640px) 300px, (max-width: 1024px) 320px, 360px"
                        className="object-cover object-center"
                      />
                      <div
                        aria-hidden
                        className="pointer-events-none absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-ink-950 ring-1 ring-white/5"
                      />
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 rounded-[2.15rem] bg-gradient-to-tr from-transparent via-white/[0.03] to-white/[0.07]"
                      />
                    </div>
                  </div>
                </div>
                <div className="relative flex flex-col justify-center gap-6 p-10 sm:p-14">
                  <Eyebrow tone="violet">Live readout</Eyebrow>
                  <h2 className="font-display text-display-md text-balance text-gradient">
                    Plank · 00:42 / 01:00
                  </h2>
                  <div className="grid grid-cols-2 gap-3">
                    <HudPanel label="Core stability" value="OPT" tone="lime" status="optimal" />
                    <HudPanel label="Elbow angle" value="92°" tone="scan" status="active" />
                    <HudPanel label="Hip alignment" value="2°" unit="dev" tone="violet" status="optimal" />
                    <HudPanel label="Shoulders" value="0.98" tone="lime" status="active" />
                  </div>
                  <div className="flex items-center gap-4 rounded-2xl border border-violet-400/20 bg-violet-500/[0.06] p-4">
                    <StatRing value={98} label="form" tone="violet" size={72} stroke={6} />
                    <div>
                      <div className="font-display text-base font-semibold text-white">Form skoru 98/100</div>
                      <p className="mt-1 text-sm text-white/55">
                        Sapma kalçada başlıyor — koçun sesli bildirim gönderiyor.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* How it works steps */}
      <section className="relative py-24 sm:py-32">
        <Container>
          <Reveal>
            <div className="max-w-2xl">
              <div className="mb-5 flex items-center gap-2">
                <span className="h-px w-12 bg-violet-400/70" />
                <Eyebrow>Akış · saniyede 30 kez</Eyebrow>
              </div>
              <h2 className="text-display-lg font-display text-balance text-gradient">
                Hareket başladığında <span className="text-gradient-violet">FormAI çoktan ölçüyor.</span>
              </h2>
            </div>
          </Reveal>
          {/* MP.6 — Akış 4-card pipeline.
              Each card carries a "step status dot" that pulses in sequence
              via a pure-CSS animation (akis-pulse @ globals.css, 8 s total
              cycle = 4 cards × 2 s each, delayed per index). The cards
              also share a continuous connecting line so they read as a
              live system pipeline, not 4 isolated tiles. Hover lifts the
              card + intensifies the ember accent. All ember-toned to
              match the Antrenman pillar identity locked in MP.5. */}
          <div className="mt-14 relative">
            {/* Connector line — desktop: horizontal across the row;
                mobile: vertical down the left. Sits behind the cards. */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-3 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-ember-500/30 to-transparent lg:left-0 lg:right-0 lg:top-1/2 lg:bottom-auto lg:h-px lg:w-auto lg:bg-gradient-to-r lg:from-transparent lg:via-ember-500/30 lg:to-transparent"
            />

            <RevealStagger className="relative grid gap-4 lg:grid-cols-4" stagger={0.08}>
              {steps.map((s, i) => (
                <RevealItem key={s.no}>
                  <div
                    className="group akis-card relative h-full overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.02] p-7 transition-all duration-300 hover:-translate-y-0.5 hover:border-ember-500/30 hover:bg-white/[0.04] hover:shadow-glow-ember"
                    style={{ ['--akis-delay' as string]: `${i * 2}s` }}
                  >
                    {/* Top accent line — base low opacity, pulses to full
                        opacity during this card's active window in the
                        sequence (handled by .akis-card CSS in globals.css). */}
                    <span
                      aria-hidden
                      className="akis-accent pointer-events-none absolute -top-px left-6 right-6 h-px bg-gradient-to-r from-transparent via-ember-500/80 to-transparent"
                    />

                    {/* Header row: step status dot + step eyebrow */}
                    <div className="flex items-center gap-3">
                      <span aria-hidden className="relative flex h-2 w-2">
                        <span className="akis-dot-ping absolute inline-flex h-full w-full rounded-full bg-ember-500" />
                        <span className="akis-dot relative inline-flex h-2 w-2 rounded-full bg-ember-500/30" />
                      </span>
                      <Eyebrow tone="ember">Adım {s.no}</Eyebrow>
                    </div>

                    <h3 className="mt-6 font-display text-xl font-semibold text-white">{s.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/60">{s.body}</p>
                    <div className="mt-8 font-mono text-[10px] text-white/30">{`> next_step(${i + 1})`}</div>
                  </div>
                </RevealItem>
              ))}
            </RevealStagger>
          </div>
        </Container>
      </section>

      {/* Analyzer catalog */}
      <section className="relative py-24 sm:py-32">
        <Container>
          <div className="grid items-end gap-10 lg:grid-cols-[1.2fr_1fr]">
            <Reveal>
              <div>
                <div className="mb-5 flex items-center gap-2">
                  <span className="h-px w-12 bg-violet-400/70" />
                  <Eyebrow>Analyzer kataloğu</Eyebrow>
                </div>
                <h2 className="text-display-lg font-display text-balance text-gradient">
                  Sekiz pose analyzer. <br />
                  <span className="text-gradient-violet">138 egzersize tek bir mantık.</span>
                </h2>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="max-w-md text-sm leading-relaxed text-white/55 lg:text-right">
                Her hareket sınıfı kendi analizöründen geçer. Anlamlı form kontrolü olmayan
                hareketler (mobility, jump rope, glute bridge) sessiz analizöre düşer — koçun seni asla yalandan uyarmaz.
              </p>
            </Reveal>
          </div>

          <RevealStagger className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" stagger={0.05}>
            {analyzers.map((a) => (
              <RevealItem key={a.name}>
                <div className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 transition-all hover:border-white/[0.15] hover:bg-white/[0.04]">
                  <div className="flex items-start justify-between">
                    <div>
                      <Eyebrow tone={a.tone}>POSE</Eyebrow>
                      <h3 className="mt-3 font-display text-lg font-semibold text-white">{a.name}</h3>
                    </div>
                    <span className={`flex h-2 w-2 rounded-full ${a.tone === 'lime' ? 'bg-lime-500' : a.tone === 'scan' ? 'bg-scan-500' : a.tone === 'ember' ? 'bg-ember-500' : 'bg-violet-400'} animate-pulse`} />
                  </div>
                  <div className="mt-6 font-mono text-xs uppercase tracking-widest text-white/45">{a.count}</div>
                </div>
              </RevealItem>
            ))}
          </RevealStagger>
        </Container>
      </section>

      {/* Two card highlight */}
      <section className="relative py-24 sm:py-32">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            <Reveal>
              <Card padding="none" interactive className="overflow-hidden">
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image src="/images/hiit-card.webp" alt="HIIT modülü" fill sizes="(max-width: 1024px) 90vw, 600px" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-transparent" />
                </div>
                <div className="p-8">
                  <Eyebrow tone="ember">HIIT · sınırlarını zorla</Eyebrow>
                  <h3 className="mt-3 font-display text-2xl font-semibold text-white">Belirgin karın kasları için 12dk HIIT</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/60">
                    Tabata + intervalli core devresi. Kalp hızı zonun otomatik hesaplanır,
                    set arası süresi nefes hızına göre kalibre olur.
                  </p>
                </div>
              </Card>
            </Reveal>
            <Reveal delay={0.1}>
              <Card padding="none" interactive className="overflow-hidden">
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image src="/images/power-card.webp" alt="Demir altı paket gücü" fill sizes="(max-width: 1024px) 90vw, 600px" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-transparent" />
                </div>
                <div className="p-8">
                  <Eyebrow tone="violet">Strength · paket gücü</Eyebrow>
                  <h3 className="mt-3 font-display text-2xl font-semibold text-white">Üst gövde strength devresi</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/60">
                    Push, pull ve press analyzer&apos;ı aynı devrede.
                    Tempo eccentric ağırlıklı; form skoru 90 altına düşerse devre uzar.
                  </p>
                </div>
              </Card>
            </Reveal>
          </div>
        </Container>
      </section>

      <MetricGrid
        eyebrow="Pose çekirdeği · üretim"
        metrics={[
          { value: '33', label: 'keypoint', description: 'BlazePose full-body iskelet.', tone: 'violet' },
          { value: '30fps', label: 'analiz frekansı', description: 'Frame drop yok; ML inferans cihazda.', tone: 'lime' },
          { value: '8', label: 'analyzer sınıfı', description: 'Her hareket familyası kendi mantığında.', tone: 'scan' },
          { value: '0', label: 'bulut çağrısı', description: 'Video kameradan asla çıkmaz.', tone: 'ember' },
        ]}
      />

      <CtaBlock
        eyebrow="Form. Tempo. Tekrar."
        title={<>İlk antrenmanın 12 dakika sürer.<br /><span className="text-gradient-violet">Tüm öğrenme süreci ondan başlıyor.</span></>}
        description="Kuruluş; bir kez kamera izni, bir kez vücut kalibrasyonu. Programının ilk hareketine 90 saniyede ulaşırsın."
        primaryLabel="Kamerayı başlat"
        secondaryHref="/beslenme"
        secondaryLabel="Beslenmeyi gör"
      />
    </>
  );
}
