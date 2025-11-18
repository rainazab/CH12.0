'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Zap, TrendingUp, Target } from 'lucide-react';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [displayedText, setDisplayedText] = useState('');
  const [currentExampleIndex, setCurrentExampleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  
  const searchExamples = [
    'Compare GPT-4 vs Claude 3...',
    'Find image generation APIs...',
    'Search by budget: $100/month...',
    'Compare latency & speed...',
    'Find text-to-speech APIs...',
  ];

  useEffect(() => {
    const currentExample = searchExamples[currentExampleIndex];
    
    if (charIndex < currentExample.length) {
      // Still typing this example
      const timeout = setTimeout(() => {
        setDisplayedText(currentExample.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, 50); // Speed of typing
      return () => clearTimeout(timeout);
    } else {
      // Finished typing this example, wait then move to next
      const timeout = setTimeout(() => {
        setCurrentExampleIndex((currentExampleIndex + 1) % searchExamples.length);
        setCharIndex(0);
        setDisplayedText('');
      }, 2000); // Pause before moving to next example
      return () => clearTimeout(timeout);
    }
  }, [charIndex, currentExampleIndex, searchExamples]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/compare?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <div className="relative bg-black overflow-hidden">

      {/* HERO SECTION */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-0">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div className="space-y-8 flex flex-col items-center">
              <div className="space-y-6 text-left">
                <h1 className="text-6xl lg:text-7xl font-bold text-white leading-tight">
                  See API Outputs{' '}
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Visually
                  </span>
                </h1>
                <p className="text-xl text-gray-400 leading-relaxed max-w-2xl">
                  Watch APIs perform side-by-side in real-time. See exact outputs, compare metrics, costs, and performance all in one visual interface.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 py-8 border-y border-gray-800 w-full text-center">
                <div>
                  <div className="text-3xl font-bold text-cyan-400">3</div>
                  <p className="text-sm text-gray-500">APIs at once</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-cyan-400">0s</div>
                  <p className="text-sm text-gray-500">Setup time</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-cyan-400">100%</div>
                  <p className="text-sm text-gray-500">Data-driven</p>
                </div>
              </div>

              {/* Hero CTA */}
              <Link
                href="/compare"
                className="flex items-center justify-center gap-3 px-12 py-5 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white font-bold text-lg rounded-full hover:shadow-2xl hover:shadow-purple-500/50 transition transform hover:scale-110"
              >
                Start Comparing
                <span className="text-2xl">→</span>
              </Link>
            </div>

            {/* Right: Demo Visual */}
            <div className="hidden lg:block">
              <div className="relative">
                {/* Demo Card */}
                <div className="bg-gradient-to-b from-gray-900/80 to-black/80 border border-gray-800/50 rounded-2xl p-6 backdrop-blur">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-800/30">
                    <h3 className="font-semibold text-white">Comparison Results</h3>
                    <span className="text-xs text-gray-500">Real-time</span>
                  </div>

                  {/* API Columns */}
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { name: 'GPT-4', speed: '245ms', cost: '$0.03', uptime: '99.9%', color: 'cyan' },
                      { name: 'Claude 3', speed: '312ms', cost: '$0.02', uptime: '99.8%', color: 'blue' },
                      { name: 'Gemini', speed: '198ms', cost: '$0.01', uptime: '99.5%', color: 'purple' },
                    ].map((api, idx) => (
                      <div key={idx} className={`space-y-3 p-4 rounded-lg bg-${api.color}-500/5 border border-${api.color}-500/20`}>
                        <div className={`font-semibold text-${api.color}-400 text-sm`}>{api.name}</div>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-gray-400">Speed</span>
                            <span className="text-gray-300 font-mono">{api.speed}</span>
                          </div>
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-gray-400">Cost</span>
                            <span className="text-gray-300 font-mono">{api.cost}</span>
                          </div>
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-gray-400">Uptime</span>
                            <span className="text-gray-300 font-mono">{api.uptime}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="mt-6 pt-4 border-t border-gray-800/30">
                    <p className="text-xs text-gray-500 text-center">Winner: Gemini (Best price & speed)</p>
                  </div>
                </div>

                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl blur-xl -z-10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM SECTION */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Problem Visual */}
            <div className="hidden md:block">
              <div className="space-y-4">
                {/* Stack of cards animation */}
                <div className="relative h-80 perspective">
                  {/* Card 1 */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700 p-4 transform -rotate-3 shadow-lg">
                    <div className="text-xs text-gray-500 mb-3">API Performance</div>
                    <div className="space-y-2">
                      <div className="h-2 bg-gray-700 rounded w-3/4"></div>
                      <div className="h-2 bg-gray-700 rounded w-1/2"></div>
                      <div className="h-2 bg-gray-700 rounded w-2/3"></div>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700 p-4 transform rotate-2 translate-y-4 translate-x-4 shadow-lg">
                    <div className="text-xs text-gray-500 mb-3">Pricing Guide</div>
                    <div className="space-y-2">
                      <div className="h-2 bg-gray-700 rounded w-full"></div>
                      <div className="h-2 bg-gray-700 rounded w-5/6"></div>
                      <div className="h-2 bg-gray-700 rounded w-3/4"></div>
                    </div>
                  </div>

                  {/* Card 3 */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-red-500/30 p-4 transform rotate-1 translate-y-8 translate-x-2 shadow-lg">
                    <div className="text-xs text-red-400 mb-3">📄 API Documentation</div>
                    <div className="space-y-2">
                      <div className="h-2 bg-red-500/20 rounded w-4/5"></div>
                      <div className="h-2 bg-red-500/20 rounded w-3/5"></div>
                      <div className="h-2 bg-red-500/20 rounded w-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Problem Text */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div>
                  <span className="text-sm font-semibold text-red-400 uppercase tracking-wider">The Challenge</span>
                  <h2 className="text-5xl lg:text-6xl font-bold text-white mt-4 leading-tight">
                    Choosing the right API is a{' '}
                    <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                      nightmare
                    </span>
                  </h2>
                </div>

                <div className="space-y-4 pt-4 border-t border-gray-800">
                  <div className="flex gap-4">
                    <div className="text-3xl">📚</div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Fragmented Information</h3>
                      <p className="text-gray-400">Pricing, docs, benchmarks scattered across 10+ websites. No single source of truth.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="text-3xl">⏱️</div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Endless Evaluation</h3>
                      <p className="text-gray-400">Hours spent testing, comparing spreadsheets, and reading conflicting reviews.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="text-3xl">❌</div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Wrong Decisions</h3>
                      <p className="text-gray-400">Pick the wrong API and waste thousands on costs or suffer from poor performance.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOLUTION SECTION */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Solution Visual - Left Side */}
            <div className="hidden md:block order-1 md:order-1">
              <div className="space-y-4">
                {/* Feature Cards Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Card 1 */}
                  <div className="bg-gradient-to-br from-cyan-600/20 to-cyan-500/10 border border-cyan-500/30 rounded-xl p-6 backdrop-blur hover:border-cyan-400/60 transition duration-300 transform hover:scale-105">
                    <div className="text-4xl mb-3">⚡</div>
                    <h3 className="text-white font-semibold mb-2">Real-Time</h3>
                    <p className="text-sm text-gray-400">See results instantly</p>
                  </div>

                  {/* Card 2 */}
                  <div className="bg-gradient-to-br from-blue-600/20 to-blue-500/10 border border-blue-500/30 rounded-xl p-6 backdrop-blur hover:border-blue-400/60 transition duration-300 transform hover:scale-105">
                    <div className="text-4xl mb-3">💰</div>
                    <h3 className="text-white font-semibold mb-2">Cost Clear</h3>
                    <p className="text-sm text-gray-400">Exact pricing shown</p>
                  </div>

                  {/* Card 3 */}
                  <div className="bg-gradient-to-br from-purple-600/20 to-purple-500/10 border border-purple-500/30 rounded-xl p-6 backdrop-blur hover:border-purple-400/60 transition duration-300 transform hover:scale-105">
                    <div className="text-4xl mb-3">📊</div>
                    <h3 className="text-white font-semibold mb-2">Metrics</h3>
                    <p className="text-sm text-gray-400">Latency & uptime data</p>
                  </div>

                  {/* Card 4 */}
                  <div className="bg-gradient-to-br from-green-600/20 to-green-500/10 border border-green-500/30 rounded-xl p-6 backdrop-blur hover:border-green-400/60 transition duration-300 transform hover:scale-105">
                    <div className="mb-3">
                      <img src="/star.png" alt="Star" className="w-10 h-10 drop-shadow-lg filter brightness-125" style={{ filter: 'drop-shadow(0 0 8px rgba(34, 197, 94, 0.6))' }} />
                    </div>
                    <h3 className="text-white font-semibold mb-2">Smart</h3>
                    <p className="text-sm text-gray-400">AI recommendations</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Solution Text - Right Side */}
            <div className="space-y-8 order-2 md:order-2">
              <div className="space-y-6">
                <div>
                  <span className="text-sm font-semibold text-cyan-400 uppercase tracking-wider">Why Rho Works</span>
                  <h2 className="text-5xl lg:text-6xl font-bold text-white mt-4 leading-tight">
                    Everything you need to{' '}
                    <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                      decide fast
                    </span>
                  </h2>
                </div>

                <p className="text-lg text-gray-400 leading-relaxed">
                  Rho brings all API data together in one place. Compare performance, pricing, and features in seconds—not days.
                </p>

                {/* Feature List with checkmarks */}
                <div className="space-y-4 pt-6">
                  {[
                    { icon: '✓', title: 'Side-by-side visual comparison', color: 'cyan' },
                    { icon: '✓', title: 'Real-time performance metrics', color: 'blue' },
                    { icon: '✓', title: 'Automated cost calculations', color: 'purple' },
                    { icon: '✓', title: 'Data-driven recommendations', color: 'green' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-4 items-center">
                      <div className={`text-xl font-bold text-${item.color}-400`}>{item.icon}</div>
                      <p className="text-gray-300 text-lg">{item.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-6">
            <h2 className="text-6xl font-bold text-white">
              Ready to find your API?
            </h2>
            <p className="text-xl text-gray-400">
              Try Rho free. No credit card required.
            </p>
          </div>

          {/* Demo Search Showcase */}
          <div className="w-full max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-2xl blur-lg opacity-40" />
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-2xl blur opacity-50" />

              <div className="relative flex items-center gap-3 bg-black/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-cyan-500/30 px-6 py-4 min-h-16">
                <Search className="w-5 h-5 text-cyan-400 flex-shrink-0" />

                <div className="flex-1 text-lg text-white font-medium">
                  <span className="text-gray-500 italic">
                    {displayedText}
                    <span className="animate-pulse">|</span>
                  </span>
                </div>

                <button
                  onClick={() => window.location.href = '/compare'}
                  className="px-8 py-2.5 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white font-bold rounded-full hover:shadow-2xl hover:shadow-purple-600/70 transition duration-300 transform hover:scale-110 flex-shrink-0 whitespace-nowrap uppercase tracking-wide text-sm"
                >
                  Explore
                </button>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
            <Link
              href="/compare"
              className="inline-flex items-center justify-center px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-full hover:shadow-2xl hover:shadow-cyan-500/50 transition transform hover:scale-105"
            >
              Compare APIs
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center px-10 py-4 bg-gray-800 text-white font-bold rounded-full hover:bg-gray-700 transition"
            >
              View Pricing
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}
