import React, { useEffect, useRef, useState } from 'react';

const StarBackground = () => {
  const canvasRef = useRef(null);
  const mousePos = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Track mouse position
    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    const colors = [
      '255, 255, 255', // White
      '253, 224, 71',  // Yellow
      '167, 139, 250', // Purple
      '244, 114, 182', // Pink
      '96, 165, 250'   // Blue
    ]

    // 23 degrees upward angle
    const angle = 113 * (Math.PI / 180);
    const driftSpeedX = (canvas.width / (600 * 60)); // 10 minutes = 600 seconds * 60 fps
    const driftSpeedY = driftSpeedX * Math.tan(angle); // Upward at 23 degrees

    const stars = Array.from({ length: 350 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      baseX: 0, // Will be set during draw
      baseY: 0, // Will be set during draw
      size: Math.random() * 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: Math.random(),
      speed: Math.random() * 0.02 + 0.005,
      direction: Math.random() > 0.5 ? 1 : -1
    }));

    const draw = () => {
      ctx.fillStyle = '#050505'; // Very dark background
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      stars.forEach(star => {
        // Update opacity for twinkling
        star.opacity += star.speed * star.direction;
        if (star.opacity > 0.8 || star.opacity < 0.2) {
          star.direction *= -1;
        }

        // Galaxy drift movement
        star.x += driftSpeedX;
        star.y += driftSpeedY;

        // Wrap around when stars exit the screen
        if (star.x > canvas.width + 10) {
          star.x = -10;
        }
        if (star.y < -10) {
          star.y = canvas.height + 10;
        }
        if (star.y > canvas.height + 10) {
          star.y = -10;
        }

        // Calculate distance from cursor
        const dx = star.x - mousePos.current.x;
        const dy = star.y - mousePos.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Cursor interaction effects
        let brightnessBoost = 0;
        let shadowBlurAmount = 8;
        let offsetX = 0;
        let offsetY = 0;

        if (distance < 150) {
          // Repulsion effect - stars move away from cursor
          const repulsionStrength = (150 - distance) / 150;
          const repulsionForce = repulsionStrength * 3;
          offsetX = (dx / distance) * repulsionForce;
          offsetY = (dy / distance) * repulsionForce;

          // Glow effect based on distance
          if (distance < 25) {
            brightnessBoost = 1.0; // 100% brighter (full brightness) within 25px
            shadowBlurAmount = 15;
          } else if (distance < 45) {
            // Fade from 25px to 45px
            const fadeAmount = (45 - distance) / 20; // 20px range (45 - 25)
            brightnessBoost = 1.0 * fadeAmount;
            shadowBlurAmount = 8 + (7 * fadeAmount);
          }
        }

        // Draw star with effects - brightness boost is ADDITIVE to base opacity
        const finalOpacity = Math.min(1, star.opacity + brightnessBoost);
        const drawX = star.x + offsetX;
        const drawY = star.y + offsetY;

        ctx.beginPath();
        ctx.arc(drawX, drawY, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${star.color}, ${finalOpacity})`;
        ctx.shadowBlur = shadowBlurAmount;
        ctx.shadowColor = `rgba(${star.color}, 0.5)`;
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow for performance
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
};

export default StarBackground;
