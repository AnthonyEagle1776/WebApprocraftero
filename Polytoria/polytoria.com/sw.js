importScripts('/cache-polyfill.js');


self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('airhorner').then(function(cache) {
     return cache.addAll([
       '/',
       'http://rocrafterolegacy.minecrafterscorp.iceiy.com/Polytoria/polytoria.com/index.html',
       'http://rocrafterolegacy.minecrafterscorp.iceiy.com/Polytoria/polytoria.com/index.html?homescreen=1',
       'http://rocrafterolegacy.minecrafterscorp.iceiy.com/Polytoria/polytoria.com/index.html/?homescreen=1',
       '/styles/main.css',
       'http://rocrafterolegacy.minecrafterscorp.iceiy.com/scripts/main.min.js',
       '/sounds/airhorn.mp3'
     ]);
   })
 );
});