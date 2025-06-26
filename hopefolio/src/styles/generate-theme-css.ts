// Utility to generate CSS custom properties from design tokens
import { DesignTokens } from './design-tokens';
import { themeTokens } from './theme-tokens';

export const generateCSSVariables = (tokens: DesignTokens): string => {
  const cssVars: string[] = [];
  
  // Colors
  Object.entries(tokens.colors).forEach(([key, value]) => {
    const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
    cssVars.push(`--color-${cssKey}: ${value};`);
  });
  
  // Typography
  cssVars.push(`--font-heading: ${tokens.typography.fontHeading};`);
  cssVars.push(`--font-body: ${tokens.typography.fontBody};`);
  cssVars.push(`--font-mono: ${tokens.typography.fontMono};`);
  
  // Font sizes
  Object.entries(tokens.typography.fontSize).forEach(([key, value]) => {
    cssVars.push(`--font-size-${key}: ${value};`);
  });
  
  // Font weights
  Object.entries(tokens.typography.fontWeight).forEach(([key, value]) => {
    cssVars.push(`--font-weight-${key}: ${value};`);
  });
  
  // Line heights
  Object.entries(tokens.typography.lineHeight).forEach(([key, value]) => {
    cssVars.push(`--line-height-${key}: ${value};`);
  });
  
  // Letter spacing
  Object.entries(tokens.typography.letterSpacing).forEach(([key, value]) => {
    cssVars.push(`--letter-spacing-${key}: ${value};`);
  });
  
  // Spacing
  Object.entries(tokens.spacing).forEach(([key, value]) => {
    const cssKey = key.replace(/\./g, '-');
    cssVars.push(`--spacing-${cssKey}: ${value};`);
  });
  
  // Elevation
  Object.entries(tokens.elevation).forEach(([key, value]) => {
    cssVars.push(`--elevation-${key}: ${value};`);
  });
  
  // Border radius
  Object.entries(tokens.borderRadius).forEach(([key, value]) => {
    cssVars.push(`--radius-${key}: ${value};`);
  });
  
  // Animation durations
  Object.entries(tokens.animation.duration).forEach(([key, value]) => {
    cssVars.push(`--duration-${key}: ${value};`);
  });
  
  // Animation easings
  Object.entries(tokens.animation.easing).forEach(([key, value]) => {
    const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
    cssVars.push(`--easing-${cssKey}: ${value};`);
  });
  
  // Animation transitions
  Object.entries(tokens.animation.transition).forEach(([key, value]) => {
    cssVars.push(`--transition-${key}: ${value};`);
  });
  
  // Breakpoints
  Object.entries(tokens.breakpoints).forEach(([key, value]) => {
    cssVars.push(`--breakpoint-${key}: ${value};`);
  });
  
  return cssVars.join('\n  ');
};

// Generate CSS for all themes
export const generateThemeCSS = () => {
  const themes = Object.entries(themeTokens).map(([themeName, tokens]) => {
    const cssVars = generateCSSVariables(tokens);
    return `
/* ${themeName.charAt(0).toUpperCase() + themeName.slice(1)} Theme */
[data-theme="${themeName}"] {
  ${cssVars}
  
  /* Derived gradients */
  --gradient-primary: linear-gradient(
    135deg,
    var(--color-primary) 0%,
    var(--color-primary-light) 50%,
    var(--color-secondary) 100%
  );
  
  --gradient-secondary: linear-gradient(
    45deg,
    var(--color-secondary) 0%,
    var(--color-secondary-light) 100%
  );
  
  --gradient-accent: linear-gradient(
    135deg,
    var(--color-accent) 0%,
    var(--color-accent-light) 100%
  );
  
  --gradient-surface: linear-gradient(
    180deg,
    var(--color-surface) 0%,
    var(--color-surface-light) 100%
  );
  
  /* Focus styles */
  --focus-ring: 0 0 0 3px var(--color-focus), 0 0 0 5px rgba(var(--color-focus-rgb), 0.25);
  --focus-ring-offset: 0 0 0 1px var(--color-background), var(--focus-ring);
}`;
  }).join('\n');
  
  return `/* Generated Theme CSS Variables */
:root {
  /* Default to base theme */
  ${generateCSSVariables(themeTokens.base)}
  
  /* Color scheme */
  color-scheme: light dark;
}

${themes}

/* Dark mode overrides */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme]) {
    /* Auto dark mode - use futuristic theme */
    ${generateCSSVariables(themeTokens.futuristic)}
  }
}

/* Utility classes based on design tokens */
.text-primary { color: var(--color-primary); }
.text-secondary { color: var(--color-secondary); }
.text-accent { color: var(--color-accent); }
.text-muted { color: var(--color-text-muted); }

.bg-primary { background-color: var(--color-primary); }
.bg-secondary { background-color: var(--color-secondary); }
.bg-accent { background-color: var(--color-accent); }
.bg-surface { background-color: var(--color-surface); }

.border-primary { border-color: var(--color-primary); }
.border-secondary { border-color: var(--color-secondary); }
.border-accent { border-color: var(--color-accent); }

/* Elevation utilities */
.elevation-xs { box-shadow: var(--elevation-xs); }
.elevation-sm { box-shadow: var(--elevation-sm); }
.elevation-base { box-shadow: var(--elevation-base); }
.elevation-md { box-shadow: var(--elevation-md); }
.elevation-lg { box-shadow: var(--elevation-lg); }
.elevation-xl { box-shadow: var(--elevation-xl); }

/* Typography utilities */
.font-heading { font-family: var(--font-heading); }
.font-body { font-family: var(--font-body); }
.font-mono { font-family: var(--font-mono); }

/* Animation utilities */
.transition-all { transition: var(--transition-all); }
.transition-colors { transition: var(--transition-colors); }
.transition-opacity { transition: var(--transition-opacity); }
.transition-shadow { transition: var(--transition-shadow); }
.transition-transform { transition: var(--transition-transform); }
`;
}; 