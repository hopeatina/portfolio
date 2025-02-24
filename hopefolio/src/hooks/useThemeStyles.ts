import { useTheme } from '@/modules/mode-switch/ThemeContext';
import { validateThemeColors, getThemeShadows, getThemeBorders } from '@/utils/themeUtils';
import { useEffect, useMemo } from 'react';

export const useThemeStyles = () => {
  const { theme } = useTheme();

  // Validate contrast ratios
  const contrastValidation = useMemo(() => validateThemeColors(theme), [theme]);

  // Get consistent shadow styles
  const shadows = useMemo(() => getThemeShadows(theme), [theme]);

  // Get consistent border styles
  const borders = useMemo(() => getThemeBorders(theme), [theme]);

  // Check for any contrast issues and log warnings in development
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      Object.entries(contrastValidation).forEach(([key, isValid]) => {
        if (!isValid) {
          console.warn(`Theme "${theme}" has insufficient contrast for ${key}`);
        }
      });
    }
  }, [theme, contrastValidation]);

  return {
    contrastValidation,
    shadows,
    borders,
    isDarkTheme: theme === 'futuristic',
    isLightTheme: theme !== 'futuristic',
    // Common styles that should be consistent across themes
    common: {
      // Interactive states
      focusRing: {
        outline: 'none',
        boxShadow: `0 0 0 2px ${theme === 'futuristic' ? 'rgba(0, 238, 92, 0.5)' : 
          theme === 'rice' ? 'rgba(0, 32, 91, 0.5)' :
          theme === 'cameroonian' ? 'rgba(0, 150, 57, 0.5)' :
          'rgba(109, 40, 217, 0.5)'}`,
      },
      // Transitions
      transition: {
        base: 'all 0.3s ease',
        fast: 'all 0.15s ease',
        slow: 'all 0.5s ease',
      },
      // Spacing
      spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
      },
      // Typography
      typography: {
        heading: {
          fontFamily: theme === 'futuristic' ? "'Share Tech Mono', monospace" :
            theme === 'rice' ? "'Merriweather', serif" :
            theme === 'cameroonian' ? "'Ubuntu Condensed', sans-serif" :
            "'Poppins', sans-serif",
          letterSpacing: theme === 'futuristic' ? '0.05em' :
            theme === 'rice' ? '0' :
            theme === 'cameroonian' ? '0.01em' :
            '-0.02em',
        },
        body: {
          fontFamily: theme === 'futuristic' ? "'Roboto Mono', monospace" :
            theme === 'rice' ? "'Inter', sans-serif" :
            theme === 'cameroonian' ? "'Open Sans', sans-serif" :
            "'Inter', sans-serif",
          lineHeight: theme === 'futuristic' ? '1.6' :
            theme === 'rice' ? '1.8' :
            theme === 'cameroonian' ? '1.7' :
            '1.6',
        },
      },
    },
  };
}; 