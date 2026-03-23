import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = buildMetadata({
  title: '퇴직금 상여금·연차수당 반영 방법 2026',
  description:
    '퇴직금 계산 시 상여금과 연차수당을 반영하는 방법을 설명합니다. 평균임금 산정 방식, 산입 범위, 실수 줄이는 계산법을 한 번에 확인할 수 있습니다.',
  path: '/guide/severance',
  keywords: [
    '퇴직금 상여금 포함 여부',
    '퇴직금 연차수당 포함',
    '퇴직금 평균임금 계산법',
    '퇴직금 적게 나온 이유',
    '퇴직금에 상여금 반영하는 법',
    '퇴직금 계산 시 빠지는 항목',
  ],
});

export default function GuideSeverancePage() {
  return (
    <>
    <JsonLd data={breadcrumbJsonLd([{ name: '홈', path: '/' }, { name: '퇴직금 상여금·연차수당 반영', path: '/guide/severance' }])} />
    <main className="page-shell">
      <section className="section">
        <div className="section__header">
          <span className="eyebrow">guide · 2026</span>
          <h1 className="page-title">퇴직금에 상여금·연차수당 반영하는 법</h1>
          <p className="page-lead">
            최근 3개월 급여만 넣으면 퇴직금이 낮게 나온다. 상여금과 연차수당을 빠뜨리지 않아야 정확한 금액이 나온다.
          </p>
        </div>

        <div className="panel">
          <div className="panel__head"><div><h2>핵심 원칙</h2></div></div>
          <ul className="plain-list">
            <li>퇴직금 기준은 <strong>평균임금</strong>이다. 평균임금이 통상임금보다 낮으면 통상임금을 적용한다.</li>
            <li>평균임금 = (최근 3개월 임금 총액 + 연간 상여금 × 3/12 + 연간 연차수당 × 3/12) ÷ 3개월 일수</li>
            <li>퇴직금 = 1일 평균임금 × 30 × (재직일수 ÷ 365)</li>
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>상여금 산입 방법</h2>
        </div>
        <div className="value-grid">
          <article className="value-card">
            <h3>상여금이란?</h3>
            <p>
              정기적으로 지급되는 성과급, 명절 상여, 연간 보너스 등이 해당된다.
              단, 퇴직을 조건으로 지급되는 경우나 일시적·불규칙적 지급은 제외될 수 있다.
            </p>
          </article>
          <article className="value-card">
            <h3>산입 계산 방법</h3>
            <p>
              연간 상여금 총액 × (3 ÷ 12) = 3개월 치 상여금 산입액.
              예: 연간 상여금 2,400,000원 → 600,000원 산입.
            </p>
          </article>
          <article className="value-card">
            <h3>상여금 지급 내역 확인 방법</h3>
            <p>
              지난 1년간 급여명세서에서 상여금 항목을 합산한다.
              재직기간이 1년 미만이라면 받은 상여금 총액 ÷ 재직기간(월) × 3으로 환산한다.
            </p>
          </article>
          <article className="value-card">
            <h3>주의할 점</h3>
            <p>
              상여금이 근로계약서나 취업규칙에 명시된 경우 평균임금 산입 대상이다.
              구두 약속만 된 상여금은 분쟁이 생길 수 있으니 서면 근거를 확보해둔다.
            </p>
          </article>
        </div>
      </section>


      <section className="section">
        <div className="section__header">
          <h2>연차수당 산입 방법</h2>
        </div>
        <div className="panel">
          <div className="panel__head"><div><h3>연차수당이란?</h3></div></div>
          <p>
            미사용 연차에 대해 지급되는 수당이다. 퇴직 전 1년간 지급받은 연차수당을 산입 대상으로 본다.
          </p>
          <hr className="divider" />
          <p><strong>산입 계산 방법:</strong> 연간 연차수당 총액 × (3 ÷ 12)</p>
          <p>예: 연간 연차수당 840,000원 → 210,000원 산입</p>
          <hr className="divider" />
          <p><strong>퇴직 시 미사용 연차는?</strong><br />
          퇴직 시 남은 연차는 별도 연차수당으로 청구할 수 있다. 이는 퇴직금과는 별개다.
          퇴직 연도의 미사용 연차수당은 퇴직금 평균임금 산정에 포함되지 않는다.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>통상임금이 더 높을 때</h2>
        </div>
        <div className="panel">
          <p>
            평균임금이 통상임금보다 낮은 경우(예: 최근 3개월 급여가 특별히 낮았거나 무급 기간이 있는 경우)
            통상임금을 기준으로 퇴직금을 계산한다.
          </p>
          <p>
            통상임금은 시급 × 소정근로시간(주휴 포함 월 환산)으로 계산한다.
            퇴직금 계산기에 통상시급을 입력하면 두 값을 비교해 큰 값을 적용한다.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>직접 계산해보기</h2>
        </div>
        <div className="feature-grid">
          <Link className="value-card" href="/severance" style={{ textDecoration: 'none' }}>
            <h3>퇴직금 계산기</h3>
            <p>상여금·연차수당 포함해서 퇴직금을 계산한다.</p>
          </Link>
          <Link className="value-card" href="/guide/resignation" style={{ textDecoration: 'none' }}>
            <h3>퇴사 전 체크리스트</h3>
            <p>퇴사 전 돈 관련해서 확인해야 할 것들을 정리했다.</p>
          </Link>
          <Link className="value-card" href="/guide/payslip" style={{ textDecoration: 'none' }}>
            <h3>급여명세서 체크 가이드</h3>
            <p>상여금 지급 내역을 급여명세서에서 확인하는 방법을 설명한다.</p>
          </Link>
          <Link className="value-card" href="/calculator" style={{ textDecoration: 'none' }}>
            <h3>통합 계산기</h3>
            <p>퇴직금 포함 4개 계산을 한 번에 볼 수 있습니다.</p>
          </Link>
        </div>
      </section>
      <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-3, #94a3b8)', margin: '2rem 0 0' }}>
        마지막 업데이트: 2026-03-23 · 2026년 기준 법령 반영
      </p>
    </main>
    </>
  );
}
