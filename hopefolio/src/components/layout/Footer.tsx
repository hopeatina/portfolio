import React from "react";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <p>Hope Atina · AI Infrastructure Engineer</p>
        <p>Houston, TX</p>
        <p>
          <a href="https://github.com/hopeatina" target="_blank" rel="noreferrer">
            GitHub
          </a>{" "}
          ·{" "}
          <a href="https://github.com/useorgx" target="_blank" rel="noreferrer">
            OrgX
          </a>{" "}
          ·{" "}
          <a href="https://linkedin.com/in/hopeatina" target="_blank" rel="noreferrer">
            LinkedIn
          </a>{" "}
          ·{" "}
          <a href="https://x.com/emerginghope_" target="_blank" rel="noreferrer">
            X
          </a>{" "}
          ·{" "}
          <a href="https://medium.com/@hopeatina" target="_blank" rel="noreferrer">
            Medium
          </a>{" "}
          · <a href="mailto:hopeatina@gmail.com">Email</a>
        </p>
        <p>
          © {new Date().getFullYear()} ·{" "}
          <a
            href="https://github.com/hopeatina/portfolio"
            target="_blank"
            rel="noreferrer"
            style={{ color: "inherit", opacity: 0.6 }}
          >
            View source
          </a>
        </p>
      </div>
    </footer>
  );
}
