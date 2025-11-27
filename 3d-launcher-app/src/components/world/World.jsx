import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Physics, Debug } from '@react-three/cannon';
import { Steve } from './Steve';
import { Wolf } from './Wolf';
import { InteractiveObjects } from './InteractiveObjects';
import { VoxelTerrain } from './VoxelTerrain';
import { DayNightCycle } from './DayNightCycle';
import { FloatingFeedback } from '../ui/FloatingFeedback';

/**
 * Main 3D World component
 * Integrated with Physics engine
 */
export const World = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [feedbackCounter, setFeedbackCounter] = useState(0);

  const handleObjectClick = (type, position) => {
    let message = '';

    switch (type) {
      case 'apple':
        message = '+1 💎';
        break;
      case 'bee':
        message = '🐝 Buzz!';
        break;
      case 'bone':
        message = '🦴 Yum!';
        break;
      default:
        message = '✨';
    }

    const newFeedback = {
      id: feedbackCounter,
      message,
      x: position[0],
      y: position[1],
    };

    setFeedbacks(prev => [...prev, newFeedback]);
    setFeedbackCounter(prev => prev + 1);
  };

  const removeFeedback = (id) => {
    setFeedbacks(prev => prev.filter(f => f.id !== id));
  };

  return (
    <>
      {/* 3D Canvas - Layer 2 (behind UI) */}
      <div className="layer-world">
        <Canvas
          shadows
          camera={{ position: [0, 2, 6], fov: 50, far: 100 }} // Increased far plane for mountains
          gl={{ antialias: true, alpha: true }}
        >
          {/* Day/Night Cycle Lighting */}
          <DayNightCycle />

          {/* Camera Controls */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 3}
            maxAzimuthAngle={Math.PI / 6}
            minAzimuthAngle={-Math.PI / 6}
            target={[0, 0, 0]}
          />

          {/* Physics World */}
          <Physics gravity={[0, -9.81, 0]}>
            {/* Debug Mode (Optional: remove in production) */}
            {/* <Debug> */}

            {/* Characters */}
            <group position={[0, 0, 0]}>
              <Steve />

              {/* Adult Wolf */}
              <group position={[1.5, 0, 1]}>
                <Wolf username="Wolf" />
              </group>
            </group>

            {/* Interactive Objects (Physics Enabled) */}
            <InteractiveObjects onObjectClick={handleObjectClick} />

            {/* Voxel Terrain (Physics Enabled) */}
            <VoxelTerrain />

            {/* </Debug> */}
          </Physics>
        </Canvas>
      </div>

      {/* Floating Feedback UI */}
      {feedbacks.map(feedback => (
        <FloatingFeedback
          key={feedback.id}
          message={feedback.message}
          x={feedback.x}
          y={feedback.y}
          onComplete={() => removeFeedback(feedback.id)}
        />
      ))}
    </>
  );
};
