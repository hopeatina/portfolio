import React, { useEffect } from "react";
import { useTheme } from "@/modules/mode-switch/ThemeContext";
import Header from "./Header";
import Footer from "./Footer";
import baseStyles from "@/styles/themes/base-theme.module.css";
import cameroonianStyles from "@/styles/themes/cameroonian-theme.module.css";
import riceStyles from "@/styles/themes/rice-theme.module.css";
import futuristicStyles from "@/styles/themes/futuristic-theme.module.css";

interface LayoutProps {
  children: React.ReactNode;
  showFooter?: boolean;
}

export default function Layout({ children, showFooter = true }: LayoutProps) {
  const { theme } = useTheme();

  useEffect(() => {
    // Apply theme to document root
    document.documentElement.setAttribute("data-theme", theme);

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

  // Get the current theme's styles
  const getThemeStyles = () => {
    switch (theme) {
      case "cameroonian":
        return cameroonianStyles;
      case "rice":
        return riceStyles;
      case "futuristic":
        return futuristicStyles;
      default:
        return baseStyles;
    }
  };

  const styles = getThemeStyles();

  return (
    <>
      {/* Theme transition overlay */}
      <div className="theme-transition-overlay" aria-hidden="true" />

      <div className="min-h-screen bg-background text-text transition-colors">
        <Header />

        <main className="relative">{children}</main>

        {showFooter && <Footer />}
      </div>
    </>
  );
}
