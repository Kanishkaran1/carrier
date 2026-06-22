# PROJECT_MAP.md — Comfort Aircon Website

## Folder Structure

```
carrier-main/
├── public/
│   └── images/
│       ├── carrier/          # Carrier product images
│       ├── toshiba/          # Toshiba product images
│       ├── midea/            # Midea product images
│       └── [hero/misc images]
├── src/
│   ├── pages/
│   │   ├── Index.tsx         # Home
│   │   ├── About.tsx
│   │   ├── Products.tsx
│   │   ├── Services.tsx
│   │   ├── Contact.tsx
│   │   ├── Clients.tsx
│   │   ├── NotFound.tsx
│   │   ├── Carrier/          # 7 Carrier product pages
│   │   ├── Toshiba/          # 4 Toshiba product pages
│   │   └── Midea/            # 3 Midea product pages
│   ├── components/
│   │   ├── Layout.tsx
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── ContactForm.tsx
│   │   ├── PageBanner.tsx
│   │   ├── NavLink.tsx
│   │   ├── ScrollToTop.tsx
│   │   ├── ResetScroll.tsx
│   │   ├── WhatsAppButton.tsx
│   │   └── ui/               # 30+ shadcn/ui primitives
│   ├── hooks/
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   ├── lib/
│   │   └── utils.ts          # cn() classname utility
│   ├── test/
│   │   ├── example.test.ts
│   │   └── setup.ts
│   ├── App.tsx
│   ├── App.css
│   ├── index.css             # Tailwind + CSS variables
│   ├── main.tsx
│   └── vite-env.d.ts
├── index.html
├── package.json
├── vite.config.ts
├── vitest.config.ts
├── tailwind.config.ts
├── postcss.config.js
├── tsconfig.json / tsconfig.app.json / tsconfig.node.json
├── eslint.config.js
├── components.json           # shadcn/ui config
└── .env
```

---

## Pages / Routes

React Router v6, all routes wrapped in `<Layout>` (Header + Footer).

| Path | Component | Notes |
|------|-----------|-------|
| `/` | `Index.tsx` | Hero carousel, brand showcase, services, clients |
| `/about` | `About.tsx` | |
| `/products` | `Products.tsx` | Overview of residential & commercial ACs |
| `/products/carrier/window-ac` | `CarrierWindowAC.tsx` | |
| `/products/carrier/hi-wall-ac` | `CarrierHiWallAC.tsx` | |
| `/products/carrier/ducted-ac` | `CarrierDuctedAC.tsx` | |
| `/products/carrier/cassette-ac` | `CarrierCassetteAC.tsx` | |
| `/products/carrier/slimpak-ac` | `CarrierSlimpakAC.tsx` | |
| `/products/carrier/packaged-ac` | `CarrierPackagedAC.tsx` | |
| `/products/carrier/vrf-system` | `CarrierVRFSystem.tsx` | |
| `/products/toshiba/hi-wall-ac` | `ToshibaHiWallAC.tsx` | |
| `/products/toshiba/cassette-ac` | `ToshibaCassetteAC.tsx` | |
| `/products/toshiba/ducted-ac` | `ToshibaDuctedAC.tsx` | |
| `/products/toshiba/vrf-system` | `ToshibaVRFSystem.tsx` | |
| `/products/midea/window-ac` | `MideaWindowAC.tsx` | |
| `/products/midea/hi-wall-ac` | `MideaHiWallAC.tsx` | |
| `/products/midea/home-appliances` | `MideaHomeAppliances.tsx` | |
| `/services` | `Services.tsx` | |
| `/clients` | `Clients.tsx` | |
| `/contact` | `Contact.tsx` | EmailJS form + map |
| `*` | `NotFound.tsx` | 404 |

---

## Components

**Layout**
- `Layout.tsx` — Shell with `<Outlet>` for nested routes
- `Header.tsx` — Sticky nav with mega-menu dropdown for products
- `Footer.tsx` — Multi-column footer (links, brands, contact info)
- `PageBanner.tsx` — Reusable page-header banner with title/breadcrumb

**Feature**
- `ContactForm.tsx` — React Hook Form + Zod validation, sends via EmailJS
- `WhatsAppButton.tsx` — Fixed floating WhatsApp CTA (`wa.me/919843020458`)
- `NavLink.tsx` — Navigation link wrapper
- `ScrollToTop.tsx` / `ResetScroll.tsx` — Scroll reset on route change

**UI (shadcn/ui)**
Radix-backed primitives: `button`, `card`, `input`, `textarea`, `label`, `form`, `dialog`, `drawer`, `sheet`, `accordion`, `carousel`, `toast`/`sonner`, `badge`, `table`, `pagination`, `dropdown-menu`, `popover`, `checkbox`, `radio-group`, `toggle`, `progress`, `sidebar`, and more.

**Hooks**
- `use-mobile.tsx` — Mobile breakpoint detection
- `use-toast.ts` — Toast notification state

---

## Styling System

| Layer | Tool |
|-------|------|
| Utility classes | Tailwind CSS v3.4.17 |
| Component primitives | Radix UI + shadcn/ui |
| Design tokens | CSS custom properties (HSL) in `index.css` |
| Dark mode | `darkMode: ["class"]` via `next-themes` |
| Animations | Custom keyframes: `accordion-down/up`, `marquee` |
| Utility | `cn()` = `clsx` + `tailwind-merge` |

**Key Design Tokens (light mode)**
- Primary: Red `hsl(0 81% 51%)`
- Secondary/Accent: Dark Blue `hsl(215 75% 20%)`
- Background: White `hsl(0 0% 100%)`

---

## APIs & Services

**EmailJS** (client-side email, no backend required)
- Package: `@emailjs/browser@4.4.1`
- Called in: `src/components/ContactForm.tsx`
- Sends fields: `name`, `email`, `phone`, `subject`, `message`

**TanStack React Query v5**
- `QueryClientProvider` wraps the entire app in `App.tsx`
- No active server-state queries currently; scaffolded for future use

**External URLs**
- WhatsApp: `https://wa.me/919843020458`
- Google Maps embed in Footer

No backend API server or REST/GraphQL endpoints.

---

## Environment Variables

File: `.env` (Vite `VITE_` prefix, accessed via `import.meta.env`)

| Variable | Purpose |
|----------|---------|
| `VITE_EMAILJS_SERVICE_ID` | EmailJS service identifier |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS template identifier |
| `VITE_EMAILJS_PUBLIC_KEY` | EmailJS public key |

No `.env.example` file present.

---

## Build Process

**Bundler:** Vite v5.4.19 + `@vitejs/plugin-react-swc`

**Scripts**

| Command | Action |
|---------|--------|
| `npm run dev` | Dev server on `0.0.0.0:8080` |
| `npm run build` | Production bundle → `dist/` |
| `npm run build:dev` | Dev-mode bundle |
| `npm run preview` | Serve production bundle locally |
| `npm run lint` | ESLint check |
| `npm run test` | Vitest (single run) |
| `npm run test:watch` | Vitest (watch mode) |

**Notable Config**
- Path alias: `@` → `./src`
- HMR overlay disabled
- TypeScript strict mode off (`noImplicitAny`, `strictNullChecks` disabled)
- PostCSS: Tailwind + Autoprefixer
- Tests: Vitest + jsdom environment

**Key Dependencies**

| Package | Version | Role |
|---------|---------|------|
| react / react-dom | 18.3.1 | UI framework |
| react-router-dom | 6.30.1 | Client routing |
| react-hook-form | 7.61.1 | Form state |
| zod | 3.25.76 | Schema validation |
| @tanstack/react-query | 5.83.0 | Server-state management |
| @emailjs/browser | 4.4.1 | Email sending |
| lucide-react | 0.462.0 | Icons |
| embla-carousel-react | 8.6.0 | Carousel |
| recharts | 2.15.4 | Charts (available, not heavily used) |
| tailwindcss | 3.4.17 | Styling |
| next-themes | 0.3.0 | Dark mode |
| sonner | 1.7.4 | Toast notifications |
| @radix-ui/* | various | UI primitives |
