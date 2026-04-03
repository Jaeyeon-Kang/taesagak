import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import JsonLd, { breadcrumbJsonLd, articleJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = buildMetadata({
  title: '급여명세서 체크 가이드 2026',
  description:
    '급여명세서에서 꼭 확인해야 할 항목, 이상한 공제 찾는 법, 주휴수당·최저임금 반영 확인 방법을 정리했습니다.',
  path: '/guide/payslip',
  type: 'article',
  keywords: [
    '급여명세서 보는 법',
    '급여명세서 항목 설명',
    '월급에서 빠지는 돈',
    '4대보험 얼마 나가나',
    '급여명세서 실수령액 다른 이유',
    '국민연금 얼마 내나',
    '건강보험료 계산',
  ],
});

export default function GuidePayslipPage() {
  return (
    <>
    <JsonLd data={breadcrumbJsonLd([{ name: '홈', path: '/' }, { name: '급여명세서 체크 가이드', path: '/guide/payslip' }])} />
    <JsonLd data={articleJsonLd({ title: '급여명세서 체크 가이드 2026', description: '급여명세서에서 꼭 확인해야 할 항목, 이상한 공제 찾는 법, 주휴수당·최저임금 반영 확인 방법을 정리했습니다.', path: '/guide/payslip', datePublished: '2026-01-15', dateModified: '2026-03-01' })} />
    <main id="main-content" className="page-shell">
      <section className="section">
        <div className="section__header">
          <span className="eyebrow">guide · 2026</span>
          <h1 className="page-title">급여명세서 체크 가이드</h1>
          <p className="page-lead">
            급여명세서 항목별로 확인해야 할 내용을 정리했습니다.
            공제 항목 하나씩 짚어보면 실수령액 차이를 파악할 수 있습니다.
          </p>
        </div>

        <div className="panel">
          <div className="panel__head"><div><h2>지급 항목 확인</h2></div></div>
          <ul className="plain-list">
            <li><strong>기본급</strong> — 계약서상 월급과 일치하는지 확인합니다. 기본급이 낮고 수당이 많은 구조라면 최저임금 산입 범위를 따져야 합니다.</li>
            <li><strong>주휴수당</strong> — 별도 항목이 있는지 확인합니다. 없다면 기본급에 포함된 것인지 회사에 문의합니다.</li>
            <li><strong>연장·야간·휴일수당</strong> — 초과근무를 했다면 1.5배 또는 2배 가산임금이 반영됐는지 확인합니다.</li>
            <li><strong>식대·교통비</strong> — 비과세 항목이 명확히 구분됐는지 확인합니다. 비과세 적용 한도를 초과하면 과세 처리됩니다.</li>
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>공제 항목 확인</h2>
        </div>
        <div className="value-grid">
          <article className="value-card">
            <h3>국민연금</h3>
            <p>
              2026년 근로자 부담율 4.75%. 월 보수 상한 6,370,000원 기준.
              공제액 = 월 보수 × 4.75% (상한 초과분은 상한액 기준 적용).
            </p>
          </article>
          <article className="value-card">
            <h3>건강보험</h3>
            <p>
              근로자 3.595%. 장기요양보험은 보수월액의 0.4724%(건강보험료의 13.14%)로 별도 부과됩니다.
              합산 약 4.0% 수준. 지역가입자 대비 유리하므로 직장가입 유지가 이득입니다.
            </p>
          </article>
          <article className="value-card">
            <h3>고용보험</h3>
            <p>
              근로자 0.9%. 실직 시 실업급여 수령의 기반이 됩니다.
              고용보험 미가입 근로자는 실업급여를 받을 수 없으니 가입 여부를 확인하세요.
            </p>
          </article>
          <article className="value-card">
            <h3>소득세 · 지방소득세</h3>
            <p>
              간이세액표 기준으로 원천징수됩니다. 연말정산에서 실제 납부세액과 정산합니다.
              공제대상 가족 수를 회사 HR에 정확히 신고해야 합니다.
            </p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>최저임금 반영 확인</h2>
        </div>
        <div className="panel">
          <ol className="plain-list">
            <li>급여명세서에서 기본급을 확인합니다.</li>
            <li>시급제라면 기본급 ÷ 실제 근무시간 = 시급. 10,320원(2026 최저시급) 이상인지 확인합니다.</li>
            <li>월급제라면 기본급 ÷ 월 소정근로시간으로 역산한 시급이 최저시급 이상인지 확인합니다.</li>
            <li>식대, 교통비 등 수당은 최저임금 산입 범위 기준을 별도로 확인해야 합니다.</li>
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>이상한 공제를 발견했을 때</h2>
        </div>
        <div className="panel">
          <ul className="plain-list">
            <li>회사에 공제 항목과 금액의 근거를 서면으로 요청합니다.</li>
            <li>근로기준법상 임의 공제는 불법입니다. 동의 없이 급여에서 빼는 것은 임금체불입니다.</li>
            <li>고용노동부(1350) 또는 고용노동부 온라인 민원을 통해 신고할 수 있습니다.</li>
            <li>급여명세서와 이메일·메신저 대화를 증거로 보관해 두세요.</li>
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>관련 계산기 바로가기</h2>
        </div>
        <div className="feature-grid">
          <Link className="value-card" href="/net-salary" style={{ textDecoration: 'none' }}>
            <h3>실수령액 계산기</h3>
            <p>세전 월급에서 공제 후 실수령액을 계산합니다.</p>
          </Link>
          <Link className="value-card" href="/weekly-holiday" style={{ textDecoration: 'none' }}>
            <h3>주휴수당 계산기</h3>
            <p>급여명세서에 주휴수당이 제대로 반영됐는지 확인합니다.</p>
          </Link>
          <Link className="value-card" href="/minimum-wage" style={{ textDecoration: 'none' }}>
            <h3>최저임금 계산기</h3>
            <p>내 시급이 2026 최저임금 기준을 충족하는지 확인합니다.</p>
          </Link>
          <Link className="value-card" href="/guide/weekly-holiday" style={{ textDecoration: 'none' }}>
            <h3>주휴수당 조건 가이드</h3>
            <p>주휴수당 조건과 계산 방법을 상세히 정리했습니다.</p>
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
