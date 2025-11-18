'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ArrowLeft, Copy, Check, Heart } from 'lucide-react';
import { getStack, incrementStackViews } from '@/lib/stackService';

export default function ViewStackPage() {
  const params = useParams();
  const stackId = params.stackId as string;

  const [stack, setStack] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const loadStack = async () => {
      try {
        if (stackId) {
          const stackData = await getStack(stackId);
          setStack(stackData);
          // Increment view count
          await incrementStackViews(stackId);
        }
      } catch (error) {
        console.error('Error loading stack:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStack();
  }, [stackId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-gray-400">Loading stack...</p>
      </div>
    );
  }

  if (!stack) {
    return (
      <div className="min-h-screen bg-black py-12 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-5xl font-bold text-white">Stack Not Found</h1>
          <p className="text-xl text-gray-400">This stack doesn't exist or has been removed.</p>
          <Link
            href="/stacks/explore"
            className="inline-block px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition"
          >
            Browse Community Stacks
          </Link>
        </div>
      </div>
    );
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-black py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/stacks/explore" className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Explore
          </Link>

          <div className="space-y-4">
            <h1 className="text-5xl lg:text-6xl font-bold text-white">
              {stack.name}
            </h1>
            <p className="text-xl text-gray-400">{stack.description}</p>

            {/* Stack Metadata */}
            <div className="flex flex-wrap gap-4 items-center pt-6 border-t border-gray-800">
              <div>
                <p className="text-xs text-gray-500">Use Case</p>
                <p className="text-lg font-bold text-cyan-400">{stack.useCase}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Monthly Cost</p>
                <p className="text-lg font-bold text-cyan-400">${stack.totalMonthlyCost}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">APIs Included</p>
                <p className="text-lg font-bold text-cyan-400">{stack.apis?.length || 0}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Views</p>
                <p className="text-lg font-bold text-cyan-400">{stack.views || 0}</p>
              </div>
            </div>
          </div>
        </div>

        {/* APIs Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">APIs in This Stack</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stack.apis?.map((api: any) => (
              <div
                key={api.id}
                className="bg-gradient-to-br from-gray-900/80 to-black/80 border border-gray-800/50 rounded-xl p-6 backdrop-blur"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-3xl">{api.icon}</span>
                      <div>
                        <h3 className="font-bold text-white">{api.name}</h3>
                        <p className="text-xs text-gray-400">{api.provider}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Cost</span>
                    <span className="text-cyan-400 font-bold">{api.cost}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Uptime</span>
                    <span className="text-cyan-400 font-bold">{api.uptime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Latency</span>
                    <span className="text-cyan-400 font-bold">{api.latency}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Share Section */}
        <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-white mb-4">Share This Stack</h3>

          <div className="space-y-4">
            {/* Copy Link */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">Share Link</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={window.location.href}
                  readOnly
                  className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm"
                />
                <button
                  onClick={handleCopyLink}
                  className="px-4 py-3 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-lg transition flex items-center gap-2"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Social Share */}
            <div>
              <p className="text-sm font-semibold text-white mb-3">Share on Social</p>
              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={() => {
                    const text = `Check out this API stack: ${stack.name} - ${window.location.href}`;
                    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
                  }}
                  className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 font-semibold rounded-lg transition"
                >
                  Share on X
                </button>
                <button
                  onClick={() => {
                    window.open(
                      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`,
                      '_blank'
                    );
                  }}
                  className="px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 font-semibold rounded-lg transition"
                >
                  Share on LinkedIn
                </button>
                <button
                  onClick={() => setLiked(!liked)}
                  className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 font-semibold rounded-lg transition flex items-center gap-2"
                >
                  <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
                  {liked ? 'Liked' : 'Like'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center space-y-4">
          <h3 className="text-2xl font-bold text-white">Want to Build Your Own Stack?</h3>
          <p className="text-gray-400">Start with our guided questionnaire and create your perfect API combination.</p>
          <Link
            href="/stacks/questionnaire"
            className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition"
          >
            Create Your Stack
          </Link>
        </div>
      </div>
    </div>
  );
}

