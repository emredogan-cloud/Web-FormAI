import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal, RevealItem, RevealStagger } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';

// ─────────────────────────────────────────────────────────────────────────────
// TransformationStrip
//
// PR 3.3 — layout breaker. Replaces the eyebrow-title-body-grid pattern with
// a split-bleed image pair (before / after) + a narrow numerical caption
// strip. Sits between HowItWorks (the explanation) and Testimonials (the
// social proof): explanation → outcome → social proof → numbers → CTA.
//
// Imagery: existing transformation-before / transformation-after webp
// pair already in /public/images — the FormAI app's own day-1 / day-30
// rendered transformation frames.
// ─────────────────────────────────────────────────────────────────────────────

interface Metric {
  label: string;
  value: string;
}

const metrics: Metric[] = [
  { label: 'Push gücü', value: '+12%' },
  { label: 'Hip sapması', value: '−3°' },
  { label: 'Aktif seri', value: '7 gün' },
];

export function TransformationStrip() {
  return (
    <section className="relative isolate py-20 sm:py-28 lg:py-32" id="donusum">
      <Container>
        <Reveal>
          <div className="mb-12 text-center">
            <Eyebrow tone="ember">30 günde değişen</Eyebrow>
            <h2 className="mt-4 font-display text-display-lg text-balance text-gradient">
              Aynı insan. <span className="text-gradient-violet">Farklı form.</span>
            </h2>
          </div>
        </Reveal>

        {/* Split-bleed pair — image columns flush to the inner edge so the
            two frames read as one continuous transformation, not two cards.
            Captions sit ON the images, anchored bottom-left. */}
        <Reveal delay={0.1}>
          <div className="relative grid grid-cols-2 gap-1 overflow-hidden rounded-3xl border border-white/[0.06]">
            <Frame
              src="/images/transformation-before.webp"
              alt="Gün 1 — başlangıç vücut hâli"
              tag="Gün 1"
              tone="neutral"
            />
            <Frame
              src="/images/transformation-after.webp"
              alt="Gün 30 — programın sonu"
              tag="Gün 30"
              tone="ember"
              highlight
            />
            {/* Center divider — subtle vertical accent line */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-6 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/30 to-transparent"
            />
          </div>
        </Reveal>

        {/* Numerical caption row */}
        <RevealStagger
          className="mt-8 grid grid-cols-3 gap-3 sm:gap-6"
          stagger={0.08}
        >
          {metrics.map((m) => (
            <RevealItem key={m.label}>
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] px-4 py-4 text-center sm:px-6 sm:py-5">
                <div className="font-display text-2xl font-semibold tabular-nums text-ember-400 sm:text-3xl">
                  {m.value}
                </div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-white/45 sm:text-[11px]">
                  {m.label}
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>

        <Reveal delay={0.4}>
          <div className="mt-10 flex justify-center">
            <Button href="/baslat#waitlist" variant="secondary" size="md" arrow>
              Programını oluştur
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.5}>
          <p className="mt-6 text-center font-mono text-[10px] uppercase tracking-widest text-white/35">
            Temsili görseller · FormAI 30 günlük program çıktısı
          </p>
        </Reveal>
      </Container>
    </section>
  );
}

function Frame({
  src,
  alt,
  tag,
  tone,
  highlight,
}: {
  src: string;
  alt: string;
  tag: string;
  tone: 'neutral' | 'ember';
  highlight?: boolean;
}) {
  return (
    <div className="relative aspect-[3/4] w-full overflow-hidden bg-ink-900 sm:aspect-[4/5]">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 1024px) 50vw, 560px"
        className="object-cover"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/15 to-transparent" />
      {highlight && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-ember-500/15 via-transparent to-transparent"
        />
      )}
      <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
        <span
          className={`inline-flex items-center rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] backdrop-blur-md ${
            tone === 'ember'
              ? 'border-ember-500/40 bg-ember-500/15 text-ember-200'
              : 'border-white/15 bg-white/[0.08] text-white/75'
          }`}
        >
          {tag}
        </span>
      </div>
    </div>
  );
}
