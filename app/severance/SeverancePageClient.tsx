'use client';
import { useState } from 'react';
import Link from 'next/link';
import { calculateSeverance, currency, type SeveranceResult } from '@/lib/calculators';
import ResultEngagement from '@/components/ResultEngagement';
import ShareButtons from '@/components/ShareButtons';
import AnimatedValue from '@/components/AnimatedValue';

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
    <main id="main-content" className="page-shell">
      <section className="section">
        <div className="section__header" style={{ maxWidth: '640px', margin: '0 auto' }}>
          <h1 className="page-title" style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)' }}>퇴직금 계산기</h1>
          <p className="page-lead" style={{ marginTop: '0.5rem' }}>
            입사일·퇴사일·최근 3개월 급여를 입력하면 법정 퇴직금 추정액을 확인할 수 있습니다.
          </p>
        </div>

        <div className="panel" style={{ maxWidth: '640px', margin: '1.5rem auto 0' }}>
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-grid">
              <div className="field">
                <label htmlFor="sv-start">입사일</label>
                <input id="sv-start" type="date" value={svStart} onChange={(e) => setSvStart(e.target.value)} />
                <p style={{ fontSize: '0.8rem', color: 'var(--text-3)', marginTop: '0.25rem' }}>
                  근로계약서 또는 첫 출근일 기준. 수습 기간도 포함됩니다.
                </p>
              </div>
              <div className="field">
                <label htmlFor="sv-end">퇴사일 / 기준일</label>
                <input id="sv-end" type="date" value={svEnd} onChange={(e) => setSvEnd(e.target.value)} />
              </div>
              <div className="field">
                <label htmlFor="sv-weekly-hours">주당 근로시간</label>
                <input id="sv-weekly-hours" type="number" min="0" step="0.5" placeholder="예: 40" value={svWeeklyHours} onChange={(e) => setSvWeeklyHours(e.target.value)} />
                <p style={{ fontSize: '0.8rem', color: 'var(--text-3)', marginTop: '0.25rem' }}>
                  근로계약서에 명시되어 있습니다. 풀타임은 보통 40시간입니다.
                </p>
              </div>
              <div className="field">
                <label htmlFor="sv-workdays">주 근무일수</label>
                <input id="sv-workdays" type="number" min="1" max="7" step="1" value={svWorkdays} onChange={(e) => setSvWorkdays(e.target.value)} />
              </div>
              <div className="field">
                <label htmlFor="sv-last3">최근 3개월 급여 총액</label>
                <input id="sv-last3" type="number" min="0" step="1000" placeholder="예: 8400000" value={svLast3} onChange={(e) => setSvLast3(e.target.value)} />
                <p style={{ fontSize: '0.8rem', color: 'var(--text-3)', marginTop: '0.25rem' }}>
                  최근 3개월치 급여명세서의 세전 총액을 합산하세요.
                </p>
              </div>
              <div className="field">
                <label htmlFor="sv-bonus">연간 상여금 (선택)</label>
                <input id="sv-bonus" type="number" min="0" step="1000" placeholder="예: 2000000" value={svBonus} onChange={(e) => setSvBonus(e.target.value)} />
              </div>
              <div className="field">
                <label htmlFor="sv-leave">연간 연차수당 (선택)</label>
                <input id="sv-leave" type="number" min="0" step="1000" placeholder="예: 600000" value={svLeave} onChange={(e) => setSvLeave(e.target.value)} />
              </div>
              <div className="field">
                <label htmlFor="sv-ordinary">통상시급 (선택)</label>
                <input id="sv-ordinary" type="number" min="0" step="10" placeholder="예: 13000" value={svOrdinary} onChange={(e) => setSvOrdinary(e.target.value)} />
              </div>
            </div>
            <div className="action-row" style={{ marginTop: '1rem' }}>
              <button type="submit" className="primary-button">계산하기</button>
            </div>
          </form>
        </div>

        {result && (
          <div style={{ maxWidth: '640px', margin: '1rem auto 0' }}>
            <div className="summary-cards">
              <article className="metric-card">
                <div className="metric-card__head">
                  <h3>퇴직금 추정</h3>
                  <span className={`pill pill--${result.eligible ? 'success' : 'warn'}`}>
                    {result.eligible ? '요건 충족' : '요건 미충족'}
                  </span>
                </div>
                <p className="metric-card__value"><AnimatedValue value={result.severancePay} suffix="원" /></p>
                <p className="metric-card__hint">{result.note}</p>
              </article>
              <article className="metric-card">
                <div className="metric-card__head"><h3>재직일수</h3></div>
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
                <li>적용 1일 임금: <strong>{currency(result.appliedDailyWage)}원</strong></li>
              </ul>
            </div>
            <ShareButtons title="퇴직금 계산기 — 2026년 기준" description="입사일·퇴사일·급여 기반으로 법정 퇴직금을 추정한 결과입니다." />
            <div style={{ marginTop: '1rem' }}>
              <ResultEngagement topic="severance" />
            </div>
          </div>
        )}
      </section>

      <section className="section" style={{ maxWidth: '640px', margin: '0 auto' }}>
        <div className="section__header">
          <h2>퇴직금이 뭔가요?</h2>
        </div>
        <div className="value-grid">
          <article className="value-card">
            <h3>누가 받나요?</h3>
            <p>
              같은 회사에서 1년 이상, 주 평균 15시간 이상 일한 사람이라면 누구나 받을 수 있습니다.
              즉, <strong>정규직·계약직·알바 구분 없이 1년만 넘기면 퇴직금이 발생</strong>한다는 뜻입니다.
            </p>
          </article>
          <article className="value-card">
            <h3>얼마나 받나요?</h3>
            <p>
              대략 1년에 한 달치 월급 정도입니다.
              즉, <strong>3년 일했으면 약 3개월치 월급을 퇴직할 때 한꺼번에 받는 구조</strong>라는 뜻입니다.
            </p>
          </article>
          <article className="value-card">
            <h3>어디서 확인하나요?</h3>
            <p>
              입사일은 근로계약서, 최근 급여는 급여명세서에서 확인할 수 있습니다.
              <strong>수습 기간도 근속 기간에 포함</strong>되니 첫 출근일 기준으로 계산하세요.
            </p>
          </article>
          <article className="value-card">
            <h3>안 주면 어떻게 하나요?</h3>
            <p>
              퇴직금은 퇴사 후 14일 이내 지급이 원칙입니다.
              늦어지면 <strong>연 20% 지연이자가 발생</strong>하며, 고용노동부(1350)에 신고할 수 있습니다.
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
            <h3>1년 미만 근무하면 퇴직금을 못 받나요?</h3>
            <p>
              네, 퇴직금은 <strong>같은 사업장에서 1년 이상 근무</strong>해야 받을 수 있습니다.
              다만 입사일 기준이므로 수습 기간도 포함됩니다.
              1년이 며칠 안 남았다면 퇴사일을 조정하는 것이 유리할 수 있습니다.
            </p>
          </article>
          <article className="value-card">
            <h3>퇴직금에 세금이 붙나요?</h3>
            <p>
              퇴직금에는 <strong>퇴직소득세</strong>가 부과됩니다.
              다만 근속연수에 따라 공제가 크기 때문에 일반 소득세보다 세율이 낮습니다.
              IRP 계좌로 받으면 퇴직소득세를 이연할 수 있습니다.
            </p>
          </article>
          <article className="value-card">
            <h3>퇴직금 지급기한은 언제인가요?</h3>
            <p>
              퇴사일로부터 <strong>14일 이내</strong>에 지급해야 합니다.
              기한을 넘기면 연 20%의 지연이자가 발생하며, 고용노동부에 신고할 수 있습니다.
            </p>
          </article>
          <article className="value-card">
            <h3>퇴직금에 상여금이 포함되나요?</h3>
            <p>
              정기 상여금은 <strong>평균임금 산정 시 포함</strong>됩니다.
              최근 3개월 급여만 입력하면 금액이 적게 나올 수 있으니,
              연간 상여금 총액의 3/12를 함께 반영해야 정확합니다.
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
