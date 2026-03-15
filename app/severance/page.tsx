'use client';
import { useState } from 'react';
import Link from 'next/link';
import { calculateSeverance, currency, type SeveranceResult } from '@/lib/calculators';

export default function SeverancePage() {
  const [svStart, setSvStart] = useState('');
  const [svEnd, setSvEnd] = useState('');
  const [svWeeklyHours, setSvWeeklyHours] = useState('40');
  const [svWorkdays, setSvWorkdays] = useState('5');
  const [svLast3, setSvLast3] = useState('');
  const [svBonus, setSvBonus] = useState('');
  const [svLeave, setSvLeave] = useState('');
  const [svOrdinary, setSvOrdinary] = useState('');
  const [result, setResult] = useState<SeveranceResult | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = calculateSeverance({
      startDate: svStart,
      endDate: svEnd,
      weeklyHours: Number(svWeeklyHours || 40),
      workdaysPerWeek: Number(svWorkdays || 5),
      last3MonthsWageTotal: Number(svLast3 || 0),
      annualBonus: Number(svBonus || 0),
      annualLeavePayout: Number(svLeave || 0),
      ordinaryHourlyWage: Number(svOrdinary || 0),
    });
    setResult(res);
  };

  return (
    <main className="page-shell">
      <section className="section">
        <div className="section__header">
          <span className="eyebrow">calculator · 2026 기준</span>
          <h1 className="page-title">2026 퇴직금 계산기</h1>
          <p className="page-lead">
            입사일·퇴사일·최근 3개월 급여를 입력하면 법정 퇴직금 추정액을 바로 계산합니다.
            <span className="pill pill--accent" style={{ verticalAlign: 'middle' }}>2026 기준</span>
          </p>
        </div>

        <div className="panel">
          <div className="panel__head"><div>
            <h2>입력</h2>
            <p>1년 이상 근속 + 주 평균 15시간 이상이어야 법정 퇴직금 대상입니다.</p>
          </div></div>
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-grid">
              <div className="field">
                <label htmlFor="sv-start">입사일</label>
                <input id="sv-start" type="date" value={svStart} onChange={(e) => setSvStart(e.target.value)} />
              </div>
              <div className="field">
                <label htmlFor="sv-end">퇴사일 / 계산 기준일</label>
                <input id="sv-end" type="date" value={svEnd} onChange={(e) => setSvEnd(e.target.value)} />
              </div>
              <div className="field">
                <label htmlFor="sv-weekly-hours">주당 근로시간</label>
                <input
                  id="sv-weekly-hours"
                  type="number"
                  min="0"
                  step="0.5"
                  placeholder="예: 40"
                  value={svWeeklyHours}
                  onChange={(e) => setSvWeeklyHours(e.target.value)}
                />
              </div>
              <div className="field">
                <label htmlFor="sv-workdays">주 근무일수</label>
                <input
                  id="sv-workdays"
                  type="number"
                  min="1"
                  max="7"
                  step="1"
                  value={svWorkdays}
                  onChange={(e) => setSvWorkdays(e.target.value)}
                />
              </div>
              <div className="field">
                <label htmlFor="sv-last3">최근 3개월 급여 총액</label>
                <input
                  id="sv-last3"
                  type="number"
                  min="0"
                  step="1000"
                  placeholder="예: 8400000"
                  value={svLast3}
                  onChange={(e) => setSvLast3(e.target.value)}
                />
              </div>
              <div className="field">
                <label htmlFor="sv-bonus">연간 상여금 총액 (선택)</label>
                <input
                  id="sv-bonus"
                  type="number"
                  min="0"
                  step="1000"
                  placeholder="예: 2000000"
                  value={svBonus}
                  onChange={(e) => setSvBonus(e.target.value)}
                />
              </div>
              <div className="field">
                <label htmlFor="sv-leave">연간 연차수당 총액 (선택)</label>
                <input
                  id="sv-leave"
                  type="number"
                  min="0"
                  step="1000"
                  placeholder="예: 600000"
                  value={svLeave}
                  onChange={(e) => setSvLeave(e.target.value)}
                />
              </div>
              <div className="field">
                <label htmlFor="sv-ordinary">통상시급 (선택 · 정확도 보강)</label>
                <input
                  id="sv-ordinary"
                  type="number"
                  min="0"
                  step="10"
                  placeholder="예: 13000"
                  value={svOrdinary}
                  onChange={(e) => setSvOrdinary(e.target.value)}
                />
              </div>
            </div>
            <div className="action-row" style={{ marginTop: '1rem' }}>
              <button type="submit" className="primary-button">퇴직금 계산</button>
            </div>
          </form>
        </div>

        {result && (
          <div style={{ marginTop: '1rem' }}>
            <div className="summary-cards">
              <article className="metric-card">
                <div className="metric-card__head">
                  <h3>퇴직금 추정</h3>
                  <span className={`pill pill--${result.eligible ? 'success' : 'warn'}`}>
                    {result.eligible ? '요건 충족' : '요건 미충족 가능'}
                  </span>
                </div>
                <p className="metric-card__value">{currency(result.severancePay)}원</p>
                <p className="metric-card__hint">{result.note}</p>
              </article>
              <article className="metric-card">
                <div className="metric-card__head">
                  <h3>재직일수</h3>
                </div>
                <p className="metric-card__value">{currency(result.employmentDays)}일</p>
                <p className="metric-card__hint">1일 적용 임금: {currency(result.appliedDailyWage)}원</p>
              </article>
            </div>
            <div className="panel" style={{ marginTop: '1rem' }}>
              <div className="panel__head"><div>
                <h3>계산 근거</h3>
                <p>{result.formulaText}</p>
              </div></div>
              <ul className="plain-list">
                <li>재직일수: <strong>{currency(result.employmentDays)}일</strong></li>
                <li>3개월 산정일수: <strong>{result.threeMonthDays}일</strong></li>
                <li>1일 평균임금: <strong>{currency(result.dailyAverageWage)}원</strong></li>
                <li>1일 통상임금: <strong>{currency(result.dailyOrdinaryWage)}원</strong></li>
                <li>적용 1일 임금 (큰 값): <strong>{currency(result.appliedDailyWage)}원</strong></li>
              </ul>
            </div>
          </div>
        )}

        <div className="ad-slot" aria-hidden="true">광고</div>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>퇴직금 지급 조건과 계산 방법</h2>
        </div>
        <div className="value-grid">
          <article className="value-card">
            <h3>지급 조건</h3>
            <p>
              계속근로기간 1년 이상, 주 평균 소정근로시간 15시간 이상인 근로자에게
              퇴직 시 법정 퇴직금을 지급해야 한다. 1년 미만이면 법정 퇴직금은 0원이다.
            </p>
          </article>
          <article className="value-card">
            <h3>계산 공식</h3>
            <p>
              max(1일 평균임금, 1일 통상임금) × 30 × (재직일수 ÷ 365).
              평균임금은 최근 3개월 총 임금(상여금·연차수당 일할 포함)을 3개월 일수로 나눈 값이다.
            </p>
          </article>
          <article className="value-card">
            <h3>퇴사 날짜가 중요한 이유</h3>
            <p>
              재직일수가 365일 미만이면 법정 퇴직금은 0원이다.
              퇴사일을 며칠 늦추면 1년을 채워 퇴직금을 받을 수 있는 경우가 있다.
              계산 전에 입사일이 정확한지 먼저 확인하는 것이 중요합니다.
            </p>
          </article>
          <article className="value-card">
            <h3>상여금·연차수당 챙기는 법</h3>
            <p>
              연간 상여금과 연차수당은 재직기간 3개월에 해당하는 비율로 평균임금에 산입된다.
              급여명세서에 상여금 지급 내역이 있다면 반드시 포함해 계산해야 정확하다.
            </p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>퇴직금 받기 전 확인할 것</h2>
        </div>
        <div className="panel">
          <ul className="plain-list">
            <li>입사일은 근로계약서 또는 첫 출근일 기준이다. 수습 기간도 근속에 포함된다.</li>
            <li>최근 3개월 급여명세서를 모아두면 정확도가 올라간다.</li>
            <li>퇴직금은 퇴사 후 14일 이내 지급이 원칙이다. 지연 시 지연이자(연 20%)가 발생할 수 있다.</li>
            <li>DC형 퇴직연금 가입자는 회사가 아닌 연금 계좌에서 직접 수령한다.</li>
          </ul>
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
          <Link className="value-card" href="/net-salary" style={{ textDecoration: 'none' }}>
            <h3>실수령액 계산기</h3>
            <p>세전 월급에서 4대보험·세금을 빼고 실제로 받는 금액을 계산한다.</p>
          </Link>
          <Link className="value-card" href="/minimum-wage" style={{ textDecoration: 'none' }}>
            <h3>최저임금 계산기</h3>
            <p>2026년 최저임금(10,320원) 기준으로 미달 여부를 점검한다.</p>
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
