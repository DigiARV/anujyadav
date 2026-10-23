import type { APIRoute } from 'astro';
import { articles } from '../data/articles';
export const GET: APIRoute = ({ site }) => {
  const routes = [
    '',
    'about/',
    'services/',
    'speaking/',
    'corporate-training/',
    'coaching/',
    'education/',
    'insights/',
    'contact/',
    'privacy/',
    ...articles.map((a) => `insights/${a.slug}/`),
  ];
  const urls = site
    ? routes
        .map((route) => `<url><loc>${new URL(route, site).href.replace(/&/g, '&amp;')}</loc></url>`)
        .join('')
    : '';
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
    { headers: { 'Content-Type': 'application/xml' } },
  );
};
