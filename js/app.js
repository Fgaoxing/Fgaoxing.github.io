Jian={debug:!0,var:{},console:{success:e=>{Jian.debug&&console.log(`%c${e}`,"border-left: 5px solid green;text-decoration: none;border-radius: 3px;color:#000 !important;background:write;padding: 3px")},warning:e=>{Jian.debug&&console.log(`%c${e}`,"border-left: 5px solid yellow;text-decoration: none;border-radius: 3px;color:#000 !important;background:write;padding: 3px")},info:e=>{Jian.debug&&console.log(`%c${e}`,"border-left: 5px solid dodgerblue;text-decoration: none;border-radius: 3px;color:#000 !important;background:write;padding: 3px")},error:e=>{Jian.debug&&console.log(`%c${e}`,"border-left: 5px solid red;text-decoration: none;border-radius: 3px;color:#000 !important;background:write;padding: 3px")},debug:e=>{Jian.debug&&console.log(`%c${e}`,"border-left: 5px solid gray;text-decoration: none;border-radius: 3px;color:#000 !important;background:write;padding: 3px")},logo:()=>{console.log("%c     _ _             \n    | (_) __ _ _ __  \n _  | | |/ _\\` | '_ \\\n| |_| | | (_| | | | |\n \\___/|_|\\__,_|_| |_|","color:white;!important;background:dodgerblue;padding: 3px;text-align: center;")}},plugins:{lazyload:function(){var e=document.documentElement.clientHeight,t=document.querySelectorAll("img[lazyload]");Array.prototype.forEach.call(t,(function(t,n){var o,i;""!==t.getAttribute("lazyload")&&((o=t.getBoundingClientRect()).bottom>=0&&o.top<e&&((i=new Image).src=t.getAttribute("lazyload"),i.onload=function(){t.src=i.src,Jian.console.success(i.src+" 加载成功");let e=new CustomEvent("Jian:lazyload:load",{detail:{url:i.src,dom:t}});document.dispatchEvent(e),window.dispatchEvent(e)},i.onerror=function(){if(t.again){if(t.again>=5)return}else t.again=0;t.again++,t.setAttribute("lazyload",i.src),Jian.console.error(i.src+" 加载失败");let e=new CustomEvent("Jian:lazyload:error",{detail:{url:i.src,dom:t}});document.dispatchEvent(e),window.dispatchEvent(e)},t.removeAttribute("lazyload")))}))},read:function(){if(-1!==document.body.classList.value.indexOf("read")){document.body.classList.add("read");let e=new CustomEvent("Jian:read",{detail:!0});document.dispatchEvent(e),window.dispatchEvent(e)}else{document.body.classList.remove("read");let e=new CustomEvent("Jian:read",{detail:!1});document.dispatchEvent(e),window.dispatchEvent(e)}}},onload:{list:[],state:!1,Promise:function(e,...t){return new Promise((function(n){n(e(...t))}))},add:function(e,...t){if(this.state)try{e(...t)}catch(t){Jian.console.error(t)}else this.list.push({fn:e,e:t});let n=new CustomEvent("Jian:add_onload",{detail:{fn:e,e:t}});document.dispatchEvent(n),window.dispatchEvent(n)},run:function(e=!1){if(this.state)return 0;this.state=!0;for(let e=0;e<this.list.length;e++)try{this.Promise(this.list[e].fn,...this.list[e].e).then()}catch(e){Jian.console.error(e)}let t=new CustomEvent("Jian:onload",{detail:{list:this.list}});document.dispatchEvent(t),window.dispatchEvent(t)}},dark:{set:function(e){Jian.console.info(e?"切换为暗色模式":"切换为亮色模式"),"boolean"!=typeof e&&Jian.console.error("set(n),n must be a boolean"),Jian.var.dark=e;let t=new CustomEvent("Jian:dark_set",{detail:Jian.var.dark});document.dispatchEvent(t),window.dispatchEvent(t),localStorage.setItem("dark",e),e?document.body.classList.add("dark"):document.body.classList.remove("dark")},change:function(){Jian.var.dark?this.set(!1):this.set(!0)}},load:{js:function(e,t=void 0){Jian.onload.add((function(e,t){if(document.querySelector(`script[type="text/javascript"][src="${e}"]`))"function"==typeof t&&t();else{var n=document.createElement("script");t=t||function(){};window.dispatchEvent(new CustomEvent("Jian:onload_js",{detail:{url:e,fn:t}})),n.type="text/javascript",n.onload=function(){Jian.console.success(e+" 加载成功"),"function"==typeof t&&t()},n.onerror=function(){Jian.console.error(e+" 加载失败")},n.src=e,document.getElementsByTagName("head")[0].appendChild(n)}}),e,t)},css:function(e,t=void 0){Jian.onload.add((function(e,t=void 0){if(document.querySelector(`link[rel="stylesheet"][href="${e}"]`))"function"==typeof t&&t();else{var n=document.createElement("link");t=t||function(){};window.dispatchEvent(new CustomEvent("Jian:onload_css",{detail:{url:e,fn:t}})),n.rel="stylesheet",n.href=e,n.onload=function(){Jian.console.success(e+" 加载成功"),"function"==typeof t&&t()},n.onerror=function(){Jian.console.error(e+" 加载失败")},document.getElementsByTagName("head")[0].appendChild(n)}}),e,t)}},msg:function(e){document.msg=document.getElementById("msg");let t=`MsgCard-${(new Date).getTime()}`;document.msg.innerHTML=`<div class="card w-full ${e.color?"color-"+e.color+"-full":""}" id="${t}"><div><div class="title"><i class="${e.icon||""}"></i> ${e.title||""}</div><div class="text">${e.msg||e.text||""}</div></div></div>`+document.msg.innerHTML,"function"==typeof e.click&&document.getElementById(t).addEventListener("click",e.click);let n=new CustomEvent("Jian:onmsg",{detail:e});document.dispatchEvent(n),window.dispatchEvent(n),setTimeout((function(e){let t=new CustomEvent("Jian:add_onload",{detail:e});document.dispatchEvent(t),window.dispatchEvent(t),document.getElementById(e).remove()}),e.timeout||3e3,t)},loading:function(e,t){t=t||1e3,document.body.querySelector("div.loading_page").querySelector("style").innerText=e?"*{transition:none}.loading_i{visibility:visible}body{visibility:hidden}":"",setTimeout((e=>{document.body.querySelector("div.loading_page").style.visibility=e?"visible":"hidden",document.body.style.visibility=e?"hidden":"visible"}),e?0:t,e)}},DOMLoadStartTime=(new Date).getTime(),Jian.onload.add((()=>{for(let e of document.querySelectorAll("article div.content p > img[alt]")){let t=e.getAttribute("alt")||void 0;e.outerHTML=e.outerHTML+`<span class="img-content">${t||""}</span>`}for(let e of document.querySelectorAll('input[type="checkbox"]'))e.classList.add("checkbox"),e.classList.add("color-blue-full")})),window.addEventListener("DOMContentLoaded",(function(){Jian.console.info("DOM加载完毕, 用时"+((new Date).getTime()-DOMLoadStartTime).toString()+"ms"),"true"===localStorage.getItem("dark")?Jian.dark.set(!0):"false"===localStorage.getItem("dark")?Jian.dark.set(!1):Jian.dark.set(window.matchMedia("(prefers-color-scheme: dark)").matches),Jian.console.logo(),Jian.onload.run(),document.documentElement.offsetWidth>672?document.getElementsByClassName("menu")[0].style.display="flex":document.getElementsByClassName("menu")[0].style.display="none",Jian.loading(!1),location.hash&&document.querySelector(decodeURIComponent(location.hash)).scrollIntoView({behavior:"smooth",block:"center",inline:"center"})})),"/"!==window.location.pathname[window.location.pathname.length-1]&&-1===window.location.pathname.split("/")[0].indexOf(".")&&"/"!==window.location.pathname&&history.pushState({},"",window.location.pathname+"/"),window.addEventListener("resize",(function(){document.documentElement.offsetWidth>672?document.getElementsByClassName("menu")[0].style.display="flex":document.getElementsByClassName("menu")[0].style.display="none"})),window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",(function(){Jian.dark.set(window.matchMedia("(prefers-color-scheme: dark)").matches)}));