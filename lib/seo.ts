import type { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.taesagak.co.kr';

export const SITE_NAME = '퇴사각';
export const SITE_TITLE = '퇴직금 계산기, 실수령액 계산기, 주휴수당 계산기 | 퇴사각';
export const SITE_DESCRIPTION =
  '퇴직금 계산기, 실수령액 계산기, 주휴수당 계산기, 최저임금 계산기를 한 곳에서 제공하는 근로자용 돈찾기 도구입니다. 퇴사 전 체크리스트와 급여명세서 가이드까지 함께 확인할 수 있습니다.';
export const SITE_KEYWORDS = [
  '퇴직금 계산기',
  '실수령액 계산기',
  '주휴수당 계산기',
  '최저임금 계산기',
  '퇴사 전 챙길 것',
  '퇴사 준비 체크리스트',
  '월급 실수령액 확인',
  '급여명세서 보는 법',
  '퇴사각',
];

const ogImage = {
  url: '/og-image.png',
  width: 1200,
  height: 630,
  alt: '퇴사각 — 퇴직금·실수령액·주휴수당·최저임금 계산기',
};

export const BASE_METADATA: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  applicationName: SITE_NAME,
  title: {
    default: SITE_TITLE,
    template: '%s | 퇴사각',
  },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  category: 'finance',
  alternates: siteUrl ? { canonical: '/' } : undefined,
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    locale: 'ko_KR',
    type: 'website',
    images: [ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [ogImage],
  },
  verification: {
    google: '9_r0kRzMrnyqxe9Aft75QHbC5Xx1EKtlbpxLFcYBhK0',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
};

interface BuildMetadataOptions {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
}

export function buildMetadata({
  title,
  description,
  path = '/',
  keywords = [],
}: BuildMetadataOptions): Metadata {
  const mergedKeywords = Array.from(new Set([...SITE_KEYWORDS, ...keywords]));

  return {
    title,
    description,
    keywords: mergedKeywords,
    alternates: siteUrl ? { canonical: path } : undefined,
    openGraph: {
      title,
      description,
      siteName: SITE_NAME,
      locale: 'ko_KR',
      type: 'article',
      images: [ogImage],
      ...(siteUrl ? { url: new URL(path, siteUrl).toString() } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}
