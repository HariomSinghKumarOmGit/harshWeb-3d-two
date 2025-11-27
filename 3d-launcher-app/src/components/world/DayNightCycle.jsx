import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { useDayNight } from '../../hooks/useDayNight';

/**
 * Day/Night cycle component
 * Manages directional sun light, ambient lighting, and HDRI environment
 */
export const DayNightCycle = () => {
  // 5 minutes = 300,000 ms
  const { sunPosition, skyIntensity, isDay } = useDayNight(300000);
  const sunRef = useRef(null);
  const ambientRef = useRef(null);

  useFrame(() => {
    if (sunRef.current) {
      sunRef.current.position.copy(sunPosition);
      sunRef.current.intensity = Math.max(0.5, skyIntensity * 2);
    }

    if (ambientRef.current) {
      ambientRef.current.intensity = Math.max(0.2, skyIntensity * 0.5);
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
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      {/* Ambient Light */}
      <ambientLight ref={ambientRef} />

      {/* HDRI Environment */}
      <Environment preset={isDay ? "sunset" : "night"} background blur={0.5} />

      {/* Fog for depth */}
      <fog attach="fog" args={[isDay ? '#87CEEB' : '#0A1628', 10, 50]} />
    </>
  );
};
