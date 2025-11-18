import { useState } from 'react';
import { Search } from 'lucide-react';

export default function Hero({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentExample, setCurrentExample] = useState(0);

  const examples = [
    'Payment processing APIs',
    'AI image generation',
    'Email delivery services',
    'Text-to-speech solutions',
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  // Rotate examples
  useState(() => {
    const interval = setInterval(() => {
      setCurrentExample((prev) => (prev + 1) % examples.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen bg-black overflow-hidden pt-20 pb-12 flex items-center justify-center">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(90deg, rgba(34, 211, 238, 0.1) 1px, transparent 1px), linear-gradient(rgba(34, 211, 238, 0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Animated Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500/20 rounded-full mix-blend-screen filter blur-3xl animate-blob" />
        <div className="absolute top-40 right-10 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-screen filter blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute -bottom-20 left-1/3 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-screen filter blur-3xl animate-blob animation-delay-4000" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main Headline */}
        <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Find Your Perfect <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">API</span>
        </h1>

        {/* Subheadline */}
        <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          Rho finds your perfect API match. Intelligently discover and compare what powers innovation.
        </p>

        {/* Demo Search Box */}
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-16">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 rounded-xl blur opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
            <div className="relative flex items-center bg-black rounded-xl shadow-2xl border border-gray-800 overflow-hidden">
              <Search className="w-6 h-6 text-cyan-400 ml-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search APIs… ex: image generation, payments, speech-to-text"
                className="flex-1 px-4 py-4 text-lg outline-none bg-transparent text-white placeholder-gray-500"
              />
              <button
                type="submit"
                className="mr-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition transform hover:scale-105"
              >
                Search
              </button>
            </div>
          </div>
        </form>

        {/* Example Terms Carousel */}
        <div className="space-y-3">
          <p className="text-gray-500 text-sm font-medium">Try searching for:</p>
          <div className="h-8 flex items-center justify-center">
            <div className="relative overflow-hidden">
              <p className="text-cyan-300 font-semibold transition-all duration-500">
                {examples[currentExample]}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
