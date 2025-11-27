import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings } from '../ui/Settings';

/**
 * Left navigation bar component
 * Icon-only design with hover labels and pop-out settings
 */
export const LeftNav = () => {
  const [activeItem, setActiveItem] = useState('home');
  const [showSettings, setShowSettings] = useState(false);
  const [volume, setVolume] = useState(50);
  const [theme, setTheme] = useState('black');

  const navItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'version', label: 'Version', icon: '📦' },
    { id: 'server', label: 'Server', icon: '🌐' },
    { id: 'explore', label: 'Explore', icon: '🧭' },
    { id: 'news', label: 'News', icon: '📰' },
    { id: 'store', label: 'Store', icon: '🛒' },
  ];

  return (
    <div className="h-full flex flex-col p-4 space-y-4 pointer-events-auto">
      {/* Navigation Items */}
      <nav className="flex-1 space-y-4 flex flex-col items-start">
        {navItems.map((item) => (
          <div key={item.id} className="relative group flex items-center">
            <button
              onClick={() => setActiveItem(item.id)}
              className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl smooth-transition ${activeItem === item.id
                  ? 'bg-blue-600 text-white shadow-lg scale-110'
                  : 'glass text-gray-300 hover:bg-white/20 hover:scale-105'
                }`}
            >
              {item.icon}
            </button>

            {/* Hover Label */}
            <div className="absolute left-14 px-3 py-1 bg-black/80 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none backdrop-blur-sm border border-white/10">
              {item.label}
            </div>
          </div>
        ))}
      </nav>

      {/* Settings Icon at Bottom */}
      <div className="relative">
        <button
          onClick={() => setShowSettings(!showSettings)}
          className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl smooth-transition ${showSettings
              ? 'bg-gray-700 text-white shadow-lg'
              : 'glass text-gray-300 hover:bg-white/20 hover:rotate-90'
            }`}
        >
          ⚙️
        </button>

        {/* Settings Pop-out */}
        <AnimatePresence>
          {showSettings && (
            <motion.div
              initial={{ opacity: 0, x: -20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -20, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="absolute left-14 bottom-0 w-64 z-50"
            >
              <Settings
                username="Player"
                volume={volume}
                theme={theme}
                onVolumeChange={setVolume}
                onThemeToggle={() => setTheme(theme === 'black' ? 'white' : 'black')}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
