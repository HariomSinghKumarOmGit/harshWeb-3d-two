import React from 'react';
import { motion } from 'framer-motion';
import { Signal, Users, Star } from 'lucide-react';

const ServerRow = ({ name, ip, players, maxPlayers, ping, featured }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-surface/50 border border-white/5 rounded-xl p-4 flex items-center justify-between hover:bg-surface hover:border-white/10 transition-all group"
  >
    <div className="flex items-center space-x-4">
      <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center text-xl font-bold text-gray-500">
        {name.charAt(0)}
      </div>
      <div>
        <div className="flex items-center space-x-2">
          <h3 className="font-bold text-white">{name}</h3>
          {featured && <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />}
        </div>
        <p className="text-sm text-gray-500">{ip}</p>
      </div>
    </div>

    <div className="flex items-center space-x-8">
      <div className="text-right">
        <div className="flex items-center space-x-2 text-gray-400">
          <Users className="w-4 h-4" />
          <span>{players.toLocaleString()} / {maxPlayers.toLocaleString()}</span>
        </div>
        <div className="w-32 h-1.5 bg-gray-800 rounded-full mt-2 overflow-hidden">
          <div
            className="h-full bg-green-500 rounded-full"
            style={{ width: `${(players / maxPlayers) * 100}%` }}
          />
        </div>
      </div>

      <div className="flex items-center space-x-2 text-green-500">
        <Signal className="w-5 h-5" />
        <span className="text-sm font-medium">{ping}ms</span>
      </div>

      <button className="px-6 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-colors opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
        Join
      </button>
    </div>
  </motion.div>
);

const Servers = () => {
  const servers = [
    { id: 1, name: "Hypixel", ip: "mc.hypixel.net", players: 45230, maxPlayers: 100000, ping: 24, featured: true },
    { id: 2, name: "Mineplex", ip: "us.mineplex.com", players: 1240, maxPlayers: 10000, ping: 45, featured: false },
    { id: 3, name: "2b2t", ip: "2b2t.org", players: 890, maxPlayers: 1000, ping: 120, featured: false },
    { id: 4, name: "Wynncraft", ip: "play.wynncraft.com", players: 2100, maxPlayers: 5000, ping: 32, featured: true },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Multiplayer Servers</h1>
        <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors">
          Add Server
        </button>
      </div>

      <div className="space-y-3">
        {servers.map(server => (
          <ServerRow key={server.id} {...server} />
        ))}
      </div>
    </div>
  );
};

export default Servers;
