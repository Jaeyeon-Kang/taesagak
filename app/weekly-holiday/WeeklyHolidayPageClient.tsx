'use client';
import { useState } from 'react';
import Link from 'next/link';
import { calculateWeeklyHolidayPay, currency, type WeeklyHolidayResult } from '@/lib/calculators';
import ResultEngagement from '@/components/ResultEngagement';

export default function WeeklyHolidayPage() {
  const [inputMode, setInputMode] = useState<'hourly' | 'monthly'>('monthly');
  const [hourlyWage, setHourlyWage] = useState('');
  const [monthlySalary, setMonthlySalary] = useState('');
  const [weeklyHours, setWeeklyHours] = useState('40');
  const [workdays, setWorkdays] = useState('5');
  const [attendance, setAttendance] = useState(true);
  const [result, setResult] = useState<WeeklyHolidayResult | null>(null);
  const [derivedHourly, setDerivedHourly] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let effectiveHourly = Number(hourlyWage || 0);

    if (inputMode === 'monthly') {
      const monthly = Number(monthlySalary || 0);
      const wh = Number(weeklyHours || 0);
      const wd = Number(workdays || 5);
      const weeklyPaidHours = wh + (wh / wd);
      const monthlyPaidHours = weeklyPaidHours * 4.345;
      effectiveHourly = monthlyPaidHours > 0 ? Math.round(monthly / monthlyPaidHours) : 0;
      setDerivedHourly(effectiveHourly);
    } else {
      setDerivedHourly(null);
    }

    const res = calculateWeeklyHolidayPay({
      hourlyWage: effectiveHourly,
      weeklyHours: Number(weeklyHours || 0),
      workdaysPerWeek: Number(workdays || 5),
      attendanceComplete: attendance,
    });
    setResult(res);
  };

  return (
    <main className="page-shell">
      <section className="section">
        <div className="section__header" style={{ maxWidth: '640px', margin: '0 auto' }}>
          <h1 className="page-title" style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)' }}>주휴수당 계산기</h1>
          <p className="page-lead" style={{ marginTop: '0.5rem' }}>
            시급 또는 월급을 입력하면 주휴수당 대상 여부와 월 추정액을 확인할 수 있습니다.
          </p>
        </div>

        <div className="panel" style={{ maxWidth: '640px', margin: '1.5rem auto 0' }}>
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-grid">
              <div className="field field--wide">
                <fieldset className="fieldset" style={{ border: 'none', padding: '0', margin: '0' }}>
                  <legend style={{ fontSize: '0.875rem', color: 'var(--text-2)', marginBottom: '0.5rem' }}>급여 입력 방식</legend>
                  <div className="choice-group">
                    <label className="choice-button">
                      <input type="radio" name="input-mode" value="monthly" checked={inputMode === 'monthly'} onChange={() => setInputMode('monthly')} />
                      <span>월급으로 입력</span>
                    </label>
                    <label className="choice-button">
                      <input type="radio" name="input-mode" value="hourly" checked={inputMode === 'hourly'} onChange={() => setInputMode('hourly')} />
                      <span>시급으로 입력</span>
                    </label>
                  </div>
                </fieldset>
              </div>

              {inputMode === 'hourly' ? (
                <div className="field field--wide">
                  <label htmlFor="wh-hourly">시급</label>
                  <input
                    id="wh-hourly"
                    type="number"
                    min="0"
                    step="10"
                    placeholder="예: 10320"
                    value={hourlyWage}
                    onChange={(e) => setHourlyWage(e.target.value)}
                  />
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-3)', marginTop: '0.25rem' }}>
                    근로계약서 또는 급여명세서에서 확인할 수 있습니다.
                  </p>
                </div>
              ) : (
                <div className="field field--wide">
                  <label htmlFor="wh-monthly">세전 월급</label>
                  <input
                    id="wh-monthly"
                    type="number"
                    min="0"
                    step="10000"
                    placeholder="예: 2800000"
                    value={monthlySalary}
                    onChange={(e) => setMonthlySalary(e.target.value)}
                  />
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-3)', marginTop: '0.25rem' }}>
                    급여명세서의 &lsquo;지급 총액&rsquo;에서 확인할 수 있습니다. 시급은 자동으로 역산됩니다.
                  </p>
                </div>
              )}

              <div className="field">
                <label htmlFor="wh-weekly-hours">주당 근로시간</label>
                <input
                  id="wh-weekly-hours"
                  type="number"
                  min="0"
                  step="0.5"
                  placeholder="예: 40"
                  value={weeklyHours}
                  onChange={(e) => setWeeklyHours(e.target.value)}
                />
                <p style={{ fontSize: '0.8rem', color: 'var(--text-3)', marginTop: '0.25rem' }}>
                  근로계약서에 명시되어 있습니다. 풀타임은 보통 40시간입니다.
                </p>
              </div>
              <div className="field">
                <label htmlFor="wh-workdays">주 근무일수</label>
                <input
                  id="wh-workdays"
                  type="number"
                  min="1"
                  max="7"
                  step="1"
                  value={workdays}
                  onChange={(e) => setWorkdays(e.target.value)}
                />
              </div>
              <div className="field field--wide">
                <label className="checkbox">
                  <input
                    id="wh-attendance"
                    type="checkbox"
                    checked={attendance}
                    onChange={(e) => setAttendance(e.target.checked)}
                  />
                  <span>이번 주에 결근 없이 출근했습니다</span>
                </label>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-3)', marginTop: '0.25rem' }}>
                  주휴수당은 해당 주에 빠지지 않고 출근해야 받을 수 있습니다. 결근이 있으면 체크를 해제하세요.
                </p>
              </div>
            </div>
            <div className="action-row" style={{ marginTop: '1rem' }}>
              <button type="submit" className="primary-button">계산하기</button>
            </div>
          </form>
        </div>

        {result && (
          <div style={{ maxWidth: '640px', margin: '1rem auto 0' }}>
            {derivedHourly !== null && (
              <div className="note-box" style={{ marginBottom: '1rem' }}>
                입력하신 월급 기준 환산 시급: <strong>{currency(derivedHourly)}원</strong>
              </div>
            )}
            <div className="summary-cards">
              <article className="metric-card">
                <div className="metric-card__head">
                  <h3>주 주휴수당</h3>
                  <span className={`pill pill--${result.eligible ? 'success' : 'warn'}`}>
                    {result.eligible ? '대상' : '비대상'}
                  </span>
                </div>
                <p className="metric-card__value">{currency(result.weeklyHolidayPay)}원</p>
                <p className="metric-card__hint">1일 소정근로시간({result.dailyHours.toFixed(1)}시간) × 시급</p>
              </article>
              <article className="metric-card">
                <div className="metric-card__head">
                  <h3>월 환산 (×4.345주)</h3>
                  <span className={`pill pill--${result.eligible ? 'success' : 'warn'}`}>
                    {result.eligible ? '대상' : '비대상'}
                  </span>
                </div>
                <p className="metric-card__value">{currency(result.monthlyHolidayPay)}원</p>
                <p className="metric-card__hint">{result.reason}</p>
              </article>
            </div>
            <div style={{ marginTop: '1rem' }}>
              <ResultEngagement topic="weekly-holiday" />
            </div>
          </div>
        )}
      </section>

      <section className="section" style={{ maxWidth: '640px', margin: '0 auto' }}>
        <div className="section__header">
          <h2>주휴수당이 뭔가요?</h2>
        </div>
        <div className="value-grid">
          <article className="value-card">
            <h3>누가 받나요?</h3>
            <p>
              일주일에 15시간 이상 일하고, 그 주에 하루도 빠지지 않고 출근했다면 받을 수 있습니다.
              즉, <strong>주 3일 이상 알바라도 조건만 맞으면 받을 수 있는 돈</strong>이라는 뜻입니다.
            </p>
          </article>
          <article className="value-card">
            <h3>얼마나 받나요?</h3>
            <p>
              하루치 일급만큼 추가로 받습니다.
              즉, <strong>일주일에 5일 일하면 5일분 월급에 1일분이 더 얹어지는 구조</strong>라는 뜻입니다.
            </p>
          </article>
          <article className="value-card">
            <h3>어디서 확인하나요?</h3>
            <p>
              급여명세서에 &lsquo;주휴수당&rsquo; 항목이 따로 있거나, 기본급에 포함되어 있을 수 있습니다.
              확실하지 않으면 <strong>회사 인사팀이나 급여 담당자에게 서면으로 확인</strong>하세요.
            </p>
          </article>
          <article className="value-card">
            <h3>안 주면 어떻게 하나요?</h3>
            <p>
              주휴수당 미지급은 임금체불에 해당합니다.
              <strong>고용노동부(국번 없이 1350)에 신고</strong>하거나, 가까운 노동청에 진정서를 제출할 수 있습니다.
            </p>
          </article>
        </div>
      </section>

      <section className="section" style={{ maxWidth: '640px', margin: '0 auto' }}>
        <div className="section__header">
          <h2>다른 계산기</h2>
        </div>
        <div className="feature-grid">
          <Link className="value-card" href="/severance" style={{ textDecoration: 'none' }}>
            <h3>퇴직금 계산기</h3>
            <p>입사일, 퇴사일, 최근 3개월 급여를 기준으로 법정 퇴직금을 간편하게 추정합니다.</p>
          </Link>
          <Link className="value-card" href="/net-salary" style={{ textDecoration: 'none' }}>
            <h3>실수령액 계산기</h3>
            <p>세전 월급이나 연봉을 넣으면 4대보험과 세금 공제 후 세후 금액을 확인할 수 있습니다.</p>
          </Link>
          <Link className="value-card" href="/minimum-wage" style={{ textDecoration: 'none' }}>
            <h3>최저임금 계산기</h3>
            <p>2026년 최저임금 10,320원 기준으로 환산 시급과 월 부족분을 함께 점검합니다.</p>
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
