"use client";

import React, { createElement } from "react";
import { useTheme } from "@/modules/mode-switch/ThemeContext";
import { FiGithub, FiTwitter, FiLinkedin, FiArrowUp } from "react-icons/fi";
import styles from "@/styles/themes/base-theme.module.css";

interface SocialLink {
  platform: string;
  url: string;
  icon: React.ComponentType<{ size: number }>;
}

const socialLinks: SocialLink[] = [
  {
    platform: "GitHub",
    url: "https://github.com/hopeatina",
    icon: FiGithub,
  },
  {
    platform: "LinkedIn",
    url: "https://linkedin.com/in/hopeatina",
    icon: FiLinkedin,
  },
  {
    platform: "X",
    url: "https://x.com/emerginghope_",
    icon: FiTwitter,
  },
];

export default function Footer() {
  const { theme, getThemeStyles } = useTheme();
  const themeStyles = getThemeStyles();
  const isDarkTheme = theme === "futuristic";

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className={`${styles.footer} py-8 border-t border-accent/10`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3
              className={`text-xl mb-4 ${styles.headingH3}`}
              style={{ color: "var(--text-on-light)" }}
            >
              Hope Atina
            </h3>
            <p
              className={`${styles.body}`}
              style={{ color: "var(--text-muted-on-light)" }}
            >
              Building innovative solutions at the intersection of technology
              and creativity.
            </p>
          </div>

          <div>
            <h3
              className={`text-xl mb-4 ${styles.headingH3}`}
              style={{ color: "var(--text-on-light)" }}
            >
              Quick Links
            </h3>
            <ul>
              {["About", "Projects", "Blog", "Contact"].map((link) => (
                <li key={link} className="mb-2">
                  <a
                    href={`#${link.toLowerCase()}`}
                    className={`${styles.link}`}
                    style={{ color: "var(--text-muted-on-light)" }}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3
              className={`text-xl mb-4 ${styles.headingH3}`}
              style={{ color: "var(--text-on-light)" }}
            >
              Connect
            </h3>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.link} hover:transform hover:scale-110 transition-transform relative w-10 h-10 flex items-center justify-center rounded-full overflow-hidden`}
                  style={{
                    background: "var(--gradient-primary)",
                    boxShadow: isDarkTheme
                      ? "0 0 20px rgba(var(--primary-rgb), 0.2)"
                      : "0 0 20px rgba(var(--accent-rgb), 0.1)",
                  }}
                  aria-label={`${link.platform} Profile`}
                >
                  <div
                    className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: "var(--gradient-primary-hover)",
                    }}
                  />
                  <span
                    className="relative z-[1]"
                    style={{
                      color: "var(--text-on-accent)",
                    }}
                  >
                    {createElement(link.icon, { size: 20 })}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <button
            onClick={scrollToTop}
            className={`${styles.link} w-10 h-10 flex items-center justify-center rounded-full overflow-hidden`}
            style={{
              background: "var(--gradient-primary)",
              boxShadow: isDarkTheme
                ? "0 0 20px rgba(var(--primary-rgb), 0.2)"
                : "0 0 20px rgba(var(--accent-rgb), 0.1)",
            }}
            aria-label="Back to top"
          >
            <span className="transition-transform hover:scale-110 relative">
              <div
                className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: "var(--gradient-primary-hover)",
                }}
              />
              <FiArrowUp
                size={20}
                style={{
                  position: "relative",
                  zIndex: 1,
                  color: "var(--text-on-accent)",
                }}
              />
            </span>
          </button>
        </div>

        <div className="text-center mt-8">
          <p
            className={`${styles.body}`}
            style={{ color: "var(--text-muted-on-light)" }}
          >
            © {new Date().getFullYear()} Hope Atina. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
