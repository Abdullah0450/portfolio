"use client";

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { motion } from 'framer-motion';

function ParticleSphere() {
  const meshRef = useRef<THREE.Points | null>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const particlesRef = useRef<Float32Array | null>(null);
  const velocityRef = useRef<Float32Array | null>(null);

  // Initialize particles
  useEffect(() => {
    if (meshRef.current) {
      const particleCount = 1000;
      const particles = new Float32Array(particleCount * 3);
      const velocity = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount * 3; i += 3) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        const radius = 2;

        particles[i] = radius * Math.sin(phi) * Math.cos(theta);
        particles[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
        particles[i + 2] = radius * Math.cos(phi);

        velocity[i] = (Math.random() - 0.5) * 0.02;
        velocity[i + 1] = (Math.random() - 0.5) * 0.02;
        velocity[i + 2] = (Math.random() - 0.5) * 0.02;
      }

      particlesRef.current = particles;
      velocityRef.current = velocity;
      meshRef.current.geometry.setAttribute('position', new THREE.BufferAttribute(particles, 3));
    }
  }, []);

  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMouse({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    if (!meshRef.current || !particlesRef.current || !velocityRef.current) return;

    const positions = particlesRef.current;
    const velocity = velocityRef.current;
    const particleCount = positions.length / 3;

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Mouse repulsion force
      const dx = positions[i3] - mouse.x * 3;
      const dy = positions[i3 + 1] - mouse.y * 3;
      const dz = positions[i3 + 2];

      const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

      if (distance < 1.5) {
        const force = (1.5 - distance) / 1.5;
        velocity[i3] += (dx / distance) * force * 0.1;
        velocity[i3 + 1] += (dy / distance) * force * 0.1;
        velocity[i3 + 2] += (dz / distance) * force * 0.1;
      }

      // Apply velocity
      positions[i3] += velocity[i3];
      positions[i3 + 1] += velocity[i3 + 1];
      positions[i3 + 2] += velocity[i3 + 2];

      // Damping
      velocity[i3] *= 0.98;
      velocity[i3 + 1] *= 0.98;
      velocity[i3 + 2] *= 0.98;

      // Keep particles on sphere surface
      const x = positions[i3];
      const y = positions[i3 + 1];
      const z = positions[i3 + 2];
      const len = Math.sqrt(x * x + y * y + z * z);

      if (len > 0.1) {
        positions[i3] = (x / len) * 2;
        positions[i3 + 1] = (y / len) * 2;
        positions[i3 + 2] = (z / len) * 2;
      }
    }

    meshRef.current.geometry.attributes.position.needsUpdate = true;

    // Rotate the entire sphere
    meshRef.current.rotation.x += 0.0002;
    meshRef.current.rotation.y += 0.0003;
  });

  return (
    <group>
      {/* Core sphere for reference */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshPhongMaterial
          color="#0a1428"
          wireframe
          transparent
          opacity={0.1}
          emissive="#1a4d7a"
        />
      </mesh>

      {/* Particle cloud */}
      <points ref={meshRef}>
        <bufferGeometry />
        <pointsMaterial
          size={0.04}
          color="#64ffda"
          sizeAttenuation
          transparent
          opacity={0.8}
        />
      </points>

      {/* Outer glow sphere */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[2.3, 32, 32]} />
        <meshBasicMaterial
          color="#ec4899"
          wireframe
          transparent
          opacity={0.08}
        />
      </mesh>

      {/* Floating accent particles */}
      {Array.from({ length: 12 }).map((_, i) => (
        <FloatingAccent key={i} index={i} />
      ))}
    </group>
  );
}

function FloatingAccent({ index }: { index: number }) {
  const accentRef = useRef<THREE.Mesh | null>(null);

  useFrame(({ clock }) => {
    if (accentRef.current) {
      const time = clock.getElapsedTime();
      const angle = (index / 12) * Math.PI * 2;
      const radius = 3.2;

      accentRef.current.position.x = Math.cos(angle + time * 0.2) * radius;
      accentRef.current.position.y = Math.sin(time * 0.5 + index) * 1;
      accentRef.current.position.z = Math.sin(angle + time * 0.2) * radius;

      accentRef.current.scale.x = accentRef.current.scale.y = accentRef.current.scale.z =
        0.6 + Math.sin(time * 2 + index) * 0.3;
    }
  });

  return (
    <mesh ref={accentRef}>
      <octahedronGeometry args={[0.15, 0]} />
      <meshBasicMaterial
        color={index % 2 === 0 ? '#64FFDA' : '#EC4899'}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}

export default function HeroScene({ isBackground = false }: { isBackground?: boolean }) {
  if (isBackground) {
    // Full-screen background version - no box, no text
    return (
      <div className="absolute inset-0 w-full h-full">
        <Canvas camera={{ position: [0, 0, 6], fov: 45 }} style={{ width: '100%', height: '100%' }}>
          <ambientLight intensity={0.6} />
          <pointLight position={[10, 10, 10]} intensity={0.8} color="#64FFDA" />
          <pointLight position={[-10, -10, 10]} intensity={0.6} color="#EC4899" />
          <pointLight position={[0, 0, 5]} intensity={0.4} />

          <ParticleSphere />

          {/* Background starfield */}
          <Starfield />
        </Canvas>
      </div>
    );
  }

  // Original boxed version for other pages
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="hidden md:flex flex-col items-center justify-center w-full"
    >
      <div className="relative w-full aspect-square max-w-sm">
        {/* Animated background glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-green/50 to-pink/50 rounded-3xl blur-3xl animate-pulse"></div>

        {/* 3D Canvas */}
        <div className="relative h-full rounded-3xl border border-green/50 backdrop-blur-sm overflow-hidden bg-gradient-to-br from-lightNavy/70 to-navy/50">
          <Canvas camera={{ position: [0, 0, 6], fov: 45 }} style={{ width: '100%', height: '100%' }}>
            <ambientLight intensity={0.6} />
            <pointLight position={[10, 10, 10]} intensity={0.8} color="#64FFDA" />
            <pointLight position={[-10, -10, 10]} intensity={0.6} color="#EC4899" />
            <pointLight position={[0, 0, 5]} intensity={0.4} />

            <ParticleSphere />

            {/* Background starfield */}
            <Starfield />
          </Canvas>
        </div>

        {/* Floating instruction text */}
        <motion.div
          animate={{ y: [-4, 4, -4], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute -top-14 left-1/2 transform -translate-x-1/2 text-center pointer-events-none"
        >
          <p className="text-xs font-mono text-green mb-1">🖱️ Move Your Mouse 🖱️</p>
          <p className="text-xs font-mono text-pink/70">Interactive Particle Sphere</p>
        </motion.div>

        {/* Bottom label */}
        <motion.div
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-xs font-mono text-slate/60 pointer-events-none"
        >
          Three.js × React Three Fiber
        </motion.div>
      </div>
    </motion.div>
  );
}

// Simple starfield for background
function Starfield() {
  const starsRef = useRef<THREE.Points | null>(null);

  useEffect(() => {
    if (starsRef.current) {
      const starCount = 200;
      const positions = new Float32Array(starCount * 3);

      for (let i = 0; i < starCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 80;
        positions[i + 1] = (Math.random() - 0.5) * 80;
        positions[i + 2] = (Math.random() - 0.5) * 80;
      }

      starsRef.current.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    }
  }, []);

  return (
    <points ref={starsRef}>
      <bufferGeometry />
      <pointsMaterial size={0.1} color="#4f46e5" sizeAttenuation opacity={0.3} />
    </points>
  );
}
