import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

/**
 * Minecraft-style Steve character component
 * Low-poly cube-based character with scroll-triggered and idle animations
 */
export const Steve = () => {
  const groupRef = useRef(null);
  const leftArmRef = useRef(null);
  const rightArmRef = useRef(null);
  const { isScrolling, normalizedScroll } = useScrollAnimation();

  // Idle animation
  useFrame(({ clock }) => {
    if (!groupRef.current) return;

    // Breathing animation (subtle scale pulse)
    const breathe = Math.sin(clock.getElapsedTime() * 2) * 0.02;
    if (!isScrolling) {
      groupRef.current.scale.set(1 + breathe, 1 + breathe, 1 + breathe);
    }

    // Arm sway during idle
    if (!isScrolling && leftArmRef.current && rightArmRef.current) {
      const sway = Math.sin(clock.getElapsedTime() * 1.5) * 0.1;
      leftArmRef.current.rotation.x = sway;
      rightArmRef.current.rotation.x = -sway;
    }
  });

  // Scroll-triggered animation
  useEffect(() => {
    if (!groupRef.current || !leftArmRef.current || !rightArmRef.current) return;

    if (isScrolling) {
      // Raise arms
      const armRotation = normalizedScroll * Math.PI * 0.5; // Up to 90 degrees
      leftArmRef.current.rotation.x = -armRotation;
      rightArmRef.current.rotation.x = -armRotation;

      // Scale up slightly
      const scale = 1 + normalizedScroll * 0.2;
      groupRef.current.scale.set(scale, scale, scale);
    }
  }, [isScrolling, normalizedScroll]);

  return (
    <group ref={groupRef} position={[0, -1, 0]}>
      {/* Head */}
      <mesh position={[0, 1.5, 0]} castShadow>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshStandardMaterial color="#D2A679" />
      </mesh>

      {/* Body */}
      <mesh position={[0, 0.6, 0]} castShadow>
        <boxGeometry args={[0.8, 1.2, 0.4]} />
        <meshStandardMaterial color="#00BFFF" />

        {/* Play Button on Shirt */}
        <group position={[0, 0.2, 0.21]}>
          {/* Button Circle Background */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.15, 0.15, 0.02, 32]} />
            <meshStandardMaterial color="#FFFFFF" />
          </mesh>
          {/* Play Triangle */}
          <mesh rotation={[0, 0, -Math.PI / 2]} position={[0.02, 0, 0.02]}>
            <cylinderGeometry args={[0.08, 0.08, 0.02, 3]} />
            <meshStandardMaterial color="#00BFFF" />
          </mesh>
        </group>
      </mesh>

      {/* Left Arm */}
      <group position={[-0.6, 0.9, 0]}>
        <mesh ref={leftArmRef} position={[0, -0.3, 0]} castShadow>
          <boxGeometry args={[0.4, 1.2, 0.4]} />
          <meshStandardMaterial color="#D2A679" />
        </mesh>
      </group>

      {/* Right Arm */}
      <group position={[0.6, 0.9, 0]}>
        <mesh ref={rightArmRef} position={[0, -0.3, 0]} castShadow>
          <boxGeometry args={[0.4, 1.2, 0.4]} />
          <meshStandardMaterial color="#D2A679" />
        </mesh>
      </group>

      {/* Left Leg */}
      <mesh position={[-0.2, -0.6, 0]} castShadow>
        <boxGeometry args={[0.4, 1.2, 0.4]} />
        <meshStandardMaterial color="#0000CD" />
      </mesh>

      {/* Right Leg */}
      <mesh position={[0.2, -0.6, 0]} castShadow>
        <boxGeometry args={[0.4, 1.2, 0.4]} />
        <meshStandardMaterial color="#0000CD" />
      </mesh>
    </group>
  );
};
