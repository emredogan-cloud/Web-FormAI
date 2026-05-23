import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal, RevealItem, RevealStagger } from '@/components/ui/Reveal';
import { cn } from '@/lib/cn';

interface Pillar {
  href: string;
  index: string;
  title: string;
  description: string;
  tone: 'violet' | 'lime' | 'scan' | 'ember';
  icon: React.ReactNode;
  highlights: string[];
}

const pillars: Pillar[] = [
  {
    href: '/antrenman',
    index: '01',
    title: 'Antrenman',
    description:
      'Kameran formunu okur, AI koçun gerçek zamanlı düzeltir. Salonsuz, fakat eğitmenli antrenman.',
    // MP.5 — Antrenman = energy / workout heat → ember
    tone: 'ember',
    icon: <DumbbellIcon />,
    highlights: ['BlazePose ML', '138 egzersiz', 'Form skoru'],
  },
  {
    href: '/beslenme',
    index: '02',
    title: 'Beslenme',
    description:
      'Günlük makroların, alerji ve damak zevkin dengesiyle hesaplanır. Her öğün adımlanır, sapma anında çağrılırsın.',
    tone: 'lime',
    icon: <ForkIcon />,
    highlights: ['Makro dengeleyici', 'Türk mutfağı', 'Alerji filtresi'],
  },
  {
    href: '/gelisim',
    index: '03',
    title: 'Gelişim',
    description:
      'Streak, rozet, haftalık retrospektif. Yapay zekânın seni neyi geliştirmen gerektiğine yönlendirdiği bir takvim.',
    // MP.5 — Gelişim = growth / continuity → violet (brand primary)
    tone: 'violet',
    icon: <FlameIcon />,
    highlights: ['30 gün takvim', 'Rozet sistemi', 'Haftalık retrospektif'],
  },
];

export function ProductPillars() {
  return (
    <section className="relative py-24 sm:py-32">
      <Container>
        <div className="grid items-end gap-10 lg:grid-cols-[1fr_auto]">
          <Reveal>
            <div className="max-w-2xl">
              <div className="mb-5 flex items-center gap-2">
                <span className="h-px w-12 bg-violet-400/70" />
                <Eyebrow>Üç sütun · tek koç</Eyebrow>
              </div>
              <h2 className="text-display-lg font-display text-balance text-gradient">
                Antrenman. Beslenme. Gelişim. <br />
                <span className="text-gradient-violet">Hepsi aynı zekâ tarafından sürdürülür.</span>
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="max-w-sm text-pretty text-sm text-white/55 lg:text-right">
              Birbirinden ayrı uygulamalar değil. Aynı koçun farklı pencereleri — her biri
              diğerinden öğrenir, planını her gün yeniden hesaplar.
            </p>
          </Reveal>
        </div>

        <RevealStagger className="mt-16 grid gap-4 sm:gap-5 lg:grid-cols-3" stagger={0.1}>
          {pillars.map((p) => (
            <RevealItem key={p.href}>
              <Link
                href={p.href}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/[0.06] bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-8 transition-all duration-500 hover:border-white/[0.14] hover:bg-white/[0.05] hover:-translate-y-1"
              >
                {/* Top accent line */}
                <div
                  className={cn(
                    'pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent transition-opacity duration-500 group-hover:opacity-100 opacity-60',
                    p.tone === 'lime'
                      ? 'via-lime-500'
                      : p.tone === 'scan'
                        ? 'via-scan-500'
                        : p.tone === 'ember'
                          ? 'via-ember-500'
                          : 'via-violet-400'
                  )}
                />
                {/* Corner glow */}
                <div
                  aria-hidden
                  className={cn(
                    'pointer-events-none absolute -top-20 -right-20 h-56 w-56 rounded-full blur-3xl transition-opacity duration-500 opacity-0 group-hover:opacity-40',
                    p.tone === 'lime'
                      ? 'bg-lime-500'
                      : p.tone === 'scan'
                        ? 'bg-scan-500'
                        : p.tone === 'ember'
                          ? 'bg-ember-500'
                          : 'bg-violet-500'
                  )}
                />

                <div className="flex items-center justify-between">
                  <Eyebrow tone={p.tone}>{p.index}</Eyebrow>
                  <span
                    className={cn(
                      'flex h-11 w-11 items-center justify-center rounded-2xl border transition-transform group-hover:scale-105',
                      p.tone === 'lime'
                        ? 'border-lime-500/40 bg-lime-500/10 text-lime-400'
                        : p.tone === 'scan'
                          ? 'border-scan-500/40 bg-scan-500/10 text-scan-400'
                          : p.tone === 'ember'
                            ? 'border-ember-500/40 bg-ember-500/10 text-ember-400'
                            : 'border-violet-400/40 bg-violet-500/15 text-violet-300'
                    )}
                  >
                    {p.icon}
                  </span>
                </div>

                <h3 className="mt-10 font-display text-3xl font-semibold tracking-tight text-white">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">{p.description}</p>

                <ul className="mt-8 flex flex-wrap gap-2">
                  {p.highlights.map((h) => (
                    <li key={h} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-white/55">
                      {h}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex items-center justify-between pt-10 text-sm">
                  <span className="text-white/70 transition-colors group-hover:text-white">
                    Detaya gir
                  </span>
                  <span
                    className={cn(
                      'inline-flex h-8 w-8 items-center justify-center rounded-full border transition-all group-hover:translate-x-1',
                      p.tone === 'lime'
                        ? 'border-lime-500/40 text-lime-400'
                        : p.tone === 'scan'
                          ? 'border-scan-500/40 text-scan-400'
                          : p.tone === 'ember'
                            ? 'border-ember-500/40 text-ember-400'
                            : 'border-violet-400/40 text-violet-300'
                    )}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M3 6h6m0 0L6 3m3 3L6 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealStagger>
      </Container>
    </section>
  );
}

function DumbbellIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M3 7 V11 M6 5 V13 M12 5 V13 M15 7 V11 M6 9 H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function ForkIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M5 3 V8 a2 2 0 002 2 V15 M7 3 V7 M9 3 V7 M13 3 C12 3 11 5 11 7 C11 8 12 9 13 9 V15" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
function FlameIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M9 15 C5 15 3 12 3 9 C3 7 5 5 6 5 C6 7 7 7 7 5 C7 3 8 1 9 1 C9 4 11 5 12 7 C14 9 15 11 15 12 C15 14 12 15 9 15 Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}
