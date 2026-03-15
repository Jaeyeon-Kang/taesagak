import { APP_META, SOURCE_LIST, RULESET_2026 } from './rules.js';
import {
  calculateOverview,
  currency,
  buildShareText,
  computeMonthlyHours,
} from './calculators.js';

const radarHost = document.querySelector('#radar-host');
const form = document.querySelector('#calculator-form');
const resultRoot = document.querySelector('#results');
const summaryCards = document.querySelector('#summary-cards');
const checklistList = document.querySelector('#checklist-list');
const formulaPanels = document.querySelector('#formula-panels');
const sourceList = document.querySelector('#source-list');
const historyList = document.querySelector('#history-list');
const statusNode = document.querySelector('#status-text');
const copyButton = document.querySelector('#copy-summary');
const saveButton = document.querySelector('#save-result');
const resetButton = document.querySelector('#reset-form');
const installButton = document.querySelector('#install-app');
const exportButton = document.querySelector('#export-json');
const grossPreview = document.querySelector('#gross-preview');

const STORAGE_KEY = 'taesagak:v0.1.0:last-input';
const HISTORY_KEY = 'taesagak:v0.1.0:history';

let deferredPrompt = null;
let currentResults = null;
let currentInput = null;
let currentStep = 1;

function getInput() {
  const formData = new FormData(form);
  const salaryType = formData.get('salaryType')?.toString() || 'monthly';
  const monthlySalaryFromYearly =
    salaryType === 'yearly' ? Number(formData.get('monthlySalary') || 0) / 12 : 0;

  return {
    salaryType,
    startDate: formData.get('startDate')?.toString().trim() || '',
    endDate: formData.get('endDate')?.toString().trim() || '',
    hourlyWage: Number(formData.get('hourlyWage') || 0),
    monthlySalary:
      salaryType === 'monthly'
        ? Number(formData.get('monthlySalary') || 0)
        : monthlySalaryFromYearly,
    weeklyHours: Number(formData.get('weeklyHours') || 0),
    workdaysPerWeek: Number(formData.get('workdaysPerWeek') || 0),
    attendanceComplete: formData.get('attendanceComplete') === 'on',
    last3MonthsWageTotal: Number(formData.get('last3MonthsWageTotal') || 0),
    annualBonus: Number(formData.get('annualBonus') || 0),
    annualLeavePayout: Number(formData.get('annualLeavePayout') || 0),
    ordinaryHourlyWage: Number(formData.get('ordinaryHourlyWage') || 0),
    dependents: Number(formData.get('dependents') || 1),
  };
}

function setFormValues(data) {
  Object.entries(data || {}).forEach(([key, value]) => {
    const field = form.elements.namedItem(key);
    if (!field) return;

    if (field instanceof RadioNodeList) {
      field.forEach((radio) => {
        radio.checked = radio.value === value;
      });
      return;
    }
    if (field.type === 'checkbox') {
      field.checked = Boolean(value);
      return;
    }
    field.value = value ?? '';
  });
}

function showStep(step) {
  document.querySelectorAll('.form-step').forEach((el) => {
    el.hidden = Number(el.dataset.step) !== step;
  });
  currentStep = step;
  handleSalaryTypeChange(); // Ensure correct fields are shown on step change
}

function handleSalaryTypeChange() {
  const salaryType = form.elements.salaryType.value;
  const hourlyField = document.querySelector('[data-salary-type="hourly"]');
  const salaryAmountField = document.querySelector('[data-salary-type="monthly yearly"]');

  if (hourlyField) hourlyField.hidden = salaryType !== 'hourly';
  if (salaryAmountField) {
    salaryAmountField.hidden = salaryType === 'hourly';
    const label = salaryAmountField.querySelector('label');
    const input = salaryAmountField.querySelector('input');
    if (label) label.textContent = salaryType === 'yearly' ? '세전 연봉' : '세전 월급';
    if (input) input.placeholder = salaryType === 'yearly' ? '예: 33600000' : '예: 2800000';
  }
}

function formatBooleanBadge(flag, successText, failText) {
  return `
    <span class="pill ${flag ? 'pill--success' : 'pill--warn'}">
      ${flag ? successText : failText}
    </span>
  `;
}

function radarStatus(flag, hasData) {
  if (!hasData) return 'muted';
  return flag ? 'ok' : 'warn';
}

function renderRadar(results) {
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

  radarHost.innerHTML = `
    <section class="panel">
      <div class="panel__head">
        <div>
          <h3>놓친 돈 레이더</h3>
          <p>4개 항목 상태를 한눈에 확인한다.</p>
        </div>
      </div>
      <div class="radar-grid">
        ${items.map((item) => `
          <div class="radar-item radar-item--${item.status}">
            <span class="radar-item__dot" aria-hidden="true"></span>
            <div class="radar-item__content">
              <strong>${item.title}</strong>
              <span class="pill pill--${item.badgeType}" style="font-size:0.75rem;min-height:24px">${item.badge}</span>
              <p>${item.detail}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </section>
  `;
}

function renderSummaryCards(results) {
  const { weeklyHoliday, severance, netSalary, minimumWage } = results;

  summaryCards.innerHTML = `
    <article class="metric-card">
      <div class="metric-card__head">
        <h3>월 주휴수당 추정</h3>
        ${formatBooleanBadge(weeklyHoliday.eligible, '대상 가능성 높음', '대상 아님/불명')}
      </div>
      <p class="metric-card__value">${currency(weeklyHoliday.monthlyHolidayPay)}원</p>
      <p class="metric-card__hint">${weeklyHoliday.reason}</p>
    </article>

    <article class="metric-card">
      <div class="metric-card__head">
        <h3>퇴직금 추정</h3>
        ${formatBooleanBadge(severance.eligible, '요건 충족', '요건 미충족 가능')}
      </div>
      <p class="metric-card__value">${currency(severance.severancePay)}원</p>
      <p class="metric-card__hint">${severance.note}</p>
    </article>

    <article class="metric-card">
      <div class="metric-card__head">
        <h3>월 실수령액 추정</h3>
        <span class="pill pill--muted">간이 추정</span>
      </div>
      <p class="metric-card__value">${currency(netSalary.monthlyNet)}원</p>
      <p class="metric-card__hint">${netSalary.note}</p>
    </article>

    <article class="metric-card">
      <div class="metric-card__head">
        <h3>최저임금 점검</h3>
        ${formatBooleanBadge(minimumWage.compliant, '기준 이상', '미달 가능성')}
      </div>
      <p class="metric-card__value">${
        minimumWage.effectiveHourly > 0
          ? `${currency(minimumWage.effectiveHourly)}원 / 시`
          : '-'
      }</p>
      <p class="metric-card__hint">${minimumWage.note}</p>
    </article>
  `;
}

function renderBreakdown(results) {
  const { netSalary } = results;
  const gross = netSalary.monthlyGross || 1;

  const rows = netSalary.deductions
    .map((item) => {
      const width = Math.min(100, (item.value / gross) * 100);
      return `
        <li class="breakdown-row">
          <div class="breakdown-row__meta">
            <span>${item.label}</span>
            <strong>${currency(item.value)}원</strong>
          </div>
          <div class="bar">
            <span class="bar__fill" style="width:${width}%"></span>
          </div>
        </li>
      `;
    })
    .join('');

  return `
    <section class="panel">
      <div class="panel__head">
        <div>
          <h3>월 세전/세후 구조</h3>
          <p>항목별로 공제 금액을 확인하면 실수령액 차이를 파악할 수 있습니다.</p>
        </div>
        <div class="panel__chip-group">
          <span class="pill pill--muted">세전 ${currency(netSalary.monthlyGross)}원</span>
          <span class="pill pill--success">세후 ${currency(netSalary.monthlyNet)}원</span>
        </div>
      </div>
      <ul class="breakdown-list">
        ${rows || '<li class="empty-line">세전 급여가 없어 공제 내역을 표시할 수 없습니다.</li>'}
      </ul>
    </section>
  `;
}

function renderFormulaPanels(results, input) {
  const { weeklyHoliday, severance, minimumWage, netSalary } = results;
  const { monthlyPaidHours } = computeMonthlyHours(
    input.weeklyHours,
    input.workdaysPerWeek,
    true,
  );

  formulaPanels.innerHTML = `
    <details class="formula-card" open>
      <summary>주휴수당 계산 근거</summary>
      <div class="formula-card__body">
        <p>${weeklyHoliday.formulaText}</p>
        <p>입력 기준 1일 소정근로시간: <strong>${weeklyHoliday.dailyHours.toFixed(2)}시간</strong></p>
        <p>주휴수당(주): <strong>${currency(weeklyHoliday.weeklyHolidayPay)}원</strong></p>
      </div>
    </details>

    <details class="formula-card">
      <summary>퇴직금 계산 근거</summary>
      <div class="formula-card__body">
        <p>${severance.formulaText}</p>
        <ul class="plain-list">
          <li>재직일수: <strong>${currency(severance.employmentDays)}일</strong></li>
          <li>3개월 산정일수(간편): <strong>${currency(severance.threeMonthDays)}일</strong></li>
          <li>1일 평균임금: <strong>${currency(severance.dailyAverageWage)}원</strong></li>
          <li>1일 통상임금: <strong>${currency(severance.dailyOrdinaryWage)}원</strong></li>
          <li>적용 1일 임금: <strong>${currency(severance.appliedDailyWage)}원</strong></li>
        </ul>
      </div>
    </details>

    <details class="formula-card">
      <summary>최저임금 점검 근거</summary>
      <div class="formula-card__body">
        <p>2026년 시간급 최저임금: <strong>${currency(RULESET_2026.minimumWage.hourly)}원</strong></p>
        <p>입력 기준 환산 유급시간: <strong>${monthlyPaidHours.toFixed(2)}시간 / 월</strong></p>
        <p>유효 시급: <strong>${currency(minimumWage.effectiveHourly)}원</strong></p>
        <p>시급 차이: <strong>${currency(minimumWage.hourlyGap)}원</strong></p>
      </div>
    </details>

    <details class="formula-card">
      <summary>세후 추정 계산 근거</summary>
      <div class="formula-card__body">
        <p>${netSalary.grossNote}</p>
        <ul class="plain-list">
          <li>연간 총급여(추정): <strong>${currency(netSalary.annualGross)}원</strong></li>
          <li>과세표준(추정): <strong>${currency(netSalary.estimatedTaxBase)}원</strong></li>
          <li>연 소득세(공제 전): <strong>${currency(netSalary.annualIncomeTaxBeforeCredit)}원</strong></li>
          <li>근로소득세액공제: <strong>${currency(netSalary.earnedIncomeTaxCredit)}원</strong></li>
          <li>연 소득세(추정): <strong>${currency(netSalary.annualIncomeTax)}원</strong></li>
        </ul>
      </div>
    </details>
  `;
}

function renderChecklist(results) {
  checklistList.innerHTML = results.checklist
    .map((item) => `<li>${item}</li>`)
    .join('');
}

function renderSources() {
  sourceList.innerHTML = SOURCE_LIST.map(
    (item) => `
      <li>
        <span class="source-category">${item.category}</span>
        <a href="${item.url}" target="_blank" rel="noreferrer">${item.label}</a>
      </li>
    `,
  ).join('');
}

function persistInput(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function loadPersistedInput() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    setFormValues(parsed);
  } catch (error) {
    console.warn('persist load failed', error);
  }
}

function loadHistory() {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveHistory(snapshot) {
  const history = loadHistory();
  history.unshift(snapshot);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, 5)));
  renderHistory();
}

function renderHistory() {
  const history = loadHistory();
  if (!history.length) {
    historyList.innerHTML = '<li class="history-empty">저장된 계산 내역이 없습니다.</li>';
    return;
  }

  historyList.innerHTML = history
    .map(
      (item, index) => `
        <li class="history-item">
          <div>
            <strong>${item.title}</strong>
            <p>${item.savedAt}</p>
          </div>
          <button type="button" class="text-button" data-history-index="${index}">불러오기</button>
        </li>
      `,
    )
    .join('');
}

function renderStatus(text) {
  statusNode.textContent = text;
}

function renderGrossPreview() {
  const input = getInput();
  const { monthlyPaidHours } = computeMonthlyHours(
    input.weeklyHours,
    input.workdaysPerWeek,
    true,
  );

  if (input.monthlySalary > 0) {
    grossPreview.textContent = `세전 월급 입력값: ${currency(input.monthlySalary)}원`;
    return;
  }

  if (input.hourlyWage > 0 && monthlyPaidHours > 0) {
    const estimated = input.hourlyWage * monthlyPaidHours;
    grossPreview.textContent = `시급 기준 월 환산 급여(주휴 포함 추정): ${currency(estimated)}원`;
    return;
  }

  grossPreview.textContent = '시급 또는 월급을 입력하면 월 환산 급여를 미리 확인할 수 있습니다.';
}

function runCalculation() {
  currentInput = getInput();
  currentResults = calculateOverview(currentInput);
  renderRadar(currentResults);
  renderSummaryCards(currentResults);
  renderChecklist(currentResults);
  renderFormulaPanels(currentResults, currentInput);

  const breakdownHost = document.querySelector('#breakdown-host');
  breakdownHost.innerHTML = renderBreakdown(currentResults);

  resultRoot.hidden = false;
  renderStatus('계산이 완료되었습니다.');
  persistInput(currentInput);
}

function handleCopySummary() {
  if (!currentResults || !currentInput) return;
  const text = buildShareText(currentInput, currentResults);
  navigator.clipboard
    .writeText(text)
    .then(() => renderStatus('요약을 클립보드에 복사했습니다.'))
    .catch(() => renderStatus('클립보드 복사에 실패했습니다. 브라우저 권한 설정을 확인해야 합니다.'));
}

function handleExportJson() {
  if (!currentResults || !currentInput) return;
  const payload = {
    meta: APP_META,
    input: currentInput,
    result: currentResults,
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: 'application/json;charset=utf-8',
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `taesagak-${Date.now()}.json`;
  anchor.click();
  URL.revokeObjectURL(url);
  renderStatus('JSON 파일을 내보냈습니다.');
}

function handleSaveResult() {
  if (!currentResults || !currentInput) {
    renderStatus('계산 결과가 없습니다. 입력 후 결과 보기를 눌러야 저장됩니다.');
    return;
  }

  const title = currentInput.endDate
    ? `${currentInput.endDate} 기준 계산`
    : `계산 ${new Date().toLocaleString('ko-KR')}`;

  saveHistory({
    title,
    savedAt: new Date().toLocaleString('ko-KR'),
    input: currentInput,
  });

  renderStatus('현재 입력값을 저장했습니다.');
}

function installFromHistory(event) {
  const target = event.target.closest('[data-history-index]');
  if (!target) return;
  const history = loadHistory();
  const entry = history[Number(target.dataset.historyIndex)];
  if (!entry) return;
  setFormValues(entry.input);
  renderGrossPreview();
  renderStatus(`${entry.title} 입력값을 불러왔습니다.`);
  runCalculation();
}

function resetAll() {
  form.reset();
  showStep(1);
  renderGrossPreview();
  resultRoot.hidden = true;
  currentResults = null;
  currentInput = null;
  renderStatus('입력을 초기화했습니다.');
}

function wireInstallPrompt() {
  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredPrompt = event;
    installButton.hidden = false;
  });

  installButton.addEventListener('click', async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
    installButton.hidden = true;
  });
}

// Initialize and wire up multi-step form
function initStepForm() {
  form.addEventListener('click', (e) => {
    if (e.target.dataset.action === 'next-step') {
      showStep(currentStep + 1);
    } else if (e.target.dataset.action === 'prev-step') {
      showStep(currentStep - 1);
    }
  });

  form.elements.salaryType.forEach((radio) => {
    radio.addEventListener('change', handleSalaryTypeChange);
  });

  showStep(1);
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  runCalculation();
});

form.addEventListener('input', () => {
  renderGrossPreview();
  persistInput(getInput());
});

copyButton.addEventListener('click', handleCopySummary);
saveButton.addEventListener('click', handleSaveResult);
resetButton.addEventListener('click', resetAll);
exportButton.addEventListener('click', handleExportJson);
historyList.addEventListener('click', installFromHistory);

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-app-version]').forEach((node) => {
    node.textContent = APP_META.version;
  });
  loadPersistedInput();
  renderSources();
  renderHistory();
  renderGrossPreview();
  wireInstallPrompt();
  initStepForm();
  // Remove auto-calculation on load, let user drive it.
  // runCalculation();
});