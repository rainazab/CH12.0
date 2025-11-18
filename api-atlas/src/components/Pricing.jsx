export default function Pricing() {
  const plans = [
    {
      name: 'Starter',
      price: 'Free',
      description: 'Perfect for exploring and learning',
      features: [
        'Search & discover APIs',
        'Compare up to 2 APIs',
        'Basic analytics',
        'Community support'
      ]
    },
    {
      name: 'Pro',
      price: '$29/month',
      description: 'For active developers and teams',
      features: [
        'Unlimited API searches',
        'Compare up to 5 APIs',
        'Advanced analytics & insights',
        'Priority email support',
        'Custom recommendations',
        'API integration guides'
      ],
      highlighted: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For large organizations',
      features: [
        'Everything in Pro',
        'Dedicated account manager',
        'Custom integrations',
        '24/7 phone support',
        'API monitoring tools',
        'Team collaboration features'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-black pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">Simple, Transparent Pricing</h1>
          <p className="text-gray-400 text-xl">Choose the perfect plan for your needs</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-lg p-8 ${
                plan.highlighted
                  ? 'bg-cyan-900 border-2 border-cyan-400 transform scale-105'
                  : 'bg-gray-900 border border-gray-700'
              }`}
            >
              <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
              <p className="text-gray-400 text-sm mb-4">{plan.description}</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-cyan-400">{plan.price}</span>
              </div>
              <button
                className={`w-full py-2 px-4 rounded-lg font-semibold mb-8 transition ${
                  plan.highlighted
                    ? 'bg-cyan-400 text-black hover:bg-cyan-300'
                    : 'bg-gray-700 text-white hover:bg-gray-600'
                }`}
              >
                Get Started
              </button>
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="text-gray-300 flex items-start">
                    <span className="text-cyan-400 mr-3">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

