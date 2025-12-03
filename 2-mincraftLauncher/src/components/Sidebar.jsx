import React from 'react';
import { Home, Settings, ShoppingBag, Globe, Gamepad2, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import clsx from 'clsx';

const SidebarItem = ({ icon: Icon, active, onClick, label }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className={clsx(
          "p-3 rounded-xl transition-colors duration-200 relative z-10",
          active ? "bg-primary text-white shadow-lg shadow-primary/30" : "text-gray-400 hover:text-white hover:bg-white/10"
        )}
      >
        <Icon size={24} />
      </motion.button>

      {/* Tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-full ml-4 top-1/2 -translate-y-1/2 pointer-events-none z-50"
          >
            <div className="relative">
              {/* Arrow */}
              <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[8px] border-r-white/10" />

              {/* Tooltip content */}
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg px-4 py-2 shadow-2xl">
                <span className="text-white font-medium text-sm whitespace-nowrap">
                  {label}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: 'home', path: '/', icon: Home, label: 'Home' },
    { id: 'games', path: '/quick-play', icon: Gamepad2, label: 'Quick Play' },
    { id: 'browser', path: '/servers', icon: Globe, label: 'Servers' },
    { id: 'store', path: '/store', icon: ShoppingBag, label: 'Store' },
    { id: 'friends', path: '/friends', icon: Users, label: 'Friends' },
  ];

  return (
    <div className="w-20 h-screen bg-surface border-r border-white/5 flex flex-col items-center py-6 space-y-8">
      <div className="mb-4">
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer" onClick={() => navigate('/')}>
          <img src="https://cdn-icons-png.flaticon.com/512/5968/5968863.png" alt="Logo" className="w-8 h-8" />
        </div>
      </div>

      <div className="flex flex-col space-y-4 flex-1">
        {menuItems.map(item => (
          <SidebarItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            active={location.pathname === item.path}
            onClick={() => navigate(item.path)}
          />
        ))}
      </div>

      <div className="mt-auto">
        <SidebarItem
          icon={Settings}
          label="Settings"
          active={location.pathname === '/settings'}
          onClick={() => navigate('/settings')}
        />
      </div>
    </div>
  );
};

export default Sidebar;
