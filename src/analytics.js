// Vercel Web Analytics, loaded by hand: this is what @vercel/analytics does, but its optional peers clash with
// react-scripts 5, so npm refuses to install it. Vercel sets both variables at build time, so nothing loads in
// dev or on GitHub Pages. The script logs one view per page load; hash navigation is not tracked.
if (process.env.REACT_APP_VERCEL_ENV) {
  // Per-deployment script and endpoint paths; the fixed /_vercel/insights ones are on most ad-block lists.
  let conf = {};
  try {
    conf = JSON.parse(process.env.REACT_APP_VERCEL_OBSERVABILITY_CLIENT_CONFIG).analytics || {};
  } catch {}

  const script = document.createElement('script');
  script.src = conf.scriptSrc ? `/${conf.scriptSrc}` : '/_vercel/insights/script.js';
  script.defer = true;
  for (const key of ['viewEndpoint', 'eventEndpoint', 'sessionEndpoint']) {
    if (conf[key]) script.dataset[key] = `/${conf[key]}`;
  }
  document.head.appendChild(script);
}
