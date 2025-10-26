import { useState } from 'react';
import { Search, Filter, X, Loader2, Sparkles, ArrowRight } from 'lucide-react';

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
    <section style={{
      padding: '4rem 2rem',
      background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
      position: 'relative'
    }}>
      {/* Background elements */}
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '10%',
        width: '12rem',
        height: '12rem',
        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05))',
        borderRadius: '50%',
        filter: 'blur(30px)',
        animation: 'float 6s ease-in-out infinite'
      }}></div>

      <div style={{
        maxWidth: '60rem',
        margin: '0 auto',
        textAlign: 'center'
      }}>
        {/* Main search */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(20px)',
          borderRadius: '1.5rem',
          padding: '3rem',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          marginBottom: '2rem'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '2rem',
            fontSize: '0.875rem',
            fontWeight: '600',
            marginBottom: '1.5rem',
            boxShadow: '0 4px 20px rgba(102, 126, 234, 0.3)'
          }}>
            <Sparkles style={{ width: '1rem', height: '1rem' }} />
            Advanced API Discovery
          </div>

          <h2 style={{
            fontSize: '2rem',
            fontWeight: '800',
            background: 'linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '1rem'
          }}>
            Search & Discover APIs
          </h2>
          <p style={{
            fontSize: '1.125rem',
            color: '#64748b',
            marginBottom: '2rem',
            lineHeight: '1.6'
          }}>
            Use natural language to find APIs that match your exact requirements
          </p>

          <form onSubmit={handleSubmit} style={{
            maxWidth: '40rem',
            margin: '0 auto',
            background: 'white',
            borderRadius: '1rem',
            padding: '1.5rem',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <Search style={{ width: '1.5rem', height: '1.5rem', color: '#94a3b8' }} />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="I need an API for..."
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#334155',
                  fontSize: '1.125rem',
                  fontWeight: '500'
                }}
                disabled={loading}
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  style={{
                    padding: '0.5rem',
                    background: 'transparent',
                    border: 'none',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    color: '#64748b',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.background = 'rgba(239, 68, 68, 0.1)';
                    e.target.style.color = '#dc2626';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = 'transparent';
                    e.target.style.color = '#64748b';
                  }}
                >
                  <X style={{ width: '1rem', height: '1rem' }} />
                </button>
              )}
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '1rem',
              marginTop: '1.5rem'
            }}>
              <button
                type="submit"
                disabled={loading || !query.trim()}
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '0.75rem 2rem',
                  borderRadius: '0.75rem',
                  fontWeight: '600',
                  cursor: loading || !query.trim() ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 20px rgba(102, 126, 234, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  opacity: loading || !query.trim() ? 0.5 : 1
                }}
                onMouseOver={(e) => {
                  if (!loading && query.trim()) {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 8px 30px rgba(102, 126, 234, 0.4)';
                  }
                }}
                onMouseOut={(e) => {
                  if (!loading && query.trim()) {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 20px rgba(102, 126, 234, 0.3)';
                  }
                }}
              >
                {loading ? (
                  <>
                    <Loader2 style={{ width: '1rem', height: '1rem' }} className="animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <span>Search APIs</span>
                    <ArrowRight style={{ width: '1rem', height: '1rem' }} />
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                style={{
                  background: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(10px)',
                  color: '#64748b',
                  border: '1px solid rgba(226, 232, 240, 0.5)',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.75rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
                onMouseOver={(e) => {
                  e.target.style.background = 'rgba(102, 126, 234, 0.1)';
                  e.target.style.color = '#667eea';
                  e.target.style.borderColor = 'rgba(102, 126, 234, 0.3)';
                }}
                onMouseOut={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.8)';
                  e.target.style.color = '#64748b';
                  e.target.style.borderColor = 'rgba(226, 232, 240, 0.5)';
                }}
              >
                <Filter style={{ width: '1rem', height: '1rem' }} />
                Filters
              </button>
            </div>
          </form>

          {/* Popular searches */}
          <div style={{ marginTop: '2rem' }}>
            <p style={{
              fontSize: '0.875rem',
              color: '#64748b',
              marginBottom: '1rem',
              fontWeight: '600'
            }}>
              Popular searches:
            </p>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '0.5rem'
            }}>
              {popularSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setQuery(search);
                    onSearch(search);
                  }}
                  disabled={loading}
                  style={{
                    padding: '0.5rem 1rem',
                    background: `linear-gradient(135deg, ${index % 3 === 0 ? 'rgba(102, 126, 234, 0.1)' : index % 3 === 1 ? 'rgba(118, 75, 162, 0.1)' : 'rgba(240, 147, 251, 0.1)'})`,
                    color: index % 3 === 0 ? '#667eea' : index % 3 === 1 ? '#764ba2' : '#f093fb',
                    border: `1px solid ${index % 3 === 0 ? 'rgba(102, 126, 234, 0.2)' : index % 3 === 1 ? 'rgba(118, 75, 162, 0.2)' : 'rgba(240, 147, 251, 0.2)'}`,
                    borderRadius: '2rem',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease',
                    opacity: loading ? 0.5 : 1
                  }}
                  onMouseOver={(e) => {
                    if (!loading) {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
                    }
                  }}
                  onMouseOut={(e) => {
                    if (!loading) {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }
                  }}
                >
                  {search}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Advanced filters */}
        {showFilters && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(20px)',
            borderRadius: '1.5rem',
            padding: '2rem',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            maxWidth: '50rem',
            margin: '0 auto',
            animation: 'slideUp 0.5s ease-out'
          }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '700',
              color: '#1e293b',
              marginBottom: '1.5rem',
              textAlign: 'center'
            }}>
              Advanced Filters
            </h3>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.5rem',
              marginBottom: '2rem'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: '#64748b',
                  marginBottom: '0.5rem'
                }}>
                  Category
                </label>
                <select style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #e2e8f0',
                  borderRadius: '0.75rem',
                  background: 'white',
                  color: '#334155',
                  fontSize: '0.875rem',
                  outline: 'none',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#667eea';
                  e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e2e8f0';
                  e.target.style.boxShadow = 'none';
                }}
                >
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
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: '#64748b',
                  marginBottom: '0.5rem'
                }}>
                  Pricing Model
                </label>
                <select style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #e2e8f0',
                  borderRadius: '0.75rem',
                  background: 'white',
                  color: '#334155',
                  fontSize: '0.875rem',
                  outline: 'none',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#667eea';
                  e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e2e8f0';
                  e.target.style.boxShadow = 'none';
                }}
                >
                  <option value="">All Models</option>
                  <option value="free">Free Tier</option>
                  <option value="pay-per-use">Pay Per Use</option>
                  <option value="subscription">Subscription</option>
                  <option value="enterprise">Enterprise</option>
                </select>
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: '#64748b',
                  marginBottom: '0.5rem'
                }}>
                  Max Cost/Month
                </label>
                <select style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #e2e8f0',
                  borderRadius: '0.75rem',
                  background: 'white',
                  color: '#334155',
                  fontSize: '0.875rem',
                  outline: 'none',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#667eea';
                  e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e2e8f0';
                  e.target.style.boxShadow = 'none';
                }}
                >
                  <option value="">Any Budget</option>
                  <option value="10">$0 - $10</option>
                  <option value="50">$10 - $50</option>
                  <option value="100">$50 - $100</option>
                  <option value="500">$100 - $500</option>
                  <option value="1000">$500+</option>
                </select>
              </div>
            </div>

            <div style={{
              textAlign: 'center'
            }}>
              <button
                onClick={() => setShowFilters(false)}
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '0.75rem 2rem',
                  borderRadius: '0.75rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 20px rgba(102, 126, 234, 0.3)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 30px rgba(102, 126, 234, 0.4)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 20px rgba(102, 126, 234, 0.3)';
                }}
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add animations */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
          }

          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </section>
  );
};

export default SearchInterface;
