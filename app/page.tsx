import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import ScrollReveal from '@/components/ScrollReveal';

export const metadata: Metadata = buildMetadata({
  title: '퇴직금 계산기 · 실수령액 계산기 · 주휴수당 계산기',
  description:
    '퇴직금 계산기, 실수령액 계산기, 주휴수당 계산기, 최저임금 계산기를 한 곳에서 바로 확인하세요. 퇴사 전 체크리스트와 급여명세서 가이드까지 이어서 볼 수 있습니다.',
  path: '/',
  keywords: [
    '퇴직금 계산기 2026',
    '월급 실수령액 계산',
    '주휴수당 대상 확인',
    '퇴사 전 챙길 것',
    '퇴사 전 확인할 것',
    '연봉 3000 실수령액',
    '알바 주휴수당 계산',
  ],
});

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero__inner">
          <div className="hero__panel">
            <span className="hero__eyebrow">퇴직금 계산기 · 실수령액 계산기 · 주휴수당 계산기</span>
            <h1 className="hero__title">
              퇴사 전에 챙길 건,
              <br />
              멘탈이 아니라 <span className="hero__highlight">돈</span>입니다.
            </h1>
            <p className="hero__description">
              퇴직금 계산기, 실수령액 계산기, 주휴수당 계산기, 최저임금 계산기를 한 번에 확인할 수 있습니다.
              숫자만 보여주지 않고 퇴사 전 체크리스트와 급여명세서 가이드까지 바로 이어집니다.
            </p>
            <div className="hero__actions">
              <Link className="button button--primary button--large" href="/calculator">통합 계산기 열기</Link>
              <Link className="button button--secondary" href="/guide/resignation">퇴사 체크리스트 보기</Link>
            </div>
            <div className="hero__stats">
              <Link className="stat" href="/severance" style={{ textDecoration: 'none' }}>
                <strong>퇴직금 계산기</strong>
                <span>상여금·연차수당 반영 근거까지 정리</span>
              </Link>
              <Link className="stat" href="/net-salary" style={{ textDecoration: 'none' }}>
                <strong>실수령액 계산기</strong>
                <span>4대보험과 세금 공제 구조를 함께 확인</span>
              </Link>
              <Link className="stat" href="/weekly-holiday" style={{ textDecoration: 'none' }}>
                <strong>주휴수당 계산기</strong>
                <span>조건 확인부터 월 환산액까지 한 번에</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <main className="page-shell">
        <ScrollReveal>
        <section className="section">
          <div className="section__header">
            <h2>가장 많이 찾는 계산기</h2>
            <p>가장 많이 사용되는 핵심 계산기 4가지를 모았습니다. 계산 후 관련 가이드로 바로 이어집니다.</p>
          </div>
          <div className="feature-grid">
            <Link className="value-card" href="/weekly-holiday" style={{ textDecoration: 'none' }}>
              <span className="card-accent-bar" style={{ background: '#5B8C3E' }} />
              <div className="value-card__icon" style={{ background: '#eef6ea', color: '#415b10', border: 'none' }}>주</div>
              <h3>주휴수당 계산기</h3>
              <p>시급이나 월급만 입력하면 주휴수당 대상 여부와 월 환산액을 바로 계산합니다.</p>
            </Link>
            <Link className="value-card" href="/severance" style={{ textDecoration: 'none' }}>
              <span className="card-accent-bar" style={{ background: '#7b4d12' }} />
              <div className="value-card__icon" style={{ background: '#f3efe3', color: '#7b4d12', border: 'none' }}>퇴</div>
              <h3>퇴직금 계산기</h3>
              <p>입사일, 퇴사일, 최근 3개월 급여를 기준으로 법정 퇴직금을 간편하게 추정합니다.</p>
            </Link>
            <Link className="value-card" href="/net-salary" style={{ textDecoration: 'none' }}>
              <span className="card-accent-bar" style={{ background: '#a14a12' }} />
              <div className="value-card__icon" style={{ background: '#f7efe6', color: '#a14a12', border: 'none' }}>세</div>
              <h3>실수령액 계산기</h3>
              <p>세전 월급이나 연봉을 넣으면 4대보험과 세금 공제 후 세후 금액을 확인할 수 있습니다.</p>
            </Link>
            <Link className="value-card" href="/minimum-wage" style={{ textDecoration: 'none' }}>
              <span className="card-accent-bar" style={{ background: '#9e2d1a' }} />
              <div className="value-card__icon" style={{ background: '#f7ebe8', color: '#9e2d1a', border: 'none' }}>임</div>
              <h3>최저임금 계산기</h3>
              <p>2026년 최저임금 10,320원 기준으로 환산 시급과 월 부족분을 함께 점검합니다.</p>
            </Link>
          </div>
        </section>
        </ScrollReveal>

        <ScrollReveal>
        <section className="section section--alt">
          <div className="section__header">
            <h2>계산기에서 바로 이어지는 정보 글</h2>
            <p>계산만 하고 떠나지 않도록, 실제로 많이 이어서 읽게 되는 가이드를 메인에서도 미리 보여줍니다.</p>
          </div>
          <div className="value-grid">
            <Link className="value-card" href="/guide/resignation" style={{ textDecoration: 'none' }}>
              <h3>퇴직금 받고 퇴사할 때 반드시 챙겨야 할 체크리스트</h3>
              <p>퇴사일, 연차수당, 퇴직금 지급기한, 실업급여 준비까지 한 번에 정리합니다.</p>
            </Link>
            <Link className="value-card" href="/guide/severance" style={{ textDecoration: 'none' }}>
              <h3>퇴직금 계산할 때 상여금과 연차수당을 빼먹으면 손해 보는 이유</h3>
              <p>평균임금 계산식에 어떤 항목이 들어가는지 실제 예시로 설명합니다.</p>
            </Link>
            <Link className="value-card" href="/guide/payslip" style={{ textDecoration: 'none' }}>
              <h3>급여명세서에서 실수령액이 줄어드는 항목 바로 찾는 법</h3>
              <p>국민연금, 건강보험, 소득세가 어디서 빠지는지 빠르게 확인할 수 있습니다.</p>
            </Link>
            <Link className="value-card" href="/sources" style={{ textDecoration: 'none' }}>
              <h3>계산 근거와 공식 출처 한 번에 보기</h3>
              <p>고용노동부, 국세청, 국민연금공단 자료를 기준으로 계산식을 정리했습니다.</p>
            </Link>
          </div>
        </section>
        </ScrollReveal>
      </main>
    </>
  );
}
