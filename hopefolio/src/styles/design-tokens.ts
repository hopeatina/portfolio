// Design Token System for Portfolio
// This file defines the core design tokens used across all themes

export interface ColorPalette {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
}

export interface SemanticColors {
  // Core semantic colors
  primary: string;
  primaryLight: string;
  primaryDark: string;
  secondary: string;
  secondaryLight: string;
  secondaryDark: string;
  accent: string;
  accentLight: string;
  accentDark: string;
  
  // Surface colors
  background: string;
  surface: string;
  surfaceLight: string;
  surfaceDark: string;
  
  // Text colors
  text: string;
  textMuted: string;
  textLight: string;
  textOnPrimary: string;
  textOnSecondary: string;
  textOnAccent: string;
  
  // UI state colors
  hover: string;
  active: string;
  disabled: string;
  focus: string;
  
  // Feedback colors
  success: string;
  warning: string;
  error: string;
  info: string;
  
  // Border colors
  border: string;
  borderLight: string;
  borderDark: string;
}

export interface Typography {
  // Font families
  fontHeading: string;
  fontBody: string;
  fontMono: string;
  
  // Font sizes - using modular scale (1.25 ratio)
  fontSize: {
    xs: string;    // 0.8rem
    sm: string;    // 0.875rem
    base: string;  // 1rem
    md: string;    // 1.125rem
    lg: string;    // 1.25rem
    xl: string;    // 1.5rem
    '2xl': string; // 1.875rem
    '3xl': string; // 2.35rem
    '4xl': string; // 2.95rem
    '5xl': string; // 3.7rem
    '6xl': string; // 4.6rem
  };
  
  // Font weights
  fontWeight: {
    light: number;
    regular: number;
    medium: number;
    semibold: number;
    bold: number;
    extrabold: number;
  };
  
  // Line heights
  lineHeight: {
    none: number;
    tight: number;
    snug: number;
    normal: number;
    relaxed: number;
    loose: number;
  };
  
  // Letter spacing
  letterSpacing: {
    tighter: string;
    tight: string;
    normal: string;
    wide: string;
    wider: string;
    widest: string;
  };
}

export interface Spacing {
  // Using 8px base unit system
  0: string;      // 0
  px: string;     // 1px
  0.5: string;    // 0.125rem (2px)
  1: string;      // 0.25rem (4px)
  1.5: string;    // 0.375rem (6px)
  2: string;      // 0.5rem (8px)
  2.5: string;    // 0.625rem (10px)
  3: string;      // 0.75rem (12px)
  3.5: string;    // 0.875rem (14px)
  4: string;      // 1rem (16px)
  5: string;      // 1.25rem (20px)
  6: string;      // 1.5rem (24px)
  7: string;      // 1.75rem (28px)
  8: string;      // 2rem (32px)
  9: string;      // 2.25rem (36px)
  10: string;     // 2.5rem (40px)
  11: string;     // 2.75rem (44px)
  12: string;     // 3rem (48px)
  14: string;     // 3.5rem (56px)
  16: string;     // 4rem (64px)
  20: string;     // 5rem (80px)
  24: string;     // 6rem (96px)
  28: string;     // 7rem (112px)
  32: string;     // 8rem (128px)
  36: string;     // 9rem (144px)
  40: string;     // 10rem (160px)
  44: string;     // 11rem (176px)
  48: string;     // 12rem (192px)
  52: string;     // 13rem (208px)
  56: string;     // 14rem (224px)
  60: string;     // 15rem (240px)
  64: string;     // 16rem (256px)
  72: string;     // 18rem (288px)
  80: string;     // 20rem (320px)
  96: string;     // 24rem (384px)
}

export interface Elevation {
  none: string;
  xs: string;
  sm: string;
  base: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  inner: string;
}

export interface BorderRadius {
  none: string;
  sm: string;
  base: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  full: string;
}

export interface Animation {
  // Durations
  duration: {
    instant: string;
    fast: string;
    base: string;
    slow: string;
    slower: string;
  };
  
  // Easings
  easing: {
    linear: string;
    easeIn: string;
    easeOut: string;
    easeInOut: string;
    bounce: string;
    smooth: string;
  };
  
  // Transitions
  transition: {
    none: string;
    all: string;
    colors: string;
    opacity: string;
    shadow: string;
    transform: string;
  };
}

export interface Breakpoints {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
}

export interface DesignTokens {
  colors: SemanticColors;
  typography: Typography;
  spacing: Spacing;
  elevation: Elevation;
  borderRadius: BorderRadius;
  animation: Animation;
  breakpoints: Breakpoints;
}

// Base spacing scale
export const spacing: Spacing = {
  0: '0',
  px: '1px',
  0.5: '0.125rem',
  1: '0.25rem',
  1.5: '0.375rem',
  2: '0.5rem',
  2.5: '0.625rem',
  3: '0.75rem',
  3.5: '0.875rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  7: '1.75rem',
  8: '2rem',
  9: '2.25rem',
  10: '2.5rem',
  11: '2.75rem',
  12: '3rem',
  14: '3.5rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
  28: '7rem',
  32: '8rem',
  36: '9rem',
  40: '10rem',
  44: '11rem',
  48: '12rem',
  52: '13rem',
  56: '14rem',
  60: '15rem',
  64: '16rem',
  72: '18rem',
  80: '20rem',
  96: '24rem',
};

// Base border radius scale
export const borderRadius: BorderRadius = {
  none: '0',
  sm: '0.125rem',
  base: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  '3xl': '1.5rem',
  full: '9999px',
};

// Base animation tokens
export const animation: Animation = {
  duration: {
    instant: '75ms',
    fast: '150ms',
    base: '300ms',
    slow: '500ms',
    slower: '700ms',
  },
  easing: {
    linear: 'linear',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    smooth: 'cubic-bezier(0.37, 0, 0.63, 1)',
  },
  transition: {
    none: 'none',
    all: 'all var(--duration-base) var(--easing-ease-in-out)',
    colors: 'background-color, border-color, color, fill, stroke var(--duration-base) var(--easing-ease-in-out)',
    opacity: 'opacity var(--duration-base) var(--easing-ease-in-out)',
    shadow: 'box-shadow var(--duration-base) var(--easing-ease-in-out)',
    transform: 'transform var(--duration-base) var(--easing-ease-in-out)',
  },
};

// Breakpoints
export const breakpoints: Breakpoints = {
  xs: '475px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// Contrast ratio utilities
export const getContrastRatio = (color1: string, color2: string): number => {
  const getLuminance = (color: string): number => {
    const rgb = color.match(/\d+/g);
    if (!rgb) return 0;
    const [r, g, b] = rgb.map(n => {
      const val = parseInt(n) / 255;
      return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  
  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  
  return (brightest + 0.05) / (darkest + 0.05);
};

// Check WCAG compliance
export const isWCAGCompliant = (
  color1: string, 
  color2: string, 
  level: 'AA' | 'AAA' = 'AA',
  size: 'normal' | 'large' = 'normal'
): boolean => {
  const ratio = getContrastRatio(color1, color2);
  const minRatio = level === 'AA' 
    ? (size === 'normal' ? 4.5 : 3)
    : (size === 'normal' ? 7 : 4.5);
  
  return ratio >= minRatio;
}; 