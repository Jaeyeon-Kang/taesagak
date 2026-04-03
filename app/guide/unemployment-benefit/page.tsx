import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import JsonLd, { breadcrumbJsonLd, articleJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = buildMetadata({
  title: '실업급여 조건과 금액 계산 2026',
  description:
    '실업급여 수급 조건(고용보험 180일, 비자발적 이직), 1일 지급액 계산법, 신청 절차까지 정리했습니다. 자발적 퇴사도 받을 수 있는 경우를 확인하세요.',
  path: '/guide/unemployment-benefit',
  type: 'article',
  keywords: [
    '실업급여 조건',
    '실업급여 금액',
    '실업급여 계산',
    '실업급여 신청',
    '구직급여',
    '자발적 퇴사 실업급여',
    '고용보험 180일',
  ],
});

export default function GuideUnemploymentBenefitPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: '홈', path: '/' }, { name: '가이드', path: '/guide' }, { name: '실업급여 조건과 금액', path: '/guide/unemployment-benefit' }])} />
      <JsonLd data={articleJsonLd({ title: '실업급여 조건과 금액 계산 2026', description: '실업급여 수급 조건과 신청 절차, 1일 지급액 계산법을 정리했습니다.', path: '/guide/unemployment-benefit', datePublished: '2026-04-03', dateModified: '2026-04-03' })} />
      <main id="main-content" className="page-shell">
        <section className="section">
          <div className="section__header">
            <span className="eyebrow">guide · 2026</span>
            <h1 className="page-title">실업급여 조건과 금액</h1>
            <p className="page-lead">
              실업급여(구직급여)는 조건을 충족하면 퇴사 후 일정 기간 소득을 보전해주는 제도입니다.
              조건과 금액 계산법을 미리 확인해두세요.
            </p>
          </div>

          <div className="panel">
            <div className="panel__head"><div><h2>수급 기본 요건</h2></div></div>
            <ul className="plain-list">
              <li>☑ 고용보험 피보험 기간 합산 <strong>180일 이상</strong> (이직 전 18개월 내)</li>
              <li>☑ <strong>비자발적 이직</strong> — 권고사직, 계약 만료, 폐업, 정리해고 등</li>
              <li>☑ 근로 의사와 능력이 있으나 취업하지 못한 상태</li>
              <li>☑ 적극적으로 재취업 활동 중</li>
              <li>☑ 퇴사일 다음날부터 <strong>1년 이내</strong> 신청</li>
            </ul>
          </div>
        </section>

        <section className="section">
          <div className="section__header">
            <h2>자발적 퇴사도 받을 수 있는 경우</h2>
          </div>
          <div className="value-grid">
            <article className="value-card">
              <h3>임금 체불</h3>
              <p>2개월 이상 임금이 체불되거나 최저임금 미달로 퇴사한 경우.</p>
            </article>
            <article className="value-card">
              <h3>직장 내 괴롭힘</h3>
              <p>직장 내 괴롭힘, 성희롱 피해로 퇴사한 경우. 고용노동부에 진정 사실 등 증빙 필요.</p>
            </article>
            <article className="value-card">
              <h3>근로 조건 저하</h3>
              <p>채용 시 제시 조건 대비 실제 근로 조건이 현저히 낮아진 경우.</p>
            </article>
            <article className="value-card">
              <h3>거주지 이전·통근 불가</h3>
              <p>배우자·부모 동거 목적 거주지 변경으로 왕복 3시간 이상 통근이 필요한 경우.</p>
            </article>
          </div>
        </section>

        <section className="section">
          <div className="section__header">
            <h2>실업급여 1일 지급액</h2>
          </div>
          <div className="panel">
            <ul className="plain-list">
              <li><strong>기본 공식:</strong> 이직 전 평균임금의 60% × 소정급여일수</li>
              <li><strong>상한액(2026년):</strong> 1일 66,000원</li>
              <li><strong>하한액:</strong> 최저임금의 80% × 1일 근로시간</li>
              <li style={{ marginTop: '0.75rem' }}><strong>예시:</strong> 월급 300만 원 / 주 40시간 / 3년 근무</li>
              <li>→ 1일 평균임금 ≒ 100,000원</li>
              <li>→ 1일 지급액 = 100,000 × 60% = 60,000원 (상한 66,000원 적용 여부 확인)</li>
              <li>→ 소정급여일수 (근무 3년) = 150일</li>
              <li>→ 총 지급액 ≒ 9,000,000원</li>
            </ul>
          </div>
        </section>

        <section className="section">
          <div className="section__header">
            <h2>소정급여일수 (수령 기간)</h2>
          </div>
          <div className="panel">
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border, #e2e8f0)' }}>
                  <th style={{ textAlign: 'left', padding: '0.5rem', fontWeight: 600 }}>피보험 기간</th>
                  <th style={{ textAlign: 'right', padding: '0.5rem', fontWeight: 600 }}>50세 미만</th>
                  <th style={{ textAlign: 'right', padding: '0.5rem', fontWeight: 600 }}>50세 이상·장애인</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['1년 미만', '120일', '120일'],
                  ['1년 이상 3년 미만', '150일', '180일'],
                  ['3년 이상 5년 미만', '180일', '210일'],
                  ['5년 이상 10년 미만', '210일', '240일'],
                  ['10년 이상', '240일', '270일'],
                ].map(([period, young, senior], i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border, #e2e8f0)' }}>
                    <td style={{ padding: '0.5rem' }}>{period}</td>
                    <td style={{ textAlign: 'right', padding: '0.5rem' }}>{young}</td>
                    <td style={{ textAlign: 'right', padding: '0.5rem' }}>{senior}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="section">
          <div className="section__header">
            <h2>신청 절차</h2>
          </div>
          <div className="panel">
            <ol className="plain-list">
              <li>회사에 <strong>이직확인서</strong> 발급 요청 (퇴사 후 10일 이내 의무 발급)</li>
              <li>고용24 사이트 또는 고용센터에서 <strong>수급자격 인정 신청</strong></li>
              <li>온라인 취업특강(워크넷) 수강</li>
              <li>고용센터 방문 — 수급자격 인정 면접</li>
              <li>2주마다 실업 인정 (재취업 활동 보고) → 급여 지급</li>
            </ol>
          </div>
        </section>

        <section className="section">
          <div className="section__header">
            <h2>관련 계산기</h2>
          </div>
          <div className="feature-grid">
            <Link className="value-card" href="/severance" style={{ textDecoration: 'none' }}>
              <h3>퇴직금 계산기</h3>
              <p>실업급여와 별도로 받을 수 있는 퇴직금을 계산합니다.</p>
            </Link>
            <Link className="value-card" href="/guide/resignation" style={{ textDecoration: 'none' }}>
              <h3>퇴사 전 체크리스트</h3>
              <p>이직확인서 요청 등 퇴사 전 챙길 항목을 확인합니다.</p>
            </Link>
            <Link className="value-card" href="/guide/health-insurance-after-resignation" style={{ textDecoration: 'none' }}>
              <h3>퇴직 후 건강보험</h3>
              <p>실업급여 수급 중 건강보험 처리 방법을 확인합니다.</p>
            </Link>
          </div>
        </section>
        <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-3, #94a3b8)', margin: '2rem 0 0' }}>
          마지막 업데이트: 2026-04-03 · 2026년 고용보험법 기준
        </p>
      </main>
    </>
  );
}
