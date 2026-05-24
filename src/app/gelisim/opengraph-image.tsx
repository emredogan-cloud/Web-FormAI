import { renderOgImage } from '@/lib/og-template';

// PR 5.2 — Gelişim OG (violet pillar). Truthful: 30-day calendar, weekly
// retrospective, daily re-calibration (per the page + metadata).
export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'FormAI Gelişim — streak zekâsı, haftalık retrospektif, rozetler';

export default function Image() {
  return renderOgImage({
    tone: 'violet',
    eyebrow: 'GELİŞİM · STREAK ZEKÂSI',
    headline: 'Disiplinini sürdüren bir zekâ.',
    stats: [
      { value: '30 gün', label: 'takvim' },
      { value: 'haftalık', label: 'retrospektif' },
      { value: 'günlük', label: 'kalibrasyon' },
    ],
  });
}
