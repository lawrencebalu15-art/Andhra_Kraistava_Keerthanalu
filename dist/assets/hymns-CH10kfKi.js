import{s as S}from"./supabase-C4TjTvDq.js";import"./main-BdfaFlrx.js";import{s as T}from"./page-header-Bl-XMcri.js";let i=[];async function C(){console.log("loadSongs started");try{const{data:e,error:t}=await S.from("hymns").select(`
                *,
                authors(name),
                books(name),
                categories(name)
            `);if(console.log("Supabase response:",{data:e,error:t}),t){console.error("Supabase error:",t);return}i=e.map(n=>({...n,author:n.authors?.name||"Unknown",book:n.books?.name||"",category:n.categories?.name||"",titleTelugu:n.title_telugu,titleEnglish:n.title_english,youtubeLinks:n.youtube_links||[]})),console.log("Loaded",i.length,"songs"),U()}catch(e){console.error("loadSongs crashed:",e)}}C();T("కీర్తనలు","Browse Telugu and English Hymns");const g=document.getElementById("hymnsBody"),m=document.getElementById("searchInput"),y=document.getElementById("resultsText"),d=document.getElementById("languageContainer"),b=document.getElementById("alphabetContainer"),u=document.getElementById("sortSelect"),r={language:"all",letter:"All",search:""},k=["All","అ","ఆ","ఇ","ఈ","ఉ","ఊ","ఋ","ఎ","ఏ","ఐ","ఒ","ఓ","ఔ","క","ఖ","గ","ఘ","ఙ","చ","ఛ","జ","ఝ","ఞ","ట","ఠ","డ","ఢ","ణ","త","థ","ద","ధ","న","ప","ఫ","బ","భ","మ","య","ర","ల","వ","శ","ష","స","హ"],w=["All","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];function A(){return r.language==="english"?w:k}function H(){return r.language==="english"?"Browse by English Alphabet":"Browse by Telugu Letter"}function s(e){const t=String(e.language||"").trim().toLowerCase();return t==="english"||t==="en"?String(e.titleEnglish||e.title||"").trim():e.titleTelugu?.trim()?e.titleTelugu.trim():`~~~${e.number}`}function p(){d.innerHTML=`

        <div class="filter-group">

            <div class="filter-title">

                Collections

            </div>

            <div class="language-buttons">

                <button
                    class="language-btn ${r.language==="all"?"active":""}"
                    data-language="all">

                    📚 All Hymns

                </button>

                <button
                    class="language-btn ${r.language==="telugu"?"active":""}"
                    data-language="telugu">

                    📖 తెలుగు కీర్తనలు

                </button>

                <button
                    class="language-btn ${r.language==="english"?"active":""}"
                    data-language="english">

                    🌍 English Hymns

                </button>

            </div>

        </div>

    `,d.querySelectorAll(".language-btn").forEach(e=>{e.addEventListener("click",()=>{r.language=e.dataset.language,r.letter="All",p(),c(),o()})})}function c(){const e=A();b.innerHTML=`

        <div class="filter-group">

            <div class="filter-title">

                ${H()}

            </div>

            <div class="filter-buttons">

                ${e.map(t=>`

                    <button
                        class="filter-btn ${r.letter===t?"active":""}"
                        data-letter="${t}">

                        ${t}

                    </button>

                `).join("")}

            </div>

        </div>

    `,b.querySelectorAll(".filter-btn").forEach(t=>{t.addEventListener("click",()=>{r.letter=t.dataset.letter,c(),o()})})}m.addEventListener("input",e=>{r.search=e.target.value.trim().toLowerCase(),r.search!==""&&r.letter!=="All"&&(r.letter="All",c()),o()});function $(){return i.filter(e=>{const t=String(e.language||"").trim().toLowerCase(),n=String(e.titleTelugu||"").trim().length>0;String(e.titleEnglish||"").trim().length>0;let a=!0;r.language==="telugu"?a=t==="telugu"||t==="te"||t===""&&n:r.language==="english"&&(a=t==="english"||t==="en");const h=s(e),v=String(e.titleEnglish||""),l=r.search.trim(),f=/^\d+$/.test(l),L=l===""||(f?String(e.number)===l:h.toLowerCase().includes(l)||v.toLowerCase().includes(l)||String(e.author||"").toLowerCase().includes(l)),E=r.letter==="All"||h.trim().startsWith(r.letter);return a&&L&&E})}function B(e){const t=s(e),n=e.youtubeLinks?.length?e.youtubeLinks.slice(0,5).map(a=>`
                <a
                    href="${a}"
                    class="youtube-link"
                    target="_blank"
                    rel="noopener"
                    title="Watch on YouTube"
                    onclick="event.stopPropagation()">

                    <svg
                        class="youtube-icon"
                        viewBox="0 0 24 24"
                        fill="currentColor">

                        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8z"/>

                        <path
                            d="M10 15.5V8.5L16 12z"
                            fill="white"/>

                    </svg>

                </a>
            `).join(""):"";return`

        <article class="hymn-row">

            <div class="hymn-number">
                ${e.number}
            </div>

            <a href="hymn.html?id=${e.number}" class="hymn-link">

                <div class="hymn-title">
                    ${t}
                </div>

            </a>

            <div class="hymn-author">
                ${e.author||"Unknown Writer"}
            </div>

            <div class="hymn-youtube">
                ${n}
            </div>

        </article>

    `}function I(e){if(y.textContent=`Showing ${e.length} Hymns`,!e.length){g.innerHTML=`

            <div class="empty-state">

                <h2>Hymn Not Yet Uploaded</h2>

                <p>Try changing the search or filters.</p>

            </div>

        `;return}g.innerHTML=e.map(B).join("")}function M(e){const t=[...e];switch(u.value){case"number-asc":t.sort((n,a)=>Number(n.number)-Number(a.number));break;case"number-desc":t.sort((n,a)=>Number(a.number)-Number(n.number));break;case"telugu-asc":t.sort((n,a)=>s(n).localeCompare(s(a),"te"));break;case"telugu-desc":t.sort((n,a)=>s(a).localeCompare(s(n),"te"));break;case"author-asc":t.sort((n,a)=>(n.author||"").localeCompare(a.author||"","en",{sensitivity:"base"}));break;case"author-desc":t.sort((n,a)=>(a.author||"").localeCompare(n.author||"","en",{sensitivity:"base"}));break;default:t.sort((n,a)=>Number(n.number)-Number(a.number))}return t}function o(){let e=$();e=M(e),I(e)}function N(){m&&m.addEventListener("input",e=>{r.search=e.target.value.trim().toLowerCase(),o()}),u&&u.addEventListener("change",()=>{o()})}function U(){if(console.log("Songs Loaded:",i.length),!Array.isArray(i)||i.length===0){console.error("songsList is empty."),y.textContent="Showing 0 Hymns",g.innerHTML=`
            <div class="empty-state">
                <h2>Hymn Not Yet Uploaded </h2>
                <p>songsList is empty.</p>
            </div>
        `;return}p(),c(),N(),u&&(u.value="number-asc"),o()}
