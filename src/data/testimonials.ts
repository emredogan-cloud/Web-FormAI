// ─────────────────────────────────────────────────────────────────────────────
// Testimonials data
//
// SHIPPING RULES (do not relax):
//   1. Every entry must be from a real user who explicitly agreed in writing
//      to be quoted publicly. Record `consent: true` only after that yes.
//   2. Outcomes must be specific (numbers > adjectives). "Form skoru 72 → 91
//      in 21 days" lands; "I feel better" does not.
//   3. Names: full name or first name + initial. Never anonymize so heavily
//      that the quote loses attribution weight.
//   4. Photos: optional but strongly recommended (faces compound trust).
//      Crop to a square ≥ 256×256, drop into /public/images/testimonials/.
//   5. Don't soft-edit quotes for "polish" beyond minor spelling/punct fixes
//      with the author's permission. Authenticity > marketing.
//
// The <Testimonials /> component filters by `consent === true` before
// rendering — entries with consent:false are kept here as drafts/private
// notes only, never shipped.
//
// Until at least three live entries are added, the component renders an
// honest empty state that drives beta signups instead.
// ─────────────────────────────────────────────────────────────────────────────

export interface Testimonial {
  id: string;
  quote: string;
  author: {
    name: string;
    role?: string; // e.g. "Yazılım geliştirici, Ankara"
    photoSrc?: string;
  };
  outcome?: {
    label: string; // e.g. "Form skoru"
    value: string; // e.g. "72 → 91"
    period?: string; // e.g. "21 günde"
  };
  source?: 'beta' | 'app-store' | 'email' | 'social';
  capturedAt?: string; // ISO date, for ordering newest-first
  consent: boolean;
}

export const testimonials: Testimonial[] = [
  // ─── EXAMPLE (intentionally not consented; will NOT render) ────────────────
  // {
  //   id: 'kerem-i-001',
  //   quote:
  //     'Kameranın sırtımı düzelttiğini ilk gördüğümde inandım. 21 günde plank süresi 32 saniyeden 1:14’e çıktı.',
  //   author: {
  //     name: 'Kerem İ.',
  //     role: 'Tasarımcı, İstanbul',
  //     photoSrc: '/images/testimonials/kerem.webp',
  //   },
  //   outcome: { label: 'Plank süresi', value: '0:32 → 1:14', period: '21 gün' },
  //   source: 'beta',
  //   capturedAt: '2026-04-12',
  //   consent: false,
  // },
];

export function consentedTestimonials(): Testimonial[] {
  return testimonials
    .filter((t) => t.consent)
    .sort((a, b) => (b.capturedAt ?? '').localeCompare(a.capturedAt ?? ''));
}
