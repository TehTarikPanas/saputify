const CACHE_NAME = "music-player-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/assets/music/Chase Atlantic - HEAVEN AND BACK 4.mp3",
  "/assets/music/Jennifer Lopez - On The Floor ft. Pitbull 4.mp3",
  "/assets/music/LISA - Dream (Lyric Video) 4.mp3",
  "/assets/music/NATASYA SABELLA - MENERIMA LUKA (OFFICIAL LYRICS VIDEO).mp3",
  "/assets/music/RealestK - Love Me (Official Audio) 4.mp3",
  "/assets/music/[EXID(이엑스아이디)] 덜덜덜(DDD) 뮤직 비디오 (Official Music Video) 4.mp3",
  "/assets/music/[MV] HyunA(현아) _ Cause I'm God Girl(잘나가서 그래) (Feat. 정일훈 Of BTOB).mp3",
  "/assets/music/[MV] HyunA(현아) _ Lip & Hip 4.mp3",
  "/assets/music/4MINUTE - 미쳐(Crazy) 4.mp3",
  "/assets/music/BLACKPINK - 'Lovesick Girls' M_V 4.mp3",
  "/assets/music/Girls' Generation-Oh!GG 소녀시대-Oh!GG '몰랐니 (Lil' Touch)' MV.mp3",
  "/assets/music/Jessi (제시) - '눈누난나 (NUNU NANA)' MV 4.mp3",
  "/assets/music/청하 (CHUNG HA) - 'PLAY (Feat. 창모 (CHANGMO))' M_V.mp3",
  "/assets/music/현아 _ FLOWER SHOWER _ 가사 _ HyunA _ FLOWER SHOWER _ 스페셜클립 _ Special Clip _ LYRICS.mp3",
  "/assets/music/Conor Maynard - For the Night (Lyrics) 4.mp3",
  "/assets/music/Loren Allred - NEVER ENOUGH (LYRIC VIDEO) [The Greatest Showman Soundtrack] 4.mp3",
  "/assets/music/Starting Over Again.mp3",
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
        return response; // serve the correct cached file
      }
      return fetch(event.request).catch(() => {
        // fallback only for HTML, not for songs
        if (event.request.destination === "document") {
          return caches.match("/index.html");
        }
      });
    }),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)),
        ),
      ),
  );
});
