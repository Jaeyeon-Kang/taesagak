import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '퇴사각 — 그만두기 전에, 네 돈부터 계산해',
};

export default function HomePage() {
  return (
    <main className="page-shell">
      <section className="hero">
        <div className="hero__panel">
          <span className="hero__eyebrow">worker-first calculator</span>
          <h1 className="hero__title">그만두기 전에,<br />네 돈부터 계산해</h1>
          <p className="hero__description">
            퇴직금, 주휴수당, 실수령액, 최저임금 점검을 한 화면에서 확인할 수 있습니다.
            <strong>계산 근거</strong>와
            <strong>지금 확인해야 할 항목</strong>까지 함께 보여줍니다.
          </p>

          <div className="hero__actions">
            <Link className="button button--primary" href="/calculator">계산기 열기</Link>
            <Link className="button button--secondary" href="/sources">공식 근거 보기</Link>
          </div>

          <div className="hero__stats">
            <article className="stat">
              <strong>4개 핵심 계산</strong>
              <span>퇴직금 · 주휴수당 · 세후 월급 · 최저임금</span>
            </article>
            <article className="stat">
              <strong>로컬 저장</strong>
              <span>로그인 없이 입력값/히스토리 보관</span>
            </article>
            <article className="stat">
              <strong>PWA 준비</strong>
              <span>Cloudflare Pages 같은 정적 호스팅에 바로 올리기 좋음</span>
            </article>
          </div>
        </div>

        <aside className="hero-preview glass-card" aria-label="미리보기">
          <div className="preview-window">
            <div className="preview-window__toolbar">
              <span></span><span></span><span></span>
            </div>
            <div className="preview-grid">
              <div className="preview-column">
                <section className="mini-card">
                  <h4>오늘 받을 돈</h4>
                  <p>한 번 입력하면 한 화면에 요약한다.</p>
                  <div className="mini-grid">
                    <div className="mini-line" style={{ ['--width' as string]: '74%' }}></div>
                    <div className="mini-line" style={{ ['--width' as string]: '58%' }}></div>
                    <div className="mini-line" style={{ ['--width' as string]: '66%' }}></div>
                  </div>
                </section>
                <section className="mini-card">
                  <h4>체크리스트</h4>
                  <p>계약서, 급여명세서, 출근기록에서 뭘 볼지 같이 준다.</p>
                </section>
              </div>
              <div className="preview-column">
                <section className="mini-card">
                  <h4>세전/세후 구조</h4>
                  <p>공제액 분해까지 보여준다.</p>
                  <div className="mini-grid">
                    <div className="mini-line" style={{ ['--width' as string]: '32%' }}></div>
                    <div className="mini-line" style={{ ['--width' as string]: '24%' }}></div>
                    <div className="mini-line" style={{ ['--width' as string]: '18%' }}></div>
                    <div className="mini-line" style={{ ['--width' as string]: '12%' }}></div>
                  </div>
                </section>
                <section className="mini-card">
                  <h4>출처/공식</h4>
                  <p>근거 페이지 링크를 따로 모아 둠.</p>
                </section>
              </div>
            </div>
          </div>
        </aside>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>계산기 바로가기</h2>
          <p>가장 많이 찾는 계산기. 탭 하나만 열면 된다.</p>
        </div>
        <div className="feature-grid">
          <Link className="value-card" href="/weekly-holiday" style={{ textDecoration: 'none' }}>
            <div className="value-card__icon">주</div>
            <h3>주휴수당 계산기</h3>
            <p>시급·주당 근로시간만 입력. 대상 여부와 월 환산액을 바로 계산한다.</p>
          </Link>
          <Link className="value-card" href="/severance" style={{ textDecoration: 'none' }}>
            <div className="value-card__icon">퇴</div>
            <h3>퇴직금 계산기</h3>
            <p>입사일·퇴사일·최근 3개월 급여로 법정 퇴직금을 추정한다.</p>
          </Link>
          <Link className="value-card" href="/net-salary" style={{ textDecoration: 'none' }}>
            <div className="value-card__icon">실</div>
            <h3>실수령액 계산기</h3>
            <p>세전 월급·연봉에서 4대보험·세금을 빼면 실제로 받는 금액이 나온다.</p>
          </Link>
          <Link className="value-card" href="/minimum-wage" style={{ textDecoration: 'none' }}>
            <div className="value-card__icon">최</div>
            <h3>최저임금 계산기</h3>
            <p>2026년 최저임금(10,320원) 기준으로 미달 여부를 점검한다.</p>
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>제품 핵심</h2>
          <p>
            기존 계산기는 숫자만 보여주고 끝납니다. 이 앱은 <strong>숫자 → 근거 → 확인 항목</strong> 순서로
            연결해서, 다음에 무엇을 해야 하는지까지 보여줍니다.
          </p>
        </div>

        <div className="value-grid">
          <article className="value-card">
            <div className="value-card__icon">①</div>
            <h3>한 번 입력, 네 가지 결과</h3>
            <p>
              시급/월급, 주당 근로시간, 재직기간, 최근 3개월 급여만 넣으면
              핵심 결과를 한 번에 보여준다.
            </p>
          </article>
          <article className="value-card">
            <div className="value-card__icon">②</div>
            <h3>사람말로 해석</h3>
            <p>
              &ldquo;1일 평균임금&rdquo;, &ldquo;통상임금&rdquo; 같은 말을 숨기지 않는다.
              대신 그 뜻을 풀어서 보여준다.
            </p>
          </article>
          <article className="value-card">
            <div className="value-card__icon">③</div>
            <h3>로그인 없는 완전 무료 계산기</h3>
            <p>
              회원가입 없이 바로 쓸 수 있습니다.
              입력값은 브라우저에 저장되고, 서버로 전송되지 않습니다.
            </p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>포함 기능</h2>
          <p>
            근로자에게 실제로 필요한 계산 기능만 담았습니다.
          </p>
        </div>

        <div className="feature-grid">
          <article className="value-card">
            <h3>퇴직금 계산</h3>
            <p>최근 3개월 임금, 상여금, 연차수당을 반영한 간편 추정.</p>
          </article>
          <article className="value-card">
            <h3>주휴수당 계산</h3>
            <p>주 15시간 / 개근 조건을 기준으로 대상 여부와 월 환산액 표시.</p>
          </article>
          <article className="value-card">
            <h3>세후 월급 추정</h3>
            <p>국민연금·건강보험·장기요양·고용보험과 간이 세액 추정 포함.</p>
          </article>
          <article className="value-card">
            <h3>최저임금 점검</h3>
            <p>2026 기준 시급과 비교하고 미달 가능성을 월 부족분으로도 보여줌.</p>
          </article>
        </div>

        <div className="cta-row" style={{ marginTop: '1rem' }}>
          <Link className="button button--primary" href="/calculator">통합 계산기 열기</Link>
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>가이드</h2>
          <p>숫자만 보고 넘기면 놓치는 게 생긴다. 항목별로 뭘 확인해야 하는지 정리했다.</p>
        </div>
        <div className="feature-grid">
          <Link className="value-card" href="/guide/weekly-holiday" style={{ textDecoration: 'none' }}>
            <h3>주휴수당 조건 총정리</h3>
            <p>지급 조건, 계산 방법, 미지급 시 대응까지 실용적으로 정리.</p>
          </Link>
          <Link className="value-card" href="/guide/payslip" style={{ textDecoration: 'none' }}>
            <h3>급여명세서 체크 가이드</h3>
            <p>급여명세서 항목별 확인 방법과 이상한 공제 찾는 법.</p>
          </Link>
          <Link className="value-card" href="/guide/resignation" style={{ textDecoration: 'none' }}>
            <h3>퇴사 전 체크리스트</h3>
            <p>퇴직금·연차수당·실업급여까지 놓치는 돈 없이 챙기는 방법.</p>
          </Link>
          <Link className="value-card" href="/guide/severance" style={{ textDecoration: 'none' }}>
            <h3>퇴직금 상여금·연차 반영법</h3>
            <p>평균임금에 상여금·연차수당을 제대로 반영하는 방법.</p>
          </Link>
        </div>
      </section>
    </main>
  );
}
