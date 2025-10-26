import { useState } from 'react';
import { CheckCircle, XCircle, Clock, Star, ExternalLink, BarChart3, Search, TrendingUp, Zap, DollarSign, Activity } from 'lucide-react';

const APIResults = ({ results, loading, onAPISelect, selectedAPIs }) => {
  if (loading) {
    return (
      <section style={{
        padding: '6rem 2rem',
        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          textAlign: 'center',
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(20px)',
          borderRadius: '1.5rem',
          padding: '3rem',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <div style={{
            width: '4rem',
            height: '4rem',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
            animation: 'spin 1s linear infinite'
          }}>
            <Search style={{ width: '1.5rem', height: '1.5rem', color: 'white' }} />
          </div>
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: '#1e293b',
            marginBottom: '0.5rem'
          }}>
            Finding Your Perfect APIs
          </h3>
          <p style={{
            color: '#64748b',
            fontSize: '1rem'
          }}>
            Our AI is analyzing hundreds of APIs to find the best matches...
          </p>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.5rem',
            marginTop: '1.5rem'
          }}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  width: '0.5rem',
                  height: '0.5rem',
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  borderRadius: '50%',
                  animation: `pulse 1.5s ease-in-out infinite ${i * 0.2}s`
                }}
              ></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!results || results.length === 0) {
    return (
      <section style={{
        padding: '6rem 2rem',
        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          textAlign: 'center',
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(20px)',
          borderRadius: '1.5rem',
          padding: '3rem',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          maxWidth: '30rem'
        }}>
          <div style={{
            width: '4rem',
            height: '4rem',
            background: 'linear-gradient(135deg, #94a3b8 0%, #64748b 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem'
          }}>
            <Search style={{ width: '1.5rem', height: '1.5rem', color: 'white' }} />
          </div>
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: '#1e293b',
            marginBottom: '0.5rem'
          }}>
            No APIs Found
          </h3>
          <p style={{
            color: '#64748b',
            fontSize: '1rem',
            marginBottom: '2rem',
            lineHeight: '1.6'
          }}>
            We couldn't find APIs matching your search. Try adjusting your terms or browse our popular APIs.
          </p>
          <button style={{
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
            <Search style={{ width: '1rem', height: '1rem' }} />
            Browse Popular APIs
          </button>
        </div>
      </section>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'operational':
        return 'bg-green-100 text-green-800';
      case 'degraded':
        return 'bg-yellow-100 text-yellow-800';
      case 'down':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'operational':
        return <CheckCircle className="w-4 h-4" />;
      case 'degraded':
        return <Clock className="w-4 h-4" />;
      case 'down':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <section style={{
      padding: '6rem 2rem',
      background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)'
    }}>
      <div style={{ maxWidth: '90rem', margin: '0 auto' }}>
        {/* Results header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '4rem',
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(20px)',
          borderRadius: '1.5rem',
          padding: '2rem',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
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
            marginBottom: '1rem',
            boxShadow: '0 4px 20px rgba(102, 126, 234, 0.3)'
          }}>
            <CheckCircle style={{ width: '1rem', height: '1rem' }} />
            AI-Powered Results
          </div>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: '800',
            background: 'linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '1rem'
          }}>
            Found {results.length} Perfect APIs
          </h2>
          <p style={{
            fontSize: '1.125rem',
            color: '#64748b',
            lineHeight: '1.6',
            maxWidth: '50rem',
            margin: '0 auto'
          }}>
            Our AI analyzed hundreds of APIs to find the best matches for your needs.
            Click any API to select it for comparison.
          </p>
        </div>

        {/* Results grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '2rem',
          marginBottom: '4rem'
        }}>
          {results.map((api, index) => {
            const isSelected = selectedAPIs.some(selected => selected.id === api.id);
            const performance = api.performance || {};

            return (
              <div
                key={api.id}
                style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '1.5rem',
                  padding: '2rem',
                  boxShadow: isSelected
                    ? '0 20px 60px rgba(102, 126, 234, 0.3), 0 0 0 2px rgba(102, 126, 234, 0.2)'
                    : '0 10px 40px rgba(0, 0, 0, 0.1)',
                  border: isSelected ? '2px solid rgba(102, 126, 234, 0.3)' : '1px solid rgba(255, 255, 255, 0.2)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  transform: isSelected ? 'translateY(-4px)' : 'translateY(0)',
                  position: 'relative',
                  overflow: 'hidden',
                  animation: `slideUp 0.5s ease-out ${index * 0.1}s both`
                }}
                onClick={() => onAPISelect(api)}
                onMouseOver={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.15)';
                  }
                }}
                onMouseOut={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.1)';
                  }
                }}
              >
                {/* Gradient overlay for selected state */}
                {isSelected && (
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: 'linear-gradient(90deg, #667eea 0%, #764ba2 50%, #f093fb 100%)'
                  }}></div>
                )}

                {/* Header */}
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                      width: '3.5rem',
                      height: '3.5rem',
                      background: `linear-gradient(135deg, ${index % 3 === 0 ? '#667eea' : index % 3 === 1 ? '#764ba2' : '#f093fb'} 0%, ${index % 3 === 0 ? '#764ba2' : index % 3 === 1 ? '#f093fb' : '#667eea'} 100%)`,
                      borderRadius: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)'
                    }}>
                      <span style={{
                        fontSize: '1.25rem',
                        fontWeight: '800',
                        color: 'white'
                      }}>
                        {api.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 style={{
                        fontSize: '1.25rem',
                        fontWeight: '700',
                        color: '#1e293b',
                        marginBottom: '0.25rem'
                      }}>
                        {api.name}
                      </h3>
                      <p style={{
                        fontSize: '0.875rem',
                        color: '#64748b',
                        fontWeight: '500'
                      }}>
                        by {api.provider}
                      </p>
                    </div>
                  </div>
                  {isSelected && (
                    <div style={{
                      background: 'linear-gradient(135deg, #667eea, #764ba2)',
                      borderRadius: '50%',
                      padding: '0.5rem',
                      boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
                    }}>
                      <CheckCircle style={{ width: '1.25rem', height: '1.25rem', color: 'white' }} />
                    </div>
                  )}
                </div>

                {/* Description */}
                <p style={{
                  color: '#64748b',
                  fontSize: '0.875rem',
                  lineHeight: '1.5',
                  marginBottom: '1.5rem'
                }}>
                  {api.description}
                </p>

                {/* Performance Metrics with Visual Charts */}
                <div style={{ marginBottom: '1.5rem' }}>
                  {/* Status Badge */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '1rem'
                  }}>
                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      color: '#64748b',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>
                      Status
                    </span>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '1rem',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      background: performance.status === 'operational'
                        ? 'rgba(34, 197, 94, 0.1)'
                        : performance.status === 'degraded'
                        ? 'rgba(251, 191, 36, 0.1)'
                        : 'rgba(239, 68, 68, 0.1)',
                      color: performance.status === 'operational'
                        ? '#16a34a'
                        : performance.status === 'degraded'
                        ? '#d97706'
                        : '#dc2626'
                    }}>
                      {getStatusIcon(performance.status)}
                      <span className="capitalize">{performance.status || 'unknown'}</span>
                    </span>
                  </div>

                  {/* Metrics Grid */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '1rem'
                  }}>
                    {/* Response Time */}
                    {performance.responseTime && (
                      <div style={{
                        background: 'rgba(102, 126, 234, 0.05)',
                        borderRadius: '0.75rem',
                        padding: '1rem',
                        border: '1px solid rgba(102, 126, 234, 0.1)'
                      }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          marginBottom: '0.5rem'
                        }}>
                          <Zap style={{ width: '1rem', height: '1rem', color: '#667eea' }} />
                          <span style={{
                            fontSize: '0.75rem',
                            fontWeight: '600',
                            color: '#64748b',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                          }}>
                            Response Time
                          </span>
                        </div>
                        <div style={{
                          fontSize: '1.25rem',
                          fontWeight: '800',
                          color: '#1e293b'
                        }}>
                          {performance.responseTime}ms
                        </div>
                        {/* Mini progress bar */}
                        <div style={{
                          width: '100%',
                          height: '3px',
                          background: 'rgba(102, 126, 234, 0.1)',
                          borderRadius: '2px',
                          marginTop: '0.25rem',
                          overflow: 'hidden'
                        }}>
                          <div style={{
                            width: `${Math.min(100, Math.max(10, 100 - (performance.responseTime / 20)))}%`,
                            height: '100%',
                            background: 'linear-gradient(90deg, #667eea, #764ba2)',
                            borderRadius: '2px',
                            transition: 'width 0.5s ease'
                          }}></div>
                        </div>
                      </div>
                    )}

                    {/* Uptime */}
                    {performance.uptime && (
                      <div style={{
                        background: 'rgba(118, 75, 162, 0.05)',
                        borderRadius: '0.75rem',
                        padding: '1rem',
                        border: '1px solid rgba(118, 75, 162, 0.1)'
                      }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          marginBottom: '0.5rem'
                        }}>
                          <Activity style={{ width: '1rem', height: '1rem', color: '#764ba2' }} />
                          <span style={{
                            fontSize: '0.75rem',
                            fontWeight: '600',
                            color: '#64748b',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                          }}>
                            Uptime
                          </span>
                        </div>
                        <div style={{
                          fontSize: '1.25rem',
                          fontWeight: '800',
                          color: '#1e293b'
                        }}>
                          {performance.uptime}%
                        </div>
                        {/* Mini progress bar */}
                        <div style={{
                          width: '100%',
                          height: '3px',
                          background: 'rgba(118, 75, 162, 0.1)',
                          borderRadius: '2px',
                          marginTop: '0.25rem',
                          overflow: 'hidden'
                        }}>
                          <div style={{
                            width: `${performance.uptime}%`,
                            height: '100%',
                            background: 'linear-gradient(90deg, #764ba2, #f093fb)',
                            borderRadius: '2px',
                            transition: 'width 0.5s ease'
                          }}></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Features */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    color: '#64748b',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: '0.5rem'
                  }}>
                    Key Features
                  </div>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.5rem'
                  }}>
                    {api.features?.slice(0, 3).map((feature, featureIndex) => (
                      <span
                        key={featureIndex}
                        style={{
                          padding: '0.25rem 0.75rem',
                          background: `linear-gradient(135deg, ${featureIndex % 3 === 0 ? 'rgba(102, 126, 234, 0.1)' : featureIndex % 3 === 1 ? 'rgba(118, 75, 162, 0.1)' : 'rgba(240, 147, 251, 0.1)'})`,
                          color: featureIndex % 3 === 0 ? '#667eea' : featureIndex % 3 === 1 ? '#764ba2' : '#f093fb',
                          borderRadius: '1rem',
                          fontSize: '0.75rem',
                          fontWeight: '600',
                          border: `1px solid ${featureIndex % 3 === 0 ? 'rgba(102, 126, 234, 0.2)' : featureIndex % 3 === 1 ? 'rgba(118, 75, 162, 0.2)' : 'rgba(240, 147, 251, 0.2)'}`
                        }}
                      >
                        {feature}
                      </span>
                    ))}
                    {api.features?.length > 3 && (
                      <span style={{
                        padding: '0.25rem 0.75rem',
                        background: 'rgba(148, 163, 184, 0.1)',
                        color: '#64748b',
                        borderRadius: '1rem',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        border: '1px solid rgba(148, 163, 184, 0.2)'
                      }}>
                        +{api.features.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Pricing and Actions */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '1.5rem',
                  borderTop: '1px solid rgba(226, 232, 240, 0.5)'
                }}>
                  <div>
                    <div style={{
                      fontSize: '1.5rem',
                      fontWeight: '800',
                      color: '#1e293b'
                    }}>
                      ${performance.monthlyCost?.toFixed(2) || '0.00'}
                    </div>
                    <div style={{
                      fontSize: '0.75rem',
                      color: '#64748b',
                      fontWeight: '500'
                    }}>
                      per month
                    </div>
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      background: 'rgba(251, 191, 36, 0.1)',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '0.5rem',
                      border: '1px solid rgba(251, 191, 36, 0.2)'
                    }}>
                      <Star style={{ width: '0.875rem', height: '0.875rem', color: '#f59e0b' }} />
                      <span style={{
                        fontSize: '0.875rem',
                        fontWeight: '700',
                        color: '#f59e0b'
                      }}>
                        {api.relevanceScore || 95}%
                      </span>
                    </div>

                    <button style={{
                      padding: '0.5rem',
                      background: 'transparent',
                      border: 'none',
                      borderRadius: '0.5rem',
                      cursor: 'pointer',
                      color: '#64748b',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.background = 'rgba(102, 126, 234, 0.1)';
                      e.target.style.color = '#667eea';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.background = 'transparent';
                      e.target.style.color = '#64748b';
                    }}
                    >
                      <ExternalLink style={{ width: '1rem', height: '1rem' }} />
                    </button>
                  </div>
                </div>

                {/* Selection indicator */}
                {isSelected && (
                  <div style={{
                    marginTop: '1rem',
                    padding: '1rem',
                    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
                    borderRadius: '0.75rem',
                    border: '1px solid rgba(102, 126, 234, 0.2)',
                    textAlign: 'center'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      color: '#667eea',
                      fontSize: '0.875rem',
                      fontWeight: '600'
                    }}>
                      <CheckCircle style={{ width: '1rem', height: '1rem' }} />
                      Selected for comparison
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Comparison CTA */}
        {selectedAPIs.length > 0 && (
          <div style={{
            textAlign: 'center',
            marginTop: '3rem'
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(20px)',
              borderRadius: '1.5rem',
              padding: '2rem',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              maxWidth: '40rem',
              margin: '0 auto',
              animation: 'slideUp 0.5s ease-out'
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
                marginBottom: '1rem',
                boxShadow: '0 4px 20px rgba(102, 126, 234, 0.3)'
              }}>
                <BarChart3 style={{ width: '1rem', height: '1rem' }} />
                Ready to Compare
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '800',
                color: '#1e293b',
                marginBottom: '0.5rem'
              }}>
                Compare Selected APIs
              </h3>
              <p style={{
                color: '#64748b',
                fontSize: '1rem',
                marginBottom: '1.5rem',
                lineHeight: '1.6'
              }}>
                You've selected {selectedAPIs.length} API{selectedAPIs.length > 1 ? 's' : ''} for side-by-side comparison.
                Analyze performance metrics, pricing, and features in detail.
              </p>
              <button style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                padding: '0.875rem 2rem',
                borderRadius: '0.75rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 20px rgba(102, 126, 234, 0.3)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '1rem'
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
                <BarChart3 style={{ width: '1.125rem', height: '1.125rem' }} />
                View Detailed Comparison
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add animations */}
      <style>
        {`
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

          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
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
    </section>
  );
};

export default APIResults;
