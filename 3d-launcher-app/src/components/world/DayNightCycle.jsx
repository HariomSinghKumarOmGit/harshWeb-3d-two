import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment, Stars, Cloud } from '@react-three/drei';
import { useDayNight } from '../../hooks/useDayNight';
import * as THREE from 'three';

/**
 * Day/Night cycle component
 * Manages Sun, Moon, Stars, and Lighting
 */
export const DayNightCycle = () => {
  // 5 minutes = 300,000 ms
  const { sunPosition, skyIntensity, isDay } = useDayNight(300000);
  const sunRef = useRef(null);
  const moonRef = useRef(null);
  const ambientRef = useRef(null);

  // Calculate Moon position (opposite to Sun)
  const moonPosition = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    if (sunRef.current) {
      sunRef.current.position.copy(sunPosition);
      sunRef.current.intensity = Math.max(0.5, skyIntensity * 2);
    }

    // Moon is opposite to Sun
    moonPosition.copy(sunPosition).negate();
    if (moonRef.current) {
      moonRef.current.position.copy(moonPosition);
      moonRef.current.lookAt(0, 0, 0);
    }

    if (ambientRef.current) {
      ambientRef.current.intensity = Math.max(0.1, skyIntensity * 0.5);
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
        intensity={isDay ? 0 : 0.5}
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

      {/* Stars (fade in at night) */}
      {!isDay && (
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      )}

      {/* Clouds */}
      <Cloud position={[-20, 15, -20]} opacity={0.5} speed={0.1} width={20} depth={2} segments={20} />
      <Cloud position={[20, 18, -10]} opacity={0.5} speed={0.1} width={20} depth={2} segments={20} />

      {/* HDRI Environment */}
      <Environment preset={isDay ? "sunset" : "night"} background blur={0.5} />

      {/* Fog for depth */}
      <fog attach="fog" args={[isDay ? '#87CEEB' : '#0A1628', 10, 80]} />
    </>
  );
};
