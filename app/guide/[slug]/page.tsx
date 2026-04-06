import type { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getAllGuides, getGuideBySlug } from '@/lib/guides';
import { buildMetadata } from '@/lib/seo';
import JsonLd, { breadcrumbJsonLd, articleJsonLd } from '@/components/JsonLd';
import { mdxComponents } from '@/components/mdx';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllGuides().map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  return buildMetadata({
    title: guide.title,
    description: guide.description,
    path: `/guide/${slug}`,
    type: 'article',
    keywords: guide.keywords,
  });
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: '홈', path: '/' },
          { name: '가이드', path: '/guide' },
          { name: guide.breadcrumb, path: `/guide/${slug}` },
        ])}
      />
      <JsonLd
        data={articleJsonLd({
          title: guide.title,
          description: guide.description,
          path: `/guide/${slug}`,
          datePublished: guide.datePublished,
          dateModified: guide.dateModified,
        })}
      />

      <main id="main-content" className="page-shell">
        <section className="section">
          <div className="section__header">
            <span className="eyebrow">guide · 2026</span>
            <h1 className="page-title">{guide.title}</h1>
            <p className="page-lead">{guide.description}</p>
          </div>
        </section>

        <div className="guide-article">
          <MDXRemote source={guide.source} components={mdxComponents} />
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
          마지막 업데이트: {guide.dateModified} · 고용노동부·국세청 기준
        </p>
      </main>
    </>
  );
}
