# SESSION HANDOFF — PHASE 4 COMPLETE → PHASE 5

> **Purpose:** durable continuation point for the FormAI website build. Written to survive a full context reset — a future session with **zero conversational memory** must be able to resume safely from this file alone.
> **Written after:** Phase 4 fully shipped (PR 4.1–4.5) + the Phase 4 closure docs.
> **Repo:** `Web-FormAI` (GitHub: `emredogan-cloud/Web-FormAI`), branch `main`.
> **Working dir:** `/home/emre/Downloads/Web-FormAI`
> **Last code commit:** `43c5a6f` — `PR 4.5: real-user monitoring — Vercel Analytics + Speed Insights, consent-gated`. This handoff + `reports/PHASE_4_EXECUTION_REPORT.md` are the **docs-closure commit sitting on top of it**.
> **Tree state:** clean, `main` in sync with `origin/main`.
> **(Filename note:** kept as `SESSION_HANDOFF_PHASE4.md` for pointer stability, but it now covers the **Phase 4→5 boundary**. Next work is Phase 5.)

---

## 1. CURRENT CANONICAL STATE

### Project shape
FormAI Fitness marketing website. Next.js 14.2.18 (App Router) + TypeScript 5.6 + Tailwind 3.4. Turkish-language, dark-neon cinematic aesthetic. Deploys to Vercel. The companion mobile app source lives at `/home/emre/Downloads/FormAI-FitnessKoçu` (Flutter) — used as **ground-truth reference** for product behaviour. Do not modify the app; read-only reference.

### Execution model
7-phase roadmap in `reports/WEBSITE_EVOLUTION_MASTERPLAN.md`, derived from the critique in `reports/WEBSITE_DEEP_REVIEW.md`. Each phase = a set of small sub-PRs. Work proceeds **one sub-PR at a time, stop after each, await approval** (unless the user explicitly authorises a specific multi-step batch).

### Phases — completed vs remaining

| Phase | Title | Status |
|---|---|---|
| Phase 0 | Launch blockers | ✅ COMPLETE (PR 0.1–0.4 + report) |
| Phase 1 | Trust layer | ✅ COMPLETE (PR 1.1–1.6 + report) |
| Phase 2 | Hero + identity | ✅ COMPLETE (PR 2.1–2.3 + report) |
| Phase 3 | Narrative + density | ✅ COMPLETE (PR 3.1–3.5 + report) |
| Micro Polish | 9-PR UX/visual batch (interjected, paused Phase 4 after 4.3) | ✅ COMPLETE (MP.1–MP.9 + closure report) |
| **Phase 4** | Performance + delivery | ✅ **COMPLETE — 4.1 ✅ 4.2 ✅ 4.3 ✅ 4.4 ✅ 4.5 ✅ + `PHASE_4_EXECUTION_REPORT.md`** |
| **Phase 5** | SEO + observability | **🟡 STARTING — 5.1 NEXT (not started). Then 5.2–5.5.** |
| Phase 6 | Signature interactions | ⬜ NOT STARTED (6.1 hero skeleton overlay, 6.2 manifesto parallax, 6.3 live form-score demo, 6.4 badge unlock micro-interaction) |

### EXACT NEXT STEP
**Phase 5 → SUB-PR 5.1 — JSON-LD structured data.** Not yet executed. See §5 for the full brief.

### Phase 5 sub-PR map (from masterplan)
- **5.1** JSON-LD structured data (Organization + WebSite on layout; FAQPage on `/destek`; SoftwareApplication on `/baslat`). ← NEXT
- **5.2** Per-page OG variation (parameterized `opengraph-image`).
- **5.3** Canonical URLs + hreflang (`tr-TR`).
- **5.4** Error tracking (Sentry-or-similar, `beforeSend` consent-gated — mirror the analytics consent posture from 4.5).
- **5.5** Press kit page (`/press`).

### Completed PR ledger (most recent first)
```
<docs>   docs: Phase 4 closure — PHASE_4_EXECUTION_REPORT.md + handoff refresh  ← HEAD (this commit)
43c5a6f  PR 4.5: real-user monitoring — Vercel Analytics + Speed Insights, consent-gated
65b7113  PR 4.4: GPU-friendly background animations — MotionGate viewport pause
e5c4425  docs: Phase 4 session handoff — durable continuation point
8dee878  docs: micro polish closure report (MP.1 → MP.9)
e596361  MP.9: Destek FAQ redesign — pillar-toned accordion, Framer Motion off
aaccf7b  MP.8: Beslenme meal card — macro tiles + coach-note reveal
bbb5820  MP.7: Gelişim badge interaction — what / why / how-earned reveal
e51197d  MP.6: Antrenman Akış pipeline interaction + /baslat APP_ICON swap
871a570  MP.5: pillar color realignment — semantic palette per product surface
c512f31  MP.4: progress transformation clarity — pre-crop + re-encode + audit
57a10c8  MP.3: workout image blur — root cause + q95 re-encode + phone-frame display
82989f3  MP.2: canonical AI-coach image — pt-form.webp single source of truth
52c0912  MP.1: consolidate support email → formaisupport@proton.me
37ba038  PR 4.3: framer motion diet — -36 KB on 4 routes, IO+CSS replaces FM
00b4c1a  PR 4.2: image priority + lazy hints + LQIP placeholders
70d86c3  PR 4.1: image format pass — 3.7 MB shaved from referenced assets
b40b2f0  docs(phase-3): execution report
...      (Phases 0–3 below — see PHASE_X_EXECUTION_REPORT.md per phase)
```

### Routes (9 marketing + utility)
`/` · `/antrenman` · `/beslenme` · `/gelisim` · `/baslat` · `/destek` · `/gizlilik` · `/kvkk` · `/sartlar` (+ `/api/waitlist`, dynamic OG/icon routes, robots, sitemap). All return 200 as of HEAD.

---

## 2. STANDING RULES (NON-NEGOTIABLE)

These persist across all future PRs. Established/hardened across Phases 0–4 + Micro Polish. **Do not violate without explicit user approval.**

1. **NO blurry images anywhere.** Established MP.4 as an explicit hard rule. Every PR that touches imagery performs a secondary visual/blur audit; fix in scope if safe. Root-cause blur (resolution ceiling vs over-compression via bpp density) before re-encoding — see MP.3/MP.4 commits for the method.

2. **No Framer Motion in interactions.** Established PR 4.3, hardened by MP.7/MP.8/MP.9 + the Phase 4 motion doctrine. New interactions use **IntersectionObserver + CSS transitions** (the `grid-rows-[0fr] → [1fr]` reveal + `useIntersect` hook at `@/lib/use-intersect`; `.reveal` classes in globals.css). Framer Motion is allowed ONLY on: `Hero.tsx`, `FaqAccordion.tsx` (auto-height collapse), and the dynamic-imported consent components. Do not reintroduce FM elsewhere. Always-on ambient motion must stay viewport-gated via `MotionGate` (PR 4.4).

3. **Pillar identity color mapping.** Established MP.5, reinforced through MP.9. Sacred:
   - **Antrenman = ember** (`#FF7A1A`)
   - **Beslenme = lime** (`#C8FF00`)
   - **Gelişim = violet** (`#7C5CFF`)
   - **Güvenlik / Trust = scan** (`#1FCFFF`)
   - Macro tile convention (from the app, used on /beslenme): Protein=scan, Karb=ember, Yağ=lime, Calories=violet.
   No new color tokens.

4. **Mobile + desktop parity.** Every interaction ships with `:focus-within` mirroring `:hover` so touch users get equivalent behaviour. Mobile-first discipline throughout. Never ship a hover-only state inaccessible to touch.

5. **Single source of truth.** Site-wide config lives in `src/lib/site.ts` (support email = `formaisupport@proton.me` via `site.team.contact.email`; store URLs; beta/ratings/userCount config blocks). Per-page data arrays (meals, badges, faq, faqGroupTone) are the single source for their surface. Never hardcode a value that has a config home. **For 5.1: schema must draw from these same sources (e.g. FAQPage from the `/destek` faq data, Organization from `site.ts`) — do not duplicate strings.**

6. **Validation discipline.** Every PR ends GREEN: `npx next build` clean + `npx next lint --max-warnings 0` clean + all 9 routes return 200. No exceptions. For UI/motion, also smoke-test in a running server; if a real browser can't be driven, **say so explicitly**. **Server hygiene: kill smoke-test servers PORT-SCOPED (`pkill -f "next start -p <port>"` or by PID), never a blanket `pkill -f next-server` — that can hit unrelated projects' dev servers (learned in 4.5).**

7. **Truthful-content policy.** No fabricated quotes, ratings, founder bios, credentials, or user counts. Trust elements are config-gated to swap in real data when available. **For 5.1 this is critical: NO `aggregateRating`, NO `review`, NO fake `ratingValue`/`reviewCount` in any schema. Only emit structured data for facts that are actually true and present on the page. No SEO theater.**

8. **Premium aesthetic + dark neon palette preserved.** Don't flatten the identity for perf or simplicity. Efficient ≠ static.

---

## 3. LATEST SHIPPED STATE (Phase 4 — complete through PR 4.5)

Full detail in `reports/PHASE_4_EXECUTION_REPORT.md`. Compact recap:

- **4.1** Image format pass — `sharp` converter (`npm run optimize-images`); ~6 MB off deploy weight; LCP image 44 KB AVIF; `public/` images ~2 MB. **W8 closed.**
- **4.2** Priority/lazy hints + LQIP — audit-first; `CtaBlock` `sizes` fix; LQIP pipeline (`npm run lqip` → `src/lib/image-lqip.ts`); ~945 B blur-up for 3 above-fold images; 1 preload on home only.
- **4.3** Framer Motion diet — **−34 to −36 KB First Load JS** on the 4 pillar/conversion routes. `useIntersect` hook + `.reveal` CSS replaced FM; FM reserved for `Hero`/`FaqAccordion`/dynamic consent UI. **W14 closed.**
- **4.4** GPU-friendly bg animations — shared `MotionGate` IO pauses ambient motion off-screen (dominant cost was `text-gradient-violet` ×30 repaints). Identity preserved; `prefers-reduced-motion`/`-data` honoured.
- **4.5** Real-User Monitoring — `@vercel/analytics` + `@vercel/speed-insights`, consent-gated via `src/components/util/ConsentedAnalytics.tsx` (renders both only when **`useConsent().state?.analytics === true`** — note the read path is `.state?.analytics`, NOT a top-level `.analytics`), dynamic-imported `ssr:false` in layout. Default-deny; DNT enforced upstream; 0 beacons pre-consent verified.

### Open items carried forward (low risk, owner-actionable)
- **Lighthouse ≥ 95 / 4G LCP < 2 s unconfirmed** — needs a real-device Lighthouse run. Code targets it; not proven.
- **4.4 scroll-pause + 4.5 opt-in beacon not eyeballed** in a real browser (no headless browser available these sessions). Verified statically + at HTTP level.
- **Vercel dashboard:** Analytics + Speed Insights must be toggled ON for post-deploy data (no code).
- **Pre-existing `npm audit` advisories** (unrelated to the analytics packages) — future dependency pass.

---

## 4. REPO + EXECUTION PROTOCOL

This is the working contract the user enforces. Follow it exactly.

### Before every sub-PR
1. **Re-read the canon docs**: `reports/WEBSITE_EVOLUTION_MASTERPLAN.md` (the PR's spec) + `reports/WEBSITE_DEEP_REVIEW.md` (the rationale) + the relevant prior phase/closure report. Do this every time — do not work from memory.
2. Re-read this handoff + §2 standing rules.

### During
3. **One sub-PR boundary at a time.** Never batch multiple PRs. Never silently bundle scope. If a paired/batched pass is explicitly requested (e.g. "Phase 4 closure + 5.1 ONLY"), do exactly that and nothing more.
4. **Physical work only.** Real code changes, no theory-only deliverables.
5. **No speculative redesign.** Don't add features/abstractions/refactors beyond the PR's scope.
6. **Standing-rule compliance** (§2) on every change, including the per-PR blur audit when imagery is touched.

### Closing every sub-PR
7. **Validate**: `npx next build` clean → `npx next lint --max-warnings 0` clean → all 9 routes 200. Smoke-test UI on a running server; kill the server PORT-SCOPED after.
8. **Commit** with a detailed HEREDOC message (what + why + audit + validation + manual-input). Co-author trailer: `Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>`.
9. **Push** to `origin/main` always.
10. **STOP. Report. Await approval.** Do not auto-continue unless the user pre-authorised the next step.

### Report format (per sub-PR)
Numbered: 1. What changed · 2. Files changed · 3. (Research/audit findings) · 4. Interaction/motion logic · 5. Blur audit findings · 6. Validation · 7. Commit + push · 8. Manual input needed. End with an explicit **🛑 stop line** naming the next awaited task.

### Phase reports
After a FULL phase completes (not per sub-PR), generate `reports/PHASE_X_EXECUTION_REPORT.md`. Done: Phases 0–4 + Micro Polish. **Phase 5 will need `PHASE_5_EXECUTION_REPORT.md` once 5.5 ships.**

### Docs commits
Documentation closure (phase reports, handoff refreshes) is committed **separately from code** — no code changes mixed into a docs commit, and vice-versa.

---

## 5. CONTINUATION INSTRUCTION

> ### NEXT TASK: PHASE 5 — SUB-PR 5.1 (JSON-LD structured data)
> **If resuming cold: do not start without the user's go-ahead. (In the session that wrote this, 5.1 was authorised to run immediately after the Phase 4 docs push.)**

### PR 5.1 brief (from masterplan)
- **Action:** Add a `<Schema>` component injecting `application/ld+json`:
  - `Organization` — root layout
  - `WebSite` (with site-search potential) — root layout
  - `FAQPage` — `/destek`, auto-generated from the page's faq data
  - `SoftwareApplication` — `/baslat`
- **Touches:** new `src/components/Schema.tsx` (or `components/util/`), `src/app/layout.tsx`, `src/app/destek/page.tsx`, `src/app/baslat/page.tsx`.
- **Effort:** M.

### Hard constraints for 5.1 (from the user + standing rules)
- **Audit before adding.** Only emit schema that is **truthful, supported by on-page content, and maintainable**. Add `Breadcrumb` only where genuinely justified.
- **NO fake ratings / reviews / `aggregateRating`** — the product is pre-launch with no real testimonials (Standing Rule #7). No SEO theater.
- **Prefer layout-level, shared, maintainable.** Drive schema from existing single-source data (`site.ts`, the faq array) — do not duplicate strings (Standing Rule #5).
- **Validate:** JSON-LD correctness (valid `@context`/`@type`, parseable), build, lint, 9 routes 200, and confirm the `ld+json` actually renders in the served HTML.

### After 5.1
- STOP and await approval (next: PR 5.2 — per-page OG variation).
- Phase 5 closes after 5.5 → then generate `reports/PHASE_5_EXECUTION_REPORT.md`.

---

## 6. FINAL OPERATOR NOTE

A future session may have **zero memory of this conversation**. To resume safely:

1. **Read this file first**, then `reports/WEBSITE_EVOLUTION_MASTERPLAN.md` (Phase 5 section) + `reports/PHASE_4_EXECUTION_REPORT.md`.
2. Confirm git state: `git log --oneline | head -5` should show the Phase 4 docs-closure commit at/near HEAD on top of `43c5a6f` (PR 4.5), tree clean, `main` synced.
3. Internalise §2 standing rules — non-negotiable, not all derivable from code. **Note especially #7 for 5.1: truthful schema only.**
4. Internalise §4 protocol — one-PR-at-a-time, stop-and-await, commit+push-always. Never auto-advance unless explicitly pre-authorised.
5. The next task is **Phase 5 PR 5.1** (§5).
6. When in doubt about scope, ask — the user prefers a clarifying question over speculative work.

**— Handoff refreshed at Phase 4 closure (on top of commit `43c5a6f`). Resume point: Phase 5, PR 5.1 (JSON-LD).**
