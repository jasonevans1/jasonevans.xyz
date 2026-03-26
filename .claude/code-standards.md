# Code Standards

## Style Guide
Prettier defaults with ESLint for Astro

## Linting
```bash
# Check for issues
npx eslint .

# Auto-fix issues
npx eslint . --fix
```

## Formatting
```bash
npx prettier --write .
```

## Pre-commit Checks
- Run linter before commits
- All Playwright tests must pass

## Naming Conventions
- Components: PascalCase (e.g., `AppCard.astro`, `BaseLayout.astro`)
- Pages: kebab-case (e.g., `about.astro`, `blog/index.astro`)
- CSS: kebab-case classes, BEM optional
- Files: match component name exactly

## Astro-Specific Rules
- Prefer `.astro` components over framework components (no React/Vue unless necessary)
- Keep client-side JS minimal — use `client:load` sparingly
- One component per file
