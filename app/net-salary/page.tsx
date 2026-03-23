import type { Metadata } from 'next';
import NetSalaryPageClient from '@/app/net-salary/NetSalaryPageClient';
import { buildMetadata } from '@/lib/seo';
import JsonLd, { calculatorJsonLd, faqJsonLd, breadcrumbJsonLd } from '@/components/JsonLd';

const faqs = [
  { question: '연봉 3000만원이면 실수령액은 얼마인가요?', answer: '연봉 3,000만원 기준 월 세전 약 250만원에서 4대보험과 소득세를 공제하면 실수령액은 약 220~225만원 수준입니다. 부양가족 수에 따라 소득세가 달라집니다.' },
  { question: '4대보험이 월급에서 얼마나 빠지나요?', answer: '2026년 기준 근로자 부담분은 국민연금 4.75%, 건강보험 3.595%, 장기요양보험(건보의 13.14%), 고용보험 0.9%입니다. 월급 250만원이면 약 23만원 정도가 공제됩니다.' },
  { question: '연봉 4000만원이면 월 실수령액은요?', answer: '월 세전 약 333만원에서 공제 후 실수령액은 약 290~295만원 수준입니다. 연봉이 올라갈수록 소득세 비중이 커져 공제 금액도 함께 늘어납니다.' },
  { question: '월급 200만원이면 실수령액은 얼마인가요?', answer: '월 200만원 기준으로 4대보험과 소득세를 공제하면 실수령액은 약 180~183만원 수준입니다. 부양가족이 있으면 소득세가 줄어 실수령액이 약간 올라갑니다.' },
];

export const metadata: Metadata = buildMetadata({
  title: '실수령액 계산기 2026',
  description:
    '실수령액 계산기로 세전 월급 또는 연봉을 입력하면 4대보험과 세금 공제 후 세후 월급을 간편하게 확인할 수 있습니다. 급여명세서 가이드도 함께 제공합니다.',
  path: '/net-salary',
  keywords: [
    '실수령액 계산기 2026',
    '연봉 3000 실수령액',
    '연봉 4000 실수령액',
    '월급 200만원 실수령액',
    '세후 월급 계산',
    '4대보험 공제 계산',
    '연봉 실수령액 표',
  ],
});

export default function NetSalaryPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: '홈', path: '/' }, { name: '실수령액 계산기', path: '/net-salary' }])} />
      <JsonLd data={calculatorJsonLd({ name: '실수령액 계산기', description: '세전 월급이나 연봉을 입력하면 4대보험과 세금 공제 후 세후 금액을 확인할 수 있습니다.', path: '/net-salary' })} />
      <JsonLd data={faqJsonLd(faqs)} />
      <NetSalaryPageClient />
    </>
  );
}
