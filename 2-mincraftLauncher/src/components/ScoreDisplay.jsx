import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Disc } from 'lucide-react';

const ScoreDisplay = ({ score, setScore, onSupernova }) => {
  const [showBlackHole, setShowBlackHole] = useState(false);

  useEffect(() => {
    if (score > 150) {
      setShowBlackHole(true);

      // Auto-reset timer (3 seconds)
      const timer = setTimeout(() => {
        setScore(0);
        setShowBlackHole(false);
      }, 3000);

      return () => clearTimeout(timer);
    } else {
      setShowBlackHole(false);
    }
  }, [score, setScore]);

  const handleBlackHoleClick = () => {
    setShowBlackHole(false); // Hide immediately on click
    onSupernova();
  };
  // fixed padding
  return (
    <div className="relative flex items-center justify-center w-48 h-14">
      <AnimatePresence mode="wait">
        {showBlackHole ? (
          <motion.button
            key="black-hole"
            initial={{ scale: 0, rotate: 0 }}
            animate={{
              scale: [0, 1.2, 0], // Grow then shrink to nothing
              rotate: 720,
              opacity: [0, 1, 0],
            }}
            transition={{ duration: 3, ease: "easeInOut" }}
            onClick={handleBlackHoleClick}
            className="absolute flex items-center justify-center w-12 h-12 bg-black rounded-full cursor-pointer group overflow-hidden"
          >
            {/* Swirling background effect */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(168,85,247,0.8)_360deg)]"
            />

            <Disc className="w-6 h-6 text-purple-400 relative z-10 animate-spin-fast" />
          </motion.button>
        ) : (
          <motion.div
            key="score"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="absolute flex items-center space-x-2 bg-surface/80 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 w-full justify-between"
          >
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-400 uppercase tracking-wider">Stars Destroyed</span>
              <motion.span
                key={score}
                initial={{ scale: 1.2, color: '#fbbf24' }}
                animate={{ scale: 1, color: '#ffffff' }}
                transition={{ duration: 0.3 }}
                className="text-xl font-bold"
              >
                {score}
              </motion.span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ScoreDisplay;
