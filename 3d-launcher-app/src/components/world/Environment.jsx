import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

/**
 * Environment component
 * Includes mountains, clouds, flowers, and ground plane
 */
export const Environment = () => {
  const cloudsRef = useRef(null);

  // Animate clouds drifting
  useFrame(({ clock }) => {
    if (cloudsRef.current) {
      cloudsRef.current.position.x = Math.sin(clock.getElapsedTime() * 0.1) * 2;
    }
  });

  return (
    <group>
      {/* Ground Plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#7CBD3A" />
      </mesh>

      {/* Mountains in background */}
      <group position={[0, -2, -10]}>
        <mesh position={[-5, 2, 0]} castShadow>
          <coneGeometry args={[2, 4, 4]} />
          <meshStandardMaterial color="#8B8B8B" />
        </mesh>
        <mesh position={[0, 3, -2]} castShadow>
          <coneGeometry args={[3, 6, 4]} />
          <meshStandardMaterial color="#A9A9A9" />
        </mesh>
        <mesh position={[5, 2.5, 0]} castShadow>
          <coneGeometry args={[2.5, 5, 4]} />
          <meshStandardMaterial color="#808080" />
        </mesh>
      </group>

      {/* Clouds */}
      <group ref={cloudsRef} position={[0, 5, -5]}>
        {/* Cloud 1 */}
        <group position={[-3, 0, 0]}>
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[0.5, 8, 8]} />
            <meshStandardMaterial color="#FFFFFF" transparent opacity={0.8} />
          </mesh>
          <mesh position={[0.4, 0, 0]}>
            <sphereGeometry args={[0.4, 8, 8]} />
            <meshStandardMaterial color="#FFFFFF" transparent opacity={0.8} />
          </mesh>
          <mesh position={[-0.4, 0, 0]}>
            <sphereGeometry args={[0.4, 8, 8]} />
            <meshStandardMaterial color="#FFFFFF" transparent opacity={0.8} />
          </mesh>
        </group>

        {/* Cloud 2 */}
        <group position={[3, 0.5, -2]}>
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[0.6, 8, 8]} />
            <meshStandardMaterial color="#FFFFFF" transparent opacity={0.8} />
          </mesh>
          <mesh position={[0.5, 0, 0]}>
            <sphereGeometry args={[0.5, 8, 8]} />
            <meshStandardMaterial color="#FFFFFF" transparent opacity={0.8} />
          </mesh>
          <mesh position={[-0.5, 0, 0]}>
            <sphereGeometry args={[0.5, 8, 8]} />
            <meshStandardMaterial color="#FFFFFF" transparent opacity={0.8} />
          </mesh>
        </group>
      </group>

      {/* Flowers scattered on ground */}
      {Array.from({ length: 20 }).map((_, i) => {
        const x = (Math.random() - 0.5) * 15;
        const z = (Math.random() - 0.5) * 15;
        const color = ['#FF69B4', '#FFFF00', '#FF0000', '#FFA500'][Math.floor(Math.random() * 4)];

        return (
          <group key={i} position={[x, -1.8, z]}>
            {/* Stem */}
            <mesh>
              <cylinderGeometry args={[0.02, 0.02, 0.3]} />
              <meshStandardMaterial color="#00FF00" />
            </mesh>
            {/* Flower */}
            <mesh position={[0, 0.2, 0]}>
              <boxGeometry args={[0.1, 0.1, 0.1]} />
              <meshStandardMaterial color={color} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
};
