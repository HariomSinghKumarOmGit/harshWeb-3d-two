import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, UserPlus, MoreVertical } from 'lucide-react';

const FriendRow = ({ name, status, activity, avatar }) => (
  <motion.div
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    className="flex items-center justify-between p-4 hover:bg-white/5 rounded-xl transition-colors group"
  >
    <div className="flex items-center space-x-4">
      <div className="relative">
        <img src={avatar} alt={name} className="w-12 h-12 rounded-full bg-gray-700" />
        <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-surface ${status === 'online' ? 'bg-green-500' : 'bg-gray-500'}`} />
      </div>
      <div>
        <h3 className="font-bold text-white">{name}</h3>
        <p className="text-sm text-gray-400">{status === 'online' ? activity : 'Offline'}</p>
      </div>
    </div>

    <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
      <button className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors">
        <MessageSquare className="w-5 h-5" />
      </button>
      <button className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors">
        <MoreVertical className="w-5 h-5" />
      </button>
    </div>
  </motion.div>
);

const Friends = () => {
  const friends = [
    { id: 1, name: "AlexSteve", status: "online", activity: "Playing BedWars", avatar: "https://cdn-icons-png.flaticon.com/512/4140/4140048.png" },
    { id: 2, name: "CraftMaster99", status: "online", activity: "In Lobby", avatar: "https://cdn-icons-png.flaticon.com/512/4140/4140047.png" },
    { id: 3, name: "BuilderBob", status: "offline", activity: "", avatar: "https://cdn-icons-png.flaticon.com/512/4140/4140037.png" },
    { id: 4, name: "RedstonePro", status: "online", activity: "Playing SkyBlock", avatar: "https://cdn-icons-png.flaticon.com/512/4140/4140051.png" },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Friends</h1>
        <button className="flex items-center space-x-2 px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors">
          <UserPlus className="w-5 h-5" />
          <span>Add Friend</span>
        </button>
      </div>

      <div className="bg-surface border border-white/5 rounded-2xl p-2">
        <div className="px-4 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider">Online — 3</div>
        {friends.filter(f => f.status === 'online').map(friend => (
          <FriendRow key={friend.id} {...friend} />
        ))}

        <div className="px-4 py-2 mt-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Offline — 1</div>
        {friends.filter(f => f.status === 'offline').map(friend => (
          <FriendRow key={friend.id} {...friend} />
        ))}
      </div>
    </div>
  );
};

export default Friends;
