import{s as c}from"./supabase-C4TjTvDq.js";function E(){const t=document.getElementById("menuToggle"),n=document.getElementById("navMenu");t&&n&&t.addEventListener("click",()=>{n.classList.toggle("active");const e=t.querySelector("i");e&&(e.classList.toggle("fa-bars"),e.classList.toggle("fa-times"))}),document.querySelectorAll(".dropdown > .nav-link").forEach(e=>{e.addEventListener("click",function(o){window.innerWidth<=992&&(o.preventDefault(),this.parentElement.classList.toggle("active"))})})}function y(){const t=window.location.pathname.split("/").pop()||"index.html";document.querySelectorAll(".nav-link").forEach(n=>{n.getAttribute("href")===t&&n.classList.add("active")})}let v=!1;function b(){v||setTimeout(()=>{const t=document.getElementById("openSearch"),n=document.getElementById("globalSearchModal"),e=document.getElementById("closeSearch"),o=document.getElementById("globalSearchInput"),i=document.getElementById("searchResults");if(!t||!n||!e||!o||!i){console.error("Global Search: Required elements not found.");return}v=!0;function r(){n.classList.add("active"),document.body.style.overflow="hidden",o.value="",m(i),o.focus()}function a(){n.classList.remove("active"),document.body.style.overflow=""}t.addEventListener("click",r),e.addEventListener("click",a),n.addEventListener("click",l=>{l.target===n&&a()}),document.addEventListener("keydown",l=>{(l.ctrlKey||l.metaKey)&&l.key.toLowerCase()==="k"&&(l.preventDefault(),r()),l.key==="Escape"&&a()});let h;o.addEventListener("input",()=>{clearTimeout(h),h=setTimeout(async()=>{const l=o.value.trim();if(!l){m(i);return}const g=await L(l);w(i,g)},250)}),m(i)},200)}async function L(t){const n=/^\d+$/.test(t);let e=c.from("hymns").select(`
            number,
            title_telugu,
            title_english,
            authors(name)
        `);if(n)e=e.eq("number",Number(t));else{let r=await c.from("hymns").select(`
                number,
                title_telugu,
                title_english,
                authors(name)
            `).ilike("title_telugu",`%${t}%`).limit(20);return!r.error&&r.data.length>0?r.data.map(a=>({number:a.number,titleTelugu:a.title_telugu,titleEnglish:a.title_english,author:a.authors?.name||""})):(r=await c.from("hymns").select(`
                number,
                title_telugu,
                title_english,
                authors(name)
            `).ilike("title_english",`%${t}%`).limit(20),!r.error&&r.data.length>0?r.data.map(a=>({number:a.number,titleTelugu:a.title_telugu,titleEnglish:a.title_english,author:a.authors?.name||""})):(r=await c.from("hymns").select(`
                number,
                title_telugu,
                title_english,
                authors(name)
            `).limit(20),r.error?(console.error(r.error),[]):r.data.filter(a=>(a.authors?.name||"").toLowerCase().includes(t.toLowerCase())).map(a=>({number:a.number,titleTelugu:a.title_telugu,titleEnglish:a.title_english,author:a.authors?.name||""}))))}const{data:o,error:i}=await e.limit(20);return i?(console.error(i),[]):o.map(r=>({number:r.number,titleTelugu:r.title_telugu,titleEnglish:r.title_english,author:r.authors?.name||""}))}function w(t,n){if(!n.length){t.innerHTML=`
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
    `}async function u(t,n){const e=document.getElementById(t);if(e)try{const o=await fetch(n);if(!o.ok)throw new Error(`Unable to load ${n}`);e.innerHTML=await o.text()}catch(o){console.error(`Error loading ${n}:`,o)}}async function k(){await Promise.all([u("pageHeaderContainer","/components/page-header.html"),u("navbar","/components/navbar.html"),u("searchModalContainer","/components/global-search.html"),u("footer","/components/footer.html")])}document.addEventListener("DOMContentLoaded",async()=>{await k(),E(),y(),b()});console.log("Search JS Loaded");document.addEventListener("DOMContentLoaded",()=>{if("ontouchstart"in window||navigator.maxTouchPoints>0)return;const t=document.createElement("div");t.className="custom-cursor",document.body.appendChild(t),document.addEventListener("mousemove",e=>{t.style.left=`${e.clientX}px`,t.style.top=`${e.clientY}px`}),document.querySelectorAll(`
        a,
        button,
        input,
        textarea,
        select,
        .card,
        .btn,
        .nav-link,
        .search-result
        `).forEach(e=>{e.addEventListener("mouseenter",()=>{t.classList.add("cursor-hover")}),e.addEventListener("mouseleave",()=>{t.classList.remove("cursor-hover")})}),document.addEventListener("mousedown",()=>{t.classList.add("cursor-click")}),document.addEventListener("mouseup",()=>{t.classList.remove("cursor-click")}),document.addEventListener("mouseleave",()=>{t.style.opacity="0"}),document.addEventListener("mouseenter",()=>{t.style.opacity="1"})});document.addEventListener("DOMContentLoaded",()=>{const t=document.getElementById("visitorCounter");if(!t)return;const n="akk-visitor-count";let e=Number(localStorage.getItem(n));Number.isNaN(e)||e<=0?e=1:e++,localStorage.setItem(n,e),t.innerHTML=`
        <div class="visitor-counter">
            <span class="visitor-counter-icon">👁</span>
            <span>Visitors</span>
            <span class="visitor-counter-number">${e.toLocaleString()}</span>
        </div>
    `});const s=document.getElementById("backToTop");document.addEventListener("click",t=>{t.target.id==="backToTop"&&window.scrollTo({top:0,behavior:"smooth"})});s&&(s.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})}),window.addEventListener("scroll",()=>{window.scrollY>300?(s.style.opacity="1",s.style.pointerEvents="auto"):(s.style.opacity=".75",s.style.pointerEvents="auto")}));const p=30;let d=0;const T=document.getElementById("videos-container");function S(t){var n=/^.*((youtu.be\/)|(v\/)|(\/u\/w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/,e=t.match(n);return e&&e[7].length==11?e[7]:null}function _(t){var n=document.createElement("div");n.className="youtube";var e=document.createElement("a");e.href="https://www.youtube.com/watch?v="+t,e.target="_blank",e.rel="noopener noreferrer";var o=document.createElement("img");o.src="https://img.youtube.com/vi/"+t+"/hqdefault.jpg",o.alt="Video thumbnail";var i=document.createElement("div");return i.className="play-button",e.appendChild(o),e.appendChild(i),n.appendChild(e),n}function f(){songsList.slice(d,d+p).forEach(function(n){if(n.youtubeLinks){var e=n.youtubeLinks.split(/[, ]+/).map(o=>o.trim());e.forEach(function(o){var i=S(o);if(i){const r=_(i);T.appendChild(r)}})}}),d+=p}function C(){window.innerHeight+window.scrollY>=document.body.offsetHeight-500&&d<songsList.length&&f()}document.addEventListener("DOMContentLoaded",function(){f(),window.addEventListener("scroll",C)});async function I(){const{data:t,error:n}=await c.from("hymns").select("*");console.log("Data:",t),console.log("Error:",n)}I();
