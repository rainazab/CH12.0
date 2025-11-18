import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
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

  // Load initial data on mount
  useEffect(() => {
    loadInitialAPIs();
  }, []);

  const loadInitialAPIs = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Load trending APIs
      const results = await searchAPIs('popular and trending APIs for developers');
      
      // Add mock relevance scores if not provided by backend
      const resultsWithScores = results.map((api, index) => ({
        ...api,
        relevanceScore: api.relevanceScore || (100 - index * 10),
      }));
      
      setSearchResults(resultsWithScores.slice(0, 8));
    } catch (err) {
      console.error('Failed to load initial APIs:', err);
      setError('Failed to load APIs. Please try searching manually.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    if (!query.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const results = await searchAPIs(query);
      
      // Add mock relevance scores if not provided
      const resultsWithScores = results.map((api, index) => ({
        ...api,
        relevanceScore: api.relevanceScore || (100 - index * 5),
      }));
      
      setSearchResults(resultsWithScores);
      
      if (resultsWithScores.length === 0) {
        setError('No APIs found matching your query. Try different keywords.');
      }
    } catch (err) {
      console.error('Search error:', err);
      setError('Search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAPISelect = (api) => {
    setSelectedAPIs((prev) => {
      const exists = prev.find((a) => a.id === api.id);
      if (exists) {
        return prev.filter((a) => a.id !== api.id);
      } else {
        // Limit to 5 APIs for comparison
        if (prev.length >= 5) {
          return [...prev.slice(1), api];
        }
        return [...prev, api];
      }
    });
  };

  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header />

        <main className="pt-16">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero onSearch={handleSearch} />
                  
                  {error && (
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 mb-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800">
                      {error}
                    </div>
                  )}
                  
                  <APIResults
                    results={searchResults}
                    loading={loading}
                    onAPISelect={handleAPISelect}
                    selectedAPIs={selectedAPIs}
                  />
                  
                  {selectedAPIs.length > 0 && (
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

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-300 py-12 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="font-bold text-white mb-4">Rho</h3>
                <p className="text-sm text-gray-400">
                  Discover and compare the perfect APIs for your project.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-4">Product</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="#" className="hover:text-white transition">
                      Features
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition">
                      Pricing
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition">
                      Docs
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-4">Company</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="#" className="hover:text-white transition">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-4">Legal</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="#" className="hover:text-white transition">
                      Privacy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition">
                      Terms
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition">
                      Status
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 pt-8">
              <p className="text-center text-sm text-gray-400">
                © 2024 Rho. All rights reserved. | Powered by{' '}
                <span className="text-purple-400 font-semibold">OpenAI GPT-4</span>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
