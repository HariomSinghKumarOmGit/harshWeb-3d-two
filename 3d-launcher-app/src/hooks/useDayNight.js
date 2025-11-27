import { useState, useEffect } from 'react';
import { Vector3 } from 'three';

/**
 * Custom hook to manage day/night cycle
 * Returns time of day, sun position, and lighting intensity
 */
export const useDayNight = (cycleDuration = 60000) => {
  const [timeOfDay, setTimeOfDay] = useState(0); // 0 to 1 (0 = midnight, 0.5 = noon, 1 = midnight)

  useEffect(() => {
    const startTime = Date.now();

    const updateTime = () => {
      const elapsed = Date.now() - startTime;
      const progress = (elapsed % cycleDuration) / cycleDuration;
      setTimeOfDay(progress);
    };

    const interval = setInterval(updateTime, 50); // Update 20 times per second

    return () => clearInterval(interval);
  }, [cycleDuration]);

  // Calculate sun position in arc (moves from -π to π)
  const sunAngle = timeOfDay * Math.PI * 2;
  const sunPosition = new Vector3(
    Math.cos(sunAngle) * 10,
    Math.sin(sunAngle) * 10,
    -5
  );

  // Calculate sky intensity (brightest at noon, darkest at midnight)
  const skyIntensity = Math.max(0.1, Math.sin(sunAngle));

  // Determine if it's day or night
  const isDay = sunPosition.y > 0;

  return {
    timeOfDay,
    sunPosition,
    skyIntensity,
    isDay,
    sunAngle,
  };
};
