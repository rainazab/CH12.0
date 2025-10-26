import { useState } from 'react';
import { Search, TrendingUp, Clock, Star } from 'lucide-react';

const Hero = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  const exampleQueries = [
    'image generation API',
    'send transactional emails',
    'payment processing with crypto',
    'chatbot for customer support',
    'speech to text API'
  ];

  return (
    <section style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      padding: '2rem'
    }}>
      {/* Background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2))'
      }}></div>

      {/* Floating elements */}
      <div style={{
        position: 'absolute',
        top: '5rem',
        left: '5rem',
        width: '8rem',
        height: '8rem',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '50%',
        filter: 'blur(20px)',
        animation: 'pulse 3s ease-in-out infinite'
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '5rem',
        right: '5rem',
        width: '10rem',
        height: '10rem',
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '50%',
        filter: 'blur(30px)',
        animation: 'pulse 3s ease-in-out infinite 1s'
      }}></div>

      <div style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '60rem',
        margin: '0 auto',
        textAlign: 'center'
      }}>
        {/* Main heading */}
        <div style={{ marginBottom: '3rem' }}>
          <h1 style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            color: 'white',
            marginBottom: '1.5rem',
            lineHeight: '1.1'
          }}>
            Discover APIs with{' '}
            <span style={{
              background: 'linear-gradient(135deg, #06b6d4, #ec4899)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              AI Intelligence
            </span>
          </h1>
          <p style={{
            fontSize: '1.25rem',
            color: 'rgba(255, 255, 255, 0.9)',
            marginBottom: '2rem',
            lineHeight: '1.6',
            maxWidth: '45rem',
            margin: '0 auto 2rem'
          }}>
            Find the perfect APIs for your project using semantic search and real-time performance monitoring.
            Make data-driven decisions with live operational intelligence.
          </p>
        </div>

        {/* Search form */}
        <div style={{ marginBottom: '3rem' }}>
          <form onSubmit={handleSubmit} style={{
            width: '100%',
            maxWidth: '40rem',
            margin: '0 auto',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '1rem',
            padding: '1.5rem',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Search style={{ width: '1.5rem', height: '1.5rem', color: 'rgba(255, 255, 255, 0.6)' }} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Describe what API you need..."
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: 'white',
                  fontSize: '1.125rem',
                  fontWeight: '500'
                }}
              />
              <button
                type="submit"
                style={{
                  background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                  color: 'white',
                  border: 'none',
                  padding: '0.5rem 1.5rem',
                  borderRadius: '0.5rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  transform: 'scale(1)'
                }}
                onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
              >
                Search
              </button>
            </div>
          </form>

          {/* Example queries */}
          <div style={{
            marginTop: '1.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '0.75rem'
          }}>
            {exampleQueries.map((query, index) => (
              <button
                key={index}
                onClick={() => {
                  setSearchQuery(query);
                  onSearch(query);
                }}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  padding: '0.5rem 1rem',
                  borderRadius: '0.5rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '0.875rem'
                }}
                onMouseOver={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
                onMouseOut={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
              >
                {query}
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem',
          maxWidth: '40rem',
          margin: '0 auto'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '0.75rem',
            padding: '1.5rem',
            textAlign: 'center',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <div style={{ fontSize: '1.875rem', fontWeight: 'bold', color: 'white', marginBottom: '0.5rem' }}>50+</div>
            <div style={{ color: 'rgba(255, 255, 255, 0.8)' }}>APIs Monitored</div>
          </div>
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '0.75rem',
            padding: '1.5rem',
            textAlign: 'center',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <div style={{ fontSize: '1.875rem', fontWeight: 'bold', color: 'white', marginBottom: '0.5rem' }}>99.5%</div>
            <div style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Uptime Average</div>
          </div>
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '0.75rem',
            padding: '1.5rem',
            textAlign: 'center',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <div style={{ fontSize: '1.875rem', fontWeight: 'bold', color: 'white', marginBottom: '0.5rem' }}>&lt;500ms</div>
            <div style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Response Time</div>
          </div>
        </div>

        {/* Trending section */}
        <div style={{ marginTop: '4rem' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            marginBottom: '1.5rem'
          }}>
            <TrendingUp style={{ width: '1.25rem', height: '1.25rem', color: 'white' }} />
            <span style={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: '500' }}>Trending API Comparisons</span>
          </div>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '1rem'
          }}>
            {['OpenAI vs Claude', 'DALL-E vs Midjourney', 'Stripe vs PayPal'].map((comparison, index) => (
              <div
                key={index}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '0.5rem',
                  padding: '1rem 1.5rem',
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
                onMouseOut={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
              >
                {comparison}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 0.5; transform: scale(1); }
            50% { opacity: 0.8; transform: scale(1.1); }
          }
        `}
      </style>
    </section>
  );
};

export default Hero;
