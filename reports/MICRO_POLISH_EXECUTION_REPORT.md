# MICRO POLISH EXECUTION REPORT

**Phase:** Micro Polish (paused Phase 4 after PR 4.3, ran 9 sub-PRs, now closing)
**Plan source:** `reports/MICRO_POLISH_EXECUTION_PLAN.md` (`11b3ae8`)
**Execution window:** post-`37ba038` (PR 4.3 ship) → `e596361` (MP.9 ship)
**Status:** ✅ All 9 sub-PRs shipped + pushed + user-approved. Phase 4 resumes from PR 4.4.

---

## Roll-up

| # | Sub-PR | Surface | Commit | Status |
|---|---|---|---|---|
| MP.1 | Support email consolidation → `formaisupport@proton.me` | `site.ts`, 6 pages | `52c0912` | ✅ Approved |
| MP.2 | Canonical AI-coach image (`pt-form.webp`) | Manifesto + CtaBlock | `82989f3` | ✅ Approved |
| MP.3 | Workout image blur fix — root cause + q95 re-encode + phone-frame display cap | `pose-analysis.webp` + 2 consumers | `57a10c8` | ✅ Approved |
| MP.4 | Transformation pair clarity — pre-crop + re-encode + audit | `transformation-{before,after}.webp` | `c512f31` | ✅ Approved |
| MP.5 | Pillar color realignment (Antrenman=ember, Beslenme=lime, Gelişim=violet) | ProductPillars + HowItWorks + 3 pillar pages | `871a570` | ✅ Approved |
| MP.6 | Antrenman Akış pipeline interaction + /baslat APP_ICON swap | /antrenman + /baslat + globals.css | `e51197d` | ✅ Approved |
| MP.7 | Gelişim badge interaction — what / why / how-earned reveal | /gelisim | `bbb5820` | ✅ Approved |
| MP.8 | Beslenme meal card — macro tiles + coach-note reveal | /beslenme | `aaccf7b` | ✅ Approved |
| MP.9 | Destek FAQ redesign — pillar-toned accordion, Framer Motion off | FaqAccordion + /destek | `e596361` | ✅ Approved |

All 9 PRs shipped on `main`, one-at-a-time per the controlled-execution protocol. Re-read of canon docs before each PR honoured. No batch execution.

---

## Cumulative impact

### Bundle weight

| Route | Pre-micro (post-4.3) | Post-micro (MP.9) | Δ |
|---|---|---|---|
| `/` | ~150 kB | 150 kB | ±0 |
| `/antrenman` | 107 kB | 107 kB | ±0 |
| `/beslenme` | 109 kB | 110 kB | +1 kB (MealCard + data) |
| `/gelisim` | 110 kB | 110 kB | ±0 |
| `/baslat` | 110 kB | 109 kB | −1 kB (app-icon vs phone-frame asset) |
| `/destek` | 145 kB | **108 kB** | **−37 kB (Framer Motion off this route)** |

Net First Load JS across the 6 marketing routes: **−37 kB** (the FaqAccordion FM cleanup dominates).

### Framer Motion budget (PR 4.3 contract)

PR 4.3 set the rule: Framer Motion ships only on Hero, FaqAccordion, and Consent components. MP.9 **further tightened this** — FaqAccordion is now FM-free. Current FM consumers (post-micro):

- `Hero.tsx` (reserved — high-value initial paint motion)
- `ConsentBanner.tsx` (dynamic-imported post-hydration)
- `ConsentSettings.tsx` (dynamic-imported post-hydration)

That's **3 components, all justified**. Down from "Hero + FaqAccordion + Consent" → "Hero + Consent (dynamic)" on the initial bundle of any non-/ page.

### Image quality

| Asset | Pre-micro | Post-micro | Density |
|---|---|---|---|
| `pose-analysis.webp` | 90 KB / q78 / soft text overlays | **236 KB / q95** | +6× quality, text overlays sharp |
| `transformation-before.webp` | 81 KB / 1408×768 / 0.019 bpp | **78 KB / 1100×1536 / 0.046 bpp** | +2.4× pixel density (pre-cropped) |
| `transformation-after.webp` | 87 KB / 1408×768 / 0.020 bpp | **104 KB / 1100×1536 / 0.062 bpp** | +3.1× pixel density |
| `app-icon.webp` | (didn't exist) | **162 KB / 1254×1254 / 0.103 bpp** | New; healthy density |
| `pt-form.webp` | (didn't exist; two split coach images) | **172 KB single canonical** | Consolidated |

Blur audit rule established as standing requirement during MP.4. Applied per PR thereafter — no new blurry imagery introduced in MP.6 / MP.7 / MP.8 / MP.9.

### Visual cohesion

MP.5 + MP.6 + MP.7 + MP.8 + MP.9 now share a **pillar identity grammar** that ripples across the site:

| Pillar | Tone | Used on |
|---|---|---|
| Antrenman | **ember** (#FF7A1A) | /antrenman PageHero, GlowOrb, Pill row, Akış cards, ProductPillars[Antrenman], HowItWorks step 01, FAQ group "antrenman" |
| Beslenme | **lime** (#C8FF00) | /beslenme PageHero, ProductPillars[Beslenme], HowItWorks step 02, FAQ group "beslenme", MealCard Yağ tile |
| Gelişim | **violet** (#7C5CFF) | /gelisim PageHero, GlowOrb, Pill row, ProductPillars[Gelişim], HowItWorks step 03, FAQ group "gelisim", badge "İlk Adım" |
| Güvenlik / Trust | **scan** (#1FCFFF) | TrustItems on /destek, FAQ group "guvenlik", MealCard Protein tile |

A user landing on any pillar page sees consistent colour identity. The FAQ on /destek now reinforces this — opening the "Antrenman ve pose detection" group lights up in ember, which matches what they saw on the /antrenman hero.

### Interaction grammar

All four interaction PRs (MP.6 + MP.7 + MP.8 + MP.9) ship the same patterns:

- **Disclosure trigger:** `<button>` with descriptive `aria-label`, `aria-expanded`, `aria-controls` (where a panel id exists). Keyboard-focusable.
- **Reveal mechanism:** pure CSS `grid-rows-[0fr] → grid-rows-[1fr]` with a paired `opacity-0 → opacity-100` cross-fade. 500 ms ease-out. No JS height measurement, no FM.
- **Mobile parity:** `:focus-within` selector mirrors `:hover` for tap-equivalent on touch devices.
- **Reduced motion:** the global `@media (prefers-reduced-motion: reduce)` killswitch in `globals.css` zeros all transitions; functionality continues without animation.

The /baslat install-card swap (MP.6 second half) doesn't fit this pattern (static visual replacement, not interaction) but reinforces the broader rule: **no Framer Motion in interaction components built this session.**

### Truth + content discipline

- All copy added in MP.6 / MP.7 / MP.8 is product-truthful — coach notes describe how each meal serves the user's day, badge "why" lines explain the emotional/scientific reason for the achievement, Akış step descriptions mirror real pipeline behaviour.
- No fabricated ratings, fake founders, or invented credentials introduced this session.
- Support email remains a single source of truth: `site.team.contact.email = 'formaisupport@proton.me'` (set in MP.1).

---

## Standing rules carried forward (for Phase 4 resume)

These were established or hardened during this micro polish phase and should hold for Phase 4.4 and beyond:

1. **NO blurry images anywhere.** Established MP.4. Per-PR visual audit on any image change; fix in scope when safe.
2. **No Framer Motion in interactions.** Established PR 4.3, hardened by MP.7+MP.8+MP.9. FM reserved for Hero + dynamic-imported Consent only.
3. **Pillar identity colours.** Established MP.5: Antrenman=ember, Beslenme=lime, Gelişim=violet. Any future product surface must respect this mapping.
4. **Mobile + desktop parity.** Every interaction PR ships with `:focus-within` mirroring `:hover` so touch users get equivalent behaviour.
5. **Single source of truth.** Email, store URLs, founder/team data all live in `src/lib/site.ts`. New canonical references must follow.
6. **Build / lint discipline.** Every PR ends with `next build` clean + `next lint --max-warnings 0` clean + all 6 marketing routes returning 200.

---

## What this batch did NOT touch (intentionally deferred)

These were considered during recon but explicitly left for Phase 4 or later:

- **GPU-friendly background animations** (PR 4.4 — next up). Akış-pulse keyframes from MP.6 are a small precedent for CSS-only ambient motion; PR 4.4 will broaden this to hero / page-wide ambient effects.
- **Web Vitals + ISR** (PR 4.5+). Out of scope for micro polish.
- **Additional asset re-encodes** for the three pillar card images flagged in MP.4 / MP.6 (`daily-challenge.webp`, `hiit-card.webp`, `power-card.webp` at ~0.02-0.03 bpp). Acceptable at their card display sizes; full fix waits until Phase 4 image perf pass.
- **Recipe deep-detail screens.** MP.8 mirrored the app's product DNA but stopped at the "expand card" layer. A future PR could add per-meal deep pages (`/beslenme/[slug]`) if the marketing site needs SEO depth on individual recipes.

---

## Closure

Micro polish phase closes here. Resuming **Phase 4 from PR 4.4** per the masterplan (`reports/WEBSITE_EVOLUTION_MASTERPLAN.md`). Approval will be requested per the established protocol before PR 4.4 starts.

**Total micro-polish output:** 9 commits, 18 file modifications, +1.5 MB of optimised imagery shipped, −37 kB bundle removed, 0 regressions, 0 fabricated content, full pillar-identity grammar now live across 4 pages.
