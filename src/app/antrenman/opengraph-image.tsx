import { renderOgImage } from '@/lib/og-template';

// PR 5.2 — Antrenman OG (ember pillar). Stats verified truthful against the
// page: 138 egzersiz, 8 analiz modülü (analyzer list), 33 keypoint (BlazePose).
export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'FormAI Antrenman — kameran formunu okur, gerçek zamanlı düzeltir';

export default function Image() {
  return renderOgImage({
    tone: 'ember',
    eyebrow: 'ANTRENMAN · BLAZEPOSE',
    headline: 'Sahanda eğitmen var. Sadece görünmez.',
    stats: [
      { value: '138', label: 'egzersiz' },
      { value: '8', label: 'analiz modülü' },
      { value: '33', label: 'keypoint' },
    ],
  });
}
