import { defineConfig } from 'astro/config';
const site = process.env.PUBLIC_SITE_URL;
if (site && !/^https:\/\/[^/]+\/?$/.test(site))
  throw new Error('PUBLIC_SITE_URL must be an HTTPS origin, e.g. https://your-domain.com');
export default defineConfig({ site: site || undefined, output: 'static', trailingSlash: 'always' });
