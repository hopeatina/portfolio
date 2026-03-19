import React, { useEffect } from "react";
import { isThemeDark, useTheme } from "@/modules/mode-switch/ThemeContext";
import Header from "./Header";
import Footer from "./Footer";
import SiteSeo from "./SiteSeo";
import ThemeEffects from "../ui/ThemeEffects";

interface LayoutProps {
  children: React.ReactNode;
  showFooter?: boolean;
}

export default function Layout({ children, showFooter = true }: LayoutProps) {
  const { theme } = useTheme();

  useEffect(() => {
    // Apply theme to document root
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.style.colorScheme = isThemeDark(theme)
      ? "dark"
      : "light";

    // Add theme transition overlay effect
    const overlay = document.querySelector(".theme-transition-overlay");
    if (overlay) {
      overlay.classList.add("active");
      setTimeout(() => {
        overlay.classList.remove("active");
      }, 50);
    }

    // Update meta theme-color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      const backgroundColor = getComputedStyle(document.documentElement)
        .getPropertyValue("--color-background")
        .trim();
      metaThemeColor.setAttribute("content", backgroundColor);
    }
  }, [theme]);

  return (
    <>
      <ThemeEffects />
      {/* Theme transition overlay */}
      <div className="theme-transition-overlay" aria-hidden="true" />
      <SiteSeo />

      <div className="min-h-screen bg-background text-text transition-colors">
        <Header />

        <main className="relative">{children}</main>

        {showFooter && <Footer />}
      </div>
    </>
  );
}
