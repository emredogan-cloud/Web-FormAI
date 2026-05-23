# README_WEB_DEPLOY

Operational quick-start for the FormAI website.

## Prerequisites

| Tool   | Version  | Notes                                   |
|--------|----------|-----------------------------------------|
| Node   | 18.18+   | Tested on Node 24.13                    |
| npm    | 9.x +    | Yarn / pnpm work but lockfile is npm    |
| Vercel CLI | latest | Optional, for previews & env pulls    |

## 1. Install

```bash
git clone <repo>
cd Web-FormAI
npm install
```

The project pins concrete versions; no peer warnings should appear.

## 2. Local development

```bash
npm run dev
```

→ http://localhost:3000

Hot-reload covers:

- App-router pages (`src/app`)
- Components (`src/components`)
- Tailwind tokens (`tailwind.config.ts`)
- Global CSS (`src/app/globals.css`)

## 3. Production build

```bash
npm run build
npm start
```

Expected output: 11 routes, ~87 KB shared bundle, ~152 KB First Load JS on the home page.

The build is fully static for marketing pages; `/icon`, `/apple-icon`, `/opengraph-image` are server-rendered on the Edge runtime via `@vercel/og`.

## 4. Lint

```bash
npm run lint
```

Uses `next/core-web-vitals`.

## 5. Vercel deploy — two ways

### 5a. Git-based (recommended)

1. Push this repo to GitHub / GitLab / Bitbucket.
2. https://vercel.com/new → import repo.
3. Vercel auto-detects Next.js. **No environment variables required.**
4. First deploy completes in ~60s.

### 5b. CLI deploy

```bash
npm i -g vercel
vercel login
vercel link            # link to the FormAI Vercel project
vercel                 # preview deploy
vercel --prod          # promote to production
```

## 6. Environment

No runtime secrets are required for the marketing site.

If you later add:

- A waitlist endpoint → keep secrets in **Project Settings → Environment Variables** (Vercel auto-injects per environment).
- Analytics → add `NEXT_PUBLIC_*` vars and gate them behind a consent prop in `src/app/layout.tsx`.

## 7. Custom domain

```bash
vercel domains add formai.app
```

Update `src/lib/site.ts` → `url` if the production domain changes. The metadata, sitemap and OG image all read from this single source.

## 8. Cache & headers

`vercel.json` ships with:

- HSTS-friendly: no mixed content, no inline scripts (Next handles its own nonces).
- Long-cache (`max-age=31536000, immutable`) for `/images/*` and `/screenshots/*`.
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`.

Edit `vercel.json` to tighten further (CSP, etc.) when ready.

## 9. Updating images

Drop optimized `.webp`/`.jpg` into `public/images/` or `public/screenshots/`, then reference with `next/image`:

```tsx
<Image src="/images/foo.webp" alt="…" width={…} height={…} />
```

Avoid > 500 KB files where possible — already-shipped Hero PNGs are ~2 MB each and acceptable but should be re-encoded for perfect Lighthouse scores when ready.

## 10. Troubleshooting

| Symptom | Fix |
|---|---|
| `Module not found: framer-motion` | `npm install` again — the lockfile is authoritative. |
| OG image 404 on Vercel | The `/opengraph-image` route requires the Edge runtime; ensure no project-level runtime override forces Node. |
| Sitemap missing routes | Edit `src/app/sitemap.ts`. |
| Wrong production URL in metadata | Update `src/lib/site.ts` → `url`. |
