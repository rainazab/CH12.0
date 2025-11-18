import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Compare APIs | Rho',
  description: 'Compare API outputs, costs, and performance side-by-side. Find your perfect API in seconds.',
};

export default function CompareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

