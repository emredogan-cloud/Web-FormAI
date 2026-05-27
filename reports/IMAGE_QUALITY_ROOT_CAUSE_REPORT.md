# Image Quality — Root-Cause Audit & Repair

**Date:** 2026-05-27
**Scope:** Every photographic / raster surface on the FormAI marketing site.
**Method:** Evidence-based. Source metadata → render-path tracing → **measured
delivered bytes from the live `next/image` optimizer** → visual inspection of the
actual pixels. No assumptions; every claim below is backed by a measurement.

---

## 0. Method (how this was proven, not guessed)

1. **Asset inventory** — `sharp` metadata for every raster in `/public`
   (dimensions, format, bytes, bits-per-pixel).
2. **Render-path map** — grepped all 16 `next/image` call sites + checked for
   `<img>`, CSS `background-image`, and `<canvas>` photo draws.
3. **Geometry** — computed each surface's real CSS display width from the
   Tailwind layout (Container `max-w-7xl` − padding, grid fractions, gaps) and
   the device-pixel need at DPR 2.
4. **Delivery test (the decisive step)** — ran the app and fetched the real
   optimizer output (`/_next/image?url=…&w=…&q=75`, `Accept: image/avif`),
   then measured the **decoded dimensions of the bytes the browser actually
   receives**. This is what exposes upscaling: `next/image` never enlarges a
   source, so a starved source is delivered *capped at its own resolution* and
   the **browser** does the upscale.
5. **Visual inspection** — opened the suspect source pixels directly.

### Pipeline facts established
- **100% of rasters go through `next/image`.** No `<img>` tags, no raster CSS
  backgrounds (only gradients), no `<canvas>` drawing photos (the skeleton /
  live-demo canvases draw vectors). ⇒ **the source file is the hard ceiling**;
  `sizes` + quality govern what is served below that ceiling.
- **Default quality (q75) everywhere** — there is not a single `quality=` prop
  in the codebase. The optimizer serves AVIF (then WebP) at q75.
- `next.config.mjs` sets only `formats: ['image/avif','image/webp']` — default
  `deviceSizes`/`imageSizes` apply.

**q75 is NOT the cause of any blur.** The control image below is razor-sharp at
q75. Blur traced entirely to **resolution starvation from aspect-mismatch**, not
compression.

---

## 1. Blur audit table

Severity key: 🟥 visible softness on a prominent surface · 🟧 mild/secondary ·
🟩 sharp, no action.

| Image (surface) | Source | Delivered (measured) | Cause | Severity | Fix |
|---|---|---|---|---|---|
| **pose-analysis** — HowItWorks step 01 (home) | 853×1844 webp | capped **853w** for a ~1174px need | Tall 9:19.5 phone-UI render force-cropped into a 4:3 landscape box → **1.38× browser upscale** + logo/labels cropped off | 🟥 | **Swapped** to `power-card` (2816×1536 landscape) → downscales, sharp |
| **meal-lunch** — HowItWorks step 02 (home) | 750×1125 jpeg | capped **750w** for a ~1174px need | 750px portrait food photo force-cropped into the 4:3 box → **1.57× upscale** | 🟥 | **Swapped** to `meal-dinner` (2048×1365) → downscales, sharp |
| **pt-form** — Manifesto (home) | 1672×941 webp | 1080×**608** tall | 16:9 landscape art in a portrait 3:4 cover-box → height-starved (941px source vs ~1280 physical) → **~2.1× vertical upscale** | 🟥 | Card → **`aspect-[4/3]`** + wider `sizes` → cover-scale now **1.13×** (sharp) |
| daily-challenge — HowItWorks step 03 | 2816×1536 webp | 1200×655 (downscale) | none — bpp 0.17 is low but justified by smooth/dark content; downscaled | 🟩 | none (control: proves q75 is sharp) |
| pose-analysis — /antrenman live panel | 853×1844 webp | 828×1790 (downscale) | none — phone frame `aspect-[9/19.5]`, max-w 360 → 720px need ≤ 853 | 🟩 | none (MP.3 sizing was correct here) |
| hiit-card / power-card — /antrenman cards | 2816×1536 webp | downscaled | none | 🟩 | none |
| transformation-before/after — TransformationStrip & /gelisim | 1100×1536 webp | downscaled / ~1.07× | negligible (1100w vs ~1180 need = imperceptible); /gelisim 240px slot downscales | 🟩 | none |
| meal-* — /beslenme grid | 768–2048w | downscaled | none — `lg:grid-cols-4` ⇒ ~284px columns; `sizes:300px` is accurate; all sources ≥ 600 | 🟩 | none |
| screenshots welcome/dashboard/nutrition — Hero + /press | 1080×2408 jpeg | downscaled | none visible — shown in ~300px phone frames; source UI text crisp | 🟩 | none (see §6 weak-asset note) |
| app-icon — /baslat + /press | 1254×1254 webp | downscaled | none | 🟩 | none |
| pt-form — CtaBlock background | 1672×941 webp | downscaled | none — decorative, `opacity-25` + radial mask, 50vw | 🟩 | none |
| FounderStrip / Testimonials avatars | — | — | none — config-gated (`founder.photoSrc: null`, no consented testimonials) ⇒ **no image renders** | 🟩 | none |
| FeatureBlock (phone/card/full) | — | — | **dead code — zero callers** | 🟩 | none |

---

## 2. Root-cause findings

All three real defects share **one** root cause, not three:

> **Aspect-mismatch resolution starvation.** A source whose orientation does not
> match its container is forced (`object-cover`) to scale on its *short* axis to
> fill the box. `next/image` delivers it capped at the source's intrinsic size,
> so the **browser** upscales the starved axis to fill the slot. Compression
> quality is irrelevant — there simply are not enough source pixels on that axis.

Concretely:
1. **HowItWorks** renders all three steps in identical **4:3 landscape** boxes
   (~587px wide on desktop ⇒ ~1174 physical px at DPR 2). Only step 03
   (`daily-challenge`, a 2816×1536 landscape render) actually *had* a landscape
   source. Steps 01 and 02 were reusing assets whose natural homes are elsewhere
   — a **tall phone-screen** render (`pose-analysis`, 853w) and a **portrait**
   food photo (`meal-lunch`, 750w) — cropped into landscape and upscaled.
2. **Manifesto** did the inverse: a **16:9 landscape** key-art render (`pt-form`)
   in a **portrait 3:4** box. The portrait box is tall, the source is only 941px
   tall, so the limiting axis (height) was upscaled ~2.1× at DPR 2.

Why it was easy to miss: the **same `pose-analysis` asset is perfectly sharp on
`/antrenman`** (delivered 828×1790 for a 720px need) because there it lives in a
matching `aspect-[9/19.5]` phone frame. The defect was never the asset alone — it
was the asset **on the wrong-shaped surface**.

**Ruled out (proven false):**
- *"q78 over-compression"* — q is set per-render by the optimizer (q75), not by
  the source. The sharp control (`daily-challenge`) is q75. Not the cause.
- *"Low bpp = over-compressed"* — the three lowest-bpp cards (0.17–0.26) are
  **visibly sharp**; low bpp reflects smooth gym backgrounds + intentional bokeh,
  not artifacts. They also downscale. bpp alone is a false signal here.
- *"Wrong `sizes` / DPR mismatch"* — the `sizes` values are approximately correct
  for their real columns; the bottleneck was source pixels, not candidate
  selection.
- *"GPU transform / CSS scale blur"* — the only transforms are `group-hover:
  scale-105` (transient, on hover only) and parallax **translate** (no scale).
  Neither causes persistent blur.

---

## 3. What changed

1. **HowItWorks step 01 (Antrenman):** `pose-analysis.webp` → **`power-card.webp`**
   (2816×1536 landscape training render). Alt updated to describe the new image
   truthfully. The in-app pose HUD is still present on the site (Hero device
   frame + `/antrenman` live panel).
2. **HowItWorks step 02 (Beslenme):** `meal-lunch-1.jpeg` → **`meal-dinner-1.jpeg`**
   (2048×1365). Alt rewritten to describe the *actual* photo (avocado-egg toast),
   not the inaccurate "Tavuklu Bulgur Salatası" data label (truth rule).
3. **Manifesto:** image card `aspect-[3/4]` → **`aspect-[4/3]`** (landscape,
   matching the source orientation) and `sizes` desktop hint `480px` → `560px`
   so the optimizer serves a larger candidate. Parallax stays translate-only.

No assets added, deleted, or re-encoded. No new dependencies. No layout system
changes beyond the three values above. `pose-analysis` and `meal-lunch` remain in
use on their correctly-sized surfaces, so nothing is orphaned.

---

## 4. Files changed

- `src/components/sections/HowItWorks.tsx` — step 01 + step 02 `imageSrc`/`imageAlt`
  (+ blur-audit comments).
- `src/components/sections/Manifesto.tsx` — card `aspect-[4/3]` + `sizes` 560px
  (+ blur-audit comment).
- `reports/IMAGE_QUALITY_ROOT_CAUSE_REPORT.md` — this report.

---

## 5. Validation

| Gate | Result |
|---|---|
| `next lint --max-warnings 0` | ✅ No warnings or errors |
| `next build` | ✅ Clean; 15 static pages; **shared First Load JS 87.3 kB (unchanged)** |
| Routes 200 | ✅ 10/10 (`/`, `/antrenman`, `/beslenme`, `/gelisim`, `/baslat`, `/destek`, `/press`, `/gizlilik`, `/kvkk`, `/sartlar`) |
| Rendered HTML | ✅ Home now serves `power-card` + `meal-dinner` + `daily-challenge`; `pose-analysis`/`meal-lunch` gone from home; Manifesto `pt-form` in `aspect-[4/3]`; `/antrenman` still uses `pose-analysis` |

**Measured delivery — before vs after (the proof the blur is gone):**

| Surface | Before (delivered → effect) | After (delivered → effect) |
|---|---|---|
| HowItWorks 01 | 853w → **1.38× upscale** + bad crop | `power-card` 1200×655 (30 KB AVIF) → **downscale, sharp** |
| HowItWorks 02 | 750w → **1.57× upscale** | `meal-dinner` 1200×800 (53 KB AVIF) → **downscale, sharp** |
| Manifesto | 1080×608 → **~2.1× vertical** | `pt-form` 1200×675 (55 KB AVIF) → **cover-scale 1.13×, sharp** |

No oversized regressions — every repaired surface delivers ≤ 55 KB AVIF.
Performance posture preserved (JS unchanged; image weights are small AVIF
derivatives generated on demand).

> Note: visual sharpness here is reasoned + measured (delivered pixels ≥ display
> need ⇒ downscale ⇒ sharp), validated against the optimizer. A final on-device
> eyeball at DPR 2/3 is the standard last check (carried with the existing
> "eyeball Phase 6" operator item).

---

## 6. Remaining weak assets (honest ledger — not blurry where currently used)

- **`pose-analysis.webp` (853w ceiling)** — a FormAI app marketing export; cannot
  be enlarged here. Sharp at its current sole use (`/antrenman` phone panel).
  **Constraint:** only ever show it phone-framed at ≤ ~420px CSS width. Do not
  reuse on a wide/landscape surface (that is exactly the defect just fixed).
- **`meal-lunch-1.jpeg` (750w)** and **`meal-breakfast-1.jpeg` (768w)** — low-res.
  Fine at their current small/square uses (≤ 300px `/beslenme` cards, 56px
  thumbnails). Do not use above ~375px CSS at DPR 2.
- **Screenshots `welcome/dashboard/nutrition.jpg`** — re-compressed q78 mozjpeg at
  source, then re-encoded q75 by `next/image` (double-lossy). Not visibly soft
  because they render downscaled in ~300px phone frames. If ever shown large,
  regenerate from a lossless capture and skip the q78 source pass.
- **`meal-dinner-1.jpeg` content/label mismatch (NOT a blur issue)** — the photo
  is avocado-egg toast, but `NutritionShowcase`/`/beslenme` label it "Tavuklu
  Bulgur Salatası". Out of scope for this image-quality task; flagged for the
  operator as a separate truthfulness/data fix.

No asset on the site is currently rendered blurry.

---

## 7. Commit + push

Committed and pushed to `origin/main` (see commit trailer). This task is complete;
no unrelated work performed.
