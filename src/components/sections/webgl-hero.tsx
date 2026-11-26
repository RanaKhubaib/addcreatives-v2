"use client";

import { Component, type ReactNode, useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const FRAG = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uRes;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  void main() {
    vec2 uv = vUv;
    uv.x *= uRes.x / uRes.y;

    float t = uTime * 0.12;
    float n = noise(uv * 1.6 + vec2(t, -t * 0.6));
    float n2 = noise(uv * 3.2 - vec2(t * 0.7, t * 0.4));
    float m = smoothstep(0.25, 0.85, n * 0.65 + n2 * 0.45);

    vec3 ink = vec3(0.039, 0.059, 0.110);
    vec3 navy = vec3(0.086, 0.243, 0.451);
    vec3 royal = vec3(0.043, 0.302, 0.635);
    vec3 peri = vec3(0.357, 0.498, 0.753);

    vec3 col = mix(ink, navy, smoothstep(0.0, 0.9, uv.y + n * 0.25));
    col = mix(col, royal, m * 0.75);
    col = mix(col, peri, smoothstep(0.55, 1.0, n2) * 0.45);

    // Cursor glow.
    vec2 mouse = uMouse;
    mouse.x *= uRes.x / uRes.y;
    float d = distance(uv, mouse);
    col += peri * smoothstep(0.55, 0.0, d) * 0.35;

    // Faint diagonal stripes, echoing the brand motif.
    float stripe = smoothstep(0.48, 0.5, fract((uv.x + uv.y) * 6.0 + t * 0.4));
    col += vec3(1.0) * stripe * 0.02;

    gl_FragColor = vec4(col, 1.0);
  }
`;

function GradientPlane() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const mouse = useRef(new THREE.Vector2(0.5, 0.5));
  const targetMouse = useRef(new THREE.Vector2(0.5, 0.5));

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uRes: { value: new THREE.Vector2(1, 1) },
    }),
    [],
  );

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      targetMouse.current.set(
        e.clientX / window.innerWidth,
        1 - e.clientY / window.innerHeight,
      );
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  useEffect(() => {
    const onResize = () => {
      uniforms.uRes.value.set(window.innerWidth, window.innerHeight);
    };
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [uniforms]);

  useFrame((_, delta) => {
    const mat = materialRef.current;
    if (!mat) return;
    mat.uniforms.uTime.value += Math.min(delta, 0.05);
    mouse.current.lerp(targetMouse.current, 0.06);
    mat.uniforms.uMouse.value.copy(mouse.current);
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={VERT}
        fragmentShader={FRAG}
        uniforms={uniforms}
        depthWrite={false}
      />
    </mesh>
  );
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

interface ErrorBoundaryState {
  failed: boolean;
}

/** If WebGL fails to initialise, fall back to the static CSS gradient. */
class WebGLErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { failed: true };
  }

  render() {
    if (this.state.failed) return this.props.fallback;
    return this.props.children;
  }
}

function WebGLFallback() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 bg-[linear-gradient(135deg,#0a0f1c_0%,#163e73_45%,#0b4da2_75%,#5b7fc0_100%)]"
    >
      <div className="absolute inset-0 bg-[repeating-linear-gradient(-45deg,rgba(255,255,255,0.05)_0_2px,transparent_2px_26px)]" />
    </div>
  );
}

export default function WebGLHero() {
  if (typeof window !== 'undefined' && !window.WebGLRenderingContext) {
    return <WebGLFallback />;
  }

  return (
    <div className="absolute inset-0">
      <WebGLFallback />
      <WebGLErrorBoundary fallback={null}>
        <Canvas
          dpr={[1, 1.75]}
          gl={{ antialias: false, powerPreference: 'high-performance' }}
          camera={{ position: [0, 0, 1], fov: 45 }}
          className="!absolute !inset-0"
          onCreated={({ gl }) => {
            const canvas = gl.domElement;
            canvas.style.position = 'absolute';
            canvas.style.inset = '0';
          }}
        >
          <GradientPlane />
        </Canvas>
      </WebGLErrorBoundary>
    </div>
  );
}
