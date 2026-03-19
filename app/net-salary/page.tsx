import type { Metadata } from 'next';
import NetSalaryPageClient from '@/app/net-salary/NetSalaryPageClient';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: '실수령액 계산기 2026',
  description:
    '실수령액 계산기로 세전 월급 또는 연봉을 입력하면 4대보험과 세금 공제 후 세후 월급을 간편하게 확인할 수 있습니다. 급여명세서 가이드도 함께 제공합니다.',
  path: '/net-salary',
  keywords: ['실수령액 계산기', '연봉 계산기', '월급 실수령액', '세후 계산기'],
});

export default function NetSalaryPage() {
  return <NetSalaryPageClient />;
}
