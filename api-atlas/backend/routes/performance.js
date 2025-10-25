import express from 'express';
import { getPerformanceData, getTimeSeriesData } from '../services/elastic.js';

const router = express.Router();

/**
 * GET /api/performance/:apiId
 * Get latest performance metrics for an API
 */
router.get('/:apiId', async (req, res) => {
  try {
    const { apiId } = req.params;
    const { period = '24h' } = req.query;

    console.log(`📊 Fetching performance data for ${apiId} (${period})`);

    // Get latest performance data
    const latestData = await getPerformanceData(apiId);

    // Get time series data for charts
    const timeSeriesData = await getTimeSeriesData(apiId, period);

    res.json({
      apiId,
      period,
      latest: latestData,
      timeSeries: timeSeriesData,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Performance fetch error:', error);
    res.status(500).json({
      error: 'Failed to fetch performance data',
      message: error.message
    });
  }
});

/**
 * GET /api/performance/:apiId/history
 * Get historical performance data for charts
 */
router.get('/:apiId/history', async (req, res) => {
  try {
    const { apiId } = req.params;
    const { hours = 24 } = req.query;

    const hoursNum = parseInt(hours);
    if (isNaN(hoursNum) || hoursNum < 1 || hoursNum > 168) {
      return res.status(400).json({
        error: 'Invalid hours parameter',
        message: 'Hours must be between 1 and 168'
      });
    }

    console.log(`📈 Fetching ${hoursNum}h performance history for ${apiId}`);

    const historyData = await getTimeSeriesData(apiId, `${hoursNum}h`);

    res.json({
      apiId,
      hours: hoursNum,
      data: historyData,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Performance history error:', error);
    res.status(500).json({
      error: 'Failed to fetch performance history',
      message: error.message
    });
  }
});

/**
 * GET /api/performance/status/all
 * Get status overview for all monitored APIs
 */
router.get('/status/all', async (req, res) => {
  try {
    console.log('🌐 Fetching status overview for all APIs');

    // In a real implementation, you'd query Elastic for all APIs
    // For now, return mock data structure
    const statusOverview = {
      total: 15,
      operational: 12,
      degraded: 2,
      down: 1,
      unknown: 0,
      averageResponseTime: 245, // ms
      averageUptime: 99.2, // %
      lastUpdated: new Date().toISOString()
    };

    res.json(statusOverview);

  } catch (error) {
    console.error('Status overview error:', error);
    res.status(500).json({
      error: 'Failed to fetch status overview',
      message: error.message
    });
  }
});

export default router;
