import type { Metadata } from 'next';
import SeverancePageClient from '@/app/severance/SeverancePageClient';
import { buildMetadata } from '@/lib/seo';
import JsonLd, { calculatorJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = buildMetadata({
  title: '퇴직금 계산기 2026',
  description:
    '퇴직금 계산기에서 입사일, 퇴사일, 최근 3개월 급여를 입력해 법정 퇴직금을 간편하게 계산하세요. 상여금과 연차수당 반영 가이드도 함께 확인할 수 있습니다.',
  path: '/severance',
  keywords: ['퇴직금 계산기', '퇴직금 계산법', '퇴직금 상여금 반영', '퇴직금 연차수당'],
});

export default function SeverancePage() {
  return (
    <>
      <JsonLd data={calculatorJsonLd({ name: '퇴직금 계산기', description: '입사일, 퇴사일, 최근 3개월 급여를 기준으로 법정 퇴직금을 계산합니다.', path: '/severance' })} />
      <SeverancePageClient />
    </>
  );
}
