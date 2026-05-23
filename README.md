# FormAI · Web

Production website for **FormAI** — kişisel yapay zekâ fitness koçun. Built as a fast, dark, cinematic experience that mirrors the in-app coaching identity.

```
Next.js 14 · TypeScript · Tailwind · Framer Motion · Vercel
```

## Pages

| Route        | Purpose                                                                 |
|--------------|-------------------------------------------------------------------------|
| `/`          | Cinematic landing — coach hero, three product pillars, full narrative.  |
| `/antrenman` | AI workout · BlazePose analyzers · live form storytelling.              |
| `/beslenme`  | Adaptive Turkish nutrition · macros · meal library · diet profiles.     |
| `/gelisim`   | Streaks · 30-day program · badges · weekly retrospective.                |
| `/destek`    | FAQ groups · contact channels · privacy + KVKK / GDPR trust.            |
| `/baslat`    | High-intent conversion · store badges · 3-tier pricing · waitlist.       |

## Local development

```bash
npm install
npm run dev          # http://localhost:3000
```

## Production build

```bash
npm run build        # static + edge routes generated
npm start            # serve the production build locally
```

## Deployment

Push to a Vercel-connected git remote. The Next.js framework is auto-detected; `vercel.json` already declares the build/install commands, the `fra1` region, security headers and long-cache headers for `/images/*` + `/screenshots/*`.

See **VERCEL_DEPLOY_GUIDE.md** for a step-by-step walkthrough.

## Architecture

See **WEBSITE_ARCHITECTURE_REPORT.md** for routing, component strategy and structure decisions.

## Brand & design

See **WEB_BRANDING_DECISIONS.md** for the visual language, type stack, color tokens, motion system, and the reasoning behind them.

## Project structure

```
src/
  app/                   App Router pages, route handlers, OG image, sitemap, robots
    page.tsx             Home
    antrenman/           AI workout page
    beslenme/            Nutrition page
    gelisim/             Progress page
    destek/              FAQ / support page
    baslat/              Conversion / install page
    layout.tsx           Root layout + metadata + fonts
    globals.css          Tailwind layers + tokens
    icon.tsx             32×32 favicon via @vercel/og
    apple-icon.tsx       180×180 apple-touch via @vercel/og
    opengraph-image.tsx  1200×630 OG via @vercel/og
    sitemap.ts
    robots.ts
  components/
    marks/               Logo + brand marks
    sections/            Page-level composable sections (Hero, FeatureBlock, …)
    ui/                  Atomic building blocks (Button, Card, Mono, HudPanel…)
  data/
    faq.ts               FAQ content (Turkish)
  lib/
    cn.ts                clsx + tailwind-merge
    site.ts              Centralized site config
    nav.ts               Navigation data

public/
  images/                Curated product imagery from the FormAI app
  screenshots/           App store screenshots
  favicon.svg
  site.webmanifest
```

## Tech notes

- All marketing routes are statically generated; first-load JS for the home page is ~152 KB total (Framer Motion + React).
- Pose-detection HUD overlays, the 30-day calendar, the macro bars and the streak module are all composed from the same design-system primitives — no one-off styling.
- Reduced-motion users automatically get instant animations via `useReducedMotion`.
- All copy is Turkish; metadata locale is `tr-TR`.

## License

Proprietary. Built for FormAI.
