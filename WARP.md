# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project overview

This repo is a small monorepo with two main applications under `apps/`:
- `apps/web`: Next.js 16 App Router storefront with i18n, theming via `next-yak`, a configurable commerce/boosting "engine", and local state with Zustand.
- `apps/cms`: Strapi v5 headless CMS instance that will back the storefront.

The repo itself has no root `package.json`; each app is managed independently (pnpm workspaces are scoped to `apps/web` and `apps/cms`).

Vercel is configured to ignore `apps/cms/**` and only consider the web app for deployment.

## Commands

All commands below assume you are at the repo root (`/home/martin/Workspace/bstr4`).

### Web app (`apps/web`)

Dependencies (once per machine or when `package.json` changes):
- `cd apps/web && pnpm install`

Local development server:
- `cd apps/web && pnpm dev`

Production build:
- `cd apps/web && pnpm build`

Production start (after a build):
- `cd apps/web && pnpm start`

Linting (ESLint with Next.js config):
- `cd apps/web && pnpm lint`

Tests:
- No test runner is configured in `apps/web/package.json` yet; there is currently no `test` script or test files.

### CMS (`apps/cms`)

Dependencies:
- `cd apps/cms && pnpm install`

Strapi develop mode (auto-reload, for local editing of content types and APIs):
- `cd apps/cms && pnpm dev`
- Equivalent alias: `cd apps/cms && pnpm develop`

Strapi production build (admin panel bundling):
- `cd apps/cms && pnpm build`

Strapi start (uses built admin, no auto-reload):
- `cd apps/cms && pnpm start`

Strapi console (REPL attached to the app):
- `cd apps/cms && pnpm console`

Upgrade Strapi to latest (dry-run and real):
- `cd apps/cms && pnpm upgrade:dry`
- `cd apps/cms && pnpm upgrade`

Node version for Strapi:
- `apps/cms/package.json` requires Node `>=20.0.0 <=24.x.x`; use Node 20+ for consistency.

Tests:
- No test runner is configured in `apps/cms/package.json`; there is currently no `test` script.

## Web app architecture (`apps/web`)

### Framework and tooling

- Next.js 16 App Router project under `apps/web/src/app`.
- TypeScript config (`tsconfig.json`) enables strict type-checking and defines `@/*` to point at `apps/web/src/*`.
- Styling and layout use `next-yak` (see `src/config/theme.ts` and `src/config/layout.ts` for shared breakpoints, media queries, and layout constants).
- ESLint is configured via `eslint.config.mjs` using `eslint-config-next` with TypeScript support.

### Routing, i18n, and layout

- The primary route hierarchy lives under `src/app/[locale]/`:
  - `layout.tsx` is the locale-aware root layout. It:
    - Validates the `locale` param against `routing.locales` from `src/i18n/routing.ts`.
    - Loads translations via `next-intl` (`getMessages`, `getTranslations`).
    - Wraps all pages with `AppProviders`, `Header`, `Footer`, and the global `CartDrawer`.
    - Sets up font variables for Inter, Sora, and Geist Mono.
  - `page.tsx` implements the localized home page:
    - Uses `generateStaticParams` to statically generate for each supported locale.
    - Uses `next-intl` to generate locale-specific `<title>` and `<meta>`.
    - Injects JSON-LD `<script type="application/ld+json">` for store-level SEO, then renders `HomePage`.
  - `games/page.tsx` and `blog/page.tsx` are localized list pages for games and blog posts, using static mock data.
- Global robots configuration is in `src/app/robots.ts`, currently disallowing all crawling (`disallow: "/"`).
- i18n helpers live in `src/i18n/`:
  - `routing.ts`: central routing/i18n configuration (`locales`, `defaultLocale`, cookie config, and example `pathnames` mapping for localized routes).
  - `navigation.ts`: `Link`, `redirect`, `useRouter`, etc., built on `next-intl` and the routing config.
  - `request.ts`: `getRequestConfig` implementation that resolves the effective locale, loads `src/messages/{locale}.json`, and exposes `locale`, `messages`, and `timeZone`.

### Providers and cross-cutting concerns

- All cross-cutting React providers are composed in `src/providers/AppProviders.tsx` and re-exported from `src/providers/index.ts`:
  - `IntlProvider` (from `next-intl`) sets locale/messages.
  - `ThemeProvider` configures theming (via `next-yak`).
  - `AuthProvider` wires NextAuth session context.
  - `ToastProvider` renders toasts at the end of the tree.
- The layout in `src/app/[locale]/layout.tsx` is the single place where `AppProviders` is wired up, so any new global provider should be added there.

### State management and cart

- Local client state uses Zustand under `src/store/`:
  - `store.ts` defines `useSettingsStore` with persisted `region` and `currency` (US/EU, USD/EUR) and helper setters; persisted in `localStorage` with key `user-settings`.
  - `useCartStore.ts` defines a persisted cart store with:
    - Strongly-typed `CartItem` model (supports `physical` vs `service` items and arbitrary `options`).
    - Actions for opening/closing the cart, adding/removing items, updating quantity, applying discounts, clearing the cart, and computing a derived `getTotalPrice`.
    - LocalStorage persistence via `zustand` middleware (`gaming-shop-cart` key).
- UI integration for the cart lives in `src/components/features/Cart/CartDrawer.tsx` (not detailed here but it consumes `useCartStore`).

### Commerce engine and configuration-driven pages

The storefront uses a configuration-driven "engine" to render complex game/service pages from static blueprints:

- Engine types and rendering primitives live in `src/components/engine/`:
  - `types.ts` defines `PulseItem`, `ProductCard`, `GameSection`, `GameTab`, and `GamePageConfig`—the core schema for a game page.
  - `EngineComponents.tsx` implements:
    - `HeroZone`: a configurable hero section with a mini-calculator slider.
    - `PulseBar`: horizontal status bar that renders a list of `PulseItem`s.
    - `SectionRenderer`: renderer for multiple section types:
      - `grid_cards` and `profile_carousel` (card grid UI),
      - `table_list` (tabular products),
      - `banner_cta` (full-width background banner).
- Game-specific blueprints live in `src/data/blueprints/`:
  - `dota-2.ts`, `wow-retail.ts`, `wow-classic.ts` each export a `GamePageConfig` for that game.
  - `index.ts` exposes `getGameConfig(slug)` and registers each blueprint in a `BLUEPRINTS` map.
- Commerce templates and widgets live under `src/components/commerce/`:
  - `templates/ImmersiveAppTemplate.tsx`: centered immersive single-column layout that renders a `WidgetRegistry` for the chosen `ServiceProduct`.
  - `templates/StandardSidebarTemplate.tsx`: two-column layout with sticky sidebar, using `queries` from `src/config/theme.ts` for responsive behavior; renders content and configuration card with trust badges.
  - `widgets/WidgetRegistry.tsx`: maps a `WidgetConfig` (from `src/types/service-models.ts`) to a concrete widget component (`MetricCounter` today, with a placeholder for `custom_app`).
  - `widgets/MetricCounter.tsx`: a client-side counter widget that computes a dynamic total price from `basePrice` and `config.pricePerUnit` and exposes an "Add to Cart" CTA.
- Service modeling lives in `src/types/service-models.ts`:
  - `WidgetConfig` and `WidgetType` describe the shape of configuration used by the widget system.
  - `ServiceProduct` describes individual service offerings (id, slug, gameSlug, hero image, base price, widget config, features, FAQ, and template selection).
- Pricing logic for one of the services (Dota MMR boosting) is centralized in `src/config/dota-pricing.ts`:
  - Exports `PRICING_CONSTANTS` plus `calculateBoostPrice` and `estimateCompletion` helpers.

When extending the storefront with a new game or service type, prefer to:
- Add a new `GamePageConfig` under `src/data/blueprints/` and register it in `BLUEPRINTS`.
- Add new widget types/templates by extending `WidgetType`, `WidgetConfig`, and `WidgetRegistry` rather than hardcoding logic in pages.

### Features, UI, and data

- Feature-specific UI components live under `src/components/features/` (Header, Footer, HomePage, Blog, Cart, LanguageSwitcher, MegaMenu, Product components, etc.). These are mostly presentational and are orchestrated by the App Router pages and engine/commerce components.
- Low-level, reusable primitives are under `src/components/ui/` (Accordion, Drawer, Breadcrumbs, Badges, Loading indicator, etc.), built on top of `next-yak` and Radix where appropriate.
- Static mock data used for the current prototype (games, blog posts, FAQs, services, etc.) lives in `src/data/` alongside the blueprints.

### Authentication

- `src/lib/auth.ts` defines `authOptions` for `next-auth`:
  - Uses Google OAuth as the primary provider (requires `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`).
  - Adds a `CredentialsProvider` only in `development` as a mock "Dev Login (Mock)" for local work.
  - Uses JWT-based sessions and `NEXTAUTH_SECRET`.
- This config is intended to be consumed wherever NextAuth is wired into the Next.js app (e.g., in `app/api/auth/[...nextauth]/route.ts` if/when added).

## CMS architecture (`apps/cms`)

### Framework and structure

- Standard Strapi v5 application scaffolded via the official CLI.
- Core Strapi server configuration lives in `apps/cms/config/`:
  - `server.ts`: host/port and application keys (`APP_KEYS`).
  - `admin.ts`: admin auth (`ADMIN_JWT_SECRET`), API token salts, transfer token salts, and encryption key; also feature flags.
  - `api.ts`: REST API defaults (`defaultLimit`, `maxLimit`, `withCount`).
  - `database.ts`: multi-database configuration for `mysql`, `postgres`, and `sqlite`; default is sqlite with `DATABASE_FILENAME` under `.tmp/`.
  - `middlewares.ts`: standard Strapi middleware chain.
  - `plugins.ts`: plugin configuration (currently returns an empty object, ready to be extended).
- Application lifecycle hooks live in `apps/cms/src/index.ts` via `register` and `bootstrap` functions, ready for project-specific logic.

### Admin customization

- Admin customizations live under `apps/cms/src/admin/`:
  - `app.example.tsx` shows how to configure available locales and bootstrap the Strapi admin app (`StrapiApp`).
  - `vite.config.example.ts` shows how to extend the admin bundler config (e.g., alias `@` to `/src`).
- These example files are templates; to enable them, copy/rename them following Strapi's admin customization docs.

### TypeScript and build setup

- `apps/cms/tsconfig.json` is configured for the Strapi server runtime:
  - CommonJS module output to `dist/`.
  - Includes all `.ts`/`.js` in the project plus JSON in `src/`.
  - Excludes `src/admin/`, test files, `src/plugins/**`, and common build/cache directories from the server compilation.

## Code style and conventions

Derived from `AGENTS.md` and TypeScript/Next.js configuration:

- Web app imports:
  - Prefer `@/` absolute imports inside `apps/web` (configured via `tsconfig.json`).
- CMS imports:
  - Use relative imports within `apps/cms` unless otherwise required by Strapi.
- Components:
  - React components are generally PascalCase with default exports for page-level and feature components.
- Types:
  - Use TypeScript interfaces/types for props and shared models (see `src/types/service-models.ts` and `src/components/engine/types.ts`).
- Styling:
  - Prefer `next-yak` styled components and theme constants from `src/config/theme.ts` / `src/config/layout.ts` for layout and breakpoints.
- Error handling:
  - For new async operations (API calls, server actions), wrap in `try/catch` and surface errors appropriately rather than silently failing.
