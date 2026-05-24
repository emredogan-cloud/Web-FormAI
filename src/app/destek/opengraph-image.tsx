import { renderOgImage } from '@/lib/og-template';

// PR 5.2 — Destek OG (violet). Truthful: 16 FAQ Q&A (matches the FAQPage
// schema count), Turkish-first support, 24h response window (per metadata).
export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'FormAI Destek — sıkça sorulanlar ve doğrudan iletişim';

export default function Image() {
  return renderOgImage({
    tone: 'violet',
    eyebrow: 'DESTEK · TÜRKÇE ÖNCELİKLİ',
    headline: 'Sorularına cevap, yanına koç.',
    stats: [
      { value: '16', label: 'soru-cevap' },
      { value: 'Türkçe', label: 'öncelikli' },
      { value: '24 saat', label: 'yanıt' },
    ],
  });
}
