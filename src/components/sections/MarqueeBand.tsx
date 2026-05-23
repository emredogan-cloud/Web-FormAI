import Image from 'next/image';
import { cn } from '@/lib/cn';
import { getMarqueeMode, press, techFacts } from '@/data/marquee';

// ─────────────────────────────────────────────────────────────────────────────
// MarqueeBand
//
// Dual-mode strip below the hero. Reads src/data/marquee.ts to decide which
// mode to render. Today: TECH (scrolling text). When press coverage lands and
// `press.length >= 3`, mode auto-flips to PRESS (scrolling outlet logos in
// grayscale, hover to full color).
// ─────────────────────────────────────────────────────────────────────────────

export function MarqueeBand({ className }: { className?: string }) {
  const mode = getMarqueeMode();

  return (
    <div
      className={cn(
        'relative overflow-hidden border-y border-white/[0.05] bg-white/[0.015] py-5',
        className
      )}
      aria-label={mode === 'press' ? 'Yer aldığımız medya' : 'Ürün özellikleri'}
    >
      {/* Edge masks soften the scroll boundaries */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-ink-950 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-ink-950 to-transparent"
      />

      <div className="flex animate-ticker whitespace-nowrap will-change-transform">
        {mode === 'press' ? <PressItems /> : <TechItems />}
      </div>
    </div>
  );
}

function TechItems() {
  // Duplicate for seamless loop (matches existing animate-ticker geometry).
  const repeated = [...techFacts, ...techFacts];
  return (
    <>
      {repeated.map((f, i) => (
        <span
          key={`${f.id}-${i}`}
          className="mx-8 font-mono text-xs uppercase tracking-[0.3em] text-white/40"
        >
          <span aria-hidden className="mr-8 text-violet-400/60">
            ★
          </span>
          {f.label}
        </span>
      ))}
    </>
  );
}

function PressItems() {
  const repeated = [...press, ...press];
  return (
    <>
      {repeated.map((p, i) => {
        const Inner = (
          <span className="mx-10 inline-flex h-7 items-center opacity-50 grayscale transition-all hover:opacity-100 hover:grayscale-0">
            <Image
              src={p.logoSrc}
              alt={p.name}
              width={120}
              height={28}
              className="h-7 w-auto object-contain"
              unoptimized
            />
          </span>
        );
        return p.url ? (
          <a
            key={`${p.id}-${i}`}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
            aria-label={`${p.name} — yazıyı oku`}
          >
            {Inner}
          </a>
        ) : (
          <span key={`${p.id}-${i}`} className="inline-block">
            {Inner}
          </span>
        );
      })}
    </>
  );
}
