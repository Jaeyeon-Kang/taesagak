import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import JsonLd, { breadcrumbJsonLd, articleJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = buildMetadata({
  title: '퇴직 후 건강보험 처리 방법 2026',
  description:
    '퇴사하면 건강보험이 지역가입자로 전환됩니다. 임의계속가입으로 보험료를 줄이는 방법과 피부양자 등록 조건을 정리했습니다.',
  path: '/guide/health-insurance-after-resignation',
  type: 'article',
  keywords: [
    '퇴직 후 건강보험',
    '퇴사 건강보험',
    '임의계속가입',
    '지역가입자 전환',
    '건강보험 피부양자',
    '퇴사 후 보험료',
  ],
});

export default function GuideHealthInsurancePage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: '홈', path: '/' }, { name: '가이드', path: '/guide' }, { name: '퇴직 후 건강보험', path: '/guide/health-insurance-after-resignation' }])} />
      <JsonLd data={articleJsonLd({ title: '퇴직 후 건강보험 처리 방법 2026', description: '퇴사 후 건강보험 지역가입자 전환과 임의계속가입 비교를 정리했습니다.', path: '/guide/health-insurance-after-resignation', datePublished: '2026-04-03', dateModified: '2026-04-03' })} />
      <main id="main-content" className="page-shell">
        <section className="section">
          <div className="section__header">
            <span className="eyebrow">guide · 2026</span>
            <h1 className="page-title">퇴직 후 건강보험 처리</h1>
            <p className="page-lead">
              퇴사하는 순간 직장가입자 자격이 상실됩니다.
              선택지를 미리 파악해두면 보험료를 크게 줄일 수 있습니다.
            </p>
          </div>

          <div className="value-grid">
            <article className="value-card">
              <h3>① 지역가입자 전환 (자동)</h3>
              <p>
                퇴사 다음 달부터 자동으로 지역가입자로 전환됩니다.
                재산, 소득, 자동차 등을 합산해 보험료가 산정되며,
                직장 재직 시보다 높아질 수 있습니다.
              </p>
            </article>
            <article className="value-card">
              <h3>② 임의계속가입 (신청 필요)</h3>
              <p>
                퇴사 전 직장 보험료를 최대 36개월 유지할 수 있습니다.
                지역가입자보다 보험료가 낮은 경우 유리합니다.
                퇴사 후 <strong>2개월 이내</strong> 신청해야 합니다.
              </p>
            </article>
            <article className="value-card">
              <h3>③ 피부양자 등록</h3>
              <p>
                배우자·부모 등 가족이 직장가입자라면 피부양자로 등록할 수 있습니다.
                보험료 없이 보장받습니다. 소득 기준(연 2,000만 원 이하 등) 충족 필요.
              </p>
            </article>
            <article className="value-card">
              <h3>④ 재취업 시 자동 복귀</h3>
              <p>
                새 직장에 입사하면 자동으로 직장가입자로 전환됩니다.
                별도 신청 없이 회사가 건강보험 취득 신고를 합니다.
              </p>
            </article>
          </div>
        </section>

        <section className="section">
          <div className="section__header">
            <h2>임의계속가입 — 언제 유리한가</h2>
          </div>
          <div className="panel">
            <ul className="plain-list">
              <li>재직 중 보험료가 낮았던 경우 (월급이 낮았던 경우)</li>
              <li>퇴사 후 재산(부동산, 자동차 등)이 많아 지역가입료가 높게 산정될 때</li>
              <li>가족 중 직장가입자 피부양자로 등록이 어려운 경우</li>
            </ul>
            <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--text-2, #64748b)' }}>
              임의계속가입 보험료 = 재직 중 본인 납부액 + 회사 납부분(약 50%) 합산.
              즉, 재직 때보다 약 2배 수준이지만 지역가입료보다 낮을 수 있습니다.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="section__header">
            <h2>신청 방법 및 기한</h2>
          </div>
          <div className="panel">
            <ol className="plain-list">
              <li>퇴사 후 <strong>2개월 이내</strong> 건강보험공단 지사 방문 또는 The건강보험 앱에서 신청</li>
              <li>신청 후 매월 25일까지 보험료 납부</li>
              <li>납부 기한 초과 시 지역가입자로 자동 전환됩니다</li>
              <li>36개월 후 또는 재취업 시 자동 종료</li>
            </ol>
          </div>
        </section>

        <section className="section">
          <div className="section__header">
            <h2>피부양자 등록 조건 (2026년 기준)</h2>
          </div>
          <div className="panel">
            <ul className="plain-list">
              <li>연 소득 합계 2,000만 원 이하 (근로·사업·금융·임대소득 합산)</li>
              <li>재산세 과세표준 9억 원 이하 (초과 시 소득 1,000만 원 이하이어야 함)</li>
              <li>형제·자매는 65세 이상, 장애인, 국가유공자 등 추가 조건 있음</li>
            </ul>
            <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--text-2, #64748b)' }}>
              조건 충족 시 배우자·직계존비속·형제자매 등록 가능.
              건강보험 EDI 또는 The건강보험 앱에서 신청.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="section__header">
            <h2>관련 가이드</h2>
          </div>
          <div className="feature-grid">
            <Link className="value-card" href="/guide/unemployment-benefit" style={{ textDecoration: 'none' }}>
              <h3>실업급여 조건과 금액</h3>
              <p>실업급여 수급 중 건강보험 처리 방법도 확인합니다.</p>
            </Link>
            <Link className="value-card" href="/guide/resignation" style={{ textDecoration: 'none' }}>
              <h3>퇴사 전 체크리스트</h3>
              <p>건강보험 포함 퇴사 전 챙길 행정 처리 전체.</p>
            </Link>
            <Link className="value-card" href="/guide/severance-deadline" style={{ textDecoration: 'none' }}>
              <h3>퇴직금 지급 기한</h3>
              <p>퇴직금 14일 규정과 지연 시 대응 방법.</p>
            </Link>
          </div>
        </section>
        <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-3, #94a3b8)', margin: '2rem 0 0' }}>
          마지막 업데이트: 2026-04-03 · 2026년 국민건강보험법 기준
        </p>
      </main>
    </>
  );
}
