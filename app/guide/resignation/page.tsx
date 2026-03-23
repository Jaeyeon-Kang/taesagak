import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = buildMetadata({
  title: '퇴사 전 체크리스트 2026',
  description:
    '퇴사 전에 반드시 확인해야 할 체크리스트입니다. 퇴직금, 미지급 급여, 연차수당, 실업급여까지 놓치기 쉬운 돈과 서류를 한 번에 정리했습니다.',
  path: '/guide/resignation',
  keywords: [
    '퇴사 전 체크리스트',
    '퇴사 전 확인할 것',
    '퇴직금 받고 퇴사하는 법',
    '퇴사 후 해야할 것',
    '실업급여 받으려면',
    '퇴사일 언제가 유리',
    '연차수당 퇴사 시 정산',
    '퇴사 통보 기간',
  ],
});

export default function GuideResignationPage() {
  return (
    <>
    <JsonLd data={breadcrumbJsonLd([{ name: '홈', path: '/' }, { name: '퇴사 전 체크리스트', path: '/guide/resignation' }])} />
    <main className="page-shell">
      <section className="section">
        <div className="section__header">
          <span className="eyebrow">guide · 2026</span>
          <h1 className="page-title">퇴사 전 체크리스트</h1>
          <p className="page-lead">
            퇴사 날짜를 정하기 전에 확인해야 할 항목을 정리했습니다.
            타이밍에 따라 퇴직금·연차수당 수령 여부가 달라질 수 있습니다.
          </p>
        </div>

        <div className="panel">
          <div className="panel__head"><div><h2>퇴사 전 필수 확인 항목</h2></div></div>
          <ul className="plain-list">
            <li>☐ 입사일 정확히 확인 (근로계약서 기준, 수습 포함)</li>
            <li>☐ 퇴직금 요건 충족 여부 (1년 이상 + 주 15시간 이상)</li>
            <li>☐ 퇴사일 기준 퇴직금 계산 (1년 미달 시 며칠 더 근무 여부 검토)</li>
            <li>☐ 미사용 연차수당 청구 가능 일수 확인</li>
            <li>☐ 마지막 달 급여 지급일 확인</li>
            <li>☐ 실업급여 수급 요건 확인 (비자발적 퇴사 여부)</li>
            <li>☐ 건강보험 지역가입자 전환 준비</li>
            <li>☐ 퇴직증명서 발급 요청 (필요 시)</li>
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>퇴사 날짜, 며칠 차이가 큰 돈이 된다</h2>
        </div>
        <div className="value-grid">
          <article className="value-card">
            <h3>퇴직금 기준일</h3>
            <p>
              법정 퇴직금은 계속근로 1년 이상부터 발생한다.
              입사일로부터 딱 365일째가 기준이 된다.
              359일 차에 퇴사하면 퇴직금이 0원이다.
            </p>
          </article>
          <article className="value-card">
            <h3>연차수당 발생 시점</h3>
            <p>
              1년 미만 근로자는 월 1개씩 연차가 생긴다.
              1년 이상이면 15개(최대 25개).
              퇴사 전 남은 연차를 다 쓰거나 수당으로 받아야 손해가 없다.
            </p>
          </article>
          <article className="value-card">
            <h3>주휴수당 마지막 주</h3>
            <p>
              마지막 주에 소정 근로일을 개근하면 그 주의 주휴수당도 발생한다.
              퇴사일이 주 중간이라면 그 주 개근 여부도 확인하는 것이 중요합니다.
            </p>
          </article>
          <article className="value-card">
            <h3>실업급여 요건</h3>
            <p>
              고용보험 180일(약 6개월) 이상 가입, 비자발적 이직이어야 한다.
              자발적 퇴사라도 임금체불·직장 내 괴롭힘 등 불가피한 사유라면 수급 가능하다.
            </p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>퇴사 후 받아야 할 돈 목록</h2>
        </div>
        <div className="panel">
          <ul className="plain-list">
            <li><strong>마지막 월급</strong> — 퇴사일 기준 일할 계산. 지급은 통상 다음 월급날.</li>
            <li><strong>퇴직금</strong> — 퇴직 후 14일 이내 지급 원칙 (DC형 연금 가입자는 연금 계좌에서). 지연이자(연 20%) 청구 가능.</li>
            <li><strong>미사용 연차수당</strong> — 퇴직 시 미사용 연차에 대해 통상임금 기준 수당 지급이 원칙.</li>
            <li><strong>실업급여</strong> — 퇴사 후 고용센터에서 수급 신청. 이직확인서 발급 요청 필수.</li>
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>퇴사 후 행정 처리</h2>
        </div>
        <div className="panel">
          <ol className="plain-list">
            <li>퇴사 후 14일 이내 건강보험 지역가입자 전환 신청 (또는 임의계속가입)</li>
            <li>고용보험 수급 신청 (퇴사 다음날부터 가능, 1년 내 신청)</li>
            <li>퇴직금이 미지급됐다면 14일 이후 고용노동부 임금체불 신고</li>
            <li>퇴직소득세는 연금 수령 전까지 이연 가능 (IRP 계좌 활용)</li>
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>지금 바로 계산해보기</h2>
        </div>
        <div className="feature-grid">
          <Link className="value-card" href="/severance" style={{ textDecoration: 'none' }}>
            <h3>퇴직금 계산기</h3>
            <p>입사일·퇴사일 기준 퇴직금을 바로 계산한다.</p>
          </Link>
          <Link className="value-card" href="/weekly-holiday" style={{ textDecoration: 'none' }}>
            <h3>주휴수당 계산기</h3>
            <p>마지막 달 주휴수당까지 챙겼는지 확인한다.</p>
          </Link>
          <Link className="value-card" href="/guide/severance" style={{ textDecoration: 'none' }}>
            <h3>퇴직금·상여금 반영 가이드</h3>
            <p>상여금과 연차수당을 퇴직금에 반영하는 방법을 설명한다.</p>
          </Link>
          <Link className="value-card" href="/calculator" style={{ textDecoration: 'none' }}>
            <h3>통합 계산기</h3>
            <p>퇴직금·주휴수당·실수령액·최저임금을 한 번에 계산한다.</p>
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
