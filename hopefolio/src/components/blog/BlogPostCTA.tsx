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
    <div className="mt-16 pt-8 border-t">
      <div
        className="text-center mb-8"
        style={{
          color: "var(--text)",
          opacity: theme === "futuristic" ? 0.85 : 0.9,
        }}
      >
        <h3
          className={`text-2xl mb-4 ${styles.headingH3} ${styles.gradientText}`}
        >
          Enjoyed this post?
        </h3>
        <p className={styles.body}>
          Connect with me on social media or subscribe to my RSS feed for more
          content.
        </p>
      </div>

      <div className="flex justify-center space-x-4">
        {socialLinks.map((link, index) => (
          <Button
            key={index}
            as="a"
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
            className={`${styles.secondaryButton} ${styles.secondaryButtonHover} group`}
          >
            {link.icon && (
              <span className="mr-2 transition-transform group-hover:scale-110">
                {}
              </span>
            )}
            {link.platform}
          </Button>
        ))}
      </div>
    </div>
  );
}
