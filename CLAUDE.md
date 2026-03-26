# jasonevans.xyz

Personal portfolio and blog site built with Astro (static output), deployed on Cloudflare Pages.

## Tech Stack

- **Language**: HTML/CSS/JavaScript
- **Framework**: Astro 5.x (static output)
- **Testing**: Playwright (E2E)
- **Linting**: ESLint + Prettier

## Core Principles

- Keep it minimal — prefer simple solutions, avoid over-engineering
- Static-first — no client-side JS frameworks unless absolutely necessary
- Content-driven — structure evolves around content, not the other way around

## Project Structure

- `src/components/` — Reusable Astro components (PascalCase)
- `src/layouts/` — Page layout wrappers
- `src/pages/` — File-based routing
- `src/styles/global.css` — Design tokens + global resets
- `tests/` — Playwright E2E tests

## Commands

```bash
# Run tests
npx playwright test

# Lint/format
npx eslint . && npx prettier --write .

# Start dev server (assume already running)
npm run dev
```

## Key Rules

- One component per `.astro` file, PascalCase names
- Pages use kebab-case filenames
- All pages must use `BaseLayout.astro`
- Avoid `client:` directives unless interaction requires it
- New pages need a Playwright test for the critical user flow
- Run linter before committing

## Feature Development

For simple fixes and quick changes, use TDD (when at all possible).

For any feature or request beyond simple ones, use the `hcf:plan-create` skill to trigger the autonomous development workflow. NEVER use Claude Code's built-in plan mode. After writing a plan, ask user if they would like to execute it. Also provide the command to run it later with the `hcf:plan-orchestrate` skill.

Use this workflow for new features, multi-file changes, or anything requiring multiple steps or tests.

## Project Details

<testing>
@.claude/testing.md
</testing>

<code-standards>
@.claude/code-standards.md
</code-standards>

<pipeline>
@.claude/pipeline.md
</pipeline>
