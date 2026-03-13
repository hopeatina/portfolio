const { test, expect } = require("playwright/test");

const captures = [
  "01-hero",
  "02-supporting-review-queue",
  "03-shipped-in-production",
  "04-flagship-systems",
  "05-operating-model",
  "06-by-the-numbers",
  "07-cta",
];

const targetUrl = process.env.HOMEPAGE_CAPTURE_URL || "http://localhost:3007";

test("capture homepage sections", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 960 });
  await page.goto(targetUrl, { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);

  const sections = page.locator("main > section");
  await expect(sections).toHaveCount(captures.length);

  for (const [index, filename] of captures.entries()) {
    const section = sections.nth(index);
    await section.scrollIntoViewIfNeeded();
    await page.mouse.wheel(0, 220);
    await page.waitForTimeout(350);
    await section.screenshot({
      path: `docs/verification/homepage/sections/${filename}.png`,
    });
  }
});
