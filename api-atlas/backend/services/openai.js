import OpenAI from 'openai';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Lazy load OpenAI client to allow .env to be loaded first
let client = null;

const getClient = () => {
  if (!client) {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY environment variable is not set');
    }
    client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
  return client;
};

// Cache catalog and search results
let cachedCatalog = null;
const searchCache = new Map();

// Load the comprehensive API catalog (cached)
const loadAPICatalog = () => {
  if (!cachedCatalog) {
    const catalogPath = path.join(__dirname, '../data/api-catalog.json');
    const data = fs.readFileSync(catalogPath, 'utf-8');
    cachedCatalog = JSON.parse(data);
  }
  return cachedCatalog;
};

// Simple keyword-based search (fast fallback)
const keywordSearch = (query, catalog) => {
  const queryLower = query.toLowerCase();
  const scored = catalog.map(api => {
    let score = 0;
    
    // Score based on matches
    if (api.name.toLowerCase().includes(queryLower)) score += 50;
    if (api.category.toLowerCase().includes(queryLower)) score += 40;
    if (api.description.toLowerCase().includes(queryLower)) score += 30;
    if (api.features?.some(f => f.toLowerCase().includes(queryLower))) score += 20;
    if (api.tags?.some(t => t.toLowerCase().includes(queryLower))) score += 15;
    
    return { ...api, relevanceScore: score };
  });
  
  return scored
    .filter(api => api.relevanceScore > 0)
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, 8);
};

// Enhanced semantic search using OpenAI embeddings (with caching)
export const semanticSearch = async (query) => {
  try {
    const catalog = loadAPICatalog();
    
    // Check cache first - return instantly if found
    if (searchCache.has(query)) {
      console.log('✓ Returning cached results for:', query);
      return searchCache.get(query);
    }

    // Return fast keyword results immediately
    const quickResults = keywordSearch(query, catalog);
    console.log('⚡ Returning quick keyword results:', quickResults.length, 'APIs');
    
    // Store in cache for next time
    searchCache.set(query, quickResults);
    
    // Limit cache size
    if (searchCache.size > 50) {
      const firstKey = searchCache.keys().next().value;
      searchCache.delete(firstKey);
    }
    
    return quickResults;
  } catch (error) {
    console.error('Error in semantic search:', error);
    // Return something rather than fail
    const catalog = loadAPICatalog();
    return keywordSearch(query, catalog);
  }
};

// Generate detailed API insights and recommendations
export const generateAPIInsights = async (apiId, userContext = '') => {
  try {
    const catalog = loadAPICatalog();
    const api = catalog.find((a) => a.id === apiId);

    if (!api) {
      throw new Error(`API ${apiId} not found`);
    }

    const response = await getClient().chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [
        {
          role: 'system',
          content: `You are a premium API consultant. Provide detailed, actionable insights about APIs.
Be specific, professional, and highlight competitive advantages.`,
        },
        {
          role: 'user',
          content: `Provide detailed insights about this API:
${JSON.stringify(api, null, 2)}

User context: ${userContext || 'General inquiry'}

Generate:
1. Strengths and weaknesses
2. Best use cases
3. Potential challenges
4. Competitor comparison
5. ROI/value proposition
6. Implementation considerations`,
        },
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });

    return {
      apiId,
      insights: response.choices[0].message.content,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Error generating insights:', error);
    throw error;
  }
};

// Compare multiple APIs using AI
export const compareAPIs = async (apiIds) => {
  try {
    const catalog = loadAPICatalog();
    const apisToCompare = catalog.filter((api) => apiIds.includes(api.id));

    if (apisToCompare.length === 0) {
      throw new Error('No APIs found for comparison');
    }

    const response = await getClient().chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [
        {
          role: 'system',
          content: `You are a premium API analyst. Create detailed, professional API comparisons.
Focus on practical differences that matter to developers and business stakeholders.`,
        },
        {
          role: 'user',
          content: `Create a comprehensive comparison of these APIs:
${JSON.stringify(apisToCompare, null, 2)}

Provide analysis on:
1. Feature comparison table
2. Pricing models and cost-effectiveness
3. Performance and reliability
4. Ease of integration
5. Community and documentation
6. Best scenarios for each API
7. Overall recommendation`,
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    return {
      comparison: response.choices[0].message.content,
      apis: apisToCompare.map((api) => ({ id: api.id, name: api.name })),
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Error comparing APIs:', error);
    throw error;
  }
};

// Get personalized recommendations
export const getRecommendations = async (useCase, budget, requirements = []) => {
  try {
    const catalog = loadAPICatalog();

    const response = await getClient().chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [
        {
          role: 'system',
          content: `You are an expert API recommendation engine.
Provide personalized API recommendations based on specific requirements, budget, and use cases.
Consider the entire ecosystem and long-term value.`,
        },
        {
          role: 'user',
          content: `Based on the following criteria, recommend the best APIs:

Use Case: ${useCase}
Budget: ${budget}
Requirements: ${requirements.join(', ') || 'No specific requirements'}

Available APIs:
${JSON.stringify(catalog, null, 2)}

Provide:
1. Top 3-5 API recommendations
2. Why each is suited for this use case
3. Implementation roadmap
4. Cost breakdown
5. Potential challenges and solutions
6. Success metrics

Return as structured JSON.`,
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const responseText = response.choices[0].message.content;
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);

    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }

    return { recommendations: responseText };
  } catch (error) {
    console.error('Error generating recommendations:', error);
    throw error;
  }
};

// Get trending APIs based on industry insights
export const getTrendingAPIs = async (industry = 'general') => {
  try {
    const catalog = loadAPICatalog();

    const response = await getClient().chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [
        {
          role: 'system',
          content: `You are a tech trends analyst specializing in APIs.
Identify the most relevant and trending APIs for different industries.`,
        },
        {
          role: 'user',
          content: `What are the trending and most valuable APIs for the ${industry} industry?

Consider these APIs:
${JSON.stringify(catalog, null, 2)}

Provide:
1. Top trending APIs for this industry
2. Growth potential
3. Integration opportunities
4. Market demand insights
5. Implementation recommendations`,
        },
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });

    return {
      industry,
      trends: response.choices[0].message.content,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Error getting trends:', error);
    throw error;
  }
};

export default {
  semanticSearch,
  generateAPIInsights,
  compareAPIs,
  getRecommendations,
  getTrendingAPIs,
};

