import React from 'react';
import { motion } from 'framer-motion';

const NewsCard = ({ title, image, category, date }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="relative group cursor-pointer overflow-hidden rounded-2xl aspect-video"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
      />

      <div className="absolute bottom-0 left-0 right-0 p-5 z-20">
        <div className="flex items-center space-x-2 mb-2">
          <span className="px-2 py-1 bg-primary/80 backdrop-blur-md rounded-md text-[10px] font-bold uppercase tracking-wider text-white">
            {category}
          </span>
          <span className="text-gray-300 text-xs">{date}</span>
        </div>
        <h3 className="text-xl font-bold text-white leading-tight group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
      </div>
    </motion.div>
  );
};

export default NewsCard;
