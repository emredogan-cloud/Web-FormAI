'use client';

import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useConsent } from './ConsentProvider';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { cn } from '@/lib/cn';

export function ConsentBanner() {
  const { hasDecided, acceptAll, rejectAll, openSettings } = useConsent();
  const prefersReduced = useReducedMotion();

  return (
    <AnimatePresence>
      {!hasDecided && (
        <motion.div
          key="consent-banner"
          initial={{ y: prefersReduced ? 0 : 32, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: prefersReduced ? 0 : 24, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 bottom-0 z-[80] pointer-events-none"
          role="region"
          aria-label="Çerez tercihleri"
        >
          <div className="mx-auto max-w-3xl px-4 pb-4 sm:pb-6">
            <div
              className={cn(
                'pointer-events-auto relative overflow-hidden rounded-3xl border border-white/[0.08] bg-ink-950/85 p-5 backdrop-blur-2xl',
                'shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7),0_0_0_1px_rgba(124,92,255,0.18)]'
              )}
            >
              {/* Subtle violet edge wash */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-violet-400/60 to-transparent"
              />

              <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
                <div className="space-y-1.5">
                  <Eyebrow>Çerez tercihleri</Eyebrow>
                  <p className="text-sm leading-relaxed text-white/75 sm:text-[14.5px]">
                    Yalnızca işlevsel çerezler varsayılan olarak açıktır. Analitik ve pazarlama
                    çerezlerini açmak senin tercihin —{' '}
                    <Link
                      href="/gizlilik"
                      className="text-violet-300 underline-offset-4 hover:underline"
                    >
                      gizlilik politikasını oku
                    </Link>
                    .
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 sm:flex-nowrap sm:justify-end">
                  <Button onClick={openSettings} variant="ghost" size="sm">
                    Tercihleri yönet
                  </Button>
                  <Button onClick={rejectAll} variant="secondary" size="sm">
                    Yalnızca gerekli
                  </Button>
                  <Button onClick={acceptAll} variant="primary" size="sm">
                    Tümünü kabul et
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
