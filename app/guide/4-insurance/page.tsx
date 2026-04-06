import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import JsonLd, { breadcrumbJsonLd, articleJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = buildMetadata({
  title: '4대보험 총정리 2026',
  description:
    '국민연금, 건강보험, 고용보험, 산재보험의 2026년 요율, 근로자·사업자 부담 비율, 아르바이트 가입 의무, 퇴사 후 처리 방법까지 한 번에 정리했습니다.',
  path: '/guide/4-insurance',
  type: 'article',
  keywords: [
    '4대보험 총정리',
    '4대보험 요율 2026',
    '국민연금 요율',
    '건강보험 요율',
    '고용보험 요율',
    '산재보험 요율',
    '알바 4대보험',
    '4대보험 퇴사 후',
    '비정규직 4대보험',
    '4대보험 계산',
  ],
});

export default function Guide4InsurancePage() {
  return (
    <>
    <JsonLd data={breadcrumbJsonLd([{ name: '홈', path: '/' }, { name: '4대보험 총정리', path: '/guide/4-insurance' }])} />
    <JsonLd data={articleJsonLd({ title: '4대보험 총정리 2026', description: '국민연금, 건강보험, 고용보험, 산재보험의 2026년 요율, 근로자·사업자 부담 비율, 아르바이트 가입 의무, 퇴사 후 처리 방법까지 한 번에 정리했습니다.', path: '/guide/4-insurance', datePublished: '2026-04-06', dateModified: '2026-04-06' })} />
    <main id="main-content" className="page-shell">
      <section className="section">
        <div className="section__header">
          <span className="eyebrow">guide · 2026</span>
          <h1 className="page-title">4대보험 총정리</h1>
          <p className="page-lead">
            급여명세서에서 매달 빠져나가는 4대보험료, 정확히 얼마나 내고 있는지 알고 계신가요?
            2026년 기준 요율과 부담 비율, 가입 조건, 퇴사 후 처리 방법까지 한 번에 정리합니다.
          </p>
        </div>

        <div className="panel">
          <div className="panel__head"><div><h2>핵심 요약</h2></div></div>
          <ul className="plain-list">
            <li><strong>4대보험:</strong> 국민연금 + 건강보험 + 고용보험 + 산재보험</li>
            <li><strong>근로자 부담:</strong> 국민연금 4.5% + 건강보험 3.545% + 장기요양 0.4655% + 고용보험 0.9% = 약 9.41%</li>
            <li><strong>사업주 부담:</strong> 위 항목 + 산재보험(업종별 상이) 추가 부담</li>
            <li><strong>가입 의무:</strong> 1개월 이상 근무 + 월 60시간(주 15시간) 이상이면 의무 가입</li>
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>4대보험이란?</h2>
        </div>
        <div className="panel">
          <p>
            4대보험은 국가가 운영하는 사회보험 제도로, 근로자의 노후·질병·실업·산업재해 위험에 대비하기 위해 만들어졌습니다.
            근로자와 사업주가 일정 비율로 보험료를 나누어 부담하며, 법적으로 가입이 의무화되어 있습니다.
            사업주가 4대보험에 가입하지 않으면 과태료가 부과됩니다.
          </p>
          <p>
            급여명세서에서 공제 항목으로 표시되는 국민연금, 건강보험, 고용보험이 근로자가 부담하는 부분이며,
            산재보험은 전액 사업주 부담이므로 급여에서 공제되지 않습니다.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>2026년 4대보험 요율</h2>
        </div>
        <div className="value-grid">
          <article className="value-card">
            <h3>국민연금</h3>
            <p>
              <strong>총 요율: 9%</strong> (근로자 4.5% + 사업주 4.5%)
            </p>
            <p>
              기준소득월액의 9%를 근로자와 사업주가 반반 부담합니다.
              2026년 기준소득월액 상한은 월 617만 원, 하한은 월 39만 원입니다.
              월급이 617만 원을 초과해도 보험료는 617만 원 기준으로 산정됩니다.
            </p>
            <p>
              월급 300만 원 기준: 300만 원 x 4.5% = 135,000원이 급여에서 공제됩니다.
            </p>
          </article>
          <article className="value-card">
            <h3>건강보험</h3>
            <p>
              <strong>총 요율: 7.09%</strong> (근로자 3.545% + 사업주 3.545%)
            </p>
            <p>
              보수월액 기준으로 산정됩니다. 여기에 장기요양보험료가 추가로 부과됩니다.
              장기요양보험료는 건강보험료의 12.81%입니다.
            </p>
            <p>
              월급 300만 원 기준: 건강보험 106,350원 + 장기요양 13,623원 = 약 119,973원이 공제됩니다.
            </p>
          </article>
          <article className="value-card">
            <h3>고용보험</h3>
            <p>
              <strong>근로자 부담: 0.9%</strong>
            </p>
            <p>
              사업주는 0.9%에 더해 고용안정·직업능력개발 부담금(기업 규모별 0.25~0.85%)을 추가 납부합니다.
              실업급여를 받기 위한 필수 보험입니다.
              고용보험 가입 기간 180일 이상이어야 실업급여 수급이 가능합니다.
            </p>
            <p>
              월급 300만 원 기준: 300만 원 x 0.9% = 27,000원이 공제됩니다.
            </p>
          </article>
          <article className="value-card">
            <h3>산재보험</h3>
            <p>
              <strong>전액 사업주 부담</strong> (업종별 0.7%~18.6%)
            </p>
            <p>
              근로자 급여에서 공제되지 않습니다.
              업무상 재해(출퇴근 재해 포함) 시 치료비, 휴업급여, 장해급여 등을 보장합니다.
              사무직의 경우 보통 0.7% 수준이며, 건설업은 3.7% 이상입니다.
            </p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>실제 급여 공제 예시 (월급 300만 원 기준)</h2>
        </div>
        <div className="panel">
          <ul className="plain-list">
            <li><strong>국민연금:</strong> 3,000,000 x 4.5% = 135,000원</li>
            <li><strong>건강보험:</strong> 3,000,000 x 3.545% = 106,350원</li>
            <li><strong>장기요양보험:</strong> 106,350 x 12.81% = 13,623원</li>
            <li><strong>고용보험:</strong> 3,000,000 x 0.9% = 27,000원</li>
            <li><strong>합계:</strong> 약 281,973원 (월급의 약 9.4%)</li>
          </ul>
          <p style={{ marginTop: '0.5rem', color: 'var(--text-2, #64748b)' }}>
            여기에 근로소득세와 지방소득세까지 추가로 공제되면 실수령액은 더 줄어듭니다.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>아르바이트·비정규직도 가입해야 하나요?</h2>
        </div>
        <div className="panel">
          <div className="panel__head"><div><h3>가입 의무 기준</h3></div></div>
          <ul className="plain-list">
            <li><strong>국민연금:</strong> 월 60시간(주 15시간) 이상 + 1개월 이상 근무 시 의무 가입. 18세 미만·60세 이상은 제외.</li>
            <li><strong>건강보험:</strong> 월 60시간 이상 + 1개월 이상 근무 시 의무 가입.</li>
            <li><strong>고용보험:</strong> 월 60시간 이상 + 1개월 이상 근무 시 의무 가입. 65세 이후 신규 입사자는 실업급여 적용 제외(나머지 적용).</li>
            <li><strong>산재보험:</strong> 근로시간·기간 무관, 모든 근로자에게 적용. 1시간 아르바이트도 대상.</li>
          </ul>
          <hr className="divider" />
          <p>
            <strong>주 15시간 미만(월 60시간 미만)</strong> 초단시간 근로자는 국민연금·건강보험·고용보험 가입 대상에서 제외됩니다.
            단, 3개월 이상 근무하면 고용보험은 가입해야 합니다.
            산재보험은 어떤 경우든 적용됩니다.
          </p>
        </div>

        <div className="panel" style={{ marginTop: '1rem' }}>
          <div className="panel__head"><div><h3>사업주가 4대보험 가입을 안 해주면?</h3></div></div>
          <p>
            사업주가 의무 가입 대상임에도 4대보험에 가입하지 않으면 과태료가 부과됩니다.
            근로자는 국민건강보험공단(1577-1000) 또는 국민연금공단(1355)에 직접 신고할 수 있습니다.
            고용보험은 고용노동부(1350)에 신고합니다.
          </p>
          <p>
            신고 시 근로계약서, 급여이체 내역, 출퇴근 기록 등 근로관계를 증명할 수 있는 자료를 준비하면 처리가 빨라집니다.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>퇴사 후 4대보험 처리 방법</h2>
        </div>
        <div className="value-grid">
          <article className="value-card">
            <h3>국민연금</h3>
            <p>
              퇴사하면 자동으로 직장가입자에서 탈퇴됩니다.
              소득이 없으면 납부예외 신청이 가능합니다(국민연금공단 1355).
              납부예외 기간은 가입 기간에 포함되지 않으므로 추후 추납할 수 있습니다.
              재취업하면 새 직장에서 다시 직장가입자로 전환됩니다.
            </p>
          </article>
          <article className="value-card">
            <h3>건강보험</h3>
            <p>
              퇴사 후 14일 이내에 지역가입자로 자동 전환됩니다.
              지역가입자 보험료는 소득·재산·자동차 기준으로 산정되어 직장가입자보다 높을 수 있습니다.
              대안으로 임의계속가입(퇴직 전 보험료 유지, 최대 36개월) 또는
              가족의 피부양자로 등록(소득·재산 요건 충족 시)할 수 있습니다.
            </p>
          </article>
          <article className="value-card">
            <h3>고용보험</h3>
            <p>
              퇴사 후 비자발적 이직이었다면 실업급여를 신청할 수 있습니다.
              고용보험 가입 기간 180일 이상이 필수입니다.
              퇴사 다음 날부터 12개월 이내에 관할 고용센터에 신청해야 합니다.
              사업주에게 이직확인서 발급을 요청하세요.
            </p>
          </article>
          <article className="value-card">
            <h3>산재보험</h3>
            <p>
              근로관계가 종료되면 자동으로 적용이 해제됩니다.
              단, 퇴사 전 발생한 업무상 재해에 대해서는 퇴사 후에도 산재 신청이 가능합니다.
              산재 청구 시효는 재해 발생일로부터 3년입니다.
            </p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>자주 묻는 질문</h2>
        </div>
        <div className="panel">
          <div className="panel__head"><div><h3>Q. 프리랜서(3.3% 원천징수)도 4대보험에 가입하나요?</h3></div></div>
          <p>
            사업소득자로 등록된 프리랜서는 직장가입자가 아니므로 국민연금은 지역가입자로 본인이 전액 부담(9%)하고,
            건강보험도 지역가입자로 가입합니다.
            고용보험과 산재보험은 원칙적으로 적용되지 않습니다.
            단, 실질적으로 근로자처럼 일하는 위장 프리랜서라면 4대보험 가입 대상이 됩니다.
          </p>
        </div>

        <div className="panel" style={{ marginTop: '1rem' }}>
          <div className="panel__head"><div><h3>Q. 두 곳에서 동시에 일하면 보험료는 어떻게 되나요?</h3></div></div>
          <p>
            국민연금과 건강보험은 각 사업장에서 받는 보수를 기준으로 각각 산정됩니다.
            건강보험의 경우 주된 직장을 선택하고, 종된 직장 보수에 대해서는 별도로 보험료가 부과될 수 있습니다.
            고용보험은 주된 직장(근로시간이 더 긴 곳) 1곳에서만 가입합니다.
          </p>
        </div>

        <div className="panel" style={{ marginTop: '1rem' }}>
          <div className="panel__head"><div><h3>Q. 일용직 근로자도 4대보험 대상인가요?</h3></div></div>
          <p>
            일용직도 산재보험은 무조건 적용됩니다.
            고용보험은 월 8일 이상 또는 월 60시간 이상 근무하면 가입 대상입니다(건설업은 1일부터 적용).
            국민연금과 건강보험은 1개월 이상 근무 + 월 60시간(주 15시간) 이상이면 가입 대상입니다.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>관련 계산기 · 가이드</h2>
        </div>
        <div className="feature-grid">
          <Link className="value-card" href="/net-salary" style={{ textDecoration: 'none' }}>
            <h3>실수령액 계산기</h3>
            <p>4대보험·소득세 공제 후 실제 받는 월급을 계산합니다.</p>
          </Link>
          <Link className="value-card" href="/guide/income-tax" style={{ textDecoration: 'none' }}>
            <h3>근로소득세 계산법 가이드</h3>
            <p>소득세 간이세액표, 부양가족 공제, 원천징수 선택을 설명합니다.</p>
          </Link>
          <Link className="value-card" href="/guide/health-insurance-after-resignation" style={{ textDecoration: 'none' }}>
            <h3>퇴직 후 건강보험 처리</h3>
            <p>지역가입자·임의계속가입·피부양자 중 유리한 선택을 비교합니다.</p>
          </Link>
          <Link className="value-card" href="/calculator" style={{ textDecoration: 'none' }}>
            <h3>통합 계산기</h3>
            <p>퇴직금·주휴수당·실수령액·최저임금을 한 번에 계산합니다.</p>
          </Link>
        </div>
      </section>
      <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-3, #94a3b8)', margin: '2rem 0 0' }}>
        마지막 업데이트: 2026-04-06 · 2026년 기준 법령 반영
      </p>
    </main>
    </>
  );
}
