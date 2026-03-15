export interface AppMeta {
  name: string;
  version: string;
  buildDate: string;
  tagline: string;
}

export interface MinimumWageRule {
  hourly: number;
  fullTimeMonthly209Hours: number;
  sourceLabel: string;
  sourceUrl: string;
}

export interface InsuranceRate {
  employeeRate: number;
  sourceLabel: string;
  sourceUrl: string;
}

export interface NationalPensionRate extends InsuranceRate {
  capMonthlyBase: number;
  capPeriodLabel: string;
}

export interface InsuranceRules {
  nationalPension: NationalPensionRate;
  healthInsurance: InsuranceRate;
  longTermCare: InsuranceRate;
  employmentInsurance: InsuranceRate;
}

export interface WeeklyHolidayRule {
  minimumWeeklyHours: number;
  sourceLabel: string;
  sourceUrl: string;
}

export interface SeveranceRule {
  minimumContinuousDays: number;
  minimumAverageWeeklyHours: number;
  sourceLabel: string;
  sourceUrl: string;
  fallbackSourceLabel: string;
  fallbackSourceUrl: string;
}

export interface TaxBracket {
  max: number;
  formula: string;
}

export interface ProgressiveBracket {
  max: number;
  rate: number;
  deduction: number;
}

export interface TaxRule {
  sourceLabel: string;
  sourceUrl: string;
  employmentIncomeDeductionBrackets: TaxBracket[];
  progressiveBrackets: ProgressiveBracket[];
  basicDeductionPerPerson: number;
}

export interface Ruleset {
  year: number;
  minimumWage: MinimumWageRule;
  insurance: InsuranceRules;
  weeklyHoliday: WeeklyHolidayRule;
  severance: SeveranceRule;
  tax: TaxRule;
}

export interface SourceItem {
  category: string;
  label: string;
  url: string;
}

export const APP_META: AppMeta = {
  name: '퇴사각',
  version: '0.1.0',
  buildDate: '2026-03-13',
  tagline: '그만두기 전에, 네 돈부터 계산해',
};

export const RULESET_2026: Ruleset = {
  year: 2026,
  minimumWage: {
    hourly: 10320,
    fullTimeMonthly209Hours: 2156880,
    sourceLabel: '고용노동부 2026년 적용 최저임금',
    sourceUrl: 'https://www.moel.go.kr/news/enews/report/enewsView.do?news_seq=18144',
  },
  insurance: {
    nationalPension: {
      employeeRate: 0.0475,
      capMonthlyBase: 6370000,
      capPeriodLabel: '2025.7~2026.6 기준 상한',
      sourceLabel: '국민연금공단 보험료율 안내',
      sourceUrl: 'https://www.nps.or.kr/pnsinfo/ntpsklg/getOHAF0038M0.do',
    },
    healthInsurance: {
      employeeRate: 0.03595,
      sourceLabel: '국민건강보험법 시행령 제44조',
      sourceUrl: 'https://www.law.go.kr/lsLawLinkInfo.do?chrClsCd=010202&lsJoLnkSeq=1001023442',
    },
    longTermCare: {
      employeeRate: 0.004724,
      sourceLabel: '노인장기요양보험법 시행령 제4조',
      sourceUrl: 'https://www.law.go.kr/lsLawLinkInfo.do?chrClsCd=010202&lsJoLnkSeq=1001023465',
    },
    employmentInsurance: {
      employeeRate: 0.009,
      sourceLabel: '고용보험 안내',
      sourceUrl: 'https://www.moel.go.kr/common/downloadFile.do?bbs_id=23&bbs_seq=20260200945&file_ext=pdf&file_seq=20260201644',
    },
  },
  weeklyHoliday: {
    minimumWeeklyHours: 15,
    sourceLabel: '고용노동부 주휴수당 안내',
    sourceUrl: 'https://www.moel.go.kr/mainpop2.do',
  },
  severance: {
    minimumContinuousDays: 365,
    minimumAverageWeeklyHours: 15,
    sourceLabel: '고용노동부 퇴직금 계산기',
    sourceUrl: 'https://www.moel.go.kr/retirementpayCal.do',
    fallbackSourceLabel: '고용노동부 상담사례',
    fallbackSourceUrl: 'https://1350.moel.go.kr/rtmview.do?id=1000073014&page=1&type=ALL',
  },
  tax: {
    sourceLabel: '국세청 근로소득 / 세액공제 안내',
    sourceUrl: 'https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7875&mi=6596',
    employmentIncomeDeductionBrackets: [
      { max: 5000000, formula: 'gross * 0.7' },
      { max: 15000000, formula: '3500000 + (gross - 5000000) * 0.4' },
      { max: 45000000, formula: '7500000 + (gross - 15000000) * 0.15' },
      { max: 100000000, formula: '12000000 + (gross - 45000000) * 0.05' },
      { max: Infinity, formula: '14750000 + (gross - 100000000) * 0.02' },
    ],
    progressiveBrackets: [
      { max: 14000000, rate: 0.06, deduction: 0 },
      { max: 50000000, rate: 0.15, deduction: 1260000 },
      { max: 88000000, rate: 0.24, deduction: 5760000 },
      { max: 150000000, rate: 0.35, deduction: 15440000 },
      { max: 300000000, rate: 0.38, deduction: 19940000 },
      { max: 500000000, rate: 0.40, deduction: 25940000 },
      { max: 1000000000, rate: 0.42, deduction: 35940000 },
      { max: Infinity, rate: 0.45, deduction: 65940000 },
    ],
    basicDeductionPerPerson: 1500000,
  },
};

export const SOURCE_LIST: SourceItem[] = [
  {
    category: '최저임금',
    label: RULESET_2026.minimumWage.sourceLabel,
    url: RULESET_2026.minimumWage.sourceUrl,
  },
  {
    category: '주휴수당',
    label: RULESET_2026.weeklyHoliday.sourceLabel,
    url: RULESET_2026.weeklyHoliday.sourceUrl,
  },
  {
    category: '퇴직금',
    label: RULESET_2026.severance.sourceLabel,
    url: RULESET_2026.severance.sourceUrl,
  },
  {
    category: '퇴직금 참고',
    label: RULESET_2026.severance.fallbackSourceLabel,
    url: RULESET_2026.severance.fallbackSourceUrl,
  },
  {
    category: '국민연금',
    label: RULESET_2026.insurance.nationalPension.sourceLabel,
    url: RULESET_2026.insurance.nationalPension.sourceUrl,
  },
  {
    category: '건강보험',
    label: RULESET_2026.insurance.healthInsurance.sourceLabel,
    url: RULESET_2026.insurance.healthInsurance.sourceUrl,
  },
  {
    category: '장기요양보험',
    label: RULESET_2026.insurance.longTermCare.sourceLabel,
    url: RULESET_2026.insurance.longTermCare.sourceUrl,
  },
  {
    category: '고용보험',
    label: RULESET_2026.insurance.employmentInsurance.sourceLabel,
    url: RULESET_2026.insurance.employmentInsurance.sourceUrl,
  },
  {
    category: '세후 추정',
    label: RULESET_2026.tax.sourceLabel,
    url: RULESET_2026.tax.sourceUrl,
  },
];
