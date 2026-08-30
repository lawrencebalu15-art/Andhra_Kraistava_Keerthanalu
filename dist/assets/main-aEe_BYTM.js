import{s as c}from"./supabase-C4TjTvDq.js";function j(){const e=document.getElementById("menuToggle"),n=document.getElementById("navMenu");e&&n&&e.addEventListener("click",()=>{n.classList.toggle("active");const t=e.querySelector("i");t&&(t.classList.toggle("fa-bars"),t.classList.toggle("fa-times"))}),document.querySelectorAll(".dropdown > .nav-link").forEach(t=>{t.addEventListener("click",function(o){window.innerWidth<=992&&(o.preventDefault(),this.parentElement.classList.toggle("active"))})})}function z(){const e=window.location.pathname.split("/").pop()||"index.html";document.querySelectorAll(".nav-link").forEach(n=>{n.getAttribute("href")===e&&n.classList.add("active")})}let M=!1;function K(){M||setTimeout(()=>{const e=document.getElementById("openSearch"),n=document.getElementById("globalSearchModal"),t=document.getElementById("closeSearch"),o=document.getElementById("globalSearchInput"),a=document.getElementById("searchResults");if(!e||!n||!t||!o||!a){console.error("Global Search: Required elements not found.");return}M=!0;function r(){n.classList.add("active"),document.body.style.overflow="hidden",o.value="",$(a),o.focus()}function i(){n.classList.remove("active"),document.body.style.overflow=""}e.addEventListener("click",r),t.addEventListener("click",i),n.addEventListener("click",s=>{s.target===n&&i()}),document.addEventListener("keydown",s=>{(s.ctrlKey||s.metaKey)&&s.key.toLowerCase()==="k"&&(s.preventDefault(),r()),s.key==="Escape"&&i()});let d;o.addEventListener("input",()=>{clearTimeout(d),d=setTimeout(async()=>{const s=o.value.trim();if(!s){$(a);return}const h=await O(s);W(a,h)},250)}),$(a)},200)}async function O(e){const n=/^\d+$/.test(e);let t=c.from("hymns").select(`
            number,
            title_telugu,
            title_english,
            authors(name)
        `);if(n)t=t.eq("number",Number(e));else{let r=await c.from("hymns").select(`
                number,
                title_telugu,
                title_english,
                authors(name)
            `).ilike("title_telugu",`%${e}%`).limit(20);return!r.error&&r.data.length>0?r.data.map(i=>({number:i.number,titleTelugu:i.title_telugu,titleEnglish:i.title_english,author:i.authors?.name||""})):(r=await c.from("hymns").select(`
                number,
                title_telugu,
                title_english,
                authors(name)
            `).ilike("title_english",`%${e}%`).limit(20),!r.error&&r.data.length>0?r.data.map(i=>({number:i.number,titleTelugu:i.title_telugu,titleEnglish:i.title_english,author:i.authors?.name||""})):(r=await c.from("hymns").select(`
                number,
                title_telugu,
                title_english,
                authors(name)
            `).limit(20),r.error?(console.error(r.error),[]):r.data.filter(i=>(i.authors?.name||"").toLowerCase().includes(e.toLowerCase())).map(i=>({number:i.number,titleTelugu:i.title_telugu,titleEnglish:i.title_english,author:i.authors?.name||""}))))}const{data:o,error:a}=await t.limit(20);return a?(console.error(a),[]):o.map(r=>({number:r.number,titleTelugu:r.title_telugu,titleEnglish:r.title_english,author:r.authors?.name||""}))}function W(e,n){if(!n.length){e.innerHTML=`
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

    `).join("")}function $(e){e.innerHTML=`
        <div class="search-empty">
            <h2>Search Everything</h2>
            <p>
                Search hymns, authors, books, interviews and more.
            </p>
        </div>
    `}async function G(){const e=document.getElementById("visitorCounter");if(!e){console.warn("Visitor counter element not found.");return}try{const{data:n,error:t}=await c.rpc("increment_visitor_count");if(t){console.error("Visitor counter error:",t);return}e.textContent=`👁 Visitors: ${Number(n).toLocaleString("en-IN")}`}catch(n){console.error("Visitor counter error:",n)}}async function I(e,n){const t=document.getElementById(e);if(t)try{const o=await fetch(n);if(!o.ok)throw new Error(`Unable to load ${n}`);t.innerHTML=await o.text()}catch(o){console.error(`Error loading ${n}:`,o)}}async function F(){await Promise.all([I("pageHeaderContainer","/components/page-header.html"),I("navbar","/components/navbar.html"),I("searchModalContainer","/components/global-search.html"),I("footer","/components/footer.html")])}document.addEventListener("DOMContentLoaded",async()=>{await F(),j(),z(),K(),G()});console.log("Search JS Loaded");document.addEventListener("DOMContentLoaded",()=>{if("ontouchstart"in window||navigator.maxTouchPoints>0)return;const e=document.createElement("div");e.className="custom-cursor",document.body.appendChild(e),document.addEventListener("mousemove",t=>{e.style.left=`${t.clientX}px`,e.style.top=`${t.clientY}px`}),document.querySelectorAll(`
        a,
        button,
        input,
        textarea,
        select,
        .card,
        .btn,
        .nav-link,
        .search-result
        `).forEach(t=>{t.addEventListener("mouseenter",()=>{e.classList.add("cursor-hover")}),t.addEventListener("mouseleave",()=>{e.classList.remove("cursor-hover")})}),document.addEventListener("mousedown",()=>{e.classList.add("cursor-click")}),document.addEventListener("mouseup",()=>{e.classList.remove("cursor-click")}),document.addEventListener("mouseleave",()=>{e.style.opacity="0"}),document.addEventListener("mouseenter",()=>{e.style.opacity="1"})});const f=document.getElementById("backToTop");document.addEventListener("click",e=>{e.target.id==="backToTop"&&window.scrollTo({top:0,behavior:"smooth"})});f&&(f.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})}),window.addEventListener("scroll",()=>{window.scrollY>300?(f.style.opacity="1",f.style.pointerEvents="auto"):(f.style.opacity=".75",f.style.pointerEvents="auto")}));const U=30;let C=0;const J=document.getElementById("videos-container");function X(e){var n=/^.*((youtu.be\/)|(v\/)|(\/u\/w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/,t=e.match(n);return t&&t[7].length==11?t[7]:null}function Z(e){var n=document.createElement("div");n.className="youtube";var t=document.createElement("a");t.href="https://www.youtube.com/watch?v="+e,t.target="_blank",t.rel="noopener noreferrer";var o=document.createElement("img");o.src="https://img.youtube.com/vi/"+e+"/hqdefault.jpg",o.alt="Video thumbnail";var a=document.createElement("div");return a.className="play-button",t.appendChild(o),t.appendChild(a),n.appendChild(t),n}function P(){songsList.slice(C,C+U).forEach(function(n){if(n.youtubeLinks){var t=n.youtubeLinks.split(/[, ]+/).map(o=>o.trim());t.forEach(function(o){var a=X(o);if(a){const r=Z(a);J.appendChild(r)}})}}),C+=U}function Q(){window.innerHeight+window.scrollY>=document.body.offsetHeight-500&&C<songsList.length&&P()}document.addEventListener("DOMContentLoaded",function(){P(),window.addEventListener("scroll",Q)});const v=document.getElementById("authorLoading"),L=document.getElementById("authorError"),N=document.getElementById("authorErrorMessage"),b=document.getElementById("authorContent"),q=document.getElementById("authorName"),E=document.getElementById("authorDates"),_=document.getElementById("authorCountry"),g=document.getElementById("authorAvatar"),u=document.getElementById("authorPhoto"),x=document.getElementById("authorBio"),B=document.getElementById("authorHymnCount"),V=document.getElementById("authorHymnsSubtitle"),y=document.getElementById("authorHymns"),p=document.getElementById("authorHistoricalArchive"),m=document.getElementById("authorHistoricalImage"),k=document.getElementById("authorHistoricalView"),D=document.getElementById("authorHistoricalImageButton"),l=document.getElementById("historicalLightbox"),w=document.getElementById("historicalLightboxImage"),T=document.getElementById("historicalLightboxClose");function Y(){if(!l||!w||!m)return;const e=m.src;e&&(w.src=e,w.alt=m.alt||"Historical archival record",l.classList.add("is-open"),l.setAttribute("aria-hidden","false"),document.body.classList.add("historical-lightbox-open"),T&&T.focus())}function A(){l&&(l.classList.remove("is-open"),l.setAttribute("aria-hidden","true"),document.body.classList.remove("historical-lightbox-open"),window.setTimeout(()=>{!l.classList.contains("is-open")&&w&&(w.src="")},250))}D&&D.addEventListener("click",Y);k&&k.addEventListener("click",Y);T&&T.addEventListener("click",A);l&&l.addEventListener("click",e=>{e.target.hasAttribute("data-historical-close")&&A()});document.addEventListener("keydown",e=>{e.key==="Escape"&&l&&l.classList.contains("is-open")&&A()});te();function ee(){return new URLSearchParams(window.location.search).get("id")}async function te(){ae();const e=ee();if(!e){S("No Writer was specified.");return}try{const{data:n,error:t}=await c.from("authors").select(`
    id,
    name,
    photo_url,
    bio,
    birth_year,
    death_year,
    country,
    media_id,
    historical_media_id
`).eq("id",e).maybeSingle();if(t)throw console.error("Author database error:",t),t;if(!n){S("This author could not be found in the archive.");return}console.log("Author loaded successfully:",n),await ne(n),await oe(n.id),se()}catch(n){console.error("Author loading error:",n),S("Unable to load author information.")}}async function ne(e){const n=e.name||"Unknown Writer";q&&(q.textContent=n),g&&(g.textContent=re(n));const t=e.birth_year,o=e.death_year;if(t||o){let i="";t&&o?i=`${t} — ${o}`:t?i=`Born ${t}`:i=`Died ${o}`,E&&(E.textContent=i,E.classList.remove("hidden"))}else E&&E.classList.add("hidden");if(_)if(e.country){const i=_.querySelector("span");i&&(i.textContent=e.country),_.classList.remove("hidden")}else _.classList.add("hidden");if(x)if(e.bio&&e.bio.trim()){const i=e.bio.trim().split(/\n\s*\n/);x.innerHTML=i.map(d=>`
                            <p>
                                ${H(d.trim())}
                            </p>
                        `).join("")}else x.innerHTML=`
                <p>
                    Biography information is currently
                    being prepared for this archive.
                </p>
            `;let a=e.photo_url||"";if(!a&&e.media_id){const{data:i,error:d}=await c.from("media").select("storage_path").eq("id",e.media_id).maybeSingle();!d&&i?.storage_path&&(a=R(i.storage_path))}u&&g&&(a?(u.src=a,u.alt=`${n} - hymn writer`,u.classList.remove("hidden"),g.classList.add("hidden"),u.onerror=()=>{u.classList.add("hidden"),g.classList.remove("hidden")}):(u.classList.add("hidden"),g.classList.remove("hidden"))),document.title=`${n} | Andhra Kraistava Keerthanalu`;let r=document.querySelector('meta[name="description"]');if(r||(r=document.createElement("meta"),r.name="description",document.head.appendChild(r)),r.content=(e.bio?.trim()||`Explore the biography and hymns of ${n}.`).substring(0,160),p&&m){const i=e.historical_media_id;if(!i)p.classList.add("hidden");else{const{data:d,error:s}=await c.from("media").select("storage_path").eq("id",i).maybeSingle();if(!s&&d?.storage_path){const h=R(d.storage_path);h?(m.src=h,m.alt=`${n} - historical record`,p.classList.remove("hidden"),k&&(k.href=h),m.onerror=()=>{console.error("Historical image failed to load:",h),p.classList.add("hidden")}):(console.error("Could not create historical image URL."),p.classList.add("hidden"))}else console.error("Historical media lookup failed:",s),p.classList.add("hidden")}}}async function oe(e){const{data:n,error:t}=await c.from("hymns").select(`
            id,
            number,
            title_telugu,
            title_english,
            language
        `).eq("author_id",e).order("number",{ascending:!0});if(t){console.error("Author hymns error:",t),B&&(B.textContent="0"),y&&(y.innerHTML=`
                <div class="author-empty">
                    <p>
                        Unable to load this author's hymns.
                    </p>
                </div>
            `);return}const o=n||[];if(B&&(B.textContent=o.length),V&&(V.textContent=o.length===1?"1 hymn associated with this writer.":`${o.length} hymns associated with this writer.`),o.length===0){y&&(y.innerHTML=`
                <div class="author-empty">
                    <p>
                        No hymns are currently associated
                        with this author.
                    </p>
                </div>
            `);return}y&&(y.innerHTML=o.map(ie).join(""))}function ie(e){const n=e.number??"",t=e.title_telugu?.trim()||"",o=e.title_english?.trim()||"",a=t||o||"Untitled Hymn";return`
        <a
            href="${`hymn.html?id=${encodeURIComponent(n)}`}"
            class="author-hymn"
        >

            <div class="author-hymn-number">

                ${H(n)}

            </div>


            <div>

                <div class="author-hymn-title">

                    ${H(a)}

                </div>


                ${o?`
                            <div class="author-hymn-english">

                                ${H(o)}

                            </div>
                        `:""}

            </div>


            <div class="author-hymn-arrow">

                →

            </div>

        </a>
    `}function R(e){if(!e)return"";const{data:n}=c.storage.from("media").getPublicUrl(e);return n?.publicUrl||""}function re(e){const n=e.trim().split(/\s+/).filter(Boolean);return n.length===1?n[0].substring(0,2).toUpperCase():n[0].toUpperCase()}function H(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function ae(){v&&v.classList.remove("hidden"),L&&L.classList.add("hidden"),b&&b.classList.add("hidden")}function S(e){v&&v.classList.add("hidden"),b&&b.classList.add("hidden"),N&&(N.textContent=e),L&&L.classList.remove("hidden")}function se(){v&&v.classList.add("hidden"),L&&L.classList.add("hidden"),b&&b.classList.remove("hidden")}
