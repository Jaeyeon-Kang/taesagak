import type { Metadata } from 'next';
import CalculatorPageClient from '@/app/calculator/CalculatorPageClient';
import { buildMetadata } from '@/lib/seo';
import JsonLd, { calculatorJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = buildMetadata({
  title: '퇴직금 계산기 + 실수령액 계산기 + 주휴수당 계산기 통합',
  description:
    '퇴직금 계산기, 실수령액 계산기, 주휴수당 계산기, 최저임금 계산기를 한 화면에서 확인하는 통합 계산기입니다. 결과 아래에서 퇴사 체크리스트와 관련 가이드까지 이어서 볼 수 있습니다.',
  path: '/calculator',
  keywords: [
    '퇴직금 실수령액 한번에 계산',
    '퇴사 계산기',
    '급여 계산기 통합',
    '퇴사 전 돈 계산',
    '내 퇴직금 얼마',
  ],
});

export default function CalculatorPage() {
  return (
    <>
      <JsonLd data={calculatorJsonLd({ name: '통합 계산기', description: '퇴직금, 실수령액, 주휴수당, 최저임금을 한 화면에서 계산합니다.', path: '/calculator' })} />
      <CalculatorPageClient />
    </>
  );
}
