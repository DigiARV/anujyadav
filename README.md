# Anuj Yadav — Anuj The Coach

An editorial personal-brand website built with Astro, TypeScript, and locally hosted fonts. Pages render to static HTML; JavaScript is limited to navigation, resource filtering, and forms. No client credentials, tracking scripts, fabricated testimonials, or invented contact details are included.

## Run

Use Node 24 LTS (see `.nvmrc`). From the repository root:

```sh
npm ci
npm run dev
```

The development server uses port 4321. Production commands:

```sh
npm run check
npm run format:check
npm run build
npm run preview
```

On this cloud machine the home directory is read-only. Use:

```sh
npm ci --cache /workspace/.npm
ASTRO_TELEMETRY_DISABLED=1 npm run build
ASTRO_TELEMETRY_DISABLED=1 npm run dev
```

This cloud task already has an isolated checkout at `/workspace/anujyadav`. Use it directly; do not create a Git worktree unless requested. Dependencies and build outputs may persist in an environment snapshot; running processes do not.

## Structure and editing

- `src/data/site.ts`: approved contact details, media paths, social URLs, service copy, proposed learning programs, and form configuration.
- `src/data/articles.ts`: editable introductory articles, categories, reading times, and sections. Add a unique slug to generate a new article page and sitemap entry.
- `src/pages/`: home, about, services, speaking, training, coaching, education, insights, contact, privacy, and 404.
- `src/components/`: shared navigation, footer, CTAs, portrait, article cards, and enquiry forms.
- `src/styles/global.css`: colors, fluid typography, layouts, responsive breakpoints, focus treatment, and reduced-motion behavior.
- `public/`: favicon, social artwork, and future approved media. Font assets are bundled from the licensed Fontsource packages; there are no runtime font CDN requests.
- `tests/site.spec.ts`: functional browser coverage at mobile and desktop sizes, plus tablet/narrow-screen checks.

The display face is DM Serif Display; the body face is DM Sans. Color and typography tokens are at the top of `global.css`. Both fonts are distributed under the SIL Open Font License in their installed packages.

## Contact and media configuration

Empty values in `site.ts` are hidden. Only enter verified details:

| Field                       | Purpose                                          |
| --------------------------- | ------------------------------------------------ |
| `email`, `phone`            | Direct contact links                             |
| `bookingUrl`, `whatsappUrl` | Real calendar and business WhatsApp destinations |
| `socials`                   | LinkedIn, YouTube, Instagram profile URLs        |
| `portrait`, `portraitAlt`   | Approved local photograph and accurate alt text  |
| `speakerReelUrl`            | Verified external event video/reel               |
| `speakerKitUrl`             | Approved, accurate downloadable PDF              |
| `privacyContact`            | Verified privacy enquiry email                   |

Add an optimized WebP or AVIF portrait to `public/images/`, then set `portrait` to `/images/your-file.webp`. Prefer a 4:5 crop around 1000×1250 pixels; check both the desktop crop and wider mobile crop. Use the original photograph only. Anuj explicitly requires his face to remain unchanged: do not use generative image editing or recreate his likeness. Use CSS cropping and positioning; retain the original background if needed. The monogram is temporary until the original image file is accessible. Speaker footage and credentials remain clearly pending until real assets are supplied.

## Form delivery

**By default no enquiry leaves the browser.** Native field validation and consent produce an explicitly labeled text-file draft. There is no localStorage, mailing list enrollment, or false “sent” state. A downloaded draft remains on the visitor’s device until they delete it.

Copy `.env.example` to `.env` and configure `PUBLIC_FORM_ENDPOINT` with your HTTPS API or compatible form-service endpoint. Public variables are embedded in the static build: never put an API key or secret in them. The backend must perform server-side validation, rate limiting/spam protection, retention controls, and actual persistence or notification. The hidden `website` field is a convenience only, not a security boundary.

The browser sends a JSON POST with `Content-Type: application/json`. The endpoint must permit CORS from your site (including preflight OPTIONS if hosted on a different origin). Return **HTTP 2xx and JSON `{ "success": true }` only after accepting the enquiry for delivery/storage**. Other statuses, malformed responses, timeouts, and `{success:false}` preserve the form and show an unconfirmed-delivery message. No generic third-party service is assumed to support this contract; add an adapter backend if necessary.

Common fields: `enquiryType`, `name`, `email`, `organization`, `message`, `consent` (`"on"`). Speaking adds `eventName`, `eventDate`, `location`, `audienceSize`, `sessionType`, `topic`, `budget`. Training adds `teamSize`, `delivery`, `timing`. General enquiries add `interest`. Values are strings. Configure notifications and test a real submission end-to-end before launch. Browser tests mock the API to verify error/success handling; they do not prove actual delivery.

Before enabling collection, update `src/pages/privacy.astro` with the responsible entity, verified contact, hosting/form providers, retention period, and applicable rights/process. The supplied privacy notice describes draft mode and is a starting point for your review. Marketing subscriptions need a separate explicit opt-in and backend; the education enquiry is not a newsletter signup.

## SEO and launch domain

Set `PUBLIC_SITE_URL` to the verified HTTPS origin, without a path, e.g. `https://your-real-domain.com`, **before building**. No domain is assumed. When absent, canonicals and absolute social URLs are omitted, the sitemap has no entries, and robots.txt disallows indexing. This prevents an unconfigured staging build from claiming a production identity; it is not access control.

With the variable set, pages receive canonical URLs, Open Graph URLs, a PNG sharing image, Twitter metadata, and a sitemap with all public content routes. Page titles/descriptions and accurate Person structured data are included. No awards, reviews, ratings, dates, or event attendance are invented. Article copy is new editorial material for this site, not a claim of past publication or a personal quotation.

## Deploy

1. Provide the launch details and review all copy below.
2. Configure the public environment variables in your static host's build settings.
3. Use `npm ci` as install command and `npm run build` as build command.
4. Publish `dist/` to any static host (Netlify, Cloudflare Pages, or equivalent).
5. Preserve directory routes (`/speaking/index.html` → `/speaking/`) and configure the host to serve `404.html` for unknown paths with HTTP 404. Do not add a single-page-app fallback.
6. Verify the live HTTPS domain, canonical metadata, sitemap, sharing image, and a real enquiry.

`public/_headers` provides basic response headers on hosts that support that file. Configure equivalents on other hosts. No deployment, domain registration, form-service account, or publication is performed by building the project.

## Browser tests

```sh
npm run build
npx playwright install chromium
npm test
```

In this cloud environment Chromium is already installed; browser-download CDN access is restricted:

```sh
ASTRO_TELEMETRY_DISABLED=1 npm run build
PLAYWRIGHT_CHROMIUM_EXECUTABLE=/usr/bin/chromium npm test
```

Tests start their own preview server. Default tests expect draft mode and no production domain. Run them without configured `PUBLIC_FORM_ENDPOINT` or `PUBLIC_SITE_URL`. Tests cover routes/assets, internal links/fragments, form validation and draft download, mocked delivery success/error, enquiry preselection, content filtering, keyboard/menu behavior, reduced motion, metadata, 404 content, layout overflow, and automated accessibility. No existing lint configuration preceded this project; `npm run check` performs strict Astro/TypeScript analysis.

## Needed before launch

- Original portrait file, speaker/event footage, and any additional approved event photography.
- A verified professional biography and relevant credentials. No client logos, testimonials, awards, speaking history, or metrics are currently asserted.
- Approval of service scope, proposed talk topics, formats, availability, and program directions. Programs are explicitly in development, with no dates or enrollment claims.
- Editorial approval of the three starter resources and homepage positioning.
- Real email/phone, social profiles, optional booking/WhatsApp links, and production domain.
- Form delivery provider/backend and a successful real delivery test.
- Privacy owner, provider/retention details, and reviewed privacy wording.
- A real approved media kit, if a download is desired. The link is absent until configured.

The supplied reference URL could not be fetched in the cloud environment (proxy 403). The build follows the user-provided brand and service brief, with an original layout and visual identity.
