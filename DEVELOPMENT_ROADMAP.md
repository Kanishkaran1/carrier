# Development Roadmap

> Derived from the 2026-09-23 audit. Every task below traces to something actually
> found in the repository — no speculative features. Companion doc:
> [`PROJECT_STATE.md`](PROJECT_STATE.md). Bug IDs (B1…B12) refer to §12 there.
>
> **Nothing here has been started.** This is a proposal awaiting approval.

---

## P0 — Critical

*Things preventing the project from functioning correctly in production.*

### P0-1 · Wire EmailJS credentials into the GitHub Actions build
- **Objective:** Make the live contact form actually deliver enquiries.
- **Why it matters:** `.github/workflows/deploy.yml` runs `npm run build` with no
  `env:` block. Vite inlines `import.meta.env.VITE_*` at build time, so the deployed
  bundle contains `undefined` for all three IDs. Verified: the local build *does*
  contain the service ID (`dist/assets/ContactForm-*.js`) because `.env` exists
  here — CI has no `.env`. **Every lead submitted on the live site is silently lost.**
- **Relevant files:** `.github/workflows/deploy.yml`, `src/components/ContactForm.tsx`
- **Dependencies:** Repository owner must add three GitHub repository secrets
  (`VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`).
  I cannot do this from here.
- **Expected result:** An `env:` block on the build step; deployed bundle contains
  the real IDs.
- **Verify:** After deploy, `curl` the built `ContactForm-*.js` from the live site
  and grep for the service ID; then submit a real test enquiry and confirm arrival.

### P0-2 · Fix the `TiltCard` / `ProductCard` type error
- **Objective:** Restore a green `tsc`.
- **Why it matters:** The uncommitted `ProductCard.tsx` passes `glareMaxOpacity={0.12}`
  to `TiltCard`, which declares no such prop → `TS2322`. The Vite build uses SWC,
  which does **not** typecheck, so this shipped silently: the glare stays at the
  hardcoded `0.10` and the intended design tweak never took effect. It also means
  `tsc` currently cannot be used as a gate.
- **Relevant files:** `src/components/TiltCard.tsx` (props interface + the glare
  gradient at lines 115-125), `src/components/ProductCard.tsx:21`
- **Dependencies:** none.
- **Expected result:** `TiltCard` accepts an optional `glareMaxOpacity` (default
  `0.10`) and feeds it into the glare `radial-gradient` alpha. Preferred over
  deleting the prop from `ProductCard`, because the prop was clearly intentional.
- **Verify:** `npx tsc -p tsconfig.app.json --noEmit` exits 0; visually confirm a
  product card's glare is brighter than before.

---

## P1 — High Priority

*Required to finish the current milestone (the cinematic dark redesign).*

### P1-1 · Finish the dark-theme rollout on the 3 missed Toshiba pages
- **Objective:** Visual consistency across all 14 product pages.
- **Why it matters:** 18 of 21 pages use `bg-cinema`; `ToshibaDuctedAC.tsx`,
  `ToshibaHiWallAC.tsx` and `ToshibaVRFSystem.tsx` are still light-themed. A user
  navigating from any dark page to these gets a full-screen white flash. These three
  are the only product pages absent from the uncommitted `git diff` — strong
  evidence the rollout was interrupted mid-sweep.
- **Relevant files:** the three pages above; use any already-converted sibling
  (e.g. `src/pages/ToshibaCassetteAC.tsx`) as the exact template.
- **Dependencies:** P0-2 (they render `ProductCard`).
- **Expected result:** All 14 product pages structurally identical: wrapper
  `bg-cinema text-white min-h-screen`, `py-24` section, `dot-grid` overlay at
  `opacity-40`, `relative z-10` container.
- **Verify:** `grep -rL 'bg-cinema' src/pages/*.tsx` returns nothing; click through
  all three routes in `npm run dev`.

### P1-2 · Make `npm run lint` a usable signal
- **Objective:** A lint run that reports only real problems in `src/`.
- **Why it matters:** Lint currently exits 1 with **40 errors, all of them from
  `my-app/.next/**` build artifacts** — generated Turbopack chunks the root config
  has no business linting. `src/` itself is clean apart from 8 benign
  `react-refresh/only-export-components` warnings in shadcn files. As long as lint
  is red for unrelated reasons, nobody will read it and real regressions will hide.
- **Relevant files:** `eslint.config.js` (currently `ignores: ["dist"]` only)
- **Dependencies:** none.
- **Expected result:** `ignores` extended to `["dist", "my-app/**", "**/.next/**"]`.
  `my-app` has its own `eslint-config-next` and lints itself via its own script.
- **Verify:** `npm run lint` exits 0 (warnings permitted).

### P1-3 · Commit the redesign
- **Objective:** Get 3 months of uncommitted work into git history.
- **Why it matters:** 21 modified files (+336/−215) have sat in the working tree
  since late June and survived a laptop transfer. This is the single largest risk of
  irrecoverable loss in the project. It has not been committed because it does not
  typecheck and is incomplete — which P0-2 and P1-1 resolve.
- **Relevant files:** all 21 modified files (see `git status`).
- **Dependencies:** **P0-2 and P1-1 must land first** — do not commit a broken state.
- **Expected result:** One coherent commit, e.g. "Roll out cinematic dark theme
  across all inner pages". Note: the diff also strips a stray UTF-8 BOM from the
  first line of several product pages — a genuine fix, worth mentioning in the message.
- **Verify:** `git status` clean (apart from the `my-app` gitlink); `tsc`, `lint`,
  `test` and `build` all green; then push and confirm the Actions run succeeds.

### P1-4 · Fix the hero canvas redraw gaps (B5, B6)
- **Objective:** The hero never goes blank or freezes.
- **Why it matters:** Two concrete failures in `VideoScrubHero.tsx`:
  - **B5** — the resize handler assigns `canvas.width`/`canvas.height`, which clears
    the canvas per spec, and then never redraws. Resizing the window, opening
    devtools, or rotating a phone blanks the hero until the scroll position happens
    to cross into a new frame index.
  - **B6** — the scroll handler does `if (!img?.complete) return;` with no retry. On
    a slow connection, scrolling faster than frames download leaves the canvas stuck
    on a stale frame indefinitely.
- **Relevant files:** `src/components/VideoScrubHero.tsx:91-102` (resize),
  `:135-172` (scroll → frame)
- **Dependencies:** none.
- **Expected result:** Resize redraws the current frame index; a not-yet-loaded
  frame attaches a one-shot `onload` that redraws if it is still the current frame.
- **Verify:** In dev, scroll to mid-hero and resize the window — image persists.
  Then throttle to Slow 3G in devtools, hard-reload, scroll fast — frames catch up
  rather than freezing.

### P1-5 · Add per-route SEO metadata
- **Objective:** Each of the 21 routes gets its own title, description and canonical.
- **Why it matters:** Verified absent — no `react-helmet`, no `document.title`
  anywhere. All 21 routes share the single static title "Comfort Aircon" from
  `index.html`. For a lead-generation site whose entire purpose is being found by
  people searching "Carrier cassette AC Puducherry", this is the largest missed
  opportunity in the project. It also blocks any useful analytics segmentation.
- **Relevant files:** new `src/components/Seo.tsx`; each of `src/pages/*.tsx`;
  `index.html` (keep as the default/fallback)
- **Dependencies:** Adds one dependency (`react-helmet-async`, ~3 kB) — or a
  ~20-line `useEffect` hook with zero new dependencies. **Recommend the hook**:
  this is a CSR-only SPA, so a library buys nothing here.
- **Expected result:** Unique title + meta description per route, plus a
  `LocalBusiness` JSON-LD block on the homepage with the real NAP data.
- **Verify:** Navigate between routes and watch the browser tab title change; view
  source on the built output; validate the JSON-LD in Google's Rich Results Test.
- **Caveat:** GitHub Pages serves a static SPA, so crawlers that do not execute JS
  still see only the `index.html` title. Google executes JS; most social-media
  scrapers do not. Prerendering (`vite-plugin-prerender` or similar) is the real fix
  and belongs in P2.

---

## P2 — Medium Priority

*Important improvements, not blocking the current milestone.*

### P2-1 · Fix base-path bugs in `index.html` and `site.webmanifest` (B8, B9)
- **Objective:** Social previews and PWA install work under `/carrier/`.
- **Why it matters:** Verified in the built output — Vite rewrites `href="/…"` in
  `link` tags to `/carrier/…` but leaves `meta content="/…"` untouched, so
  `og:image` and `twitter:image` resolve to a 404. Separately, `public/` files are
  copied verbatim, so `site.webmanifest` keeps `start_url: "/"` and `/icons/…`,
  both wrong on a project Pages site.
- **Relevant files:** `index.html:27,37`; `public/site.webmanifest`
- **Dependencies:** A decision on the final URL (see `PROJECT_STATE.md` §22 Q1) —
  a custom domain would make these paths correct as-is.
- **Expected result:** Absolute `https://…/carrier/images/logo/full_logo.png` for
  the social tags (scrapers require absolute URLs regardless); `/carrier/`-prefixed
  manifest paths.
- **Verify:** Facebook Sharing Debugger / Twitter Card Validator on the live URL;
  Chrome devtools → Application → Manifest shows icons loading.

### P2-2 · Budget the hero frame preload for mobile (B7)
- **Objective:** Stop shipping 1.7 MB of hero frames to phones that barely use them.
- **Why it matters:** `VideoScrubHero` constructs all 120 `Image` objects
  unconditionally on mount. On mobile this competes directly with LCP for bandwidth,
  on a site whose visitors are largely on Indian mobile networks.
- **Relevant files:** `src/components/VideoScrubHero.tsx:105-132`
- **Dependencies:** P1-4 (same code region — do them together).
- **Expected result:** Load frame 1 immediately, then the rest progressively; on
  narrow viewports or `navigator.connection.saveData`, load a decimated subset
  (e.g. every 4th frame) or fall back to the static first frame.
- **Verify:** Devtools mobile emulation + Network panel — total hero bytes drop
  substantially; Lighthouse mobile LCP improves.

### P2-3 · Delete dead code and unused dependencies
- **Objective:** Make the repo describe its own architecture honestly.
- **Why it matters:** `Hero3D.tsx` (138 lines of three.js) is imported by nothing —
  `3D_PLAN.md` was superseded by the frame-scrub hero. `CinematicHero` (140 lines
  inside `Index.tsx`) is defined and never rendered — it is the *only* reference to
  `public/videos/AC_animation.mp4` (2.7 MB). `ScrollToTop.tsx` and `NavLink.tsx` are
  orphaned. `three`, `@react-three/fiber`, `@react-three/drei`, `@types/three`,
  `gsap`, `lenis` and `date-fns` are installed and imported nowhere. A new developer
  reading `package.json` would reasonably conclude this is a three.js/GSAP project.
- **Relevant files:** `src/components/Hero3D.tsx`, `src/components/ScrollToTop.tsx`,
  `src/components/NavLink.tsx`, `src/pages/Index.tsx:138-277`, `package.json`,
  `public/videos/AC_animation.mp4`
- **Dependencies:** **Decide `my-app/` and the `prompt.md` direction first.** If the
  full cinematic brief is still the goal, `gsap` and `lenis` are wanted after all.
  Removing them is only correct if the hand-rolled approach is the accepted one.
- **Expected result:** Smaller install, honest `package.json`, ~2.7 MB less in
  `dist/`. Do it as **one commit per concern** so any of it can be reverted cleanly.
- **Verify:** `npm run build` still succeeds; click every route; `git diff` shows
  only deletions.

### P2-4 · Resolve the `my-app/` question
- **Objective:** Either commit to the Next.js rewrite or remove the dead scaffold.
- **Why it matters:** `my-app/` is an untouched `create-next-app` template (Next
  16.2.9 + React 19) tracked in the parent repo as a **gitlink (mode `160000`) with
  no `.gitmodules`**. Consequences today: `git status` is permanently dirty, a fresh
  clone gets an empty `my-app/` directory, and it is the sole source of all 40 lint
  errors. `AGENTS.md` describes it as a live subproject, which misleads every future
  reader and agent.
- **Relevant files:** `my-app/**`, `AGENTS.md`, `eslint.config.js`
- **Dependencies:** **Owner decision required.** Three options: (a) delete it and
  simplify `AGENTS.md`; (b) register it properly as a submodule with `.gitmodules`;
  (c) start the rewrite for real.
- **Expected result:** Whichever path, `git status` is clean and `AGENTS.md` matches
  reality.
- **Verify:** `git status` clean; fresh `git clone` produces a working tree.

### P2-5 · Consolidate the duplicated motion language and `SectionLabel`
- **Objective:** One definition per shared concept.
- **Why it matters:** `EASE` / `fadeUp` / `fadeLeft` / `stagger` exist in **three**
  places (`src/lib/motion.ts`, `Index.tsx:41-64`, `VideoScrubHero.tsx:16-25`) with
  subtly different stagger values (`0.08` vs `0.1`). `SectionLabel` exists both as
  `src/components/SectionLabel.tsx` (used by 5 pages) and as a local copy in
  `Index.tsx:397`. `Magnetic` is duplicated between `Index.tsx` and
  `VideoScrubHero.tsx`. Any future motion tweak will be applied inconsistently.
- **Relevant files:** `src/lib/motion.ts` (the intended home), `src/pages/Index.tsx`,
  `src/components/VideoScrubHero.tsx`, `src/components/SectionLabel.tsx`
- **Dependencies:** Do it *after* P1-3 so the redesign commit stays reviewable.
- **Expected result:** `Index.tsx` drops well below 800 lines; a new
  `src/components/Magnetic.tsx`; every file imports from `@/lib/motion`.
- **Verify:** `grep -rn 'const fadeUp' src` returns exactly one hit; visual
  regression check on the homepage and hero.

### P2-6 · Add `.env.example` and rewrite `README.md`
- **Objective:** A new machine can be set up without reverse-engineering the code.
- **Why it matters:** There is no `.env.example`, so the three required variable
  names are discoverable only by reading `ContactForm.tsx` — exactly the problem
  this laptop transfer exposed. `README.md` is still the stock Lovable template
  with `REPLACE_WITH_PROJECT_ID` placeholders and instructions to edit the project
  on lovable.dev, which is misleading in a public repo.
- **Relevant files:** new `.env.example`, `README.md`
- **Dependencies:** none. **Note `.gitignore` currently ignores `.env.*`** — the
  new file needs a `!.env.example` negation or it will not be committed.
- **Expected result:** `.env.example` with the three keys and empty values; a README
  covering what the site is, how to run it at `/carrier/`, and how it deploys.
- **Verify:** `git check-ignore -v .env.example` reports no match.

### P2-7 · Add `sitemap.xml`
- **Objective:** Help search engines find all 21 routes.
- **Why it matters:** `public/robots.txt` explicitly allows all major crawlers but
  there is no sitemap, and the SPA's only internal links to product pages are inside
  a JS-driven mega-menu.
- **Relevant files:** new `public/sitemap.xml`; reference it from `robots.txt`
- **Dependencies:** Final URL decision (Q1). Ideally generated from the route table
  in `App.tsx` by a small build script so it cannot drift.
- **Expected result:** All 21 canonical URLs listed.
- **Verify:** Submit in Google Search Console; confirm no 404s.

### P2-8 · Establish a real test baseline
- **Objective:** Tests that would actually catch a regression.
- **Why it matters:** The entire suite is `expect(true).toBe(true)`. Testing
  Library and jsdom are already installed and configured — the setup cost has
  already been paid, only the tests are missing.
- **Relevant files:** `src/test/`, new `*.test.tsx` beside the components
- **Dependencies:** P0-2 (`tsc` green first).
- **Expected result:** A starter suite covering the highest-value, most-fragile
  surfaces: `ContactForm` zod validation and EmailJS call (mocked), `Header`
  mega-menu open/close and mobile drawer scroll-lock, `App` route rendering for all
  21 paths (smoke), `TiltCard` reduced-motion path.
- **Verify:** `npm run test` passes; deliberately break a validation rule and
  confirm a test fails.

---

## P3 — Future

*Nice to have. Do not start these before P0–P2.*

### P3-1 · Extract hardcoded content into data modules
Products, stats, client names, service copy and brand lists are inline arrays spread
across 14+ files. Moving them to `src/data/*.ts` would make a catalogue update a
one-file change, and is the necessary precondition for any future CMS. Purely
structural — zero visual change.

### P3-2 · Decide the fate of the full `prompt.md` cinematic brief
`prompt.md` (Jun 28) asks for 13 scroll-synchronised chapters, GSAP ScrollTrigger
pinning, Lenis smooth scroll, SplitText, camera moves and a Next.js rewrite. What
shipped is one hand-rolled canvas scrubber on the hero — roughly **20%** of the
brief. Either formally scope the rest as a project, or mark the brief superseded so
it stops reading like pending work. **This is the largest open strategic question.**

### P3-3 · Build the testimonials section
Specified in `REFINEMENT_PLAN.md` §5 with three drafted testimonials and an Embla
carousel design. Never built. **Before shipping: the quotes in that plan are
AI-invented placeholders attributed to named individuals at real companies.** They
must be replaced with genuine, permissioned testimonials — publishing them as-is
would be fabricated endorsement.

### P3-4 · Enable TypeScript strict mode incrementally
`strict`, `strictNullChecks` and `noImplicitAny` are all off. Turning them on will
surface a meaningful error count; do it file-by-file, ideally after P2-5 shrinks
`Index.tsx`.

### P3-5 · Prune unused shadcn/ui primitives
~50 primitives in `src/components/ui/`, roughly 12 imported. Tree-shaking keeps them
out of the bundle, so this is maintenance-surface only — low value, do it last.

### P3-6 · Add analytics and conversion tracking
No analytics of any kind. Without it there is no way to know whether the cinematic
redesign improved conversion — which is the entire premise of the current milestone.
Depends on P1-5 (per-route titles) to be useful.

### P3-7 · Prerendering for crawler-visible SEO
The real fix for the SPA/SEO limitation noted in P1-5. Only worth it once P1-5 and
P2-7 are in place and there is analytics data justifying the effort.

### P3-8 · Image optimisation pass
Several source images are unoptimised JPEG/PNG. Only the logo uses `picture`/WebP.
Converting the product imagery to WebP with `srcset` would cut page weight further.

### P3-9 · Housekeeping
Delete the stale `bun.lockb`; run `npx update-browserslist-db@latest` (B12); fix the
ambiguous `duration-[1.2s]` Tailwind class (B11); run `npm audit`; mark
`PROJECT_MAP.md`, `3D_PLAN.md` and `REFINEMENT_PLAN.md` as superseded so they stop
contradicting the code (`PROJECT_MAP.md` still documents the old red palette).
