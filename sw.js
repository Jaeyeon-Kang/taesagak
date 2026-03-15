const CACHE_NAME = 'taesagak-v0.1.0';
const OFFLINE_ASSETS = [
  './',
  './index.html',
  './app.html',
  './sources.html',
  './privacy.html',
  './update-log.html',
  './styles.css',
  './manifest.webmanifest',
  './favicon.svg',
  './js/rules.js',
  './js/calculators.js',
  './js/app.js',
  './js/sw-register.js',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(OFFLINE_ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))),
    ),
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request)
        .then((response) => {
          const cloned = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, cloned));
          return response;
        })
        .catch(() => caches.match('./index.html'));
    }),
  );
});
