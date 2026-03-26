# Testing Configuration

## Test Framework
Playwright (E2E)

## TDD Methodology

Each task follows strict Red → Green → Refactor:

1. Write failing test for one requirement
2. Write minimum code to pass
3. Refactor while tests stay green
4. Repeat for next requirement
5. Commit when task complete

## Commands
```bash
# Run all tests
npx playwright test

# Run with UI
npx playwright test --ui

# Run specific test file
npx playwright test tests/example.spec.ts
```

## Parallel Execution
- **Default**: Playwright runs tests in parallel by default
- Sequential fallback: `npx playwright test --workers=1` (use only when debugging)

## Test File Locations
- E2E tests: `tests/`

## Coverage Requirements
- Critical user flows must have E2E coverage
- New pages and interactions require tests
