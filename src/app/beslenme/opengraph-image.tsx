import { renderOgImage } from '@/lib/og-template';

// PR 5.2 — Beslenme OG (lime pillar). Truthful: 4 diet profiles
// (Standart/Vegan/Vejetaryen/Keto), Türk-cuisine trained, P/K/Y macro tracking.
export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'FormAI Beslenme — Türk mutfağıyla eğitilmiş makro zekâsı';

export default function Image() {
  return renderOgImage({
    tone: 'lime',
    eyebrow: 'BESLENME · TÜRK MUTFAĞI',
    headline: 'Makroların seninle birlikte düşünür.',
    stats: [
      { value: '4', label: 'diyet profili' },
      { value: 'P·K·Y', label: 'makro takibi' },
      { value: 'Türk', label: 'mutfağı' },
    ],
  });
}
