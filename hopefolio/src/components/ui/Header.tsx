import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "@/modules/mode-switch/ThemeContext";
import styles from "@/styles/themes/base-theme.module.css";
import { useRouter } from "next/router";
import { FiMenu, FiX } from "react-icons/fi";

const themes = ["rice", "futuristic", "cameroonian", "base"] as const;
type ThemeType = (typeof themes)[number];

const themeLabels: Record<ThemeType, string> = {
  rice: "Rice Mode",
  futuristic: "Futuristic Mode",
  cameroonian: "Cameroonian Mode",
  base: "Base Mode",
};

const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
];

const Header = () => {
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const isDarkTheme = theme === "futuristic";
  const isRiceTheme = theme === "rice";
  const bgIsDark = isDarkTheme || theme === "rice" || theme === "cameroonian";

  // Close menus when route changes
  useEffect(() => {
    setIsThemeOpen(false);
    setIsMobileMenuOpen(false);
  }, [router.asPath]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsThemeOpen(false);
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

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

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors hover:text-primary ${
                router.pathname === link.href ? "text-primary font-medium" : ""
              }`}
              style={{
                color:
                  router.pathname === link.href
                    ? "var(--primary)"
                    : bgIsDark
                    ? "var(--text-on-dark)"
                    : "var(--text)",
              }}
            >
              {link.label}
            </Link>
          ))}

          <div className="relative">
            <button
              onClick={() => setIsThemeOpen(!isThemeOpen)}
              className="px-4 py-2 rounded-full transition-all relative overflow-hidden group"
              aria-expanded={isThemeOpen}
              aria-label="Change theme"
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
                  style={{ background: "var(--gradient-primary)" }}
                />
              )}
            </button>

            {isThemeOpen && (
              <div
                className="absolute right-0 mt-2 py-2 rounded-lg shadow-lg"
                role="menu"
                aria-orientation="vertical"
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
                      setIsThemeOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 relative overflow-hidden group transition-colors"
                    role="menuitem"
                    aria-current={theme === t ? "true" : undefined}
                    style={{
                      color:
                        theme === t ? getThemeHoverColor(t) : "var(--text)",
                      background:
                        theme === t
                          ? `rgba(var(--primary-rgb), ${
                              bgIsDark ? "0.1" : "0.05"
                            })`
                          : "transparent",
                    }}
                  >
                    <span className="relative z-10 transition-colors group-hover:text-primary">
                      {themeLabels[t]}
                    </span>
                    <div
                      className="absolute inset-0 w-[200%] opacity-0 group-hover:opacity-100 -translate-x-full group-hover:translate-x-0 transition-all duration-500"
                      style={{
                        background: `linear-gradient(90deg, transparent 0%, rgba(var(--primary-rgb), ${
                          bgIsDark ? "0.15" : "0.1"
                        }) 50%, transparent 100%)`,
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded-lg transition-colors"
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle menu"
          style={{
            color: bgIsDark ? "var(--text-on-dark)" : "var(--text)",
          }}
        >
          {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden"
          style={{
            background: isRiceTheme
              ? "rgba(255, 255, 255, 0.98)"
              : bgIsDark
              ? "rgba(10, 10, 10, 0.95)"
              : "rgba(255, 255, 255, 0.98)",
          }}
        >
          <nav className="py-4">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-6 py-3 transition-colors ${
                  router.pathname === link.href ? "bg-primary/10" : ""
                }`}
                style={{
                  color:
                    router.pathname === link.href
                      ? "var(--primary)"
                      : bgIsDark
                      ? "var(--text-on-dark)"
                      : "var(--text)",
                }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="px-6 py-3">
              <button
                onClick={() => setIsThemeOpen(!isThemeOpen)}
                className="w-full px-4 py-2 rounded-full transition-all relative overflow-hidden group text-center"
                aria-expanded={isThemeOpen}
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
                Change Reality
              </button>
              {isThemeOpen && (
                <div className="mt-2 py-2 rounded-lg" role="menu">
                  {themes.map((t: ThemeType) => (
                    <button
                      key={t}
                      onClick={() => {
                        setTheme(t);
                        setIsThemeOpen(false);
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 transition-colors"
                      role="menuitem"
                      aria-current={theme === t ? "true" : undefined}
                      style={{
                        color:
                          theme === t ? getThemeHoverColor(t) : "var(--text)",
                        background:
                          theme === t
                            ? `rgba(var(--primary-rgb), ${
                                bgIsDark ? "0.1" : "0.05"
                              })`
                            : "transparent",
                      }}
                    >
                      {themeLabels[t]}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
