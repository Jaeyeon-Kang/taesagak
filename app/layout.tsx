import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: {
    default: '퇴사각 — 퇴사 전에 챙길 건, 멘탈이 아니라 돈입니다',
    template: '%s — 퇴사각',
  },
  description: '퇴직금, 주휴수당, 실수령액, 최저임금. 복잡한 계산은 기계한테 맡기고, 받아내야 할 돈만 한눈에 파악하세요.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="manifest" href="/manifest.webmanifest" />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
