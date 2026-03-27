import type { Metadata } from 'next';
import SeverancePageClient from '@/app/severance/SeverancePageClient';
import { buildMetadata } from '@/lib/seo';
import JsonLd, { calculatorJsonLd, faqJsonLd, breadcrumbJsonLd } from '@/components/JsonLd';

const faqs = [
  { question: '1년 미만 근무하면 퇴직금을 못 받나요?', answer: '네, 퇴직금은 같은 사업장에서 1년 이상 근무해야 받을 수 있습니다. 다만 입사일 기준이므로 수습 기간도 포함됩니다.' },
  { question: '퇴직금에 세금이 붙나요?', answer: '퇴직금에는 퇴직소득세가 부과됩니다. 근속연수에 따라 공제가 크기 때문에 일반 소득세보다 세율이 낮습니다. IRP 계좌로 받으면 퇴직소득세를 이연할 수 있습니다.' },
  { question: '퇴직금 지급기한은 언제인가요?', answer: '퇴사일로부터 14일 이내에 지급해야 합니다. 기한을 넘기면 연 20%의 지연이자가 발생하며, 고용노동부에 신고할 수 있습니다.' },
  { question: '퇴직금에 상여금이 포함되나요?', answer: '정기 상여금은 평균임금 산정 시 포함됩니다. 최근 3개월 급여만 입력하면 금액이 적게 나올 수 있으니, 연간 상여금 총액의 3/12를 함께 반영해야 정확합니다.' },
];

export const metadata: Metadata = buildMetadata({
  title: '퇴직금 계산기 2026',
  description:
    '퇴직금 계산기에서 입사일, 퇴사일, 최근 3개월 급여를 입력해 법정 퇴직금을 간편하게 계산하세요. 상여금과 연차수당 반영 가이드도 함께 확인할 수 있습니다.',
  path: '/severance',
  keywords: [
    '퇴직금 계산기 2026',
    '퇴직금 상여금 포함 계산',
    '퇴직금 연차수당 반영',
    '1년 미만 퇴직금',
    '퇴직금 계산 방법',
    '퇴직금 지급기한',
    '퇴직금 세금',
  ],
});

export default function SeverancePage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: '홈', path: '/' }, { name: '퇴직금 계산기', path: '/severance' }])} />
      <JsonLd data={calculatorJsonLd({ name: '퇴직금 계산기', description: '입사일, 퇴사일, 최근 3개월 급여를 기준으로 법정 퇴직금을 계산합니다.', path: '/severance' })} />
      <JsonLd data={faqJsonLd(faqs)} />
      <SeverancePageClient />

      <div className="page-shell">
        <section className="section" style={{ maxWidth: '640px', margin: '0 auto' }}>
          <div className="section__header">
            <h2>퇴직금 계산 방법</h2>
          </div>
          <div className="value-grid">
            <article className="value-card">
              <h3>계산 공식</h3>
              <p>퇴직금 = 1일 평균임금 × 30일 × (재직일수 ÷ 365일). 평균임금은 퇴사 전 3개월간 받은 임금 총액을 해당 기간 일수로 나눠 계산합니다.</p>
            </article>
            <article className="value-card">
              <h3>상여금·연차수당도 반영해야 합니다</h3>
              <p>최근 3개월 급여만 입력하면 상여금과 연차수당이 빠져 퇴직금이 적게 계산됩니다. 연간 상여금 총액의 3/12, 연간 연차수당 총액의 3/12를 추가로 입력해야 정확합니다.</p>
            </article>
            <article className="value-card">
              <h3>지급기한과 미지급 대응</h3>
              <p>퇴사일로부터 14일 이내에 지급해야 합니다. 기한을 넘기면 연 20% 지연이자가 발생하며, 고용노동부(국번 없이 1350) 또는 가까운 노동청에 신고할 수 있습니다.</p>
            </article>
          </div>
        </section>

        <section className="section" style={{ maxWidth: '640px', margin: '0 auto' }}>
          <div className="section__header">
            <h2>자주 묻는 질문</h2>
          </div>
          <div className="value-grid">
            {faqs.map((faq) => (
              <article key={faq.question} className="value-card">
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
