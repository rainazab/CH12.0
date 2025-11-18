'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
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
    <div className="min-h-screen bg-black py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Compare APIs</h1>
          <p className="text-gray-400">Select APIs and enter a prompt to see how they respond</p>
        </div>

        {/* Prompt Input */}
        <div className="mb-12">
          <label className="block text-white font-semibold mb-3">Your Prompt</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe what you want the API to do..."
            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none resize-none h-24"
          />
        </div>

        {/* API Selection */}
        <div className="mb-12">
          <label className="block text-white font-semibold mb-4">Select APIs to Compare</label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
        <div className="mb-12">
          <button
            onClick={handleCompare}
            disabled={loading}
            className="w-full px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Running Comparison...' : 'Compare APIs'}
          </button>
        </div>

        {/* Results */}
        {Object.keys(results).length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
        )}
      </div>
    </div>
  );
}

