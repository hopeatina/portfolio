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

  return (
    <header className={`site-header ${isScrolled ? "site-header-scrolled" : ""}`}>
      <nav className="site-header-inner" aria-label="Primary">
        <Link href="/" className="site-logo">
          Hope Atina
        </Link>

        <button
          type="button"
          onClick={() => setIsMobileMenuOpen((current) => !current)}
          className="site-menu-toggle"
          aria-expanded={isMobileMenuOpen}
          aria-controls="site-mobile-nav"
          aria-label="Toggle navigation"
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

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`site-nav-link ${isActive ? "site-nav-link-active" : ""}`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>

      {isMobileMenuOpen ? (
        <div id="site-mobile-nav" className="site-nav-mobile site-nav-mobile-open">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="site-nav-mobile-link"
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
