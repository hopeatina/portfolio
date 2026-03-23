import React, { useEffect } from "react";
import { useTheme } from "@/modules/mode-switch/ThemeContext";
import Header from "./Header";
import Footer from "./Footer";
import SiteSeo from "./SiteSeo";

interface LayoutProps {
  children: React.ReactNode;
  showFooter?: boolean;
}

export default function Layout({ children, showFooter = true }: LayoutProps) {
  const { theme } = useTheme();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.style.colorScheme = "dark";

    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", "#09090b");
    }
  }, [theme]);

  return (
    <>
      <SiteSeo />
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      <div className="site-shell">
        <Header />
        <div className="site-shell-body">{children}</div>
        {showFooter && <Footer />}
      </div>
    </>
  );
}
