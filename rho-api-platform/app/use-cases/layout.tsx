import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Use Cases | Rho',
  description: 'Discover how Rho helps developers, startups, and enterprises choose the perfect APIs for their projects.',
};

export default function UseCasesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
