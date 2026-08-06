import{t as e}from"./main-5cy74Aj2.js";e.forEach((e,t)=>{e.id=t+1,e.language||=`telugu`});var t=document.getElementById(`hymnsBody`),n=document.getElementById(`searchInput`),r=document.getElementById(`resultsText`),i=document.getElementById(`languageContainer`),a=document.getElementById(`alphabetContainer`),o=document.getElementById(`sortSelect`),s={language:`all`,letter:`All`,search:``},c=`All.అ.ఆ.ఇ.ఈ.ఉ.ఊ.ఋ.ఎ.ఏ.ఐ.ఒ.ఓ.ఔ.క.ఖ.గ.ఘ.ఙ.చ.ఛ.జ.ఝ.ఞ.ట.ఠ.డ.ఢ.ణ.త.థ.ద.ధ.న.ప.ఫ.బ.భ.మ.య.ర.ల.వ.శ.ష.స.హ`.split(`.`),l=`All.A.B.C.D.E.F.G.H.I.J.K.L.M.N.O.P.Q.R.S.T.U.V.W.X.Y.Z`.split(`.`);function u(){return s.language===`english`?l:c}function d(){return s.language===`english`?`Browse by English Alphabet`:`Browse by Telugu Letter`}function f(e){return e.language===`english`?e.title||e.titleEnglish||``:e.titleTelugu?.trim()?e.titleTelugu.trim():`~~~${e.number}`}function p(){i.innerHTML=`

        <div class="filter-group">

            <div class="filter-title">

                Collections

            </div>

            <div class="language-buttons">

                <button
                    class="language-btn ${s.language===`all`?`active`:``}"
                    data-language="all">

                    📚 All Hymns

                </button>

                <button
                    class="language-btn ${s.language===`telugu`?`active`:``}"
                    data-language="telugu">

                    📖 తెలుగు కీర్తనలు

                </button>

                <button
                    class="language-btn ${s.language===`english`?`active`:``}"
                    data-language="english">

                    🌍 English Hymns

                </button>

            </div>

        </div>

    `,i.querySelectorAll(`.language-btn`).forEach(e=>{e.addEventListener(`click`,()=>{s.language=e.dataset.language,s.letter=`All`,p(),m(),y()})})}function m(){let e=u();a.innerHTML=`

        <div class="filter-group">

            <div class="filter-title">

                ${d()}

            </div>

            <div class="filter-buttons">

                ${e.map(e=>`

                    <button
                        class="filter-btn ${s.letter===e?`active`:``}"
                        data-letter="${e}">

                        ${e}

                    </button>

                `).join(``)}

            </div>

        </div>

    `,a.querySelectorAll(`.filter-btn`).forEach(e=>{e.addEventListener(`click`,()=>{s.letter=e.dataset.letter,m(),y()})})}n.addEventListener(`input`,e=>{s.search=e.target.value.trim().toLowerCase(),y()});function h(){return e.filter(e=>{let t=s.language===`all`||e.language===s.language,n=f(e),r=e.titleEnglish||``,i=s.search===``||String(e.number).includes(s.search)||n.toLowerCase().includes(s.search)||r.toLowerCase().includes(s.search)||(e.author||``).toLowerCase().includes(s.search),a=s.letter===`All`||n.trim().startsWith(s.letter);return t&&i&&a})}function g(e){let t=f(e),n=e.youtubeLinks?.length?e.youtubeLinks.slice(0,5).map(e=>`
                <a
                    href="${e}"
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
            `).join(``):``;return`

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
                ${e.author||`Unknown Author`}
            </div>

            <div class="hymn-youtube">
                ${n}
            </div>

        </article>

    `}function _(e){if(r.textContent=`Showing ${e.length} Hymns`,!e.length){t.innerHTML=`

            <div class="empty-state">

                <h2>No Hymns Found</h2>

                <p>Try changing the search or filters.</p>

            </div>

        `;return}t.innerHTML=e.map(g).join(``)}function v(e){let t=[...e];switch(o.value){case`number-asc`:t.sort((e,t)=>Number(e.number)-Number(t.number));break;case`number-desc`:t.sort((e,t)=>Number(t.number)-Number(e.number));break;case`telugu-asc`:t.sort((e,t)=>f(e).localeCompare(f(t),`te`));break;case`telugu-desc`:t.sort((e,t)=>f(t).localeCompare(f(e),`te`));break;case`author-asc`:t.sort((e,t)=>(e.author||``).localeCompare(t.author||``,`en`,{sensitivity:`base`}));break;case`author-desc`:t.sort((e,t)=>(t.author||``).localeCompare(e.author||``,`en`,{sensitivity:`base`}));break;default:t.sort((e,t)=>Number(e.number)-Number(t.number))}return t}function y(){let e=h();e=v(e),_(e)}function b(){n&&n.addEventListener(`input`,e=>{s.search=e.target.value.trim().toLowerCase(),y()}),o&&o.addEventListener(`change`,()=>{y()})}function x(){if(console.log(`Songs Loaded:`,e.length),!Array.isArray(e)||e.length===0){console.error(`songsList is empty.`),r.textContent=`Showing 0 Hymns`,t.innerHTML=`
            <div class="empty-state">
                <h2>No Hymns Found</h2>
                <p>songsList is empty.</p>
            </div>
        `;return}p(),m(),b(),o&&(o.value=`number-asc`),y()}document.readyState===`loading`?document.addEventListener(`DOMContentLoaded`,x):x();