import React, { useState } from 'react';
import { LoginProfile } from '../ui/LoginProfile';
import { FriendList } from '../ui/FriendList';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Right panel component
 * Large Login button at top, Friends button at bottom
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
    <div className="h-full flex flex-col justify-between items-end p-4 pointer-events-auto">
      {/* Top: Login / Profile Button */}
      <div className="relative">
        <button
          onClick={() => togglePanel('profile')}
          className={`px-6 py-3 rounded-xl font-bold text-lg smooth-transition shadow-lg flex items-center space-x-2 ${activePanel === 'profile'
            ? 'bg-blue-600 text-white scale-105'
            : 'glass text-white hover:bg-white/20 hover:scale-105'
            }`}
        >
          {isLoggedIn ? (
            <>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center text-xs">
                {username[0]}
              </div>
              <span>{username}</span>
            </>
          ) : (
            <>
              <span>Login</span>
              <span className="text-xl">👤</span>
            </>
          )}
        </button>

        {/* Profile Pop-out */}
        <AnimatePresence>
          {activePanel === 'profile' && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-16 w-64 z-50"
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

      {/* Bottom: Friends Button */}
      <div className="relative">
        <button
          onClick={() => togglePanel('friends')}
          className={`px-6 py-3 rounded-xl font-bold text-lg smooth-transition shadow-lg flex items-center space-x-2 ${activePanel === 'friends'
              ? 'bg-green-600 text-white scale-105'
              : 'glass text-white hover:bg-white/20 hover:scale-105'
            }`}
        >
          <span>Friends</span>
          <span className="text-xl">👥</span>
        </button>

        {/* Friends Pop-out */}
        <AnimatePresence>
          {activePanel === 'friends' && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 bottom-16 w-64 z-50"
            >
              <FriendList />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
