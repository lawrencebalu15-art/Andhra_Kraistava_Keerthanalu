import{s as L}from"./supabase-C4TjTvDq.js";import"./main-BdfaFlrx.js";const n=document.getElementById("booksGrid"),l=document.getElementById("booksLoading"),u=document.getElementById("booksError"),b=document.getElementById("booksEmpty"),h=document.getElementById("booksEmptyMessage"),C=document.getElementById("bookSearch"),E=document.getElementById("booksRetry");let a=[],d=[];document.addEventListener("DOMContentLoaded",()=>{if(!n){console.error("[Books] #booksGrid was not found.");return}U(),B(),y()});function B(){C?.addEventListener("input",A),E?.addEventListener("click",()=>{y()}),n.addEventListener("click",T)}async function y(){M(),console.log("[Books] Loading books from Supabase...");try{const{data:e,error:o}=await L.from("books").select(`
                id,
                name,
                slug,
                description,
                cover_url,
                created_at
            `).order("created_at",{ascending:!1});if(o)throw o;if(a=(e||[]).map(t=>({...t,coverUrl:w(t.cover_url)})),d=[...a],console.log("[Books] Books received:",a),!a.length){q();return}k()}catch(e){console.error("[Books] Failed to load books:",e),P(e?.message||"Unable to load books. Please try again.")}}function w(e){if(!e)return"";const o=String(e).trim();if(!o)return"";if(o.startsWith("http://")||o.startsWith("https://")||o.startsWith("data:")||o.startsWith("blob:"))return o;if(o.startsWith("//"))return`${window.location.protocol}${o}`;if(o.startsWith("/"))return o.includes("/storage/v1/")?new URL(o,window.location.origin).href:new URL(o,window.location.origin).href;try{const{data:t}=L.storage.from("media").getPublicUrl(o);return t?.publicUrl||o}catch(t){return console.warn("[Books] Could not resolve Storage path:",o,t),o}}function k(){if(!d.length){R();return}n.innerHTML=d.map((e,o)=>I(e,o)).join(""),W(),n.classList.remove("hidden"),n.querySelectorAll(".book-cover-image").forEach(e=>{e.addEventListener("error",S,{once:!0})})}function I(e,o){const t=e.name||"Untitled Book",s=e.description||"A publication documenting Telugu Christian hymn heritage.",g=e.coverUrl||"";return`
        <article class="book-card">

            <div class="book-cover">

                ${g?`
                            <button
                                type="button"
                                class="book-cover-trigger"
                                data-book-index="${o}"
                                aria-label="View full cover of ${m(t)}"
                            >

                                <img
                                    src="${m(g)}"
                                    alt="${m(t)}"
                                    class="book-cover-image"
                                    loading="lazy"
                                    decoding="async"
                                >

                                <span
                                    class="book-cover-overlay"
                                    aria-hidden="true"
                                >
                                    <i class="fa-solid fa-expand"></i>
                                    <span>View Cover</span>
                                </span>

                            </button>
                        `:`
                            <div
                                class="book-cover-placeholder"
                                aria-label="No cover available"
                            >
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
                    ${f(s)}
                </p>


                ${e.slug?`
                            <a
                                href="book.html?slug=${encodeURIComponent(e.slug)}"
                                class="book-link"
                            >
                                View Publication
                            </a>
                        `:""}

            </div>

        </article>
    `}function S(e){const o=e.currentTarget;if(!o||o.dataset.failed==="true")return;o.dataset.failed="true";const t=o.closest(".book-cover-trigger");t&&(t.outerHTML=`
        <div
            class="book-cover-placeholder"
            aria-label="Book cover unavailable"
        >
            <span>📖</span>
        </div>
    `)}let r=null,i=null,c=null;function U(){if(document.getElementById("bookCoverLightbox")){r=document.getElementById("bookCoverLightbox"),i=document.getElementById("bookCoverLightboxImage"),c=document.getElementById("bookCoverLightboxTitle"),p();return}const e=document.createElement("div");e.id="bookCoverLightbox",e.className="book-cover-lightbox",e.setAttribute("aria-hidden","true"),e.innerHTML=`
        <div
            class="book-cover-lightbox-backdrop"
            data-book-cover-close
        ></div>


        <div
            class="book-cover-lightbox-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="bookCoverLightboxTitle"
        >

            <button
                type="button"
                id="bookCoverLightboxClose"
                class="book-cover-lightbox-close"
                aria-label="Close book cover"
                data-book-cover-close
            >
                <i class="fa-solid fa-xmark"></i>
            </button>


            <div class="book-cover-lightbox-content">

                <img
                    id="bookCoverLightboxImage"
                    class="book-cover-lightbox-image"
                    src=""
                    alt=""
                >


                <div
                    id="bookCoverLightboxTitle"
                    class="book-cover-lightbox-title"
                ></div>

            </div>

        </div>
    `,document.body.appendChild(e),r=e,i=e.querySelector("#bookCoverLightboxImage"),c=e.querySelector("#bookCoverLightboxTitle"),p()}function p(){if(!r||r.dataset.eventsReady==="true")return;r.dataset.eventsReady="true";const e=document.getElementById("bookCoverLightboxClose");e&&e.addEventListener("click",function(t){t.preventDefault(),t.stopPropagation(),v()});const o=r.querySelector(".book-cover-lightbox-backdrop");o&&o.addEventListener("click",function(t){t.preventDefault(),t.stopPropagation(),v()}),r.addEventListener("click",function(t){t.target===r&&v()}),i&&i.addEventListener("error",function(){i.alt="Book cover unavailable",i.removeAttribute("src"),i.classList.add("image-error")})}function $(e,o){!r||!i||!e||(i.classList.remove("image-error"),i.src=e,i.alt=`${o} — full cover`,c&&(c.textContent=o),r.classList.add("is-open"),r.setAttribute("aria-hidden","false"),document.body.classList.add("book-cover-lightbox-open"),document.body.style.overflow="hidden")}function v(){r&&(r.classList.remove("is-open"),r.setAttribute("aria-hidden","true"),document.body.classList.remove("book-cover-lightbox-open"),document.body.style.overflow="",i&&(i.removeAttribute("src"),i.alt="",i.classList.remove("image-error")),c&&(c.textContent=""))}function T(e){const o=e.target.closest(".book-cover-trigger");if(!o)return;e.preventDefault();const t=Number(o.dataset.bookIndex),s=d[t];!s||!s.coverUrl||$(s.coverUrl,s.name||"Book cover")}document.addEventListener("keydown",e=>{e.key==="Escape"&&r?.classList.contains("is-open")&&v()});function A(e){const o=e.target.value.trim().toLowerCase();if(!o){d=[...a],k();return}d=a.filter(t=>{const s=String(t.name||"").toLowerCase(),g=String(t.slug||"").toLowerCase(),x=String(t.description||"").toLowerCase();return s.includes(o)||g.includes(o)||x.includes(o)}),k()}function M(){n?.classList.add("hidden"),l?.classList.remove("hidden"),u?.classList.add("hidden"),b?.classList.add("hidden")}function P(e){n?.classList.add("hidden"),l?.classList.add("hidden"),b?.classList.add("hidden"),u?.classList.remove("hidden");const o=document.getElementById("booksErrorMessage");o&&(o.textContent=e)}function q(){n?.classList.add("hidden"),l?.classList.add("hidden"),u?.classList.add("hidden"),b?.classList.remove("hidden"),h&&(h.textContent="Books and publications will appear here as they are added to the library.")}function R(){n?.classList.add("hidden"),l?.classList.add("hidden"),u?.classList.add("hidden"),b?.classList.remove("hidden"),h&&(h.textContent="No books match your search.")}function W(){l?.classList.add("hidden"),u?.classList.add("hidden"),b?.classList.add("hidden")}function f(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function m(e){return f(e)}
