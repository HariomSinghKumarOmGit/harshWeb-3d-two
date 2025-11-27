import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useCursorTracking } from '../../hooks/useCursorTracking';
import * as THREE from 'three';

/**
 * Wolf character component
 * Follows cursor with head rotation, reacts to bone interactions
 */
export const Wolf = ({ username = 'Player' }) => {
  // username will be displayed when wolf is fed a bone
  const groupRef = useRef(null);
  const headRef = useRef(null);
  const tailRef = useRef(null);
  const { cursorPosition } = useCursorTracking();
  const [showHearts, setShowHearts] = useState(false);
  const [showName, setShowName] = useState(false);

  // Idle tail wag animation
  useFrame(({ clock }) => {
    if (tailRef.current) {
      tailRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 3) * 0.3;
    }

    // Head follows cursor
    if (headRef.current) {
      const targetRotationY = cursorPosition.x * 0.5;
      const targetRotationX = -cursorPosition.y * 0.3;

      // Smooth interpolation (lerp)
      headRef.current.rotation.y = THREE.MathUtils.lerp(
        headRef.current.rotation.y,
        targetRotationY,
        0.1
      );
      headRef.current.rotation.x = THREE.MathUtils.lerp(
        headRef.current.rotation.x,
        targetRotationX,
        0.1
      );
    }
  });

  const handleFeed = () => {
    // TODO: Connect this to bone interaction in InteractiveObjects
    console.log(`Wolf fed by ${username}`);
    setShowHearts(true);
    setShowName(true);
    setTimeout(() => {
      setShowHearts(false);
      setShowName(false);
    }, 2000);
  };

  return (
    <group ref={groupRef} position={[0, -1.5, 0]}>
      {/* Head */}
      <group ref={headRef} position={[0, 0.5, 0.4]}>
        <mesh castShadow>
          <boxGeometry args={[0.6, 0.6, 0.8]} />
          <meshStandardMaterial color="#8B7355" />
        </mesh>

        {/* Snout */}
        <mesh position={[0, -0.1, 0.5]} castShadow>
          <boxGeometry args={[0.4, 0.3, 0.4]} />
          <meshStandardMaterial color="#A0826D" />
        </mesh>

        {/* Ears */}
        <mesh position={[-0.25, 0.4, 0]} castShadow>
          <coneGeometry args={[0.15, 0.3, 3]} />
          <meshStandardMaterial color="#6B5D52" />
        </mesh>
        <mesh position={[0.25, 0.4, 0]} castShadow>
          <coneGeometry args={[0.15, 0.3, 3]} />
          <meshStandardMaterial color="#6B5D52" />
        </mesh>
      </group>

      {/* Body */}
      <mesh position={[0, 0.3, -0.2]} castShadow>
        <boxGeometry args={[0.8, 0.6, 1.2]} />
        <meshStandardMaterial color="#8B7355" />
      </mesh>

      {/* Legs */}
      <mesh position={[-0.3, -0.3, 0.3]} castShadow>
        <boxGeometry args={[0.2, 0.6, 0.2]} />
        <meshStandardMaterial color="#6B5D52" />
      </mesh>
      <mesh position={[0.3, -0.3, 0.3]} castShadow>
        <boxGeometry args={[0.2, 0.6, 0.2]} />
        <meshStandardMaterial color="#6B5D52" />
      </mesh>
      <mesh position={[-0.3, -0.3, -0.5]} castShadow>
        <boxGeometry args={[0.2, 0.6, 0.2]} />
        <meshStandardMaterial color="#6B5D52" />
      </mesh>
      <mesh position={[0.3, -0.3, -0.5]} castShadow>
        <boxGeometry args={[0.2, 0.6, 0.2]} />
        <meshStandardMaterial color="#6B5D52" />
      </mesh>

      {/* Tail */}
      <mesh ref={tailRef} position={[0, 0.4, -0.9]} castShadow>
        <boxGeometry args={[0.15, 0.15, 0.6]} />
        <meshStandardMaterial color="#6B5D52" />
      </mesh>

      {/* Hearts animation (when fed) */}
      {showHearts && (
        <>
          <mesh position={[0, 1.5, 0]}>
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshStandardMaterial color="#FF69B4" emissive="#FF1493" emissiveIntensity={0.5} />
          </mesh>
          <mesh position={[0.3, 1.7, 0]}>
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshStandardMaterial color="#FF69B4" emissive="#FF1493" emissiveIntensity={0.5} />
          </mesh>
          <mesh position={[-0.3, 1.6, 0]}>
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshStandardMaterial color="#FF69B4" emissive="#FF1493" emissiveIntensity={0.5} />
          </mesh>
        </>
      )}

      {/* Username text (when fed) */}
      {showName && (
        <mesh position={[0, 2, 0]}>
          {/* Placeholder for text - in production, use @react-three/drei Text component */}
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial color="#FFFFFF" />
        </mesh>
      )}
    </group>
  );
};
