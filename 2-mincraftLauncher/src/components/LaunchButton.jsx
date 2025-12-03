import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

const LaunchButton = () => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group relative w-full max-w-md mx-auto bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white rounded-xl p-1 shadow-xl shadow-green-900/20 transition-all duration-300"
    >
      <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative flex items-center justify-between px-6 py-4 bg-black/10 rounded-lg backdrop-blur-sm border border-white/10">
        <div className="flex flex-col items-start">
          <span className="text-xs font-medium text-green-100 uppercase tracking-wider mb-1">Ready to play</span>
          <span className="text-2xl font-bold tracking-tight">LAUNCH GAME</span>
          <span className="text-xs text-green-100/80 mt-1">Version 1.20.4 • Fabric</span>
        </div>

        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
          <Play fill="currentColor" className="w-6 h-6 ml-1" />
        </div>
      </div>
    </motion.button>
  );
};

export default LaunchButton;
