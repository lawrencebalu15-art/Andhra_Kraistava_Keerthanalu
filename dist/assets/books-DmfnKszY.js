import{s as k}from"./supabase-C4TjTvDq.js";import"./main-DZT5cO3Q.js";const o=document.getElementById("booksGrid"),s=document.getElementById("booksLoading"),n=document.getElementById("booksError"),i=document.getElementById("booksEmpty"),c=document.getElementById("booksEmptyMessage"),f=document.getElementById("bookSearch"),h=document.getElementById("booksRetry");let a=[],r=[];document.addEventListener("DOMContentLoaded",()=>{if(!o){console.error("[Books] booksGrid element was not found.");return}m()});async function m(){B(),console.log("[Books] Loading books from Supabase...");try{const{data:e,error:t}=await k.from("books").select(`
                id,
                name,
                slug,
                description,
                created_at
            `).order("created_at",{ascending:!1});if(t)throw console.error("[Books] Supabase query failed:",t),t;if(console.log("[Books] Books received:",e),a=e||[],r=[...a],a.length===0){E();return}l()}catch(e){console.error("[Books] Failed to load books:",e),v(e?.message||"Unable to load books.")}}function l(){if(!r.length){w();return}o.innerHTML=r.map(b).join(""),S(),o.classList.remove("hidden")}function b(e){const t=e.name||"Untitled Book",d=e.description||"A publication documenting Telugu Christian hymn heritage.";return`

        <article class="book-card">

            <div class="book-cover">

                <div class="book-cover-placeholder">

                    <span>
                        📖
                    </span>

                </div>

            </div>


            <div class="book-content">

                <span class="book-category">
                    Publication
                </span>


                <h3>
                    ${u(t)}
                </h3>


                <p>
                    ${u(d)}
                </p>


                ${e.slug?`
                            <a
                                href="#"
                                class="book-link"
                                data-slug="${C(e.slug)}"
                            >
                                View Publication
                            </a>
                        `:""}

            </div>

        </article>

    `}f&&f.addEventListener("input",y);function y(e){const t=e.target.value.trim().toLowerCase();if(!t){r=[...a],l();return}r=a.filter(d=>{const g=String(d.name||"").toLowerCase(),p=String(d.slug||"").toLowerCase(),L=String(d.description||"").toLowerCase();return g.includes(t)||p.includes(t)||L.includes(t)}),l()}h&&h.addEventListener("click",m);function B(){o&&o.classList.add("hidden"),s&&s.classList.remove("hidden"),n&&n.classList.add("hidden"),i&&i.classList.add("hidden")}function v(e){o&&o.classList.add("hidden"),s&&s.classList.add("hidden"),n&&n.classList.remove("hidden"),i&&i.classList.add("hidden");const t=document.getElementById("booksErrorMessage");t&&(t.textContent=e)}function E(){o&&o.classList.add("hidden"),s&&s.classList.add("hidden"),n&&n.classList.add("hidden"),i&&i.classList.remove("hidden"),c&&(c.textContent="Books and publications will appear here as they are added to the library.")}function w(){o&&o.classList.add("hidden"),s&&s.classList.add("hidden"),n&&n.classList.add("hidden"),i&&i.classList.remove("hidden"),c&&(c.textContent="No books match your search.")}function S(){s&&s.classList.add("hidden"),n&&n.classList.add("hidden"),i&&i.classList.add("hidden")}function u(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function C(e){return u(e)}
