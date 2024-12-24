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
  overlayPattern?: string;
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
      backgroundPattern:
        "radial-gradient(circle at 50% 50%, rgba(109, 40, 217, 0.1) 0%, transparent 50%)",
      overlayPattern:
        "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236D28D9' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
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
      backgroundPattern:
        "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm20 20h20v20H20V20zM0 20h20v20H0V20z' fill='%239C5C38' fill-opacity='0.05'/%3E%3C/svg%3E\")",
      overlayPattern:
        "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230B6E4F' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
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
      backgroundPattern: "linear-gradient(0deg, #F7F9FC 0%, #FFFFFF 100%)",
      overlayPattern:
        "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300205B' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
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
      backgroundPattern:
        "linear-gradient(0deg, rgba(157, 0, 255, 0.1) 0%, rgba(255, 0, 128, 0.1) 100%)",
      overlayPattern:
        "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239D00FF' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
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
  getThemeStyles: () => typeof baseStyles;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

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
