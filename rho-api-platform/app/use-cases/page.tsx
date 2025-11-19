import Link from 'next/link';
import Image from 'next/image';

export default function UseCasesPage() {
  const useCases = [
    {
      title: 'AI & Machine Learning',
      description: 'Compare GPT-4, Claude 3, Gemini, and other AI APIs to find the best model for your ML projects.',
      icon: '/icon/star.png',
      features: ['Text generation', 'Code completion', 'Content creation', 'Data analysis'],
      color: 'cyan'
    },
    {
      title: 'Image Generation',
      description: 'Evaluate DALL·E 3, Midjourney, Stable Diffusion, and other image APIs for quality and cost.',
      icon: '/icon/paint.png',
      features: ['Photo-realistic images', 'Art styles', 'Custom dimensions', 'Batch processing'],
      color: 'purple'
    },
    {
      title: 'Voice & Audio',
      description: 'Compare ElevenLabs, Google TTS, and other voice APIs for natural-sounding speech synthesis.',
      icon: '/icon/mic.png',
      features: ['Natural voices', 'Multiple languages', 'Emotion control', 'Real-time streaming'],
      color: 'blue'
    },
    {
      title: 'Data Processing',
      description: 'Find the right APIs for data analysis, transformation, and processing at scale.',
      icon: '/icon/chart.png',
      features: ['Real-time analytics', 'Data transformation', 'API integration', 'Scalable processing'],
      color: 'green'
    },
    {
      title: 'E-commerce',
      description: 'Compare payment processors, shipping APIs, and marketplace integrations.',
      icon: '/icon/dollarsign.png',
      features: ['Payment processing', 'Shipping rates', 'Inventory management', 'Marketplace APIs'],
      color: 'orange'
    },
    {
      title: 'Developer Tools',
      description: 'Evaluate APIs for code generation, documentation, testing, and deployment automation.',
      icon: '/icon/doc.png',
      features: ['Code generation', 'API documentation', 'Testing automation', 'CI/CD integration'],
      color: 'pink'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Use Cases for{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Every Project
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
              Discover how Rho helps developers, startups, and enterprises choose the perfect APIs for their specific use cases.
            </p>
          </div>

          <Link
            href="/stacks/questionnaire"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-full hover:shadow-2xl hover:shadow-cyan-500/50 transition transform hover:scale-105"
          >
            Start Comparing APIs
            <span className="text-lg">→</span>
          </Link>
        </div>
      </section>

      {/* Use Cases Grid */}
      <section className="px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Explore Use Cases
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Whether you're building AI applications, processing images, or handling payments, find the right APIs for your project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {useCases.map((useCase, idx) => (
              <div
                key={idx}
                className="bg-gray-900/50 border border-gray-800/50 rounded-xl p-6 hover:border-gray-700/70 transition duration-300 hover:transform hover:scale-105"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 flex items-center justify-center">
                    <Image src={useCase.icon} alt={useCase.title} width={32} height={32} style={{ objectFit: 'contain' }} />
                  </div>
                  <h3 className="text-xl font-bold">{useCase.title}</h3>
                </div>

                <p className="text-gray-400 mb-6 leading-relaxed">
                  {useCase.description}
                </p>

                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-gray-300 mb-3">Perfect for:</h4>
                  <div className="flex flex-wrap gap-2">
                    {useCase.features.map((feature, featureIdx) => (
                      <span
                        key={featureIdx}
                        className={`px-3 py-1 rounded-full text-xs font-medium bg-${useCase.color}-500/10 text-${useCase.color}-400 border border-${useCase.color}-500/20`}
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-800/30">
                  <Link
                    href="/stacks/questionnaire"
                    className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition duration-300 text-sm font-medium group"
                  >
                    <span>Compare APIs for this use case</span>
                    <span className="group-hover:translate-x-1 transition duration-300">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-r from-gray-900/50 to-black">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              Ready to Find Your Perfect APIs?
            </h2>
            <p className="text-lg text-gray-400">
              Start with our guided questionnaire to get personalized API recommendations for your specific use case.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/stacks/questionnaire"
              className="inline-flex items-center justify-center px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-full hover:shadow-2xl hover:shadow-cyan-500/50 transition transform hover:scale-105"
            >
              Get Started
            </Link>
            <Link
              href="/compare"
              className="inline-flex items-center justify-center px-10 py-4 bg-gray-800 text-white font-bold rounded-full hover:bg-gray-700 transition"
            >
              Browse All APIs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
