'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Zap, TrendingUp, Target } from 'lucide-react';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

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
                  Compare APIs in{' '}
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                    seconds
                  </span>
                </h1>
                <p className="text-xl text-gray-400 leading-relaxed max-w-2xl">
                  Stop drowning in documentation. Rho lets you test multiple APIs side-by-side and make data-driven decisions instantly.
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
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Problem Visual */}
            <div className="hidden md:block space-y-6">
              <div className="h-80 bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-2xl border border-red-500/20 flex items-center justify-center backdrop-blur">
                <div className="text-center">
                  <div className="text-5xl mb-4">🔍</div>
                  <p className="text-gray-400">Drowning in API docs?</p>
                </div>
              </div>
            </div>

            {/* Problem Text */}
            <div className="space-y-8">
              <div>
                <h2 className="text-5xl font-bold text-white mb-6">
                  The Problem
                </h2>
                <p className="text-xl text-gray-400 leading-relaxed mb-6">
                  Choosing the right API is overwhelming. Prices shift, performance varies, and documentation is scattered across the web.
                </p>
                <p className="text-lg text-gray-500">
                  Developers waste hours digging through docs, comparing spreadsheets, and making unreliable decisions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOLUTION SECTION */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Solution Text */}
            <div className="space-y-8 order-2 md:order-1">
              <div>
                <h2 className="text-5xl font-bold text-white mb-6">
                  The Solution
                </h2>
                <p className="text-xl text-gray-400 leading-relaxed mb-8">
                  Rho gives you everything you need to choose the perfect API in minutes, not days.
                </p>

                {/* Solution Features */}
                <div className="space-y-6">
                  {[
                    { icon: '⚡', title: 'Real-Time Comparison', desc: 'Side-by-side API testing' },
                    { icon: '💰', title: 'Cost Tracking', desc: 'See exact pricing impact' },
                    { icon: '📊', title: 'Performance Metrics', desc: 'Track latency & uptime' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-4 items-start">
                      <span className="text-3xl flex-shrink-0">{item.icon}</span>
                      <div>
                        <h3 className="text-white font-semibold text-lg">{item.title}</h3>
                        <p className="text-gray-400 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Solution Visual */}
            <div className="hidden md:block order-1 md:order-2">
              <div className="h-80 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-2xl border border-cyan-500/20 flex items-center justify-center backdrop-blur">
                <div className="text-center">
                  <div className="text-5xl mb-4">✨</div>
                  <p className="text-gray-400">Data-driven decisions</p>
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

          {/* Search Form */}
          <form onSubmit={handleSearch} className="w-full max-w-3xl mx-auto">
            <div className="relative group">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-2xl blur-lg opacity-40 group-hover:opacity-70 transition duration-500" />
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-2xl blur opacity-50 group-hover:opacity-100 transition duration-500" />

              <div className="relative flex items-center gap-3 bg-black/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-cyan-500/30 group-hover:border-cyan-400/60 overflow-hidden transition duration-300 px-6 py-4">
                <Search className="w-5 h-5 text-cyan-400 flex-shrink-0" />

                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for APIs..."
                  className="flex-1 px-2 py-3 text-lg outline-none bg-transparent text-white placeholder-gray-500 group-hover:placeholder-gray-400 transition font-medium"
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

          {/* Trust Badge */}
          <p className="text-gray-500 text-sm pt-8">
            Trusted by developers at CalHacks 12.0
          </p>
        </div>
      </section>
    </div>
  );
}
