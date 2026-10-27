const CACHE_NAME = 'opr-sk-kesang-tua-v1-20261028';
const SHELL = ['./', './index.html', './manifest.webmanifest', './smart-opr-header.png'];
self.addEventListener('install', event => { event.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(SHELL))); self.skipWaiting(); });
self.addEventListener('activate', event => { event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME && k.startsWith('opr-sk-kesang-tua-')).map(k => caches.delete(k))))); self.clients.claim(); });
self.addEventListener('fetch', event => { const url = new URL(event.request.url); if (event.request.method !== 'GET' || url.origin !== self.location.origin) return; event.respondWith(fetch(event.request).then(response => { if (response.ok) { const copy = response.clone(); caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy)); } return response; }).catch(() => caches.match(event.request))); });
