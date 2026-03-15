import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '퇴사각 업데이트 로그',
};

export default function UpdateLogPage() {
  return (
    <main className="page-shell section">
      <div className="section__header">
        <span className="eyebrow">update log</span>
        <h1 className="page-title">업데이트 로그</h1>
        <p className="page-lead">
          처음부터 거창하게 적지는 않았다. 대신 나중에 룰셋 갈아끼울 때 어디를 건드렸는지 추적할 수 있게 남긴다.
        </p>
      </div>

      <div className="timeline">
        <article className="timeline__item">
          <div className="timeline__meta">2026-03-13 · v0.1.0</div>
          <h3>초기 MVP 제작</h3>
          <ul>
            <li>퇴직금 / 주휴수당 / 세후 월급 / 최저임금 점검 계산기 탑재</li>
            <li>공식 출처 링크 페이지 추가</li>
            <li>로컬 저장, 히스토리, JSON 내보내기, 요약 복사 구현</li>
            <li>PWA 매니페스트 / 서비스워커 추가</li>
          </ul>
        </article>

        <article className="timeline__item">
          <div className="timeline__meta">다음 점검 포인트</div>
          <h3>연도 변경 시 반드시 확인할 것</h3>
          <ul>
            <li>최저임금 시급</li>
            <li>4대보험 근로자 부담률</li>
            <li>국민연금 상한액</li>
            <li>세액공제 / 간이세액표 변화</li>
          </ul>
        </article>
      </div>
    </main>
  );
}
