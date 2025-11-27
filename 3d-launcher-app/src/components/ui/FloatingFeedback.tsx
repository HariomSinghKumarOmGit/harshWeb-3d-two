import React from 'react';

interface FloatingFeedbackProps {
  message: string;
  x: number;
  y: number;
  onComplete?: () => void;
}

/**
 * Floating feedback component
 * Shows animated floating text (e.g., "+1 💎")
 */
export const FloatingFeedback: React.FC<FloatingFeedbackProps> = ({
  message,
  x,
  y,
  onComplete,
}) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onComplete?.();
    }, 1000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className="fixed pointer-events-none z-50 float-up text-2xl font-bold text-yellow-400"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
      }}
    >
      {message}
    </div>
  );
};
