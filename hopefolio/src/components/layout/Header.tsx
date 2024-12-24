import React from "react";
import { useTheme } from "@/modules/mode-switch/ThemeContext";
import Link from "next/link";
import { Theme } from "@/modules/mode-switch/ThemeContext";
import baseStyles from "@/styles/themes/base-theme.module.css";
import cameroonianStyles from "@/styles/themes/cameroonian-theme.module.css";
import riceStyles from "@/styles/themes/rice-theme.module.css";
import futuristicStyles from "@/styles/themes/futuristic-theme.module.css";

export default function Header() {
  const { theme, setTheme } = useTheme();

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

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 ${styles.theme}`}>
      <div
        className={`w-full py-4 px-6 ${styles.transitionBase} backdrop-blur-sm`}
        style={{
          background: "var(--header-bg)",
          boxShadow: "var(--box-shadow)",
        }}
      >
        <nav className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex flex-col">
            <Link
              href="/"
              className={`text-2xl ${styles.heading} ${styles.gradientText} ${styles.hoverScale}`}
            >
              Emerging Hope
            </Link>
            <span
              className={`text-sm ${styles.body}`}
              style={{ color: "var(--text)" }}
            >
              Transforming Ideas into Digital Reality
            </span>
          </div>

          <div className="flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className={`${styles.transitionBase} ${styles.body}`}
                style={{
                  color: "var(--text)",
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
                className={`px-4 py-2 ${styles.transitionBase}`}
                style={{
                  border: "1px solid var(--accent)",
                  color: "var(--text)",
                  background: "var(--card-bg)",
                  borderRadius: "var(--border-radius)",
                }}
              >
                <span className="flex items-center gap-2">
                  Theme: {theme.charAt(0).toUpperCase() + theme.slice(1)}
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
              </button>

              <div
                className={`absolute right-0 mt-2 w-48 ${styles.transitionBase} opacity-0 invisible group-hover:opacity-100 group-hover:visible`}
                style={{
                  background: "var(--card-bg)",
                  boxShadow: "var(--box-shadow)",
                  borderRadius: "var(--border-radius)",
                  zIndex: 50,
                }}
              >
                <div className="py-1">
                  {["base", "cameroonian", "rice", "futuristic"].map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setTheme(mode as Theme)}
                      className={`w-full text-left px-4 py-2 ${styles.transitionBase} ${styles.body}`}
                      style={{
                        color: "var(--text)",
                        background:
                          theme === mode ? "var(--accent)" : "transparent",
                        opacity: theme === mode ? 0.9 : 1,
                      }}
                    >
                      {mode.charAt(0).toUpperCase() + mode.slice(1)} Mode
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
