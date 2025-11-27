import React, { useState } from 'react';
import { LoginProfile } from '../ui/LoginProfile';
import { FriendList } from '../ui/FriendList';

/**
 * Right panel component
 * Contains login/profile at top and friend list at bottom
 */
export const RightPanel = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('Guest');

  const handleLogin = (name) => {
    setUsername(name);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('Guest');
  };

  return (
    <div className="h-full flex flex-col p-4 space-y-4">
      {/* Login/Profile Section */}
      <div>
        <LoginProfile
          isLoggedIn={isLoggedIn}
          username={username}
          onLogin={handleLogin}
          onLogout={handleLogout}
        />
      </div>

      {/* Friend List Section */}
      <div className="flex-1 overflow-hidden">
        <FriendList />
      </div>
    </div>
  );
};
