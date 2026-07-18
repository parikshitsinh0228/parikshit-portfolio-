"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function FloatingShape({ position, args, shape, color }: { position: [number, number, number]; args: any; shape: "cube" | "octahedron" | "dodecahedron"; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Random speeds
  const speeds = useMemo(() => ({
    rotX: Math.random() * 0.015 - 0.0075,
    rotY: Math.random() * 0.015 - 0.0075,
    floatSpeed: Math.random() * 0.001 + 0.0005,
    floatRange: Math.random() * 0.15 + 0.08,
  }), []);

  const initialY = position[1];

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      // Rotation
      meshRef.current.rotation.x += speeds.rotX;
      meshRef.current.rotation.y += speeds.rotY;
      
      // Floating translation
      meshRef.current.position.y = initialY + Math.sin(time * speeds.floatSpeed * 10) * speeds.floatRange;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      {shape === "cube" && <boxGeometry args={args} />}
      {shape === "octahedron" && <octahedronGeometry args={args} />}
      {shape === "dodecahedron" && <dodecahedronGeometry args={args} />}
      <meshPhysicalMaterial
        color={color}
        wireframe
        emissive={color}
        emissiveIntensity={0.8}
        transparent
        opacity={0.3}
        roughness={0.1}
        metalness={0.8}
      />
    </mesh>
  );
}

export default function CodeCubes() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 w-full h-full -z-4 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#8b5cf6" />
        <pointLight position={[-10, -10, -10]} intensity={1.5} color="#06b6d4" />
        
        {/* Floating Shapes positioned far on the left and right margins */}
        <FloatingShape
          position={[-3.2, 1.8, 0]}
          shape="octahedron"
          args={[0.65, 0]}
          color="#06b6d4"
        />
        <FloatingShape
          position={[3.5, -1.5, 0]}
          shape="cube"
          args={[0.6, 0.6, 0.6]}
          color="#8b5cf6"
        />
        <FloatingShape
          position={[-2.8, -2.2, 0]}
          shape="dodecahedron"
          args={[0.55, 0]}
          color="#d946ef"
        />
        <FloatingShape
          position={[3.0, 2.0, 0]}
          shape="octahedron"
          args={[0.5, 0]}
          color="#06b6d4"
        />
      </Canvas>
    </div>
  );
}
