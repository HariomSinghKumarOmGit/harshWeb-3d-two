import React from 'react';
import { motion } from 'framer-motion';

const SettingItem = ({ label, value, unit }) => (
  <div className="flex items-center justify-between p-4 bg-surface/50 rounded-xl border border-white/5">
    <span className="text-white font-medium">{label}</span>
    <div className="flex items-center space-x-2">
      <input
        type="range"
        min="0"
        max="100"
        defaultValue={value}
        className="w-48 accent-primary"
      />
      <span className="text-gray-400 w-16 text-right">{value}{unit}</span>
    </div>
  </div>
);

const Settings = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-white">Settings</h1>

      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-white mb-4">Game Settings</h2>
          <div className="space-y-3">
            <SettingItem label="Allocated Memory" value={4} unit="GB" />
            <SettingItem label="Render Distance" value={12} unit=" chunks" />
            <SettingItem label="Max FPS" value={60} unit=" fps" />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-white mb-4">Graphics</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-surface/50 rounded-xl border border-white/5">
              <span className="text-white font-medium">Graphics Quality</span>
              <select className="bg-surface border border-white/10 rounded-lg px-4 py-2 text-white">
                <option>Low</option>
                <option>Medium</option>
                <option selected>High</option>
                <option>Ultra</option>
              </select>
            </div>
            <div className="flex items-center justify-between p-4 bg-surface/50 rounded-xl border border-white/5">
              <span className="text-white font-medium">VSync</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors">
            Reset
          </button>
          <button className="px-6 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
