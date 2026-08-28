import{s as w}from"./supabase-C4TjTvDq.js";import"./main-4yU1RJkU.js";let s=[],l=[],m=[];const a=document.getElementById("authorsGrid"),f=document.getElementById("authorsLoading"),c=document.getElementById("authorsEmpty"),p=document.getElementById("authorSearch"),g=document.getElementById("authorSort");L();async function L(){await v(),k(),b(),A()}async function v(){f&&(f.style.display="block"),a&&(a.innerHTML=""),c&&(c.style.display="none");try{const{data:t,error:e}=await w.from("authors").select(`
        id,
        name,
        photo_url,
        bio,
        birth_year,
        death_year,
        country,
        media_id
    `).order("name",{ascending:!0});if(e)throw e;const{data:o,error:n}=await w.from("hymns").select("id, author_id");if(n)throw n;s=t||[],m=o||[],l=[...s],console.log("Loaded authors:",s),console.log("Loaded hymns:",m)}catch(t){console.error("Failed to load authors:",t),a&&(a.innerHTML=`
                <div class="author-load-error">

                    <i class="fas fa-circle-exclamation"></i>

                    <h3>
                        Unable to Load Authors
                    </h3>

                    <p>
                        Please refresh the page and try again.
                    </p>

                </div>
            `),s=[],m=[],l=[]}finally{f&&(f.style.display="none")}}function k(){const t=document.getElementById("totalAuthors"),e=document.getElementById("totalHymns"),o=document.getElementById("totalBooks");t&&(t.textContent=s.length),e&&(e.textContent=m.length),o&&(o.textContent="0")}function b(){if(a){if(l.length===0){a.innerHTML="",c&&(c.style.display="block");return}c&&(c.style.display="none"),a.innerHTML=l.map(B).join("")}}function B(t){const e=m.filter(E=>String(E.author_id)===String(t.id)).length,o=t.photo_url||"https://placehold.co/400x400?text=Author",n=h(t.name||"Unknown Author"),d=h(t.bio||"Biography coming soon..."),i=t.country?h(t.country):"",r=t.birth_year||"",y=t.death_year||"";let u="";return r&&y?u=`${r} — ${y}`:r?u=`Born ${r}`:y&&(u=`Died ${y}`),`
        <article
            class="author-card"
            onclick="window.location.href='${`author.html?id=${encodeURIComponent(t.id)}`}'"
            role="link"
            tabindex="0"
            aria-label="View ${n}"
        >

            <div class="author-image-wrapper">

                <img
                    src="${h(o)}"
                    alt="${n}"
                    loading="lazy"
                    onerror="this.src='https://placehold.co/400x400?text=Author';"
                >

            </div>


            <div class="author-content">

                <h3>
                    ${n}
                </h3>


                ${u?`
                            <p class="author-dates">
                                ${h(u)}
                            </p>
                        `:""}


                ${i?`
                            <p class="author-country">
                                <i class="fas fa-location-dot"></i>
                                ${i}
                            </p>
                        `:""}


                <p class="bio-coming">
                    ${d}
                </p>


                <div class="author-hymn-count">

                    <i class="fas fa-music"></i>

                    ${e}

                    ${e===1?"Hymn":"Hymns"}

                </div>


                <span class="view-author-link">

                    View Author

                    <i class="fas fa-arrow-right"></i>

                </span>

            </div>

        </article>
    `}function A(){p&&p.addEventListener("input",$),g&&g.addEventListener("change",$),a&&a.addEventListener("keydown",t=>{const e=t.target.closest(".author-card");e&&(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),e.click())})}function $(){const t=p?p.value.toLowerCase().trim():"";l=s.filter(o=>{const n=String(o.name||"").toLowerCase(),d=String(o.bio||"").toLowerCase(),i=String(o.country||"").toLowerCase();return n.includes(t)||d.includes(t)||i.includes(t)});const e=g?g.value:"az";l.sort((o,n)=>{const d=String(o.name||""),i=String(n.name||""),r=d.localeCompare(i,void 0,{sensitivity:"base"});return e==="za"?-r:r}),b()}function h(t){return String(t??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}
