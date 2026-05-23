import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';
import { cn } from '@/lib/cn';

// ─────────────────────────────────────────────────────────────────────────────
// PricingTrustStrip
//
// PR 1.4 — sits between the Plans heading and the pricing cards. Every claim
// here is verifiable against the Kullanım Şartları (PR 0.3, sections 2.3–2.5).
// We deliberately do NOT promise a "money-back guarantee" because the Terms
// route refund processing to Apple/Google; instead, three honest promises
// reduce the perceived risk of trying the product.
// ─────────────────────────────────────────────────────────────────────────────

interface TrustItem {
  icon: React.ReactNode;
  title: string;
  body: string;
  evidenceHref: string;
  evidenceLabel: string;
}

const items: TrustItem[] = [
  {
    icon: <SparkIcon />,
    title: '7 gün ücretsiz dene',
    body: 'İlk antrenmandan itibaren, kart bilgisi olmadan.',
    evidenceHref: '/sartlar#abonelik',
    evidenceLabel: 'Şartlar · 2.4',
  },
  {
    icon: <WalletIcon />,
    title: 'Şimdi ödeme yok',
    body: 'Ücret, deneme süresi sona ererken alınır.',
    evidenceHref: '/sartlar#abonelik',
    evidenceLabel: 'Şartlar · 2.3',
  },
  {
    icon: <CancelIcon />,
    title: 'İstediğin an iptal',
    body: 'Mağazadan tek tıkla durdurabilirsin.',
    evidenceHref: '/sartlar#abonelik',
    evidenceLabel: 'Şartlar · 2.3',
  },
];

export function PricingTrustStrip({ className }: { className?: string }) {
  return (
    <Reveal>
      <div
        className={cn(
          'relative overflow-hidden rounded-3xl border border-white/[0.07] bg-gradient-to-b from-white/[0.035] to-white/[0.01]',
          className
        )}
      >
        {/* Top accent line */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/50 to-transparent"
        />

        <ul className="grid divide-y divide-white/[0.05] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {items.map((it) => (
            <li key={it.title} className="group p-6 sm:p-7">
              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-violet-400/30 bg-violet-500/10 text-violet-200">
                  {it.icon}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-base font-semibold text-white">{it.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/60">{it.body}</p>
                  <Link
                    href={it.evidenceHref}
                    className="mt-3 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-white/40 transition-colors hover:text-violet-300"
                  >
                    {it.evidenceLabel}
                    <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                      ↗
                    </span>
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}

// ── Icons (kept in-file; same weight as the existing inline icon system) ───

function SparkIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path
        d="M9 1.5l1.6 4.4 4.4 1.6-4.4 1.6-1.6 4.4-1.6-4.4-4.4-1.6 4.4-1.6L9 1.5z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WalletIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <rect x="2.5" y="5" width="13" height="10" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M2.5 8.5 H15.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M12 11.5 H14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path
        d="M5 5 L9.5 2.5 L14 5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

function CancelIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <circle cx="9" cy="9" r="6.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M5.5 5.5 L12.5 12.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
