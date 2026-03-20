import type { Metadata } from 'next';
import WeeklyHolidayPageClient from '@/app/weekly-holiday/WeeklyHolidayPageClient';
import { buildMetadata } from '@/lib/seo';
import JsonLd, { calculatorJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = buildMetadata({
  title: '주휴수당 계산기 2026',
  description:
    '주휴수당 계산기로 시급이나 월급을 넣으면 주휴수당 대상 여부와 월 환산액을 바로 확인할 수 있습니다. 알바 주휴수당 조건과 급여명세서 확인 가이드도 이어서 볼 수 있습니다.',
  path: '/weekly-holiday',
  keywords: ['주휴수당 계산기', '알바 주휴수당', '주휴수당 조건', '월급 주휴수당 계산'],
});

export default function WeeklyHolidayPage() {
  return (
    <>
      <JsonLd data={calculatorJsonLd({ name: '주휴수당 계산기', description: '시급이나 월급을 입력하면 주휴수당 대상 여부와 월 환산액을 바로 계산합니다.', path: '/weekly-holiday' })} />
      <WeeklyHolidayPageClient />
    </>
  );
}
