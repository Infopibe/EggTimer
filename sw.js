// Service Worker – caches all app assets for offline use
var CACHE_NAME = 'eggtimer-v1';
var ASSETS = [
    './',
    './index.html',
    './style.css',
    './script.js',
    './manifest.json',
    './assets/egg-soft.png',
    './assets/egg-hard.png',
    './assets/egg-fried.png',
    './assets/egg-scrambled.png',
    './assets/egg-soft.gif',
    './assets/egg-hard.gif',
    './assets/egg-fried.gif',
    './assets/egg-scramble.gif',
    './assets/egg-done.gif',
    './assets/cloud1.png',
    './assets/cloud2.png',
    './assets/cloud3.png',
    './assets/cloud4.png',
    './assets/ding.mp3',
    './assets/8664917_window_minimize_icon.png',
    './assets/211651_close_round_icon.png'
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(ASSETS);
        })
    );
});

self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(keys) {
            return Promise.all(
                keys.filter(function(k) { return k !== CACHE_NAME; })
                    .map(function(k) { return caches.delete(k); })
            );
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(cached) {
            return cached || fetch(event.request);
        })
    );
});
