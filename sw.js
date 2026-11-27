const V="financas-v1",CORE=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png","apple-touch-icon.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
  const r=e.request;if(r.method!=="GET")return;
  const u=new URL(r.url),same=u.origin===location.origin;
  if(same&&r.mode==="navigate"){e.respondWith(fetch(r).then(x=>{const c=x.clone();caches.open(V).then(k=>k.put("index.html",c));return x}).catch(()=>caches.match("index.html")));return}
  if(same){e.respondWith(caches.match(r).then(m=>{const n=fetch(r).then(x=>{if(x.ok){const c=x.clone();caches.open(V).then(k=>k.put(r,c))}return x}).catch(()=>m);return m||n}));return}
  if(u.hostname==="cdnjs.cloudflare.com"){e.respondWith(caches.match(r).then(m=>m||fetch(r).then(x=>{const c=x.clone();caches.open(V).then(k=>k.put(r,c));return x})))}
});
