import express from 'express';
import { searchAPIs } from '../services/chroma.js';
import { getPerformanceData } from '../services/elastic.js';
import { calculateRelevanceScore } from '../services/scoring.js';

const router = express.Router();

/**
 * POST /api/search
 * Search for APIs using natural language query
 */
router.post('/', async (req, res) => {
  try {
    const { query } = req.body;

    if (!query || query.trim().length === 0) {
      return res.status(400).json({
        error: 'Query is required',
        message: 'Please provide a search query'
      });
    }

    console.log(`🔍 Searching for: "${query}"`);

    // 1. Get semantic search results from Chroma
    const chromaResults = await searchAPIs(query);

    // 2. Get performance data for each API from Elastic
    const performancePromises = chromaResults.map(async (api) => {
      try {
        const performance = await getPerformanceData(api.id);
        return {
          ...api,
          performance: performance || {
            status: 'unknown',
            responseTime: null,
            uptime: null,
            lastChecked: null
          }
        };
      } catch (error) {
        console.error(`Error fetching performance for ${api.id}:`, error.message);
        return {
          ...api,
          performance: {
            status: 'unknown',
            responseTime: null,
            uptime: null,
            lastChecked: null
          }
        };
      }
    });

    const resultsWithPerformance = await Promise.all(performancePromises);

    // 3. Calculate final relevance scores
    const finalResults = resultsWithPerformance.map(api => ({
      ...api,
      relevanceScore: calculateRelevanceScore(api)
    }));

    // 4. Sort by relevance score
    finalResults.sort((a, b) => b.relevanceScore - a.relevanceScore);

    console.log(`✅ Found ${finalResults.length} API matches`);

    res.json({
      query,
      results: finalResults.slice(0, 10), // Top 10 results
      total: finalResults.length,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({
      error: 'Search failed',
      message: error.message
    });
  }
});

/**
 * GET /api/search/suggestions
 * Get search suggestions based on partial query
 */
router.get('/suggestions', async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.length < 2) {
      return res.json({ suggestions: [] });
    }

    // Simple keyword-based suggestions (can be enhanced with ML)
    const suggestions = [
      'image generation API',
      'payment processing API',
      'email sending API',
      'SMS messaging API',
      'chatbot API',
      'text to speech API',
      'speech to text API',
      'document conversion API',
      'weather API',
      'maps and location API'
    ].filter(suggestion =>
      suggestion.toLowerCase().includes(q.toLowerCase())
    ).slice(0, 5);

    res.json({ suggestions });
  } catch (error) {
    console.error('Suggestions error:', error);
    res.status(500).json({ error: 'Failed to get suggestions' });
  }
});

export default router;
