import { useState } from 'react';
import { Search, Zap, TrendingUp, ArrowRight } from 'lucide-react';

export default function Hero({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
      setSearchQuery('');
    }
  };

  const suggestions = [
    'Payment processing APIs',
    'AI image generation',
    'Email delivery services',
    'Text-to-speech solutions',
  ];

  return (
    <div className="relative min-h-[600px] bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden pt-20">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-500/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full text-white text-sm font-medium backdrop-blur-sm">
            <Zap className="w-4 h-4" />
            Powered by OpenAI GPT-4
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Find Your Perfect <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">API</span>
        </h1>

        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
          Like Google Flights for APIs. Discover, compare, and integrate the best APIs for your project with AI-powered recommendations.
        </p>

        {/* Search Box */}
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-16">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
            <div className="relative flex items-center bg-white rounded-xl shadow-2xl overflow-hidden">
              <Search className="w-6 h-6 text-gray-400 ml-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search APIs... (e.g., 'I need payment processing')"
                className="flex-1 px-4 py-4 text-lg outline-none bg-transparent text-gray-900 placeholder-gray-500"
              />
              <button
                type="submit"
                className="mr-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg transition transform hover:scale-105"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </form>

        {/* Suggestions */}
        <div className="space-y-4">
          <p className="text-gray-400 text-sm font-medium">Popular searches:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => {
                  setSearchQuery(suggestion);
                  onSearch(suggestion);
                }}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-full text-sm font-medium transition"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-3 gap-8 max-w-xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">50+</div>
            <p className="text-gray-400 text-sm">Premium APIs</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">AI</div>
            <p className="text-gray-400 text-sm">Powered Search</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">99.9%</div>
            <p className="text-gray-400 text-sm">Uptime</p>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </div>
  );
}
