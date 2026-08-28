import{s as l}from"./supabase-C4TjTvDq.js";function M(){const e=document.getElementById("menuToggle"),t=document.getElementById("navMenu");e&&t&&e.addEventListener("click",()=>{t.classList.toggle("active");const n=e.querySelector("i");n&&(n.classList.toggle("fa-bars"),n.classList.toggle("fa-times"))}),document.querySelectorAll(".dropdown > .nav-link").forEach(n=>{n.addEventListener("click",function(o){window.innerWidth<=992&&(o.preventDefault(),this.parentElement.classList.toggle("active"))})})}function A(){const e=window.location.pathname.split("/").pop()||"index.html";document.querySelectorAll(".nav-link").forEach(t=>{t.getAttribute("href")===e&&t.classList.add("active")})}let B=!1;function U(){B||setTimeout(()=>{const e=document.getElementById("openSearch"),t=document.getElementById("globalSearchModal"),n=document.getElementById("closeSearch"),o=document.getElementById("globalSearchInput"),a=document.getElementById("searchResults");if(!e||!t||!n||!o||!a){console.error("Global Search: Required elements not found.");return}B=!0;function i(){t.classList.add("active"),document.body.style.overflow="hidden",o.value="",C(a),o.focus()}function r(){t.classList.remove("active"),document.body.style.overflow=""}e.addEventListener("click",i),n.addEventListener("click",r),t.addEventListener("click",s=>{s.target===t&&r()}),document.addEventListener("keydown",s=>{(s.ctrlKey||s.metaKey)&&s.key.toLowerCase()==="k"&&(s.preventDefault(),i()),s.key==="Escape"&&r()});let d;o.addEventListener("input",()=>{clearTimeout(d),d=setTimeout(async()=>{const s=o.value.trim();if(!s){C(a);return}const x=await N(s);q(a,x)},250)}),C(a)},200)}async function N(e){const t=/^\d+$/.test(e);let n=l.from("hymns").select(`
            number,
            title_telugu,
            title_english,
            authors(name)
        `);if(t)n=n.eq("number",Number(e));else{let i=await l.from("hymns").select(`
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
            `).limit(20),i.error?(console.error(i.error),[]):i.data.filter(r=>(r.authors?.name||"").toLowerCase().includes(e.toLowerCase())).map(r=>({number:r.number,titleTelugu:r.title_telugu,titleEnglish:r.title_english,author:r.authors?.name||""}))))}const{data:o,error:a}=await n.limit(20);return a?(console.error(a),[]):o.map(i=>({number:i.number,titleTelugu:i.title_telugu,titleEnglish:i.title_english,author:i.authors?.name||""}))}function q(e,t){if(!t.length){e.innerHTML=`
            <div class="search-empty">
                <h2>No Results Found</h2>
                <p>Try another search term.</p>
            </div>
        `;return}e.innerHTML=t.map(n=>`

        <a
            href="hymn.html?id=${n.number}"
            class="search-result">

            <div class="result-icon">
                🎵
            </div>

            <div class="result-content">

                <h4>${n.titleTelugu||"Untitled"}</h4>

                <small>
                    Hymn ${n.number}
                    ${n.titleEnglish?` • ${n.titleEnglish}`:""}
                    ${n.author?` • ${n.author}`:""}
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
    `}async function D(){const e=document.getElementById("visitorCounter");if(!e){console.warn("Visitor counter element not found.");return}try{const{data:t,error:n}=await l.rpc("increment_visitor_count");if(n){console.error("Visitor counter error:",n);return}e.textContent=`👁 Visitors: ${Number(t).toLocaleString("en-IN")}`}catch(t){console.error("Visitor counter error:",t)}}async function v(e,t){const n=document.getElementById(e);if(n)try{const o=await fetch(t);if(!o.ok)throw new Error(`Unable to load ${t}`);n.innerHTML=await o.text()}catch(o){console.error(`Error loading ${t}:`,o)}}async function V(){await Promise.all([v("pageHeaderContainer","/components/page-header.html"),v("navbar","/components/navbar.html"),v("searchModalContainer","/components/global-search.html"),v("footer","/components/footer.html")])}document.addEventListener("DOMContentLoaded",async()=>{await V(),M(),A(),U(),D()});console.log("Search JS Loaded");document.addEventListener("DOMContentLoaded",()=>{if("ontouchstart"in window||navigator.maxTouchPoints>0)return;const e=document.createElement("div");e.className="custom-cursor",document.body.appendChild(e),document.addEventListener("mousemove",n=>{e.style.left=`${n.clientX}px`,e.style.top=`${n.clientY}px`}),document.querySelectorAll(`
        a,
        button,
        input,
        textarea,
        select,
        .card,
        .btn,
        .nav-link,
        .search-result
        `).forEach(n=>{n.addEventListener("mouseenter",()=>{e.classList.add("cursor-hover")}),n.addEventListener("mouseleave",()=>{e.classList.remove("cursor-hover")})}),document.addEventListener("mousedown",()=>{e.classList.add("cursor-click")}),document.addEventListener("mouseup",()=>{e.classList.remove("cursor-click")}),document.addEventListener("mouseleave",()=>{e.style.opacity="0"}),document.addEventListener("mouseenter",()=>{e.style.opacity="1"})});const u=document.getElementById("backToTop");document.addEventListener("click",e=>{e.target.id==="backToTop"&&window.scrollTo({top:0,behavior:"smooth"})});u&&(u.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})}),window.addEventListener("scroll",()=>{window.scrollY>300?(u.style.opacity="1",u.style.pointerEvents="auto"):(u.style.opacity=".75",u.style.pointerEvents="auto")}));const I=30;let L=0;const P=document.getElementById("videos-container");function R(e){var t=/^.*((youtu.be\/)|(v\/)|(\/u\/w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/,n=e.match(t);return n&&n[7].length==11?n[7]:null}function Y(e){var t=document.createElement("div");t.className="youtube";var n=document.createElement("a");n.href="https://www.youtube.com/watch?v="+e,n.target="_blank",n.rel="noopener noreferrer";var o=document.createElement("img");o.src="https://img.youtube.com/vi/"+e+"/hqdefault.jpg",o.alt="Video thumbnail";var a=document.createElement("div");return a.className="play-button",n.appendChild(o),n.appendChild(a),t.appendChild(n),t}function H(){songsList.slice(L,L+I).forEach(function(t){if(t.youtubeLinks){var n=t.youtubeLinks.split(/[, ]+/).map(o=>o.trim());n.forEach(function(o){var a=R(o);if(a){const i=Y(a);P.appendChild(i)}})}}),L+=I}function j(){window.innerHeight+window.scrollY>=document.body.offsetHeight-500&&L<songsList.length&&H()}document.addEventListener("DOMContentLoaded",function(){H(),window.addEventListener("scroll",j)});const f=document.getElementById("authorLoading"),y=document.getElementById("authorError"),$=document.getElementById("authorErrorMessage"),p=document.getElementById("authorContent"),k=document.getElementById("authorName"),g=document.getElementById("authorDates"),b=document.getElementById("authorCountry"),m=document.getElementById("authorAvatar"),c=document.getElementById("authorPhoto"),_=document.getElementById("authorBio"),E=document.getElementById("authorHymnCount"),S=document.getElementById("authorHymnsSubtitle"),h=document.getElementById("authorHymns");K();function z(){return new URLSearchParams(window.location.search).get("id")}async function K(){X();const e=z();if(!e){T("No author was specified.");return}try{const{data:t,error:n}=await l.from("authors").select(`
                id,
                name,
                photo_url,
                bio,
                birth_year,
                death_year,
                country,
                media_id
            `).eq("id",e).maybeSingle();if(n)throw console.error("Author database error:",n),n;if(!t){T("This author could not be found in the archive.");return}console.log("Author loaded successfully:",t),await O(t),await G(t.id),Z()}catch(t){console.error("Author loading error:",t),T("Unable to load author information.")}}async function O(e){const t=e.name||"Unknown Author";k&&(k.textContent=t),m&&(m.textContent=W(t));const n=e.birth_year,o=e.death_year;if(n||o){let r="";n&&o?r=`${n} — ${o}`:n?r=`Born ${n}`:r=`Died ${o}`,g&&(g.textContent=r,g.classList.remove("hidden"))}else g&&g.classList.add("hidden");if(b)if(e.country){const r=b.querySelector("span");r&&(r.textContent=e.country),b.classList.remove("hidden")}else b.classList.add("hidden");if(_)if(e.bio&&e.bio.trim()){const r=e.bio.trim().split(/\n\s*\n/);_.innerHTML=r.map(d=>`
                            <p>
                                ${w(d.trim())}
                            </p>
                        `).join("")}else _.innerHTML=`
                <p>
                    Biography information is currently
                    being prepared for this archive.
                </p>
            `;let a=e.photo_url||"";if(!a&&e.media_id){const{data:r,error:d}=await l.from("media").select("storage_path").eq("id",e.media_id).maybeSingle();!d&&r?.storage_path&&(a=J(r.storage_path))}c&&m&&(a?(c.src=a,c.alt=`${t} - hymn writer`,c.classList.remove("hidden"),m.classList.add("hidden"),c.onerror=()=>{c.classList.add("hidden"),m.classList.remove("hidden")}):(c.classList.add("hidden"),m.classList.remove("hidden"))),document.title=`${t} | Andhra Kraistava Keerthanalu`;let i=document.querySelector('meta[name="description"]');i||(i=document.createElement("meta"),i.name="description",document.head.appendChild(i)),i.content=(e.bio?.trim()||`Explore the biography and hymns of ${t}.`).substring(0,160)}async function G(e){const{data:t,error:n}=await l.from("hymns").select(`
            id,
            number,
            title_telugu,
            title_english,
            language
        `).eq("author_id",e).order("number",{ascending:!0});if(n){console.error("Author hymns error:",n),E&&(E.textContent="0"),h&&(h.innerHTML=`
                <div class="author-empty">
                    <p>
                        Unable to load this author's hymns.
                    </p>
                </div>
            `);return}const o=t||[];if(E&&(E.textContent=o.length),S&&(S.textContent=o.length===1?"1 hymn associated with this writer.":`${o.length} hymns associated with this writer.`),o.length===0){h&&(h.innerHTML=`
                <div class="author-empty">
                    <p>
                        No hymns are currently associated
                        with this author.
                    </p>
                </div>
            `);return}h&&(h.innerHTML=o.map(F).join(""))}function F(e){const t=e.number??"",n=e.title_telugu?.trim()||"",o=e.title_english?.trim()||"",a=n||o||"Untitled Hymn";return`
        <a
            href="${`hymn.html?id=${encodeURIComponent(t)}`}"
            class="author-hymn"
        >

            <div class="author-hymn-number">

                ${w(t)}

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
    `}function J(e){if(!e)return"";const{data:t}=l.storage.from("media").getPublicUrl(e);return t?.publicUrl||""}function W(e){const t=e.trim().split(/\s+/).filter(Boolean);return t.length===1?t[0].substring(0,2).toUpperCase():(t[0][0]+t[t.length-1][0]).toUpperCase()}function w(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function X(){f&&f.classList.remove("hidden"),y&&y.classList.add("hidden"),p&&p.classList.add("hidden")}function T(e){f&&f.classList.add("hidden"),p&&p.classList.add("hidden"),$&&($.textContent=e),y&&y.classList.remove("hidden")}function Z(){f&&f.classList.add("hidden"),y&&y.classList.add("hidden"),p&&p.classList.remove("hidden")}
