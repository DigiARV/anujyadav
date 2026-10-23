import type { APIRoute } from 'astro';
export const GET: APIRoute = ({ site }) =>
  new Response(
    site
      ? `User-agent: *\nAllow: /\nSitemap: ${new URL('sitemap.xml', site).href}\n`
      : 'User-agent: *\nDisallow: /\n# Configure PUBLIC_SITE_URL before launching.\n',
    { headers: { 'Content-Type': 'text/plain' } },
  );
