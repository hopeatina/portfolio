import React from "react";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-motif" aria-hidden="true">
        <svg viewBox="0 0 800 300" preserveAspectRatio="none">
          <path d="M-30 70C122 70 160 246 314 246S514 70 670 70H842" />
          <path d="M-30 246C122 246 160 70 314 70S514 246 670 246H842" />
          <path d="M670 70V246" />
        </svg>
      </div>
      <div className="site-footer-inner">
        <div className="site-footer-thesis">
          <span>Hope Atina</span>
          <p>Engineer, founder, and product thinker making ambitious systems coherent.</p>
        </div>
        <div className="site-footer-links" aria-label="External links">
          <a href="https://github.com/hopeatina" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://github.com/useorgx" target="_blank" rel="noreferrer">OrgX</a>
          <a href="https://linkedin.com/in/hopeatina" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="https://x.com/emerginghope_" target="_blank" rel="noreferrer">X</a>
          <a href="mailto:hopeatina@gmail.com">Email</a>
        </div>
        <p className="site-footer-meta">
          Houston · Cameroon / Estonia · © {new Date().getFullYear()} ·{" "}
          <a
            href="https://github.com/hopeatina/portfolio"
            target="_blank"
            rel="noreferrer"
          >
            source
          </a>
        </p>
      </div>
    </footer>
  );
}
