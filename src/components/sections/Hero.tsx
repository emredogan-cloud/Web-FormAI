'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Mono } from '@/components/ui/Mono';
import { GlowOrb } from '@/components/ui/GlowOrb';
import { HudPanel } from '@/components/ui/HudPanel';
import { AppRating } from '@/components/sections/AppRating';
import { UserCountBadge, isUserCountReady } from '@/components/sections/UserCountBadge';

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
        <GlowOrb tone="lime" size="md" className="top-[28rem] -left-20 opacity-20" />
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

            <motion.h1
              {...fade(0.08)}
              className="mt-6 font-display text-display-2xl text-balance"
            >
              <span className="text-gradient">Sahaya çıkan </span>
              <span className="text-gradient-violet">yapay zekâ </span>
              <span className="text-gradient">fitness koçun.</span>
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

          {/* Visual column — coach + HUD */}
          <motion.div
            initial={{ opacity: 0, scale: prefersReduced ? 1 : 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto w-full max-w-md lg:max-w-none"
          >
            <div className="relative aspect-[3/4] w-full">
              {/* Conic glow ring behind */}
              <div className="pointer-events-none absolute -inset-12 rounded-full conic-ring animate-orbit" />

              {/* Coach image */}
              <div className="relative h-full w-full overflow-hidden rounded-[2.5rem] border border-violet-400/15 bg-gradient-to-b from-ink-800 to-ink-950 shadow-[0_60px_120px_-20px_rgba(124,92,255,0.45)]">
                <Image
                  src="/images/pt-form.png"
                  alt="FormAI Coach — yapay zekâ destekli fitness koçu"
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 540px"
                  className="object-cover object-center"
                />
                {/* Inner film grade */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent" />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,transparent_40%,rgba(5,3,12,0.5)_100%)]" />

                {/* HUD overlay panels */}
                <div className="absolute inset-x-6 top-6 flex items-start justify-between">
                  <div className="hud-panel px-3 py-2">
                    <Mono tone="violet">FORM AI · v1.0</Mono>
                    <div className="mt-1 font-mono text-[11px] text-white/70">scan: live · 30 fps</div>
                  </div>
                  <div className="hud-panel px-3 py-2">
                    <Mono tone="lime">STATUS</Mono>
                    <div className="mt-1 flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-lime-500 animate-pulse" />
                      <span className="font-mono text-[11px] text-lime-400">tracking</span>
                    </div>
                  </div>
                </div>

                {/* Floating bottom hud */}
                <div className="absolute inset-x-6 bottom-6 flex items-end justify-between gap-3">
                  <HudPanel label="Postür" value="98" unit="/100" tone="violet" status="optimal" className="min-w-[120px]" />
                  <HudPanel label="Tempo" value="OK" tone="lime" status="active" className="min-w-[100px]" />
                </div>
              </div>

              {/* Floating callouts */}
              <motion.div
                initial={{ opacity: 0, x: prefersReduced ? 0 : 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.7 }}
                className="absolute -right-6 top-1/3 hidden lg:block"
              >
                <HudPanel label="Hip alignment" value="5°" unit="dev" tone="scan" status="warn" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: prefersReduced ? 0 : -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.85 }}
                className="absolute -left-8 top-2/3 hidden lg:block"
              >
                <HudPanel label="Rep" value="12" unit="/15" tone="ember" status="active" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Logo ticker / trust band */}
        <motion.div {...fade(0.5)} className="mt-24 lg:mt-32">
          <div className="flex items-center gap-4">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
            <Mono className="whitespace-nowrap">Yerleşik teknoloji yığını</Mono>
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
