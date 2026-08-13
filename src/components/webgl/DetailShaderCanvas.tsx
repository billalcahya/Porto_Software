"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// High-Performance Domain-Warped Liquid Silk Shader Plane
const DetailShaderPlane = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
    }),
    []
  );

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      if (material.uniforms) {
        material.uniforms.uTime.value = state.clock.getElapsedTime();
      }
    }
  });

  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float uTime;
    varying vec2 vUv;

    void main() {
      vec2 uv = vUv;
      float t = uTime * 0.25;

      // GPU Domain warping for liquid silk motion
      vec2 p = uv * 3.0;
      p.x += sin(p.y * 2.2 + t) * 0.35;
      p.y += cos(p.x * 2.2 + t * 0.7) * 0.35;

      float wave1 = sin(p.x + p.y + t) * 0.5 + 0.5;
      float wave2 = cos(p.x * 1.6 - t * 0.6) * 0.5 + 0.5;
      float combined = mix(wave1, wave2, 0.5);

      // Bright Cinematic Atelier Palette: Off-white base, soft electric cyan, sky blue, vibrant lime
      vec3 colorBase = vec3(0.97, 0.97, 0.96); // #F7F7F5
      vec3 colorCyan = vec3(0.68, 0.88, 0.98); // Soft Electric Cyan
      vec3 colorLime = vec3(0.84, 0.95, 0.72); // Soft Vibrant Lime
      vec3 colorBlue = vec3(0.76, 0.85, 1.00); // Soft Blue

      vec3 col = mix(colorBase, colorCyan, combined * 0.55);
      col = mix(col, colorLime, (sin(uv.y * 3.5 + t) * 0.5 + 0.5) * 0.35);
      col = mix(col, colorBlue, (cos(uv.x * 3.5 - t * 0.5) * 0.5 + 0.5) * 0.35);

      gl_FragColor = vec4(col, 0.85);
    }
  `;

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
};

export function DetailShaderCanvas() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-90">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 1] }}
        gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
      >
        <DetailShaderPlane />
      </Canvas>
    </div>
  );
}
