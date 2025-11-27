import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useBox } from '@react-three/cannon';
import { useCursorTracking } from '../../hooks/useCursorTracking';
import * as THREE from 'three';

/**
 * Wolf/Puppy character component
 * Physics-enabled (Kinematic) with simple AI
 */
export const Wolf = ({ position = [0, 0, 0], username = 'Player', isPuppy = false }) => {
  // Physics Body (Kinematic - we control movement manually)
  const [ref, api] = useBox(() => ({
    type: 'Kinematic',
    position,
    args: isPuppy ? [0.4, 0.5, 0.75] : [0.8, 1, 1.5], // Smaller hitbox for puppy
    mass: 1
  }));

  const headRef = useRef(null);
  const tailRef = useRef(null);
  const bodyRef = useRef(null);
  const { cursorPosition } = useCursorTracking();
  const [showHearts, setShowHearts] = useState(false);

  // AI & Animation Loop
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    // Tail wag
    if (tailRef.current) {
      tailRef.current.rotation.y = Math.sin(time * (isPuppy ? 8 : 5)) * 0.3;
    }

    // Head tracking
    if (headRef.current) {
      const targetRotationY = cursorPosition.x * 0.5;
      const targetRotationX = -cursorPosition.y * 0.3;

      headRef.current.rotation.y = THREE.MathUtils.lerp(
        headRef.current.rotation.y,
        targetRotationY,
        0.1
      );

      // Puppy head tilt
      if (isPuppy) {
        headRef.current.rotation.z = Math.sin(time * 2) * 0.1;
      }

      headRef.current.rotation.x = THREE.MathUtils.lerp(
        headRef.current.rotation.x,
        targetRotationX,
        0.1
      );
    }

    // Body Movement
    if (bodyRef.current) {
      // Breathing / Hopping
      const yOffset = isPuppy
        ? Math.abs(Math.sin(time * 4)) * 0.1 // Hopping for puppy
        : Math.sin(time * 2) * 0.02;       // Breathing for adult

      bodyRef.current.position.y = yOffset;
    }
  });

  return (
    <group ref={ref}>
      <group ref={bodyRef} position={[0, -0.5, 0]}> {/* Offset visual mesh */}
        {/* Head */}
        <group ref={headRef} position={[0, 0.5, 0.4]}>
          <mesh castShadow>
            <boxGeometry args={[0.6, 0.6, 0.8]} />
            <meshStandardMaterial color={isPuppy ? "#D2B48C" : "#8B7355"} />
          </mesh>
          <mesh position={[0, -0.1, 0.5]} castShadow>
            <boxGeometry args={[0.4, 0.3, 0.4]} />
            <meshStandardMaterial color="#A0826D" />
          </mesh>
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
          <meshStandardMaterial color={isPuppy ? "#D2B48C" : "#8B7355"} />
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

        {/* Hearts */}
        {showHearts && (
          <mesh position={[0, 1.5, 0]}>
            <sphereGeometry args={[0.2, 8, 8]} />
            <meshStandardMaterial color="#FF69B4" />
          </mesh>
        )}

        {/* Username Tag */}
        {/* <Text position={[0, 1.2, 0]} fontSize={0.2} color="white">{username}</Text> */}
      </group>
    </group>
  );
};
