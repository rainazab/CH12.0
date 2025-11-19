'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft, Check, Save } from 'lucide-react';

interface APIResult {
  api: {
    id: string;
    name: string;
    provider: string;
    cost: string;
    category: string;
    uptime: string;
    icon: string;
  };
  output: string;
  latency: number;
  cost: number;
  error?: string;
}

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const [results, setResults] = useState<APIResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  // Get parameters from URL
  const categories = searchParams.get('categories')?.split(',') || [];
  const useCase = searchParams.get('useCase') || '';
  const budget = searchParams.get('budget') || '';
  const priority = searchParams.get('priority') || '';
  const description = searchParams.get('description') || '';

  useEffect(() => {
    // Only load once and only if we have a description (indicating questionnaire completion)
    if (!hasLoaded && description.trim()) {
      loadResults();
    }
  }, [categories, useCase, budget, priority, description, hasLoaded]);

  const loadResults = async () => {
    // Prevent multiple simultaneous calls
    if (hasLoaded) return;

    setLoading(true);
    setHasLoaded(true); // Mark as loaded immediately to prevent re-runs

    try {
      // Get recommended APIs based on categories
      const recommendedAPIs = getRecommendedAPIs(categories);

      console.log('Loading results for description:', description.substring(0, 50) + '...');
      console.log('Recommended APIs:', recommendedAPIs.map(api => api.name));

      if (recommendedAPIs.length === 0) {
        console.log('No recommended APIs found');
        setResults([]);
        setLoading(false);
        return;
      }

      // Make API calls for comparison
      console.log('Making API comparison calls...');
      const comparisonResults = await runComparison(description, recommendedAPIs.slice(0, 3));
      console.log('Comparison results received:', Object.keys(comparisonResults));

      // Format results
      const formattedResults: APIResult[] = Object.entries(comparisonResults).map(([apiId, result]) => {
        const api = recommendedAPIs.find(a => a.id === apiId);
        if (!api) {
          console.log('API not found for id:', apiId);
          return null;
        }

        // Extract text content from API response objects
        let outputText = 'No response generated';
        if (result.output) {
          try {
            const parsed = typeof result.output === 'string' ? JSON.parse(result.output) : result.output;

            // Extract text based on API response format
            if (parsed.choices && parsed.choices[0]?.message?.content) {
              // OpenAI format
              outputText = parsed.choices[0].message.content;
            } else if (parsed.content && parsed.content[0]?.text) {
              // Claude format
              outputText = parsed.content[0].text;
            } else if (parsed.candidates && parsed.candidates[0]?.content?.parts?.[0]?.text) {
              // Gemini format
              outputText = parsed.candidates[0].content.parts[0].text;
            } else if (parsed.response) {
              // Generic format
              outputText = parsed.response;
            } else if (typeof parsed === 'string') {
              outputText = parsed;
            } else {
              outputText = JSON.stringify(parsed, null, 2);
            }
          } catch (e) {
            console.error('Error parsing API response for', apiId, ':', e);
            outputText = typeof result.output === 'string' ? result.output : JSON.stringify(result.output, null, 2);
          }
        }

        return {
          api,
          output: outputText,
          latency: result.latency,
          cost: result.error ? 0 : 0.01, // Fixed cost for demo
          error: result.error,
        };
      }).filter(Boolean) as APIResult[];

      console.log('Setting formatted results:', formattedResults.length, 'results');
      setResults(formattedResults);
    } catch (error) {
      console.error('Error loading results:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const getRecommendedAPIs = (categories: string[]) => {
    // Category mapping from questionnaire to API categories
    const categoryMapping: Record<string, string[]> = {
      'llm': ['llm'],
      'image-gen': ['image-generation'],
      'voice': ['text-to-speech', 'voice'],
      'voice-tts': ['text-to-speech'],
      'voice-stt': ['text-to-speech'],
      'embeddings': ['llm'],
      'payments': ['payments'],
      'inventory': ['e-commerce'],
      'email': ['email'],
      'analytics': ['analytics'],
      'auth': ['auth'],
      'database': ['database'],
      'audio-processing': ['text-to-speech'],
      'image-processing': ['image-generation'],
      'storage': ['storage'],
      'data-processing': ['analytics'],
      'visualization': ['analytics']
    };

    // Import APIs data
    const apis = [
      {
        "id": "gpt4o",
        "name": "GPT-4.1 Omni",
        "provider": "OpenAI",
        "uptime": "99.9%",
        "cost": "$0.005/1k tokens",
        "category": "llm",
        "icon": "/logo/openai.svg.png"
      },
      {
        "id": "claude3",
        "name": "Claude 3 Opus",
        "provider": "Anthropic",
        "uptime": "99.7%",
        "cost": "$0.015/1k tokens",
        "category": "llm",
        "icon": "/logo/claude.svg.png"
      },
      {
        "id": "gemini",
        "name": "Gemini Pro",
        "provider": "Google",
        "uptime": "99.5%",
        "cost": "$0.0005/1k tokens",
        "category": "llm",
        "icon": "/logo/gemini.svg.png"
      },
      {
        "id": "elevenlabs",
        "name": "ElevenLabs TTS",
        "provider": "ElevenLabs",
        "uptime": "99.7%",
        "cost": "$0.30/1M characters",
        "category": "text-to-speech",
        "icon": "/logo/ElevenLabs.png"
      }
    ];

    // Convert questionnaire categories to API categories
    const mappedCategories = categories.flatMap(cat => categoryMapping[cat] || [cat]);

    // If no categories match, return all APIs (fallback)
    if (mappedCategories.length === 0) {
      return apis;
    }

    // Filter APIs based on mapped categories
    const filteredAPIs = apis.filter(api =>
      mappedCategories.some(mappedCat =>
        api.category === mappedCat ||
        api.category.includes(mappedCat) ||
        mappedCat.includes(api.category)
      )
    );

    // If no APIs match, return all available APIs as fallback
    return filteredAPIs.length > 0 ? filteredAPIs : apis;
  };

  const runComparison = async (prompt: string, apis: any[]) => {
    const results: Record<string, any> = {};

    for (const api of apis) {
      try {
        console.log(`Calling API for ${api.name}...`);

        // Create a timeout promise
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error('Request timeout')), 30000); // 30 second timeout
        });

        const fetchPromise = fetch('/api/compare', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: `${prompt}. Generate a response as if you were the ${api.name} API.`,
            apis: [api.id],
            userId: 'questionnaire_user',
          }),
        });

        const response = await Promise.race([fetchPromise, timeoutPromise]) as Response;

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        results[api.id] = data[api.id] || { output: '', latency: 0, error: 'No response' };
        console.log(`✓ ${api.name} completed`);
      } catch (error: any) {
        console.error(`✗ ${api.name} failed:`, error.message);
        results[api.id] = {
          output: '',
          latency: 0,
          error: error.message || 'API call failed'
        };
      }
    }

    return results;
  };

  const handleSaveStack = async () => {
    if (results.length === 0) return;

    setSaving(true);
    try {
      // This would save to user's profile in a real implementation
      // For now, just show success
      setTimeout(() => {
        setSaved(true);
        setSaving(false);
      }, 1000);
    } catch (error) {
      console.error('Error saving stack:', error);
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <p className="text-gray-400">Analyzing your requirements and comparing APIs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-gray-800/50 px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/stacks/questionnaire" className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition">
              <ArrowLeft className="w-4 h-4" />
              Back to Questionnaire
            </Link>
            <div className="text-sm text-gray-500">
              {results.length} APIs compared • {description.substring(0, 50)}{description.length > 50 ? '...' : ''}
            </div>
          </div>

          <button
            onClick={handleSaveStack}
            disabled={saving || saved}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : saved ? (
              <Check className="w-4 h-4" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {saved ? 'Saved!' : 'Save Stack'}
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">API Comparison Results</h1>
          <p className="text-gray-400">
            Based on your project: <span className="text-cyan-400">{description}</span>
          </p>
          {results.length > 0 && (
            <div className="mt-4 p-4 bg-gray-900/50 rounded-lg border border-gray-800">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Best for {priority}:</span>
                  <span className="text-cyan-400 ml-2 font-medium">
                    {results.reduce((best, current) =>
                      priority === 'cost' ? (current.cost < best.cost ? current : best) :
                      priority === 'performance' ? (current.latency < best.latency ? current : best) :
                      current
                    ).api.name}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">Budget tier:</span>
                  <span className="text-cyan-400 ml-2 font-medium capitalize">{budget}</span>
                </div>
                <div>
                  <span className="text-gray-500">Use case:</span>
                  <span className="text-cyan-400 ml-2 font-medium capitalize">{useCase.replace('-', ' ')}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="space-y-6">
          {results.map((result) => (
            <div key={result.api.id} className="bg-gray-900/50 border border-gray-800/50 rounded-2xl overflow-hidden backdrop-blur">
              {/* Header */}
              <div className="bg-gradient-to-r from-gray-900/50 to-black/50 border-b border-gray-800/50 px-8 py-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Image
                    src={result.api.icon}
                    alt={result.api.name}
                    width={48}
                    height={48}
                    className="w-12 h-12 object-contain rounded-lg"
                  />
                  <div>
                    <h3 className="text-2xl font-bold text-white">{result.api.name}</h3>
                    <p className="text-gray-400 text-sm">{result.api.provider}</p>
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <p className="text-xs text-gray-500">Response time</p>
                  <p className="text-2xl font-bold text-cyan-400">{result.latency}ms</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Response */}
                  <div>
                    <h4 className="text-lg font-semibold mb-3">API Response</h4>
                    {result.error ? (
                      <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
                        <p className="text-red-400">{result.error}</p>
                      </div>
                    ) : (
                      <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
                        <p className="text-gray-300 whitespace-pre-wrap">{result.output}</p>
                      </div>
                    )}
                  </div>

                  {/* Metrics */}
                  <div>
                    <h4 className="text-lg font-semibold mb-3">Performance Metrics</h4>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-gray-800/30 rounded-lg">
                        <span className="text-gray-400">Latency</span>
                        <span className="text-cyan-400 font-mono">{result.latency}ms</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-800/30 rounded-lg">
                        <span className="text-gray-400">Cost per request</span>
                        <span className="text-green-400 font-mono">${result.cost.toFixed(4)}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-800/30 rounded-lg">
                        <span className="text-gray-400">Uptime</span>
                        <span className="text-yellow-400 font-mono">{result.api.uptime}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-800/30 rounded-lg">
                        <span className="text-gray-400">Category</span>
                        <span className="text-purple-400 capitalize">{result.api.category.replace('-', ' ')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {results.length === 0 && !loading && (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">No API recommendations found for your criteria.</p>
            <Link href="/stacks/questionnaire" className="inline-block mt-4 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition">
              Try Again
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

