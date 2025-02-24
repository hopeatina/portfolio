import * as THREE from 'three';
import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js';
import fs from 'fs';
import path from 'path';

interface GLTFResult {
  animations: [];
  scene: THREE.Scene;
  scenes: THREE.Scene[];
  cameras: THREE.Camera[];
  asset: {
    generator: string;
    version: string;
  };
}

export function createDefaultConnector() {
  // Create a scene
  const scene = new THREE.Scene();

  // Create a simple cross shape using boxes
  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.2,
    roughness: 0.5,
  });

  // Center box
  const centerBox = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.5, 0.5),
    material
  );
  scene.add(centerBox);

  // X-axis box
  const xBox = new THREE.Mesh(
    new THREE.BoxGeometry(1.5, 0.25, 0.25),
    material
  );
  scene.add(xBox);

  // Y-axis box
  const yBox = new THREE.Mesh(
    new THREE.BoxGeometry(0.25, 1.5, 0.25),
    material
  );
  scene.add(yBox);

  // Z-axis box
  const zBox = new THREE.Mesh(
    new THREE.BoxGeometry(0.25, 0.25, 1.5),
    material
  );
  scene.add(zBox);

  // Export the scene
  const exporter = new GLTFExporter();
  exporter.parse(
    scene,
    (gltf: GLTFResult) => {
      const output = JSON.stringify(gltf);
      const outputPath = path.join(process.cwd(), 'public/models/connector.glb');
      fs.writeFileSync(outputPath, Buffer.from(output));
    },
    { binary: true }
  );
} 