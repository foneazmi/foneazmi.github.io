import{R as f,c as p,j as c,r as h,F as y}from"./vendor-HNlzpMig.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))l(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const r of e.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&l(r)}).observe(document,{childList:!0,subtree:!0});function o(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?e.credentials="include":t.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function l(t){if(t.ep)return;t.ep=!0;const e=o(t);fetch(t.href,e)}})();const g="modulepreload",E=function(u){return"/"+u},d={},v=function(s,o,l){if(!o||o.length===0)return s();const t=document.getElementsByTagName("link");return Promise.all(o.map(e=>{if(e=E(e),e in d)return;d[e]=!0;const r=e.endsWith(".css"),m=r?'[rel="stylesheet"]':"";if(!!l)for(let i=t.length-1;i>=0;i--){const a=t[i];if(a.href===e&&(!r||a.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${e}"]${m}`))return;const n=document.createElement("link");if(n.rel=r?"stylesheet":g,r||(n.as="script",n.crossOrigin=""),n.href=e,document.head.appendChild(n),r)return new Promise((i,a)=>{n.addEventListener("load",i),n.addEventListener("error",()=>a(new Error(`Unable to preload CSS for ${e}`)))})})).then(()=>s()).catch(e=>{const r=new Event("vite:preloadError",{cancelable:!0});if(r.payload=e,window.dispatchEvent(r),!r.defaultPrevented)throw e})},P=f.lazy(()=>v(()=>import("./App-nN-br2u7.js"),__vite__mapDeps([0,1,2]))),R=c.jsx("div",{className:"centered",children:c.jsx(y,{className:"bounce"})});p.createRoot(document.getElementById("root")).render(c.jsx(f.StrictMode,{children:c.jsx(h.Suspense,{fallback:R,children:c.jsx(P,{})})}));
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/App-nN-br2u7.js","assets/vendor-HNlzpMig.js","assets/App-2BtNLGex.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}