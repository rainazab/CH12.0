'use client';

import Link from 'next/link';
import { ArrowRight, Zap, TrendingUp, Code2 } from 'lucide-react';

export default function PreviewPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" style={{ transform: 'translate(-50%, -50%)' }}></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="pt-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span className="text-xs sm:text-sm text-cyan-400 font-semibold">API Comparison Platform</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-4 py-12">
          <div className="max-w-2xl w-full space-y-8">
            {/* Logo and Title */}
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-3 mb-6">
                <img 
                  src="/loading.png" 
                  alt="Rho" 
                  className="w-12 h-12 object-contain"
                />
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
                  Rho
                </h1>
              </div>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                Find Your Perfect{' '}
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  API Stack
                </span>
              </h2>

              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-xl mx-auto">
                Compare API outputs, costs, and performance side-by-side in seconds. Make smarter integration decisions.
              </p>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 py-8">
              <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20">
                <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-400" />
                <span className="text-xs sm:text-sm text-gray-300 font-medium text-center">Real-Time</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-gradient-to-b from-blue-500/10 to-transparent border border-blue-500/20">
                <Code2 className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
                <span className="text-xs sm:text-sm text-gray-300 font-medium text-center">Live Demo</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-gradient-to-b from-purple-500/10 to-transparent border border-purple-500/20">
                <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />
                <span className="text-xs sm:text-sm text-gray-300 font-medium text-center">Results</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 py-8 border-y border-gray-800/50">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">10+</div>
                <p className="text-xs sm:text-sm text-gray-400 mt-2">Leading APIs</p>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">&lt;5s</div>
                <p className="text-xs sm:text-sm text-gray-400 mt-2">to Compare</p>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">$0</div>
                <p className="text-xs sm:text-sm text-gray-400 mt-2">to Start</p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 sm:gap-3 px-8 sm:px-12 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold text-base sm:text-lg rounded-full hover:shadow-xl hover:shadow-cyan-500/30 transition-all duration-300 transform hover:scale-105 border border-cyan-400/40 backdrop-blur-sm group w-full sm:w-auto"
              >
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Bottom tagline */}
            <div className="text-center pt-6 border-t border-gray-800/30">
              <p className="text-sm text-gray-400">
                Compare APIs faster. Choose smarter. Ship better.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

