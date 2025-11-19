'use client';

import Link from 'next/link';
import Image from 'next/image';

export const dynamic = 'force-dynamic';
import { useState, useEffect } from 'react';
import { Star, Users, Copy } from 'lucide-react';
import { cloneStack } from '@/lib/stackService';

interface CommunityStack {
  id: string;
  name: string;
  description: string;
  useCase: string;
  apis: Array<{
    name: string;
    icon: string;
  }>;
  rating: number;
  uses: number;
  featured: boolean;
  category: string;
}

const communityStacks: CommunityStack[] = [
  {
    id: 'ecom-1',
    name: 'Budget E-Commerce Stack',
    description: 'Cost-effective solution perfect for startups launching online stores',
    useCase: 'E-Commerce',
    apis: [
      { name: 'Stripe', icon: '💳' },
      { name: 'Gemini Pro', icon: '✨' },
      { name: 'AWS Polly', icon: '📢' },
    ],
    rating: 4.8,
    uses: 234,
    featured: true,
    category: 'ecommerce',
  },
  {
    id: 'ai-1',
    name: 'Premium AI Content Suite',
    description: 'High-performance APIs for production AI applications',
    useCase: 'AI/ML',
    apis: [
      { name: 'GPT-4', icon: '🧠' },
      { name: 'DALL·E 3', icon: '🎨' },
      { name: 'ElevenLabs', icon: '🔊' },
    ],
    rating: 4.9,
    uses: 512,
    featured: true,
    category: 'ai',
  },
  {
    id: 'saas-1',
    name: 'SaaS Starter Pack',
    description: 'Essential APIs for building scalable SaaS applications',
    useCase: 'SaaS',
    apis: [
      { name: 'Claude 3', icon: '💭' },
      { name: 'Stripe', icon: '💳' },
      { name: 'Segment', icon: '🔗' },
    ],
    rating: 4.7,
    uses: 187,
    featured: true,
    category: 'saas',
  },
  {
    id: 'voice-1',
    name: 'Voice App Bundle',
    description: 'Complete stack for voice and audio applications',
    useCase: 'Voice/Audio',
    apis: [
      { name: 'Google Cloud TTS', icon: '🎙️' },
      { name: 'Claude 3', icon: '💭' },
      { name: 'Gemini Pro', icon: '✨' },
    ],
    rating: 4.6,
    uses: 98,
    featured: false,
    category: 'voice',
  },
  {
    id: 'data-1',
    name: 'Data Analytics Pro',
    description: 'Advanced analytics with AI-powered insights',
    useCase: 'Analytics',
    apis: [
      { name: 'Claude 3', icon: '💭' },
      { name: 'Mixpanel', icon: '📊' },
      { name: 'Segment', icon: '🔗' },
    ],
    rating: 4.5,
    uses: 145,
    featured: false,
    category: 'analytics',
  },
  {
    id: 'image-1',
    name: 'Image Generation Studio',
    description: 'Professional image generation with multiple models',
    useCase: 'Image Generation',
    apis: [
      { name: 'DALL·E 3', icon: '🎨' },
      { name: 'Midjourney', icon: '🌐' },
      { name: 'Stable Diffusion', icon: '🎭' },
    ],
    rating: 4.8,
    uses: 423,
    featured: true,
    category: 'image',
  },
];

export default function ExplorePage() {
  const [user, setUser] = useState<any>(null);
  const [cloning, setCloning] = useState<string | null>(null);

  useEffect(() => {
    const initFirebase = async () => {
      const { onAuthStateChanged } = await import('firebase/auth');
      const { auth } = await import('@/lib/firebase');

      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
      });

      return unsubscribe;
    };

    let unsubscribe: (() => void) | undefined;
    initFirebase().then((unsub) => {
      unsubscribe = unsub;
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const handleCloneStack = async (stackId: string, stackName: string) => {
    if (!user) {
      alert('Please sign in to clone stacks');
      return;
    }

    setCloning(stackId);
    try {
      await cloneStack(user.uid, stackId, `${stackName} (Clone)`);
      alert('Stack cloned successfully! Check your stacks.');
    } catch (error) {
      console.error('Error cloning stack:', error);
      alert('Failed to clone stack');
    } finally {
      setCloning(null);
    }
  };

  const featured = communityStacks.filter(s => s.featured);
  const others = communityStacks.filter(s => !s.featured);

  return (
    <div className="min-h-screen bg-black py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-4">
            Explore Community{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Stacks
            </span>
          </h1>
          <p className="text-xl text-gray-400 mb-6">
            Discover pre-built, tested stacks from the Rho community. Start building faster.
          </p>
        </div>

        {/* Featured Stacks */}
        {featured.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-6">
              <Star className="w-5 h-5 text-yellow-400" />
              <h2 className="text-3xl font-bold text-white">Featured Stacks</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {featured.map((stack) => (
                <div
                  key={stack.id}
                  className="bg-gradient-to-br from-yellow-600/20 to-orange-600/20 border border-yellow-500/30 rounded-2xl p-6 backdrop-blur hover:border-yellow-400/60 transition group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-yellow-300 transition">
                        {stack.name}
                      </h3>
                      <p className="text-xs text-yellow-300 mt-1">⭐ Featured</p>
                    </div>
                    <span className="text-2xl">✨</span>
                  </div>
                  <p className="text-sm text-gray-300 mb-4">{stack.description}</p>

                  {/* APIs */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {stack.apis.map((api, idx) => (
                      <div key={idx} className="flex items-center gap-1 px-2 py-1 bg-black/40 rounded-full">
                        <Image
                          src={api.icon}
                          alt={api.name}
                          width={16}
                          height={16}
                          className="w-4 h-4 object-contain rounded"
                        />
                        <span className="text-xs text-gray-300">{api.name}</span>
                      </div>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between py-3 border-t border-yellow-500/20 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm font-bold text-yellow-400">{stack.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-400">{stack.uses} uses</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleCloneStack(stack.id, stack.name)}
                    disabled={cloning === stack.id}
                    className="w-full px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-yellow-500/50 transition disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    <Copy className="w-4 h-4" />
                    {cloning === stack.id ? 'Cloning...' : 'Clone Stack'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Stacks */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-6">All Stacks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {others.map((stack) => (
              <div
                key={stack.id}
                className="bg-gradient-to-br from-gray-900/80 to-black/80 border border-gray-800/50 rounded-2xl p-6 backdrop-blur hover:border-cyan-400/30 transition group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition">
                      {stack.name}
                    </h3>
                    <span className="inline-block mt-1 px-2 py-0.5 bg-cyan-400/20 text-cyan-400 text-xs font-semibold rounded">
                      {stack.category}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-400 mb-4">{stack.description}</p>

                {/* APIs */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {stack.apis.map((api, idx) => (
                    <div key={idx} className="flex items-center gap-1 px-2 py-1 bg-black/40 rounded-full">
                      <span className="text-sm">{api.icon}</span>
                      <span className="text-xs text-gray-300">{api.name}</span>
                    </div>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between py-3 border-t border-gray-800/50 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-cyan-400" />
                    <span className="text-sm font-bold text-cyan-400">{stack.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-400">{stack.uses}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleCloneStack(stack.id, stack.name)}
                  disabled={cloning === stack.id}
                  className="w-full px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Copy className="w-4 h-4" />
                  {cloning === stack.id ? 'Cloning...' : 'Clone Stack'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Create Your Own */}
        <div className="mt-16 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-3">Share Your Stack</h3>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Created an amazing stack? Share it with the community and help others discover the best APIs for their projects.
          </p>
          <Link
            href="/stacks/questionnaire"
            className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold rounded-lg hover:shadow-2xl hover:shadow-purple-500/50 transition"
          >
            Create & Share Your Stack
          </Link>
        </div>
      </div>
    </div>
  );
}

