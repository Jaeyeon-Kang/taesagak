import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: '퇴사각 소개',
  description:
    '퇴사각은 퇴직금 계산기, 실수령액 계산기, 주휴수당 계산기, 최저임금 계산기를 제공하는 근로자용 돈찾기 서비스입니다.',
  path: '/about',
  keywords: ['퇴사각 소개', '근로자 계산기', '퇴직금 계산기 서비스'],
});

export default function AboutPage() {
  return (
    <main className="page-shell">
      <section className="section">
        <div className="section__header">
          <h1 className="page-title">퇴사각 소개</h1>
          <p className="page-lead">
            &ldquo;그만두기 전에, 네 돈부터 계산해.&rdquo; — 근로자가 놓치기 쉬운 돈을 찾아주는 무료 계산기 서비스.
          </p>
        </div>

        <div className="value-grid">
          <article className="value-card">
            <h3>왜 만들었나</h3>
            <p>
              기존 계산기들은 숫자만 던지고 끝난다. 사용자는 결과를 받아도 이게 맞는 건지,
              뭘 더 확인해야 하는지 모른 채 다시 검색한다. 퇴사각은 숫자와 함께
              왜 이렇게 나왔는지, 지금 무엇을 확인해야 하는지까지 보여준다.
            </p>
          </article>
          <article className="value-card">
            <h3>누구를 위한 서비스인가</h3>
            <p>
              주휴수당을 못 받고 있는 아르바이트생, 퇴사 날짜를 고민 중인 직장인,
              급여명세서가 이상한 것 같은데 확인이 어려운 근로자.
              숫자보다 &ldquo;내가 뭘 놓쳤는지&rdquo;가 더 궁금한 사람들을 위해 만들었다.
            </p>
          </article>
          <article className="value-card">
            <h3>계산 근거</h3>
            <p>
              모든 계산은 고용노동부·국세청·국민연금공단 등 공식 기준을 따른다.
              적용 기준일, 산식 근거, 단순화 가정을 결과 화면에서 확인할 수 있다.
              계산 근거는 <Link href="/sources">출처 페이지</Link>에서 상세히 볼 수 있다.
            </p>
          </article>
          <article className="value-card">
            <h3>개인정보 처리</h3>
            <p>
              입력값은 사용자 기기의 로컬 스토리지에만 저장된다. 서버로 전송되지 않는다.
              로그인, 회원가입, 개인정보 수집이 없다.
              자세한 내용은 <Link href="/privacy">개인정보 처리방침</Link>에 정리돼 있습니다.
            </p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>제공 서비스</h2>
        </div>
        <div className="feature-grid">
          <Link className="value-card" href="/weekly-holiday" style={{ textDecoration: 'none' }}>
            <h3>주휴수당 계산기</h3>
            <p>2026 기준 주휴수당 대상 여부와 월 환산액 계산.</p>
          </Link>
          <Link className="value-card" href="/severance" style={{ textDecoration: 'none' }}>
            <h3>퇴직금 계산기</h3>
            <p>입사일·퇴사일·최근 3개월 급여 기반 퇴직금 추정.</p>
          </Link>
          <Link className="value-card" href="/net-salary" style={{ textDecoration: 'none' }}>
            <h3>실수령액 계산기</h3>
            <p>4대보험·소득세 공제 후 세후 월급 추정.</p>
          </Link>
          <Link className="value-card" href="/minimum-wage" style={{ textDecoration: 'none' }}>
            <h3>최저임금 계산기</h3>
            <p>2026 최저임금(10,320원) 기준 미달 여부 점검.</p>
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>주의사항</h2>
        </div>
        <div className="panel">
          <p>
            퇴사각의 모든 계산 결과는 공식 산식을 기반으로 한 간이 추정치입니다.
            실제 지급액은 근로계약서, 단체협약, 취업규칙, 비과세 항목, 회사 내규에 따라
            달라질 수 있습니다. 이 서비스는 법률·세무 자문을 제공하지 않습니다.
            구체적인 사안은 고용노동부(1350) 또는 법률 전문가를 통해 확인이 필요합니다.
          </p>
        </div>
      </section>
    </main>
  );
}
