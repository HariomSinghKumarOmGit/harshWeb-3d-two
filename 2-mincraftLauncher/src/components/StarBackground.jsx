import React, { useEffect, useRef } from 'react';

const StarBackground = () => {
  const canvasRef = useRef(null);

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

    const colors = [
      '255, 255, 255', // White
      '253, 224, 71',  // Yellow
      '167, 139, 250', // Purple
      '244, 114, 182', // Pink
      '96, 165, 250'   // Blue
    ];

    // 23 degrees upward angle
    const angle = 23 * (Math.PI / 180);
    const driftSpeedX = -(canvas.width / (360 * 60)); // 10 minutes = 600 seconds * 60 fps
    const driftSpeedY = driftSpeedX * Math.tan(angle); // Upward at 23 degrees

    const stars = Array.from({ length: 200 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
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
        if (star.x < -10) {
          star.x = canvas.width + 10;
        }
        if (star.y < -10) {
          star.y = canvas.height + 10;
        }
        if (star.y > canvas.height + 10) {
          star.y = -10;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${star.color}, ${star.opacity})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = `rgba(${star.color}, 0.5)`;
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow for performance
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
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
