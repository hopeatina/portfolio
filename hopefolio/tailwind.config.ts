import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary colors
        primary: "var(--color-primary)",
        "primary-light": "var(--color-primary-light)",
        "primary-dark": "var(--color-primary-dark)",
        
        // Secondary colors
        secondary: "var(--color-secondary)",
        "secondary-light": "var(--color-secondary-light)",
        "secondary-dark": "var(--color-secondary-dark)",
        
        // Accent colors
        accent: "var(--color-accent)",
        "accent-light": "var(--color-accent-light)",
        "accent-dark": "var(--color-accent-dark)",
        
        // Base colors
        background: "var(--color-background)",
        surface: "var(--color-surface)",
        "surface-light": "var(--color-surface-light)",
        "surface-dark": "var(--color-surface-dark)",
        
        // Text colors
        text: "var(--color-text)",
        "text-muted": "var(--color-text-muted)",
        "text-light": "var(--color-text-light)",
        "text-on-primary": "var(--color-text-on-primary)",
        "text-on-secondary": "var(--color-text-on-secondary)",
        "text-on-accent": "var(--color-text-on-accent)",
        
        // State colors
        hover: "var(--color-hover)",
        active: "var(--color-active)",
        disabled: "var(--color-disabled)",
        focus: "var(--color-focus)",
        
        // Semantic colors
        success: "var(--color-success)",
        warning: "var(--color-warning)",
        error: "var(--color-error)",
        info: "var(--color-info)",
        
        // Border colors
        border: "var(--color-border)",
        "border-light": "var(--color-border-light)",
        "border-dark": "var(--color-border-dark)",
        
        // Legacy mappings for backward compatibility
        "header-bg": "var(--color-surface)",
        "card-bg": "var(--color-surface)",
      },
      
      fontFamily: {
        heading: ["var(--font-heading)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      
      fontSize: {
        xs: "var(--font-size-xs)",
        sm: "var(--font-size-sm)",
        base: "var(--font-size-base)",
        md: "var(--font-size-md)",
        lg: "var(--font-size-lg)",
        xl: "var(--font-size-xl)",
        "2xl": "var(--font-size-2xl)",
        "3xl": "var(--font-size-3xl)",
        "4xl": "var(--font-size-4xl)",
        "5xl": "var(--font-size-5xl)",
        "6xl": "var(--font-size-6xl)",
      },
      
      fontWeight: {
        light: "var(--font-weight-light)",
        regular: "var(--font-weight-regular)",
        medium: "var(--font-weight-medium)",
        semibold: "var(--font-weight-semibold)",
        bold: "var(--font-weight-bold)",
        extrabold: "var(--font-weight-extrabold)",
      },
      
      lineHeight: {
        none: "var(--line-height-none)",
        tight: "var(--line-height-tight)",
        snug: "var(--line-height-snug)",
        normal: "var(--line-height-normal)",
        relaxed: "var(--line-height-relaxed)",
        loose: "var(--line-height-loose)",
      },
      
      letterSpacing: {
        tighter: "var(--letter-spacing-tighter)",
        tight: "var(--letter-spacing-tight)",
        normal: "var(--letter-spacing-normal)",
        wide: "var(--letter-spacing-wide)",
        wider: "var(--letter-spacing-wider)",
        widest: "var(--letter-spacing-widest)",
      },
      
      spacing: {
        px: "var(--spacing-px)",
        0: "var(--spacing-0)",
        0.5: "var(--spacing-0-5)",
        1: "var(--spacing-1)",
        1.5: "var(--spacing-1-5)",
        2: "var(--spacing-2)",
        2.5: "var(--spacing-2-5)",
        3: "var(--spacing-3)",
        3.5: "var(--spacing-3-5)",
        4: "var(--spacing-4)",
        5: "var(--spacing-5)",
        6: "var(--spacing-6)",
        7: "var(--spacing-7)",
        8: "var(--spacing-8)",
        9: "var(--spacing-9)",
        10: "var(--spacing-10)",
        11: "var(--spacing-11)",
        12: "var(--spacing-12)",
        14: "var(--spacing-14)",
        16: "var(--spacing-16)",
        20: "var(--spacing-20)",
        24: "var(--spacing-24)",
        28: "var(--spacing-28)",
        32: "var(--spacing-32)",
        36: "var(--spacing-36)",
        40: "var(--spacing-40)",
        44: "var(--spacing-44)",
        48: "var(--spacing-48)",
        52: "var(--spacing-52)",
        56: "var(--spacing-56)",
        60: "var(--spacing-60)",
        64: "var(--spacing-64)",
        72: "var(--spacing-72)",
        80: "var(--spacing-80)",
        96: "var(--spacing-96)",
      },
      
      borderRadius: {
        none: "var(--radius-none)",
        sm: "var(--radius-sm)",
        DEFAULT: "var(--radius-base)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-2xl)",
        "3xl": "var(--radius-3xl)",
        full: "var(--radius-full)",
      },
      
      boxShadow: {
        none: "var(--elevation-none)",
        xs: "var(--elevation-xs)",
        sm: "var(--elevation-sm)",
        DEFAULT: "var(--elevation-base)",
        md: "var(--elevation-md)",
        lg: "var(--elevation-lg)",
        xl: "var(--elevation-xl)",
        "2xl": "var(--elevation-2xl)",
        "3xl": "var(--elevation-3xl)",
        inner: "var(--elevation-inner)",
      },
      
      transitionDuration: {
        instant: "var(--duration-instant)",
        fast: "var(--duration-fast)",
        base: "var(--duration-base)",
        slow: "var(--duration-slow)",
        slower: "var(--duration-slower)",
      },
      
      transitionTimingFunction: {
        linear: "var(--easing-linear)",
        "ease-in": "var(--easing-ease-in)",
        "ease-out": "var(--easing-ease-out)",
        "ease-in-out": "var(--easing-ease-in-out)",
        bounce: "var(--easing-bounce)",
        smooth: "var(--easing-smooth)",
      },
      
      backgroundImage: {
        "gradient-primary": "var(--gradient-primary)",
        "gradient-secondary": "var(--gradient-secondary)",
        "gradient-accent": "var(--gradient-accent)",
        "gradient-surface": "var(--gradient-surface)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
} satisfies Config;
