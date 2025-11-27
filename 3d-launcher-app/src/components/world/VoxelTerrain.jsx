import React from 'react';
import { usePlane, useBox } from '@react-three/cannon';

/**
 * Voxel Terrain component
 * Implements physics-based ground and blocky hills
 */
export const VoxelTerrain = () => {
  // Infinite Ground Plane (Physics)
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -2, 0],
    type: 'Static'
  }));

  // Helper to create a static physics block
  const PhysicsBlock = ({ position, color }) => {
    const [boxRef] = useBox(() => ({
      type: 'Static',
      position,
      args: [1, 1, 1]
    }));

    return (
      <mesh ref={boxRef} castShadow receiveShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={color} />
      </mesh>
    );
  };

  return (
    <group>
      {/* Visual Ground Plane */}
      <mesh ref={ref} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#7CBD3A" />
      </mesh>

      {/* Voxel Hills (Static Physics Blocks) */}
      <group>
        {/* Hill 1 */}
        <PhysicsBlock position={[-5, -1.5, -5]} color="#5B8D2A" />
        <PhysicsBlock position={[-5, -0.5, -5]} color="#5B8D2A" />
        <PhysicsBlock position={[-4, -1.5, -5]} color="#5B8D2A" />

        {/* Hill 2 */}
        <PhysicsBlock position={[5, -1.5, -3]} color="#5B8D2A" />
        <PhysicsBlock position={[6, -1.5, -3]} color="#5B8D2A" />
        <PhysicsBlock position={[5, -1.5, -2]} color="#5B8D2A" />
        <PhysicsBlock position={[5, -0.5, -3]} color="#5B8D2A" />

        {/* Random scattered blocks */}
        <PhysicsBlock position={[-3, -1.5, 2]} color="#8B4513" /> {/* Dirt block */}
        <PhysicsBlock position={[3, -1.5, 4]} color="#808080" /> {/* Stone block */}
      </group>
    </group>
  );
};
