"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/cannon";
import SingleCube from "./SingleCube";

const ThreeScene = () => (
  <Suspense fallback={null}>
    <ambientLight intensity={0.3} />
    <directionalLight position={[10, 10, 5]} intensity={0.8} castShadow />
    <Physics
      gravity={[0, -0.01, 0]}
      defaultContactMaterial={{ restitution: 0.7 }}
    >
      <SingleCube position={[-1.5, 1, 0]} color="#00ff88" edgeColor="#00ff88" />
      <SingleCube position={[0, 2, -1]} color="#00ee55" edgeColor="#00ee55" />
      <SingleCube position={[1.5, 3, 1]} color="#00dd88" edgeColor="#00dd88" />
    </Physics>
  </Suspense>
);

export default function Scene() {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 2, 5], fov: 60 }}
      style={{ background: "transparent" }}
    >
      <ThreeScene />
    </Canvas>
  );
}
