# SESSION HANDOFF — PHASE 4

> **Purpose:** durable continuation point for the FormAI website build. Written to survive a full context reset — a future session with **zero conversational memory** must be able to resume safely from this file alone.
> **Written after:** PR 4.4 shipped + approved.
> **Repo:** `Web-FormAI` (GitHub: `emredogan-cloud/Web-FormAI`), branch `main`.
> **Working dir:** `/home/emre/Downloads/Web-FormAI`
> **Last commit at handoff:** `65b7113` — `PR 4.4: GPU-friendly background animations — MotionGate viewport pause`
> **Tree state:** clean, `main` in sync with `origin/main`.

---

## 1. CURRENT CANONICAL STATE

### Project shape
FormAI Fitness marketing website. Next.js 14.2.18 (App Router) + TypeScript 5.6 + Tailwind 3.4. Turkish-language, dark-neon cinematic aesthetic. Deploys to Vercel. The companion mobile app source lives at `/home/emre/Downloads/FormAI-FitnessKoçu` (Flutter) — used as **ground-truth reference** for product behaviour (e.g. MP.8 mirrored its nutrition screens). Do not modify the app; read-only reference.

### Execution model
The build follows a 7-phase roadmap defined in `reports/WEBSITE_EVOLUTION_MASTERPLAN.md`, derived from the critique in `reports/WEBSITE_DEEP_REVIEW.md`. Each phase = a set of small sub-PRs. Work proceeds **one sub-PR at a time, stop after each, await approval**.

### Phases — completed vs remaining

| Phase | Title | Status |
|---|---|---|
| Phase 0 | Launch blockers | ✅ COMPLETE (PR 0.1–0.4 + report) |
| Phase 1 | Trust layer | ✅ COMPLETE (PR 1.1–1.6 + report) |
| Phase 2 | Hero + identity | ✅ COMPLETE (PR 2.1–2.3 + report) |
| Phase 3 | Narrative + density | ✅ COMPLETE (PR 3.1–3.5 + report) |
| **Micro Polish** | 9-PR UX/visual batch (interjected, paused Phase 4 after 4.3) | ✅ COMPLETE (MP.1–MP.9 + closure report) |
| **Phase 4** | Performance + delivery | **🟡 IN PROGRESS — 4.1 ✅ 4.2 ✅ 4.3 ✅ 4.4 ✅ → 4.5 NEXT (not started)** |
| Phase 5 | SEO + observability | ⬜ NOT STARTED (5.1 JSON-LD, 5.2 per-page OG, 5.3 canonical+hreflang, 5.4 error tracking, 5.5 press kit) |
| Phase 6 | Signature interactions | ⬜ NOT STARTED (6.1 hero skeleton overlay, 6.2 manifesto parallax, 6.3 live form-score demo, 6.4 badge unlock micro-interaction) |

### EXACT NEXT STEP
**Phase 4 → SUB-PR 4.5 — Real-User Monitoring.** Not yet executed. See §5 for the full brief.

### Completed PR ledger (commit → title)
```
65b7113  PR 4.4: GPU-friendly background animations — MotionGate viewport pause   ← HEAD
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
11b3ae8  docs: micro polish execution plan (9 sub-PRs, sequenced)
37ba038  PR 4.3: framer motion diet — -36 KB on 4 routes, IO+CSS replaces FM
00b4c1a  PR 4.2: image priority + lazy hints + LQIP placeholders
70d86c3  PR 4.1: image format pass — 3.7 MB shaved from referenced assets
b40b2f0  docs(phase-3): execution report
0c14ee6  PR 3.5: asset audit — delete 8 unreferenced images + 1 orphan component
75ffeb8  PR 3.4: gelişim charted progression — pure-SVG SparkChart
86edafb  PR 3.3: section variance — 2 layout breakers added to home
02031de  PR 3.2: home flow restructure — replace 3 showcases with 1 HowItWorks
27f5618  PR 3.1: mono + glow diet — codify Eyebrow as the section primitive
041cb65  docs(phase-2): execution report
ade88da  PR 2.3: mobile hero — surface all 4 HUD readouts on phones
04ff6e9  PR 2.2: hero headline rewrite — 1-step parse
c0d6de5  PR 2.1: replace hero subject with real product proof
9268a06  docs(phase-1): execution report
ac38c9a  PR 1.6: real user-count claim with caveat (config-gated swap)
cb592ee  PR 1.5: marquee press-mode ready (6 strongest tech facts)
00a3b0d  PR 1.4: pricing trust strip (3 verifiable promises)
df45776  PR 1.3: app-store rating badge (gated by real data)
5f4d31d  PR 1.2: testimonial section (truthful + upgrade-ready)
7f4baa4  PR 1.1: founder / human trust strip (truthful anonymous-craft)
8ca3943  docs(phase-0): execution report + adopt reports/ relocation
7d8994c  PR 0.4: cookie consent banner (KVKK + GDPR posture)
44434c4  PR 0.3: real legal pages (Gizlilik · Şartlar · KVKK)
17296b6  PR 0.2: real waitlist endpoint (zero-config, env-var upgradable)
b57cdc4  PR 0.1: wire honest store status (no fake links)
7992c33  feat: build FormAI production website
ea93cc3  first commit
```

### Routes (9 marketing + utility)
`/` · `/antrenman` · `/beslenme` · `/gelisim` · `/baslat` · `/destek` · `/gizlilik` · `/kvkk` · `/sartlar` (+ `/api/waitlist`, dynamic OG/icon routes, robots, sitemap). All return 200 as of HEAD.

---

## 2. STANDING RULES (NON-NEGOTIABLE)

These persist across all future PRs. Established/hardened across Phases 0–4 + Micro Polish. **Do not violate without explicit user approval.**

1. **NO blurry images anywhere.** Established MP.4 as an explicit hard rule. Every PR that touches imagery performs a secondary visual/blur audit; fix in scope if safe. Premium visual sharpness is mandatory. Root-cause blur (resolution ceiling vs over-compression) before re-encoding — see MP.3/MP.4 commits for the bpp-density method.

2. **No Framer Motion in interactions.** Established PR 4.3, hardened by MP.7/MP.8/MP.9. New interactions use **IntersectionObserver + CSS transitions** (the `grid-rows-[0fr] → [1fr]` reveal pattern + `useIntersect` hook at `@/lib/use-intersect`). Framer Motion is allowed ONLY on: `Hero.tsx` and the dynamic-imported consent components (`ConsentBanner`, `ConsentSettings`). Do not reintroduce FM elsewhere.

3. **Pillar identity color mapping.** Established MP.5, reinforced through MP.9. Sacred:
   - **Antrenman = ember** (`#FF7A1A`)
   - **Beslenme = lime** (`#C8FF00`)
   - **Gelişim = violet** (`#7C5CFF`)
   - **Güvenlik / Trust = scan** (`#1FCFFF`)
   - Macro tile convention (from the app, used on /beslenme): Protein=scan, Karb=ember, Yağ=lime, Calories=violet.
   Any new product surface must respect these. No new color tokens.

4. **Mobile + desktop parity.** Every interaction ships with `:focus-within` mirroring `:hover` so touch users get equivalent behaviour. Mobile-first discipline throughout. Never ship a hover-only state inaccessible to touch.

5. **Single source of truth.** Site-wide config lives in `src/lib/site.ts` (support email = `formaisupport@proton.me` via `site.team.contact.email`; store URLs; beta/ratings/userCount config blocks). Per-page data arrays (meals, badges, faq, faqGroupTone) are the single source for their surface. Never hardcode a value that has a config home.

6. **Validation discipline.** Every PR ends GREEN: `npx next build` clean + `npx next lint --max-warnings 0` clean + all 9 routes return 200. No exceptions. For UI/motion, also smoke-test in a running server; if a real browser can't be driven, **say so explicitly** rather than claiming visual success.

7. **Truthful-content policy.** No fabricated quotes, ratings, founder bios, credentials, or user counts. Trust elements are config-gated to swap in real data when available (see PR 1.2/1.3/1.6). Copy describes real product behaviour only.

8. **Premium aesthetic + dark neon palette preserved.** Don't flatten the identity for perf or simplicity. Efficient ≠ static.

---

## 3. LATEST SHIPPED STATE (PR 4.4)

### Summary
GPU-friendly background animations. A single shared `IntersectionObserver` (`MotionGate`) pauses the site's infinite ambient animations when their host scrolls off-viewport, resuming on scroll-back. No animation removed/recolored/slowed — on-screen motion is identical; only off-screen timelines freeze.

### Files touched
- **NEW** `src/components/util/MotionGate.tsx` — the shared observer (client component, renders null, mounted once in layout, re-scans on `usePathname()` change).
- `src/app/layout.tsx` — import + mount `<MotionGate />`.
- `src/app/globals.css` — `[data-motion-paused]` pause hook (animation-play-state: paused, + Akış descendant rule) + `.conic-ring` `will-change: transform` with off-screen `will-change: auto` release.

### Perf / motion findings (audit recorded in the commit body)
- **Dominant waste = `text-gradient-violet`** (gradientShift 12s, ~30 instances): animates `background-position` → NOT GPU-composited → repaints every frame, on/off screen. Now viewport-gated (most instances are below fold).
- GPU-composited but always-on: `animate-orbit` (Hero conic ring), `animate-ticker` (marquee), `animate-scan` (scan line), `akis-pulse`/`akis-dot-ping` (Antrenman Akış). All gated.
- Tiny `animate-pulse`/`animate-ping` status dots: **deliberately left ungated** (cheap, ~8px; observer overhead would exceed the saving).
- `GlowOrb`: static (no animation) but carries `will-change-transform` — **kept** as justified blur-layer caching.
- `float` + `pulse-glow` keyframes in `tailwind.config.ts`: **dead/unused**; JIT already excludes them (zero output cost). Left in place (removing = churn, no gain).
- Honoured: `prefers-reduced-motion` (gate no-ops; global CSS killswitch already zeroes durations), `prefers-reduced-data` (freeze all permanently), no-IO fallback (animations run as before).

### Unresolved / open items
- **Visual scroll-pause not eyeballed in a real browser.** Build/bundle/CSS/SSR/logic verified statically + server runs clean, but the live pause/resume on scroll was NOT watched in a browser (no headless browser available this session). Recommend a manual scroll check on `/antrenman` (Akış cards) + `/` (hero ring) at some point. Low risk — logic is simple and bundle-verified.
- **Optional future layer-budget pass** (NOT scheduled): the static `GlowOrb` will-change layers and the dead `float`/`pulse-glow` keyframes are documented candidates for a dedicated cleanup if ever desired. Intentionally out of 4.4 scope.

---

## 4. REPO + EXECUTION PROTOCOL

This is the working contract the user enforces. Follow it exactly.

### Before every sub-PR
1. **Re-read the canon docs**: `reports/WEBSITE_EVOLUTION_MASTERPLAN.md` (the PR's spec) + `reports/WEBSITE_DEEP_REVIEW.md` (the rationale) + the relevant prior phase/closure report. Do this every time — do not work from memory.
2. Re-read this handoff + §2 standing rules.

### During
3. **One sub-PR boundary at a time.** Never batch multiple PRs. Never silently bundle scope. If a paired pass is requested (e.g. "MP.6 + MP.7 ONLY"), do exactly that pair and nothing more.
4. **Physical work only.** Real code changes, no theory-only deliverables. Implement what the PR specifies.
5. **No speculative redesign.** Don't add features/abstractions/refactors beyond the PR's scope. No "while I'm here" cleanup unless it's the explicit task.
6. **Standing-rule compliance** (§2) on every change, including the per-PR blur audit when imagery is touched.

### Closing every sub-PR
7. **Validate**: `npx next build` clean → `npx next lint --max-warnings 0` clean → all 9 routes 200. Smoke-test UI on a running server (`npx next start -p <port>`); kill the server after.
8. **Commit** with a detailed HEREDOC message (what + why + audit + validation + manual-input). Co-author trailer: `Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>`.
9. **Push** to `origin/main` always.
10. **STOP. Report. Await approval.** Do not auto-continue to the next PR.

### Report format (per sub-PR)
The user expects a structured report. Typical sections:
1. What changed · 2. Files changed · 3. (Research findings, when research-led) · 4. Interaction/motion logic · 5. Blur audit findings · 6. Validation · 7. Commit + push · 8. Manual input needed.
End with an explicit **🛑 stop line** naming the next awaited task.

### Phase reports
After a FULL phase completes (not per sub-PR), generate `reports/PHASE_X_EXECUTION_REPORT.md`. Micro Polish got `reports/MICRO_POLISH_EXECUTION_REPORT.md`. **Phase 4 still needs its `PHASE_4_EXECUTION_REPORT.md` once 4.5 ships** (4.1–4.5 complete = phase done).

### Server hygiene
Background `next start` processes can survive naive `pkill`. Use a unique port per smoke test and verify the port is actually free (`curl` returns 000) before relying on a fresh start. Kill with `pkill -9 -f "next-server"` and confirm.

---

## 5. CONTINUATION INSTRUCTION

> ### NEXT APPROVED TASK: PHASE 4 — SUB-PR 4.5 (Real-User Monitoring)
> **Status: NOT YET EXECUTED. Do not start without the user's go-ahead in the new session.**

### PR 4.5 brief (from masterplan line 255)
- **Action:** Wire `@vercel/speed-insights` + `@vercel/analytics` (both privacy-friendly). **Gate behind the consent banner from PR 0.4.**
- **Touches:** `src/app/layout.tsx` (primary).
- **Effort:** S.

### Integration pointers (documented, NOT yet built)
- Consent state lives in `src/components/consent/ConsentProvider.tsx`. Hook: **`useConsent()`** returns consent state including an **`analytics: boolean`** flag, and already honours DNT (Do-Not-Track) — if DNT is set, `analytics` is forced false even on "accept all".
- 4.5 must only mount/activate the Vercel analytics + speed-insights components when `useConsent().analytics === true`. A small client wrapper that reads `useConsent()` and conditionally renders `<Analytics />` + `<SpeedInsights />` is the natural shape (keeps it out of SSR, consistent with how Consent components are dynamic-imported).
- Packages are NOT yet installed — `@vercel/analytics` + `@vercel/speed-insights` will need `npm install`.
- Respect standing rule #6 (validation) + #7 (privacy/truthful). This is the consent-gated, privacy-first path the masterplan intends.

### After 4.5
- Generate `reports/PHASE_4_EXECUTION_REPORT.md` (closes Phase 4: 4.1–4.5).
- Then Phase 5 (SEO + observability) becomes the next phase, starting at PR 5.1 (JSON-LD structured data) — but only on user approval.

---

## 6. FINAL OPERATOR NOTE

A future session may have **zero memory of this conversation**. To resume safely:

1. **Read this file first**, then `reports/WEBSITE_EVOLUTION_MASTERPLAN.md` + `reports/MICRO_POLISH_EXECUTION_REPORT.md`.
2. Confirm git state: `git log --oneline | head -5` should show `65b7113` (PR 4.4) at or near HEAD, tree clean, `main` synced.
3. Internalise §2 standing rules — they are non-negotiable and not all derivable from the code.
4. Internalise §4 protocol — the user enforces one-PR-at-a-time, stop-and-await, commit+push-always. **Never auto-advance phases or batch PRs.**
5. The next task is **PR 4.5** (§5). **Do not begin it until the user explicitly approves in the new session.** Present readiness, then wait.
6. When in doubt about scope, ask — the user prefers a clarifying question over speculative work.

Everything needed to continue is in `reports/`. The code is the source of truth for *what exists*; this handoff + the masterplan are the source of truth for *what's next and how to work*.

**— Handoff written at commit `65b7113`. Resume point: Phase 4, PR 4.5, awaiting approval.**
