import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useDayNight } from '../../hooks/useDayNight';
import * as THREE from 'three';

/**
 * Day/Night cycle component
 * Manages directional sun light and ambient lighting based on time of day
 */
export const DayNightCycle: React.FC = () => {
  const { sunPosition, skyIntensity, isDay } = useDayNight(60000); // 60 second cycle
  const sunRef = useRef<THREE.DirectionalLight>(null);
  const ambientRef = useRef<THREE.AmbientLight>(null);

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

      {/* Sky color (simulated with fog) */}
      <fog
        attach="fog"
        args={[
          isDay ? '#87CEEB' : '#0A1628',
          10,
          50
        ]}
      />

      {/* Background color */}
      <color
        attach="background"
        args={[isDay ? '#87CEEB' : '#0A1628']}
      />
    </>
  );
};
