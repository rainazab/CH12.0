'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function PreviewPage() {
  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden bg-black">
      {/* Animated Background Layers */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-black to-slate-950"></div>
        
        {/* Animated orbs */}
        <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" style={{ animationDelay: '2s', animation: 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite 2s' }}></div>
        <div className="absolute top-1/4 -right-1/3 w-80 h-80 bg-purple-500/15 rounded-full blur-3xl" style={{ animation: 'pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}></div>
        
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(255,255,255,.05) 25%, rgba(255,255,255,.05) 26%, transparent 27%, transparent 74%, rgba(255,255,255,.05) 75%, rgba(255,255,255,.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255,255,255,.05) 25%, rgba(255,255,255,.05) 26%, transparent 27%, transparent 74%, rgba(255,255,255,.05) 75%, rgba(255,255,255,.05) 76%, transparent 77%, transparent)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-4 sm:px-6">
        {/* Logo */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20">
          <div className="flex items-center gap-2 group">
            <img 
              src="/loading.png" 
              alt="Rho" 
              className="w-8 h-8 sm:w-10 sm:h-10 object-contain group-hover:scale-110 transition-transform"
            />
            <span className="text-2xl sm:text-3xl font-bold text-white">Rho</span>
          </div>
        </div>

        {/* Main Content - Layered Cards */}
        <div className="relative w-full max-w-lg sm:max-w-2xl h-auto">
          {/* Card 1 - Top */}
          <div className="absolute top-0 left-0 right-0 p-6 sm:p-8 rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-black/60 via-cyan-500/5 to-black/40 backdrop-blur-xl z-30 transform -rotate-2 hover:rotate-0 transition-transform duration-300">
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
                Find Your<br />Perfect API
              </h1>
              <div className="h-1 w-16 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full"></div>
            </div>
          </div>

          {/* Card 2 - Middle (overlapping) */}
          <div className="absolute top-32 sm:top-40 left-4 right-0 p-6 sm:p-8 rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 via-black/50 to-black/40 backdrop-blur-xl z-20 transform rotate-1 hover:rotate-0 transition-transform duration-300">
            <div className="space-y-3">
              <p className="text-sm sm:text-base text-gray-300 font-medium">Real-time comparison</p>
              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="text-lg sm:text-2xl font-bold text-cyan-400">10+</div>
                  <p className="text-xs text-gray-500">APIs</p>
                </div>
                <div className="flex-1">
                  <div className="text-lg sm:text-2xl font-bold text-blue-400">&lt;5s</div>
                  <p className="text-xs text-gray-500">Compare</p>
                </div>
                <div className="flex-1">
                  <div className="text-lg sm:text-2xl font-bold text-purple-400">$0</div>
                  <p className="text-xs text-gray-500">Start</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3 - Bottom (overlapping more) */}
          <div className="absolute top-60 sm:top-72 inset-x-0 p-6 sm:p-8 rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-500/10 via-black/60 to-black/40 backdrop-blur-xl z-10 transform -rotate-1 hover:rotate-0 transition-transform duration-300">
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4">
              See outputs, metrics, costs—all side-by-side. Make smarter decisions instantly.
            </p>
            <div className="flex gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-xs text-cyan-300 font-medium">Fast</span>
              <span className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-xs text-blue-300 font-medium">Easy</span>
              <span className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-xs text-purple-300 font-medium">Smart</span>
            </div>
          </div>
        </div>

        {/* CTA - Floating button */}
        <div className="absolute bottom-12 sm:bottom-16 z-40">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 sm:gap-3 px-8 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 text-black font-bold text-base sm:text-lg rounded-full hover:shadow-2xl hover:shadow-cyan-400/50 transition-all duration-300 transform hover:scale-110 active:scale-95 relative overflow-hidden group"
          >
            <span className="relative z-10">Start Now</span>
            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform relative z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
          </Link>
        </div>

        {/* Bottom tagline */}
        <div className="absolute bottom-4 sm:bottom-6 text-center z-20">
          <p className="text-xs sm:text-sm text-gray-500">
            Compare APIs. <span className="text-cyan-400">Choose smarter.</span>
          </p>
        </div>
      </div>

      {/* Radial gradient overlay - subtle */}
      <div className="absolute inset-0 z-5" style={{
        background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)'
      }}></div>
    </div>
  );
}
