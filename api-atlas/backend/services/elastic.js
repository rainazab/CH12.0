import { Client } from '@elastic/elasticsearch';

// Initialize Elastic client
const elasticClient = new Client({
  node: process.env.ELASTIC_URL || 'http://localhost:9200',
  auth: {
    username: process.env.ELASTIC_USERNAME || 'elastic',
    password: process.env.ELASTIC_PASSWORD || 'changeme'
  },
  requestTimeout: 60000,
  pingTimeout: 3000,
});

// Index names
const PERFORMANCE_INDEX = 'api-atlas-performance';
const METRICS_INDEX = 'api-atlas-metrics';

/**
 * Get latest performance data for an API
 */
export async function getPerformanceData(apiId) {
  try {
    // Query for latest performance data (last 24 hours)
    const result = await elasticClient.search({
      index: PERFORMANCE_INDEX,
      body: {
        query: {
          bool: {
            must: [
              { term: { api_id: apiId } },
              {
                range: {
                  timestamp: {
                    gte: 'now-24h'
                  }
                }
              }
            ]
          }
        },
        sort: [{ timestamp: { order: 'desc' } }],
        size: 100
      }
    });

    if (result.hits.hits.length === 0) {
      return {
        apiId,
        status: 'unknown',
        responseTime: null,
        uptime: null,
        errorRate: null,
        lastChecked: null,
        sampleSize: 0
      };
    }

    const hits = result.hits.hits;
    const latest = hits[0]._source;

    // Calculate metrics from recent data
    const recentHits = hits.slice(0, Math.min(20, hits.length));
    const totalRequests = recentHits.length;
    const successfulRequests = recentHits.filter(hit =>
      hit._source.status === 'operational' || hit._source.status === 200
    ).length;
    const avgResponseTime = recentHits.reduce((sum, hit) =>
      sum + (hit._source.response_time_ms || 0), 0
    ) / totalRequests;
    const errorRate = ((totalRequests - successfulRequests) / totalRequests) * 100;

    return {
      apiId,
      status: latest.status || 'unknown',
      responseTime: Math.round(avgResponseTime),
      uptime: Math.round((successfulRequests / totalRequests) * 10000) / 100, // Convert to percentage with 2 decimals
      errorRate: Math.round(errorRate * 100) / 100,
      lastChecked: latest.timestamp,
      sampleSize: totalRequests
    };

  } catch (error) {
    console.error('Elastic performance query error:', error);
    throw new Error(`Failed to fetch performance data: ${error.message}`);
  }
}

/**
 * Get time series data for charts
 */
export async function getTimeSeriesData(apiId, period = '24h') {
  try {
    // Calculate time range
    const timeRange = period.endsWith('h') ? `${period}` : '24h';
    const rangeFilter = timeRange === '24h' ? 'now-24h' :
                       timeRange === '7d' ? 'now-7d' : 'now-24h';

    const result = await elasticClient.search({
      index: PERFORMANCE_INDEX,
      body: {
        query: {
          bool: {
            must: [
              { term: { api_id: apiId } },
              {
                range: {
                  timestamp: {
                    gte: rangeFilter
                  }
                }
              }
            ]
          }
        },
        sort: [{ timestamp: { order: 'asc' } }],
        size: 1000, // Get up to 1000 data points
        _source: ['timestamp', 'response_time_ms', 'status', 'error_rate']
      }
    });

    // Group data by hour for better visualization
    const hourlyData = {};
    result.hits.hits.forEach(hit => {
      const data = hit._source;
      const hour = new Date(data.timestamp).toISOString().slice(0, 13); // YYYY-MM-DDTHH

      if (!hourlyData[hour]) {
        hourlyData[hour] = {
          timestamp: hour,
          responseTime: 0,
          requestCount: 0,
          errorCount: 0
        };
      }

      hourlyData[hour].responseTime += data.response_time_ms || 0;
      hourlyData[hour].requestCount += 1;

      if (data.status !== 'operational' && data.status !== 200) {
        hourlyData[hour].errorCount += 1;
      }
    });

    // Calculate averages and format
    return Object.values(hourlyData).map(hour => ({
      timestamp: hour.timestamp,
      responseTime: Math.round(hour.responseTime / hour.requestCount),
      uptime: Math.round(((hour.requestCount - hour.errorCount) / hour.requestCount) * 10000) / 100,
      errorRate: Math.round((hour.errorCount / hour.requestCount) * 10000) / 100
    }));

  } catch (error) {
    console.error('Elastic time series query error:', error);
    throw new Error(`Failed to fetch time series data: ${error.message}`);
  }
}

/**
 * Add API to monitoring (create Elastic agent)
 */
export async function addAPIToMonitoring(apiData) {
  try {
    console.log(`🔧 Setting up monitoring for ${apiData.name}`);

    // In a real implementation, you'd create an Elastic Agent
    // For now, simulate the setup and return success
    const agentConfig = {
      apiId: apiData.id,
      name: apiData.name,
      endpoint: apiData.endpoint,
      checkInterval: 5, // minutes
      timeout: 10, // seconds
      createdAt: new Date().toISOString(),
      status: 'active'
    };

    // Simulate adding initial performance data
    await simulateInitialPerformanceData(apiData.id);

    return {
      success: true,
      agentId: `agent-${apiData.id}`,
      config: agentConfig
    };

  } catch (error) {
    console.error('Elastic monitoring setup error:', error);
    throw new Error(`Failed to set up monitoring: ${error.message}`);
  }
}

/**
 * Simulate initial performance data for a new API
 */
async function simulateInitialPerformanceData(apiId) {
  try {
    // Generate mock performance data for the last 24 hours
    const now = new Date();
    const mockData = [];

    for (let i = 24; i >= 0; i--) {
      const timestamp = new Date(now.getTime() - (i * 60 * 60 * 1000));

      // Simulate realistic performance metrics
      const baseResponseTime = 500 + Math.random() * 1000; // 500-1500ms
      const errorRate = Math.random() * 0.1; // 0-10% error rate
      const status = errorRate < 0.05 ? 'operational' : errorRate < 0.08 ? 'degraded' : 'down';

      mockData.push({
        api_id: apiId,
        timestamp: timestamp.toISOString(),
        response_time_ms: Math.round(baseResponseTime),
        status,
        error_rate: Math.round(errorRate * 10000) / 100,
        region: 'us-east'
      });
    }

    // In a real implementation, you'd bulk insert to Elastic
    console.log(`📊 Simulated ${mockData.length} performance records for ${apiId}`);

    return { inserted: mockData.length };

  } catch (error) {
    console.error('Simulation error:', error);
    throw error;
  }
}

/**
 * Get overall system health
 */
export async function getSystemHealth() {
  try {
    // Check Elastic cluster health
    const health = await elasticClient.cluster.health();

    return {
      status: health.status,
      indices: health.indices,
      nodes: health.number_of_nodes,
      timestamp: new Date().toISOString()
    };

  } catch (error) {
    console.error('Elastic health check error:', error);
    throw new Error(`Failed to check system health: ${error.message}`);
  }
}

/**
 * Initialize indices (run once during setup)
 */
export async function initializeIndices() {
  try {
    console.log('📋 Setting up Elastic indices...');

    // Create performance index if it doesn't exist
    const performanceIndexExists = await elasticClient.indices.exists({
      index: PERFORMANCE_INDEX
    });

    if (!performanceIndexExists.body) {
      await elasticClient.indices.create({
        index: PERFORMANCE_INDEX,
        body: {
          mappings: {
            properties: {
              api_id: { type: 'keyword' },
              timestamp: { type: 'date' },
              response_time_ms: { type: 'integer' },
              status: { type: 'keyword' },
              error_rate: { type: 'float' },
              region: { type: 'keyword' }
            }
          }
        }
      });
      console.log(`✅ Created index: ${PERFORMANCE_INDEX}`);
    }

    return { success: true, indices: [PERFORMANCE_INDEX] };

  } catch (error) {
    console.error('Index initialization error:', error);
    throw new Error(`Failed to initialize indices: ${error.message}`);
  }
}
