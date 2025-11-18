'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
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
          <h1 className="text-6xl lg:text-7xl font-bold text-white mb-4">
            Compare <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">APIs</span>
          </h1>
          <p className="text-xl text-gray-400 mb-6">Select APIs and enter a prompt to see how they respond</p>
          
          {/* Stack Builder CTA */}
          <Link 
            href="/stacks/questionnaire"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white font-bold rounded-lg hover:shadow-2xl hover:shadow-purple-500/50 transition transform hover:scale-105"
          >
            🎯 Build a Stack Instead
            <span>→</span>
          </Link>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Side - Input & API Selection */}
          <div className="lg:col-span-1 space-y-8">
            {/* Prompt Input */}
            <div>
              <label className="block text-white font-bold mb-3 text-lg">Your Prompt</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe what you want the API to do..."
                className="w-full px-4 py-4 bg-gradient-to-br from-gray-900 to-gray-800 border border-cyan-500/30 rounded-xl text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 resize-none h-32 transition duration-300"
              />
            </div>

            {/* API Selection */}
            <div>
              <label className="block text-white font-bold mb-4 text-lg">Select APIs to Compare</label>
              <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
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
              className="w-full px-8 py-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-cyan-500/40 transition duration-300 transform hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin">⚙️</span>
                  Running Comparison...
                </span>
              ) : (
                'Compare APIs'
              )}
            </button>
          </div>

          {/* Right Side - Results */}
          <div className="lg:col-span-2">
            {Object.keys(results).length > 0 ? (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white mb-6">Results</h2>
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
              <div className="h-full flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="text-6xl">🚀</div>
                  <h3 className="text-2xl font-bold text-white">Ready to Compare?</h3>
                  <p className="text-gray-400">Select APIs and enter a prompt to see side-by-side results</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

