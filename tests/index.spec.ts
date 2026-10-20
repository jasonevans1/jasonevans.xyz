import { test, expect } from '@playwright/test';

const lum = (rgb: number[]) => {
  const [R, G, B] = rgb.map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
};

// WCAG contrast of a computed CSS colour (alpha blended) over an opaque background
const contrast = (color: string, bg: number[]) => {
  const [r, g, b, a = 1] = color.match(/[\d.]+/g)!.map(Number);
  const blended = [r, g, b].map((v, i) => v * a + bg[i] * (1 - a));
  const [hi, lo] = [lum(blended), lum(bg)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

test.describe('home page app cards', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  const forklore = (page) => page.locator('.app-card', { hasText: 'Forklore' });

  test('it shows a Forklore app card on the home page', async ({ page }) => {
    const card = forklore(page);
    await expect(card.locator('.app-name')).toHaveText('Forklore');
    await expect(card.locator('.app-tag')).toHaveText('Live app');
    await expect(card).toContainText('head-to-head bracket');
  });

  test('it links the Forklore card to forklore.jasonevans.xyz', async ({ page }) => {
    await expect(forklore(page).locator('a.app-url')).toHaveAttribute(
      'href',
      'https://forklore.jasonevans.xyz',
    );
  });

  test('it links the Forklore card to the project-forklore GitHub repo', async ({ page }) => {
    await expect(forklore(page).locator('a.app-github')).toHaveAttribute(
      'href',
      'https://github.com/jasonevans1/project-forklore',
    );
  });

  test('it lists the Forklore feature pills', async ({ page }) => {
    await expect(forklore(page).locator('.app-feature-pill')).toHaveText([
      'Quick Pick',
      'Tonight’s events',
      'Guided quiz',
      'Restaurant tournament',
      'Weather-aware picks',
    ]);
  });

  test('it does not show the Wilson app anywhere on the home page', async ({ page }) => {
    await expect(page.locator('body')).not.toContainText(/wilson/i);
    await expect(page.locator('a[href*="wilson"]')).toHaveCount(0);
  });

  test('it still shows the YesChef app card', async ({ page }) => {
    const card = page.locator('.app-card', { hasText: 'YesChef' });
    await expect(card.locator('.app-name')).toHaveText('YesChef');
    await expect(card.locator('a.app-url')).toHaveAttribute(
      'href',
      'https://yeschef.jasonevans.xyz',
    );
  });
});

test.describe('home page styling polish', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('it renders muted card text at 10:1 contrast on the hovered card background', async ({ page }) => {
    const color = await page.locator('.app-desc').first().evaluate((el) => getComputedStyle(el).color);
    expect(contrast(color, [0x1a, 0x1e, 0x27])).toBeGreaterThanOrEqual(10);
  });

  test('it renders no visible text smaller than 12px', async ({ page }) => {
    const tooSmall = await page.evaluate(() =>
      [...document.querySelectorAll('body *')]
        .filter((el) => [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent!.trim()))
        .filter((el) => (el as HTMLElement).offsetParent !== null)
        .filter((el) => parseFloat(getComputedStyle(el).fontSize) < 12)
        .map((el) => `${el.className || el.tagName}: ${getComputedStyle(el).fontSize}`),
    );
    expect(tooSmall).toEqual([]);
  });

  test('it renders the est. 2024 label with readable contrast', async ({ page }) => {
    const color = await page.locator('.est-label').evaluate((el) => getComputedStyle(el).color);
    expect(contrast(color, [0x0c, 0x0e, 0x12])).toBeGreaterThanOrEqual(4.5);
  });

  test('it shows a visible focus outline on app card links when tabbed to', async ({ page }) => {
    for (const sel of ['.app-url', '.app-github']) {
      const link = page.locator(sel).first();
      await link.focus();
      await page.keyboard.press('Shift+Tab');
      await page.keyboard.press('Tab');
      await expect(link).toBeFocused();
      const o = await link.evaluate((el) => {
        const s = getComputedStyle(el);
        return { color: s.outlineColor, width: parseFloat(s.outlineWidth) };
      });
      expect(o.color).toBe('rgb(126, 170, 220)');
      expect(o.width).toBeGreaterThanOrEqual(1);
    }
  });

  test('it shows a visible focus outline on the more apps tile when tabbed to', async ({ page }) => {
    const tile = page.locator('.app-card-future');
    await tile.focus();
    await page.keyboard.press('Shift+Tab');
    await page.keyboard.press('Tab');
    await expect(tile).toBeFocused();
    const o = await tile.evaluate((el) => {
      const s = getComputedStyle(el);
      return {
        color: s.outlineColor,
        width: parseFloat(s.outlineWidth),
        offset: parseFloat(s.outlineOffset),
      };
    });
    expect(o.color).toBe('rgb(126, 170, 220)');
    expect(o.width).toBeGreaterThanOrEqual(1);
    expect(o.offset).toBeLessThan(0);
  });

  test('it renders the YesChef and Forklore cards at equal height on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    const a = await page.locator('.app-card', { hasText: 'YesChef' }).boundingBox();
    const b = await page.locator('.app-card', { hasText: 'Forklore' }).boundingBox();
    expect(a!.height).toBe(b!.height);
  });

  test('it has no horizontal scroll on a 375px wide viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    const els = page.locator('.apps-grid, .app-card, .app-links a, .app-feature-pill');
    const rights = await els.evaluateAll((list) =>
      list.map((el) => el.getBoundingClientRect().right),
    );
    expect(rights.length).toBeGreaterThan(0);
    for (const r of rights) expect(r).toBeLessThanOrEqual(375);
  });
});

test.describe('home page without writing section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('it has no Writing link in the header nav', async ({ page }) => {
    await expect(page.locator('nav a', { hasText: 'Writing' })).toHaveCount(0);
    await expect(page.locator('nav a[href="/blog"]')).toHaveCount(0);
  });

  test('it has no recent writing section', async ({ page }) => {
    await expect(page.locator('.blog-section')).toHaveCount(0);
    await expect(page.locator('body')).not.toContainText('Recent writing');
  });

  test('it does not mention blogging in the hero', async ({ page }) => {
    await expect(page.locator('.hero-desc')).not.toContainText('blogging');
    await expect(page.locator('.hero-desc')).toHaveText(
      'I build web apps and tools that make everyday life a little easier. Developer for 29 years, based in Grimes, Iowa.',
    );
  });

  test('it no longer serves a /blog page', async ({ page }) => {
    const res = await page.goto('/blog');
    expect(res!.status()).toBe(404);
  });
});
