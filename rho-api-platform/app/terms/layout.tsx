import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Rho',
  description: 'Read Rho\'s terms and conditions.',
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

