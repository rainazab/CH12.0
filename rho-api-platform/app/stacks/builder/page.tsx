'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowLeft, Plus, X, DollarSign, Zap, TrendingUp } from 'lucide-react';

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
    {
      id: 'aws-polly',
      name: 'AWS Polly',
      provider: 'AWS',
      cost: '$0.0000167/char',
      monthlyCost: 25,
      category: 'voice-tts',
      uptime: '99.99%',
      latency: '200-400ms',
      icon: '📢',
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
    {
      id: 'square',
      name: 'Square Payments',
      provider: 'Square',
      cost: '2.9% + $0.30',
      monthlyCost: 190,
      category: 'payments',
      uptime: '99.9%',
      latency: '150-250ms',
      icon: '🏪',
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
    {
      id: 'segment',
      name: 'Segment',
      provider: 'Segment',
      cost: '$120/mo',
      monthlyCost: 120,
      category: 'analytics',
      uptime: '99.99%',
      latency: '1-2s',
      icon: '🔗',
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

export default function StackBuilderPage() {
  const searchParams = useSearchParams();
  const categories = searchParams.get('categories')?.split(',').filter(Boolean) || [];
  const useCase = searchParams.get('useCase') || '';
  const priority = searchParams.get('priority') || '';

  const [selectedApis, setSelectedApis] = useState<StackAPI[]>([]);

  const totalMonthlyCost = selectedApis.reduce((sum, api) => sum + api.monthlyCost, 0);
  const avgUptime = selectedApis.length > 0
    ? (selectedApis.reduce((sum, api) => sum + parseFloat(api.uptime), 0) / selectedApis.length).toFixed(2)
    : '0';

  const handleSelectApi = (api: StackAPI) => {
    const isSelected = selectedApis.find(a => a.id === api.id);
    if (isSelected) {
      setSelectedApis(selectedApis.filter(a => a.id !== api.id));
    } else {
      setSelectedApis([...selectedApis, api]);
    }
  };

  const handleRemoveApi = (apiId: string) => {
    setSelectedApis(selectedApis.filter(a => a.id !== apiId));
  };

  return (
    <div className="min-h-screen bg-black py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Link href="/stacks/questionnaire" className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Questionnaire
          </Link>

          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-4">
            Build Your{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              API Stack
            </span>
          </h1>
          <p className="text-xl text-gray-400 mb-2">
            Use Case: <span className="text-cyan-400">{useCase}</span> • Priority: <span className="text-cyan-400">{priority}</span>
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Side - API Selection */}
          <div className="lg:col-span-2 space-y-8">
            {categories.length > 0 ? (
              categories.map((category) => (
                <div key={category}>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    {categoryLabels[category] || category}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(apiDatabase[category] || []).map((api) => {
                      const isSelected = selectedApis.find(a => a.id === api.id);
                      return (
                        <button
                          key={api.id}
                          onClick={() => handleSelectApi(api)}
                          className={`p-6 rounded-xl border-2 transition duration-300 text-left group ${
                            isSelected
                              ? 'bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border-cyan-400/60'
                              : 'bg-gray-900/50 border-gray-800 hover:border-gray-700'
                          }`}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <span className="text-3xl">{api.icon}</span>
                            {isSelected && (
                              <div className="w-5 h-5 rounded-full bg-cyan-400 flex items-center justify-center">
                                <span className="text-xs text-black font-bold">✓</span>
                              </div>
                            )}
                          </div>
                          <h3 className="font-semibold text-white group-hover:text-cyan-300 transition">
                            {api.name}
                          </h3>
                          <p className="text-xs text-gray-500 mb-3">{api.provider}</p>
                          <div className="space-y-1 text-xs text-gray-400">
                            <p>💰 {api.cost}</p>
                            <p>⚡ Uptime: {api.uptime}</p>
                            <p>⏱️ Latency: {api.latency}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400">No categories selected. Please go back and complete the questionnaire.</p>
              </div>
            )}
          </div>

          {/* Right Side - Stack Summary & Cost */}
          <div className="lg:col-span-1">
            {/* Stack Composition */}
            <div className="bg-gradient-to-br from-cyan-600/20 to-blue-600/20 border border-cyan-500/30 rounded-2xl p-6 backdrop-blur sticky top-24">
              <h3 className="text-xl font-bold text-white mb-4">Your Stack</h3>

              {selectedApis.length === 0 ? (
                <p className="text-gray-400 text-sm text-center py-8">
                  Select APIs to build your stack
                </p>
              ) : (
                <>
                  {/* Selected APIs */}
                  <div className="space-y-3 mb-6">
                    {selectedApis.map((api) => (
                      <div key={api.id} className="flex items-start justify-between p-3 bg-black/40 rounded-lg">
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

                  {/* Cost Breakdown */}
                  <div className="space-y-3 pt-6 border-t border-cyan-400/20">
                    <div className="flex items-center gap-2 mb-4">
                      <DollarSign className="w-5 h-5 text-cyan-400" />
                      <h4 className="font-semibold text-white">Cost Breakdown</h4>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Monthly Cost:</span>
                        <span className="text-cyan-400 font-bold">${totalMonthlyCost}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Annual Cost:</span>
                        <span className="text-cyan-400 font-bold">${totalMonthlyCost * 12}</span>
                      </div>
                    </div>

                    {/* Performance Metrics */}
                    <div className="space-y-2 pt-4 border-t border-cyan-400/20">
                      <div className="flex items-center gap-2 mb-3">
                        <Zap className="w-5 h-5 text-cyan-400" />
                        <h4 className="font-semibold text-white text-sm">Stack Performance</h4>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Avg Uptime:</span>
                        <span className="text-cyan-400 font-bold">{avgUptime}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">APIs Selected:</span>
                        <span className="text-cyan-400 font-bold">{selectedApis.length}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3 pt-6">
                      <button className="w-full px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition">
                        🔍 Compare Results
                      </button>
                      <button className="w-full px-4 py-2 border border-cyan-400/50 text-cyan-400 font-semibold rounded-lg hover:bg-cyan-400/10 transition">
                        💾 Save Stack
                      </button>
                      <button className="w-full px-4 py-2 border border-cyan-400/50 text-cyan-400 font-semibold rounded-lg hover:bg-cyan-400/10 transition">
                        🔗 Share Stack
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
