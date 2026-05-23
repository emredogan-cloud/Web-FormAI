import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal, RevealItem, RevealStagger } from '@/components/ui/Reveal';
import { cn } from '@/lib/cn';

// ─────────────────────────────────────────────────────────────────────────────
// HowItWorks
//
// PR 3.2 — replaces the three separate pillar showcases (CoachShowcase,
// NutritionShowcase, ProgressShowcase) that previously stacked on home and
// repeated the same eyebrow-title-body-grid layout four times in a row
// (review item W4, severity High).
//
// One section, three stacked rows, alternating image side. Each row links
// to the full pillar page where the original showcase still lives.
//
// On home: this is the proof-of-flow surface.
// On pillar pages: nothing changes — the original specialised showcases
//                  continue to deliver depth.
// ─────────────────────────────────────────────────────────────────────────────

interface Step {
  no: string;
  pillar: string;
  title: string;
  body: string;
  href: string;
  ctaLabel: string;
  imageSrc: string;
  imageAlt: string;
  tone: 'violet' | 'lime' | 'ember';
}

const steps: Step[] = [
  {
    no: '01',
    pillar: 'Antrenman',
    title: 'Kamera açılır, koçun hizalar.',
    body:
      'BlazePose ile 33 anahtar nokta saniyede 30 kez ölçülür. Omuz, dirsek, kalça, diz — açı sapması fark edildiği anda sesli komut gelir. Hareket tamamlanmadan müdahale.',
    href: '/antrenman',
    ctaLabel: 'Antrenman zekâsı',
    imageSrc: '/images/pose-analysis.webp',
    imageAlt: 'FormAI plank analizi — gerçek zamanlı pose detection',
    // MP.5 — Antrenman = energy / workout heat → ember
    tone: 'ember',
  },
  {
    no: '02',
    pillar: 'Beslenme',
    title: 'Plan akar, gün dengelenir.',
    body:
      'Türk mutfağıyla eğitilmiş kütüphane: tarhana, bulgur, ızgara tavuk. Protein hedefini kaçırırsan akşam menüsü o gece yeniden hesaplanır. Diyet değil, hizalanmış bir gün.',
    href: '/beslenme',
    ctaLabel: 'Beslenme zekâsı',
    imageSrc: '/images/meal-lunch-1.jpeg',
    imageAlt: 'FormAI beslenme — Etli Tarhana Çorbası',
    tone: 'lime',
  },
  {
    no: '03',
    pillar: 'Gelişim',
    title: 'Disiplin grafiğe dönüşür.',
    body:
      'Streak intelligence, haftalık retrospektif, 30 günlük takvim. Yapay zekâ son yedi gününü okur — neyi geliştirdiğini söyler, neyi bıraktığını fark eder. Motivasyon ölçülen bir veri olur.',
    href: '/gelisim',
    ctaLabel: 'Gelişim sistemi',
    imageSrc: '/images/daily-challenge.webp',
    imageAlt: 'FormAI gelişim — günlük meydan okuma',
    // MP.5 — Gelişim = growth / continuity → violet (brand primary)
    tone: 'violet',
  },
];

export function HowItWorks() {
  return (
    <section className="relative isolate py-24 sm:py-32 lg:py-40" id="nasil-calisir">
      <Container>
        <Reveal>
          <div className="max-w-2xl">
            <div className="mb-5 flex items-center gap-2">
              <span className="h-px w-12 bg-violet-400/70" />
              <Eyebrow>Nasıl çalışır</Eyebrow>
            </div>
            <h2 className="text-display-lg font-display text-balance text-gradient">
              Üç sütun, <span className="text-gradient-violet">üç adım</span>,
              <br />
              tek zekâ.
            </h2>
            <p className="mt-6 text-pretty text-base leading-relaxed text-white/60 sm:text-lg">
              Antrenman, beslenme ve gelişim — her biri kendi sayfasında detaylanır.
              Aşağıda hepsinin neye benzediğine bir göz.
            </p>
          </div>
        </Reveal>

        <RevealStagger className="mt-20 space-y-20 sm:space-y-24" stagger={0.1}>
          {steps.map((s, i) => (
            <RevealItem key={s.no}>
              <Row step={s} flip={i % 2 === 1} />
            </RevealItem>
          ))}
        </RevealStagger>
      </Container>
    </section>
  );
}

function Row({ step, flip }: { step: Step; flip: boolean }) {
  const toneClasses = {
    violet: {
      accent: 'text-violet-300',
      border: 'border-violet-400/25',
      shadow: 'shadow-[0_30px_80px_-20px_rgba(124,92,255,0.35)]',
      hover: 'group-hover:text-violet-200',
    },
    lime: {
      accent: 'text-lime-400',
      border: 'border-lime-500/25',
      shadow: 'shadow-[0_30px_80px_-20px_rgba(200,255,0,0.25)]',
      hover: 'group-hover:text-lime-300',
    },
    ember: {
      accent: 'text-ember-400',
      border: 'border-ember-500/25',
      shadow: 'shadow-[0_30px_80px_-20px_rgba(255,122,26,0.3)]',
      hover: 'group-hover:text-ember-300',
    },
  }[step.tone];

  return (
    <div
      className={cn(
        'grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16',
        flip && 'lg:[&>:first-child]:order-2'
      )}
    >
      {/* Image side */}
      <div className="relative">
        <div
          className={cn(
            'relative aspect-[4/3] w-full overflow-hidden rounded-3xl border bg-ink-900',
            toneClasses.border,
            toneClasses.shadow
          )}
        >
          <Image
            src={step.imageSrc}
            alt={step.imageAlt}
            fill
            sizes="(max-width: 1024px) 90vw, 560px"
            className="object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/60 via-transparent to-transparent" />
          <div className="absolute left-5 top-5">
            <Eyebrow tone={step.tone}>{step.pillar}</Eyebrow>
          </div>
        </div>
      </div>

      {/* Copy side */}
      <div>
        <div className="flex items-baseline gap-4">
          <span className={cn('font-display text-5xl font-semibold tabular-nums', toneClasses.accent)}>
            {step.no}
          </span>
          <Eyebrow tone={step.tone}>{step.pillar}</Eyebrow>
        </div>

        <h3 className="mt-5 font-display text-display-md text-balance text-gradient">
          {step.title}
        </h3>

        <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-white/65 sm:text-[17px]">
          {step.body}
        </p>

        <Link
          href={step.href}
          className="group mt-8 inline-flex items-center gap-2 font-display text-sm font-medium text-white transition-colors"
        >
          <span className={cn('transition-colors', toneClasses.accent, toneClasses.hover)}>
            {step.ctaLabel}
          </span>
          <span
            className={cn(
              'flex h-7 w-7 items-center justify-center rounded-full border transition-all group-hover:translate-x-0.5',
              toneClasses.border,
              toneClasses.accent
            )}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M3 6h6m0 0L6 3m3 3L6 9"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </Link>
      </div>
    </div>
  );
}
