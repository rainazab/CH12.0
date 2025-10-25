import express from 'express';
import { addAPIToMonitoring } from '../services/elastic.js';
import { addAPIToChroma } from '../services/chroma.js';

const router = express.Router();

/**
 * POST /api/monitor/add
 * Add a new API to monitoring system
 */
router.post('/add', async (req, res) => {
  try {
    const { apiData } = req.body;

    if (!apiData || !apiData.name || !apiData.endpoint) {
      return res.status(400).json({
        error: 'Invalid API data',
        message: 'API name and endpoint are required'
      });
    }

    console.log(`🔧 Adding API to monitoring: ${apiData.name}`);

    // 1. Add to Chroma for semantic search
    const chromaResult = await addAPIToChroma(apiData);

    // 2. Set up monitoring in Elastic
    const elasticResult = await addAPIToMonitoring(apiData);

    res.json({
      success: true,
      message: `API ${apiData.name} added to monitoring`,
      data: {
        chroma: chromaResult,
        elastic: elasticResult
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Add to monitoring error:', error);
    res.status(500).json({
      error: 'Failed to add API to monitoring',
      message: error.message
    });
  }
});

/**
 * DELETE /api/monitor/:apiId
 * Remove API from monitoring
 */
router.delete('/:apiId', async (req, res) => {
  try {
    const { apiId } = req.params;

    console.log(`🗑️ Removing API from monitoring: ${apiId}`);

    // In a real implementation, you'd remove from both Chroma and Elastic
    // For now, return success response
    res.json({
      success: true,
      message: `API ${apiId} removed from monitoring`,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Remove from monitoring error:', error);
    res.status(500).json({
      error: 'Failed to remove API from monitoring',
      message: error.message
    });
  }
});

/**
 * GET /api/monitor/agents
 * Get status of monitoring agents
 */
router.get('/agents', async (req, res) => {
  try {
    console.log('📋 Fetching monitoring agents status');

    // In a real implementation, you'd check Elastic Agent status
    const agentsStatus = {
      total: 15,
      active: 13,
      inactive: 2,
      lastHealthCheck: new Date().toISOString(),
      agents: [
        {
          id: 'agent-1',
          apiId: 'openai-gpt4',
          status: 'active',
          lastCheck: new Date().toISOString(),
          responseTime: 1250
        },
        {
          id: 'agent-2',
          apiId: 'anthropic-claude',
          status: 'active',
          lastCheck: new Date().toISOString(),
          responseTime: 890
        }
        // More agents...
      ]
    };

    res.json(agentsStatus);

  } catch (error) {
    console.error('Agents status error:', error);
    res.status(500).json({
      error: 'Failed to fetch agents status',
      message: error.message
    });
  }
});

export default router;
