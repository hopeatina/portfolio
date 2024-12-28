import React, { useState } from "react";
import Link from "next/link";
import { useTheme } from "@/modules/mode-switch/ThemeContext";
import styles from "@/styles/themes/base-theme.module.css";

const themes = ["rice", "futuristic", "cameroonian", "base"] as const;
type ThemeType = (typeof themes)[number];

const themeLabels: Record<ThemeType, string> = {
  rice: "Rice Mode",
  futuristic: "Futuristic Mode",
  cameroonian: "Cameroonian Mode",
  base: "Base Mode",
};

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const isDarkTheme = theme === "futuristic";
  const isRiceTheme = theme === "rice";
  const bgIsDark = isDarkTheme || theme === "rice" || theme === "cameroonian";

  const getThemeHoverColor = (t: ThemeType) => {
    switch (t) {
      case "rice":
        return "var(--primary)";
      case "futuristic":
        return "var(--primary)";
      case "cameroonian":
        return "var(--primary)";
      default:
        return "var(--accent)";
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 ${styles.fadeDown}`}
      style={{
        background: isRiceTheme
          ? "rgba(255, 255, 255, 0.98)"
          : bgIsDark
          ? "rgba(10, 10, 10, 0.95)"
          : "rgba(255, 255, 255, 0.98)",
        borderBottom: `1px solid ${
          isRiceTheme
            ? "rgba(0, 32, 91, 0.1)"
            : bgIsDark
            ? "rgba(var(--primary-rgb), 0.2)"
            : "var(--border)"
        }`,
        boxShadow: isRiceTheme
          ? "0 4px 6px rgba(0, 32, 91, 0.05)"
          : "var(--box-shadow-sm)",
      }}
    >
      <div
        className={`${styles.container} h-16 flex items-center justify-between`}
      >
        <Link
          href="/"
          className="text-xl font-bold transition-colors"
          style={{
            color:
              theme === "rice"
                ? "var(--primary)"
                : bgIsDark
                ? "var(--text-on-dark)"
                : "var(--text)",
            textShadow:
              theme === "rice" ? "0 2px 4px rgba(0, 32, 91, 0.1)" : "none",
          }}
        >
          Emerging Hope
        </Link>

        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="px-4 py-2 rounded-full transition-all relative overflow-hidden group"
            style={{
              background: isRiceTheme
                ? "var(--primary)"
                : bgIsDark
                ? "rgba(var(--primary-rgb), 0.1)"
                : "var(--gradient-primary)",
              color: isRiceTheme || !bgIsDark ? "white" : "var(--primary)",
              border: bgIsDark ? "1px solid var(--primary)" : "none",
            }}
          >
            <span className="relative z-10">Change Reality</span>
            {bgIsDark && (
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background: "var(--gradient-primary)",
                }}
              />
            )}
          </button>

          {isOpen && (
            <div
              className="absolute right-0 mt-2 py-2 rounded-lg shadow-lg"
              style={{
                background: isRiceTheme
                  ? "rgba(255, 255, 255, 0.98)"
                  : bgIsDark
                  ? "rgba(10, 10, 10, 0.95)"
                  : "rgba(255, 255, 255, 0.98)",
                border: `1px solid ${
                  isRiceTheme
                    ? "rgba(0, 32, 91, 0.1)"
                    : bgIsDark
                    ? "rgba(var(--primary-rgb), 0.2)"
                    : "var(--border)"
                }`,
                minWidth: "180px",
              }}
            >
              {themes.map((t: ThemeType) => (
                <button
                  key={t}
                  onClick={() => {
                    setTheme(t);
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 relative overflow-hidden group transition-colors"
                  style={{
                    color:
                      theme === t
                        ? t === "rice"
                          ? "var(--primary)"
                          : t === "futuristic"
                          ? "var(--primary)"
                          : "var(--primary)"
                        : "var(--text)",
                    background:
                      theme === t
                        ? t === "rice"
                          ? "rgba(0, 32, 91, 0.05)"
                          : t === "futuristic"
                          ? "rgba(var(--primary-rgb), 0.1)"
                          : "rgba(var(--primary-rgb), 0.05)"
                        : "transparent",
                  }}
                >
                  <span
                    className="relative z-10 transition-colors group-hover:text-primary"
                    style={{
                      color: theme === t ? getThemeHoverColor(t) : undefined,
                    }}
                  >
                    {themeLabels[t]}
                  </span>
                  {/* Theme-specific hover effect */}
                  <div
                    className="absolute inset-0 w-[200%] opacity-0 group-hover:opacity-100 -translate-x-full group-hover:translate-x-0 transition-all duration-500"
                    style={{
                      background:
                        t === "rice"
                          ? "linear-gradient(90deg, transparent 0%, rgba(0, 32, 91, 0.1) 50%, transparent 100%)"
                          : t === "futuristic"
                          ? "linear-gradient(90deg, transparent 0%, rgba(var(--primary-rgb), 0.15) 50%, transparent 100%)"
                          : t === "cameroonian"
                          ? "linear-gradient(90deg, transparent 0%, rgba(var(--primary-rgb), 0.1) 50%, transparent 100%)"
                          : "linear-gradient(90deg, transparent 0%, rgba(var(--primary-rgb), 0.1) 50%, transparent 100%)",
                    }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
