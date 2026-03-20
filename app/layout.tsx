import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import AdSenseHead from '@/components/AdSense';
import { BASE_METADATA } from '@/lib/seo';

export const metadata: Metadata = BASE_METADATA;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <GoogleAnalytics />
        <AdSenseHead />
        <svg width="0" height="0" aria-hidden="true" style={{ position: 'absolute' }}>
          <filter id="sketchy" filterUnits="userSpaceOnUse">
            <feTurbulence type="turbulence" baseFrequency="0.015" numOctaves="3" seed="2" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="6" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </svg>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
