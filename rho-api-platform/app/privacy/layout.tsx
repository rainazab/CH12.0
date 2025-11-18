import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Rho',
  description: 'Read Rho\'s privacy policy.',
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

