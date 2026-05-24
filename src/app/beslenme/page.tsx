import type { Metadata } from 'next';
import { alternatesFor } from '@/lib/metadata';
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
  alternates: alternatesFor('/beslenme'),
};

const dietProfiles = [
  { tag: 'Standart', kcal: '1850 kcal', tone: 'violet' as const, color: 'from-violet-500/20 to-violet-700/10' },
  { tag: 'Vegan', kcal: '1620 kcal', tone: 'lime' as const, color: 'from-lime-500/20 to-lime-700/10' },
  { tag: 'Vejetaryen', kcal: '1750 kcal', tone: 'lime' as const, color: 'from-lime-500/15 to-violet-700/10' },
  { tag: 'Keto', kcal: '1450 kcal', tone: 'ember' as const, color: 'from-ember-500/20 to-violet-700/10' },
];

// MP.8 — meal card data follows the FormAI app's nutrition contract:
// macro tile colours map slot → app convention (breakfast=violet,
// lunch=scan/blue=protein, dinner=ember/pink=carbs, snack=lime/yellow=fat).
// Each meal carries its own P/C/F numbers (always visible — mirrors the
// app's macro-bar discipline) and a one-line `coachNote` (mirrors the
// app's `_AiInsightRow` message + fix pattern, abbreviated for the web
// surface where the user isn't acting on it).
type Meal = {
  name: string;
  tag: 'Kahvaltı' | 'Öğle' | 'Akşam' | 'Snack';
  tagTone: 'violet' | 'scan' | 'ember' | 'lime';
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
  prep: string;
  coachNote: string;
  img: string;
};

const meals: Meal[] = [
  {
    name: 'Fıstık Ezmeli Protein Tost',
    tag: 'Kahvaltı',
    tagTone: 'violet',
    kcal: 420, protein: 32, carbs: 38, fat: 14,
    prep: '6 dk',
    coachNote: 'Sabah eğitim öncesi: hızlı karbonhidrat + yüksek protein. İlk antrenmanı tam güçle açar.',
    img: '/images/meal-breakfast-1.jpeg',
  },
  {
    name: 'Etli Tarhana Çorbası',
    tag: 'Öğle',
    tagTone: 'scan',
    kcal: 380, protein: 22, carbs: 42, fat: 12,
    prep: '25 dk',
    coachNote: 'Hacimli ama hafif. Akşam ana öğüne yer bırakır, gün ortasını uzun dolaşır.',
    img: '/images/meal-lunch-1.jpeg',
  },
  {
    name: 'Tavuklu Bulgur Salatası',
    tag: 'Akşam',
    tagTone: 'ember',
    kcal: 440, protein: 38, carbs: 48, fat: 10,
    prep: '18 dk',
    coachNote: 'Akşamın protein hedefini kapatır. Karbonhidrat oranı uyku için yeterince düşük.',
    img: '/images/meal-dinner-1.jpeg',
  },
  {
    name: 'Yoğurt + Cevizli Ara Öğün',
    tag: 'Snack',
    tagTone: 'lime',
    kcal: 180, protein: 8, carbs: 12, fat: 10,
    prep: '3 dk',
    coachNote: 'Antrenman sonrası 20 dk pencerede ideal. Probiyotik + omega-3 birleşimi.',
    img: '/images/meal-snack-1.jpeg',
  },
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
            {meals.map((meal) => (
              <RevealItem key={meal.name}>
                <MealCard meal={meal} />
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

// MP.8 — meal card. <button> wrapper so keyboard tab → focus expands
// the reveal the same way hover does on a pointer device; mobile tap
// fires focus, tap-outside collapses. Coach-note layer follows the
// app's "→ fix" insight pattern verbatim.
function MealCard({ meal }: { meal: Meal }) {
  const tagToneClass: Record<Meal['tagTone'], string> = {
    violet: 'border-violet-400/30 bg-violet-500/10 text-violet-200',
    scan: 'border-scan-500/30 bg-scan-500/10 text-scan-400',
    ember: 'border-ember-500/30 bg-ember-500/10 text-ember-400',
    lime: 'border-lime-500/30 bg-lime-500/10 text-lime-400',
  };
  return (
    <button
      type="button"
      aria-label={`${meal.name} öğünü — detayları gör`}
      className="group relative block w-full text-left rounded-3xl overflow-hidden border border-white/[0.06] bg-gradient-to-b from-white/[0.04] to-white/[0.015] backdrop-blur-xl shadow-[0_1px_0_0_rgba(255,255,255,0.05)_inset,0_30px_80px_-30px_rgba(0,0,0,0.6)] transition-all duration-500 hover:-translate-y-0.5 hover:border-violet-400/20 hover:shadow-[0_1px_0_0_rgba(255,255,255,0.08)_inset,0_30px_100px_-30px_rgba(124,92,255,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
    >
      {/* Photo */}
      <div className="relative aspect-square w-full overflow-hidden">
        <Image
          src={meal.img}
          alt={meal.name}
          fill
          sizes="(max-width: 1024px) 50vw, 300px"
          className="object-cover transition-transform duration-700 group-hover:scale-105 group-focus-within:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-transparent" />
        {/* Tag chip — slot-coded colour mirrors the app's _iconFor mapping. */}
        <span className={`absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium backdrop-blur-sm ${tagToneClass[meal.tagTone]}`}>
          {meal.tag}
        </span>
        {/* kcal mono chip — always visible at-a-glance number. */}
        <div className="absolute right-3 top-3 rounded-full border border-white/15 bg-ink-950/70 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-white/75 backdrop-blur">
          {meal.kcal} kcal
        </div>
        {/* Detail affordance — chevron lives on the photo so the user
            sees an "expandable" hint at rest. Brightens on hover/focus. */}
        <span
          aria-hidden
          className="absolute bottom-3 right-3 flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-ink-950/70 text-white/55 backdrop-blur transition-all duration-300 group-hover:border-violet-400/40 group-hover:bg-violet-500/15 group-hover:text-violet-300 group-focus-within:border-violet-400/40 group-focus-within:bg-violet-500/15 group-focus-within:text-violet-300"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M3 4.5 L6 8 L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>

      {/* Body */}
      <div className="space-y-4 p-5">
        <h3 className="font-display text-base font-semibold text-white">{meal.name}</h3>

        {/* Always-visible macro tiles — Protein/Karb/Yağ. Mirrors the
            app's _MacroTilesRow from RecipeDetailScreen. Each tile uses
            the macro's canonical brand colour. */}
        <div className="grid grid-cols-3 gap-2">
          <MacroTile label="Protein" value={meal.protein} tone="scan" />
          <MacroTile label="Karb" value={meal.carbs} tone="ember" />
          <MacroTile label="Yağ" value={meal.fat} tone="lime" />
        </div>

        {/* Reveal panel — prep time + coach note. Pure CSS grid-rows
            height transition (same MP.7 pattern). Mobile parity via
            focus-within. */}
        <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr]">
          <div className="overflow-hidden">
            <div className="border-t border-white/[0.06] pt-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100">
              {/* Prep time row — secondary metadata. */}
              <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-white/45">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                  <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1" />
                  <path d="M6 3.5 V6 L7.8 7.2" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                </svg>
                {meal.prep} hazırlık
              </div>
              {/* Coach insight — verbatim copy of the app's
                  _AiInsightRow shape: short violet arrow → fix line. */}
              <div className="mt-3 flex gap-2">
                <span aria-hidden className="mt-0.5 font-mono text-xs font-bold text-violet-300">→</span>
                <p className="text-xs leading-relaxed text-white/65">{meal.coachNote}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}

function MacroTile({ label, value, tone }: { label: string; value: number; tone: 'scan' | 'ember' | 'lime' }) {
  const toneClass: Record<typeof tone, { border: string; bg: string; eyebrow: string; value: string }> = {
    scan: { border: 'border-scan-500/20', bg: 'bg-scan-500/5', eyebrow: 'text-scan-400/70', value: 'text-scan-400' },
    ember: { border: 'border-ember-500/20', bg: 'bg-ember-500/5', eyebrow: 'text-ember-400/70', value: 'text-ember-400' },
    lime: { border: 'border-lime-500/20', bg: 'bg-lime-500/5', eyebrow: 'text-lime-400/70', value: 'text-lime-400' },
  };
  const t = toneClass[tone];
  return (
    <div className={`rounded-lg border ${t.border} ${t.bg} px-2 py-1.5`}>
      <div className={`font-mono text-[9px] font-medium uppercase tracking-[0.15em] ${t.eyebrow}`}>{label}</div>
      <div className={`mt-0.5 font-display text-sm font-bold ${t.value}`}>
        {value}
        <span className="ml-0.5 text-[10px] font-medium text-white/40">g</span>
      </div>
    </div>
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
