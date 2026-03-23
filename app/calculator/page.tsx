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

      <div className="page-shell">
        <section className="section" style={{ maxWidth: '640px', margin: '0 auto' }}>
          <div className="section__header">
            <h2>이런 분에게 필요합니다</h2>
          </div>
          <div className="value-grid">
            <article className="value-card">
              <h3>퇴사를 앞두고 있는 직장인</h3>
              <p>
                퇴직금은 받을 수 있는지, 실수령액은 얼마인지, 지금 급여가 최저임금 이상인지를
                한 번에 확인하고 싶을 때 유용합니다.
              </p>
            </article>
            <article className="value-card">
              <h3>아르바이트 중인 분</h3>
              <p>
                주휴수당 대상인지, 시급이 최저임금 이상인지, 세금 떼고 실제로 얼마 받는지를
                각각 검색할 필요 없이 한 화면에서 확인할 수 있습니다.
              </p>
            </article>
            <article className="value-card">
              <h3>급여명세서가 이상한 것 같은 분</h3>
              <p>
                세전/세후 차이가 너무 크거나 공제 항목이 이해되지 않을 때,
                항목별 공제 내역과 기준을 비교해볼 수 있습니다.
              </p>
            </article>
          </div>
        </section>

        <section className="section" style={{ maxWidth: '640px', margin: '0 auto' }}>
          <div className="section__header">
            <h2>왜 4가지를 같이 봐야 할까?</h2>
          </div>
          <div className="value-grid">
            <article className="value-card">
              <h3>숫자가 서로 연결되어 있다</h3>
              <p>
                시급이 바뀌면 주휴수당, 실수령액, 최저임금 충족 여부가 동시에 달라집니다.
                하나씩 따로 계산하면 전체 영향을 놓치기 쉽습니다.
              </p>
            </article>
            <article className="value-card">
              <h3>빠뜨린 돈을 한눈에 확인</h3>
              <p>
                퇴직금만 계산하고 주휴수당을 놓치거나, 최저임금은 확인했지만
                실수령액 차이를 모르는 경우가 많습니다. 4가지를 같이 보면 빠뜨리는 항목이 줄어듭니다.
              </p>
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
