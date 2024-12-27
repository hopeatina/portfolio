"use client";

import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useTheme } from "@/modules/mode-switch/ThemeContext";

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
  const style = useTheme();
  const headingFont =
    style?.themeProps.typography.headingFont || "'Orbitron', sans-serif";
  const bodyFont =
    style?.themeProps.typography.bodyFont || "'Titillium Web', sans-serif";

  return (
    <div className="relative w-full h-screen">
      <div className="absolute inset-0">
        <ConnectorScene />
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
        <div className="backdrop-blur-sm bg-black/5 p-8 rounded-2xl">
          <h1
            className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-lg"
            style={{
              fontFamily: headingFont,
              textShadow: "0 4px 12px rgba(0, 0, 0, 0.5)",
            }}
          >
            Building, Creating,
            <br />& Rethinking Possibility
          </h1>
          <p
            className="text-xl md:text-2xl mb-8 text-white/90"
            style={{
              fontFamily: bodyFont,
              textShadow: "0 2px 8px rgba(0, 0, 0, 0.4)",
            }}
          >
            Engineering Leader, Artist, Futurist
          </p>
          <Link
            href="/projects"
            style={{
              display: "inline-block",
              background: style?.themeProps.colors.primary || "#4060ff",
              color: "#fff",
              padding: "1rem 2rem",
              borderRadius: "9999px",
              fontWeight: style?.themeProps.typography.bodyWeight || 600,
              cursor: "pointer",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              fontFamily: style?.themeProps.typography.bodyFont || "inherit",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05) translateY(-2px)";
              e.currentTarget.style.boxShadow = `0 15px 25px ${
                style?.themeProps.colors.primary || "rgba(64,96,255,0.4)"
              }40`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            View My Work
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero3D;
