import type { Metadata } from 'next';
import { SOURCE_LIST } from '@/lib/rules';

export const metadata: Metadata = {
  title: '퇴사각 출처 및 룰셋 메모',
};

export default function SourcesPage() {
  return (
    <main className="page-shell section">
      <div className="section__header">
        <span className="eyebrow">sources / rulebook</span>
        <h1 className="page-title">공식 근거와 룰셋 메모</h1>
        <p className="page-lead">
          계산기는 결국 공식과 전제 위에 선다. 이 페이지는 룰셋을 어디서 끌어왔는지 적어둔 곳이다.
          나중에 연도 바뀌면 여기부터 갈아끼우면 된다.
        </p>
      </div>

      <div className="legal-stack">
        <section className="legal-block">
          <h2>1. 최저임금</h2>
          <p>
            2026년 시간급 최저임금은 <strong>10,320원</strong>을 기준으로 사용했다.
            정규 40시간 기준 월 환산액은 <strong>2,156,880원(209시간)</strong> 표기를 메모로 유지한다.
          </p>
          <p>
            출처:{' '}
            <a href="https://www.moel.go.kr/news/enews/report/enewsView.do?news_seq=18144" target="_blank" rel="noreferrer">
              고용노동부 — 2026년 적용 최저임금 시간급 10,320원
            </a>
          </p>
        </section>

        <section className="legal-block">
          <h2>2. 주휴수당</h2>
          <p>
            주 15시간 이상 + 개근 가정을 기준으로 주휴수당 대상 여부를 판단한다.
            파트타임은 주간 총근로시간 ÷ 주 근무일수로 1일 소정근로시간을 단순 추정한다.
          </p>
          <p>
            출처:{' '}
            <a href="https://www.moel.go.kr/mainpop2.do" target="_blank" rel="noreferrer">
              고용노동부 — 주휴수당 안내
            </a>
          </p>
        </section>

        <section className="legal-block">
          <h2>3. 퇴직금</h2>
          <p>
            법정퇴직금 간편식은{' '}
            <strong>max(1일 평균임금, 1일 통상임금) × 30 × 총재직일수 ÷ 365</strong>
            흐름을 따른다.
            최근 3개월 임금총액, 연간 상여금, 연차수당을 사용한다.
          </p>
          <p>
            출처:{' '}
            <a href="https://www.moel.go.kr/retirementpayCal.do" target="_blank" rel="noreferrer">
              고용노동부 — 퇴직금 계산기
            </a>
            {' '}/{' '}
            <a href="https://1350.moel.go.kr/rtmview.do?id=1000073014&page=1&type=ALL" target="_blank" rel="noreferrer">
              고용노동부 상담사례 — 법정퇴직금 산식
            </a>
          </p>
        </section>

        <section className="legal-block">
          <h2>4. 세후 월급 간이 추정</h2>
          <p>
            세후 추정은 오차 가능성이 가장 큰 항목입니다.
            <strong>국민연금, 건강보험, 장기요양보험, 고용보험, 근로소득공제, 기본공제, 근로소득세액공제</strong>
            흐름을 반영한 간이 추정입니다.
            즉, <strong>실제 회사 급여명세와 1:1 일치할 것을 약속하지 않는다.</strong>
          </p>
          <ul>
            {SOURCE_LIST.slice(4).map((item) => (
              <li key={item.url}>
                {item.category}:{' '}
                <a href={item.url} target="_blank" rel="noreferrer">{item.label}</a>
              </li>
            ))}
          </ul>
        </section>

        <section className="legal-block">
          <h2>5. 출처 전체 목록</h2>
          <ul className="source-list">
            {SOURCE_LIST.map((item) => (
              <li key={item.url}>
                <span className="source-category">{item.category}</span>
                <a href={item.url} target="_blank" rel="noreferrer">{item.label}</a>
              </li>
            ))}
          </ul>
        </section>

        <section className="legal-block">
          <h2>6. 유지보수 포인트</h2>
          <div className="note-box">
            <p>연도 바뀌면 최소한 이것부터 바꿔라.</p>
            <ul>
              <li>최저임금 시간급 / 월 환산액</li>
              <li>건강보험·장기요양보험·고용보험·국민연금 근로자 부담률</li>
              <li>국민연금 기준소득월액 상한/하한</li>
              <li>세액공제 / 근로소득공제 룰 변경 여부</li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
