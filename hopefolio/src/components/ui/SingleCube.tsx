"use client";

import React, { useRef } from "react";
import { useFrame, ThreeEvent } from "@react-three/fiber";
import { useBox } from "@react-three/cannon";
import * as THREE from "three";
import type { Group } from "three";

interface SingleCubeProps {
  position?: [number, number, number];
  color?: string;
  hoverColor?: string;
  edgeColor?: string;
  [key: string]: any;
}

export default function SingleCube({
  position,
  color = "#00ff88",
  hoverColor = "#ffffff",
  edgeColor = "#00ff88",
  ...props
}: SingleCubeProps) {
  const [ref] = useBox(() => ({
    mass: 1,
    position: position || [0, 0, 0],
    restitution: 0.8,
    friction: 0.2,
    ...props,
  }));

  const mainMaterialRef = useRef<THREE.MeshStandardMaterial>(null!);
  const groupRef = useRef<Group>(null!);

  const onPointerOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    if (mainMaterialRef.current) {
      mainMaterialRef.current.color.set(hoverColor);
    }
  };

  const onPointerOut = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    if (mainMaterialRef.current) {
      mainMaterialRef.current.color.set(color);
    }
  };

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.x += 0.0005;
      groupRef.current.rotation.y += 0.0005;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh
        castShadow
        onPointerOver={onPointerOver}
        onPointerOut={onPointerOut}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          ref={mainMaterialRef}
          opacity={1}
          color={color}
          metalness={1}
          roughness={1}
        />
      </mesh>
      <mesh>
        <edgesGeometry args={[new THREE.BoxGeometry(1, 1, 1)]} />
        <lineBasicMaterial color={edgeColor} linewidth={10} />
      </mesh>
    </group>
  );
}
