
self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  if (
    event.request.mode === "navigate" &&
    url.pathname.endsWith("/probe")
  ) {
    const html = `
      <!DOCTYPE html>
      <html lang="ko">
      <head>
        <meta charset="UTF-8">
      </head>
      <body>
        <script>
          window.addEventListener("load", () => {
            const nav =
              performance.getEntriesByType("navigation")[0];

            parent.postMessage({
              type: "navigation-result",
              timing: {
                name: nav?.name,
                serverTiming: nav?.serverTiming || []
              }
            }, location.origin);
          });
        <\/script>
      </body>
      </html>
    `;

    event.respondWith(
      new Response(html, {
        headers: {
          "Content-Type": "text/html; charset=utf-8"
        }
      })
    );

    return;
  }

  event.respondWith(fetch(event.request));
});
