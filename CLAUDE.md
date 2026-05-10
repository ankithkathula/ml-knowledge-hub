# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

ML Knowledge Hub — a React + Vite frontend originally exported from a Figma Make design (https://www.figma.com/design/Q0QJpCEv2nH12yCFEIlKuF/ML-Knowledge-Hub). Mock data only; no backend wired up.

## Commands

Run from `mlkh_v7/`:

- `npm i` — install dependencies
- `npm run dev` — start the Vite dev server
- `npm run build` — production build via `vite build`

There is no lint script, no test runner, and no type-check script configured — `package.json` only defines `dev` and `build`.

## Architecture

**Stack:** React 18 + TypeScript + Vite 6, React Router 7 (`createBrowserRouter`), Tailwind CSS 4 (via `@tailwindcss/vite`), Radix UI primitives, MUI, Emotion, Framer Motion, Recharts, react-dnd.

**Entry point:** `src/main.tsx` → `src/app/App.tsx` → `src/app/routes.ts`. `App.tsx` is a thin `<RouterProvider>` — all routes live in `routes.ts`.

**Path alias:** `@` resolves to `src/` (configured in `vite.config.ts`). The Vite config also whitelists `**/*.svg` and `**/*.csv` as raw-importable assets — do not add `.css`, `.ts`, or `.tsx` to `assetsInclude`.

**Routing surface** (`src/app/routes.ts`) is split into four regions — when adding a page, match the existing region:

1. **Public pages** — `/`, `/layer/:nodeId`, `/products/:l5Id`, `/brand/:brandId`, `/blog`, `/jobs`, `/courses`, `/kc`, `/professionals`, `/feed`, `/services/*`. Components live in `src/app/components/pages/`.
2. **Studio dashboard** (`/studio/*`) — authenticated studio/consultant workspace nested under `StudioDashboardLayout`. Components in `src/app/components/studio/`.
3. **User dashboard** (`/u/*`) — authenticated individual/student workspace nested under `UserDashboardLayout`. Components in `src/app/components/user/`.
4. **Admin console** (`/admin/*`) — management pages nested under `AdminLayout`. Components in `src/app/components/admin/`.

**Component layout** under `src/app/components/`:
- `pages/` — top-level public page components (one per route).
- `studio/`, `user/`, `admin/` — dashboard layouts + their child pages (route children correspond 1:1 to files here).
- `consultant/` — consultant-facing shared pieces used across public + studio.
- `shared/` — cross-region marketing/section components (e.g. `BrandMarketingSection`, `NewsletterSection`, `UserDashboard`).
- `ui/` — low-level primitives (Radix-based design-system components).
- `figma/` — components imported from the Figma Make export.
- `data/` — mock data sources (`mockData.ts`, `hierarchyData.ts`, `platformData.ts`, `consultantData.ts`, `kcPortalData.ts`). All data in the app is currently sourced from these files.

**Styles:** Tailwind is the primary styling system. Global stylesheets in `src/styles/` (`tailwind.css`, `theme.css`, `glass.css`, `fonts.css`, `index.css`). MUI + Emotion coexist with Tailwind because several components come from the Figma export — do not strip them.

**Imports directory:** `src/imports/pasted_text` contains raw pasted content from Figma exports; treat as read-only unless re-importing.

## Conventions observed in the codebase

- Route components are imported as named exports (mostly) and wired via `Component:` in the router config, not `element:`.
- Dashboard sections use nested routes with an `index: true` home route and sibling child routes — follow this pattern when adding a dashboard page.
- `guidelines/Guidelines.md` is a template placeholder (unfilled) — no active design-system rules are documented there yet.
