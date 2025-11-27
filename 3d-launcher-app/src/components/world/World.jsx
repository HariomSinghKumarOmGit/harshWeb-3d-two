import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Steve } from './Steve';
import { Wolf } from './Wolf';
import { InteractiveObjects } from './InteractiveObjects';
import { Environment } from './Environment';
import { DayNightCycle } from './DayNightCycle';
import { FloatingFeedback } from '../ui/FloatingFeedback';

/**
 * Main 3D World component
 * Contains Canvas with all 3D elements and manages interactions
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
        // In a full implementation, this would open a mini UI card
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
          camera={{ position: [0, 1.5, 4.5], fov: 45 }} // Zoomed in, slightly lower angle
          gl={{ antialias: true, alpha: true }}
        >
          {/* Day/Night Cycle Lighting */}
          <DayNightCycle />

          {/* Camera Controls with limited rotation (parallax effect) */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 3}
            maxAzimuthAngle={Math.PI / 6}
            minAzimuthAngle={-Math.PI / 6}
            target={[0.5, 0.5, 0]} // Focus slightly to the right to balance Steve + Wolf
          />

          {/* Characters */}
          <group position={[0, 0, 0]}> {/* Adjusted to align head ~1/4 from top */}
            <Steve />
            {/* Wolf moved to the right with a gap */}
            <group position={[1.2, 0, 0.5]}>
              <Wolf username="Player" />
            </group>
          </group>

          {/* Interactive Objects */}
          <InteractiveObjects onObjectClick={handleObjectClick} />

          {/* Environment */}
          <Environment />
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
