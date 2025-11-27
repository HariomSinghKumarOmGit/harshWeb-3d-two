import { useState, useEffect } from 'react';
import { Vector3 } from 'three';

/**
 * Custom hook to track cursor position in 3D space
 * Used for wolf head rotation to follow cursor
 */
export const useCursorTracking = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [cursorPosition3D, setCursorPosition3D] = useState(new Vector3(0, 0, 0));

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalize to -1 to 1 range
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;

      setCursorPosition({ x, y });

      // Convert to 3D position (simplified - will be refined in Wolf component with raycasting)
      setCursorPosition3D(new Vector3(x * 5, y * 3, 0));
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return { cursorPosition, cursorPosition3D };
};
