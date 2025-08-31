
const CACHE = 'greenbite-v1';
const ASSETS = [
  '/', '/index.html', '/recipes.html', '/calculator.html', '/workouts.html', '/mindfulness.html', '/contact.html',
  '/css/style.css',
  '/js/script.js','/js/recipes.js','/js/calculator.js','/js/workouts.js','/js/mindfulness.js','/js/contact.js',
  '/assets/favicon.png','/assets/hero.svg','/assets/placeholder-recipe.svg'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))))
});
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request).catch(()=> caches.match('/index.html')))
  );
});
