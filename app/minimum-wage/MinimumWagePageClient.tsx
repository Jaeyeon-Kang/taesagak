'use client';
import { useState } from 'react';
import Link from 'next/link';
import { calculateMinimumWage, currency, fmtMoney, parseMoney, type MinimumWageResult } from '@/lib/calculators';
import { RULESET_2026 } from '@/lib/rules';
import ResultEngagement from '@/components/ResultEngagement';
import ShareButtons from '@/components/ShareButtons';
import AnimatedValue from '@/components/AnimatedValue';

export default function MinimumWagePage() {
  const [mwHourly, setMwHourly] = useState('');
  const [mwMonthly, setMwMonthly] = useState('');
  const [mwWeeklyHours, setMwWeeklyHours] = useState('40');
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
    <main id="main-content" className="page-shell">
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
                <input id="mw-hourly" type="text" inputMode="numeric" placeholder="예: 10,000" value={fmtMoney(mwHourly)} onChange={(e) => setMwHourly(parseMoney(e.target.value))} />
                <p style={{ fontSize: '0.8rem', color: 'var(--text-3)', marginTop: '0.25rem' }}>
                  시급을 모르면 비워두세요. 월급으로 자동 역산합니다.
                </p>
              </div>
              <div className="field">
                <label htmlFor="mw-monthly">세전 월급</label>
                <input id="mw-monthly" type="text" inputMode="numeric" placeholder="예: 2,200,000" value={fmtMoney(mwMonthly)} onChange={(e) => setMwMonthly(parseMoney(e.target.value))} />
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
                  {result.effectiveHourly > 0 ? <><AnimatedValue value={result.effectiveHourly} suffix="원" /></> : '-'}
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
            <ShareButtons title="최저임금 계산기 — 2026년 기준" description="내 시급이 최저임금 이상인지 확인한 결과입니다." />
            <div style={{ marginTop: '1rem' }}>
              <ResultEngagement topic="minimum-wage" />
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
              최저임금 미달은 사업주 처벌 대상(3년 이하 징역 또는 2,000만 원 이하 벌금, 최저임금법 제28조)입니다.
              <strong>고용노동부(1350)에 신고</strong>하면 차액을 청구할 수 있습니다.
            </p>
          </article>
        </div>
      </section>

      <section className="section" style={{ maxWidth: '640px', margin: '0 auto' }}>
        <div className="section__header">
          <h2>자주 묻는 질문</h2>
        </div>
        <div className="value-grid">
          <article className="value-card">
            <h3>2026년 최저시급은 얼마인가요?</h3>
            <p>
              2026년 최저임금은 <strong>시급 10,320원</strong>입니다.
              주 40시간, 월 209시간 기준으로 환산하면 월급 약 2,156,880원입니다.
            </p>
          </article>
          <article className="value-card">
            <h3>최저임금에 주휴수당이 포함되나요?</h3>
            <p>
              월급제인 경우 <strong>주휴수당이 월급에 포함</strong>되어 있는 경우가 많습니다.
              최저임금 충족 여부를 판단할 때는 주휴수당을 제외한 기본 시급으로 비교해야 정확합니다.
            </p>
          </article>
          <article className="value-card">
            <h3>최저임금보다 적게 받으면 어떻게 신고하나요?</h3>
            <p>
              최저임금 미달은 <strong>사업주 처벌 대상</strong>(3년 이하 징역 또는 2,000만 원 이하 벌금, 최저임금법 제28조)입니다.
              고용노동부(국번 없이 1350)에 신고하면 차액을 청구할 수 있습니다.
              급여명세서와 근로계약서를 미리 확보해두세요.
            </p>
          </article>
          <article className="value-card">
            <h3>수습 기간에도 최저임금을 받아야 하나요?</h3>
            <p>
              1년 이상 근로계약을 체결한 경우 <strong>수습 3개월 동안은 최저임금의 90%</strong>까지 감액할 수 있습니다.
              단, 단순노무직은 감액이 불가능하며, 1년 미만 계약이면 감액 자체가 적용되지 않습니다.
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
            <h3>주휴수당 계산기</h3>
            <p>시급이나 월급만 입력하면 주휴수당 대상 여부와 월 환산액을 바로 계산합니다.</p>
          </Link>
          <Link className="value-card" href="/severance" style={{ textDecoration: 'none' }}>
            <h3>퇴직금 계산기</h3>
            <p>입사일, 퇴사일, 최근 3개월 급여를 기준으로 법정 퇴직금을 간편하게 추정합니다.</p>
          </Link>
          <Link className="value-card" href="/net-salary" style={{ textDecoration: 'none' }}>
            <h3>실수령액 계산기</h3>
            <p>세전 월급이나 연봉을 넣으면 4대보험과 세금 공제 후 세후 금액을 확인할 수 있습니다.</p>
          </Link>
          <Link className="value-card" href="/calculator" style={{ textDecoration: 'none' }}>
            <h3>통합 계산기</h3>
            <p>퇴직금, 실수령액, 주휴수당, 최저임금 4종을 한 번에 입력하고 결과를 비교할 수 있습니다.</p>
          </Link>
        </div>
      </section>
    </main>
  );
}
