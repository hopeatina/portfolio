import localFont from "next/font/local";

// Keep every expressive axis locally available. Fetching a weight-only subset
// would silently flatten the site's CASL, CRSV, MONO, and slnt treatments.
export const recursive = localFont({
  src: "../../public/fonts/recursive/recursive-latin-full-normal.woff2",
  weight: "300 1000",
  style: "oblique 0deg 15deg",
  display: "swap",
  variable: "--font-recursive",
  fallback: ["Arial", "sans-serif"],
});

export const newsreader = localFont({
  src: [
    {
      path: "../../public/fonts/newsreader/newsreader-latin-opsz-normal.woff2",
      weight: "200 800",
      style: "normal",
    },
    {
      path: "../../public/fonts/newsreader/newsreader-latin-opsz-italic.woff2",
      weight: "200 800",
      style: "italic",
    },
  ],
  adjustFontFallback: false,
  display: "swap",
  variable: "--font-newsreader",
  fallback: ["Georgia", "serif"],
});
