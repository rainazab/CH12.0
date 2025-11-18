'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import ApiCard from '@/components/ApiCard';
import CompareOutputPanel from '@/components/CompareOutputPanel';
import apis from '@/data/apis.json';

interface ComparisonResult {
  [key: string]: {
    output: string;
    latency: number;
    error?: string;
  };
}

export default function ComparePage() {
  const searchParams = useSearchParams();
  const [selectedApis, setSelectedApis] = useState<string[]>([]);
  const [prompt, setPrompt] = useState('');
  const [results, setResults] = useState<ComparisonResult>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const q = searchParams.get('q');
    if (q) {
      setPrompt(decodeURIComponent(q));
    }
  }, [searchParams]);

  const handleApiSelect = (apiId: string) => {
    setSelectedApis((prev) =>
      prev.includes(apiId) ? prev.filter((id) => id !== apiId) : [...prev.slice(-1), apiId]
    );
  };

  const handleCompare = async () => {
    if (!prompt.trim() || selectedApis.length === 0) {
      alert('Please enter a prompt and select at least one API');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/compare', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          apis: selectedApis,
        }),
      });

      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Comparison failed:', error);
      alert('Failed to run comparison');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-6xl lg:text-7xl font-bold text-white mb-2">
            Compare <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">APIs</span>
          </h1>
          <p className="text-xl text-gray-400 mb-8">Choose how you want to compare APIs</p>
          
          {/* Three Options Banner */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {/* Option 1: Quick Compare */}
            <div className="p-4 border border-cyan-500/30 rounded-lg bg-cyan-500/5 backdrop-blur">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 flex items-center justify-center">
                  <Image src="/icon/bolt.png" alt="bolt" width={24} height={24} style={{ objectFit: 'contain' }} />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">Quick Compare</h3>
                  <p className="text-sm text-gray-400">Pick APIs & test instantly below</p>
                </div>
              </div>
            </div>
            
            {/* Option 2: Guided Stack */}
            <div className="p-4 border border-purple-500/30 rounded-lg bg-purple-500/5 backdrop-blur">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 flex items-center justify-center">
                  <Image src="/icon/target.png" alt="target" width={24} height={24} style={{ objectFit: 'contain' }} />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">Guided Stack</h3>
                  <p className="text-sm text-gray-400">Answer questions, we'll recommend</p>
                </div>
              </div>
            </div>
            
            {/* Option 3: Saved Stacks */}
            <div className="p-4 border border-green-500/30 rounded-lg bg-green-500/5 backdrop-blur">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 flex items-center justify-center">
                  <Image src="/icon/cloud.png" alt="cloud" width={24} height={24} style={{ objectFit: 'contain' }} />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">Saved Stacks</h3>
                  <p className="text-sm text-gray-400">View your built stacks (Pro+)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action Links */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Link 
              href="/stacks/questionnaire"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white font-bold rounded-lg hover:shadow-2xl hover:shadow-purple-500/50 transition transform hover:scale-105 text-center flex items-center justify-center gap-2"
            >
              <div className="w-5 h-5 flex items-center justify-center">
                <Image src="/icon/target.png" alt="target" width={20} height={20} style={{ objectFit: 'contain' }} />
              </div>
              Start Guided Questionnaire
            </Link>
            <Link 
              href="/stacks/my-stacks"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-lg hover:shadow-2xl hover:shadow-green-500/50 transition transform hover:scale-105 text-center flex items-center justify-center gap-2"
            >
              <div className="w-5 h-5 flex items-center justify-center">
                <Image src="/icon/cloud.png" alt="cloud" width={20} height={20} style={{ objectFit: 'contain' }} />
              </div>
              View My Stacks
            </Link>
          </div>
          
          <div className="border-t border-gray-700/50 pt-8">
            <p className="text-sm text-gray-400 mb-4">Or use the <span className="text-cyan-400 font-semibold">Quick Compare</span> below to test APIs right away:</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Side - Input & API Selection */}
          <div className="lg:col-span-1 space-y-6">
            {/* Section Header */}
            <div className="bg-gradient-to-r from-cyan-600/10 to-blue-600/10 border border-cyan-500/30 rounded-xl p-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <div className="w-7 h-7 flex items-center justify-center">
                  <Image src="/icon/bolt.png" alt="bolt" width={28} height={28} style={{ objectFit: 'contain' }} />
                </div>
                Quick Compare
              </h2>
              <p className="text-sm text-gray-400 mt-2">Test APIs instantly with a custom prompt</p>
            </div>

            {/* Prompt Input */}
            <div>
              <label className="block text-white font-bold mb-3 text-sm uppercase tracking-wider text-gray-300">
                <span className="text-cyan-400">Step 1:</span> Enter Your Prompt
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Example: Generate a creative product name for a coffee shop..."
                className="w-full px-4 py-4 bg-gradient-to-br from-gray-900 to-gray-800 border border-cyan-500/30 rounded-xl text-white placeholder-gray-600 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 resize-none h-32 transition duration-300"
              />
              <p className="text-xs text-gray-500 mt-2">Be specific for better results</p>
            </div>

            {/* API Selection */}
            <div>
              <label className="block text-white font-bold mb-4 text-sm uppercase tracking-wider text-gray-300">
                <span className="text-cyan-400">Step 2:</span> Select APIs to Compare
              </label>
              <div className="bg-gray-900/30 border border-gray-800/50 rounded-xl p-3 mb-3">
                {selectedApis.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {selectedApis.map((apiId) => {
                      const api = apis.find((a) => a.id === apiId);
                      return (
                        <div key={apiId} className="bg-cyan-500/20 border border-cyan-400/40 rounded-lg px-3 py-1 flex items-center gap-2">
                          <span className="text-sm font-semibold text-cyan-300">{api?.name}</span>
                          <button
                            onClick={() => handleApiSelect(apiId)}
                            className="text-cyan-400 hover:text-cyan-200 transition"
                          >
                            ✕
                          </button>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">Select at least 1 API below</p>
                )}
              </div>
              
              <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
                {apis.map((api) => (
                  <ApiCard
                    key={api.id}
                    {...api}
                    onSelect={handleApiSelect}
                    selected={selectedApis.includes(api.id)}
                  />
                ))}
              </div>
            </div>

            {/* Compare Button */}
            <button
              onClick={handleCompare}
              disabled={loading || selectedApis.length === 0}
              className="w-full px-8 py-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white font-bold text-lg rounded-xl hover:shadow-2xl hover:shadow-cyan-500/40 transition duration-300 transform hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin">⚙️</span>
                  Running Comparison...
                </span>
              ) : (
                <>
                  <Image src="/icon/paperplane.png" alt="rocket" width={20} height={20} className="w-5 h-5" />
                  Compare {selectedApis.length} {selectedApis.length === 1 ? 'API' : 'APIs'}
                </>
              )}
            </button>
          </div>

          {/* Right Side - Results */}
          <div className="lg:col-span-2">
            {Object.keys(results).length > 0 ? (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-500/30 rounded-xl p-4">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    <div className="w-7 h-7 flex items-center justify-center">
                      <Image src="/icon/chart.png" alt="chart" width={28} height={28} style={{ objectFit: 'contain' }} />
                    </div>
                    Comparison Results
                  </h2>
                  <p className="text-sm text-gray-400 mt-2">See side-by-side outputs from all selected APIs</p>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  {selectedApis.map((apiId) => {
                    const api = apis.find((a) => a.id === apiId);
                    const result = results[apiId];

                    return (
                      <CompareOutputPanel
                        key={apiId}
                        apiId={apiId}
                        apiName={api?.name || apiId}
                        output={result?.output}
                        latency={result?.latency || 0}
                        error={result?.error}
                        loading={loading}
                      />
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="h-full min-h-96 flex items-center justify-center">
                <div className="text-center space-y-6 p-8 border-2 border-dashed border-gray-700/50 rounded-xl">
                  <div className="flex justify-center">
                    <Image src="/icon/target.png" alt="target" width={56} height={56} className="w-14 h-14" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Ready to Compare?</h3>
                    <p className="text-gray-400">Fill out the form on the left and click <span className="text-cyan-400 font-semibold">Compare</span> to see results here</p>
                  </div>
                  <div className="pt-4 border-t border-gray-700/50">
                    <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
                      <div className="w-4 h-4 flex items-center justify-center">
                        <Image src="/icon/bolt.png" alt="bolt" width={16} height={16} style={{ objectFit: 'contain' }} />
                      </div>
                      Results appear here in real-time as you test
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

