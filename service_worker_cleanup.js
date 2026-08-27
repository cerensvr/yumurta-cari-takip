self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys();
      await Promise.all(cacheNames.map((name) => caches.delete(name)));
      await self.clients.claim();

      const windows = await self.clients.matchAll({
        type: 'window',
        includeUncontrolled: true,
      });
      await self.registration.unregister();
      await Promise.all(windows.map((windowClient) => windowClient.navigate(windowClient.url)));
    })(),
  );
});

self.addEventListener('fetch', () => {
  // Intentionally empty: every request goes directly to the network.
});
