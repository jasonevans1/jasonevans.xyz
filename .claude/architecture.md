# Architecture

## Directory Structure
- `src/components/` — Reusable Astro components
- `src/layouts/` — Page layout wrappers (BaseLayout)
- `src/pages/` — File-based routing (each .astro = a route)
- `src/styles/` — Global CSS with design tokens
- `public/` — Static assets served as-is (favicon, _headers)
- `tests/` — Playwright E2E tests

## Current Pages
- `/` — Homepage with apps grid and recent posts
- `/about` — About/CV (coming soon placeholder)
- `/blog` — Blog listing (coming soon placeholder)
- `/404` — Custom 404 page

## Key Components
- `BaseLayout.astro` — Shared nav + footer wrapper used by all pages
- `AppCard.astro` — Card component used in the apps grid on homepage
- `ComingSoon.astro` — Placeholder for in-progress pages

## Conventions
- Static output only (`output: 'static'` in astro.config.mjs)
- Tests mirror the page structure in `tests/`
- No client-side framework components unless strictly required

## Deployment
- Cloudflare Pages auto-deploys on push to `main`
- Build command: `npm run build`, output: `dist/`
- Cache rules in `public/_headers`
