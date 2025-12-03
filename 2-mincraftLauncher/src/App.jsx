import React from 'react';
import Layout from './components/Layout';
import LaunchButton from './components/LaunchButton';
import NewsCard from './components/NewsCard';
import { User, Bell, Search } from 'lucide-react';

function App() {
  const newsItems = [
    {
      id: 1,
      title: "Winter Collection 2024 Out Now!",
      category: "Cosmetics",
      date: "2 days ago",
      image: "https://images.unsplash.com/photo-1607988795691-3d0147b43231?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Major Performance Update",
      category: "Patch Notes",
      date: "1 week ago",
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Community Event: Build Battle",
      category: "Event",
      date: "2 weeks ago",
      image: "https://images.unsplash.com/photo-1599582276573-047a06692997?q=80&w=2070&auto=format&fit=crop"
    }
  ];

  return (
    <Layout>
      {/* Top Bar */}
      <header className="flex items-center justify-between mb-12">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-white tracking-tight">Home</h1>
          <div className="h-6 w-px bg-white/10" />
          <span className="text-gray-400 text-sm">20,700 Online</span>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
            <input
              type="text"
              placeholder="Quick Play..."
              className="bg-surface border border-white/5 rounded-full py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-white/20 transition-colors w-64"
            />
          </div>
          <button className="p-2 text-gray-400 hover:text-white transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-3 pl-4 border-l border-white/10">
            <div className="w-8 h-8 bg-gradient-to-tr from-primary to-accent rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-medium text-white">Guest User</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden mb-12 aspect-[21/9] group">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img
          src="https://images.unsplash.com/photo-1587573089734-09cb69c0f2b4?q=80&w=2070&auto=format&fit=crop"
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-8 text-center">
          <div className="mb-8 transform group-hover:scale-105 transition-transform duration-500">
            <img
              src="https://raw.githubusercontent.com/gist/HariomSingh/12345/raw/steve-3d.png"
              alt=""
              className="w-32 h-32 object-contain mb-4 hidden"
            // Placeholder for 3D character if needed
            />
          </div>

          <LaunchButton />
        </div>
      </section>

      {/* News Grid */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Latest News</h2>
          <button className="text-sm text-primary hover:text-primary/80 transition-colors">View all</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {newsItems.map(item => (
            <NewsCard key={item.id} {...item} />
          ))}
        </div>
      </section>
    </Layout>
  );
}

export default App;
