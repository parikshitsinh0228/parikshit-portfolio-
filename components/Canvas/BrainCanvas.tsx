"use client";

import { useEffect, useRef, useMemo, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Dynamic in-memory texture generation for glowing neural nodes
const createGlowTexture = (color1: string, color2: string) => {
  if (typeof window === "undefined") return null;
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
    gradient.addColorStop(0.25, color1); // Inner glow (e.g. Cyan/Blue)
    gradient.addColorStop(0.55, color2); // Outer glow (e.g. Purple)
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
  }
  const texture = new THREE.CanvasTexture(canvas);
  return texture;
};

// Brain particle nodes and connections component
function NeuralBrain() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const pulsesRef = useRef<THREE.Points>(null);

  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // 1. Generate procedural brain coordinates
  const { nodePositions, connections, connectionMap, nodeCount } = useMemo(() => {
    const tempPositions: number[] = [];
    const count = 420;

    for (let i = 0; i < count; i++) {
      // Divide into left & right hemisphere
      const side = i < count / 2 ? "left" : "right";
      
      // Longitudinal angle & azimuthal angle
      const theta = Math.random() * Math.PI; // 0 to PI
      const phi = (Math.random() * Math.PI) - (side === "left" ? Math.PI : 0); // divide halves

      // Procedural cortical folds calculation
      const folds =
        0.18 * Math.sin(phi * 6) * Math.sin(theta * 6) +
        0.08 * Math.cos(theta * 12) +
        0.04 * Math.sin(phi * 18);

      const baseRadius = 1.85;
      const radius = baseRadius + folds;

      // Ellipsoid conversion with vertical and horizontal scaling factors
      let x = radius * Math.sin(theta) * Math.cos(phi);
      let y = radius * Math.cos(theta) * 1.35; // elongated vertically
      let z = radius * Math.sin(theta) * Math.sin(phi) * 1.1; // depth factor

      // Create hemisphere separation (longitudinal fissure)
      if (side === "left") {
        x -= 0.08;
      } else {
        x += 0.08;
      }

      tempPositions.push(x, y, z);
    }

    // 2. Establish connections (synaptic pathways)
    const lineIndices: number[] = [];
    const connectionMap: Map<number, number[]> = new Map();

    for (let i = 0; i < count; i++) {
      const posI = new THREE.Vector3(
        tempPositions[i * 3],
        tempPositions[i * 3 + 1],
        tempPositions[i * 3 + 2]
      );
      
      const connects: number[] = [];

      for (let j = i + 1; j < count; j++) {
        const posJ = new THREE.Vector3(
          tempPositions[j * 3],
          tempPositions[j * 3 + 1],
          tempPositions[j * 3 + 2]
        );

        const dist = posI.distanceTo(posJ);
        
        // Connect nodes within distance threshold, but avoid connecting left & right across deep fissure
        const isCrossHemisphere = (i < count / 2 && j >= count / 2) || (i >= count / 2 && j < count / 2);
        const maxDist = isCrossHemisphere ? 0.35 : 0.65;

        if (dist > 0.05 && dist < maxDist) {
          lineIndices.push(i, j);
          connects.push(j);
        }
      }
      connectionMap.set(i, connects);
    }

    return {
      nodePositions: new Float32Array(tempPositions),
      connections: lineIndices,
      connectionMap,
      nodeCount: count,
    };
  }, []);

  // Set line geometry positions
  const linePositions = useMemo(() => {
    const pos = new Float32Array(connections.length * 3);
    for (let i = 0; i < connections.length; i++) {
      const idx = connections[i];
      pos[i * 3] = nodePositions[idx * 3];
      pos[i * 3 + 1] = nodePositions[idx * 3 + 1];
      pos[i * 3 + 2] = nodePositions[idx * 3 + 2];
    }
    return pos;
  }, [connections, nodePositions]);

  // Dynamic Synaptic Pulses (Active firing signals)
  const pulsesData = useMemo(() => {
    const pulseCount = 18;
    const items = [];
    for (let i = 0; i < pulseCount; i++) {
      const startNode = Math.floor(Math.random() * nodeCount);
      items.push({
        startNode,
        currentNode: startNode,
        nextNode: startNode,
        progress: Math.random(),
        speed: 0.015 + Math.random() * 0.015,
        x: nodePositions[startNode * 3],
        y: nodePositions[startNode * 3 + 1],
        z: nodePositions[startNode * 3 + 2],
      });
    }
    return items;
  }, [nodeCount, nodePositions]);

  // Mouse Listener
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Textures
  const nodeTexture = useMemo(() => createGlowTexture("rgba(6, 182, 212, 0.85)", "rgba(139, 92, 246, 0.45)"), []);
  const pulseTexture = useMemo(() => createGlowTexture("rgba(255, 255, 255, 1)", "rgba(6, 182, 212, 0.9)"), []);

  // Render Frame loop
  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // 1. Slow Auto-Rotation
    if (pointsRef.current) {
      pointsRef.current.rotation.y = time * 0.05;
      pointsRef.current.rotation.x = Math.sin(time * 0.02) * 0.05;
    }
    if (linesRef.current) {
      linesRef.current.rotation.y = time * 0.05;
      linesRef.current.rotation.x = Math.sin(time * 0.02) * 0.05;
    }
    if (pulsesRef.current) {
      pulsesRef.current.rotation.y = time * 0.05;
      pulsesRef.current.rotation.x = Math.sin(time * 0.02) * 0.05;
    }

    // 2. Mouse parallax
    mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.05;
    mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.05;

    camera.position.x = mouse.current.x * 0.8;
    camera.position.y = mouse.current.y * 0.8;
    camera.lookAt(0, 0, 0);

    // 3. Scroll scaling / translation
    if (typeof window !== "undefined") {
      const scrollY = window.scrollY;
      const targetZ = 5.5 + scrollY * 0.005;
      camera.position.z += (targetZ - camera.position.z) * 0.1;
      
      // Rotate faster slightly when scrolling
      if (pointsRef.current) {
        pointsRef.current.rotation.y += scrollY * 0.00002;
      }
      if (linesRef.current) {
        linesRef.current.rotation.y += scrollY * 0.00002;
      }
      if (pulsesRef.current) {
        pulsesRef.current.rotation.y += scrollY * 0.00002;
      }
    }

    // 4. Update Synaptic Pulses along network
    if (pulsesRef.current) {
      const positions = pulsesRef.current.geometry.attributes.position.array as Float32Array;

      pulsesData.forEach((pulse, idx) => {
        // Increment pathway progress
        pulse.progress += pulse.speed;

        if (pulse.progress >= 1) {
          // Select next node randomly from connections
          pulse.progress = 0;
          pulse.currentNode = pulse.nextNode;
          
          const neighbors = connectionMap.get(pulse.currentNode) || [];
          if (neighbors.length > 0) {
            pulse.nextNode = neighbors[Math.floor(Math.random() * neighbors.length)];
          } else {
            pulse.nextNode = Math.floor(Math.random() * nodeCount);
          }
        }

        // Interpolate position
        const startX = nodePositions[pulse.currentNode * 3];
        const startY = nodePositions[pulse.currentNode * 3 + 1];
        const startZ = nodePositions[pulse.currentNode * 3 + 2];

        const endX = nodePositions[pulse.nextNode * 3];
        const endY = nodePositions[pulse.nextNode * 3 + 1];
        const endZ = nodePositions[pulse.nextNode * 3 + 2];

        pulse.x = THREE.MathUtils.lerp(startX, endX, pulse.progress);
        pulse.y = THREE.MathUtils.lerp(startY, endY, pulse.progress);
        pulse.z = THREE.MathUtils.lerp(startZ, endZ, pulse.progress);

        positions[idx * 3] = pulse.x;
        positions[idx * 3 + 1] = pulse.y;
        positions[idx * 3 + 2] = pulse.z;
      });

      pulsesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* 1. Neural Node Particles */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[nodePositions, 3]}
          />
        </bufferGeometry>
        {nodeTexture && (
          <pointsMaterial
            size={0.16}
            map={nodeTexture}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            sizeAttenuation={true}
          />
        )}
      </points>

      {/* 2. Synaptic Glowing Connections */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#8b5cf6"
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>

      {/* 3. Firing Pulse Sparks */}
      <points ref={pulsesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array(pulsesData.length * 3), 3]}
          />
        </bufferGeometry>
        {pulseTexture && (
          <pointsMaterial
            size={0.24}
            map={pulseTexture}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            sizeAttenuation={true}
          />
        )}
      </points>
    </group>
  );
}

// Main Client Wrap
export default function BrainCanvas() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-transparent">
        {/* Spinner placeholder while loading canvas on client */}
        <div className="w-12 h-12 border-2 border-t-cyan-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 w-full h-full -z-5 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <fog attach="fog" args={["#020205", 4.5, 9]} />
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.6} />
        <pointLight position={[-5, -5, -5]} color="#8b5cf6" intensity={1.5} />
        <pointLight position={[5, 5, 5]} color="#06b6d4" intensity={1.5} />
        <NeuralBrain />
      </Canvas>
    </div>
  );
}
