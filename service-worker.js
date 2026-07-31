const CACHE_NAME = "music-player-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/assets/Chase Atlantic - HEAVEN AND BACK 4.mp3",
  "/assets/Jennifer Lopez - On The Floor ft. Pitbull 4.mp3",
  "/assets/LISA - Dream (Lyric Video) 4.mp3",
  "/assets/NATASYA SABELLA - MENERIMA LUKA (OFFICIAL LYRICS VIDEO).mp3",
  "/assets/RealestK - Love Me (Official Audio) 4.mp3",
  "/styles.css",
  "/script.js",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache)),
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response; // serve from cache
      }
      return fetch(event.request).catch(() => {
        // fallback: return a default offline page or silent fail
        return caches.match("/index.html");
      });
    }),
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
});

