import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

export default function Hero({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentExample, setCurrentExample] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  const examples = [
    'Payment processing APIs',
    'AI image generation',
    'Email delivery services',
    'Text-to-speech solutions',
  ];

  const searchExamples = [
    'best image generation API',
    'best text to speech API',
    'best payment processing API',
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  // Typing effect for the demo search
  useEffect(() => {
    const currentSearchText = searchExamples[currentExample % 3];
    
    if (isTyping) {
      if (displayedText.length < currentSearchText.length) {
        const timer = setTimeout(() => {
          setDisplayedText(currentSearchText.slice(0, displayedText.length + 1));
        }, 80);
        return () => clearTimeout(timer);
      } else {
        // Finished typing, wait 2 seconds then start deleting
        const timer = setTimeout(() => {
          setIsTyping(false);
        }, 2000);
        return () => clearTimeout(timer);
      }
    } else {
      if (displayedText.length > 0) {
        const timer = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, 40);
        return () => clearTimeout(timer);
      } else {
        // Finished deleting, move to next example
        setCurrentExample((prev) => (prev + 1) % 3);
        setIsTyping(true);
      }
    }
  }, [displayedText, isTyping, currentExample]);

  // Rotate examples
  useEffect(() => {
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

      {/* Content - Two Column Layout */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen">
          
          {/* LEFT SIDE - Text Content */}
          <div className="flex flex-col justify-center">
            {/* Main Headline */}
            <h1 className="text-6xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Find Your Perfect <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">API</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl text-gray-400 mb-12 leading-relaxed">
              Rho finds your perfect API match. Intelligently discover and compare what powers innovation.
            </p>

            {/* Demo Search Box */}
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative group">
                <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-2xl blur-lg opacity-40 group-hover:opacity-70 transition duration-500" />
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-2xl blur opacity-50 group-hover:opacity-100 transition duration-500" />
                
                <div className="relative flex items-center gap-3 bg-black/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-cyan-500/30 group-hover:border-cyan-400/60 overflow-hidden transition duration-300 px-6 py-3">
                  <Search className="w-5 h-5 text-cyan-400 flex-shrink-0 group-hover:text-cyan-300 transition" />
                  
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Enter your search here…"
                    className="flex-1 px-2 py-3 text-base md:text-lg outline-none bg-transparent text-white placeholder-gray-500 group-hover:placeholder-gray-400 transition font-medium"
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
          </div>

          {/* RIGHT SIDE - Live Typing Demo - Shows Rho in Action */}
          <div className="relative flex items-center justify-center w-full">
            {/* Search input simulation with typing effect */}
            <div className="w-full max-w-md">
              <div className="relative group mb-8">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-2xl blur opacity-40 group-hover:opacity-60 transition" />
                
                <div className="relative flex items-center gap-3 bg-black/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-cyan-500/30 px-6 py-4">
                  <Search className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                  
                  <div className="flex-1 text-lg text-white font-medium h-6 flex items-center min-h-[1.5rem]">
                    <span className="inline-block min-w-fit">
                      {displayedText}
                    </span>
                    <span className="ml-0.5 inline-block w-0.5 h-6 bg-cyan-400 animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Dynamic results appearing */}
              <div className="space-y-3 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
                {/* Result 1 - Main recommendation */}
                <div className="group relative overflow-hidden rounded-lg border border-cyan-500/40 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 p-4 hover:border-cyan-400/80 transition cursor-pointer">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl mt-1">
                      {currentExample % 3 === 0 ? '🎨' : currentExample % 3 === 1 ? '🔊' : '💳'}
                    </span>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-bold text-white text-sm">
                          {currentExample % 3 === 0 ? 'DALL-E 3' : currentExample % 3 === 1 ? 'ElevenLabs TTS' : 'Stripe API'}
                        </h3>
                        <span className="text-xs text-cyan-400 font-semibold animate-pulse">
                          {currentExample % 3 === 0 ? '99.1% Uptime' : currentExample % 3 === 1 ? '99.7% Uptime' : '99.99% Uptime'}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mb-2">
                        {currentExample % 3 === 0 
                          ? 'Professional image generation with stunning quality' 
                          : currentExample % 3 === 1
                          ? 'Natural-sounding voice synthesis with premium voices'
                          : 'Industry-standard payment processor'}
                      </p>
                      <div className="flex gap-4 text-xs">
                        <span className="text-gray-500">
                          {currentExample % 3 === 0 
                            ? 'From $0.08/img' 
                            : currentExample % 3 === 1
                            ? 'From $0.18/1K chars'
                            : 'From 2.9%'}
                        </span>
                        <span className="text-cyan-400">★ 4.9/5</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Result 2 */}
                <div className="group relative overflow-hidden rounded-lg border border-gray-700/30 bg-black/30 p-4 hover:border-purple-400/50 transition cursor-pointer opacity-70">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl mt-1">
                      {currentExample % 3 === 0 ? '🌐' : currentExample % 3 === 1 ? '🎤' : '📊'}
                    </span>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-bold text-gray-300 text-sm">
                          {currentExample % 3 === 0 ? 'Midjourney' : currentExample % 3 === 1 ? 'Google TTS' : 'Square Payments'}
                        </h3>
                        <span className="text-xs text-gray-500">
                          {currentExample % 3 === 0 ? '99.8% Uptime' : currentExample % 3 === 1 ? '99.8% Uptime' : '99.95% Uptime'}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mb-2">Alternative option with unique features</p>
                      <span className="text-xs text-gray-500">See more details →</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cycling indicator */}
              <div className="flex justify-center gap-2 mt-8">
                {[0, 1, 2].map((idx) => (
                  <div
                    key={idx}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === currentExample % 3
                        ? 'w-6 bg-gradient-to-r from-cyan-400 to-blue-400'
                        : 'w-1.5 bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
