import { useState } from 'react';
import { Trophy, TrendingUp, DollarSign, Zap, Shield, Code, Image, MessageSquare } from 'lucide-react';

const ComparisonView = ({ apis }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!apis || apis.length < 2) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Compare APIs Side by Side
          </h2>
          <p className="text-gray-600 mb-6">
            Select at least 2 APIs to start comparing their features, performance, and pricing.
          </p>
        </div>
      </section>
    );
  }

  const tabs = [
    { id: 'overview', name: 'Overview', icon: TrendingUp },
    { id: 'performance', name: 'Performance', icon: Zap },
    { id: 'pricing', name: 'Pricing', icon: DollarSign },
    { id: 'features', name: 'Features', icon: Shield }
  ];

  const getCategoryIcon = (category) => {
    switch (category.toLowerCase()) {
      case 'llm':
      case 'text generation':
        return <MessageSquare className="w-5 h-5" />;
      case 'image generation':
        return <Image className="w-5 h-5" />;
      case 'code generation':
        return <Code className="w-5 h-5" />;
      default:
        return <Zap className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'operational':
        return 'text-green-600 bg-green-100';
      case 'degraded':
        return 'text-yellow-600 bg-yellow-100';
      case 'down':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            API Comparison
          </h2>
          <p className="text-gray-600">
            Side-by-side comparison of {apis.length} selected APIs
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-100 rounded-lg p-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Comparison content */}
        <div className="overflow-x-auto">
          <div className="min-w-full">
            {activeTab === 'overview' && (
              <div className="grid gap-6" style={{ gridTemplateColumns: `repeat(${apis.length}, 1fr)` }}>
                {apis.map((api, index) => (
                  <div key={api.id} className="space-y-4">
                    {/* API Header */}
                    <div className="text-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl mx-auto mb-3 flex items-center justify-center">
                        {getCategoryIcon(api.category)}
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1">{api.name}</h3>
                      <p className="text-sm text-gray-500">{api.provider}</p>
                    </div>

                    {/* Key metrics */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-600">Status</span>
                        <div className={`status-indicator ${getStatusColor(api.performance?.status)}`}>
                          <span className="capitalize">{api.performance?.status || 'unknown'}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-600">Response Time</span>
                        <span className="font-medium text-gray-900">
                          {api.performance?.responseTime || 'N/A'}ms
                        </span>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-600">Uptime</span>
                        <span className="font-medium text-gray-900">
                          {api.performance?.uptime || 'N/A'}%
                        </span>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-600">Monthly Cost</span>
                        <span className="font-bold text-gray-900">
                          ${api.performance?.monthlyCost?.toFixed(2) || '0.00'}
                        </span>
                      </div>
                    </div>

                    {/* Winner badge */}
                    {index === 0 && (
                      <div className="text-center">
                        <div className="inline-flex items-center space-x-1 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                          <Trophy className="w-4 h-4" />
                          <span>Best Match</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'performance' && (
              <div className="space-y-6">
                <div className="grid gap-6" style={{ gridTemplateColumns: `repeat(${apis.length}, 1fr)` }}>
                  {apis.map((api) => (
                    <div key={api.id} className="space-y-4">
                      <h3 className="font-semibold text-gray-900">{api.name}</h3>

                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600">Response Time</span>
                            <span className="font-medium">{api.performance?.responseTime || 'N/A'}ms</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                              style={{
                                width: `${Math.min(100, (api.performance?.responseTime || 1000) / 10)}%`
                              }}
                            ></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600">Uptime</span>
                            <span className="font-medium">{api.performance?.uptime || 'N/A'}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-500 h-2 rounded-full transition-all duration-300"
                              style={{
                                width: `${api.performance?.uptime || 0}%`
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'pricing' && (
              <div className="space-y-6">
                <div className="grid gap-6" style={{ gridTemplateColumns: `repeat(${apis.length}, 1fr)` }}>
                  {apis.map((api) => (
                    <div key={api.id} className="space-y-4">
                      <h3 className="font-semibold text-gray-900">{api.name}</h3>

                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-900 mb-1">
                            ${api.performance?.monthlyCost?.toFixed(2) || '0.00'}
                          </div>
                          <div className="text-sm text-gray-600 mb-3">per month</div>

                          <div className="text-xs text-gray-500">
                            {api.pricingModel || 'Pay per use'}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'features' && (
              <div className="space-y-6">
                {apis.map((api) => (
                  <div key={api.id} className="border border-gray-200 rounded-lg p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">{api.name}</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {api.features?.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-12 text-center space-x-4">
          <button className="btn-primary">
            Select Winner
          </button>
          <button className="btn-secondary">
            View Details
          </button>
        </div>
      </div>
    </section>
  );
};

export default ComparisonView;
