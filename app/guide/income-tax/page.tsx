import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import JsonLd, { breadcrumbJsonLd, articleJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = buildMetadata({
  title: '근로소득세 계산법 2026',
  description:
    '근로소득세 간이세액표 기준, 부양가족 수에 따른 세금 차이, 연말정산 기본 개념, 원천징수 80%/100%/120% 선택 가이드를 정리했습니다.',
  path: '/guide/income-tax',
  type: 'article',
  keywords: [
    '근로소득세 계산',
    '근로소득세 간이세액표',
    '원천징수 80% 100% 120%',
    '연말정산 기본',
    '부양가족 세금',
    '소득세 계산법',
    '급여 소득세',
    '월급 세금 계산',
    '원천징수 선택',
    '근로소득세율',
  ],
});

export default function GuideIncomeTaxPage() {
  return (
    <>
    <JsonLd data={breadcrumbJsonLd([{ name: '홈', path: '/' }, { name: '근로소득세 계산법', path: '/guide/income-tax' }])} />
    <JsonLd data={articleJsonLd({ title: '근로소득세 계산법 2026', description: '근로소득세 간이세액표 기준, 부양가족 수에 따른 세금 차이, 연말정산 기본 개념, 원천징수 80%/100%/120% 선택 가이드를 정리했습니다.', path: '/guide/income-tax', datePublished: '2026-04-06', dateModified: '2026-04-06' })} />
    <main id="main-content" className="page-shell">
      <section className="section">
        <div className="section__header">
          <span className="eyebrow">guide · 2026</span>
          <h1 className="page-title">근로소득세 계산법</h1>
          <p className="page-lead">
            매달 급여에서 빠져나가는 소득세, 어떻게 정해지는 걸까요?
            간이세액표 기준부터 연말정산 개념, 원천징수 비율 선택까지 실무에 필요한 내용을 정리합니다.
          </p>
        </div>

        <div className="panel">
          <div className="panel__head"><div><h2>핵심 요약</h2></div></div>
          <ul className="plain-list">
            <li><strong>매달 급여에서 공제되는 소득세</strong>는 간이세액표에 따라 결정됩니다.</li>
            <li><strong>부양가족 수</strong>가 많을수록 매달 공제되는 세금이 줄어듭니다.</li>
            <li><strong>원천징수 비율</strong>을 80%/100%/120% 중 선택할 수 있습니다.</li>
            <li>연말정산에서 1년간 납부한 세금과 실제 세금을 비교해 <strong>환급 또는 추가 납부</strong>가 결정됩니다.</li>
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>근로소득세란?</h2>
        </div>
        <div className="panel">
          <p>
            근로소득세는 근로의 대가로 받는 급여(월급, 상여금, 수당 등)에 대해 부과되는 세금입니다.
            사업주(원천징수 의무자)가 급여를 지급할 때 세금을 미리 공제하고 국세청에 납부하는 방식을 원천징수라고 합니다.
          </p>
          <p>
            급여명세서에 표시되는 &ldquo;소득세&rdquo;와 &ldquo;지방소득세&rdquo;가 이에 해당합니다.
            지방소득세는 소득세의 10%입니다. 예를 들어 소득세가 100,000원이면 지방소득세는 10,000원입니다.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>간이세액표 — 매달 세금이 정해지는 기준</h2>
        </div>
        <div className="panel">
          <p>
            국세청은 매년 &ldquo;근로소득 간이세액표&rdquo;를 공표합니다.
            이 표는 월 급여 구간과 부양가족 수에 따라 매달 원천징수할 세액을 정해놓은 것입니다.
            사업주는 이 표를 기준으로 급여에서 소득세를 공제합니다.
          </p>
          <hr className="divider" />
          <div className="panel__head"><div><h3>2026년 간이세액표 예시 (부양가족 본인 1명 기준)</h3></div></div>
          <ul className="plain-list">
            <li><strong>월급 200만 원:</strong> 소득세 약 19,520원 + 지방소득세 1,952원</li>
            <li><strong>월급 250만 원:</strong> 소득세 약 36,720원 + 지방소득세 3,672원</li>
            <li><strong>월급 300만 원:</strong> 소득세 약 60,940원 + 지방소득세 6,094원</li>
            <li><strong>월급 350만 원:</strong> 소득세 약 91,960원 + 지방소득세 9,196원</li>
            <li><strong>월급 400만 원:</strong> 소득세 약 132,360원 + 지방소득세 13,236원</li>
            <li><strong>월급 500만 원:</strong> 소득세 약 240,630원 + 지방소득세 24,063원</li>
          </ul>
          <p style={{ marginTop: '0.5rem', color: 'var(--text-2, #64748b)' }}>
            위 금액은 비과세 수당 제외 후의 과세 대상 급여 기준입니다.
            식대(월 20만 원), 자가운전보조금(월 20만 원) 등은 비과세이므로 제외하고 판단합니다.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>부양가족 수에 따른 세금 차이</h2>
        </div>
        <div className="value-grid">
          <article className="value-card">
            <h3>부양가족이란?</h3>
            <p>
              본인, 배우자, 직계존속(부모·조부모), 직계비속(자녀), 형제자매 중
              연간 소득 100만 원(근로소득만 있으면 총급여 500만 원) 이하인 사람이 부양가족에 해당합니다.
              부양가족 수에는 본인도 포함됩니다.
            </p>
          </article>
          <article className="value-card">
            <h3>부양가족이 많을수록 세금이 줄어든다</h3>
            <p>
              간이세액표는 부양가족 수에 따라 매달 공제하는 세금이 달라집니다.
              예를 들어 월급 300만 원 기준, 부양가족 1명(본인만)이면 소득세 약 60,940원이지만
              부양가족 3명(본인+배우자+자녀 1명)이면 약 25,270원으로 크게 줄어듭니다.
            </p>
          </article>
          <article className="value-card">
            <h3>20세 이하 자녀 추가 공제</h3>
            <p>
              부양가족 중 20세 이하 자녀가 있으면 자녀 수에 따라 세액이 추가로 감소합니다.
              자녀 1명이면 연 15만 원, 2명이면 연 30만 원, 3명 이상이면 연 30만 원 + 1명당 30만 원이 추가 공제됩니다.
            </p>
          </article>
          <article className="value-card">
            <h3>주의: 맞벌이 부부</h3>
            <p>
              맞벌이 부부라면 배우자를 부양가족으로 등록하면 안 됩니다.
              배우자의 연간 소득이 100만 원을 초과하면 부양가족에 해당하지 않습니다.
              잘못 등록하면 연말정산에서 추가 납부가 발생할 수 있습니다.
            </p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>원천징수 80% / 100% / 120% 선택 가이드</h2>
        </div>
        <div className="panel">
          <p>
            근로자는 간이세액표 기준 세액의 80%, 100%, 120% 중 하나를 선택할 수 있습니다.
            회사에 &ldquo;소득세 원천징수세액 조정 신청서&rdquo;를 제출하면 됩니다.
            별도 신청을 하지 않으면 100%가 적용됩니다.
          </p>
          <hr className="divider" />
          <ul className="plain-list">
            <li>
              <strong>80% 선택:</strong> 매달 세금을 적게 내므로 월 실수령액이 늘어납니다.
              하지만 연말정산 때 추가 납부(세금 토해내기)가 발생할 확률이 높습니다.
              공제 항목(의료비, 교육비, 기부금 등)이 많은 사람에게 유리합니다.
            </li>
            <li>
              <strong>100% 선택:</strong> 기본값. 대부분의 근로자에게 무난한 선택입니다.
              연말정산에서 소액 환급 또는 소액 추가 납부가 발생하는 경우가 많습니다.
            </li>
            <li>
              <strong>120% 선택:</strong> 매달 세금을 더 많이 냅니다.
              연말정산 때 환급받을 확률이 높아집니다.
              &ldquo;13월의 월급&rdquo;을 크게 받고 싶은 사람에게 적합합니다.
              단, 이 돈은 원래 내 월급이었다는 점을 기억하세요.
            </li>
          </ul>
        </div>

        <div className="panel" style={{ marginTop: '1rem' }}>
          <div className="panel__head"><div><h3>어떤 것을 선택해야 할까?</h3></div></div>
          <p>
            세 가지 선택 모두 1년간 내는 총 세금은 같습니다.
            차이는 매달 나누어 내는 금액과 연말정산 때 정산하는 금액의 비율뿐입니다.
          </p>
          <ul className="plain-list">
            <li>매달 여유자금이 필요하다면 → <strong>80%</strong></li>
            <li>특별한 사정이 없다면 → <strong>100%</strong></li>
            <li>연말에 목돈 환급을 원한다면 → <strong>120%</strong></li>
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>연말정산 기본 개념</h2>
        </div>
        <div className="value-grid">
          <article className="value-card">
            <h3>연말정산이란?</h3>
            <p>
              1년 동안 매달 간이세액표에 따라 납부한 소득세 합계와
              실제로 내야 할 정확한 소득세를 비교·정산하는 절차입니다.
              매년 1~2월에 진행되며, 전년도 소득에 대해 정산합니다.
            </p>
          </article>
          <article className="value-card">
            <h3>환급과 추가 납부</h3>
            <p>
              이미 낸 세금이 실제 세금보다 많으면 차액을 환급받습니다.
              반대로 적게 냈으면 추가로 납부해야 합니다.
              공제 항목을 많이 적용할수록 환급 가능성이 높아집니다.
            </p>
          </article>
          <article className="value-card">
            <h3>주요 소득공제 항목</h3>
            <p>
              신용카드/체크카드 사용액(총급여 25% 초과분),
              보험료, 의료비, 교육비, 기부금, 주택자금,
              개인연금저축, IRP, 주택청약종합저축 등이 공제 대상입니다.
            </p>
          </article>
          <article className="value-card">
            <h3>소득공제 vs 세액공제</h3>
            <p>
              소득공제는 과세표준(세금을 매기는 기준 금액)을 줄여줍니다.
              세액공제는 산출된 세금 자체를 직접 줄여줍니다.
              세액공제가 체감 절세 효과가 더 큽니다.
            </p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>2026년 근로소득세율</h2>
        </div>
        <div className="panel">
          <div className="panel__head"><div><h3>종합소득세율 (누진세율)</h3></div></div>
          <ul className="plain-list">
            <li>1,400만 원 이하: <strong>6%</strong></li>
            <li>1,400만 원 초과 ~ 5,000만 원: <strong>15%</strong> (누진공제 126만 원)</li>
            <li>5,000만 원 초과 ~ 8,800만 원: <strong>24%</strong> (누진공제 576만 원)</li>
            <li>8,800만 원 초과 ~ 1.5억 원: <strong>35%</strong> (누진공제 1,544만 원)</li>
            <li>1.5억 원 초과 ~ 3억 원: <strong>38%</strong> (누진공제 1,994만 원)</li>
            <li>3억 원 초과 ~ 5억 원: <strong>40%</strong> (누진공제 2,594만 원)</li>
            <li>5억 원 초과 ~ 10억 원: <strong>42%</strong> (누진공제 3,594만 원)</li>
            <li>10억 원 초과: <strong>45%</strong> (누진공제 6,594만 원)</li>
          </ul>
          <p style={{ marginTop: '0.5rem', color: 'var(--text-2, #64748b)' }}>
            위 세율은 과세표준(총급여 - 근로소득공제 - 각종 소득공제) 기준입니다.
            연봉이 아닌 과세표준에 적용되므로, 연봉 5,000만 원이라도 실제 적용 세율은 이보다 낮습니다.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>실전 예시: 연봉 3,600만 원 (월 300만 원)</h2>
        </div>
        <div className="panel">
          <ul className="plain-list">
            <li><strong>부양가족:</strong> 본인 1명</li>
            <li><strong>비과세:</strong> 식대 20만 원 → 과세 대상 급여 280만 원</li>
            <li><strong>간이세액표 기준 소득세:</strong> 약 48,410원/월</li>
            <li><strong>지방소득세:</strong> 4,841원/월</li>
            <li><strong>월 총 소득세 공제:</strong> 약 53,251원</li>
            <li><strong>연간 소득세 납부 합계:</strong> 약 639,012원</li>
          </ul>
          <p style={{ marginTop: '0.5rem' }}>
            연말정산에서 신용카드 공제, 보험료 공제 등을 적용하면 실제 세금이 줄어들어
            일부를 환급받을 수 있습니다.
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
            <p>소득세·4대보험 공제 후 실제 받는 월급을 계산합니다.</p>
          </Link>
          <Link className="value-card" href="/guide/4-insurance" style={{ textDecoration: 'none' }}>
            <h3>4대보험 총정리 가이드</h3>
            <p>국민연금·건강보험·고용보험·산재보험 요율과 부담 비율을 정리했습니다.</p>
          </Link>
          <Link className="value-card" href="/guide/payslip" style={{ textDecoration: 'none' }}>
            <h3>급여명세서 체크 가이드</h3>
            <p>급여명세서 항목별 확인 방법을 정리했습니다.</p>
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
