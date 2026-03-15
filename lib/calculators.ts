import { RULESET_2026 } from '@/lib/rules';

const DAYS = {
  WEEK_TO_MONTH: 4.345,
  YEAR: 365,
};

export interface CalculatorInput {
  salaryType?: string;
  startDate?: string;
  endDate?: string;
  hourlyWage?: number;
  monthlySalary?: number;
  weeklyHours?: number;
  workdaysPerWeek?: number;
  attendanceComplete?: boolean;
  last3MonthsWageTotal?: number;
  annualBonus?: number;
  annualLeavePayout?: number;
  ordinaryHourlyWage?: number;
  dependents?: number;
}

export interface MonthlyHoursResult {
  monthlyWorkHours: number;
  monthlyHolidayHours: number;
  monthlyPaidHours: number;
  dailyHours: number;
}

export interface WeeklyHolidayResult {
  eligible: boolean;
  weeklyHours: number;
  workdaysPerWeek: number;
  dailyHours: number;
  weeklyHolidayPay: number;
  monthlyHolidayPay: number;
  reason: string;
  formulaText: string;
}

export interface MinimumWageResult {
  compliant: boolean;
  minimumWage: number;
  effectiveHourly: number;
  hourlyGap: number;
  monthlyShortfall: number;
  monthlyPaidHours: number;
  dailyHours: number;
  note: string;
}

export interface DeductionItem {
  key: string;
  label: string;
  value: number;
}

export interface NetSalaryResult {
  monthlyGross: number;
  monthlyNet: number;
  annualGross: number;
  annualIncomeTax?: number;
  annualIncomeTaxBeforeCredit?: number;
  earnedIncomeTaxCredit?: number;
  estimatedTaxBase?: number;
  deductions: DeductionItem[];
  note: string;
  estimated: boolean;
  grossMode?: string;
  grossNote?: string;
}

export interface SeveranceResult {
  eligible: boolean;
  employmentDays: number;
  threeMonthDays: number;
  dailyHours: number;
  averageWageBase: number;
  dailyAverageWage: number;
  dailyOrdinaryWage: number;
  appliedDailyWage: number;
  severancePay: number;
  note: string;
  formulaText: string;
}

export interface OverviewResult {
  weeklyHoliday: WeeklyHolidayResult;
  minimumWage: MinimumWageResult;
  severance: SeveranceResult;
  netSalary: NetSalaryResult;
  checklist: string[];
  summary: {
    monthlyHolidayPay: number;
    severancePay: number;
    monthlyNet: number;
    monthlyGross: number;
    minimumWageCompliant: boolean;
  };
}

export function round(value: number | string): number {
  return Math.round(Number(value) || 0);
}

export function floor10(value: number | string): number {
  return Math.floor((Number(value) || 0) / 10) * 10;
}

export function clampMin(value: number | string | undefined, min = 0): number {
  return Math.max(min, Number(value) || 0);
}

export function toDate(value: string | undefined | null): Date | null {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function diffDaysInclusive(start: Date | null, end: Date | null): number {
  if (!start || !end) return 0;
  const startDate = new Date(start.getFullYear(), start.getMonth(), start.getDate());
  const endDate = new Date(end.getFullYear(), end.getMonth(), end.getDate());
  return Math.max(0, Math.floor((endDate.getTime() - startDate.getTime()) / 86400000) + 1);
}

export function subMonthsSafe(date: Date | null, months: number): Date | null {
  if (!date) return null;
  const copy = new Date(date);
  const targetMonth = copy.getMonth() - months;
  const target = new Date(copy.getFullYear(), targetMonth, copy.getDate());
  if (target.getMonth() !== ((targetMonth % 12) + 12) % 12) {
    target.setDate(0);
  }
  return target;
}

export function currency(value: number | string): string {
  return new Intl.NumberFormat('ko-KR').format(round(value as number));
}

export function percent(value: number | string | undefined, digits = 1): string {
  return `${(Number(value || 0) * 100).toFixed(digits)}%`;
}

export function computeDailyHours(weeklyHours: number, workdaysPerWeek: number): number {
  const hours = clampMin(weeklyHours);
  const days = clampMin(workdaysPerWeek);
  if (!hours || !days) return 0;
  return hours / days;
}

export function computeMonthlyHours(
  weeklyHours: number,
  workdaysPerWeek: number,
  includeWeeklyHoliday = true,
): MonthlyHoursResult {
  const weekly = clampMin(weeklyHours);
  const daily = computeDailyHours(weeklyHours, workdaysPerWeek);
  const monthlyWorkHours = weekly * DAYS.WEEK_TO_MONTH;
  const monthlyHolidayHours =
    includeWeeklyHoliday && weekly >= RULESET_2026.weeklyHoliday.minimumWeeklyHours
      ? daily * DAYS.WEEK_TO_MONTH
      : 0;
  return {
    monthlyWorkHours,
    monthlyHolidayHours,
    monthlyPaidHours: monthlyWorkHours + monthlyHolidayHours,
    dailyHours: daily,
  };
}

export function calculateWeeklyHolidayPay(input: CalculatorInput): WeeklyHolidayResult {
  const hourlyWage = clampMin(input.hourlyWage);
  const weeklyHours = clampMin(input.weeklyHours);
  const workdaysPerWeek = clampMin(input.workdaysPerWeek);
  const attendanceComplete = Boolean(input.attendanceComplete);

  const { dailyHours, monthlyHolidayHours } = computeMonthlyHours(
    weeklyHours,
    workdaysPerWeek,
    true,
  );

  const eligible =
    weeklyHours >= RULESET_2026.weeklyHoliday.minimumWeeklyHours &&
    attendanceComplete &&
    dailyHours > 0 &&
    hourlyWage > 0;

  const weeklyHolidayPay = eligible ? hourlyWage * dailyHours : 0;
  const monthlyHolidayPay = eligible ? hourlyWage * monthlyHolidayHours : 0;

  return {
    eligible,
    weeklyHours,
    workdaysPerWeek,
    dailyHours,
    weeklyHolidayPay,
    monthlyHolidayPay,
    reason: eligible
      ? '주 15시간 이상, 개근 조건을 기준으로 계산했습니다.'
      : !attendanceComplete
        ? '개근 조건 미충족으로 주휴수당을 0원으로 처리했습니다.'
        : weeklyHours < RULESET_2026.weeklyHoliday.minimumWeeklyHours
          ? '주 15시간 미만이라 법정 주휴수당 대상이 아닐 수 있습니다.'
          : '시급 또는 근무일수가 입력되지 않아 계산할 수 없습니다.',
    formulaText:
      '간편식: 1일 소정근로시간(주간 총근로시간 ÷ 주 근무일수) × 시급',
  };
}

export function calculateMinimumWage(input: CalculatorInput): MinimumWageResult {
  const hourlyWage = clampMin(input.hourlyWage);
  const monthlySalary = clampMin(input.monthlySalary);
  const weeklyHours = clampMin(input.weeklyHours);
  const workdaysPerWeek = clampMin(input.workdaysPerWeek);

  const { monthlyPaidHours, dailyHours } = computeMonthlyHours(
    weeklyHours,
    workdaysPerWeek,
    true,
  );

  const effectiveHourly =
    hourlyWage > 0
      ? hourlyWage
      : monthlySalary > 0 && monthlyPaidHours > 0
        ? monthlySalary / monthlyPaidHours
        : 0;

  const minimumWage = RULESET_2026.minimumWage.hourly;
  const gap = effectiveHourly - minimumWage;
  const compliant = effectiveHourly >= minimumWage && effectiveHourly > 0;
  const monthlyShortfall =
    gap < 0 && monthlyPaidHours > 0 ? Math.abs(gap) * monthlyPaidHours : 0;

  return {
    compliant,
    minimumWage,
    effectiveHourly,
    hourlyGap: gap,
    monthlyShortfall,
    monthlyPaidHours,
    dailyHours,
    note:
      hourlyWage > 0
        ? '입력한 시급을 최저임금과 직접 비교했습니다.'
        : monthlySalary > 0
          ? '월급을 월 환산 유급시간으로 나눠 시급을 역산했습니다. 수당 포함 방식에 따라 실제값과 다를 수 있습니다.'
          : '시급 또는 월급이 입력되지 않아 비교할 수 없습니다.',
  };
}

export function calculateEmploymentIncomeDeduction(annualGross: number): number {
  const gross = clampMin(annualGross);
  if (gross <= 5000000) return gross * 0.7;
  if (gross <= 15000000) return 3500000 + (gross - 5000000) * 0.4;
  if (gross <= 45000000) return 7500000 + (gross - 15000000) * 0.15;
  if (gross <= 100000000) return 12000000 + (gross - 45000000) * 0.05;
  return 14750000 + (gross - 100000000) * 0.02;
}

export function calculateProgressiveTax(taxBase: number): number {
  const base = clampMin(taxBase);
  const bracket =
    RULESET_2026.tax.progressiveBrackets.find((item) => base <= item.max) ||
    RULESET_2026.tax.progressiveBrackets[RULESET_2026.tax.progressiveBrackets.length - 1];

  return clampMin(base * bracket.rate - bracket.deduction);
}

export function calculateEarnedIncomeTaxCredit(incomeTax: number, annualGross: number): number {
  const tax = clampMin(incomeTax);
  const gross = clampMin(annualGross);

  let credit: number;
  if (tax <= 1300000) {
    credit = tax * 0.55;
  } else {
    credit = 715000 + (tax - 1300000) * 0.3;
  }

  let cap = 740000;
  if (gross <= 33000000) {
    cap = 740000;
  } else if (gross <= 70000000) {
    cap = Math.max(660000, 740000 - (gross - 33000000) * 0.008);
  } else if (gross <= 120000000) {
    cap = Math.max(500000, 660000 - (gross - 70000000) * 0.5);
  } else {
    cap = Math.max(200000, 500000 - (gross - 120000000) * 0.5);
  }

  return Math.min(credit, cap);
}

export function calculateMonthlyGrossEstimate(
  input: CalculatorInput,
  weeklyHoliday: WeeklyHolidayResult | null,
): { monthlyGross: number; mode: string; note: string } {
  const monthlySalary = clampMin(input.monthlySalary);
  const hourlyWage = clampMin(input.hourlyWage);
  const weeklyHours = clampMin(input.weeklyHours);
  const workdaysPerWeek = clampMin(input.workdaysPerWeek);

  if (monthlySalary > 0) {
    return {
      monthlyGross: monthlySalary,
      mode: 'monthly',
      note: '입력한 월급을 세전 급여로 사용했습니다.',
    };
  }

  const { monthlyWorkHours, monthlyHolidayHours } = computeMonthlyHours(
    weeklyHours,
    workdaysPerWeek,
    true,
  );
  const holidayHours =
    weeklyHoliday?.eligible && hourlyWage > 0 ? monthlyHolidayHours : 0;
  const monthlyGross = hourlyWage * (monthlyWorkHours + holidayHours);

  return {
    monthlyGross,
    mode: 'hourly-derived',
    note: '시급 × 월 환산 근로시간(주휴 포함)으로 월급을 추정했습니다.',
  };
}

export function calculateNetSalaryEstimate(
  input: CalculatorInput,
  weeklyHoliday: WeeklyHolidayResult | null,
): NetSalaryResult {
  const dependents = Math.max(1, Math.floor(clampMin(input.dependents) || 1));
  const grossInfo = calculateMonthlyGrossEstimate(input, weeklyHoliday);
  const monthlyGross = grossInfo.monthlyGross;

  if (monthlyGross <= 0) {
    return {
      monthlyGross: 0,
      monthlyNet: 0,
      annualGross: 0,
      deductions: [],
      note: '세전 급여가 없어 세후 추정을 할 수 없습니다.',
      estimated: true,
    };
  }

  const pensionBase = Math.min(
    monthlyGross,
    RULESET_2026.insurance.nationalPension.capMonthlyBase,
  );

  const nationalPension =
    pensionBase * RULESET_2026.insurance.nationalPension.employeeRate;
  const healthInsurance =
    monthlyGross * RULESET_2026.insurance.healthInsurance.employeeRate;
  const longTermCare =
    monthlyGross * RULESET_2026.insurance.longTermCare.employeeRate;
  const employmentInsurance =
    monthlyGross * RULESET_2026.insurance.employmentInsurance.employeeRate;

  const annualGross = monthlyGross * 12;
  const employmentIncomeDeduction = calculateEmploymentIncomeDeduction(annualGross);
  const basicDeduction = dependents * RULESET_2026.tax.basicDeductionPerPerson;
  const annualPension = nationalPension * 12;

  const estimatedTaxBase = floor10(
    annualGross - employmentIncomeDeduction - basicDeduction - annualPension,
  );

  const annualIncomeTaxBeforeCredit = calculateProgressiveTax(estimatedTaxBase);
  const earnedIncomeTaxCredit = calculateEarnedIncomeTaxCredit(
    annualIncomeTaxBeforeCredit,
    annualGross,
  );
  const annualIncomeTax = clampMin(
    annualIncomeTaxBeforeCredit - earnedIncomeTaxCredit,
  );
  const monthlyIncomeTax = annualIncomeTax / 12;
  const monthlyLocalIncomeTax = monthlyIncomeTax * 0.1;

  const monthlyNet =
    monthlyGross -
    nationalPension -
    healthInsurance -
    longTermCare -
    employmentInsurance -
    monthlyIncomeTax -
    monthlyLocalIncomeTax;

  const deductions: DeductionItem[] = [
    { key: 'pension', label: '국민연금', value: nationalPension },
    { key: 'health', label: '건강보험', value: healthInsurance },
    { key: 'ltc', label: '장기요양보험', value: longTermCare },
    { key: 'employment', label: '고용보험', value: employmentInsurance },
    { key: 'incomeTax', label: '소득세(추정)', value: monthlyIncomeTax },
    { key: 'localTax', label: '지방소득세(추정)', value: monthlyLocalIncomeTax },
  ];

  return {
    monthlyGross,
    monthlyNet,
    annualGross,
    annualIncomeTax,
    annualIncomeTaxBeforeCredit,
    earnedIncomeTaxCredit,
    estimatedTaxBase,
    deductions,
    note:
      '간이 추정치입니다. 실제 원천징수는 비과세 항목, 공제대상 가족 수, 회사 처리 방식에 따라 달라질 수 있습니다.',
    estimated: true,
    grossMode: grossInfo.mode,
    grossNote: grossInfo.note,
  };
}

export function calculateSeverance(input: CalculatorInput): SeveranceResult {
  const startDate = toDate(input.startDate);
  const endDate = toDate(input.endDate);
  const weeklyHours = clampMin(input.weeklyHours);
  const workdaysPerWeek = clampMin(input.workdaysPerWeek);
  const last3MonthsWageTotal = clampMin(input.last3MonthsWageTotal);
  const annualBonus = clampMin(input.annualBonus);
  const annualLeavePayout = clampMin(input.annualLeavePayout);
  const ordinaryHourlyWage = clampMin(input.ordinaryHourlyWage);

  const employmentDays = diffDaysInclusive(startDate, endDate);
  const eligibleByService =
    employmentDays >= RULESET_2026.severance.minimumContinuousDays &&
    weeklyHours >= RULESET_2026.severance.minimumAverageWeeklyHours;

  const threeMonthsAgo = endDate ? subMonthsSafe(endDate, 3) : null;
  const threeMonthDays = diffDaysInclusive(threeMonthsAgo, endDate);

  const { dailyHours } = computeMonthlyHours(
    weeklyHours,
    workdaysPerWeek,
    true,
  );
  const proratedBonus = annualBonus * (threeMonthDays / DAYS.YEAR);
  const proratedLeave = annualLeavePayout * (threeMonthDays / DAYS.YEAR);
  const averageWageBase = last3MonthsWageTotal + proratedBonus + proratedLeave;
  const dailyAverageWage =
    threeMonthDays > 0 ? averageWageBase / threeMonthDays : 0;
  const dailyOrdinaryWage =
    ordinaryHourlyWage > 0 && dailyHours > 0 ? ordinaryHourlyWage * dailyHours : 0;

  const appliedDailyWage =
    dailyOrdinaryWage > 0
      ? Math.max(dailyAverageWage, dailyOrdinaryWage)
      : dailyAverageWage;

  const severancePay = eligibleByService
    ? appliedDailyWage * 30 * (employmentDays / DAYS.YEAR)
    : 0;

  return {
    eligible: eligibleByService,
    employmentDays,
    threeMonthDays,
    dailyHours,
    averageWageBase,
    dailyAverageWage,
    dailyOrdinaryWage,
    appliedDailyWage,
    severancePay,
    note: !startDate || !endDate
      ? '입사일과 퇴사일이 없어 퇴직금 계산을 건너뛰었습니다.'
      : !eligibleByService
        ? employmentDays < RULESET_2026.severance.minimumContinuousDays
          ? '1년 미만 근속으로 법정 퇴직금 요건을 충족하지 않습니다.'
          : '주 평균 15시간 미만이라 퇴직금 요건 미충족 가능성이 있습니다.'
        : '평균임금과 통상임금 중 큰 값을 적용했습니다.',
    formulaText:
      '법정퇴직금(간편식): max(1일 평균임금, 1일 통상임금) × 30 × (총 재직일수 ÷ 365)',
  };
}

export function buildChecklist({
  weeklyHoliday,
  minimumWage,
  severance,
  netSalary,
  input,
}: {
  weeklyHoliday: WeeklyHolidayResult;
  minimumWage: MinimumWageResult;
  severance: SeveranceResult;
  netSalary: NetSalaryResult;
  input: CalculatorInput;
}): string[] {
  const checklist: string[] = [];

  if (weeklyHoliday.eligible) {
    checklist.push('최근 4주 출근기록과 주간 스케줄을 모아두면 개근 판단 근거로 쓸 수 있습니다. 주휴는 개근이 핵심 조건입니다.');
    checklist.push('급여명세서에 주휴수당이 별도 항목으로 기재돼 있는지 살펴볼 필요가 있습니다.');
  } else if (clampMin(input.weeklyHours) >= RULESET_2026.weeklyHoliday.minimumWeeklyHours) {
    checklist.push('주휴수당 0원은 개근 조건 미충족이 원인일 수 있습니다. 결근 여부를 다시 따져볼 필요가 있습니다.');
  }

  if (!minimumWage.compliant && minimumWage.effectiveHourly > 0) {
    checklist.push('기본급·직책수당·식대 등을 최저임금 산입 범위에 맞게 항목별로 구분해야 합니다.');
    checklist.push('월급제라면 고정수당 중 산입 제외 항목이 근로계약서에 명시돼 있는지 살펴볼 필요가 있습니다.');
  }

  if (severance.eligible) {
    checklist.push('최근 3개월 급여명세서, 연간 상여금 총액, 연차수당 지급내역이 있으면 퇴직금 정확도가 올라갑니다.');
  } else if (severance.employmentDays > 0 && severance.employmentDays < 365) {
    checklist.push('법정 퇴직금은 1년 이상 계속근로가 기준입니다. 퇴사 시점에 따라 수급 여부가 달라질 수 있습니다.');
  }

  if (netSalary.monthlyGross > 0) {
    checklist.push('세후 수령액은 간이 추정치입니다. 실제 급여명세서의 국민연금·건강보험·고용보험 공제액과 비교해 차이를 확인합니다.');
  }

  if (checklist.length === 0) {
    checklist.push('입사일, 주당 근로시간, 최근 3개월 급여를 입력하면 더 정확한 결과를 볼 수 있습니다.');
  }

  return checklist;
}

export function calculateOverview(input: CalculatorInput): OverviewResult {
  const weeklyHoliday = calculateWeeklyHolidayPay(input);
  const minimumWage = calculateMinimumWage(input);
  const severance = calculateSeverance(input);
  const netSalary = calculateNetSalaryEstimate(input, weeklyHoliday);
  const checklist = buildChecklist({
    weeklyHoliday,
    minimumWage,
    severance,
    netSalary,
    input,
  });

  return {
    weeklyHoliday,
    minimumWage,
    severance,
    netSalary,
    checklist,
    summary: {
      monthlyHolidayPay: weeklyHoliday.monthlyHolidayPay,
      severancePay: severance.severancePay,
      monthlyNet: netSalary.monthlyNet,
      monthlyGross: netSalary.monthlyGross,
      minimumWageCompliant: minimumWage.compliant,
    },
  };
}

export function buildShareText(input: CalculatorInput, results: OverviewResult): string {
  return [
    '[퇴사각 결과 요약]',
    `입사일: ${input.startDate || '-'}`,
    `퇴사일: ${input.endDate || '-'}`,
    `주휴수당(월 추정): ${currency(results.weeklyHoliday.monthlyHolidayPay)}원`,
    `퇴직금(추정): ${currency(results.severance.severancePay)}원`,
    `세전 월급(추정): ${currency(results.netSalary.monthlyGross)}원`,
    `세후 월급(추정): ${currency(results.netSalary.monthlyNet)}원`,
    `최저임금 점검: ${results.minimumWage.compliant ? '이상' : '미달 가능성'}`,
    '',
    '※ 간이 계산기 결과이며 실제 지급액은 계약서, 급여명세서, 비과세 항목, 회사 처리 방식에 따라 달라질 수 있음.',
  ].join('\n');
}
