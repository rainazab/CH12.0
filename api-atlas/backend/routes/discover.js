import express from 'express';
import * as openaiService from '../services/openai.js';

const router = express.Router();

// Semantic search for APIs
router.post('/search', async (req, res) => {
  try {
    const { query } = req.body;

    if (!query || query.trim().length === 0) {
      return res.status(400).json({ error: 'Query is required' });
    }

    const results = await openaiService.semanticSearch(query);

    res.json({
      success: true,
      query,
      count: results.length,
      results,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({
      error: 'Search failed',
      message: error.message,
    });
  }
});

// Get recommendations based on use case
router.post('/recommendations', async (req, res) => {
  try {
    const { useCase, budget, requirements = [] } = req.body;

    if (!useCase) {
      return res.status(400).json({ error: 'Use case is required' });
    }

    const recommendations = await openaiService.getRecommendations(useCase, budget, requirements);

    res.json({
      success: true,
      useCase,
      recommendations,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Recommendations error:', error);
    res.status(500).json({
      error: 'Recommendations failed',
      message: error.message,
    });
  }
});

// Compare APIs
router.post('/compare', async (req, res) => {
  try {
    const { apiIds } = req.body;

    if (!apiIds || !Array.isArray(apiIds) || apiIds.length < 2) {
      return res.status(400).json({ error: 'At least 2 API IDs required for comparison' });
    }

    const comparison = await openaiService.compareAPIs(apiIds);

    res.json({
      success: true,
      comparison,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Comparison error:', error);
    res.status(500).json({
      error: 'Comparison failed',
      message: error.message,
    });
  }
});

// Get API insights
router.get('/insights/:apiId', async (req, res) => {
  try {
    const { apiId } = req.params;
    const { context } = req.query;

    const insights = await openaiService.generateAPIInsights(apiId, context);

    res.json({
      success: true,
      insights,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Insights error:', error);
    res.status(500).json({
      error: 'Insights generation failed',
      message: error.message,
    });
  }
});

// Get trending APIs
router.get('/trending', async (req, res) => {
  try {
    const { industry = 'general' } = req.query;

    const trends = await openaiService.getTrendingAPIs(industry);

    res.json({
      success: true,
      trends,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Trends error:', error);
    res.status(500).json({
      error: 'Trends generation failed',
      message: error.message,
    });
  }
});

export default router;

