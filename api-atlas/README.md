# Rho 🚀

A semantic API discovery and performance monitoring platform that combines natural language search with real-time operational intelligence. Built as a modern React application with Chroma vector database and Elastic monitoring.

## ✨ Features

🎯 **Semantic Search** - Find APIs using natural language queries powered by Chroma
📊 **Real-time Performance** - Live monitoring with Elastic Agent Builder
🔍 **Smart Comparisons** - Side-by-side API analysis with relevance scoring
💰 **Cost Intelligence** - Accurate pricing calculations and budget matching
🌟 **Modern UI** - Ultra-colorful design with glassmorphism effects
⚡ **Performance Dashboard** - Real-time metrics and uptime monitoring

## 🛠 Tech Stack

### Frontend
- **React 19** - Modern React with hooks and concurrent features
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality component library
- **React Router** - Client-side routing
- **Recharts** - Data visualization
- **Lucide React** - Beautiful icons

### Backend
- **Node.js/Express** - RESTful API server
- **Chroma** - Vector database for semantic search
- **Elastic** - Real-time performance monitoring
- **Axios** - HTTP client for API calls

### Infrastructure
- **Vite** - Fast build tool and dev server
- **ESLint** - Code linting
- **PostCSS** - CSS processing

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Elastic Cloud account (for monitoring)
- Chroma instance (local or hosted)

### Installation

1. **Clone and setup frontend:**
```bash
cd api-atlas
npm install
```

2. **Setup backend:**
```bash
cd backend
npm install
```

3. **Environment variables:**
Create `.env` file in the root directory:
```env
VITE_API_URL=http://localhost:3001/api
VITE_CHROMA_URL=http://localhost:8000
VITE_ELASTIC_URL=http://localhost:9200
ELASTIC_USERNAME=elastic
ELASTIC_PASSWORD=your-elastic-password
CHROMA_API_KEY=your-chroma-key
```

4. **Start development servers:**
```bash
# Frontend (port 5173)
npm run dev

# Backend (port 3001)
npm run backend
```

5. **Seed initial data:**
```bash
# This will populate Chroma with API data
curl http://localhost:3001/api/monitor/seed
```

6. **Open your browser:**
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001/api/health

## 📁 Project Structure

```
api-atlas/
├── src/
│   ├── components/          # React components
│   │   ├── Header.jsx       # Navigation header
│   │   ├── Hero.jsx         # Landing page hero
│   │   ├── SearchInterface.jsx # Search and filters
│   │   ├── APIResults.jsx   # Search results display
│   │   ├── ComparisonView.jsx # Side-by-side comparison
│   │   ├── PerformanceDashboard.jsx # Real-time metrics
│   │   └── APIDetail.jsx    # Individual API pages
│   ├── lib/
│   │   └── api.js           # API client utilities
│   ├── App.jsx              # Main React app
│   └── main.jsx             # React entry point
├── backend/
│   ├── routes/              # Express routes
│   │   ├── search.js        # Semantic search endpoints
│   │   ├── performance.js   # Performance metrics
│   │   └── monitor.js       # Monitoring management
│   ├── services/            # Business logic
│   │   ├── chroma.js        # Vector search service
│   │   ├── elastic.js       # Performance monitoring
│   │   └── scoring.js       # Relevance calculations
│   ├── data/                # Seed data
│   └── server.js            # Express server
├── public/                  # Static assets
└── package.json             # Dependencies and scripts
```

## 🔧 API Endpoints

### Search
- `POST /api/search` - Semantic API search
- `GET /api/search/suggestions` - Search suggestions

### Performance
- `GET /api/performance/:apiId` - Latest performance metrics
- `GET /api/performance/:apiId/history` - Performance history
- `GET /api/performance/status/all` - System status overview

### Monitoring
- `POST /api/monitor/add` - Add API to monitoring
- `DELETE /api/monitor/:apiId` - Remove from monitoring
- `GET /api/monitor/agents` - Monitoring agents status

## 🎨 Key Features

### Semantic Search Engine
- Uses Chroma vector database for semantic similarity
- Supports natural language queries like "I need image generation"
- Returns relevance-scored results with performance data

### Real-time Performance Monitoring
- Elastic Agent Builder integration
- 5-minute monitoring intervals
- Response time, uptime, and error rate tracking
- Visual performance dashboards

### Advanced Filtering
- Use case filtering (chatbot, image gen, etc.)
- Input/output type matching
- Pricing model selection
- Budget range filtering
- Real-time filter application

### Smart Comparisons
- Side-by-side API analysis
- Performance vs relevance scoring
- Feature comparison matrices
- Cost efficiency calculations

## 📊 Monitoring Setup

### Elastic Configuration
1. Create Elastic Cloud account
2. Set up serverless instance
3. Configure Agent Builder policies
4. Create data streams for performance metrics

### Chroma Setup
1. Install Chroma locally or use hosted instance
2. Create API collection with embeddings
3. Seed with initial API documentation
4. Configure similarity thresholds

## 🎯 Demo Script

**Opening (30 sec):**
"Developers waste hours comparing APIs. Should I use SendGrid or Resend? Is OpenAI faster than Anthropic today? Rho solves this."

**Demo (2 min):**
1. Type: "I need to generate images from text"
2. Show semantic search finding DALL-E, Midjourney, Stability AI
3. Display live performance comparison with Elastic data
4. Show detailed breakdown with relevance scores
5. Click winner → see comprehensive API details

**Tech Highlight (30 sec):**
"We use Chroma's vector database to semantically understand API capabilities, and Elastic's Agent Builder continuously monitors performance, combining semantic relevance with operational intelligence."

## 🔮 Future Enhancements

- User accounts and saved searches
- Community ratings and reviews
- API cost calculator with custom usage
- Chrome extension for quick lookups
- Email alerts for API downtime
- Integration marketplace
- API documentation snippets
- Code example generator

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**🎨 Built with semantic intelligence and real-time performance monitoring for the modern developer!**