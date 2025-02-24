import React from "react";
import { useTheme } from "@/modules/mode-switch/ThemeContext";
import Button from "@/components/ui/Button";

interface SocialLink {
  platform: string;
  url: string;
  icon?: React.ReactNode;
}

interface BlogPostCTAProps {
  socialLinks: SocialLink[];
}

export default function BlogPostCTA({ socialLinks }: BlogPostCTAProps) {
  const { theme, getThemeStyles } = useTheme();
  const styles = getThemeStyles();

  return (
    <div className="mt-24 pt-12 relative">
      {/* Background Gradient */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            theme === "futuristic"
              ? "radial-gradient(circle at 50% 0%, rgba(var(--primary-rgb), 0.1) 0%, transparent 70%)"
              : "radial-gradient(circle at 50% 0%, var(--gradient-start) 0%, transparent 70%)",
          opacity: theme === "futuristic" ? 0.3 : 0.1,
        }}
      />

      {/* Top Border */}
      <div
        className="absolute top-0 left-1/2 transform -translate-x-1/2 h-px w-2/3"
        style={{
          background: "var(--gradient-primary)",
          opacity: theme === "futuristic" ? 0.3 : 0.2,
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6">
        <div
          className="text-center mb-10"
          style={{
            color: "var(--text)",
            opacity: theme === "futuristic" ? 0.85 : 0.9,
          }}
        >
          <h3
            className={`text-2xl sm:text-3xl mb-6 ${styles.headingH3} ${styles.gradientText}`}
            style={{
              fontFamily: "var(--font-heading)",
              letterSpacing: "-0.02em",
            }}
          >
            Enjoyed this post?
          </h3>
          <p
            className={`${styles.body} text-lg`}
            style={{
              color:
                theme === "futuristic"
                  ? "var(--text-muted-on-dark)"
                  : "var(--text-muted)",
              maxWidth: "40ch",
              margin: "0 auto",
              lineHeight: "1.6",
            }}
          >
            Connect with me on social media or subscribe to my RSS feed for more
            content.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {socialLinks.map((link, index) => (
            <Button
              key={index}
              as="a"
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              className={`${styles.secondaryButton} ${styles.secondaryButtonHover} group transition-all duration-300 ease-in-out`}
              style={{
                background:
                  theme === "futuristic"
                    ? "rgba(var(--primary-rgb), 0.1)"
                    : "rgba(var(--accent-rgb), 0.1)",
                borderColor: "var(--primary)",
                backdropFilter: "blur(4px)",
                padding: "0.75rem 1.5rem",
                minWidth: "140px",
              }}
            >
              {link.icon && (
                <span
                  className="mr-3 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    color:
                      theme === "futuristic"
                        ? "var(--primary)"
                        : "var(--accent)",
                  }}
                >
                  {link.icon}
                </span>
              )}
              <span
                style={{
                  color:
                    theme === "futuristic"
                      ? "var(--text-on-dark)"
                      : "var(--text)",
                }}
              >
                {link.platform}
              </span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
