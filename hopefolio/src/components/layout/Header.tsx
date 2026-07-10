import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { navItems } from "@/data/portfolio";

export default function Header() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 18);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [router.asPath]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMobileMenuOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isMobileMenuOpen]);

  return (
    <header className={`site-header ${isScrolled ? "site-header-scrolled" : ""}`}>
      <nav className="site-header-inner" aria-label="Primary">
        <Link href="/" className="site-logo" aria-label="Hope Atina — home">
          <span className="site-logo-monogram" aria-hidden="true">
            HA
          </span>
          <span className="site-logo-copy">
            <strong>Hope Atina</strong>
            <small>systems / product / AI</small>
          </span>
        </Link>

        <button
          type="button"
          onClick={() => setIsMobileMenuOpen((current) => !current)}
          className={`site-menu-toggle ${isMobileMenuOpen ? "site-menu-toggle-open" : ""}`}
          aria-expanded={isMobileMenuOpen}
          aria-controls="site-mobile-nav"
          aria-label={isMobileMenuOpen ? "Close navigation" : "Open navigation"}
        >
          <span />
          <span />
        </button>

        <div className="site-nav-desktop">
          {navItems.map((item) => {
            const isActive =
              item.href === "/projects"
                ? router.pathname.startsWith("/projects")
                : item.href === "/blog"
                  ? router.pathname.startsWith("/blog")
                  : router.pathname === item.href;
            const isHireCta = item.href === "/hiring";

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`site-nav-link ${isActive ? "site-nav-link-active" : ""} ${
                  isHireCta ? "site-nav-link-cta" : ""
                }`}
              >
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        <span className="site-header-availability" aria-label="Available for consequential work">
          <i aria-hidden="true" />
          available for consequential work
        </span>
      </nav>

      {isMobileMenuOpen ? (
        <div id="site-mobile-nav" className="site-nav-mobile site-nav-mobile-open">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`site-nav-mobile-link ${
                item.href === "/hiring" ? "site-nav-mobile-link-cta" : ""
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      ) : null}
    </header>
  );
}
