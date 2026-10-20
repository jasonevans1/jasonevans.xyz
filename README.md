# jasonevans.xyz

Personal site built with [Astro](https://astro.build) and deployed on [Cloudflare Pages](https://pages.cloudflare.com).

## Stack

- **Framework** — Astro (static output)
- **Fonts** — DM Serif Display, DM Mono, Instrument Sans (Google Fonts)
- **Hosting** — Cloudflare Pages

## Project structure

```
src/
  components/
    AppCard.astro       # App card used in the apps grid
    ComingSoon.astro    # Placeholder for in-progress pages
  layouts/
    BaseLayout.astro    # Shared nav + footer wrapper
  pages/
    index.astro         # Homepage
    about.astro         # About / CV (coming soon)
    404.astro           # Custom 404
  styles/
    global.css          # Design tokens + global resets
public/
  favicon.svg
  _headers              # Cloudflare Pages cache rules
```

## Local development

```bash
npm install
npm run dev
```

Visit `http://localhost:4321`.

## Build

```bash
npm run build
# Output goes to dist/
```

## Deploy to Cloudflare Pages

1. Push this repo to GitHub.
2. In Cloudflare Pages, click **Create a project** → **Connect to Git**.
3. Select your repo.
4. Set build settings:
   - **Framework preset**: Astro
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
5. Click **Save and Deploy**.

Cloudflare will auto-deploy on every push to `main`.

## Adding a new app

Open `src/pages/index.astro` and add another `<AppCard>` inside the `.apps-grid` div. The grid will reflow automatically.

## Updating the coming-soon page

The `/about` page uses the `ComingSoon` component. Pass new `emoji`, `headline`, `subline`, and optional `note` props to customise the message.
