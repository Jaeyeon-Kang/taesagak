import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import JsonLd, { breadcrumbJsonLd, articleJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = buildMetadata({
  title: '수습기간 급여와 권리 2026',
  description:
    '수습기간 법적 정의, 급여 감액 범위(최저임금 90%), 수습 중 해고 조건, 4대보험·연차 적용 여부, 주의사항을 정리했습니다.',
  path: '/guide/probation',
  type: 'article',
  keywords: [
    '수습기간 급여',
    '수습기간 최저임금',
    '수습 급여 감액',
    '수습기간 해고',
    '수습기간 4대보험',
    '수습기간 연차',
    '수습기간 법률',
    '수습 90%',
    '수습기간 퇴직금',
    '수습기간 근로계약서',
  ],
});

export default function GuideProbationPage() {
  return (
    <>
    <JsonLd data={breadcrumbJsonLd([{ name: '홈', path: '/' }, { name: '수습기간 급여와 권리', path: '/guide/probation' }])} />
    <JsonLd data={articleJsonLd({ title: '수습기간 급여와 권리 2026', description: '수습기간 법적 정의, 급여 감액 범위(최저임금 90%), 수습 중 해고 조건, 4대보험·연차 적용 여부, 주의사항을 정리했습니다.', path: '/guide/probation', datePublished: '2026-04-06', dateModified: '2026-04-06' })} />
    <main id="main-content" className="page-shell">
      <section className="section">
        <div className="section__header">
          <span className="eyebrow">guide · 2026</span>
          <h1 className="page-title">수습기간 급여와 권리</h1>
          <p className="page-lead">
            수습기간이라고 급여를 마음대로 깎거나 해고할 수 있는 것은 아닙니다.
            법이 보장하는 수습 근로자의 권리를 정확히 알아야 손해 보지 않습니다.
          </p>
        </div>

        <div className="panel">
          <div className="panel__head"><div><h2>핵심 요약</h2></div></div>
          <ul className="plain-list">
            <li><strong>수습기간 급여:</strong> 최저임금의 90%까지 감액 가능 (단, 1년 이상 근로계약 + 단순노무직 제외)</li>
            <li><strong>2026년 수습 최저시급:</strong> 10,320원 x 90% = 9,288원</li>
            <li><strong>4대보험:</strong> 수습기간에도 가입 의무 있음</li>
            <li><strong>연차:</strong> 수습기간도 근속기간에 포함, 연차 발생</li>
            <li><strong>해고:</strong> 정당한 사유 없이 해고 불가 (수습이라도 동일)</li>
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>수습기간이란?</h2>
        </div>
        <div className="panel">
          <p>
            수습기간은 정식 채용 전에 업무 적합성을 평가하기 위한 시험 근무 기간입니다.
            법에서 수습기간의 길이를 정해놓지는 않았지만, 통상 1~3개월이 일반적이며
            최대 6개월까지 설정하는 경우가 있습니다.
          </p>
          <p>
            중요한 점은, 수습기간이라고 해서 근로자가 아닌 것이 아닙니다.
            수습 근로자도 근로기준법의 적용을 받는 정식 근로자입니다.
            근로계약서를 작성해야 하고, 4대보험도 가입해야 하며, 연차도 발생합니다.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>수습 급여 감액 — 어디까지 가능한가?</h2>
        </div>
        <div className="value-grid">
          <article className="value-card">
            <h3>감액 가능 조건</h3>
            <p>
              최저임금법 제5조에 따라, 다음 조건을 모두 충족하는 경우에만
              최저임금의 10%까지 감액(즉 90% 지급)할 수 있습니다.
            </p>
            <ul style={{ paddingLeft: '1.2rem', margin: '0.5rem 0 0' }}>
              <li>1년 이상의 기간을 정하여 근로계약을 체결한 경우</li>
              <li>수습 사용 중인 기간이 3개월 이내인 경우</li>
              <li>단순노무 업종이 아닌 경우</li>
            </ul>
          </article>
          <article className="value-card">
            <h3>감액 불가능한 경우</h3>
            <p>
              다음 경우에는 수습기간이라도 100% 최저임금을 지급해야 합니다.
            </p>
            <ul style={{ paddingLeft: '1.2rem', margin: '0.5rem 0 0' }}>
              <li>1년 미만의 기간제(계약직) 근로계약</li>
              <li>수습 4개월 차부터</li>
              <li>단순노무 업종 종사자 (청소, 경비, 주방보조 등)</li>
            </ul>
          </article>
          <article className="value-card">
            <h3>2026년 수습 최저임금</h3>
            <p>
              2026년 최저시급 10,320원의 90% = <strong>시급 9,288원</strong>입니다.
              월급으로 환산하면 (주 40시간, 주휴 포함 209시간 기준)
              9,288원 x 209시간 = <strong>월 1,941,192원</strong>입니다.
              이보다 적게 받고 있다면 최저임금 위반입니다.
            </p>
          </article>
          <article className="value-card">
            <h3>감액 비율은 회사가 정한다?</h3>
            <p>
              법은 &ldquo;최대 10%까지&rdquo; 감액할 수 있다고 정할 뿐,
              반드시 10% 감액해야 하는 것은 아닙니다.
              회사가 수습기간에도 100% 급여를 지급하겠다고 근로계약서에 명시하면 감액 없이 지급해야 합니다.
              근로계약서의 급여 조건을 꼭 확인하세요.
            </p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>수습기간 중 해고</h2>
        </div>
        <div className="panel">
          <div className="panel__head"><div><h3>수습이면 자유롭게 해고할 수 있다?</h3></div></div>
          <p>
            아닙니다. 수습기간이라도 근로기준법 제23조에 따라 정당한 사유 없이 해고할 수 없습니다.
            다만, 수습기간 중 해고의 &ldquo;정당한 사유&rdquo; 판단 기준은 정식 채용 후보다 넓게 인정되는 경향이 있습니다.
          </p>
          <hr className="divider" />
          <p><strong>해고가 정당하다고 인정될 수 있는 경우:</strong></p>
          <ul className="plain-list">
            <li>업무 수행 능력이 현저히 부족하여 교육·지도에도 개선되지 않는 경우</li>
            <li>무단결근, 근무태도 불량 등 근로계약 위반이 명백한 경우</li>
            <li>이력서 허위 기재 등 채용 과정의 중대한 하자가 발견된 경우</li>
          </ul>
          <hr className="divider" />
          <p><strong>해고가 부당할 수 있는 경우:</strong></p>
          <ul className="plain-list">
            <li>단순히 &ldquo;맞지 않는다&rdquo;는 막연한 이유</li>
            <li>객관적 평가 없이 상사의 주관적 판단만으로 해고</li>
            <li>해고 예고(30일 전) 없이 즉시 해고 (수습 3개월 이내는 예고 의무 면제이나, 3개월 초과 시 적용)</li>
          </ul>
        </div>

        <div className="panel" style={{ marginTop: '1rem' }}>
          <div className="panel__head"><div><h3>수습 해고 예고 의무</h3></div></div>
          <p>
            근로기준법 제35조에 따라, 근로한 기간이 3개월 미만인 근로자에게는 해고 예고 의무가 없습니다.
            즉, 수습 3개월 이내에 해고한다면 30일 전 예고 없이 즉시 해고가 가능합니다.
            하지만 3개월을 초과한 수습 근로자에게는 30일 전 해고 예고 또는 30일분의 통상임금(해고 예고 수당)을 지급해야 합니다.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>수습기간 4대보험과 연차</h2>
        </div>
        <div className="value-grid">
          <article className="value-card">
            <h3>4대보험</h3>
            <p>
              수습기간이라도 4대보험 가입 의무가 있습니다.
              국민연금, 건강보험, 고용보험 모두 수습 첫날부터 가입 대상입니다.
              산재보험은 당연히 적용됩니다.
              &ldquo;수습이라 4대보험을 안 들어도 된다&rdquo;는 것은 잘못된 정보입니다.
            </p>
          </article>
          <article className="value-card">
            <h3>연차휴가</h3>
            <p>
              수습기간은 근속기간에 포함됩니다.
              입사 후 1개월 개근 시 1일의 연차가 발생합니다 (1년 미만 근로자 기준).
              수습 3개월 동안 개근했다면 3일의 연차가 발생합니다.
              수습 후 정식 채용되면 수습기간이 입사일로 소급 적용되는 것이 원칙입니다.
            </p>
          </article>
          <article className="value-card">
            <h3>퇴직금</h3>
            <p>
              수습기간도 계속근로기간에 포함됩니다.
              수습 3개월 + 정식 근무 9개월 = 총 1년이므로 퇴직금 수급 요건을 충족합니다.
              수습기간을 별도로 빼고 계산하는 것은 위법입니다.
            </p>
          </article>
          <article className="value-card">
            <h3>주휴수당</h3>
            <p>
              수습기간에도 주 15시간 이상 근무하고 소정 근로일을 개근했다면 주휴수당이 발생합니다.
              수습 급여가 감액되었더라도 주휴수당은 감액된 시급 기준으로 별도 계산하여 지급해야 합니다.
            </p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>수습기간 주의사항</h2>
        </div>
        <div className="panel">
          <ol className="plain-list">
            <li>
              <strong>근로계약서를 반드시 작성하세요.</strong> 수습기간, 급여, 근무조건이 명시된 근로계약서를 교부받아야 합니다.
              구두 약속만으로는 분쟁 시 입증이 어렵습니다.
            </li>
            <li>
              <strong>수습기간과 급여 조건을 계약서에서 확인하세요.</strong> 감액 여부, 감액 비율, 수습 종료 후 급여가
              명확하게 기재되어 있어야 합니다.
            </li>
            <li>
              <strong>수습 평가 기준을 미리 확인하세요.</strong> 어떤 기준으로 정식 채용 여부가 결정되는지
              사전에 확인하면 부당 해고에 대응하기 쉬워집니다.
            </li>
            <li>
              <strong>수습 연장에 주의하세요.</strong> 수습기간이 부당하게 연장되는 경우가 있습니다.
              근로계약서에 명시된 수습기간을 초과하여 연장하려면 근로자의 동의가 필요합니다.
            </li>
            <li>
              <strong>&ldquo;인턴&rdquo;이라는 명칭에 속지 마세요.</strong> 명칭이 인턴이든 수습이든 트레이니든,
              실질적으로 사용자의 지휘·감독 아래 근로를 제공하면 근로자이며 근로기준법이 적용됩니다.
            </li>
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>수습 기간 중 부당한 대우를 받고 있다면</h2>
        </div>
        <div className="panel">
          <ul className="plain-list">
            <li>최저임금 미달 급여 → 고용노동부(1350) 임금체불 신고</li>
            <li>4대보험 미가입 → 국민건강보험공단(1577-1000), 국민연금공단(1355) 신고</li>
            <li>부당해고 → 지방노동위원회에 구제 신청 (해고일로부터 3개월 이내)</li>
            <li>근로계약서 미교부 → 고용노동부 신고 (500만 원 이하 벌금 대상)</li>
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>관련 계산기 · 가이드</h2>
        </div>
        <div className="feature-grid">
          <Link className="value-card" href="/minimum-wage" style={{ textDecoration: 'none' }}>
            <h3>최저임금 계산기</h3>
            <p>2026년 최저임금 기준으로 미달 여부를 점검합니다.</p>
          </Link>
          <Link className="value-card" href="/guide/4-insurance" style={{ textDecoration: 'none' }}>
            <h3>4대보험 총정리 가이드</h3>
            <p>수습기간 4대보험 가입 의무와 요율을 확인합니다.</p>
          </Link>
          <Link className="value-card" href="/guide/part-time-rights" style={{ textDecoration: 'none' }}>
            <h3>알바생 노동법 권리 가이드</h3>
            <p>최저임금, 주휴수당, 부당해고 대응법을 정리했습니다.</p>
          </Link>
          <Link className="value-card" href="/severance" style={{ textDecoration: 'none' }}>
            <h3>퇴직금 계산기</h3>
            <p>수습기간 포함 퇴직금을 계산합니다.</p>
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
