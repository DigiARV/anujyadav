import AxeBuilder from '@axe-core/playwright';
import { test, expect } from '@playwright/test';
const routes = [
  '/',
  '/about/',
  '/services/',
  '/speaking/',
  '/corporate-training/',
  '/coaching/',
  '/education/',
  '/insights/',
  '/contact/',
  '/privacy/',
  '/insights/start-with-the-work-not-the-tool/',
  '/insights/clarity-before-more-content/',
  '/insights/turn-a-good-conversation-into-action/',
];
test('every page renders without errors, broken assets, or horizontal overflow', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('response', (r) => {
    if (r.status() >= 400) errors.push(`${r.status()} ${r.url()}`);
  });
  for (const path of routes) {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('main')).toBeVisible();
    expect(await page.title()).toContain('Anuj Yadav');
    expect(await page.locator('meta[name=description]').getAttribute('content')).toBeTruthy();
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1),
      path,
    ).toBeTruthy();
  }
  expect(errors).toEqual([]);
});
test('all internal links and anchors have destinations', async ({ page, request }) => {
  const destinations = new Set<string>();
  for (const route of routes) {
    await page.goto(route);
    for (const href of await page
      .locator('a[href]')
      .evaluateAll((links) =>
        links.map((link) => (link as HTMLAnchorElement).getAttribute('href')!),
      )) {
      if (href.startsWith('/') || href.startsWith('#'))
        destinations.add(new URL(href, `http://127.0.0.1:4321${route}`).href);
    }
  }
  for (const href of destinations) {
    const url = new URL(href);
    const response = await request.get(url.pathname + url.search);
    expect(response.status(), href).toBe(200);
    if (url.hash) {
      const html = await response.text();
      expect(html, href).toContain(`id="${decodeURIComponent(url.hash.slice(1))}"`);
    }
  }
});
test('navigation works with keyboard and mobile menu closes with Escape', async ({
  page,
  isMobile,
}) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  if (isMobile) {
    const toggle = page.locator('.menu-toggle');
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await page.keyboard.press('Escape');
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(toggle).toBeFocused();
    await toggle.click();
  }
  await page
    .getByRole('navigation', { name: 'Main navigation' })
    .getByRole('link', { name: 'Speaking', exact: true })
    .click();
  await expect(page).toHaveURL(/\/speaking\/$/);
  await page.getByRole('main').getByRole('link', { name: 'Invite Anuj to speak' }).click();
  await expect(page).toHaveURL(/#enquire$/);
  await expect(page.getByRole('textbox', { name: 'Your name' })).toBeVisible();
});
test('speaking enquiry validates and creates an honest downloadable draft', async ({ page }) => {
  await page.goto('/speaking/#enquire');
  await page.getByRole('button', { name: 'Prepare enquiry draft' }).click();
  await expect(page.locator('.form-result')).toBeHidden();
  await page.getByLabel('Your name').fill('Test Enquirer');
  await page.getByLabel('Work email').fill('test@example.org');
  await page.getByLabel('Organization', { exact: false }).fill('Test Organization');
  await page.getByLabel('Event name').fill('Learning day');
  await page.getByLabel('Event date').fill('2035-05-15');
  await page.getByLabel('City / venue').fill('Virtual');
  await page.getByLabel('Audience size').selectOption('50–200');
  await page.getByLabel('Session type').selectOption('Keynote');
  await page.getByLabel('Topic of interest').fill('Leadership');
  await page.getByRole('checkbox').check();
  await page.getByRole('button', { name: 'Prepare enquiry draft' }).click();
  await expect(page.getByRole('status')).toContainText('Nothing has been sent');
  const download = page.waitForEvent('download');
  await page.getByRole('link', { name: 'Download your enquiry draft' }).click();
  expect((await download).suggestedFilename()).toBe('anuj-enquiry-draft.txt');
});
test('training form and context-aware coaching links work', async ({ page }) => {
  await page.goto('/corporate-training/#enquire');
  await page.getByLabel('Your name').fill('Team Lead');
  await page.getByLabel('Work email').fill('team@example.org');
  await page.getByLabel('Organization').fill('Example');
  await page.getByLabel('Team size').fill('20');
  await page.getByLabel('Delivery preference').selectOption('Virtual');
  await page.getByRole('checkbox').check();
  await page.getByRole('button', { name: 'Prepare enquiry draft' }).click();
  await expect(page.getByRole('status')).toContainText('Nothing has been sent');
  await page.goto('/coaching/');
  await page.getByRole('link', { name: 'Explore leadership coaching' }).click();
  await expect(page.getByLabel('I’m interested in')).toHaveValue('Leadership coaching');
});
test('form handles confirmed success and server failure', async ({ page }) => {
  await page.goto('/contact/');
  await page
    .locator('form')
    .evaluate(
      (form) => ((form as HTMLFormElement).dataset.endpoint = 'https://forms.example.test/enquiry'),
    );
  await page.getByLabel('Your name').fill('Test');
  await page.getByLabel('Email', { exact: false }).fill('test@example.org');
  await page.getByLabel('I’m interested in').selectOption('General enquiry');
  await page.getByRole('checkbox').check();
  await page.route('https://forms.example.test/enquiry', (route) =>
    route.fulfill({ status: 500, contentType: 'application/json', body: '{"success":false}' }),
  );
  await page.getByRole('button', { name: 'Prepare enquiry draft' }).click();
  await expect(page.getByRole('status')).toContainText('could not confirm delivery');
  await expect(page.getByLabel('Your name')).toHaveValue('Test');
  await page.unroute('https://forms.example.test/enquiry');
  await page.route('https://forms.example.test/enquiry', (route) =>
    route.fulfill({ status: 200, contentType: 'application/json', body: '{"success":true}' }),
  );
  await page.getByRole('button', { name: 'Prepare enquiry draft' }).click();
  await expect(page.getByRole('status')).toContainText('Your enquiry has been received');
  await expect(page.getByLabel('Your name')).toHaveValue('');
});
test('insight filters include a meaningful empty state', async ({ page }) => {
  await page.goto('/insights/');
  await page.getByRole('button', { name: 'Leadership', exact: true }).click();
  await expect(page.locator('.article-card:visible')).toHaveCount(1);
  await expect(page.locator('.filter-count')).toHaveText('1 resource');
  await page.getByRole('button', { name: 'Videos & tutorials' }).click();
  await expect(page.locator('.empty-state')).toBeVisible();
  await expect(page.locator('.article-card:visible')).toHaveCount(0);
  await page.getByRole('button', { name: 'All', exact: true }).click();
  await expect(page.locator('.article-card:visible')).toHaveCount(3);
});
test('reduced motion, metadata and 404 work', async ({ page, request }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  expect(await page.locator('.hero-copy').evaluate((e) => getComputedStyle(e).animationName)).toBe(
    'none',
  );
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe(
    'auto',
  );
  await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(1);
  await expect(page.locator('link[rel=canonical]')).toHaveCount(0);
  expect((await request.get('/robots.txt')).status()).toBe(200);
  expect(await (await request.get('/robots.txt')).text()).toContain('Disallow: /');
  expect((await request.get('/sitemap.xml')).status()).toBe(200);
  await page.goto('/this-page-does-not-exist/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('your way forward');
});
test('tablet and narrow mobile layouts fit', async ({ page }) => {
  for (const width of [320, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ['/', '/speaking/', '/services/', '/education/']) {
      await page.goto(route);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1),
        `${route} at ${width}`,
      ).toBeTruthy();
    }
  }
});

test('key pages have no automated WCAG A/AA violations', async ({ page }) => {
  for (const route of ['/', '/speaking/', '/contact/', '/insights/']) {
    await page.goto(route);
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    expect(results.violations, route).toEqual([]);
  }
});
