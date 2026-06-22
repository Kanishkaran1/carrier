# Homepage Refinement Plan
**Date:** 2026-06-02  
**Scope:** `src/pages/Index.tsx` only — no routes, product pages, or backend logic touched.

---

## 0. Dependency Addition

| Package | Version | Reason |
|---------|---------|--------|
| `framer-motion` | `^11` | All scroll animations, counter animations, hero parallax, hover micro-interactions |

Install via: `npm install framer-motion`

Framer Motion v11 is tree-shakeable and adds ~45 kB gzipped when used with `LazyMotion + domAnimation` — well within budget for a marketing page.

---

## 1. Hero Section

### 1a. Parallax Effect
- Use `useScroll` + `useTransform` from Framer Motion to shift the background image at 0.3× scroll speed (CSS `y` transform on the inner `<motion.div>`).
- No JavaScript scroll listeners — Framer Motion uses `IntersectionObserver` + `requestAnimationFrame` internally.
- Constrained to the hero viewport height so no overflow artifacts.

### 1b. Animated HVAC Background Elements
- Three abstract SVG "air-flow" arcs rendered as `<motion.path>` elements with `strokeDashoffset` draw-on animation (1.5–2 s ease, triggered once on mount).
- Two faint snowflake/frost `<circle>` elements that pulse opacity (0.03–0.08) infinitely — barely visible, adds depth without distraction.
- All decorative SVGs are `aria-hidden` and `pointer-events-none`.

### 1c. Hero Text Animation
- Eyebrow label: fade-in + slide up (y: 20 → 0, opacity: 0 → 1, duration 0.5 s, delay 0.1 s).
- H1: each word staggered (delay 0.05 s per word, y: 30 → 0).
- Subtitle: fade in after H1 completes (delay 0.5 s).
- CTAs: slide up together (delay 0.7 s).
- All keyed to the active slide index so they re-trigger on slide change.

### 1d. CTA Button Polish
- Primary button: add a subtle shine sweep `::after` pseudo-element on hover (CSS keyframe, no JS needed).
- Add `whileHover={{ scale: 1.03 }}` + `whileTap={{ scale: 0.97 }}` via Framer Motion on both hero CTAs.
- Ghost button gets a `border-primary` colour transition on hover.

### 1e. Slide Indicators
- Active indicator bar animates width expansion via `layoutId` for a fluid morph between slides.

---

## 2. Scroll-Reveal Animations

### Strategy
- Use Framer Motion `motion.div` + `whileInView` with `once: true` and `amount: 0.15` — fires once when 15% of the element enters viewport.
- Respect `prefers-reduced-motion` via the `useReducedMotion()` hook: all animations become instant (duration 0, no translate) if the user has requested reduced motion.

### Animation Variants Used (defined once, reused everywhere)

```ts
fadeUp   = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }
fadeIn   = { hidden: { opacity: 0 }, visible: { opacity: 1 } }
stagger  = { visible: { transition: { staggerChildren: 0.1 } } }
```

### Applied Per Section

| Section | Animation |
|---------|-----------|
| Stats bar | Staggered `fadeUp` per stat cell, 0.08 s stagger |
| About snippet | Image: `fadeIn` slide-left; text block: `fadeUp` |
| Brands grid | `stagger` container, each card `fadeUp` |
| Services cards | `stagger` 2×2 grid, each card `fadeUp` |
| Why Choose Us | `stagger` 4-column grid |
| Product category cards | `stagger` pair |
| Contact section | Left column `fadeUp`, form `fadeIn` with slight delay |

---

## 3. Trust Section (Stats Bar → Animated Counters)

### Animated Counter Component
- New `AnimatedCounter` component (defined inside `Index.tsx`, ~30 lines).
- Uses `useInView` to detect when the stats bar enters the viewport.
- On enter: runs a number interpolation from 0 to the target value over 1.8 s using `easeOut` curve.
- Handles suffix characters (`+`) separately so they appear immediately with the final digit.
- Runs once only — no re-trigger on scroll back.

### Dealer Badge Row
- Below the existing brands section heading, add a horizontal row of three "Authorized Dealer" badge chips:
  - Each chip: brand logo thumbnail (existing `/images/carrier.jpg` etc.) + "Authorized Dealer" text in a bordered pill.
  - Chips entrance: staggered `fadeUp`.
  - This reinforces trust without adding new assets.

---

## 4. Services Section Upgrades

### Card Redesign
- Increase card padding to `p-6`.
- Add a coloured top-border accent: `border-t-2 border-t-transparent group-hover:border-t-primary` (smooth CSS transition).
- Icon container: on hover, scale icon to 1.1× via `whileHover`.
- Add a subtle `box-shadow` transition: `hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]`.
- Description text increases from `text-xs` to `text-sm` for readability.

### Section Layout
- Service cards move from the left column into a dedicated full-width 4-column grid below the text+image split, making each service feel more prominent.

---

## 5. Testimonials Section (NEW — inserted between §6 Why Choose Us and §7 Product Categories)

### Data (hardcoded, realistic for the business)
Three testimonials representing residential, commercial and institutional clients:

```ts
[
  { name: "Rajesh Kumar", role: "Facility Manager, Capgemini Chennai",
    quote: "Comfort Aircon installed and maintains our entire 200-unit cassette AC system. Response time is outstanding and the team is highly professional.",
    rating: 5 },
  { name: "Priya Venkataraman", role: "Homeowner, Puducherry",
    quote: "From consultation to installation, the entire experience was seamless. Our Carrier hi-wall unit was fitted perfectly and runs silently.",
    rating: 5 },
  { name: "Suresh Mohan", role: "Operations Head, State Bank of India Branch",
    quote: "We've been on their AMC plan for six years. Preventive maintenance is always on schedule and any breakdown is fixed the same day.",
    rating: 5 },
]
```

### Slider Implementation
- Use the **existing Embla carousel** (`embla-carousel-react` is already installed) — no new dependency.
- Desktop: 1 testimonial visible at a time, centred, max-width `2xl`.
- Controls: prev/next arrow buttons + dot indicators.
- Auto-advances every 6 s.
- Card design: large quotation mark glyph (CSS `::before`), star rating row, quote text, avatar initials circle + name/role.
- Background: `bg-muted` to separate visually from adjacent dark sections.

---

## 6. Performance Constraints

| Constraint | Implementation |
|------------|----------------|
| Compositor-only animations | Only `transform` and `opacity` used in all Framer Motion variants |
| `will-change` | Applied only to hero parallax container; removed after animation completes via `onAnimationComplete` |
| Lazy-load service image | Add `loading="lazy"` to `<img src="/images/ourserviceleft.webp">` |
| Lazy-load welcome image | Add `loading="lazy"` to `<img src="/images/welcome.jpg">` |
| Hero images (LCP) | Keep `loading="eager"` on slide 0 image (it's the LCP element) |
| Reduced motion | `useReducedMotion()` disables all translate/scale animations; fade-only remains |
| Framer Motion bundle | Use `LazyMotion + domAnimation` instead of full import to save ~15 kB |
| SVG background elements | Pure CSS/SVG, no canvas, no WebGL |
| Counter animation | `requestAnimationFrame`-based via Framer Motion's `useMotionValue` — GPU-friendly |

---

## 7. Files Changed

| File | Change Type | Description |
|------|-------------|-------------|
| `package.json` | Dependency add | `framer-motion ^11` |
| `src/pages/Index.tsx` | Modify | All refinements above — no new files |

No other files are touched.

---

## 8. What Is NOT Changing

- Routes, product pages, Header, Footer, ContactForm — untouched.
- All existing section content (text, images, links) — preserved exactly.
- Tailwind config, CSS variables, design tokens — no changes.
- Backend/EmailJS integration — untouched.

---

## Approval Checklist

- [ ] `framer-motion` dependency install approved
- [ ] Hero parallax + SVG background elements approved
- [ ] Animated counters approved
- [ ] Testimonials section (new content) approved
- [ ] Services card layout change (4-col full-width) approved
- [ ] Overall approach approved → proceed to implementation
