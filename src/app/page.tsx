import type { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero';
import { MarqueeBand } from '@/components/sections/MarqueeBand';
import { FounderStrip } from '@/components/sections/FounderStrip';
import { Manifesto } from '@/components/sections/Manifesto';
import { ProductPillars } from '@/components/sections/ProductPillars';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { Testimonials } from '@/components/sections/Testimonials';
import { MetricGrid } from '@/components/sections/MetricGrid';
import { CtaBlock } from '@/components/sections/CtaBlock';

export const metadata: Metadata = {
  title: 'FormAI — Kişisel yapay zekâ fitness koçun',
  description:
    'Kameran formunu izler, AI koçun seni hizalar, 30 günlük programın seninle birlikte öğrenir. FormAI; antrenman, beslenme ve gelişimi tek bir zekâda birleştirir.',
};

// ─────────────────────────────────────────────────────────────────────────────
// Home flow (PR 3.2 — see reports/PHASE_3 closure when shipped)
//
// Hero          — product-proof first frame (PR 2.1)
// MarqueeBand   — six verifiable tech facts (PR 1.5)
// FounderStrip  — "Yapan kim" — bağımsız küçük ekip (PR 1.1)
// Manifesto     — promoted from position 10 → 4 (W4)
// ProductPillars — three-pillar teaser
// HowItWorks    — one section, three stacked alternating rows
//                 (replaces 3 separate showcases — W4)
// Testimonials  — social proof (currently empty-state CTA, PR 1.2)
// MetricGrid    — production-grade proof numbers
// CtaBlock      — final conversion ask
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
