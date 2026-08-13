"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function TorusKnotShape() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.4;
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[1.2, 0.35, 100, 16]} />
      <meshStandardMaterial
        color="#3b82f6"
        emissive="#06b6d4"
        emissiveIntensity={0.6}
        roughness={0.15}
        metalness={0.8}
        wireframe={true}
      />
    </mesh>
  );
}

export function EnergyCore3DCanvas() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 pointer-events-none opacity-30 flex items-center justify-center">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={1.5} color="#ec4899" />
        <pointLight position={[-5, -5, -5]} intensity={1.5} color="#06b6d4" />
        <TorusKnotShape />
      </Canvas>
    </div>
  );
}
