import React from "react";
import { useTheme } from "@/modules/mode-switch/ThemeContext";
import styles from "@/styles/themes/futuristic-theme.module.css";

interface ArtPiece {
  src: string;
  caption: string;
  story: string;
}

interface MediaEmbedProps {
  type: "soundcloud" | "art-carousel";
  soundcloudUrl?: string;
  artPieces?: ArtPiece[];
}

export default function MediaEmbed({
  type,
  soundcloudUrl,
  artPieces,
}: MediaEmbedProps) {
  const { themeProps, theme } = useTheme();

  if (type === "soundcloud" && soundcloudUrl) {
    return (
      <div
        className={`rounded-lg overflow-hidden ${
          theme === "futuristic" ? styles.card : ""
        }`}
        style={{
          border:
            theme === "futuristic" ? "1px solid var(--icon-border)" : "none",
          boxShadow:
            theme === "futuristic"
              ? "var(--box-shadow-card)"
              : themeProps.boxShadow,
        }}
      >
        <iframe
          width="100%"
          height="166"
          scrolling="no"
          frameBorder="no"
          allow="autoplay"
          src={soundcloudUrl}
          style={{
            background:
              theme === "futuristic"
                ? "var(--card-bg)"
                : themeProps.colors.secondary,
          }}
        ></iframe>
      </div>
    );
  }

  if (type === "art-carousel" && artPieces) {
    return (
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {artPieces.map((piece, index) => (
          <div
            key={index}
            className={`group relative overflow-hidden rounded-lg ${
              theme === "futuristic" ? styles.card : ""
            } ${theme === "futuristic" ? styles.cardHover : ""}`}
            style={{
              border:
                theme === "futuristic"
                  ? "1px solid var(--icon-border)"
                  : "none",
              boxShadow:
                theme === "futuristic"
                  ? "var(--box-shadow-card)"
                  : themeProps.boxShadow,
            }}
          >
            <div className="aspect-w-16 aspect-h-9">
              <img
                src={piece.src}
                alt={piece.caption}
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div
              className={`absolute inset-0 flex flex-col justify-end p-4 transition-opacity duration-300 ${
                theme === "futuristic"
                  ? "bg-gradient-to-t from-black/80 to-transparent"
                  : "bg-black/60"
              }`}
            >
              <h3
                className={`text-lg mb-2 ${
                  theme === "futuristic" ? styles.gradientText : ""
                }`}
                style={{
                  color: theme === "futuristic" ? "transparent" : "#fff",
                  fontFamily: themeProps.typography.headingFont,
                  fontWeight: themeProps.typography.headingWeight,
                  letterSpacing: themeProps.typography.letterSpacing,
                }}
              >
                {piece.caption}
              </h3>
              <p
                className={theme === "futuristic" ? styles.body : ""}
                style={{
                  color: "#fff",
                  fontFamily: themeProps.typography.bodyFont,
                  fontSize: "0.875rem",
                  opacity: theme === "futuristic" ? 0.85 : 0.9,
                }}
              >
                {piece.story}
              </p>
            </div>

            {theme === "futuristic" && (
              <div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: "var(--cosmic-swirl)",
                  mixBlendMode: "overlay",
                }}
              />
            )}
          </div>
        ))}
      </div>
    );
  }

  return null;
}
