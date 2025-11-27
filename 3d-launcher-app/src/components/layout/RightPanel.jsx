import React, { useState } from 'react';
import { LoginProfile } from '../ui/LoginProfile';
import { FriendList } from '../ui/FriendList';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Right panel component
 * Icon-only design with hover labels and pop-out panels for Profile/Friends
 */
export const RightPanel = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('Guest');
  const [activePanel, setActivePanel] = useState(null); // 'profile', 'friends', or null

  const handleLogin = (name) => {
    setUsername(name);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('Guest');
  };

  const togglePanel = (panel) => {
    setActivePanel(activePanel === panel ? null : panel);
  };

  return (
    <div className="h-full flex flex-col items-end p-4 space-y-4 pointer-events-auto">
      {/* Profile Icon */}
      <div className="relative group flex items-center flex-row-reverse">
        <button
          onClick={() => togglePanel('profile')}
          className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl smooth-transition ${activePanel === 'profile'
              ? 'bg-blue-600 text-white shadow-lg scale-110'
              : 'glass text-gray-300 hover:bg-white/20 hover:scale-105'
            }`}
        >
          {isLoggedIn ? (
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center text-white text-xs font-bold">
              {username[0]}
            </div>
          ) : (
            '👤'
          )}
        </button>

        {/* Hover Label */}
        <div className="absolute right-14 px-3 py-1 bg-black/80 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none backdrop-blur-sm border border-white/10">
          {isLoggedIn ? 'My Profile' : 'Login'}
        </div>

        {/* Profile Pop-out */}
        <AnimatePresence>
          {activePanel === 'profile' && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="absolute right-14 top-0 w-64 z-50"
            >
              <LoginProfile
                isLoggedIn={isLoggedIn}
                username={username}
                onLogin={handleLogin}
                onLogout={handleLogout}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Friends Icon */}
      <div className="relative group flex items-center flex-row-reverse">
        <button
          onClick={() => togglePanel('friends')}
          className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl smooth-transition ${activePanel === 'friends'
              ? 'bg-green-600 text-white shadow-lg scale-110'
              : 'glass text-gray-300 hover:bg-white/20 hover:scale-105'
            }`}
        >
          👥
        </button>

        {/* Hover Label */}
        <div className="absolute right-14 px-3 py-1 bg-black/80 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none backdrop-blur-sm border border-white/10">
          Friends
        </div>

        {/* Friends Pop-out */}
        <AnimatePresence>
          {activePanel === 'friends' && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="absolute right-14 top-0 w-64 z-50"
            >
              <FriendList />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
