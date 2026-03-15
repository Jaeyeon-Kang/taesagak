'use client';
import { useState } from 'react';
import Link from 'next/link';
import { calculateNetSalaryEstimate, currency, type NetSalaryResult } from '@/lib/calculators';

export default function NetSalaryPage() {
  const [nsType, setNsType] = useState<'monthly' | 'yearly'>('monthly');
  const [nsSalary, setNsSalary] = useState('');
  const [nsDependents, setNsDependents] = useState('1');
  const [result, setResult] = useState<NetSalaryResult | null>(null);

  const salaryLabel = nsType === 'yearly' ? '세전 연봉' : '세전 월급';
  const salaryPlaceholder = nsType === 'yearly' ? '예: 33600000' : '예: 2800000';

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
    <main className="page-shell">
      <section className="section">
        <div className="section__header">
          <span className="eyebrow">calculator · 2026 기준</span>
          <h1 className="page-title">2026 실수령액 계산기</h1>
          <p className="page-lead">
            세전 월급 또는 연봉을 입력하면 4대보험과 세금을 공제한 실수령액을 바로 계산합니다.
            <span className="pill pill--accent" style={{ verticalAlign: 'middle' }}>2026 기준</span>
          </p>
        </div>

        <div className="panel">
          <div className="panel__head"><div>
            <h2>입력</h2>
            <p>비과세 항목이 없는 기본 급여 기준의 간이 추정치입니다.</p>
          </div></div>
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-grid">
              <div className="field field--wide">
                <fieldset className="fieldset" style={{ border: 'none', padding: '0', margin: '0' }}>
                  <legend style={{ fontSize: '0.875rem', color: 'var(--text-2)', marginBottom: '0.5rem' }}>급여 유형</legend>
                  <div className="choice-group">
                    <label className="choice-button">
                      <input
                        type="radio"
                        name="ns-type"
                        value="monthly"
                        checked={nsType === 'monthly'}
                        onChange={() => setNsType('monthly')}
                      />
                      <span>월급제</span>
                    </label>
                    <label className="choice-button">
                      <input
                        type="radio"
                        name="ns-type"
                        value="yearly"
                        checked={nsType === 'yearly'}
                        onChange={() => setNsType('yearly')}
                      />
                      <span>연봉제</span>
                    </label>
                  </div>
                </fieldset>
              </div>
              <div className="field">
                <label htmlFor="ns-salary">{salaryLabel}</label>
                <input
                  id="ns-salary"
                  type="number"
                  min="0"
                  step="1000"
                  placeholder={salaryPlaceholder}
                  value={nsSalary}
                  onChange={(e) => setNsSalary(e.target.value)}
                />
              </div>
              <div className="field">
                <label htmlFor="ns-dependents">공제대상 가족 수 (본인 포함)</label>
                <input
                  id="ns-dependents"
                  type="number"
                  min="1"
                  max="10"
                  step="1"
                  value={nsDependents}
                  onChange={(e) => setNsDependents(e.target.value)}
                />
              </div>
            </div>
            <div className="action-row" style={{ marginTop: '1rem' }}>
              <button type="submit" className="primary-button">실수령액 계산</button>
            </div>
          </form>
        </div>

        {result && (
          <div style={{ marginTop: '1rem' }}>
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
                <p className="metric-card__value">{currency(result.monthlyNet)}원</p>
                <p className="metric-card__hint">{result.note}</p>
              </article>
            </div>
            <div className="panel" style={{ marginTop: '1rem' }}>
              <div className="panel__head">
                <div>
                  <h3>공제 항목</h3>
                  <p>{result.grossNote}</p>
                </div>
                <div className="panel__chip-group">
                  <span className="pill pill--muted">세전 {currency(result.monthlyGross)}원</span>
                  <span className="pill pill--success">세후 {currency(result.monthlyNet)}원</span>
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
          </div>
        )}

        <div className="ad-slot" aria-hidden="true">광고</div>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>2026 공제 항목 한눈에 보기</h2>
        </div>
        <div className="value-grid">
          <article className="value-card">
            <h3>국민연금 (4.5%)</h3>
            <p>
              근로자 부담율 4.5%. 상한 기준 월 보수 6,370,000원 적용(2025.7~2026.6 기준).
              상한 초과분은 연금 보험료가 더 올라가지 않는다.
            </p>
          </article>
          <article className="value-card">
            <h3>건강보험 (3.545%) + 장기요양 (0.4724%)</h3>
            <p>
              건강보험 근로자 부담율 3.545%. 장기요양보험료는 건강보험료의 12.95%로
              별도 공제된다. 합산하면 약 3.99~4.0% 수준이다.
            </p>
          </article>
          <article className="value-card">
            <h3>고용보험 (0.9%)</h3>
            <p>
              근로자 부담율 0.9%. 실직 시 실업급여 수령의 기반이 되는 보험입니다.
              급여명세서에서 고용보험 가입 여부를 반드시 확인할 필요가 있습니다.
            </p>
          </article>
          <article className="value-card">
            <h3>소득세 · 지방소득세</h3>
            <p>
              근로소득 간이세액표 기준으로 추정한다. 비과세 항목, 공제 내역에 따라
              실제 원천징수액과 차이가 날 수 있다. 연말정산으로 정산된다.
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
            <li>식대, 차량유지비 등 비과세 항목은 최저임금 산입 범위에서 제외된다.</li>
            <li>국민연금·건강보험 공제액이 이 계산기 결과와 다르다면 비과세 처리 방식 차이일 가능성이 높다.</li>
            <li>부양가족 수가 많을수록 소득세 공제액이 커져 실수령액이 올라간다.</li>
            <li>연봉 계약이라면 연봉 ÷ 12가 세전 월급입니다. 상여금 포함 여부도 계약서에서 살펴볼 필요가 있습니다.</li>
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
          <Link className="value-card" href="/severance" style={{ textDecoration: 'none' }}>
            <h3>퇴직금 계산기</h3>
            <p>1년 이상 근속 시 받을 수 있는 퇴직금을 계산한다.</p>
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
