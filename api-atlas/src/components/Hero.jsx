import { useState, useEffect } from 'react';
import { Search, Sparkles, Zap, Bot, ArrowRight, CheckCircle } from 'lucide-react';

const Hero = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentExampleIndex, setCurrentExampleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [showResponse, setShowResponse] = useState(false);
  const [currentResponse, setCurrentResponse] = useState('');

  const exampleQueries = [
    {
      question: "What API should I use for image generation?",
      response: "Based on your needs, I recommend DALL-E 3, Midjourney API, or Stable Diffusion. DALL-E 3 offers the best quality-to-cost ratio with 99.2% uptime and 1.2s response time."
    },
    {
      question: "I need payment processing with crypto support",
      response: "Stripe, Coinbase Commerce, and BitPay are your top options. Stripe leads with 99.9% uptime and comprehensive crypto features, though it's slightly more expensive."
    },
    {
      question: "Looking for a chatbot API for customer support",
      response: "OpenAI's GPT-4 API, Anthropic Claude, or Dialogflow are excellent choices. GPT-4 provides the most natural conversations with 99.5% uptime."
    }
  ];

  const responses = [
    "Based on your needs, I recommend DALL-E 3, Midjourney API, or Stable Diffusion. DALL-E 3 offers the best quality-to-cost ratio with 99.2% uptime and 1.2s response time.",
    "Stripe, Coinbase Commerce, and BitPay are your top options. Stripe leads with 99.9% uptime and comprehensive crypto features, though it's slightly more expensive.",
    "OpenAI's GPT-4 API, Anthropic Claude, or Dialogflow are excellent choices. GPT-4 provides the most natural conversations with 99.5% uptime."
  ];

  // Typing animation effect
  useEffect(() => {
    if (isTyping) {
      const currentExample = exampleQueries[currentExampleIndex];
      let charIndex = 0;

      const typeInterval = setInterval(() => {
        if (charIndex < currentExample.question.length) {
          setDisplayedText(currentExample.question.slice(0, charIndex + 1));
          charIndex++;
        } else {
          clearInterval(typeInterval);
          setTimeout(() => {
            setShowResponse(true);
            setCurrentResponse(currentExample.response);
            setTimeout(() => {
              setIsTyping(false);
              setShowResponse(false);
              setDisplayedText('');
              setCurrentResponse('');
              setCurrentExampleIndex((prev) => (prev + 1) % exampleQueries.length);
              setTimeout(() => {
                setIsTyping(true);
              }, 2000);
            }, 4000);
          }, 500);
        }
      }, 50);

      return () => clearInterval(typeInterval);
    }
  }, [isTyping, currentExampleIndex]);

  // Start the typing animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTyping(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  return (
    <div style={{ background: 'white', minHeight: '100vh' }}>
      {/* Hero Section */}
      <section style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '6rem 2rem 4rem',
        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)'
      }}>
        {/* Background Elements */}
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: '20rem',
          height: '20rem',
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
          borderRadius: '50%',
          filter: 'blur(40px)',
          animation: 'float 6s ease-in-out infinite'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '20%',
          right: '15%',
          width: '15rem',
          height: '15rem',
          background: 'linear-gradient(135deg, rgba(240, 147, 251, 0.1), rgba(102, 126, 234, 0.1))',
          borderRadius: '50%',
          filter: 'blur(30px)',
          animation: 'float 8s ease-in-out infinite reverse'
        }}></div>

        <div style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '70rem',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          {/* Main heading */}
          <div style={{ marginBottom: '4rem' }}>
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
              AI-Powered API Discovery
            </div>
            <h1 style={{
              fontSize: '4rem',
              fontWeight: '800',
              background: 'linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '1.5rem',
              lineHeight: '1.1',
              letterSpacing: '-0.025em'
            }}>
              Find Your Perfect API
              <br />
              <span style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                in Seconds
              </span>
            </h1>
            <p style={{
              fontSize: '1.25rem',
              color: '#64748b',
              marginBottom: '2rem',
              lineHeight: '1.6',
              maxWidth: '45rem',
              margin: '0 auto 3rem'
            }}>
              Describe what you need, and our AI instantly finds the best APIs with real-time performance data,
              pricing, and feature comparisons.
            </p>
          </div>

          {/* Interactive Demo */}
          <div style={{ marginBottom: '4rem' }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(20px)',
              borderRadius: '1.5rem',
              padding: '2rem',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              maxWidth: '50rem',
              margin: '0 auto',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Demo Header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1.5rem',
                justifyContent: 'center'
              }}>
                <Bot style={{ width: '1.5rem', height: '1.5rem', color: '#667eea' }} />
                <span style={{ fontSize: '1.125rem', fontWeight: '600', color: '#334155' }}>
                  Try it out - Watch AI in action
                </span>
              </div>

              {/* Search Input Demo */}
              <div style={{
                background: 'white',
                borderRadius: '1rem',
                padding: '1.5rem',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                border: '2px solid #e2e8f0',
                marginBottom: '1.5rem',
                position: 'relative'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <Search style={{ width: '1.5rem', height: '1.5rem', color: '#94a3b8' }} />
                  <span style={{
                    flex: 1,
                    color: '#334155',
                    fontSize: '1.125rem',
                    fontWeight: '500',
                    minHeight: '1.5rem'
                  }}>
                    {displayedText}
                    {isTyping && <span style={{
                      display: 'inline-block',
                      width: '2px',
                      height: '1.2em',
                      background: '#667eea',
                      marginLeft: '2px',
                      animation: 'blink 1s infinite'
                    }}></span>}
                  </span>
                </div>
              </div>

              {/* AI Response */}
              {showResponse && (
                <div style={{
                  background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05))',
                  borderRadius: '1rem',
                  padding: '1.5rem',
                  border: '1px solid rgba(102, 126, 234, 0.2)',
                  animation: 'slideUp 0.5s ease-out',
                  position: 'relative'
                }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    <div style={{
                      width: '2rem',
                      height: '2rem',
                      background: 'linear-gradient(135deg, #667eea, #764ba2)',
                      borderRadius: '0.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <CheckCircle style={{ width: '1rem', height: '1rem', color: 'white' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontSize: '1rem',
                        color: '#334155',
                        lineHeight: '1.6',
                        marginBottom: '1rem'
                      }}>
                        {currentResponse}
                      </div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '0.875rem',
                        color: '#64748b'
                      }}>
                        <span>✨ AI-powered analysis</span>
                        <span>•</span>
                        <span>Real-time data</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Actual Search Form */}
          <form onSubmit={handleSubmit} style={{
            width: '100%',
            maxWidth: '40rem',
            margin: '0 auto',
            background: 'white',
            borderRadius: '1rem',
            padding: '1.5rem',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Search style={{ width: '1.5rem', height: '1.5rem', color: '#94a3b8' }} />
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
                  color: '#334155',
                  fontSize: '1.125rem',
                  fontWeight: '500'
                }}
              />
              <button
                type="submit"
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
                  display: 'flex',
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
                <span>Search APIs</span>
                <ArrowRight style={{ width: '1rem', height: '1rem' }} />
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Process Timeline Section */}
      <section style={{
        padding: '6rem 2rem',
        background: 'white',
        borderTop: '1px solid #e2e8f0'
      }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: '800',
              color: '#1e293b',
              marginBottom: '1rem'
            }}>
              How it works
            </h2>
            <p style={{
              fontSize: '1.125rem',
              color: '#64748b',
              maxWidth: '40rem',
              margin: '0 auto'
            }}>
              Our AI-powered platform makes finding the perfect API effortless
            </p>
          </div>

          {/* Timeline */}
          <div style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: '2rem'
          }}>
            {/* Timeline line */}
            <div style={{
              position: 'absolute',
              top: '3rem',
              left: '0',
              right: '0',
              height: '2px',
              background: 'linear-gradient(90deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
              zIndex: 1
            }}></div>

            {/* Step 1 */}
            <div style={{
              flex: 1,
              textAlign: 'center',
              position: 'relative',
              zIndex: 2
            }}>
              <div style={{
                width: '6rem',
                height: '6rem',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)',
                position: 'relative'
              }}>
                <span style={{
                  fontSize: '1.5rem',
                  fontWeight: '800',
                  color: 'white'
                }}>1</span>
                <div style={{
                  position: 'absolute',
                  inset: '-4px',
                  background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.3), rgba(118, 75, 162, 0.3))',
                  borderRadius: '50%',
                  animation: 'pulse 2s infinite'
                }}></div>
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#1e293b',
                marginBottom: '0.75rem'
              }}>
                Describe Your Needs
              </h3>
              <p style={{
                color: '#64748b',
                lineHeight: '1.6'
              }}>
                Simply tell us what you're building or what problem you're solving
              </p>
            </div>

            {/* Step 2 */}
            <div style={{
              flex: 1,
              textAlign: 'center',
              position: 'relative',
              zIndex: 2
            }}>
              <div style={{
                width: '6rem',
                height: '6rem',
                background: 'linear-gradient(135deg, #764ba2 0%, #f093fb 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                boxShadow: '0 10px 30px rgba(118, 75, 162, 0.3)',
                position: 'relative'
              }}>
                <Zap style={{ width: '2rem', height: '2rem', color: 'white' }} />
                <div style={{
                  position: 'absolute',
                  inset: '-4px',
                  background: 'linear-gradient(135deg, rgba(118, 75, 162, 0.3), rgba(240, 147, 251, 0.3))',
                  borderRadius: '50%',
                  animation: 'pulse 2s infinite 0.5s'
                }}></div>
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#1e293b',
                marginBottom: '0.75rem'
              }}>
                AI Finds Matches
              </h3>
              <p style={{
                color: '#64748b',
                lineHeight: '1.6'
              }}>
                Our intelligent system analyzes hundreds of APIs and finds the perfect matches
              </p>
            </div>

            {/* Step 3 */}
            <div style={{
              flex: 1,
              textAlign: 'center',
              position: 'relative',
              zIndex: 2
            }}>
              <div style={{
                width: '6rem',
                height: '6rem',
                background: 'linear-gradient(135deg, #f093fb 0%, #667eea 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                boxShadow: '0 10px 30px rgba(240, 147, 251, 0.3)',
                position: 'relative'
              }}>
                <CheckCircle style={{ width: '2rem', height: '2rem', color: 'white' }} />
                <div style={{
                  position: 'absolute',
                  inset: '-4px',
                  background: 'linear-gradient(135deg, rgba(240, 147, 251, 0.3), rgba(102, 126, 234, 0.3))',
                  borderRadius: '50%',
                  animation: 'pulse 2s infinite 1s'
                }}></div>
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#1e293b',
                marginBottom: '0.75rem'
              }}>
                Compare & Choose
              </h3>
              <p style={{
                color: '#64748b',
                lineHeight: '1.6'
              }}>
                Compare APIs side-by-side with real-time performance data and pricing
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Add styles */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
          }

          @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
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

          @keyframes pulse {
            0%, 100% {
              opacity: 0.4;
              transform: scale(1);
            }
            50% {
              opacity: 0.8;
              transform: scale(1.05);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Hero;
