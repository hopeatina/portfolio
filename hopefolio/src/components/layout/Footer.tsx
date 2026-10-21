import React from "react";
import Logo from "@/components/ui/Logo";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-thesis">
          <Logo className="site-footer-seal" size={44} title="Hope Atina's seal" />
          <span>Hope Atina</span>
          <p>Engineer and founder. Houston, by way of Cameroon.</p>
        </div>
        <div className="site-footer-links" aria-label="External links">
          <a href="https://github.com/hopeatina" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://github.com/useorgx" target="_blank" rel="noreferrer">OrgX</a>
          <a href="https://linkedin.com/in/hopeatina" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="https://x.com/emerginghope_" target="_blank" rel="noreferrer">X</a>
          <a href="mailto:hopeatina@gmail.com">Email</a>
        </div>
        <p className="site-footer-meta">
          Set in Newsreader and Recursive · © {new Date().getFullYear()} ·{" "}
          <a href="https://github.com/hopeatina/portfolio" target="_blank" rel="noreferrer">source</a>
        </p>
      </div>
    </footer>
  );
}
