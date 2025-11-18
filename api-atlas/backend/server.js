import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import discoverRoutes from './routes/discover.js';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`📡 ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/discover', discoverRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    services: {
      openai: process.env.OPENAI_API_KEY ? 'connected' : 'not configured',
      backend: 'operational',
    },
  });
});

// Root endpoint - Rho information
app.get('/', (req, res) => {
  res.json({
    name: 'Rho',
    tagline: 'The ultimate API discovery platform',
    description: 'Find, compare, and integrate the perfect APIs for your project',
    version: '2.0.0',
    status: 'running',
    powerededBy: 'OpenAI GPT-4',
    endpoints: {
      health: 'GET /api/health',
      search: 'POST /api/discover/search',
      recommendations: 'POST /api/discover/recommendations',
      compare: 'POST /api/discover/compare',
      insights: 'GET /api/discover/insights/:apiId',
      trending: 'GET /api/discover/trending',
    },
    frontend: 'http://localhost:5173',
    timestamp: new Date().toISOString(),
  });
});

// API documentation endpoint
app.get('/api', (req, res) => {
  res.json({
    name: 'Rho Backend API',
    version: '2.0.0',
    description: 'AI-powered API discovery and recommendation platform',
    baseUrl: 'http://localhost:3001/api',
    poweredBy: 'OpenAI GPT-4',
    endpoints: {
      search: {
        method: 'POST',
        path: '/discover/search',
        description: 'Semantic search for APIs',
        body: { query: 'string' },
        example: { query: 'I need an API for image generation' },
      },
      recommendations: {
        method: 'POST',
        path: '/discover/recommendations',
        description: 'Get AI-powered API recommendations',
        body: { useCase: 'string', budget: 'string', requirements: 'array' },
      },
      compare: {
        method: 'POST',
        path: '/discover/compare',
        description: 'Compare multiple APIs',
        body: { apiIds: 'array' },
      },
      insights: {
        method: 'GET',
        path: '/discover/insights/:apiId',
        description: 'Get detailed insights about an API',
        params: { apiId: 'string', context: 'optional string' },
      },
      trending: {
        method: 'GET',
        path: '/discover/trending',
        description: 'Get trending APIs by industry',
        params: { industry: 'optional string' },
      },
      health: {
        method: 'GET',
        path: '/health',
        description: 'Health check endpoint',
      },
    },
    timestamp: new Date().toISOString(),
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Error:', err);
  res.status(500).json({
    error: 'Something went wrong',
    message: err.message,
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not found',
    message: 'The requested endpoint does not exist',
    availableEndpoints: [
      'GET /',
      'GET /api',
      'GET /api/health',
      'POST /api/discover/search',
      'POST /api/discover/recommendations',
      'POST /api/discover/compare',
      'GET /api/discover/insights/:apiId',
      'GET /api/discover/trending',
    ],
    frontend: 'http://localhost:5173',
  });
});

app.listen(PORT, '127.0.0.1', () => {
  console.log(`🚀 Rho backend running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`📖 API docs: http://localhost:${PORT}/api`);
  console.log(`🤖 Powered by OpenAI GPT-4`);

  // Check OpenAI API key
  if (!process.env.OPENAI_API_KEY) {
    console.warn('⚠️  OPENAI_API_KEY not set. Set it in .env file.');
  } else {
    console.log('✅ OpenAI API key configured');
  }
});
