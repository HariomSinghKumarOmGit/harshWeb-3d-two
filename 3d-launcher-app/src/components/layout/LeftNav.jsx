import React, { useState } from 'react';
import { Settings } from '../ui/Settings';

/**
 * Left navigation bar component
 * Contains navigation items and settings panel at bottom
 */
export const LeftNav = () => {
  const [activeItem, setActiveItem] = useState('home');
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
    <div className="h-full flex flex-col p-4 space-y-4">
      {/* Navigation Items */}
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveItem(item.id)}
            className={`w-full px-4 py-3 rounded-lg text-left smooth-transition flex items-center space-x-3 ${activeItem === item.id
                ? 'bg-blue-600 text-white'
                : 'glass text-gray-300 hover:bg-white/10'
              }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Settings at Bottom */}
      <Settings
        username="Player"
        volume={volume}
        theme={theme}
        onVolumeChange={setVolume}
        onThemeToggle={() => setTheme(theme === 'black' ? 'white' : 'black')}
      />
    </div>
  );
};
