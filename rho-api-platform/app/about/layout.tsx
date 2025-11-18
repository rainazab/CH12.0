import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | Rho',
  description: 'Learn about Rho and the team behind the API comparison platform.',
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

