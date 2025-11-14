
const CACHE = 'imago-pwa-v1';
const PRECACHE = ['/', '/index.html', '/style.css', '/app.js', '/manifest.json', '/assets/logo.svg', '/books.html'];
self.addEventListener('install', e=>{ e.waitUntil(caches.open(CACHE).then(c=>c.addAll(PRECACHE))); self.skipWaiting(); });
self.addEventListener('activate', e=>{ e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', e=>{
  const req = e.request;
  if(req.method !== 'GET') return;
  e.respondWith(caches.match(req).then(cached=> cached || fetch(req).then(resp=>{ caches.open(CACHE).then(c=>c.put(req, resp.clone())); return resp; }).catch(()=> caches.match('/index.html'))));
});
