import type { Metadata } from 'next';
import Image from 'next/image';
import { PageHero } from '@/components/sections/PageHero';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal, RevealItem, RevealStagger } from '@/components/ui/Reveal';
import { Card } from '@/components/ui/Card';
import { Pill } from '@/components/ui/Pill';
import { StatRing } from '@/components/ui/StatRing';
import { GlowOrb } from '@/components/ui/GlowOrb';
import { CtaBlock } from '@/components/sections/CtaBlock';
import { ProgressShowcase } from '@/components/sections/ProgressShowcase';
import { SparkChart } from '@/components/ui/SparkChart';

export const metadata: Metadata = {
  title: 'Gelişim — Disiplinini ölçen değil, sürdüren bir zekâ',
  description:
    'Streak intelligence, haftalık retrospektif ve rozet sistemiyle motivasyonunu veriyle besler. 30 günlük takvim her gün senin lehine kalibre olur.',
};

const badges = [
  { name: 'İlk Adım', criteria: '1 gün tamam', unlocked: true, tone: 'violet' as const },
  { name: 'İlk 7 Gün', criteria: '7 günlük seri', unlocked: true, tone: 'ember' as const },
  { name: 'Disiplinli', criteria: '%33 tamam', unlocked: false, tone: 'violet' as const },
  { name: 'Kalori Avcısı', criteria: '5 hedef günü', unlocked: false, tone: 'lime' as const },
  { name: '30 Gün Şampiyonu', criteria: 'Program bitti', unlocked: false, tone: 'scan' as const },
  { name: 'Form Ustası', criteria: 'Form skoru 95+', unlocked: false, tone: 'violet' as const },
];

export default function GelisimPage() {
  return (
    <>
      <PageHero
        eyebrow="Gelişim · streak intelligence"
        title={<>Disiplin bir histir.<br /><span className="text-ember-400">FormAI onu ölçüye çevirir.</span></>}
        description="Streak'ler, rozetler, haftalık retrospektif. Yapay zekâ koçun her sabah seni neyi geliştirmen gerektiğine yönlendirir. Motivasyon bir his değil, sürekli ölçülen bir veriye dönüşür."
        tone="ember"
      >
        <div className="flex flex-wrap gap-2">
          <Pill tone="ember">7 günlük seri</Pill>
          <Pill tone="violet">30 günlük takvim</Pill>
          <Pill tone="lime">Haftalık retrospektif</Pill>
        </div>
      </PageHero>

      {/* Big transformation card */}
      <section className="relative isolate py-12 sm:py-20">
        <GlowOrb tone="ember" size="xl" className="-top-40 left-1/2 -translate-x-1/2 opacity-25" />
        <Container className="relative">
          <Reveal>
            <Card padding="lg" className="overflow-hidden">
              <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr]">
                {/* Visual: before/after */}
                <div className="relative grid grid-cols-2 gap-3">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-white/[0.08]">
                    <Image src="/images/transformation-before.webp" alt="1. gün" fill sizes="(max-width: 1024px) 40vw, 240px" className="object-cover" />
                    <div className="absolute inset-x-3 top-3">
                      <Pill tone="neutral">Gün 1</Pill>
                    </div>
                  </div>
                  <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-ember-500/30 shadow-glow-ember">
                    <Image src="/images/transformation-after.webp" alt="30. gün" fill sizes="(max-width: 1024px) 40vw, 240px" className="object-cover" />
                    <div className="absolute inset-x-3 top-3">
                      <Pill tone="ember">Gün 30</Pill>
                    </div>
                  </div>
                </div>

                <div>
                  <Eyebrow tone="ember">30 günlük değişim</Eyebrow>
                  <h2 className="mt-4 font-display text-display-md text-balance text-gradient">
                    Her gün küçük. Otuz günde belirgin.
                  </h2>
                  <p className="mt-5 text-base leading-relaxed text-white/65">
                    Her tamamlanan antrenman bir kalori puanı, bir form skoru ve bir streak günü
                    olarak hesaplanır. Yapay zekâ; bu üç değişkeni okuyup planını ertesi güne göre yeniden çizer.
                  </p>
                  <div className="mt-8 grid grid-cols-3 gap-3">
                    <MiniCard value="+12%" label="Push gücü" tone="violet" />
                    <MiniCard value="-3°" label="Hip sapması" tone="scan" />
                    <MiniCard value="+1750" label="Kalori" tone="ember" />
                  </div>
                </div>
              </div>
            </Card>
          </Reveal>
        </Container>
      </section>

      {/* Charted progression — PR 3.4
          Pure-SVG line chart of a representative form-score curve over 30
          days. Deepens the transformation-card argument from a snapshot
          (Gün 1 / Gün 30 + 3 mini stats) into a continuous trajectory. */}
      <section className="relative py-20 sm:py-28" id="form-egrisi">
        <Container>
          <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
            <Reveal>
              <div>
                <div className="mb-5 flex items-center gap-2">
                  <span className="h-px w-12 bg-violet-400/70" />
                  <Eyebrow tone="violet">Form skoru · 30 gün</Eyebrow>
                </div>
                <h2 className="text-display-lg font-display text-balance text-gradient">
                  Bir günde değil — <span className="text-gradient-violet">otuz günde.</span>
                </h2>
                <p className="mt-6 max-w-md text-base leading-relaxed text-white/65">
                  İlk hafta öğrenme: kamera kalibre olur, hareket tanıdık gelmeye
                  başlar. İkinci hafta hız: motor öğrenme oturur. Üçüncü hafta
                  rafine: küçük düzeltmeler büyük farklar üretir. Aşağıdaki eğri
                  on günde bir noktayla temsili — gerçek senin verin.
                </p>
                <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-violet-400/25 bg-violet-500/[0.08] px-4 py-2">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-violet-300/80">
                    Temsili eğri
                  </span>
                  <span aria-hidden className="text-white/25">·</span>
                  <span className="text-xs text-white/55">Gerçek veri uygulama içinde</span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-gradient-to-b from-white/[0.025] to-white/[0.01] p-5 sm:p-7">
                <SparkChart
                  data={[
                    { x: 1, y: 64, label: 'Başlangıç' },
                    { x: 4, y: 68 },
                    { x: 7, y: 74 },
                    { x: 10, y: 80 },
                    { x: 13, y: 83 },
                    { x: 16, y: 85 },
                    { x: 19, y: 86 },
                    { x: 22, y: 88 },
                    { x: 25, y: 90 },
                    { x: 28, y: 91 },
                    { x: 30, y: 91, label: 'Şimdi' },
                  ]}
                  yMin={50}
                  yMax={100}
                  xMin={1}
                  xMax={30}
                  yTicks={[60, 70, 80, 90, 100]}
                  xTicks={[1, 7, 14, 21, 30]}
                  yLabel="Form skoru"
                  xLabel="Gün"
                  tone="violet"
                  ariaLabel="Form skorunun 30 gün boyunca 64'ten 91'e yükselen temsili eğrisi"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Streak storytelling */}
      <section className="relative py-24 sm:py-32">
        <Container>
          <div className="grid items-center gap-16 lg:grid-cols-[1fr_1.1fr]">
            <Reveal>
              <div className="relative">
                <div className="pointer-events-none absolute -inset-8 rounded-full bg-ember-500/25 blur-3xl" aria-hidden />
                <div className="relative overflow-hidden rounded-3xl border border-ember-500/20 bg-gradient-to-b from-ink-800 to-ink-900 p-2">
                  <div className="rounded-2xl bg-ink-950 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <Eyebrow tone="ember">Aktif seri</Eyebrow>
                        <div className="mt-2 font-display text-5xl font-semibold text-ember-400">7 gün</div>
                      </div>
                      <StatRing value={70} tone="ember" size={96} stroke={8} />
                    </div>

                    <div className="mt-6 grid grid-cols-7 gap-2">
                      {Array.from({ length: 7 }, (_, i) => i + 1).map((d) => (
                        <div key={d} className="flex aspect-square items-center justify-center rounded-xl border border-ember-500/30 bg-ember-500/[0.08] text-ember-400">
                          <FlameSm />
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 rounded-2xl border border-violet-400/20 bg-violet-500/[0.06] p-4">
                      <Eyebrow>Seri uyarısı</Eyebrow>
                      <div className="mt-2 font-display text-base font-medium text-white">
                        Bugün 22:00&apos;ye kadar 12dk Core yaparsan seri 8&apos;e çıkar.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            <div>
              <Reveal>
                <div className="flex items-center gap-2">
                  <span className="h-px w-8 bg-ember-500/70" />
                  <Eyebrow tone="ember">Streak intelligence</Eyebrow>
                </div>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-5 text-display-lg font-display text-balance text-gradient">
                  Akşam 22:00. <br />
                  <span className="text-ember-400">Streak ölmeden zekân uyarır.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg">
                  Yapay zekâ koçun; gün sonu yaklaştığında tamamlamadığın programını fark eder.
                  Ufak bir 12 dakikalık alternatif önerir — disiplinin sürekliliğini koruyacak kadar küçük,
                  fakat sayılacak kadar gerçek.
                </p>
              </Reveal>
              <Reveal delay={0.18}>
                <div className="mt-10 grid gap-3 sm:grid-cols-2">
                  <Insight label="Risk tespiti" body="Streak yarın 21:30 itibariyle riske girer." />
                  <Insight label="Akıllı öneri" body="12dk Core yerine 8dk Mobility de seri sayar." />
                  <Insight label="Affediliş kuralı" body="Ayda bir gün otomatik telafi hakkı tanınır." />
                  <Insight label="Geri besleme" body="Streak grafiği haftalık retrospektifte özetlenir." />
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* Badges */}
      <section className="relative py-24 sm:py-32">
        <Container>
          <Reveal>
            <div className="max-w-2xl">
              <div className="mb-5 flex items-center gap-2">
                <span className="h-px w-12 bg-violet-400/70" />
                <Eyebrow>Rozet sistemi</Eyebrow>
              </div>
              <h2 className="text-display-lg font-display text-balance text-gradient">
                Disiplinin <span className="text-gradient-violet">sembollere dönüştüğü an.</span>
              </h2>
            </div>
          </Reveal>

          <RevealStagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
            {badges.map((b) => (
              <RevealItem key={b.name}>
                <div className={`group relative overflow-hidden rounded-3xl border p-7 transition-all ${b.unlocked ? 'border-violet-400/25 bg-white/[0.04] shadow-glow-subtle' : 'border-white/[0.06] bg-white/[0.015]'}`}>
                  <div className="flex items-center gap-4">
                    <div className={`flex h-16 w-16 items-center justify-center rounded-2xl border ${b.unlocked ? (b.tone === 'lime' ? 'border-lime-500/40 bg-lime-500/15 text-lime-400 shadow-glow-lime' : b.tone === 'scan' ? 'border-scan-500/40 bg-scan-500/15 text-scan-400 shadow-glow-scan' : b.tone === 'ember' ? 'border-ember-500/40 bg-ember-500/15 text-ember-400 shadow-glow-ember' : 'border-violet-400/40 bg-violet-500/15 text-violet-300') : 'border-white/[0.08] bg-white/[0.025] text-white/30'}`}>
                      {b.unlocked ? <TargetIcon /> : <LockIcon />}
                    </div>
                    <div>
                      <Eyebrow tone={b.unlocked ? b.tone : 'neutral'}>{b.unlocked ? 'Açıldı' : 'Kilitli'}</Eyebrow>
                      <h3 className={`mt-1 font-display text-lg font-semibold ${b.unlocked ? 'text-white' : 'text-white/50'}`}>{b.name}</h3>
                      <p className={`mt-1 text-sm ${b.unlocked ? 'text-white/65' : 'text-white/35'}`}>{b.criteria}</p>
                    </div>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealStagger>
        </Container>
      </section>

      <ProgressShowcase />

      <CtaBlock
        eyebrow="30 gün sonra"
        title={<>30 gün sonra başka biri olacaksın.<br /><span className="text-ember-400">FormAI o değişimi günü gününe kaydeder.</span></>}
        description="Streakleri, rozetleri, haftalık retrospektifi ve kişisel programını şimdi kur. İlk yedi gün ücretsiz."
        primaryLabel="Disiplinimi kur"
        secondaryHref="/destek"
        secondaryLabel="Önce sorularımı sorayım"
      />
    </>
  );
}

function MiniCard({ value, label, tone }: { value: string; label: string; tone: 'violet' | 'lime' | 'scan' | 'ember' }) {
  const color = { violet: 'text-violet-300', lime: 'text-lime-400', scan: 'text-scan-400', ember: 'text-ember-400' }[tone];
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
      <div className={`font-display text-2xl font-semibold ${color}`}>{value}</div>
      <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-white/45">{label}</div>
    </div>
  );
}

function Insight({ label, body }: { label: string; body: string }) {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
      <Eyebrow>{label}</Eyebrow>
      <p className="mt-3 text-sm leading-relaxed text-white/65">{body}</p>
    </div>
  );
}

function FlameSm() {
  return (
    <svg width="14" height="14" viewBox="0 0 12 12" fill="currentColor">
      <path d="M6 11 C3 11 1.5 9 1.5 7 C1.5 5.5 3 4 3.5 4 C3.5 5 4.5 5 4.5 4 C4.5 2.5 5.5 1 6 1 C6 3 7.5 4 8.5 5.5 C9.5 7 10.5 8 10.5 8.5 C10.5 10 8 11 6 11 Z" />
    </svg>
  );
}
function TargetIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="10" cy="10" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="10" cy="10" r="1.5" fill="currentColor" />
    </svg>
  );
}
function LockIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="4" y="9" width="12" height="9" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 9 V6 a3 3 0 016 0 V9" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
