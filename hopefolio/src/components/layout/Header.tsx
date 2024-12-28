import React, { useState, useEffect } from "react";
import { useTheme } from "@/modules/mode-switch/ThemeContext";
import Link from "next/link";
import { Theme } from "@/modules/mode-switch/ThemeContext";
import baseStyles from "@/styles/themes/base-theme.module.css";
import cameroonianStyles from "@/styles/themes/cameroonian-theme.module.css";
import riceStyles from "@/styles/themes/rice-theme.module.css";
import futuristicStyles from "@/styles/themes/futuristic-theme.module.css";

const themeLabels = {
  base: {
    icon: "✨",
    label: "Emerging Hope",
  },
  cameroonian: {
    icon: "🌍",
    label: "Cultural Heritage",
  },
  rice: {
    icon: "🎓",
    label: "Academic Excellence",
  },
  futuristic: {
    icon: "🚀",
    label: "Future Vision",
  },
};

export default function Header() {
  const { theme, setTheme, isDarkMode, getTextColor } = useTheme();
  const [isChangingReality, setIsChangingReality] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayColor, setOverlayColor] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isDarkTheme = theme === "futuristic";
  const bgIsDark = isDarkTheme || theme === "rice" || theme === "cameroonian";

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

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "Blog", path: "/blog" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  useEffect(() => {
    if (isChangingReality) {
      document.body.style.setProperty(
        "--transition-overlay-color",
        overlayColor
      );
    }
  }, [isChangingReality, overlayColor]);

  const handleThemeChange = (newTheme: Theme) => {
    // Get the accent color of the new theme
    const newStyles = (() => {
      switch (newTheme) {
        case "cameroonian":
          return cameroonianStyles;
        case "rice":
          return riceStyles;
        case "futuristic":
          return futuristicStyles;
        default:
          return baseStyles;
      }
    })();

    // Start the transition
    setIsChangingReality(true);
    setShowOverlay(true);
    setOverlayColor(
      getComputedStyle(document.documentElement).getPropertyValue("--accent")
    );

    // Change theme after a short delay
    setTimeout(() => {
      setTheme(newTheme);
    }, 150);

    // Reset states after animation
    setTimeout(() => {
      setIsChangingReality(false);
      setShowOverlay(false);
    }, 500);
  };

  // Close mobile menu when clicking a link
  const handleMobileNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 ${styles.theme}`}>
        <div
          className={`w-full py-4 px-6 ${styles.transitionBase}`}
          style={{
            background: bgIsDark
              ? "rgba(10, 10, 10, 0.85)"
              : "rgba(255, 255, 255, 0.85)",
            boxShadow: "var(--box-shadow)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            borderBottom: `1px solid ${
              bgIsDark
                ? "rgba(var(--primary-rgb), 0.2)"
                : "rgba(var(--text-rgb), 0.1)"
            }`,
          }}
        >
          <nav className="max-w-7xl mx-auto flex justify-between items-center">
            {/* Logo and Title */}
            <div className="flex flex-col">
              <Link
                href="/"
                className={`text-2xl ${styles.heading} ${styles.gradientText} ${styles.hoverScale}`}
                style={{
                  fontFamily: "var(--font-heading)",
                  letterSpacing: "var(--letter-spacing-heading)",
                  color:
                    theme === "rice"
                      ? "var(--primary)"
                      : bgIsDark
                      ? "var(--text-on-dark)"
                      : "var(--text)",
                  textShadow:
                    theme === "rice"
                      ? "0 2px 4px rgba(0, 32, 91, 0.1)"
                      : "none",
                }}
              >
                Hope Atina
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 rounded-lg ${styles.transitionBase}`}
              aria-label="Toggle mobile menu"
              style={{
                color: bgIsDark ? "var(--text-on-dark)" : "var(--text)",
                background: bgIsDark
                  ? "rgba(var(--primary-rgb), 0.1)"
                  : "rgba(var(--text-rgb), 0.05)",
              }}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`${styles.transitionBase} ${styles.body} hover:opacity-80`}
                  style={{
                    color: bgIsDark ? "var(--text-on-dark)" : "var(--text)",
                    position: "relative",
                    padding: "0.25rem 0",
                  }}
                >
                  <span className="relative z-10">{link.name}</span>
                  <span
                    className={`${styles.transitionBase} absolute inset-x-0 bottom-0 h-0.5 transform scale-x-0 origin-left`}
                    style={{
                      background: "var(--accent)",
                    }}
                  />
                  <style jsx>{`
                    a:hover span:last-child {
                      transform: scaleX(1);
                    }
                  `}</style>
                </Link>
              ))}

              <div className="ml-4 relative group">
                <button
                  className={`px-4 py-2 ${styles.transitionBase} ${
                    isChangingReality ? styles.buttonPulse : ""
                  } group-hover:shadow-lg`}
                  style={{
                    background: (() => {
                      if (theme === "rice") {
                        return "var(--primary)";
                      }
                      return bgIsDark
                        ? "rgba(var(--primary-rgb), 0.1)"
                        : "var(--gradient-primary)";
                    })(),
                    color: (() => {
                      if (theme === "rice") {
                        return "var(--text-on-dark)";
                      }
                      return bgIsDark
                        ? "var(--primary)"
                        : "var(--text-on-dark)";
                    })(),
                    borderRadius: "var(--border-radius)",
                    border:
                      bgIsDark && theme !== "rice"
                        ? "1px solid var(--primary)"
                        : "none",
                    boxShadow: "var(--box-shadow)",
                    transition: "all 0.3s ease",
                  }}
                >
                  <span className="flex items-center gap-2">
                    <span className="animate-spin-slow">
                      {themeLabels[theme].icon}
                    </span>
                    <span className="hidden sm:inline">Change Reality</span>
                    <svg
                      className={`w-4 h-4 ${styles.transitionBase} group-hover:rotate-180`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                  <style jsx>{`
                    button:hover {
                      transform: translateY(-1px);
                      ${theme === "rice"
                        ? "background: var(--hover);"
                        : bgIsDark
                        ? "background: rgba(var(--primary-rgb), 0.2);"
                        : "filter: brightness(1.1);"}
                    }
                  `}</style>
                </button>

                <div
                  className={`absolute right-0 mt-2 w-56 ${styles.transitionBase} opacity-0 invisible group-hover:opacity-100 group-hover:visible`}
                  style={{
                    background: bgIsDark
                      ? "rgba(10, 10, 10, 0.95)"
                      : "rgba(255, 255, 255, 0.95)",
                    boxShadow: "var(--box-shadow)",
                    borderRadius: "var(--border-radius)",
                    zIndex: 50,
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                    border: `1px solid ${
                      bgIsDark
                        ? "rgba(var(--primary-rgb), 0.2)"
                        : "rgba(var(--text-rgb), 0.1)"
                    }`,
                  }}
                >
                  <div className="py-1">
                    {(Object.keys(themeLabels) as Theme[]).map((mode) => (
                      <button
                        key={mode}
                        onClick={() => handleThemeChange(mode)}
                        className={`w-full text-left px-4 py-3 ${styles.transitionBase} ${styles.body} hover:scale-[0.98]`}
                        style={{
                          color: bgIsDark
                            ? "var(--text-on-dark)"
                            : "var(--text)",
                          background:
                            theme === mode
                              ? bgIsDark
                                ? "rgba(var(--primary-rgb), 0.2)"
                                : "rgba(var(--accent-rgb), 0.1)"
                              : "transparent",
                          opacity: theme === mode ? 0.9 : 1,
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl">
                            {themeLabels[mode].icon}
                          </span>
                          <div className="flex flex-col">
                            <span className="font-medium">
                              {mode.charAt(0).toUpperCase() + mode.slice(1)}{" "}
                              Mode
                            </span>
                            <span className="text-sm opacity-75">
                              {themeLabels[mode].label}
                            </span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </nav>

          {/* Mobile Navigation Menu */}
          <div
            className={`lg:hidden ${
              isMobileMenuOpen ? "block" : "hidden"
            } pt-4 pb-3`}
            style={{
              background: bgIsDark
                ? "rgba(10, 10, 10, 0.95)"
                : "rgba(255, 255, 255, 0.95)",
              borderTop: `1px solid ${
                bgIsDark
                  ? "rgba(var(--primary-rgb), 0.2)"
                  : "rgba(var(--text-rgb), 0.1)"
              }`,
            }}
          >
            <div className="space-y-1 px-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  onClick={handleMobileNavClick}
                  className={`block px-3 py-2 rounded-md ${styles.transitionBase} ${styles.body} hover:bg-opacity-10`}
                  style={{
                    color: bgIsDark ? "var(--text-on-dark)" : "var(--text)",
                    background: "transparent",
                  }}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4">
                <div className="px-3">
                  <p
                    className="text-sm font-medium"
                    style={{
                      color: bgIsDark ? "var(--text-on-dark)" : "var(--text)",
                    }}
                  >
                    Theme
                  </p>
                  <div className="mt-2 space-y-1">
                    {(Object.keys(themeLabels) as Theme[]).map((mode) => (
                      <button
                        key={mode}
                        onClick={() => {
                          handleThemeChange(mode);
                          handleMobileNavClick();
                        }}
                        className={`w-full text-left px-3 py-2 rounded-md ${styles.transitionBase} ${styles.body}`}
                        style={{
                          color: bgIsDark
                            ? "var(--text-on-dark)"
                            : "var(--text)",
                          background:
                            theme === mode
                              ? bgIsDark
                                ? "rgba(var(--primary-rgb), 0.2)"
                                : "rgba(var(--accent-rgb), 0.1)"
                              : "transparent",
                          opacity: theme === mode ? 0.9 : 1,
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl">
                            {themeLabels[mode].icon}
                          </span>
                          <span>
                            {mode.charAt(0).toUpperCase() + mode.slice(1)}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Theme Transition Overlay */}
      <div
        className={`theme-transition-overlay ${showOverlay ? "active" : ""}`}
      />
    </>
  );
}
