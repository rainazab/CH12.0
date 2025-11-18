import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 30000,
});

// Add request interceptor
api.interceptors.request.use((config) => {
  console.log(`📤 Request: ${config.method.toUpperCase()} ${config.url}`);
  return config;
});

// Add response interceptor
api.interceptors.response.use(
  (response) => {
    console.log(`✅ Response: ${response.status} ${response.statusText}`);
    return response.data;
  },
  (error) => {
    console.error(`❌ Error: ${error.message}`);
    throw error;
  }
);

// Search APIs using semantic search
export const searchAPIs = async (query) => {
  try {
    const response = await api.post('/discover/search', { query });
    return response.results || [];
  } catch (error) {
    console.error('Search error:', error);
    throw error;
  }
};

// Get AI-powered recommendations
export const getRecommendations = async (useCase, budget, requirements = []) => {
  try {
    const response = await api.post('/discover/recommendations', {
      useCase,
      budget,
      requirements,
    });
    return response.recommendations;
  } catch (error) {
    console.error('Recommendations error:', error);
    throw error;
  }
};

// Compare APIs
export const compareAPIs = async (apiIds) => {
  try {
    const response = await api.post('/discover/compare', { apiIds });
    return response.comparison;
  } catch (error) {
    console.error('Comparison error:', error);
    throw error;
  }
};

// Get detailed insights about an API
export const getAPIInsights = async (apiId, context = '') => {
  try {
    const response = await api.get(`/discover/insights/${apiId}`, {
      params: { context },
    });
    return response.insights;
  } catch (error) {
    console.error('Insights error:', error);
    throw error;
  }
};

// Get trending APIs
export const getTrendingAPIs = async (industry = 'general') => {
  try {
    const response = await api.get('/discover/trending', {
      params: { industry },
    });
    return response.trends;
  } catch (error) {
    console.error('Trending APIs error:', error);
    throw error;
  }
};

// Health check
export const healthCheck = async () => {
  try {
    const response = await api.get('/health');
    return response;
  } catch (error) {
    console.error('Health check error:', error);
    throw error;
  }
};

export default {
  searchAPIs,
  getRecommendations,
  compareAPIs,
  getAPIInsights,
  getTrendingAPIs,
  healthCheck,
};
