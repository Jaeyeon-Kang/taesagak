import { APP_META, SOURCE_LIST, RULESET_2026 } from './rules.js';
import {
  calculateOverview,
  currency,
  round,
  percent,
  buildShareText,
  computeMonthlyHours,
} from './calculators.js';

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

function getInput() {
  const formData = new FormData(form);
  return {
    startDate: formData.get('startDate')?.toString().trim() || '',
    endDate: formData.get('endDate')?.toString().trim() || '',
    hourlyWage: Number(formData.get('hourlyWage') || 0),
    monthlySalary: Number(formData.get('monthlySalary') || 0),
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
    if (field.type === 'checkbox') {
      field.checked = Boolean(value);
      return;
    }
    field.value = value ?? '';
  });
}

function formatBooleanBadge(flag, successText, failText) {
  return `
    <span class="pill ${flag ? 'pill--success' : 'pill--warn'}">
      ${flag ? successText : failText}
    </span>
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
          <p>숫자도 봐야 하지만, 어디서 깎이는지도 봐야 덜 당해. 예, 인간은 자주 안 본다.</p>
        </div>
        <div class="panel__chip-group">
          <span class="pill pill--muted">세전 ${currency(netSalary.monthlyGross)}원</span>
          <span class="pill pill--success">세후 ${currency(netSalary.monthlyNet)}원</span>
        </div>
      </div>
      <ul class="breakdown-list">
        ${rows || '<li class="empty-line">세전 급여가 없어서 공제 내역을 못 그렸어.</li>'}
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
    historyList.innerHTML = '<li class="history-empty">아직 저장된 계산이 없다. 세상은 넓고 저장은 안 되어 있지.</li>';
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

  grossPreview.textContent = '시급 또는 월급을 넣으면 월 환산 급여를 미리 보여준다.';
}

function runCalculation() {
  currentInput = getInput();
  currentResults = calculateOverview(currentInput);
  renderSummaryCards(currentResults);
  renderChecklist(currentResults);
  renderFormulaPanels(currentResults, currentInput);

  const breakdownHost = document.querySelector('#breakdown-host');
  breakdownHost.innerHTML = renderBreakdown(currentResults);

  resultRoot.hidden = false;
  renderStatus('계산 완료. 숫자는 차갑고, 네가 놓친 돈도 꽤 차갑다.');
  persistInput(currentInput);
}

function handleCopySummary() {
  if (!currentResults || !currentInput) return;
  const text = buildShareText(currentInput, currentResults);
  navigator.clipboard
    .writeText(text)
    .then(() => renderStatus('요약을 클립보드에 복사했어. 이제 어디 붙여넣을지는 네 자유지.'))
    .catch(() => renderStatus('클립보드 복사에 실패했어. 브라우저 권한을 봐.'));
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
  renderStatus('JSON으로 내보냈어.');
}

function handleSaveResult() {
  if (!currentResults || !currentInput) {
    renderStatus('먼저 계산부터 해. 빈 파일을 저장하는 취미는 별로 권하지 않아.');
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

  renderStatus('현재 입력값을 저장했어.');
}

function installFromHistory(event) {
  const target = event.target.closest('[data-history-index]');
  if (!target) return;
  const history = loadHistory();
  const entry = history[Number(target.dataset.historyIndex)];
  if (!entry) return;
  setFormValues(entry.input);
  renderGrossPreview();
  renderStatus(`${entry.title} 입력값을 불러왔어.`);
  runCalculation();
}

function resetAll() {
  form.reset();
  renderGrossPreview();
  resultRoot.hidden = true;
  currentResults = null;
  currentInput = null;
  renderStatus('입력을 초기화했어.');
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
  runCalculation();
});
