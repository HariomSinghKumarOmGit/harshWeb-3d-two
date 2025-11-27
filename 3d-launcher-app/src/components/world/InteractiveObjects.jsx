import React, { useState, useEffect } from 'react';
import { useBox } from '@react-three/cannon';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Draggable Physics Bone
 */
const DraggableBone = ({ position, onClick }) => {
  const [ref, api] = useBox(() => ({
    mass: 1,
    position,
    args: [0.5, 0.1, 0.1],
    material: { friction: 0.5, restitution: 0.2 }
  }));

  const { camera, mouse } = useThree();
  const [isDragging, setIsDragging] = useState(false);

  useFrame(() => {
    if (isDragging) {
      // Raycast to find point in space
      const vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
      vector.unproject(camera);
      const dir = vector.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z * 1.5; // Approximate distance
      const pos = camera.position.clone().add(dir.multiplyScalar(distance));

      // Move body to cursor
      api.position.set(pos.x, pos.y, pos.z);
      api.velocity.set(0, 0, 0); // Stop momentum while dragging
    }
  });

  const handlePointerDown = (e) => {
    e.stopPropagation();
    setIsDragging(true);
    document.body.style.cursor = 'grabbing';
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    document.body.style.cursor = 'auto';
    // Add a little throw impulse
    api.velocity.set(Math.random() - 0.5, 2, Math.random() - 0.5);
  };

  return (
    <mesh
      ref={ref}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerOver={() => document.body.style.cursor = 'grab'}
      onPointerOut={() => document.body.style.cursor = 'auto'}
      onClick={(e) => onClick('bone', e)}
      castShadow
    >
      <boxGeometry args={[0.6, 0.15, 0.15]} />
      <meshStandardMaterial color="#F5F5DC" />
      {/* Bone ends */}
      <mesh position={[0.3, 0, 0]}>
        <boxGeometry args={[0.15, 0.25, 0.2]} />
        <meshStandardMaterial color="#F5F5DC" />
      </mesh>
      <mesh position={[-0.3, 0, 0]}>
        <boxGeometry args={[0.15, 0.25, 0.2]} />
        <meshStandardMaterial color="#F5F5DC" />
      </mesh>
    </mesh>
  );
};

/**
 * Interactive objects component
 * Includes apples, bees, and physics-enabled bones
 */
export const InteractiveObjects = ({ onObjectClick }) => {
  const [hoveredObject, setHoveredObject] = useState(null);

  const handleClick = (type, event) => {
    event.stopPropagation();
    const screenX = event.nativeEvent.clientX;
    const screenY = event.nativeEvent.clientY;
    onObjectClick?.(type, [screenX, screenY]);
  };

  return (
    <group>
      {/* Physics Bones */}
      <DraggableBone position={[1, 2, 2]} onClick={handleClick} />
      <DraggableBone position={[-1, 3, 3]} onClick={handleClick} />

      {/* Static Apples (Visual only for now) */}
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
        <mesh position={[0, 0.2, 0]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.1, 0.15, 0.02]} />
          <meshStandardMaterial color="#00FF00" />
        </mesh>
      </mesh>

      {/* Bees - Flying animation */}
      <group position={[-1.5, 1, 2]}>
        <mesh
          onClick={(e) => handleClick('bee', e)}
          onPointerOver={() => setHoveredObject('bee1')}
          onPointerOut={() => setHoveredObject(null)}
          scale={hoveredObject === 'bee1' ? 1.2 : 1}
          castShadow
        >
          <boxGeometry args={[0.15, 0.15, 0.3]} />
          <meshStandardMaterial color="#FFD700" />
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
    </group>
  );
};
