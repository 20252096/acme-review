

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", event => {
  const url = new URL(event.request.url);

  if (
    event.request.mode === "navigate" &&
    url.pathname.endsWith("/probe")
  ) {
    const portal = url.searchParams.get("portal");

    if (!portal || !portal.startsWith("https://")) {
      event.respondWith(
        new Response("Invalid portal", { status: 400 })
      );
      return;
    }

    const target =
      portal + "/api/profile/search?username=charlie";

    event.respondWith(fetch(target, {
      mode: "cors",
      credentials: "include"
    }));

    return;
  }

  event.respondWith(fetch(event.request));
});
