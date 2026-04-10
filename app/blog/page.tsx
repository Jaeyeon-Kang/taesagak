import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import { getAllBlogPosts } from '@/lib/blog';

export const metadata: Metadata = buildMetadata({
  title: '블로그 — 퇴사·근로 뉴스와 분석',
  description:
    '최저임금 변경, 퇴직금 세금, 실업급여 조건 등 근로자에게 영향을 주는 최신 소식을 정리합니다.',
  path: '/blog',
  keywords: ['퇴사 블로그', '근로 뉴스', '최저임금 인상', '퇴직금 세금'],
});

export default function BlogListPage() {
  const posts = getAllBlogPosts();

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: '홈', path: '/' }, { name: '블로그', path: '/blog' }])} />
      <main id="main-content" className="page-shell">
        <section className="section">
          <div className="section__header">
            <h1 className="page-title">블로그</h1>
            <p className="page-lead">
              근로자에게 영향을 주는 제도 변경, 세금, 급여 관련 최신 소식을 정리합니다.
            </p>
          </div>

          <div className="feature-grid">
            {posts.map((post) => (
              <Link
                key={post.slug}
                className="value-card"
                href={`/blog/${post.slug}`}
                style={{ textDecoration: 'none' }}
              >
                <time
                  dateTime={post.datePublished}
                  style={{ fontSize: '0.8rem', color: 'var(--text-3, #94a3b8)' }}
                >
                  {post.datePublished}
                </time>
                <h2 style={{ fontSize: '1.1rem', marginTop: '0.25rem' }}>{post.title}</h2>
                <p>{post.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="section" style={{ maxWidth: '640px', margin: '0 auto' }}>
          <div className="section__header">
            <h2>계산기도 함께 확인하세요</h2>
          </div>
          <div className="feature-grid">
            <Link className="value-card" href="/severance" style={{ textDecoration: 'none' }}>
              <h3 style={{ fontSize: '1rem' }}>퇴직금 계산기</h3>
              <p>3개월 평균임금 기반 퇴직금을 계산합니다.</p>
            </Link>
            <Link className="value-card" href="/net-salary" style={{ textDecoration: 'none' }}>
              <h3 style={{ fontSize: '1rem' }}>실수령액 계산기</h3>
              <p>4대보험·소득세 공제 후 실수령액을 확인합니다.</p>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
