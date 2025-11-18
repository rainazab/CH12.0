'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Redirect to compare page with search query
      window.location.href = `/compare?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden pb-12">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(90deg, rgba(34, 211, 238, 0.1) 1px, transparent 1px), linear-gradient(rgba(34, 211, 238, 0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Animated Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500/20 rounded-full mix-blend-screen filter blur-3xl animate-blob" />
        <div className="absolute top-40 right-10 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-screen filter blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute -bottom-20 left-1/3 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-screen filter blur-3xl animate-blob animation-delay-4000" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Find Your Perfect{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              API
            </span>
          </h1>

          <p className="text-xl text-gray-400 mb-12 leading-relaxed max-w-2xl mx-auto">
            Visually compare API outputs side-by-side and see exactly how they differ. Test multiple APIs
            simultaneously to find the perfect fit for your project.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              href="/compare"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-full hover:shadow-2xl hover:shadow-cyan-500/50 transition transform hover:scale-105"
            >
              ✨ Start Comparing
              <span className="text-xl">→</span>
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gray-800 text-white font-bold rounded-full hover:bg-gray-700 transition"
            >
              View Pricing
            </Link>
          </div>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="w-full max-w-3xl mx-auto mb-20">
          <div className="relative group">
            <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-2xl blur-lg opacity-40 group-hover:opacity-70 transition duration-500" />
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-2xl blur opacity-50 group-hover:opacity-100 transition duration-500" />

            <div className="relative flex items-center gap-3 bg-black/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-cyan-500/30 group-hover:border-cyan-400/60 overflow-hidden transition duration-300 px-6 py-3">
              <Search className="w-5 h-5 text-cyan-400 flex-shrink-0" />

              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for APIs or use cases..."
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

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {[
            {
              icon: '⚡',
              title: 'Side-by-Side Comparison',
              description: 'Compare up to 3 APIs simultaneously and see outputs in real-time.',
            },
            {
              icon: '📊',
              title: 'Performance Metrics',
              description: 'Track latency, cost, and uptime for each API at a glance.',
            },
            {
              icon: '🎯',
              title: 'Smart Recommendations',
              description: 'Get AI-powered suggestions for the best API for your use case.',
            },
          ].map((feature, idx) => (
              <div
              key={idx}
              className="rounded-lg border border-gray-700 bg-gray-900/50 p-6 hover:border-cyan-400/50 transition"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

