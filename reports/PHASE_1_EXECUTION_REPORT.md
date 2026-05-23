# PHASE 1 — EXECUTION REPORT

**Phase:** 1 — Trust Layer
**Source:** `reports/WEBSITE_EVOLUTION_MASTERPLAN.md` § Phase 1
**Status:** ✅ **Complete (code-side).** All six sub-PRs shipped. Three of them are structurally active today; three are upgrade-by-config-only and need real-world inputs (founder identity, beta testimonials, app-store reviews, user count) to switch on.
**Window:** Single session, commits `7f4baa4 → ac38c9a`.

---

## Executive summary

Phase 1's mandate was the **highest single ROI upgrade** on the entire V1 → V2 roadmap — move the trust score from 4/10 to ~7/10 by closing review item **W2** ("Trust signals are entirely absent"). All six sub-PRs landed without a single fabricated quote, rating, photo, or user-count number.

The Phase 1 design pattern, repeated across every sub-PR:

> **Build the structural slot. Refuse to fabricate. Auto-activate when real data lands — by editing config, never by editing code.**

Three slots are LIVE today on every visit:
1. **Founder strip** — truthful "bağımsız bir küçük ekip" voice + three verifiable commitments cross-linked to legal pages.
2. **Pricing trust strip** — three honest promises ("7 gün ücretsiz", "Şimdi ödeme yok", "İstediğin an iptal") cross-linked to Şartlar § 2.3-2.4.
3. **Marquee** — trimmed from 9 → 6 strongest verifiable tech facts, now data-driven.

Three slots are READY but invisible until you populate them:
4. **Testimonials** — honest "be the first" empty state today; auto-flips to a card grid when entries with `consent: true` land in `src/data/testimonials.ts`.
5. **App-store rating badge** — invisible today; auto-renders when a store has both `average` AND `count >= 100` set in `src/lib/site.ts`.
6. **User-count badge** — replaces the hero stats row when real value AND date are set in `src/lib/site.ts` → `userCount`.

**Trust score delta:** the V1 baseline of 4/10 → ~5/10 today (slots 1, 4-empty, and the pricing strip add immediate trust posture). When slots 2, 3, 5, 6 activate with real data, projected to hit the masterplan target of ~7/10.

Combined with Phase 0's launch blockers (legal pages, real store-status, working waitlist, consent banner), the site is now **launch-ready and credible** — premium aesthetic backed by truthful posture, no fake numbers, no broken anchors.

---

## Completed sub-PRs

### ✅ PR 1.1 — Founder / human trust strip

- **Commit:** `7f4baa4` — *PR 1.1: founder / human trust strip (truthful anonymous-craft)*
- **Push:** `8ca3943..7f4baa4` → `origin/main`
- **Files (4):** New `src/components/sections/FounderStrip.tsx`, modified `src/lib/site.ts`, `src/app/page.tsx`, `src/app/destek/page.tsx`
- **Approach:** Dual-mode component — ships today in *anonymous-craft* mode (no name, no face). When `team.founder.name` + `team.founder.photoSrc` are set in config, auto-upgrades to a *named-founder* variant with photo + role + signature line. Body copy uses only verifiable facts from the FormAI codebase (Flutter, 138 egzersiz, 8 pose analyzers) + three commitment cards linking to `/gizlilik`, `/kvkk`, `/antrenman`. Mounted on `/` after MarqueeBand and on `/destek` after the channels block.
- **Validation:** Build clean (15 routes, shared baseline unchanged at 87.1 kB), lint clean, DOM order on `/` verified (marquee → founder strip → product pillars), all key Turkish copy renders, named-mode markers absent (anonymous variant active).
- **Activation path:** Edit `team.founder.{name, role, photoSrc, signatureLine}` in `src/lib/site.ts`. No code change.

### ✅ PR 1.2 — Testimonial section (truthful + upgrade-ready)

- **Commit:** `5f4d31d` — *PR 1.2: testimonial section (truthful + upgrade-ready)*
- **Push:** `7f4baa4..5f4d31d` → `origin/main`
- **Files (4):** New `src/data/testimonials.ts`, new `src/components/sections/Testimonials.tsx`, modified `src/app/page.tsx`, `src/app/baslat/page.tsx`
- **Approach:** Two-mode component. Empty state (today): "Sosyal kanıt · birazdan" panel with three dashed ghost slots (clearly empty by design, not loading skeletons) + waitlist CTA. Populated: responsive card grid (1/2/3 cols) with photo, quote, lime-accented outcome chip, attribution row. Per-entry `consent: true` gate makes shipping a quote without explicit permission structurally impossible. `variant="home"` vs `variant="baslat"` swaps the heading copy.
- **Placement:** Home — between `<MetricGrid />` and `<Manifesto />` (proof → social proof → tone → CTA flow). Baslat — above the Plans section (warming up the pricing decision).
- **Validation:** Build clean, empty state copy renders on both pages with their variant strings, DOM order verified, 4 CTAs route to `/baslat#waitlist`, zero fabricated quote text in HTML.
- **Activation path:** Add entries with `consent: true` to `src/data/testimonials.ts`. Shipping rules codified in the file header.

### ✅ PR 1.3 — App-store rating badge (gated by real data)

- **Commit:** `df45776` — *PR 1.3: app-store rating badge (gated by real data)*
- **Push:** `5f4d31d..df45776` → `origin/main`
- **Files (4):** New `src/components/sections/AppRating.tsx`, modified `src/lib/site.ts`, `src/components/sections/Hero.tsx`, `src/app/baslat/page.tsx`
- **Approach:** Server component reading `site.ratings`. Returns null unless at least one store has both `average !== null` AND `count >= minReviewCount` (default 100, mirroring the masterplan's credibility threshold). When live, renders 1-2 horizontal badge pills with gradient-filled SVG stars (in the lime success accent), tr-TR-localized review counts ("1,2K" for 1200), store glyph, hover-to-store URL.
- **Placement:** Hero (below stats row, gated by Reveal motion at delay 0.44) + /baslat page hero (centered below the two CTA buttons).
- **Validation:** Build clean (home: 4.22 → 5.96 kB for the bundled-but-null component), zero rendered markup on either surface today, hero core copy preserved.
- **Activation path:** Fill `ratings.{appStore,play}.{average, count, url}` in `src/lib/site.ts`. Single source of truth propagates everywhere.

### ✅ PR 1.4 — Pricing trust strip (3 verifiable promises)

- **Commit:** `00a3b0d` — *PR 1.4: pricing trust strip (3 verifiable promises)*
- **Push:** `df45776..00a3b0d` → `origin/main`
- **Files (2):** New `src/components/sections/PricingTrustStrip.tsx`, modified `src/app/baslat/page.tsx`
- **Approach:** Three-promise strip with icons, sits between the Plans heading and the pricing cards (the moment of pricing scrutiny). Each badge cross-references the exact Şartlar section that backs it. Deliberately did NOT promise "money-back guarantee" — Terms § 2.5 routes refund processing to Apple/Google, so the claim would be inaccurate from us. Three honest promises ("7 gün ücretsiz dene" → §2.4, "Şimdi ödeme yok" → §2.3, "İstediğin an iptal" → §2.3) reduce perceived risk without overstepping.
- **Validation:** Build clean, all 3 trust badges render with bodies + Şartlar evidence labels, 4 cross-refs to `/sartlar#abonelik`, DOM order verified (heading → strip → cards), old weak footnote replaced with tighter legal cross-ref.
- **Active today:** Yes — no activation step required (claims already in Şartlar).

### ✅ PR 1.5 — Marquee press-mode ready (6 strongest tech facts)

- **Commit:** `cb592ee` — *PR 1.5: marquee press-mode ready (6 strongest tech facts)*
- **Push:** `00a3b0d..cb592ee` → `origin/main`
- **Files (2):** New `src/data/marquee.ts`, refactored `src/components/sections/MarqueeBand.tsx`
- **Approach:** Trimmed tech facts 9 → 6 strongest verifiable claims (kept: on-device pose detection, 138 exercises, 30-day plan, turkish nutrition library, kvkk · gdpr ready; added: "8 pose analyzers" — concrete codebase-verifiable; dropped: vague/feature-detail items). Refactored to data-driven dual-mode: TECH (text strip, active) vs PRESS (grayscale-hover-to-color logos, dormant). `MARQUEE_PRESS_THRESHOLD = 3` gates promotion. Added soft gradient edge masks (boundaries fade vs hard-clip — premium polish). Dynamic `aria-label` swap per mode.
- **Validation:** Build clean, all 6 facts render, all 4 dropped facts absent, aria-label correct for tech mode, zero `/press/` image refs (mode correctly dormant), edge masks present.
- **Activation path:** Drop monochrome SVG logos in `public/press/`, append entries to `press[]` in `src/data/marquee.ts`. Mode auto-flips at length ≥ 3.

### ✅ PR 1.6 — Real user-count claim with caveat

- **Commit:** `ac38c9a` — *PR 1.6: real user-count claim with caveat (config-gated swap)*
- **Push:** `cb592ee..ac38c9a` → `origin/main`
- **Files (3):** New `src/components/sections/UserCountBadge.tsx` + `isUserCountReady()` helper, modified `src/lib/site.ts`, `src/components/sections/Hero.tsx`
- **Approach:** Reserves a hero slot for a "Beta · 1.247 erken kullanıcı" badge that **replaces** the static 3-up stats row when `userCount.value` is set AND meets `minDisplayCount` (default 100). Live pulse dot reinforces "real data", count is `tabular-nums` and tr-TR-formatted (1.247 not 1,247), date caption via `Intl.DateTimeFormat('tr-TR')`. Stage label drives caveat: "Beta" / "Launch" / "Production". `try/catch` around date parsing prevents malformed config from breaking the build.
- **Validation:** Build clean (home: 5.96 → 6.38 kB), stats row still visible today (all 3 stat values + labels render), UserCountBadge correctly invisible (0 hits for "erken kullanıcı", "Son ölçüm", stage labels), hero structural integrity preserved.
- **Activation path:** Fill `userCount.{value, capturedAt, stage}` in `src/lib/site.ts`. The hero swaps automatically.

---

## Aggregate validation

| Surface | Pre-Phase 1 | Post-Phase 1 |
|---|---|---|
| Trust slots structurally present | 0 | **6** (founder, testimonials, app rating, pricing strip, marquee press-ready, user count) |
| Trust slots active today | 0 | **3** (founder strip, pricing strip, marquee tech facts) |
| Trust slots awaiting real data | 0 | **3** (testimonials, app rating, user count — config-only activation) |
| Fabricated claims | 0 | **0** (preserved discipline across all six PRs) |
| Total routes | 15 | **15** (no new routes) |
| Shared First Load JS | 87.1 kB | **87.1 kB** (unchanged) |
| Home page weight | 4.22 kB | **6.38 kB** (+2.16 kB for 5 new components bundled even when null) |
| ESLint warnings/errors | 0 | 0 |
| `next build` status | clean | clean |
| Review items addressed | LB1-LB7 (Phase 0) | **W2 fully addressed**; founder/testimonials/ratings/money-back gaps all have structural solutions |
| Trust score (deep review baseline) | 4 / 10 | **~5 / 10 today, ~7 / 10 at full activation** |

---

## Phase 1 design pattern (preserve in future PRs)

Every Phase 1 sub-PR followed the same discipline. This pattern should be the default for any future work that involves trust signals, social proof, or claims about external state:

1. **Build the structural slot** (component + config + mount point).
2. **Refuse to fabricate** (no fake names, no stock photos, no inflated numbers, no invented quotes).
3. **Auto-activate via config** (single source of truth, no code changes when promoting).
4. **Hide gracefully** until real data crosses a credibility threshold (`minReviewCount: 100`, `MARQUEE_PRESS_THRESHOLD: 3`, `minDisplayCount: 100`, `consent: true`).
5. **Cross-link to verifiable evidence** (legal pages, store URLs, codebase facts).

The pattern doubles as a brand-defense layer — it's structurally impossible to ship a fake claim through this code, even by accident.

---

## Activation manual (for when real data lands)

Single canonical reference. Each activation is config-only; no code changes required.

### Founder strip (PR 1.1) — when you're ready to put your name on the work

Edit `src/lib/site.ts` → `team.founder`:

```ts
founder: {
  name: 'Your Name',                       // e.g. 'Emre Doğan'
  role: 'Kurucu · Geliştirici',
  photoSrc: '/images/founder.jpg',         // drop a ≥256×256 square photo here
  signatureLine: 'Short one-line quote.',  // optional
},
```

Optionally fill `team.contact.github` / `team.contact.twitter` with real URLs.

### Testimonials (PR 1.2) — when you have 3+ consented quotes

Edit `src/data/testimonials.ts`. For each entry:

```ts
{
  id: 'unique-slug',
  quote: 'Verbatim Turkish quote.',
  author: {
    name: 'Full Name or First Name + Initial',
    role: 'Optional role, City',
    photoSrc: '/images/testimonials/slug.webp',  // optional, square ≥256×256
  },
  outcome: {                                     // STRONGLY recommended
    label: 'Form skoru',                          // or 'Plank süresi', '7 günlük seri', etc.
    value: '72 → 91',                             // numbers > adjectives
    period: '21 günde',                           // optional
  },
  source: 'beta',
  capturedAt: '2026-06-15',
  consent: true,                                  // REQUIRED — must be true to render
},
```

### App-store rating (PR 1.3) — when you have ≥100 reviews on either store

Edit `src/lib/site.ts` → `ratings`:

```ts
appStore: {
  average: 4.7,
  count: 142,
  url: 'https://apps.apple.com/tr/app/formai/idXXXXXXXXX?see-all=reviews',
},
play: {
  average: 4.6,
  count: 187,
  url: 'https://play.google.com/store/apps/details?id=app.formai&showAllReviews=true',
},
```

Adjust `ratings.minReviewCount` if you want a different credibility threshold.

### Press strip (PR 1.5) — when you have 3+ media mentions

1. Drop monochrome SVG logos in `public/press/{slug}.svg`.
2. Edit `src/data/marquee.ts` → `press[]`:

```ts
{
  id: 'webrazzi-2026-05',
  name: 'Webrazzi',
  logoSrc: '/press/webrazzi.svg',
  url: 'https://webrazzi.com/2026/05/...',
  date: '2026-05-15',
},
```

Adjust `MARQUEE_PRESS_THRESHOLD` if you want to go live with fewer.

### User-count badge (PR 1.6) — when you have ≥100 verifiable users

Edit `src/lib/site.ts` → `userCount`:

```ts
userCount: {
  value: 1247,                  // real, verifiable number
  capturedAt: '2026-06-01',     // ISO date measured
  stage: 'beta',                // 'beta' | 'launch' | 'production'
  minDisplayCount: 100,
},
```

The hero stats row auto-replaces.

---

## Commits in this phase

```
7f4baa4  PR 1.1: founder / human trust strip (truthful anonymous-craft)
5f4d31d  PR 1.2: testimonial section (truthful + upgrade-ready)
df45776  PR 1.3: app-store rating badge (gated by real data)
00a3b0d  PR 1.4: pricing trust strip (3 verifiable promises)
cb592ee  PR 1.5: marquee press-mode ready (6 strongest tech facts)
ac38c9a  PR 1.6: real user-count claim with caveat (config-gated swap)
```

All six pushed to `origin/main`. No reverts, no rebase, linear history.

---

## Unresolved items

### Closed in Phase 1 — but compounding when real data lands

1. **Trust score is ~5/10 today, ~7/10 at full activation.** Three of the six slots only show their full trust value once you populate real data (founder identity, testimonials, ratings, user count). Even pre-activation, the structural commitments + visible founder-craft strip + pricing trust strip materially move the needle.
2. **No real-device verification** of Phase 1 surfaces. The deep-review check from Phase 0 (PR 0.5) still pending — these surfaces will need visual QA when you run that pass.

### Out of Phase 1 scope — routed forward

| Item | Routed to |
|---|---|
| Hero subject (CG robot vs real product) | Phase 2, PR 2.1 |
| Generic CTA copy ("Programını oluştur") | Phase 2, PR 2.2 |
| Mobile hero rearrangement | Phase 2, PR 2.3 |
| Showcase repetition on home page | Phase 3, PR 3.2 |
| Mono / GlowOrb diet | Phase 3, PR 3.1 |
| Hero PNG payload (5.7 MB unoptimized) | Phase 4, PR 4.1 |
| Framer Motion diet | Phase 4, PR 4.3 |
| JSON-LD structured data | Phase 5, PR 5.1 |
| Sentry / Vercel Analytics (consent-gated) | Phases 4-5, PRs 4.5 + 5.4 |
| Signature interactions (skeleton-on-hover, etc.) | Phase 6 |
| Press kit page (`/press`) | Phase 5, PR 5.5 |

### Operator-side decisions still pending

- **LB5 from Phase 0** — "10.000+ kişi kullanıyor" implied by the in-app paywall screenshot. **PR 1.6 ships the truthful alternative** (Beta badge with real number). Once `site.userCount` is populated, the website carries an honest count that supersedes the screenshot implication; until then, decide whether to swap the paywall screenshot for one without the user-count claim.
- **PR 1.1 promotion** — when you're ready to put your name + photo on the founder strip. Pure config edit. Strongly recommended for the next trust delta.

---

## Next phase

**Phase 2 — Hero + Identity.** Per the masterplan, this is the **next-highest leverage** phase after trust. Four sub-PRs:

1. **PR 2.1 — Replace hero subject** (the single most impactful visual change on the entire site — swap the CG robot for real product proof).
2. **PR 2.2 — Headline rewrite** (move from "Sahaya çıkan yapay zekâ fitness koçun" to a 1-step parse).
3. **PR 2.3 — Mobile hero rearrangement** (the floating HUD callouts currently `hidden lg:block` — mobile gets a degraded hero today).
4. **PR 2.4 — Logo evolution** (long-term, ship after broader brand review).

Suggested start: **PR 2.1** — the single most consequential decision on the site after the trust layer.
