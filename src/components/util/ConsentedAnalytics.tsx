'use client';

import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { useConsent } from '@/components/consent/ConsentProvider';

// PR 4.5 — Real-User Monitoring, consent-gated.
//
// Wires Vercel Analytics (anonymous, cookieless usage analytics) and
// Vercel Speed Insights (real-user Web Vitals) — but ONLY after the
// visitor has actively granted the "analytics" consent category from the
// PR 0.4 banner. This is the exact contract src/lib/consent.ts spells
// out: "tracking scripts that get added later (PR 4.5 / 5.4) must read
// consent before initialising and re-check when consent changes."
//
// Gate: useConsent().state?.analytics === true
//   • No decision yet (state === null while un-hydrated OR undecided)
//     → render nothing → no script, no beacons. Privacy-first default.
//   • "Reddet" / analytics unchecked → state.analytics === false → nothing.
//   • "Kabul et" / analytics checked → both components mount → tracking
//     begins. Do-Not-Track is already enforced upstream (ConsentProvider
//     forces analytics:false when DNT is set, even on "accept all"), so
//     reading this single flag is sufficient — no DNT re-check needed here.
//   • Revoking later flips the flag false → React unmounts both → no
//     further client-side tracking for the session.
//
// Both Vercel components render null (no DOM, no layout cost) and inject
// their beacons client-side. This file is dynamic-imported with ssr:false
// in the root layout, so the analytics SDK stays out of every route's
// initial server payload and first-load JS — consistent with how the
// consent UI is loaded and with the Phase 4 bundle-diet posture.
export function ConsentedAnalytics() {
  const { state } = useConsent();

  if (state?.analytics !== true) return null;

  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
