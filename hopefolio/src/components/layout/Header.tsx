import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Theme,
  isThemeDark,
  useTheme,
} from "@/modules/mode-switch/ThemeContext";
import Logo from "@/components/ui/Logo";
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
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [isChangingReality, setIsChangingReality] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayColor, setOverlayColor] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const isDarkTheme = isThemeDark(theme);
  const isHomeRoute = router.pathname === "/";
  const overHero = isHomeRoute && !isScrolled && !isMobileMenuOpen;
  const chromeIsDark = isDarkTheme || overHero;
  const headerTextColor = chromeIsDark ? "var(--text-on-dark)" : "var(--text)";
  const headerPanelBackground = chromeIsDark
    ? "rgba(7, 12, 24, 0.8)"
    : "rgba(var(--background-rgb), 0.88)";
  const headerSoftFill = chromeIsDark
    ? "rgba(255, 255, 255, 0.06)"
    : "rgba(var(--color-primary-rgb), 0.06)";
  const headerSelectedFill = chromeIsDark
    ? "rgba(255, 255, 255, 0.08)"
    : "rgba(var(--color-primary-rgb), 0.1)";
  const headerBorderColor = chromeIsDark
    ? "rgba(148, 163, 184, 0.18)"
    : "rgba(var(--color-primary-rgb), 0.14)";
  const headerShadow = overHero
    ? "0 18px 48px rgba(2, 6, 23, 0.24)"
    : chromeIsDark
      ? "0 18px 42px rgba(2, 8, 23, 0.24)"
      : "0 18px 42px rgba(15, 23, 42, 0.08)";

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

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 28);

      if (!isHomeRoute || isMobileMenuOpen) {
        setIsHeaderVisible(true);
        lastScrollY = currentScrollY;
        return;
      }

      if (currentScrollY < 56) {
        setIsHeaderVisible(true);
        lastScrollY = currentScrollY;
        return;
      }

      if (Math.abs(currentScrollY - lastScrollY) < 8) {
        return;
      }

      setIsHeaderVisible(currentScrollY < lastScrollY);
      lastScrollY = currentScrollY;
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomeRoute, isMobileMenuOpen]);

  const handleThemeChange = (newTheme: Theme) => {
    setIsChangingReality(true);
    setShowOverlay(true);
    setOverlayColor(
      getComputedStyle(document.documentElement).getPropertyValue("--accent")
    );

    setTimeout(() => {
      setTheme(newTheme);
    }, 150);

    setTimeout(() => {
      setIsChangingReality(false);
      setShowOverlay(false);
    }, 500);
  };

  const handleMobileNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 z-50 pointer-events-none transition-transform duration-300 ${
          isHeaderVisible ? "translate-y-0" : "-translate-y-[120%]"
        }`}
      >
        <div className="mx-auto max-w-6xl px-3 pt-2.5 sm:px-4 md:px-6">
          <div
            className={`pointer-events-auto overflow-hidden border ${styles.theme}`}
            style={{
              background: headerPanelBackground,
              boxShadow: headerShadow,
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              borderColor: headerBorderColor,
              borderRadius: isMobileMenuOpen ? "1.7rem" : "9999px",
            }}
          >
            <nav className="flex items-center justify-between px-4 py-3 md:px-6">
              <div className="flex items-center gap-3">
                <Link
                  href="/"
                  className={`group flex items-center gap-3 ${styles.hoverScale}`}
                >
                  <Logo
                    width={36}
                    height={36}
                    className="transition-transform group-hover:scale-105"
                  />
                  <span
                    className={`text-2xl ${styles.heading}`}
                    style={{
                      fontFamily: "var(--font-heading)",
                      letterSpacing: "var(--letter-spacing-heading)",
                      color: headerTextColor,
                    }}
                  >
                    Hope Atina
                  </span>
                </Link>
              </div>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`lg:hidden rounded-full p-2 ${styles.transitionBase}`}
                aria-label="Toggle mobile menu"
                style={{
                  color: headerTextColor,
                  background: headerSoftFill,
                }}
              >
                <svg
                  className="h-6 w-6"
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

              <div className="hidden items-center gap-6 lg:flex">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.path}
                    className={`${styles.transitionBase} ${styles.body} relative py-1 hover:opacity-80`}
                    style={{
                      color: headerTextColor,
                    }}
                  >
                    <span className="relative z-10">{link.name}</span>
                    <span
                      className={`${styles.transitionBase} absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0`}
                      style={{ background: "var(--accent)" }}
                    />
                    <style jsx>{`
                      a:hover span:last-child {
                        transform: scaleX(1);
                      }
                    `}</style>
                  </Link>
                ))}

                <div className="relative ml-3 group">
                  <button
                    className={`rounded-full px-3.5 py-2 ${styles.transitionBase} ${
                      isChangingReality ? styles.buttonPulse : ""
                    }`}
                    style={{
                      background: headerSoftFill,
                      color: headerTextColor,
                      borderRadius: "9999px",
                      border: `1px solid ${headerBorderColor}`,
                      boxShadow: "none",
                    }}
                  >
                    <span className="flex items-center gap-2">
                      <span aria-hidden="true">{themeLabels[theme].icon}</span>
                      <span className="hidden sm:inline">Theme</span>
                      <svg
                        className={`h-4 w-4 ${styles.transitionBase} group-hover:rotate-180`}
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
                  </button>

                  <div
                    className={`absolute right-0 mt-2 w-56 ${styles.transitionBase} invisible opacity-0 group-hover:visible group-hover:opacity-100`}
                    style={{
                      background: chromeIsDark
                        ? "rgba(7, 12, 24, 0.95)"
                        : "rgba(var(--background-rgb), 0.96)",
                      boxShadow: "var(--box-shadow)",
                      borderRadius: "1.25rem",
                      zIndex: 50,
                      backdropFilter: "blur(10px)",
                      WebkitBackdropFilter: "blur(10px)",
                      border: `1px solid ${headerBorderColor}`,
                    }}
                  >
                    <div className="py-1">
                      {(Object.keys(themeLabels) as Theme[]).map((mode) => (
                        <button
                          key={mode}
                          onClick={() => handleThemeChange(mode)}
                          className={`w-full px-4 py-3 text-left ${styles.transitionBase} ${styles.body} hover:scale-[0.98]`}
                          style={{
                            color: headerTextColor,
                            background:
                              theme === mode
                                ? headerSelectedFill
                                : "transparent",
                            opacity: theme === mode ? 0.95 : 1,
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

            <div
              className={`lg:hidden ${isMobileMenuOpen ? "block" : "hidden"} border-t px-3 pb-4 pt-3`}
              style={{
                borderColor: headerBorderColor,
              }}
            >
              <div className="space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.path}
                    onClick={handleMobileNavClick}
                    className={`block rounded-2xl px-3 py-2 ${styles.transitionBase} ${styles.body}`}
                    style={{
                      color: headerTextColor,
                      background: "transparent",
                    }}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="pt-4">
                <p
                  className="px-3 text-sm font-medium"
                  style={{
                    color: headerTextColor,
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
                      className={`w-full rounded-2xl px-3 py-2 text-left ${styles.transitionBase} ${styles.body}`}
                      style={{
                        color: headerTextColor,
                        background:
                          theme === mode ? headerSelectedFill : "transparent",
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{themeLabels[mode].icon}</span>
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
      </header>

      <div className={`theme-transition-overlay ${showOverlay ? "active" : ""}`} />
    </>
  );
}
