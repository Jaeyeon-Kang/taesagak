import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '퇴사각 — 퇴사 전에 챙길 건, 멘탈이 아니라 돈입니다',
};

export default function HomePage() {
  return (
    <main className="page-shell">
      <section className="hero">
        <div className="hero__panel">
          <h1 className="hero__title">퇴사 전에 챙길 건,<br />멘탈이 아니라 <span className="hero__highlight">돈</span>입니다.</h1>
          <p className="hero__description">
            퇴직금, 주휴수당, 실수령액, 최저임금. 복잡한 계산은 기계한테 맡기고,
            당장 확인해야 할 서류와 받아내야 할 돈만 한눈에 파악하세요.
          </p>
          <div className="hero__actions">
            <Link className="button button--primary" href="/calculator">통합 계산기 열기</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="feature-grid">
          <Link className="value-card" href="/weekly-holiday" style={{ textDecoration: 'none' }}>
            <div className="value-card__icon" style={{ background: '#e8f5e9', color: '#2e7d32', border: 'none' }}>주</div>
            <h3>주휴수당</h3>
            <p>시급·주당 근로시간만 입력. 대상 여부와 월 환산액을 바로 계산.</p>
          </Link>
          <Link className="value-card" href="/severance" style={{ textDecoration: 'none' }}>
            <div className="value-card__icon" style={{ background: '#e3f2fd', color: '#1565c0', border: 'none' }}>퇴</div>
            <h3>퇴직금</h3>
            <p>입사일·퇴사일·최근 3개월 급여로 법정 퇴직금 추정.</p>
          </Link>
          <Link className="value-card" href="/net-salary" style={{ textDecoration: 'none' }}>
            <div className="value-card__icon" style={{ background: '#fff3e0', color: '#e65100', border: 'none' }}>실</div>
            <h3>실수령액</h3>
            <p>세전 월급에서 4대보험·세금을 빼고 실제 수령액 계산.</p>
          </Link>
          <Link className="value-card" href="/minimum-wage" style={{ textDecoration: 'none' }}>
            <div className="value-card__icon" style={{ background: '#fce4ec', color: '#c62828', border: 'none' }}>최</div>
            <h3>최저임금</h3>
            <p>2026년 기준(10,320원) 미달 여부 점검.</p>
          </Link>
        </div>
      </section>
    </main>
  );
}
