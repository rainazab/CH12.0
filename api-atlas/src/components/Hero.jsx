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
        <form onSubmit={handleSearch} className="max-w-3xl mx-auto mb-16">
          <div className="relative group">
            <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-2xl blur-lg opacity-40 group-hover:opacity-70 transition duration-500" />
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-2xl blur opacity-50 group-hover:opacity-100 transition duration-500" />
            
            <div className="relative flex items-center gap-3 bg-black/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-cyan-500/30 group-hover:border-cyan-400/60 overflow-hidden transition duration-300 px-6 py-3">
              <Search className="w-5 h-5 text-cyan-400 flex-shrink-0 group-hover:text-cyan-300 transition" />
              
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search APIs… (ex: image generation, payments, speech-to-text)"
                className="flex-1 px-2 py-3 text-base md:text-lg outline-none bg-transparent text-white placeholder-gray-400 group-hover:placeholder-gray-300 transition"
              />
              
              <button
                type="submit"
                className="px-8 py-2.5 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white font-bold rounded-full hover:shadow-2xl hover:shadow-purple-600/70 transition duration-300 transform hover:scale-110 flex-shrink-0 whitespace-nowrap uppercase tracking-wide text-sm"
              >
                Search
              </button>
            </div>
          </div>
        </form>

        {/* Example Terms Carousel - Premium AI Experience */}
        <div className="space-y-6 mt-8">
          {/* Label with animation */}
          <div className="flex items-center justify-center gap-2">
            <div className="h-0.5 w-8 bg-gradient-to-r from-transparent to-cyan-400" />
            <p className="text-gray-400 text-sm font-medium uppercase tracking-widest">Try Searching For</p>
            <div className="h-0.5 w-8 bg-gradient-to-l from-transparent to-cyan-400" />
          </div>

          {/* Animated carousel container */}
          <div className="relative h-16 flex items-center justify-center">
            {/* Glow background effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-2xl blur-xl" />
            
            {/* Carousel box */}
            <div className="relative flex items-center justify-center">
              {/* Left indicator */}
              <div className="absolute left-0 w-1 h-12 bg-gradient-to-b from-transparent via-cyan-400 to-transparent opacity-60" />
              
              {/* Text carousel with smooth animation */}
              <div className="px-8 py-4 text-center">
                <div className="relative h-12 flex items-center justify-center overflow-hidden">
                  <div 
                    className="absolute transition-all duration-500 ease-in-out"
                    style={{
                      opacity: 1,
                      transform: 'translateY(0)',
                    }}
                  >
                    <p className="text-lg md:text-2xl font-bold bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent animate-pulse">
                      {examples[currentExample]}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right indicator */}
              <div className="absolute right-0 w-1 h-12 bg-gradient-to-b from-transparent via-purple-400 to-transparent opacity-60" />
            </div>

            {/* Dots indicator */}
            <div className="absolute bottom-0 flex gap-2 mt-4">
              {examples.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentExample
                      ? 'w-6 bg-gradient-to-r from-cyan-400 to-purple-400'
                      : 'w-1.5 bg-gray-600 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Status text */}
          <p className="text-center text-xs text-gray-500 uppercase tracking-widest">
            powered by rho intelligence
          </p>
        </div>

        {/* Example Results Preview */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl">
          {/* Result Card 1 */}
          <div className="group relative overflow-hidden rounded-xl border border-gray-700/50 hover:border-cyan-400/50 bg-black/40 backdrop-blur-sm hover:bg-black/60 transition p-5 cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition" />
            <div className="relative">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🤖</span>
                <div>
                  <h3 className="font-bold text-white text-sm">ChatGPT API</h3>
                  <p className="text-xs text-gray-400">OpenAI</p>
                </div>
              </div>
              <p className="text-xs text-gray-400 mb-3 line-clamp-2">Advanced language model for text generation and conversation</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-cyan-400 font-semibold">99.9% Uptime</span>
                <span className="text-xs text-gray-500">$0.03/1K tokens</span>
              </div>
            </div>
          </div>

          {/* Result Card 2 */}
          <div className="group relative overflow-hidden rounded-xl border border-gray-700/50 hover:border-purple-400/50 bg-black/40 backdrop-blur-sm hover:bg-black/60 transition p-5 cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition" />
            <div className="relative">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🎨</span>
                <div>
                  <h3 className="font-bold text-white text-sm">DALL-E 3</h3>
                  <p className="text-xs text-gray-400">OpenAI</p>
                </div>
              </div>
              <p className="text-xs text-gray-400 mb-3 line-clamp-2">AI image generation from text descriptions</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-purple-400 font-semibold">99.1% Uptime</span>
                <span className="text-xs text-gray-500">$0.08/image</span>
              </div>
            </div>
          </div>

          {/* Result Card 3 */}
          <div className="group relative overflow-hidden rounded-xl border border-gray-700/50 hover:border-blue-400/50 bg-black/40 backdrop-blur-sm hover:bg-black/60 transition p-5 cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition" />
            <div className="relative">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">💳</span>
                <div>
                  <h3 className="font-bold text-white text-sm">Stripe API</h3>
                  <p className="text-xs text-gray-400">Stripe</p>
                </div>
              </div>
              <p className="text-xs text-gray-400 mb-3 line-clamp-2">Complete payment processing platform</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-blue-400 font-semibold">99.99% Uptime</span>
                <span className="text-xs text-gray-500">2.9% + $0.30</span>
              </div>
            </div>
          </div>
        </div>

        {/* Call to action text */}
        <p className="text-center text-sm text-gray-400 mt-8">
          See what <span className="text-cyan-300 font-semibold">real results</span> look like with Rho
        </p>
      </div>
    </div>
  );
}
