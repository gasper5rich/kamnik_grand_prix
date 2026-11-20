// Grand Prix Kamnik – delovanje brez povezave
// Ob vsaki novi objavi povečaj številko različice, da telefoni naložijo novo igro.
const CACHE='gp-kamnik-v40';
const FILES=['./','./index.html','./lestvica.html','./three.min.js','./manifest.webmanifest','./icon-192.png','./icon-512.png','./apple-touch-icon.png','./models/sedan.glb','./models/sedan-sports.glb','./models/hatchback-sports.glb','./models/suv.glb','./models/suv-luxury.glb','./models/taxi.glb','./models/van.glb','./models/delivery-flat.glb','./models/delivery.glb','./models/truck.glb','./models/truck-flat.glb','./models/garbage-truck.glb','./models/ship-Boat.glb','./models/ship-BoatWSail.glb','./models/ship-CruiseShip.glb','./models/ship-Sail-ship.glb','./models/cessna.glb'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET'||new URL(e.request.url).origin!==location.origin)return;
  // glasbo vedno naloži brskalnik sam (iPhone ne predvaja zvoka iz predpomnilnika)
  if(e.request.headers.has('range')||e.request.destination==='audio'||/\.mp3$/.test(e.request.url))return;
  if(e.request.mode==='navigate'){ // stran: najprej splet, sicer shranjena
    e.respondWith(fetch(e.request).then(r=>{const k=r.clone();caches.open(CACHE).then(c=>c.put(e.request,k));return r}).catch(()=>caches.match(e.request).then(m=>m||caches.match('./index.html'))));return}
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(n=>{if(n.status===200){const k=n.clone();caches.open(CACHE).then(c=>c.put(e.request,k))}return n})));
});
