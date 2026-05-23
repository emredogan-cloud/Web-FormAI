'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useConsent } from './ConsentProvider';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { cn } from '@/lib/cn';

interface Category {
  id: 'necessary' | 'analytics' | 'marketing';
  title: string;
  description: string;
  required?: boolean;
}

const CATEGORIES: Category[] = [
  {
    id: 'necessary',
    title: 'Gerekli',
    description:
      'Sitenin temel işlevleri için zorunlu çerezler — oturum, güvenlik ve tercih hatırlama. Bu kategori daima açıktır.',
    required: true,
  },
  {
    id: 'analytics',
    title: 'Analitik',
    description:
      'Hangi sayfaların işe yaradığını anlamamızı sağlayan anonim ürün analitiği. Bireysel kimliği tanımlamaz; pazarlama ağlarıyla paylaşılmaz.',
  },
  {
    id: 'marketing',
    title: 'Pazarlama',
    description:
      'Retargeting / reklam piksel takibi. Şu an kullanılmıyor; ileride aktif olursa bu kategori altında yönetilir.',
  },
];

export function ConsentSettings() {
  const { settingsOpen, closeSettings, state, acceptAll, rejectAll, saveCustom } = useConsent();
  const prefersReduced = useReducedMotion();

  const [analytics, setAnalytics] = useState(state?.analytics ?? false);
  const [marketing, setMarketing] = useState(state?.marketing ?? false);

  // Re-sync local form state when the panel opens or saved state changes.
  useEffect(() => {
    if (settingsOpen) {
      setAnalytics(state?.analytics ?? false);
      setMarketing(state?.marketing ?? false);
    }
  }, [settingsOpen, state]);

  // ESC to close.
  useEffect(() => {
    if (!settingsOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeSettings();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [settingsOpen, closeSettings]);

  // Lock body scroll while open.
  useEffect(() => {
    if (!settingsOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [settingsOpen]);

  return (
    <AnimatePresence>
      {settingsOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="consent-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[90] bg-ink-950/70 backdrop-blur-md"
            onClick={closeSettings}
            aria-hidden
          />

          {/* Panel */}
          <motion.div
            key="consent-panel"
            initial={{ opacity: 0, scale: prefersReduced ? 1 : 0.98, y: prefersReduced ? 0 : 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: prefersReduced ? 1 : 0.98, y: prefersReduced ? 0 : 12 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center"
            role="dialog"
            aria-modal="true"
            aria-labelledby="consent-settings-title"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className={cn(
                'relative w-full max-w-xl overflow-hidden rounded-3xl border border-white/[0.08] bg-ink-900/95 backdrop-blur-2xl',
                'shadow-[0_50px_120px_-20px_rgba(0,0,0,0.8),0_0_0_1px_rgba(124,92,255,0.15)]'
              )}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/60 to-transparent"
              />

              <div className="flex items-start justify-between gap-4 border-b border-white/[0.06] p-6">
                <div>
                  <Eyebrow>Çerez tercihleri</Eyebrow>
                  <h2
                    id="consent-settings-title"
                    className="mt-2 font-display text-xl font-semibold text-white"
                  >
                    Hangi çerezlere izin veriyorsun?
                  </h2>
                </div>
                <button
                  onClick={closeSettings}
                  aria-label="Kapat"
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/[0.08] text-white/55 transition-colors hover:border-white/[0.16] hover:text-white"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M3 3 L11 11 M11 3 L3 11"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>

              <div className="max-h-[60vh] overflow-y-auto p-6">
                <ul className="space-y-3">
                  {CATEGORIES.map((cat) => {
                    const value =
                      cat.id === 'necessary'
                        ? true
                        : cat.id === 'analytics'
                          ? analytics
                          : marketing;
                    const onChange = (v: boolean) => {
                      if (cat.id === 'analytics') setAnalytics(v);
                      if (cat.id === 'marketing') setMarketing(v);
                    };
                    return (
                      <li
                        key={cat.id}
                        className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-display text-sm font-semibold text-white">
                                {cat.title}
                              </h3>
                              {cat.required && (
                                <span className="rounded-full border border-violet-400/30 bg-violet-500/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-violet-200">
                                  zorunlu
                                </span>
                              )}
                            </div>
                            <p className="mt-1.5 text-xs leading-relaxed text-white/55">
                              {cat.description}
                            </p>
                          </div>
                          <Toggle
                            checked={value}
                            disabled={cat.required}
                            onChange={onChange}
                            label={`${cat.title} çerezleri`}
                          />
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="flex flex-wrap items-center justify-end gap-2 border-t border-white/[0.06] p-5">
                <Button onClick={rejectAll} variant="ghost" size="sm">
                  Yalnızca gerekli
                </Button>
                <Button onClick={acceptAll} variant="secondary" size="sm">
                  Tümünü kabul et
                </Button>
                <Button
                  onClick={() => saveCustom({ analytics, marketing })}
                  variant="primary"
                  size="sm"
                  arrow
                >
                  Seçimimi kaydet
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function Toggle({
  checked,
  disabled,
  onChange,
  label,
}: {
  checked: boolean;
  disabled?: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(
        'relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200',
        checked ? 'bg-violet-500' : 'bg-white/[0.1]',
        disabled && 'cursor-not-allowed opacity-60',
        !disabled && 'cursor-pointer'
      )}
    >
      <span
        aria-hidden
        className={cn(
          'inline-block h-4 w-4 rounded-full bg-white shadow transition-transform duration-200',
          checked ? 'translate-x-6' : 'translate-x-1'
        )}
      />
    </button>
  );
}
