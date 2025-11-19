'use client';

import { useParams, useRouter } from 'next/navigation';

export const dynamic = 'force-dynamic';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { ArrowLeft, X } from 'lucide-react';
import { getStack, updateStack } from '@/lib/stackService';

interface StackAPI {
  id: string;
  name: string;
  provider: string;
  cost: string;
  monthlyCost: number;
  category: string;
  uptime: string;
  latency: string;
  icon: string;
}

const apiDatabase: Record<string, StackAPI[]> = {
  'llm': [
    {
      id: 'gpt4o',
      name: 'GPT-4 Omni',
      provider: 'OpenAI',
      cost: '$0.005/1k tokens',
      monthlyCost: 50,
      category: 'llm',
      uptime: '99.9%',
      latency: '200-400ms',
      icon: '🧠',
    },
    {
      id: 'claude3',
      name: 'Claude 3 Opus',
      provider: 'Anthropic',
      cost: '$0.015/1k tokens',
      monthlyCost: 75,
      category: 'llm',
      uptime: '99.7%',
      latency: '300-500ms',
      icon: '💭',
    },
    {
      id: 'gemini',
      name: 'Gemini Pro',
      provider: 'Google',
      cost: '$0.0005/1k tokens',
      monthlyCost: 30,
      category: 'llm',
      uptime: '99.95%',
      latency: '250-450ms',
      icon: '✨',
    },
  ],
  'image-gen': [
    {
      id: 'dalle3',
      name: 'DALL·E 3',
      provider: 'OpenAI',
      cost: '$0.08/img',
      monthlyCost: 80,
      category: 'image-gen',
      uptime: '99.1%',
      latency: '5-10s',
      icon: '🎨',
    },
    {
      id: 'midjourney',
      name: 'Midjourney',
      provider: 'Midjourney Inc',
      cost: '$0.04/img',
      monthlyCost: 40,
      category: 'image-gen',
      uptime: '99.8%',
      latency: '30-60s',
      icon: '🌐',
    },
    {
      id: 'stability',
      name: 'Stable Diffusion',
      provider: 'Stability AI',
      cost: '$0.01/img',
      monthlyCost: 20,
      category: 'image-gen',
      uptime: '99.5%',
      latency: '2-5s',
      icon: '🎭',
    },
  ],
  'voice-tts': [
    {
      id: 'elevenlabs',
      name: 'ElevenLabs TTS',
      provider: 'ElevenLabs',
      cost: '$0.30/1M chars',
      monthlyCost: 30,
      category: 'voice-tts',
      uptime: '99.7%',
      latency: '100-300ms',
      icon: '🔊',
    },
    {
      id: 'google-tts',
      name: 'Google Cloud TTS',
      provider: 'Google',
      cost: '$0.16/1k chars',
      monthlyCost: 50,
      category: 'voice-tts',
      uptime: '99.9%',
      latency: '150-350ms',
      icon: '🎙️',
    },
  ],
  'payments': [
    {
      id: 'stripe',
      name: 'Stripe API',
      provider: 'Stripe',
      cost: '2.9% + $0.30',
      monthlyCost: 200,
      category: 'payments',
      uptime: '99.99%',
      latency: '100-200ms',
      icon: '💳',
    },
    {
      id: 'paypal',
      name: 'PayPal Commerce',
      provider: 'PayPal',
      cost: '2.99% + $0.49',
      monthlyCost: 180,
      category: 'payments',
      uptime: '99.95%',
      latency: '200-300ms',
      icon: '💰',
    },
  ],
  'analytics': [
    {
      id: 'mixpanel',
      name: 'Mixpanel',
      provider: 'Mixpanel',
      cost: '$999/mo',
      monthlyCost: 999,
      category: 'analytics',
      uptime: '99.9%',
      latency: '50-100ms',
      icon: '📊',
    },
    {
      id: 'amplitude',
      name: 'Amplitude',
      provider: 'Amplitude',
      cost: '$995/mo',
      monthlyCost: 995,
      category: 'analytics',
      uptime: '99.95%',
      latency: '100-200ms',
      icon: '📈',
    },
  ],
};

const categoryLabels: Record<string, string> = {
  'llm': 'Large Language Models',
  'image-gen': 'Image Generation',
  'voice-tts': 'Text-to-Speech',
  'payments': 'Payment Processing',
  'analytics': 'Analytics',
};

export default function EditStackPage() {
  const router = useRouter();
  const params = useParams();
  const stackId = params.stackId as string;

  const [user, setUser] = useState<any>(null);
  const [stack, setStack] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [stackName, setStackName] = useState('');
  const [stackDescription, setStackDescription] = useState('');
  const [selectedApis, setSelectedApis] = useState<StackAPI[]>([]);

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

  useEffect(() => {
    const loadStack = async () => {
      try {
        if (stackId && user) {
          const stackData = await getStack(stackId);
          if (stackData && stackData.userId === user.uid) {
            setStack(stackData);
            setStackName(stackData.name);
            setStackDescription(stackData.description || '');
            setSelectedApis(stackData.apis || []);
          } else {
            router.push('/stacks/my-stacks');
          }
        }
      } catch (error) {
        console.error('Error loading stack:', error);
        router.push('/stacks/my-stacks');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      loadStack();
    }
  }, [stackId, user, router]);

  const handleAddApi = (api: StackAPI) => {
    if (!selectedApis.find(a => a.id === api.id)) {
      setSelectedApis([...selectedApis, api]);
    }
  };

  const handleRemoveApi = (apiId: string) => {
    setSelectedApis(selectedApis.filter(a => a.id !== apiId));
  };

  const handleSave = async () => {
    if (!stackName.trim()) {
      alert('Please enter a stack name');
      return;
    }

    setSaving(true);
    try {
      const totalMonthlyCost = selectedApis.reduce((sum, api) => sum + api.monthlyCost, 0);
      
      await updateStack(stackId, {
        name: stackName,
        description: stackDescription,
        apis: selectedApis,
        totalMonthlyCost,
      });

      alert('Stack updated successfully!');
      router.push('/stacks/my-stacks');
    } catch (error) {
      console.error('Error updating stack:', error);
      alert('Failed to update stack');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-gray-400">Loading stack...</p>
      </div>
    );
  }

  if (!stack) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-gray-400">Stack not found</p>
      </div>
    );
  }

  const totalMonthlyCost = selectedApis.reduce((sum, api) => sum + api.monthlyCost, 0);

  return (
    <div className="min-h-screen bg-black py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Link href="/stacks/my-stacks" className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to My Stacks
          </Link>

          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-4">
            Edit{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Stack
            </span>
          </h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Side - Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stack Info */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-white mb-3">Stack Name</label>
                <input
                  type="text"
                  value={stackName}
                  onChange={(e) => setStackName(e.target.value)}
                  placeholder="e.g., E-Commerce MVP"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-3">Description</label>
                <textarea
                  value={stackDescription}
                  onChange={(e) => setStackDescription(e.target.value)}
                  placeholder="Describe your stack..."
                  rows={3}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none resize-none"
                />
              </div>
            </div>

            {/* API Categories */}
            <div className="space-y-6">
              {Object.keys(categoryLabels).map((category) => (
                <div key={category}>
                  <h3 className="text-lg font-bold text-white mb-3">{categoryLabels[category]}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(apiDatabase[category] || []).map((api) => {
                      const isSelected = selectedApis.find(a => a.id === api.id);
                      return (
                        <button
                          key={api.id}
                          onClick={() => isSelected ? handleRemoveApi(api.id) : handleAddApi(api)}
                          className={`p-4 rounded-lg border-2 transition text-left ${
                            isSelected
                              ? 'bg-cyan-500/20 border-cyan-400'
                              : 'bg-gray-800/50 border-gray-700 hover:border-gray-600'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <Image
                                  src={api.icon}
                                  alt={api.name}
                                  width={24}
                                  height={24}
                                  className="w-6 h-6 object-contain rounded"
                                />
                                <h4 className="font-semibold text-white">{api.name}</h4>
                              </div>
                              <p className="text-xs text-gray-400">{api.cost}</p>
                            </div>
                            {isSelected && (
                              <div className="w-5 h-5 rounded-full bg-cyan-400 flex items-center justify-center flex-shrink-0">
                                <span className="text-xs text-black font-bold">✓</span>
                              </div>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-cyan-600/20 to-blue-600/20 border border-cyan-500/30 rounded-2xl p-6 backdrop-blur sticky top-24">
              <h3 className="text-xl font-bold text-white mb-6">Stack Summary</h3>

              {selectedApis.length === 0 ? (
                <p className="text-gray-400 text-sm text-center py-8">
                  No APIs selected
                </p>
              ) : (
                <>
                  {/* Selected APIs */}
                  <div className="space-y-2 mb-6">
                    {selectedApis.map((api) => (
                      <div key={api.id} className="flex items-center justify-between p-2 bg-black/40 rounded">
                        <div className="flex-1">
                          <p className="font-medium text-white text-sm">{api.name}</p>
                          <p className="text-xs text-gray-400">${api.monthlyCost}/mo</p>
                        </div>
                        <button
                          onClick={() => handleRemoveApi(api.id)}
                          className="text-gray-400 hover:text-red-400 transition"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Cost Summary */}
                  <div className="space-y-3 pt-6 border-t border-cyan-400/20">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Monthly Cost:</span>
                      <span className="text-cyan-400 font-bold">${totalMonthlyCost}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Annual Cost:</span>
                      <span className="text-cyan-400 font-bold">${totalMonthlyCost * 12}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">APIs Count:</span>
                      <span className="text-cyan-400 font-bold">{selectedApis.length}</span>
                    </div>
                  </div>

                  {/* Save Button */}
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="w-full mt-6 px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition disabled:opacity-50"
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

