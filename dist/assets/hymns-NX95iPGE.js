import{s as v}from"./supabase-C4TjTvDq.js";import"./main-Bv_W86yG.js";import{s as f}from"./page-header-Bl-XMcri.js";let s=[];async function L(){console.log("loadSongs started");try{const{data:e,error:n}=await v.from("hymns").select(`
                *,
                authors(name),
                books(name),
                categories(name)
            `);if(console.log("Supabase response:",{data:e,error:n}),n){console.error("Supabase error:",n);return}s=e.map(t=>({...t,author:t.authors?.name||"Unknown",book:t.books?.name||"",category:t.categories?.name||"",titleTelugu:t.title_telugu,titleEnglish:t.title_english,youtubeLinks:t.youtube_links||[]})),console.log("Loaded",s.length,"songs"),B()}catch(e){console.error("loadSongs crashed:",e)}}L();f("కీర్తనలు","Browse Telugu and English Hymns");const u=document.getElementById("hymnsBody"),c=document.getElementById("searchInput"),m=document.getElementById("resultsText"),d=document.getElementById("languageContainer"),h=document.getElementById("alphabetContainer"),i=document.getElementById("sortSelect"),a={language:"all",letter:"All",search:""},E=["All","అ","ఆ","ఇ","ఈ","ఉ","ఊ","ఋ","ఎ","ఏ","ఐ","ఒ","ఓ","ఔ","క","ఖ","గ","ఘ","ఙ","చ","ఛ","జ","ఝ","ఞ","ట","ఠ","డ","ఢ","ణ","త","థ","ద","ధ","న","ప","ఫ","బ","భ","మ","య","ర","ల","వ","శ","ష","స","హ"],T=["All","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];function k(){return a.language==="english"?T:E}function C(){return a.language==="english"?"Browse by English Alphabet":"Browse by Telugu Letter"}function l(e){return e.language==="english"?e.title||e.titleEnglish||"":e.titleTelugu?.trim()?e.titleTelugu.trim():`~~~${e.number}`}function b(){d.innerHTML=`

        <div class="filter-group">

            <div class="filter-title">

                Collections

            </div>

            <div class="language-buttons">

                <button
                    class="language-btn ${a.language==="all"?"active":""}"
                    data-language="all">

                    📚 All Hymns

                </button>

                <button
                    class="language-btn ${a.language==="telugu"?"active":""}"
                    data-language="telugu">

                    📖 తెలుగు కీర్తనలు

                </button>

                <button
                    class="language-btn ${a.language==="english"?"active":""}"
                    data-language="english">

                    🌍 English Hymns

                </button>

            </div>

        </div>

    `,d.querySelectorAll(".language-btn").forEach(e=>{e.addEventListener("click",()=>{a.language=e.dataset.language,a.letter="All",b(),g(),o()})})}function g(){const e=k();h.innerHTML=`

        <div class="filter-group">

            <div class="filter-title">

                ${C()}

            </div>

            <div class="filter-buttons">

                ${e.map(n=>`

                    <button
                        class="filter-btn ${a.letter===n?"active":""}"
                        data-letter="${n}">

                        ${n}

                    </button>

                `).join("")}

            </div>

        </div>

    `,h.querySelectorAll(".filter-btn").forEach(n=>{n.addEventListener("click",()=>{a.letter=n.dataset.letter,g(),o()})})}c.addEventListener("input",e=>{a.search=e.target.value.trim().toLowerCase(),o()});function S(){return s.filter(e=>{const n=a.language==="all"||e.language===a.language,t=l(e),r=e.titleEnglish||"",y=a.search===""||String(e.number).includes(a.search)||t.toLowerCase().includes(a.search)||r.toLowerCase().includes(a.search)||(e.author||"").toLowerCase().includes(a.search),p=a.letter==="All"||t.trim().startsWith(a.letter);return n&&y&&p})}function w(e){const n=l(e),t=e.youtubeLinks?.length?e.youtubeLinks.slice(0,5).map(r=>`
                <a
                    href="${r}"
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
                    ${n}
                </div>

            </a>

            <div class="hymn-author">
                ${e.author||"Unknown Writer"}
            </div>

            <div class="hymn-youtube">
                ${t}
            </div>

        </article>

    `}function H(e){if(m.textContent=`Showing ${e.length} Hymns`,!e.length){u.innerHTML=`

            <div class="empty-state">

                <h2>Hymn Not Yet Uploaded</h2>

                <p>Try changing the search or filters.</p>

            </div>

        `;return}u.innerHTML=e.map(w).join("")}function A(e){const n=[...e];switch(i.value){case"number-asc":n.sort((t,r)=>Number(t.number)-Number(r.number));break;case"number-desc":n.sort((t,r)=>Number(r.number)-Number(t.number));break;case"telugu-asc":n.sort((t,r)=>l(t).localeCompare(l(r),"te"));break;case"telugu-desc":n.sort((t,r)=>l(r).localeCompare(l(t),"te"));break;case"author-asc":n.sort((t,r)=>(t.author||"").localeCompare(r.author||"","en",{sensitivity:"base"}));break;case"author-desc":n.sort((t,r)=>(r.author||"").localeCompare(t.author||"","en",{sensitivity:"base"}));break;default:n.sort((t,r)=>Number(t.number)-Number(r.number))}return n}function o(){let e=S();e=A(e),H(e)}function $(){c&&c.addEventListener("input",e=>{a.search=e.target.value.trim().toLowerCase(),o()}),i&&i.addEventListener("change",()=>{o()})}function B(){if(console.log("Songs Loaded:",s.length),!Array.isArray(s)||s.length===0){console.error("songsList is empty."),m.textContent="Showing 0 Hymns",u.innerHTML=`
            <div class="empty-state">
                <h2>Hymn Not Yet Uploaded </h2>
                <p>songsList is empty.</p>
            </div>
        `;return}b(),g(),$(),i&&(i.value="number-asc"),o()}
