import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import JsonLd, { breadcrumbJsonLd, articleJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = buildMetadata({
  title: '퇴직금 14일 지급 의무 — 미지급 시 대응 방법 2026',
  description:
    '퇴직금은 퇴사 후 14일 이내 지급이 원칙입니다. 지연 시 이자 청구 방법, 고용노동부 신고 절차, DC형 퇴직연금 처리까지 정리했습니다.',
  path: '/guide/severance-deadline',
  type: 'article',
  keywords: [
    '퇴직금 14일',
    '퇴직금 지급 기한',
    '퇴직금 미지급',
    '퇴직금 지연이자',
    '임금체불 신고',
    '고용노동부 신고',
    '퇴직금 언제 받나',
  ],
});

export default function GuideSeveranceDeadlinePage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: '홈', path: '/' }, { name: '가이드', path: '/guide' }, { name: '퇴직금 14일 지급 의무', path: '/guide/severance-deadline' }])} />
      <JsonLd data={articleJsonLd({ title: '퇴직금 14일 지급 의무 — 미지급 시 대응 방법 2026', description: '퇴직금 지급 기한과 미지급 시 이자 청구 및 신고 방법을 정리했습니다.', path: '/guide/severance-deadline', datePublished: '2026-04-03', dateModified: '2026-04-03' })} />
      <main id="main-content" className="page-shell">
        <section className="section">
          <div className="section__header">
            <span className="eyebrow">guide · 2026</span>
            <h1 className="page-title">퇴직금 14일 지급 의무</h1>
            <p className="page-lead">
              퇴직금은 퇴사일로부터 14일 이내에 지급해야 합니다.
              이 기한을 넘기면 지연 이자를 청구할 수 있습니다.
            </p>
          </div>

          <div className="panel">
            <div className="panel__head"><div><h2>핵심 규정</h2></div></div>
            <ul className="plain-list">
              <li>근로자퇴직급여보장법 제9조: <strong>퇴직일로부터 14일 이내</strong> 지급</li>
              <li>당사자 합의 시 지급 기일 연장 가능 (서면 합의 권장)</li>
              <li>14일 초과 미지급 시 연 <strong>20% 지연이자</strong> 발생</li>
              <li>고의적 미지급 시 3년 이하 징역 또는 3,000만 원 이하 벌금</li>
            </ul>
          </div>
        </section>

        <section className="section">
          <div className="section__header">
            <h2>퇴직연금(DC·DB형) 처리</h2>
          </div>
          <div className="value-grid">
            <article className="value-card">
              <h3>DB형 (확정급여형)</h3>
              <p>
                회사가 운용하다가 퇴직 시 지급합니다.
                일반 퇴직금과 동일하게 14일 이내 IRP 계좌로 이전됩니다.
              </p>
            </article>
            <article className="value-card">
              <h3>DC형 (확정기여형)</h3>
              <p>
                적립금이 개인 퇴직연금 계좌에 이미 쌓여 있습니다.
                퇴직 시 IRP로 이전 후 55세 이후 수령하거나 중도인출 가능.
              </p>
            </article>
            <article className="value-card">
              <h3>IRP 계좌</h3>
              <p>
                퇴직금은 반드시 IRP(개인형 퇴직연금) 계좌로 입금됩니다.
                바로 현금 인출 시 퇴직소득세 전액 납부. 유지 시 세금 이연.
              </p>
            </article>
            <article className="value-card">
              <h3>퇴직소득세</h3>
              <p>
                IRP에서 인출 시 퇴직소득세가 부과됩니다.
                연금 형태로 수령하면 세율이 낮아집니다(퇴직소득세의 70%).
              </p>
            </article>
          </div>
        </section>

        <section className="section">
          <div className="section__header">
            <h2>퇴직금이 안 나왔을 때 대응 순서</h2>
          </div>
          <div className="panel">
            <ol className="plain-list">
              <li><strong>회사 인사·경영진에 서면(문자·이메일 포함) 지급 요청</strong> — 날짜와 금액을 명시해 기록을 남깁니다.</li>
              <li><strong>14일 경과 후 지연이자 계산</strong> — 미지급 원금 × 20% ÷ 365 × 지연 일수</li>
              <li><strong>고용노동부 임금체불 진정 신고</strong> — 고용24 사이트 또는 가까운 지방고용노동청 방문. 온라인 신고 가능.</li>
              <li><strong>체불 사실확인서 발급</strong> — 신고 처리 후 받을 수 있으며, 소액체당금 신청에 사용.</li>
              <li><strong>소액체당금 신청</strong> — 회사가 도산·지급 불능 시 국가가 대신 지급하는 제도 (상한 있음).</li>
            </ol>
          </div>
        </section>

        <section className="section">
          <div className="section__header">
            <h2>지연이자 계산 예시</h2>
          </div>
          <div className="panel">
            <ul className="plain-list">
              <li>퇴직금 미지급 원금: 5,000,000원</li>
              <li>지연 기간: 30일</li>
              <li>지연이자율: 연 20%</li>
              <li style={{ marginTop: '0.5rem' }}>→ 지연이자 = 5,000,000 × 0.20 ÷ 365 × 30 = <strong>약 82,192원</strong></li>
              <li style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: 'var(--text-2, #64748b)' }}>
                지연이자는 청구해야 받을 수 있습니다. 노동청 신고 시 함께 청구하세요.
              </li>
            </ul>
          </div>
        </section>

        <section className="section">
          <div className="section__header">
            <h2>계산기와 관련 가이드</h2>
          </div>
          <div className="feature-grid">
            <Link className="value-card" href="/severance" style={{ textDecoration: 'none' }}>
              <h3>퇴직금 계산기</h3>
              <p>받아야 할 퇴직금 예상액을 계산합니다.</p>
            </Link>
            <Link className="value-card" href="/guide/severance" style={{ textDecoration: 'none' }}>
              <h3>퇴직금 상여금·연차수당 반영</h3>
              <p>상여금·연차수당이 퇴직금에 반영되는 방법.</p>
            </Link>
            <Link className="value-card" href="/guide/resignation" style={{ textDecoration: 'none' }}>
              <h3>퇴사 전 체크리스트</h3>
              <p>퇴직금 외 퇴사 전 챙겨야 할 항목 전체.</p>
            </Link>
          </div>
        </section>
        <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-3, #94a3b8)', margin: '2rem 0 0' }}>
          마지막 업데이트: 2026-04-03 · 근로자퇴직급여보장법 기준
        </p>
      </main>
    </>
  );
}
