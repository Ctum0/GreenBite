const CACHE = 'gb-final-v1';
const CORE = ['/', '/index.html', '/offline.html', '/assets/css/style.css', '/assets/js/utils.js'];

self.addEventListener('install', (e)=>{
  e.waitUntil((async()=>{
    const c = await caches.open(CACHE);
    await c.addAll(CORE);
    self.skipWaiting();
  })());
});

self.addEventListener('activate', (e)=>{
  e.waitUntil((async()=>{
    const keys = await caches.keys();
    await Promise.all(keys.map(k => k===CACHE ? null : caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (e)=>{
  const req = e.request;
  if(req.method !== 'GET') return;

  if(req.mode === 'navigate'){
    e.respondWith((async()=>{
      try{
        const net = await fetch(req);
        const c = await caches.open(CACHE);
        c.put(req, net.clone());
        return net;
      }catch{
        const c = await caches.open(CACHE);
        return (await c.match(req)) || (await c.match('/offline.html'));
      }
    })());
    return;
  }

  e.respondWith((async()=>{
    const c = await caches.open(CACHE);
    try{
      const net = await fetch(req);
      c.put(req, net.clone());
      return net;
    }catch{
      return (await c.match(req)) || new Response('', {status:504});
    }
  })());
});