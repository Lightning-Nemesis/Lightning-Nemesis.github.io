// Vercel Web Analytics, loaded by hand: this is what @vercel/analytics does, but its optional peers clash with
// react-scripts 5, so npm refuses to install it. Vercel sets both variables at build time, so nothing loads in
// dev or on GitHub Pages.
const onVercel = Boolean(process.env.REACT_APP_VERCEL_ENV);

let loaded = false;

function load() {
  loaded = true;
  window.va =
    window.va ||
    function va(...params) {
      (window.vaq = window.vaq || []).push(params);
    };

  // Per-deployment script and endpoint paths; the fixed /_vercel/insights ones are on most ad-block lists.
  let conf = {};
  try {
    conf = JSON.parse(process.env.REACT_APP_VERCEL_OBSERVABILITY_CLIENT_CONFIG).analytics || {};
  } catch {}

  const script = document.createElement('script');
  script.src = conf.scriptSrc ? `/${conf.scriptSrc}` : '/_vercel/insights/script.js';
  script.defer = true;
  // Hash routes never change the pathname, so the script's own tracking would log one view of "/" per load
  // and nothing after. Each route is reported through pageview() instead.
  script.dataset.disableAutoTrack = '1';
  for (const key of ['viewEndpoint', 'eventEndpoint', 'sessionEndpoint']) {
    if (conf[key]) script.dataset[key] = `/${conf[key]}`;
  }
  document.head.appendChild(script);
}

export function pageview(path) {
  if (!onVercel) return;
  if (!loaded) load();
  window.va('pageview', { route: path, path });
}
