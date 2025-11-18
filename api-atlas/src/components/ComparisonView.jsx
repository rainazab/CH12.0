import { useState } from 'react';
import {
  X,
  Check,
  AlertCircle,
  TrendingUp,
  Zap,
  DollarSign,
  Shield,
} from 'lucide-react';

export default function ComparisonView({ apis }) {
  const [viewMode, setViewMode] = useState('overview');

  if (!apis || apis.length === 0) {
    return null;
  }

  const categories = [
    {
      name: 'Performance',
      items: [
        { label: 'Uptime', key: 'uptime' },
        { label: 'Avg Response Time', key: 'avgResponseTime' },
        { label: 'Reliability Score', key: 'reliability' },
      ],
    },
    {
      name: 'Pricing',
      items: [
        { label: 'Model', key: 'model' },
        { label: 'Starting Price', key: 'input' },
      ],
    },
    {
      name: 'Features',
      items: [],
    },
  ];

  const getPerformanceColor = (score) => {
    if (score >= 98) return 'bg-green-100 text-green-700';
    if (score >= 95) return 'bg-yellow-100 text-yellow-700';
    return 'bg-red-100 text-red-700';
  };

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            API Comparison
          </h2>
          <p className="text-gray-600 text-lg">
            Compare {apis.length} {apis.length === 1 ? 'API' : 'APIs'} side-by-side
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setViewMode('overview')}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              viewMode === 'overview'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <TrendingUp className="w-4 h-4 inline mr-2" />
            Overview
          </button>
          <button
            onClick={() => setViewMode('performance')}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              viewMode === 'performance'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Zap className="w-4 h-4 inline mr-2" />
            Performance
          </button>
          <button
            onClick={() => setViewMode('pricing')}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              viewMode === 'pricing'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <DollarSign className="w-4 h-4 inline mr-2" />
            Pricing
          </button>
          <button
            onClick={() => setViewMode('features')}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              viewMode === 'features'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Check className="w-4 h-4 inline mr-2" />
            Features
          </button>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-lg">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 w-40">
                  Metric
                </th>
                {apis.map((api) => (
                  <th key={api.id} className="px-6 py-4 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-2xl">{api.icon || '⚙️'}</span>
                      <div>
                        <p className="font-bold text-gray-900">{api.name}</p>
                        <p className="text-xs text-gray-500">{api.provider}</p>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Overview */}
              {viewMode === 'overview' && (
                <>
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">Category</td>
                    {apis.map((api) => (
                      <td key={api.id} className="px-6 py-4 text-center text-gray-700">
                        {api.category}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">Status</td>
                    {apis.map((api) => (
                      <td key={api.id} className="px-6 py-4 text-center">
                        {api.status === 'operational' ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                            <Zap className="w-3 h-3" />
                            Operational
                          </span>
                        ) : (
                          <span className="text-gray-500">N/A</span>
                        )}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">SLA</td>
                    {apis.map((api) => (
                      <td key={api.id} className="px-6 py-4 text-center text-gray-700">
                        {api.sla || 'Not published'}
                      </td>
                    ))}
                  </tr>
                </>
              )}

              {/* Performance */}
              {viewMode === 'performance' && (
                <>
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">Uptime</td>
                    {apis.map((api) => (
                      <td key={api.id} className="px-6 py-4 text-center">
                        {api.performance?.uptime ? (
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${getPerformanceColor(
                              api.performance.uptime
                            )}`}
                          >
                            {api.performance.uptime}%
                          </span>
                        ) : (
                          <span className="text-gray-400">N/A</span>
                        )}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">
                      Avg Response Time
                    </td>
                    {apis.map((api) => (
                      <td key={api.id} className="px-6 py-4 text-center text-gray-700">
                        {api.performance?.avgResponseTime
                          ? `${api.performance.avgResponseTime}ms`
                          : 'N/A'}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">
                      Reliability Score
                    </td>
                    {apis.map((api) => (
                      <td key={api.id} className="px-6 py-4 text-center">
                        {api.performance?.reliability ? (
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${getPerformanceColor(
                              api.performance.reliability
                            )}`}
                          >
                            {api.performance.reliability}/100
                          </span>
                        ) : (
                          <span className="text-gray-400">N/A</span>
                        )}
                      </td>
                    ))}
                  </tr>
                </>
              )}

              {/* Pricing */}
              {viewMode === 'pricing' && (
                <>
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">
                      Pricing Model
                    </td>
                    {apis.map((api) => (
                      <td key={api.id} className="px-6 py-4 text-center text-gray-700">
                        <span className="capitalize">
                          {api.pricing?.model || 'N/A'}
                        </span>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">Free Tier</td>
                    {apis.map((api) => (
                      <td key={api.id} className="px-6 py-4 text-center">
                        {api.pricing?.freeTier ? (
                          <Check className="w-5 h-5 text-green-600 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-red-600 mx-auto" />
                        )}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">
                      Starting Price
                    </td>
                    {apis.map((api) => (
                      <td key={api.id} className="px-6 py-4 text-center">
                        <div className="font-bold text-gray-900">
                          {api.pricing?.model === 'pay-per-token' &&
                            `$${api.pricing.input}`}
                          {api.pricing?.model === 'subscription' &&
                            `$${api.pricing.individual}/mo`}
                          {api.pricing?.model === 'pay-per-image' &&
                            `$${api.pricing.standard}`}
                          {api.pricing?.model === 'pay-per-character' &&
                            `$${api.pricing.cost}`}
                          {!['pay-per-token', 'subscription', 'pay-per-image', 'pay-per-character'].includes(
                            api.pricing?.model
                          ) && 'Custom'}
                        </div>
                      </td>
                    ))}
                  </tr>
                </>
              )}

              {/* Features */}
              {viewMode === 'features' && (
                <>
                  {apis[0]?.features &&
                    apis[0].features.map((_, featureIndex) => {
                      const featureName = apis[0].features[featureIndex];
                      return (
                        <tr
                          key={featureIndex}
                          className="border-b border-gray-200 hover:bg-gray-50"
                        >
                          <td className="px-6 py-4 font-semibold text-gray-900">
                            {featureName}
                          </td>
                          {apis.map((api) => (
                            <td key={api.id} className="px-6 py-4 text-center">
                              {api.features?.includes(featureName) ? (
                                <Check className="w-5 h-5 text-green-600 mx-auto" />
                              ) : (
                                <X className="w-5 h-5 text-gray-300 mx-auto" />
                              )}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                </>
              )}
            </tbody>
          </table>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex gap-4 justify-center">
          <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-purple-500/40 transition">
            View Detailed Comparison
          </button>
          <button className="px-8 py-3 bg-white border-2 border-purple-600 text-purple-600 font-bold rounded-lg hover:bg-purple-50 transition">
            Export Comparison
          </button>
        </div>
      </div>
    </div>
  );
}
