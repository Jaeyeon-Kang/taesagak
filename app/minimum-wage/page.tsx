'use client';
import { useState } from 'react';
import Link from 'next/link';
import { calculateMinimumWage, currency, type MinimumWageResult } from '@/lib/calculators';
import { RULESET_2026 } from '@/lib/rules';

export default function MinimumWagePage() {
  const [mwHourly, setMwHourly] = useState('');
  const [mwMonthly, setMwMonthly] = useState('');
  const [mwWeeklyHours, setMwWeeklyHours] = useState('');
  const [mwWorkdays, setMwWorkdays] = useState('5');
  const [result, setResult] = useState<MinimumWageResult | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = calculateMinimumWage({
      hourlyWage: Number(mwHourly || 0),
      monthlySalary: Number(mwMonthly || 0),
      weeklyHours: Number(mwWeeklyHours || 0),
      workdaysPerWeek: Number(mwWorkdays || 5),
    });
    setResult(res);
  };

  return (
    <main className="page-shell">
      <section className="section">
        <div className="section__header" style={{ maxWidth: '640px', margin: '0 auto' }}>
          <h1 className="page-title" style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)' }}>최저임금 계산기</h1>
          <p className="page-lead" style={{ marginTop: '0.5rem' }}>
            시급 또는 월급을 입력하면 2026년 최저임금(10,320원) 충족 여부를 확인할 수 있습니다.
          </p>
        </div>

        <div className="panel" style={{ maxWidth: '640px', margin: '1.5rem auto 0' }}>
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-grid">
              <div className="field">
                <label htmlFor="mw-hourly">시급</label>
                <input id="mw-hourly" type="number" min="0" step="10" placeholder="예: 10000" value={mwHourly} onChange={(e) => setMwHourly(e.target.value)} />
                <p style={{ fontSize: '0.8rem', color: 'var(--text-3)', marginTop: '0.25rem' }}>
                  시급을 모르면 비워두세요. 월급으로 자동 역산합니다.
                </p>
              </div>
              <div className="field">
                <label htmlFor="mw-monthly">세전 월급</label>
                <input id="mw-monthly" type="number" min="0" step="1000" placeholder="예: 2200000" value={mwMonthly} onChange={(e) => setMwMonthly(e.target.value)} />
                <p style={{ fontSize: '0.8rem', color: 'var(--text-3)', marginTop: '0.25rem' }}>
                  급여명세서의 세전 총액 기준입니다.
                </p>
              </div>
              <div className="field">
                <label htmlFor="mw-weekly-hours">주당 근로시간</label>
                <input id="mw-weekly-hours" type="number" min="0" step="0.5" placeholder="예: 40" value={mwWeeklyHours} onChange={(e) => setMwWeeklyHours(e.target.value)} />
              </div>
              <div className="field">
                <label htmlFor="mw-workdays">주 근무일수</label>
                <input id="mw-workdays" type="number" min="1" max="7" step="1" value={mwWorkdays} onChange={(e) => setMwWorkdays(e.target.value)} />
              </div>
            </div>
            <div className="action-row" style={{ marginTop: '1rem' }}>
              <button type="submit" className="primary-button">점검하기</button>
            </div>
          </form>
        </div>

        {result && (
          <div style={{ maxWidth: '640px', margin: '1rem auto 0' }}>
            <div className="summary-cards">
              <article className="metric-card">
                <div className="metric-card__head">
                  <h3>환산 시급</h3>
                  {result.compliant ? (
                    <span className="pill pill--success">충족</span>
                  ) : result.effectiveHourly > 0 ? (
                    <span className="pill pill--warn">미달 가능성</span>
                  ) : (
                    <span className="pill pill--muted">입력값 없음</span>
                  )}
                </div>
                <p className="metric-card__value">
                  {result.effectiveHourly > 0 ? `${currency(result.effectiveHourly)}원` : '-'}
                </p>
                <p className="metric-card__hint">{result.note}</p>
              </article>
              <article className="metric-card">
                <div className="metric-card__head">
                  <h3>2026년 최저시급</h3>
                  <span className="pill pill--muted">기준</span>
                </div>
                <p className="metric-card__value">{currency(RULESET_2026.minimumWage.hourly)}원</p>
                <p className="metric-card__hint">
                  차이: {result.hourlyGap >= 0 ? '+' : ''}{currency(result.hourlyGap)}원
                </p>
              </article>
              {result.monthlyShortfall > 0 && (
                <article className="metric-card">
                  <div className="metric-card__head">
                    <h3>월 부족 추정</h3>
                    <span className="pill pill--warn">미달</span>
                  </div>
                  <p className="metric-card__value">{currency(result.monthlyShortfall)}원</p>
                  <p className="metric-card__hint">유급시간 {result.monthlyPaidHours.toFixed(1)}시간 기준</p>
                </article>
              )}
            </div>
          </div>
        )}
      </section>

      <section className="section" style={{ maxWidth: '640px', margin: '0 auto' }}>
        <div className="section__header">
          <h2>최저임금이 뭔가요?</h2>
        </div>
        <div className="value-grid">
          <article className="value-card">
            <h3>2026년 기준은?</h3>
            <p>
              시급 10,320원, 주 40시간 기준 월급 약 215만원입니다.
              즉, <strong>이 금액보다 적게 받고 있다면 법적으로 문제가 될 수 있습니다.</strong>
            </p>
          </article>
          <article className="value-card">
            <h3>미달이면 어떻게 하나요?</h3>
            <p>
              최저임금 미달은 사업주 처벌 대상(3년 이하 징역 또는 2천만원 이하 벌금)입니다.
              <strong>고용노동부(1350)에 신고</strong>하면 차액을 청구할 수 있습니다.
            </p>
          </article>
        </div>
      </section>

      <section className="section" style={{ maxWidth: '640px', margin: '0 auto' }}>
        <div className="section__header">
          <h2>다른 계산기</h2>
        </div>
        <div className="feature-grid">
          <Link className="value-card" href="/weekly-holiday" style={{ textDecoration: 'none' }}>
            <h3>주휴수당</h3>
            <p>주휴수당 추정</p>
          </Link>
          <Link className="value-card" href="/severance" style={{ textDecoration: 'none' }}>
            <h3>퇴직금</h3>
            <p>법정 퇴직금 추정</p>
          </Link>
          <Link className="value-card" href="/net-salary" style={{ textDecoration: 'none' }}>
            <h3>실수령액</h3>
            <p>세후 실수령액 계산</p>
          </Link>
          <Link className="value-card" href="/calculator" style={{ textDecoration: 'none' }}>
            <h3>통합 계산기</h3>
            <p>4종 한 번에 계산</p>
          </Link>
        </div>
      </section>
    </main>
  );
}
