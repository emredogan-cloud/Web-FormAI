import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Mono } from '@/components/ui/Mono';
import { Reveal, RevealItem, RevealStagger } from '@/components/ui/Reveal';
import { GlowOrb } from '@/components/ui/GlowOrb';
import { Button } from '@/components/ui/Button';
import { consentedTestimonials, type Testimonial } from '@/data/testimonials';
import { cn } from '@/lib/cn';

// ─────────────────────────────────────────────────────────────────────────────
// Testimonials
//
// Two-mode component:
//   - POPULATED (consented quotes exist): card grid with photo, quote,
//     attribution row, outcome chip.
//   - EMPTY (no consented quotes yet): honest "be the first" panel that
//     funnels visitors to the waitlist. Refuses to fabricate.
//
// To populate: add entries to src/data/testimonials.ts with consent:true.
// The component picks them up automatically and switches modes.
// ─────────────────────────────────────────────────────────────────────────────

export function Testimonials({
  className,
  variant = 'home',
}: {
  className?: string;
  variant?: 'home' | 'baslat';
}) {
  const items = consentedTestimonials();

  return (
    <section
      className={cn('relative isolate py-24 sm:py-32', className)}
      id="sosyal-kanit"
      aria-label="Kullanıcı geri bildirimleri"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <GlowOrb tone="violet" size="lg" className="-top-24 -right-32 opacity-20" />
        <GlowOrb tone="lime" size="md" className="bottom-0 -left-20 opacity-10" />
      </div>

      <Container className="relative">
        {items.length === 0 ? (
          <EmptyState variant={variant} />
        ) : (
          <PopulatedGrid items={items} variant={variant} />
        )}
      </Container>
    </section>
  );
}

// ── Populated grid ─────────────────────────────────────────────────────────

function PopulatedGrid({ items, variant }: { items: Testimonial[]; variant: 'home' | 'baslat' }) {
  return (
    <>
      <Reveal>
        <div className="mb-12 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="h-px w-12 bg-violet-400/70" />
            <Mono>Erken kullanıcılar</Mono>
          </div>
          <h2 className="mt-5 text-display-lg font-display text-balance text-gradient">
            {variant === 'baslat' ? (
              <>Aboneliği başlatmadan önce <span className="text-gradient-violet">onların sözüne bak.</span></>
            ) : (
              <>İlk yedi gününü tamamlayanlar <span className="text-gradient-violet">ne diyor?</span></>
            )}
          </h2>
        </div>
      </Reveal>

      <RevealStagger
        className={cn('grid gap-4', items.length >= 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-2')}
        stagger={0.08}
      >
        {items.map((t) => (
          <RevealItem key={t.id}>
            <TestimonialCard t={t} />
          </RevealItem>
        ))}
      </RevealStagger>

      {variant === 'home' && (
        <Reveal delay={0.3}>
          <div className="mt-10 flex justify-center">
            <Button href="/baslat#waitlist" variant="secondary" size="md" arrow>
              Sıradaki yorum seninkisi olsun
            </Button>
          </div>
        </Reveal>
      )}
    </>
  );
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <figure className="group relative flex h-full flex-col gap-6 rounded-3xl border border-white/[0.06] bg-gradient-to-b from-white/[0.04] to-white/[0.015] p-7 transition-all duration-500 hover:-translate-y-0.5 hover:border-violet-400/20 hover:shadow-[0_30px_80px_-30px_rgba(124,92,255,0.4)]">
      {/* Top decorative quote glyph */}
      <span aria-hidden className="text-2xl leading-none text-violet-300/40">&ldquo;</span>

      <blockquote className="flex-1 text-[15px] leading-[1.7] text-white/85">{t.quote}</blockquote>

      {t.outcome && (
        <div className="flex items-center gap-2 self-start rounded-full border border-lime-500/30 bg-lime-500/[0.08] px-3 py-1">
          <span className="font-mono text-[10px] uppercase tracking-widest text-lime-400/90">
            {t.outcome.label}
          </span>
          <span className="font-display text-sm font-semibold text-lime-400">{t.outcome.value}</span>
          {t.outcome.period && (
            <span className="font-mono text-[10px] text-white/45">· {t.outcome.period}</span>
          )}
        </div>
      )}

      <figcaption className="mt-auto flex items-center gap-3 border-t border-white/[0.05] pt-5">
        {t.author.photoSrc ? (
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-white/10">
            <Image
              src={t.author.photoSrc}
              alt={t.author.name}
              fill
              sizes="40px"
              className="object-cover"
            />
          </div>
        ) : (
          <InitialBadge name={t.author.name} />
        )}
        <div className="min-w-0">
          <div className="truncate font-display text-sm font-semibold text-white">{t.author.name}</div>
          {t.author.role && (
            <div className="truncate text-xs text-white/45">{t.author.role}</div>
          )}
        </div>
      </figcaption>
    </figure>
  );
}

function InitialBadge({ name }: { name: string }) {
  const initial = name.trim().charAt(0).toUpperCase() || '·';
  return (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-violet-400/30 bg-violet-500/15 font-display text-sm font-semibold text-violet-200">
      {initial}
    </span>
  );
}

// ── Empty (pre-launch) state ──────────────────────────────────────────────

function EmptyState({ variant }: { variant: 'home' | 'baslat' }) {
  return (
    <Reveal>
      <div className="relative overflow-hidden rounded-[2rem] border border-violet-400/15 bg-white/[0.025] p-10 sm:p-14">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-violet-400/60 to-transparent"
        />

        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-px w-8 bg-violet-400/70" />
              <Mono>Sosyal kanıt · birazdan</Mono>
            </div>
            <h2 className="mt-5 font-display text-display-md text-balance text-gradient sm:text-display-lg">
              {variant === 'baslat' ? (
                <>İlk geri bildirimler <span className="text-gradient-violet">yolda.</span></>
              ) : (
                <>Bu alan, ilk yedi günü <span className="text-gradient-violet">tamamlayanlara ayrıldı.</span></>
              )}
            </h2>
            <p className="mt-6 max-w-xl text-[15px] leading-[1.75] text-white/65 sm:text-[16.5px]">
              FormAI henüz kapalı beta&apos;da. Sahte testimonial yerleştirmektense{' '}
              <span className="text-white/85">bu alanı senin için boş tuttuk.</span>{' '}
              İlk gerçek yorumlar, beta listesindekilerin yedinci günlerini tamamlamasıyla birlikte buraya düşecek.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button href="/baslat#waitlist" variant="primary" size="md" arrow>
                Bekleme listesine katıl
              </Button>
              <span className="font-mono text-[11px] uppercase tracking-widest text-white/40">
                İlk yorum seninkisi olabilir
              </span>
            </div>
          </div>

          {/* Three ghost cards — clearly empty by design, not a loading skeleton */}
          <div aria-hidden className="grid gap-3">
            {[
              'Form skoru gelişimi',
              'Plank süresi gelişimi',
              'Yedi günlük seri',
            ].map((label, i) => (
              <div
                key={label}
                className="relative flex items-center gap-3 rounded-2xl border border-dashed border-white/[0.08] bg-white/[0.015] p-4"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.025] font-mono text-[10px] text-white/40">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="flex-1">
                  <div className="text-[11px] font-mono uppercase tracking-widest text-white/30">
                    Beta · yakında
                  </div>
                  <div className="mt-0.5 text-sm text-white/55">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}
