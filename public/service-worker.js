// src/service-worker.js
/* eslint-disable no-restricted-globals */

import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';



const CACHE_NAME = 'movie-app-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/static/js/bundle.js',
    '/static/js/main.chunk.js',
    '/static/js/vendors~main.chunk.js',
    '/static/css/main.chunk.css',
    '/manifest.json',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png',
];
precacheAndRoute([{"revision":"0626bd91190761dcf4b1422105878cc1","url":"apple.png"},{"revision":"05d89475fed967fa63d7e0d4a8549d8e","url":"asset-manifest.json"},{"revision":"53d493b8da7be167d8016a09fbec4da2","url":"bgImage.jpg"},{"revision":"c92b85a5b907c70211f4ec25e29a8c4a","url":"favicon.ico"},{"revision":"98726051955a8be042c18edd0e30bbcb","url":"Group 3.png"},{"revision":"a3a232dd263727194d64e13842e8d451","url":"Group_56.jpg"},{"revision":"fa2538b29958de3a0d968b89c8f60416","url":"icons/icon-192x192.png"},{"revision":"3794f23317ced3a3c813f0e8ba768ca3","url":"image_shifu.png"},{"revision":"cc29e91c2f982320f3feb2fe4bd1f426","url":"images.jpg"},{"revision":"19591df2ee05c5cd18c5a152655337b6","url":"index.html"},{"revision":"33dbdd0177549353eeeb785d02c294af","url":"logo192.png"},{"revision":"917515db74ea8d1aee6a246cfbcc0b45","url":"logo512.png"},{"revision":"fbd811abeeddf6ac0e770491a49c6881","url":"manifest.json"},{"revision":"5cb273720b61c008c45428503825c840","url":"mastercard.png"},{"revision":"a14c2454f2413a8551f7a7d0224a9e3c","url":"offline.html"},{"revision":"4f0bed4d701ef2effc78cc17a57152ba","url":"pay_suc_bg.png"},{"revision":"b5bb788389e64275f1f1fb016da1b7f1","url":"qr.png"},{"revision":"b593b07cef2d81c19751dc6dce962912","url":"service-worker.js"},{"revision":"a3dd5225a1187ac109379c02e14704a8","url":"static/css/main.d937906d.css"},{"revision":"3219b57ac9ebdb79fa78c0ad3d98c07a","url":"static/js/main.50179b83.js"},{"revision":"76c99e40c21b0bcde75f123ab709f12f","url":"Vector.png"}] || []);
registerRoute(
    ({ request }) => request.destination === 'script' || request.destination === 'style' || request.destination === 'document',
    new StaleWhileRevalidate({
      cacheName: 'static-resources',
    })
  );

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
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


self.addEventListener('activate', (event) => {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== 'static-resources') {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });

self.addEventListener('push', (event) => {
    console.log("something pushed");
    const data = event.data;
  });
  