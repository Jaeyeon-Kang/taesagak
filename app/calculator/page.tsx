import type { Metadata } from 'next';
import CalculatorPageClient from '@/app/calculator/CalculatorPageClient';
import { buildMetadata } from '@/lib/seo';
import JsonLd, { calculatorJsonLd, faqJsonLd, breadcrumbJsonLd } from '@/components/JsonLd';

const faqs = [
  { question: '통합 계산기에서 뭘 계산할 수 있나요?', answer: '퇴직금, 실수령액, 주휴수당, 최저임금 4가지를 한 번에 입력하고 결과를 비교할 수 있습니다. 각 항목의 계산 근거와 공식 출처도 함께 제공됩니다.' },
  { question: '입력을 다 안 채워도 계산되나요?', answer: '네, 빈 칸은 기본값으로 계산됩니다. 예를 들어 입사일·퇴사일을 비우면 퇴직금 계산만 건너뛰고 나머지 항목은 정상 계산됩니다.' },
  { question: '시급제와 월급제 결과가 다른가요?', answer: '시급제는 시급과 주당 근로시간으로 월급을 환산해 계산하고, 월급제·연봉제는 입력한 금액을 그대로 사용합니다. 주휴수당은 시급 기준으로만 계산됩니다.' },
  { question: '계산 결과를 저장할 수 있나요?', answer: '입력값은 브라우저에 자동 저장되며, 결과 저장 버튼으로 최대 5건까지 히스토리를 남길 수 있습니다. JSON 파일로 내보내거나 요약을 클립보드에 복사할 수도 있습니다.' },
];

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
      <JsonLd data={breadcrumbJsonLd([{ name: '홈', path: '/' }, { name: '통합 계산기', path: '/calculator' }])} />
      <JsonLd data={calculatorJsonLd({ name: '통합 계산기', description: '퇴직금, 실수령액, 주휴수당, 최저임금을 한 화면에서 계산합니다.', path: '/calculator' })} />
      <JsonLd data={faqJsonLd(faqs)} />
      <CalculatorPageClient />
    </>
  );
}
