import { renderOgImage } from '@/lib/og-template';

// Root OG (home). Cascades to any route without its own opengraph-image.
// PR 5.2 — visual lives in the shared renderer; this file owns home's params.
export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'FormAI — kişisel yapay zekâ fitness koçun';

export default function Image() {
  return renderOgImage({
    tone: 'violet',
    eyebrow: 'POSE DETECTION · ON-DEVICE',
    headline: 'Sahaya çıkan yapay zekâ fitness koçun.',
    stats: [
      { value: '138', label: 'egzersiz' },
      { value: '30 gün', label: 'kişisel plan' },
      { value: '30fps', label: 'on-device pose' },
    ],
  });
}
