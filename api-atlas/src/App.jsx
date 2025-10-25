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

  // Load trending APIs on initial load
  useEffect(() => {
    loadTrendingAPIs();
  }, []);

  const loadTrendingAPIs = async () => {
    try {
      const results = await searchAPIs('popular APIs for developers');
      setSearchResults(results.slice(0, 6)); // Show top 6 trending
    } catch (error) {
      console.error('Failed to load trending APIs:', error);
    }
  };

  const handleSearch = async (query) => {
    setLoading(true);
    try {
      const results = await searchAPIs(query);
      setSearchResults(results);
    } catch (error) {
      console.error('Search failed:', error);
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <Header />

        <main className="pt-20">
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
