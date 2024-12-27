"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/cannon";
import SingleCube from "./SingleCube";

const HeroScene: React.FC = () => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Canvas
        shadows
        camera={{ position: [0.2, 0, 1], fov: 75 }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow />
          <directionalLight position={[-5, 3, -5]} intensity={0.4} />
          <Physics
            gravity={[0, -0.05, 0]}
            defaultContactMaterial={{
              restitution: 0.7,
              friction: 0.1,
            }}
          >
            <SingleCube
              position={[-3, 2, 0]}
              color="#00ff88"
              edgeColor="#00ff88"
            />
            {/* <SingleCube
              position={[0, 0, 1]}
              color="#00ee55"
              edgeColor="#00ee55"
            />
            <SingleCube
              position={[3, 1, -1]}
              color="#00dd88"
              edgeColor="#00dd88"
            /> */}
          </Physics>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default HeroScene;
