self.CACHE_NAME="FastJumpCache",self.db={read:e=>new Promise(((t,n)=>{caches.match(new Request(`https://LOCALCACHE/${encodeURIComponent(e)}`)).then((function(e){e.text().then((e=>t(e)))})).catch((()=>{t(null)}))})),write:(e,t)=>new Promise(((n,o)=>{caches.open(CACHE_NAME).then((function(o){o.put(new Request(`https://LOCALCACHE/${encodeURIComponent(e)}`),new Response(t)),n()})).catch((()=>{o()}))}))},document.addEventListener("DOMContentLoaded",(function(){self.db.read(window.location.href).then((function(e){e||fetch(window.location.href).then((function(e){"text/html"===e.headers.get("content-type")&&e.text().then((function(e){self.db.write(window.location.href,e)}))}))}))})),document.addEventListener("DOMContentLoaded",(function(){setInterval((function(){var e=document.querySelectorAll("a[href]");Array.prototype.forEach.call(e,(function(e){e.href&&0===e.href.indexOf(window.location.origin)&&(e.onclick=function(){return history.pushState({},"",e.href),self.db.read(e.href).then((function(t){if(t){console.clear(),document.open();try{document.write(t);let n=window.setInterval((function(){if(document.body&&document.body.innerHTML){let e=new CustomEvent("onload");document.dispatchEvent(e),window.dispatchEvent(e),e=new CustomEvent("DOMContentLoaded"),document.dispatchEvent(e),window.dispatchEvent(e),window.clearInterval(n)}}),500);fetch(e.href).then((function(e){"text/html"===e.headers.get("content-type")&&e.text().then((function(e){self.db.write(window.location.href,e)}))}))}catch(e){}}else fetch(e.href).then((function(t){"text/html"===t.headers.get("content-type")&&t.text().then((function(t){console.clear(),document.open();try{document.write(t);let e=window.setInterval((function(){if(document.body&&document.body.innerHTML){let t=new CustomEvent("onload");document.dispatchEvent(t),window.dispatchEvent(t),t=new CustomEvent("DOMContentLoaded"),document.dispatchEvent(t),window.dispatchEvent(t),window.clearInterval(e)}}),500)}catch(e){}self.db.write(e.href,t)})).catch((function(t){window.location.href=e.href}))})).catch((function(t){window.location.href=e.href}))})).catch((function(t){window.location.href=e.href})),!1})}))}),500)}));