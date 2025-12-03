import React from 'react';
import { motion } from 'framer-motion';
import { Sword, Bed, Trophy, Target } from 'lucide-react';

const GameModeCard = ({ title, players, icon: Icon, color }) => (
  <motion.div
    whileHover={{ y: -5, scale: 1.02 }}
    className="bg-surface border border-white/5 rounded-2xl p-6 cursor-pointer group hover:border-primary/50 transition-all duration-300"
  >
    <div className={`w-12 h-12 rounded-xl bg-${color}-500/20 flex items-center justify-center mb-4 group-hover:bg-${color}-500/30 transition-colors`}>
      <Icon className={`w-6 h-6 text-${color}-400`} />
    </div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <div className="flex items-center justify-between">
      <span className="text-gray-400 text-sm">{players.toLocaleString()} playing</span>
      <button className="px-4 py-2 bg-white/5 hover:bg-primary hover:text-white rounded-lg text-sm font-medium transition-colors">
        Play Now
      </button>
    </div>
  </motion.div>
);

const QuickPlay = () => {
  const games = [
    { id: 1, title: "BedWars", players: 12450, icon: Bed, color: "red" },
    { id: 2, title: "SkyWars", players: 8320, icon: Sword, color: "blue" },
    { id: 3, title: "Duels", players: 4100, icon: Target, color: "green" },
    { id: 4, title: "UHC Champions", players: 2100, icon: Trophy, color: "yellow" },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white">Quick Play</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map(game => (
          <GameModeCard key={game.id} {...game} />
        ))}
      </div>
    </div>
  );
};

export default QuickPlay;
