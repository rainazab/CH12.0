import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Code, Star, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { getAPIPerformance, getPerformanceHistory } from '../lib/api';

const APIDetail = () => {
  const { id } = useParams();
  const [api, setApi] = useState(null);
  const [performance, setPerformance] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadAPIData();
    }
  }, [id]);

  const loadAPIData = async () => {
    try {
      // In a real app, you'd fetch the API data from your backend
      // For now, we'll simulate with mock data
      const mockAPI = {
        id: 'openai-gpt4',
        name: 'OpenAI GPT-4',
        category: 'LLM',
        provider: 'OpenAI',
        description: 'Advanced language model for text generation, analysis, and conversation with function calling, vision capabilities, and JSON mode.',
        features: [
          'Text generation',
          'Function calling',
          'Vision capabilities',
          'JSON mode',
          'Streaming responses',
          'Multi-language support',
          'Code generation',
          'Context awareness'
        ],
        pricing: {
          model: 'pay-per-token',
          input: 0.01,
          output: 0.03,
          context: 128000
        },
        endpoint: 'https://api.openai.com/v1/chat/completions',
        docs_url: 'https://platform.openai.com/docs',
        rate_limits: '10000 requests/min',
        inputTypes: ['text', 'code'],
        outputTypes: ['text', 'json'],
        pricingModel: 'pay-per-use',
        freeTier: false,
        enterpriseReady: true,
        documentation: 'https://platform.openai.com/docs',
        tags: ['AI', 'NLP', 'Chat', 'Code', 'Enterprise'],
        popularity: 95,
        reliability: 98,
        easeOfUse: 90
      };

      setApi(mockAPI);

      // Load performance data
      const perfData = await getAPIPerformance(id);
      setPerformance(perfData.latest);

      const histData = await getPerformanceHistory(id);
      setHistory(histData);

    } catch (error) {
      console.error('Failed to load API data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'operational':
        return 'status-operational';
      case 'degraded':
        return 'status-degraded';
      case 'down':
        return 'status-down';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading API details...</p>
        </div>
      </div>
    );
  }

  if (!api) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            API Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The requested API could not be found.
          </p>
          <button
            onClick={() => window.history.back()}
            className="btn-primary"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => window.history.back()}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to results</span>
          </button>

          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">
                  {api.name.charAt(0)}
                </span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-1">
                  {api.name}
                </h1>
                <p className="text-gray-600 mb-2">{api.provider}</p>
                <div className="flex items-center space-x-4">
                  <span className={`status-indicator ${getStatusColor(performance?.status)}`}>
                    {performance?.status || 'unknown'}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{api.popularity}% popular</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900 mb-1">
                ${performance?.monthlyCost?.toFixed(2) || '0.00'}
              </div>
              <div className="text-sm text-gray-600 mb-3">per month</div>
              <a
                href={api.documentation}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center space-x-2"
              >
                <ExternalLink className="w-4 h-4" />
                <span>View Docs</span>
              </a>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Description
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {api.description}
          </p>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-sm text-gray-500">Response Time</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {performance?.responseTime || 'N/A'}ms
            </div>
            <div className="text-sm text-gray-600">
              Average over 24h
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-sm text-gray-500">Uptime</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {performance?.uptime || 'N/A'}%
            </div>
            <div className="text-sm text-gray-600">
              Last 30 days
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Star className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-sm text-gray-500">Reliability</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {api.reliability}%
            </div>
            <div className="text-sm text-gray-600">
              Overall score
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {api.features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              API Details
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Base URL</span>
                <span className="font-mono text-sm text-gray-900">{api.endpoint}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Category</span>
                <span className="text-gray-900">{api.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Pricing Model</span>
                <span className="text-gray-900">{api.pricingModel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Rate Limits</span>
                <span className="text-gray-900">{api.rate_limits}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Code Example
            </h2>
            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-green-400 text-sm">
{`import openai

client = openai.OpenAI(api_key="your-key")

response = client.chat.completions.create(
    model="gpt-4",
    messages=[{"role": "user", "content": "Hello!"}]
)

print(response.choices[0].message.content)`}
              </pre>
            </div>
          </div>
        </div>

        {/* Performance History Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Performance History (24h)
          </h2>
          <div className="h-64 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 mx-auto mb-2" />
              <p>Performance charts will be displayed here</p>
              <p className="text-sm">Response time and uptime over time</p>
            </div>
          </div>
        </div>

        {/* Alternatives */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Similar APIs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['Claude API', 'Gemini API', 'GPT-3.5'].map((altAPI, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors cursor-pointer">
                <h3 className="font-medium text-gray-900 mb-1">{altAPI}</h3>
                <p className="text-sm text-gray-600">Similar performance and features</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default APIDetail;
