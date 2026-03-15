'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import {
  calculateOverview,
  currency,
  buildShareText,
  computeMonthlyHours,
  type CalculatorInput,
  type OverviewResult,
} from '@/lib/calculators';
import { RULESET_2026, SOURCE_LIST, APP_META } from '@/lib/rules';

const STORAGE_KEY = 'taesagak:v0.1.0:last-input';
const HISTORY_KEY = 'taesagak:v0.1.0:history';

interface HistoryItem {
  title: string;
  savedAt: string;
  input: CalculatorInput;
}

function radarStatus(flag: boolean, hasData: boolean): 'ok' | 'warn' | 'danger' | 'muted' {
  if (!hasData) return 'muted';
  return flag ? 'ok' : 'warn';
}

export default function CalculatorPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [salaryType, setSalaryType] = useState<'hourly' | 'monthly' | 'yearly'>('monthly');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [weeklyHours, setWeeklyHours] = useState('');
  const [workdaysPerWeek, setWorkdaysPerWeek] = useState('5');
  const [hourlyWage, setHourlyWage] = useState('');
  const [monthlySalary, setMonthlySalary] = useState('');
  const [dependents, setDependents] = useState('1');
  const [attendanceComplete, setAttendanceComplete] = useState(true);
  const [last3MonthsWageTotal, setLast3MonthsWageTotal] = useState('');
  const [annualBonus, setAnnualBonus] = useState('');
  const [annualLeavePayout, setAnnualLeavePayout] = useState('');
  const [ordinaryHourlyWage, setOrdinaryHourlyWage] = useState('');
  const [results, setResults] = useState<OverviewResult | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [statusText, setStatusText] = useState('입력값은 브라우저에 자동 저장됩니다. 로그인 없이 사용할 수 있습니다.');
  const [historyList, setHistoryList] = useState<HistoryItem[]>([]);
  const [grossPreview, setGrossPreview] = useState('시급 또는 월급을 입력하면 월 환산 급여를 미리 확인할 수 있습니다.');

  const getInput = useCallback((): CalculatorInput => {
    const rawMonthlySalary = Number(monthlySalary || 0);
    return {
      salaryType,
      startDate,
      endDate,
      hourlyWage: Number(hourlyWage || 0),
      monthlySalary: salaryType === 'yearly' ? rawMonthlySalary / 12 : rawMonthlySalary,
      weeklyHours: Number(weeklyHours || 0),
      workdaysPerWeek: Number(workdaysPerWeek || 0),
      attendanceComplete,
      last3MonthsWageTotal: Number(last3MonthsWageTotal || 0),
      annualBonus: Number(annualBonus || 0),
      annualLeavePayout: Number(annualLeavePayout || 0),
      ordinaryHourlyWage: Number(ordinaryHourlyWage || 0),
      dependents: Number(dependents || 1),
    };
  }, [
    salaryType, startDate, endDate, hourlyWage, monthlySalary,
    weeklyHours, workdaysPerWeek, attendanceComplete,
    last3MonthsWageTotal, annualBonus, annualLeavePayout,
    ordinaryHourlyWage, dependents,
  ]);

  const updateGrossPreview = useCallback(() => {
    const input = getInput();
    const { monthlyPaidHours } = computeMonthlyHours(
      input.weeklyHours ?? 0,
      input.workdaysPerWeek ?? 0,
      true,
    );
    const ms = input.monthlySalary ?? 0;
    const hw = input.hourlyWage ?? 0;
    if (ms > 0) {
      setGrossPreview(`세전 월급 입력값: ${currency(ms)}원`);
    } else if (hw > 0 && monthlyPaidHours > 0) {
      const estimated = hw * monthlyPaidHours;
      setGrossPreview(`시급 기준 월 환산 급여(주휴 포함 추정): ${currency(estimated)}원`);
    } else {
      setGrossPreview('시급 또는 월급을 입력하면 월 환산 급여를 미리 확인할 수 있습니다.');
    }
  }, [getInput]);

  useEffect(() => {
    updateGrossPreview();
  }, [updateGrossPreview]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') as Partial<CalculatorInput & { salaryType: 'hourly' | 'monthly' | 'yearly' }>;
      if (parsed.salaryType) setSalaryType(parsed.salaryType);
      if (parsed.startDate) setStartDate(parsed.startDate);
      if (parsed.endDate) setEndDate(parsed.endDate);
      if (parsed.hourlyWage) setHourlyWage(String(parsed.hourlyWage));
      if (parsed.monthlySalary) setMonthlySalary(String(parsed.monthlySalary));
      if (parsed.weeklyHours) setWeeklyHours(String(parsed.weeklyHours));
      if (parsed.workdaysPerWeek) setWorkdaysPerWeek(String(parsed.workdaysPerWeek));
      if (parsed.dependents) setDependents(String(parsed.dependents));
      if (parsed.attendanceComplete !== undefined) setAttendanceComplete(Boolean(parsed.attendanceComplete));
      if (parsed.last3MonthsWageTotal) setLast3MonthsWageTotal(String(parsed.last3MonthsWageTotal));
      if (parsed.annualBonus) setAnnualBonus(String(parsed.annualBonus));
      if (parsed.annualLeavePayout) setAnnualLeavePayout(String(parsed.annualLeavePayout));
      if (parsed.ordinaryHourlyWage) setOrdinaryHourlyWage(String(parsed.ordinaryHourlyWage));
    } catch {
      // ignore
    }
    try {
      const hist = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]') as HistoryItem[];
      setHistoryList(hist);
    } catch {
      // ignore
    }
  }, []);

  const persistInput = useCallback((input: CalculatorInput) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(input));
  }, []);

  const runCalculation = useCallback(() => {
    const input = getInput();
    const calc = calculateOverview(input);
    setResults(calc);
    setShowResults(true);
    setStatusText('계산이 완료되었습니다.');
    persistInput(input);
  }, [getInput, persistInput]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    runCalculation();
  };

  const handleCopySummary = () => {
    if (!results) return;
    const input = getInput();
    const text = buildShareText(input, results);
    navigator.clipboard
      .writeText(text)
      .then(() => setStatusText('요약을 클립보드에 복사했습니다.'))
      .catch(() => setStatusText('클립보드 복사에 실패했습니다. 브라우저 권한 설정을 확인해야 합니다.'));
  };

  const handleExportJson = () => {
    if (!results) return;
    const input = getInput();
    const payload = { meta: APP_META, input, result: results };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `taesagak-${Date.now()}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
    setStatusText('JSON 파일을 내보냈습니다.');
  };

  const handleSaveResult = () => {
    if (!results) {
      setStatusText('계산 결과가 없습니다. 입력 후 결과 보기를 눌러야 저장됩니다.');
      return;
    }
    const input = getInput();
    const title = input.endDate
      ? `${input.endDate} 기준 계산`
      : `계산 ${new Date().toLocaleString('ko-KR')}`;

    const snapshot: HistoryItem = {
      title,
      savedAt: new Date().toLocaleString('ko-KR'),
      input,
    };

    const newHistory = [snapshot, ...historyList].slice(0, 5);
    setHistoryList(newHistory);
    if (typeof window !== 'undefined') {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
    }
    setStatusText('현재 입력값을 저장했습니다.');
  };

  const handleResetForm = () => {
    setSalaryType('monthly');
    setStartDate('');
    setEndDate('');
    setWeeklyHours('');
    setWorkdaysPerWeek('5');
    setHourlyWage('');
    setMonthlySalary('');
    setDependents('1');
    setAttendanceComplete(true);
    setLast3MonthsWageTotal('');
    setAnnualBonus('');
    setAnnualLeavePayout('');
    setOrdinaryHourlyWage('');
    setCurrentStep(1);
    setResults(null);
    setShowResults(false);
    setStatusText('입력을 초기화했습니다.');
  };

  const loadFromHistory = (entry: HistoryItem) => {
    const inp = entry.input;
    if (inp.salaryType) setSalaryType(inp.salaryType as 'hourly' | 'monthly' | 'yearly');
    if (inp.startDate) setStartDate(inp.startDate);
    if (inp.endDate) setEndDate(inp.endDate);
    if (inp.hourlyWage) setHourlyWage(String(inp.hourlyWage));
    if (inp.monthlySalary) setMonthlySalary(String(inp.monthlySalary));
    if (inp.weeklyHours) setWeeklyHours(String(inp.weeklyHours));
    if (inp.workdaysPerWeek) setWorkdaysPerWeek(String(inp.workdaysPerWeek));
    if (inp.dependents) setDependents(String(inp.dependents));
    if (inp.attendanceComplete !== undefined) setAttendanceComplete(Boolean(inp.attendanceComplete));
    if (inp.last3MonthsWageTotal) setLast3MonthsWageTotal(String(inp.last3MonthsWageTotal));
    if (inp.annualBonus) setAnnualBonus(String(inp.annualBonus));
    if (inp.annualLeavePayout) setAnnualLeavePayout(String(inp.annualLeavePayout));
    if (inp.ordinaryHourlyWage) setOrdinaryHourlyWage(String(inp.ordinaryHourlyWage));
    setStatusText(`${entry.title} 입력값을 불러왔습니다.`);
    setTimeout(() => runCalculation(), 0);
  };

  const monthlySalaryLabel = salaryType === 'yearly' ? '세전 연봉' : '세전 월급';
  const monthlySalaryPlaceholder = salaryType === 'yearly' ? '예: 33600000' : '예: 2800000';

  const renderRadar = () => {
    if (!results) return null;
    const { weeklyHoliday, minimumWage, severance, netSalary } = results;

    const items = [
      {
        title: '최저임금',
        status: minimumWage.effectiveHourly > 0
          ? (minimumWage.compliant ? 'ok' : 'danger')
          : 'muted',
        badge: minimumWage.compliant
          ? '기준 이상'
          : minimumWage.effectiveHourly > 0 ? '미달 가능성' : '입력값 없음',
        badgeType: minimumWage.compliant ? 'success' : minimumWage.effectiveHourly > 0 ? 'danger' : 'muted',
        detail: minimumWage.effectiveHourly > 0
          ? `환산 시급 ${currency(minimumWage.effectiveHourly)}원`
          : '시급 또는 월급을 입력하면 점검된다.',
      },
      {
        title: '주휴수당',
        status: radarStatus(weeklyHoliday.eligible, weeklyHoliday.weeklyHours > 0),
        badge: weeklyHoliday.eligible ? '대상 가능성 높음' : weeklyHoliday.weeklyHours > 0 ? '대상 아님/불명' : '입력값 없음',
        badgeType: weeklyHoliday.eligible ? 'success' : weeklyHoliday.weeklyHours > 0 ? 'warn' : 'muted',
        detail: weeklyHoliday.eligible
          ? `월 ${currency(weeklyHoliday.monthlyHolidayPay)}원 추정`
          : weeklyHoliday.weeklyHours > 0 ? weeklyHoliday.reason : '시급과 근로시간을 입력하면 계산된다.',
      },
      {
        title: '퇴직금',
        status: severance.eligible
          ? 'ok'
          : severance.employmentDays > 300 ? 'warn' : 'muted',
        badge: severance.eligible ? '요건 충족' : severance.employmentDays > 0 ? '요건 미충족 가능' : '날짜 미입력',
        badgeType: severance.eligible ? 'success' : severance.employmentDays > 0 ? 'warn' : 'muted',
        detail: severance.eligible
          ? `추정 ${currency(severance.severancePay)}원`
          : severance.employmentDays > 0 && severance.employmentDays < 365
            ? `1년까지 ${365 - severance.employmentDays}일 남음`
            : '입사일·퇴사일을 입력하면 계산된다.',
      },
      {
        title: '실수령액',
        status: netSalary.monthlyGross > 0 ? 'ok' : 'muted',
        badge: netSalary.monthlyGross > 0 ? '계산됨' : '급여 미입력',
        badgeType: netSalary.monthlyGross > 0 ? 'success' : 'muted',
        detail: netSalary.monthlyNet > 0
          ? `세후 월 ${currency(netSalary.monthlyNet)}원`
          : '시급 또는 월급을 입력하면 추정된다.',
      },
    ];

    return (
      <section className="panel">
        <div className="panel__head">
          <div>
            <h3>놓친 돈 레이더</h3>
            <p>4개 항목 상태를 한눈에 확인한다.</p>
          </div>
        </div>
        <div className="radar-grid">
          {items.map((item) => (
            <div key={item.title} className={`radar-item radar-item--${item.status}`}>
              <span className="radar-item__dot" aria-hidden="true"></span>
              <div className="radar-item__content">
                <strong>{item.title}</strong>
                <span className={`pill pill--${item.badgeType}`} style={{ fontSize: '0.75rem', minHeight: '24px' }}>{item.badge}</span>
                <p>{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };

  const renderSummaryCards = () => {
    if (!results) return null;
    const { weeklyHoliday, severance, netSalary, minimumWage } = results;

    return (
      <div className="summary-cards" id="summary-cards">
        <article className="metric-card">
          <div className="metric-card__head">
            <h3>월 주휴수당 추정</h3>
            <span className={`pill pill--${weeklyHoliday.eligible ? 'success' : 'warn'}`}>
              {weeklyHoliday.eligible ? '대상 가능성 높음' : '대상 아님/불명'}
            </span>
          </div>
          <p className="metric-card__value">{currency(weeklyHoliday.monthlyHolidayPay)}원</p>
          <p className="metric-card__hint">{weeklyHoliday.reason}</p>
        </article>

        <article className="metric-card">
          <div className="metric-card__head">
            <h3>퇴직금 추정</h3>
            <span className={`pill pill--${severance.eligible ? 'success' : 'warn'}`}>
              {severance.eligible ? '요건 충족' : '요건 미충족 가능'}
            </span>
          </div>
          <p className="metric-card__value">{currency(severance.severancePay)}원</p>
          <p className="metric-card__hint">{severance.note}</p>
        </article>

        <article className="metric-card">
          <div className="metric-card__head">
            <h3>월 실수령액 추정</h3>
            <span className="pill pill--muted">간이 추정</span>
          </div>
          <p className="metric-card__value">{currency(netSalary.monthlyNet)}원</p>
          <p className="metric-card__hint">{netSalary.note}</p>
        </article>

        <article className="metric-card">
          <div className="metric-card__head">
            <h3>최저임금 점검</h3>
            <span className={`pill pill--${minimumWage.compliant ? 'success' : 'warn'}`}>
              {minimumWage.compliant ? '기준 이상' : '미달 가능성'}
            </span>
          </div>
          <p className="metric-card__value">
            {minimumWage.effectiveHourly > 0
              ? `${currency(minimumWage.effectiveHourly)}원 / 시`
              : '-'}
          </p>
          <p className="metric-card__hint">{minimumWage.note}</p>
        </article>
      </div>
    );
  };

  const renderBreakdown = () => {
    if (!results) return null;
    const { netSalary } = results;
    const gross = netSalary.monthlyGross || 1;

    return (
      <section className="panel">
        <div className="panel__head">
          <div>
            <h3>월 세전/세후 구조</h3>
            <p>항목별로 공제 금액을 확인하면 실수령액 차이를 파악할 수 있습니다.</p>
          </div>
          <div className="panel__chip-group">
            <span className="pill pill--muted">세전 {currency(netSalary.monthlyGross)}원</span>
            <span className="pill pill--success">세후 {currency(netSalary.monthlyNet)}원</span>
          </div>
        </div>
        <ul className="breakdown-list">
          {netSalary.deductions.length > 0 ? netSalary.deductions.map((item) => {
            const width = Math.min(100, (item.value / gross) * 100);
            return (
              <li key={item.key} className="breakdown-row">
                <div className="breakdown-row__meta">
                  <span>{item.label}</span>
                  <strong>{currency(item.value)}원</strong>
                </div>
                <div className="bar">
                  <span className="bar__fill" style={{ width: `${width}%` }}></span>
                </div>
              </li>
            );
          }) : (
            <li className="empty-line">세전 급여가 없어 공제 내역을 표시할 수 없습니다.</li>
          )}
        </ul>
      </section>
    );
  };

  const renderFormulaPanels = () => {
    if (!results) return null;
    const { weeklyHoliday, severance, minimumWage, netSalary } = results;
    const input = getInput();
    const { monthlyPaidHours } = computeMonthlyHours(
      input.weeklyHours ?? 0,
      input.workdaysPerWeek ?? 0,
      true,
    );

    return (
      <div className="formula-stack">
        <details className="formula-card" open>
          <summary>주휴수당 계산 근거</summary>
          <div className="formula-card__body">
            <p>{weeklyHoliday.formulaText}</p>
            <p>입력 기준 1일 소정근로시간: <strong>{weeklyHoliday.dailyHours.toFixed(2)}시간</strong></p>
            <p>주휴수당(주): <strong>{currency(weeklyHoliday.weeklyHolidayPay)}원</strong></p>
          </div>
        </details>

        <details className="formula-card">
          <summary>퇴직금 계산 근거</summary>
          <div className="formula-card__body">
            <p>{severance.formulaText}</p>
            <ul className="plain-list">
              <li>재직일수: <strong>{currency(severance.employmentDays)}일</strong></li>
              <li>3개월 산정일수(간편): <strong>{currency(severance.threeMonthDays)}일</strong></li>
              <li>1일 평균임금: <strong>{currency(severance.dailyAverageWage)}원</strong></li>
              <li>1일 통상임금: <strong>{currency(severance.dailyOrdinaryWage)}원</strong></li>
              <li>적용 1일 임금: <strong>{currency(severance.appliedDailyWage)}원</strong></li>
            </ul>
          </div>
        </details>

        <details className="formula-card">
          <summary>최저임금 점검 근거</summary>
          <div className="formula-card__body">
            <p>2026년 시간급 최저임금: <strong>{currency(RULESET_2026.minimumWage.hourly)}원</strong></p>
            <p>입력 기준 환산 유급시간: <strong>{monthlyPaidHours.toFixed(2)}시간 / 월</strong></p>
            <p>유효 시급: <strong>{currency(minimumWage.effectiveHourly)}원</strong></p>
            <p>시급 차이: <strong>{currency(minimumWage.hourlyGap)}원</strong></p>
          </div>
        </details>

        <details className="formula-card">
          <summary>세후 추정 계산 근거</summary>
          <div className="formula-card__body">
            <p>{netSalary.grossNote}</p>
            <ul className="plain-list">
              <li>연간 총급여(추정): <strong>{currency(netSalary.annualGross)}원</strong></li>
              <li>과세표준(추정): <strong>{currency(netSalary.estimatedTaxBase ?? 0)}원</strong></li>
              <li>연 소득세(공제 전): <strong>{currency(netSalary.annualIncomeTaxBeforeCredit ?? 0)}원</strong></li>
              <li>근로소득세액공제: <strong>{currency(netSalary.earnedIncomeTaxCredit ?? 0)}원</strong></li>
              <li>연 소득세(추정): <strong>{currency(netSalary.annualIncomeTax ?? 0)}원</strong></li>
            </ul>
          </div>
        </details>
      </div>
    );
  };

  return (
    <main className="page-shell section">
      <div className="section__header">
        <span className="eyebrow">calculator / worker first</span>
        <h1 className="page-title">퇴직금·주휴수당·실수령액·최저임금, 한 번에 계산</h1>
        <p className="page-lead">
          필수 항목만 입력하면 4가지 결과를 한 화면에 확인할 수 있습니다.
          계산 근거와 지금 확인해야 할 항목까지 함께 보여줍니다.
        </p>
      </div>

      <div className="status-banner">
        <p>{statusText}</p>
        <span className="pill pill--accent">2026 기준 룰셋</span>
      </div>

      <section className="app-layout section">
        <aside className="sidebar">
          <section className="panel">
            <div className="panel__head">
              <div>
                <h3>입력 우선순위 가이드</h3>
                <p>정확도를 높이는 항목 순서입니다.</p>
              </div>
            </div>
            <ol className="plain-list">
              <li>1. 입사일 / 퇴사일</li>
              <li>2. 주당 근로시간 / 주 근무일수</li>
              <li>3. 시급 또는 세전 월급</li>
              <li>4. 최근 3개월 급여 총액</li>
              <li>5. 상여금 / 연차수당</li>
            </ol>
            <hr className="divider" />
            <p className="helper-text">{grossPreview}</p>
          </section>

          <section className="panel">
            <div className="panel__head">
              <div>
                <h3>저장된 계산</h3>
                <p>브라우저에 로컬 저장됩니다. 기기를 바꾸면 이어지지 않습니다.</p>
              </div>
            </div>
            <ul className="history-list">
              {historyList.length === 0 ? (
                <li className="history-empty">저장된 계산 내역이 없습니다.</li>
              ) : (
                historyList.map((item, index) => (
                  <li key={index} className="history-item">
                    <div>
                      <strong>{item.title}</strong>
                      <p>{item.savedAt}</p>
                    </div>
                    <button type="button" className="text-button" onClick={() => loadFromHistory(item)}>
                      불러오기
                    </button>
                  </li>
                ))
              )}
            </ul>
          </section>
        </aside>

        <div className="content-stack">
          <section className="panel">
            <div className="panel__head">
              <div>
                <h2>입력</h2>
                <p>모르는 값은 비워도 됩니다. 입력한 만큼 결과가 정확해집니다.</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              {currentStep === 1 && (
                <div className="form-step" data-step="1">
                  <fieldset className="fieldset">
                    <legend>어떤 형태로 급여를 받나요?</legend>
                    <div className="choice-group">
                      <label className="choice-button">
                        <input
                          type="radio"
                          name="salaryType"
                          value="hourly"
                          checked={salaryType === 'hourly'}
                          onChange={() => setSalaryType('hourly')}
                        />
                        <span>시급제</span>
                      </label>
                      <label className="choice-button">
                        <input
                          type="radio"
                          name="salaryType"
                          value="monthly"
                          checked={salaryType === 'monthly'}
                          onChange={() => setSalaryType('monthly')}
                        />
                        <span>월급제</span>
                      </label>
                      <label className="choice-button">
                        <input
                          type="radio"
                          name="salaryType"
                          value="yearly"
                          checked={salaryType === 'yearly'}
                          onChange={() => setSalaryType('yearly')}
                        />
                        <span>연봉제</span>
                      </label>
                    </div>
                  </fieldset>
                  <div className="action-row">
                    <button type="button" className="primary-button" onClick={() => setCurrentStep(2)}>다음</button>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="form-step" data-step="2">
                  <fieldset className="fieldset">
                    <legend>근무 기간과 시간을 알려주세요.</legend>
                    <div className="form-grid">
                      <div className="field">
                        <label htmlFor="startDate">입사일</label>
                        <input
                          id="startDate"
                          name="startDate"
                          type="date"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                        />
                      </div>
                      <div className="field">
                        <label htmlFor="endDate">퇴사일 / 계산 기준일</label>
                        <input
                          id="endDate"
                          name="endDate"
                          type="date"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                        />
                      </div>
                      <div className="field">
                        <label htmlFor="weeklyHours">주당 근로시간</label>
                        <input
                          id="weeklyHours"
                          name="weeklyHours"
                          type="number"
                          min="0"
                          step="0.5"
                          placeholder="예: 20"
                          value={weeklyHours}
                          onChange={(e) => setWeeklyHours(e.target.value)}
                        />
                      </div>
                      <div className="field">
                        <label htmlFor="workdaysPerWeek">주 근무일수</label>
                        <input
                          id="workdaysPerWeek"
                          name="workdaysPerWeek"
                          type="number"
                          min="1"
                          max="7"
                          step="1"
                          value={workdaysPerWeek}
                          onChange={(e) => setWorkdaysPerWeek(e.target.value)}
                        />
                      </div>
                    </div>
                  </fieldset>
                  <div className="action-row">
                    <button type="button" className="secondary-button" onClick={() => setCurrentStep(1)}>이전</button>
                    <button type="button" className="primary-button" onClick={() => setCurrentStep(3)}>다음</button>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="form-step" data-step="3">
                  <fieldset className="fieldset">
                    <legend>급여는 얼마인가요?</legend>
                    <div className="form-grid">
                      {salaryType === 'hourly' && (
                        <div className="field">
                          <label htmlFor="hourlyWage">시급</label>
                          <input
                            id="hourlyWage"
                            name="hourlyWage"
                            type="number"
                            min="0"
                            step="10"
                            placeholder="예: 11000"
                            value={hourlyWage}
                            onChange={(e) => setHourlyWage(e.target.value)}
                          />
                        </div>
                      )}
                      {salaryType !== 'hourly' && (
                        <div className="field">
                          <label htmlFor="monthlySalary">{monthlySalaryLabel}</label>
                          <input
                            id="monthlySalary"
                            name="monthlySalary"
                            type="number"
                            min="0"
                            step="1000"
                            placeholder={monthlySalaryPlaceholder}
                            value={monthlySalary}
                            onChange={(e) => setMonthlySalary(e.target.value)}
                          />
                        </div>
                      )}
                      <div className="field">
                        <label htmlFor="dependents">공제대상 가족 수</label>
                        <input
                          id="dependents"
                          name="dependents"
                          type="number"
                          min="1"
                          max="10"
                          step="1"
                          value={dependents}
                          onChange={(e) => setDependents(e.target.value)}
                        />
                      </div>
                      <div className="field field--wide">
                        <label className="checkbox">
                          <input
                            id="attendanceComplete"
                            name="attendanceComplete"
                            type="checkbox"
                            checked={attendanceComplete}
                            onChange={(e) => setAttendanceComplete(e.target.checked)}
                          />
                          <span>주휴수당 계산 시 &ldquo;해당 주 개근&rdquo;으로 간주</span>
                        </label>
                      </div>
                    </div>
                  </fieldset>
                  <div className="action-row">
                    <button type="button" className="secondary-button" onClick={() => setCurrentStep(2)}>이전</button>
                    <button type="button" className="primary-button" onClick={() => setCurrentStep(4)}>다음 (퇴직금)</button>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="form-step" data-step="4">
                  <fieldset className="fieldset">
                    <legend>퇴직금 정확도를 높이려면 알려주세요. (선택)</legend>
                    <div className="form-grid">
                      <div className="field">
                        <label htmlFor="last3MonthsWageTotal">최근 3개월 급여 총액</label>
                        <input
                          id="last3MonthsWageTotal"
                          name="last3MonthsWageTotal"
                          type="number"
                          min="0"
                          step="1000"
                          placeholder="예: 8400000"
                          value={last3MonthsWageTotal}
                          onChange={(e) => setLast3MonthsWageTotal(e.target.value)}
                        />
                      </div>
                      <div className="field">
                        <label htmlFor="annualBonus">연간 상여금 총액</label>
                        <input
                          id="annualBonus"
                          name="annualBonus"
                          type="number"
                          min="0"
                          step="1000"
                          placeholder="예: 2000000"
                          value={annualBonus}
                          onChange={(e) => setAnnualBonus(e.target.value)}
                        />
                      </div>
                      <div className="field">
                        <label htmlFor="annualLeavePayout">연간 연차수당 총액</label>
                        <input
                          id="annualLeavePayout"
                          name="annualLeavePayout"
                          type="number"
                          min="0"
                          step="1000"
                          placeholder="예: 600000"
                          value={annualLeavePayout}
                          onChange={(e) => setAnnualLeavePayout(e.target.value)}
                        />
                      </div>
                      <div className="field">
                        <label htmlFor="ordinaryHourlyWage">통상시급</label>
                        <input
                          id="ordinaryHourlyWage"
                          name="ordinaryHourlyWage"
                          type="number"
                          min="0"
                          step="10"
                          placeholder="퇴직금 정확도 보강용"
                          value={ordinaryHourlyWage}
                          onChange={(e) => setOrdinaryHourlyWage(e.target.value)}
                        />
                      </div>
                    </div>
                  </fieldset>
                  <div className="action-row">
                    <button type="button" className="secondary-button" onClick={() => setCurrentStep(3)}>이전</button>
                    <button type="submit" className="primary-button">결과 보기</button>
                  </div>
                </div>
              )}

              <div className="action-row" style={{ marginTop: '1rem' }}>
                <button className="secondary-button" type="button" onClick={handleSaveResult}>현재 입력 저장</button>
                <button className="secondary-button" type="button" onClick={handleCopySummary}>요약 복사</button>
                <button className="secondary-button" type="button" onClick={handleExportJson}>JSON 내보내기</button>
                <button className="ghost-button" type="button" onClick={handleResetForm}>초기화</button>
              </div>
            </form>
          </section>

          {showResults && results && (
            <section className="section">
              <div className="section__header">
                <h2>결과</h2>
                <p>
                  정보 제공용 간이 계산 결과입니다. 실제 지급액은 근로계약서, 급여명세서, 비과세 처리, 회사 내규에 따라 달라질 수 있습니다.
                </p>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                {renderRadar()}
              </div>

              {renderSummaryCards()}

              <div style={{ marginTop: '1rem' }}>
                {renderBreakdown()}
              </div>

              <section className="panel" style={{ marginTop: '1rem' }}>
                <div className="panel__head">
                  <div>
                    <h3>지금 확인할 것</h3>
                    <p>결과를 바탕으로 지금 확인해야 할 항목을 정리했습니다.</p>
                  </div>
                </div>
                <ul className="checklist">
                  {results.checklist.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </section>

              <section className="panel" style={{ marginTop: '1rem' }}>
                <div className="panel__head">
                  <div>
                    <h3>계산 근거</h3>
                    <p>각 항목의 계산 공식과 적용 전제를 볼 수 있습니다.</p>
                  </div>
                </div>
                {renderFormulaPanels()}
              </section>

              <section className="panel" style={{ marginTop: '1rem' }}>
                <div className="panel__head">
                  <div>
                    <h3>공식 출처</h3>
                    <p>계산에 적용된 법령과 기준의 출처 링크를 모았습니다.</p>
                  </div>
                </div>
                <ul className="source-list">
                  {SOURCE_LIST.map((item) => (
                    <li key={item.url}>
                      <span className="source-category">{item.category}</span>
                      <a href={item.url} target="_blank" rel="noreferrer">{item.label}</a>
                    </li>
                  ))}
                </ul>
              </section>
            </section>
          )}
        </div>
      </section>
    </main>
  );
}
