'use client';

import { useEffect, useRef } from 'react';
import { useConsent } from '@/components/consent/ConsentProvider';

// ─────────────────────────────────────────────────────────────────────────────
// PR 5.4 — consent-gated error monitoring (Sentry).
//
// Mirrors the PR 4.5 analytics posture and honours the privacy commitment the
// site already publishes (gizlilik / kvkk / destek / faq): "Sentry yalnızca
// açık rıza sonrası etkinleşir; beforeSend onaysız tek bir event yollamaz;
// kişisel tanımlayıcı alanlar temizlenir."
//
// THREE gates, all must pass before a single byte leaves the browser:
//   1. A DSN is configured (NEXT_PUBLIC_SENTRY_DSN). Build-inlined — if unset,
//      the @sentry/browser chunk is NEVER even imported (zero bundle cost).
//   2. The visitor granted the "analytics" consent category. DNT is already
//      enforced upstream (ConsentProvider forces analytics:false under DNT).
//   3. beforeSend scrubs PII as a final guard (no user id/email/ip, no
//      cookies/headers/query string) before any event is sent.
// Revoking consent closes the client → reporting stops for the session.
//
// Scope: client-side errors only (window.onerror + unhandledrejection via
// Sentry's default GlobalHandlers). No Replay, no Profiling, no performance
// tracing (tracesSampleRate: 0) — none of Sentry's heavy/invasive defaults.
// Server route errors already land in Vercel function logs.
// ─────────────────────────────────────────────────────────────────────────────

// Inlined at build time. Absent → never import the SDK (the chunk stays unloaded).
const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;

export function ErrorMonitor() {
  const { state } = useConsent();
  const enabled = state?.analytics === true && Boolean(SENTRY_DSN);
  const initedRef = useRef(false);

  useEffect(() => {
    let cancelled = false;

    // Gate 1+2 cleared → lazily load + initialise (once).
    if (enabled && !initedRef.current) {
      initedRef.current = true;
      void import('@sentry/browser').then((Sentry) => {
        if (cancelled) return;
        Sentry.init({
          dsn: SENTRY_DSN,
          environment: process.env.NODE_ENV,
          tracesSampleRate: 0, // no performance tracing
          sendDefaultPii: false, // never attach IP address / default PII
          // Gate 3 — strip identifying context before send.
          beforeSend(event) {
            delete event.user; // no id / email / ip_address
            if (event.request) {
              delete event.request.cookies;
              delete event.request.headers;
              delete event.request.query_string;
            }
            return event;
          },
        });
      });
    }

    // Consent revoked (or DSN removed) after init → stop reporting.
    if (!enabled && initedRef.current) {
      initedRef.current = false;
      void import('@sentry/browser').then((Sentry) => {
        void Sentry.getClient()?.close();
      });
    }

    return () => {
      cancelled = true;
    };
  }, [enabled]);

  return null;
}
