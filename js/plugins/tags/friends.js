const FriendsJS={requestAPI:(e,t,r)=>{let a=5;function n(){return new Promise((o,l)=>{let s=0,i=setTimeout(()=>{0===s&&(s=2,i=null,l("请求超时"),0==a&&r())},5e3);fetch(e).then(function(e){if(2!==s&&(clearTimeout(i),o(e),i=null,s=1),e.ok)return e.json();throw Error("Network response was not ok.")}).then(function(e){a=0,t(e)}).catch(function(e){a>0?(a-=1,setTimeout(()=>{n()},5e3)):r()})})}n()},layout:e=>{let t=e.el;FriendsJS.requestAPI(e.api,function(r){t.querySelector(".loading-wrap").remove();let a=r.content;var n="";a.forEach((t,r)=>{var a='<div class="user-card">';a+='<a class="card-link" target="_blank" rel="external noopener noreferrer" href="'+t.url+'">'+('<img alt="'+t.title+'" src="')+(t.avatar||e.avatar)+'" onerror="errorImgAvatar(this)"><div class="name"><span>'+t.title+"</span></div></a></div>",n+=a}),t.querySelector(".group-body").innerHTML=n},function(){try{t.querySelector(".loading-wrap svg").remove(),t.querySelector(".loading-wrap p").innerText("加载失败，请稍后重试。")}catch(e){}})},start:()=>{let e=document.getElementsByClassName("friendsjs-wrap");for(var t=0;t<e.length;t++){let r=e[t],a=r.getAttribute("api");if(null!=a){var n={};n.el=r,n.api=a,n.class=r.getAttribute("class"),n.avatar=volantis.GLOBAL_CONFIG.default.avatar,FriendsJS.layout(n)}}}};FriendsJS.start(),document.addEventListener("pjax:complete",function(){FriendsJS.start()});