import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import ScrollReveal from '@/components/ScrollReveal';

export const metadata: Metadata = buildMetadata({
  title: '퇴사각 소개',
  description:
    '퇴사각은 퇴직금 계산기, 실수령액 계산기, 주휴수당 계산기, 최저임금 계산기를 제공하는 근로자용 돈찾기 서비스입니다.',
  path: '/about',
  keywords: ['퇴사각 소개', '근로자 계산기', '퇴직금 계산기 서비스'],
});

export default function AboutPage() {
  return (
    <main id="main-content" className="page-shell">
      <section className="section">
        <div className="section__header">
          <h1 className="page-title">퇴사각 소개</h1>
          <p className="page-lead">
            퇴사 전에 챙길 건, 멘탈이 아니라 돈입니다.
            퇴사각은 근로자가 놓치기 쉬운 돈을 찾아주는 무료 계산기 서비스입니다.
          </p>
        </div>

        <div className="value-grid">
          <article className="value-card">
            <h3>왜 퇴사각인가요</h3>
            <p>
              기존 계산기는 숫자만 보여주고 끝납니다.
              결과를 받아도 이게 맞는 건지, 뭘 더 확인해야 하는지 알기 어렵습니다.
              퇴사각은 계산 결과와 함께 왜 이렇게 나왔는지,
              지금 무엇을 확인해야 하는지까지 안내합니다.
            </p>
          </article>
          <article className="value-card">
            <h3>이런 분들을 위해 만들었습니다</h3>
            <p>
              주휴수당을 못 받고 있는 아르바이트생,
              퇴사 날짜를 고민 중인 직장인,
              급여명세서가 이상한 것 같은데 어디를 봐야 할지 모르는 근로자.
              숫자보다 &ldquo;내가 뭘 놓쳤는지&rdquo;가 더 궁금한 분들을 위한 서비스입니다.
            </p>
          </article>
          <article className="value-card">
            <h3>계산 근거</h3>
            <p>
              모든 계산은 고용노동부·국세청·국민연금공단 등 공식 기준을 따릅니다.
              적용 기준일, 산식 근거, 단순화 가정은 결과 화면에서 확인할 수 있습니다.
              자세한 내용은 <Link href="/sources">출처 페이지</Link>에서 확인하실 수 있습니다.
            </p>
          </article>
          <article className="value-card">
            <h3>개인정보 처리</h3>
            <p>
              입력값은 사용자 기기의 로컬 스토리지에만 저장되며, 서버로 전송되지 않습니다.
              로그인, 회원가입, 개인정보 수집이 없습니다.
              자세한 내용은 <Link href="/privacy">개인정보 처리방침</Link>에서 확인하실 수 있습니다.
            </p>
          </article>
        </div>
      </section>

      <ScrollReveal>
      <section className="section">
        <div className="section__header">
          <h2>제공 서비스</h2>
        </div>
        <div className="feature-grid">
          <Link className="value-card" href="/weekly-holiday" style={{ textDecoration: 'none' }}>
            <span className="card-accent-bar" style={{ background: '#5B8C3E' }} />
            <h3>주휴수당 계산기</h3>
            <p>2026 기준 주휴수당 대상 여부와 월 환산액을 계산합니다.</p>
          </Link>
          <Link className="value-card" href="/severance" style={{ textDecoration: 'none' }}>
            <span className="card-accent-bar" style={{ background: '#7b4d12' }} />
            <h3>퇴직금 계산기</h3>
            <p>입사일·퇴사일·최근 3개월 급여를 기준으로 퇴직금을 추정합니다.</p>
          </Link>
          <Link className="value-card" href="/net-salary" style={{ textDecoration: 'none' }}>
            <span className="card-accent-bar" style={{ background: '#a14a12' }} />
            <h3>실수령액 계산기</h3>
            <p>4대보험·소득세 공제 후 세후 월급을 추정합니다.</p>
          </Link>
          <Link className="value-card" href="/minimum-wage" style={{ textDecoration: 'none' }}>
            <span className="card-accent-bar" style={{ background: '#9e2d1a' }} />
            <h3>최저임금 계산기</h3>
            <p>2026 최저임금(10,320원) 기준 미달 여부를 점검합니다.</p>
          </Link>
        </div>
      </section>
      </ScrollReveal>

      <ScrollReveal>
      <section className="section">
        <div className="section__header">
          <h2>데이터 검수 기준</h2>
        </div>
        <div className="value-grid">
          <article className="value-card">
            <h3>법령 기준 반영</h3>
            <p>
              국민연금·건강보험·고용보험 요율, 최저임금, 소득세 간이세액표는
              매년 초 관보·공단 고시가 확정되면 즉시 반영합니다.
              현재 적용 기준은 <strong>2026년 1월 1일</strong>입니다.
            </p>
          </article>
          <article className="value-card">
            <h3>교차 확인</h3>
            <p>
              계산 결과는 고용노동부 퇴직금 산정 예시, 국세청 간이세액표,
              국민건강보험공단 보험료 산정 기준과 대조하여 검증합니다.
            </p>
          </article>
        </div>
      </section>
      </ScrollReveal>

      <ScrollReveal>
      <section className="section">
        <div className="section__header">
          <h2>오류 제보 및 문의</h2>
        </div>
        <div className="panel">
          <p>
            계산 결과가 실제와 다르거나 법령 변경이 반영되지 않은 경우,
            아래 경로로 제보해 주시면 확인 후 수정하겠습니다.
          </p>
          <ul style={{ marginTop: '0.5rem', paddingLeft: '1.25rem' }}>
            <li>이메일: <strong>help@taesagak.co.kr</strong></li>
          </ul>
        </div>
      </section>
      </ScrollReveal>

      <ScrollReveal>
      <section className="section">
        <div className="section__header">
          <h2>주의사항</h2>
        </div>
        <div className="panel">
          <p>
            퇴사각의 모든 계산 결과는 공식 산식을 기반으로 한 간이 추정치입니다.
            실제 지급액은 근로계약서, 단체협약, 취업규칙, 비과세 항목, 회사 내규에 따라
            달라질 수 있습니다. 이 서비스는 법률·세무 자문을 제공하지 않습니다.
            구체적인 사안은 고용노동부(1350) 또는 법률 전문가를 통해 확인해 주세요.
          </p>
        </div>
      </section>
      </ScrollReveal>
    </main>
  );
}
