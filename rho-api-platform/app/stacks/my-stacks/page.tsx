'use client';

import Link from 'next/link';
import Image from 'next/image';

export const dynamic = 'force-dynamic';
import { useState, useEffect } from 'react';
import { Share2, Trash2, Eye, Edit } from 'lucide-react';
import { getUserStacks, deleteStack, toggleStackPublic } from '@/lib/stackService';

interface SavedStack {
  id: string;
  name: string;
  description: string;
  apis: Array<{
    name: string;
    icon: string;
  }>;
  totalCost: number;
  createdAt: string;
  views: number;
  isPublic: boolean;
}

const mockStacks: SavedStack[] = [
  {
    id: '1',
    name: 'E-Commerce MVP',
    description: 'Fast and cost-effective stack for launching an online store',
    apis: [
      { name: 'Stripe', icon: '💳' },
      { name: 'Claude 3', icon: '💭' },
      { name: 'AWS Polly', icon: '📢' },
    ],
    totalCost: 310,
    createdAt: '2025-01-15',
    views: 24,
    isPublic: true,
  },
  {
    id: '2',
    name: 'AI Content Generator',
    description: 'High-performance stack for content creation and image generation',
    apis: [
      { name: 'GPT-4', icon: '🧠' },
      { name: 'DALL·E 3', icon: '🎨' },
      { name: 'ElevenLabs', icon: '🔊' },
    ],
    totalCost: 160,
    createdAt: '2025-01-10',
    views: 0,
    isPublic: false,
  },
  {
    id: '3',
    name: 'Analytics Platform',
    description: 'Real-time analytics with AI-powered insights',
    apis: [
      { name: 'Claude 3', icon: '💭' },
      { name: 'Segment', icon: '🔗' },
      { name: 'Mixpanel', icon: '📊' },
    ],
    totalCost: 1120,
    createdAt: '2025-01-05',
    views: 12,
    isPublic: true,
  },
];

export default function MyStacksPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [stacks, setStacks] = useState<any[]>([]);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    const initFirebase = async () => {
      const { onAuthStateChanged } = await import('firebase/auth');
      const { auth } = await import('@/lib/firebase');

      const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
        setUser(currentUser);
        if (currentUser) {
          try {
            const userStacks = await getUserStacks(currentUser.uid);
            setStacks(userStacks);
          } catch (error) {
            console.error('Error loading stacks:', error);
          }
        }
        setLoading(false);
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

  const handleDeleteStack = async (stackId: string) => {
    if (!confirm('Are you sure you want to delete this stack?')) {
      return;
    }

    setDeleting(stackId);
    try {
      await deleteStack(stackId);
      setStacks(stacks.filter(s => s.id !== stackId));
    } catch (error) {
      console.error('Error deleting stack:', error);
      alert('Failed to delete stack');
    } finally {
      setDeleting(null);
    }
  };

  const handleTogglePublic = async (stack: any) => {
    try {
      await toggleStackPublic(stack.id, !stack.isPublic);
      setStacks(stacks.map(s => s.id === stack.id ? { ...s, isPublic: !s.isPublic } : s));
    } catch (error) {
      console.error('Error toggling stack public:', error);
      alert('Failed to update stack');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl"></div>
        </div>


        <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
          <div className="max-w-2xl mx-auto text-center space-y-8">

            {/* Premium Icon */}
            <div className="relative mx-auto w-24 h-24 mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-xl"></div>
              <div className="relative w-full h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center shadow-2xl shadow-cyan-500/50">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-6xl lg:text-7xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent leading-tight">
                Access Required
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-600 mx-auto rounded-full"></div>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <p className="text-xl lg:text-2xl text-gray-300 font-light leading-relaxed">
                Unlock your personalized API ecosystem
              </p>
              <p className="text-lg text-gray-400 max-w-lg mx-auto leading-relaxed">
                Sign in to access, manage, and optimize your saved API stacks with advanced analytics and performance insights.
              </p>
            </div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12 max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-cyan-900/20 to-cyan-800/10 border border-cyan-500/20 rounded-2xl p-6 backdrop-blur-sm">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-cyan-300 mb-2">Performance Analytics</h3>
                <p className="text-gray-400 text-sm">Track API performance and costs in real-time</p>
              </div>

              <div className="bg-gradient-to-br from-blue-900/20 to-blue-800/10 border border-blue-500/20 rounded-2xl p-6 backdrop-blur-sm">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-400 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-blue-300 mb-2">Saved Stacks</h3>
                <p className="text-gray-400 text-sm">Access your curated API combinations instantly</p>
              </div>

              <div className="bg-gradient-to-br from-purple-900/20 to-purple-800/10 border border-purple-500/20 rounded-2xl p-6 backdrop-blur-sm">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-400 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-purple-300 mb-2">Instant Optimization</h3>
                <p className="text-gray-400 text-sm">Get AI-powered recommendations for improvements</p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="space-y-4">
              <Link
                href="/auth/signin"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white font-bold text-lg rounded-2xl hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105"
              >
                <svg className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Sign In to Continue
              </Link>

              <p className="text-sm text-gray-500">
                New to Rho? <Link href="/auth/signin" className="text-cyan-400 hover:text-cyan-300 transition-colors">Create your account</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-4">
            My API{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Stacks
            </span>
          </h1>
          <p className="text-xl text-gray-400 mb-6">
            Manage and track all your saved API stacks
          </p>
          <Link
            href="/stacks/questionnaire"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white font-bold rounded-lg hover:shadow-2xl hover:shadow-purple-500/50 transition"
          >
            ✨ Create New Stack
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <div className="bg-gradient-to-br from-cyan-600/20 to-blue-600/20 border border-cyan-500/30 rounded-xl p-6">
            <p className="text-gray-400 text-sm mb-2">Total Stacks</p>
            <p className="text-3xl font-bold text-cyan-400">{mockStacks.length}</p>
          </div>
          <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-xl p-6">
            <p className="text-gray-400 text-sm mb-2">Public Stacks</p>
            <p className="text-3xl font-bold text-blue-400">{mockStacks.filter(s => s.isPublic).length}</p>
          </div>
          <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-xl p-6">
            <p className="text-gray-400 text-sm mb-2">Total Views</p>
            <p className="text-3xl font-bold text-purple-400">{mockStacks.reduce((sum, s) => sum + s.views, 0)}</p>
          </div>
        </div>

        {/* Stacks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(stacks.length > 0 ? stacks : mockStacks).map((stack) => (
            <div
              key={stack.id}
              className="bg-gradient-to-br from-gray-900/80 to-black/80 border border-gray-800/50 rounded-2xl p-6 backdrop-blur hover:border-cyan-400/30 transition group"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition">
                    {stack.name}
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">{stack.description}</p>
                </div>
                {stack.isPublic && (
                  <span className="px-2 py-1 bg-cyan-400/20 text-cyan-400 text-xs font-semibold rounded">
                    Public
                  </span>
                )}
              </div>

              {/* APIs */}
              <div className="flex flex-wrap gap-2 mb-4">
                {stack.apis.map((api: { name: string; icon: string }, idx: number) => (
                  <div key={idx} className="flex items-center gap-1 px-3 py-1 bg-black/40 rounded-full">
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
              <div className="grid grid-cols-3 gap-2 mb-6 py-4 border-t border-gray-800/50">
                <div>
                  <p className="text-xs text-gray-500">Cost</p>
                  <p className="text-lg font-bold text-cyan-400">${stack.totalCost}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Created</p>
                  <p className="text-sm text-gray-300">{new Date(stack.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4 text-gray-500" />
                  <p className="text-sm text-gray-300">{stack.views}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Link
                  href={`/stacks/results`}
                  className="flex-1 px-3 py-2 bg-cyan-400/20 hover:bg-cyan-400/30 text-cyan-400 rounded-lg transition text-sm font-medium flex items-center justify-center gap-1"
                >
                  <Eye className="w-4 h-4" />
                  View
                </Link>
                <Link
                  href={`/stacks/edit/${stack.id}`}
                  className="flex-1 px-3 py-2 bg-blue-400/20 hover:bg-blue-400/30 text-blue-400 rounded-lg transition text-sm font-medium flex items-center justify-center gap-1"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </Link>
                <button
                  onClick={() => handleTogglePublic(stack)}
                  className="px-3 py-2 bg-purple-400/20 hover:bg-purple-400/30 text-purple-400 rounded-lg transition text-sm font-medium flex items-center justify-center gap-1"
                  title={stack.isPublic ? 'Make private' : 'Make public'}
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteStack(stack.id)}
                  disabled={deleting === stack.id}
                  className="px-3 py-2 bg-red-400/20 hover:bg-red-400/30 text-red-400 rounded-lg transition text-sm font-medium flex items-center justify-center gap-1 disabled:opacity-50"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {mockStacks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg mb-4">No stacks yet</p>
            <Link
              href="/stacks/questionnaire"
              className="inline-block px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition"
            >
              Create Your First Stack
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

