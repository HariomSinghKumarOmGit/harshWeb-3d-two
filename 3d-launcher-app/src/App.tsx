import { Layout } from './components/layout/Layout';
import { World } from './components/world/World';
import './index.css';

/**
 * Main App component
 * Combines UI Layer (Layout) and 3D World Layer
 */
function App() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Layer 2: 3D World (behind) */}
      <World />

      {/* Layer 1: UI Overlay (on top) */}
      <Layout />
    </div>
  );
}

export default App;
