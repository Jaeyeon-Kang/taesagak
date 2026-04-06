import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import { getAllGuides } from '@/lib/guides';

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

export default function GuidePage() {
  const guides = getAllGuides();

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
              <Link key={g.slug} className="value-card" href={`/guide/${g.slug}`} style={{ textDecoration: 'none' }}>
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
