import Footer from '@/components/Layout/Footer';
import Header from '@/components/Layout/Header';
import '@/styles/globals.css';
import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { MuiThemeProvider } from './theme-provider';

export const metadata: Metadata = {
  title: 'Real Estate Platform',
  description: 'Find your perfect property with our real estate platform',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

interface RootLayoutProps {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body suppressHydrationWarning>
        <MuiThemeProvider>
          <Header />
          {children}
          <Footer />
        </MuiThemeProvider>
      </body>
    </html>
  );
}
