import React from "react";
import { useTheme } from "@/modules/mode-switch/ThemeContext";

export const DesignSystemShowcase = () => {
  const { theme } = useTheme();

  return (
    <div className="container py-20">
      <h1 className="mb-12">Design System Showcase</h1>

      {/* Colors */}
      <section className="mb-16">
        <h2 className="mb-8">Colors</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <ColorSwatch name="Primary" varName="--color-primary" />
          <ColorSwatch name="Primary Light" varName="--color-primary-light" />
          <ColorSwatch name="Primary Dark" varName="--color-primary-dark" />
          <ColorSwatch name="Secondary" varName="--color-secondary" />
          <ColorSwatch name="Accent" varName="--color-accent" />
          <ColorSwatch name="Background" varName="--color-background" />
          <ColorSwatch name="Surface" varName="--color-surface" />
          <ColorSwatch name="Text" varName="--color-text" />
        </div>
      </section>

      {/* Typography */}
      <section className="mb-16">
        <h2 className="mb-8">Typography</h2>
        <div className="space-y-4">
          <div>
            <p className="text-muted mb-2">Heading 1</p>
            <h1 className="gradient-text">The quick brown fox</h1>
          </div>
          <div>
            <p className="text-muted mb-2">Heading 2</p>
            <h2>The quick brown fox jumps</h2>
          </div>
          <div>
            <p className="text-muted mb-2">Heading 3</p>
            <h3>The quick brown fox jumps over</h3>
          </div>
          <div>
            <p className="text-muted mb-2">Body Text</p>
            <p>
              The quick brown fox jumps over the lazy dog. This is a sample
              paragraph to demonstrate our body text styling with proper line
              height and spacing.
            </p>
          </div>
          <div>
            <p className="text-muted mb-2">Small Text</p>
            <p className="text-sm">
              This is small text for captions and supporting information.
            </p>
          </div>
        </div>
      </section>

      {/* Buttons */}
      <section className="mb-16">
        <h2 className="mb-8">Buttons</h2>
        <div className="flex flex-wrap gap-4">
          <button className="btn btn-primary">Primary Button</button>
          <button className="btn btn-secondary">Secondary Button</button>
          <button className="btn btn-ghost">Ghost Button</button>
          <button className="btn btn-primary" disabled>
            Disabled
          </button>
        </div>
        <div className="flex flex-wrap gap-4 mt-4">
          <button className="btn btn-primary btn-sm">Small</button>
          <button className="btn btn-primary">Default</button>
          <button className="btn btn-primary btn-lg">Large</button>
        </div>
      </section>

      {/* Cards */}
      <section className="mb-16">
        <h2 className="mb-8">Cards</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="card">
            <h3 className="mb-4">Card Title</h3>
            <p className="text-muted mb-4">
              This is a card component with our design system styling applied.
            </p>
            <button className="btn btn-primary btn-sm">Action</button>
          </div>
          <div className="card glass">
            <h3 className="mb-4">Glass Card</h3>
            <p className="text-muted mb-4">
              This card uses glassmorphism effect for a modern look.
            </p>
            <button className="btn btn-secondary btn-sm">Action</button>
          </div>
          <div className="card elevation-lg">
            <h3 className="mb-4">Elevated Card</h3>
            <p className="text-muted mb-4">
              This card has a larger shadow for more emphasis.
            </p>
            <button className="btn btn-ghost btn-sm">Action</button>
          </div>
        </div>
      </section>

      {/* Forms */}
      <section className="mb-16">
        <h2 className="mb-8">Form Elements</h2>
        <div className="max-w-md space-y-4">
          <div>
            <label className="form-label" htmlFor="input">
              Input Field
            </label>
            <input
              type="text"
              id="input"
              className="form-input"
              placeholder="Enter text..."
            />
          </div>
          <div>
            <label className="form-label" htmlFor="select">
              Select Field
            </label>
            <select id="select" className="form-select">
              <option>Option 1</option>
              <option>Option 2</option>
              <option>Option 3</option>
            </select>
          </div>
          <div>
            <label className="form-label" htmlFor="textarea">
              Textarea
            </label>
            <textarea
              id="textarea"
              className="form-textarea"
              rows={4}
              placeholder="Enter longer text..."
            />
          </div>
        </div>
      </section>

      {/* Tags */}
      <section className="mb-16">
        <h2 className="mb-8">Tags</h2>
        <div className="flex flex-wrap gap-2">
          <span className="tag">Default Tag</span>
          <span className="tag text-primary">Primary Tag</span>
          <span className="tag bg-primary text-white">Filled Tag</span>
          <span className="tag border-secondary text-secondary">
            Secondary Tag
          </span>
        </div>
      </section>

      {/* Spacing */}
      <section className="mb-16">
        <h2 className="mb-8">Spacing Scale</h2>
        <div className="space-y-2">
          {[1, 2, 3, 4, 6, 8, 12, 16, 20, 24].map((size) => (
            <div key={size} className="flex items-center gap-4">
              <span className="text-muted text-sm w-20">spacing-{size}</span>
              <div
                className="bg-primary opacity-50"
                style={{
                  width: `var(--spacing-${size})`,
                  height: "var(--spacing-4)",
                }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Animations */}
      <section className="mb-16">
        <h2 className="mb-8">Animations</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="card text-center animate-fade-in">
            <p>Fade In</p>
          </div>
          <div className="card text-center animate-fade-up delay-100">
            <p>Fade Up</p>
          </div>
          <div className="card text-center animate-slide-in delay-200">
            <p>Slide In</p>
          </div>
          <div className="card text-center animate-float delay-300">
            <p>Float</p>
          </div>
        </div>
      </section>
    </div>
  );
};

const ColorSwatch = ({ name, varName }: { name: string; varName: string }) => {
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = () => {
    const color = getComputedStyle(document.documentElement).getPropertyValue(
      varName
    );
    navigator.clipboard.writeText(color.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="cursor-pointer group" onClick={copyToClipboard}>
      <div
        className="h-24 rounded-lg mb-2 transition-transform group-hover:scale-105"
        style={{ backgroundColor: `var(${varName})` }}
      />
      <p className="font-medium text-sm">{name}</p>
      <p className="text-xs text-muted font-mono">{varName}</p>
      {copied && <p className="text-xs text-success mt-1">Copied!</p>}
    </div>
  );
};
