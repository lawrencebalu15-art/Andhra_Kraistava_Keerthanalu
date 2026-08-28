import{s as c}from"./supabase-C4TjTvDq.js";function y(){const t=document.getElementById("menuToggle"),n=document.getElementById("navMenu");t&&n&&t.addEventListener("click",()=>{n.classList.toggle("active");const e=t.querySelector("i");e&&(e.classList.toggle("fa-bars"),e.classList.toggle("fa-times"))}),document.querySelectorAll(".dropdown > .nav-link").forEach(e=>{e.addEventListener("click",function(o){window.innerWidth<=992&&(o.preventDefault(),this.parentElement.classList.toggle("active"))})})}function E(){const t=window.location.pathname.split("/").pop()||"index.html";document.querySelectorAll(".nav-link").forEach(n=>{n.getAttribute("href")===t&&n.classList.add("active")})}let v=!1;function b(){v||setTimeout(()=>{const t=document.getElementById("openSearch"),n=document.getElementById("globalSearchModal"),e=document.getElementById("closeSearch"),o=document.getElementById("globalSearchInput"),a=document.getElementById("searchResults");if(!t||!n||!e||!o||!a){console.error("Global Search: Required elements not found.");return}v=!0;function r(){n.classList.add("active"),document.body.style.overflow="hidden",o.value="",m(a),o.focus()}function i(){n.classList.remove("active"),document.body.style.overflow=""}t.addEventListener("click",r),e.addEventListener("click",i),n.addEventListener("click",l=>{l.target===n&&i()}),document.addEventListener("keydown",l=>{(l.ctrlKey||l.metaKey)&&l.key.toLowerCase()==="k"&&(l.preventDefault(),r()),l.key==="Escape"&&i()});let h;o.addEventListener("input",()=>{clearTimeout(h),h=setTimeout(async()=>{const l=o.value.trim();if(!l){m(a);return}const g=await L(l);w(a,g)},250)}),m(a)},200)}async function L(t){const n=/^\d+$/.test(t);let e=c.from("hymns").select(`
            number,
            title_telugu,
            title_english,
            authors(name)
        `);if(n)e=e.eq("number",Number(t));else{let r=await c.from("hymns").select(`
                number,
                title_telugu,
                title_english,
                authors(name)
            `).ilike("title_telugu",`%${t}%`).limit(20);return!r.error&&r.data.length>0?r.data.map(i=>({number:i.number,titleTelugu:i.title_telugu,titleEnglish:i.title_english,author:i.authors?.name||""})):(r=await c.from("hymns").select(`
                number,
                title_telugu,
                title_english,
                authors(name)
            `).ilike("title_english",`%${t}%`).limit(20),!r.error&&r.data.length>0?r.data.map(i=>({number:i.number,titleTelugu:i.title_telugu,titleEnglish:i.title_english,author:i.authors?.name||""})):(r=await c.from("hymns").select(`
                number,
                title_telugu,
                title_english,
                authors(name)
            `).limit(20),r.error?(console.error(r.error),[]):r.data.filter(i=>(i.authors?.name||"").toLowerCase().includes(t.toLowerCase())).map(i=>({number:i.number,titleTelugu:i.title_telugu,titleEnglish:i.title_english,author:i.authors?.name||""}))))}const{data:o,error:a}=await e.limit(20);return a?(console.error(a),[]):o.map(r=>({number:r.number,titleTelugu:r.title_telugu,titleEnglish:r.title_english,author:r.authors?.name||""}))}function w(t,n){if(!n.length){t.innerHTML=`
            <div class="search-empty">
                <h2>No Results Found</h2>
                <p>Try another search term.</p>
            </div>
        `;return}t.innerHTML=n.map(e=>`

        <a
            href="hymn.html?id=${e.number}"
            class="search-result">

            <div class="result-icon">
                🎵
            </div>

            <div class="result-content">

                <h4>${e.titleTelugu||"Untitled"}</h4>

                <small>
                    Hymn ${e.number}
                    ${e.titleEnglish?` • ${e.titleEnglish}`:""}
                    ${e.author?` • ${e.author}`:""}
                </small>

            </div>

        </a>

    `).join("")}function m(t){t.innerHTML=`
        <div class="search-empty">
            <h2>Search Everything</h2>
            <p>
                Search hymns, authors, books, interviews and more.
            </p>
        </div>
    `}async function k(){const t=document.getElementById("visitorCounter");if(!t){console.warn("Visitor counter element not found.");return}try{const{data:n,error:e}=await c.rpc("increment_visitor_count");if(e){console.error("Visitor counter error:",e);return}t.textContent=`👁 Visitors: ${Number(n).toLocaleString("en-IN")}`}catch(n){console.error("Visitor counter error:",n)}}async function u(t,n){const e=document.getElementById(t);if(e)try{const o=await fetch(n);if(!o.ok)throw new Error(`Unable to load ${n}`);e.innerHTML=await o.text()}catch(o){console.error(`Error loading ${n}:`,o)}}async function T(){await Promise.all([u("pageHeaderContainer","/components/page-header.html"),u("navbar","/components/navbar.html"),u("searchModalContainer","/components/global-search.html"),u("footer","/components/footer.html")])}document.addEventListener("DOMContentLoaded",async()=>{await T(),y(),E(),b(),k()});console.log("Search JS Loaded");document.addEventListener("DOMContentLoaded",()=>{if("ontouchstart"in window||navigator.maxTouchPoints>0)return;const t=document.createElement("div");t.className="custom-cursor",document.body.appendChild(t),document.addEventListener("mousemove",e=>{t.style.left=`${e.clientX}px`,t.style.top=`${e.clientY}px`}),document.querySelectorAll(`
        a,
        button,
        input,
        textarea,
        select,
        .card,
        .btn,
        .nav-link,
        .search-result
        `).forEach(e=>{e.addEventListener("mouseenter",()=>{t.classList.add("cursor-hover")}),e.addEventListener("mouseleave",()=>{t.classList.remove("cursor-hover")})}),document.addEventListener("mousedown",()=>{t.classList.add("cursor-click")}),document.addEventListener("mouseup",()=>{t.classList.remove("cursor-click")}),document.addEventListener("mouseleave",()=>{t.style.opacity="0"}),document.addEventListener("mouseenter",()=>{t.style.opacity="1"})});const s=document.getElementById("backToTop");document.addEventListener("click",t=>{t.target.id==="backToTop"&&window.scrollTo({top:0,behavior:"smooth"})});s&&(s.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})}),window.addEventListener("scroll",()=>{window.scrollY>300?(s.style.opacity="1",s.style.pointerEvents="auto"):(s.style.opacity=".75",s.style.pointerEvents="auto")}));const f=30;let d=0;const _=document.getElementById("videos-container");function C(t){var n=/^.*((youtu.be\/)|(v\/)|(\/u\/w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/,e=t.match(n);return e&&e[7].length==11?e[7]:null}function S(t){var n=document.createElement("div");n.className="youtube";var e=document.createElement("a");e.href="https://www.youtube.com/watch?v="+t,e.target="_blank",e.rel="noopener noreferrer";var o=document.createElement("img");o.src="https://img.youtube.com/vi/"+t+"/hqdefault.jpg",o.alt="Video thumbnail";var a=document.createElement("div");return a.className="play-button",e.appendChild(o),e.appendChild(a),n.appendChild(e),n}function p(){songsList.slice(d,d+f).forEach(function(n){if(n.youtubeLinks){var e=n.youtubeLinks.split(/[, ]+/).map(o=>o.trim());e.forEach(function(o){var a=C(o);if(a){const r=S(a);_.appendChild(r)}})}}),d+=f}function B(){window.innerHeight+window.scrollY>=document.body.offsetHeight-500&&d<songsList.length&&p()}document.addEventListener("DOMContentLoaded",function(){p(),window.addEventListener("scroll",B)});
