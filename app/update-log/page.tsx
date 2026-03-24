import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: '업데이트 로그',
  description:
    '퇴사각 계산기의 변경 이력과 룰셋 업데이트 내역을 확인할 수 있습니다.',
  path: '/update-log',
  keywords: ['퇴사각 업데이트', '계산기 변경 이력'],
});

export default function UpdateLogPage() {
  return (
    <main className="page-shell section">
      <div className="section__header">
        <span className="eyebrow">update log</span>
        <h1 className="page-title">업데이트 로그</h1>
        <p className="page-lead">
          퇴사각의 계산 기준, 기능 추가, 가이드 변경 내역을 기록합니다.
          계산 결과가 달라졌다면 이 페이지에서 원인을 확인할 수 있습니다.
        </p>
      </div>

      <div className="timeline">
        <article className="timeline__item">
          <div className="timeline__meta">2026-03-23 · v0.2.0</div>
          <h3>UI 개선 및 가이드 확충</h3>
          <ul>
            <li>브랜드 컬러 도입 및 전반적인 시각 디자인 개선</li>
            <li>스크롤 등장 애니메이션, 카드 호버 효과 추가</li>
            <li>모바일 햄버거 메뉴 적용</li>
            <li>주휴수당 가이드, 퇴사 체크리스트 등 가이드 4종 추가</li>
            <li>계산 결과 숫자 카운트업 애니메이션 적용</li>
          </ul>
        </article>

        <article className="timeline__item">
          <div className="timeline__meta">2026-03-13 · v0.1.0</div>
          <h3>서비스 첫 공개</h3>
          <ul>
            <li>퇴직금, 주휴수당, 실수령액, 최저임금 계산기 출시</li>
            <li>2026년 기준 4대보험 요율, 소득세율, 최저임금 반영</li>
            <li>계산 근거 및 공식 출처 페이지 제공</li>
            <li>입력값 자동 저장, 계산 히스토리, JSON 내보내기 지원</li>
            <li>PWA 지원으로 홈 화면 추가 가능</li>
          </ul>
        </article>

        <article className="timeline__item">
          <div className="timeline__meta">매년 확인 사항</div>
          <h3>연도 변경 시 업데이트 항목</h3>
          <p>
            아래 항목은 매년 정부 고시에 따라 변경될 수 있으며,
            고시 확정 후 계산 기준을 업데이트합니다.
          </p>
          <ul>
            <li>최저임금 시급 (고용노동부 고시 기준)</li>
            <li>4대보험 근로자 부담률 (국민연금·건강보험·고용보험)</li>
            <li>국민연금 기준소득월액 상·하한</li>
            <li>근로소득 간이세액표 및 세액공제 기준</li>
          </ul>
        </article>
      </div>
    </main>
  );
}
