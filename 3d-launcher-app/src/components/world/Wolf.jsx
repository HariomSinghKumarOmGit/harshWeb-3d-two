import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useBox } from '@react-three/cannon';
import { useCursorTracking } from '../../hooks/useCursorTracking';
import * as THREE from 'three';

/**
 * Wolf character component
 * Physics-enabled (Kinematic) with simple AI
 */
export const Wolf = ({ position = [0, 0, 0], username = 'Player' }) => {
  // Physics Body (Kinematic - we control movement manually)
  const [ref, api] = useBox(() => ({
    type: 'Kinematic',
    position,
    args: [0.8, 1, 1.5],
    mass: 1
  }));

  const headRef = useRef(null);
  const tailRef = useRef(null);
  const { cursorPosition } = useCursorTracking();
  const [showHearts, setShowHearts] = useState(false);

  // AI & Animation Loop
  useFrame(({ clock }) => {
    // Tail wag
    if (tailRef.current) {
      tailRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 5) * 0.3;
    }

    // Head tracking (Cursor for now, could be bone position)
    if (headRef.current) {
      const targetRotationY = cursorPosition.x * 0.5;
      const targetRotationX = -cursorPosition.y * 0.3;

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

    // Simple "breathing" movement for the whole body
    const yOffset = Math.sin(clock.getElapsedTime() * 2) * 0.02;
    // api.position.set(position[0], position[1] + yOffset, position[2]); // Update physics body
  });

  return (
    <group ref={ref}>
      <group position={[0, -0.5, 0]}> {/* Offset visual mesh to align with physics box */}
        {/* Head */}
        <group ref={headRef} position={[0, 0.5, 0.4]}>
          <mesh castShadow>
            <boxGeometry args={[0.6, 0.6, 0.8]} />
            <meshStandardMaterial color="#8B7355" />
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

        {/* Hearts */}
        {showHearts && (
          <mesh position={[0, 1.5, 0]}>
            <sphereGeometry args={[0.2, 8, 8]} />
            <meshStandardMaterial color="#FF69B4" />
          </mesh>
        )}
      </group>
    </group>
  );
};
