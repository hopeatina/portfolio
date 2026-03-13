/* eslint-disable @typescript-eslint/no-var-requires */
const { test } = require("@playwright/test");
const fs = require("fs");
const path = require("path");

const BASE_URL = process.env.THEME_AUDIT_BASE_URL || "http://127.0.0.1:3013";
const PHASE = process.env.THEME_AUDIT_PHASE || "before";

const THEMES = ["base", "cameroonian", "rice", "futuristic"];

const ROUTES = [
  "/",
  "/about",
  "/blog",
  "/blog/building-multi-agent-orchestration",
  "/blog/mcp-in-production",
  "/blog/building-dev-tools-in-rust",
  "/contact",
  "/projects",
  "/projects/alma",
  "/projects/belief-map",
  "/projects/bodyfx",
  "/projects/brain-buffet",
  "/projects/deep-human",
  "/projects/evalvybes",
  "/projects/framefx",
  "/projects/meridian",
  "/projects/neuromosaic",
  "/projects/openclaw",
  "/projects/orgx",
  "/projects/perfpulse",
  "/projects/tasktomodel",
  "/projects/theaicookup",
  "/projects/transmorph",
  "/projects/upload-to-mail",
  "/404",
];

const MOBILE_ROUTES = ["/", "/about", "/blog", "/contact", "/projects"];

function slugifyRoute(route) {
  if (route === "/") {
    return "home";
  }

  return route.replace(/^\//, "").replace(/\//g, "--");
}

async function setTheme(page, theme) {
  await page.addInitScript((selectedTheme) => {
    window.localStorage.setItem("theme", selectedTheme);
  }, theme);
}

function outputPath(viewport, theme, route) {
  const dir = path.join(
    process.cwd(),
    "docs",
    "verification",
    "theme-audit",
    PHASE,
    viewport,
    theme
  );
  fs.mkdirSync(dir, { recursive: true });
  return path.join(dir, `${slugifyRoute(route)}.jpg`);
}

async function captureRoute(page, { theme, route, viewport, isMobile }) {
  if (isMobile) {
    await page.setViewportSize({ width: 390, height: 844 });
  } else {
    await page.setViewportSize({ width: 1440, height: 1100 });
  }

  await setTheme(page, theme);
  await page.goto(`${BASE_URL}${route}`, {
    waitUntil: "domcontentloaded",
    timeout: 45000,
  });
  await page.waitForLoadState("networkidle", { timeout: 5000 }).catch(() => {});
  await page.waitForTimeout(route === "/" ? 1800 : 900);
  await page.screenshot({
    path: outputPath(viewport, theme, route),
    type: "jpeg",
    quality: 78,
    fullPage: true,
  });
}

test.describe.configure({ mode: "serial" });
test.setTimeout(10 * 60 * 1000);

test("capture desktop routes across all themes", async ({ page }) => {
  for (const theme of THEMES) {
    for (const route of ROUTES) {
      await captureRoute(page, {
        theme,
        route,
        viewport: "desktop",
        isMobile: false,
      });
    }
  }
});

test("capture mobile core routes across all themes", async ({ page }) => {
  for (const theme of THEMES) {
    for (const route of MOBILE_ROUTES) {
      await captureRoute(page, {
        theme,
        route,
        viewport: "mobile",
        isMobile: true,
      });
    }
  }
});
