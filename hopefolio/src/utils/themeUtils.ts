import { Theme } from '@/modules/mode-switch/ThemeContext';

// Convert hex to RGB
const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

// Calculate relative luminance
const getLuminance = (r: number, g: number, b: number): number => {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
};

// Calculate contrast ratio
export const getContrastRatio = (color1: string, color2: string): number => {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  
  if (!rgb1 || !rgb2) return 1;
  
  const l1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const l2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
  
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  
  return (lighter + 0.05) / (darker + 0.05);
};

// Check if contrast ratio meets WCAG standards
export const isContrastValid = (ratio: number, level: 'AA' | 'AAA' = 'AA'): boolean => {
  const minimumRatio = level === 'AA' ? 4.5 : 7;
  return ratio >= minimumRatio;
};

// Validate theme colors for accessibility
export const validateThemeColors = (theme: Theme): { [key: string]: boolean } => {
  const themeColors = {
    primary: getContrastRatio('#FFFFFF', theme === 'futuristic' ? '#00EE5C' : 
      theme === 'rice' ? '#00205B' : 
      theme === 'cameroonian' ? '#009639' : '#6D28D9'),
    accent: getContrastRatio('#FFFFFF', theme === 'futuristic' ? '#00B34A' : 
      theme === 'rice' ? '#7C7E7F' : 
      theme === 'cameroonian' ? '#C71F02' : '#EC4899'),
    text: getContrastRatio(
      theme === 'futuristic' ? '#0A0A0A' : '#FFFFFF',
      theme === 'futuristic' ? '#FFFFFF' : '#1F2937'
    )
  };

  return {
    primaryContrast: isContrastValid(themeColors.primary),
    accentContrast: isContrastValid(themeColors.accent),
    textContrast: isContrastValid(themeColors.text)
  };
};

// Consistent shadow and border styles
export const getThemeShadows = (theme: Theme) => {
  const baseStyles = {
    boxShadow: '0 4px 6px -1px rgba(VAR, 0.1), 0 2px 4px -1px rgba(VAR, 0.06)',
    boxShadowHover: '0 10px 15px -3px rgba(VAR, 0.15), 0 4px 6px -2px rgba(VAR, 0.1)',
    boxShadowCard: '0 2px 4px rgba(VAR, 0.05)',
    boxShadowCardHover: '0 8px 16px rgba(VAR, 0.1)',
    borderRadius: '0.75rem',
    borderRadiusSm: '0.5rem',
    borderRadiusLg: '1rem',
    borderRadiusFull: '9999px'
  };

  const shadowColor = theme === 'futuristic' ? '0, 255, 102' :
    theme === 'rice' ? '0, 32, 91' :
    theme === 'cameroonian' ? '245, 233, 0' :
    '109, 40, 217';

  return {
    ...baseStyles,
    boxShadow: baseStyles.boxShadow.replace(/VAR/g, shadowColor),
    boxShadowHover: baseStyles.boxShadowHover.replace(/VAR/g, shadowColor),
    boxShadowCard: baseStyles.boxShadowCard.replace(/VAR/g, shadowColor),
    boxShadowCardHover: baseStyles.boxShadowCardHover.replace(/VAR/g, shadowColor)
  };
};

// Get consistent border styles
export const getThemeBorders = (theme: Theme) => {
  const opacity = theme === 'futuristic' ? '0.25' :
    theme === 'rice' ? '0.15' :
    theme === 'cameroonian' ? '0.15' :
    '0.15';

  const color = theme === 'futuristic' ? '0, 238, 92' :
    theme === 'rice' ? '0, 32, 91' :
    theme === 'cameroonian' ? '0, 150, 57' :
    '109, 40, 217';

  return {
    border: `1px solid rgba(${color}, ${opacity})`,
    borderHover: `1px solid rgba(${color}, ${parseFloat(opacity) + 0.1})`,
    borderRadius: '0.75rem',
    borderRadiusSm: '0.5rem',
    borderRadiusLg: '1rem',
    borderRadiusFull: '9999px'
  };
}; 