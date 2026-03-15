import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: {
    default: '퇴사각 — 그만두기 전에, 네 돈부터 계산해',
    template: '%s — 퇴사각',
  },
  description: '퇴직금, 주휴수당, 실수령액, 최저임금 점검을 한 번에 계산하는 근로자용 계산기 웹앱.',
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
