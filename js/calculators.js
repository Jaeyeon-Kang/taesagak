import { RULESET_2026 } from './rules.js';

const DAYS = {
  WEEK_TO_MONTH: 4.345,
  YEAR: 365,
};

export function round(value) {
  return Math.round(Number(value) || 0);
}

export function floor10(value) {
  return Math.floor((Number(value) || 0) / 10) * 10;
}

export function clampMin(value, min = 0) {
  return Math.max(min, Number(value) || 0);
}

export function toDate(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function diffDaysInclusive(start, end) {
  if (!start || !end) return 0;
  const startDate = new Date(start.getFullYear(), start.getMonth(), start.getDate());
  const endDate = new Date(end.getFullYear(), end.getMonth(), end.getDate());
  return Math.max(0, Math.floor((endDate - startDate) / 86400000) + 1);
}

export function subMonthsSafe(date, months) {
  if (!date) return null;
  const copy = new Date(date);
  const targetMonth = copy.getMonth() - months;
  const target = new Date(copy.getFullYear(), targetMonth, copy.getDate());
  if (target.getMonth() !== ((targetMonth % 12) + 12) % 12) {
    target.setDate(0);
  }
  return target;
}

export function currency(value) {
  return new Intl.NumberFormat('ko-KR').format(round(value));
}

export function percent(value, digits = 1) {
  return `${(Number(value || 0) * 100).toFixed(digits)}%`;
}

export function computeDailyHours(weeklyHours, workdaysPerWeek) {
  const hours = clampMin(weeklyHours);
  const days = clampMin(workdaysPerWeek);
  if (!hours || !days) return 0;
  return hours / days;
}

export function computeMonthlyHours(weeklyHours, workdaysPerWeek, includeWeeklyHoliday = true) {
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

export function calculateWeeklyHolidayPay(input) {
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
      ? '주 15시간 이상 + 개근 가정 기준으로 계산했어.'
      : !attendanceComplete
        ? '개근 체크가 빠져서 주휴수당을 0원으로 잡았어.'
        : weeklyHours < RULESET_2026.weeklyHoliday.minimumWeeklyHours
          ? '주 15시간 미만 입력이라 법정 주휴수당 대상이 아닐 가능성이 커.'
          : '시급이나 근무일수 입력이 비어 있어서 계산을 멈췄어.',
    formulaText:
      '간편식: 1일 소정근로시간(주간 총근로시간 ÷ 주 근무일수) × 시급',
  };
}

export function calculateMinimumWage(input) {
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
        ? '시급 입력값을 그대로 최저임금과 비교했어.'
        : monthlySalary > 0
          ? '월급 ÷ 월 환산 유급시간으로 시급을 역산했어. 수당 포함 방식에 따라 실제와 달라질 수 있어.'
          : '시급 또는 월급이 없어서 비교를 못 했어.',
  };
}

export function calculateEmploymentIncomeDeduction(annualGross) {
  const gross = clampMin(annualGross);
  if (gross <= 5000000) return gross * 0.7;
  if (gross <= 15000000) return 3500000 + (gross - 5000000) * 0.4;
  if (gross <= 45000000) return 7500000 + (gross - 15000000) * 0.15;
  if (gross <= 100000000) return 12000000 + (gross - 45000000) * 0.05;
  return 14750000 + (gross - 100000000) * 0.02;
}

export function calculateProgressiveTax(taxBase) {
  const base = clampMin(taxBase);
  const bracket =
    RULESET_2026.tax.progressiveBrackets.find((item) => base <= item.max) ||
    RULESET_2026.tax.progressiveBrackets.at(-1);

  return clampMin(base * bracket.rate - bracket.deduction);
}

export function calculateEarnedIncomeTaxCredit(incomeTax, annualGross) {
  const tax = clampMin(incomeTax);
  const gross = clampMin(annualGross);

  let credit;
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

export function calculateMonthlyGrossEstimate(input, weeklyHoliday) {
  const monthlySalary = clampMin(input.monthlySalary);
  const hourlyWage = clampMin(input.hourlyWage);
  const weeklyHours = clampMin(input.weeklyHours);
  const workdaysPerWeek = clampMin(input.workdaysPerWeek);

  if (monthlySalary > 0) {
    return {
      monthlyGross: monthlySalary,
      mode: 'monthly',
      note: '월급 입력값을 세전 급여로 사용했어.',
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
    note: '시급 × 월 환산 근로시간(+주휴 유급시간)으로 월급을 추정했어.',
  };
}

export function calculateNetSalaryEstimate(input, weeklyHoliday) {
  const dependents = Math.max(1, Math.floor(clampMin(input.dependents) || 1));
  const grossInfo = calculateMonthlyGrossEstimate(input, weeklyHoliday);
  const monthlyGross = grossInfo.monthlyGross;

  if (monthlyGross <= 0) {
    return {
      monthlyGross: 0,
      monthlyNet: 0,
      annualGross: 0,
      deductions: [],
      note: '세전 월급이 없어서 세후 추정을 못 했어.',
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

  const deductions = [
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
      '간이 추정치야. 실제 원천징수는 간이세액표, 비과세 항목, 공제대상 가족, 회사 처리 방식에 따라 달라질 수 있어.',
    estimated: true,
    grossMode: grossInfo.mode,
    grossNote: grossInfo.note,
  };
}

export function calculateSeverance(input) {
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
      ? '입사일과 퇴사일이 없어서 퇴직금 계산을 건너뛰었어.'
      : !eligibleByService
        ? employmentDays < RULESET_2026.severance.minimumContinuousDays
          ? '1년 미만 근속으로 입력되어 법정 퇴직금은 0원 처리했어.'
          : '주 평균 15시간 미만이라 퇴직금 요건 미충족 가능성이 커.'
        : '고용노동부 계산기 흐름을 따라 평균임금/통상임금 중 큰 값을 적용했어.',
    formulaText:
      '법정퇴직금(간편식): max(1일 평균임금, 1일 통상임금) × 30 × (총 재직일수 ÷ 365)',
  };
}

export function buildChecklist({ weeklyHoliday, minimumWage, severance, netSalary, input }) {
  const checklist = [];

  if (weeklyHoliday.eligible) {
    checklist.push('최근 4주 출근기록과 주간 스케줄표를 확인해. 주휴는 개근 판단이 핵심이야.');
    checklist.push('급여명세서에 주휴수당 항목이 따로 있는지 먼저 봐.');
  } else if (clampMin(input.weeklyHours) >= RULESET_2026.weeklyHoliday.minimumWeeklyHours) {
    checklist.push('주휴수당이 0원으로 나온 건 개근 체크 때문일 수 있어. 결근 여부를 다시 봐.');
  }

  if (!minimumWage.compliant && minimumWage.effectiveHourly > 0) {
    checklist.push('기본급, 직책수당, 식대 등 최저임금 산입 범위를 다시 구분해. 여기서 자주 꼬여.');
    checklist.push('월급제라면 고정수당 중 제외되는 항목이 있는지 계약서를 확인해.');
  }

  if (severance.eligible) {
    checklist.push('최근 3개월 급여명세서, 연간 상여금 총액, 연차수당 지급내역을 모아야 퇴직금 정확도가 올라가.');
  } else if (severance.employmentDays > 0 && severance.employmentDays < 365) {
    checklist.push('법정 퇴직금은 보통 1년 이상 계속근로가 기준이라, 퇴사 시점을 며칠만 바꿔도 결과가 달라질 수 있어.');
  }

  if (netSalary.monthlyGross > 0) {
    checklist.push('세후 수령액은 간이 추정치라서 실제 급여명세서의 국민연금/건보/고용보험 공제액과 비교해 봐.');
  }

  if (checklist.length === 0) {
    checklist.push('기본 정보가 비어서 결과가 얌전하게 나온 거야. 입사일, 주당 근로시간, 최근 3개월 급여부터 채워.');
  }

  return checklist;
}

export function calculateOverview(input) {
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

export function buildShareText(input, results) {
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
