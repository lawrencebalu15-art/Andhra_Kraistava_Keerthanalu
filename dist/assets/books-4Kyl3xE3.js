import{s as b}from"./supabase-C4TjTvDq.js";import"./main-yLevhNtv.js";const o=document.getElementById("booksGrid"),s=document.getElementById("booksLoading"),n=document.getElementById("booksError"),i=document.getElementById("booksEmpty"),c=document.getElementById("booksEmptyMessage"),m=document.getElementById("bookSearch"),g=document.getElementById("booksRetry");let a=[],r=[];document.addEventListener("DOMContentLoaded",()=>{if(!o){console.error("[Books] booksGrid element was not found.");return}h()});async function h(){B(),console.log("[Books] Loading books from Supabase...");try{const{data:e,error:t}=await b.from("books").select(`
    id,
    name,
    slug,
    description,
    cover_url,
    created_at
`).order("created_at",{ascending:!1});if(t)throw console.error("[Books] Supabase query failed:",t),t;if(console.log("[Books] Books received:",e),a=e||[],r=[...a],a.length===0){w();return}u()}catch(e){console.error("[Books] Failed to load books:",e),E(e?.message||"Unable to load books.")}}function u(){if(!r.length){S();return}o.innerHTML=r.map(y).join(""),C(),o.classList.remove("hidden")}function y(e){const t=e.name||"Untitled Book",d=e.description||"A publication documenting Telugu Christian hymn heritage.";return`

        <article class="book-card">

           <div class="book-cover">

    ${e.cover_url?`
                <img
                    src="${l(e.cover_url)}"
                    alt="${l(t)}"
                    class="book-cover-image"
                    loading="lazy"
                >
            `:`
                <div class="book-cover-placeholder">
                    <span>📖</span>
                </div>
            `}

</div>


            <div class="book-content">

                <span class="book-category">
                    Publication
                </span>


                <h3>
                    ${f(t)}
                </h3>


                <p>
                    ${f(d)}
                </p>


                ${e.slug?`
                            <a
                                href="#"
                                class="book-link"
                                data-slug="${l(e.slug)}"
                            >
                                View Publication
                            </a>
                        `:""}

            </div>

        </article>

    `}m&&m.addEventListener("input",v);function v(e){const t=e.target.value.trim().toLowerCase();if(!t){r=[...a],u();return}r=a.filter(d=>{const p=String(d.name||"").toLowerCase(),L=String(d.slug||"").toLowerCase(),k=String(d.description||"").toLowerCase();return p.includes(t)||L.includes(t)||k.includes(t)}),u()}g&&g.addEventListener("click",h);function B(){o&&o.classList.add("hidden"),s&&s.classList.remove("hidden"),n&&n.classList.add("hidden"),i&&i.classList.add("hidden")}function E(e){o&&o.classList.add("hidden"),s&&s.classList.add("hidden"),n&&n.classList.remove("hidden"),i&&i.classList.add("hidden");const t=document.getElementById("booksErrorMessage");t&&(t.textContent=e)}function w(){o&&o.classList.add("hidden"),s&&s.classList.add("hidden"),n&&n.classList.add("hidden"),i&&i.classList.remove("hidden"),c&&(c.textContent="Books and publications will appear here as they are added to the library.")}function S(){o&&o.classList.add("hidden"),s&&s.classList.add("hidden"),n&&n.classList.add("hidden"),i&&i.classList.remove("hidden"),c&&(c.textContent="No books match your search.")}function C(){s&&s.classList.add("hidden"),n&&n.classList.add("hidden"),i&&i.classList.add("hidden")}function f(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function l(e){return f(e)}
