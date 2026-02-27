const servicesData = [
  { slug: "business-website" },
  { slug: "booking-appointment-sites" },
  { slug: "ecommerce-online-store" },
  { slug: "real-estate-portals" },
  { slug: "seo-google-presence" },
  { slug: "website-revamp" }
];

const problemsData = [
  { slug: "outdated-website" },
  { slug: "losing-customers" },
  { slug: "slow-broken-site" },
  { slug: "invisible-online" }
];

const portfolioData = [
  { slug: "sharma-dental-clinic" },
  { slug: "bliss-beauty-lounge" },
  { slug: "gupta-real-estate" },
  { slug: "reddys-kitchen" },
  { slug: "fitzone-gym" },
  { slug: "legaledge-associates" }
];

const processData = [
  { slug: "week-1-discovery-design" },
  { slug: "week-2-development" },
  { slug: "week-3-content-integrations" },
  { slug: "week-4-testing-launch" },
  { slug: "ongoing-support-growth" }
];

const baseUrls = [
  '/',
  '/login',
  '/signup',
  '/forgot-password',
  '/blog',
  '/careers',
  '/terms',
  '/privacy'
];

const dynamicUrls = [
  ...servicesData.map(s => `/services/${s.slug}`),
  ...problemsData.map(p => `/problems/${p.slug}`),
  ...portfolioData.map(p => `/portfolio/${p.slug}`),
  ...processData.map(p => `/process/${p.slug}`)
];

const allUrls = [...baseUrls, ...dynamicUrls];

require('fs').writeFileSync('sitemap-urls.json', JSON.stringify(allUrls, null, 2));
