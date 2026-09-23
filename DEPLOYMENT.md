# Deployment — Vercel

Written for whoever deploys or maintains this site. Audited and verified 2026-09-23.

---

## Summary

| | |
|---|---|
| **Framework** | Vite 5 (React 18 SPA) — Vercel preset `vite` |
| **Install command** | `npm ci` |
| **Build command** | `npm run build` (runs `vite build`, then `postbuild` for SEO artifacts) |
| **Output directory** | `dist` |
| **Node version** | 20.x or 22.x (Vercel's default is fine; verified on 20, 22 and 24) |
| **Server-side code** | **None.** No API routes, no serverless functions, no database |
| **Routing** | Client-side SPA — requires the catch-all rewrite in `vercel.json` |

All of the above is already declared in [`vercel.json`](vercel.json), so Vercel
will pick it up automatically. You should not need to type any of it into the
dashboard.

---

## Environment variables

Set these in **Vercel → Project → Settings → Environment Variables**, for the
**Production**, **Preview** and **Development** environments.

| Variable | Required | Purpose | If missing |
|---|---|---|---|
| `VITE_EMAILJS_SERVICE_ID` | **Yes** | EmailJS service | Contact form fails silently on every submission |
| `VITE_EMAILJS_TEMPLATE_ID` | **Yes** | EmailJS template | Same |
| `VITE_EMAILJS_PUBLIC_KEY` | **Yes** | EmailJS publishable key | Same |
| `VITE_SITE_URL` | **Yes for SEO** | Production origin, no trailing slash, e.g. `https://www.example.com` | Build still succeeds, but no `sitemap.xml`, no canonical tags and social preview images stay relative (and therefore broken) |

Copy the three EmailJS values from your local `.env` (they are not in git).
`.env.example` documents the full set.

> **These are not secrets.** Vite inlines every `VITE_*` variable into the public
> JavaScript bundle at build time. Anyone can read them with View Source. That is
> normal for EmailJS — the "public key" is designed to be public — but it does
> mean the endpoint is callable by anyone. Lock it down in the EmailJS dashboard
> with a domain allowlist and a rate limit.

**After changing any environment variable you must redeploy.** They are baked in
at build time, not read at runtime.

---

## Deploy steps

1. Commit and push this branch to GitHub.
2. In Vercel: **Add New → Project → Import** this repository.
3. Vercel reads `vercel.json` and pre-fills framework, build command and output
   directory. Leave them as detected.
4. Add the four environment variables above **before** the first build.
5. **Deploy.**
6. **Settings → Domains → Add** your custom domain, and follow Vercel's DNS
   instructions at your registrar:
   - apex (`example.com`) → `A` record to Vercel's IP, or `ALIAS`/`ANAME` if your
     registrar supports it
   - `www` → `CNAME` to `cname.vercel-dns.com`
   Pick one as primary and let Vercel redirect the other.
7. Once DNS resolves, set `VITE_SITE_URL` to the final primary URL and
   **redeploy** so `sitemap.xml` and the canonical tags are generated with the
   real domain.
8. Submit `https://<your-domain>/sitemap.xml` in Google Search Console.

### Post-deploy checks

- `/` loads and the scroll-scrub hero animates
- A deep link typed directly into the address bar works, e.g. `/products/toshiba/vrf-system`
  (this is what the `rewrites` rule in `vercel.json` provides — without it you get a 404)
- The contact form sends and a test enquiry actually arrives
- `/sitemap.xml` and `/robots.txt` return 200
- Tab titles change as you navigate between pages

---

## Base path — read before changing

The site is served from the **domain root**, so `vite.config.ts` sets `base: "/"`.

`src/App.tsx` derives the React Router `basename` from that value:

```ts
const BASENAME = import.meta.env.BASE_URL.replace(/\/$/, "") || "/";
```

This is deliberate. The two used to be hardcoded separately and drifting them
apart white-screened the entire site (commit `10768c8`). Change `base` and the
router follows automatically — never hardcode the basename again.

All 42 asset references in the codebase already go through
`import.meta.env.BASE_URL`, so they follow `base` too. **Never write a bare
`/images/...` path** — it will break the moment the base path changes.

---

## Relationship to the old GitHub Pages deploy

This project previously deployed to GitHub Pages at `/carrier/`. That is now
**disabled**: `.github/workflows/deploy.yml` no longer runs on push (it is
`workflow_dispatch` only), because a build made with `base: "/"` would 404 on
every asset when served from `github.io/carrier/`.

Two files remain from that setup and are harmless but unused on Vercel:

- `public/404.html` — the GitHub Pages SPA redirect shim. Vercel's rewrite rule
  handles deep links instead, so this file is never served.
- The small inline `<script>` at the top of `<body>` in `index.html` — the other
  half of that shim. It only fires on URLs shaped like `/?/path`, which Vercel
  never produces.

Leave them in place if you might return to GitHub Pages; deleting them is safe
otherwise. To actually go back you must change **both** `base` in
`vite.config.ts` and the trigger in the workflow file.

---

## What `postbuild` does

`npm run build` automatically runs `scripts/postbuild.mjs` afterwards. Using
`VITE_SITE_URL`, it writes into `dist/` only — the source tree is never modified:

1. generates `sitemap.xml` from `src/data/seo-routes.json` (20 URLs)
2. appends the `Sitemap:` directive to `robots.txt`
3. rewrites `og:image`, `twitter:image` and `og:url` in `index.html` to absolute
   URLs, and injects a baseline `<link rel="canonical">`

If `VITE_SITE_URL` is unset or malformed the script prints a warning and exits
cleanly. **It can never fail your build.**

When you add a route to `src/App.tsx`, add it to `src/data/seo-routes.json` too —
that one file feeds both the sitemap and the runtime `<Seo>` component.
