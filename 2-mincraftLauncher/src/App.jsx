import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import QuickPlay from './pages/QuickPlay';
import Servers from './pages/Servers';
import Store from './pages/Store';
import Friends from './pages/Friends';
import Settings from './pages/Settings';

function App() {
  const [score, setScore] = React.useState(0);
  const [supernovaActive, setSupernovaActive] = React.useState(false);

  const handleSupernova = () => {
    setSupernovaActive(true);
  };

  const handleSupernovaComplete = () => {
    setSupernovaActive(false);
    setScore(0);
  };

  return (
    <BrowserRouter>
      <Layout
        score={score}
        setScore={setScore}
        supernovaActive={supernovaActive}
        onSupernovaComplete={handleSupernovaComplete}
      >
        <Routes>
          <Route path="/" element={<Home score={score} setScore={setScore} onSupernova={handleSupernova} />} />
          <Route path="/quick-play" element={<QuickPlay />} />
          <Route path="/servers" element={<Servers />} />
          <Route path="/store" element={<Store />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
