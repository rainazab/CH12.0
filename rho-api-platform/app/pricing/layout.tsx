import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing | Rho',
  description: 'Simple, transparent pricing for API comparison. Choose the perfect plan for your needs.',
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

