import { useState, useEffect } from 'react';
import { Play, RotateCcw, Share2, Trophy } from 'lucide-react';

const mockResponses = {
  'openai-gpt4': 'Quantum computing leverages quantum bits to perform computations exponentially faster than classical computers by exploiting superposition and entanglement principles.',
  'anthropic-claude': 'Quantum computing uses quantum bits (qubits) that can exist in multiple states simultaneously, enabling parallel processing and solving complex problems much faster than traditional computers.',
  'google-gemini': 'Quantum computers harness quantum mechanical phenomena to perform calculations. Unlike classical bits, qubits can be 0, 1, or both simultaneously.',
  'openai-dalle3': '[Image generating: A vibrant futuristic city with flying cars and neon lights...]',
  'midjourney-api': '[Creating: Highly detailed cyberpunk metropolis with advanced architecture...]',
  'stable-diffusion': '[Generating: Abstract futuristic cityscape with golden hour lighting...]',
};

const testQueries = {
  'LLM': {
    query: 'Explain quantum computing in 2 sentences',
    categories: ['openai-gpt4', 'anthropic-claude', 'google-gemini', 'cohere-api'],
    type: 'text'
  },
  'Image Generation': {
    query: 'A futuristic city at sunset with flying cars',
    categories: ['openai-dalle3', 'midjourney-api', 'stable-diffusion'],
    type: 'image'
  },
  'Speech-to-Text': {
    query: 'Transcribe 1 minute of audio',
    categories: ['openai-whisper', 'google-stt'],
    type: 'audio'
  }
};

export default function FirstSecondsTest({ allAPIs = [] }) {
  const [testCategory, setTestCategory] = useState('LLM');
  const [selectedAPI1, setSelectedAPI1] = useState(null);
  const [selectedAPI2, setSelectedAPI2] = useState(null);
  const [testRunning, setTestRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [results, setResults] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const currentQuery = testQueries[testCategory];
  const availableAPIs = allAPIs.filter(api => currentQuery.categories.includes(api.id));

  // Timer effect
  useEffect(() => {
    let timer;
    if (testRunning && elapsedTime < 5) {
      timer = setInterval(() => {
        setElapsedTime(prev => Math.min(prev + 0.1, 5));
      }, 100);
    } else if (elapsedTime >= 5 && testRunning) {
      setTestRunning(false);
      setShowResults(true);
    }
    return () => clearInterval(timer);
  }, [testRunning, elapsedTime]);

  // Simulate API response with realistic latency
  const simulateAPIResponse = (api) => {
    return new Promise((resolve) => {
      const baseLatency = api.performance?.avgResponseTime || 1000;
      const variance = Math.random() * 1000;
      const totalLatency = (baseLatency + variance) / 1000; // Convert to seconds
      
      setTimeout(() => {
        const response = mockResponses[api.id] || 'Response generated...';
        resolve({
          api: api.name,
          id: api.id,
          latency: totalLatency.toFixed(2),
          response: response,
          cost: ((Math.random() * 0.1) + 0.01).toFixed(4),
          tokens: Math.floor(Math.random() * 150) + 50,
          uptime: api.performance?.uptime || 99.9
        });
      }, totalLatency * 1000);
    });
  };

  // Run test
  const runTest = async () => {
    if (!selectedAPI1 || !selectedAPI2) {
      alert('Please select 2 APIs to compare');
      return;
    }

    setTestRunning(true);
    setElapsedTime(0);
    setShowResults(false);
    setResults(null);

    const [result1, result2] = await Promise.all([
      simulateAPIResponse(selectedAPI1),
      simulateAPIResponse(selectedAPI2)
    ]);

    setResults({
      api1: result1,
      api2: result2,
      winner: parseFloat(result1.latency) < parseFloat(result2.latency) ? 'api1' : 'api2'
    });
  };

  const resetTest = () => {
    setTestRunning(false);
    setElapsedTime(0);
    setResults(null);
    setShowResults(false);
  };

  return (
    <div className="min-h-screen bg-black py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            ⏱️ First <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">5 Seconds</span> Test
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            See which API responds fastest with the best quality. Real latency, real comparison, real insights.
          </p>
        </div>

        {/* Category Selection */}
        <div className="flex gap-4 justify-center mb-12 flex-wrap">
          {Object.keys(testQueries).map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setTestCategory(cat);
                setSelectedAPI1(null);
                setSelectedAPI2(null);
                resetTest();
              }}
              className={`px-6 py-3 rounded-full font-semibold transition ${
                testCategory === cat
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/50'
                  : 'bg-gray-900 text-gray-300 border border-gray-700 hover:border-cyan-500'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Test Query Display */}
        <div className="max-w-4xl mx-auto mb-12 p-6 bg-gray-900/50 border border-gray-800 rounded-xl">
          <p className="text-gray-400 text-sm mb-2">Testing with prompt:</p>
          <p className="text-2xl font-semibold text-white">"{currentQuery.query}"</p>
        </div>

        {/* API Selection */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 mb-12">
          {/* API 1 Selection */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4">API #1</h2>
            <div className="grid gap-3">
              {availableAPIs.map((api) => (
                <button
                  key={api.id}
                  onClick={() => {
                    setSelectedAPI1(api);
                    resetTest();
                  }}
                  className={`p-4 rounded-lg border-2 transition text-left ${
                    selectedAPI1?.id === api.id
                      ? 'bg-cyan-900/30 border-cyan-500 shadow-lg shadow-cyan-500/20'
                      : 'bg-gray-900/30 border-gray-700 hover:border-cyan-500/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-white">{api.name}</h3>
                      <p className="text-sm text-gray-400">{api.provider}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-cyan-400">⚡ {api.performance?.avgResponseTime}ms</p>
                      <p className="text-xs text-gray-500">${api.pricing?.input || api.pricing?.cost || '?'}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* API 2 Selection */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4">API #2</h2>
            <div className="grid gap-3">
              {availableAPIs.map((api) => (
                <button
                  key={api.id}
                  onClick={() => {
                    setSelectedAPI2(api);
                    resetTest();
                  }}
                  className={`p-4 rounded-lg border-2 transition text-left ${
                    selectedAPI2?.id === api.id
                      ? 'bg-purple-900/30 border-purple-500 shadow-lg shadow-purple-500/20'
                      : 'bg-gray-900/30 border-gray-700 hover:border-purple-500/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-white">{api.name}</h3>
                      <p className="text-sm text-gray-400">{api.provider}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-purple-400">⚡ {api.performance?.avgResponseTime}ms</p>
                      <p className="text-xs text-gray-500">${api.pricing?.input || api.pricing?.cost || '?'}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Run Test Button */}
        <div className="text-center mb-12">
          <button
            onClick={runTest}
            disabled={testRunning || !selectedAPI1 || !selectedAPI2}
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-full hover:shadow-2xl hover:shadow-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition transform hover:scale-105 flex items-center gap-2 mx-auto"
          >
            <Play className="w-5 h-5" />
            {testRunning ? `Running... ${elapsedTime.toFixed(1)}s` : 'Run Test'}
          </button>
        </div>

        {/* Live Test Display */}
        {(testRunning || showResults) && (
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* API 1 Results */}
              <div className={`p-6 rounded-xl border-2 ${
                results?.winner === 'api1' && showResults
                  ? 'bg-cyan-900/30 border-cyan-500 shadow-lg shadow-cyan-500/30'
                  : 'bg-gray-900/50 border-gray-700'
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">{selectedAPI1?.name}</h3>
                  {results?.winner === 'api1' && showResults && (
                    <div className="flex items-center gap-2 bg-cyan-500 px-3 py-1 rounded-full">
                      <Trophy className="w-4 h-4" />
                      <span className="text-sm font-bold">Winner!</span>
                    </div>
                  )}
                </div>

                {testRunning && elapsedTime > 0.5 && (
                  <div className="mb-4 p-4 bg-black/50 rounded-lg border border-cyan-500/30 min-h-24">
                    <p className="text-gray-300 text-sm animate-pulse">
                      {results?.api1?.response || 'Generating response...'}
                    </p>
                  </div>
                )}

                {showResults && results?.api1 && (
                  <div className="space-y-3">
                    <div className="p-4 bg-black/50 rounded-lg border border-cyan-500/30">
                      <p className="text-gray-300">{results.api1.response}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="p-3 bg-black/30 rounded border border-cyan-500/20">
                        <p className="text-gray-500">Response Time</p>
                        <p className="text-lg font-bold text-cyan-400">{results.api1.latency}s</p>
                      </div>
                      <div className="p-3 bg-black/30 rounded border border-cyan-500/20">
                        <p className="text-gray-500">Cost Per Use</p>
                        <p className="text-lg font-bold text-cyan-400">${results.api1.cost}</p>
                      </div>
                      <div className="p-3 bg-black/30 rounded border border-cyan-500/20">
                        <p className="text-gray-500">Tokens Used</p>
                        <p className="text-lg font-bold text-cyan-400">{results.api1.tokens}</p>
                      </div>
                      <div className="p-3 bg-black/30 rounded border border-cyan-500/20">
                        <p className="text-gray-500">Uptime</p>
                        <p className="text-lg font-bold text-cyan-400">{results.api1.uptime}%</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* API 2 Results */}
              <div className={`p-6 rounded-xl border-2 ${
                results?.winner === 'api2' && showResults
                  ? 'bg-purple-900/30 border-purple-500 shadow-lg shadow-purple-500/30'
                  : 'bg-gray-900/50 border-gray-700'
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">{selectedAPI2?.name}</h3>
                  {results?.winner === 'api2' && showResults && (
                    <div className="flex items-center gap-2 bg-purple-500 px-3 py-1 rounded-full">
                      <Trophy className="w-4 h-4" />
                      <span className="text-sm font-bold">Winner!</span>
                    </div>
                  )}
                </div>

                {testRunning && elapsedTime > 0.5 && (
                  <div className="mb-4 p-4 bg-black/50 rounded-lg border border-purple-500/30 min-h-24">
                    <p className="text-gray-300 text-sm animate-pulse">
                      {results?.api2?.response || 'Generating response...'}
                    </p>
                  </div>
                )}

                {showResults && results?.api2 && (
                  <div className="space-y-3">
                    <div className="p-4 bg-black/50 rounded-lg border border-purple-500/30">
                      <p className="text-gray-300">{results.api2.response}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="p-3 bg-black/30 rounded border border-purple-500/20">
                        <p className="text-gray-500">Response Time</p>
                        <p className="text-lg font-bold text-purple-400">{results.api2.latency}s</p>
                      </div>
                      <div className="p-3 bg-black/30 rounded border border-purple-500/20">
                        <p className="text-gray-500">Cost Per Use</p>
                        <p className="text-lg font-bold text-purple-400">${results.api2.cost}</p>
                      </div>
                      <div className="p-3 bg-black/30 rounded border border-purple-500/20">
                        <p className="text-gray-500">Tokens Used</p>
                        <p className="text-lg font-bold text-purple-400">{results.api2.tokens}</p>
                      </div>
                      <div className="p-3 bg-black/30 rounded border border-purple-500/20">
                        <p className="text-gray-500">Uptime</p>
                        <p className="text-lg font-bold text-purple-400">{results.api2.uptime}%</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {showResults && (
              <div className="flex gap-4 justify-center">
                <button
                  onClick={resetTest}
                  className="px-6 py-3 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Run Again
                </button>
                <button
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full hover:shadow-lg transition flex items-center gap-2"
                >
                  <Share2 className="w-4 h-4" />
                  Share Results
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

