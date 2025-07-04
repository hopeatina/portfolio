#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Since we're using TypeScript modules, we need to transpile
// For now, let's create the CSS manually based on our token structure

const generateThemeCSS = () => {
  return `/* Generated Theme CSS Variables */
/* This file is auto-generated from design tokens */

:root {
  /* Base Theme (Default) */
  /* Colors */
  --color-primary: #6D28D9;
  --color-primary-light: #8B5CF6;
  --color-primary-dark: #5B21B6;
  --color-secondary: #EC4899;
  --color-secondary-light: #F472B6;
  --color-secondary-dark: #DB2777;
  --color-accent: #FBBF24;
  --color-accent-light: #FCD34D;
  --color-accent-dark: #F59E0B;
  --color-background: #FFFFFF;
  --color-surface: #F3E8FF;
  --color-surface-light: #FAFAFA;
  --color-surface-dark: #E9D5FF;
  --color-text: #1F2937;
  --color-text-muted: #6B7280;
  --color-text-light: #9CA3AF;
  --color-text-on-primary: #FFFFFF;
  --color-text-on-secondary: #FFFFFF;
  --color-text-on-accent: #1F2937;
  --color-hover: #7C3AED;
  --color-active: #5B21B6;
  --color-disabled: #E5E7EB;
  --color-focus: #6D28D9;
  --color-success: #10B981;
  --color-warning: #F59E0B;
  --color-error: #EF4444;
  --color-info: #3B82F6;
  --color-border: #E5E7EB;
  --color-border-light: #F3F4F6;
  --color-border-dark: #D1D5DB;
  
  /* Typography */
  --font-heading: 'Poppins', sans-serif;
  --font-body: 'Inter', sans-serif;
  --font-mono: 'Fira Code', monospace;
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-md: 1.125rem;
  --font-size-lg: 1.25rem;
  --font-size-xl: 1.5rem;
  --font-size-2xl: 1.875rem;
  --font-size-3xl: 2.25rem;
  --font-size-4xl: 3rem;
  --font-size-5xl: 3.75rem;
  --font-size-6xl: 4.5rem;
  --font-weight-light: 300;
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --font-weight-extrabold: 800;
  --line-height-none: 1;
  --line-height-tight: 1.25;
  --line-height-snug: 1.375;
  --line-height-normal: 1.6;
  --line-height-relaxed: 1.75;
  --line-height-loose: 2;
  --letter-spacing-tighter: -0.05em;
  --letter-spacing-tight: -0.025em;
  --letter-spacing-normal: 0;
  --letter-spacing-wide: 0.025em;
  --letter-spacing-wider: 0.05em;
  --letter-spacing-widest: 0.1em;
  
  /* Spacing */
  --spacing-0: 0;
  --spacing-px: 1px;
  --spacing-0-5: 0.125rem;
  --spacing-1: 0.25rem;
  --spacing-1-5: 0.375rem;
  --spacing-2: 0.5rem;
  --spacing-2-5: 0.625rem;
  --spacing-3: 0.75rem;
  --spacing-3-5: 0.875rem;
  --spacing-4: 1rem;
  --spacing-5: 1.25rem;
  --spacing-6: 1.5rem;
  --spacing-7: 1.75rem;
  --spacing-8: 2rem;
  --spacing-9: 2.25rem;
  --spacing-10: 2.5rem;
  --spacing-11: 2.75rem;
  --spacing-12: 3rem;
  --spacing-14: 3.5rem;
  --spacing-16: 4rem;
  --spacing-20: 5rem;
  --spacing-24: 6rem;
  --spacing-28: 7rem;
  --spacing-32: 8rem;
  --spacing-36: 9rem;
  --spacing-40: 10rem;
  --spacing-44: 11rem;
  --spacing-48: 12rem;
  --spacing-52: 13rem;
  --spacing-56: 14rem;
  --spacing-60: 15rem;
  --spacing-64: 16rem;
  --spacing-72: 18rem;
  --spacing-80: 20rem;
  --spacing-96: 24rem;
  
  /* Elevation */
  --elevation-none: none;
  --elevation-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --elevation-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  --elevation-base: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --elevation-md: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --elevation-lg: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  --elevation-xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  --elevation-2xl: 0 35px 60px -15px rgba(0, 0, 0, 0.3);
  --elevation-3xl: 0 45px 80px -20px rgba(0, 0, 0, 0.35);
  --elevation-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
  
  /* Border Radius */
  --radius-none: 0;
  --radius-sm: 0.125rem;
  --radius-base: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;
  --radius-2xl: 1rem;
  --radius-3xl: 1.5rem;
  --radius-full: 9999px;
  
  /* Animation */
  --duration-instant: 75ms;
  --duration-fast: 150ms;
  --duration-base: 300ms;
  --duration-slow: 500ms;
  --duration-slower: 700ms;
  --easing-linear: linear;
  --easing-ease-in: cubic-bezier(0.4, 0, 1, 1);
  --easing-ease-out: cubic-bezier(0, 0, 0.2, 1);
  --easing-ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --easing-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
  --easing-smooth: cubic-bezier(0.37, 0, 0.63, 1);
  
  /* Transitions */
  --transition-none: none;
  --transition-all: all var(--duration-base) var(--easing-ease-in-out);
  --transition-colors: background-color, border-color, color, fill, stroke var(--duration-base) var(--easing-ease-in-out);
  --transition-opacity: opacity var(--duration-base) var(--easing-ease-in-out);
  --transition-shadow: box-shadow var(--duration-base) var(--easing-ease-in-out);
  --transition-transform: transform var(--duration-base) var(--easing-ease-in-out);
  
  /* Breakpoints */
  --breakpoint-xs: 475px;
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1536px;
  
  /* Derived gradients */
  --gradient-primary: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 50%, var(--color-secondary) 100%);
  --gradient-secondary: linear-gradient(45deg, var(--color-secondary) 0%, var(--color-secondary-light) 100%);
  --gradient-accent: linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-light) 100%);
  --gradient-surface: linear-gradient(180deg, var(--color-surface) 0%, var(--color-surface-light) 100%);
  
  /* Focus styles */
  --focus-ring: 0 0 0 3px var(--color-focus);
  --focus-ring-offset: 0 0 0 1px var(--color-background), var(--focus-ring);
}

/* Cameroonian Theme */
[data-theme="cameroonian"] {
  /* Colors */
  --color-primary: #009639;
  --color-primary-light: #00B843;
  --color-primary-dark: #007A2E;
  --color-secondary: #C71F02;
  --color-secondary-light: #E03918;
  --color-secondary-dark: #A31901;
  --color-accent: #F5E900;
  --color-accent-light: #FFF44F;
  --color-accent-dark: #C4B800;
  --color-background: #FFFFFF;
  --color-surface: #F5FFF7;
  --color-surface-light: #FAFAFA;
  --color-surface-dark: #E8FFE8;
  --color-text: #1A1A1A;
  --color-text-muted: #4A4A4A;
  --color-text-light: #6A6A6A;
  --color-text-on-primary: #FFFFFF;
  --color-text-on-secondary: #FFFFFF;
  --color-text-on-accent: #1A1A1A;
  --color-hover: #00B843;
  --color-active: #007A2E;
  --color-disabled: #E5E5E5;
  --color-focus: #009639;
  --color-success: #009639;
  --color-warning: #F5E900;
  --color-error: #C71F02;
  --color-info: #0066CC;
  --color-border: #D4D4D4;
  --color-border-light: #E5E5E5;
  --color-border-dark: #B4B4B4;
  
  /* Typography */
  --font-heading: 'Ubuntu Condensed', sans-serif;
  --font-body: 'Open Sans', sans-serif;
  --letter-spacing-tighter: -0.03em;
  --letter-spacing-tight: -0.015em;
  --letter-spacing-normal: 0.01em;
  --letter-spacing-wide: 0.03em;
  --letter-spacing-wider: 0.05em;
  --letter-spacing-widest: 0.08em;
  
  /* Elevation */
  --elevation-xs: 0 1px 2px 0 rgba(156, 92, 56, 0.05);
  --elevation-sm: 0 1px 3px 0 rgba(156, 92, 56, 0.1), 0 1px 2px 0 rgba(156, 92, 56, 0.06);
  --elevation-base: 0 4px 6px -1px rgba(156, 92, 56, 0.1), 0 2px 4px -1px rgba(156, 92, 56, 0.06);
  --elevation-md: 0 10px 15px -3px rgba(156, 92, 56, 0.15), 0 4px 6px -2px rgba(156, 92, 56, 0.08);
  --elevation-lg: 0 20px 25px -5px rgba(156, 92, 56, 0.2), 0 10px 10px -5px rgba(156, 92, 56, 0.1);
}

/* Rice Theme */
[data-theme="rice"] {
  /* Colors */
  --color-primary: #00205B;
  --color-primary-light: #003A91;
  --color-primary-dark: #001845;
  --color-secondary: #7C7E7F;
  --color-secondary-light: #9B9D9E;
  --color-secondary-dark: #5D5F60;
  --color-accent: #ADC7DC;
  --color-accent-light: #C5D9E8;
  --color-accent-dark: #95B5D0;
  --color-background: #FFFFFF;
  --color-surface: #F8FAFB;
  --color-surface-light: #FFFFFF;
  --color-surface-dark: #EEF2F5;
  --color-text: #44474F;
  --color-text-muted: #64687A;
  --color-text-light: #848AA0;
  --color-text-on-primary: #FFFFFF;
  --color-text-on-secondary: #FFFFFF;
  --color-text-on-accent: #00205B;
  --color-hover: #003A91;
  --color-active: #001845;
  --color-disabled: #E8E9EB;
  --color-focus: #00205B;
  --color-success: #047857;
  --color-warning: #B45309;
  --color-error: #B91C1C;
  --color-info: #1E40AF;
  --color-border: #E5E7EB;
  --color-border-light: #F3F4F6;
  --color-border-dark: #D1D5DB;
  
  /* Typography */
  --font-heading: 'Merriweather', serif;
  --font-body: 'Inter', sans-serif;
  --letter-spacing-tighter: -0.02em;
  --letter-spacing-tight: -0.01em;
  --letter-spacing-normal: 0;
  --letter-spacing-wide: 0.01em;
  --letter-spacing-wider: 0.02em;
  --letter-spacing-widest: 0.04em;
  
  /* Elevation */
  --elevation-xs: 0 1px 2px 0 rgba(0, 32, 91, 0.03);
  --elevation-sm: 0 1px 3px 0 rgba(0, 32, 91, 0.05), 0 1px 2px 0 rgba(0, 32, 91, 0.03);
  --elevation-base: 0 2px 4px 0 rgba(0, 32, 91, 0.05);
  --elevation-md: 0 4px 6px -1px rgba(0, 32, 91, 0.07), 0 2px 4px -1px rgba(0, 32, 91, 0.04);
  --elevation-lg: 0 10px 15px -3px rgba(0, 32, 91, 0.1), 0 4px 6px -2px rgba(0, 32, 91, 0.05);
}

/* Futuristic Theme */
[data-theme="futuristic"] {
  /* Colors */
  --color-primary: #00EE5C;
  --color-primary-light: #33FF7A;
  --color-primary-dark: #00B843;
  --color-secondary: #00B34A;
  --color-secondary-light: #00D652;
  --color-secondary-dark: #008F3A;
  --color-accent: #9D00FF;
  --color-accent-light: #B84FFF;
  --color-accent-dark: #7A00CC;
  --color-background: #0A0A0A;
  --color-surface: #111111;
  --color-surface-light: #1A1A1A;
  --color-surface-dark: #050505;
  --color-text: #FFFFFF;
  --color-text-muted: #B8B8B8;
  --color-text-light: #888888;
  --color-text-on-primary: #0A0A0A;
  --color-text-on-secondary: #0A0A0A;
  --color-text-on-accent: #FFFFFF;
  --color-hover: #33FF7A;
  --color-active: #00B843;
  --color-disabled: #2A2A2A;
  --color-focus: #00EE5C;
  --color-success: #00EE5C;
  --color-warning: #FFB800;
  --color-error: #FF0080;
  --color-info: #00BFFF;
  --color-border: #2A2A2A;
  --color-border-light: #3A3A3A;
  --color-border-dark: #1A1A1A;
  
  /* Typography */
  --font-heading: 'Orbitron', monospace;
  --font-body: 'Titillium Web', sans-serif;
  --letter-spacing-tighter: 0;
  --letter-spacing-tight: 0.025em;
  --letter-spacing-normal: 0.05em;
  --letter-spacing-wide: 0.075em;
  --letter-spacing-wider: 0.1em;
  --letter-spacing-widest: 0.15em;
  
  /* Elevation */
  --elevation-none: none;
  --elevation-xs: 0 0 4px rgba(0, 238, 92, 0.1);
  --elevation-sm: 0 0 8px rgba(0, 238, 92, 0.15);
  --elevation-base: 0 0 16px rgba(0, 238, 92, 0.2);
  --elevation-md: 0 0 24px rgba(0, 238, 92, 0.25);
  --elevation-lg: 0 0 32px rgba(0, 238, 92, 0.3);
  --elevation-xl: 0 0 48px rgba(0, 238, 92, 0.35);
  --elevation-2xl: 0 0 64px rgba(0, 238, 92, 0.4);
  --elevation-3xl: 0 0 80px rgba(0, 238, 92, 0.45);
  --elevation-inner: inset 0 0 8px rgba(0, 238, 92, 0.15);
  
  /* Border Radius */
  --radius-sm: 0.125rem;
  --radius-base: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
}

/* Dark mode overrides */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme]) {
    /* Auto dark mode - use futuristic theme colors */
    --color-primary: #00EE5C;
    --color-primary-light: #33FF7A;
    --color-primary-dark: #00B843;
    --color-secondary: #00B34A;
    --color-secondary-light: #00D652;
    --color-secondary-dark: #008F3A;
    --color-accent: #9D00FF;
    --color-accent-light: #B84FFF;
    --color-accent-dark: #7A00CC;
    --color-background: #0A0A0A;
    --color-surface: #111111;
    --color-surface-light: #1A1A1A;
    --color-surface-dark: #050505;
    --color-text: #FFFFFF;
    --color-text-muted: #B8B8B8;
    --color-text-light: #888888;
    --color-text-on-primary: #0A0A0A;
    --color-text-on-secondary: #0A0A0A;
    --color-text-on-accent: #FFFFFF;
    --color-hover: #33FF7A;
    --color-active: #00B843;
    --color-disabled: #2A2A2A;
    --color-focus: #00EE5C;
    --color-success: #00EE5C;
    --color-warning: #FFB800;
    --color-error: #FF0080;
    --color-info: #00BFFF;
    --color-border: #2A2A2A;
    --color-border-light: #3A3A3A;
    --color-border-dark: #1A1A1A;
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

/* Focus styles */
*:focus {
  outline: none;
}

*:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
`;
};

// Write the CSS file
const outputPath = path.join(__dirname, '../src/styles/theme-variables.css');
fs.writeFileSync(outputPath, generateThemeCSS());
console.log(`Generated theme CSS variables at: ${outputPath}`); 