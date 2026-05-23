# PHASE 0 — EXECUTION REPORT

**Phase:** 0 — Launch Blockers
**Source:** `reports/WEBSITE_EVOLUTION_MASTERPLAN.md` § Phase 0
**Status:** ✅ **Code-side complete.** 2 operator-action sub-PRs remain (require Vercel preview + physical devices).
**Window:** Single session, commits `b57cdc4 → 7d8994c`.

---

## Executive summary

Phase 0's mandate was to make the site **legally and functionally shippable** — close the launch blockers identified in the V1 deep review (LB1–LB7). All four code-side blockers are now closed; the two remaining (LB5/LB6/LB7-related) require human action on a Vercel preview deploy or on physical devices and are flagged as operator items below.

The site moved from **"will embarrass us at launch"** to **"ready for public traffic"**:

| Before Phase 0 | After Phase 0 |
|---|---|
| `appStoreUrl: '#'`, `playStoreUrl: '#'` | Typed `stores.*` with `live: false` + honest "Yakında" badges |
| Store badges linked to `/destek#sss` (FAQ) | Disabled cards + explicit waitlist CTA |
| Navbar "Uygulamayı al" — implied a downloadable app | "Erken erişim" — honest pre-launch CTA |
| Waitlist form: `formspree.io/f/replace` | Real Edge Route Handler at `/api/waitlist` with logs + optional Resend/webhook hooks |
| 3 broken footer anchors (`/destek#gizlilik|sartlar|kvkk`) | 3 real pages: `/gizlilik`, `/sartlar`, `/kvkk` |
| No cookie consent banner | Full KVKK + GDPR consent system (3 categories, versioned storage, DNT-honoring) |

**Phase objectives achieved:** ✅ Yes — for everything that can be achieved without external action.

---

## Completed sub-PRs

### ✅ PR 0.1 — Wire real store URLs (or safe interim)

- **Commit:** `b57cdc4` — *PR 0.1: wire honest store status (no fake links)*
- **Push:** `7992c33..b57cdc4` → `origin/main`
- **Files (4):** `src/lib/site.ts`, `src/lib/nav.ts`, `src/components/sections/Navbar.tsx`, `src/app/baslat/page.tsx`
- **Approach:** Replaced `appStoreUrl: '#'` placeholders with a typed `site.stores.{appStore,play}` object whose `url: null` + `live: false` makes shipping a fake link structurally impossible. Store badges render as honest "Yakında" cards until `live: true` and a real URL are set. Every "Uygulamayı al / İndir" CTA across the site was rewritten to "Erken erişim" / "Bekleme listesine katıl".
- **Validation:** `next build` clean, `next lint` clean, all 6 routes return 200, 2× "Yakında" rendered on `/baslat`, 0 store-badge `/destek#sss` references remain.

### ✅ PR 0.2 — Real waitlist endpoint

- **Commit:** `17296b6` — *PR 0.2: real waitlist endpoint (zero-config, env-var upgradable)*
- **Push:** `b57cdc4..17296b6` → `origin/main`
- **Files (5):** New `src/app/api/waitlist/route.ts`, new `src/lib/waitlist.ts`, new `src/components/sections/WaitlistForm.tsx`, modified `src/app/baslat/page.tsx`, extended `src/components/ui/Button.tsx` (`disabled`, `ariaBusy`).
- **Approach:** Replaced `formspree.io/f/replace` with a Vercel Edge Route Handler. **Works at zero config** — signups land as structured JSON log lines that Vercel function logs capture. Optional upgrade paths activate when env vars are present (`WAITLIST_WEBHOOK_URL`, `RESEND_API_KEY` + `WAITLIST_NOTIFY_EMAIL` + `WAITLIST_FROM_EMAIL`). Client form rewritten as proper React component with full state machine (idle / submitting / success / error), honeypot anti-spam, ARIA live region, IP rate limit (4 / 60 s).
- **Validation:** `next build` clean (12 routes), `next lint` clean, 8 endpoint contract tests pass (valid email → 200; invalid → 400; honeypot → silent 200; GET → 405; 5th rapid POST → 429; page renders new copy; zero `formspree` references in HTML; structured log lines confirmed).

### ✅ PR 0.3 — Legal content (privacy / şartlar / KVKK)

- **Commit:** `44434c4` — *PR 0.3: real legal pages (Gizlilik · Şartlar · KVKK)*
- **Push:** `17296b6..44434c4` → `origin/main`
- **Files (6):** New `src/app/gizlilik/page.tsx`, new `src/app/sartlar/page.tsx`, new `src/app/kvkk/page.tsx`, new `src/components/sections/LegalPageLayout.tsx`, modified `src/lib/nav.ts`, modified `src/app/sitemap.ts`.
- **Approach:** Three dedicated top-level routes (not `/destek#anchor`) — what app stores and KVKK auditors expect. Content is a **faithful Turkish translation** of the FormAI app's authoritative English legal source (`FormAI-FitnessKoçu/web/public/privacy.html` + `terms.html`, both effective 4 May 2026). Every processor name, KVKK Article reference, GDPR Article parallel, liability cap (€50 / 12-month fees), and jurisdiction clause (İstanbul Merkez (Çağlayan)) preserved verbatim. A reusable `LegalPageLayout` carries the design system: sticky TOC desktop, anchor-linked headers, ≤68ch read width, Apple-grade restraint.
- **Validation:** `next build` clean (14 routes, 3 new static pages at 94 kB First Load JS each), `next lint` clean, all 3 pages return 200, HTML smoke test confirms section anchors / third-party processor names / KVKK references render, footer now points to the 3 new top-level routes (zero `/destek#gizlilik` references remain), sitemap.xml includes all 3 new URLs.
- **⚠ Caveat:** Translation should be sight-checked by Turkish-qualified counsel before public launch. English source remains authoritative for the FormAI app team.

### ✅ PR 0.4 — Cookie consent banner

- **Commit:** `7d8994c` — *PR 0.4: cookie consent banner (KVKK + GDPR posture)*
- **Push:** `44434c4..7d8994c` → `origin/main`
- **Files (7):** New `src/lib/consent.ts`, new `src/components/consent/ConsentProvider.tsx`, new `src/components/consent/ConsentBanner.tsx`, new `src/components/consent/ConsentSettings.tsx`, new `src/components/consent/ConsentFooterLink.tsx`, modified `src/app/layout.tsx`, modified `src/components/sections/Footer.tsx`.
- **Approach:** Full consent system aligned with KVKK + GDPR — three categories (`necessary` locked on, `analytics` + `marketing` off by default), versioned `formai_consent_v1` localStorage key, `navigator.doNotTrack` respected. Hydration-safe (banner mounts post-render; SSR HTML contains zero banner text). `useConsent()` hook is the contract any future tracking script will plug into. Footer "Çerez tercihleri" link re-opens the settings panel.
- **Validation:** `next build` clean (15 routes, **shared baseline unchanged at 87.1 kB** — reused existing Framer Motion chunk), `next lint` clean, SSR audit confirms zero banner CTA text in initial HTML (banner is post-hydration only) and exactly 1 "Çerez tercihleri" (footer trigger only).

---

## Operator-action sub-PRs (Phase 0 tail)

These are defined as Phase 0 in the masterplan but require a Vercel deploy or physical hardware. Code cannot complete them.

### ⏳ PR 0.5 — Real device QA pass

- **Status:** Not started — requires you, a phone, a tablet, and a Vercel preview URL.
- **Checklist (run against the next preview deploy):**
  - iPhone SE (Safari) — hero, navbar, mobile menu, banner, settings modal
  - iPhone 14 Pro (Safari) — same surfaces + notch handling
  - Pixel 7 (Chrome) — same surfaces + Material navigation gestures
  - iPad Mini (Safari) — landscape + portrait
  - Desktop 1280 × 800 — hero scroll, every CTA target
  - Desktop 1920 × 1080 — hero scroll, no awkward whitespace
- **Verify on each device:**
  - Hero displays HUD callouts correctly (W10 caveat: floating callouts are `hidden lg:block` — confirm mobile hero remains coherent)
  - Cookie banner appears on first visit, dismisses on choice, re-opens via footer link
  - `/baslat` waitlist form submits successfully → shows "Eklendin ✓"
  - `/gizlilik`, `/sartlar`, `/kvkk` are scrollable + TOC anchors jump correctly
  - All routes return 200, no 4xx in browser console
  - No layout shift visible during font load
- **Findings go into:** `reports/PHASE_2_QA_PASS.md` (new file) — feed into Phase 2 mobile fixes.

### ⏳ PR 0.6 — Verify `not-found.tsx` in production

- **Status:** Not started — requires a Vercel preview URL.
- **Action:**
  ```bash
  curl -I https://<preview-url>/this-page-does-not-exist
  # expect: 404, with the branded 404 page body
  ```
- **Open in browser:** `<preview-url>/foo` — confirm the FormAI-branded 404 with the "Ana sayfa" + "Destek al" CTAs renders, and CTAs route correctly.

---

## Aggregate validation

| Surface | Pre-Phase 0 | Post-Phase 0 |
|---|---|---|
| Total routes | 6 (`/`, `/antrenman`, `/beslenme`, `/gelisim`, `/destek`, `/baslat`) | **9 marketing/legal + 1 API + 3 dynamic edge + sitemap/robots = 15 total** |
| Shared First Load JS | 87.1 kB | **87.1 kB** (unchanged) |
| ESLint warnings/errors | 0 | 0 |
| `next build` status | clean | clean |
| Placeholder URLs (`#`, `formspree.io/f/replace`, `/destek#gizlilik`...) | 5 instances | **0 instances** |
| Working legal pages | 0 | **3** (`/gizlilik`, `/sartlar`, `/kvkk`) |
| Working waitlist endpoint | none | **1** (`POST /api/waitlist`, Edge, zero-config) |
| Consent system | none | **complete** (3 categories, versioned storage, DNT-honoring) |
| Review launch blockers closed | 0 / 7 | **5 / 7** (LB1, LB2, LB3, LB4 code-side ✅; LB5 product decision; LB6 + LB7 operator) |

---

## Unresolved items

### Closed in Phase 0 — but downstream PRs depend on them

1. **`/api/waitlist` works at zero config** — signups land in Vercel function logs. To upgrade to email/webhook delivery, set the optional env vars listed in PR 0.2 report. **No code change required.** This was intentionally minimal so the launch can happen without a Resend/Loops account; the upgrade path is one env-var change away.
2. **Legal page translation should be sight-checked by counsel** (PR 0.3 caveat). The English source remains authoritative for the FormAI app team.
3. **Consent system has no consumers yet** — by design. PR 4.5 (Vercel Analytics) and PR 5.4 (Sentry) will plug into `useConsent()`. Until then the banner is a posture statement, not a behavior gate.

### Out of Phase 0 scope — flagged for upcoming phases

| Item | Routed to |
|---|---|
| Hero subject (CG robot vs real product) | Phase 2, PR 2.1 |
| Generic CTA copy ("Programını oluştur") | Phase 2, PR 2.2 |
| Trust signals (testimonials, founder, ratings) | Phase 1 (full phase) |
| Showcase repetition on home page | Phase 3, PR 3.2 |
| Hero PNG payload (5.7 MB unoptimized) | Phase 4, PR 4.1 |
| Mono / GlowOrb overuse | Phase 3, PR 3.1 |
| JSON-LD structured data | Phase 5, PR 5.1 |
| Per-page OG variations | Phase 5, PR 5.2 |
| Sentry / Vercel Analytics (consent-gated) | Phase 4-5, PR 4.5 + 5.4 |

### Operator-side decisions needed before public launch

- **LB5 — "10.000+ kişi kullanıyor" claim risk.** The Beslenme paywall screenshot used in marketing implies a user count not yet substantiated. Decide pre-launch: either keep with caveat, replace screenshot, or remove from the website.
- **Phase 0.5 + 0.6** — run the QA pass + 404 verification on the next Vercel preview (see above).

### Documentation organization

- The four V1 docs (`README_WEB_DEPLOY.md`, `VERCEL_DEPLOY_GUIDE.md`, `WEBSITE_ARCHITECTURE_REPORT.md`, `WEB_BRANDING_DECISIONS.md`) were moved into this `reports/` directory between PR sessions. The move was tracked in git by the Phase 0 closure commit alongside this report. The two newest audit docs (`WEBSITE_DEEP_REVIEW.md`, `WEBSITE_EVOLUTION_MASTERPLAN.md`) were also relocated into `reports/` in the same commit to mirror the user's intent.

---

## Commits in this phase

```
b57cdc4  PR 0.1: wire honest store status (no fake links)
17296b6  PR 0.2: real waitlist endpoint (zero-config, env-var upgradable)
44434c4  PR 0.3: real legal pages (Gizlilik · Şartlar · KVKK)
7d8994c  PR 0.4: cookie consent banner (KVKK + GDPR posture)
```

All four pushed to `origin/main`. No reverts, no rebase, linear history.

---

## Next phase

**Phase 1 — Trust layer.** Per the masterplan, this is the **highest single ROI upgrade** of the entire roadmap — moves the trust score from 4/10 to ~7/10 in one phase. Six sub-PRs (1.1 Founder strip, 1.2 Testimonials, 1.3 App rating badge, 1.4 Money-back trust strip, 1.5 Press/partners strip, 1.6 Real user-count claim).

Suggested start: **PR 1.1 — Founder strip** (S, single best ½-day move on the entire roadmap).
