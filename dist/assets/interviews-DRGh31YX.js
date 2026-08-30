import{s as l}from"./supabase-C4TjTvDq.js";import"./main-Bv_W86yG.js";const h=document.getElementById("interviewAuthors"),u=document.getElementById("interviewsGrid"),m=document.getElementById("authorHeader"),v=document.getElementById("backToAuthors"),g=document.getElementById("interviewsLoading"),f=document.getElementById("interviewsError"),L=document.getElementById("interviewsEmpty");E();async function E(){q();try{const t=new URLSearchParams(window.location.search).get("author");if(t){await B(t);return}await U()}catch(e){console.error("Failed to load interviews:",e),x()}}async function U(){const{data:e,error:t}=await l.from("interviews").select(`
            author_id
        `).eq("published",!0).not("author_id","is",null);if(t)throw t;if(!e||e.length===0){w();return}const i=[...new Set(e.map(c=>c.author_id).filter(Boolean))];if(!i.length){w();return}const{data:a,error:r}=await l.from("authors").select(`
            id,
            name,
            photo_url,
            is_active
        `).in("id",i).eq("is_active",!0).order("name");if(r)throw r;if(!a||a.length===0){w();return}const n=new Map;e.forEach(c=>{const o=c.author_id;n.set(o,(n.get(o)||0)+1)});const p=a.map(c=>({...c,interviewCount:n.get(c.id)||0}));A(p)}function A(e){h.innerHTML=e.map(T).join(""),h.classList.remove("hidden"),u.classList.add("hidden"),m.classList.add("hidden"),v.classList.add("hidden"),_()}function T(e){const t=e.name||"Unknown Author",i=e.interviewCount||0,a=i===1?"1 Interview":`${i} Interviews`,r=e.photo_url,n=I(t);return`

        <a
            href="interviews.html?author=${encodeURIComponent(e.id)}"
            class="interview-author-card"
            aria-label="View interviews with ${s(t)}"
        >

            ${r?`

                        <img
                            src="${s(r)}"
                            alt="${s(t)}"
                            class="interview-author-photo"
                            loading="lazy"
                            onerror="this.style.display='none'; this.nextElementSibling.classList.remove('hidden');"
                        >

                        <span
                            class="interview-author-placeholder hidden"
                            aria-hidden="true"
                        >
                            ${d(n)}
                        </span>

                    `:`

                        <span
                            class="interview-author-placeholder"
                            aria-hidden="true"
                        >
                            ${d(n)}
                        </span>

                    `}


            <div class="interview-author-info">

                <h3>
                    ${d(t)}
                </h3>

                <div class="interview-author-count">
                    ${a}
                </div>

            </div>


            <span
                class="interview-author-arrow"
                aria-hidden="true"
            >
                →
            </span>

        </a>

    `}async function B(e){const{data:t,error:i}=await l.from("authors").select(`
            id,
            name,
            photo_url,
            is_active
        `).eq("id",e).eq("is_active",!0).single();if(i)throw i;const{data:a,error:r}=await l.from("interviews").select(`
            id,
            title,
            description,
            category,
            interviewee,
            media_id,
            youtube_url,
            created_at,
            author_id
        `).eq("author_id",e).eq("published",!0).order("created_at",{ascending:!1});if(r)throw r;if(!a||a.length===0){w();return}const n=[...new Set(a.map(o=>o.media_id).filter(Boolean))];let p=new Map;if(n.length>0){const{data:o,error:b}=await l.from("media").select("id, storage_path").in("id",n);if(b)throw b;o&&o.forEach(y=>{if(!y.storage_path)return;const{data:$}=l.storage.from("media").getPublicUrl(y.storage_path);$?.publicUrl&&p.set(y.id,$.publicUrl)})}const c=a.map(o=>({...o,imageUrl:p.get(o.media_id)||M(o.youtube_url)}));S(t,c)}function S(e,t){const i=e.name||"Unknown Author",a=I(i);m.innerHTML=`

        ${e.photo_url?`

                    <img
                        src="${s(e.photo_url)}"
                        alt="${s(i)}"
                    >

                `:`

                    <span class="placeholder">
                        ${d(a)}
                    </span>

                `}


        <div>

            <h2>
                ${d(i)}
            </h2>

            <p>
                ${t.length===1?"1 Interview":`${t.length} Interviews`}
            </p>

        </div>

    `,u.innerHTML=t.map(C).join(""),m.classList.remove("hidden"),v.classList.remove("hidden"),u.classList.remove("hidden"),h.classList.add("hidden"),_()}function C(e){const t=e.title||"Untitled Interview",i=e.category||"Interview",a=e.description||"Discover the story behind Telugu Christian hymn heritage.",r=e.youtube_url,n=e.imageUrl||"https://placehold.co/1280x720?text=Interview";return`

        <article class="interview-card">


            <div class="interview-video">

                ${r?`

                            <a
                                href="${s(r)}"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Watch ${s(t)} on YouTube"
                            >

                                <img
                                    src="${s(n)}"
                                    alt="${s(t)}"
                                    loading="lazy"
                                    onerror="this.src='https://placehold.co/1280x720?text=Interview';"
                                >


                                <span
                                    class="interview-play"
                                    aria-hidden="true"
                                >
                                    ▶
                                </span>

                            </a>

                        `:`

                            <img
                                src="${s(n)}"
                                alt="${s(t)}"
                                loading="lazy"
                            >

                        `}

            </div>


            <div class="interview-content">

                <span class="interview-category">
                    ${d(i)}
                </span>


                <h3>
                    ${d(t)}
                </h3>


                <p class="interview-description">
                    ${d(a)}
                </p>


                ${r?`

                            <a
                                href="${s(r)}"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="interview-youtube"
                            >
                                Watch Interview on YouTube →
                            </a>

                        `:""}

            </div>

        </article>

    `}function M(e){if(!e)return null;try{const t=new URL(e);let i=null;if(t.hostname==="youtu.be")i=t.pathname.split("/").filter(Boolean)[0];else if(t.hostname.includes("youtube.com")){if(i=t.searchParams.get("v"),!i){const a=t.pathname.match(/\/embed\/([^/?]+)/);a&&(i=a[1])}if(!i){const a=t.pathname.match(/\/shorts\/([^/?]+)/);a&&(i=a[1])}}return i?`https://img.youtube.com/vi/${i}/maxresdefault.jpg`:null}catch(t){return console.warn("Unable to generate YouTube thumbnail:",t),null}}function q(){h?.classList.add("hidden"),u?.classList.add("hidden"),m?.classList.add("hidden"),v?.classList.add("hidden"),g?.classList.remove("hidden"),f?.classList.add("hidden"),L?.classList.add("hidden")}function x(){h?.classList.add("hidden"),u?.classList.add("hidden"),m?.classList.add("hidden"),v?.classList.add("hidden"),g?.classList.add("hidden"),f?.classList.remove("hidden"),L?.classList.add("hidden")}function w(){h?.classList.add("hidden"),u?.classList.add("hidden"),m?.classList.add("hidden"),g?.classList.add("hidden"),f?.classList.add("hidden"),L?.classList.remove("hidden")}function _(){g?.classList.add("hidden"),f?.classList.add("hidden"),L?.classList.add("hidden")}function I(e){return String(e||"A").trim().split(/\s+/).slice(0,1).map(t=>t.charAt(0)).join("").toUpperCase()}function d(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function s(e){return d(e)}
