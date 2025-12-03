import React, { useEffect, useRef, useState } from 'react';

const StarBackground = ({ onScoreChange, supernovaActive, onSupernovaComplete }) => {
  const canvasRef = useRef(null);
  const mousePos = useRef({ x: -1000, y: -1000 });
  const scoreRef = useRef(0);
  const supernovaState = useRef({ active: false, phase: 'idle', timer: 0 });

  useEffect(() => {
    if (supernovaActive && !supernovaState.current.active) {
      supernovaState.current = { active: true, phase: 'suck', timer: 0 };
    }
  }, [supernovaActive]);

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
    ];

    // 113 degrees angle
    const angle = 113 * (Math.PI / 180);
    const driftSpeedX = (canvas.width / (180 * 60)); // 10 minutes = 600 seconds * 60 fps
    const driftSpeedY = driftSpeedX * Math.tan(angle);

    const stars = Array.from({ length: 500 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      baseX: 0,
      baseY: 0,
      size: Math.random() * 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: Math.random(),
      speed: Math.random() * 0.02 + 0.005,
      direction: Math.random() > 0.5 ? 1 : -1,
      active: true
    }));

    // Track explosions
    const explosions = [];

    // Replenish stars every 2 minutes
    const replenishInterval = setInterval(() => {
      stars.forEach(star => {
        if (!star.active) {
          star.x = Math.random() * canvas.width;
          star.y = Math.random() * canvas.height;
          star.active = true;
        }
      });
    }, 120000); // 2 minutes

    const draw = () => {
      // Supernova Animation Logic
      if (supernovaState.current.active) {
        supernovaState.current.timer++;
        const { phase, timer } = supernovaState.current;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        if (phase === 'suck') {
          // Phase 1: Suck stars into center (Black Hole) - 2.5 seconds (150 frames)
          ctx.fillStyle = `rgba(0, 0, 0, 0.3)`; // Trail effect
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          // Draw Black Hole
          ctx.beginPath();
          ctx.arc(centerX, centerY, 30, 0, Math.PI * 2);
          ctx.fillStyle = 'black';
          ctx.shadowBlur = 20;
          ctx.shadowColor = 'purple';
          ctx.fill();
          ctx.shadowBlur = 0;

          stars.forEach(star => {
            if (!star.active) return;
            const dx = centerX - star.x;
            const dy = centerY - star.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 20) {
              star.active = false;
            } else {
              // Accelerate towards center - VERY FAST
              const force = 0.3 + (300 / (dist + 1)); // Doubled force
              star.x += dx * force;
              star.y += dy * force;

              ctx.beginPath();
              ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(${star.color}, 1)`;
              ctx.fill();
            }
          });

          if (timer > 150) { // 2.5 seconds suck
            supernovaState.current.phase = 'explode';
            supernovaState.current.timer = 0;
          }
        } else if (phase === 'explode') {
          // Phase 2: Supernova Explosion (White/Gold Flash) - 2.5 seconds (150 frames)
          const progress = Math.min(1, timer / 150);

          // Expanding light from center
          const maxRadius = Math.max(canvas.width, canvas.height) * 1.5;
          // Exponential expansion for "explosion" feel
          const currentRadius = maxRadius * Math.pow(progress, 2);

          const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, currentRadius);
          gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
          gradient.addColorStop(0.2, 'rgba(255, 255, 224, 1)'); // Light Yellow
          gradient.addColorStop(0.4, 'rgba(255, 215, 0, 0.8)'); // Gold
          gradient.addColorStop(1, 'rgba(255, 215, 0, 0)');

          ctx.fillStyle = '#000'; // Clear previous frame
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          ctx.beginPath();
          ctx.arc(centerX, centerY, currentRadius, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();

          // Full whiteout at peak
          if (progress > 0.5) {
            ctx.fillStyle = `rgba(255, 255, 255, ${(progress - 0.5) * 2})`;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
          }

          if (timer > 150) {
            supernovaState.current.phase = 'reset';
            supernovaState.current.timer = 0;

            // Reset stars and score
            stars.forEach(star => {
              star.x = Math.random() * canvas.width;
              star.y = Math.random() * canvas.height;
              star.active = true;
            });
            scoreRef.current = 0;
            if (onScoreChange) onScoreChange(0); // Reset score display
            if (onSupernovaComplete) onSupernovaComplete();
          }
        } else if (phase === 'reset') {
          supernovaState.current = { active: false, phase: 'idle', timer: 0 };
        }

        animationFrameId = requestAnimationFrame(draw);
        return;
      }

      // Normal Draw Loop
      ctx.fillStyle = '#050505'; // Very dark background
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw explosions first (behind stars)
      explosions.forEach((explosion, index) => {
        explosion.age++;
        const progress = explosion.age / explosion.maxAge;

        if (progress >= 1) {
          explosions.splice(index, 1);
          return;
        }

        // Animate expansion and fade
        const currentRadius = 16 * progress;
        const alpha = (1 - progress) * 3; // 300% brightness (will be clamped)

        // Draw rays emanating from center
        const numRays = 12;
        const rayLength = 8; // Fixed 8px ray length

        for (let i = 0; i < numRays; i++) {
          const angle = (Math.PI * 2 * i) / numRays;
          const rayEndX = explosion.x + Math.cos(angle) * rayLength;
          const rayEndY = explosion.y + Math.sin(angle) * rayLength;

          // Create gradient for each ray
          const rayGradient = ctx.createLinearGradient(
            explosion.x, explosion.y,
            rayEndX, rayEndY
          );
          rayGradient.addColorStop(0, `rgba(${explosion.color}, ${Math.min(1, alpha)})`);
          rayGradient.addColorStop(0.5, `rgba(${explosion.color}, ${Math.min(0.2, alpha * 0.2)})`);
          rayGradient.addColorStop(1, `rgba(${explosion.color}, 0)`);

          // Draw ray
          ctx.strokeStyle = rayGradient;
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(explosion.x, explosion.y);
          ctx.lineTo(rayEndX, rayEndY);
          ctx.stroke();
        }

        // Draw intense outer glow
        const outerGradient = ctx.createRadialGradient(
          explosion.x, explosion.y, 0,
          explosion.x, explosion.y, currentRadius * 1.5
        );
        outerGradient.addColorStop(0, `rgba(${explosion.color}, ${Math.min(1, alpha)})`);
        outerGradient.addColorStop(0.4, `rgba(${explosion.color}, ${Math.min(0.3, alpha * 0.3)})`);
        outerGradient.addColorStop(1, `rgba(${explosion.color}, 0)`);

        ctx.beginPath();
        ctx.arc(explosion.x, explosion.y, currentRadius * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = outerGradient;
        ctx.fill();

        // Draw super bright core (7px)
        ctx.beginPath();
        ctx.arc(explosion.x, explosion.y, 7 * progress, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${explosion.color}, ${Math.min(1, alpha)})`;
        ctx.shadowBlur = 30;
        ctx.shadowColor = `rgba(${explosion.color}, 1)`;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Add white hot center flash
        ctx.beginPath();
        ctx.arc(explosion.x, explosion.y, 4 * progress, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1, alpha * 0.8)})`;
        ctx.shadowBlur = 40;
        ctx.shadowColor = `rgba(255, 255, 255, 0.8)`;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      stars.forEach((star, index) => {
        if (!star.active) return;

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

        // Check for blast (cursor within 20px for easier triggering)
        if (distance < 20) {
          // Increment score
          scoreRef.current += 1;
          if (onScoreChange) {
            onScoreChange(scoreRef.current);
          }

          // Create explosion
          explosions.push({
            x: star.x,
            y: star.y,
            color: star.color,
            age: 0,
            maxAge: 18 // 18 frames = 0.3 seconds at 60fps
          });
          // Remove star
          star.active = false;
          return;
        }

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
          if (distance < 45) {
            brightnessBoost = 1.0; // 100% brighter (full brightness) within 25px
            shadowBlurAmount = 15;
          } else if (distance < 85) {
            // Fade from 25px to 45px
            const fadeAmount = (85 - distance) / 40; // 20px range (45 - 25)
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
      clearInterval(replenishInterval);
      cancelAnimationFrame(animationFrameId);
    };
  }, [supernovaActive]); // Re-run effect when supernova triggers

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
};

export default StarBackground;
