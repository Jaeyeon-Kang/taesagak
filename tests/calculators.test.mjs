import test from 'node:test';
import assert from 'node:assert/strict';

import {
  calculateWeeklyHolidayPay,
  calculateMinimumWage,
  calculateSeverance,
  calculateNetSalaryEstimate,
} from '../js/calculators.js';

test('weekly holiday pay should calculate for eligible worker', () => {
  const result = calculateWeeklyHolidayPay({
    hourlyWage: 12000,
    weeklyHours: 20,
    workdaysPerWeek: 5,
    attendanceComplete: true,
  });

  assert.equal(result.eligible, true);
  assert.equal(Math.round(result.weeklyHolidayPay), 48000);
});

test('minimum wage should flag shortfall when hourly is below 2026 rule', () => {
  const result = calculateMinimumWage({
    hourlyWage: 10000,
    monthlySalary: 0,
    weeklyHours: 20,
    workdaysPerWeek: 5,
  });

  assert.equal(result.compliant, false);
  assert.equal(result.minimumWage, 10320);
  assert.ok(result.monthlyShortfall > 0);
});

test('severance should be zero when service is under one year', () => {
  const result = calculateSeverance({
    startDate: '2025-09-01',
    endDate: '2026-03-01',
    weeklyHours: 40,
    workdaysPerWeek: 5,
    last3MonthsWageTotal: 9000000,
    annualBonus: 0,
    annualLeavePayout: 0,
    ordinaryHourlyWage: 12000,
  });

  assert.equal(result.eligible, false);
  assert.equal(Math.round(result.severancePay), 0);
});

test('net salary estimate should be below gross salary', () => {
  const result = calculateNetSalaryEstimate(
    {
      monthlySalary: 3000000,
      hourlyWage: 0,
      weeklyHours: 40,
      workdaysPerWeek: 5,
      dependents: 1,
    },
    { eligible: false },
  );

  assert.ok(result.monthlyGross > result.monthlyNet);
  assert.ok(result.deductions.length >= 4);
});
