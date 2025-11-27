import React, { useState } from 'react';

interface LoginProfileProps {
  isLoggedIn?: boolean;
  username?: string;
  onLogin?: (username: string) => void;
  onLogout?: () => void;
}

/**
 * Login/Profile component
 * Shows login form or user profile based on auth state
 */
export const LoginProfile: React.FC<LoginProfileProps> = ({
  isLoggedIn = false,
  username = 'Guest',
  onLogin,
  onLogout,
}) => {
  const [inputUsername, setInputUsername] = useState('');

  const handleLogin = () => {
    if (inputUsername.trim()) {
      onLogin?.(inputUsername);
      setInputUsername('');
    }
  };

  if (isLoggedIn) {
    return (
      <div className="glass rounded-lg p-4">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center text-white text-lg font-bold">
            {username[0]}
          </div>
          <div>
            <p className="text-white font-semibold">{username}</p>
            <p className="text-green-400 text-xs">● Online</p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded smooth-transition text-sm"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="glass rounded-lg p-4">
      <h3 className="text-white text-sm font-semibold mb-3">Login</h3>
      <input
        type="text"
        placeholder="Username"
        value={inputUsername}
        onChange={(e) => setInputUsername(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
        className="w-full px-3 py-2 bg-gray-800 text-white rounded mb-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleLogin}
        className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded smooth-transition text-sm"
      >
        Login
      </button>
    </div>
  );
};
