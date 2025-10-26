import { useState } from 'react';
import { Search, Filter, X, Loader2 } from 'lucide-react';

const SearchInterface = ({ onSearch, loading }) => {
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const popularSearches = [
    'AI chatbots',
    'Image generation',
    'Payment processing',
    'Email services',
    'SMS messaging',
    'Code completion'
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main search */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Find Your Perfect API
          </h2>
          <p className="text-gray-600 mb-8">
            Describe what you need and let AI find the best matches with real-time performance data
          </p>

          <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="I need an API for..."
                className="w-full pl-12 pr-12 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                disabled={loading}
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex justify-center mt-4 space-x-3">
              <button
                type="submit"
                disabled={loading || !query.trim()}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4 mr-2" />
                    Search APIs
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className="bg-white/10 hover:bg-white/20 text-gray-700 border border-gray-300 font-semibold py-2 px-6 rounded-lg transition-all duration-300 backdrop-blur-sm"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </button>
            </div>
          </form>

          {/* Popular searches */}
          <div className="mt-8">
            <p className="text-sm text-gray-500 mb-3">Popular searches:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {popularSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setQuery(search);
                    onSearch(search);
                  }}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm transition-colors"
                  disabled={loading}
                >
                  {search}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Advanced filters */}
        {showFilters && (
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 focus:outline-none">
                  <option value="">All Categories</option>
                  <option value="llm">Large Language Models</option>
                  <option value="image">Image Generation</option>
                  <option value="speech">Speech Processing</option>
                  <option value="payment">Payment Processing</option>
                  <option value="communication">Communication</option>
                  <option value="code">Code Generation</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pricing Model
                </label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 focus:outline-none">
                  <option value="">All Models</option>
                  <option value="free">Free Tier</option>
                  <option value="pay-per-use">Pay Per Use</option>
                  <option value="subscription">Subscription</option>
                  <option value="enterprise">Enterprise</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Cost/Month
                </label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 focus:outline-none">
                  <option value="">Any Budget</option>
                  <option value="10">$0 - $10</option>
                  <option value="50">$10 - $50</option>
                  <option value="100">$50 - $100</option>
                  <option value="500">$100 - $500</option>
                  <option value="1000">$500+</option>
                </select>
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <button
                onClick={() => setShowFilters(false)}
                className="bg-white/10 hover:bg-white/20 text-gray-700 border border-gray-300 font-semibold py-2 px-6 rounded-lg transition-all duration-300 backdrop-blur-sm"
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchInterface;
