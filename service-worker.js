self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('v1').then((cache) => {
        return cache.addAll([
          '/',
          '/index.html',
          '/styles.css',
          '/script.js',
          '/images/fondo.jpg',
          '/images/pared.png',
          '/images/inicio.jpg',
          '/images/jugador.png',
          '/sounds/cupid.mp3',
          '/sounds/record.mp3'
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  });
  