import { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import APIResults from './components/APIResults';
import ComparisonView from './components/ComparisonView';
import Features from './components/Features';
import Pricing from './components/Pricing';
import About from './components/About';
import Contact from './components/Contact';
import Privacy from './components/Privacy';
import Terms from './components/Terms';
import FirstSecondsTest from './components/FirstSecondsTest';
import { searchAPIs } from './lib/api';

// Scroll to top on route change
function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
}

// Debounce helper
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [allAPIs, setAllAPIs] = useState([]);
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
      
      setAllAPIs(resultsWithScores);
      setSearchResults(resultsWithScores.slice(0, 8));
    } catch (err) {
      console.error('Failed to load initial APIs:', err);
      setError('Failed to load APIs. Please try searching manually.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const results = await searchAPIs(query);
      
      // Results already have relevanceScore from backend
      setSearchResults(results);
      
      if (results.length === 0) {
        setError('No APIs found. Try different keywords.');
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
      <ScrollToTop />
      <div className="min-h-screen bg-black">
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
            <Route path="/test" element={<FirstSecondsTest allAPIs={allAPIs} />} />
            <Route path="/compare" element={<ComparisonView apis={selectedAPIs} />} />
            <Route path="/features" element={<Features />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-black border-t border-gray-800 py-16 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-12 mb-12">
              {/* Brand Column */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <img src="/loading.png" alt="loading" className="w-6 h-6" />
                  <h3 className="font-bold text-white text-lg">Rho</h3>
                </div>
                <p className="text-sm text-gray-400 mb-4">
                  Like Google Flights for APIs. Discover, compare, and integrate the best APIs with AI-powered recommendations.
                </p>
              </div>

              {/* Product */}
              <div>
                <h4 className="font-semibold text-white mb-4">Product</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link to="/features" className="text-gray-400 hover:text-cyan-400 transition">
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link to="/pricing" className="text-gray-400 hover:text-cyan-400 transition">
                      Pricing
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Company */}
              <div>
                <h4 className="font-semibold text-white mb-4">Company</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link to="/about" className="text-gray-400 hover:text-cyan-400 transition">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" className="text-gray-400 hover:text-cyan-400 transition">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h4 className="font-semibold text-white mb-4">Legal</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link to="/privacy" className="text-gray-400 hover:text-cyan-400 transition">
                      Privacy
                    </Link>
                  </li>
                  <li>
                    <Link to="/terms" className="text-gray-400 hover:text-cyan-400 transition">
                      Terms
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom */}
            <div className="border-t border-gray-800 pt-8">
              <p className="text-center text-sm text-gray-500">
                © 2025 Rho. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
