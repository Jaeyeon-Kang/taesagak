import type { MetadataRoute } from 'next';
import fs from 'node:fs';
import path from 'node:path';

export const dynamic = 'force-static';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://taesagak.co.kr';

/* ── 정적 라우트 (수동 관리) ── */
const staticRoutes: MetadataRoute.Sitemap = [
  { url: `${siteUrl}/`,              lastModified: new Date('2026-03-26'), changeFrequency: 'weekly',  priority: 1.0 },
  { url: `${siteUrl}/calculator`,    lastModified: new Date('2026-03-26'), changeFrequency: 'weekly',  priority: 0.9 },
  { url: `${siteUrl}/weekly-holiday`, lastModified: new Date('2026-03-26'), changeFrequency: 'weekly', priority: 0.9 },
  { url: `${siteUrl}/severance`,     lastModified: new Date('2026-03-26'), changeFrequency: 'weekly',  priority: 0.9 },
  { url: `${siteUrl}/net-salary`,    lastModified: new Date('2026-03-26'), changeFrequency: 'weekly',  priority: 0.9 },
  { url: `${siteUrl}/minimum-wage`,  lastModified: new Date('2026-03-26'), changeFrequency: 'weekly',  priority: 0.9 },
  { url: `${siteUrl}/about`,         lastModified: new Date('2026-01-15'), changeFrequency: 'monthly', priority: 0.6 },
  { url: `${siteUrl}/sources`,       lastModified: new Date('2026-03-01'), changeFrequency: 'monthly', priority: 0.6 },
  { url: `${siteUrl}/update-log`,    lastModified: new Date('2026-03-26'), changeFrequency: 'monthly', priority: 0.5 },
  { url: `${siteUrl}/privacy`,       lastModified: new Date('2026-01-15'), changeFrequency: 'yearly',  priority: 0.3 },
  { url: `${siteUrl}/terms`,         lastModified: new Date('2026-01-15'), changeFrequency: 'yearly',  priority: 0.3 },
  { url: `${siteUrl}/contact`,       lastModified: new Date('2026-03-31'), changeFrequency: 'yearly',  priority: 0.3 },
];

/* ── 가이드 라우트 (폴더 자동 스캔) ── */
function getGuideRoutes(): MetadataRoute.Sitemap {
  const guideDir = path.join(process.cwd(), 'app', 'guide');
  if (!fs.existsSync(guideDir)) return [];

  const entries = fs.readdirSync(guideDir, { withFileTypes: true });
  const slugs = entries
    .filter((e) => e.isDirectory() && fs.existsSync(path.join(guideDir, e.name, 'page.tsx')))
    .map((e) => e.name);

  const guideIndex: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/guide`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ];

  const guidePages: MetadataRoute.Sitemap = slugs.map((slug) => {
    const pagePath = path.join(guideDir, slug, 'page.tsx');
    const stat = fs.statSync(pagePath);
    return {
      url: `${siteUrl}/guide/${slug}`,
      lastModified: stat.mtime,
      changeFrequency: 'monthly',
      priority: 0.7,
    };
  });

  return [...guideIndex, ...guidePages];
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [...staticRoutes, ...getGuideRoutes()];
}
