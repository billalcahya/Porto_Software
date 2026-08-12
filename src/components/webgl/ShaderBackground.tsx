"use client";

import React, { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uResolution;
  varying vec2 vUv;

  // Simplex 2D noise
  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
            -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
    + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
      dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 st = gl_FragCoord.xy / uResolution.xy;
    st.x *= uResolution.x / uResolution.y;

    vec2 mouse = uMouse;
    float dist = distance(st, mouse);

    float n = snoise(st * 1.8 + vec2(uTime * 0.15));
    float mouseWave = sin(dist * 12.0 - uTime * 2.0) * exp(-dist * 3.0) * 0.25;

    float fluid = snoise(st * 2.5 + vec2(n * 0.5 + mouseWave, uTime * 0.1));

    // Bright White Digital Atelier Palette
    vec3 bgWhite = vec3(0.99, 0.99, 0.98); // White / off-white
    vec3 accentBlue = vec3(0.14, 0.38, 0.92); // Soft Electric Blue
    vec3 accentCyan = vec3(0.02, 0.71, 0.83); // Subtle Cyan Glow
    vec3 accentViolet = vec3(0.48, 0.22, 0.92); // Subtle Violet

    vec3 col = bgWhite;
    col = mix(col, accentBlue, smoothstep(0.3, 0.8, fluid) * 0.08);
    col = mix(col, accentCyan, smoothstep(0.2, 0.7, n + mouseWave) * 0.06);
    col = mix(col, accentViolet, smoothstep(0.4, 0.9, dist) * 0.04);

    gl_FragColor = vec4(col, 1.0);
  }
`;

function FluidMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const targetMouse = useRef(new THREE.Vector2(0.5, 0.5));
  const currentMouse = useRef(new THREE.Vector2(0.5, 0.5));

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uResolution: {
        value: new THREE.Vector2(
          typeof window !== "undefined" ? window.innerWidth : 1920,
          typeof window !== "undefined" ? window.innerHeight : 1080
        ),
      },
    }),
    []
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetMouse.current.set(e.clientX / window.innerWidth, 1.0 - e.clientY / window.innerHeight);
    };

    const handleResize = () => {
      uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, [uniforms]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    uniforms.uTime.value += delta;
    currentMouse.current.lerp(targetMouse.current, 0.05);
    uniforms.uMouse.value.copy(currentMouse.current);
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}

export function ShaderBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="absolute inset-0 bg-[#FAFAFA]" />;

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-80">
      <Canvas
        camera={{ position: [0, 0, 1] }}
        dpr={[1, 2]}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      >
        <FluidMesh />
      </Canvas>
    </div>
  );
}
