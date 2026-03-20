const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://taesagak.com';

interface JsonLdProps {
  data: Record<string, unknown>;
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: '퇴사각',
  url: siteUrl,
  description:
    '퇴직금 계산기, 실수령액 계산기, 주휴수당 계산기, 최저임금 계산기를 한 곳에서 제공하는 근로자용 돈찾기 도구입니다.',
  inLanguage: 'ko',
};

export function calculatorJsonLd(opts: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: opts.name,
    description: opts.description,
    url: `${siteUrl}${opts.path}`,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'KRW',
    },
    inLanguage: 'ko',
  };
}
