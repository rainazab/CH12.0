'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { Check, ChevronDown } from 'lucide-react';
import Head from 'next/head';

export default function PricingPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleCheckout = async (priceId: string, planName?: string) => {
    // For Enterprise plan, open email
    if (planName === 'Enterprise') {
      window.location.href = 'mailto:support@rhoapi.com?subject=Enterprise%20Plan%20Inquiry&body=Hi%20Rho%20Team,%0A%0AI%20am%20interested%20in%20learning%20more%20about%20your%20Enterprise%20plan.%0A%0APlease%20contact%20me%20with%20more%20details.%0A%0AThank%20you!';
      return;
    }

    // For Free plan, just redirect to signin
    if (!priceId) {
      window.location.href = '/auth/signin';
      return;
    }

    if (!user) {
      window.location.href = '/auth/signin';
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.uid,
          priceId,
          email: user.email,
        }),
      });

      const { url } = await response.json();
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error('Checkout failed:', error);
      alert('Failed to start checkout');
    } finally {
      setLoading(false);
    }
  };

  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: '/month',
      description: 'Perfect for trying Rho',
      features: [
        '1 comparison per day',
        'Up to 2 APIs per comparison',
        'Basic output view',
        'Community support',
      ],
      stackFeatures: [
        'false_Save stacks',
        'false_Share stacks',
        'false_View community stacks',
        'false_Edit saved stacks',
      ],
      cta: 'Get Started',
      highlighted: false,
      priceId: '',
    },
    {
      name: 'Pro',
      price: '$10',
      period: '/month',
      description: 'For regular users',
      features: [
        'Unlimited comparisons',
        'Up to 3 APIs per comparison',
        'Advanced output formatting',
        'Priority support',
        'API history & saved comparisons',
        'Custom workspaces',
      ],
      stackFeatures: [
        'true_Save unlimited stacks',
        'true_Share stacks with unique links',
        'true_View & explore community stacks',
        'true_Edit & update saved stacks',
      ],
      cta: 'Subscribe',
      highlighted: true,
      priceId: 'price_pro_monthly',
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'For large teams',
      features: [
        'Everything in Pro',
        'Dedicated support',
        'Custom integrations',
        'Team collaboration',
        'Advanced analytics',
        'SLA guarantee',
      ],
      stackFeatures: [
        'true_Unlimited stacks with team storage',
        'true_Advanced sharing & collaboration',
        'true_Private community stacks',
        'true_Full stack management suite',
      ],
      cta: 'Contact Sales',
      highlighted: false,
      priceId: '',
    },
  ];

  const faqs = [
    {
      q: 'Can I switch plans anytime?',
      a: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect at your next billing cycle.',
    },
    {
      q: 'What payment methods do you accept?',
      a: 'We accept all major credit cards through Stripe. All payments are secure and encrypted.',
    },
    {
      q: 'Is there a free trial?',
      a: 'Yes! The Free plan includes 1 comparison per day so you can try Rho risk-free.',
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <span className="text-sm font-semibold text-cyan-400 uppercase tracking-wider">Pricing</span>
          <h1 className="text-6xl lg:text-7xl font-bold leading-tight">
            Simple, <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Transparent</span> Pricing
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Choose the perfect plan for your needs. No hidden fees, cancel anytime.
          </p>
          
          {/* Info Banner */}
          <div className="mt-8 p-4 border border-blue-500/30 rounded-lg bg-blue-500/5 backdrop-blur flex items-center gap-3">
            <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
              <Image src="/icon/bolt.png" alt="bolt" width={20} height={16} style={{ objectFit: 'contain' }} />
            </div>
            <p className="text-sm text-blue-200">
              <span className="font-semibold">Pro & Enterprise plans unlock</span> stack saving, sharing, editing, and community access.
            </p>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border backdrop-blur transition duration-300 transform hover:scale-105 ${
                plan.highlighted
                  ? 'border-cyan-400/60 bg-gradient-to-br from-cyan-600/10 to-blue-600/10 ring-2 ring-cyan-400/20 shadow-2xl shadow-cyan-500/20'
                  : 'border-gray-800/50 bg-gray-900/30 hover:border-gray-700/50'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                    MOST POPULAR
                  </span>
                </div>
              )}

              <div className="p-8 h-full flex flex-col">
                {/* Plan Header */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-sm text-gray-400 mb-6">{plan.description}</p>

                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-white">{plan.price}</span>
                    {plan.period && <span className="text-gray-400">{plan.period}</span>}
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => handleCheckout(plan.priceId, plan.name)}
                  disabled={loading || (plan.name === 'Pro' && !plan.priceId)}
                  className={`w-full py-3 px-6 rounded-lg font-semibold mb-8 transition duration-300 ${
                    plan.highlighted
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-lg hover:shadow-cyan-500/50 disabled:opacity-50'
                      : 'bg-gray-800 text-white hover:bg-gray-700 disabled:opacity-50'
                  }`}
                >
                  {plan.name === 'Free' ? (
                    'Get Started'
                  ) : plan.name === 'Enterprise' ? (
                    'Contact Sales'
                  ) : loading ? (
                    'Processing...'
                  ) : (
                    'Subscribe'
                  )}
                </button>

                {/* Features List */}
                <div className="space-y-4 flex-grow">
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Comparison Features</p>
                    {plan.features.map((feature, featureIdx) => (
                      <div key={featureIdx} className="flex items-start gap-3 mb-2">
                        <Check className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-700/30 pt-4">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Stack Features</p>
                    {plan.stackFeatures?.map((feature, featureIdx) => {
                      const isAvailable = feature.startsWith('true_');
                      const featureName = feature.substring(6);
                      return (
                        <div key={featureIdx} className="flex items-start gap-3 mb-2">
                          {isAvailable ? (
                            <Image src="/icon/checkmark-seal.png" alt="check" width={18} height={18} className="w-4.5 h-4.5 flex-shrink-0 mt-0.5" />
                          ) : (
                            <Image src="/icon/x.png" alt="close" width={18} height={18} className="w-4.5 h-4.5 flex-shrink-0 mt-0.5" />
                          )}
                          <span className={`text-sm ${isAvailable ? 'text-green-300' : 'text-gray-400'}`}>
                            {featureName}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-400">Find answers to common questions about our plans</p>
          </div>

          <div className="space-y-4">
            {faqs.map((item, idx) => (
              <div
                key={idx}
                className="border border-gray-800/50 rounded-xl overflow-hidden backdrop-blur hover:border-gray-700/50 transition"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  className="w-full p-6 flex items-center justify-between hover:bg-gray-900/30 transition duration-300"
                >
                  <h3 className="font-semibold text-white text-lg text-left">{item.q}</h3>
                  <ChevronDown
                    className={`w-5 h-5 text-cyan-400 flex-shrink-0 transition duration-300 ${
                      expandedFaq === idx ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {expandedFaq === idx && (
                  <div className="border-t border-gray-800/50 px-6 py-4 bg-gray-900/20">
                    <p className="text-gray-400 leading-relaxed">{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
