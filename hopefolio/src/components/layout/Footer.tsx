"use client";

import React, { createElement } from "react";
import Link from "next/link";
import { isThemeDark, useTheme } from "@/modules/mode-switch/ThemeContext";
import { FiArrowUp, FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi";
import { FaMedium } from "react-icons/fa";

interface SocialLink {
  platform: string;
  url: string;
  icon: React.ComponentType<{ size: number }>;
}

const socialLinks: SocialLink[] = [
  {
    platform: "GitHub",
    url: "https://github.com/hopeatina",
    icon: FiGithub,
  },
  {
    platform: "LinkedIn",
    url: "https://linkedin.com/in/hopeatina",
    icon: FiLinkedin,
  },
  {
    platform: "X",
    url: "https://x.com/emerginghope_",
    icon: FiTwitter,
  },
  {
    platform: "Medium",
    url: "https://medium.com/@hopeatina",
    icon: FaMedium,
  },
];

const footerLinks = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  const { theme } = useTheme();
  const darkTheme = isThemeDark(theme);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="border-t"
      style={{
        background: darkTheme
          ? "linear-gradient(180deg, rgba(var(--color-surface-rgb), 0.92) 0%, rgba(var(--background-rgb), 1) 100%)"
          : "linear-gradient(180deg, rgba(var(--color-surface-rgb), 0.62) 0%, rgba(var(--background-rgb), 1) 100%)",
        borderColor: "var(--border)",
      }}
    >
      <div className="mx-auto max-w-[1180px] px-4 py-12 md:px-6 md:py-14">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.2fr)_0.7fr_0.85fr] md:gap-12">
          <div className="max-w-md">
            <div className="text-[11px] font-medium uppercase tracking-[0.22em] text-body-secondary">
              Agent infrastructure
            </div>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-heading md:text-[2rem]">
              Hope Atina
            </h2>
            <p className="mt-4 text-sm leading-7 text-body-secondary md:text-[15px]">
              Building orchestration layers, MCP workflows, developer tooling,
              and production AI systems with interfaces designed for review.
            </p>
          </div>

          <div>
            <div className="text-[11px] font-medium uppercase tracking-[0.22em] text-body-secondary">
              Navigate
            </div>
            <ul className="mt-4 space-y-3">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-2 text-sm font-medium text-heading transition-opacity duration-200 hover:opacity-72 no-underline"
                  >
                    <span>{link.label}</span>
                    <span aria-hidden="true" className="text-body-secondary">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-[11px] font-medium uppercase tracking-[0.22em] text-body-secondary">
              Elsewhere
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${link.platform} profile`}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border transition-transform duration-200 hover:-translate-y-0.5"
                  style={{
                    background: darkTheme
                      ? "rgba(255, 255, 255, 0.03)"
                      : "rgba(var(--color-primary-rgb), 0.04)",
                    borderColor: "var(--border)",
                    color: "var(--text)",
                    boxShadow: darkTheme ? "var(--box-shadow-card)" : "none",
                  }}
                >
                  {createElement(link.icon, { size: 18 })}
                </a>
              ))}
            </div>
            <p className="mt-4 max-w-xs text-sm leading-6 text-body-secondary">
              The strongest read is still the work itself. Start with OrgX, then
              the supporting tooling and production systems.
            </p>
          </div>
        </div>

        <div
          className="mt-10 flex flex-col gap-4 border-t pt-5 text-sm text-body-secondary md:flex-row md:items-center md:justify-between"
          style={{ borderColor: "var(--border)" }}
        >
          <p className="mb-0">
            © {new Date().getFullYear()} Hope Atina. Built with an agent-first
            review bar.
          </p>

          <button
            onClick={scrollToTop}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border transition-transform duration-200 hover:-translate-y-0.5"
            style={{
              borderColor: "var(--border)",
              background: darkTheme
                ? "rgba(255, 255, 255, 0.03)"
                : "rgba(var(--color-primary-rgb), 0.04)",
              color: "var(--text)",
            }}
            aria-label="Back to top"
          >
            <FiArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
