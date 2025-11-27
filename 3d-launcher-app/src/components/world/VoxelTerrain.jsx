import React from 'react';
import { usePlane, useBox } from '@react-three/cannon';

// Helper for static physics blocks
const PhysicsBlock = ({ position, color, args = [1, 1, 1] }) => {
  const [ref] = useBox(() => ({
    type: 'Static',
    position,
    args
  }));

  return (
    <mesh ref={ref} castShadow receiveShadow>
      <boxGeometry args={args} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const MountainRange = () => {
  return (
    <group>
      {/* Left Mountain */}
      <PhysicsBlock position={[-15, 0, -15]} args={[10, 5, 10]} color="#707070" />
      <PhysicsBlock position={[-15, 4, -15]} args={[6, 4, 6]} color="#808080" />
      <PhysicsBlock position={[-15, 7, -15]} args={[2, 2, 2]} color="#FFFFFF" />

      {/* Right Mountain */}
      <PhysicsBlock position={[15, -1, -20]} args={[12, 6, 12]} color="#707070" />
      <PhysicsBlock position={[15, 4, -20]} args={[8, 5, 8]} color="#808080" />
      <PhysicsBlock position={[15, 8, -20]} args={[3, 3, 3]} color="#FFFFFF" />

      {/* Center Distant Hills */}
      <PhysicsBlock position={[0, -1, -25]} args={[20, 4, 5]} color="#5B8D2A" />
    </group>
  );
};

export const VoxelTerrain = () => {
  // Infinite Ground Plane
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -2, 0],
    type: 'Static',
    material: { friction: 1 }
  }));

  return (
    <group>
      {/* Visual Ground */}
      <mesh ref={ref} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#5B8D2A" />
      </mesh>

      {/* Lake Area */}
      <group position={[12, -1.9, 5]}>
        {/* Water Surface (Visual only) */}
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[10, 10]} />
          <meshStandardMaterial color="#4FA4F4" transparent opacity={0.7} />
        </mesh>
        {/* Sand Border (Physics) */}
        <PhysicsBlock position={[0, -0.1, 0]} args={[11, 0.1, 11]} color="#C2B280" />
      </group>

      {/* Mountains */}
      <MountainRange />

      {/* Foreground Details */}
      <PhysicsBlock position={[-5, -1.5, -5]} color="#5B8D2A" />
      <PhysicsBlock position={[-5, -0.5, -5]} color="#5B8D2A" />
      <PhysicsBlock position={[5, -1.5, -3]} color="#5B8D2A" />

      {/* Random scattered blocks */}
      <PhysicsBlock position={[-8, -1.5, 2]} color="#8B4513" />
      <PhysicsBlock position={[8, -1.5, 8]} color="#808080" />
    </group>
  );
};
