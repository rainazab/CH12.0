import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

/**
 * Search for APIs using semantic search
 */
export async function searchAPIs(query) {
  try {
    const response = await axios.post(`${API_BASE_URL}/search`, { query });

    return response.data.results || [];
  } catch (error) {
    console.error('API search error:', error);
    throw new Error('Failed to search APIs');
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
    throw new Error('Failed to fetch performance data');
  }
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
    return [];
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
    throw new Error('Failed to fetch system status');
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
    throw new Error('Failed to add API to monitoring');
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
    return { status: 'unhealthy', error: error.message };
  }
}
