import express from 'express';
import cors from 'cors';
import searchRoutes from './routes/search.js';
import performanceRoutes from './routes/performance.js';
import monitorRoutes from './routes/monitor.js';

const app = express();
const PORT = Number(process.env.PORT) || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/search', searchRoutes);
app.use('/api/performance', performanceRoutes);
app.use('/api/monitor', monitorRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    services: {
      chroma: 'operational',
      elastic: 'operational'
    }
  });
});

// Root endpoint - Rho information
app.get('/', (req, res) => {
  res.json({
    name: 'Rho',
    description: 'Semantic API Discovery & Performance Monitoring Platform',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      health: 'GET /api/health',
      search: 'POST /api/search',
      performance: 'GET /api/performance/:apiId',
      performance_history: 'GET /api/performance/:apiId/history',
      system_status: 'GET /api/performance/status/all',
      monitoring: 'POST /api/monitor/add',
      documentation: 'Frontend available at http://localhost:5173'
    },
    frontend: 'http://localhost:5173',
    timestamp: new Date().toISOString()
  });
});

// API documentation endpoint
app.get('/api', (req, res) => {
  res.json({
    name: 'Rho Backend API',
    version: '1.0.0',
    description: 'Backend API for semantic API discovery and performance monitoring',
    baseUrl: 'http://localhost:3001/api',
    endpoints: {
      search: {
        method: 'POST',
        path: '/search',
        description: 'Semantic search for APIs',
        body: { query: 'string' }
      },
      performance: {
        method: 'GET',
        path: '/performance/:apiId',
        description: 'Get performance metrics for an API',
        params: { apiId: 'string', period: '24h|7d|30d' }
      },
      health: {
        method: 'GET',
        path: '/health',
        description: 'Health check endpoint'
      }
    },
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: err.message
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
      'POST /api/search',
      'GET /api/performance/:apiId',
      'GET /api/performance/status/all'
    ],
    frontend: 'http://localhost:5173'
  });
});

app.listen(PORT, '127.0.0.1', () => {
  console.log(`🚀 Rho backend running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});
