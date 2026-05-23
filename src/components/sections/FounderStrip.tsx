import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Mono } from '@/components/ui/Mono';
import { Reveal } from '@/components/ui/Reveal';
import { GlowOrb } from '@/components/ui/GlowOrb';
import { site } from '@/lib/site';
import { cn } from '@/lib/cn';

// ─────────────────────────────────────────────────────────────────────────────
// FounderStrip
//
// Trust layer · PR 1.1. Renders one of two variants based on site.team config:
//   - anonymous-craft (default): truthful, no fabricated founder.
//   - named-founder: face + name + signature line; activates when name and
//     photoSrc are both set in src/lib/site.ts → team.founder.
//
// Same outer composition for both variants so promotion is purely additive.
// ─────────────────────────────────────────────────────────────────────────────

interface CommitmentLink {
  title: string;
  body: string;
  href: string;
}

const commitments: CommitmentLink[] = [
  {
    title: 'Veri seninle kalır',
    body: 'Hesabın senin, satırların senin. Sızdırma yok, satış yok.',
    href: '/gizlilik',
  },
  {
    title: 'Reklam yok, izleme yok',
    body: 'Üçüncü taraf reklam SDK’sı kurulu değil. iOS Privacy Manifest: tracking off.',
    href: '/kvkk',
  },
  {
    title: 'Pose detection cihazda',
    body: 'Kamera akışı sunucumuza gitmez. BlazePose tamamen cihazında çalışır.',
    href: '/antrenman',
  },
];

export function FounderStrip({ className }: { className?: string }) {
  const { team } = site;
  const namedMode = Boolean(team.founder.name && team.founder.photoSrc);

  return (
    <section className={cn('relative isolate py-24 sm:py-32', className)} id="yapan-kim">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <GlowOrb tone="violet" size="md" className="-top-20 left-1/2 -translate-x-1/2 opacity-15" />
      </div>

      <Container className="relative">
        <div className="grid items-start gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          {/* Copy column */}
          <div>
            <Reveal>
              <div className="flex items-center gap-2">
                <span className="h-px w-8 bg-violet-400/70" />
                <Mono>Yapan kim</Mono>
              </div>
            </Reveal>

            {namedMode ? (
              <NamedHeading />
            ) : (
              <Reveal delay={0.05}>
                <h2 className="mt-5 text-display-lg font-display text-balance text-gradient">
                  Bu projeyi <span className="text-gradient-violet">bağımsız bir küçük ekip</span>{' '}
                  yapıyor.
                </h2>
              </Reveal>
            )}

            <Reveal delay={0.12}>
              <p className="mt-6 max-w-xl text-pretty text-[15px] leading-[1.75] text-white/65 sm:text-[16.5px]">
                FormAI bir startup değil. Tek bir Flutter kod tabanı, 138 egzersiz, sekiz
                özel pose analyzer ve sabırlı bir testler dizisinden geliyor. {team.location}&apos;den,
                ürün için. Verinin sende kalması, kameranın cihazından çıkmaması ve hiçbir
                reklam SDK&apos;sının kurulmaması — bu üç söz baştan yazıldı.
              </p>
            </Reveal>

            {/* Named-founder signature panel — only when both name + photo provided */}
            {namedMode && <FounderSignature />}

            <Reveal delay={0.22}>
              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                <Mono>İletişim</Mono>
                <a
                  href={`mailto:${team.contact.email}`}
                  className="text-violet-300 transition-colors hover:text-violet-200 underline-offset-4 hover:underline"
                >
                  {team.contact.email}
                </a>
                {team.contact.github && (
                  <a
                    href={team.contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-white/65 transition-colors hover:text-white"
                  >
                    <GithubIcon />
                    <span>GitHub</span>
                  </a>
                )}
                {team.contact.twitter && (
                  <a
                    href={team.contact.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-white/65 transition-colors hover:text-white"
                  >
                    <XIcon />
                    <span>X</span>
                  </a>
                )}
                <span className="text-xs text-white/35">·</span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-white/45">
                  {team.status} · {team.location}
                </span>
              </div>
            </Reveal>
          </div>

          {/* Commitment cards column */}
          <Reveal delay={0.1} direction="left">
            <div className="grid gap-3">
              {commitments.map((c, i) => (
                <Link
                  key={c.href}
                  href={c.href}
                  className="group relative flex items-start gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 transition-all hover:-translate-y-0.5 hover:border-violet-400/25 hover:bg-white/[0.04] hover:shadow-glow-subtle"
                >
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-violet-400/30 bg-violet-500/10 font-mono text-[11px] tabular-nums text-violet-200">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="font-display text-base font-semibold text-white">{c.title}</h3>
                      <span className="text-xs text-white/30 transition-all group-hover:translate-x-0.5 group-hover:text-violet-300">
                        →
                      </span>
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/55">{c.body}</p>
                  </div>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

// ── Named variant pieces (only rendered when team.founder is set) ──────────

function NamedHeading() {
  const { founder } = site.team;
  return (
    <Reveal delay={0.05}>
      <h2 className="mt-5 text-display-lg font-display text-balance text-gradient">
        Bu projeyi <span className="text-gradient-violet">{founder.name}</span> başlattı.
      </h2>
    </Reveal>
  );
}

function FounderSignature() {
  const { founder } = site.team;
  if (!founder.name || !founder.photoSrc) return null;
  return (
    <Reveal delay={0.16}>
      <figure className="mt-8 flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4">
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-violet-400/30">
          <Image src={founder.photoSrc} alt={founder.name} fill sizes="56px" className="object-cover" />
        </div>
        <figcaption>
          <div className="font-display text-sm font-semibold text-white">{founder.name}</div>
          {founder.role && (
            <div className="font-mono text-[10px] uppercase tracking-widest text-violet-300/80">
              {founder.role}
            </div>
          )}
          {founder.signatureLine && (
            <div className="mt-1 text-xs italic text-white/55">&ldquo;{founder.signatureLine}&rdquo;</div>
          )}
        </figcaption>
      </figure>
    </Reveal>
  );
}

// ── Small inline icons (consistent with existing design system) ────────────

function GithubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2 .37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}
function XIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
      <path d="M12.6 1.5h2.45l-5.36 6.13L16 14.5h-4.93L7.2 9.43 2.78 14.5H.33l5.73-6.55L0 1.5h5.06l3.49 4.62L12.6 1.5zm-.86 11.55h1.36L4.32 2.87H2.86l8.88 10.18z" />
    </svg>
  );
}
