// Theme-specific design token implementations
import { DesignTokens, SemanticColors, Typography, Elevation, spacing, borderRadius, animation, breakpoints } from './design-tokens';

// Base theme tokens
export const baseThemeTokens: DesignTokens = {
  colors: {
    // Core colors
    primary: '#6D28D9',        // Purple-700
    primaryLight: '#8B5CF6',   // Purple-500
    primaryDark: '#5B21B6',    // Purple-800
    secondary: '#EC4899',      // Pink-500
    secondaryLight: '#F472B6', // Pink-400
    secondaryDark: '#DB2777',  // Pink-600
    accent: '#FBBF24',         // Amber-400
    accentLight: '#FCD34D',    // Amber-300
    accentDark: '#F59E0B',     // Amber-500
    
    // Surface colors
    background: '#FFFFFF',
    surface: '#F3E8FF',        // Purple-50
    surfaceLight: '#FAFAFA',
    surfaceDark: '#E9D5FF',    // Purple-100
    
    // Text colors
    text: '#1F2937',           // Gray-800
    textMuted: '#6B7280',      // Gray-500
    textLight: '#9CA3AF',      // Gray-400
    textOnPrimary: '#FFFFFF',
    textOnSecondary: '#FFFFFF',
    textOnAccent: '#1F2937',
    
    // UI states
    hover: '#7C3AED',          // Purple-600
    active: '#5B21B6',         // Purple-800
    disabled: '#E5E7EB',       // Gray-200
    focus: '#6D28D9',          // Purple-700
    
    // Feedback
    success: '#10B981',        // Emerald-500
    warning: '#F59E0B',        // Amber-500
    error: '#EF4444',          // Red-500
    info: '#3B82F6',           // Blue-500
    
    // Borders
    border: '#E5E7EB',         // Gray-200
    borderLight: '#F3F4F6',    // Gray-100
    borderDark: '#D1D5DB',     // Gray-300
  },
  typography: {
    fontHeading: "'Poppins', sans-serif",
    fontBody: "'Inter', sans-serif",
    fontMono: "'Fira Code', monospace",
    fontSize: {
      xs: '0.75rem',      // 12px
      sm: '0.875rem',     // 14px
      base: '1rem',       // 16px
      md: '1.125rem',     // 18px
      lg: '1.25rem',      // 20px
      xl: '1.5rem',       // 24px
      '2xl': '1.875rem',  // 30px
      '3xl': '2.25rem',   // 36px
      '4xl': '3rem',      // 48px
      '5xl': '3.75rem',   // 60px
      '6xl': '4.5rem',    // 72px
    },
    fontWeight: {
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
    lineHeight: {
      none: 1,
      tight: 1.25,
      snug: 1.375,
      normal: 1.6,
      relaxed: 1.75,
      loose: 2,
    },
    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    },
  },
  elevation: {
    none: 'none',
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    base: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    md: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    lg: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    xl: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '2xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
    '3xl': '0 45px 80px -20px rgba(0, 0, 0, 0.35)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  },
  spacing,
  borderRadius,
  animation,
  breakpoints,
};

// Cameroonian theme tokens
export const cameroonianThemeTokens: DesignTokens = {
  ...baseThemeTokens,
  colors: {
    // Core colors - Cameroon flag colors
    primary: '#009639',        // Green
    primaryLight: '#00B843',
    primaryDark: '#007A2E',
    secondary: '#C71F02',      // Red
    secondaryLight: '#E03918',
    secondaryDark: '#A31901',
    accent: '#F5E900',         // Yellow
    accentLight: '#FFF44F',
    accentDark: '#C4B800',
    
    // Surface colors
    background: '#FFFFFF',
    surface: '#F5FFF7',
    surfaceLight: '#FAFAFA',
    surfaceDark: '#E8FFE8',
    
    // Text colors
    text: '#1A1A1A',
    textMuted: '#4A4A4A',
    textLight: '#6A6A6A',
    textOnPrimary: '#FFFFFF',
    textOnSecondary: '#FFFFFF',
    textOnAccent: '#1A1A1A',
    
    // UI states
    hover: '#00B843',
    active: '#007A2E',
    disabled: '#E5E5E5',
    focus: '#009639',
    
    // Feedback
    success: '#009639',
    warning: '#F5E900',
    error: '#C71F02',
    info: '#0066CC',
    
    // Borders
    border: '#D4D4D4',
    borderLight: '#E5E5E5',
    borderDark: '#B4B4B4',
  },
  typography: {
    ...baseThemeTokens.typography,
    fontHeading: "'Ubuntu Condensed', sans-serif",
    fontBody: "'Open Sans', sans-serif",
    letterSpacing: {
      tighter: '-0.03em',
      tight: '-0.015em',
      normal: '0.01em',
      wide: '0.03em',
      wider: '0.05em',
      widest: '0.08em',
    },
  },
  elevation: {
    ...baseThemeTokens.elevation,
    xs: '0 1px 2px 0 rgba(156, 92, 56, 0.05)',
    sm: '0 1px 3px 0 rgba(156, 92, 56, 0.1), 0 1px 2px 0 rgba(156, 92, 56, 0.06)',
    base: '0 4px 6px -1px rgba(156, 92, 56, 0.1), 0 2px 4px -1px rgba(156, 92, 56, 0.06)',
    md: '0 10px 15px -3px rgba(156, 92, 56, 0.15), 0 4px 6px -2px rgba(156, 92, 56, 0.08)',
    lg: '0 20px 25px -5px rgba(156, 92, 56, 0.2), 0 10px 10px -5px rgba(156, 92, 56, 0.1)',
  },
};

// Rice University theme tokens
export const riceThemeTokens: DesignTokens = {
  ...baseThemeTokens,
  colors: {
    // Core colors - Rice University colors
    primary: '#00205B',        // Rice Blue
    primaryLight: '#003A91',
    primaryDark: '#001845',
    secondary: '#7C7E7F',      // Rice Gray
    secondaryLight: '#9B9D9E',
    secondaryDark: '#5D5F60',
    accent: '#ADC7DC',         // Light Blue
    accentLight: '#C5D9E8',
    accentDark: '#95B5D0',
    
    // Surface colors
    background: '#FFFFFF',
    surface: '#F8FAFB',
    surfaceLight: '#FFFFFF',
    surfaceDark: '#EEF2F5',
    
    // Text colors
    text: '#44474F',
    textMuted: '#64687A',
    textLight: '#848AA0',
    textOnPrimary: '#FFFFFF',
    textOnSecondary: '#FFFFFF',
    textOnAccent: '#00205B',
    
    // UI states
    hover: '#003A91',
    active: '#001845',
    disabled: '#E8E9EB',
    focus: '#00205B',
    
    // Feedback
    success: '#047857',
    warning: '#B45309',
    error: '#B91C1C',
    info: '#1E40AF',
    
    // Borders
    border: '#E5E7EB',
    borderLight: '#F3F4F6',
    borderDark: '#D1D5DB',
  },
  typography: {
    ...baseThemeTokens.typography,
    fontHeading: "'Merriweather', serif",
    fontBody: "'Inter', sans-serif",
    letterSpacing: {
      tighter: '-0.02em',
      tight: '-0.01em',
      normal: '0',
      wide: '0.01em',
      wider: '0.02em',
      widest: '0.04em',
    },
  },
  elevation: {
    ...baseThemeTokens.elevation,
    xs: '0 1px 2px 0 rgba(0, 32, 91, 0.03)',
    sm: '0 1px 3px 0 rgba(0, 32, 91, 0.05), 0 1px 2px 0 rgba(0, 32, 91, 0.03)',
    base: '0 2px 4px 0 rgba(0, 32, 91, 0.05)',
    md: '0 4px 6px -1px rgba(0, 32, 91, 0.07), 0 2px 4px -1px rgba(0, 32, 91, 0.04)',
    lg: '0 10px 15px -3px rgba(0, 32, 91, 0.1), 0 4px 6px -2px rgba(0, 32, 91, 0.05)',
  },
};

// Futuristic theme tokens
export const futuristicThemeTokens: DesignTokens = {
  ...baseThemeTokens,
  colors: {
    // Core colors - Neon/Cyberpunk
    primary: '#00EE5C',        // Neon Green
    primaryLight: '#33FF7A',
    primaryDark: '#00B843',
    secondary: '#00B34A',      // Deep Green
    secondaryLight: '#00D652',
    secondaryDark: '#008F3A',
    accent: '#9D00FF',         // Purple
    accentLight: '#B84FFF',
    accentDark: '#7A00CC',
    
    // Surface colors
    background: '#0A0A0A',
    surface: '#111111',
    surfaceLight: '#1A1A1A',
    surfaceDark: '#050505',
    
    // Text colors
    text: '#FFFFFF',
    textMuted: '#B8B8B8',
    textLight: '#888888',
    textOnPrimary: '#0A0A0A',
    textOnSecondary: '#0A0A0A',
    textOnAccent: '#FFFFFF',
    
    // UI states
    hover: '#33FF7A',
    active: '#00B843',
    disabled: '#2A2A2A',
    focus: '#00EE5C',
    
    // Feedback
    success: '#00EE5C',
    warning: '#FFB800',
    error: '#FF0080',
    info: '#00BFFF',
    
    // Borders
    border: '#2A2A2A',
    borderLight: '#3A3A3A',
    borderDark: '#1A1A1A',
  },
  typography: {
    ...baseThemeTokens.typography,
    fontHeading: "'Orbitron', monospace",
    fontBody: "'Titillium Web', sans-serif",
    letterSpacing: {
      tighter: '0',
      tight: '0.025em',
      normal: '0.05em',
      wide: '0.075em',
      wider: '0.1em',
      widest: '0.15em',
    },
  },
  elevation: {
    none: 'none',
    xs: '0 0 4px rgba(0, 238, 92, 0.1)',
    sm: '0 0 8px rgba(0, 238, 92, 0.15)',
    base: '0 0 16px rgba(0, 238, 92, 0.2)',
    md: '0 0 24px rgba(0, 238, 92, 0.25)',
    lg: '0 0 32px rgba(0, 238, 92, 0.3)',
    xl: '0 0 48px rgba(0, 238, 92, 0.35)',
    '2xl': '0 0 64px rgba(0, 238, 92, 0.4)',
    '3xl': '0 0 80px rgba(0, 238, 92, 0.45)',
    inner: 'inset 0 0 8px rgba(0, 238, 92, 0.15)',
  },
  borderRadius: {
    ...borderRadius,
    sm: '0.125rem',
    base: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
  },
};

// Theme token map
export const themeTokens = {
  base: baseThemeTokens,
  cameroonian: cameroonianThemeTokens,
  rice: riceThemeTokens,
  futuristic: futuristicThemeTokens,
} as const;

export type ThemeName = keyof typeof themeTokens; 