import{s as c}from"./supabase-C4TjTvDq.js";import"./main-Dw1_MU5N.js";const h=document.getElementById("totalHymns"),f=document.getElementById("totalAuthors"),g=document.getElementById("totalBooks"),d=document.getElementById("authorSearch"),u=document.getElementById("authorSort"),a=document.getElementById("authorsList"),p=document.getElementById("authorsLoading"),l=document.getElementById("authorsEmpty");let i=[],m=[],y=[],r=[],L="az";document.addEventListener("DOMContentLoaded",async()=>{await H(),I()});async function H(){try{v(!0);const[t,e,o]=await Promise.all([c.from("authors").select("*").eq("is_active",!0).order("name",{ascending:!0}),c.from("hymns").select("id, author_id"),c.from("books").select("id")]);if(t.error)throw t.error;if(e.error)throw e.error;if(o.error)throw o.error;i=t.data||[],m=e.data||[],y=o.data||[],r=[...i],h&&(h.textContent=m.length),f&&(f.textContent=i.length),g&&(g.textContent=y.length),C()}catch(t){console.error("Failed to load authors:",t),k()}finally{v(!1)}}function I(){d&&d.addEventListener("input",()=>{E()}),u&&u.addEventListener("change",()=>{L=u.value||"az",E()})}function E(){const t=(d?.value||"").trim().toLowerCase();r=i.filter(e=>(e.name||"").toLowerCase().includes(t)),r.sort((e,o)=>{const s=(e.name||"").toLowerCase(),n=(o.name||"").toLowerCase();return L==="za"?n.localeCompare(s):s.localeCompare(n)}),C()}function b(t,e){const o=m.filter(B=>String(B.author_id)===String(t.id)).length,s=w(t.name||"Unknown Author"),n=w(t.english_name||"");return`
        <a
            href="${`author.html?id=${encodeURIComponent(t.id)}`}"
            class="author-list-row"
        >

            <div class="author-list-number">
                ${e+1}
            </div>


            <div class="author-list-name">

                <span class="author-telugu-name">
                    ${s}
                </span>

                ${n?`
                            <span class="author-english-name">
                                ${n}
                            </span>
                          `:""}

            </div>


            <div class="author-list-count">

                <i class="fas fa-music"></i>

                <span>
                    ${o}
                    ${o===1?"Hymn":"Hymns"}
                </span>

            </div>


            <div class="author-list-arrow">

                <i class="fas fa-arrow-right"></i>

            </div>

        </a>
    `}function C(){if(a){if(r.length===0){a.innerHTML="",l&&(l.style.display="block");return}l&&(l.style.display="none"),a.innerHTML=r.map((t,e)=>b(t,e)).join("")}}function v(t){p&&(p.style.display=t?"block":"none")}function k(){a&&(a.innerHTML=`
        <div class="author-load-error">

            <i class="fas fa-circle-exclamation"></i>

            <h3>
                Unable to Load Hymn Writers
            </h3>

            <p>
                Please refresh the page and try again.
            </p>

        </div>
    `)}function w(t){return String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}
