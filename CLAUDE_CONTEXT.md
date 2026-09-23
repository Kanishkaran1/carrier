# Claude Context — Comfort Aircon

> Fast-start briefing for a new AI session. Read this first, then
> [`PROJECT_STATE.md`](PROJECT_STATE.md) for detail and
> [`DEVELOPMENT_ROADMAP.md`](DEVELOPMENT_ROADMAP.md) for what to do next.
> Last verified: **2026-09-23**.

---

## Purpose

Static marketing/lead-gen website for **Comfort Aircon**, an air-conditioning
dealership in Puducherry, India — authorised dealer for **Carrier, Toshiba, Midea**.
Goal: look like a premium climate-engineering firm and convert visitors into
enquiries. No backend, no database, no auth, no users. Just a brochure site with a
contact form.

## Architecture

Single-layer client-rendered SPA. Static files on GitHub Pages.

```
index.html → src/main.tsx → src/App.tsx (providers + 21 routes)
   → Layout.tsx (Header · Outlet · Footer · WhatsAppButton)
      → src/pages/*  →  src/components/*  →  src/components/ui/* (shadcn)

Browser talks directly to: EmailJS API · wa.me · Google Maps iframe
```

## Tech stack

Vite 5 + React 18 + TypeScript (**strict off**) + Tailwind 3 + shadcn/ui (Radix) +
framer-motion 11 + react-router-dom 6 + react-hook-form/zod + @emailjs/browser.
Vitest + jsdom for tests. ESLint 9 flat config. Deployed by GitHub Actions to
`gh-pages`.

## Current phase

**Cinematic dark redesign — mid-rollout, uncommitted.** The homepage redesign is
committed (last commit `714b2fd`, 2026-06-28). The inner-page dark-theme rollout
sits in the working tree: **21 modified files, +336/−215, never committed**, and it
**does not typecheck**.

## Implementation status (short form)

- **Works:** all 21 routes, mega-menu header, footer, product pages, scroll-scrub
  hero, airflow canvas, tilt cards, form validation, reduced-motion support,
  GH Pages deep-link shim, code splitting.
- **Half-done:** dark theme (18/21 pages), hero scrubber (3 bugs), `ProductCard`
  redesign (type error).
- **Broken:** production EmailJS config, `tsc`, `npm run lint`, og/twitter image
  URLs, web manifest URLs.
- **Never started:** per-route SEO, sitemap, real tests, testimonials, GSAP/Lenis,
  Next.js rewrite.

## Important decisions already made

1. **Palette shifted red → Electric HVAC Blue** (`--primary: 197 96% 40%`) with an
   `ice` / `electric` / `steel` / `abyss` / `depth` extended palette.
   `PROJECT_MAP.md` still documents the *old red* palette — **it is stale, ignore it.**
2. **The 3D hero was abandoned.** `3D_PLAN.md` describes a three.js fan impeller;
   `Hero3D.tsx` exists but is imported by nothing. Superseded by the frame-scrub hero.
3. **GSAP and Lenis were never used** despite `prompt.md` mandating them and both
   being installed. The scroll scrubber is hand-rolled canvas + rAF.
4. **No webfonts** — system font stack only, deliberately, for LCP.
5. **EmailJS instead of a backend** — the project is intentionally serverless.
6. **`base: "/carrier/"`** everywhere because it is a GitHub *project* Pages site.

## Coding conventions

- Path alias `@/` → `./src`.
- Components: `PascalCase.tsx`, arrow function, `export default` at the bottom.
- shadcn primitives live in `src/components/ui/` — **do not hand-edit them.**
- Styling is Tailwind utilities + custom utilities defined in `src/index.css`
  (`.bg-cinema`, `.glass-card`, `.grid-lines`, `.dot-grid`, `.border-gradient-ice`,
  `.text-ice-gradient`, `.h-screen-vh`, `.h-scrub-area-lg`). Colours always go
  through HSL CSS variables — never hardcode a hex.
- Shared motion variants belong in `src/lib/motion.ts` (currently duplicated in
  `Index.tsx` and `VideoScrubHero.tsx` — consolidate, don't add a fourth copy).
- **Every** animated component must honour `useReducedMotion()` / the global
  `prefers-reduced-motion` block at the end of `index.css`.
- **All asset URLs must use `import.meta.env.BASE_URL`** — 42 call sites do. A bare
  `/images/...` breaks on GitHub Pages. Two of the last five commits were fixing
  exactly this.
- Product pages are deliberately thin: a hardcoded array + `PageBanner` +
  `ProductCard` grid. Keep that shape.

## Important files

| File | Note |
|---|---|
| `src/App.tsx` | Providers + all 21 routes; register new pages here |
| `src/pages/Index.tsx` | 998 lines, 9 homepage sections — the biggest file |
| `src/components/VideoScrubHero.tsx` | Signature scroll hero; fragile, 3 open bugs |
| `src/components/Header.tsx` | 582 lines; delicate focus + scroll-lock logic |
| `src/components/TiltCard.tsx` | Shared tilt surface; needs a `glareMaxOpacity` prop |
| `src/components/ProductCard.tsx` | Used by all 14 product pages; currently type-broken |
| `src/components/ContactForm.tsx` | The only lead-capture path |
| `src/index.css` | All design tokens and custom utilities |
| `vite.config.ts` | `base: "/carrier/"` — see the warning below |
| `.github/workflows/deploy.yml` | Build + publish; missing the EmailJS `env:` block |
| `AGENTS.md` | Authoritative agent rules (README is **not**) |
| `prompt.md` | Newest design brief (2026-06-28); ~20% implemented |

## Development commands

```bash
npm run dev      # http://localhost:8080/carrier/   ← the /carrier/ path is REQUIRED
npm run build    # → dist/        PASSES
npm run preview
npm run test     # vitest run     PASSES (1 trivial test)
npm run lint     # BROKEN — 40 errors, all from my-app/.next
npx tsc -p tsconfig.app.json --noEmit   # BROKEN — 1 error (ProductCard)
```

`npx tsc` with no `-p` checks **nothing** — the root `tsconfig.json` has
`"files": []` and only holds project references. Always pass `-p tsconfig.app.json`.

## Environment requirements

Node >= 20 (v24.21.0 here, works; CI pins 20), npm. No database, Docker, Python or
cloud SDK. `.env` at the repo root, git-ignored, holds three variables:

```
VITE_EMAILJS_SERVICE_ID
VITE_EMAILJS_TEMPLATE_ID
VITE_EMAILJS_PUBLIC_KEY
```

All three are present on this machine. Vite **inlines** them into the public bundle
at build time — they are not secrets, and the EmailJS endpoint is publicly callable.

## Known problems

1. **P0** — CI has no EmailJS secrets → the live contact form inlines `undefined`
   and every enquiry fails silently.
2. **P0** — `ProductCard.tsx` passes `glareMaxOpacity` to `TiltCard`, which has no
   such prop → `tsc` TS2322. The build passes anyway because SWC skips typechecking.
3. `npm run lint` — 40 errors, all from `my-app/.next/**`; eslint only ignores `dist`.
4. 3 Toshiba pages (`ToshibaDuctedAC`, `ToshibaHiWallAC`, `ToshibaVRFSystem`) missed
   the dark-theme rollout and still flash white.
5. Hero canvas does not redraw after a window resize, and freezes on a stale frame
   if the user out-scrolls the frame download.
6. All 120 hero frames (~1.7 MB) preload on mount, mobile included.
7. `og:image` / `twitter:image` and `site.webmanifest` are not base-path-prefixed.
8. No per-route titles or meta descriptions — 21 routes share one title.
9. `my-app/` is an undeclared nested git repo (gitlink, no `.gitmodules`) containing
   an untouched `create-next-app` template.

## Current priorities

1. Wire the EmailJS secrets into `deploy.yml` (needs the owner to add repo secrets).
2. Add `glareMaxOpacity` to `TiltCard` — restores a green `tsc`.
3. Dark-theme the 3 remaining Toshiba pages.
4. Fix the eslint `ignores` list.
5. **Commit the redesign** once 2–4 are done.
6. Fix the hero redraw bugs; budget the frame preload for mobile.
7. Per-route SEO + sitemap + base-path metadata fixes.

## Do NOT change without understanding the dependencies

- **`base` in `vite.config.ts` and `basename` in `App.tsx` must change together.**
  Commit `10768c8` was a white-screen fix for exactly this mismatch.
- **`public/404.html` + the inline script in `index.html`** are the GitHub Pages SPA
  deep-link shim. They look like dead code. They are not — removing either 404s
  every URL except the homepage.
- **`import.meta.env.BASE_URL` on every asset path.** Two commits exist purely to
  fix hardcoded `/images/` paths.
- **`public/frames/*.jpg`** — 120 files the hero reads by index. Renaming, renumbering
  or deleting any of them blanks the hero.
- **`src/components/ui/*`** — generated shadcn primitives; regenerate rather than edit.
- **`h-scrub-area-lg` (800vh) in `index.css`** — sets the hero's scroll travel. The
  last commit deliberately increased it; changing it re-tunes the whole hero feel.
- **`.gitignore` ignores `.env.*`** — a future `.env.example` needs a `!` negation.
- **`Header.tsx` body-scroll lock** — the fixed-position iOS Safari workaround is
  load-bearing; naive `overflow:hidden` breaks mobile.

## Next planned work

Per `DEVELOPMENT_ROADMAP.md`: P0 (EmailJS CI secrets, TiltCard prop) → P1 (finish
the theme rollout, fix lint, **commit the redesign**, hero redraw fixes, per-route
SEO) → P2 (base-path metadata, mobile frame budget, dead-code removal, decide
`my-app/`, deduplicate motion helpers, `.env.example` + README, sitemap, real tests).

## Open questions — ask the owner, do not assume

1. Is the site live, and at what URL? Is a custom domain planned? (Changes `base`.)
2. Is the EmailJS account still active and are the IDs in `.env` still valid?
3. Keep, properly submodule, or delete `my-app/`?
4. Is `prompt.md`'s full cinematic brief (GSAP/Lenis/13 chapters/Next.js) still the
   goal, or is the current hand-rolled hero the accepted end state?
5. Are the hardcoded marketing stats (25 years, 70 experts, 1000+ clients) accurate?
