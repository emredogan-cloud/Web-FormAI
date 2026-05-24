import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { alternatesFor } from '@/lib/metadata';
import { site } from '@/lib/site';
import { Hero } from '@/components/sections/Hero';
import { MarqueeBand } from '@/components/sections/MarqueeBand';
import { FounderStrip } from '@/components/sections/FounderStrip';
import { Manifesto } from '@/components/sections/Manifesto';
import { ProductPillars } from '@/components/sections/ProductPillars';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { TransformationStrip } from '@/components/sections/TransformationStrip';
import { Testimonials } from '@/components/sections/Testimonials';
import { MetricGrid } from '@/components/sections/MetricGrid';
import { TypographicQuote } from '@/components/sections/TypographicQuote';
import { CtaBlock } from '@/components/sections/CtaBlock';

// PR 6.3 — live BlazePose demo. Code-split into its own chunk (the heavy
// @mediapipe/tasks-vision runtime is further dynamic-imported only on the user's
// Start click), and only requested when site.features.liveDemo is on. Default
// OFF → zero cost + nothing rendered until a real-device QA pass enables it.
const LiveDemo = dynamic(() =>
  import('@/components/sections/LiveDemo').then((m) => m.LiveDemo)
);

export const metadata: Metadata = {
  title: 'FormAI — Kişisel yapay zekâ fitness koçun',
  description:
    'Kameran formunu izler, AI koçun seni hizalar, 30 günlük programın seninle birlikte öğrenir. FormAI; antrenman, beslenme ve gelişimi tek bir zekâda birleştirir.',
  alternates: alternatesFor('/'),
};

// ─────────────────────────────────────────────────────────────────────────────
// Home flow (PR 3.2 + PR 3.3)
//
// Hero               — product-proof first frame (PR 2.1)
// MarqueeBand        — six verifiable tech facts (PR 1.5)
// FounderStrip       — "Yapan kim" — bağımsız küçük ekip (PR 1.1)
// Manifesto          — promoted from position 10 → 4 (W4)
// ProductPillars     — three-pillar teaser
// HowItWorks         — one section, three alternating rows (PR 3.2)
// TransformationStrip — layout breaker: split-bleed before/after (PR 3.3)
// Testimonials       — social proof (PR 1.2)
// MetricGrid         — production-grade proof numbers
// TypographicQuote   — layout breaker: cinematic brand seal (PR 3.3)
// CtaBlock           — final conversion ask
// ─────────────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      <Hero />
      <MarqueeBand className="mt-24 sm:mt-32" />
      <FounderStrip />
      <Manifesto />
      <ProductPillars />
      <HowItWorks />
      {/* PR 6.3 — try-it-yourself live pose demo, right after "how it works".
          Flag-gated (default OFF) until real-device QA; renders nothing when off. */}
      {site.features.liveDemo && <LiveDemo />}
      <TransformationStrip />
      <Testimonials variant="home" />
      <MetricGrid
        eyebrow="Üretim notları"
        metrics={[
          { value: '30fps', label: 'pose detection', description: 'BlazePose on-device; bulut yok.', tone: 'violet' },
          { value: '138', label: 'egzersiz kataloğu', description: 'Her hareket için kişiselleştirilebilir tempo.', tone: 'lime' },
          { value: '< 7s', label: 'cold start', description: 'Paranoid bootstrap. runApp her zaman çağrılır.', tone: 'scan' },
          { value: '4 katman', label: 'hata muhafızı', description: 'Sentry, Zoned, FlutterError, ErrorWidget.', tone: 'ember' },
        ]}
      />
      <TypographicQuote />
      <CtaBlock
        eyebrow="30 gün sonra"
        title={
          <>
            Aynaya tekrar bak. <br /> Bu sefer farkı sen göreceksin.
          </>
        }
        description="FormAI 7 gün ücretsiz. İlk antrenman 12 dakika. Hiçbir veri cihazını terk etmez."
        primaryLabel="Şimdi başla"
        secondaryHref="/destek"
        secondaryLabel="Önce sorularıma cevap ver"
      />
    </>
  );
}
