import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Mock data for fallback when backend is not available
const mockAPIs = [
  {
    id: 'openai-gpt4',
    name: 'ChatGPT API',
    provider: 'OpenAI',
    category: 'text-generation',
    description: 'Advanced language model for text generation and conversation',
    features: ['Text generation', 'Function calling', 'JSON mode'],
    pricing: { model: 'pay-per-use' },
    popularity: 95,
    reliability: 98,
    relevanceScore: 0.9,
    performance: {
      status: 'operational',
      responseTime: 245,
      uptime: 99.8,
      errorRate: 0.2,
      lastChecked: new Date().toISOString()
    }
  },
  {
    id: 'anthropic-claude',
    name: 'Claude API',
    provider: 'Anthropic',
    category: 'text-generation',
    description: 'Constitutional AI for safe and helpful text generation',
    features: ['Safe AI', 'Large context', 'Vision capabilities'],
    pricing: { model: 'pay-per-use' },
    popularity: 75,
    reliability: 92,
    relevanceScore: 0.8,
    performance: {
      status: 'operational',
      responseTime: 320,
      uptime: 99.2,
      errorRate: 0.8,
      lastChecked: new Date().toISOString()
    }
  },
  {
    id: 'google-gemini',
    name: 'Gemini API',
    provider: 'Google',
    category: 'text-generation',
    description: 'Google\'s multimodal AI for text and vision tasks',
    features: ['Vision', 'Multimodal', 'Enterprise security'],
    pricing: { model: 'pay-per-use' },
    popularity: 70,
    reliability: 95,
    relevanceScore: 0.7,
    performance: {
      status: 'degraded',
      responseTime: 890,
      uptime: 97.5,
      errorRate: 2.5,
      lastChecked: new Date().toISOString()
    }
  },
  {
    id: 'openai-dalle',
    name: 'DALL-E API',
    provider: 'OpenAI',
    category: 'image-generation',
    description: 'AI image generation from text descriptions',
    features: ['Text-to-image', 'High quality', 'Commercial usage'],
    pricing: { model: 'pay-per-use' },
    popularity: 90,
    reliability: 96,
    relevanceScore: 0.8,
    performance: {
      status: 'operational',
      responseTime: 1200,
      uptime: 99.1,
      errorRate: 0.9,
      lastChecked: new Date().toISOString()
    }
  },
  {
    id: 'midjourney-api',
    name: 'Midjourney API',
    provider: 'Midjourney',
    category: 'image-generation',
    description: 'Professional-grade AI image generation',
    features: ['Artistic styles', 'High-quality', 'Commercial usage'],
    pricing: { model: 'subscription' },
    popularity: 85,
    reliability: 88,
    relevanceScore: 0.7,
    performance: {
      status: 'operational',
      responseTime: 2100,
      uptime: 98.5,
      errorRate: 1.5,
      lastChecked: new Date().toISOString()
    }
  },
  {
    id: 'github-copilot',
    name: 'GitHub Copilot API',
    provider: 'GitHub',
    category: 'code-generation',
    description: 'AI-powered code completion and generation',
    features: ['Code completion', 'Multi-language', 'IDE integration'],
    pricing: { model: 'subscription' },
    popularity: 92,
    reliability: 94,
    relevanceScore: 0.8,
    performance: {
      status: 'operational',
      responseTime: 180,
      uptime: 99.5,
      errorRate: 0.5,
      lastChecked: new Date().toISOString()
    }
  }
];

/**
 * Search for APIs using semantic search
 */
export async function searchAPIs(query) {
  try {
    console.log(`🔍 Searching for: ${query}`);
    console.log(`📡 API URL: ${API_BASE_URL}/search`);

    const response = await axios.post(`${API_BASE_URL}/search`, { query }, {
      timeout: 10000, // 10 second timeout
      headers: {
        'Content-Type': 'application/json',
      }
    });

    console.log('✅ Backend search successful:', response.data.results?.length || 0);
    return response.data.results || [];
  } catch (error) {
    console.error('❌ API search error:', error);
    console.log('📋 Error details:', {
      message: error.message,
      code: error.code,
      status: error.response?.status,
      url: API_BASE_URL
    });
    console.log('📋 Using mock data as fallback');

    // Filter mock data based on query keywords
    const queryLower = query.toLowerCase();
    const filtered = mockAPIs.filter(api =>
      api.name.toLowerCase().includes(queryLower) ||
      api.description.toLowerCase().includes(queryLower) ||
      api.category.toLowerCase().includes(queryLower) ||
      api.features.some(feature => feature.toLowerCase().includes(queryLower))
    );

    // If no specific matches, return all mock APIs
    return filtered.length > 0 ? filtered : mockAPIs.slice(0, 6);
  }
}

/**
 * Get search suggestions
 */
export async function getSearchSuggestions(query) {
  try {
    const response = await axios.get(`${API_BASE_URL}/search/suggestions`, {
      params: { q: query }
    });

    return response.data.suggestions || [];
  } catch (error) {
    console.error('Suggestions error:', error);
    return [];
  }
}

/**
 * Get performance data for an API
 */
export async function getAPIPerformance(apiId, period = '24h') {
  try {
    const response = await axios.get(`${API_BASE_URL}/performance/${apiId}`, {
      params: { period }
    });

    return response.data;
  } catch (error) {
    console.error('Performance data error:', error);
    // Return mock performance data
    return {
      apiId,
      period,
      latest: {
        status: 'operational',
        responseTime: 250 + Math.random() * 500,
        uptime: 99 + Math.random(),
        errorRate: Math.random() * 2,
        lastChecked: new Date().toISOString()
      },
      timeSeries: generateMockTimeSeries()
    };
  }
}

/**
 * Generate mock time series data for charts
 */
function generateMockTimeSeries(hours = 24) {
  const data = [];
  const now = new Date();

  for (let i = hours; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - (i * 60 * 60 * 1000));
    data.push({
      timestamp: timestamp.toISOString(),
      responseTime: 200 + Math.random() * 800,
      uptime: 98 + Math.random() * 2,
      errorRate: Math.random() * 3
    });
  }

  return data;
}

/**
 * Get performance history for charts
 */
export async function getPerformanceHistory(apiId, hours = 24) {
  try {
    const response = await axios.get(`${API_BASE_URL}/performance/${apiId}/history`, {
      params: { hours }
    });

    return response.data.data || [];
  } catch (error) {
    console.error('Performance history error:', error);
    return generateMockTimeSeries(hours);
  }
}

/**
 * Get overall system status
 */
export async function getSystemStatus() {
  try {
    const response = await axios.get(`${API_BASE_URL}/performance/status/all`);
    return response.data;
  } catch (error) {
    console.error('System status error:', error);
    // Return mock system status
    return {
      total: mockAPIs.length,
      operational: Math.floor(mockAPIs.length * 0.8),
      degraded: Math.floor(mockAPIs.length * 0.15),
      down: Math.floor(mockAPIs.length * 0.05),
      averageResponseTime: 350,
      averageUptime: 99.2,
      lastUpdated: new Date().toISOString()
    };
  }
}

/**
 * Add API to monitoring
 */
export async function addAPIToMonitoring(apiData) {
  try {
    const response = await axios.post(`${API_BASE_URL}/monitor/add`, { apiData });
    return response.data;
  } catch (error) {
    console.error('Add to monitoring error:', error);
    // Return mock success response
    return {
      success: true,
      message: `API ${apiData.name} added to monitoring (mock)`,
      timestamp: new Date().toISOString()
    };
  }
}

/**
 * Health check
 */
export async function healthCheck() {
  try {
    const response = await axios.get(`${API_BASE_URL}/health`);
    return response.data;
  } catch (error) {
    console.error('Health check error:', error);
    return {
      status: 'unhealthy',
      error: error.message,
      timestamp: new Date().toISOString(),
      services: {
        chroma: 'unavailable',
        elastic: 'unavailable'
      }
    };
  }
}
