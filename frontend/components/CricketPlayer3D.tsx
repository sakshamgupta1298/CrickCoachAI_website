'use client'

import { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'

function CricketBatsman() {
  const groupRef = useRef<THREE.Group>(null)
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (groupRef.current) {
      // Subtle rotation
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }
  })

  // Create a simplified cricket player silhouette
  // Head
  const headGeometry = new THREE.SphereGeometry(0.15, 16, 16)
  const headMaterial = new THREE.MeshStandardMaterial({ 
    color: '#00d4ff',
    emissive: '#00d4ff',
    emissiveIntensity: 0.3,
    metalness: 0.8,
    roughness: 0.2
  })

  // Body (torso)
  const bodyGeometry = new THREE.CylinderGeometry(0.12, 0.15, 0.4, 16)
  const bodyMaterial = new THREE.MeshStandardMaterial({ 
    color: '#00d4ff',
    emissive: '#00d4ff',
    emissiveIntensity: 0.2,
    metalness: 0.7,
    roughness: 0.3
  })

  // Arms
  const armGeometry = new THREE.CylinderGeometry(0.04, 0.05, 0.3, 8)
  
  // Legs
  const legGeometry = new THREE.CylinderGeometry(0.05, 0.06, 0.35, 8)

  // Bat
  const batHandleGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.3, 8)
  const batBladeGeometry = new THREE.BoxGeometry(0.15, 0.05, 0.02)

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      {/* Head */}
      <mesh geometry={headGeometry} material={headMaterial} position={[0, 0.5, 0]} />

      {/* Body */}
      <mesh geometry={bodyGeometry} material={bodyMaterial} position={[0, 0.2, 0]} />

      {/* Left Arm (batting arm) */}
      <mesh 
        geometry={armGeometry} 
        material={bodyMaterial} 
        position={[-0.2, 0.3, 0]} 
        rotation={[0, 0, Math.PI / 6]}
      />

      {/* Right Arm */}
      <mesh 
        geometry={armGeometry} 
        material={bodyMaterial} 
        position={[0.15, 0.35, 0]} 
        rotation={[0, 0, -Math.PI / 4]}
      />

      {/* Left Leg */}
      <mesh 
        geometry={legGeometry} 
        material={bodyMaterial} 
        position={[-0.08, -0.15, 0]} 
      />

      {/* Right Leg */}
      <mesh 
        geometry={legGeometry} 
        material={bodyMaterial} 
        position={[0.08, -0.15, 0]} 
      />

      {/* Bat */}
      <group position={[-0.25, 0.25, 0]} rotation={[0, 0, Math.PI / 3]}>
        <mesh geometry={batHandleGeometry} material={bodyMaterial} position={[0, -0.15, 0]} />
        <mesh geometry={batBladeGeometry} material={bodyMaterial} position={[0, 0.05, 0]} />
      </group>

      {/* Joint markers (glowing points) */}
      {[
        { pos: [0, 0.5, 0], label: 'Head' },
        { pos: [0, 0.2, 0], label: 'Torso' },
        { pos: [-0.2, 0.3, 0], label: 'Shoulder' },
        { pos: [-0.15, 0.15, 0], label: 'Elbow' },
        { pos: [-0.08, -0.15, 0], label: 'Hip' },
        { pos: [-0.08, -0.35, 0], label: 'Knee' },
      ].map((joint, i) => (
        <mesh key={i} position={joint.pos as [number, number, number]}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshStandardMaterial 
            color="#00d4ff" 
            emissive="#00d4ff" 
            emissiveIntensity={0.8}
          />
        </mesh>
      ))}

      {/* Motion arc (batting swing path) */}
      <mesh rotation={[0, 0, Math.PI / 3]}>
        <torusGeometry args={[0.3, 0.01, 8, 32, Math.PI]} />
        <meshStandardMaterial 
          color="#00d4ff" 
          emissive="#00d4ff" 
          emissiveIntensity={0.5}
          transparent
          opacity={0.6}
        />
      </mesh>
    </group>
  )
}

function Particles() {
  const particlesRef = useRef<THREE.Points>(null)
  const particleCount = 100
  const positionsRef = useRef<Float32Array | null>(null)

  // Generate positions only once on mount (client-side)
  if (!positionsRef.current) {
    positionsRef.current = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount * 3; i++) {
      positionsRef.current[i] = (Math.random() - 0.5) * 10
    }
  }

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  if (!positionsRef.current) return null

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positionsRef.current}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#00d4ff" transparent opacity={0.6} />
    </points>
  )
}

export default function CricketPlayer3D() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="w-full h-full bg-transparent" />
  }

  return (
    <div className="w-full h-full">
      <Canvas
        gl={{ antialias: true, alpha: true }}
        className="bg-transparent"
      >
        <PerspectiveCamera makeDefault position={[0, 0, 3]} fov={50} />
        
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <pointLight position={[2, 2, 2]} intensity={1} color="#00d4ff" />
        <pointLight position={[-2, -2, -2]} intensity={0.5} color="#0099cc" />
        <directionalLight position={[0, 5, 0]} intensity={0.3} />

        {/* 3D Cricket Player */}
        <CricketBatsman />

        {/* Particle system */}
        <Particles />

        {/* Controls */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </div>
  )
}

