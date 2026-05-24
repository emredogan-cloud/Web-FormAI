import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { PageHero } from '@/components/sections/PageHero';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal, RevealItem, RevealStagger } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Pill } from '@/components/ui/Pill';
import { GlowOrb } from '@/components/ui/GlowOrb';
import { site } from '@/lib/site';
import { WaitlistForm } from '@/components/sections/WaitlistForm';
import { Testimonials } from '@/components/sections/Testimonials';
import { AppRating } from '@/components/sections/AppRating';
import { PricingTrustStrip } from '@/components/sections/PricingTrustStrip';
import { JsonLd } from '@/components/util/Schema';
import { softwareApplicationSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Başla — Erken erişime katıl',
  description:
    'FormAI şu anda kapalı beta’da. Bekleme listesine katıl, mağazalar açıldığında ilk sen haber al. Lansmanda 7 gün ücretsiz.',
};

const steps = [
  { no: '01', title: 'Bekleme listesine katıl', body: 'E-posta bırak. Mağazalar açılır açılmaz davet linkini gönderiyoruz.' },
  { no: '02', title: 'Profilini oluştur', body: 'Hedef, vücut tipi, alerji, damak zevki. 60 saniye.' },
  { no: '03', title: 'İlk antrenmana başla', body: 'Kamerayı kalibre et. 12 dakika. Form skorunu canlı gör.' },
];

const plans = [
  {
    label: '1 Ay',
    price: '179,99₺',
    sub: '/ ay',
    note: 'Aylık esneklik',
    popular: false,
  },
  {
    label: '12 Ay',
    price: '959,99₺',
    sub: '/ yıl',
    note: '2.999,99₺ idi · %68 indirim',
    popular: true,
  },
  {
    label: '3 Ay',
    price: '359,99₺',
    sub: '/ 3 ay',
    note: '90 günlük taahhüt',
    popular: false,
  },
];

export default function BaslatPage() {
  return (
    <>
      {/* PR 5.1 — SoftwareApplication JSON-LD. Truthful core only: no offers
          (pre-launch) and no aggregateRating (no real ratings yet). */}
      <JsonLd data={softwareApplicationSchema()} />
      <PageHero
        eyebrow="Başla · 90 saniye"
        title={<>Tek karar.<br /><span className="text-gradient-violet">30 günlük dönüşüm.</span></>}
        description="Yapay zekâ koçun seni bekliyor. İlk yedi gün ücretsiz; ödeme bilgisi şimdi alınmaz."
        tone="violet"
        align="center"
      >
        <div className="flex flex-col items-center gap-5">
          <div className="flex flex-wrap justify-center gap-3">
            <Button href="#waitlist" variant="primary" size="lg" arrow>
              Bekleme listesine katıl
            </Button>
            <Button href="#plans" variant="secondary" size="lg">
              Planları karşılaştır
            </Button>
          </div>
          <AppRating align="center" size="sm" />
        </div>
      </PageHero>

      {/* Install row */}
      <section className="relative pt-4 pb-24" id="install">
        <Container>
          <Reveal>
            <Card padding="lg" className="overflow-hidden">
              <div className="grid items-center gap-10 lg:grid-cols-[1.3fr_1fr]">
                <div>
                  <Eyebrow>Erken erişim · pre-launch</Eyebrow>
                  <h2 className="mt-4 font-display text-display-md text-balance text-gradient">
                    iOS ve Android · <span className="text-gradient-violet">yakında.</span>
                  </h2>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-white/60">
                    FormAI şu anda kapalı beta&apos;da: Internal Testing &amp; TestFlight üzerinden test ediyoruz.
                    Mağazalar açıldığında ilk önce sana haber vereceğiz.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <StoreBadge label="App Store" sub="iOS 15+" icon={<AppleIcon />} status={site.stores.appStore} />
                    <StoreBadge label="Google Play" sub="Android 10+" icon={<PlayIcon />} status={site.stores.play} />
                  </div>
                  <div className="mt-6">
                    <Button href="#waitlist" variant="primary" size="md" arrow>
                      Bekleme listesine katıl
                    </Button>
                  </div>
                  <div className="mt-6 flex flex-wrap items-center gap-2 text-xs text-white/45">
                    <Pill tone="lime">Lansmanda 7 gün ücretsiz</Pill>
                    <Pill tone="scan">Şimdi ödeme yok</Pill>
                    <Pill tone="violet">Erken erişim önceliği</Pill>
                  </div>
                </div>
                {/* MP.6 — install-card visual: FormAI app icon (canonical
                    brand mark) as the "this is the app you're getting"
                    centerpiece. Replaces a phone-shaped frame containing a
                    welcome-screen screenshot, which had become stale once
                    PT_FORM (MP.2) consumed coach-imagery duties elsewhere.
                    Rounded-square treatment mirrors iOS/Android icon
                    presentation; ambient violet halo + outer hairline ring
                    keep the premium dark-neon language. */}
                <div className="relative flex items-center justify-center py-6 sm:py-8 lg:py-10">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute h-72 w-72 rounded-full bg-violet-500/30 blur-3xl sm:h-80 sm:w-80"
                  />
                  <div className="relative aspect-square w-full max-w-[220px] sm:max-w-[260px] lg:max-w-[280px]">
                    {/* Outer rim ring */}
                    <div
                      aria-hidden
                      className="absolute -inset-1 rounded-[28%] bg-gradient-to-b from-violet-400/40 via-violet-400/10 to-violet-700/30"
                    />
                    {/* Icon plate */}
                    <div className="relative h-full w-full overflow-hidden rounded-[26%] border border-white/[0.08] bg-ink-900 shadow-[0_30px_80px_-20px_rgba(124,92,255,0.55)]">
                      <Image
                        src="/images/app-icon.webp"
                        alt="FormAI uygulama ikonu"
                        fill
                        sizes="(max-width: 640px) 220px, (max-width: 1024px) 260px, 280px"
                        className="object-cover object-center"
                      />
                      {/* Glass reflection */}
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 rounded-[26%] bg-gradient-to-tr from-transparent via-white/[0.05] to-white/[0.1]"
                      />
                    </div>
                    {/* Caption */}
                    <div className="absolute -bottom-7 left-0 right-0 flex justify-center font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
                      FormAI · v1.0
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </Reveal>
        </Container>
      </section>

      {/* Steps */}
      <section className="relative py-16">
        <Container>
          <Reveal>
            <div className="text-center max-w-2xl mx-auto">
              <Eyebrow>Üç adımda</Eyebrow>
              <h2 className="mt-4 font-display text-display-md text-balance text-gradient">
                İlk antrenmana 90 saniyede.
              </h2>
            </div>
          </Reveal>
          <RevealStagger className="mt-14 grid gap-4 lg:grid-cols-3" stagger={0.08}>
            {steps.map((s) => (
              <RevealItem key={s.no}>
                <div className="group relative h-full overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.02] p-8 transition-all hover:border-violet-400/30 hover:bg-white/[0.04]">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-400/40 bg-violet-500/15 font-display text-base font-semibold text-violet-300">
                    {s.no}
                  </div>
                  <h3 className="mt-6 font-display text-xl font-semibold text-white">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/60">{s.body}</p>
                </div>
              </RevealItem>
            ))}
          </RevealStagger>
        </Container>
      </section>

      <Testimonials variant="baslat" />

      {/* Plans */}
      <section className="relative py-24 sm:py-32" id="plans">
        <GlowOrb tone="violet" size="xl" className="-top-32 left-1/2 -translate-x-1/2 opacity-25" />
        <Container className="relative">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto">
              <Eyebrow>Planlar</Eyebrow>
              <h2 className="mt-4 font-display text-display-lg text-balance text-gradient">
                Üç plan. Sıfır gizli ücret.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-white/60">
                Yıllık plan en uygun fiyat. Aşağıdaki üç söz seninle:
              </p>
            </div>
          </Reveal>

          <PricingTrustStrip className="mt-10" />

          <RevealStagger className="mt-12 grid gap-5 sm:grid-cols-3" stagger={0.08}>
            {plans.map((p) => (
              <RevealItem key={p.label}>
                <div
                  className={`group relative flex h-full flex-col rounded-3xl border p-7 ${p.popular ? 'border-violet-400/40 bg-gradient-to-b from-violet-500/[0.12] to-violet-700/[0.04] shadow-[0_30px_80px_-20px_rgba(124,92,255,0.5)]' : 'border-white/[0.06] bg-white/[0.025]'}`}
                >
                  {p.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-violet-400/40 bg-violet-500/30 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-violet-100 backdrop-blur">
                      Popüler
                    </span>
                  )}
                  <Eyebrow tone={p.popular ? 'violet' : 'neutral'}>{p.label}</Eyebrow>
                  <div className="mt-6 flex items-baseline gap-2">
                    <span className={`font-display text-4xl font-semibold ${p.popular ? 'text-gradient-violet' : 'text-white'}`}>{p.price}</span>
                    <span className="text-sm text-white/45">{p.sub}</span>
                  </div>
                  <p className="mt-3 text-sm text-white/55">{p.note}</p>
                  <ul className="mt-6 space-y-2.5 text-sm text-white/70">
                    <li className="flex items-start gap-2"><PlanCheck /> Sınırsız antrenman</li>
                    <li className="flex items-start gap-2"><PlanCheck /> Pose detection (on-device)</li>
                    <li className="flex items-start gap-2"><PlanCheck /> Beslenme zekâsı</li>
                    <li className="flex items-start gap-2"><PlanCheck /> Streak + retrospektif</li>
                    {p.popular && <li className="flex items-start gap-2"><PlanCheck /> Öncelikli destek</li>}
                  </ul>
                  <div className="mt-auto pt-8">
                    <Button href="/destek" variant={p.popular ? 'primary' : 'secondary'} size="md" arrow className="w-full">
                      7 gün ücretsiz dene
                    </Button>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealStagger>

          <Reveal delay={0.4}>
            <div className="mt-8 text-center">
              <span className="font-mono text-xs uppercase tracking-widest text-white/40">
                Faturalama Apple App Store / Google Play üzerinden ·{' '}
                <Link href="/sartlar#abonelik" className="underline-offset-4 hover:text-violet-300 hover:underline">
                  Şartlar
                </Link>
              </span>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="relative py-24" id="waitlist">
        <Container>
          <Reveal>
            <div className="rounded-3xl border border-violet-400/15 bg-ink-900/60 p-10 text-center backdrop-blur-md sm:p-16">
              <Eyebrow>Erken erişim listesi</Eyebrow>
              <h2 className="mt-4 font-display text-display-md text-balance text-gradient">
                Mağazalar açıldığında <span className="text-gradient-violet">ilk haber alan sen ol.</span>
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-base text-white/60">
                E-postanı bırak. App Store ve Play&apos;de yayında olduğumuzda davet linkini gönderiyoruz.
                Pazarlama maili yok, sadece launch bildirimi.
              </p>
              <WaitlistForm source="baslat" />
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}

type StoreBadgeStatus = {
  url: string | null;
  live: boolean;
  comingSoonLabel: string;
};

function StoreBadge({
  label,
  sub,
  icon,
  status,
}: {
  label: string;
  sub: string;
  icon: React.ReactNode;
  status: StoreBadgeStatus;
}) {
  // Render as a live anchor only when the store is genuinely live and a URL is set.
  if (status.live && status.url) {
    return (
      <a
        href={status.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-3 rounded-2xl border border-white/[0.1] bg-white/[0.04] px-5 py-3 transition-all hover:border-violet-400/30 hover:bg-white/[0.06] hover:shadow-glow-subtle"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white">{icon}</span>
        <span>
          <span className="block font-mono text-[9px] uppercase tracking-widest text-white/45">{sub}</span>
          <span className="block font-display text-base font-semibold text-white">{label}</span>
        </span>
      </a>
    );
  }

  // Pre-launch: render an honest, non-interactive "coming soon" card.
  return (
    <div
      aria-disabled="true"
      className="relative inline-flex cursor-not-allowed items-center gap-3 rounded-2xl border border-dashed border-white/[0.12] bg-white/[0.02] px-5 py-3 opacity-80"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.06] text-white/55">{icon}</span>
      <span>
        <span className="block font-mono text-[9px] uppercase tracking-widest text-white/45">{sub}</span>
        <span className="block font-display text-base font-semibold text-white/70">{label}</span>
      </span>
      <span className="ml-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-violet-200">
        {status.comingSoonLabel}
      </span>
    </div>
  );
}
function AppleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor"><path d="M13.1 9.4c0-2.2 1.8-3.2 1.9-3.3-1-1.4-2.6-1.7-3.1-1.7-1.3-.1-2.6.8-3.3.8-.7 0-1.7-.8-2.8-.8C4.4 4.4 3 5.3 2.2 6.8 1.5 9.7 2.6 14 4 16.3c.7 1.1 1.4 2.3 2.4 2.3 1 0 1.4-.6 2.6-.6s1.5.6 2.6.6c1.1 0 1.8-1.1 2.4-2.2.8-1.3 1.1-2.5 1.1-2.6-.1 0-2.1-.8-2.1-3.2zM11 3.1c.5-.6.9-1.4.8-2.3-.8 0-1.7.5-2.2 1.1-.5.5-.9 1.4-.8 2.2.8.1 1.7-.4 2.2-1z"/></svg>
  );
}
function PlayIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor"><path d="M3 1.5 L13.5 9 L3 16.5 Z"/></svg>
  );
}
function PlanCheck() {
  return (
    <span className="mt-1 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-violet-400/40 bg-violet-500/15 text-violet-300">
      <svg width="8" height="8" viewBox="0 0 12 12" fill="none">
        <path d="M3 6.5 L5 8.5 L9 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}
