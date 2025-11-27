import React from 'react';

/**
 * Footer network bar component
 * Spans center from left 1/3 to right 1/3 with solid black background
 */
export const FooterBar = () => {
  const [ping, setPing] = React.useState(42);
  const [serverStatus, setServerStatus] = React.useState('online');

  // Simulate ping updates
  React.useEffect(() => {
    const interval = setInterval(() => {
      setPing(Math.floor(Math.random() * 50) + 20);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-0 left-1/3 right-1/3 bg-black border-t border-gray-800 px-6 py-3 z-ui">
      <div className="flex items-center justify-between text-sm">
        {/* Server Status */}
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${serverStatus === 'online' ? 'bg-green-500' : 'bg-red-500'}`} />
          <span className="text-gray-400">Server:</span>
          <span className="text-white font-medium">
            {serverStatus === 'online' ? 'Online' : 'Offline'}
          </span>
        </div>

        {/* Ping */}
        <div className="flex items-center space-x-2">
          <span className="text-gray-400">Ping:</span>
          <span className={`font-medium ${ping < 50 ? 'text-green-400' : ping < 100 ? 'text-yellow-400' : 'text-red-400'}`}>
            {ping}ms
          </span>
        </div>

        {/* Network Info */}
        <div className="flex items-center space-x-2">
          <span className="text-gray-400">Network:</span>
          <span className="text-white font-medium">Stable</span>
        </div>
      </div>
    </div>
  );
};
