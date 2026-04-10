import type { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getAllBlogPosts, getBlogPostBySlug } from '@/lib/blog';
import { buildMetadata } from '@/lib/seo';
import JsonLd, { breadcrumbJsonLd, articleJsonLd } from '@/components/JsonLd';
import { mdxComponents } from '@/components/mdx';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllBlogPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  return buildMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${slug}`,
    type: 'article',
    keywords: post.keywords,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: '홈', path: '/' },
          { name: '블로그', path: '/blog' },
          { name: post.breadcrumb, path: `/blog/${slug}` },
        ])}
      />
      <JsonLd
        data={articleJsonLd({
          title: post.title,
          description: post.description,
          path: `/blog/${slug}`,
          datePublished: post.datePublished,
          dateModified: post.dateModified,
        })}
      />

      <main id="main-content" className="page-shell">
        <section className="section">
          <div className="section__header">
            <span className="eyebrow">blog · {post.datePublished}</span>
            <h1 className="page-title">{post.title}</h1>
            <p className="page-lead">{post.description}</p>
          </div>
        </section>

        <div className="guide-article">
          <MDXRemote source={post.source} components={mdxComponents} />
        </div>

        <p
          style={{
            textAlign: 'center',
            fontSize: '0.85rem',
            color: 'var(--text-3, #94a3b8)',
            marginTop: '3rem',
            paddingBottom: '2rem',
          }}
        >
          마지막 업데이트: {post.dateModified} · 고용노동부·국세청 기준
        </p>
      </main>
    </>
  );
}
