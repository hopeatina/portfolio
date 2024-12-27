"use client";

import React from "react";
import { useTheme } from "@/modules/mode-switch/ThemeContext";
import dynamic from "next/dynamic";

const Hero3D = dynamic(() => import("./Hero3D").then((mod) => mod.default), {
  ssr: false,
  loading: () => (
    <div
      className="relative w-full h-screen"
      style={{
        background:
          "linear-gradient(120deg, #001b0a 10%, #0c351e 40%, #102d1b 90%)",
      }}
    />
  ),
});

const Hero: React.FC = () => {
  const { getThemeStyles } = useTheme();
  const themeStyles = getThemeStyles();

  return (
    <div className="relative w-full h-screen">
      <Hero3D />
    </div>
  );
};

export default Hero;
