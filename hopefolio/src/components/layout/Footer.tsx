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
  const isRiceTheme = theme === "rice";
  const isCameroonianTheme = theme === "cameroonian";
  const bgIsDark = isDarkTheme || isRiceTheme || isCameroonianTheme;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className={`${styles.footer} py-8`}
      style={{
        background: "var(--footer-bg)",
        borderTop: "1px solid var(--footer-border)",
      }}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3
              className={`text-xl mb-4 ${styles.headingH3}`}
              style={{
                color: "var(--color-heading)",
                fontFamily: "var(--font-heading)",
              }}
            >
              Hope Atina
            </h3>
            <p
              className={`${styles.body}`}
              style={{
                color: "var(--color-body)",
                opacity: 0.9,
              }}
            >
              Building innovative solutions at the intersection of technology
              and creativity.
            </p>
          </div>

          <div>
            <h3
              className={`text-xl mb-4 ${styles.headingH3}`}
              style={{
                color: "var(--color-heading)",
                fontFamily: "var(--font-heading)",
              }}
            >
              Quick Links
            </h3>
            <ul>
              {["About", "Projects", "Blog", "Contact"].map((link) => (
                <li key={link} className="mb-2">
                  <a
                    href={`#${link.toLowerCase()}`}
                    className={`${styles.link} relative inline-block transition-all duration-300`}
                    style={{
                      color: "var(--color-link)",
                    }}
                  >
                    <span className="relative z-10">{link}</span>
                    <div
                      className="absolute bottom-0 left-0 w-full h-0.5 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"
                      style={{
                        background: "var(--color-link-hover)",
                      }}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3
              className={`text-xl mb-4 ${styles.headingH3}`}
              style={{
                color: "var(--color-heading)",
                fontFamily: "var(--font-heading)",
              }}
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
                  className="relative w-10 h-10 flex items-center justify-center rounded-full overflow-hidden group transition-all duration-300 hover:scale-105"
                  style={{
                    background: "var(--gradient-primary)",
                    boxShadow: "var(--box-shadow)",
                  }}
                  aria-label={`${link.platform} Profile`}
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300"
                    style={{
                      background: "var(--gradient-primary-hover)",
                    }}
                  />
                  <span
                    className="relative z-10 transition-transform duration-300 group-hover:scale-110"
                    style={{
                      color: "var(--text-on-dark)",
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
            className="relative w-10 h-10 flex items-center justify-center rounded-full overflow-hidden group transition-all duration-300 hover:scale-105"
            style={{
              background: "var(--gradient-primary)",
              boxShadow: "var(--box-shadow)",
            }}
            aria-label="Back to top"
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300"
              style={{
                background: "var(--gradient-primary-hover)",
              }}
            />
            <span
              className="relative z-10 transition-transform duration-300 group-hover:scale-110"
              style={{
                color: "var(--text-on-dark)",
              }}
            >
              <FiArrowUp size={20} />
            </span>
          </button>
        </div>

        <div className="text-center mt-8">
          <p
            className={`${styles.body}`}
            style={{
              color: "var(--color-body)",
              opacity: 0.9,
            }}
          >
            © {new Date().getFullYear()} Hope Atina. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
