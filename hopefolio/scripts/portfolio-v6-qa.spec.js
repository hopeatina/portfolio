/* eslint-disable @typescript-eslint/no-var-requires */
const { test, expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");

const BASE_URL = process.env.PORTFOLIO_QA_URL || "http://127.0.0.1:4173";
const OUT = path.join(process.cwd(), "docs", "verification", "v6-after");
const routes = [
  ["home", "/"],
  ["about", "/about"],
  ["work", "/projects"],
  ["orgx", "/projects/orgx"],
  ["alma", "/projects/alma"],
  ["perfpulse", "/projects/perfpulse"],
  ["openclaw", "/projects/openclaw"],
];

fs.mkdirSync(OUT, { recursive: true });
test.describe.configure({ mode: "serial" });
test.setTimeout(8 * 60 * 1000);

async function visit(page, route) {
  const pageErrors = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));
  await page.goto(`${BASE_URL}${route}`, { waitUntil: "domcontentloaded" });
  await page.waitForLoadState("networkidle").catch(() => {});
  await page.waitForTimeout(450);
  expect(pageErrors).toEqual([]);
  const overflow = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
  expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.clientWidth + 1);
}

test("desktop narrative, interaction, and captures", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1100 });
  for (const [name, route] of routes) {
    await visit(page, route);
    const knots = page.locator('.v5-thread-knots button[role="tab"]');
    if (await knots.count() > 1) {
      await knots.nth(1).focus();
      await page.keyboard.press("Enter");
      await expect(knots.nth(1)).toHaveAttribute("aria-selected", "true");
    }
    await page.screenshot({ path: path.join(OUT, `desktop-${name}.jpg`), type: "jpeg", quality: 82, fullPage: true });
  }
});

test("375px mobile has no clipping and keeps controls usable", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  for (const [name, route] of routes) {
    await visit(page, route);
    const firstKnot = page.locator('.v5-thread-knots button[role="tab"]').first();
    if (await firstKnot.count()) {
      await expect(firstKnot).toBeVisible();
      await expect(firstKnot).toBeEnabled();
    }
    await page.screenshot({ path: path.join(OUT, `mobile-${name}.jpg`), type: "jpeg", quality: 78, fullPage: true });
  }
});

test("reduced motion preserves the full story", async ({ browser }) => {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  for (const [name, route] of [["home", "/"], ["orgx", "/projects/orgx"]]) {
    await visit(page, route);
    await expect(page.locator(".v5-thread-field").first()).toBeVisible();
    await page.screenshot({ path: path.join(OUT, `reduced-${name}.jpg`), type: "jpeg", quality: 80, fullPage: true });
  }
  await context.close();
});
