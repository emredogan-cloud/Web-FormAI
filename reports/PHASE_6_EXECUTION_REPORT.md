# PHASE 6 — EXECUTION REPORT

**Phase:** 6 — Signature Interactions *(the final roadmap phase)*
**Source:** `reports/WEBSITE_EVOLUTION_MASTERPLAN.md` § Phase 6
**Status:** ✅ **Complete + Closed.** All four sub-PRs shipped.
**Window:** commits `1497e50 → 3433979` (on top of the Phase 5 closure `63a76f0`, plus the pre-phase micro-fix `dfbc9dd`).

> **This report closes Phase 6 — and with it the entire 7-phase website program (Phases 0–6).** See `reports/SESSION_HANDOFF_PHASE4.md` for the program-complete handoff.

---

## Executive summary

Phase 6's mandate, per the masterplan, was **"one or two interactions that *only* FormAI does — the kind of moment that gets a screenshot shared."** Brand memorability and delight, built on the Phase 2 hero and the Phase 4 performance budget. Four sub-PRs delivered it — every one **audit-first**, and every one holding the line on the standing rules that defined the whole build: **no Framer Motion in new interactions, truthful content, privacy-first, no blur, mobile parity, reduced-motion respected, performance-first.**

- **6.1 — Hero pose-detection overlay** (`1497e50`, tuned `85dbda5`): a 33-keypoint BlazePose wireframe (Canvas + rAF) behind the hero device; a cursor "detection focus" locks onto nearby joints, mirroring the app's pose engine. Idle scan + tap for touch parity; reduced-motion static frame; viewport-gated.
- **6.2 — Manifesto signature interaction** (`c687edd`): scroll-tied parallax depth on the image panel + line-by-line text reveal. Translate-only (no image zoom) to keep the blur rule intact.
- **6.3 — Live BlazePose form-score demo** (`2090bfb`): a real in-browser pose demo — click-gated camera, on-device inference, live skeleton + a truthful alignment score, 60s auto-stop. Self-hosted runtime (zero third-party). Shipped flag-OFF pending real-device QA.
- **6.4 — Badge-unlock micro-interaction** (`3433979`): a one-time "keşif" badge at the footer milestone — honest, dismissible, once-ever, no fatigue. CSS + IO, no FM.

The signature layer is now in place: the hero *demonstrates* pose intelligence on hover, the manifesto *breathes* with depth, the visitor can *run the real pose engine* on themselves, and reaching the end earns a small, honest moment of delight. Nothing fabricated, nothing that regresses the performance or privacy posture the earlier phases earned.

---

## Completed sub-PRs

### ✅ PR 6.1 — Hero pose-detection skeleton overlay
- **Commits:** `1497e50` (overlay) + `85dbda5` (prominence tune).
- **Files:** new `src/components/ui/SkeletonOverlay.tsx`; `src/components/sections/Hero.tsx` (mount + `isolate`).
- **Approach:** the real BlazePose 33-landmark topology + 35-edge `POSE_CONNECTIONS`, drawn on a DPR-scaled Canvas via `requestAnimationFrame`. A "detection focus" follows the cursor (window-coordinate mapping; the canvas is `pointer-events-none`) and eases per-joint activation by proximity → joints/bones brighten violet→scan with a tracking reticle. **Touch/no-hover parity:** an idle "scan" sweep auto-acquires joints + tap sets a focus. **Reduced-motion/data:** one calm static frame, no loop. **Perf:** a private IntersectionObserver pauses the loop off-screen; shadowBlur only on active elements; DPR capped at 2.
- **Scope reconciliation (audit):** the masterplan brief ("draw on the hero image") predated the Phase 2 device-frame hero — there is no person-photo, so the skeleton is a standalone pose layer (truthful to the engine, not painted on the real app screenshot).
- **Tune:** operator eyeball said "too subtle" → larger figure + more visible resting bones/joints + slower idle sweep; lock-on/reticle left restrained (presence, not VFX).

### ✅ PR 6.2 — Manifesto signature interaction
- **Commit:** `c687edd`.
- **Files:** new `src/components/ui/ParallaxLayer.tsx`; `src/components/sections/Manifesto.tsx` (stays a server component).
- **Approach:** the manifesto statements reveal **line-by-line** via the house `RevealStagger`/`RevealItem` (IO + CSS, cloned `transitionDelay`); the image panel is wrapped in `ParallaxLayer` (passive scroll + a single rAF tick, IO-gated, `will-change` managed) and **drifts over its static glow** for cinematic depth.
- **Blur audit (key):** `pt-form.webp` is a **1672×941 landscape** shown `object-cover` in a portrait `aspect-[3/4]` card (already mildly upscaled on retina). An internal "zoom" parallax would worsen the upscale and soften it → **chose to translate the whole panel (no scale)**, so the blur rule (#1) is untouched.

### ✅ PR 6.3 — Live BlazePose form-score demo
- **Commit:** `2090bfb`.
- **Files:** new `src/components/sections/LiveDemo.tsx`; new `scripts/setup-mediapipe-assets.mjs`; `package.json` (+`@mediapipe/tasks-vision`, predev/prebuild hooks), `.gitignore`, `src/lib/site.ts` (`features.liveDemo`), `src/app/page.tsx` (gated dynamic mount).
- **Pose-tech audit:** `@mediapipe/tasks-vision` `PoseLandmarker` = the **BlazePose** family the app runs (truthful "same engine"); chosen over TF.js (heavier in-bundle). **GPU delegate → no SharedArrayBuffer → no site-wide COOP/COEP headers.**
- **Privacy/permission audit (critical):** explicit click-gate (no auto-camera), **local-only** (frames feed the in-page model; nothing uploaded/stored; not coupled to analytics consent), **self-hosted wasm+model from our own origin → zero runtime third-party requests** (mirrors how `next/font` self-hosts Google Fonts; consistent with the privacy copy's "Google'a gönderilmez / üçüncü tarafla paylaşılmaz"), **60s auto-stop** with bulletproof `teardown()` from every exit (stop/timeout/tab-hide/unmount), graceful **denied / unsupported / error** paths, secure-context required.
- **Truthfulness:** the score is a **real geometric readout** (torso verticality + shoulder/hip symmetry from detected landmarks), returns null (not a fake number) when unframed, and the UI states the app does full exercise-specific analysis. No theatre.
- **Perf:** the ~17 MB runtime is `dynamic-import()`ed **only on Start** → shared First Load JS unchanged (87.3 kB). `@mediapipe/tasks-vision` has **zero sub-dependencies** (no new vulns).
- **Operator-approved decisions** (via clarifying question): **self-host** the runtime; ship **flag-OFF** (`site.features.liveDemo`, default false) pending a real-device QA pass — the camera/ML runtime is **untested this session-line** (no browser/webcam).

### ✅ PR 6.4 — Badge-unlock micro-interaction
- **Commit:** `3433979`.
- **Files:** new `src/components/BadgeUnlock.tsx`; `src/app/layout.tsx` (dynamic mount inside ConsentProvider).
- **Approach:** an IntersectionObserver on the `<footer>` triggers a one-time corner badge once the cookie banner is resolved (`hasDecided`, so it never stacks); CSS transition for enter/exit (no FM); auto-dismiss + manual close; `role="status"` polite.
- **No-fatigue + truthful:** shows **at most once, ever** (localStorage `formai_badge_v1`); framed honestly as a *keşif* (discovery) marker — "siteyi baştan sona gezdin" is literally true — and the copy states the real badges unlock in the app with real progress. No fabricated achievement, no growth-hack spam.

---

## Cross-cutting engineering (the through-line)

- **No Framer Motion in any new interaction** (rule #2). Phase 6 added four interactions across Canvas+rAF (6.1), IO+CSS+rAF (6.2), and IO+CSS (6.4); 6.3 is event/rAF-driven. FM stayed confined to its pre-existing allowed surfaces. **Verified 0 FM occurrences** in every new component.
- **Performance-first:** **shared First Load JS is unchanged (87.3 kB)** across the entire phase. Every heavy or always-on cost is gated — rAF loops pause off-viewport (6.1) or off-scroll (6.2), and the 17 MB ML runtime loads only on an explicit click (6.3).
- **Reduced-motion / reduced-data:** each interaction degrades to a calm static/no-op state; canvas/JS loops opt out themselves (the global CSS killswitch can't reach them).
- **Mobile parity:** hover-driven moments have touch equivalents (6.1 idle scan/tap); scroll-driven effects work on touch inherently (6.2/6.4); the demo uses the front camera responsively (6.3).
- **Truthful + privacy-first:** the skeleton is the real topology; the demo is real on-device inference with a real score and a self-hosted, no-third-party runtime; the badge is an honest discovery marker.
- **No blur:** all new visuals are vector/canvas (DPR-scaled, crisp); the one raster touched (6.2) was handled with translate-only parallax to avoid upscaling.

## Major decisions

1. **Standalone pose layer, not painted on the screenshot** (6.1) — truthful + robust, given the post-Phase-2 device-frame hero.
2. **Canvas + rAF over SVG** (6.1) — cheaper than mutating ~68 nodes/frame and mirrors how the app renders its overlay.
3. **Translate the panel, never zoom the image** (6.2) — depth without violating the blur rule on a landscape-in-portrait source.
4. **MediaPipe (BlazePose) over TF.js** (6.3) — truthful "same engine," lighter in-bundle, GPU delegate avoids COOP/COEP.
5. **Self-host the ML runtime** (6.3) — zero runtime third-party; consistent with `next/font`'s self-hosting and the privacy copy.
6. **Ship the camera demo flag-OFF** (6.3) — build-then-verify, because the runtime couldn't be browser-tested this session-line.
7. **Once-ever, footer-gated, consent-aware badge** (6.4) — delight without notification fatigue or fabricated achievement.

## Validation summary

Every sub-PR closed GREEN under Standing Rule #6: `npx next build` / `npm run build` clean + `npx next lint --max-warnings 0` clean + all 10 routes 200, plus per-PR proofs — SSR presence/absence checks, bundle-delta checks (shared JS unchanged), self-hosted-asset serving (correct `application/wasm` MIME), flag on/off states, and 0-Framer-Motion scans. Servers were killed **port-scoped** throughout.

## Lessons / constraints

- **Audit-first kept paying off:** 6.1 caught the masterplan/hero mismatch; 6.2 caught the landscape-in-portrait upscale trap; 6.3's privacy audit drove the self-host + no-third-party decision and the GPU-delegate (no COEP) choice.
- **No live browser this session-line.** The hero/manifesto/badge interactions were verified by build/lint/SSR/HTTP/code review, and **the 6.3 camera+inference runtime was not actually run** — which is exactly why it ships flag-OFF. Honest per Rule #6.
- **Truthfulness scaled to interactions, not just content:** a "form score" and a "visitor badge" are both easy to fake; both were built on real signals (real landmark geometry; a real milestone) and labelled honestly.

## Remaining risks / open items (operator-actionable)

1. **PR 6.3 real-device QA + activation** *(carried, agreed not to block closure)*: set `site.features.liveDemo = true`, run a real-device QA pass (desktop + iOS Safari + Android Chrome — camera permission, GPU inference, skeleton alignment, mobile layout), then deploy. To re-test, clear `localStorage` as needed.
2. **Privacy-policy line for the web demo** *(before enabling 6.3 publicly)*: add a short `gizlilik` clause describing the on-device, no-upload web camera demo (the in-UI disclosure is present; a policy line + counsel review is the thorough KVKK move). Legal copy was deliberately not edited unilaterally.
3. **Visual eyeball of 6.1/6.2/6.4** on a real browser/device (animation feel, placement, the badge pop) — code-verified only this session-line.
4. **Carried from earlier phases:** set `NEXT_PUBLIC_SENTRY_DSN` (EU/Frankfurt per KVKK) + enable Vercel Analytics/Speed Insights in the dashboard (both inert until then); a real-device Lighthouse run to confirm the Phase 4 ≥95 / LCP <2s targets; the repo's pre-existing `npm audit` advisories (incl. the Next.js image-opt one) — a separate Next.js bump decision, unrelated to Phase 6.

---

**Phase 6 closed at commit `3433979` (code) + this docs-closure commit. This is the final roadmap phase — the entire 7-phase FormAI website program (Phases 0–6 + Micro Polish) is now COMPLETE.**
