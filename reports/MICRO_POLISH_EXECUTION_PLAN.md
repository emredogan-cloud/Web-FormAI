# MICRO POLISH EXECUTION PLAN

**Mode:** Pause Phase 4 (4.3 shipped at `37ba038`). Open a targeted UX/visual/interaction polish batch.
**Source of truth:** 9 polish requests received this session.
**Protocol:** Same as phase work — one sub-PR at a time, re-read the canon docs before each, validate + commit + push + stop + await approval.
**Discipline guards:** dark neon, premium feel, zero regression, mobile-first, no overdesign.

---

## Executive summary

The 9 requests cluster into four tiers:

1. **Ground-truth fixes** (2 PRs) — single canonical coach image + single support email. Pure replacement work, no UI risk. Quick wins that lock the foundation before deeper polish lands on top.
2. **Image quality fixes** (2 PRs) — two reported blur problems (workout image, transformation pair). Root-cause first, then re-encode or re-source.
3. **Visual polish** (1 PR) — semantic color re-mapping on ProductPillars + HowItWorks for cohesion.
4. **Interaction polish** (4 PRs) — Antrenman Akış cards, Gelişim badges, Nutrition detail, Support FAQ. Increasing complexity.

Sequence is **risk-ascending**: text → assets → color → interaction → redesign. Each PR is self-contained; only MP.5 has a soft dependency on MP.2 (color choice for the coach panel surface).

**Total scope:** 9 sub-PRs, ~6–10 hours of focused work end-to-end. No single PR larger than M effort.

---

## Reconnaissance findings (informs sequencing)

| Surface | Current state | Implication |
|---|---|---|
| Coach imagery in use | `coach-portrait.webp` (Manifesto) + `coach-hero.webp` (CtaBlock default). `pt-form.png` was deleted in PR 3.5. | MP.2 must re-add the file from `FormAI-FitnessKoçu/photos/PT_FORM.png` (2.0 MB source still on disk) and swap 2 references. |
| Support email refs | `destek@formai.app` (1×), `kvkk@formai.app` (1×), `support@formai.app` (10+ across `site.ts`, `LegalPageLayout`, `gizlilik`, `sartlar`, `kvkk`, `destek`) | MP.1 consolidates to `formaisupport@proton.me`. Single source in `site.ts.team.contact.email`. |
| ProductPillars current tones | Antrenman=`violet`, Beslenme=`lime`, Gelişim=`ember` | User's semantic mapping suggests Antrenman→`ember` (energy), Beslenme→`lime` (vitality, already correct), Gelişim→`violet` (growth). MP.5 re-maps Antrenman ↔ Gelişim and must also touch HowItWorks (same 3-tone system) to preserve cohesion. |
| Workout image (`pose-analysis.webp`) | 90 KB at q78 from PR 4.1 source PNG. | Likely root cause of the reported blur: q78 + text overlays in source = softened edges. MP.3 fix: re-encode at q90+ or use lossless WebP. |
| Transformation pair | 80–90 KB webp; source files in FormAI app are similar size (low-res originals). | MP.4 fix: re-encode at higher quality if the source has more pixels, OR document the limit and pick a different alternative from the FormAI photo library. |
| Antrenman Akış 4 cards | Static 4-up grid (`Kamera açılır → İskelet kalibre olur → AI koç konuşur → Veri saklanır`) with basic hover border-color change. | MP.6 adds connected progression motion + step depth. |
| Gelişim 6 badges | Static cards; criteria visible only as second-line text. | MP.7 adds hover-reveal: "why" + "how earned" details. |
| Nutrition cards (`/beslenme`) | Scroll-staggered meal grid + meal pills inside NutritionShowcase. No click-to-expand interaction. | MP.8 mirrors real FormAI app's nutrition detail pattern (which I'll inspect from the source app codebase). |
| Support FAQ (`FaqAccordion`) | Functional accordion with numbered chevron, but visually generic. | MP.9 redesigns for premium without breaking the accordion semantic. |

---

## Proposed sequence

### MP.1 — Support email consolidation

> **Maps to:** request #8
> **Why first:** zero UI risk, builds confidence, single source-of-truth migration unlocks MP.9 from a clean state.

- **Goal:** every support CTA on the site references `formaisupport@proton.me`. Single source in `site.ts.team.contact.email`.
- **Touches:** `src/lib/site.ts`, `src/components/sections/LegalPageLayout.tsx` (default prop), `src/app/destek/page.tsx` (2 channel cards), `src/app/gizlilik/page.tsx` (3 inline anchors), `src/app/sartlar/page.tsx` (1 anchor), `src/app/kvkk/page.tsx` (1 anchor).
- **Dependencies:** none.
- **Risk:** very low. Pure text. Visual identical.
- **Scope:** S (~30 min).
- **Validation:** grep audit for any remaining `@formai.app` email reference; build + lint clean; 9 routes return 200.

### MP.2 — Canonical AI-coach image (PT_FORM.png)

> **Maps to:** request #1
> **Why second:** locks the brand visual before MP.5 (color) and downstream interaction PRs that touch coach-adjacent surfaces.

- **Goal:** `pt-form.png` becomes the single canonical AI-coach visual. All other coach imagery is either replaced or removed.
- **Action plan:**
  1. Copy `FormAI-FitnessKoçu/photos/PT_FORM.png` (2.0 MB) into `public/images/pt-form.png`.
  2. Add an `optimize-images` JOBS row to convert it to `pt-form.webp` at high quality (q86 — text legibility matters).
  3. Replace `coach-portrait.webp` reference in `Manifesto.tsx` with the new pt-form.webp.
  4. Replace `coach-hero.webp` reference in `CtaBlock.tsx` default with the new pt-form.webp.
  5. Decide fate of the now-unreferenced `coach-portrait.webp` + `coach-hero.webp` (delete in same PR or flag for the next asset audit).
- **Touches:** `public/images/`, `scripts/optimize-images.mjs`, `src/components/sections/Manifesto.tsx`, `src/components/sections/CtaBlock.tsx`.
- **Dependencies:** none (asset is on disk).
- **Risk:** low–medium. The audit step must catch every coach reference. Comment lines like `Replaces the prior CG robot (pt-form.png)` in Hero.tsx are documentation, not visuals — leave or update to reflect the new canonical role.
- **Scope:** S–M (~45 min).
- **Validation:** grep for any other `coach-*` image refs; visually confirm Manifesto + CtaBlock surfaces still hold rhythm with the new image; build + lint clean.

### MP.3 — Workout image blur fix (`pose-analysis.webp`)

> **Maps to:** request #3
> **Why third:** high user-visible value, low risk, self-contained.

- **Goal:** diagnose and fix the blur reported on the Antrenman live-readout panel image.
- **Hypothesis (to verify, not assume):** PR 4.1 re-encoded the original PNG to WebP at quality 78. The original has rendered text overlays (`ML Pose · live`, joint labels) that soften at lossy q78. The fix is most likely a higher-quality re-encode.
- **Action plan:**
  1. Inspect original `FormAI-FitnessKoçu/photos/...` source files for higher-res or lossless alternatives.
  2. Try re-encoding at q90 (or lossless WebP if size is tolerable). Update `scripts/optimize-images.mjs` JOBS row accordingly.
  3. If source itself is low-res, document the ceiling.
- **Touches:** `public/images/pose-analysis.webp`, `scripts/optimize-images.mjs`.
- **Dependencies:** none.
- **Risk:** low. Pure asset swap; same path/extension.
- **Scope:** S (~30 min).
- **Validation:** screenshot the section in dev server; confirm text overlays are legible; build + lint clean; sizes still reasonable (<200 KB target).

### MP.4 — Progress transformation clarity

> **Maps to:** request #6
> **Why fourth:** same diagnosis pattern as MP.3 (image quality). Group near MP.3 to share inspection mindset.

- **Goal:** before/after frames on `/gelisim` no longer read blurry.
- **Hypothesis (to verify):** source webp files from the FormAI app are themselves low-res (~80–90 KB). The website ships them at full size. Fix may require a different higher-res source from the FormAI app's `photos/` directory OR a graceful larger frame to mask the softness (typography + gradient overlay).
- **Action plan:**
  1. Audit `FormAI-FitnessKoçu/photos/` for higher-res transformation alternatives (e.g. `kişiselleştirilmiş*` files at different sizes).
  2. If a better source exists, copy + re-encode.
  3. If not, raise the design treatment: smaller display size, stronger gradient overlay, or replace with a different but-still-truthful asset (e.g., custom-plan rendering, daily-challenge frame).
- **Touches:** `public/images/transformation-before.webp`, `public/images/transformation-after.webp`, possibly `TransformationStrip.tsx` (treatment).
- **Dependencies:** none.
- **Risk:** low. Asset-level change.
- **Scope:** S (~30 min).
- **Validation:** visual confirm at section width on desktop + mobile.

### MP.5 — ProductPillars + HowItWorks color realignment

> **Maps to:** request #2
> **Why fifth:** pure visual polish; depends on MP.2 only because both touch brand-visual identity (sequencing keeps brand decisions in one mental batch).

- **Goal:** semantic color identities that align with product meaning.
  - **Antrenman** → `ember` (energy / workout / heat)
  - **Beslenme** → `lime` (vitality / freshness — already correct)
  - **Gelişim** → `violet` (growth / continuity / the brand primary)
- **Action plan:**
  1. Edit `ProductPillars.tsx`: swap Antrenman tone violet → ember, Gelişim tone ember → violet.
  2. Edit `HowItWorks.tsx`: same swap on the 3 steps for cohesion (currently violet/lime/ember, target ember/lime/violet).
  3. Audit other surfaces that pair pillar + tone (e.g., Antrenman page Pill colors, Beslenme page tones, Gelişim badges).
- **Touches:** `src/components/sections/ProductPillars.tsx`, `src/components/sections/HowItWorks.tsx`. Possibly `src/app/antrenman/page.tsx`, `src/app/gelisim/page.tsx` if Pill tones need realignment for cohesion.
- **Dependencies:** soft on MP.2 (lands after brand visual settles).
- **Risk:** low–medium. Must scan for tone consistency. Two-tone swap, not three-tone change.
- **Scope:** S–M (~45 min).
- **Validation:** visual sweep of home (ProductPillars + HowItWorks) + Antrenman + Gelişim; build + lint clean.

### MP.6 — Antrenman "Akış" 4-card interaction

> **Maps to:** request #4
> **Why sixth:** first interaction-polish PR; self-contained surface; sets the interaction-quality bar for MP.7 and MP.8.

- **Goal:** the 4-step Akış grid feels alive and sequenced, not 4 identical cards stacked.
- **Action plan (additive, no rewrite):**
  1. **Connection visual:** a thin tone-aware vertical line (mobile) / horizontal line (desktop) connecting the step numerals so the sequence reads as a flow, not a grid.
  2. **Progressive reveal:** RevealStagger already animates entry; add a per-step `transitionDelay` cascade so the cards land like dominoes.
  3. **Hover depth:** lift + accent border (already partial) + soft inner glow on hover via existing tone tokens.
  4. **Subtle in-card motion:** small numeral pulse or scan-line micro-animation on hover; respect prefers-reduced-motion.
- **Touches:** `src/app/antrenman/page.tsx` (Akış section).
- **Dependencies:** none.
- **Risk:** low. Additive CSS + existing IO infrastructure; no new client deps.
- **Scope:** M (~1 hr).
- **Validation:** mobile + desktop smoke; reduced-motion still respects.

### MP.7 — Gelişim badge interaction

> **Maps to:** request #7
> **Why seventh:** similar shape to MP.6 — small interactive layer on an existing static grid.

- **Goal:** 6 badges communicate what / why / how-earned without losing the simplicity of the grid.
- **Action plan:**
  1. **Hover state:** lift + border accent (already partial); add a "Nasıl kazanılır?" subtext line that fades in on hover.
  2. **Tap (mobile):** small modal-less popover with the criteria — or a sticky reveal at the bottom of the card on first tap.
  3. **State semantics:** unlocked vs locked already differentiates color; add an iconography hint (lock vs sparkle) for the unlocked state.
- **Touches:** `src/app/gelisim/page.tsx` (badge grid).
- **Dependencies:** none.
- **Risk:** low–medium. Mobile-tap behavior needs careful state handling.
- **Scope:** M (~1 hr).
- **Validation:** keyboard accessibility (badges should be focusable buttons or links with proper ARIA), mobile + desktop.

### MP.8 — Nutrition detail interaction

> **Maps to:** request #5
> **Why eighth:** largest research dependency (must inspect the FormAI app to mirror real product behavior) — placing it after the simpler interaction PRs ensures any pattern I extract is consistent with the established interaction language.

- **Goal:** nutrition surfaces (`NutritionShowcase` on home + `/beslenme` meal grid) feel expandable in a way that mirrors the actual FormAI app's nutrition detail interaction. NOT generic ecommerce hover-zoom.
- **Action plan:**
  1. **Research:** inspect `FormAI-FitnessKoçu/lib/features/nutrition/...` for the real meal-detail interaction (likely: tap meal → bottom-sheet with macro breakdown + recipe + add/log).
  2. **Mirror on website:** likely pattern is click/hover-expand reveals macros (protein/carb/fat split), kcal context, and "Hemen Ekle" CTA shape from the real app.
  3. **Layout:** keep the static grid as the resting state; expansion happens in-place or via a peripheral panel.
- **Touches:** `src/components/sections/NutritionShowcase.tsx`, possibly `src/app/beslenme/page.tsx`.
- **Dependencies:** soft research dependency (FormAI app codebase inspection).
- **Risk:** medium. Larger interactive component; needs to feel native to FormAI, not generic.
- **Scope:** M–L (~1.5–2 hrs).
- **Validation:** parity with app behavior; mobile-tap works cleanly; accessibility maintained.

### MP.9 — Support FAQ redesign

> **Maps to:** request #9
> **Why last:** largest single redesign of an existing component; benefits from the email consolidation (MP.1) and the interaction polish vocabulary established by MP.6–8.

- **Goal:** `FaqAccordion` reads premium and alive without breaking the accordion semantic or readability.
- **Action plan:**
  1. **Number system:** numerals already exist; promote them to a stronger anchor (larger, tone-aware).
  2. **Open-state treatment:** accent border + subtle gradient backdrop on the open card.
  3. **Group affordances:** add subtle group divider styling between FAQ groups; light hover state on closed items.
  4. **Motion polish:** the existing AnimatePresence height-collapse stays (PR 4.3 retained FM specifically for this); tweak easing + duration.
  5. **Optional:** category color tag per group (using the established tone palette).
- **Touches:** `src/components/sections/FaqAccordion.tsx`, possibly `src/app/destek/page.tsx` (group treatment).
- **Dependencies:** none functional. Benefits visually from MP.5 color discipline.
- **Risk:** medium. Existing component used by 5 FAQ groups — regression matters.
- **Scope:** M (~1–1.5 hrs).
- **Validation:** all FAQ items still expand/collapse; keyboard accessibility maintained; mobile spacing still comfortable.

---

## Categorization

| Tier | PRs | Time | Risk |
|---|---|---|---|
| **Ground-truth fixes** | MP.1, MP.2 | ~75 min | very low |
| **Image quality** | MP.3, MP.4 | ~60 min | low |
| **Visual polish** | MP.5 | ~45 min | low–med |
| **Interaction polish** | MP.6, MP.7 | ~120 min | low–med |
| **Research-led interaction** | MP.8 | ~90–120 min | med |
| **Component redesign** | MP.9 | ~75–90 min | med |
| **Total** | 9 PRs | ~7–10 hrs | none above medium |

---

## Cross-cutting guards

These apply to every PR in this batch:

- **Dark neon palette only.** No new color tokens. Stick to `violet / lime / scan / ember / neutral` already defined in `tailwind.config.ts`.
- **Mobile-first.** Every interaction must work on touch; hover-only patterns get a tap-equivalent.
- **Reduced-motion respect.** Reuse the global `@media (prefers-reduced-motion: reduce)` killswitch + the `useIntersect` defaults — don't add new always-on animations.
- **Zero regression.** Each PR ends with the same checks: `next build` clean, `next lint --max-warnings 0` clean, all 9 routes 200, no broken anchors.
- **Truthful content.** If a PR surfaces a claim or number, it must be backed by real evidence (mirroring the Phase 1 design discipline).
- **No FM additions.** Phase 4.3 trimmed Framer Motion to specific surfaces; interactions in this batch should use the established IntersectionObserver + CSS pattern unless absolutely necessary.

---

## Out-of-scope clarifications

These are explicitly NOT in this polish batch (still routed forward to their original phase home):

- **Phase 4.4 — GPU-friendly background animations** (paused per user direction).
- **Phase 4.5 — Real-User Monitoring** (still queued).
- **Phase 5 — SEO + observability** (JSON-LD, per-page OG, Sentry, press page).
- **Phase 6 — Signature interactions** (skeleton-on-hover, scroll-tied parallax, live demo).
- **PR 0.5 — Real device QA** (operator action).
- **Phase 1 trust-slot activation** (founder photo / testimonials / app ratings / user count — content inputs from user).

When this polish batch closes, Phase 4 resumes from 4.4.

---

## Next step

Awaiting approval of this sequence + any reordering preference. Once approved, execute starts at **MP.1 — Support email consolidation** under the same one-PR-at-a-time / stop-after-each protocol.
