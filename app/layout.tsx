import type { Metadata, Viewport } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import AdSenseHead from '@/components/AdSense';
import { BASE_METADATA } from '@/lib/seo';
import JsonLd, { organizationJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = BASE_METADATA;

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#ffffff',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
      </head>
      <body>
        <GoogleAnalytics />
        <AdSenseHead />
        <svg width="0" height="0" aria-hidden="true" style={{ position: 'absolute' }}>
          <filter id="sketchy" filterUnits="userSpaceOnUse">
            <feTurbulence type="turbulence" baseFrequency="0.015" numOctaves="3" seed="2" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="6" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </svg>
        <JsonLd data={organizationJsonLd} />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
