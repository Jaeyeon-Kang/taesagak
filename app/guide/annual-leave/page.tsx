import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import JsonLd, { breadcrumbJsonLd, articleJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = buildMetadata({
  title: '연차 계산법 2026 — 발생 기준과 일수 총정리',
  description:
    '입사 1년 미만은 월 1개, 1년 이상은 15개. 연차 발생 기준, 연차수당 계산법, 퇴사 시 미사용 연차 정산까지 정리했습니다.',
  path: '/guide/annual-leave',
  type: 'article',
  keywords: [
    '연차 계산',
    '연차 발생 기준',
    '연차 일수',
    '미사용 연차수당',
    '퇴사 시 연차',
    '연차 촉진',
    '연차 소멸',
  ],
});

export default function GuideAnnualLeavePage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: '홈', path: '/' }, { name: '가이드', path: '/guide' }, { name: '연차 계산법', path: '/guide/annual-leave' }])} />
      <JsonLd data={articleJsonLd({ title: '연차 계산법 2026 — 발생 기준과 일수 총정리', description: '입사 1년 미만은 월 1개, 1년 이상은 15개. 연차 발생 기준, 연차수당 계산법, 퇴사 시 미사용 연차 정산까지 정리했습니다.', path: '/guide/annual-leave', datePublished: '2026-04-03', dateModified: '2026-04-03' })} />
      <main id="main-content" className="page-shell">
        <section className="section">
          <div className="section__header">
            <span className="eyebrow">guide · 2026</span>
            <h1 className="page-title">연차 계산법</h1>
            <p className="page-lead">
              연차는 근로 기간에 따라 발생 방식이 다릅니다.
              퇴사 전 남은 연차를 정확히 파악해야 수당을 빠짐없이 받을 수 있습니다.
            </p>
          </div>

          <div className="value-grid">
            <article className="value-card">
              <h2>1년 미만</h2>
              <p>
                입사 후 매월 개근하면 1개씩 발생합니다. 최대 11개.
                이 연차는 1년이 되는 시점에 소멸하고, 이후 15개의 연차가 새로 부여됩니다.
              </p>
            </article>
            <article className="value-card">
              <h2>1년 이상 3년 미만</h2>
              <p>
                1년 개근 시 15개. 1년에 80% 이상 출근하면 다음 해에도 15개가 부여됩니다.
                (80% 미만 출근 시에는 개근 월만큼 월 1개 방식으로 부여)
              </p>
            </article>
            <article className="value-card">
              <h2>3년 이상</h2>
              <p>
                3년 이상 근무 시 2년마다 연차 1개가 추가됩니다.
                예시: 3년 차 → 16개, 5년 차 → 17개. 최대 25개까지 늘어납니다.
              </p>
            </article>
            <article className="value-card">
              <h2>연차 유효기간</h2>
              <p>
                발생한 연차는 1년 내에 사용해야 합니다. 미사용 시 소멸 원칙이나,
                사용하지 못한 사유가 회사에 있다면 수당 청구가 가능합니다.
              </p>
            </article>
          </div>
        </section>

        <section className="section">
          <div className="section__header">
            <h2>연차수당 계산 방법</h2>
          </div>
          <div className="panel">
            <p style={{ marginBottom: '1rem' }}>
              미사용 연차 1일에 대한 수당은 <strong>통상임금 1일분</strong>입니다.
            </p>
            <ul className="plain-list">
              <li><strong>통상임금 1일</strong> = 월 통상임금 ÷ (월 소정근로시간 / 8)</li>
              <li>예시: 월급 3,000,000원, 주 40시간(월 174시간) 기준</li>
              <li>→ 시간당 통상임금 = 3,000,000 ÷ 174 ≒ 17,241원</li>
              <li>→ 1일 통상임금 = 17,241 × 8 ≒ 137,931원</li>
              <li>→ 미사용 연차 10일 시 수당 = 1,379,310원</li>
            </ul>
          </div>
        </section>

        <section className="section">
          <div className="section__header">
            <h2>퇴사 시 미사용 연차 처리</h2>
          </div>
          <div className="panel">
            <ol className="plain-list">
              <li>퇴사일 기준 사용 가능한 잔여 연차 일수를 HR 또는 급여명세서로 확인</li>
              <li>남은 연차를 퇴사 전에 사용하거나 수당으로 지급받기로 협의</li>
              <li>회사가 연차수당 지급을 거부하면 고용노동부 임금체불 신고 가능</li>
              <li>퇴사 후 3년 이내에 미지급 연차수당 청구권이 소멸됩니다</li>
            </ol>
          </div>
        </section>

        <section className="section">
          <div className="section__header">
            <h2>연차 촉진 제도란?</h2>
          </div>
          <div className="panel">
            <p>
              회사가 연차 촉진 절차(사용 시기 지정 통보 → 근로자 통보 → 재지정)를 적법하게 밟은 경우,
              미사용 연차에 대해 <strong>수당 지급 의무가 없어집니다</strong>.
              촉진 절차가 있었는지 확인하는 것이 중요합니다.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="section__header">
            <h2>계산기도 함께 확인하세요</h2>
          </div>
          <div className="feature-grid">
            <Link className="value-card" href="/severance" style={{ textDecoration: 'none' }}>
              <h3>퇴직금 계산기</h3>
              <p>연차수당이 반영된 퇴직금을 계산합니다.</p>
            </Link>
            <Link className="value-card" href="/net-salary" style={{ textDecoration: 'none' }}>
              <h3>실수령액 계산기</h3>
              <p>세후 월급과 연차수당 세후 금액을 확인합니다.</p>
            </Link>
            <Link className="value-card" href="/guide/resignation" style={{ textDecoration: 'none' }}>
              <h3>퇴사 전 체크리스트</h3>
              <p>연차수당 포함 퇴사 전 챙길 항목 전체 확인.</p>
            </Link>
          </div>
        </section>
        <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-3, #94a3b8)', margin: '2rem 0 0' }}>
          마지막 업데이트: 2026-04-03 · 2026년 근로기준법 기준
        </p>
      </main>
    </>
  );
}
