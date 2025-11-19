'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-black py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-5xl lg:text-7xl font-bold text-white mb-4">
            Compare <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">APIs</span>
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
            Choose how you want to compare APIs
          </p>

          {/* Main Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 max-w-4xl mx-auto">
            {/* Guided Stack - Primary Option */}
            <div className="p-8 border border-purple-500/30 rounded-2xl bg-gradient-to-br from-purple-500/5 to-pink-500/5 backdrop-blur hover:border-purple-400/50 transition duration-300">
              <div className="text-center space-y-6">
                <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-purple-500/10 border border-purple-500/20">
                  <Image src="/icon/target.png" alt="target" width={32} height={32} style={{ objectFit: 'contain' }} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Guided Stack</h3>
                  <p className="text-gray-400">Answer questions, we'll recommend</p>
                </div>
                <Link
                  href="/stacks/questionnaire"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-purple-500/50 transition transform hover:scale-105 w-full"
                >
                  Start Guided Questionnaire
                  <span className="text-lg">→</span>
                </Link>
              </div>
            </div>

            {/* Saved Stacks */}
            <div className="p-8 border border-green-500/30 rounded-2xl bg-gradient-to-br from-green-500/5 to-emerald-500/5 backdrop-blur hover:border-green-400/50 transition duration-300">
              <div className="text-center space-y-6">
                <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-green-500/10 border border-green-500/20">
                  <Image src="/icon/cloud.png" alt="cloud" width={32} height={32} style={{ objectFit: 'contain' }} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Saved Stacks</h3>
                  <p className="text-gray-400">View your built stacks (Pro+)</p>
                </div>
                <Link
                  href="/stacks/my-stacks"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-green-500/50 transition transform hover:scale-105 w-full"
                >
                  View My Stacks
                  <span className="text-lg">→</span>
                </Link>
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div className="bg-gradient-to-r from-cyan-600/10 to-blue-600/10 border border-cyan-500/30 rounded-2xl p-8 max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">How We Synthesize Info to Match Your Needs</h2>
              <p className="text-gray-400">
                Our intelligent questionnaire analyzes your project requirements, budget, and priorities to recommend the perfect API stack
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center space-y-3">
                <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-full bg-cyan-500/10 border border-cyan-500/20">
                  <Image src="/icon/upwardtrendgraph.png" alt="brain" width={24} height={24} style={{ objectFit: 'contain' }} />
                </div>
                <h4 className="font-bold text-white">Smart Analysis</h4>
                <p className="text-sm text-gray-400">AI-powered recommendations based on your project details</p>
              </div>

              <div className="text-center space-y-3">
                <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-full bg-purple-500/10 border border-purple-500/20">
                  <Image src="/icon/chart.png" alt="chart" width={24} height={24} style={{ objectFit: 'contain' }} />
                </div>
                <h4 className="font-bold text-white">Performance Metrics</h4>
                <p className="text-sm text-gray-400">Real-time comparisons of speed, cost, and reliability</p>
              </div>

              <div className="text-center space-y-3">
                <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-full bg-green-500/10 border border-green-500/20">
                  <Image src="/icon/checkmark-seal.png" alt="checklist" width={24} height={24} style={{ objectFit: 'contain' }} />
                </div>
                <h4 className="font-bold text-white">Tailored Results</h4>
                <p className="text-sm text-gray-400">Results appear here in real-time as you test to reflect the new flow</p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-12 text-center">
            <p className="text-lg text-gray-300 mb-6">
              Ready to find your perfect API stack?
            </p>
            <Link
              href="/stacks/questionnaire"
              className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white font-bold text-lg rounded-xl hover:shadow-2xl hover:shadow-cyan-500/50 transition transform hover:scale-105"
            >
              <Image src="/icon/bolt.png" alt="bolt" width={24} height={19} style={{ objectFit: 'contain' }} />
              Get Started Now
              <span className="text-xl">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

