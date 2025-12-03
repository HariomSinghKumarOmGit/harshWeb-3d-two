import React from 'react';
import Sidebar from './Sidebar';
import StarBackground from './StarBackground';

const Layout = ({ children, score, setScore, supernovaActive, onSupernovaComplete }) => {
  return (
    <div className="flex h-screen w-full bg-background overflow-hidden selection:bg-primary/30 selection:text-white">
      <Sidebar />
      <main className="flex-1 h-full overflow-y-auto overflow-x-hidden relative">
        {/* Starry Background */}
        <StarBackground
          onScoreChange={setScore}
          supernovaActive={supernovaActive}
          onSupernovaComplete={onSupernovaComplete}
        />

        <div className="relative z-10 p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
