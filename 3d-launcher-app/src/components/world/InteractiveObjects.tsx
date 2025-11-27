import React, { useState } from 'react';
import { type ThreeEvent } from '@react-three/fiber';

interface InteractiveObjectsProps {
  onObjectClick?: (type: string, position: [number, number]) => void;
}

/**
 * Interactive objects component
 * Includes apples, bees, and bones with click interactions
 */
export const InteractiveObjects: React.FC<InteractiveObjectsProps> = ({ onObjectClick }) => {
  const [hoveredObject, setHoveredObject] = useState<string | null>(null);

  const handleClick = (type: string, event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    const screenX = event.nativeEvent.clientX;
    const screenY = event.nativeEvent.clientY;
    onObjectClick?.(type, [screenX, screenY]);
  };

  return (
    <group>
      {/* Apples - scattered around */}
      <mesh
        position={[-2, -0.5, 1]}
        onClick={(e) => handleClick('apple', e)}
        onPointerOver={() => setHoveredObject('apple1')}
        onPointerOut={() => setHoveredObject(null)}
        scale={hoveredObject === 'apple1' ? 1.2 : 1}
        castShadow
      >
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#FF0000" />
        {/* Leaf */}
        <mesh position={[0, 0.2, 0]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.1, 0.15, 0.02]} />
          <meshStandardMaterial color="#00FF00" />
        </mesh>
      </mesh>

      <mesh
        position={[2, -0.5, 0.5]}
        onClick={(e) => handleClick('apple', e)}
        onPointerOver={() => setHoveredObject('apple2')}
        onPointerOut={() => setHoveredObject(null)}
        scale={hoveredObject === 'apple2' ? 1.2 : 1}
        castShadow
      >
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#FF0000" />
        <mesh position={[0, 0.2, 0]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.1, 0.15, 0.02]} />
          <meshStandardMaterial color="#00FF00" />
        </mesh>
      </mesh>

      {/* Bees - flying objects */}
      <group position={[-1.5, 1, 2]}>
        <mesh
          onClick={(e) => handleClick('bee', e)}
          onPointerOver={() => setHoveredObject('bee1')}
          onPointerOut={() => setHoveredObject(null)}
          scale={hoveredObject === 'bee1' ? 1.2 : 1}
          castShadow
        >
          {/* Body */}
          <boxGeometry args={[0.15, 0.15, 0.3]} />
          <meshStandardMaterial color="#FFD700" />
        </mesh>
        {/* Stripes */}
        <mesh position={[0, 0, -0.05]}>
          <boxGeometry args={[0.16, 0.16, 0.05]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
        {/* Wings */}
        <mesh position={[0.15, 0.05, 0]} rotation={[0, 0, Math.PI / 6]}>
          <boxGeometry args={[0.2, 0.01, 0.15]} />
          <meshStandardMaterial color="#FFFFFF" transparent opacity={0.6} />
        </mesh>
        <mesh position={[-0.15, 0.05, 0]} rotation={[0, 0, -Math.PI / 6]}>
          <boxGeometry args={[0.2, 0.01, 0.15]} />
          <meshStandardMaterial color="#FFFFFF" transparent opacity={0.6} />
        </mesh>
      </group>

      <group position={[1.8, 1.5, 1.5]}>
        <mesh
          onClick={(e) => handleClick('bee', e)}
          onPointerOver={() => setHoveredObject('bee2')}
          onPointerOut={() => setHoveredObject(null)}
          scale={hoveredObject === 'bee2' ? 1.2 : 1}
          castShadow
        >
          <boxGeometry args={[0.15, 0.15, 0.3]} />
          <meshStandardMaterial color="#FFD700" />
        </mesh>
        <mesh position={[0, 0, -0.05]}>
          <boxGeometry args={[0.16, 0.16, 0.05]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
        <mesh position={[0.15, 0.05, 0]} rotation={[0, 0, Math.PI / 6]}>
          <boxGeometry args={[0.2, 0.01, 0.15]} />
          <meshStandardMaterial color="#FFFFFF" transparent opacity={0.6} />
        </mesh>
        <mesh position={[-0.15, 0.05, 0]} rotation={[0, 0, -Math.PI / 6]}>
          <boxGeometry args={[0.2, 0.01, 0.15]} />
          <meshStandardMaterial color="#FFFFFF" transparent opacity={0.6} />
        </mesh>
      </group>

      {/* Bones - for wolf interaction */}
      <mesh
        position={[1, -0.8, 2]}
        rotation={[0, 0, Math.PI / 4]}
        onClick={(e) => handleClick('bone', e)}
        onPointerOver={() => setHoveredObject('bone1')}
        onPointerOut={() => setHoveredObject(null)}
        scale={hoveredObject === 'bone1' ? 1.2 : 1}
        castShadow
      >
        {/* Main bone shaft */}
        <boxGeometry args={[0.1, 0.5, 0.1]} />
        <meshStandardMaterial color="#F5F5DC" />
        {/* Bone ends */}
        <mesh position={[0, 0.25, 0]}>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshStandardMaterial color="#F5F5DC" />
        </mesh>
        <mesh position={[0, -0.25, 0]}>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshStandardMaterial color="#F5F5DC" />
        </mesh>
      </mesh>
    </group>
  );
};
