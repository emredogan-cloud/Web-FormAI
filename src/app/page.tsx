import type { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero';
import { MarqueeBand } from '@/components/sections/MarqueeBand';
import { FounderStrip } from '@/components/sections/FounderStrip';
import { ProductPillars } from '@/components/sections/ProductPillars';
import { CoachShowcase } from '@/components/sections/CoachShowcase';
import { NutritionShowcase } from '@/components/sections/NutritionShowcase';
import { ProgressShowcase } from '@/components/sections/ProgressShowcase';
import { Manifesto } from '@/components/sections/Manifesto';
import { MetricGrid } from '@/components/sections/MetricGrid';
import { CtaBlock } from '@/components/sections/CtaBlock';

export const metadata: Metadata = {
  title: 'FormAI — Kişisel yapay zekâ fitness koçun',
  description:
    'Kameran formunu izler, AI koçun seni hizalar, 30 günlük programın seninle birlikte öğrenir. FormAI; antrenman, beslenme ve gelişimi tek bir zekâda birleştirir.',
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <MarqueeBand className="mt-24 sm:mt-32" />
      <FounderStrip />
      <ProductPillars />
      <CoachShowcase />
      <NutritionShowcase />
      <ProgressShowcase />
      <MetricGrid
        eyebrow="Üretim notları"
        metrics={[
          { value: '30fps', label: 'pose detection', description: 'BlazePose on-device; bulut yok.', tone: 'violet' },
          { value: '138', label: 'egzersiz kataloğu', description: 'Her hareket için kişiselleştirilebilir tempo.', tone: 'lime' },
          { value: '< 7s', label: 'cold start', description: 'Paranoid bootstrap. runApp her zaman çağrılır.', tone: 'scan' },
          { value: '4 katman', label: 'hata muhafızı', description: 'Sentry, Zoned, FlutterError, ErrorWidget.', tone: 'ember' },
        ]}
      />
      <Manifesto />
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
