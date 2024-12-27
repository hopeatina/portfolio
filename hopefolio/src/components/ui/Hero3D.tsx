"use client";

import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

const ConnectorScene = dynamic(() => import("./ConnectorScene"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background: "#141622",
      }}
    />
  ),
});

const Hero3D: React.FC = () => {
  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        background: "#141622",
        overflow: "hidden",
      }}
    >
      <ConnectorScene />

      <div
        style={{
          position: "absolute",
          top: "30%",
          width: "100%",
          textAlign: "center",
          color: "#fff",
          zIndex: 10,
        }}
      >
        <h1
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "clamp(3rem, 6vw, 5rem)",
            textTransform: "uppercase",
            marginBottom: "1rem",
          }}
        >
          Building, Creating,
          <br />& Rethinking Possibility
        </h1>
        <p style={{ marginBottom: "2rem", fontSize: "1.2rem" }}>
          Engineer, Artist, Futurist
        </p>
        <Link
          href="/projects"
          style={{
            display: "inline-block",
            background: "#4060ff",
            color: "#fff",
            padding: "1rem 2rem",
            borderRadius: "9999px",
            fontWeight: 600,
            cursor: "pointer",
            textTransform: "uppercase",
            textDecoration: "none",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05) translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 15px 25px rgba(64,96,255,0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "none";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          View My Work
        </Link>
      </div>
    </section>
  );
};

export default Hero3D;
