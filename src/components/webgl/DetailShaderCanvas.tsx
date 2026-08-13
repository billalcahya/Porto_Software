"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// High-Performance Pure Light Theme Pastel Shader (Zero Black Bleed)
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
      float t = uTime * 0.18;

      // Independent smooth trigonometric waves
      float w1 = sin(uv.x * 3.5 + t) * 0.5 + 0.5;
      float w2 = cos(uv.y * 3.0 - t * 0.8) * 0.5 + 0.5;
      float w3 = sin((uv.x + uv.y) * 2.5 + t * 0.6) * 0.5 + 0.5;

      float factorCyan = w1 * 0.45;
      float factorLime = w2 * 0.38;
      float factorBlue = w3 * 0.32;

      // Rich Vibrant Light Theme Palette (Pure Off-White & Vivid Pastels)
      vec3 colBase = vec3(0.96, 0.97, 0.98); // #F5F7FA Base
      vec3 colCyan = vec3(0.55, 0.82, 0.98); // Vivid Electric Cyan
      vec3 colLime = vec3(0.72, 0.92, 0.55); // Vivid Soft Lime
      vec3 colBlue = vec3(0.68, 0.78, 0.98); // Vivid Sky Blue

      vec3 col = colBase;
      col = mix(col, colCyan, factorCyan);
      col = mix(col, colLime, factorLime);
      col = mix(col, colBlue, factorBlue);

      // Clamp color channels to guarantee minimum brightness >= 0.75 (Never dark)
      col = max(col, vec3(0.75));

      // Output fully opaque color to prevent WebGL black clear-color bleed
      gl_FragColor = vec4(col, 1.0);
    }
  `;

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={false}
        depthWrite={false}
      />
    </mesh>
  );
};

export function DetailShaderCanvas() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-75">
      <Canvas
        dpr={1}
        camera={{ position: [0, 0, 1] }}
        gl={{ alpha: false, antialias: false, powerPreference: "high-performance" }}
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
      >
        <DetailShaderPlane />
      </Canvas>
    </div>
  );
}
