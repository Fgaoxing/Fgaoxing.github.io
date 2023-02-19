const handle=async e=>fetch(e);self.addEventListener("fetch",(async e=>{e.respondWith(handle(e.request))}));
//# sourceMappingURL=maps/sw.js.map
