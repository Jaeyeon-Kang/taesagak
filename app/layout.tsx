import type { Metadata, Viewport } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import AdSenseHead from '@/components/AdSense';
import { BASE_METADATA } from '@/lib/seo';
import JsonLd, { organizationJsonLd } from '@/components/JsonLd';
import KakaoInit from '@/components/KakaoInit';
import CookieConsent from '@/components/CookieConsent';

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
        {process.env.NEXT_PUBLIC_KAKAO_JS_KEY && (
          <script
            src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js"
            integrity="sha384-DKYJZ8NLiK8MN4/C5P2vDkVKR+F0bMOjzg2DnIab2gk4FKQX0u5TJgBcrdU6xz"
            crossOrigin="anonymous"
            async
          />
        )}
      </head>
      <body>
        <a href="#main-content" className="skip-link">본문 바로가기</a>
        <GoogleAnalytics />
        <AdSenseHead />
        <JsonLd data={organizationJsonLd} />
        <KakaoInit />
        <Header />
        {children}
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
