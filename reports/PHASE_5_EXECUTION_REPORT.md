# PHASE 5 — EXECUTION REPORT

**Phase:** 5 — SEO + Observability
**Source:** `reports/WEBSITE_EVOLUTION_MASTERPLAN.md` § Phase 5
**Status:** ✅ **Complete.** All five sub-PRs shipped.
**Window:** commits `8f50b84 → 69ce604` (on top of the Phase 4 closure `beec00c`).

---

## Executive summary

Phase 5's mandate, per the masterplan, was **organic-search capture + production visibility** — make the site legible to crawlers and social platforms, and gain insight into real production behaviour, all **without a single fabricated signal**. Five sub-PRs delivered it across three axes: **structured data + metadata**, **social/share quality**, and **observability** — each one audited-first and held to the truthful-content rule.

All five hit their targets:

- **5.1 JSON-LD structured data** — Organization + WebSite (`@graph`) site-wide, FAQPage on `/destek` (16 real Q&A), SoftwareApplication on `/baslat`. Audited; emits only truthful facts. **W13 closed.**
- **5.2 Per-page OG system** — one shared renderer + thin per-route `opengraph-image.tsx` for 6 pages; **fixed a dead `/og/og-default.png` reference** that made every share preview a 404. **W11 closed.**
- **5.3 Canonical + hreflang** — shared `alternatesFor()` helper; self-canonical + truthful `tr-TR`/`x-default` on all 9 pages. No fake multilingual.
- **5.4 Consent-gated error monitoring** — Sentry (`@sentry/browser`), three-gate privacy model (DSN + analytics consent + `beforeSend` PII strip), inert by default, zero default bundle. Mirrors PR 4.5 + the site's published Sentry posture.
- **5.5 Press / media kit** — `/press` with real brand assets, palette, screenshots, künye, single-source contact. Early-stage honest; no press logos / investors / "as seen in".

The site is now **discoverable, share-ready, observable, and press-ready** — and every byte of metadata, schema, and telemetry is truthful or consent-gated. SEO theater was refused at every step.

---

## Completed sub-PRs

### ✅ PR 5.1 — JSON-LD structured data

- **Commit:** `8f50b84` — *audited, truthful, single-sourced*
- **Files:** new `src/components/util/Schema.tsx` (`<JsonLd>` server component, `<`-escaped), new `src/lib/schema.ts` (builders from `site.ts` + `faq.ts`), `layout.tsx`, `destek/page.tsx`, `baslat/page.tsx`.
- **Approach:** `siteGraph()` (Organization + WebSite, `@id`-linked) on the layout; `faqPageSchema()` auto-generated from the 16 real `/destek` Q&A; `softwareApplicationSchema()` on `/baslat`. Server-rendered into initial HTML.
- **Audit (deliberate omissions):** NO `aggregateRating`/`review` (ratings are null), NO WebSite `SearchAction` (no search endpoint), NO SoftwareApplication `offers` (pre-launch, prices not single-sourced), NO Organization `sameAs` (no verifiable profiles), NO `BreadcrumbList` (flat site). Documented in `schema.ts`.
- **Validation:** build/lint/9-routes green; all blocks parse as valid JSON; forbidden-field scan = 0; zero First Load JS delta.
- **Closes:** W13.

### ✅ PR 5.2 — Per-page Open Graph system

- **Commit:** `613d7b4` — *parameterized opengraph-image per route*
- **Files:** new `src/lib/og-template.tsx` (shared renderer + pillar palette), refactored root `opengraph-image.tsx`, new per-route generators (`antrenman`/`beslenme`/`gelisim`/`baslat`/`destek`), `layout.tsx` (removed dead image refs), `site.ts` (removed unused `ogImage`).
- **Audit finding fixed:** `site.ogImage = '/og/og-default.png'` was referenced in layout OG + Twitter metadata, but `public/og/` was empty → every share preview pointed at a 404. Removed; `og:image` now comes from the file convention.
- **Approach:** one `renderOgImage({tone,eyebrow,headline,stats})` owns the dark-neon visual; each route passes truthful params + a pillar tone (Rule #3). `twitter:image` derived per route by Next.
- **Validation:** 6/6 pages have distinct `og:image`; each renders 200 `image/png`; dead ref = 0 occurrences; zero First Load JS delta.
- **Closes:** W11.

### ✅ PR 5.3 — Canonical URLs + hreflang

- **Commit:** `7a02a96` — *shared, truthful, single-language honest*
- **Files:** new `src/lib/metadata.ts` (`alternatesFor(path)`), all 9 page metadata blocks.
- **Audit finding:** canonical was partial (3 legal pages inline, 6 main pages none); hreflang absent everywhere; legal pages duplicated the pattern by hand.
- **Approach:** single helper returns `{ canonical: path, languages: { [site.locale]: path, 'x-default': path } }`; relative paths resolve against `metadataBase`. Declares only the one real language (`tr-TR`) + `x-default` — **no fabricated en-US**. Converted legal pages to the helper.
- **Validation:** exactly 1 self-canonical per page; `tr-TR` + `x-default` per page (both self); 0 fake languages; 9 routes 200.

### ✅ PR 5.4 — Consent-gated error monitoring

- **Commit:** `37bbac6` — *Sentry, privacy-first, inert by default*
- **Files:** new `src/components/util/ErrorMonitor.tsx`, `layout.tsx` (dynamic `ssr:false` mount), `ConsentSettings.tsx` (analytics → "Analitik ve tanılama" disclosure), `package.json` (`@sentry/browser`).
- **Tool decision:** `@sentry/browser` (client-only) over `@sentry/nextjs` — the site's only server surface (`/api/waitlist`) already logs to Vercel, and the browser SDK consent-gates cleanly without the build plugin/bundle. The site *already publicly commits to Sentry* (gizlilik/kvkk/destek/faq), so a non-Sentry tool would contradict the privacy policy.
- **Consent decision:** reuse the existing `analytics` category (no new category → no `CONSENT_VERSION` bump / re-prompt); disclosed via copy. Mirrors PR 4.5.
- **Privacy model:** three gates — DSN present (else SDK never imported), analytics consent (DNT-enforced upstream), `beforeSend` strips IP/user/cookies/headers. No Replay, no Profiling, `tracesSampleRate: 0`.
- **Validation:** SDK code-split, NOT in First Load JS; privacy-first default proven (0 SDK indicators in HTML with no DSN/consent); build/lint/9-routes green.

### ✅ PR 5.5 — Press / media kit

- **Commit:** `69ce604` — *truthful, early-stage, well-made*
- **Files:** new `src/app/press/page.tsx`, `sitemap.ts` (+`/press`), `lib/nav.ts` (footer link).
- **Approach:** server route built from existing primitives (PageHero, Container, Reveal[IO+CSS], Logo, next/image). Downloads link directly to canonical assets (`favicon.svg`, `app-icon.webp`, screenshots) — no `/public/press/` duplication, no zip build step (Rule #5). Canonical via `alternatesFor('/press')`. Discoverable via sitemap (0.5) + footer "Şirket" link.
- **Content:** truthful boilerplate, künye fact sheet, brand palette, 3 sharp screenshots, single-source contact. Pre-launch honest — no press logos / investors / "as seen in".
- **Validation:** 10 routes 200; all download assets resolve; `/press` in sitemap; truthfulness scan 0 hits; blur audit clean (1080×2408 downscaled → sharp; vector logo).

---

## Structured-data + metadata strategy

Phase 5 established a **single-sourced, audited metadata layer**:
- **Schema** (`src/lib/schema.ts`) and **alternates** (`src/lib/metadata.ts`) are builder-helper modules driven by `site.ts`/`faq.ts` — no duplicated strings, one place to extend.
- **Audit-before-emit doctrine:** every schema/metadata field traces to a real on-page fact; anything unverifiable (ratings, search action, offers, social profiles, extra languages, breadcrumbs) was consciously omitted with a documented reason.

## Social / share quality

The OG system (`src/lib/og-template.tsx`) is one parameterized renderer feeding per-route `opengraph-image.tsx` files — distinct, truthful previews per page, one brand system, zero client JS. The pre-existing dead OG reference is gone; both `og:image` and `twitter:image` now resolve to real generated images on every key route.

## Observability + consent architecture

```
ConsentProvider (analytics flag, DNT-aware)
        │
        ├─▶ ConsentedAnalytics (4.5)  → Vercel Analytics + Speed Insights
        └─▶ ErrorMonitor (5.4)        → Sentry  (also needs DSN; beforeSend PII strip)
              both: dynamic ssr:false · zero default bundle · gated on state?.analytics
```
One consent flag (`analytics`) governs all optional telemetry; both consumers load only post-consent and are inert without their respective config. Server-route errors remain in Vercel logs. This keeps the privacy posture uniform and matches the site's published commitments.

## Major decisions

1. **Audit-first, omit-by-default for schema/metadata** (5.1/5.3) — truthful-or-absent; no SEO theater.
2. **One shared renderer for OG** (5.2) — per-page identity without per-page design drift.
3. **`@sentry/browser` over `@sentry/nextjs`** (5.4) — minimal, consent-cleanly gated, no build coupling.
4. **Reuse `analytics` consent for diagnostics** (5.4) — avoids a `CONSENT_VERSION` re-prompt; disclosed via copy, not a schema change.
5. **Link press downloads to canonical assets** (5.5) — single source of truth over a duplicated `/public/press/` bundle.
6. **Helper modules, not per-page copy-paste** (5.1/5.3/5.2/5.5) — `schema.ts`, `metadata.ts`, `og-template.ts` keep Phase 5 maintainable.

## Validation summary

Every sub-PR closed GREEN under Standing Rule #6: `npx next build` clean + `npx next lint --max-warnings 0` clean + all routes 200 (9, then 10 after `/press`), plus per-PR proofs — JSON-LD parse + forbidden-field scan, distinct per-route OG render checks, canonical/hreflang HTML verification, privacy-first default (0 Sentry indicators pre-consent), asset-resolution + blur audit. Servers were killed **port-scoped** throughout (the hygiene rule adopted at Phase 4 closure).

## Lessons / constraints

- **Audits paid off repeatedly.** 5.2 surfaced a live bug (dead OG ref → 404 previews); 5.3 found inconsistent partial canonicals; 5.4 found the published privacy commitments that settled the tool choice; 5.5 found the manual sitemap + the pre-existing apple-icon issue.
- **Truthfulness is a design constraint, not a footnote.** Phase 5 added a lot of machine-facing metadata — the discipline was to emit only what's real (no ratings, no fake languages, no press cosplay).
- **No live browser this session-line.** OG previews, the live opt-in Sentry beacon, and the consent-revoke path were verified by build/bundle/HTTP/parse inspection — not a driven browser. Flagged honestly per Rule #6.

## Remaining risks / open items

1. **Activation is operator-gated, by design:** set `NEXT_PUBLIC_SENTRY_DSN` (EU/Frankfurt org, per KVKK) to turn on error monitoring; enable Analytics + Speed Insights in the Vercel dashboard (carried from Phase 4). All inert until then.
2. **Pre-existing apple-touch-icon bug** (found in 5.5, NOT introduced, out of scope): `layout.tsx` emits `apple-touch-icon href="/apple-icon.png"` but the generated icon serves at `/apple-icon` → `/apple-icon.png` 404s. One-line fix in the layout icons config — recommended as a small standalone PR.
3. **Optional polish** (not scheduled): a dedicated `/press` OG image; refine the gizlilik Sentry processor wording to include web browser context; source-map upload for un-minified Sentry stack traces.
4. **Post-deploy verification** (owner): Google Rich Results Test (5.1), social debuggers (5.2), Search Console canonicals (5.3) once live.

---

**Phase 5 closed at commit `69ce604`. Next: Phase 6 — Signature interactions (6.1 hero skeleton overlay, 6.2 manifesto parallax, 6.3 live form-score demo, 6.4 badge unlock micro-interaction) — on approval.**
