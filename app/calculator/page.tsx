import type { Metadata } from 'next';
import CalculatorPageClient from '@/app/calculator/CalculatorPageClient';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: '퇴직금 계산기 + 실수령액 계산기 + 주휴수당 계산기 통합',
  description:
    '퇴직금 계산기, 실수령액 계산기, 주휴수당 계산기, 최저임금 계산기를 한 화면에서 확인하는 통합 계산기입니다. 결과 아래에서 퇴사 체크리스트와 관련 가이드까지 이어서 볼 수 있습니다.',
  path: '/calculator',
  keywords: ['통합 계산기', '퇴직금 실수령액 계산기', '주휴수당 계산기 통합', '퇴사 계산기'],
});

export default function CalculatorPage() {
  return <CalculatorPageClient />;
}
