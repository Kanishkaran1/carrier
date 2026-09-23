# Project State

> **Audit date:** 2026-09-23 · **Auditor:** Claude Code (handover session, new laptop)
> **Method:** repository as source of truth — code, config, git history, and executed
> verification commands. Claims are tagged **[High]** (directly verified), **[Med]**
> (multiple converging clues), **[Low]** (inferred — confirm before acting).

---

## 1. Project Overview

**Comfort Aircon** — a single-page-application marketing/brochure website for an
air-conditioning dealership based in Puducherry, India. It is a **static frontend
only**: no backend, no database, no server-side code, no authentication. **[High]**

- Repo: `https://github.com/Kanishkaran1/carrier.git`, branch `master`
- Deployed to **GitHub Pages** under the sub-path `/carrier/` via GitHub Actions
- Business identity in-code: established 1999, 25 years in business, 70 staff,
  1000+ clients, authorised dealer for **Carrier, Toshiba, Midea** **[High]**
- Contact: `+91 98430 20458` · `admin@comfortair.co.in` ·
  295 Thiruvalluvar Salai, Raja Nagar, Pudupalaiyam, Puducherry 605013

The project originated from a **Lovable.dev** scaffold (`vite_react_shadcn_ts`) and
has since been heavily hand-modified. `README.md` is still the untouched Lovable
template and is **not authoritative** — `AGENTS.md` says so explicitly. **[High]**

## 2. Product Goal

Generate qualified leads for the dealership by presenting the brand as a premium
"advanced climate engineering" firm rather than a commodity AC reseller.

Evidence of intent (`prompt.md`, dated 2026-06-28, the newest planning artifact):
the site is meant to feel like Apple / Rivian / Tesla / Dyson product pages — a
cinematic, scroll-driven, continuous animated presentation built around a supplied
AC animation. **[High]**

Conversion paths actually implemented: EmailJS enquiry form, floating WhatsApp CTA,
`tel:` / `mailto:` links, embedded Google Map. **[High]**

## 3. Target Users

- **Primary:** Residential buyers in Puducherry / Chennai researching split, window,
  hi-wall and cassette ACs.
- **Secondary:** Commercial / institutional buyers (banks, offices, hospitals,
  retail) evaluating VRF, ducted, packaged systems and AMC service contracts.
- Client list in `src/pages/Clients.tsx` skews commercial: Canara Bank, SBI,
  Capgemini, TATA, L&T, Cafe Coffee Day, BLK Hospital, etc. **[High]**

Nothing in the repo suggests an admin, dealer-portal or logged-in user. **[High]**

## 4. Current Architecture

There is **one** layer. This is a pure client-rendered SPA served as static files.

```
Browser
  └── index.html  (Vite entry, base = /carrier/)
        └── src/main.tsx            → createRoot
              └── src/App.tsx       → QueryClientProvider ▸ TooltipProvider
                                      ▸ MotionConfig ▸ BrowserRouter(basename=/carrier)
                                      ▸ Suspense ▸ Routes
                    └── Layout.tsx  → Header · Outlet · Footer · WhatsAppButton
                          └── 21 page components (src/pages/*)
                                └── shared components (src/components/*)
                                      └── shadcn/ui primitives (src/components/ui/*)

External (browser → third party, no server hop):
  • EmailJS REST API   ← ContactForm.tsx submits here
  • wa.me              ← WhatsApp deep link
  • maps.google.com    ← iframe embed in Footer
```

- **Routing:** React Router v6, `BrowserRouter` with `basename="/carrier"`. Deep
  links on GitHub Pages are handled by the classic `404.html` → query-string
  redirect → `index.html` unshim trick (`public/404.html` + inline script in
  `index.html`). **[High]**
- **Code splitting:** `Index` ships eagerly (LCP); all other 20 routes are
  `React.lazy`. Manual rollup chunks: `react-vendor`, `motion`, `forms`. **[High]**
- **State:** local component state only. `@tanstack/react-query` is mounted in
  `App.tsx` but **has zero queries** — scaffolding, not used. **[High]**
- **No AI/LLM code anywhere in the product.** `prompt.md` and `AGENTS.md` are
  instructions *to* an AI assistant, not runtime features. **[High]**

## 5. Technology Stack

| Layer | Choice | Version |
|---|---|---|
| Build | Vite + `@vitejs/plugin-react-swc` | 5.4.19 |
| Language | TypeScript (**strict off**) | 5.8.3 |
| UI | React | 18.3.1 |
| Routing | react-router-dom | 6.30.1 |
| Styling | Tailwind CSS v3 + CSS custom properties | 3.4.19 |
| Components | shadcn/ui on Radix UI (~50 primitives) | various |
| Animation | framer-motion | 11.18.2 |
| Forms | react-hook-form + zod + @hookform/resolvers | 7.61 / 3.25 |
| Email | @emailjs/browser | 4.4.1 |
| Icons | lucide-react | 0.462.0 |
| Tests | Vitest + jsdom + Testing Library | 3.2.4 |
| Lint | ESLint 9 flat config + typescript-eslint | 9.32 |
| CI/CD | GitHub Actions → `peaceiris/actions-gh-pages@v4` | — |

**Installed but never imported in `src/`** — dead weight **[High]**:
`gsap`, `lenis`, `three`, `@react-three/fiber`, `@react-three/drei`,
`@types/three`, `date-fns`. (`gsap`/`lenis` were added for the `prompt.md`
direction but the scroll work was hand-rolled with canvas + rAF instead.)

**Two lockfiles present:** `package-lock.json` (Jun 16, authoritative — CI runs
`npm ci`) and a stale `bun.lockb` (Jun 2). **[High]**

## 6. Major Features

1. **Scroll-scrubbed frame-sequence hero** (`VideoScrubHero.tsx`) — 120 JPEG frames
   in `public/frames/` drawn to a `canvas`, frame index mapped from scroll
   position across an 800vh sticky wrapper. Includes scroll-progress bar, aurora
   orbs, engineering grid, airflow particle canvas, magnetic CTA.
2. **Airflow particle simulation** (`AirflowCanvas.tsx`) — 2D canvas streamlines,
   DPR-capped, IntersectionObserver-paused, disabled under reduced motion.
3. **Cinematic homepage** (`Index.tsx`, 998 lines) — 9 sections: hero, animated
   stat counters, about split, brand spotlight, services, why-choose-us, product
   categories, client marquee, lead-gen contact.
4. **Mega-menu header** (`Header.tsx`, 582 lines) — desktop brand→product dropdown,
   mobile drawer with body-scroll lock and focus return.
5. **14 product detail pages** — 7 Carrier, 4 Toshiba, 3 Midea; each a thin
   `PageBanner` + `ProductCard` grid over a hardcoded array.
6. **Contact form** — react-hook-form + zod validation → EmailJS → sonner toast.
7. **3D tilt cards** (`TiltCard.tsx`) — pointer-reactive perspective tilt, glow and
   glare, written straight to the DOM via refs, inert under reduced motion.
8. **PWA-ish shell** — `site.webmanifest`, full icon set, `robots.txt`.
9. **Accessibility baseline** — skip link, `aria-label`s, `sr-only` labels,
   `prefers-reduced-motion` respected globally and per-component.

## 7. Feature Status

| # | Feature | Status | Evidence | Missing / Broken | Priority |
|---|---|---|---|---|---|
| 1 | Routing + 21 pages | **Complete** | `App.tsx`, all page files exist and build | — | — |
| 2 | Header / mega-menu / mobile drawer | **Complete** | `Header.tsx` 582 LOC, scroll lock + focus mgmt | — | — |
| 3 | Footer + map embed | **Complete** | `Footer.tsx` 211 LOC | — | — |
| 4 | Scroll-scrub hero | **Partial** | `VideoScrubHero.tsx` renders and builds | No redraw after window resize; no redraw after late frame load; all 120 frames preloaded eagerly on mobile too | **High** |
| 5 | Airflow canvas | **Complete** | `AirflowCanvas.tsx`, visibility-paused | — | — |
| 6 | Homepage sections | **Complete** | `Index.tsx` sections 2–9 all render | Contains 140 lines of dead `CinematicHero` | Med |
| 7 | Product detail pages | **Partial** | 14 pages exist | 3 Toshiba pages missed the dark-theme rollout (see §10) | **High** |
| 8 | Contact form (local dev) | **Complete** | `.env` present, IDs inline into bundle | — | — |
| 9 | Contact form (**production**) | **BROKEN** | `deploy.yml` has no `env:` / secrets | CI build inlines `undefined` for all three `VITE_EMAILJS_*` → every deployed submission fails | **P0** |
| 10 | Dark "cinematic" theme rollout | **Partial** | 18 of 21 pages use `bg-cinema` | 3 Toshiba pages still light-themed | **High** |
| 11 | `ProductCard` redesign | **BROKEN** | `git diff` — passes `glareMaxOpacity` | `TiltCard` has no such prop → `tsc` error TS2322; prop silently ignored at runtime | **P0** |
| 12 | `npm run lint` | **BROKEN** | 40 errors, all from `my-app/.next/**` | eslint config only ignores `dist` | **High** |
| 13 | Automated tests | **Not started** | `src/test/example.test.ts` = `expect(true).toBe(true)` | Zero real coverage | Med |
| 14 | Per-route SEO (title/meta/canonical) | **Not started** | no helmet, no `document.title` | All 21 routes share one page title | **High** |
| 15 | Social preview images (og/twitter) | **BROKEN** | `dist/index.html` keeps `content="/images/..."` | Vite rewrites `href=` but not `content=` → 404 under `/carrier/` | Med |
| 16 | Web app manifest | **BROKEN** | `dist/site.webmanifest` | `start_url:"/"` and `/icons/...` not base-prefixed | Med |
| 17 | 3D hero (`3D_PLAN.md`) | **Abandoned** | `Hero3D.tsx` exists, imported by nothing | Superseded by frame-scrub hero; three.js still installed | Med |
| 18 | GSAP + Lenis scroll (`prompt.md`) | **Not started** | both installed, zero imports | Hand-rolled rAF used instead | Low |
| 19 | Next.js rewrite (`my-app/`) | **Not started** | untouched `create-next-app` default page | Empty experiment; also an un-declared nested git repo | Med |
| 20 | `sitemap.xml` | **Not started** | absent from `public/` | — | Med |
| 21 | Testimonials section (`REFINEMENT_PLAN.md` §5) | **Not started** | no testimonial data/markup in `Index.tsx` | Planned, never built | Low |
| 22 | Reduced-motion support | **Complete** | global CSS media query + `useReducedMotion` per component | — | — |

### Summary buckets

- **COMPLETED:** routing, header, footer, all page shells and copy, airflow canvas,
  tilt cards, homepage sections, form validation, reduced-motion safety, GH Pages
  SPA deep-link shim, code splitting.
- **PARTIALLY COMPLETED:** dark theme rollout (18/21 pages), scroll-scrub hero
  (works but has redraw gaps and no mobile budget), `ProductCard` modernisation.
- **NOT STARTED:** per-route SEO, sitemap, real tests, testimonials, GSAP/Lenis,
  Next.js migration.
- **BROKEN:** production EmailJS credentials, `ProductCard` type error,
  `npm run lint`, og/twitter image URLs, web manifest URLs.
- **UNKNOWN:** whether the site is currently live and at which URL; whether the
  `/carrier/` sub-path is final or a custom domain is planned; whether `my-app/`
  should be revived or deleted; whether the EmailJS account is still active.

## 8. Current Development Phase

**Phase: "cinematic dark redesign" — mid-rollout, uncommitted.** **[High]**

The reconstructed timeline:

1. **Jun 2** — Lovable scaffold + three planning docs written the same day
   (`REFINEMENT_PLAN.md`, `3D_PLAN.md`, then `FUTURE_REFINEMENT_PLAN.md` and
   `FINAL_REFINEMENT_REPORT.md` that evening). Original palette: **red** primary.
2. **Jun 15–16** — `FUTURE_REFINEMENT_PLAN.md` executed: palette shifted red →
   **Electric HVAC Blue** (`--primary: 197 96% 40%`) with an `ice`/`electric`/
   `abyss`/`depth` extended palette. `AGENTS.md` written. `my-app/` Next.js
   experiment created and abandoned the same day.
3. **Jun 22** — Everything committed at once (`f2872b5` "Initial commit"), then
   four rapid GitHub Pages fixes: Actions workflow, `basename`, asset paths.
4. **Jun 28** — `prompt.md` written (the cinematic brief). Frame-scrub hero built.
   Last commit `714b2fd` "fix:scroll animation and increase scroll extent"
   (`h-scrub-area-lg` = 800vh).
5. **After Jun 28 — never committed** — the dark-theme rollout across the *inner*
   pages: 21 modified files, +336/−215 lines, still sitting in the working tree.

So: the homepage redesign landed; **the inner-page redesign is half-finished and
uncommitted**, and it does not currently typecheck.

## 9. Completed Work

- Full site information architecture: 21 routes, mega-menu, footer, breadcrumbs.
- Complete product catalogue content (14 brand/category pages + images).
- Design system: HSL token set in `src/index.css`, 10 custom keyframes and
  animations in `tailwind.config.ts`, custom utilities (`.bg-cinema`,
  `.glass-card`, `.grid-lines`, `.dot-grid`, `.border-gradient-ice`,
  `.text-ice-gradient`, `.h-screen-vh`, `.h-scrub-area-lg`).
- Homepage cinematic rebuild (frame-scrub hero + 8 further sections).
- GitHub Pages pipeline that builds and publishes on every `master` push.
- Accessibility and reduced-motion baseline.
- Performance work: route-level lazy loading, manual vendor chunks, lazy
  `ContactForm`, `loading="lazy"` on non-LCP images, DPR caps, rAF-only animation.

## 10. In-Progress Work (uncommitted, in the working tree)

`git diff` shows 21 modified files, +336/−215. The theme is consistent: convert
every inner page from the old light theme to the dark cinematic theme.

Per-file intent:

| File | Change |
|---|---|
| `src/pages/About.tsx` | +129 — full dark rebuild, `SectionLabel`, framer variants |
| `src/pages/Contact.tsx` | +104 — icon-led contact list, staggered reveals |
| `src/pages/Services.tsx` | +55 — dark surfaces, hover glow |
| `src/pages/Products.tsx`, `Clients.tsx` | dark surfaces + `dot-grid` overlay |
| 10 × product pages | wrapper gains `bg-cinema text-white min-h-screen`, `dot-grid` overlay, `py-16`→`py-24`, BOM character stripped from line 1 |
| `src/components/ProductCard.tsx` | glass card, gradient border, arrow affordance — **introduces the `glareMaxOpacity` type error** |
| `src/components/Header.tsx`, `Footer.tsx`, `ContactForm.tsx`, `PageBanner.tsx` | radius/colour polish |

**Three product pages were missed:** `ToshibaDuctedAC.tsx`, `ToshibaHiWallAC.tsx`,
`ToshibaVRFSystem.tsx` still render the old light theme. Navigating to them from a
dark page produces a jarring white flash. **[High]**

## 11. Missing Work

- Per-route page title, meta description, canonical URL, JSON-LD LocalBusiness.
- `sitemap.xml`.
- Any meaningful automated test.
- Testimonials section (specified in `REFINEMENT_PLAN.md` §5, never built).
- A decision on `my-app/` (revive as the Next.js rewrite, or delete).
- `.env.example`.
- Image optimisation: several source JPEG/PNGs are unoptimised; no responsive
  `srcset` beyond the logo's `picture` element.
- Analytics / conversion tracking of any kind.
- Form spam protection (honeypot, rate limit, or EmailJS domain allowlist).

## 12. Known Bugs

Ordered by severity. All verified by executing the relevant command. **[High]**

| # | Bug | Impact | Location |
|---|---|---|---|
| B1 | CI has no `VITE_EMAILJS_*` — production build inlines `undefined` | **Every enquiry submitted on the live site fails.** Silent lead loss | `.github/workflows/deploy.yml` |
| B2 | `glareMaxOpacity` passed to `TiltCard`, which has no such prop | `tsc` fails (TS2322). Build still passes because SWC skips typechecking, so the glare intensity is silently ignored | `src/components/ProductCard.tsx:21` vs `src/components/TiltCard.tsx:22-34` |
| B3 | `npm run lint` fails with 40 errors, **all** from `my-app/.next/**` build artifacts | Lint is unusable as a signal; no pre-commit gate | `eslint.config.js` — `ignores: ["dist"]` only |
| B4 | 3 Toshiba pages missed the dark-theme rollout | White flash / broken visual continuity | `ToshibaDuctedAC.tsx`, `ToshibaHiWallAC.tsx`, `ToshibaVRFSystem.tsx` |
| B5 | Hero canvas resize handler sets `canvas.width/height` (which clears the canvas) and never redraws | Hero goes blank on window resize / devtools open / orientation change until the frame index next changes | `VideoScrubHero.tsx:91-102` |
| B6 | Scroll handler bails with `if (!img?.complete) return;` and schedules no retry | If the user scrolls faster than frames download (slow network), the canvas freezes on a stale frame | `VideoScrubHero.tsx:162` |
| B7 | All 120 frames (~1.7 MB) preloaded unconditionally on mount, including mobile | Wasted mobile data; competes with LCP | `VideoScrubHero.tsx:118-125` |
| B8 | `og:image` / `twitter:image` use `content="/images/..."` — Vite rewrites `href=` but not `content=` | Social previews 404 (`/images/...` instead of `/carrier/images/...`) | `index.html:27,37` → verified in `dist/index.html` |
| B9 | `site.webmanifest` has `start_url:"/"` and `/icons/...` | Installed-PWA icons and launch URL wrong on GitHub Pages | `public/site.webmanifest` |
| B10 | `public/videos/AC_animation.mp4` (2.7 MB) is referenced only by dead code | Ships in `dist/` for nothing | `Index.tsx:162` inside unused `CinematicHero` |
| B11 | Tailwind build warning: class `duration-[1.2s]` is ambiguous | Cosmetic; that transition may not apply | emitted during `npm run build` |
| B12 | `caniuse-lite` data is 15 months stale | Autoprefixer may target wrong browsers | `npx update-browserslist-db@latest` |

## 13. Environment Requirements

Verified working on **this** laptop (Windows 11, `C:\Dev\Projects\carrier-main`): **[High]**

| Requirement | Needed | Present here |
|---|---|---|
| Node.js | >= 20 (CI pins 20) | **v24.21.0** OK (works; CI uses 20) |
| npm | any modern | **11.19.0** OK |
| Bun | not required | not installed — fine, `bun.lockb` is stale |
| `node_modules/` (root) | yes | present, install is current |
| `node_modules/` (`my-app/`) | only if reviving | present |
| `.env` | yes, for the contact form | present with all 3 values set |
| Database / Docker / Python | **none** | n/a |
| Ports | dev `8080` (root), `3000` (`my-app`) | free |

No database, no message queue, no worker, no container, no cloud SDK, no
credentials beyond EmailJS.

## 14. Required Environment Variables

File: `.env` at repo root (git-ignored). Vite exposes only `VITE_`-prefixed vars,
and **inlines them into the public JS bundle at build time** — treat all three as
publicly visible, not as secrets.

| Variable | Purpose | Where read |
|---|---|---|
| `VITE_EMAILJS_SERVICE_ID` | EmailJS service | `src/components/ContactForm.tsx:32` |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS template | `src/components/ContactForm.tsx:33` |
| `VITE_EMAILJS_PUBLIC_KEY` | EmailJS publishable key | `src/components/ContactForm.tsx:34` |

All three are set locally. **None are configured in GitHub Actions** — that is bug
B1. They must be added as repository secrets *and* wired into the `npm run build`
step's `env:` block. There is no `.env.example`; one should be added.

## 15. How To Run

```bash
cd C:/Dev/Projects/carrier-main
npm install            # only if node_modules is missing or package.json changed
npm run dev            # → http://localhost:8080/carrier/   (note the /carrier/ path)
```

The `/carrier/` sub-path is mandatory in dev too — `vite.config.ts` sets
`base: "/carrier/"` and `App.tsx` sets `basename="/carrier"`. `http://localhost:8080/`
alone will not render the app.

```bash
npm run build          # → dist/
npm run preview        # serve dist/ locally
npm run build:dev      # development-mode bundle
```

Nested Next.js experiment (currently the stock template, not part of the product):

```bash
cd my-app && npm install && npm run dev   # → http://localhost:3000
```

## 16. How To Test

```bash
npm run test           # vitest run   — PASSES (1 trivial test)
npm run test:watch
npx tsc -p tsconfig.app.json --noEmit   # FAILS — 1 error (B2). Use this, not `npx tsc`:
                                        # the root tsconfig has "files": [] and checks nothing.
npm run lint           # FAILS — 40 errors, all from my-app/.next (B3)
npm run build          # PASSES in ~5s
```

There is no e2e, visual-regression or Lighthouse check.

## 17. Database / Infrastructure Requirements

**None.** No database, ORM, migration, seed, queue, worker, cron or container
exists anywhere in the repo. **[High]**

Infrastructure is: GitHub Actions builds on push to `master` and publishes `dist/`
to the `gh-pages` branch via `peaceiris/actions-gh-pages@v4` using the built-in
`GITHUB_TOKEN`. Client-side email delivery is EmailJS's hosted service.

## 18. Important Files

| File | What it does | Why it matters | Stability |
|---|---|---|---|
| `src/App.tsx` | Providers + all 21 route definitions | Every new page is registered here | Stable |
| `src/pages/Index.tsx` (998 L) | Whole homepage, 9 sections | Largest and most-edited file; also holds dead `CinematicHero` and a duplicate `SectionLabel` | **Risky** |
| `src/components/VideoScrubHero.tsx` (341 L) | Frame-sequence scroll hero | The site's signature element; has 3 open bugs (B5–B7) | **Fragile** |
| `src/components/Header.tsx` (582 L) | Mega-menu + mobile drawer | Complex focus/scroll-lock logic; easy to regress | Stable but delicate |
| `src/components/TiltCard.tsx` | Shared 3D-tilt surface | Used by `ProductCard`, `Index`, `Products`; **needs a `glareMaxOpacity` prop** | Stable |
| `src/components/ProductCard.tsx` | Tile on all 14 product pages | One edit propagates to 14 pages; currently type-broken | **Broken** |
| `src/components/ContactForm.tsx` | The only lead-capture mechanism | Revenue path; broken in production (B1) | Stable code, broken config |
| `src/index.css` (288 L) | Design tokens + custom utilities | Every colour and glass/grid effect originates here | Stable |
| `tailwind.config.ts` | Palette mapping + 10 keyframes | Paired with `index.css`; change both together | Stable |
| `vite.config.ts` | `base: "/carrier/"`, chunking, port 8080 | Changing `base` without changing `basename` in `App.tsx` white-screens the site | **Do not touch casually** |
| `.github/workflows/deploy.yml` | Build + publish | Missing the EmailJS `env:` block (B1) | **Incomplete** |
| `public/frames/*.jpg` (120 files, 1.7 MB) | Hero frame sequence | Deleting them blanks the hero | Stable |
| `AGENTS.md` | Authoritative agent instructions | Says README is *not* authoritative | Stable |
| `prompt.md` | The cinematic design brief (Jun 28) | The newest statement of product direction | Reference |
| `PROJECT_MAP.md` | Earlier structural map | **Stale** — documents the old red palette | Outdated |

## 19. Technical Debt

Ranked by severity.

1. **Broken lint gate (B3)** — 40 errors from `my-app/.next/**`. Nothing enforces
   code quality; new errors in `src/` are invisible under the noise. *Severity: High.*
2. **`Index.tsx` is 998 lines** containing a page, a dead 140-line `CinematicHero`,
   a duplicate `SectionLabel`, a duplicate `Magnetic`, and a fourth copy of the
   motion variants. *Severity: High.*
3. **Triplicated motion language** — `EASE`/`fadeUp`/`fadeLeft`/`stagger` are
   defined in `src/lib/motion.ts`, again in `Index.tsx:41-64`, and again in
   `VideoScrubHero.tsx:16-25`. `src/lib/motion.ts` is the intended home. *High.*
4. **Dead code** — `Hero3D.tsx` (138 L, three.js), `ScrollToTop.tsx`, `NavLink.tsx`,
   `CinematicHero`, `public/videos/AC_animation.mp4` (2.7 MB). *Medium.*
5. **Unused dependencies** — `three`, `@react-three/fiber`, `@react-three/drei`,
   `@types/three`, `gsap`, `lenis`, `date-fns`. Slow installs, false signals about
   the architecture. *Medium.*
6. **~50 shadcn/ui primitives shipped, ~12 used.** Not in the bundle (tree-shaken)
   but a large maintenance and audit surface. *Low.*
7. **TypeScript strictness disabled** — `strict`, `strictNullChecks`,
   `noImplicitAny` all off in both tsconfigs. A whole class of bug is invisible. *Medium.*
8. **`my-app/` is an undeclared nested git repository** — tracked in the parent as a
   gitlink (`160000`) with **no `.gitmodules`**. `git status` reports it perpetually
   dirty; clones will get an empty directory. *Medium.*
9. **Two lockfiles** (`package-lock.json` + stale `bun.lockb`). *Low.*
10. **`README.md` is still the Lovable template** with `REPLACE_WITH_PROJECT_ID`
    placeholders. *Low but embarrassing if public.*
11. **Hardcoded content everywhere** — products, stats, clients, testimonials-to-be
    live as inline arrays across 14+ files. Any catalogue change is a code change. *Medium.*
12. **`dist/` is present in the working tree** (git-ignored) and stale relative to
    source. Confusing. *Low.*

## 20. Security Concerns

No authentication, no user data storage, no server — the attack surface is small.

1. **EmailJS credentials are inlined into public JS.** Verified: the service ID is
   present in `dist/assets/ContactForm-*.js`. This is by design for EmailJS (the
   "public key" is meant to be public), but it means **anyone can POST to your
   EmailJS template from anywhere**. Mitigation is EmailJS-side: enable the domain
   allowlist and a rate limit / captcha in the EmailJS dashboard. *Severity: Medium.*
2. **No spam protection on the form** — no honeypot, no captcha, no throttle. Given
   (1), the enquiry inbox is trivially floodable, and EmailJS quota is exhaustible. *Medium.*
3. **`.env` is correctly git-ignored** and no secret is committed. Verified.
4. **Third-party iframe** (Google Maps) and `target="_blank"` links — the WhatsApp
   links correctly carry `rel="noopener noreferrer"`.
5. **`.claude/settings.local.json` is git-ignored** but contains permission entries
   referencing unrelated projects (`F:/SB/SB`, `F:\birthday-star-quest`). Harmless,
   but machine-specific cruft from the previous laptop. *Low.*
6. **No Content-Security-Policy** — GitHub Pages cannot set headers, so this would
   need a `meta http-equiv` tag. *Low.*
7. **`npm audit` was not run** as part of this audit. *Unknown — verify.*

## 21. Next Recommended Development Steps

See `DEVELOPMENT_ROADMAP.md` for the full task breakdown. In short:

1. Fix the EmailJS production build (B1) — highest business impact.
2. Fix the `TiltCard` / `ProductCard` type error (B2) so `tsc` is green again.
3. Finish the dark-theme rollout on the 3 remaining Toshiba pages (B4).
4. Make `npm run lint` meaningful by ignoring `my-app/**` and `**/.next/**` (B3).
5. Commit the working-tree redesign once 2–4 are done — it has been uncommitted
   since late June and is the single largest risk of losing work.
6. Fix the hero canvas redraw gaps and add a mobile frame budget (B5–B7).
7. Add per-route SEO + `sitemap.xml` + fix og/manifest URLs (B8, B9).

## 22. Open Questions / Unknowns

Confirm these before acting — none can be answered from the repository alone.

1. **Is the site live, and where?** The config implies
   `https://kanishkaran1.github.io/carrier/`, but that was not verified from here.
   Is a custom domain (e.g. `comfortair.co.in`) planned? If so, `base` and
   `basename` both change.
2. **Is the EmailJS account still active,** and do the three IDs in `.env` still
   work? Not testable without sending a live email.
3. **Should `my-app/` be revived or deleted?** `prompt.md` says "Use Next.js", which
   would mean a full rewrite; `AGENTS.md` treats it as a live subproject; the code
   is an untouched template. This is the single biggest strategic ambiguity.
4. **Was the uncommitted redesign intentionally left uncommitted,** or did the
   laptop transfer interrupt it? The 3 skipped Toshiba pages suggest interruption.
5. **Is the `prompt.md` cinematic brief still the goal?** It asks for GSAP +
   ScrollTrigger + Lenis + per-section pinned chapters; what shipped is a single
   hand-rolled canvas scrubber on the hero only. Roughly 20% of that brief is built.
6. **Are the stats real?** "25 years", "70 experts", "1000+ clients", "1000 servicing
   locations" are hardcoded marketing claims — the business should verify them.
7. **Client logos** — `Clients.tsx` lists 26 third-party brand names as text. If
   logos are ever added, trademark permission matters.
8. **Is `bun.lockb` intentional?** Was Bun ever the intended runtime?
