import { renderOgImage } from '@/lib/og-template';

// PR 5.2 — Başla OG (violet, conversion). Truthful: ~90s onboarding, 7-day
// free trial at launch, 3 pricing plans. No store badges / counts (pre-launch).
export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'FormAI Başla — erken erişime katıl, 30 günlük dönüşüm';

export default function Image() {
  return renderOgImage({
    tone: 'violet',
    eyebrow: 'ERKEN ERİŞİM · KAPALI BETA',
    headline: 'Tek karar. 30 günlük dönüşüm.',
    stats: [
      { value: '90 sn', label: 'kurulum' },
      { value: '7 gün', label: 'ücretsiz' },
      { value: '3', label: 'plan' },
    ],
  });
}
