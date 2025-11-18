'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function StackBuilderPage() {
  const searchParams = useSearchParams();
  const categories = searchParams.get('categories')?.split(',') || [];
  const useCase = searchParams.get('useCase') || '';
  const budget = searchParams.get('budget') || '';
  const priority = searchParams.get('priority') || '';

  const categoryLabels: Record<string, string> = {
    'llm': 'Large Language Models',
    'image-gen': 'Image Generation',
    'voice': 'Voice & Audio',
    'embeddings': 'Embeddings',
    'payments': 'Payment Processing',
    'inventory': 'Inventory Management',
    'email': 'Email Services',
    'analytics': 'Analytics',
    'auth': 'Authentication',
    'database': 'Database',
    'voice-tts': 'Text-to-Speech',
    'voice-stt': 'Speech-to-Text',
    'audio-processing': 'Audio Processing',
    'image-processing': 'Image Processing',
    'storage': 'Cloud Storage',
    'data-processing': 'Data Processing',
    'visualization': 'Data Visualization',
  };

  return (
    <div className="min-h-screen bg-black py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Link href="/stacks/questionnaire" className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>

          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-4">
            Build Your{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              API Stack
            </span>
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            Based on your needs: <span className="text-cyan-400">{useCase}</span> • Budget: <span className="text-cyan-400">{budget}</span> • Priority: <span className="text-cyan-400">{priority}</span>
          </p>
        </div>

        {/* Recommended Categories */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Recommended Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category) => (
              <div
                key={category}
                className="p-6 bg-gradient-to-br from-cyan-600/20 to-blue-600/20 border border-cyan-500/30 rounded-xl hover:border-cyan-400/60 transition duration-300 transform hover:scale-105 cursor-pointer group"
              >
                <h3 className="font-semibold text-white text-lg group-hover:text-cyan-300 transition">
                  {categoryLabels[category] || category}
                </h3>
                <p className="text-sm text-gray-400 mt-2">Select APIs in this category</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stack Composition */}
        <div className="bg-gradient-to-br from-gray-900/80 to-black/80 border border-gray-800/50 rounded-2xl p-8 backdrop-blur">
          <h2 className="text-2xl font-bold text-white mb-6">Your Stack</h2>
          <div className="space-y-4 min-h-96 flex items-center justify-center">
            <p className="text-gray-400 text-center">
              🚀 Stack builder coming soon!<br/>
              <span className="text-sm">Select APIs from recommended categories to build your stack</span>
            </p>
          </div>
        </div>

        {/* Info */}
        <div className="mt-12 p-6 bg-blue-600/10 border border-blue-500/30 rounded-lg">
          <p className="text-gray-300 text-center">
            The stack builder will allow you to mix and match APIs, compare outputs, costs, and performance in real-time.
          </p>
        </div>
      </div>
    </div>
  );
}

