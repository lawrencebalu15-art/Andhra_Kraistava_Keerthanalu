import{s as l}from"./supabase-C4TjTvDq.js";function M(){const e=document.getElementById("menuToggle"),n=document.getElementById("navMenu");e&&n&&e.addEventListener("click",()=>{n.classList.toggle("active");const t=e.querySelector("i");t&&(t.classList.toggle("fa-bars"),t.classList.toggle("fa-times"))}),document.querySelectorAll(".dropdown > .nav-link").forEach(t=>{t.addEventListener("click",function(o){window.innerWidth<=992&&(o.preventDefault(),this.parentElement.classList.toggle("active"))})})}function A(){const e=window.location.pathname.split("/").pop()||"index.html";document.querySelectorAll(".nav-link").forEach(n=>{n.getAttribute("href")===e&&n.classList.add("active")})}let B=!1;function U(){B||setTimeout(()=>{const e=document.getElementById("openSearch"),n=document.getElementById("globalSearchModal"),t=document.getElementById("closeSearch"),o=document.getElementById("globalSearchInput"),a=document.getElementById("searchResults");if(!e||!n||!t||!o||!a){console.error("Global Search: Required elements not found.");return}B=!0;function i(){n.classList.add("active"),document.body.style.overflow="hidden",o.value="",C(a),o.focus()}function r(){n.classList.remove("active"),document.body.style.overflow=""}e.addEventListener("click",i),t.addEventListener("click",r),n.addEventListener("click",s=>{s.target===n&&r()}),document.addEventListener("keydown",s=>{(s.ctrlKey||s.metaKey)&&s.key.toLowerCase()==="k"&&(s.preventDefault(),i()),s.key==="Escape"&&r()});let d;o.addEventListener("input",()=>{clearTimeout(d),d=setTimeout(async()=>{const s=o.value.trim();if(!s){C(a);return}const x=await N(s);q(a,x)},250)}),C(a)},200)}async function N(e){const n=/^\d+$/.test(e);let t=l.from("hymns").select(`
            number,
            title_telugu,
            title_english,
            authors(name)
        `);if(n)t=t.eq("number",Number(e));else{let i=await l.from("hymns").select(`
                number,
                title_telugu,
                title_english,
                authors(name)
            `).ilike("title_telugu",`%${e}%`).limit(20);return!i.error&&i.data.length>0?i.data.map(r=>({number:r.number,titleTelugu:r.title_telugu,titleEnglish:r.title_english,author:r.authors?.name||""})):(i=await l.from("hymns").select(`
                number,
                title_telugu,
                title_english,
                authors(name)
            `).ilike("title_english",`%${e}%`).limit(20),!i.error&&i.data.length>0?i.data.map(r=>({number:r.number,titleTelugu:r.title_telugu,titleEnglish:r.title_english,author:r.authors?.name||""})):(i=await l.from("hymns").select(`
                number,
                title_telugu,
                title_english,
                authors(name)
            `).limit(20),i.error?(console.error(i.error),[]):i.data.filter(r=>(r.authors?.name||"").toLowerCase().includes(e.toLowerCase())).map(r=>({number:r.number,titleTelugu:r.title_telugu,titleEnglish:r.title_english,author:r.authors?.name||""}))))}const{data:o,error:a}=await t.limit(20);return a?(console.error(a),[]):o.map(i=>({number:i.number,titleTelugu:i.title_telugu,titleEnglish:i.title_english,author:i.authors?.name||""}))}function q(e,n){if(!n.length){e.innerHTML=`
            <div class="search-empty">
                <h2>No Results Found</h2>
                <p>Try another search term.</p>
            </div>
        `;return}e.innerHTML=n.map(t=>`

        <a
            href="hymn.html?id=${t.number}"
            class="search-result">

            <div class="result-icon">
                🎵
            </div>

            <div class="result-content">

                <h4>${t.titleTelugu||"Untitled"}</h4>

                <small>
                    Hymn ${t.number}
                    ${t.titleEnglish?` • ${t.titleEnglish}`:""}
                    ${t.author?` • ${t.author}`:""}
                </small>

            </div>

        </a>

    `).join("")}function C(e){e.innerHTML=`
        <div class="search-empty">
            <h2>Search Everything</h2>
            <p>
                Search hymns, authors, books, interviews and more.
            </p>
        </div>
    `}async function D(){const e=document.getElementById("visitorCounter");if(!e){console.warn("Visitor counter element not found.");return}try{const{data:n,error:t}=await l.rpc("increment_visitor_count");if(t){console.error("Visitor counter error:",t);return}e.textContent=`👁 Visitors: ${Number(n).toLocaleString("en-IN")}`}catch(n){console.error("Visitor counter error:",n)}}async function v(e,n){const t=document.getElementById(e);if(t)try{const o=await fetch(n);if(!o.ok)throw new Error(`Unable to load ${n}`);t.innerHTML=await o.text()}catch(o){console.error(`Error loading ${n}:`,o)}}async function V(){await Promise.all([v("pageHeaderContainer","/components/page-header.html"),v("navbar","/components/navbar.html"),v("searchModalContainer","/components/global-search.html"),v("footer","/components/footer.html")])}document.addEventListener("DOMContentLoaded",async()=>{await V(),M(),A(),U(),D()});console.log("Search JS Loaded");document.addEventListener("DOMContentLoaded",()=>{if("ontouchstart"in window||navigator.maxTouchPoints>0)return;const e=document.createElement("div");e.className="custom-cursor",document.body.appendChild(e),document.addEventListener("mousemove",t=>{e.style.left=`${t.clientX}px`,e.style.top=`${t.clientY}px`}),document.querySelectorAll(`
        a,
        button,
        input,
        textarea,
        select,
        .card,
        .btn,
        .nav-link,
        .search-result
        `).forEach(t=>{t.addEventListener("mouseenter",()=>{e.classList.add("cursor-hover")}),t.addEventListener("mouseleave",()=>{e.classList.remove("cursor-hover")})}),document.addEventListener("mousedown",()=>{e.classList.add("cursor-click")}),document.addEventListener("mouseup",()=>{e.classList.remove("cursor-click")}),document.addEventListener("mouseleave",()=>{e.style.opacity="0"}),document.addEventListener("mouseenter",()=>{e.style.opacity="1"})});const u=document.getElementById("backToTop");document.addEventListener("click",e=>{e.target.id==="backToTop"&&window.scrollTo({top:0,behavior:"smooth"})});u&&(u.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})}),window.addEventListener("scroll",()=>{window.scrollY>300?(u.style.opacity="1",u.style.pointerEvents="auto"):(u.style.opacity=".75",u.style.pointerEvents="auto")}));const I=30;let L=0;const P=document.getElementById("videos-container");function R(e){var n=/^.*((youtu.be\/)|(v\/)|(\/u\/w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/,t=e.match(n);return t&&t[7].length==11?t[7]:null}function Y(e){var n=document.createElement("div");n.className="youtube";var t=document.createElement("a");t.href="https://www.youtube.com/watch?v="+e,t.target="_blank",t.rel="noopener noreferrer";var o=document.createElement("img");o.src="https://img.youtube.com/vi/"+e+"/hqdefault.jpg",o.alt="Video thumbnail";var a=document.createElement("div");return a.className="play-button",t.appendChild(o),t.appendChild(a),n.appendChild(t),n}function H(){songsList.slice(L,L+I).forEach(function(n){if(n.youtubeLinks){var t=n.youtubeLinks.split(/[, ]+/).map(o=>o.trim());t.forEach(function(o){var a=R(o);if(a){const i=Y(a);P.appendChild(i)}})}}),L+=I}function j(){window.innerHeight+window.scrollY>=document.body.offsetHeight-500&&L<songsList.length&&H()}document.addEventListener("DOMContentLoaded",function(){H(),window.addEventListener("scroll",j)});const f=document.getElementById("authorLoading"),y=document.getElementById("authorError"),$=document.getElementById("authorErrorMessage"),p=document.getElementById("authorContent"),k=document.getElementById("authorName"),g=document.getElementById("authorDates"),b=document.getElementById("authorCountry"),m=document.getElementById("authorAvatar"),c=document.getElementById("authorPhoto"),_=document.getElementById("authorBio"),E=document.getElementById("authorHymnCount"),S=document.getElementById("authorHymnsSubtitle"),h=document.getElementById("authorHymns");K();function z(){return new URLSearchParams(window.location.search).get("id")}async function K(){X();const e=z();if(!e){T("No Writer was specified.");return}try{const{data:n,error:t}=await l.from("authors").select(`
                id,
                name,
                photo_url,
                bio,
                birth_year,
                death_year,
                country,
                media_id
            `).eq("id",e).maybeSingle();if(t)throw console.error("Author database error:",t),t;if(!n){T("This author could not be found in the archive.");return}console.log("Author loaded successfully:",n),await O(n),await W(n.id),Z()}catch(n){console.error("Author loading error:",n),T("Unable to load author information.")}}async function O(e){const n=e.name||"Unknown Writer";k&&(k.textContent=n),m&&(m.textContent=J(n));const t=e.birth_year,o=e.death_year;if(t||o){let r="";t&&o?r=`${t} — ${o}`:t?r=`Born ${t}`:r=`Died ${o}`,g&&(g.textContent=r,g.classList.remove("hidden"))}else g&&g.classList.add("hidden");if(b)if(e.country){const r=b.querySelector("span");r&&(r.textContent=e.country),b.classList.remove("hidden")}else b.classList.add("hidden");if(_)if(e.bio&&e.bio.trim()){const r=e.bio.trim().split(/\n\s*\n/);_.innerHTML=r.map(d=>`
                            <p>
                                ${w(d.trim())}
                            </p>
                        `).join("")}else _.innerHTML=`
                <p>
                    Biography information is currently
                    being prepared for this archive.
                </p>
            `;let a=e.photo_url||"";if(!a&&e.media_id){const{data:r,error:d}=await l.from("media").select("storage_path").eq("id",e.media_id).maybeSingle();!d&&r?.storage_path&&(a=F(r.storage_path))}c&&m&&(a?(c.src=a,c.alt=`${n} - hymn writer`,c.classList.remove("hidden"),m.classList.add("hidden"),c.onerror=()=>{c.classList.add("hidden"),m.classList.remove("hidden")}):(c.classList.add("hidden"),m.classList.remove("hidden"))),document.title=`${n} | Andhra Kraistava Keerthanalu`;let i=document.querySelector('meta[name="description"]');i||(i=document.createElement("meta"),i.name="description",document.head.appendChild(i)),i.content=(e.bio?.trim()||`Explore the biography and hymns of ${n}.`).substring(0,160)}async function W(e){const{data:n,error:t}=await l.from("hymns").select(`
            id,
            number,
            title_telugu,
            title_english,
            language
        `).eq("author_id",e).order("number",{ascending:!0});if(t){console.error("Author hymns error:",t),E&&(E.textContent="0"),h&&(h.innerHTML=`
                <div class="author-empty">
                    <p>
                        Unable to load this author's hymns.
                    </p>
                </div>
            `);return}const o=n||[];if(E&&(E.textContent=o.length),S&&(S.textContent=o.length===1?"1 hymn associated with this writer.":`${o.length} hymns associated with this writer.`),o.length===0){h&&(h.innerHTML=`
                <div class="author-empty">
                    <p>
                        No hymns are currently associated
                        with this author.
                    </p>
                </div>
            `);return}h&&(h.innerHTML=o.map(G).join(""))}function G(e){const n=e.number??"",t=e.title_telugu?.trim()||"",o=e.title_english?.trim()||"",a=t||o||"Untitled Hymn";return`
        <a
            href="${`hymn.html?id=${encodeURIComponent(n)}`}"
            class="author-hymn"
        >

            <div class="author-hymn-number">

                ${w(n)}

            </div>


            <div>

                <div class="author-hymn-title">

                    ${w(a)}

                </div>


                ${o?`
                            <div class="author-hymn-english">

                                ${w(o)}

                            </div>
                        `:""}

            </div>


            <div class="author-hymn-arrow">

                →

            </div>

        </a>
    `}function F(e){if(!e)return"";const{data:n}=l.storage.from("media").getPublicUrl(e);return n?.publicUrl||""}function J(e){const n=e.trim().split(/\s+/).filter(Boolean);return n.length===1?n[0].substring(0,2).toUpperCase():n[0].toUpperCase()}function w(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function X(){f&&f.classList.remove("hidden"),y&&y.classList.add("hidden"),p&&p.classList.add("hidden")}function T(e){f&&f.classList.add("hidden"),p&&p.classList.add("hidden"),$&&($.textContent=e),y&&y.classList.remove("hidden")}function Z(){f&&f.classList.add("hidden"),y&&y.classList.add("hidden"),p&&p.classList.remove("hidden")}
