import type { AppProps } from "next/app";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "@/modules/mode-switch/ThemeContext";
import Layout from "@/components/layout/Layout";
import "@/styles/globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body-system",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-system",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <div className={`${display.variable} ${body.variable} ${mono.variable}`}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </div>
    </ThemeProvider>
  );
}
