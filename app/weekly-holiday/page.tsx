'use client';
import { useState } from 'react';
import Link from 'next/link';
import { calculateWeeklyHolidayPay, currency, type WeeklyHolidayResult } from '@/lib/calculators';

export default function WeeklyHolidayPage() {
  const [hourlyWage, setHourlyWage] = useState('');
  const [weeklyHours, setWeeklyHours] = useState('');
  const [workdays, setWorkdays] = useState('5');
  const [attendance, setAttendance] = useState(true);
  const [result, setResult] = useState<WeeklyHolidayResult | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = calculateWeeklyHolidayPay({
      hourlyWage: Number(hourlyWage || 0),
      weeklyHours: Number(weeklyHours || 0),
      workdaysPerWeek: Number(workdays || 5),
      attendanceComplete: attendance,
    });
    setResult(res);
  };

  return (
    <main className="page-shell">
      <section className="section">
        <div className="section__header">
          <span className="eyebrow">calculator · 2026 기준</span>
          <h1 className="page-title">2026 주휴수당 계산기</h1>
          <p className="page-lead">
            시급과 주당 근로시간을 입력하면 주휴수당 대상 여부와 월 추정액을 바로 보여줍니다.
            <span className="pill pill--accent" style={{ verticalAlign: 'middle' }}>2026 기준</span>
          </p>
        </div>

        <div className="panel">
          <div className="panel__head"><div>
            <h2>입력</h2>
            <p>주 15시간 이상 + 개근이면 주휴수당 대상입니다.</p>
          </div></div>
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-grid">
              <div className="field">
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
              </div>
              <div className="field">
                <label htmlFor="wh-weekly-hours">주당 근로시간</label>
                <input
                  id="wh-weekly-hours"
                  type="number"
                  min="0"
                  step="0.5"
                  placeholder="예: 20"
                  value={weeklyHours}
                  onChange={(e) => setWeeklyHours(e.target.value)}
                />
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
                  <span>해당 주 개근으로 간주 (개근 미충족 시 주휴수당 0원)</span>
                </label>
              </div>
            </div>
            <div className="action-row" style={{ marginTop: '1rem' }}>
              <button type="submit" className="primary-button">주휴수당 계산</button>
            </div>
          </form>
        </div>

        {result && (
          <div style={{ marginTop: '1rem' }}>
            <div className="summary-cards">
              <article className="metric-card">
                <div className="metric-card__head">
                  <h3>주 주휴수당</h3>
                  <span className={`pill pill--${result.eligible ? 'success' : 'warn'}`}>
                    {result.eligible ? '대상 가능성 높음' : '대상 아님 / 불명'}
                  </span>
                </div>
                <p className="metric-card__value">{currency(result.weeklyHolidayPay)}원</p>
                <p className="metric-card__hint">1일 소정근로시간({result.dailyHours.toFixed(2)}시간) × 시급 기준</p>
              </article>
              <article className="metric-card">
                <div className="metric-card__head">
                  <h3>월 주휴수당 (×4.345주)</h3>
                  <span className={`pill pill--${result.eligible ? 'success' : 'warn'}`}>
                    {result.eligible ? '대상 가능성 높음' : '대상 아님 / 불명'}
                  </span>
                </div>
                <p className="metric-card__value">{currency(result.monthlyHolidayPay)}원</p>
                <p className="metric-card__hint">{result.reason}</p>
              </article>
            </div>
            <div className="panel" style={{ marginTop: '1rem' }}>
              <div className="panel__head"><div>
                <h3>계산 근거</h3>
                <p>{result.formulaText}</p>
              </div></div>
              <ul className="plain-list">
                <li>입력 시급: <strong>{currency(result.weeklyHolidayPay && result.dailyHours > 0 ? result.weeklyHolidayPay / result.dailyHours : 0)}원</strong></li>
                <li>주 근로시간: <strong>{result.weeklyHours}시간</strong></li>
                <li>1일 소정근로시간: <strong>{result.dailyHours.toFixed(2)}시간</strong></li>
              </ul>
            </div>
          </div>
        )}

        <div className="ad-slot" aria-hidden="true">광고</div>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>주휴수당이란?</h2>
          <p>지급 조건과 계산 방법을 정리했습니다.</p>
        </div>
        <div className="value-grid">
          <article className="value-card">
            <h3>지급 조건</h3>
            <p>
              1주 소정근로시간이 15시간 이상이고, 해당 주 소정 근로일을 개근한 경우
              다음 주 1일분의 유급 휴일을 받을 권리가 생긴다.
            </p>
          </article>
          <article className="value-card">
            <h3>계산 방법</h3>
            <p>
              1일 소정근로시간(= 주간 근로시간 ÷ 주 근무일수) × 시급.
              월 환산은 주당 주휴수당 × 4.345주(월 평균 주수)로 계산한다.
            </p>
          </article>
          <article className="value-card">
            <h3>자주 놓치는 포인트</h3>
            <p>
              월급제라도 주휴수당이 별도 항목으로 지급되지 않으면 급여명세서에서
              주휴수당 반영 여부는 회사에 서면으로 확인하는 것이 좋습니다.
            </p>
          </article>
          <article className="value-card">
            <h3>2026년 최저임금 기준</h3>
            <p>
              2026년 최저시급은 10,320원이다. 주 15시간 이상이라면
              1일 주휴수당 최소 기준은 시급 × 1일 소정근로시간이다.
            </p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>급여명세서에서 확인할 것</h2>
        </div>
        <div className="panel">
          <ul className="plain-list">
            <li>주휴수당이 기본급에 포함돼 있는지, 별도 항목으로 표기됐는지 확인한다.</li>
            <li>최근 4주 출근기록이 있으면 개근 판단에 쓸 수 있다.</li>
            <li>주휴수당이 명세서에 없다면 회사에 서면으로 지급 근거를 요청할 수 있다.</li>
            <li>미지급 시 고용노동부 임금체불 신고 대상이 될 수 있다.</li>
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>다른 계산기도 확인해보세요</h2>
        </div>
        <div className="feature-grid">
          <Link className="value-card" href="/severance" style={{ textDecoration: 'none' }}>
            <h3>퇴직금 계산기</h3>
            <p>1년 이상 근속 시 받을 수 있는 퇴직금을 계산한다.</p>
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
