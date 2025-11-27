import React, { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment, Stars, Cloud, Sky } from '@react-three/drei';
import { useDayNight } from '../../hooks/useDayNight';
import * as THREE from 'three';

/**
 * Day/Night cycle component
 * Manages Sun, Moon, Stars, and Lighting with smooth transitions
 */
export const DayNightCycle = () => {
  // 5 minutes = 300,000 ms
  const { sunPosition, skyIntensity, isDay } = useDayNight(300000);
  const sunRef = useRef(null);
  const moonRef = useRef(null);
  const ambientRef = useRef(null);

  // Colors for interpolation
  const dayColor = useMemo(() => new THREE.Color('#87CEEB'), []);
  const nightColor = useMemo(() => new THREE.Color('#0A1628'), []);
  const fogColor = useMemo(() => new THREE.Color(), []);

  // Calculate Moon position (opposite to Sun)
  const moonPosition = useMemo(() => new THREE.Vector3(), []);

  useFrame(({ scene }) => {
    // 1. Update Sun Light
    if (sunRef.current) {
      sunRef.current.position.copy(sunPosition);
      sunRef.current.intensity = Math.max(0, skyIntensity * 1.5);
    }

    // 2. Update Moon Position
    moonPosition.copy(sunPosition).negate();
    if (moonRef.current) {
      moonRef.current.position.copy(moonPosition);
      moonRef.current.lookAt(0, 0, 0);
    }

    // 3. Update Ambient Light
    if (ambientRef.current) {
      // Minimum ambient light at night is 0.1, max is 0.6
      ambientRef.current.intensity = THREE.MathUtils.lerp(0.1, 0.6, Math.max(0, skyIntensity));
    }

    // 4. Smooth Fog Color Transition
    // skyIntensity goes from -1 (midnight) to 1 (noon). 
    // We map it to 0..1 for lerp.
    const lerpFactor = (skyIntensity + 1) / 2; // 0 = night, 1 = day
    fogColor.lerpColors(nightColor, dayColor, Math.max(0, skyIntensity)); // Use max(0) to keep it dark at night

    if (scene.fog) {
      scene.fog.color.copy(fogColor);
    }
  });

  return (
    <>
      {/* Directional Sun Light */}
      <directionalLight
        ref={sunRef}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={100}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={30}
        shadow-camera-bottom={-30}
      />

      {/* Moon Light (weaker, blueish) */}
      <directionalLight
        position={moonPosition}
        intensity={Math.max(0, -skyIntensity * 0.5)} // Only active at night
        color="#8888FF"
        castShadow
      />

      {/* Ambient Light */}
      <ambientLight ref={ambientRef} />

      {/* Visual Sun - Glowing Sphere */}
      <mesh position={sunPosition}>
        <sphereGeometry args={[4, 32, 32]} />
        <meshBasicMaterial color="#FDB813" toneMapped={false} />
        {/* Glow halo */}
        <mesh scale={[1.2, 1.2, 1.2]}>
          <sphereGeometry args={[4, 32, 32]} />
          <meshBasicMaterial color="#FDB813" transparent opacity={0.3} toneMapped={false} />
        </mesh>
      </mesh>

      {/* Visual Moon - Crescent Shape */}
      <group ref={moonRef}>
        {/* Main Moon Body */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[3, 32, 32]} />
          <meshStandardMaterial color="#DDDDDD" emissive="#222222" />
        </mesh>
        {/* Shadow Sphere to create Crescent (Visual trick) */}
        <mesh position={[1, 0, 1]}>
          <sphereGeometry args={[2.8, 32, 32]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
      </group>

      {/* Dynamic Sky (Replaces static HDRI background) */}
      <Sky
        sunPosition={sunPosition}
        turbidity={10}
        rayleigh={2}
        mieCoefficient={0.005}
        mieDirectionalG={0.8}
      />

      {/* Stars (fade in at night) */}
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />

      {/* Clouds */}
      <Cloud position={[-20, 15, -20]} opacity={0.5} speed={0.1} width={20} depth={2} segments={20} />
      <Cloud position={[20, 18, -10]} opacity={0.5} speed={0.1} width={20} depth={2} segments={20} />

      {/* Environment for Reflections (No Background) */}
      <Environment preset="sunset" />

      {/* Fog for depth (Color updated in useFrame) */}
      <fog attach="fog" args={['#87CEEB', 10, 80]} />
    </>
  );
};
