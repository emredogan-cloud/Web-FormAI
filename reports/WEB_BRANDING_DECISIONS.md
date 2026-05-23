# WEB_BRANDING_DECISIONS

The FormAI website is *not* a separate marketing identity — it is the app's identity extended to the web. The visual choices below mirror what the user already sees inside the product.

---

## 1. The premise

FormAI is a **cinematic, dark, AI-coach product**. Its in-app palette is deep violet on near-black with three accent voltages (lime green, electric cyan, fire orange) for distinct semantic surfaces (pose detection, scanner, streaks). The website must feel born from that product — not bolted on.

The visual North Stars:

- **Apple-level polish.** No filler sections, restrained motion, deliberate spacing.
- **Linear / Vercel / Stripe density.** High information rate without clutter.
- **The in-app HUD aesthetic.** Mono labels, glowing panels, data-readouts as decoration.
- **Restraint.** Glassmorphism is a seasoning, not a wall texture. Glow is hierarchical.

---

## 2. Typography

| Token            | Font                          | Use                                                       |
|------------------|-------------------------------|-----------------------------------------------------------|
| `font-sans`      | Inter (latin + latin-ext)     | All body text; default UI.                                |
| `font-display`   | Inter (700/600)               | Headings; uses tight tracking + clamp() fluid scales.     |
| `font-mono`      | JetBrains Mono                | HUD labels, kbd-style stat readouts, data tables.         |

**Why Inter for both display and body?** Inter ships excellent Turkish character coverage (ş, ğ, ı, ç, ö, ü), variable weights so headings can sit at 700 without a separate file, and it's the de facto premium-SaaS typeface — it matches the design DNA of the references (Linear, Vercel, Stripe, OpenAI). A separate display font would have meant either a Latin-ext Turkish risk or a heavier font payload.

### Type scale

`tailwind.config.ts` defines fluid `clamp()` headings so the same component renders cleanly on a phone and a 32" monitor:

```
display-2xl   clamp(3rem, 7vw, 6.5rem)    Hero headline
display-xl    clamp(2.5rem, 5.5vw, 5rem)  Page hero
display-lg    clamp(2rem, 4vw, 3.75rem)   Section heading
display-md    clamp(1.75rem, 3vw, 2.75rem) Sub-heading
```

Letter-spacing tightens with size (`-0.04em` on display-2xl, `-0.025em` on display-md) — a small detail that produces the "premium SaaS" feeling without extra effort.

### Mono treatment

Monospace is reserved for **HUD readouts** and **eyebrow labels** (`POSE DETECTION · LIVE`). This mirrors the in-app overlays (form scores, hip alignment %). Used everywhere it would lose its meaning, so it's gated to:

1. Eyebrow tags above section headings.
2. HUD panels (`HudPanel`, `StatRing` label).
3. Data values inside the coach showcase.

---

## 3. Color system

### Foundations

```
ink-950   #05030C   Page base
ink-900   #0A0714   Footer / panel base
ink-850   #0F0B1E   Hover-elevated surfaces
ink-800   #15102A   Card base
ink-700   #1C1638   Inner panel
ink-600   #241C46   Inset edge
```

A 7-step ink ramp that lets the page feel layered without ever leaving "very dark."

### Brand violet

```
violet-500 = #7C5CFF       Brand
violet-300 = #A98AFF       Highlight / gradient tip
violet-700 = #5230C2       Button shadow / gradient root
```

Mirrors the in-app primary (welcome screen, primary buttons, "BAŞLA" CTA, day-X program cells).

### Semantic accents

| Token        | Hex      | Used for                                          | Mirrors in-app    |
|--------------|----------|---------------------------------------------------|-------------------|
| `lime-500`   | `#C8FF00`| Pose detection success, nutrition target hit      | Robot accents, pose markers |
| `ember-500`  | `#FF7A1A`| Streak / fire / "active series"                   | Streak flame      |
| `scan-500`   | `#1FCFFF`| Scanner overlays, cyan HUDs, "tracking" state     | Skeleton overlay  |
| `macro.carb` | `#FF3D8E`| Carb macros                                       | Hot-pink macro bar|
| `macro.fat`  | `#E0FF1A`| Fat macros                                        | Chartreuse macro  |
| `macro.protein` | `#1FCFFF`| Protein macros                                | Cyan macro        |

Each accent has a corresponding glow shadow (`shadow-glow-lime`, `shadow-glow-ember`, `shadow-glow-scan`) so any tone-aware component (`HudPanel tone="lime"`) gets the matching halo automatically.

---

## 4. Glow hierarchy

Glow is the single biggest "premium" tell on a dark UI — but it is also the most overused. The system has **four explicit intensities**:

| Token              | Strength | Used where                                  |
|--------------------|----------|---------------------------------------------|
| `shadow-glow-subtle` | low    | default card hover, secondary buttons      |
| `shadow-glow-medium` | medium | active CTA, focused HUD panels             |
| `shadow-glow-focal`  | high   | hero coach card, primary button hover      |
| `shadow-glow-<tone>` | tonal  | accent-specific glow tied to lime/ember/scan |

Backgrounds use **GlowOrb** (a blurred coloured circle) for ambient lighting — placed *outside* the viewport edges and masked so they never become a focal point. Each section gets at most 2-3 orbs.

---

## 5. Surfaces

Three surface tokens, in increasing weight:

```
.surface           bg-white/[0.025]  +  border-white/[0.06]
.surface-strong    bg-white/[0.04]   +  border-white/[0.08]
.hud-panel         violet border + tinted bg + inner glow
```

Cards extend `.surface` with a top-down gradient (`from-white/[0.04] to-white/[0.015]`) so they feel volumetric without harsh edges. Hover lifts borders one step and adds a low-strength violet drop-shadow.

---

## 6. Motion

Motion is **purposeful, never decorative**:

- **Reveal on scroll** — a `Reveal` component fades + translates content up over 850ms with `cubic-bezier(0.16, 1, 0.3, 1)` ("out-expo"). Stagger helpers (`RevealStagger`, `RevealItem`) cascade children by 60-100ms.
- **Hero coach card** — single 1.4s scale-in with a concentric orbiting conic gradient (slow rotation, blurred).
- **Animated scan line** — a 5s vertical sweep over the pose-analysis showcase, echoing the in-app ML pose detection feedback.
- **HUD pulses** — small dot animations on "tracking" / "active" labels (1.5s ease-in-out).
- **Marquee band** — a 28s linear translate scrolls technology phrases below the hero.
- **Hover deltas** — most surfaces lift 2-6px on hover; only cards in `interactive` mode add a low glow.

All motion uses `useReducedMotion` from Framer Motion. When the OS reports `prefers-reduced-motion: reduce`, transitions collapse to 0.01s and the conic-ring animation halts. `globals.css` also strips animation duration globally as a safety net.

---

## 7. Spacing rhythm

Two reusable tokens via the `Section` primitive:

| Spacing  | Vertical padding              |
|----------|-------------------------------|
| `tight`  | `py-16 sm:py-24`              |
| `default`| `py-24 sm:py-32 lg:py-40`     |
| `loose`  | `py-32 sm:py-40 lg:py-56`     |

Every interior page uses `default` for its narrative sections and the hero uses a hand-tuned `pt-36 pb-20 sm:pt-44 sm:pb-28` so the navbar doesn't crowd the eyebrow.

Container is always `max-w-7xl` with responsive horizontal padding (`px-6 sm:px-8 lg:px-12`). No edge-to-edge layouts; the design intentionally breathes at large viewports.

---

## 8. Iconography

Every icon in the project is a hand-drawn inline SVG (Logo mark, store badges, FAQ chevrons, dumbbell/fork/flame in `ProductPillars`, target/lock in badges, mail/shield/doc on the support page). No icon library.

This keeps the icon style **consistent**: 1.4-1.6px stroke, round caps, no fills except for accent glyphs (logo dot, store badge marks). The unified weight matters more than the count — a heterogeneous icon set is the fastest way to break premium feel on a dark UI.

---

## 9. Photography

All imagery is **drawn from the FormAI app** — not stock. The hero uses the in-app coach robot (`pt-form.png`), the pose-detection showcase uses the plank ML-pose mockup, the meals are the actual app's nutrition library photos, and the transformation card uses the in-app 30-day before/after frame.

Why: a marketing site that uses random stock photography would feel like a different product. The user who installs the app and saw the website should feel they've already met the brand.

---

## 10. Brand voice

| Property        | FormAI voice                                                     |
|-----------------|------------------------------------------------------------------|
| Language        | Turkish, first person ("yapay zekâ koçun")                       |
| Tone            | Confident, restrained, companion-like                            |
| Vocabulary      | Avoids hype ("ultimate", "revolutionary"). Prefers precision ("30 fps", "RLS-gated", "138 egzersiz"). |
| Sentence length | Short. Cinematic. Many one-line beats.                           |
| Cadence         | "Antrenman. Beslenme. Gelişim. Hepsi aynı zekâ tarafından sürdürülür." |

The voice mirrors the app's onboarding ("Vücudunu yapay zekâ ile şekillendir") and the manifesto: *Fitness; süslü cihazlardan değil, dikkat, ölçüm ve sabırdır.*

---

## 11. What we explicitly avoided

| Anti-pattern                                       | Why we said no                                                       |
|----------------------------------------------------|----------------------------------------------------------------------|
| Loud gym-marketing reds + chrome textures          | FormAI is a tech product, not a supplement brand.                    |
| Cyberpunk overload (excessive glitches, scan-line gimmickry) | The product is calm and intelligent; the site should feel the same. |
| Heavy glassmorphism (full-page blur)               | Performance hit + dated. We use it as a seasoning on HUD panels.     |
| Generic feature grids ("✓ Fast · ✓ Secure · ✓ Easy") | Each section is hand-composed. The grids that exist (analyzer catalog, plans) carry real product data. |
| Stock photography                                  | Breaks the "born from the app" continuity.                            |
| Multiple fonts                                     | Inter + JetBrains Mono only. No display font for vibes.              |
| Excessive emojis                                   | Zero. Mono labels and SVG icons carry the visual hierarchy.           |

---

## 12. Where the system can flex

When the brand expands (new product line, a B2B coach offering, a partner page), the system already supports it without breaking continuity:

- Add a new accent tone → extend `tailwind.config.ts` colours + create matching `shadow-glow-<tone>`.
- Add a new page → use `<PageHero/>`, then one or two specialized blocks, end with `<CtaBlock/>`.
- Add a campaign micro-site → reuse the design system folder, fork only the hero.

The constraint is the design system, not the imagination.
