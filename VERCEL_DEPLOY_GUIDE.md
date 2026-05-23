# VERCEL_DEPLOY_GUIDE

End-to-end deployment guide for the FormAI website on Vercel.

---

## 0. Pre-flight checklist

- [ ] `npm run build` passes locally with no warnings.
- [ ] `vercel.json` references the correct region (`fra1` is the default; switch to `iad1`/`cle1` for US traffic).
- [ ] `src/lib/site.ts` → `url` matches the production domain (e.g. `https://formai.app`).
- [ ] `appStoreUrl` / `playStoreUrl` in `src/lib/site.ts` are updated when the apps ship.
- [ ] `og` image route renders correctly: `npm run build && npm start` → visit `http://localhost:3000/opengraph-image`.

---

## 1. First-time setup (Git-connected, recommended)

1. **Push the repo** to GitHub / GitLab / Bitbucket.
2. Go to **https://vercel.com/new**.
3. Click **Import** on the repository.
4. Framework preset → **Next.js** (auto-detected).
5. Build command: `next build` (auto).
6. Output directory: `.next` (auto).
7. Install command: `npm install` (auto).
8. **No environment variables** are required for the current marketing build.
9. Click **Deploy**.

First deploy completes in ~60 seconds; the preview URL appears automatically.

---

## 2. Custom domain

1. In the Vercel project → **Settings → Domains**.
2. Add `formai.app` (or `www.formai.app`).
3. Configure DNS:
   - Apex: `A` record → `76.76.21.21`
   - WWW: `CNAME` → `cname.vercel-dns.com.`
4. Wait for SSL provisioning (~30 seconds).
5. Update `src/lib/site.ts` → `url` and redeploy so OG / sitemap / canonical URLs match.

---

## 3. Environment variables (when needed later)

Currently **none required**. When you later add:

| Variable                  | Used by                       | Scope                      |
|---------------------------|-------------------------------|----------------------------|
| `NEXT_PUBLIC_POSTHOG_KEY` | client analytics              | Production + Preview       |
| `RESEND_API_KEY`          | server-side waitlist webhook  | Production                 |
| `NEXT_PUBLIC_SITE_URL`    | overrides `site.url`          | optional                   |

Add via **Settings → Environment Variables** (or `vercel env add`).

---

## 4. Region selection

`vercel.json` pins **`fra1`** (Frankfurt) since the primary audience is Turkey.

To change:

```jsonc
// vercel.json
{
  "regions": ["fra1"]   // change to ["iad1"] for US, ["sin1"] for SE Asia, etc.
}
```

Note: the Edge runtime routes (`/icon`, `/opengraph-image`, `/apple-icon`) ignore the region setting and run on Vercel's global edge.

---

## 5. CLI workflow

```bash
npm i -g vercel
vercel login            # one-time
vercel link             # link this local checkout to the Vercel project

vercel                  # preview deploy from current branch
vercel --prod           # promote to production

vercel env pull         # download env vars into .env.local
vercel logs             # tail the production logs
```

---

## 6. Headers & caching

`vercel.json` configures:

- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- `Cache-Control: public, max-age=31536000, immutable` for `/images/*` and `/screenshots/*`

To add a CSP, append to the `/(.*)` rule:

```jsonc
{ "key": "Content-Security-Policy", "value": "default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; font-src 'self' data:; script-src 'self'" }
```

(Tune carefully — Next.js inlines hydration scripts that need either `'unsafe-inline'` or a nonce.)

---

## 7. Performance budgets

Current production build metrics:

| Route        | Page size | First Load JS |
|--------------|-----------|---------------|
| `/`          | 4.22 kB   | 152 kB        |
| `/antrenman` | 2.20 kB   | 143 kB        |
| `/baslat`    | 1.73 kB   | 143 kB        |
| `/beslenme`  | 2.52 kB   | 146 kB        |
| `/destek`    | 3.59 kB   | 145 kB        |
| `/gelisim`   | 0.99 kB   | 146 kB        |

If a future change pushes a route over 200 KB, audit with:

```bash
ANALYZE=true npm run build   # after installing @next/bundle-analyzer
```

---

## 8. Rollbacks

In **Vercel → Deployments**, every commit creates an immutable deployment. To roll back:

1. Click the prior healthy deployment.
2. **Promote to Production**.

No re-build required.

---

## 9. Preview comments

When PRs are opened against the connected git repo, Vercel posts preview URLs as PR comments — share these in design review and link them to Linear / Notion tickets.

---

## 10. Common deploy errors

| Error                                              | Cause                                                                | Fix                                                          |
|----------------------------------------------------|----------------------------------------------------------------------|--------------------------------------------------------------|
| `Module not found: @/lib/...`                      | Wrong path alias                                                     | Confirm `tsconfig.json` `paths.@/*` is `./src/*`.            |
| Edge runtime warning for OG image                  | Mixing Node API in `opengraph-image.tsx`                             | Keep that file pure-JSX (it already is).                     |
| `next start` shows blank page                      | Missing `globals.css` import in `layout.tsx`                         | Already imported — do not remove.                            |
| Wrong OG image on social previews                  | Stale Twitter / FB cache                                             | Use the platform debuggers to re-scrape.                     |
| Sitemap returns 404                                | Build skipped sitemap                                                | Confirm `src/app/sitemap.ts` exists; rerun build.            |

---

## 11. Post-deploy verification

After the production deploy:

```bash
curl -I https://formai.app/                    # 200 + cache headers
curl -I https://formai.app/sitemap.xml         # 200
curl -I https://formai.app/robots.txt          # 200
curl -I https://formai.app/opengraph-image     # 200, image/png
```

Submit `https://formai.app/sitemap.xml` in Google Search Console.

---

## 12. Where to look next

- **`WEBSITE_ARCHITECTURE_REPORT.md`** — routing, components, structure decisions.
- **`WEB_BRANDING_DECISIONS.md`** — design system rationale.
- **`README_WEB_DEPLOY.md`** — concise local-dev quick-start.
