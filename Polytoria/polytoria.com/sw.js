importScripts('/cache-polyfill.js');


self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('airhorner').then(function(cache) {
     return cache.addAll([
       '/',
       'https://rocrafterowebapp.vercel.app/index.html',
       'https://rocrafterowebapp.vercel.app/index.html?homescreen=1',
       'https://rocrafterowebapp.vercel.app/index.html/?homescreen=1',
       '/styles/main.css',
       'https://rocrafterowebapp.vercel.app/scripts/main.min.js',
       '/sounds/airhorn.mp3'
     ]);
   })
 );
});