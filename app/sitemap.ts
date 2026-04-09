import type { MetadataRoute } from 'next';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

export const dynamic = 'force-static';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://taesagak.co.kr';

/* ── 정적 라우트 (수동 관리) ── */
const staticRoutes: MetadataRoute.Sitemap = [
  { url: `${siteUrl}/`,               lastModified: new Date('2026-03-26'), changeFrequency: 'weekly',  priority: 1.0 },
  { url: `${siteUrl}/calculator/`,     lastModified: new Date('2026-03-26'), changeFrequency: 'weekly',  priority: 0.9 },
  { url: `${siteUrl}/weekly-holiday/`, lastModified: new Date('2026-03-26'), changeFrequency: 'weekly',  priority: 0.9 },
  { url: `${siteUrl}/severance/`,      lastModified: new Date('2026-03-26'), changeFrequency: 'weekly',  priority: 0.9 },
  { url: `${siteUrl}/net-salary/`,     lastModified: new Date('2026-03-26'), changeFrequency: 'weekly',  priority: 0.9 },
  { url: `${siteUrl}/minimum-wage/`,   lastModified: new Date('2026-03-26'), changeFrequency: 'weekly',  priority: 0.9 },
  { url: `${siteUrl}/about/`,          lastModified: new Date('2026-01-15'), changeFrequency: 'monthly', priority: 0.6 },
  { url: `${siteUrl}/sources/`,        lastModified: new Date('2026-03-01'), changeFrequency: 'monthly', priority: 0.6 },
  { url: `${siteUrl}/update-log/`,     lastModified: new Date('2026-03-26'), changeFrequency: 'monthly', priority: 0.5 },
  { url: `${siteUrl}/privacy/`,        lastModified: new Date('2026-01-15'), changeFrequency: 'yearly',  priority: 0.3 },
  { url: `${siteUrl}/terms/`,          lastModified: new Date('2026-01-15'), changeFrequency: 'yearly',  priority: 0.3 },
  { url: `${siteUrl}/contact/`,        lastModified: new Date('2026-03-31'), changeFrequency: 'yearly',  priority: 0.3 },
];

/* ── 가이드 라우트 (content/guide MDX 스캔) ── */
function getGuideRoutes(): MetadataRoute.Sitemap {
  const guideDir = path.join(process.cwd(), 'content', 'guide');
  if (!fs.existsSync(guideDir)) return [];

  const files = fs.readdirSync(guideDir).filter((f) => f.endsWith('.mdx'));

  const guideIndex: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/guide/`, lastModified: new Date('2026-04-06'), changeFrequency: 'monthly', priority: 0.8 },
  ];

  const guidePages: MetadataRoute.Sitemap = files.map((file) => {
    const slug = file.replace(/\.mdx$/, '');
    const raw = fs.readFileSync(path.join(guideDir, file), 'utf-8');
    const { data } = matter(raw);
    const modified = data.dateModified || data.datePublished || '2026-04-06';
    return {
      url: `${siteUrl}/guide/${slug}/`,
      lastModified: new Date(modified),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    };
  });

  return [...guideIndex, ...guidePages];
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [...staticRoutes, ...getGuideRoutes()];
}
