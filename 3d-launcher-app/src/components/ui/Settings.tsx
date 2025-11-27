import React from 'react';

interface SettingsProps {
  username?: string;
  volume?: number;
  theme?: 'black' | 'white';
  onVolumeChange?: (volume: number) => void;
  onThemeToggle?: () => void;
}

/**
 * Settings panel component
 * Displays profile name, volume slider, and theme toggle
 */
export const Settings: React.FC<SettingsProps> = ({
  username = 'Player',
  volume = 50,
  theme = 'black',
  onVolumeChange,
  onThemeToggle,
}) => {
  return (
    <div className="glass rounded-lg p-4 space-y-3">
      <h3 className="text-white text-sm font-semibold mb-3">Settings</h3>

      {/* Profile Name */}
      <div>
        <label className="text-gray-400 text-xs">Profile</label>
        <p className="text-white text-sm font-medium">{username}</p>
      </div>

      {/* Volume Slider */}
      <div>
        <label className="text-gray-400 text-xs">Volume</label>
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(e) => onVolumeChange?.(Number(e.target.value))}
          className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
        />
        <span className="text-white text-xs">{volume}%</span>
      </div>

      {/* Theme Toggle */}
      <div className="flex items-center justify-between">
        <label className="text-gray-400 text-xs">Theme</label>
        <button
          onClick={onThemeToggle}
          className="px-3 py-1 rounded bg-gray-700 text-white text-xs hover:bg-gray-600 smooth-transition"
        >
          {theme === 'black' ? '🌙 Dark' : '☀️ Light'}
        </button>
      </div>
    </div>
  );
};
