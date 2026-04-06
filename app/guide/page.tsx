import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = buildMetadata({
  title: '퇴사·근로 가이드 모음',
  description:
    '퇴사 전 체크리스트, 퇴직금, 주휴수당, 4대보험, 근로소득세, 수습기간, 알바 권리, 근로계약 유형까지. 근로자가 놓치기 쉬운 돈과 권리를 정리한 가이드 모음입니다.',
  path: '/guide',
  keywords: [
    '퇴사 가이드',
    '퇴직금 가이드',
    '주휴수당 조건',
    '급여명세서 보는 법',
    '퇴사 전 확인',
  ],
});

const guides = [
  {
    href: '/guide/resignation',
    title: '퇴사 전 체크리스트',
    description: '퇴직금, 미지급 급여, 연차수당, 실업급여까지 놓치기 쉬운 돈과 서류를 한 번에 정리했습니다.',
  },
  {
    href: '/guide/severance',
    title: '퇴직금 상여금·연차수당 반영 방법',
    description: '퇴직금 계산 시 상여금과 연차수당을 반영하는 방법, 평균임금 산정 방식을 설명합니다.',
  },
  {
    href: '/guide/weekly-holiday',
    title: '주휴수당 조건 총정리',
    description: '주휴수당 지급 조건, 계산 방법, 급여명세서 확인법, 미지급 시 대응까지 정리했습니다.',
  },
  {
    href: '/guide/payslip',
    title: '급여명세서 체크 가이드',
    description: '급여명세서에서 꼭 확인해야 할 항목, 이상한 공제 찾는 법, 최저임금 반영 확인 방법입니다.',
  },
  {
    href: '/guide/annual-leave',
    title: '연차 계산법 — 발생 기준과 수당 정산',
    description: '1년 미만·이상 연차 발생 기준, 연차수당 계산법, 퇴사 시 미사용 연차 처리까지 정리했습니다.',
  },
  {
    href: '/guide/unemployment-benefit',
    title: '실업급여 조건과 금액 계산',
    description: '수급 요건(180일, 비자발적 이직), 1일 지급액 계산법, 소정급여일수, 신청 절차를 안내합니다.',
  },
  {
    href: '/guide/health-insurance-after-resignation',
    title: '퇴직 후 건강보험 처리 방법',
    description: '지역가입자 전환, 임의계속가입, 피부양자 등록 중 어느 것이 유리한지 비교합니다.',
  },
  {
    href: '/guide/severance-deadline',
    title: '퇴직금 14일 지급 의무와 미지급 대응',
    description: '14일 지급 원칙, 지연이자 계산법, 고용노동부 신고 절차를 단계별로 설명합니다.',
  },
  {
    href: '/guide/4-insurance',
    title: '4대보험 총정리',
    description: '국민연금·건강보험·고용보험·산재보험의 2026년 요율, 부담 비율, 가입 의무, 퇴사 후 처리 방법을 정리했습니다.',
  },
  {
    href: '/guide/income-tax',
    title: '근로소득세 계산법',
    description: '간이세액표 기준, 부양가족 수에 따른 세금 차이, 연말정산 기본 개념, 원천징수 비율 선택 가이드입니다.',
  },
  {
    href: '/guide/probation',
    title: '수습기간 급여와 권리',
    description: '수습 감액 범위(최저임금 90%), 수습 중 해고 조건, 4대보험·연차 적용 여부를 정리했습니다.',
  },
  {
    href: '/guide/part-time-rights',
    title: '알바생 노동법 권리 총정리',
    description: '최저임금, 주휴수당, 근로계약서, 부당해고·임금체불 신고 방법, 퇴직금 조건까지 정리했습니다.',
  },
  {
    href: '/guide/contract-types',
    title: '근로계약 유형별 차이',
    description: '정규직·계약직·파견직·프리랜서의 4대보험, 퇴직금, 연차 적용 여부와 위장 프리랜서 판별법을 비교합니다.',
  },
];

export default function GuidePage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: '홈', path: '/' }, { name: '가이드', path: '/guide' }])} />
      <main id="main-content" className="page-shell">
        <section className="section">
          <div className="section__header">
            <h1 className="page-title">퇴사·근로 가이드</h1>
            <p className="page-lead">
              계산기만으로는 부족한 부분을 가이드로 보충합니다. 퇴사 준비부터 급여 확인까지, 근로자가 알아야 할 핵심만 모았습니다.
            </p>
          </div>

          <div className="feature-grid">
            {guides.map((g) => (
              <Link key={g.href} className="value-card" href={g.href} style={{ textDecoration: 'none' }}>
                <h2 style={{ fontSize: '1.1rem' }}>{g.title}</h2>
                <p>{g.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="section" style={{ maxWidth: '640px', margin: '0 auto' }}>
          <div className="section__header">
            <h2>계산기도 함께 확인하세요</h2>
          </div>
          <div className="feature-grid">
            <Link className="value-card" href="/calculator" style={{ textDecoration: 'none' }}>
              <h3>통합 계산기</h3>
              <p>퇴직금·주휴수당·실수령액·최저임금을 한 번에 계산합니다.</p>
            </Link>
            <Link className="value-card" href="/severance" style={{ textDecoration: 'none' }}>
              <h3>퇴직금 계산기</h3>
              <p>입사일·퇴사일·급여 기반으로 법정 퇴직금을 추정합니다.</p>
            </Link>
            <Link className="value-card" href="/net-salary" style={{ textDecoration: 'none' }}>
              <h3>실수령액 계산기</h3>
              <p>4대보험·소득세 공제 후 세후 월급을 확인합니다.</p>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
