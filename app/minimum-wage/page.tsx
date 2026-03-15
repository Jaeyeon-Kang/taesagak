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
        <div className="section__header">
          <span className="eyebrow">calculator · 2026 기준</span>
          <h1 className="page-title">2026 최저임금 계산기</h1>
          <p className="page-lead">
            시급 또는 월급을 입력하면 2026년 최저임금(시급 10,320원) 기준 충족 여부를 바로 점검합니다.
            <span className="pill pill--accent" style={{ verticalAlign: 'middle' }}>2026 최저임금 10,320원</span>
          </p>
        </div>

        <div className="panel">
          <div className="panel__head"><div>
            <h2>입력</h2>
            <p>시급 또는 월급 중 하나만 입력해도 된다. 둘 다 있으면 시급을 우선 적용한다.</p>
          </div></div>
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-grid">
              <div className="field">
                <label htmlFor="mw-hourly">시급 (있으면 우선 적용)</label>
                <input
                  id="mw-hourly"
                  type="number"
                  min="0"
                  step="10"
                  placeholder="예: 10000"
                  value={mwHourly}
                  onChange={(e) => setMwHourly(e.target.value)}
                />
              </div>
              <div className="field">
                <label htmlFor="mw-monthly">세전 월급 (시급 없을 때 역산)</label>
                <input
                  id="mw-monthly"
                  type="number"
                  min="0"
                  step="1000"
                  placeholder="예: 2200000"
                  value={mwMonthly}
                  onChange={(e) => setMwMonthly(e.target.value)}
                />
              </div>
              <div className="field">
                <label htmlFor="mw-weekly-hours">주당 근로시간</label>
                <input
                  id="mw-weekly-hours"
                  type="number"
                  min="0"
                  step="0.5"
                  placeholder="예: 40"
                  value={mwWeeklyHours}
                  onChange={(e) => setMwWeeklyHours(e.target.value)}
                />
              </div>
              <div className="field">
                <label htmlFor="mw-workdays">주 근무일수</label>
                <input
                  id="mw-workdays"
                  type="number"
                  min="1"
                  max="7"
                  step="1"
                  value={mwWorkdays}
                  onChange={(e) => setMwWorkdays(e.target.value)}
                />
              </div>
            </div>
            <div className="action-row" style={{ marginTop: '1rem' }}>
              <button type="submit" className="primary-button">최저임금 점검</button>
            </div>
          </form>
        </div>

        {result && (
          <div style={{ marginTop: '1rem' }}>
            <div className="summary-cards">
              <article className="metric-card">
                <div className="metric-card__head">
                  <h3>환산 시급</h3>
                  {result.compliant ? (
                    <span className="pill pill--success">최저임금 이상</span>
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
                  시급 차이: {result.hourlyGap >= 0 ? '+' : ''}{currency(result.hourlyGap)}원
                </p>
              </article>
              {result.monthlyShortfall > 0 && (
                <article className="metric-card">
                  <div className="metric-card__head">
                    <h3>월 부족 추정</h3>
                    <span className="pill pill--warn">미달 금액</span>
                  </div>
                  <p className="metric-card__value">{currency(result.monthlyShortfall)}원</p>
                  <p className="metric-card__hint">유급시간 {result.monthlyPaidHours.toFixed(1)}시간 기준 추정치</p>
                </article>
              )}
            </div>
          </div>
        )}

        <div className="ad-slot" aria-hidden="true">광고</div>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>2026 최저임금 핵심 정보</h2>
        </div>
        <div className="value-grid">
          <article className="value-card">
            <h3>2026년 최저시급</h3>
            <p>
              10,320원. 2025년(10,030원)보다 2.9% 인상됐다.
              주 40시간 기준 월 환산액은 2,156,880원 (월 209시간 기준)이다.
            </p>
          </article>
          <article className="value-card">
            <h3>월급으로 환산하는 법</h3>
            <p>
              시급 × 월 환산 유급시간(주간 근로시간 × 4.345 + 주휴 유급시간).
              주 40시간이면 월 209시간, 주 15시간이면 월 약 86.5시간이다.
            </p>
          </article>
          <article className="value-card">
            <h3>최저임금 산입 범위 주의사항</h3>
            <p>
              식대·교통비 등 비과세 수당 중 일부는 최저임금 산입 범위에 포함된다.
              반면 초과근무수당, 상여금(월 급여의 일정 비율 초과분)은 제외될 수 있다.
            </p>
          </article>
          <article className="value-card">
            <h3>미달 시 할 수 있는 것</h3>
            <p>
              최저임금법 위반은 고용노동부에 진정서를 제출할 수 있다.
              미지급 차액은 청구 가능하며, 사업주는 3년 이하 징역 또는 2천만원 이하 벌금 대상이 될 수 있다.
            </p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>내 급여가 최저임금을 충족하는지 확인하는 순서</h2>
        </div>
        <div className="panel">
          <ol className="plain-list">
            <li>1. 근로계약서에서 기본시급 또는 세전 월급을 확인한다.</li>
            <li>2. 월급이라면 식대·교통비 등 비과세 수당이 포함됐는지 구분한다.</li>
            <li>3. 급여명세서에서 실제 지급 항목과 공제 내역을 대조한다.</li>
            <li>4. 의심스럽다면 고용노동부 최저임금 계산기와 함께 교차 확인한다.</li>
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>다른 계산기도 확인해보세요</h2>
        </div>
        <div className="feature-grid">
          <Link className="value-card" href="/weekly-holiday" style={{ textDecoration: 'none' }}>
            <h3>주휴수당 계산기</h3>
            <p>주 15시간 이상 근무 시 받을 수 있는 주휴수당을 계산한다.</p>
          </Link>
          <Link className="value-card" href="/severance" style={{ textDecoration: 'none' }}>
            <h3>퇴직금 계산기</h3>
            <p>1년 이상 근속 시 받을 수 있는 퇴직금을 계산한다.</p>
          </Link>
          <Link className="value-card" href="/net-salary" style={{ textDecoration: 'none' }}>
            <h3>실수령액 계산기</h3>
            <p>세전 월급에서 4대보험·세금을 빼고 실제로 받는 금액을 계산한다.</p>
          </Link>
          <Link className="value-card" href="/calculator" style={{ textDecoration: 'none' }}>
            <h3>통합 계산기</h3>
            <p>4개 계산을 한 번에 입력하고 결과를 한 화면에서 본다.</p>
          </Link>
        </div>
      </section>
    </main>
  );
}
