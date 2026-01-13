const CACHE_NAME = 'maville-v1.2';
const PRECACHE_URLS = [
    '/',
    '/index.html',
    '/offline.html',
    '/style.css',
    '/script.js',
    '/manifest.json'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(PRECACHE_URLS))
    );
    self.skipWaiting();
});

// Runtime caching with simple strategies:
// - Navigation requests: network-first, fallback to /offline.html
// - Other requests: cache-first with background update
self.addEventListener('fetch', event => {
    const request = event.request;

    // Only handle GET requests
    if (request.method !== 'GET') return;

    if (request.mode === 'navigate') {
        event.respondWith(
            fetch(request).then(networkResponse => {
                // update cache
                caches.open(CACHE_NAME).then(cache => cache.put(request, networkResponse.clone()));
                return networkResponse;
            }).catch(() => caches.match('/offline.html'))
        );
        return;
    }

    // For other requests, try cache first, then network and update cache
    event.respondWith(
        caches.match(request).then(cachedResponse => {
            const networkFetch = fetch(request).then(networkResponse => {
                // cache opaque responses too (e.g., CDN fonts) but guard by status
                if (networkResponse && (networkResponse.status === 200 || networkResponse.type === 'opaque')) {
                    caches.open(CACHE_NAME).then(cache => cache.put(request, networkResponse.clone()));
                }
                return networkResponse;
            }).catch(() => null);

            // return cached if present, else network
            return cachedResponse || networkFetch;
        })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});