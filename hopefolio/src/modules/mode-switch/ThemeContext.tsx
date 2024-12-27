import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import baseStyles from "@/styles/themes/base-theme.module.css";
import cameroonianStyles from "@/styles/themes/cameroonian-theme.module.css";
import riceStyles from "@/styles/themes/rice-theme.module.css";
import futuristicStyles from "@/styles/themes/futuristic-theme.module.css";

export type Theme = "base" | "cameroonian" | "rice" | "futuristic";

interface ThemeColors {
  primary: string;
  accent: string;
  secondary: string;
  background: string;
  text: string;
  highlight: string;
  gradients: {
    primary: string;
    secondary?: string;
  };
}

interface Typography {
  headingFont: string;
  bodyFont: string;
  headingWeight: string;
  bodyWeight: string;
  letterSpacing: string;
  lineHeight: string;
}

interface Patterns {
  backgroundPattern: string;
  overlayPattern: string;
  shapeMotifs: {
    primary: string;
    secondary?: string;
    divider?: string;
  };
  iconStyle: {
    type: string;
    glowEffect?: string;
    animation?: string;
  };
  textureType: string;
}

interface Animation {
  transition: string;
  hoverScale: string;
  hoverRotate?: string;
  buttonPulse: string;
  modeToggleEffect: string;
}

interface ThemeProperties {
  colors: ThemeColors;
  typography: Typography;
  patterns: Patterns;
  animation: Animation;
  iconStyle: string;
  borderRadius: string;
  boxShadow: string;
}

export const themeProperties: Record<Theme, ThemeProperties> = {
  base: {
    colors: {
      primary: "#6D28D9",
      accent: "#EC4899",
      secondary: "#F3E8FF",
      background: "#FFFFFF",
      text: "#1F2937",
      highlight: "#FBBF24",
      gradients: {
        primary: "linear-gradient(135deg, #6D28D9 0%, #EC4899 100%)",
      },
    },
    typography: {
      headingFont: "'Poppins', sans-serif",
      bodyFont: "'Inter', sans-serif",
      headingWeight: "700",
      bodyWeight: "400",
      letterSpacing: "-0.02em",
      lineHeight: "1.6",
    },
    patterns: {
      backgroundPattern: `
        radial-gradient(circle at 50% 50%, rgba(109, 40, 217, 0.05) 0%, transparent 50%),
        linear-gradient(0deg, rgba(236, 72, 153, 0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(236, 72, 153, 0.03) 1px, transparent 1px)
      `,
      overlayPattern: `
        radial-gradient(circle at 30% 50%, rgba(109, 40, 217, 0.08) 0%, transparent 60%),
        radial-gradient(circle at 70% 50%, rgba(236, 72, 153, 0.08) 0%, transparent 60%)
      `,
      shapeMotifs: {
        primary: "path('M 0 50 Q 25 0 50 50 Q 75 100 100 50')",
        secondary: "circle(50% at 50% 50%)",
        divider: "path('M 0 25 Q 50 0 100 25 L 100 75 Q 50 100 0 75 Z')",
      },
      iconStyle: {
        type: "cosmic",
        glowEffect: "0 0 15px rgba(109, 40, 217, 0.3)",
        animation: "float 3s ease-in-out infinite",
      },
      textureType: "starfield",
    },
    animation: {
      transition: "all 0.3s ease",
      hoverScale: "scale(1.05)",
      buttonPulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      modeToggleEffect: "glow 1.5s ease-in-out infinite alternate",
    },
    iconStyle: "rounded",
    borderRadius: "0.5rem",
    boxShadow:
      "0 4px 6px -1px rgba(109, 40, 217, 0.1), 0 2px 4px -1px rgba(109, 40, 217, 0.06)",
  },
  cameroonian: {
    colors: {
      primary: "#9C5C38",
      accent: "#0B6E4F",
      secondary: "#EC6E4C",
      background: "#F9F5F1",
      text: "#2D1810",
      highlight: "#CFAE58",
      gradients: {
        primary: "linear-gradient(135deg, #9C5C38 0%, #0B6E4F 100%)",
        secondary: "linear-gradient(45deg, #EC6E4C 0%, #CFAE58 100%)",
      },
    },
    typography: {
      headingFont: "'Ubuntu Condensed', sans-serif",
      bodyFont: "'Open Sans', sans-serif",
      headingWeight: "700",
      bodyWeight: "400",
      letterSpacing: "0.01em",
      lineHeight: "1.7",
    },
    patterns: {
      backgroundPattern: `
        repeating-linear-gradient(45deg, rgba(156, 92, 56, 0.05) 0px, rgba(156, 92, 56, 0.05) 2px,
        transparent 2px, transparent 4px),
        repeating-linear-gradient(-45deg, rgba(11, 110, 79, 0.05) 0px, rgba(11, 110, 79, 0.05) 2px,
        transparent 2px, transparent 4px)
      `,
      overlayPattern: `
        linear-gradient(30deg, rgba(207, 174, 88, 0.07) 12%, transparent 12.5%, transparent 87%, rgba(207, 174, 88, 0.07) 87.5%, rgba(207, 174, 88, 0.07)),
        linear-gradient(150deg, rgba(207, 174, 88, 0.07) 12%, transparent 12.5%, transparent 87%, rgba(207, 174, 88, 0.07) 87.5%, rgba(207, 174, 88, 0.07))
      `,
      shapeMotifs: {
        primary: "polygon(0% 0%, 100% 25%, 100% 75%, 0% 100%)",
        secondary: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
        divider:
          "polygon(0% 15%, 15% 15%, 50% 85%, 85% 15%, 100% 15%, 50% 100%)",
      },
      iconStyle: {
        type: "geometric",
        glowEffect: "0 0 10px rgba(156, 92, 56, 0.2)",
        animation: "rotate 6s linear infinite",
      },
      textureType: "kente",
    },
    animation: {
      transition: "all 0.4s ease-in-out",
      hoverScale: "scale(1.03)",
      hoverRotate: "rotate(2deg)",
      buttonPulse: "weave 3s ease infinite",
      modeToggleEffect: "tapestry 2s ease-in-out infinite",
    },
    iconStyle: "geometric",
    borderRadius: "0.75rem",
    boxShadow:
      "0 4px 6px -1px rgba(156, 92, 56, 0.1), 0 2px 4px -1px rgba(156, 92, 56, 0.06)",
  },
  rice: {
    colors: {
      primary: "#00205B",
      accent: "#336699",
      secondary: "#9FA2A5",
      background: "#F7F9FC",
      text: "#1A1A1A",
      highlight: "#00205B",
      gradients: {
        primary: "linear-gradient(135deg, #00205B 0%, #336699 100%)",
      },
    },
    typography: {
      headingFont: "'Merriweather', serif",
      bodyFont: "'Inter', sans-serif",
      headingWeight: "700",
      bodyWeight: "400",
      letterSpacing: "0",
      lineHeight: "1.8",
    },
    patterns: {
      backgroundPattern: `
        linear-gradient(0deg, rgba(0, 32, 91, 0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0, 32, 91, 0.03) 1px, transparent 1px),
        linear-gradient(rgba(0, 32, 91, 0.01) 2px, transparent 2px),
        linear-gradient(90deg, rgba(0, 32, 91, 0.01) 2px, transparent 2px)
      `,
      overlayPattern: `
        radial-gradient(circle at 50% 0, rgba(0, 32, 91, 0.05) 0%, transparent 75%),
        repeating-linear-gradient(0deg, transparent, transparent 35px, rgba(0, 32, 91, 0.02) 35px, rgba(0, 32, 91, 0.02) 36px)
      `,
      shapeMotifs: {
        primary: "path('M 0 0 L 100 0 L 85 100 L 15 100 Z')",
        secondary: "path('M 0 0 Q 50 20 100 0 L 100 100 Q 50 80 0 100 Z')",
        divider: "path('M 0 40 Q 25 0 50 40 Q 75 80 100 40')",
      },
      iconStyle: {
        type: "academic",
        glowEffect: "0 2px 4px rgba(0, 32, 91, 0.1)",
        animation: "fadeIn 0.3s ease-out",
      },
      textureType: "academic",
    },
    animation: {
      transition: "all 0.3s ease",
      hoverScale: "scale(1.02)",
      buttonPulse: "underline 1.5s ease-in-out infinite",
      modeToggleEffect: "academic 2s ease infinite",
    },
    iconStyle: "classic",
    borderRadius: "0.25rem",
    boxShadow: "0 2px 4px rgba(0, 32, 91, 0.05)",
  },
  futuristic: {
    colors: {
      primary: "#111111",
      accent: "#9D00FF",
      secondary: "#FF0080",
      background: "#1A1A1A",
      text: "#FFFFFF",
      highlight: "#00FF66",
      gradients: {
        primary: "linear-gradient(135deg, #9D00FF 0%, #FF0080 100%)",
        secondary: "linear-gradient(45deg, #00FF66 0%, #00FFFF 100%)",
      },
    },
    typography: {
      headingFont: "'Orbitron', sans-serif",
      bodyFont: "'Titillium Web', sans-serif",
      headingWeight: "600",
      bodyWeight: "400",
      letterSpacing: "0.05em",
      lineHeight: "1.6",
    },
    patterns: {
      backgroundPattern: `
        linear-gradient(0deg, rgba(0, 255, 102, 0.05) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0, 255, 102, 0.05) 1px, transparent 1px),
        radial-gradient(circle at 50% 50%, rgba(157, 0, 255, 0.1) 0%, rgba(255, 0, 128, 0.1) 100%),
        repeating-linear-gradient(45deg, rgba(0, 255, 102, 0.03) 0px, rgba(0, 255, 102, 0.03) 2px, transparent 2px, transparent 4px)
      `,
      overlayPattern: `
        linear-gradient(45deg, rgba(157, 0, 255, 0.1) 25%, transparent 25%),
        linear-gradient(-45deg, rgba(255, 0, 128, 0.1) 25%, transparent 25%),
        linear-gradient(45deg, transparent 75%, rgba(157, 0, 255, 0.1) 75%),
        linear-gradient(-45deg, transparent 75%, rgba(255, 0, 128, 0.1) 75%)
      `,
      shapeMotifs: {
        primary:
          "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
        secondary:
          "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
        divider:
          "polygon(0% 35%, 25% 45%, 50% 35%, 75% 45%, 100% 35%, 100% 65%, 75% 55%, 50% 65%, 25% 55%, 0% 65%)",
      },
      iconStyle: {
        type: "neon",
        glowEffect: "0 0 20px rgba(0, 255, 102, 0.4)",
        animation: "glitch 1s ease-in-out infinite",
      },
      textureType: "cyber",
    },
    animation: {
      transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
      hoverScale: "scale(1.1)",
      hoverRotate: "rotate(-2deg)",
      buttonPulse: "neonPulse 2s ease-in-out infinite",
      modeToggleEffect: "glitch 1s ease-in-out infinite",
    },
    iconStyle: "neon",
    borderRadius: "0.125rem",
    boxShadow: "0 0 20px rgba(157, 0, 255, 0.3)",
  },
};

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  getThemeStyles: () => any;
  themeProps: ThemeProperties;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "base",
  setTheme: () => {},
  getThemeStyles: () => ({}),
  themeProps: themeProperties.base,
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("base");

  useEffect(() => {
    // Get theme from localStorage if available
    const savedTheme = localStorage.getItem("theme") as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

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

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      setTheme(newTheme);
      localStorage.setItem("theme", newTheme);
    },
    getThemeStyles,
    themeProps: themeProperties[theme],
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
