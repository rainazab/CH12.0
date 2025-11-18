import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Rho - Compare APIs Visually',
  description: 'Visually compare APIs side-by-side and find your perfect match.',
  icons: {
    icon: '/loading.png',
  },
  openGraph: {
    title: 'Rho - Compare APIs Visually',
    description: 'Find your perfect API stack. Compare outputs, costs, and performance in seconds.',
    url: 'https://rhoapi.com',
    siteName: 'Rho',
    images: [
      {
        url: '/preview.png',
        width: 1200,
        height: 630,
        alt: 'Rho - API Comparison Platform',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rho - Compare APIs Visually',
    description: 'Find your perfect API stack. Compare outputs, costs, and performance in seconds.',
    images: ['/preview.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

