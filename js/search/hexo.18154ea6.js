let SearchService=(fn={},fn.queryText=null,fn.data=null,fn.template='<div id="u-search">\n  <div class="modal">\n    <header class="modal-header" class="clearfix">\n      <form id="u-search-modal-form" class="u-search-form" name="uSearchModalForm">\n        <input type="text" id="u-search-modal-input" class="u-search-input" />\n        <button type="submit" id="u-search-modal-btn-submit" class="u-search-btn-submit">\n          <span class="fa-solid fa-search"></span>\n        </button>\n      </form>\n      <a id="u-search-btn-close" class="btn-close"> <span class="fa-solid fa-times"></span> </a>\n    </header>\n    <main class="modal-body">\n      <ul class="modal-results"></ul>\n    </main>\n  </div>\n  <div id="modal-overlay" class="modal-overlay"></div>\n</div>\n',fn.init=()=>{let e=document.createElement("div");e.innerHTML+=fn.template,document.body.append(e),document.querySelectorAll(".u-search-form").forEach((e=>{e.addEventListener("submit",fn.onSubmit,!1)})),document.querySelector("#u-search-modal-input").addEventListener("input",fn.onSubmit),document.querySelector("#u-search-btn-close").addEventListener("click",fn.close,!1),document.querySelector("#modal-overlay").addEventListener("click",fn.close,!1)},fn.onSubmit=e=>{e.preventDefault();let t=e.target.querySelector(".u-search-input");fn.queryText=t?t.value:e.target.value,fn.queryText&&fn.search()},fn.search=async()=>{document.querySelectorAll(".u-search-input").forEach((e=>{e.value=fn.queryText})),document.querySelector("#u-search").style.display="block",fn.data||(fn.data=await fn.fetchData());let e="";e+=fn.buildResultList(data.pages),e+=fn.buildResultList(data.posts),document.querySelector("#u-search .modal-results").innerHTML=e,window.pjax&&pjax.refresh(document.querySelector("#u-search")),document.addEventListener("keydown",(function e(t){"Escape"===t.code&&(fn.close(),document.removeEventListener("keydown",e))}))},fn.close=()=>{document.querySelector("#u-search").style.display="none"},fn.fetchData=()=>fetch(SearchServiceDataPath).then((e=>e.text())).then((e=>(data=JSON.parse(e),data))),fn.buildResultList=e=>{let t="";return e.forEach((e=>{e.text&&(e.text=e.text.replace(/12345\d*/g,"")),!e.title&&e.text&&(e.title=e.text.trim().slice(0,15)),fn.contentSearch(e)&&(t+=fn.buildResult(e.permalink,e.title,e.digest))})),t},fn.contentSearch=e=>{let t=e.title.trim().toLowerCase(),n=e.text.trim().toLowerCase(),a=fn.queryText.trim().toLowerCase().split(/[-\s]+/),r=!1,s=-1,l=-1,c=-1;return t&&n&&a.forEach(((i,u)=>{if(s=t.indexOf(i),l=n.indexOf(i),s<0&&l<0?r=!1:(r=!0,l<0&&(l=0),0===u&&(c=l)),r){n=e.text.trim();let t=0,r=0;if(c>=0){t=Math.max(c-40,0),r=0===t?Math.min(200,n.length):Math.min(c+120,n.length);let s=n.substring(t,r);a.forEach((function(e){let t=new RegExp(e,"gi");s=s.replace(t,"<b mark>"+e+"</b>")})),e.digest=s+"......"}else r=Math.min(200,n.length),e.digest=n.trim().substring(0,r)}})),r},fn.buildResult=(e,t,n)=>{let a="";return a+="<li>",a+="<a class='result' href='"+fn.getUrlRelativePath(e)+"?keyword="+fn.queryText+"'>",a+="<span class='title'>"+t+"</span>",""!==n&&(a+="<span class='digest'>"+n+"</span>"),a+="</a>",a+="</li>",a},fn.getUrlRelativePath=function(e){let t=e.split("//"),n=t[1].indexOf("/"),a=t[1].substring(n);return-1!=a.indexOf("?")&&(a=a.split("?")[0]),a},{init:()=>{fn.init()},setQueryText:e=>{fn.queryText=e},search:()=>{fn.search()}});Object.freeze(SearchService),SearchService.init(),document.addEventListener("pjax:success",SearchService.init),document.addEventListener("pjax:send",(function(){document.querySelector("#u-search").style.display="none"}));
//# sourceMappingURL=../../maps/js/search/hexo.18154ea6.js.map
