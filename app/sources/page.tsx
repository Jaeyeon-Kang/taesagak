import type { Metadata } from 'next';
import { SOURCE_LIST } from '@/lib/rules';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: '퇴직금 계산기 · 실수령액 계산기 출처',
  description:
    '퇴직금 계산기, 실수령액 계산기, 주휴수당 계산기, 최저임금 계산기에 적용한 고용노동부·국세청·국민연금공단 출처를 한 번에 확인할 수 있습니다.',
  path: '/sources',
  keywords: ['퇴직금 계산기 출처', '실수령액 계산기 출처', '주휴수당 계산 근거'],
});

export default function SourcesPage() {
  return (
    <main id="main-content" className="page-shell section">
      <div style={{ maxWidth: '640px', margin: '0 auto' }}>
        <div className="section__header">
          <h1 className="page-title" style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)' }}>이 계산기는 어디서 가져왔나요?</h1>
          <p className="page-lead" style={{ marginTop: '0.5rem' }}>
            퇴사각의 모든 계산은 아래 법령과 공식 자료를 기준으로 합니다. 매년 기준이 바뀌면 이 페이지도 함께 업데이트됩니다.
          </p>
        </div>

        <div className="content-stack" style={{ marginTop: '2rem' }}>
          <section>
            <h2 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>최저임금</h2>
            <p>
              2026년 시간급 최저임금은 <strong>10,320원</strong>입니다.
              주 40시간(월 209시간) 기준 월 환산액은 <strong>2,156,880원</strong>입니다.
            </p>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-3)', marginTop: '0.25rem' }}>
              출처:{' '}
              <a href="https://www.moel.go.kr/news/enews/report/enewsView.do?news_seq=18144" target="_blank" rel="noreferrer">
                고용노동부 — 2026년 적용 최저임금
              </a>
            </p>
          </section>

          <hr style={{ border: 'none', borderTop: '1px solid var(--line)', margin: '1rem 0' }} />

          <section>
            <h2 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>주휴수당</h2>
            <p>
              주 15시간 이상 근무하고 해당 주에 빠지지 않고 출근한 경우 주휴수당 대상으로 판단합니다.
              파트타임의 경우 주간 총 근로시간을 근무일수로 나누어 1일 소정근로시간을 추정합니다.
            </p>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-3)', marginTop: '0.25rem' }}>
              출처:{' '}
              <a href="https://www.moel.go.kr/mainpop2.do" target="_blank" rel="noreferrer">
                고용노동부 — 주휴수당 안내
              </a>
            </p>
          </section>

          <hr style={{ border: 'none', borderTop: '1px solid var(--line)', margin: '1rem 0' }} />

          <section>
            <h2 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>퇴직금</h2>
            <p>
              법정 퇴직금은 <strong>1일 평균임금(또는 통상임금 중 큰 값) × 30일 × 재직일수 ÷ 365일</strong> 공식으로 계산합니다.
              최근 3개월 임금 총액, 연간 상여금, 연차수당을 반영합니다.
            </p>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-3)', marginTop: '0.25rem' }}>
              출처:{' '}
              <a href="https://www.moel.go.kr/retirementpayCal.do" target="_blank" rel="noreferrer">
                고용노동부 — 퇴직금 계산기
              </a>
              {' / '}
              <a href="https://1350.moel.go.kr/rtmview.do?id=1000073014&page=1&type=ALL" target="_blank" rel="noreferrer">
                고용노동부 상담사례 — 퇴직금 산식
              </a>
            </p>
          </section>

          <hr style={{ border: 'none', borderTop: '1px solid var(--line)', margin: '1rem 0' }} />

          <section>
            <h2 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>실수령액 (세후 추정)</h2>
            <p>
              국민연금·건강보험·장기요양보험·고용보험·소득세·지방소득세를 반영한 간이 추정입니다.
              비과세 항목, 회사 내규, 부양가족 상세 공제 등에 따라 <strong>실제 급여명세서와 차이가 있을 수 있습니다.</strong>
            </p>
          </section>

          <hr style={{ border: 'none', borderTop: '1px solid var(--line)', margin: '1rem 0' }} />

          <section>
            <h2 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>전체 출처 목록</h2>
            <ul className="source-list">
              {SOURCE_LIST.map((item) => (
                <li key={item.url}>
                  <span className="source-category">{item.category}</span>
                  <a href={item.url} target="_blank" rel="noreferrer">{item.label}</a>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="panel" style={{ background: 'var(--surface-2)', marginTop: '2rem' }}>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-2)', lineHeight: '1.7' }}>
            퇴사각은 정보 제공 목적의 간이 계산 도구입니다. 법률 자문이 아니며, 계산 결과를 근거로 한 판단에 대해 책임지지 않습니다.
            정확한 금액은 급여명세서·근로계약서를 기준으로 확인하시고, 분쟁이 있을 경우 고용노동부(1350)에 문의하세요.
          </p>
        </div>
      </div>
    </main>
  );
}
