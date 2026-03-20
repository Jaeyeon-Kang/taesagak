import type { Metadata } from 'next';
import MinimumWagePageClient from '@/app/minimum-wage/MinimumWagePageClient';
import { buildMetadata } from '@/lib/seo';
import JsonLd, { calculatorJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = buildMetadata({
  title: '최저임금 계산기 2026',
  description:
    '최저임금 계산기로 시급 또는 월급을 넣으면 2026년 최저임금 10,320원 충족 여부를 바로 점검할 수 있습니다. 주휴수당과 급여명세서 확인 가이드도 함께 이어집니다.',
  path: '/minimum-wage',
  keywords: ['최저임금 계산기', '최저시급 계산', '최저임금 미달', '2026 최저임금'],
});

export default function MinimumWagePage() {
  return (
    <>
      <JsonLd data={calculatorJsonLd({ name: '최저임금 계산기', description: '2026년 최저임금 10,320원 기준으로 환산 시급과 월 부족분을 점검합니다.', path: '/minimum-wage' })} />
      <MinimumWagePageClient />
    </>
  );
}
