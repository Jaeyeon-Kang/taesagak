import type { Metadata } from 'next';
import WeeklyHolidayPageClient from '@/app/weekly-holiday/WeeklyHolidayPageClient';
import { buildMetadata } from '@/lib/seo';
import JsonLd, { calculatorJsonLd, faqJsonLd, breadcrumbJsonLd } from '@/components/JsonLd';

const faqs = [
  { question: '편의점 알바도 주휴수당을 받을 수 있나요?', answer: '네. 편의점, 카페, 음식점 등 업종에 관계없이 주 15시간 이상 근무하고 개근하면 주휴수당을 받을 수 있습니다.' },
  { question: '주 15시간 미만이면 주휴수당을 못 받나요?', answer: '맞습니다. 주 소정근로시간이 15시간 미만이면 주휴수당 대상이 아닙니다. 다만 계약서와 실제 근무시간이 다를 수 있으니 실제 출근 기록을 기준으로 확인하세요.' },
  { question: '월급에 주휴수당이 이미 포함되어 있을 수도 있나요?', answer: '월급제 근로자는 기본급에 주휴수당이 포함된 경우가 많습니다. 시급으로 역산해서 확인하는 것이 정확합니다.' },
  { question: '주휴수당을 안 주면 어떻게 신고하나요?', answer: '주휴수당 미지급은 임금체불에 해당합니다. 고용노동부(국번 없이 1350)에 전화하거나 가까운 노동청에 진정서를 제출할 수 있습니다.' },
];

export const metadata: Metadata = buildMetadata({
  title: '주휴수당 계산기 2026',
  description:
    '주휴수당 계산기로 시급이나 월급을 넣으면 주휴수당 대상 여부와 월 환산액을 바로 확인할 수 있습니다. 알바 주휴수당 조건과 급여명세서 확인 가이드도 이어서 볼 수 있습니다.',
  path: '/weekly-holiday',
  keywords: [
    '주휴수당 계산기 2026',
    '알바 주휴수당 15시간',
    '주휴수당 조건 정리',
    '주휴수당 안 주면',
    '시급 주휴수당 포함 계산',
    '주휴수당 월급에 포함',
    '편의점 알바 주휴수당',
  ],
});

export default function WeeklyHolidayPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: '홈', path: '/' }, { name: '주휴수당 계산기', path: '/weekly-holiday' }])} />
      <JsonLd data={calculatorJsonLd({ name: '주휴수당 계산기', description: '시급이나 월급을 입력하면 주휴수당 대상 여부와 월 환산액을 바로 계산합니다.', path: '/weekly-holiday' })} />
      <JsonLd data={faqJsonLd(faqs)} />
      <WeeklyHolidayPageClient />

      <div className="page-shell">
        <section className="section" style={{ maxWidth: '640px', margin: '0 auto' }}>
          <div className="section__header">
            <h2>주휴수당 지급 조건과 계산 방법</h2>
          </div>
          <div className="value-grid">
            <article className="value-card">
              <h3>지급 조건 두 가지</h3>
              <p>① 1주 소정근로시간이 15시간 이상이어야 합니다. ② 해당 주의 소정 근로일을 모두 개근해야 합니다. 둘 중 하나라도 충족되지 않으면 주휴수당이 발생하지 않습니다.</p>
            </article>
            <article className="value-card">
              <h3>계산 공식</h3>
              <p>주휴수당 = 1일 소정근로시간 × 시급. 주 5일 하루 8시간 근무하면 하루치 임금이 주휴수당으로 지급됩니다. 월로 환산하면 주휴수당 × 4.345주입니다.</p>
            </article>
            <article className="value-card">
              <h3>미지급 시 처벌과 소멸시효</h3>
              <p>주휴수당 미지급은 임금체불에 해당합니다. 사업주에게 3년 이하 징역 또는 2천만원 이하 벌금이 부과될 수 있습니다. 청구 소멸시효는 3년입니다.</p>
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
