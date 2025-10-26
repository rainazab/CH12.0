import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import SearchInterface from './components/SearchInterface';
import APIResults from './components/APIResults';
import ComparisonView from './components/ComparisonView';
import PerformanceDashboard from './components/PerformanceDashboard';
import APIDetail from './components/APIDetail';
import { searchAPIs } from './lib/api';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedAPIs, setSelectedAPIs] = useState([]);
  const [error, setError] = useState(null);

  // Debug logging
  console.log('🚀 App component rendered - full version');

  // Load trending APIs on initial load
  useEffect(() => {
    console.log('🔄 App useEffect triggered');
    // Start with mock data immediately, then try to load from backend
    loadInitialData();
    loadTrendingAPIs();
  }, []);

  const loadInitialData = () => {
    console.log('📋 Loading initial mock data...');
    // Set mock data immediately for testing
    const mockResults = [
      {
        id: 'openai-gpt4',
        name: 'ChatGPT API',
        provider: 'OpenAI',
        category: 'text-generation',
        description: 'Advanced language model for text generation and conversation',
        features: ['Text generation', 'Function calling', 'JSON mode'],
        performance: {
          status: 'operational',
          responseTime: 245,
          uptime: 99.8,
          errorRate: 0.2,
          lastChecked: new Date().toISOString(),
          monthlyCost: 25.50
        }
      },
      {
        id: 'anthropic-claude',
        name: 'Claude API',
        provider: 'Anthropic',
        category: 'text-generation',
        description: 'Constitutional AI for safe and helpful text generation',
        features: ['Safe AI', 'Large context', 'Vision capabilities'],
        performance: {
          status: 'operational',
          responseTime: 320,
          uptime: 99.2,
          errorRate: 0.8,
          lastChecked: new Date().toISOString(),
          monthlyCost: 18.90
        }
      },
      {
        id: 'openai-dalle',
        name: 'DALL-E API',
        provider: 'OpenAI',
        category: 'image-generation',
        description: 'AI image generation from text descriptions',
        features: ['Text-to-image', 'High quality', 'Commercial usage'],
        performance: {
          status: 'operational',
          responseTime: 1200,
          uptime: 99.1,
          errorRate: 0.9,
          lastChecked: new Date().toISOString(),
          monthlyCost: 45.00
        }
      },
      {
        id: 'github-copilot',
        name: 'GitHub Copilot API',
        provider: 'GitHub',
        category: 'code-generation',
        description: 'AI-powered code completion and generation',
        features: ['Code completion', 'Multi-language', 'IDE integration'],
        performance: {
          status: 'operational',
          responseTime: 180,
          uptime: 99.5,
          errorRate: 0.5,
          lastChecked: new Date().toISOString(),
          monthlyCost: 10.00
        }
      }
    ];
    setSearchResults(mockResults);
    console.log('✅ Initial mock data loaded -', mockResults.length, 'APIs');
  };

  const loadTrendingAPIs = async () => {
    try {
      setError(null);
      console.log('📡 Loading trending APIs from backend...');
      const results = await searchAPIs('popular APIs for developers');
      console.log('✅ Backend returned results:', results.length);

      // Add mock performance data to results
      const resultsWithPerformance = results.map(api => ({
        ...api,
        performance: {
          status: 'operational',
          responseTime: 200 + Math.random() * 800,
          uptime: 98 + Math.random() * 2,
          errorRate: Math.random() * 2,
          lastChecked: new Date().toISOString(),
          monthlyCost: Math.random() * 50 + 10
        }
      }));
      setSearchResults(resultsWithPerformance.slice(0, 6));
      console.log('✅ Loaded trending APIs:', results.length);
    } catch (error) {
      console.error('❌ Failed to load trending APIs:', error);
      // Don't set error since we already have mock data
      console.log('📋 Keeping mock data since backend failed');
    }
  };

  const handleSearch = async (query) => {
    setLoading(true);
    setError(null);
    try {
      console.log('🔍 Searching for:', query);
      const results = await searchAPIs(query);
      // Add mock performance data to search results
      const resultsWithPerformance = results.map(api => ({
        ...api,
        performance: {
          status: Math.random() > 0.9 ? 'degraded' : 'operational',
          responseTime: 200 + Math.random() * 800,
          uptime: 98 + Math.random() * 2,
          errorRate: Math.random() * 2,
          lastChecked: new Date().toISOString(),
          monthlyCost: Math.random() * 50 + 10
        }
      }));
      setSearchResults(resultsWithPerformance);
      console.log('✅ Search results:', results.length);
    } catch (error) {
      console.error('❌ Search failed:', error);
      setError('Search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAPISelect = (api) => {
    setSelectedAPIs(prev => {
      const exists = prev.find(a => a.id === api.id);
      if (exists) {
        return prev.filter(a => a.id !== api.id);
      } else {
        return [...prev, api];
      }
    });
  };


  return (
    <Router>
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <Header />

        <main style={{ paddingTop: '5rem' }}>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero onSearch={handleSearch} />
                  <SearchInterface onSearch={handleSearch} loading={loading} />
                  <APIResults
                    results={searchResults}
                    loading={loading}
                    onAPISelect={handleAPISelect}
                    selectedAPIs={selectedAPIs}
                  />
                  {selectedAPIs.length > 1 && (
                    <ComparisonView apis={selectedAPIs} />
                  )}
                </>
              }
            />
            <Route path="/performance" element={<PerformanceDashboard />} />
            <Route path="/api/:id" element={<APIDetail />} />
            <Route path="/compare" element={<ComparisonView apis={selectedAPIs} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
