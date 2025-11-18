'use client';

import Link from 'next/link';
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
      <div className="min-h-screen bg-black py-12 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-5xl font-bold text-white">Sign In Required</h1>
          <p className="text-xl text-gray-400">Please sign in to view and manage your saved stacks</p>
          <Link
            href="/auth/signin"
            className="inline-block px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition"
          >
            Sign In
          </Link>
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
                    <span>{api.icon}</span>
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

