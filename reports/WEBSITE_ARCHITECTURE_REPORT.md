# WEBSITE_ARCHITECTURE_REPORT

The FormAI website is a single Next.js 14 App Router project, statically generated for the marketing routes and edge-rendered for the dynamic icon / OG image routes. This document captures the routing, structure, and the *why* behind every key decision.

---

## 1. Tech stack

| Layer            | Choice                              | Rationale                                                                   |
|------------------|-------------------------------------|-----------------------------------------------------------------------------|
| Framework        | Next.js 14.2 (App Router)           | First-party Vercel support, RSC by default, file-based routing, static export friendly. |
| Language         | TypeScript 5.6 (strict)             | Catches type drift at the component-API boundary as the design system grows.|
| Styling          | Tailwind 3.4 + custom tokens        | Speed of iteration without losing system-level consistency.                  |
| Motion           | Framer Motion 11                    | Reduced-motion friendly, scroll-triggered reveals, layout-safe.              |
| Fonts            | Inter (sans + display) + JetBrains Mono | Strong Turkish coverage. Mono is reserved for HUD readouts to mirror the in-app aesthetic. |
| Class utilities  | `clsx` + `tailwind-merge`           | Single `cn()` helper resolves conflicting Tailwind classes without surprises.|
| Deploy target    | Vercel (`fra1` region)              | Audience-aware latency; framework auto-detected.                             |

No CSS-in-JS runtime, no UI library — every visual primitive is in `src/components/ui/`.

---

## 2. Routing

```
/                  Home (landing)
/antrenman         AI workout · BlazePose · 8 analyzers
/beslenme          Adaptive nutrition
/gelisim           Streaks + 30-day progress
/destek            FAQ + privacy + contact channels
/baslat            Conversion · install · pricing · waitlist
/sitemap.xml       Generated via src/app/sitemap.ts
/robots.txt        Generated via src/app/robots.ts
/icon              32×32 PNG via @vercel/og (edge)
/apple-icon        180×180 PNG via @vercel/og (edge)
/opengraph-image   1200×630 PNG via @vercel/og (edge)
```

**All marketing routes are statically generated.** No client-side router gymnastics; the navbar simply renders `<Link>` and Next.js does the prefetching.

A Turkish, slash-style path scheme matches the in-app tab names (Antrenman, Beslenme, Gelişim, Profil) so SEO and IA align with the product the user already knows.

---

## 3. Source tree

```
src/
├── app/
│   ├── globals.css              Tailwind base + tokens + utility layers
│   ├── layout.tsx               Root layout, fonts, metadata, viewport, Navbar/Footer
│   ├── not-found.tsx            404 page (branded)
│   ├── page.tsx                 Home
│   ├── antrenman/page.tsx
│   ├── beslenme/page.tsx
│   ├── gelisim/page.tsx
│   ├── destek/page.tsx
│   ├── baslat/page.tsx
│   ├── icon.tsx                 edge — 32×32 PNG
│   ├── apple-icon.tsx           edge — 180×180 PNG
│   ├── opengraph-image.tsx      edge — 1200×630 PNG
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── marks/
│   │   └── Logo.tsx             Wordmark + LogoMark SVG
│   ├── sections/                Page-level composable blocks
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx             Landing-page hero (specialized)
│   │   ├── PageHero.tsx         Generic interior-page hero
│   │   ├── ProductPillars.tsx   3-card Antrenman/Beslenme/Gelişim teaser
│   │   ├── CoachShowcase.tsx    Pose-detection storytelling block
│   │   ├── NutritionShowcase.tsx Macros + meals
│   │   ├── ProgressShowcase.tsx 30-day calendar + streak module
│   │   ├── Manifesto.tsx        Brand statement
│   │   ├── MetricGrid.tsx       4-up metric strip
│   │   ├── FeatureBlock.tsx     Reusable image+features layout
│   │   ├── CtaBlock.tsx         End-of-page conversion block
│   │   ├── FaqAccordion.tsx
│   │   └── MarqueeBand.tsx      Auto-scrolling phrase strip
│   └── ui/                      Atomic primitives
│       ├── Container.tsx
│       ├── Section.tsx
│       ├── Button.tsx           Primary / Secondary / Ghost / Lime
│       ├── Card.tsx
│       ├── Pill.tsx
│       ├── Mono.tsx             HUD-style label
│       ├── SectionHeader.tsx
│       ├── GlowOrb.tsx          Background ambient lighting
│       ├── GridBg.tsx           SVG grid pattern
│       ├── ScanLine.tsx         Animated horizontal scan
│       ├── PhoneFrame.tsx       Generic device frame
│       ├── HudPanel.tsx         In-app HUD-style data panel
│       ├── StatRing.tsx         SVG progress ring
│       └── Reveal.tsx           Framer-Motion scroll-reveal + stagger helpers
├── data/
│   └── faq.ts                   Typed FAQ groups (Turkish)
└── lib/
    ├── cn.ts                    clsx + tailwind-merge
    ├── site.ts                  Centralized site config (URL, copy, OG, etc.)
    └── nav.ts                   Primary + footer navigation data
```

---

## 4. Component strategy

Three tiers, in increasing order of opinion:

### Tier 1 — `ui/` primitives

The atomic Lego: `Container`, `Section`, `Button`, `Card`, `Pill`, `Mono`, `GlowOrb`, `GridBg`, `HudPanel`, `StatRing`, `PhoneFrame`, `Reveal`. These never know which page they live on. They take props for tone (`violet` / `lime` / `scan` / `ember`), size, and variant. They are the only place colours/spacing/glow are decided.

### Tier 2 — `sections/` composable blocks

Reusable across pages: `PageHero`, `FeatureBlock`, `MetricGrid`, `CtaBlock`, `FaqAccordion`, `MarqueeBand`. They accept content as props (eyebrow, title, description, items) and compose tier 1 primitives.

### Tier 3 — `sections/` specialized blocks

Page-specific narrative blocks: `Hero` (home), `CoachShowcase`, `NutritionShowcase`, `ProgressShowcase`, `Manifesto`, `ProductPillars`. These have hand-tuned layouts and content but still reach into tier 1 primitives instead of styling from scratch.

The result: each page file (e.g. `src/app/antrenman/page.tsx`) reads as a narrative outline — `<PageHero/>` then a custom feature block, then `<MetricGrid/>`, then `<CtaBlock/>` — not as a 500-line styling exercise.

---

## 5. Design tokens

All design tokens live in **`tailwind.config.ts`** so the design system is one file.

```
colors.ink.{950..600}      Deep void foundations
colors.violet.{50..900}    Brand (primary 500 = #7C5CFF)
colors.lime.{400..600}     Pose-detection / success accent
colors.ember.{400..600}    Streak / fire accent
colors.scan.{400..600}     Cyan scanner accent
colors.macro.{carb,fat,protein}  Nutrition macros (mirror the in-app palette)

boxShadow.glow-{subtle,medium,focal,lime,ember,scan}
backgroundImage.{grid-violet,radial-violet,gradient-text,gradient-violet,gradient-hero,…}
fontSize.display-{2xl,xl,lg,md}          Fluid clamp() scales
animation.{fade-up,fade-in,pulse-glow,scan,float,gradient-shift,orbit,ticker}
```

CSS layer `globals.css` defines reusable component classes: `.surface`, `.hud-panel`, `.text-gradient`, `.text-gradient-violet`, `.mono-tag`, `.mask-fade-b`, `.conic-ring`.

---

## 6. Performance

Production build output:

```
Route (app)                          Size     First Load JS
┌ ○ /                                4.22 kB     152 kB
├ ○ /_not-found                      138 B       87 kB
├ ○ /antrenman                       2.20 kB     143 kB
├ ○ /baslat                          1.73 kB     143 kB
├ ○ /beslenme                        2.52 kB     146 kB
├ ○ /destek                          3.59 kB     145 kB
├ ○ /gelisim                         0.99 kB     146 kB
├ ƒ /icon                            edge
├ ƒ /apple-icon                      edge
├ ƒ /opengraph-image                 edge
├ ○ /robots.txt                      static
└ ○ /sitemap.xml                     static
```

- Shared baseline: ~87 KB (React + framework).
- Framer Motion is the largest dependency — optimized via `experimental.optimizePackageImports: ['framer-motion']`.
- `next/image` handles all bitmap assets with AVIF/WebP automatic negotiation; long-cache headers in `vercel.json`.
- `@vercel/og` runs the social/favicon endpoints on the Edge runtime — no Node bundle penalty.
- The hero PNG (`/images/pt-form.png`) is the heaviest static asset (~2 MB). It's loaded with `priority` so it doesn't gate LCP, and could be re-encoded to AVIF if Lighthouse demands.

---

## 7. Accessibility

- A "skip to content" link is the first focusable element (`src/app/layout.tsx`).
- Every interactive surface has a visible focus ring (`focus-visible:ring-violet-400/60`).
- All images carry `alt` text; decorative orbs/grids use `aria-hidden`.
- The FAQ accordion announces `aria-expanded` state.
- Motion respects `prefers-reduced-motion`: `Reveal` and `Hero` use `useReducedMotion` and `globals.css` halts animations at the OS level.

---

## 8. Future extensions

The structure is intentionally open to:

- **MDX content** — drop into `src/app/blog/[slug]/page.mdx` without changing the design system.
- **i18n** — Turkish is hard-coded today. A `[locale]` segment is a non-breaking addition; copy is centralized in pages + `src/lib/site.ts` + `src/data/faq.ts`.
- **Waitlist endpoint** — the form in `/baslat#waitlist` posts to `https://formspree.io/f/replace` as a placeholder; replace with a Vercel-hosted route handler when ready.
- **Analytics** — gated behind consent. Add `next/script` for PostHog/Plausible in `layout.tsx`.

---

## 9. Decisions worth remembering

| Decision                                           | Why                                                                                            |
|----------------------------------------------------|------------------------------------------------------------------------------------------------|
| App Router over Pages Router                       | Better RSC story, file-based metadata, native `sitemap.ts` / `robots.ts`.                       |
| One Tailwind config (no design-tokens.json export) | The project owns its design system; no other consumers exist. Tailwind's config IS the spec.    |
| Turkish-first copy                                 | Audience is Turkey; product is launching in TR. English variant can be added behind `[locale]`.|
| HUD panels reused everywhere                       | The in-app aesthetic centers on data overlays; replicating it on the web reinforces identity.   |
| Edge OG image                                      | Fresh, parameter-able social cards; no static PNG to keep in sync.                              |
| No CMS                                             | Marketing copy is short and curated; PRs are the editorial workflow.                            |
| No analytics by default                            | Privacy-first stance mirrors the in-app KVKK posture.                                           |
