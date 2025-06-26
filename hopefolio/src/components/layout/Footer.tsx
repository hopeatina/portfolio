"use client";

import React, { createElement } from "react";
import Link from "next/link";
import { useTheme } from "@/modules/mode-switch/ThemeContext";
import { FiGithub, FiTwitter, FiLinkedin, FiArrowUp } from "react-icons/fi";
import { FaMedium } from "react-icons/fa";
import Button from "@/components/ui/Button";

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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-16 bg-surface border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand Section */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-heading">Hope Atina</h3>
            <p className="text-body text-body-secondary">
              Building innovative solutions at the intersection of technology
              and creativity.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-heading">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-link hover:text-link-hover transition-colors duration-200 inline-flex items-center group"
                  >
                    {link.label}
                    <span className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Section */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-heading">Connect</h3>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 hover:bg-primary hover:text-white transition-all duration-300 group"
                  aria-label={`${link.platform} Profile`}
                >
                  <span className="transition-transform duration-300 group-hover:scale-110">
                    {createElement(link.icon, { size: 20 })}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-body-secondary text-sm">
            © {new Date().getFullYear()} Hope Atina. All rights reserved.
          </p>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 hover:bg-primary hover:text-white transition-all duration-300 group"
            aria-label="Back to top"
          >
            <FiArrowUp className="transition-transform duration-300 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
