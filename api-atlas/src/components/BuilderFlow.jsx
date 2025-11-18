import { useState } from 'react';
import { ArrowRight, Zap } from 'lucide-react';

const useCases = [
  { id: 'chat', icon: '💬', label: 'Build a Chatbot', description: 'Compare LLM outputs' },
  { id: 'image', icon: '🎨', label: 'Generate Images', description: 'Compare image generation' },
  { id: 'email', icon: '📧', label: 'Send Emails', description: 'Compare email APIs' },
  { id: 'voice', icon: '🎤', label: 'Build Voice App', description: 'Compare speech/TTS' },
  { id: 'search', icon: '🔍', label: 'Build Search', description: 'Compare search engines' },
  { id: 'pay', icon: '💳', label: 'Take Payments', description: 'Compare payment processors' },
];

const mockOutputs = {
  chat: {
    query: 'Explain quantum computing in 1 sentence',
    apis: [
      { name: 'GPT-4', output: 'Quantum computers exploit superposition and entanglement to process information exponentially faster than classical systems.', cost: '$0.03', time: '0.8s', quality: '⭐⭐⭐⭐⭐' },
      { name: 'Claude', output: 'Quantum computers use quantum bits that exist in multiple states simultaneously, enabling rapid parallel computation.', cost: '$0.008', time: '1.2s', quality: '⭐⭐⭐⭐⭐' },
      { name: 'Gemini', output: 'Quantum computing uses qubits instead of classical bits, leveraging quantum mechanics for faster computation.', cost: '$0.0015', time: '1.5s', quality: '⭐⭐⭐⭐' },
    ]
  },
  image: {
    query: 'A futuristic city at sunset',
    apis: [
      { name: 'DALL-E 3', output: '[High quality, vibrant, detailed artistic rendering]', cost: '$0.08', time: '8s', quality: '⭐⭐⭐⭐⭐', color: 'from-yellow-400 to-orange-500' },
      { name: 'Midjourney', output: '[Ultra-detailed, cinematic, professional quality]', cost: '$0.01/mo', time: '45s', quality: '⭐⭐⭐⭐⭐', color: 'from-purple-400 to-pink-500' },
      { name: 'Stable Diffusion', output: '[Good quality, varied styles, customizable]', cost: '$0.01', time: '10s', quality: '⭐⭐⭐⭐', color: 'from-blue-400 to-cyan-500' },
    ]
  },
  email: {
    query: 'Send transactional email',
    apis: [
      { name: 'SendGrid', output: '✅ Delivered instantly | 99.97% uptime | $0.0001/email', cost: '$0.0001', time: '<100ms', quality: '⭐⭐⭐⭐⭐' },
      { name: 'Mailgun', output: '✅ Delivered instantly | 99.9% uptime | $0.35/1000', cost: '$0.00035', time: '<100ms', quality: '⭐⭐⭐⭐' },
      { name: 'AWS SES', output: '✅ Delivered instantly | 99.99% uptime | $0.0001/email', cost: '$0.0001', time: '<50ms', quality: '⭐⭐⭐⭐⭐' },
    ]
  },
  voice: {
    query: 'Transcribe 1 min audio OR Generate voice',
    apis: [
      { name: 'Whisper', output: '[Accurate transcription: "The weather is nice today"] | 99% accuracy', cost: '$0.006/min', time: '2s', quality: '⭐⭐⭐⭐⭐' },
      { name: 'ElevenLabs', output: '[Natural voice: "The weather is nice today"] | 29 languages', cost: '$0.18/1K chars', time: '<1s', quality: '⭐⭐⭐⭐⭐' },
      { name: 'Google Cloud', output: '[Clean transcription] | 125+ languages', cost: '$0.006/min', time: '<5s', quality: '⭐⭐⭐⭐' },
    ]
  },
};

export default function BuilderFlow() {
  const [step, setStep] = useState('select'); // select or compare
  const [selectedUseCase, setSelectedUseCase] = useState(null);

  const currentCase = selectedUseCase ? mockOutputs[selectedUseCase] : null;

  return (
    <div className="min-h-screen bg-black py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Step 1: Select Use Case */}
        {step === 'select' && (
          <>
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                What are you <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">building?</span>
              </h1>
              <p className="text-xl text-gray-400">
                Choose your use case and see how different APIs compare visually
              </p>
            </div>

            {/* Use Case Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {useCases.map((useCase) => (
                <button
                  key={useCase.id}
                  onClick={() => {
                    setSelectedUseCase(useCase.id);
                    setStep('compare');
                  }}
                  className="group p-6 rounded-xl border-2 border-gray-700 hover:border-cyan-500 bg-gray-900/50 hover:bg-gray-900/80 transition transform hover:scale-105 text-left"
                >
                  <div className="text-4xl mb-3">{useCase.icon}</div>
                  <h3 className="font-bold text-white mb-1">{useCase.label}</h3>
                  <p className="text-xs text-gray-400">{useCase.description}</p>
                  <div className="mt-4 flex items-center gap-2 text-cyan-400 text-sm opacity-0 group-hover:opacity-100 transition">
                    Compare <ArrowRight className="w-4 h-4" />
                  </div>
                </button>
              ))}
            </div>
          </>
        )}

        {/* Step 2: Visual Comparison */}
        {step === 'compare' && currentCase && (
          <>
            {/* Back Button */}
            <button
              onClick={() => setStep('select')}
              className="mb-8 text-cyan-400 hover:text-cyan-300 flex items-center gap-2 transition"
            >
              ← Back to use cases
            </button>

            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">
                {selectedUseCase === 'chat' && '💬 Compare LLM Outputs'}
                {selectedUseCase === 'image' && '🎨 Compare Image Generation'}
                {selectedUseCase === 'email' && '📧 Compare Email Services'}
                {selectedUseCase === 'voice' && '🎤 Compare Voice APIs'}
                {selectedUseCase === 'search' && '🔍 Compare Search Engines'}
                {selectedUseCase === 'pay' && '💳 Compare Payment APIs'}
              </h2>
              <p className="text-gray-400 mb-6">Sample: {currentCase.query}</p>
            </div>

            {/* Side-by-Side Comparison */}
            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {currentCase.apis.map((api, idx) => (
                <div key={idx} className="group">
                  {/* API Card Header */}
                  <div className="p-4 bg-gradient-to-r from-gray-800 to-gray-900 rounded-t-xl border-2 border-gray-700 group-hover:border-cyan-500 transition">
                    <h3 className="font-bold text-white text-lg flex items-center gap-2">
                      <Zap className="w-5 h-5 text-cyan-400" />
                      {api.name}
                    </h3>
                  </div>

                  {/* Output Display */}
                  <div className={`p-6 bg-gradient-to-br ${api.color || 'from-cyan-900/30 to-blue-900/30'} rounded-b-xl border-2 border-t-0 border-gray-700 group-hover:border-cyan-500 transition min-h-48 flex flex-col justify-between`}>
                    <div>
                      <p className="text-gray-200 mb-6 leading-relaxed text-sm">{api.output}</p>
                    </div>

                    {/* Metrics */}
                    <div className="space-y-3 pt-6 border-t border-gray-600">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-400">Cost</span>
                        <span className="font-bold text-cyan-400">{api.cost}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-400">Speed</span>
                        <span className="font-bold text-cyan-400">{api.time}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-400">Quality</span>
                        <span className="font-bold text-yellow-400">{api.quality}</span>
                      </div>
                    </div>

                    {/* CTA */}
                    <button className="mt-4 w-full py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition font-semibold text-sm">
                      Learn More
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Recommendation Box */}
            <div className="mt-12 max-w-4xl mx-auto p-6 bg-gradient-to-r from-purple-900/30 to-cyan-900/30 border-2 border-purple-500/50 rounded-xl">
              <h3 className="font-bold text-white mb-3 flex items-center gap-2">
                💡 Smart Recommendation
              </h3>
              <p className="text-gray-300 mb-4">
                {selectedUseCase === 'chat' && 'For fastest + cheapest: Gemini. For best quality: GPT-4. For balanced: Claude.'}
                {selectedUseCase === 'image' && 'For best quality: DALL-E 3. For speed: Stable Diffusion. For artistic: Midjourney.'}
                {selectedUseCase === 'email' && 'All are reliable. AWS SES or SendGrid for scale, Mailgun for cost savings.'}
                {selectedUseCase === 'voice' && 'Whisper for transcription, ElevenLabs for natural speech synthesis.'}
              </p>
              <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full hover:shadow-lg transition font-semibold">
                Start Building
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

