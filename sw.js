const CACHE_NAME = "my-app-cache-v1";
const OFFLINE_URLS = [
  "/",              
  "/index.html",    
  "/app/index.html", 
  "/app/style.css", 
  "/app/script.js", 
  "/app/icon512_rounded.png",
  "/app/icon512_maskable.png",
  "/app/manifest.json"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(OFFLINE_URLS))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    )
  );
});
