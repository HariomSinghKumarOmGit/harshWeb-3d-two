import React from 'react';

/**
 * Friend list component
 * Displays list of friends with online/offline status
 */
export const FriendList = ({ friends = [] }) => {
  const defaultFriends = friends.length > 0 ? friends : [
    { id: '1', name: 'Alex', status: 'online' },
    { id: '2', name: 'Sam', status: 'online' },
    { id: '3', name: 'Jordan', status: 'offline' },
    { id: '4', name: 'Casey', status: 'offline' },
  ];

  return (
    <div className="glass rounded-lg p-4 h-full">
      <h3 className="text-white text-sm font-semibold mb-3">Friends</h3>
      <div className="space-y-2 overflow-y-auto max-h-64">
        {defaultFriends.map((friend) => (
          <div
            key={friend.id}
            className="flex items-center space-x-3 p-2 rounded hover:bg-white/5 smooth-transition cursor-pointer"
          >
            {/* Avatar */}
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
              {friend.name[0]}
            </div>

            {/* Name and Status */}
            <div className="flex-1">
              <p className="text-white text-sm">{friend.name}</p>
              <div className="flex items-center space-x-1">
                <div
                  className={`w-2 h-2 rounded-full ${friend.status === 'online' ? 'bg-green-500' : 'bg-gray-500'
                    }`}
                />
                <span className="text-gray-400 text-xs capitalize">{friend.status}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
