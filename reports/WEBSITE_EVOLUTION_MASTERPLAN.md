# WEBSITE_EVOLUTION_MASTERPLAN

**Subject:** FormAI website — V1 → V2 execution roadmap.
**Source critique:** `WEBSITE_DEEP_REVIEW.md`.
**Mode:** planning only. No code changes in this document.
**Effort scale:** S ≈ ½ day · M ≈ 1-2 days · L ≈ 3-5 days.

---

## EXECUTIVE SHAPE

Seven phases, each a clean PR boundary. Phases 0-2 are the **must-ship-before-launch** core. Phases 3-6 are **post-launch quality runway** — they keep the V1 → V2 momentum without requiring all-at-once execution.

```
Phase 0 — Launch blockers          (must precede any public traffic)
Phase 1 — Trust layer              (highest single ROI upgrade)
Phase 2 — Hero + identity          (the first-3-seconds rewrite)
Phase 3 — Narrative + density      (home flow restructure + mono diet)
Phase 4 — Performance + delivery   (image, JS, render budget)
Phase 5 — SEO + observability      (schema, RUM, analytics-with-consent)
Phase 6 — Signature interactions   (the "wow" gestures that earn shares)
```

Each phase is composed of small sub-PRs. None of them are speculative redesigns.

---

## CATEGORIZATION MAP

| Category | Phases |
|---|---|
| **Quick wins** (S, ship in days, immediate visible delta) | 0.1, 0.2, 0.3, 1.1, 1.4, 4.1, 4.2 |
| **High ROI** (M-L, materially moves brand or conversion) | 1.2, 1.3, 2.1, 2.2, 2.3, 3.1, 3.3 |
| **Strategic upgrades** (M-L, structural lift to long-term quality) | 3.2, 4.3, 5.1, 5.2, 6.1, 6.2 |
| **Long-term evolution** (L, multi-sprint, opportunistic) | 2.4, 4.4, 5.3, 6.3, 6.4 |

---

# PHASE 0 — LAUNCH BLOCKERS

> **Goal:** Make the site legally / functionally shippable. No design changes.
> **Impact:** Prevents embarrassing failures + legal exposure.
> **Complexity:** Low. Mostly content + URL substitution.
> **Dependencies:** App store URLs, real waitlist endpoint, legal copy from counsel.
> **UX value:** Removes broken-link friction.
> **Business value:** Allows public traffic at all.
> **Execution order:** **First. Blocking.**

### SUB-PR 0.1 — Wire real store URLs

- Action: Set `site.appStoreUrl` + `site.playStoreUrl` in `src/lib/site.ts`. Update `StoreBadge` instances in `baslat/page.tsx` to use them with `external` semantics. Update the navbar/footer "Uygulamayı al" CTAs.
- Touches: `lib/site.ts`, `baslat/page.tsx`, optionally `Navbar.tsx`, `Footer.tsx`.
- **Effort:** S

### SUB-PR 0.2 — Real waitlist endpoint OR remove the form

- Action: Either build a Vercel Route Handler at `app/api/waitlist/route.ts` posting to a real provider (Resend, Loops, custom), or remove the waitlist block until ready.
- Touches: `baslat/page.tsx`, optional new `app/api/waitlist/route.ts`.
- **Effort:** S (Resend setup) → M (custom)

### SUB-PR 0.3 — Legal content (privacy / şartlar / KVKK)

- Action: Create either three pages (`/destek/gizlilik`, `/destek/sartlar`, `/destek/kvkk`) or three real sections on `/destek` with the matching anchor ids. Use the in-app legal text as the source of truth (Supabase / RC / KVKK already drafted in app docs).
- Touches: `app/destek/*`, footer link updates if path changes.
- **Effort:** M (mostly content)

### SUB-PR 0.4 — Cookie consent banner

- Action: Lightweight banner with three states (accept / reject / customize), persisted to `localStorage`. Gate any future analytics behind acceptance. Required by KVKK and GDPR.
- Touches: new `components/ConsentBanner.tsx`, `app/layout.tsx`.
- **Effort:** M

### SUB-PR 0.5 — Real device QA pass

- Action: Run through iPhone SE, iPhone 14 Pro, Pixel 7, iPad Mini, desktop 1280/1920. Verify all 6 routes + 404. Catalogue findings in a sub-issue. No fix required in this PR — fixes go into Phase 2 / 3 as appropriate.
- Touches: docs only.
- **Effort:** S

### SUB-PR 0.6 — Verify `not-found.tsx` in production

- Action: Visit `/foo` on a Vercel preview; confirm the branded 404 renders.
- Touches: none (verification).
- **Effort:** S

---

# PHASE 1 — TRUST LAYER

> **Goal:** Move trust score from 4/10 to ~7/10 in one phase.
> **Impact:** Single highest conversion lever identified in the review.
> **Complexity:** Low to medium — mostly content + new sections.
> **Dependencies:** 3-5 real beta testers with permission, founder photo + bio.
> **UX value:** Reduces "is this real?" friction.
> **Business value:** Direct conversion lift.
> **Execution order:** Immediately after Phase 0.

### SUB-PR 1.1 — Founder strip

- Action: New `components/sections/FounderStrip.tsx` — 2 paragraph note + face + signature. Embedded on `/` after the hero (position 2) and on `/destek` after the channels.
- Acceptance: Real photo, real human voice, < 80 words, mentions a single "why we built this" beat.
- **Effort:** S

### SUB-PR 1.2 — Testimonial section

- Action: New `components/sections/Testimonials.tsx` — card grid of 3-5 named beta users with photo, role/location, 1-2 line outcome ("3 haftada form skorum 72 → 91"), and the in-app rating they gave.
- Touches: new component + new `data/testimonials.ts`, mount on `/` (replacing one of the showcase blocks if Phase 3 also lands) and on `/baslat` above pricing.
- Acceptance: Photos cropped at consistent ratio; outcomes are *specific* (numbers preferred over adjectives).
- **Effort:** M (content sourcing dominates)

### SUB-PR 1.3 — App store rating badge

- Action: Component `<AppRating />` showing iOS ★ and Android ★ averages with review count. Hidden behind feature flag until rating > 100 reviews on either store.
- Touches: new component, mount in hero + `/baslat`.
- **Effort:** S (component); M (waiting for real ratings)

### SUB-PR 1.4 — Money-back / no-payment trust strip near pricing

- Action: Add three small badges adjacent to the pricing block: "7 gün ücretsiz · şimdi ödeme yok · istediğin an iptal." Already partially present as `Pill`s — promote to a visually distinct strip with icons.
- Touches: `baslat/page.tsx`.
- **Effort:** S

### SUB-PR 1.5 — Press / partners strip (when available)

- Action: Replace `MarqueeBand` content with press logos once any are earned (TechCrunch TR, Webrazzi, etc.). Until then, leave tech stack — but reduce to ~6 items.
- Touches: `MarqueeBand.tsx`.
- **Effort:** S

### SUB-PR 1.6 — Real user-count claim with caveat

- Action: Add a single tasteful "Beta · 1.247 erken kullanıcı" line (or whatever the real number is) below the hero CTAs, replacing the stat block when ready.
- Touches: `Hero.tsx`.
- **Effort:** S

---

# PHASE 2 — HERO + IDENTITY

> **Goal:** Rewrite the first 3 seconds. Replace robot with product proof; sharpen copy.
> **Impact:** Hero is the highest-leverage surface on the site.
> **Complexity:** Medium — design judgment + asset preparation.
> **Dependencies:** A real in-app capture (video preferred, hi-res screenshot acceptable).
> **UX value:** Closes the "show, don't tell" gap.
> **Business value:** Direct bounce-rate improvement.
> **Execution order:** After Phase 1 (since testimonials make the hero claim believable).

### SUB-PR 2.1 — Replace hero subject

- Action: Swap `pt-form.png` (robot) for either (a) the `welcome.jpg` skeleton overlay screenshot framed as the product moment, or (b) a 10-15 s muted autoplaying loop of the app detecting a real push-up. HUD overlays remain — but now they annotate a real moment, not a brand asset.
- Touches: `Hero.tsx`, new `/public/video/` directory if video route is chosen.
- Acceptance: Visitor in cold load understands "app analyzes your form on camera" without reading the headline.
- **Effort:** M

### SUB-PR 2.2 — Headline rewrite

- Action: A/B-ready candidates in `lib/site.ts` or hero component. Move from "Sahaya çıkan yapay zekâ fitness koçun" to a 1-step parse. Candidates:
  1. *"Aynaya bak. AI koçun seni hizalasın."*
  2. *"30 günde formuna kavuş. Kameran koçun olsun."*
  3. *"Yapay zekâ formunu izler. Sen sadece dene."*
- Touches: `Hero.tsx`, possibly `site.ts`.
- Acceptance: Read aloud to 5 cold testers — 4/5 should restate the value in one sentence.
- **Effort:** S

### SUB-PR 2.3 — Mobile hero rearrangement

- Action: Mobile-specific layout that preserves HUD information (no `hidden lg:block`). Likely: stacked layout with a horizontal scroller of HUD chips under the image, or a single combined HUD ribbon at the bottom of the image.
- Touches: `Hero.tsx`.
- **Effort:** M

### SUB-PR 2.4 — Logo evolution

- Action: Iterate `LogoMark` toward an icon that owns one distinctive idea (e.g., a body-axis line with a glowing joint point, evoking pose detection). Maintain wordmark unchanged. Ship after broader brand review.
- Touches: `marks/Logo.tsx`, `app/icon.tsx`, `app/apple-icon.tsx`, `favicon.svg`.
- **Effort:** L (design exploration heavy)

---

# PHASE 3 — NARRATIVE + DENSITY

> **Goal:** Restructure the home flow. Cap mono/glow usage. Promote the manifesto.
> **Impact:** Improves perceived intentionality and reduces scroll fatigue.
> **Complexity:** Medium — refactor without redesign.
> **Dependencies:** Phase 1 testimonials (so the new flow can include them in the right place).
> **UX value:** Higher scroll-completion + better narrative arc.
> **Business value:** Indirect — supports conversion via better attention.
> **Execution order:** After Phase 2.

### SUB-PR 3.1 — Mono / glow diet

- Action: Reduce `<Mono>` usage from 58 → ≤ 18 instances. Reduce `<GlowOrb>` from 34 → ≤ 16. Define usage rules in `WEB_BRANDING_DECISIONS.md`. Replace removed mono labels with subtle uppercase tracked spans where needed; remove redundant orbs.
- Touches: most section files.
- **Effort:** M

### SUB-PR 3.2 — Home flow restructure

- Action: Drop one of (`ProductPillars`, three pillar showcases) — recommendation: keep `ProductPillars` and collapse the three showcases into a single "How it works" with three vertically-stacked or tab-switched sub-stories. Promote `Manifesto` to position 3-4. End with testimonials → CTA.
- New flow target: Hero → Founder/Manifesto → ProductPillars → Combined "How it works" → Testimonials → MetricGrid → CTA.
- Touches: `app/page.tsx`, possibly new `HowItWorks.tsx`.
- **Effort:** L

### SUB-PR 3.3 — Section variance

- Action: Introduce 2-3 layout breakers across the site (e.g., one full-bleed photo section, one split-screen "before/after" with sticky-scroll comparison, one numerical-only section). Currently every section uses the same eyebrow-title-body-content stack.
- Touches: 2-3 new section components or variant renderers.
- **Effort:** M

### SUB-PR 3.4 — `Gelişim` charted progression

- Action: Add a real SVG line chart to `/gelisim` showing a representative form-score curve over 30 days. Pure SVG; no charting lib needed.
- Touches: new `components/ui/SparkChart.tsx`, `gelisim/page.tsx`.
- **Effort:** M

### SUB-PR 3.5 — Asset audit

- Action: Audit the 13 unreferenced webp images in `public/images/`. Either integrate (preferred for `daily-challenge.webp`, `gym-bg.webp`, `coach-hero.webp`) or delete from version control to reduce deploy weight.
- Touches: deletions or new usages in pages.
- **Effort:** S

---

# PHASE 4 — PERFORMANCE + DELIVERY

> **Goal:** Hit Lighthouse mobile ≥ 95 across all routes; LCP < 2 s on 4G.
> **Impact:** Premium-tier perceived speed.
> **Complexity:** Medium. Image + JS optimization.
> **Dependencies:** Real device + Lighthouse runs.
> **UX value:** Faster interactions, less jank.
> **Business value:** SEO + bounce rate.
> **Execution order:** After Phase 2 (since hero subject may change asset weights).

### SUB-PR 4.1 — Image format pass

- Action: Convert all `.png` heroes to AVIF + WebP fallback via `next/image` (`next.config.mjs` already permits both formats). Target each under 400 KB. Generate LQIP `placeholder="blur"` for top-of-page images.
- Touches: `public/images/*`, `Hero.tsx`, `CoachShowcase.tsx`, `antrenman/page.tsx`.
- **Effort:** S (with `sharp` script)

### SUB-PR 4.2 — Image priority + lazy hints

- Action: Add `priority` only to hero image. Add `loading="lazy"` to below-fold images (now default with `next/image`, verify). Set explicit `sizes` attributes that match real viewport widths.
- Touches: `Hero.tsx`, `CoachShowcase.tsx`, `ProductPillars.tsx`, `NutritionShowcase.tsx`.
- **Effort:** S

### SUB-PR 4.3 — Framer Motion diet

- Action: Either (a) mark `Reveal`/`RevealStagger` as `next/dynamic({ ssr: false })`, or (b) replace simple fade-ups with a custom IntersectionObserver hook + CSS transitions. Reserve FM for HUD pulses, scan line, hero conic ring, accordion.
- Touches: `ui/Reveal.tsx`, possibly new `hooks/useReveal.ts`.
- Expected delta: -30-40 KB First Load JS on most pages.
- **Effort:** M

### SUB-PR 4.4 — GPU-friendly background animations

- Action: Audit `animate-orbit` (conic ring, 18s linear) and `text-gradient-violet` (12s ease infinite). Pause when off-viewport via IntersectionObserver. Optionally convert to `will-change: transform` with `prefers-reduced-data` respected.
- Touches: `Hero.tsx`, possibly `globals.css`.
- **Effort:** M

### SUB-PR 4.5 — Real-User Monitoring

- Action: Wire `@vercel/speed-insights` + `@vercel/analytics` (both privacy-friendly). Gate behind consent banner from PR 0.4.
- Touches: `app/layout.tsx`.
- **Effort:** S

---

# PHASE 5 — SEO + OBSERVABILITY

> **Goal:** Capture organic search + give us visibility into real production behavior.
> **Impact:** Long-tail acquisition + faster regression detection.
> **Complexity:** Low to medium. Mostly additive.
> **Dependencies:** None.
> **UX value:** Negligible direct; indirect via search visibility.
> **Business value:** Compounding organic traffic.
> **Execution order:** Any time after Phase 0.

### SUB-PR 5.1 — JSON-LD structured data

- Action: Add a `<Schema>` component injecting `application/ld+json`:
  - `Organization` on root layout
  - `WebSite` with site search potential on root layout
  - `FAQPage` on `/destek` (auto-generated from `data/faq.ts`)
  - `SoftwareApplication` on `/baslat`
- Touches: new `components/Schema.tsx`, layout, `destek/page.tsx`, `baslat/page.tsx`.
- **Effort:** M

### SUB-PR 5.2 — Per-page OG variation

- Action: Convert `opengraph-image.tsx` to a parameterized version that varies the eyebrow / headline per route. Each interior page gets its own OG via Next.js's segment OG image convention.
- Touches: new `app/antrenman/opengraph-image.tsx` etc., refactor of the root OG generator.
- **Effort:** M

### SUB-PR 5.3 — Canonical URLs + hreflang

- Action: Set canonical URL per page via `metadata.alternates.canonical`. Declare `tr-TR` explicitly. Lays the groundwork if an English variant ships later.
- Touches: per-page `metadata`.
- **Effort:** S

### SUB-PR 5.4 — Error tracking

- Action: Add Sentry (or similar) with `beforeSend` gated by consent. Mirror the in-app KVKK posture.
- Touches: `instrumentation.ts`, `sentry.*.config.ts`.
- **Effort:** M

### SUB-PR 5.5 — Press kit page

- Action: `/press` page with downloadable logo pack (SVG + PNG), brand colors, screenshots zip, founder bio, contact email. Pre-empts inbound press requests.
- Touches: new route + new `/public/press/` directory.
- **Effort:** M

---

# PHASE 6 — SIGNATURE INTERACTIONS

> **Goal:** Introduce one or two interactions that *only* FormAI does — the kind of moment that gets a screenshot shared.
> **Impact:** Brand memorability + word-of-mouth.
> **Complexity:** Medium to high. Creative-engineering work.
> **Dependencies:** Phase 2 hero rewrite (so the canvas exists), Phase 4 performance budget (so the interactivity is smooth).
> **UX value:** Direct delight.
> **Business value:** Organic sharing, brand recall.
> **Execution order:** After Phases 0-4 are clean.

### SUB-PR 6.1 — Hover-driven skeleton overlay on hero

- Action: Canvas or SVG overlay that draws the 33-keypoint BlazePose skeleton on the hero image, animated to "lock onto" key joints when the cursor is near them. Mimics the actual pose-detection feature.
- Touches: new `components/ui/SkeletonOverlay.tsx`, `Hero.tsx`.
- **Effort:** L

### SUB-PR 6.2 — Scroll-tied parallax for the manifesto

- Action: Subtle scroll-position-tied parallax on the Manifesto section image, with the founder text fading in line-by-line as the scroll progresses.
- Touches: `Manifesto.tsx`.
- **Effort:** M

### SUB-PR 6.3 — Live form score widget (60-second interactive demo)

- Action: Embed a tiny in-page MediaPipe Pose demo where the user can grant camera permission for 60 seconds and see their own form score live. Same engine as the app. Skippable; gated behind explicit click.
- Touches: new `components/sections/LiveDemo.tsx`, MediaPipe / TensorFlow.js dependency.
- **Effort:** L (significant)

### SUB-PR 6.4 — Badge unlock micro-interaction

- Action: When a visitor reaches the bottom of the page (or completes a scroll milestone), an in-app-style "Web ziyaretçisi" rozet pops, mirroring the in-app badge unlock UI. Small, playful, optional close.
- Touches: new `components/BadgeUnlock.tsx`, mounted in layout.
- **Effort:** M

---

# PRIORITY MATRIX

Ranked by **(impact × visibility) / effort** for non-blocking work (Phase 0 is always first).

| Rank | Sub-PR                       | Effort | Why first |
|:----:|------------------------------|:------:|-----------|
|  1   | 1.1 Founder strip            | S      | Largest trust delta for ½ day of work. |
|  2   | 1.2 Testimonials             | M      | Removes the biggest credibility gap; unlocks Phase 2 narrative. |
|  3   | 2.1 Replace hero subject     | M      | Single highest visual decision on the site. |
|  4   | 2.2 Headline rewrite         | S      | Tied to 2.1; cheap; immediate clarity gain. |
|  5   | 4.1 Image format pass        | S      | Pure performance, no design risk. |
|  6   | 3.1 Mono / glow diet         | M      | Restores rhythm + brand hierarchy. |
|  7   | 3.2 Home flow restructure    | L      | Best narrative payoff once Phases 1-2 land. |
|  8   | 2.3 Mobile hero rearrangement| M      | Mobile is the largest traffic surface. |
|  9   | 5.1 JSON-LD                  | M      | Compounding organic SEO gain. |
|  10  | 4.3 Framer Motion diet       | M      | -30-40 KB on every page; structural perf win. |

---

# RECOMMENDED EXECUTION TIMELINE

A pragmatic two-month sprint plan:

```
Week 1   →  Phase 0 (all)              — must precede launch
Week 1   →  PR 1.1 + PR 1.4             — quick trust wins
Week 2   →  PR 1.2 + PR 1.3             — testimonials + ratings
Week 2   →  PR 4.1 + PR 4.2             — image perf

Week 3   →  PR 2.1 + PR 2.2 + PR 2.3    — hero rewrite + mobile
Week 3   →  PR 3.5                       — asset cleanup

Week 4   →  PR 3.1 + PR 3.2             — narrative restructure
Week 4   →  PR 5.1                       — JSON-LD

Week 5   →  PR 3.3 + PR 3.4             — section variance + chart
Week 5   →  PR 4.3 + PR 4.4 + PR 4.5    — JS diet + RUM

Week 6   →  PR 5.2 + PR 5.3 + PR 5.4    — OG variations + canonical + error tracking
Week 6   →  PR 5.5                       — press kit

Week 7+  →  Phase 6 signature interactions, opportunistic
```

---

# FINAL SUMMARY

**How good is V1?** 6.2 / 10. Premium-looking pre-launch site with real launch blockers.

**What prevents it from feeling world-class?** Three structural gaps — none of them stylistic:

1. The hero asks visitors to *imagine* the product instead of *showing* it.
2. The site has zero social proof, founder presence, or real-user signal.
3. The conversion funnel loops back to itself: every CTA goes to `/baslat`, every store badge goes to the FAQ.

**Highest ROI upgrades if budget is limited — TOP 3:**

### 🥇 1. Phase 0 + Phase 1 (Launch blockers + Trust layer)

Without these, every visit is a leaking bucket. The combined effort (~5-7 days) moves the site from *"will embarrass us at launch"* to *"will convert"*. Add testimonials (PR 1.2), founder strip (PR 1.1), real store links (PR 0.1), money-back trust strip (PR 1.4), and real legal content (PR 0.3). Single largest delta you can buy.

### 🥈 2. PR 2.1 + 2.2 — Hero rewrite

Swap the robot for a real product moment + rewrite the headline to a 1-step parse. This is one engineer-day plus one design decision. Decides whether the first 3 seconds of every visit lands.

### 🥉 3. PR 4.1 + PR 4.3 — Performance pass

Image format conversion + Framer Motion diet. ~M total. Moves LCP from likely 2.5-3 s on mobile 4G to under 1.5 s, and shaves 30-40 KB from every page. Pure performance win, no design risk. Without this, the visual quality doesn't get delivered fast enough to matter.

---

**Why these three?**

They are the only set that delivers all three premium-SaaS table stakes simultaneously: **the site works (Phase 0)**, **the site is believed (Phase 1)**, **the site reads instantly (2.1, 2.2, 4.1)**. Every other improvement assumes those three are already in place. Phase 3 narrative gains are wasted if visitors bounce in 1.5 s; Phase 6 signature interactions are noise if there is no trust to deepen.

**Stop. Start with these. Re-audit after.**
