import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.taesagak.co.kr';

type RouteEntry = {
  path: string;
  lastModified: string;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
};

const routes: RouteEntry[] = [
  { path: '/',                       lastModified: '2026-03-26', changeFrequency: 'weekly',  priority: 1.0 },
  { path: '/calculator',             lastModified: '2026-03-26', changeFrequency: 'weekly',  priority: 0.9 },
  { path: '/weekly-holiday',         lastModified: '2026-03-26', changeFrequency: 'weekly',  priority: 0.9 },
  { path: '/severance',              lastModified: '2026-03-26', changeFrequency: 'weekly',  priority: 0.9 },
  { path: '/net-salary',             lastModified: '2026-03-26', changeFrequency: 'weekly',  priority: 0.9 },
  { path: '/minimum-wage',           lastModified: '2026-03-26', changeFrequency: 'weekly',  priority: 0.9 },
  { path: '/guide',                  lastModified: '2026-03-26', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/guide/resignation',      lastModified: '2026-03-01', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/guide/severance',        lastModified: '2026-03-01', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/guide/payslip',          lastModified: '2026-03-01', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/guide/weekly-holiday',   lastModified: '2026-03-01', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/about',                  lastModified: '2026-01-15', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/sources',                lastModified: '2026-03-01', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/update-log',             lastModified: '2026-03-26', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/privacy',                lastModified: '2026-01-15', changeFrequency: 'yearly',  priority: 0.3 },
  { path: '/contact',                lastModified: '2026-03-31', changeFrequency: 'yearly',  priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified: new Date(route.lastModified),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
