import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.taesagak.co.kr';

const routes = [
  '',
  '/calculator',
  '/weekly-holiday',
  '/severance',
  '/net-salary',
  '/minimum-wage',
  '/guide/weekly-holiday',
  '/guide/payslip',
  '/guide/resignation',
  '/guide/severance',
  '/about',
  '/sources',
  '/update-log',
  '/privacy',
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route, index) => ({
    url: `${siteUrl}${route || '/'}`,
    lastModified: new Date(),
    changeFrequency: index < 6 ? 'weekly' : 'monthly',
    priority: index < 6 ? 0.9 : 0.7,
  }));
}
