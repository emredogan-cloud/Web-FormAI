# WEBSITE_DEEP_REVIEW

**Subject:** FormAI marketing site, V1 (commit `7992c33`)
**Mode:** brutal, evidence-based, no defense.
**Stance:** This is not a re-build proposal. It identifies what prevents V1 from feeling world-class.

---

## EXECUTIVE OVERVIEW

V1 is a polished, internally consistent dark-neon Next.js site. The design system is real, the build is clean, the visual identity has continuity with the in-app aesthetic, and the Turkish copy has occasional flashes of strong voice.

It is **good**. It is **not yet world-class**.

The gap between V1 and the Apple / Stripe / Linear benchmark is not a styling gap — it is a **credibility, hero, and trust** gap. The site looks like a premium product but it does not yet *behave* like one: it has no social proof, no demo, generic CTAs, placeholder URLs, missing legal content, no signature interactive moment, and three unoptimized 2 MB hero PNGs gating LCP.

If a sophisticated SaaS reviewer landed on `/` cold, they would say:
> "This looks like a real product. But I see no users. No press. No real screenshots of the app working. The robot is cool but I can't tell what the app does in 5 seconds. And tapping 'Programını oluştur' takes me to another marketing page, not an install or a demo."

That is the V1 verdict.

---

## SCORING TABLE

Scored against the Apple/Stripe/Linear/Vercel/Superhuman benchmark, not against average fitness sites.

| Category              | Score | Headline reason                                                                            |
|-----------------------|:-----:|--------------------------------------------------------------------------------------------|
| Brand Identity        |  7/10 | Strong palette + voice; generic F-mark logo; no signature interaction owned by FormAI.     |
| Visual Design         |  8/10 | Internally consistent system, well-balanced surfaces; **mono-label overuse** dilutes hierarchy. |
| UX                    |  6/10 | Navigation clean. But no demo path, no objection handling, repetitive section pattern.     |
| Conversion            |  5/10 | Pricing exists; trust signals absent. CTAs are generic ("Şimdi başla"), not outcome-bound. |
| Motion                |  7/10 | Tasteful and restrained; one repeated reveal pattern; no signature "wow" moment.           |
| Copywriting           |  6/10 | Standout beats ("Aynaya bakar gibi", "Disiplin bir grafiktir"). Hero opens abstract; CTAs unspecific. |
| Mobile Experience     |  6/10 | Responsive at the framework level; **not yet validated on real devices**; mono 10 px text + dense hero overlays are risk areas. |
| Trust                 |  4/10 | **Critical weakness.** Zero testimonials, zero ratings, zero press, no founder, no specific user count, no money-back, KVKK content links empty. |
| Performance           |  6/10 | Bundle is light (87 KB shared, 152 KB First Load). LCP is gated by three 1.8–2.0 MB hero PNGs and an unconditional Framer Motion bundle. |
| SEO Foundations       |  6/10 | Sitemap, robots, OG, per-page metadata. **No JSON-LD, no per-page OG, no FAQ schema.**     |
| Accessibility         |  6/10 | Skip link + focus rings. 10 px mono labels + `text-white/65` on `ink-950` risk WCAG AA failure on small text. Reveal-hidden content depends on JS. |
| Technical Readiness   |  8/10 | Clean build, lint clean, edge OG, static routes, security headers. No analytics, no error tracking, no real-user metrics. |
| Launch Readiness      |  5/10 | Placeholder app store URLs, placeholder Formspree action, hash anchors that lead nowhere, no cookie consent. |
| **Weighted average**  | **6.2/10** | Premium ground. Not yet world-class. |

---

## STRENGTHS — WHAT TO PRESERVE

These create real brand equity. Do not destroy in any refactor.

1. **The design system itself.** Tokens in `tailwind.config.ts` (ink ramp, brand violet, four semantic accents, four-tier glow shadows, fluid `clamp()` display scale) are the spine of the site. Every page composes from the same primitives — refactors should add to the system, not bypass it.
2. **The voice when it lands.** Lines like *"Aynaya bakar gibi. Sadece ayna senin formunu okuyor"*, *"Disiplin bir grafiktir. FormAI onu sürdürür"*, and the Manifesto block deliver the FormAI tone better than any visual.
3. **In-app continuity in the showcases.** `CoachShowcase` (plank with HUD readouts), `NutritionShowcase` (macros + meals card), and `ProgressShowcase` (30-day calendar + streak) reproduce real in-app UI. A user who installs the app meets the same product.
4. **Reduced-motion handling.** Framer's `useReducedMotion` plus global CSS killswitch is correctly wired — better than most sites at this stage.
5. **The pose-analysis HUD aesthetic.** Mono readouts + scan line + glowing data panels — when used sparingly (e.g. inside the hero coach card), this is the most "owned" visual element on the site.
6. **Edge-rendered OG image.** Real 1200×630 PNG generated from the same brand system; no static asset to keep in sync.
7. **Static + light footprint.** All marketing routes statically generated; 87 KB shared baseline. Solid foundation.

---

## WEAKNESSES — WHAT TO EVOLVE

For each weakness: **Observation → Why it matters → Consequence → Recommendation → Severity.**

### W1. The hero subject is a stylized robot, not the product

- **Observation:** `Hero` uses `/images/pt-form.png` (a stylized CG robot with "Form AI COACH" text on its chest) as the central image. The hero HUD panels (Postür 98/100, Hip alignment 5°) overlay this robot.
- **Why it matters:** The visitor's first 1.5 seconds decide whether they trust the product. A CGI robot reads as **concept art**, not **shipping software**. The app's actual welcome screen (`/screenshots/welcome.jpg`) — the male torso with skeleton overlay reading "HIP ALIGNMENT: 5° DEVIATION" — would prove the product works on day one.
- **Consequence:** Reduces perceived credibility. Sophisticated reviewers (the ICP we want) will discount the marketing because the hero shows a brand asset, not a working feature.
- **Recommendation:** Replace the hero subject with a real in-app demo loop or a single high-fidelity in-app screen, keeping the HUD overlays as legitimate annotations of a real feature.
- **Severity:** **Critical**

### W2. Trust signals are entirely absent

- **Observation:** The site contains zero testimonials, zero app store ratings, zero press logos, zero founder content, no specific user count claim (the "10.000+ kullanıcı" appears only on the original app's paywall screenshot — not as a website claim), no money-back guarantee, no terms/privacy content (only empty anchors), no security/compliance badges beyond an internal "Privacy by build" block.
- **Why it matters:** Premium SaaS reviewers (Linear, Stripe, Superhuman) all anchor on social proof early. The combination "premium-looking site + zero proof" is itself a trust signal — it implies pre-launch / unproven / marketing-only.
- **Consequence:** Conversion ceiling is capped well below the design quality. Visitors who *could* be convinced will instead bounce to read reviews elsewhere, where there is nothing yet.
- **Recommendation:** Add (in priority order) (a) 3-5 named user testimonials with photo + 1-line outcome, (b) app store rating badge once seeded, (c) founder/team strip, (d) "Featured in" press logos, (e) money-back guarantee tag near pricing.
- **Severity:** **Critical**

### W3. CTAs are generic and route to themselves

- **Observation:** Every primary CTA reads "Programını oluştur", "Şimdi başla", "Disiplinimi kur" — all variations of the same. All point to `/baslat`, which contains pricing, install badges with `href="/destek#sss"` (an anchor that points to FAQ, not the App Store), and a waitlist form with `action="https://formspree.io/f/replace"`.
- **Why it matters:** The CTA chain is a Möbius strip. Visitor clicks "Programını oluştur" → arrives on `/baslat` → clicks "App Store" → ends up on the FAQ. This breaks the implicit promise of every CTA.
- **Consequence:** Direct conversion loss. Even visitors with high intent cannot find a place to actually start.
- **Recommendation:** Once apps are live, set real store URLs in `src/lib/site.ts`; until then, the CTA should honestly say *"Bekleme listesine katıl"* and the form should post to a real endpoint. Differentiate CTAs by surface: hero = outcome-specific ("Vücudunu 30 günde test et"), nav = "Beta'ya katıl", end-of-page = "Programını oluştur".
- **Severity:** **High**

### W4. Showcase repetition dilutes the home narrative

- **Observation:** Home flow: Hero → Marquee → **ProductPillars** (teaser of Antrenman/Beslenme/Gelişim) → **CoachShowcase** (Antrenman repeat) → **NutritionShowcase** (Beslenme repeat) → **ProgressShowcase** (Gelişim repeat) → MetricGrid → Manifesto → CTA. Four consecutive sections cover the same three pillars with the same eyebrow-title-body-grid layout.
- **Why it matters:** Reviewer eyes pattern-match. Once the second showcase repeats the structure of the first, the third and fourth get scrolled past. The Manifesto, which is the site's most differentiated content, is buried at position 8 of 9.
- **Consequence:** Lower scroll completion. The site's best ideas (the manifesto, the in-app continuity) get less attention than its filler.
- **Recommendation:** Either (a) remove `ProductPillars` since the three showcases already serve as pillar explanations, or (b) keep `ProductPillars` and compress the three showcases into a single "How it works" with three tabs. Promote Manifesto earlier — it belongs at position 3-4.
- **Severity:** **High**

### W5. No demo, no video, no interactive proof

- **Observation:** Every "proof" is a static screenshot. The only motion in the showcases is the scan line on the plank image. There is no scroll-tied skeleton overlay, no animated pose-tracking demo, no recorded clip of the app in use, no interactive "drag to see form detection" widget.
- **Why it matters:** A product whose entire value proposition is *live computer vision* must show live computer vision on its marketing site. Stripe shows real payment UIs. Linear shows real keyboard interactions. FormAI shows still PNGs of a frozen plank.
- **Consequence:** The single most impressive thing the product does (real-time pose detection at 30 fps) is communicated only as text and HUD overlays on static images.
- **Recommendation:** One looping in-app capture clip (10-15s, muted, autoplay) inside the `CoachShowcase` block. Or: a Canvas-based skeleton overlay that follows cursor position over the plank image, simulating tracking.
- **Severity:** **High**

### W6. Mono labels are overused — 58 instances

- **Observation:** `grep "Mono>" src/` returns 58 hits across 13 files. The `Mono` component appears as an eyebrow on every section, on every stat, inside every HUD panel, inside every pricing card, inside every footer column.
- **Why it matters:** A specialized accent only stays special when scarce. When every section starts with `MONO · LABEL`, the rhythm becomes monotonous and the mono treatment loses its semantic weight (which should be "data readout" or "system tag", not "section label").
- **Consequence:** Sections start to feel formulaic; scrolling rhythm is undifferentiated; the HUD aesthetic is diluted into decoration.
- **Recommendation:** Cap site-wide mono usage at ~15 placements. Reserve to: (a) HUD data overlays, (b) one eyebrow per page hero, (c) footer column titles. Replace other instances with a regular `<span>` in a brand-color uppercase tracking.
- **Severity:** **Medium**

### W7. Hero opens with abstraction

- **Observation:** Hero headline: *"Sahaya çıkan yapay zekâ fitness koçun."* The phrase *"sahaya çıkan"* is a sports metaphor (literally *"taking the field"*). For a visitor who has never heard of FormAI, this requires two cognitive jumps: figure out the metaphor, then map it to value.
- **Why it matters:** Premium hero copy is *immediately specific*. Stripe: "Financial infrastructure for the internet." Linear: "Linear is the new standard for modern software development." Both are 1-step parses. The FormAI hero asks for 2-step parsing before it gives any value.
- **Consequence:** Slows the first 3-second moment that determines bounce.
- **Recommendation:** Test a 1-step hero variant that names the outcome and the mechanism in the same line. Candidate: *"30 günde formuna kavuş. Kameran koçun olsun."* or *"Aynaya bak. AI koçun seni hizalasın."* Move the "sahaya çıkan" metaphor down to the Manifesto where context exists.
- **Severity:** **Medium**

### W8. Three hero PNGs are 1.8-2.0 MB unoptimized

- **Observation:** `du -sh public/images/*.png` reveals `pt-form.png` (2.0 MB), `first-opening.png` (1.9 MB), `pose-analysis.png` (1.8 MB). Total 5.7 MB of unconverted PNGs. Two of them (pose-analysis, pt-form) load on the first viewport.
- **Why it matters:** LCP on the hero image will be capped by network transfer, not by render. On a 4G connection, 2 MB ≈ 800 ms. AVIF/WebP equivalents typically land at 200-400 KB with no perceptible quality loss.
- **Consequence:** Lighthouse LCP score depressed; perceived speed below the premium-SaaS bar.
- **Recommendation:** Convert all three to AVIF + WebP fallback; use `next/image` `placeholder="blur"` with a generated LQIP. Target each under 400 KB.
- **Severity:** **High**

### W9. 13 of 20 images shipped to `public/` are unreferenced

- **Observation:** `grep -ho 'src="/images/[^"]*"' src/` lists 7 distinct image references; `ls public/images/` shows 20 files. 13 webp assets (coach-hero, daily-challenge, gym-bg, custom-plan, plan-sample, personalized-plan, etc.) are shipped but never imported.
- **Why it matters:** Dead static assets bloat the build output, slow `vercel deploy`, and pollute the asset namespace. Worse: they are forfeited inventory — premium imagery sitting unused while the site fakes user-count claims.
- **Consequence:** Wasted bandwidth in deploys; missed storytelling opportunity (some unused assets — "daily-challenge", "transformation-after" — would clearly strengthen `Gelişim`).
- **Recommendation:** Audit and either (a) delete unreferenced assets or (b) integrate the strongest 3-4 into the design (e.g., the gym-bg as a low-opacity hero backdrop; daily-challenge as a `Gelişim` page hero).
- **Severity:** **Medium**

### W10. Mobile experience is unvalidated

- **Observation:** No real-device QA was performed. The build was inspected via HTML curl only. Hero `Hero.tsx` uses `lg:grid-cols-[1.05fr_1fr]` (collapses cleanly), but the absolute-positioned floating HUD panels (`-right-6`, `-left-8`) are hidden on mobile with `hidden lg:block` — meaning two of the three HUDs disappear, the hero collapses to "robot + Postür + Tempo" with no scanner / rep callouts.
- **Why it matters:** Mobile is where most traffic will land (this is a fitness app pre-launch in Turkey). The desktop hero is more informationally rich than the mobile hero — backwards for a mobile-first product.
- **Consequence:** The mobile hero understates the product. Conversion suffers on the highest-traffic surface.
- **Recommendation:** Design a mobile-specific hero arrangement: stack the coach image (taller crop), surface ALL HUD readouts in a horizontal scroller below, and reduce hero headline scale (current `display-2xl clamp(3rem, 7vw, 6.5rem)` can hit 28-32 px on a small phone, fine, but the line breaks may go awkward on the 3-color gradient text).
- **Severity:** **High**

### W11. Hash anchors point to non-existent sections

- **Observation:** Footer links to `/destek#gizlilik`, `/destek#sartlar`, `/destek#kvkk`. The Destek page has FAQ groups with ids `sss`, `antrenman`, `beslenme`, `gelisim`, `guvenlik` — but none of those four legal anchors exist. Store badges on `/baslat` link to `/destek#sss` (FAQ, not stores).
- **Why it matters:** Clicking the privacy policy link → arrives at the top of `/destek`. Looks broken. For a KVKK-regulated product, a non-functional privacy link is a legal exposure, not just UX.
- **Consequence:** Visible legal compliance risk + trust hit when any user actually tries to read the policies.
- **Recommendation:** Add three real pages or three real sections: `/destek/gizlilik`, `/destek/sartlar`, `/destek/kvkk` with actual policy content (not lorem). Fix the store badge `href` once App Store / Play URLs are real.
- **Severity:** **Critical**

### W12. Reveal animations hide content if JS doesn't load

- **Observation:** `Reveal` and `RevealStagger` set `initial="hidden"` (opacity 0, translateY 24px). If JS fails to execute or is disabled, content stays invisible. There is no SSR-safe fallback.
- **Why it matters:** SSR-rendered HTML *should* be visible by default. The "hide-then-reveal" pattern means crawlers see content but failed-JS visitors see blank space.
- **Consequence:** Edge case — but the kind that surfaces in incident logs once.
- **Recommendation:** Use `viewport={{ once: true, amount: 0.2, fallback: true }}` pattern or render unrevealed content with `opacity: 1` and rely on `motion.div` to animate *to* the same state. Alternatively: add a `<noscript>` style that nukes the reveal-hidden state.
- **Severity:** **Low**

### W13. No JSON-LD / structured data

- **Observation:** Metadata is present; `Organization`, `WebSite`, `SoftwareApplication`, and `FAQPage` schema are not. The `/destek` FAQ is a clean candidate for `FAQPage` schema with rich results.
- **Why it matters:** FAQPage rich snippets in Google Search significantly improve CTR for support and informational queries; SoftwareApplication schema gates the app for Google's app rich results.
- **Consequence:** Missed organic-search visibility that costs nothing structurally to add.
- **Recommendation:** Add a `Schema.tsx` component that injects `<script type="application/ld+json">` per page (Organization on layout, FAQPage on /destek, SoftwareApplication on /baslat).
- **Severity:** **Medium**

### W14. Heavy unconditional Framer Motion bundle

- **Observation:** Every page imports from `framer-motion` directly (45 `motion.` references across 14 components). The 53.6 KB FM chunk loads on every route, even pages without scroll reveals.
- **Why it matters:** Pages like `/destek` (a quasi-static FAQ) ship the same FM bundle as the home page. Lighthouse "unused JavaScript" will flag this.
- **Consequence:** Avoidable 50 KB First Load JS on pages that don't need it.
- **Recommendation:** Mark the `Reveal` / `RevealStagger` components `next/dynamic({ ssr: false })`, or replace simple fade-ups with an IntersectionObserver + CSS transitions (custom 200-line solution). Reserve FM for the genuinely interactive pieces (Hero conic ring, Accordion, scan animation).
- **Severity:** **Medium**

### W15. Accessibility — small text and color contrast risk

- **Observation:** Mono labels are `text-[10px]` with `text-violet-300/80` (≈ #B59CFFcc on near-black). Body text widely uses `text-white/65` (≈ rgba(255,255,255,0.65)). Tested informally, the 10 px mono is below WCAG minimum readable size; `text-white/65` on `ink-950` is around 4.5:1 contrast — at the AA boundary for large text, below for body.
- **Why it matters:** Premium SaaS sites pass WCAG AA cleanly. This is both an accessibility and an SEO/reputation factor.
- **Consequence:** Real users with low vision or low-contrast displays will struggle. Lighthouse a11y score will dock.
- **Recommendation:** Raise mono to 11-12 px or reserve to 10 px only when 600+ weight; raise body opacity to 75-80% on dark surfaces; verify with an automated checker.
- **Severity:** **Medium**

### W16. The logotype is generic

- **Observation:** The mark in `src/components/marks/Logo.tsx` is a rounded square + a stylized "F" formed by three white strokes + an accent dot. It reads "modern AI startup" but it doesn't read "FormAI" — any of OpenAI / Linear / Vercel / Notion could swap to a similar mark with no loss of identity.
- **Why it matters:** Logo recognition is a multi-year compounding asset. A generic logo means the brand mark works *with* the wordmark but not *without* it.
- **Consequence:** Lower memorability. App store icon, social avatar, push notification icon all rely on the mark in isolation.
- **Recommendation:** Iterate the mark toward something that owns a single, distinctive visual idea — e.g., a body-axis line + a glow point at a joint, evoking pose detection.
- **Severity:** **Low** (long-term)

---

## MISSED OPPORTUNITIES

Areas where V1 has the foundation in place but doesn't capitalize.

1. **Live skeleton overlay on hover.** The visual identity is "ML pose detection." A simple CSS/Canvas overlay that draws the in-app skeleton on the hero image when the user hovers would *demonstrate* the product, not describe it. Net add: 200 lines, massive identity reinforcement.
2. **A "How it works in 60 seconds" loop.** One looping 10-15 second muted video of the app detecting a real push-up, with HUD overlays appearing on form sapma — would replace four static showcase sections with one undeniable moment.
3. **Comparison section.** "Personal trainer (1500 ₺/saat) vs traditional app (300 ₺/ay) vs FormAI (180 ₺/ay)" with a clear value-per-dollar table. Common premium SaaS pattern (Linear, Notion, Stripe). Currently missing.
4. **A "Why we built this" founder strip.** A two-paragraph note from a real human, with a face. Costs nothing; adds dramatic trust delta on a pre-launch product.
5. **Real user numbers as a marquee replacement.** The current `MarqueeBand` cycles technology terms ("BlazePose ML Kit", "Riverpod 3"). Once the app has users, this should cycle real numbers ("12.847 antrenman analiz edildi", "94% ortalama form skoru").
6. **The `Gelişim` page lacks a charted progression.** It has a streak module and a 30-day calendar, but no actual line chart of "what happens to your form score over 30 days." A simple SVG chart would make the page argument data-driven instead of decorative.
7. **No press kit / brand kit page.** Pre-launch outreach to media is normal; a `/press` or `/brand` page with logos, screenshots in zip, founder bios, would unlock journalist coverage with zero cost.

---

## PRIORITY PROBLEMS

Ranked by **(impact × visibility) / effort**.

1. **Trust layer absent.** [W2] — Highest ROI. Even one founder paragraph + one real user quote moves perception significantly.
2. **Hero subject is a robot, not the product.** [W1] — Highest single-image change.
3. **Hash anchors broken; placeholder URLs everywhere.** [W3, W11] — Launch blocker. Embarrassing if found post-launch.
4. **Hero PNG weights.** [W8] — Pure performance win, no design risk.
5. **Showcase repetition.** [W4] — Restructures the home narrative without new content.
6. **Mobile hero degradation.** [W10] — Risk concentrated on the highest-traffic surface.
7. **No demo / video / interactive proof.** [W5] — Biggest qualitative upgrade if executed well.

---

## LAUNCH BLOCKERS

These must be closed **before** public launch.

| # | Issue | Owner action |
|---|-------|--------------|
| LB1 | Privacy / KVKK / Terms anchors lead nowhere (`/destek#gizlilik` etc.) | Write real policy content. Legal exposure. |
| LB2 | App Store / Play badges link to `/destek#sss` instead of real stores | Set `site.appStoreUrl` + `playStoreUrl`. Update `StoreBadge` references. |
| LB3 | Waitlist form posts to `https://formspree.io/f/replace` | Replace with real endpoint or remove the form. |
| LB4 | No cookie consent banner | KVKK + GDPR requirement once any analytics or cookies are added. |
| LB5 | "10.000+ kişi kullanıyor" implied by Beslenme paywall screenshot, but no actual user-count claim on the website yet | Decide pre-launch: either remove implication or replace screenshot. |
| LB6 | No 404 design verification on every typo route | The `not-found.tsx` exists and is branded — verify it renders for `/foo` in production. |
| LB7 | No real device QA matrix run | Min: iPhone SE, iPhone 14 Pro, Pixel 7, iPad. |

---

## PREMIUM GAPS

Specific deltas vs the benchmark set.

| Benchmark | What they do | What FormAI doesn't |
|---|---|---|
| Apple (apple.com/iphone) | Scroll-driven product cinematography; one product surface per scroll moment | Static sections; no scroll-driven story |
| Stripe (stripe.com) | Dense, data-rich pricing comparison; multi-step interactive demos | Pricing table without comparison; no interactive demos |
| Linear (linear.app) | Live UI replicas embedded in the page (real keyboard navigation works in browser) | Static screenshots only |
| Vercel (vercel.com) | "Deploy in 30 seconds" with an actual git clone-to-live demo | No live product moment |
| Superhuman (superhuman.com) | Aggressive founder + testimonial layer ("the fastest email experience ever made") | No founder, no testimonials |
| Notion (notion.so) | Customer logo strip + outcome stories ("Pixar / Toyota use Notion") | Tech stack strip, no customers |

The pattern: **every benchmark anchors the marketing in real working software + real users.** FormAI V1 anchors in stylized brand assets.

---

## OBSERVED ISSUES

Direct, evidence-based, in the code / output:

- **O1.** `pt-form.png`, `first-opening.png`, `pose-analysis.png` are 1.8-2.0 MB unoptimized PNGs (`du -sh public/images/*.png`).
- **O2.** 58 `<Mono>` instances site-wide (`grep "Mono>"`).
- **O3.** 34 `<GlowOrb>` instances (`grep "GlowOrb"`).
- **O4.** 13 of 20 shipped images are unreferenced (`grep` vs `ls`).
- **O5.** Store badges link to `/destek#sss` (FAQ), not stores (`StoreBadge` calls in `baslat/page.tsx:117-118`).
- **O6.** Waitlist form action: `https://formspree.io/f/replace` (`baslat/page.tsx:205`).
- **O7.** `site.appStoreUrl` and `playStoreUrl` are both `'#'` (`lib/site.ts:10-11`).
- **O8.** Footer links to `/destek#gizlilik`, `/destek#sartlar`, `/destek#kvkk` — none of those ids exist in `destek/page.tsx`.
- **O9.** Hero floating HUD callouts use `hidden lg:block` → invisible on mobile.
- **O10.** Reveal components set `initial="hidden"` → relies on JS to show content.
- **O11.** Two of three big PNGs (pose-analysis, pt-form) load eagerly on the first viewport (home).

---

## HYPOTHESIZED ISSUES

Things plausible but unverified in this audit (need real instrumentation):

- **H1.** LCP likely > 2.5 s on a 4G connection due to hero PNG size. Verify with Lighthouse mobile profile against a Vercel preview deploy.
- **H2.** CLS likely near 0 (all images have explicit dims or `fill` inside fixed-aspect containers), but the conic-ring orbit animation behind the hero may cause layout flashes on slow paint. Verify with `next start` + Web Vitals.
- **H3.** Mono `text-[10px]` and `text-white/65` likely fail WCAG AA on small body. Verify with axe or pa11y.
- **H4.** Framer Motion animation on the 30-day calendar grid (30 cells, staggered) may jank on low-end Android. Verify with throttled CPU profile.
- **H5.** Marquee `animate-ticker` (28s linear translate) repaints continuously even off-screen. Verify with Chrome Performance panel.
- **H6.** The `text-gradient-violet` element uses `animation: gradientShift 12s ease infinite` — always painting. Verify GPU usage on idle.

---

## PRESERVE vs EVOLVE

| Preserve | Evolve |
|---|---|
| Design token system (`tailwind.config.ts`) — keep as the spine. | Hero subject — swap robot for real product / demo. |
| Voice when it lands (Manifesto, Aynaya bakar gibi). | Hero copy — open with outcome, not metaphor. |
| In-app HUD aesthetic — owns the brand. | Frequency of HUD aesthetic — cap to ~15 placements. |
| Edge OG image generator. | Per-page OG variations (current OG is identical site-wide). |
| `useReducedMotion` + global motion killswitch. | `initial="hidden"` reveal pattern — make SSR-safe. |
| Manifesto section content. | Manifesto position — promote earlier in scroll. |
| Static-export performance baseline. | Image payload — convert PNGs to AVIF. |
| Three-tier component model (ui / sections-composable / sections-specialized). | Mono labels and GlowOrbs — diet. |
| FAQ content (real, useful, Turkish). | FAQ schema — add JSON-LD. |
| `not-found.tsx`. | Privacy/KVKK/Terms content — add. |
| Security headers in `vercel.json`. | Add CSP, RUM, analytics-with-consent. |

---

## FINAL AUDIT SUMMARY

**Composite score: 6.2 / 10.** This is a **premium-looking pre-launch site** with **launch blockers**.

V1 succeeds at: visual coherence, design system depth, in-app continuity, technical hygiene.

V1 fails at: trust, conversion mechanics, hero clarity, real-product proof, and basic launch-readiness (broken anchors, placeholder URLs).

The gap to world-class is not aesthetic — it is **substantive**. Apple, Stripe, and Linear succeed not because they look better than competitors (often they look similar) but because every pixel is anchored in a working product with users behind it. V1 of FormAI has the polish but is missing the anchor.

**Answer to "How good is V1?"** → A solid 6.2 / 10. Better than 80% of pre-launch SaaS sites in raw craft; worse than the benchmark set on every credibility axis.

**Answer to "What prevents it from feeling world-class?"** → (1) The hero asks the visitor to imagine the product instead of showing it. (2) Zero social proof. (3) The funnel is a Möbius strip — every CTA loops back to marketing.

**Highest ROI upgrades (top 3, in order):**

1. **Replace the hero subject with real product proof** (a looping in-app capture or the actual welcome-screen skeleton overlay), and rewrite the hero headline to a 1-step parse. *Why:* the hero decides the first 3 seconds and currently it shows a robot.
2. **Ship a trust layer** — one founder paragraph + 3 real user testimonials + an app-store rating once seeded + a money-back tag near pricing. *Why:* moves the trust score from 4/10 to ~7/10 with one PR. Nothing else matters this much.
3. **Close launch blockers** — write real privacy/KVKK/terms content, wire store URLs, replace placeholder form action, add cookie consent. *Why:* without these, the site cannot be public — let alone world-class.

The execution plan is in **`WEBSITE_EVOLUTION_MASTERPLAN.md`**.
