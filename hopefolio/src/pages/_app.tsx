import type { AppProps } from "next/app";
import { Newsreader, Recursive } from "next/font/google";
import { ThemeProvider } from "@/modules/mode-switch/ThemeContext";
import Layout from "@/components/layout/Layout";
import "@/styles/globals.css";
import "@/styles/v4.css";

const recursive = Recursive({
  subsets: ["latin"],
  weight: "variable",
  axes: ["CASL", "CRSV", "MONO", "slnt"],
  display: "swap",
  variable: "--font-recursive",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: "variable",
  style: ["normal", "italic"],
  axes: ["opsz"],
  adjustFontFallback: false,
  display: "swap",
  variable: "--font-newsreader",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <div className={`${recursive.variable} ${newsreader.variable}`}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </div>
    </ThemeProvider>
  );
}
