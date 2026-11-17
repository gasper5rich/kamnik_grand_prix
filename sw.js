// Grand Prix Kamnik – delovanje brez povezave
// Ob vsaki novi objavi povečaj številko različice, da telefoni naložijo novo igro.
const CACHE='gp-kamnik-v1';
const FILES=['./','./index.html','./three.min.js','./manifest.webmanifest','./icon-192.png','./icon-512.png','./apple-touch-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET'||new URL(e.request.url).origin!==location.origin)return;
  if(e.request.mode==='navigate'){ // stran: najprej splet, sicer shranjena
    e.respondWith(fetch(e.request).then(r=>{const k=r.clone();caches.open(CACHE).then(c=>c.put('./index.html',k));return r}).catch(()=>caches.match('./index.html')));return}
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(n=>{const k=n.clone();caches.open(CACHE).then(c=>c.put(e.request,k));return n})));
});
