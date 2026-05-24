import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = [
    '',
    '/antrenman',
    '/beslenme',
    '/gelisim',
    '/destek',
    '/baslat',
    '/press',
    '/gizlilik',
    '/sartlar',
    '/kvkk',
  ];
  const legalSet = new Set(['/gizlilik', '/sartlar', '/kvkk']);
  return routes.map((r) => ({
    url: `${site.url}${r}`,
    lastModified: now,
    changeFrequency: r === '' ? 'weekly' : legalSet.has(r) ? 'yearly' : 'monthly',
    priority:
      r === '' ? 1 : r === '/baslat' ? 0.9 : r === '/press' ? 0.5 : legalSet.has(r) ? 0.3 : 0.7,
  }));
}
