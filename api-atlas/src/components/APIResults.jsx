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

  const sortedResults = [...results].sort((a, b) => {
    if (sortBy === 'price') return (a.pricing?.input || 0) - (b.pricing?.input || 0);
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
              className="h-32 bg-gradient-to-r from-gray-200 to-gray-100 rounded-xl animate-pulse"
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
          <Zap className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No APIs found. Try a different search.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {results.length} APIs found
              </h2>
              <p className="text-gray-600">
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
                    ? 'bg-purple-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                Relevance
              </button>
              <button
                onClick={() => setSortBy('price')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  sortBy === 'price'
                    ? 'bg-purple-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                Price
              </button>
              <button
                onClick={() => setSortBy('reliability')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  sortBy === 'reliability'
                    ? 'bg-purple-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                Reliability
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
                className={`group bg-white rounded-xl border-2 transition overflow-hidden ${
                  isSelected
                    ? 'border-purple-500 shadow-lg shadow-purple-500/20'
                    : 'border-gray-200 hover:border-purple-300 hover:shadow-md'
                }`}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    {/* Left: API Info */}
                    <div className="flex gap-4 flex-1">
                      <div className="text-4xl">{api.icon || '⚙️'}</div>
                      <div className="flex-1">
                        <div className="flex items-start gap-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-900">{api.name}</h3>
                          {api.status === 'operational' && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                              <Zap className="w-3 h-3" />
                              Live
                            </span>
                          )}
                          {api.performance?.reliability > 98 && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                              <Lock className="w-3 h-3" />
                              Reliable
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 mb-3">{api.description}</p>

                        {/* Quick Stats */}
                        <div className="flex flex-wrap gap-4 mb-3">
                          {api.performance && (
                            <>
                              <div className="text-sm">
                                <span className="text-gray-500">Uptime:</span>
                                <span className="font-bold text-gray-900 ml-1">
                                  {api.performance.uptime}%
                                </span>
                              </div>
                              <div className="text-sm">
                                <span className="text-gray-500">Response:</span>
                                <span className="font-bold text-gray-900 ml-1">
                                  {api.performance.avgResponseTime}ms
                                </span>
                              </div>
                            </>
                          )}
                          <div className="text-sm">
                            <span className="text-gray-500">Category:</span>
                            <span className="font-bold text-gray-900 ml-1">
                              {api.category}
                            </span>
                          </div>
                        </div>

                        {/* Features */}
                        {api.features && (
                          <div className="flex flex-wrap gap-2 mb-3">
                            {api.features.slice(0, 3).map((feature) => (
                              <span
                                key={feature}
                                className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium"
                              >
                                {feature}
                              </span>
                            ))}
                            {api.features.length > 3 && (
                              <span className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium">
                                +{api.features.length - 3} more
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex flex-col items-end gap-3">
                      <button
                        onClick={() => onAPISelect(api)}
                        className={`p-2.5 rounded-lg font-semibold transition ${
                          isSelected
                            ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/40'
                            : 'bg-gray-100 text-gray-700 hover:bg-purple-100'
                        }`}
                      >
                        {isSelected ? (
                          <Check className="w-5 h-5" />
                        ) : (
                          <Plus className="w-5 h-5" />
                        )}
                      </button>

                      {/* Pricing */}
                      {api.pricing && (
                        <div className="text-right">
                          <div className="text-xs text-gray-500 mb-1">Starting at</div>
                          <div className="text-lg font-bold text-gray-900">
                            {api.pricing.model === 'pay-per-token' &&
                              `$${api.pricing.input}/1K tokens`}
                            {api.pricing.model === 'subscription' &&
                              `$${api.pricing.individual}/mo`}
                            {api.pricing.model === 'pay-per-image' &&
                              `$${api.pricing.standard}/image`}
                            {api.pricing.model === 'pay-per-character' &&
                              `$${api.pricing.cost}/1K chars`}
                            {api.pricing.model === 'pay-per-email' &&
                              `$${api.pricing.cost * 1000}/1M`}
                            {api.pricing.model === 'pay-per-minute' &&
                              `$${api.pricing.cost}/min`}
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
                    className="w-full flex items-center justify-center gap-2 text-purple-600 font-semibold hover:text-purple-700 transition py-2 border-t border-gray-200 mt-4 group/expand"
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
                    <div className="mt-4 pt-4 border-t border-gray-200 grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-bold text-gray-900 mb-3">Key Features</h4>
                        <ul className="space-y-2">
                          {api.features?.map((feature) => (
                            <li
                              key={feature}
                              className="flex items-center gap-2 text-gray-700"
                            >
                              <Check className="w-4 h-4 text-green-600" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-3">Quick Links</h4>
                        <div className="space-y-2">
                          <a
                            href={api.docs_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium"
                          >
                            Documentation
                            <ExternalLink className="w-4 h-4" />
                          </a>
                          <a
                            href={api.endpoint}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium"
                          >
                            API Endpoint
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
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
