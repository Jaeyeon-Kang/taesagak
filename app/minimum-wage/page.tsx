import type { Metadata } from 'next';
import MinimumWagePageClient from '@/app/minimum-wage/MinimumWagePageClient';
import { buildMetadata } from '@/lib/seo';
import JsonLd, { calculatorJsonLd, faqJsonLd } from '@/components/JsonLd';

const faqs = [
  { question: '2026년 최저시급은 얼마인가요?', answer: '2026년 최저임금은 시급 10,320원입니다. 주 40시간, 월 209시간 기준으로 환산하면 월급 약 2,156,880원입니다.' },
  { question: '최저임금에 주휴수당이 포함되나요?', answer: '월급제인 경우 주휴수당이 월급에 포함되어 있는 경우가 많습니다. 최저임금 충족 여부를 판단할 때는 주휴수당을 제외한 기본 시급으로 비교해야 정확합니다.' },
  { question: '최저임금보다 적게 받으면 어떻게 신고하나요?', answer: '최저임금 미달은 사업주 처벌 대상(3년 이하 징역 또는 2천만원 이하 벌금)입니다. 고용노동부(국번 없이 1350)에 신고하면 차액을 청구할 수 있습니다.' },
  { question: '수습 기간에도 최저임금을 받아야 하나요?', answer: '1년 이상 근로계약을 체결한 경우 수습 3개월 동안은 최저임금의 90%까지 감액할 수 있습니다. 단, 단순노무직은 감액이 불가능하며, 1년 미만 계약이면 감액 자체가 적용되지 않습니다.' },
];

export const metadata: Metadata = buildMetadata({
  title: '최저임금 계산기 2026',
  description:
    '최저임금 계산기로 시급 또는 월급을 넣으면 2026년 최저임금 10,320원 충족 여부를 바로 점검할 수 있습니다. 주휴수당과 급여명세서 확인 가이드도 함께 이어집니다.',
  path: '/minimum-wage',
  keywords: [
    '최저임금 계산기 2026',
    '2026년 최저시급',
    '최저임금 월급 환산',
    '최저임금 미달 신고',
    '최저시급 10320원',
    '알바 최저임금 확인',
    '최저임금 주휴수당 포함',
  ],
});

export default function MinimumWagePage() {
  return (
    <>
      <JsonLd data={calculatorJsonLd({ name: '최저임금 계산기', description: '2026년 최저임금 10,320원 기준으로 환산 시급과 월 부족분을 점검합니다.', path: '/minimum-wage' })} />
      <JsonLd data={faqJsonLd(faqs)} />
      <MinimumWagePageClient />
    </>
  );
}
