import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Theme,
  isThemeDark,
  useTheme,
} from "@/modules/mode-switch/ThemeContext";
import Logo from "@/components/ui/Logo";

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const isHomeRoute = router.pathname === "/";

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "Blog", path: "/blog" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

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
        <div className="mx-auto max-w-5xl px-4 pt-8 sm:px-6 md:px-8">
          <div
            className="pointer-events-auto overflow-hidden border border-border/20 shadow-2xl transition-all duration-300 bg-surface/80 backdrop-blur-xl"
            style={{
              borderRadius: isMobileMenuOpen ? "1.7rem" : "9999px",
            }}
          >
            <nav className="flex items-center justify-between px-4 py-3 md:px-6">
              <div className="flex items-center gap-3">
                <Link
                  href="/"
                  className="group flex items-center gap-3"
                >
                  <Logo
                    width={36}
                    height={36}
                    className="transition-transform group-hover:scale-105 text-primary"
                  />
                  <span
                    className="text-2xl font-semibold tracking-tight text-text"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    Hope Atina
                  </span>
                </Link>
              </div>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden rounded-full p-2 text-text hover:bg-border/20 transition-colors"
                aria-label="Toggle mobile menu"
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
                    className="relative py-1 text-text/80 hover:text-text transition-colors font-medium text-sm"
                  >
                    <span className="relative z-10">{link.name}</span>
                  </Link>
                ))}

                <div className="relative ml-3 group">
                  <button
                    className={`flex items-center gap-2 rounded-full px-4 py-2 border border-border/20 bg-background/50 text-text text-sm font-medium hover:bg-surface transition-all ${
                      isChangingReality ? "scale-95 opacity-80" : ""
                    }`}
                  >
                    <span aria-hidden="true">{themeLabels[theme].icon}</span>
                    <span>Theme</span>
                    <svg
                      className="h-4 w-4 transition-transform group-hover:rotate-180"
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
                  </button>

                  <div className="absolute right-0 top-full pt-4 w-56 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 z-[100] translate-y-2 group-hover:translate-y-0">
                    <div className="py-2 bg-surface/95 border border-border/30 rounded-2xl shadow-2xl backdrop-blur-xl relative overflow-hidden">
                      {(Object.keys(themeLabels) as Theme[]).map((mode) => (
                        <button
                          key={mode}
                          onClick={() => handleThemeChange(mode)}
                          className={`w-full px-4 py-3 flex items-center gap-3 text-left transition-colors ${
                            theme === mode
                              ? "bg-primary/10 text-primary"
                              : "text-text hover:bg-border/20"
                          }`}
                        >
                          <span className="text-xl">
                            {themeLabels[mode].icon}
                          </span>
                          <div className="flex flex-col">
                            <span className="font-semibold text-sm">
                              {mode.charAt(0).toUpperCase() + mode.slice(1)}
                            </span>
                            <span className="text-xs opacity-70">
                              {themeLabels[mode].label}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </nav>

            {/* Mobile Nav */}
            <div
              className={`lg:hidden ${isMobileMenuOpen ? "block" : "hidden"} border-t border-border/20 px-3 pb-4 pt-3 bg-surface/95`}
            >
              <div className="space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.path}
                    onClick={handleMobileNavClick}
                    className="block rounded-xl px-4 py-3 text-text font-medium hover:bg-border/20 transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="pt-4 mt-2 border-t border-border/10">
                <p className="px-4 text-xs font-bold uppercase tracking-widest text-text-muted mb-2">
                  Theme
                </p>
                <div className="space-y-1">
                  {(Object.keys(themeLabels) as Theme[]).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => {
                        handleThemeChange(mode);
                        handleMobileNavClick();
                      }}
                      className={`w-full rounded-xl px-4 py-3 flex items-center gap-3 text-left transition-colors ${
                        theme === mode
                          ? "bg-primary/10 text-primary"
                          : "text-text hover:bg-border/20"
                      }`}
                    >
                      <span className="text-xl">{themeLabels[mode].icon}</span>
                      <span className="font-medium">
                        {mode.charAt(0).toUpperCase() + mode.slice(1)}
                      </span>
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
