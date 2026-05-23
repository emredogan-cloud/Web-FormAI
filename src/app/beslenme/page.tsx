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
import { NutritionShowcase } from '@/components/sections/NutritionShowcase';

export const metadata: Metadata = {
  title: 'Beslenme — Makroların seninle birlikte düşünür',
  description:
    'Türk mutfağıyla eğitilmiş beslenme zekâsı. Makrolar günün hedefine göre dengelenir, alerji ve damak zevkin baştan filtrelenir.',
};

const dietProfiles = [
  { tag: 'Standart', kcal: '1850 kcal', tone: 'violet' as const, color: 'from-violet-500/20 to-violet-700/10' },
  { tag: 'Vegan', kcal: '1620 kcal', tone: 'lime' as const, color: 'from-lime-500/20 to-lime-700/10' },
  { tag: 'Vejetaryen', kcal: '1750 kcal', tone: 'lime' as const, color: 'from-lime-500/15 to-violet-700/10' },
  { tag: 'Keto', kcal: '1450 kcal', tone: 'ember' as const, color: 'from-ember-500/20 to-violet-700/10' },
];

const flow = [
  { no: '01', title: 'Profil okunur', body: 'Hedef · alerji · damak zevki · hazırlık tempo. Onboarding sırasında bir kez.' },
  { no: '02', title: 'Plan üretilir', body: 'Türk mutfağı veritabanı üzerinden 30 günlük menü; tarifle birlikte.' },
  { no: '03', title: 'Sapma fark edilir', body: 'Bir öğünü atlarsan günün geri kalanı yeniden hesaplanır.' },
  { no: '04', title: 'Akşam dengelenir', body: 'Protein eksiği için ana öğünün önerisi günlük güncellenir.' },
];

export default function BeslenmePage() {
  return (
    <>
      <PageHero
        eyebrow="Beslenme · adaptive"
        title={<><span className="text-gradient-violet">Türk mutfağıyla</span> eğitilmiş beslenme zekâsı.</>}
        description="Tarhana çorbasından bulgur salatasına. FormAI; tarifi, makroyu, kişiselleştirmeyi ve dengeyi tek bir mutfak haline getirir."
        tone="lime"
      >
        <div className="flex flex-wrap gap-2">
          <Pill tone="lime">Türk mutfağı</Pill>
          <Pill tone="violet">Standart · Vegan · Vejetaryen · Keto</Pill>
          <Pill tone="scan">Alerji filtresi</Pill>
        </div>
      </PageHero>

      {/* Daily ring + macros card */}
      <section className="relative isolate py-12 sm:py-20">
        <GlowOrb tone="lime" size="xl" className="-top-40 left-1/2 -translate-x-1/2 opacity-30" />
        <Container className="relative">
          <Reveal>
            <Card padding="lg" className="overflow-hidden">
              <div className="grid items-center gap-10 lg:grid-cols-[auto_1fr_auto]">
                {/* Big ring */}
                <div className="relative">
                  <div className="pointer-events-none absolute -inset-10 rounded-full bg-lime-500/20 blur-3xl" aria-hidden />
                  <StatRing value={48} label="bugün" tone="lime" size={220} stroke={14} />
                  <div className="mt-4 text-center">
                    <div className="font-mono text-[10px] uppercase tracking-widest text-white/45">Tüketilen</div>
                    <div className="font-display text-3xl font-semibold text-white">840 <span className="text-base text-white/40">/ 1741 kcal</span></div>
                  </div>
                </div>

                {/* Middle: macros */}
                <div className="space-y-4">
                  <Eyebrow tone="lime">Makro dağılımı</Eyebrow>
                  <MacroRow name="Protein" current={60} target={174} color="#1FCFFF" />
                  <MacroRow name="Karbonhidrat" current={87} target={131} color="#FF3D8E" />
                  <MacroRow name="Yağ" current={29} target={58} color="#E0FF1A" />
                </div>

                {/* Right: smart suggestion */}
                <div className="hud-panel min-w-[220px] max-w-xs space-y-3 p-5">
                  <Eyebrow tone="violet">AI önerisi</Eyebrow>
                  <div className="font-display text-base font-semibold text-white">
                    Akşam için Izgara Bonfile + bulgur pilavı.
                  </div>
                  <p className="text-xs text-white/55">+48g protein · +580 kcal. Bugünü hedef üzerinde kapatır.</p>
                </div>
              </div>
            </Card>
          </Reveal>
        </Container>
      </section>

      {/* Visual gallery of meals */}
      <section className="relative py-24 sm:py-32">
        <Container>
          <Reveal>
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-2">
                <span className="h-px w-12 bg-lime-500/70" />
                <Eyebrow tone="lime">Mutfak kütüphanesi</Eyebrow>
              </div>
              <h2 className="max-w-2xl text-display-lg font-display text-balance text-gradient">
                Tarif değil. <span className="text-lime-400">Bir günün ritmi.</span>
              </h2>
            </div>
          </Reveal>

          <RevealStagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.06}>
            {[
              { name: 'Fıstık Ezmeli Protein Tost', tag: 'Kahvaltı', kcal: 420, img: '/images/meal-breakfast-1.jpeg' },
              { name: 'Etli Tarhana Çorbası', tag: 'Öğle', kcal: 380, img: '/images/meal-lunch-1.jpeg' },
              { name: 'Tavuklu Bulgur Salatası', tag: 'Akşam', kcal: 440, img: '/images/meal-dinner-1.jpeg' },
              { name: 'Yoğurt + Cevizli Ara Öğün', tag: 'Snack', kcal: 180, img: '/images/meal-snack-1.jpeg' },
            ].map((meal) => (
              <RevealItem key={meal.name}>
                <Card padding="none" interactive className="overflow-hidden">
                  <div className="relative aspect-square w-full overflow-hidden">
                    <Image src={meal.img} alt={meal.name} fill sizes="(max-width: 1024px) 50vw, 300px" className="object-cover transition-transform duration-700 hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-transparent" />
                    <div className="absolute left-3 top-3">
                      <Pill tone="lime">{meal.tag}</Pill>
                    </div>
                    <div className="absolute right-3 top-3 rounded-full border border-white/15 bg-ink-950/70 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-white/75 backdrop-blur">
                      {meal.kcal} kcal
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-base font-semibold text-white">{meal.name}</h3>
                  </div>
                </Card>
              </RevealItem>
            ))}
          </RevealStagger>
        </Container>
      </section>

      {/* Diet profiles */}
      <section className="relative py-24 sm:py-32">
        <Container>
          <Reveal>
            <div className="max-w-2xl">
              <div className="mb-5 flex items-center gap-2">
                <span className="h-px w-12 bg-lime-500/70" />
                <Eyebrow tone="lime">Diyet profilleri</Eyebrow>
              </div>
              <h2 className="text-display-lg font-display text-balance text-gradient">
                Dört yaklaşım. <span className="text-lime-400">Aynı zekâ.</span>
              </h2>
            </div>
          </Reveal>
          <RevealStagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
            {dietProfiles.map((p) => (
              <RevealItem key={p.tag}>
                <div className={`relative overflow-hidden rounded-3xl border border-white/[0.06] bg-gradient-to-b ${p.color} p-6`}>
                  <Eyebrow tone={p.tone}>{p.tag}</Eyebrow>
                  <div className="mt-6 font-display text-3xl font-semibold text-white">{p.kcal}</div>
                  <p className="mt-2 text-sm text-white/55">Ortalama günlük hedef · profile göre +/- 200 kcal</p>
                </div>
              </RevealItem>
            ))}
          </RevealStagger>
        </Container>
      </section>

      {/* Flow steps */}
      <section className="relative py-24 sm:py-32">
        <Container>
          <Reveal>
            <div className="max-w-2xl">
              <div className="mb-5 flex items-center gap-2">
                <span className="h-px w-12 bg-lime-500/70" />
                <Eyebrow tone="lime">Akış</Eyebrow>
              </div>
              <h2 className="text-display-lg font-display text-balance text-gradient">
                Beslenme bir liste değil. <span className="text-lime-400">Yaşayan bir döngüdür.</span>
              </h2>
            </div>
          </Reveal>
          <RevealStagger className="mt-14 grid gap-4 lg:grid-cols-4" stagger={0.08}>
            {flow.map((s) => (
              <RevealItem key={s.no}>
                <div className="relative h-full overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.02] p-7">
                  <Eyebrow tone="lime">Adım {s.no}</Eyebrow>
                  <h3 className="mt-5 font-display text-xl font-semibold text-white">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/60">{s.body}</p>
                </div>
              </RevealItem>
            ))}
          </RevealStagger>
        </Container>
      </section>

      <NutritionShowcase />

      <CtaBlock
        eyebrow="Bir sonraki öğün"
        title={<>Beslenme planın <span className="text-lime-400">bu gece güncellenebilir.</span></>}
        description="Profilini bir kez kur. 30 günlük tarifin hazır. Sapma anında yeniden hesaplanır."
        primaryLabel="Planımı oluştur"
        secondaryHref="/gelisim"
        secondaryLabel="Gelişimi gör"
      />
    </>
  );
}

function MacroRow({ name, current, target, color }: { name: string; current: number; target: number; color: string }) {
  const pct = Math.min(100, (current / target) * 100);
  return (
    <div>
      <div className="flex items-end justify-between text-sm">
        <span className="font-display font-medium text-white/90">{name}</span>
        <span className="font-mono text-xs">
          <span style={{ color }}>{current}g</span>
          <span className="text-white/40"> / {target}g</span>
        </span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.05]">
        <div
          className="h-full rounded-full"
          style={{ width: `${pct}%`, background: color, boxShadow: `0 0 12px ${color}` }}
        />
      </div>
    </div>
  );
}
