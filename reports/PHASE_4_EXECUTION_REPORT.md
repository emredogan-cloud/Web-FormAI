# PHASE 4 — EXECUTION REPORT

**Phase:** 4 — Performance + Delivery
**Source:** `reports/WEBSITE_EVOLUTION_MASTERPLAN.md` § Phase 4
**Status:** ✅ **Complete.** All five sub-PRs shipped.
**Window:** commits `70d86c3 → 43c5a6f` (spanning the Micro-Polish interjection between 4.3 and 4.4).

---

## Executive summary

Phase 4's mandate, per the masterplan, was **delivery weight + perceived speed + real-user visibility** — "Hit Lighthouse mobile ≥ 95; LCP < 2 s on 4G," with the explicit dependency note that real-device Lighthouse runs sit outside the code work. Five sub-PRs executed that mandate along four axes: **image weight**, **JavaScript weight**, **idle animation cost**, and **instrumentation**.

All five hit their targets:

- **4.1 Image format pass** — `sharp`-based converter; 4 referenced assets re-encoded (−3.73 MB) + 3 orphan screenshots deleted (−2.3 MB) = **~6 MB off deploy weight**. The LCP image (`welcome.jpg`) drops to **44 KB AVIF** at the typical mobile viewport. `public/` images fell from >10 MB (pre-Phase 3) to ~2 MB. **Closes W8 (High).**
- **4.2 Image priority + lazy hints + LQIP** — audit confirmed most hints were already correct (banked from PR 2.1 / 3.3); surgical `sizes`/`lazy` fix on `CtaBlock`; new LQIP pipeline emits ~945 B of inline blur data-URIs so the 3 above-fold images fade in from a preview instead of popping. Exactly **1 preload per home load** (the LCP image), 0 elsewhere.
- **4.3 Framer Motion diet** — the phase's **biggest JS win**: −34 to −36 KB First Load JS on the four pillar/conversion routes. Replaced scroll-fade / hover-lift FM with a custom `useIntersect` hook + CSS; reserved FM for genuinely-interactive surfaces. **Closes W14 (Medium).**
- **4.4 GPU-friendly background animations** — a single shared `IntersectionObserver` (`MotionGate`) pauses always-running ambient animations off-screen. Surfaced and neutralised the dominant idle cost (`text-gradient-violet`, ~30 instances, repainting every frame on- and off-screen). **Zero identity change** — on-screen motion is byte-identical.
- **4.5 Real-User Monitoring** — Vercel Analytics + Speed Insights, **consent-gated** (opt-in only, default-deny, DNT-honoured). Closes the "no analytics / no real-user metrics" gap from the deep review.

The site is now **lean on shipped bytes, light on idle CPU/GPU, and instrumented** — without surrendering the dark-neon identity. Efficient ≠ static held throughout.

---

## Completed sub-PRs

### ✅ PR 4.1 — Image format pass

- **Commit:** `70d86c3` — *image format pass — 3.7 MB shaved from referenced assets*
- **Files:** new `scripts/optimize-images.mjs`, `package.json` (+`sharp` devDep + `optimize-images` script), `src/app/antrenman/page.tsx`, `src/components/sections/HowItWorks.tsx`, asset re-encodes + deletions in `public/`.
- **Approach:** Idempotent `sharp` converter (PNG→WebP, JPG re-encode q78 mozjpeg/progressive; skips files where re-encode would be larger). Re-runnable via `npm run optimize-images` when heavy assets land.
- **Wins:** `pose-analysis.png` 1.72 MB → 89 KB WebP (−95%); `welcome.jpg` 1.03 MB → 151 KB (−86%); `dashboard.jpg` 707 KB → 140 KB (−80%); `nutrition.jpg` 819 KB → 142 KB (−83%). Script-tracked −3.73 MB; orphan deletions (`paywall`/`badge`/`progress`) −2.3 MB; **~6 MB total**. `next/image` then serves `welcome.jpg` as **44 KB AVIF** at the typical viewport (≈2× smaller end-to-end).
- **Validation:** build clean (shared baseline 87.1 kB), lint clean, 9 routes 200; removed sources 404, new WebP 200.
- **Closes:** W8 (High).

### ✅ PR 4.2 — Image priority + lazy hints + LQIP placeholders

- **Commit:** `00b4c1a` — *image priority + lazy hints + LQIP placeholders*
- **Files:** new `scripts/generate-lqip.mjs`, new `src/lib/image-lqip.ts`, `package.json` (+`lqip` script), `src/components/sections/CtaBlock.tsx`, `src/components/sections/Hero.tsx`.
- **Approach:** Audit-first — most images already carried correct `sizes`/`priority`/`lazy` from PR 2.1 (hero) and PR 3.3 (layout breakers). Only `CtaBlock` needed a real fix (`sizes="(max-width: 1024px) 0px, 50vw"` — it was sizes-less and pulling a 3840w derivative on mobile for an image masked-out there). New LQIP generator resizes hero images to 20 px, WebP q30, base64 data-URI → typed `Record` in `image-lqip.ts`; `Hero` looks up `LQIP[src]` and passes `placeholder="blur"` + `blurDataURL` with a safe `empty` fallback.
- **Wins:** 3 above-fold images (`welcome`/`dashboard`/`nutrition`) fade in from a ~315 B blur preview — no hard pop on slow links. Total LQIP cost ~945 B inline (gzip-friendly). Lazy audit: home = 10 imgs / 9 lazy / 1 priority; exactly 1 image preload per home load, 0 on all other routes.
- **Validation:** build clean, lint clean, 9 routes 200; all 3 data-URIs confirmed in rendered HTML.

### ✅ PR 4.3 — Framer Motion diet

- **Commit:** `37ba038` — *framer motion diet — -36 KB on 4 routes, IO+CSS replaces FM*
- **Files:** new `src/lib/use-intersect.ts`, rewrite `src/components/ui/Reveal.tsx`, `src/app/globals.css` (`.reveal` classes), conversions in `PageHero`/`MetricGrid`/`NutritionShowcase`/`ProgressShowcase`/`FeatureBlock`, `src/app/layout.tsx` (dynamic-import consent UI).
- **Approach:** Replaced the 80% case (scroll-tied fade-up, mount fade-up, hover lift) with a minimal SSR-safe `useIntersect` hook + CSS transitions (`opacity`+`transform`, 0.85 s cubic-bezier). `Reveal`/`RevealStagger`/`RevealItem` kept their **exact public API** (FM swapped out underneath); `RevealStagger` injects per-child `transitionDelay` via `cloneElement`. Several converted components became **server components** again. `ConsentBanner` + `ConsentSettings` moved to `next/dynamic({ ssr: false })` so the FM bundle no longer ships on any route's first paint.
- **Wins (First Load JS):** `/antrenman` 143→107 (**−36**), `/beslenme` 146→110 (**−36**), `/baslat` 143→109 (**−34**), `/gelisim` 146→110 (**−36**) kB. `/` −5 (Hero still uses FM by design); `/destek` flat (FaqAccordion uses FM); legal pages flat (no FM users). Masterplan target "−30 to −40 KB on most pages" — **hit exactly** on the four pillar/conversion pages.
- **Retention (justified):** FM kept on `Hero` (signature conic ring / scan / mount), `FaqAccordion` (auto-height collapse needs JS measurement), and the now-dynamic consent modals.
- **Validation:** build clean, lint clean, 9 routes 200; SSR `.reveal` instances hydrate from hidden state; all key headings present in SSR HTML without client JS.
- **Closes:** W14 (Medium).

### ✅ PR 4.4 — GPU-friendly background animations

- **Commit:** `65b7113` — *GPU-friendly background animations — MotionGate viewport pause*
- **Files:** new `src/components/util/MotionGate.tsx`, `src/app/layout.tsx` (mount), `src/app/globals.css` (pause hook + conic-ring `will-change`).
- **Approach:** One shared `IntersectionObserver` mounted once in layout (renders null), querying five ambient selectors and toggling `[data-motion-paused]` as hosts enter/leave the viewport (`rootMargin: 200px` so motion resumes before it's seen). CSS pause hook uses `animation-play-state: paused` (freezes position → seamless resume, vs `animation: none` which resets). `.conic-ring` promoted with `will-change: transform` plus a **release rule** when it scrolls off (avoids the "will-change held forever" anti-pattern).
- **Wins:** The dominant idle cost — `text-gradient-violet` (~30 instances animating `background-position`, **not** GPU-composited, repainting every frame regardless of visibility) — is now frozen off-screen. `animate-orbit`/`ticker`/`scan` and the Akış pulses gated too. Tiny status dots deliberately left ungated (observer overhead > saving).
- **Identity:** no animation removed, recolored, or slowed. On-screen motion is identical; only off-screen timelines freeze.
- **Honoured:** `prefers-reduced-motion` (gate no-ops; global killswitch already zeroes durations), `prefers-reduced-data` (freeze all permanently), no-IO fallback (runs as before), client-nav re-scan on `pathname` change.
- **Validation:** build clean, lint clean, 9 routes 200; SSR ships zero `data-motion-paused` (applied client-side post-hydration); pause CSS + selector + `rootMargin` confirmed in compiled output.

### ✅ PR 4.5 — Real-User Monitoring (consent-gated)

- **Commit:** `43c5a6f` — *real-user monitoring — Vercel Analytics + Speed Insights, consent-gated*
- **Files:** new `src/components/util/ConsentedAnalytics.tsx`, `src/app/layout.tsx` (dynamic mount), `package.json` / `package-lock.json` (`@vercel/analytics@^2.0.1`, `@vercel/speed-insights@^2.0.0`).
- **Approach:** Client wrapper renders `<Analytics/>` + `<SpeedInsights/>` **only** when `useConsent().state?.analytics === true`; else `null`. Mounted via `next/dynamic({ ssr: false })` inside `<ConsentProvider>` (it reads that context), keeping the SDK out of every route's initial payload. Honours the contract written into `src/lib/consent.ts` ("tracking scripts … must read consent before initialising").
- **Wins / privacy:** Default-deny — nothing loads pre-consent. DNT already forced `analytics:false` upstream (even on "accept all"), so the single flag read suffices. Revoking consent unmounts both → tracking stops. Verified at HTTP level: **0** beacon markers in the served HTML before any decision.
- **Validation:** build clean (SDK in a deferred chunk, not First Load JS; no `useSearchParams` Suspense bailout), lint clean, 9 routes 200.

---

## Perf impact (consolidated)

| Axis | Before | After | Delta |
|---|---|---|---|
| `public/` image weight | >10 MB (pre-Phase 3) → ~8 MB (start of P4) | ~2 MB | **~6 MB off deploy** |
| LCP image served | ~89 KB (pre-re-encode AVIF) | **44 KB AVIF** @ mobile viewport | ~2× smaller |
| First Load JS — `/antrenman` | 143 kB | **107 kB** | −36 kB |
| First Load JS — `/beslenme` | 146 kB | **110 kB** | −36 kB |
| First Load JS — `/gelisim` | 146 kB | **110 kB** | −36 kB |
| First Load JS — `/baslat` | 143 kB | **109 kB** | −34 kB |
| First Load JS — `/` (Hero keeps FM) | 155 kB | 150 kB | −5 kB |
| Shared baseline chunk | 87.1 kB | 87.2 kB | flat (+MotionGate) |
| Idle animation repaints (off-screen) | ~30 always-on gradient repaints + 4 composited timelines | frozen when off-viewport | qualitative, large |
| Above-fold image pop | hard pop on slow links | LQIP blur-up (~945 B) | qualitative |

**Note:** these are build-time bundle figures + asset sizes. Lighthouse-score and 4G-LCP confirmation require a real-device run (see *Remaining risks*).

## Motion strategy (the through-line)

Phase 4 settled a **coherent motion doctrine** the rest of the build now inherits:
1. **Reveals/hover** → `useIntersect` + CSS (`.reveal` classes), not Framer Motion (4.3).
2. **FM is reserved** for `Hero` signature motion + `FaqAccordion` auto-height + the dynamic-imported consent modals — nowhere else.
3. **Always-on ambient motion is viewport-gated** via the shared `MotionGate` observer (4.4); on-screen identity preserved.
4. **Accessibility/data signals are first-class**: `prefers-reduced-motion` and `prefers-reduced-data` are honoured globally and by the gate. This is now Standing Rule #2 and is non-negotiable going forward.

## Image-optimization strategy

Two idempotent, re-runnable scripts now own the asset pipeline: `optimize-images.mjs` (format/weight) and `generate-lqip.mjs` (blur previews → typed `image-lqip.ts`). Source assets are pre-optimised; `next/image` does the per-viewport AVIF/WebP negotiation; LQIP smooths the above-fold paint. Hints (`sizes`/`priority`/`lazy`) are audited per route — exactly one preload (the LCP image) on home, none elsewhere.

## Analytics consent architecture

```
ConsentProvider (context, DNT-aware, localStorage)
        │  state: { analytics, marketing, necessary } | null
        ▼
ConsentedAnalytics  ──(state?.analytics === true)──▶  <Analytics/> + <SpeedInsights/>
   (dynamic, ssr:false)        else null  →  no script, no beacons
```

Single source of truth = `src/lib/consent.ts`. Gate reads `useConsent().state?.analytics`. Default-deny; DNT enforced at write-time (so reads need no DNT re-check); revocation unmounts. SDK ships only post-consent, post-hydration, in a deferred chunk.

## Major decisions

1. **IO + CSS over Framer Motion for the common case** (4.3) — the single largest bundle lever; preserved component APIs so callers were untouched.
2. **One shared observer, not per-component** (4.4) — 30+ paint-heavy animations vs one centralised gate; the gate wins decisively.
3. **`animation-play-state: paused` not `animation: none`** (4.4) — freezes position for seamless resume.
4. **Conditional-mount consent gate, not `beforeSend` filtering** (4.5) — simplest correct privacy posture; nothing loads at all pre-consent.
5. **`ssr:false` dynamic imports for consent UI + analytics** (4.3/4.5) — keeps FM and the analytics SDK off every route's first paint.
6. **Audit-first on image hints** (4.2) — refused to re-do work already banked in earlier phases; only the genuine `CtaBlock` gap was fixed.

## Validation summary

Every sub-PR closed GREEN under Standing Rule #6: `npx next build` clean + `npx next lint --max-warnings 0` clean + all 9 routes (`/ /antrenman /beslenme /gelisim /baslat /destek /gizlilik /kvkk /sartlar`) 200, plus per-PR HTTP/SSR/bundle proofs (404/200 asset checks, lazy-hint counts, `.reveal` SSR hydration, `data-motion-paused` absence in SSR, 0 analytics beacons pre-consent).

## Lessons / constraints

- **No live browser this session-line.** 4.4's scroll-pause and 4.5's opt-in beacon were verified by build/bundle/CSS/SSR/HTTP inspection — **not** by a driven browser. We flagged this honestly each time rather than claiming visual success (Standing Rule #6).
- **Audit before re-doing.** 4.2 proved much of the "perf work" was already banked; the discipline saved churn.
- **Identity is a constraint, not a nice-to-have.** Every perf move was checked against "does the site still look alive?" — gating beat deletion every time.
- **Server-hygiene footnote:** the 4.5 smoke-test cleanup used too broad a `pgrep` and brushed an unrelated `next-server` from another project (it no-op'd — separate context, no damage). **Future smoke tests must kill port-scoped, not blanket `pkill`.**

## Remaining risks

1. **Lighthouse ≥ 95 / LCP < 2 s on 4G is unconfirmed.** The masterplan's headline target needs a real-device Lighthouse run; the code work targets it but does not prove it. **Owner action.**
2. **4.4 scroll-pause not eyeballed** on `/antrenman` (Akış) + `/` (hero ring). Low risk — logic is simple and bundle-verified.
3. **4.5 live beacon not eyeballed**, and **Vercel dashboard Analytics + Speed Insights must be toggled on** for post-deploy data (no code needed).
4. **Pre-existing `npm audit` advisories** in the dependency tree (unrelated to the two analytics packages) remain — out of Phase 4 scope, flagged for a future dependency pass.

---

**Phase 4 closed at commit `43c5a6f`. Next: Phase 5 — SEO + Observability, starting at PR 5.1 (JSON-LD structured data).**
