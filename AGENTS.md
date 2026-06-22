# Agent Instructions for this Repository

## Workspace structure
- Root app: Vite + React + Tailwind + shadcn-ui. Source code lives in `src/`.
- Nested app: `my-app/` is a standalone Next.js 16 project with the App Router and React 19.

## When to use which app
- Edit files under `src/`, `vite.config.ts`, `tailwind.config.ts`, or the root `package.json` using Vite/React conventions.
- Edit files under `my-app/` using Next.js 16 app router conventions.

## Key commands
- Root app: `npm install`, `npm run dev`, `npm run build`, `npm run lint`, `npm run test`.
- Nested Next.js app: `cd my-app && npm install`, `cd my-app && npm run dev`, `cd my-app && npm run build`, `cd my-app && npm run lint`.

## Important guidance for agents
- The root `README.md` is a generic Lovable template and should not be treated as authoritative.
- The nested `my-app/` folder is a separate project. Follow `my-app/AGENTS.md` and `my-app/README.md` for subproject-specific behavior.
- Root app code uses `src/components/ui/` shadcn-ui patterns and custom React pages under `src/pages/`.
- The nested app uses the `app/` directory, `next.config.ts`, and Tailwind v4.

## Useful files
- Root app: `src/App.tsx`, `src/main.tsx`, `src/components/`, `src/pages/`, `vite.config.ts`, `tailwind.config.ts`.
- Next.js subproject: `my-app/app/page.tsx`, `my-app/next.config.ts`, `my-app/tsconfig.json`, `my-app/package.json`, `my-app/public/`.

## Agent behavior
- Do not introduce a full-stack backend unless a file in `my-app` explicitly requires server code.
- Preserve existing naming conventions and component structure in both apps.
- Keep changes minimal and aligned to the app where the file lives.

## When in doubt
- If a path begins with `my-app/`, treat the work as a Next.js 16 app router problem.
- If a path begins with `src/`, treat it as the root Vite + React app.
- Prefer the actual code and package scripts over the generic root README.
