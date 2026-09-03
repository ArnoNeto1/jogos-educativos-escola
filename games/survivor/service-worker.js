/**
 * service-worker.js
 *
 * Tiny cache-first service worker so the game can be re-launched offline once
 * the player has loaded it at least once. We intentionally keep the cache list
 * short and explicit — it covers the static assets the browser needs to render
 * a frame. localStorage (used by `src/storage.js`) already handles save data.
 *
 * No build step, no Workbox, no dependencies.
 */
/* eslint-env serviceworker */
/* global self, caches, fetch */

const CACHE = 'survivor-v2.2.0';
const ASSETS = [
    './',
    './index.html',
    './styles.css',
    './manifest.json',
    './src/main.js',
    './src/config.js',
    './src/data.js',
    './src/entities.js',
    './src/weapons.js',
    './src/systems.js',
    './src/effects.js',
    './src/audio.js',
    './src/input.js',
    './src/ui.js',
    './src/i18n.js',
    './src/storage.js',
    './src/achievements.js',
    './docs/hero.svg',
    './docs/og-card.svg'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches
            .open(CACHE)
            .then((cache) => cache.addAll(ASSETS))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches
            .keys()
            .then((keys) =>
                Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
            )
            .then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    const req = event.request;
    if (req.method !== 'GET') return;
    // Cache-first for same-origin GETs; bypass everything else.
    const url = new URL(req.url);
    if (url.origin !== self.location.origin) return;
    event.respondWith(
        caches.match(req).then(
            (hit) =>
                hit ||
                fetch(req)
                    .then((res) => {
                        // Opportunistically populate the cache for new same-origin assets.
                        if (res && res.status === 200) {
                            const copy = res.clone();
                            caches.open(CACHE).then((c) => c.put(req, copy));
                        }
                        return res;
                    })
                    .catch(() => caches.match('./index.html'))
        )
    );
});
