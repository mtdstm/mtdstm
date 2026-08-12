"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Icosahedron, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

/** Wireframe core that slowly tumbles — the hero's centerpiece. */
function Core() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.12;
    meshRef.current.rotation.y += delta * 0.18;
  });
  return (
    <Icosahedron ref={meshRef} args={[1.6, 1]}>
      <meshBasicMaterial color="#00f6ff" wireframe />
    </Icosahedron>
  );
}

// Generated once at module load (not during render) so it stays a
// stable, pure reference across every re-render of <Field>.
const STAR_POSITIONS = Float32Array.from({ length: 900 }, () => (Math.random() - 0.5) * 12);

/** Sparse starfield of points drifting behind the core for depth. */
function Field() {
  const ref = useRef<THREE.Points>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.02;
  });
  return (
    <Points ref={ref} positions={STAR_POSITIONS} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color="#ff2ee6"
        size={0.02}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  );
}

/**
 * Hero background scene. Kept deliberately cheap: one wireframe
 * icosahedron + a point field, no postprocessing, so it stays smooth
 * even on modest laptops. Swap Core's geometry for a real logomark
 * mesh if the studio has one.
 */
export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      className="!absolute inset-0"
    >
      <ambientLight intensity={0.6} />
      <Core />
      <Field />
    </Canvas>
  );
}
