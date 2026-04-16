'use client';
import { useState } from 'react';
import Link from 'next/link';
import { calculateNetSalaryEstimate, currency, fmtMoney, parseMoney, type NetSalaryResult } from '@/lib/calculators';
import ResultEngagement from '@/components/ResultEngagement';
import ShareButtons from '@/components/ShareButtons';
import AnimatedValue from '@/components/AnimatedValue';

export default function NetSalaryPage() {
  const [nsType, setNsType] = useState<'monthly' | 'yearly'>('monthly');
  const [nsSalary, setNsSalary] = useState('');
  const [nsDependents, setNsDependents] = useState('1');
  const [result, setResult] = useState<NetSalaryResult | null>(null);

  const salaryLabel = nsType === 'yearly' ? '세전 연봉' : '세전 월급';
  const salaryPlaceholder = nsType === 'yearly' ? '예: 33,600,000' : '예: 2,800,000';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const rawValue = Number(nsSalary || 0);
    const res = calculateNetSalaryEstimate(
      {
        salaryType: nsType,
        monthlySalary: nsType === 'yearly' ? rawValue / 12 : rawValue,
        hourlyWage: 0,
        weeklyHours: 0,
        workdaysPerWeek: 5,
        dependents: Number(nsDependents || 1),
      },
      null,
    );
    setResult(res);
  };

  return (
    <main id="main-content" className="page-shell">
      <section className="section">
        <div className="section__header" style={{ maxWidth: '640px', margin: '0 auto' }}>
          <h1 className="page-title" style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)' }}>실수령액 계산기</h1>
          <p className="page-lead" style={{ marginTop: '0.5rem' }}>
            세전 월급 또는 연봉을 입력하면 4대보험·세금 공제 후 실수령액을 확인할 수 있습니다.
          </p>
        </div>

        <div className="panel" style={{ maxWidth: '640px', margin: '1.5rem auto 0' }}>
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-grid">
              <div className="field field--wide">
                <fieldset className="fieldset" style={{ border: 'none', padding: '0', margin: '0' }}>
                  <legend style={{ fontSize: '0.875rem', color: 'var(--text-2)', marginBottom: '0.5rem' }}>급여 유형</legend>
                  <div className="choice-group">
                    <label className="choice-button">
                      <input type="radio" name="ns-type" value="monthly" checked={nsType === 'monthly'} onChange={() => setNsType('monthly')} />
                      <span>월급제</span>
                    </label>
                    <label className="choice-button">
                      <input type="radio" name="ns-type" value="yearly" checked={nsType === 'yearly'} onChange={() => setNsType('yearly')} />
                      <span>연봉제</span>
                    </label>
                  </div>
                </fieldset>
              </div>
              <div className="field">
                <label htmlFor="ns-salary">{salaryLabel}</label>
                <input id="ns-salary" type="text" inputMode="numeric" placeholder={salaryPlaceholder} value={fmtMoney(nsSalary)} onChange={(e) => setNsSalary(parseMoney(e.target.value))} />
              </div>
              <div className="field">
                <label htmlFor="ns-dependents">공제대상 가족 수 (본인 포함)</label>
                <input id="ns-dependents" type="number" min="1" max="10" step="1" value={nsDependents} onChange={(e) => setNsDependents(e.target.value)} />
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
                  <h3>세전 월급</h3>
                  <span className="pill pill--muted">입력값</span>
                </div>
                <p className="metric-card__value">{currency(result.monthlyGross)}원</p>
              </article>
              <article className="metric-card">
                <div className="metric-card__head">
                  <h3>세후 실수령액</h3>
                  <span className="pill pill--accent">간이 추정</span>
                </div>
                <p className="metric-card__value"><AnimatedValue value={result.monthlyNet} suffix="원" /></p>
                <p className="metric-card__hint">{result.note}</p>
              </article>
            </div>
            <div className="panel" style={{ marginTop: '1rem' }}>
              <div className="panel__head">
                <div>
                  <h3>공제 항목</h3>
                  <p>{result.grossNote}</p>
                </div>
              </div>
              <ul className="breakdown-list">
                {result.deductions.map((item) => {
                  const width = Math.min(100, (item.value / (result.monthlyGross || 1)) * 100);
                  return (
                    <li key={item.key} className="breakdown-row">
                      <div className="breakdown-row__meta">
                        <span>{item.label}</span>
                        <strong>{currency(item.value)}원</strong>
                      </div>
                      <div className="bar"><span className="bar__fill" style={{ width: `${width}%` }}></span></div>
                    </li>
                  );
                })}
              </ul>
            </div>
            <ShareButtons title="실수령액 계산기 — 2026년 기준" description="세전 급여에서 4대보험·소득세 공제 후 실수령액을 계산한 결과입니다." />
            <div style={{ marginTop: '1rem' }}>
              <ResultEngagement topic="net-salary" />
            </div>
          </div>
        )}
      </section>

      <section className="section" style={{ maxWidth: '640px', margin: '0 auto' }}>
        <div className="section__header">
          <h2>실수령액이 뭔가요?</h2>
        </div>
        <div className="value-grid">
          <article className="value-card">
            <h3>왜 월급이 줄어드나요?</h3>
            <p>
              세전 월급에서 국민연금·건강보험·고용보험·소득세 등이 자동으로 빠집니다.
              즉, <strong>통장에 실제로 들어오는 돈은 계약서 금액보다 항상 적습니다.</strong>
            </p>
          </article>
          <article className="value-card">
            <h3>어디서 확인하나요?</h3>
            <p>
              급여명세서의 &lsquo;공제 내역&rsquo;과 &lsquo;실지급액&rsquo; 항목에서 확인할 수 있습니다.
              <strong>급여명세서를 받지 못하고 있다면 회사에 요청할 권리</strong>가 있습니다.
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
            <h3>연봉 3000만원이면 실수령액은 얼마인가요?</h3>
            <p>
              연봉 3,000만원 기준 월 세전 약 250만원에서 4대보험과 소득세를 공제하면
              <strong>실수령액은 약 220~225만원</strong> 수준입니다.
              부양가족 수에 따라 소득세가 달라지므로 위 계산기에서 직접 확인해보세요.
            </p>
          </article>
          <article className="value-card">
            <h3>4대보험이 월급에서 얼마나 빠지나요?</h3>
            <p>
              2026년 기준 근로자 부담분은 <strong>국민연금 4.75%, 건강보험 3.595%, 장기요양보험(건보의 13.14%), 고용보험 0.9%</strong>입니다.
              월급 250만원이면 약 23만원 정도가 4대보험으로 공제됩니다.
            </p>
          </article>
          <article className="value-card">
            <h3>연봉 4000만원이면 월 실수령액은요?</h3>
            <p>
              월 세전 약 333만원에서 공제 후 <strong>실수령액은 약 290~295만원</strong> 수준입니다.
              연봉이 올라갈수록 소득세 비중이 커져 공제 금액도 함께 늘어납니다.
            </p>
          </article>
          <article className="value-card">
            <h3>월급 200만원이면 실수령액은 얼마인가요?</h3>
            <p>
              월 200만원 기준으로 4대보험과 소득세를 공제하면
              <strong>실수령액은 약 180~183만원</strong> 수준입니다.
              부양가족이 있으면 소득세가 줄어 실수령액이 약간 올라갑니다.
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
