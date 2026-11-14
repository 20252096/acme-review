
self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", event => {
  if (event.request.mode === "navigate") {
    console.log("Navigation:", event.request.url);
  }

  event.respondWith(fetch(event.request));
});
