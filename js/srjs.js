Jian.onload.add((function(){document.querySelectorAll("a[href]").forEach((url=>{new URL(url.href,window.location.origin).origin===window.location.origin&&(url.onclick=e=>{e.preventDefault?e.preventDefault():e.returnValue=!1,DOMLoadStartTime=(new Date).getTime(),fetch(url.href).then((e=>e.text())).then((text=>{let newPageDoc=(new DOMParser).parseFromString(text,"text/html");for(srsc of(newPageDoc.body.classList.contains("no-sr")&&(window.location.href=url.href),document.querySelector("main.main.page-main").innerHTML=newPageDoc.querySelector("main.main.page-main").innerHTML,document.title=newPageDoc.title,history.pushState({url:url.href,title:document.title},document.title,url.href),Jian.console.info("DOM加载完毕, 用时"+((new Date).getTime()-DOMLoadStartTime).toString()+"ms"),"true"===localStorage.getItem("dark")?Jian.dark.set(!0):"false"===localStorage.getItem("dark")?Jian.dark.set(!1):Jian.dark.set(window.matchMedia("(prefers-color-scheme: dark)").matches),Jian.console.logo(),Jian.onload.state=!1,Jian.onload.run(),document.querySelector("main.main.page-main").querySelectorAll("script.sr")))eval(srsc.innerHTML)})).catch((()=>{window.location.href=url.href}))})}))}));