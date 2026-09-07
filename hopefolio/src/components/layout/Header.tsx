import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { navItems } from "@/data/portfolio";

export default function Header() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLElement>(null);
  const isCurrentPage = (href: string) =>
    router.pathname === href || (href !== "/" && router.pathname.startsWith(`${href}/`));

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
      if (event.key !== "Escape") return;
      setIsMobileMenuOpen(false);
      menuToggleRef.current?.focus();
    };
    const desktop = window.matchMedia("(min-width: 821px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setIsMobileMenuOpen(false);
    };

    document.body.style.overflow = "hidden";
    const activeLink = mobileNavRef.current?.querySelector<HTMLAnchorElement>('[aria-current="page"]');
    (activeLink ?? mobileNavRef.current?.querySelector<HTMLAnchorElement>("a"))?.focus();
    window.addEventListener("keydown", closeOnEscape);
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={`site-header ${isScrolled ? "site-header-scrolled" : ""}`}
      onBlur={(event) => {
        // Navigation is a disclosure: tabbing into the page dismisses it normally.
        if (isMobileMenuOpen && !event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setIsMobileMenuOpen(false);
        }
      }}
    >
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
          ref={menuToggleRef}
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
            const isActive = isCurrentPage(item.href);
            const isHireCta = item.href === "/hiring";

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
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
        <nav
          ref={mobileNavRef}
          id="site-mobile-nav"
          className="site-nav-mobile site-nav-mobile-open"
          aria-label="Mobile navigation"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isCurrentPage(item.href) ? "page" : undefined}
              className={`site-nav-mobile-link ${
                item.href === "/hiring" ? "site-nav-mobile-link-cta" : ""
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
