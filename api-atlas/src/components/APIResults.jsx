import { useState } from 'react';
import { CheckCircle, XCircle, Clock, Star, ExternalLink, BarChart3 } from 'lucide-react';

const APIResults = ({ results, loading, onAPISelect, selectedAPIs }) => {
  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Searching for APIs...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!results || results.length === 0) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No APIs found
            </h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search terms or browse our popular APIs below.
            </p>
            <button className="btn-primary">
              Browse Popular APIs
            </button>
          </div>
        </div>
      </section>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'operational':
        return 'bg-green-100 text-green-800';
      case 'degraded':
        return 'bg-yellow-100 text-yellow-800';
      case 'down':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'operational':
        return <CheckCircle className="w-4 h-4" />;
      case 'degraded':
        return <Clock className="w-4 h-4" />;
      case 'down':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Results header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            API Results ({results.length})
          </h2>
          <p className="text-gray-600">
            Found {results.length} APIs matching your search. Click to select for comparison.
          </p>
        </div>

        {/* Results grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((api) => {
            const isSelected = selectedAPIs.some(selected => selected.id === api.id);

            return (
              <div
                key={api.id}
                className={`bg-white rounded-xl p-6 shadow-lg border transition-all duration-300 cursor-pointer hover:shadow-xl hover:scale-105 ${
                  isSelected ? 'ring-2 ring-blue-500 ring-opacity-50' : ''
                }`}
                onClick={() => onAPISelect(api)}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {api.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{api.name}</h3>
                      <p className="text-sm text-gray-500">{api.provider}</p>
                    </div>
                  </div>
                  {isSelected && (
                    <CheckCircle className="w-5 h-5 text-blue-500" />
                  )}
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {api.description}
                </p>

                {/* Performance indicators */}
                <div className="space-y-3 mb-4">
                  {/* Status */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Status</span>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(api.performance?.status)}`}>
                      {getStatusIcon(api.performance?.status)}
                      <span className="ml-1 capitalize">{api.performance?.status || 'unknown'}</span>
                    </span>
                  </div>

                  {/* Response time */}
                  {api.performance?.responseTime && (
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">Response Time</span>
                      <span className="text-sm font-medium text-gray-900">
                        {api.performance.responseTime}ms
                      </span>
                    </div>
                  )}

                  {/* Uptime */}
                  {api.performance?.uptime && (
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">Uptime</span>
                      <span className="text-sm font-medium text-gray-900">
                        {api.performance.uptime}%
                      </span>
                    </div>
                  )}
                </div>

                {/* Features */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {api.features?.slice(0, 3).map((feature, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                    {api.features?.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        +{api.features.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Pricing and relevance */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div>
                    <div className="text-lg font-bold text-gray-900">
                      ${api.performance?.monthlyCost?.toFixed(2) || '0.00'}
                    </div>
                    <div className="text-xs text-gray-500">per month</div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-gray-900">
                        {api.relevanceScore || 0}%
                      </span>
                    </div>

                    <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Selection indicator */}
                {isSelected && (
                  <div className="mt-4 pt-4 border-t border-blue-200 bg-blue-50 rounded-b-xl">
                    <div className="flex items-center justify-center text-blue-700 text-sm font-medium">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Selected for comparison
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Comparison CTA */}
        {selectedAPIs.length > 0 && (
          <div className="mt-12 text-center">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Compare Selected APIs
              </h3>
              <p className="text-blue-700 mb-4">
                You've selected {selectedAPIs.length} API{selectedAPIs.length > 1 ? 's' : ''} for comparison.
              </p>
              <button className="btn-primary">
                <BarChart3 className="w-4 h-4 mr-2" />
                View Comparison
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default APIResults;
