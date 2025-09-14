self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('my-cache').then(function(cache) {
      return cache.addAll([
        '/app/',
        '/app/index.html',
        '/app/styles.css',
        '/app/app.js',
        '/app/icon512_maskable.png',
        '/app/icon512_rounded.png',
        '/index.html',
        '/netlify.toml',
        '/package.json',
        '/package-lock.json',
        '/node_modules',
        '/netlify'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );

});
