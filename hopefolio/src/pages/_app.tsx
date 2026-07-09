import type { AppProps } from "next/app";
import {
  Bricolage_Grotesque,
  Instrument_Serif,
  JetBrains_Mono,
  Manrope,
} from "next/font/google";
import { ThemeProvider } from "@/modules/mode-switch/ThemeContext";
import Layout from "@/components/layout/Layout";
import "@/styles/globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
});

const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body-system",
});

const editorial = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-editorial",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-system",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <div className={`${display.variable} ${body.variable} ${editorial.variable} ${mono.variable}`}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </div>
    </ThemeProvider>
  );
}
