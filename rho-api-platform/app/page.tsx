'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Search } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const [displayedText, setDisplayedText] = useState('');
  const [currentExampleIndex, setCurrentExampleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({});
  
  const searchExamples = [
    'Compare GPT-4 vs Claude 3',
    'Find image generation APIs',
    'Search by budget: $100/month',
    'Compare latency & speed',
    'Find text-to-speech APIs',
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

  // Scroll fade-in effect
  useEffect(() => {
    // Initialize hero as visible since it's already on screen
    setVisibleSections((prev) => ({
      ...prev,
      hero: true,
    }));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px',
      }
    );

    // Observe all sections
    const sections = document.querySelectorAll('[data-scroll-section]');
    sections.forEach((section) => observer.observe(section));

    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  return (
    <div className="relative bg-black overflow-hidden">

      {/* HERO SECTION */}
      <section 
        id="hero"
        data-scroll-section
        className={`relative z-10 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32 min-h-[auto] sm:min-h-screen ${visibleSections['hero'] ? 'visible' : ''}`}
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left: Content */}
            <div className="space-y-8 sm:space-y-7 lg:space-y-8 w-full">
              {/* Content */}
              <div className="space-y-4 sm:space-y-5 lg:space-y-6">
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight">
                  Find Your Perfect{' '}
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                    API Stack
                  </span>
                </h1>
                <p className="text-sm sm:text-base lg:text-xl text-gray-400 leading-relaxed max-w-2xl">
                  Don't waste hours testing APIs. See real responses, compare costs, speed, and reliability side-by-side instantly. Make smarter integration decisions in seconds.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 sm:gap-6 py-6 sm:py-8 lg:py-8 border-y border-gray-700/50 w-full text-center">
                <div className="space-y-2">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent drop-shadow">10+</div>
                  <p className="text-xs sm:text-sm text-gray-400 font-medium">Leading APIs</p>
                </div>
                <div className="space-y-2">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow">&lt;5s</div>
                  <p className="text-xs sm:text-sm text-gray-400 font-medium">Time to Compare</p>
                </div>
                <div className="space-y-2">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow">$0</div>
                  <p className="text-xs sm:text-sm text-gray-400 font-medium">To Get Started</p>
                </div>
              </div>

              {/* Hero CTA */}
              <div className="flex justify-center w-full pt-2">
                <Link
                  href="/compare"
                  className="inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-9 py-2 sm:py-2.5 lg:py-3 bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold text-sm sm:text-base lg:text-lg rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/30 border border-cyan-400/40 hover:border-cyan-300/60 group backdrop-blur-sm"
                >
                  <span>Start Comparing</span>
                  <span className="text-base sm:text-lg group-hover:translate-x-0.5 transition-all duration-300">→</span>
                </Link>
              </div>
            </div>

            {/* Right: Demo Visual */}
            <div className="hidden lg:block w-full">
              <div className="relative group">
                {/* Demo Card */}
                <div className="bg-gradient-to-b from-gray-900/80 to-black/80 border border-gray-800/50 rounded-2xl p-4 sm:p-6 backdrop-blur group-hover:border-cyan-500/40 transition duration-300">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-gray-800/30">
                    <h3 className="font-semibold text-white text-sm sm:text-base">Prompt: Generate a product tagline</h3>
                    <span className="text-xs text-gray-500">Live Comparison</span>
                  </div>

                  {/* API Response Columns */}
                  <div className="grid grid-cols-3 gap-3 sm:gap-4">
                    {[
                      { 
                        name: 'GPT-4', 
                        response: '"Where innovation meets simplicity."',
                        speed: '245ms', 
                        cost: '$0.03', 
                        color: 'cyan' 
                      },
                      { 
                        name: 'Claude 3', 
                        response: '"Your API companion for better decisions."',
                        speed: '312ms', 
                        cost: '$0.02', 
                        color: 'blue' 
                      },
                      { 
                        name: 'Gemini', 
                        response: '"Compare. Decide. Optimize."',
                        speed: '198ms', 
                        cost: '$0.01', 
                        color: 'purple' 
                      },
                    ].map((api, idx) => {
                      const isWinner = api.name === 'Gemini';
                      const borderClass = isWinner 
                        ? 'border-white/60 shadow-lg shadow-white/20' 
                        : api.color === 'cyan' 
                          ? 'border-cyan-500/20 hover:border-cyan-400/40' 
                          : 'border-blue-500/20 hover:border-blue-400/40';
                      
                      return (
                      <div key={idx} className={`space-y-2 sm:space-y-3 p-3 sm:p-4 rounded-lg bg-${api.color}-500/5 border transition ${borderClass}`}>
                        <div className={`font-semibold text-${api.color}-400 text-xs sm:text-sm`}>{api.name}</div>
                        <div className="space-y-2 sm:space-y-3">
                          <p className="text-xs sm:text-sm text-gray-300 italic line-clamp-3">{api.response}</p>
                          <div className="space-y-1 pt-2 border-t border-gray-700/30">
                            <div className="flex justify-between items-center text-xs">
                              <span className="text-gray-500">Speed</span>
                              <span className="text-gray-300 font-mono">{api.speed}</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                              <span className="text-gray-500">Cost</span>
                              <span className="text-gray-300 font-mono">{api.cost}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      );
                    })}
                  </div>

                  {/* Footer */}
                  <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-800/30">
                    <p className="text-xs text-gray-500 text-center">Gemini wins: Fastest response at lowest cost</p>
                  </div>
                </div>

                {/* Glow effect - enhanced on hover */}
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl blur-xl -z-10 group-hover:from-cyan-500/40 group-hover:to-blue-500/40 group-hover:blur-2xl transition duration-300" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM SECTION */}
      <section 
        id="problem"
        data-scroll-section
        className={`relative z-10 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32 min-h-[auto] sm:min-h-screen ${visibleSections['problem'] ? 'visible' : ''}`}
      >
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Problem Visual */}
            <div className="hidden lg:block order-2 lg:order-1">
              <div className="space-y-4">
                {/* Stack of cards animation */}
                <div className="relative h-64 sm:h-72 lg:h-80 perspective">
                  {/* Card 1 */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg sm:rounded-xl border border-gray-700 p-3 sm:p-4 transform -rotate-3 shadow-lg text-xs sm:text-sm">
                    <div className="text-xs text-gray-500 mb-2 sm:mb-3">API Performance</div>
                    <div className="space-y-1 sm:space-y-2">
                      <div className="h-1.5 sm:h-2 bg-gray-700 rounded w-3/4"></div>
                      <div className="h-1.5 sm:h-2 bg-gray-700 rounded w-1/2"></div>
                      <div className="h-1.5 sm:h-2 bg-gray-700 rounded w-2/3"></div>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg sm:rounded-xl border border-gray-700 p-3 sm:p-4 transform rotate-2 translate-y-3 sm:translate-y-4 translate-x-2 sm:translate-x-4 shadow-lg text-xs sm:text-sm">
                    <div className="text-xs text-gray-500 mb-2 sm:mb-3">Pricing Guide</div>
                    <div className="space-y-1 sm:space-y-2">
                      <div className="h-1.5 sm:h-2 bg-gray-700 rounded w-full"></div>
                      <div className="h-1.5 sm:h-2 bg-gray-700 rounded w-5/6"></div>
                      <div className="h-1.5 sm:h-2 bg-gray-700 rounded w-3/4"></div>
                    </div>
                  </div>

                  {/* Card 3 */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg sm:rounded-xl border border-red-500/30 p-3 sm:p-4 transform rotate-1 translate-y-6 sm:translate-y-8 translate-x-1 sm:translate-x-2 shadow-lg text-xs sm:text-sm">
                    <div className="text-xs text-red-400 mb-2 sm:mb-3 flex items-center gap-1.5 sm:gap-2">
                      <Image src="/icon/doc.png" alt="docs" width={12} height={12} style={{ objectFit: 'contain' }} />
                      API Documentation
                    </div>
                    <div className="space-y-1 sm:space-y-2">
                      <div className="h-1.5 sm:h-2 bg-red-500/20 rounded w-4/5"></div>
                      <div className="h-1.5 sm:h-2 bg-red-500/20 rounded w-3/5"></div>
                      <div className="h-1.5 sm:h-2 bg-red-500/20 rounded w-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Problem Text */}
            <div className="space-y-5 sm:space-y-7 lg:space-y-8 order-1 lg:order-2">
              <div className="space-y-3 sm:space-y-4 lg:space-y-6">
                <div>
                  <span className="text-xs sm:text-sm font-semibold text-red-400 uppercase tracking-wider">The Challenge</span>
                  <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mt-2 sm:mt-3 lg:mt-4 leading-tight">
                    Choosing the right API is a{' '}
                    <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                      nightmare
                    </span>
                  </h2>
                </div>

                <div className="space-y-3 sm:space-y-4 pt-3 sm:pt-4 lg:pt-5 border-t border-gray-800">
                  <div className="flex gap-3 sm:gap-3 lg:gap-4">
                    <div className="w-6 sm:w-7 lg:w-8 h-6 sm:h-7 lg:h-8 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Image src="/icon/doc.png" alt="info" width={20} height={20} style={{ objectFit: 'contain' }} />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-white mb-1">Fragmented Information</h3>
                      <p className="text-sm sm:text-base text-gray-400">Pricing, docs, benchmarks scattered across 10+ websites. No single source of truth.</p>
                    </div>
                  </div>

                  <div className="flex gap-3 sm:gap-4">
                    <div className="w-6 sm:w-8 h-6 sm:h-8 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Image src="/icon/clock.png" alt="time" width={20} height={20} style={{ objectFit: 'contain' }} />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-white mb-1">Endless Evaluation</h3>
                      <p className="text-sm sm:text-base text-gray-400">Hours spent testing, comparing spreadsheets, and reading conflicting reviews.</p>
                    </div>
                  </div>

                  <div className="flex gap-3 sm:gap-4">
                    <div className="w-6 sm:w-8 h-6 sm:h-8 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Image src="/icon/x.png" alt="wrong" width={20} height={20} style={{ objectFit: 'contain' }} />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-white mb-1">Wrong Decisions</h3>
                      <p className="text-sm sm:text-base text-gray-400">Pick the wrong API and waste thousands on costs or suffer from poor performance.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOLUTION SECTION */}
      <section 
        id="solution"
        data-scroll-section
        className={`relative z-10 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32 min-h-[auto] sm:min-h-screen ${visibleSections['solution'] ? 'visible' : ''}`}
      >
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Solution Visual - Left Side */}
            <div className="hidden lg:block order-1 lg:order-1">
              <div className="space-y-3 sm:space-y-4">
                {/* Feature Cards Grid */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {/* Card 1 */}
                  <div className="bg-gradient-to-br from-cyan-600/20 to-cyan-500/10 border border-cyan-500/30 rounded-xl p-6 backdrop-blur hover:border-cyan-400/60 transition duration-300 transform hover:scale-105">
                    <div className="mb-3 w-10 h-10 flex items-center justify-center">
                      <Image src="/icon/bolt.png" alt="lightning" width={28} height={40} style={{ objectFit: 'contain' }} />
                    </div>
                    <h3 className="text-white font-semibold mb-2">Real-Time</h3>
                    <p className="text-sm text-gray-400">See results instantly</p>
                  </div>

                  {/* Card 2 */}
                  <div className="bg-gradient-to-br from-blue-600/20 to-blue-500/10 border border-blue-500/30 rounded-xl p-6 backdrop-blur hover:border-blue-400/60 transition duration-300 transform hover:scale-105">
                    <div className="mb-3 w-10 h-10 flex items-center justify-center">
                      <Image src="/icon/dollarsign.png" alt="cost" width={40} height={40} style={{ objectFit: 'contain' }} />
                    </div>
                    <h3 className="text-white font-semibold mb-2">Cost Clear</h3>
                    <p className="text-sm text-gray-400">Exact pricing shown</p>
                  </div>

                  {/* Card 3 */}
                  <div className="bg-gradient-to-br from-purple-600/20 to-purple-500/10 border border-purple-500/30 rounded-xl p-6 backdrop-blur hover:border-purple-400/60 transition duration-300 transform hover:scale-105">
                    <div className="mb-3 w-10 h-10 flex items-center justify-center">
                      <Image src="/icon/chart.png" alt="metrics" width={40} height={40} style={{ objectFit: 'contain' }} />
                    </div>
                    <h3 className="text-white font-semibold mb-2">Metrics</h3>
                    <p className="text-sm text-gray-400">Latency & uptime data</p>
                  </div>

                  {/* Card 4 - Smart AI Recommendations */}
                  <button
                    onClick={() => router.push('/stacks/questionnaire')}
                    className="bg-gradient-to-br from-green-600/20 to-green-500/10 border border-green-500/30 rounded-xl p-6 backdrop-blur hover:border-green-400/60 transition duration-300 transform hover:scale-105 text-left cursor-pointer w-full"
                  >
                    <div className="mb-3 w-10 h-10 flex items-center justify-center">
                      <Image src="/icon/star.png" alt="smart" width={40} height={40} style={{ objectFit: 'contain' }} />
                    </div>
                    <h3 className="text-white font-semibold mb-2">Smart</h3>
                    <p className="text-sm text-gray-400">AI recommendations</p>
                  </button>
                </div>
              </div>
            </div>

            {/* Solution Text - Right Side */}
            <div className="space-y-5 sm:space-y-7 lg:space-y-8 order-2 lg:order-2">
              <div className="space-y-3 sm:space-y-4 lg:space-y-6">
                <div>
                  <span className="text-xs sm:text-sm font-semibold text-cyan-400 uppercase tracking-wider">Why Rho Works</span>
                  <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mt-2 sm:mt-3 lg:mt-4 leading-tight">
                    Everything you need to{' '}
                    <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                      decide fast
                    </span>
                  </h2>
                </div>

                <p className="text-base sm:text-lg text-gray-400 leading-relaxed">
                  Rho brings all API data together in one place. Compare performance, pricing, and features in seconds—not days.
                </p>

                {/* Feature List with checkmarks */}
                <div className="space-y-2 sm:space-y-3 pt-4 sm:pt-5 lg:pt-6">
                  {[
                    { title: 'Side-by-side visual comparison', color: 'cyan' },
                    { title: 'Real-time performance metrics', color: 'blue' },
                    { title: 'Automated cost calculations', color: 'purple' },
                    { title: 'Data-driven recommendations', color: 'green' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-2 sm:gap-3 lg:gap-4 items-center">
                      <div className="w-5 sm:w-5 lg:w-6 h-5 sm:h-5 lg:h-6 flex items-center justify-center flex-shrink-0">
                        <Image src="/icon/checkmark-seal.png" alt="check" width={18} height={18} style={{ objectFit: 'contain' }} />
                      </div>
                      <p className="text-gray-300 text-base sm:text-lg">{item.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section 
        id="cta"
        data-scroll-section
        className={`relative z-10 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32 min-h-[auto] sm:min-h-screen ${visibleSections['cta'] ? 'visible' : ''}`}
      >
        <div className="max-w-4xl mx-auto text-center space-y-8 sm:space-y-12">
          <div className="space-y-3 sm:space-y-6">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
              Ready to find your API?
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-400">
              Try Rho free. No credit card required.
            </p>
          </div>

          {/* Demo Search Showcase */}
          <div className="w-11/12 lg:w-5/6 mx-auto">
            <div className="relative">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-2xl blur-lg opacity-40" />
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-2xl blur opacity-50" />

              <div className="relative flex items-center justify-between gap-4 sm:gap-6 lg:gap-8 bg-black/80 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-2xl border border-cyan-500/30 px-6 sm:px-8 lg:px-10 py-4 sm:py-5 min-h-16 sm:min-h-20">
                <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                  <Search className="w-5 sm:w-6 h-5 sm:h-6 text-cyan-400 flex-shrink-0" />
                  <div className="text-sm sm:text-lg text-white font-medium w-full">
                    <span className="text-gray-500 italic inline-block w-full">
                      {displayedText}
                      <span className="animate-pulse">|</span>
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => window.location.href = '/compare'}
                  className="px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white font-bold rounded-full hover:shadow-2xl hover:shadow-purple-600/70 transition duration-300 transform hover:scale-110 flex-shrink-0 whitespace-nowrap uppercase tracking-wide text-xs sm:text-sm"
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
