import React from "react";
import { useTheme } from "@/modules/mode-switch/ThemeContext";
import { FiGithub, FiTwitter, FiLinkedin, FiArrowUp } from "react-icons/fi";

interface SocialLink {
  platform: string;
  url: string;
  icon: React.ReactNode;
}

const socialLinks: SocialLink[] = [
  {
    platform: "GitHub",
    url: "https://github.com/hopeatina",
    icon: <FiGithub size={20} />,
  },
  {
    platform: "Twitter",
    url: "https://twitter.com/hopeatina",
    icon: <FiTwitter size={20} />,
  },
  {
    platform: "LinkedIn",
    url: "https://linkedin.com/in/hopeatina",
    icon: <FiLinkedin size={20} />,
  },
];

export default function Footer() {
  const { theme, getThemeStyles } = useTheme();
  const styles = getThemeStyles();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="mt-16 py-8 border-t">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Statement */}
          <div>
            <h3
              className={`text-xl mb-4 ${styles.headingH3} ${styles.gradientText}`}
            >
              Hope Atina
            </h3>
            <p
              className={styles.body}
              style={{
                color: "var(--text)",
                opacity: theme === "futuristic" ? 0.85 : 0.9,
              }}
            >
              Building innovative solutions at the intersection of technology
              and creativity.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              className={`text-xl mb-4 ${styles.headingH3} ${styles.gradientText}`}
            >
              Quick Links
            </h3>
            <ul>
              {["About", "Projects", "Blog", "Contact"].map((link) => (
                <li key={link} className="mb-2">
                  <a
                    href={`#${link.toLowerCase()}`}
                    className={`${styles.link} ${styles.linkHover}`}
                    style={{
                      color: "var(--text)",
                      opacity: theme === "futuristic" ? 0.85 : 0.9,
                    }}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3
              className={`text-xl mb-4 ${styles.headingH3} ${styles.gradientText}`}
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
                  className={`${styles.link} ${styles.linkHover} group`}
                  style={{
                    color: "var(--text)",
                    opacity: theme === "futuristic" ? 0.85 : 0.9,
                  }}
                  aria-label={link.platform}
                >
                  <span className="transition-transform group-hover:scale-110">
                    {link.icon}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Back to Top Button */}
        <div className="text-center mt-8">
          <button
            onClick={scrollToTop}
            className={`${styles.link} ${styles.linkHover} group`}
            style={{
              color: "var(--text)",
              opacity: theme === "futuristic" ? 0.85 : 0.9,
            }}
            aria-label="Back to top"
          >
            <span className="transition-transform group-hover:scale-110">
              <FiArrowUp size={20} />
            </span>
          </button>
        </div>

        {/* Copyright */}
        <div
          className="text-center mt-8"
          style={{
            color: "var(--text)",
            opacity: theme === "futuristic" ? 0.85 : 0.9,
          }}
        >
          <p className={styles.body}>
            © {new Date().getFullYear()} Hope Atina. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
