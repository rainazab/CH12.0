'use client';

import { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function PricingPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleCheckout = async (priceId: string) => {
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
      description: 'Perfect for getting started',
      features: [
        '5 comparisons per day',
        'Up to 2 APIs per comparison',
        'Basic output view',
        'Community support',
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
      cta: 'Contact Sales',
      highlighted: false,
      priceId: '',
    },
  ];

  return (
    <div className="min-h-screen bg-black py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-400">Choose the perfect plan for your needs</p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-lg border-2 p-8 transition ${
                plan.highlighted
                  ? 'border-cyan-400 bg-cyan-400/10 transform scale-105'
                  : 'border-gray-700 bg-gray-900/50 hover:border-gray-600'
              }`}
            >
              <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
              <p className="text-gray-400 text-sm mb-4">{plan.description}</p>

              <div className="mb-6">
                <span className="text-4xl font-bold text-white">{plan.price}</span>
                <span className="text-gray-400">{plan.period}</span>
              </div>

              <button
                onClick={() => handleCheckout(plan.priceId)}
                disabled={loading || !plan.priceId}
                className={`w-full py-3 px-4 rounded-lg font-semibold mb-8 transition ${
                  plan.highlighted
                    ? 'bg-cyan-400 text-black hover:bg-cyan-300 disabled:opacity-50'
                    : 'bg-gray-700 text-white hover:bg-gray-600 disabled:opacity-50'
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

              <ul className="space-y-3">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="text-gray-300 flex items-start">
                    <span className="text-cyan-400 mr-3">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>

          <div className="space-y-6">
            {[
              {
                q: 'Can I switch plans anytime?',
                a: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect at your next billing cycle.',
              },
              {
                q: 'Do you offer refunds?',
                a: 'We offer a 7-day money-back guarantee if you\'re not satisfied with your subscription.',
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept all major credit cards through Stripe. All payments are secure and encrypted.',
              },
              {
                q: 'Is there a free trial?',
                a: 'Yes! The Free plan includes 5 comparisons per day so you can try Rho risk-free.',
              },
            ].map((item, idx) => (
              <div key={idx} className="border border-gray-700 rounded-lg p-6 bg-gray-900/50">
                <h3 className="font-bold text-white mb-2">{item.q}</h3>
                <p className="text-gray-400">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

