self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (event.request.mode !== 'navigate' || !url.pathname.endsWith('/probe')) return;
  const portal = url.searchParams.get('portal');
  if (!portal || !/^https:\/\/[^/]+$/.test(portal)) {
    event.respondWith(new Response('Invalid portal', {status:400}));
    return;
  }
  
const username = url.searchParams.get('username') || 'charlie';
const target = portal + '/api/profile/search?username=' +
  encodeURIComponent(username) + '&t=' + Date.now();

  event.respondWith((async () => {
    try {
      // Keep the original cross-origin response rather than creating a new HTML Response.
      return await fetch(target, {mode:'cors', credentials:'include', cache:'no-store'});
    } catch (error) {
      return new Response('Probe failed: ' + String(error), {status:502});
    }
  })());
});

