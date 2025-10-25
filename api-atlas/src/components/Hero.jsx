import { useState } from 'react';
import { Search, TrendingUp, Clock, Star } from 'lucide-react';

const Hero = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  const exampleQueries = [
    'image generation API',
    'send transactional emails',
    'payment processing with crypto',
    'chatbot for customer support',
    'speech to text API'
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-bg opacity-90"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20"></div>

      {/* Floating elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-white/5 rounded-full blur-2xl animate-pulse delay-1000"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main heading */}
        <div className="mb-8">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Discover APIs with{' '}
            <span className="text-gradient">AI Intelligence</span>
          </h1>
          <p className="text-xl sm:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Find the perfect APIs for your project using semantic search and real-time performance monitoring.
            Make data-driven decisions with live operational intelligence.
          </p>
        </div>

        {/* Search form */}
        <div className="mb-12">
          <form onSubmit={handleSubmit} className="search-bar">
            <div className="flex items-center space-x-4">
              <Search className="w-6 h-6 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Describe what API you need..."
                className="flex-1 bg-transparent border-0 outline-none text-white placeholder-white/60 text-lg font-medium"
              />
              <button
                type="submit"
                className="btn-primary px-8 py-3"
              >
                Search
              </button>
            </div>
          </form>

          {/* Example queries */}
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {exampleQueries.map((query, index) => (
              <button
                key={index}
                onClick={() => {
                  setSearchQuery(query);
                  onSearch(query);
                }}
                className="btn-secondary text-sm"
              >
                {query}
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div className="glass-effect rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-white mb-2">50+</div>
            <div className="text-white/80">APIs Monitored</div>
          </div>
          <div className="glass-effect rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-white mb-2">99.5%</div>
            <div className="text-white/80">Uptime Average</div>
          </div>
          <div className="glass-effect rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-white mb-2">&lt;500ms</div>
            <div className="text-white/80">Response Time</div>
          </div>
        </div>

        {/* Trending section */}
        <div className="mt-16">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <TrendingUp className="w-5 h-5 text-white" />
            <span className="text-white/90 font-medium">Trending API Comparisons</span>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {['OpenAI vs Claude', 'DALL-E vs Midjourney', 'Stripe vs PayPal'].map((comparison, index) => (
              <div
                key={index}
                className="glass-effect rounded-lg px-4 py-2 text-white/90 text-sm hover:bg-white/20 transition-colors cursor-pointer"
              >
                {comparison}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
