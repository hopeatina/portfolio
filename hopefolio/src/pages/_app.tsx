import type { AppProps } from "next/app";
import { recursive, newsreader } from "@/lib/local-fonts";
import { ThemeProvider } from "@/modules/mode-switch/ThemeContext";
import MaterialAtmosphere from "@/components/material/MaterialAtmosphere";
import Layout from "@/components/layout/Layout";
import ThreadStitch from "@/components/v5/thread/ThreadStitch";
import "@/styles/globals.css";
import "@/styles/v4.css";
import "@/styles/material-surfaces.css";
import "@/styles/material.css";
import "@/styles/material-atmosphere.css";
import "@/styles/practice.css";
import "@/styles/project-visual.css";
import "@/styles/thread.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <div className={`material-root ${recursive.variable} ${newsreader.variable}`}>
        <MaterialAtmosphere />
        <div style={{ position: "relative", zIndex: 1 }}>
          <Layout pageProps={pageProps}>
            <Component {...pageProps} />
          </Layout>
          {/* one strand of the material, sewn through every page and carried across routes */}
          <ThreadStitch />
        </div>
      </div>
    </ThemeProvider>
  );
}
