'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Mono } from '@/components/ui/Mono';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { GlowOrb } from '@/components/ui/GlowOrb';
import { HudPanel } from '@/components/ui/HudPanel';
import { AppRating } from '@/components/sections/AppRating';
import { UserCountBadge, isUserCountReady } from '@/components/sections/UserCountBadge';
import { LQIP } from '@/lib/image-lqip';

export function Hero() {
  const prefersReduced = useReducedMotion();
  const fade = (delay = 0) => ({
    initial: { opacity: 0, y: prefersReduced ? 0 : 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.95, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section className="relative isolate overflow-hidden pt-28 sm:pt-32 lg:pt-36">
      {/* Atmospheric backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <GlowOrb tone="violet" size="xl" className="-top-32 left-1/2 -translate-x-1/2 opacity-50" />
        <GlowOrb tone="scan" size="lg" className="top-40 -right-40 opacity-30" />
        <div className="absolute inset-0 bg-grid-violet mask-fade-b opacity-50" />
      </div>

      <Container className="relative">
        <div className="grid gap-16 lg:grid-cols-[1.05fr_1fr] lg:items-center">
          {/* Copy column */}
          <div className="relative z-10 max-w-2xl">
            <motion.div {...fade(0)} className="flex items-center gap-2.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-400" />
              </span>
              <Mono>Pre-launch · Türkiye</Mono>
            </motion.div>

            {/* Hero headline — 1-step parse, outcome + mechanism in two beats.
                PR 2.2 replaces the prior "Sahaya çıkan yapay zekâ fitness koçun"
                metaphor (W7 in the deep review). Other masterplan-approved
                candidates kept here as easy A/B swaps:
                  ALT-A: "Aynaya bak. Kameran seni hizalasın."
                  ALT-B: "Yapay zekâ formunu izler. Sen sadece dene."
                Emphasis word ("Kameran") carries the brand-defining mechanism
                — the camera-based AI coach is what makes FormAI different. */}
            <motion.h1
              {...fade(0.08)}
              className="mt-6 font-display text-display-2xl text-balance"
            >
              <span className="text-gradient">30 günde formuna kavuş.</span>
              <br />
              <span className="text-gradient-violet">Kameran </span>
              <span className="text-gradient">koçun olsun.</span>
            </motion.h1>

            <motion.p
              {...fade(0.18)}
              className="mt-7 max-w-xl text-pretty text-lg leading-relaxed text-white/65"
            >
              FormAI; kameranla formunu izler, hareketini hizalar, beslenmeni dengeler
              ve 30 günlük programını her gün senin adına yeniden hesaplar.
              Salonun yok. Eğitmenin var.
            </motion.p>

            <motion.div {...fade(0.26)} className="mt-10 flex flex-wrap items-center gap-3">
              <Button href="/baslat" variant="primary" size="lg" arrow>
                Programını oluştur
              </Button>
              <Button href="/antrenman" variant="secondary" size="lg">
                Nasıl çalışır?
              </Button>
            </motion.div>

            {/* When site.userCount holds a real value ≥ minDisplayCount, swap
                the static stats row for the live "Beta · X erken kullanıcı"
                badge. Until then, render the stats row as before. */}
            {isUserCountReady() ? (
              <motion.div
                {...fade(0.36)}
                className="mt-12 border-t border-white/[0.06] pt-8"
              >
                <UserCountBadge />
              </motion.div>
            ) : (
              <motion.dl
                {...fade(0.36)}
                className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-white/[0.06] pt-8"
              >
                <Stat value="138" label="egzersiz kataloğu" />
                <Stat value="30 gün" label="kişisel program" />
                <Stat value="On-device" label="pose analizi" />
              </motion.dl>
            )}

            {/* App-store rating badge — renders only when real ratings cross
                the credibility threshold (see site.ratings). Today: invisible. */}
            <motion.div {...fade(0.44)} className="mt-8">
              <AppRating size="sm" />
            </motion.div>
          </div>

          {/* Visual column — real product proof
              Replaces the prior CG robot (pt-form.png) with the actual
              FormAI app welcome screen on a device frame. The screenshot
              itself shows live ML pose detection with the "HIP ALIGNMENT:
              5° DEVIATION" overlay — so the hero literally demonstrates
              the product instead of describing it. Two satellite phones
              show additional shipping surfaces (program + nutrition). */}
          <motion.div
            initial={{ opacity: 0, scale: prefersReduced ? 1 : 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto w-full max-w-md lg:max-w-none"
          >
            {/* Mobile HUD ribbon — ABOVE the device (lg:hidden).
                Restores the data-readout signaling that desktop floating
                callouts (lg:block) carry. Mobile users now see the same
                "live ML pose detection" claim the desktop hero makes. */}
            <motion.div
              {...fade(0.4)}
              className="mx-auto mb-5 grid w-full max-w-[440px] grid-cols-2 gap-2.5 lg:hidden"
              aria-hidden
            >
              <HudPanel label="ML Pose · live" value="30" unit="fps" tone="violet" status="active" className="w-full" />
              <HudPanel label="Hip alignment" value="5°" unit="dev" tone="scan" status="warn" className="w-full" />
            </motion.div>

            <div className="relative mx-auto flex h-[640px] w-full max-w-[460px] items-center justify-center lg:h-[680px]">
              {/* Conic glow ring behind everything */}
              <div className="pointer-events-none absolute inset-0 rounded-full conic-ring animate-orbit" />

              {/* Satellite phone — left (program / dashboard)
                  Hidden on small mobiles to keep the central proof readable. */}
              <motion.div
                initial={{ opacity: 0, x: prefersReduced ? 0 : -28, rotate: prefersReduced ? -8 : -14 }}
                animate={{ opacity: 1, x: 0, rotate: -8 }}
                transition={{ duration: 1.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute left-[-2%] top-1/2 hidden -translate-y-1/2 sm:block lg:left-[-10%]"
                aria-hidden
              >
                <SatellitePhone src="/screenshots/dashboard.jpg" alt="" tone="violet" />
              </motion.div>

              {/* Satellite phone — right (nutrition) */}
              <motion.div
                initial={{ opacity: 0, x: prefersReduced ? 0 : 28, rotate: prefersReduced ? 8 : 14 }}
                animate={{ opacity: 1, x: 0, rotate: 8 }}
                transition={{ duration: 1.4, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute right-[-2%] top-1/2 hidden -translate-y-1/2 sm:block lg:right-[-10%]"
                aria-hidden
              >
                <SatellitePhone src="/screenshots/nutrition.jpg" alt="" tone="lime" />
              </motion.div>

              {/* Main device — actual product welcome screen with live ML overlay */}
              <div className="relative z-20">
                <DeviceFrame
                  src="/screenshots/welcome.jpg"
                  alt="FormAI uygulaması — kamera tabanlı pose detection ve canlı form analizi"
                />
              </div>

              {/* Floating callouts — desktop only, point INTO the device
                  from outside (premium SaaS pattern). All four values match
                  what's literally visible in the welcome screenshot. */}
              <motion.div
                initial={{ opacity: 0, x: prefersReduced ? 0 : -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.85 }}
                className="absolute left-[-12%] top-[18%] z-30 hidden lg:block"
              >
                <HudPanel label="ML Pose · live" value="30" unit="fps" tone="violet" status="active" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: prefersReduced ? 0 : 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.95 }}
                className="absolute right-[-12%] top-[34%] z-30 hidden lg:block"
              >
                <HudPanel label="Hip alignment" value="5°" unit="dev" tone="scan" status="warn" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: prefersReduced ? 0 : -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 1.05 }}
                className="absolute left-[-10%] bottom-[18%] z-30 hidden lg:block"
              >
                <HudPanel label="Postür" value="82" unit="%" tone="violet" status="optimal" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: prefersReduced ? 0 : 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 1.15 }}
                className="absolute right-[-10%] bottom-[28%] z-30 hidden lg:block"
              >
                <HudPanel label="Tracking" value="OK" tone="lime" status="active" />
              </motion.div>
            </div>

            {/* Mobile HUD ribbon — BELOW the device (lg:hidden).
                Pairs with the above-device ribbon to surface all four
                data points the desktop hero shows. Keeps mobile hero
                informationally on par with desktop. */}
            <motion.div
              {...fade(0.5)}
              className="mx-auto mt-5 grid w-full max-w-[440px] grid-cols-2 gap-2.5 lg:hidden"
              aria-hidden
            >
              <HudPanel label="Postür" value="82" unit="%" tone="violet" status="optimal" className="w-full" />
              <HudPanel label="Tracking" value="OK" tone="lime" status="active" className="w-full" />
            </motion.div>
          </motion.div>
        </div>

        {/* Logo ticker / trust band */}
        <motion.div {...fade(0.5)} className="mt-24 lg:mt-32">
          <div className="flex items-center gap-4">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
            <Eyebrow className="whitespace-nowrap">Yerleşik teknoloji yığını</Eyebrow>
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
          </div>
          <ul className="mt-8 grid grid-cols-2 gap-x-8 gap-y-6 text-center sm:grid-cols-3 lg:grid-cols-6">
            {[
              'BlazePose ML Kit',
              'Supabase RLS',
              'RevenueCat Edge',
              'Flutter 3.22',
              'Riverpod 3',
              'KVKK · GDPR',
            ].map((s) => (
              <li key={s} className="font-mono text-xs uppercase tracking-widest text-white/40">
                {s}
              </li>
            ))}
          </ul>
        </motion.div>
      </Container>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col gap-1">
      <dt className="font-display text-2xl font-semibold text-white sm:text-3xl">{value}</dt>
      <dd className="text-xs uppercase tracking-widest text-white/45">{label}</dd>
    </div>
  );
}

// ── Device frame primitives — local to the hero composition ──────────────
// Not promoted to /ui/ yet because they're specialized: the main DeviceFrame
// carries the hero scan line + violet glow; SatellitePhone is a smaller,
// dimmer, rotated variant. If a second surface ever needs the same look,
// extract then.

function DeviceFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative">
      {/* Outer ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-10 rounded-[3rem] bg-violet-500/30 blur-3xl"
      />
      {/* Bezel */}
      <div className="relative h-[600px] w-[280px] overflow-hidden rounded-[2.8rem] border border-violet-400/25 bg-gradient-to-b from-ink-700 to-ink-900 p-[3px] shadow-[0_60px_120px_-20px_rgba(124,92,255,0.55),0_0_0_1px_rgba(124,92,255,0.18)] lg:h-[660px] lg:w-[310px]">
        <div className="relative h-full w-full overflow-hidden rounded-[2.55rem] bg-ink-950">
          <Image
            src={src}
            alt={alt}
            fill
            priority
            sizes="(max-width: 1024px) 280px, 310px"
            placeholder={LQIP[src] ? 'blur' : 'empty'}
            blurDataURL={LQIP[src]}
            className="object-cover object-center"
          />
          {/* Notch */}
          <div
            aria-hidden
            className="absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-ink-950 ring-1 ring-white/5"
          />
          {/* Animated scan line — reinforces "live ML pose detection" */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-x-2 h-px bg-gradient-to-r from-transparent via-violet-400/80 to-transparent shadow-[0_0_24px_rgba(124,92,255,0.7)]"
            initial={{ top: '15%' }}
            animate={{ top: ['15%', '85%', '15%'] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* Glass reflection */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[2.55rem] bg-gradient-to-tr from-transparent via-white/[0.03] to-white/[0.07]"
          />
        </div>
      </div>
    </div>
  );
}

function SatellitePhone({
  src,
  alt,
  tone,
}: {
  src: string;
  alt: string;
  tone: 'violet' | 'lime' | 'scan';
}) {
  const ring = {
    violet: 'border-violet-400/15 shadow-[0_30px_80px_-20px_rgba(124,92,255,0.35)]',
    lime: 'border-lime-500/15 shadow-[0_30px_80px_-20px_rgba(200,255,0,0.25)]',
    scan: 'border-scan-500/15 shadow-[0_30px_80px_-20px_rgba(31,207,255,0.3)]',
  }[tone];

  return (
    <div className="relative">
      <div
        className={`relative h-[440px] w-[210px] overflow-hidden rounded-[2.2rem] border bg-gradient-to-b from-ink-800 to-ink-950 p-[3px] ${ring}`}
      >
        <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-ink-950">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="210px"
            placeholder={LQIP[src] ? 'blur' : 'empty'}
            blurDataURL={LQIP[src]}
            loading="lazy"
            className="object-cover object-center opacity-90"
          />
          {/* Dim overlay so satellite reads as secondary, not competing */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[2rem] bg-gradient-to-b from-ink-950/30 via-transparent to-ink-950/60"
          />
        </div>
      </div>
    </div>
  );
}
