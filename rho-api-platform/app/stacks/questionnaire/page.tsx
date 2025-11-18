'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, ArrowLeft } from 'lucide-react';

interface QuestionnaireStep {
  id: string;
  question: string;
  description: string;
  options: {
    value: string;
    label: string;
    icon: string;
    recommendedCategories: string[];
  }[];
}

const steps: QuestionnaireStep[] = [
  {
    id: 'use-case',
    question: 'What are you building?',
    description: 'Tell us about your project to get personalized API recommendations.',
    options: [
      {
        value: 'ai-app',
        label: 'AI/ML Application',
        icon: 'grid',
        recommendedCategories: ['llm', 'image-gen', 'voice', 'embeddings'],
      },
      {
        value: 'ecommerce',
        label: 'E-Commerce Platform',
        icon: 'building',
        recommendedCategories: ['payments', 'inventory', 'email', 'analytics'],
      },
      {
        value: 'saas',
        label: 'SaaS Product',
        icon: 'cloud',
        recommendedCategories: ['auth', 'database', 'analytics', 'email'],
      },
      {
        value: 'voice-app',
        label: 'Voice/Audio App',
        icon: 'mic',
        recommendedCategories: ['voice-tts', 'voice-stt', 'audio-processing'],
      },
      {
        value: 'image-app',
        label: 'Image Generation/Processing',
        icon: 'paint',
        recommendedCategories: ['image-gen', 'image-processing', 'storage'],
      },
      {
        value: 'content-app',
        label: 'Content/Publishing Platform',
        icon: 'doc',
        recommendedCategories: ['llm', 'email', 'storage', 'analytics'],
      },
      {
        value: 'data-app',
        label: 'Data Analytics Platform',
        icon: 'chart',
        recommendedCategories: ['database', 'analytics', 'data-processing', 'visualization'],
      },
      {
        value: 'other',
        label: 'Something Else',
        icon: 'star',
        recommendedCategories: [],
      },
    ],
  },
  {
    id: 'budget',
    question: 'What\'s your monthly API budget?',
    description: 'This helps us recommend cost-effective solutions.',
    options: [
      {
        value: 'startup',
        label: 'Just Starting ($0-100)',
        icon: 'cloud',
        recommendedCategories: [],
      },
      {
        value: 'growth',
        label: 'Growing ($100-1,000)',
        icon: 'upwardtrendgraph',
        recommendedCategories: [],
      },
      {
        value: 'scale',
        label: 'Scaling ($1,000-10,000)',
        icon: 'paperplane',
        recommendedCategories: [],
      },
      {
        value: 'enterprise',
        label: 'Enterprise ($10,000+)',
        icon: 'building',
        recommendedCategories: [],
      },
    ],
  },
  {
    id: 'priority',
    question: 'What matters most?',
    description: 'Choose your top priority for API selection.',
    options: [
      {
        value: 'cost',
        label: 'Cost Efficiency',
        icon: 'dollarsign',
        recommendedCategories: [],
      },
      {
        value: 'performance',
        label: 'Performance & Speed',
        icon: 'bolt',
        recommendedCategories: [],
      },
      {
        value: 'quality',
        label: 'Quality & Accuracy',
        icon: 'checkmark-seal',
        recommendedCategories: [],
      },
      {
        value: 'reliability',
        label: 'Uptime & Reliability',
        icon: 'warning',
        recommendedCategories: [],
      },
    ],
  },
];

export default function QuestionnairePage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [recommendedCategories, setRecommendedCategories] = useState<string[]>([]);

  const step = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;

  const handleSelectOption = (value: string, categories: string[]) => {
    const newAnswers = { ...answers, [step.id]: value };
    setAnswers(newAnswers);

    // Accumulate recommended categories
    const newCategories = [...recommendedCategories];
    categories.forEach(cat => {
      if (!newCategories.includes(cat)) {
        newCategories.push(cat);
      }
    });
    setRecommendedCategories(newCategories);

    // Move to next step or finish
    if (isLastStep) {
      // Redirect to stack builder with recommendations
      const params = new URLSearchParams({
        categories: newCategories.join(','),
        useCase: newAnswers['use-case'] || '',
        budget: newAnswers['budget'] || '',
        priority: newAnswers['priority'] || '',
      });
      window.location.href = `/stacks/builder?${params.toString()}`;
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const selectedValue = answers[step.id];

  return (
    <div className="min-h-screen bg-black py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Link href="/compare" className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Compare
          </Link>

          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-4">
            Find Your Perfect{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              API Stack
            </span>
          </h1>
          <p className="text-xl text-gray-400">
            Answer a few questions to get personalized recommendations
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex gap-2 mb-4">
            {steps.map((_, idx) => (
              <div
                key={idx}
                className={`h-2 flex-1 rounded-full transition duration-300 ${
                  idx <= currentStep
                    ? 'bg-gradient-to-r from-cyan-400 to-blue-500'
                    : 'bg-gray-800'
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-gray-500">
            Question {currentStep + 1} of {steps.length}
          </p>
        </div>

        {/* Question */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-2">{step.question}</h2>
          <p className="text-gray-400">{step.description}</p>
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {step.options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSelectOption(option.value, option.recommendedCategories)}
              className={`p-6 rounded-xl border-2 transition duration-300 transform hover:scale-105 text-left group ${
                selectedValue === option.value
                  ? 'bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border-cyan-400/60'
                  : 'bg-gray-900/50 border-gray-800 hover:border-gray-700'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <Image src={`/icon/${option.icon}.png`} alt={option.label} width={32} height={32} className="w-8 h-8" />
                {selectedValue === option.value && (
                  <div className="w-5 h-5 rounded-full bg-cyan-400 flex items-center justify-center">
                    <span className="text-xs text-black font-bold">✓</span>
                  </div>
                )}
              </div>
              <h3 className="font-semibold text-white group-hover:text-cyan-300 transition">
                {option.label}
              </h3>
            </button>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex gap-4">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className="px-6 py-3 border border-gray-700 text-gray-300 rounded-lg hover:border-gray-600 hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Back
          </button>

          <button
            onClick={() =>
              handleSelectOption(selectedValue, step.options.find(o => o.value === selectedValue)?.recommendedCategories || [])
            }
            disabled={!selectedValue}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
          >
            {isLastStep ? (
              <>
                Get Recommendations
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition" />
              </>
            ) : (
              <>
                Next
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

