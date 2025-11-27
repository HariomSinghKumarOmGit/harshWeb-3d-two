import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useBox } from '@react-three/cannon';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

/**
 * Minecraft-style Steve character component
 * Physics-enabled (Static body)
 */
export const Steve = (props) => {
  const { isScrolling, normalizedScroll } = useScrollAnimation();

  // Physics Body (Static - doesn't move by physics, but things collide with it)
  const [ref] = useBox(() => ({
    type: 'Static',
    position: [0, -1, 0],
    args: [1, 2, 0.5],
    ...props
  }));

  const groupRef = useRef(null);
  const leftArmRef = useRef(null);
  const rightArmRef = useRef(null);

  // Idle animation
  useFrame(({ clock }) => {
    if (!groupRef.current) return;

    // Breathing animation
    const breathe = Math.sin(clock.getElapsedTime() * 2) * 0.02;
    if (!isScrolling) {
      groupRef.current.scale.set(1 + breathe, 1 + breathe, 1 + breathe);
    }

    // Arm sway
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
      const armRotation = normalizedScroll * Math.PI * 0.5;
      leftArmRef.current.rotation.x = -armRotation;
      rightArmRef.current.rotation.x = -armRotation;

      const scale = 1 + normalizedScroll * 0.2;
      groupRef.current.scale.set(scale, scale, scale);
    }
  }, [isScrolling, normalizedScroll]);

  return (
    <group ref={ref}>
      <group ref={groupRef}>
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
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.15, 0.15, 0.02, 32]} />
              <meshStandardMaterial color="#FFFFFF" />
            </mesh>
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

        {/* Legs */}
        <mesh position={[-0.2, -0.6, 0]} castShadow>
          <boxGeometry args={[0.4, 1.2, 0.4]} />
          <meshStandardMaterial color="#0000CD" />
        </mesh>
        <mesh position={[0.2, -0.6, 0]} castShadow>
          <boxGeometry args={[0.4, 1.2, 0.4]} />
          <meshStandardMaterial color="#0000CD" />
        </mesh>
      </group>
    </group>
  );
};
