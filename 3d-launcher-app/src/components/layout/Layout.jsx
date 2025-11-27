import React from 'react';
import { LeftNav } from './LeftNav';
import { RightPanel } from './RightPanel';
import { FooterBar } from './FooterBar';

/**
 * Main layout component
 * Implements 3-column grid layout (1/5 - 3/5 - 1/5)
 * UI layer floats on top of 3D world
 */
export const Layout = ({ children }) => {
  return (
    <>
      {/* Main Grid Layout */}
      <div className="grid-layout layer-ui">
        {/* Left Column - Navigation */}
        <div className="bg-transparent">
          <LeftNav />
        </div>

        {/* Middle Column - Empty (3D world shows through) */}
        <div className="bg-transparent pointer-events-none">
          {children}
        </div>

        {/* Right Column - Profile & Friends */}
        <div className="bg-transparent">
          <RightPanel />
        </div>
      </div>

      {/* Footer Network Bar */}
      <FooterBar />
    </>
  );
};
