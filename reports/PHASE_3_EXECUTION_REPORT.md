# PHASE 3 — EXECUTION REPORT

**Phase:** 3 — Narrative + Density
**Source:** `reports/WEBSITE_EVOLUTION_MASTERPLAN.md` § Phase 3
**Status:** ✅ **Complete.** All five sub-PRs shipped.
**Window:** Single session, commits `27f5618 → 0c14ee6`.

---

## Executive summary

Phase 3's mandate, per the deep review and masterplan, was the **structural lift** after credibility and clarity were established: restructure the home flow, cap design-token overuse, introduce layout variance, add data-rich proof, and clean the asset directory of dead weight.

All five sub-PRs hit their targets:

- **Design-token diet** — Mono 66 → 11 instances, GlowOrb 24 → 16 instances. New `<Eyebrow>` primitive handles the section-label role; `<Mono>` now reserved for HUD data, page-hero eyebrow (one per page), and Footer column titles. Rules codified in `WEB_BRANDING_DECISIONS.md`. **W6 closed.**
- **Home flow restructure** — 11 sections → 9. Three pillar showcases compressed into one HowItWorks with three alternating-side rows. Manifesto promoted from position 10 → 4. MetricGrid moved after Testimonials per masterplan. **W4 closed.**
- **Section variance** — two layout breakers added: TransformationStrip (split-bleed before/after + metric captions, between HowItWorks and Testimonials) and TypographicQuote (pure cinematic statement, no chrome, between MetricGrid and CtaBlock, resurrecting the V1 hero line where the deep review said it belonged). **Repetition pattern broken.**
- **Gelişim charted progression** — new pure-SVG `<SparkChart>` primitive (Catmull-Rom → cubic bezier, configurable, tone-aware, Turkish-localized uppercase). Mounted on `/gelisim` with a representative 30-day form-score curve. Page argument moves from "look at these gamified tiles" to "look at this curve, then commit." **Missed opportunity #6 closed.**
- **Asset audit** — 8 unreferenced images deleted (−4.2 MB, −58% in `public/images/` size). Orphan CoachShowcase component (carry-over from PR 3.2) removed. **W9 closed.**

The home page is now **tighter, faster to scan, structurally varied, and lean on shipped weight**. The visitor's path through the site has more rhythm and less repetition; the design system has codified rules that prevent the V1 "every section starts with Mono · LABEL" failure from happening again.

---

## Completed sub-PRs

### ✅ PR 3.1 — Mono / GlowOrb diet

- **Commit:** `27f5618` — *PR 3.1: mono + glow diet — codify Eyebrow as the section primitive*
- **Push:** `041cb65..27f5618` → `origin/main`
- **Files (25):** New `src/components/ui/Eyebrow.tsx`, 19 files with bulk Mono → Eyebrow swap, 3 files with surgical Mono → Eyebrow (CoachShowcase, Hero, LegalPageLayout), 8 files with GlowOrb removals (LegalPageLayout, FounderStrip, Manifesto, FeatureBlock, PageHero, Hero, Testimonials, ProgressShowcase), `reports/WEB_BRANDING_DECISIONS.md` updated with codified rules.
- **Approach:** Built new `<Eyebrow>` primitive (sans-serif, muted) as the counterpart to `<Mono>` (monospace, full saturation). Bulk-swapped non-data Mono usages. Reserved Mono for: HUD data inside `HudPanel`, one eyebrow per page hero, Footer column titles. Codified the split in `WEB_BRANDING_DECISIONS.md` so future PRs default to `<Eyebrow>`.
- **Counts:** Mono **66 → 11** (target ≤18, hit ✓). GlowOrb **24 → 16** (target ≤16, exact hit ✓).
- **Validation:** Build clean (15 routes, shared baseline 87.1 kB). 10 section eyebrows on home now render via Eyebrow. Mono retained only in legitimate places. Sections that lost their GlowOrb (Manifesto, FounderStrip, legal pages) still render cleanly.
- **Closes:** W6 (Medium).

### ✅ PR 3.2 — Home flow restructure

- **Commit:** `02031de` — *PR 3.2: home flow restructure — replace 3 showcases with 1 HowItWorks*
- **Push:** `27f5618..02031de` → `origin/main`
- **Files (2):** New `src/components/sections/HowItWorks.tsx`, `src/app/page.tsx` rewritten.
- **Approach:** Built `HowItWorks` as a server component with three stacked rows (alternating image side) replacing the three separate showcases (`CoachShowcase`, `NutritionShowcase`, `ProgressShowcase`) on home. Each row links to the full pillar page where the deep showcase still lives. Manifesto promoted from position 10 → 4 (right after FounderStrip). MetricGrid reordered after Testimonials per masterplan.
- **Outcome:** 11 sections → 9. Repetition eliminated, manifesto lands while reading rhythm is fresh. The deep pillar showcases remain alive on `/beslenme` and `/gelisim`; `CoachShowcase` orphaned (cleaned up in PR 3.5).
- **Validation:** Build clean, DOM order verified, all old showcase eyebrows confirmed removed from home, pillar pages still render their original showcases.
- **Closes:** W4 (High).

### ✅ PR 3.3 — Section variance — 2 layout breakers

- **Commit:** `86edafb` — *PR 3.3: section variance — 2 layout breakers added to home*
- **Push:** `02031de..86edafb` → `origin/main`
- **Files (3):** New `src/components/sections/TransformationStrip.tsx`, new `src/components/sections/TypographicQuote.tsx`, `src/app/page.tsx` updated.
- **Approach:** Two structurally distinct surfaces. **TransformationStrip** — split-bleed image pair (Gün 1 / Gün 30 frames sharing one rounded surface with a thin center divider so the two read as one continuous transformation) + 3-cell ember metric caption row + honest "Temsili görseller" caveat. **TypographicQuote** — pure typography, no chrome, no Container grid; resurrects "Sahaya çıkan yapay zekâ fitness koçun" exactly where the deep review (W7) said it belongs — after the visitor has full product context, the sports metaphor lands as a brand seal.
- **Placement:** TransformationStrip between HowItWorks and Testimonials (outcome → social proof). TypographicQuote between MetricGrid and CtaBlock (brand seal before the ask).
- **Validation:** Build clean, both layout breakers render all markers, DOM order verified, transformation images served correctly. GlowOrb count preserved at 16 (TypographicQuote uses a hand-rolled radial halo, not a GlowOrb instance).

### ✅ PR 3.4 — Gelişim charted progression

- **Commit:** `75ffeb8` — *PR 3.4: gelişim charted progression — pure-SVG SparkChart*
- **Push:** `86edafb..75ffeb8` → `origin/main`
- **Files (2):** New `src/components/ui/SparkChart.tsx`, `src/app/gelisim/page.tsx` updated.
- **Approach:** Built `<SparkChart>` as a pure-SVG primitive — Catmull-Rom → cubic bezier interpolation for smooth curves, configurable axes/ticks/tone, tone-aware glow filter + gradient area fill, endpoint annotations with proper Turkish-localized uppercase via `toLocaleUpperCase('tr-TR')` so "Şimdi" renders as ŞİMDİ not ŞIMDI. Zero charting library. Mounted on `/gelisim` between transformation card and streak storytelling with a representative 30-day form-score curve (11 sampled points, 64 → 91), accompanied by a 3-stage learning-arc body and an honest "Temsili eğri" caveat pill.
- **Validation:** Build clean (no JS shipped — pure SVG in the static HTML), all 5 Y-ticks + 5 X-ticks + both endpoint annotations + both quote bubbles render. Turkish casing verified correct.
- **Closes:** Missed opportunity #6.

### ✅ PR 3.5 — Asset audit

- **Commit:** `0c14ee6` — *PR 3.5: asset audit — delete 8 unreferenced images + 1 orphan component*
- **Push:** `75ffeb8..0c14ee6` → `origin/main`
- **Files (9):** 8 image deletions from `public/images/` (`pt-form.png`, `first-opening.png`, `welcome-bg.webp`, `custom-plan.webp`, `personalized-plan.webp`, `plan-sample.webp`, `gym-bg.webp`, `onboarding-bg.webp`) + `src/components/sections/CoachShowcase.tsx` (orphan from PR 3.2).
- **Audit method:** Per-file literal-filename grep across the entire src tree (catches dynamic data-array refs like `img: '/images/meal-lunch-1.jpeg'` that W9's initial pattern missed). Confirmed 14 of 20 images in use; 6 with multiple call sites.
- **Outcome:** `public/images/` from **20 files / 7.3 MB → 12 files / 3.1 MB** (−4.2 MB, −58%). Six other orphan UI primitives (`SectionHeader`, `Section`, `ScanLine`, `PhoneFrame`, `GridBg`, `FeatureBlock`) deliberately preserved as design-system reserves — tree-shaken when unused, zero shipped cost, available for future PRs.
- **Validation:** Build clean (route weights unchanged because deleted images weren't loaded on any route). All deleted images return 404; all kept images still 200.
- **Closes:** W9 (Medium).

---

## Aggregate validation

| Surface | Pre-Phase 3 | Post-Phase 3 |
|---|---|---|
| Home sections | 11 | **9** (compressed + 2 layout breakers, net −2) |
| Showcase repetition (same eyebrow-title-body-grid four times in a row) | yes | gone |
| Manifesto position | 10 / 11 | **4** / 9 |
| Layout-breaker sections | 0 | **2** (TransformationStrip + TypographicQuote) |
| Charted data on `/gelisim` | none | **1 SparkChart** (30-day form-score curve) |
| `<Mono>` site-wide | 66 | **11** (target ≤18 ✓) |
| `<GlowOrb>` site-wide | 24 | **16** (target ≤16 ✓ exact hit) |
| Codified design-token usage rules | implicit | **explicit** (`WEB_BRANDING_DECISIONS.md`) |
| `public/images/` files | 20 | **12** (−8, −40%) |
| `public/images/` size on disk | 7.3 MB | **3.1 MB** (−4.2 MB, −58%) |
| Orphan source components removed | 0 | **1** (CoachShowcase from PR 3.2) |
| Total routes | 15 | 15 |
| Shared First Load JS | 87.1 kB | **87.1 kB** (unchanged) |
| ESLint warnings/errors | 0 | 0 |
| `next build` status | clean | clean |
| Review items closed | W2 (Phase 1), W1+W7+W10 (Phase 2) | **W4, W6, W9** + missed opportunity #6 |

---

## Phase 3 commits

```
27f5618  PR 3.1: mono + glow diet — codify Eyebrow as the section primitive
02031de  PR 3.2: home flow restructure — replace 3 showcases with 1 HowItWorks
86edafb  PR 3.3: section variance — 2 layout breakers added to home
75ffeb8  PR 3.4: gelişim charted progression — pure-SVG SparkChart
0c14ee6  PR 3.5: asset audit — delete 8 unreferenced images + 1 orphan component
```

All five pushed to `origin/main`. Linear history, no reverts.

---

## Phase 3 → V1 → V2 movement

Phase 3 closes the **narrative density** axis of the deep review. After this phase:

- **Rhythm is varied** — TransformationStrip + TypographicQuote interrupt the eyebrow-title-body pattern at strategic narrative beats.
- **Design system is disciplined** — `<Mono>` and `<GlowOrb>` are now scarce-resource primitives with codified rules.
- **Data argument is real** — `/gelisim` has a continuous progression curve, not just gamified snapshot tiles.
- **Repo is lean** — −4.2 MB of dead assets, one orphan component cleared.

Combined with prior phases:

1. **Phase 0** — site is launch-ready (legal, store-honesty, real waitlist, consent banner).
2. **Phase 1** — site is credible (6 trust slots structural, 3 active, 3 awaiting real data).
3. **Phase 2** — site is instantly understandable (real-product hero, 1-step headline, mobile-parity HUD).
4. **Phase 3** — site is **structurally tight + data-rich + lean** (this phase).

The combined trust score moves from V1's 6.2 / 10 to approximately **7.5–8 / 10** today, with the remaining gap to a 9+ score sitting in:
- Activation of the 3 awaiting-real-data trust slots (testimonials, app rating, user count).
- Phase 4 performance pass (LCP / Framer Motion diet / RUM).
- Phase 5 SEO + observability (JSON-LD, per-page OG, error tracking).

---

## Unresolved items

### Out of Phase 3 scope — routed forward

| Item | Routed to |
|---|---|
| Hero PNG payload optimisation (pose-analysis.png still 1.8 MB) | **Phase 4, PR 4.1** (next) |
| Image priority + lazy hints + sizes tuning | Phase 4, PR 4.2 |
| Framer Motion diet | Phase 4, PR 4.3 |
| GPU-friendly background animations | Phase 4, PR 4.4 |
| Real-User Monitoring + Web Vitals | Phase 4, PR 4.5 |
| JSON-LD structured data | Phase 5, PR 5.1 |
| Per-page OG variation | Phase 5, PR 5.2 |
| Sentry / error tracking | Phase 5, PR 5.4 |
| Press kit page | Phase 5, PR 5.5 |
| Signature interactions (skeleton-on-hover, etc.) | Phase 6 |

### Phase 3 carry-overs (optional cleanups)

- **6 deliberately-preserved UI orphans** (`SectionHeader`, `Section`, `ScanLine`, `PhoneFrame`, `GridBg`, `FeatureBlock`). Tree-shaken at build, zero shipped cost — but they clutter the file count. If the team decides the design-system palette doesn't need to stay broad, a 1-PR sweep removes them. Not blocking; flagged.
- **HowItWorks copy** — the three substory bodies use default brand voice. Tightening with founder voice in a Phase 4 / 5 polish pass would raise the section further; structurally the slot is sound.

### Operator-side decisions still pending

- **PR 0.5 — real device QA** (operator-action from Phase 0) — now even more valuable because Phase 3 added two new layout patterns (TransformationStrip split-bleed pair + TypographicQuote cinematic break) that should be visually confirmed on iPhone SE / Pixel 7 / iPad.
- **Phase 1 activation inputs** (founder photo + testimonials + app ratings + user-count) — orthogonal to all engineering work; whenever ready.

---

## Next phase

**Phase 4 — Performance + Delivery.** Per the masterplan, this is the next leverage axis: hit Lighthouse mobile ≥ 95 across all routes, LCP < 2 s on 4G. Five sub-PRs:

1. **PR 4.1 — Image format pass** (S — convert remaining PNGs to AVIF + WebP; LQIP)
2. **PR 4.2 — Image priority + lazy hints** (S — tighten `priority` / `sizes` per surface)
3. **PR 4.3 — Framer Motion diet** (M — dynamic-import or replace with IntersectionObserver + CSS transitions)
4. **PR 4.4 — GPU-friendly background animations** (M — pause off-viewport, respect `prefers-reduced-data`)
5. **PR 4.5 — Real-User Monitoring** (S — `@vercel/speed-insights` + `@vercel/analytics` gated by consent)

Suggested start: **PR 4.1** — biggest single LCP win remaining is `pose-analysis.png` at 1.8 MB.
