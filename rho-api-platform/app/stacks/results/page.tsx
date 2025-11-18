'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowLeft, Copy, Check } from 'lucide-react';

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

interface APIResult {
  api: StackAPI;
  output: string;
  latency: number;
  cost: number;
  code: string;
}

const mockResults: APIResult[] = [
  {
    api: {
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
    output: 'This is a sophisticated response from GPT-4 Omni that demonstrates advanced reasoning capabilities and contextual understanding. It processes queries with exceptional accuracy and nuance.',
    latency: 245,
    cost: 0.05,
    code: `import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function queryGPT4(prompt: string) {
  const response = await client.chat.completions.create({
    model: 'gpt-4-1106-preview',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
  });
  return response.choices[0].message.content;
}`,
  },
  {
    api: {
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
    output: 'Claude 3 provides thoughtful analysis with strong ethical considerations. It excels at understanding nuance and providing comprehensive explanations with clear reasoning chains.',
    latency: 312,
    cost: 0.15,
    code: `import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

async function queryClaude(prompt: string) {
  const response = await client.messages.create({
    model: 'claude-3-opus-20240229',
    max_tokens: 1024,
    messages: [{ role: 'user', content: prompt }],
  });
  return response.content[0].text;
}`,
  },
  {
    api: {
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
    output: 'Gemini Pro delivers fast, efficient responses with excellent cost-effectiveness. It provides accurate information processing with multi-modal capabilities.',
    latency: 198,
    cost: 0.005,
    code: `import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(
  process.env.GOOGLE_API_KEY
);

async function queryGemini(prompt: string) {
  const model = genAI.getGenerativeModel({ 
    model: 'gemini-1.5-pro' 
  });
  const result = await model.generateContent(prompt);
  return result.response.text();
}`,
  },
];

export default function ResultsPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'output' | 'code'>('output');

  const handleCopyCode = (code: string, apiId: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(apiId);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const totalCost = mockResults.reduce((sum, r) => sum + r.cost, 0);
  const avgLatency = Math.round(mockResults.reduce((sum, r) => sum + r.latency, 0) / mockResults.length);

  return (
    <div className="min-h-screen bg-black py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Link href="/stacks/builder" className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Stack Builder
          </Link>

          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-4">
            Stack Comparison{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Results
            </span>
          </h1>
          <p className="text-xl text-gray-400">
            See how your selected APIs compare in real-time
          </p>
        </div>

        {/* Overall Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <div className="bg-gradient-to-br from-cyan-600/20 to-blue-600/20 border border-cyan-500/30 rounded-xl p-6">
            <p className="text-gray-400 text-sm mb-2">Total Stack Cost</p>
            <p className="text-3xl font-bold text-cyan-400">${totalCost.toFixed(3)}</p>
            <p className="text-xs text-gray-500 mt-2">Per comparison</p>
          </div>
          <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-xl p-6">
            <p className="text-gray-400 text-sm mb-2">Average Latency</p>
            <p className="text-3xl font-bold text-blue-400">{avgLatency}ms</p>
            <p className="text-xs text-gray-500 mt-2">Response time</p>
          </div>
          <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-xl p-6">
            <p className="text-gray-400 text-sm mb-2">APIs Compared</p>
            <p className="text-3xl font-bold text-purple-400">{mockResults.length}</p>
            <p className="text-xs text-gray-500 mt-2">In your stack</p>
          </div>
        </div>

        {/* Results Comparison */}
        <div className="space-y-8">
          {mockResults.map((result) => (
            <div
              key={result.api.id}
              className="bg-gradient-to-br from-gray-900/80 to-black/80 border border-gray-800/50 rounded-2xl overflow-hidden backdrop-blur"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-gray-900/50 to-black/50 border-b border-gray-800/50 px-8 py-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-4xl">{result.api.icon}</span>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{result.api.name}</h3>
                    <p className="text-gray-400 text-sm">{result.api.provider}</p>
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <p className="text-xs text-gray-500">Cost per request</p>
                  <p className="text-2xl font-bold text-cyan-400">${result.cost.toFixed(4)}</p>
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-4 px-8 py-4 border-b border-gray-800/50 bg-black/30">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Latency</p>
                  <p className="text-lg font-bold text-white">{result.latency}ms</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Uptime</p>
                  <p className="text-lg font-bold text-white">{result.api.uptime}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Monthly Cost</p>
                  <p className="text-lg font-bold text-white">${result.api.monthlyCost}</p>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-gray-800/50">
                <button
                  onClick={() => setActiveTab('output')}
                  className={`flex-1 px-8 py-4 font-semibold transition ${
                    activeTab === 'output'
                      ? 'border-b-2 border-cyan-400 text-cyan-400'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  📤 API Response
                </button>
                <button
                  onClick={() => setActiveTab('code')}
                  className={`flex-1 px-8 py-4 font-semibold transition ${
                    activeTab === 'code'
                      ? 'border-b-2 border-cyan-400 text-cyan-400'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  💻 Code Snippet
                </button>
              </div>

              {/* Content */}
              <div className="px-8 py-6">
                {activeTab === 'output' ? (
                  <div className="space-y-4">
                    <div className="bg-black/60 border border-gray-800/50 rounded-lg p-6">
                      <p className="text-gray-300 leading-relaxed">{result.output}</p>
                    </div>
                    <div className="text-xs text-gray-500">
                      <p>✅ Response quality: Excellent</p>
                      <p>✅ Formatting: Clean and readable</p>
                      <p>✅ Context awareness: Strong</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="relative">
                      <button
                        onClick={() => handleCopyCode(result.code, result.api.id)}
                        className="absolute top-4 right-4 px-3 py-1 bg-cyan-400/20 hover:bg-cyan-400/30 text-cyan-400 rounded text-xs font-medium transition flex items-center gap-1 z-10"
                      >
                        {copiedCode === result.api.id ? (
                          <>
                            <Check className="w-3 h-3" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            Copy
                          </>
                        )}
                      </button>
                      <pre className="bg-black/60 border border-gray-800/50 rounded-lg p-6 overflow-x-auto">
                        <code className="text-gray-300 text-sm font-mono">{result.code}</code>
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Cost Comparison Chart */}
        <div className="mt-16 bg-gradient-to-br from-cyan-600/20 to-blue-600/20 border border-cyan-500/30 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-white mb-8">Monthly Cost Breakdown</h3>
          <div className="space-y-4">
            {mockResults.map((result) => (
              <div key={result.api.id} className="space-y-2">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-white">{result.api.name}</span>
                  <span className="text-cyan-400 font-bold">${result.api.monthlyCost}/mo</span>
                </div>
                <div className="w-full bg-black/40 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full"
                    style={{ width: `${(result.api.monthlyCost / 150) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 p-4 bg-black/60 rounded-lg border border-cyan-400/20">
            <p className="text-gray-300">
              <span className="font-bold text-cyan-400">${mockResults.reduce((sum, r) => sum + r.api.monthlyCost, 0)}/month</span>
              {' '}for your entire stack
            </p>
            <p className="text-xs text-gray-500 mt-2">
              💡 Tip: Gemini Pro offers the best cost-to-performance ratio for this use case.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-12 space-y-4 sm:space-y-0 sm:flex gap-4">
          <Link
            href="/stacks/builder"
            className="flex-1 px-6 py-3 border border-gray-700 text-gray-300 rounded-lg hover:border-gray-600 hover:text-white transition text-center font-semibold"
          >
            ← Back to Builder
          </Link>
          <button className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition font-semibold">
            💾 Save Stack
          </button>
          <button className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg hover:shadow-2xl hover:shadow-purple-500/50 transition font-semibold">
            🔗 Share Results
          </button>
        </div>
      </div>
    </div>
  );
}

