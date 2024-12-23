# Emerging Hope Portfolio

A multi-mode portfolio that showcases my journey as an engineer, creative, and entrepreneur. Features interactive 3D elements, case-study pages for major projects (_Neuromosaic_ & _Brain Buffet_), embedded music & art, and multiple visual “modes” (_Base_, _Cameroonian_, _Rice_, _Futuristic_) to reflect my diverse influences.

## Table of Contents

- Overview
- Features
- Tech Stack
- Project Structure
- Getting Started
- Scripts & Commands
- Mode Switching
- 3D & Performance Considerations
- Contributing
- License

## Overview

This repository hosts my personal portfolio site, designed to highlight:

- **Who I am**: My background (Cameroonian-Houstonian-Rice), my creative side (music, art), and my engineering expertise.
- **What I do**: Major projects like _Neuromosaic_ (distributed ML research) and _Brain Buffet_ (LLM-based course creation), plus other smaller projects.
- **Why I do it**: Core values of **hope**, **transformation**, and **community-building** guide my work—hoping to inspire and collaborate with like-minded innovators.

### Key Goal

Provide potential employers, collaborators, and clients a dynamic, interactive overview of my capabilities and vision.

## Features

### Multi-Mode Theming

- **Base Mode**: Default brand style (purples & pinks, playful/futuristic vibe).
- **Cameroonian Mode**: Warm, earthy color palette with subtle textile patterns.
- **Rice Mode**: Academic, navy-and-white design referencing my alma mater.
- **Futuristic Mode**: Dark background, neon glows, and cutting-edge feel for ML show-and-tells.

### Interactive 3D Element

- A spiral/helix or neuron-like network built with Three.js (or React Three Fiber) in the hero section.

### Case-Study Pages

- _Neuromosaic_: Deep dive into distributed ML, architecture diagrams, open-source goals.
- _Brain Buffet_: Startup story, LLM usage, reliability metrics, plus accelerator/pitch deck highlights.

### Blog/Updates

- Markdown-based or CMS-based posts about new experiments, dev logs, or personal reflections.

### Music & Art Integration

- SoundCloud embeds for original music.
- Image gallery for Midjourney creations or design sketches.

### Calls to Action

Clear prompts throughout to capture interest from employers, collaborators, and potential clients.

## Tech Stack

- **Front-End Framework**: Next.js (recommendation; adaptable to others)
- **3D / Interactive**: Three.js or React Three Fiber
- **Styling**:
  - Tailwind CSS for utility classes, custom themes.
  - CSS variables for dynamic mode switching.
- **Content**:
  - Markdown/MDX files or headless CMS like Contentful/Sanity.
- **Deployment**: Vercel, Netlify, or preferred hosting.

## Project Structure

````plaintext
your-portfolio/
├─ public/
│   ├─ 3d-models/            # GLB/OBJ files for 3D
│   ├─ images/               # Static images (logos, backgrounds)
│   └─ favicon.ico
├─ src/
│   ├─ components/
│   │   ├─ layout/           # Header, Footer, Layout wrappers
│   │   ├─ ui/               # Common UI elements (Button, Card, etc.)
│   │   └─ interactive/      # 3D/advanced animations
│   ├─ pages/                # Next.js pages
│   ├─ modules/              # Theme toggling, hooks, helpers
│   ├─ styles/               # Global & theme-specific CSS/SCSS
│   └─ data/                 # Markdown or JSON content
├─ tests/                    # E2E/unit/integration tests
├─ scripts/                  # Deployment/build scripts
├─ .env.example              # Example env vars
├─ package.json
├─ README.md
└─ next.config.js


# Mode Switching

Each "mode" (Base, Cameroonian, Rice, Futuristic, etc.) is defined by CSS variables or theme files. For example:

- base-theme.module.css for purples/pinks
- cameroonian-theme.module.css for earthy reds/greens/golds
- rice-theme.module.css for navy/white
- futuristic-theme.module.css for neon/dark

## Implementation

1. Use a global context or store (e.g., ThemeContext) to track the active mode
2. Load the corresponding CSS module or apply a class on the body element
3. Toggle via a Mode Switcher in the Header:

```jsx
<select value={theme} onChange={(e) => setTheme(e.target.value)}>
 <option value="base">Base Mode</option>
 <option value="cameroonian">Cameroonian</option>
 <option value="rice">Rice</option>
 <option value="futuristic">Futuristic</option>
</select>
````
