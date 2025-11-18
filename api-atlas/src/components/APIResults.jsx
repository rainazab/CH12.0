import { useState } from 'react';
import {
  Check,
  Zap,
  Star,
  TrendingUp,
  Lock,
  ExternalLink,
  ChevronDown,
} from 'lucide-react';

export default function APIResults({
  results,
  loading,
  onAPISelect,
  selectedAPIs,
}) {
  const [expandedAPI, setExpandedAPI] = useState(null);
  const [sortBy, setSortBy] = useState('relevance');
  const [userVolume, setUserVolume] = useState(100000); // requests/month
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'matrix'

  // Honest Gotchas - real issues vendors don't advertise
  const gotchas = {
    'ChatGPT API': ['Rate limit: 3.5K req/min', 'Hallucination: 3-5%', 'Context window: 128K tokens max', 'Latency variance by region'],
    'DALL-E 3': ['Rate limit: 50 req/min', 'Burst penalty: +50% on overages', 'Queue time in peak hours', 'Image quality variance'],
    'Stripe API': ['Rate limits per API key', 'Webhook delivery can be delayed', 'PCI compliance required', 'Settlement delays (1-3 days)'],
    'ElevenLabs TTS': ['Concurrent limit: 3 simultaneous', 'Latency: 200-800ms variance', 'Quality drops with long text', 'Regional availability limited'],
  };

  // Calculate monthly cost based on volume
  const calculateMonthlyCost = (api, volume) => {
    if (!api.pricing) return 0;
    const basePrice = api.pricing.input || api.pricing.cost || 0;
    return (volume * basePrice) / 1000; // assuming per 1K pricing
  };

  const sortedResults = [...results].sort((a, b) => {
    if (sortBy === 'price') return calculateMonthlyCost(a, userVolume) - calculateMonthlyCost(b, userVolume);
    if (sortBy === 'reliability') return (b.performance?.reliability || 0) - (a.performance?.reliability || 0);
    return (b.relevanceScore || 0) - (a.relevanceScore || 0);
  });

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-32 bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-12">
          <Zap className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">No APIs found. Try a different search.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">
                {results.length} APIs found
              </h2>
              <p className="text-gray-400">
                {selectedAPIs.length > 0
                  ? `${selectedAPIs.length} API(s) selected for comparison`
                  : 'Select APIs to compare'}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setSortBy('relevance')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  sortBy === 'relevance'
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/40'
                    : 'bg-gray-900 text-gray-300 border border-gray-700 hover:bg-gray-800'
                }`}
              >
                Relevance
              </button>
              <button
                onClick={() => setSortBy('price')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  sortBy === 'price'
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/40'
                    : 'bg-gray-900 text-gray-300 border border-gray-700 hover:bg-gray-800'
                }`}
              >
                Price
              </button>
              <button
                onClick={() => setSortBy('reliability')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  sortBy === 'reliability'
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/40'
                    : 'bg-gray-900 text-gray-300 border border-gray-700 hover:bg-gray-800'
                }`}
              >
                Reliability
              </button>
            </div>
          </div>

          {/* Cost Calculator & View Toggle */}
          <div className="flex justify-between items-center gap-4 p-4 bg-gray-900/50 border border-gray-800 rounded-xl">
            <div className="flex items-center gap-4">
              <label className="text-sm text-gray-400">Monthly Volume:</label>
              <input
                type="number"
                value={userVolume}
                onChange={(e) => setUserVolume(parseInt(e.target.value) || 0)}
                className="px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white text-sm w-32 focus:border-cyan-500 focus:outline-none"
                placeholder="requests/month"
              />
              <span className="text-cyan-400 font-semibold text-sm">
                ~${(sortedResults.length > 0 ? calculateMonthlyCost(sortedResults[0], userVolume) : 0).toFixed(2)}/mo avg
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-2 rounded text-sm font-medium transition ${
                  viewMode === 'grid'
                    ? 'bg-cyan-600 text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                Grid View
              </button>
              <button
                onClick={() => setViewMode('matrix')}
                className={`px-3 py-2 rounded text-sm font-medium transition ${
                  viewMode === 'matrix'
                    ? 'bg-cyan-600 text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                Comparison Matrix
              </button>
            </div>
          </div>
        </div>

        {/* Results Grid */}
        <div className="space-y-4">
          {sortedResults.map((api) => {
            const isSelected = selectedAPIs.some((a) => a.id === api.id);

            return (
              <div
                key={api.id}
                className={`group bg-gray-900/50 backdrop-blur rounded-xl border-2 transition overflow-hidden ${
                  isSelected
                    ? 'border-purple-500 shadow-lg shadow-purple-500/20'
                    : 'border-gray-700/50 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10'
                }`}
              >
                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    {/* Left: API Info - Compact */}
                    <div className="flex gap-3 flex-1 min-w-0">
                      <div className="text-3xl flex-shrink-0">{api.icon || '⚙️'}</div>
                      <div className="flex-1 min-w-0">
                        {/* Name + Status */}
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h3 className="text-lg font-bold text-white">{api.name}</h3>
                          {api.status === 'operational' && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-500/20 text-green-400 text-xs font-semibold rounded-full border border-green-500/30">
                              <Zap className="w-3 h-3" />
                              Live
                            </span>
                          )}
                        </div>

                        {/* One-line description */}
                        <p className="text-sm text-gray-400 mb-2 line-clamp-1">{api.description}</p>

                        {/* Compact Stats */}
                        <div className="flex gap-3 text-xs text-gray-400 flex-wrap">
                          {api.performance?.uptime && (
                            <span>📊 {api.performance.uptime}% uptime</span>
                          )}
                          {api.performance?.avgResponseTime && (
                            <span>⚡ {api.performance.avgResponseTime}ms</span>
                          )}
                          {api.category && (
                            <span>🏷️ {api.category}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right: CTA + Price - Compact */}
                    <div className="flex flex-col items-end gap-2 flex-shrink-0">
                      <button
                        onClick={() => onAPISelect(api)}
                        className={`p-2 rounded-lg font-semibold transition ${
                          isSelected
                            ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/40'
                            : 'bg-gray-800 text-gray-400 hover:bg-gray-700 border border-gray-700'
                        }`}
                      >
                        {isSelected ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Plus className="w-4 h-4" />
                        )}
                      </button>

                      {/* Price - Inline */}
                      {api.pricing && (
                        <div className="text-right text-xs">
                          <div className="text-cyan-400 font-bold">
                            ${calculateMonthlyCost(api, userVolume).toFixed(0)}/mo
                          </div>
                          <div className="text-gray-500 text-xs">
                            {api.pricing.input ? `$${api.pricing.input}/1K` : api.pricing.cost}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Expanded Details */}
                  <button
                    onClick={() =>
                      setExpandedAPI(expandedAPI === api.id ? null : api.id)
                    }
                    className="w-full flex items-center justify-center gap-2 text-purple-400 font-semibold hover:text-purple-300 transition py-2 border-t border-gray-700 mt-4 group/expand"
                  >
                    {expandedAPI === api.id ? 'Hide' : 'Show'} Details
                    <ChevronDown
                      className={`w-4 h-4 transition ${
                        expandedAPI === api.id ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {/* Expanded Content */}
                  {expandedAPI === api.id && (
                    <div className="mt-4 pt-4 border-t border-gray-700 space-y-4">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-bold text-white mb-3">Key Features</h4>
                          <ul className="space-y-2">
                            {api.features?.map((feature) => (
                              <li
                                key={feature}
                                className="flex items-center gap-2 text-gray-300"
                              >
                                <Check className="w-4 h-4 text-green-500" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-bold text-white mb-3">Quick Links</h4>
                          <div className="space-y-2">
                            <a
                              href={api.docs_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-purple-400 hover:text-purple-300 font-medium"
                            >
                              Documentation
                              <ExternalLink className="w-4 h-4" />
                            </a>
                            <a
                              href={api.endpoint}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-purple-400 hover:text-purple-300 font-medium"
                            >
                              API Endpoint
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* HONEST GOTCHAS - The secret sauce */}
                      {gotchas[api.name] && (
                        <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-4 mt-4">
                          <h4 className="font-bold text-red-400 mb-3 flex items-center gap-2">
                            ⚠️ Honest Gotchas (What vendors don't advertise)
                          </h4>
                          <ul className="space-y-2">
                            {gotchas[api.name].map((gotcha, idx) => (
                              <li key={idx} className="flex items-start gap-3 text-gray-300 text-sm">
                                <span className="text-red-400 mt-1">•</span>
                                {gotcha}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Helper component for Plus icon
function Plus({ className }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 4v16m8-8H4"
      />
    </svg>
  );
}
