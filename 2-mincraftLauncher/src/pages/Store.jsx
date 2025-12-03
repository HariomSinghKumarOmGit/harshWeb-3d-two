import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Sparkles } from 'lucide-react';

const StoreItem = ({ name, price, type, image, rarity }) => {
  const rarityColors = {
    common: "gray",
    rare: "blue",
    epic: "purple",
    legendary: "orange"
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-surface border border-white/5 rounded-2xl overflow-hidden group"
    >
      <div className="aspect-square bg-black/20 relative p-4 flex items-center justify-center">
        <div className={`absolute top-3 right-3 px-2 py-1 rounded text-xs font-bold uppercase bg-${rarityColors[rarity]}-500/20 text-${rarityColors[rarity]}-400 border border-${rarityColors[rarity]}-500/30`}>
          {rarity}
        </div>
        <img src={image} alt={name} className="w-3/4 h-3/4 object-contain drop-shadow-2xl transform group-hover:scale-110 transition-transform duration-500" />
      </div>

      <div className="p-4">
        <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">{type}</div>
        <h3 className="text-lg font-bold text-white mb-3">{name}</h3>

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-green-400">{price} Coins</span>
          <button className="p-2 bg-white/5 hover:bg-primary hover:text-white rounded-lg transition-colors">
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const Store = () => {
  const items = [
    { id: 1, name: "Dragon Wings", price: 1500, type: "Wings", rarity: "legendary", image: "https://cdn-icons-png.flaticon.com/512/2609/2609200.png" },
    { id: 2, name: "Diamond Cape", price: 800, type: "Cape", rarity: "epic", image: "https://cdn-icons-png.flaticon.com/512/9630/9630384.png" },
    { id: 3, name: "Mini Golem", price: 1200, type: "Pet", rarity: "rare", image: "https://cdn-icons-png.flaticon.com/512/3062/3062634.png" },
    { id: 4, name: "Neon Sword", price: 500, type: "Weapon Skin", rarity: "common", image: "https://cdn-icons-png.flaticon.com/512/10095/10095280.png" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Store</h1>
          <p className="text-gray-400">Customize your character with premium cosmetics</p>
        </div>
        <div className="flex items-center space-x-2 bg-surface px-4 py-2 rounded-xl border border-white/10">
          <Sparkles className="w-5 h-5 text-yellow-400" />
          <span className="font-bold text-white">2,450 Coins</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map(item => (
          <StoreItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Store;
