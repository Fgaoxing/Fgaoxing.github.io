Jian={debug:!0,var:{},console:{success:e=>{Jian.debug&&console.log(`%c${e}`,"border-left: 5px solid green;text-decoration: none;border-radius: 3px;color:#000 !important;background:write;padding: 3px")},warning:e=>{Jian.debug&&console.log(`%c${e}`,"border-left: 5px solid yellow;text-decoration: none;border-radius: 3px;color:#000 !important;background:write;padding: 3px")},info:e=>{Jian.debug&&console.log(`%c${e}`,"border-left: 5px solid dodgerblue;text-decoration: none;border-radius: 3px;color:#000 !important;background:write;padding: 3px")},error:e=>{Jian.debug&&console.log(`%c${e}`,"border-left: 5px solid red;text-decoration: none;border-radius: 3px;color:#000 !important;background:write;padding: 3px")},debug:e=>{Jian.debug&&console.log(`%c${e}`,"border-left: 5px solid gray;text-decoration: none;border-radius: 3px;color:#000 !important;background:write;padding: 3px")},logo:()=>{console.log("%c     _ _             \n    | (_) __ _ _ __  \n _  | | |/ _\\` | '_ \\\n| |_| | | (_| | | | |\n \\___/|_|\\__,_|_| |_|","color:white;!important;background:dodgerblue;padding: 3px;text-align: center;")}},plugins:{lazyload:function(){var e=document.documentElement.clientHeight,t=document.querySelectorAll("img[lazyload]");Array.prototype.forEach.call(t,(function(t,n){var o,i;""!==t.getAttribute("lazyload")&&((o=t.getBoundingClientRect()).bottom>=0&&o.top<e&&((i=new Image).src=t.getAttribute("lazyload"),i.onload=function(){t.src=i.src,Jian.console.success(i.src+" 加载成功");let e=new CustomEvent("Jian:lazyload:load",{detail:{url:i.src,dom:t}});document.dispatchEvent(e),window.dispatchEvent(e)},i.onerror=function(){t.setAttribute("lazyload",i.src),Jian.console.error(i.src+" 加载失败");let e=new CustomEvent("Jian:lazyload:error",{detail:{url:i.src,dom:t}});document.dispatchEvent(e),window.dispatchEvent(e)},t.removeAttribute("lazyload")))}))},read:function(){if(0!==document.body.classList.value.indexOf("read")){document.body.classList.add("read"),document.body.addEventListener("click",Jian.plugins.read);let e=new CustomEvent("Jian:read",{detail:!0});document.dispatchEvent(e),window.dispatchEvent(e)}else{document.body.removeEventListener("click",Jian.plugins.read),document.body.classList.remove("read");let e=new CustomEvent("Jian:read",{detail:!1});document.dispatchEvent(e),window.dispatchEvent(e)}}},onload:{list:[],onloadList:[],state:!1,Promise:function(e,...t){return new Promise((function(){e(...t)}))},addOnload:function(e,...t){if(this.state)try{e(...t)}catch(t){Jian.console.error(t)}else this.onloaLlist.push(this.Promise(e,...t));let n=new CustomEvent("Jian:add_onload",{detail:{fn:e,e:t}});document.dispatchEvent(n),window.dispatchEvent(n)},add:function(e,...t){if(this.state)try{e(...t)}catch(t){Jian.console.error(t)}else this.list.push(this.Promise(e,...t));let n=new CustomEvent("Jian:add_onload",{detail:{fn:e,e:t}});document.dispatchEvent(n),window.dispatchEvent(n)},run:function(e=!1){if(e)if(this.state=!0,/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)){for(let e=0;e<this.onloadList.length;e++)try{this.onloadList[e]().then()}catch(e){Jian.console.error(e)}let e=new CustomEvent("Jian:onload");document.dispatchEvent(e),window.dispatchEvent(e)}else Promise.allSettled(this.onloadList).then((function(){let e=new CustomEvent("Jian:onload");document.dispatchEvent(e),window.dispatchEvent(e)}));if(this.state=!0,/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)){for(let e=0;e<this.list.length;e++)try{this.list[e]().then()}catch(e){Jian.console.error(e)}let e=new CustomEvent("Jian:DOMonload");document.dispatchEvent(e),window.dispatchEvent(e)}else Promise.allSettled(this.list).then((function(){let e=new CustomEvent("Jian:DOMonload");document.dispatchEvent(e),window.dispatchEvent(e)}))}},dark:{set:function(e){Jian.console.info(e?"切换为暗色模式":"切换为亮色模式"),"boolean"!=typeof e&&Jian.console.error("set(n),n must be a boolean"),Jian.var.dark=e;let t=new CustomEvent("Jian:dark_set",{detail:Jian.var.dark});document.dispatchEvent(t),window.dispatchEvent(t),localStorage.setItem("dark",e),e?document.body.classList.add("dark"):document.body.classList.remove("dark")},change:function(){Jian.var.dark?this.set(!1):this.set(!0)}},load:{js:function(e,t=void 0){Jian.onload.add((function(e,t){var n=document.createElement("script");t=t||function(){};window.dispatchEvent(new CustomEvent("Jian:onload_js",{detail:{url:e,fn:t}})),n.type="text/javascript",n.onload=function(){Jian.console.success(e+" 加载成功"),t()},n.onerror=function(){Jian.console.error(e+" 加载失败")},n.src=e,document.getElementsByTagName("head")[0].appendChild(n)}),e,t)},css:function(e,t=void 0){Jian.onload.add((function(e,t=void 0){var n=document.createElement("link");t=t||function(){};window.dispatchEvent(new CustomEvent("Jian:onload_css",{detail:{url:e,fn:t}})),n.rel="stylesheet",n.href=e,n.onload=function(){Jian.console.success(e+" 加载成功"),t()},n.onerror=function(){Jian.console.error(e+" 加载失败")},document.getElementsByTagName("head")[0].appendChild(n)}),e,t)}},msg:function(e){document.msg=document.getElementById("msg");let t=`MsgCard-${(new Date).getTime()}`;document.msg.innerHTML=`<div class="card w-full" id="${t}"><div><div class="title"><i class="${e.icon||""}" style="${e.icon_color?"color:"+e.icon_color:""}"></i> ${e.title||""}</div><div class="text">${e.msg||e.text||""}</div></div></div>`+document.msg.innerHTML,"function"==typeof e.click&&document.getElementById(t).addEventListener("click",e.click);let n=new CustomEvent("Jian:onmsg",{detail:e});document.dispatchEvent(n),window.dispatchEvent(n),setTimeout((function(e){let t=new CustomEvent("Jian:add_onload",{detail:e});document.dispatchEvent(t),window.dispatchEvent(t),document.getElementById(e).remove()}),e.timeout||3e3,t)}},DOMLoadStartTime=(new Date).getTime(),window.addEventListener("DOMContentLoaded",(function(){Jian.console.info("DOM加载完毕, 用时"+((new Date).getTime()-DOMLoadStartTime).toString()+"ms"),"true"===localStorage.getItem("dark")&&Jian.dark.set(!0),Jian.console.logo(),console.log((document.title+" "+document.getElementById("post").innerText.replaceAll("\n"," ")).substring(0,201)),Jian.onload.run()})),window.addEventListener("onload",(function(){Jian.onload.run(!0)})),"/"!==window.location.pathname[window.location.pathname.length-1]&&-1===window.location.pathname.split("/")[0].indexOf(".")&&"/"!==window.location.pathname&&history.pushState({},"",window.location.pathname+"/");