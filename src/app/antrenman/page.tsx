import type { Metadata } from 'next';
import Image from 'next/image';
import { PageHero } from '@/components/sections/PageHero';
import { Container } from '@/components/ui/Container';
import { Mono } from '@/components/ui/Mono';
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
        tone="violet"
      >
        <div className="flex flex-wrap gap-2">
          <Pill tone="violet">8 pose analyzer</Pill>
          <Pill tone="lime">138 egzersiz</Pill>
          <Pill tone="scan">30 fps · on-device</Pill>
          <Pill tone="ember">7s cold start</Pill>
        </div>
      </PageHero>

      {/* Big interactive coach panel */}
      <section className="relative isolate py-12 sm:py-20">
        <GlowOrb tone="violet" size="xl" className="-top-32 left-1/2 -translate-x-1/2 opacity-30" />
        <Container className="relative">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2.5rem] border border-violet-400/15 bg-gradient-to-b from-ink-800 to-ink-900 shadow-[0_60px_120px_-20px_rgba(124,92,255,0.4)]">
              <div className="grid lg:grid-cols-[1.1fr_1fr]">
                <div className="relative aspect-[4/5] lg:aspect-auto lg:min-h-[640px]">
                  <Image src="/images/pose-analysis.png" alt="FormAI pose analizi" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink-950/80 via-ink-950/20 to-ink-900" />
                </div>
                <div className="relative flex flex-col justify-center gap-6 p-10 sm:p-14">
                  <Mono tone="violet">Live readout</Mono>
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
                <Mono>Akış · saniyede 30 kez</Mono>
              </div>
              <h2 className="text-display-lg font-display text-balance text-gradient">
                Hareket başladığında <span className="text-gradient-violet">FormAI çoktan ölçüyor.</span>
              </h2>
            </div>
          </Reveal>
          <RevealStagger className="mt-14 grid gap-4 lg:grid-cols-4" stagger={0.08}>
            {steps.map((s, i) => (
              <RevealItem key={s.no}>
                <div className="group relative h-full overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.02] p-7 transition-all hover:border-violet-400/25 hover:bg-white/[0.04]">
                  <div className="pointer-events-none absolute -top-px left-6 right-6 h-px bg-gradient-to-r from-transparent via-violet-400/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  <Mono>Adım {s.no}</Mono>
                  <h3 className="mt-6 font-display text-xl font-semibold text-white">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/60">{s.body}</p>
                  <div className="mt-8 font-mono text-[10px] text-white/30">{`> next_step(${i + 1})`}</div>
                </div>
              </RevealItem>
            ))}
          </RevealStagger>
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
                  <Mono>Analyzer kataloğu</Mono>
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
                      <Mono tone={a.tone}>POSE</Mono>
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
                  <Mono tone="ember">HIIT · sınırlarını zorla</Mono>
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
                  <Mono tone="violet">Strength · paket gücü</Mono>
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
