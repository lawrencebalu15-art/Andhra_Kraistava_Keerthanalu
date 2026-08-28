import{s as m}from"./supabase-C4TjTvDq.js";import"./main-DZT5cO3Q.js";const l=document.getElementById("interviewsGrid"),c=document.getElementById("interviewsLoading"),u=document.getElementById("interviewsError"),h=document.getElementById("interviewsEmpty");g();async function g(){if(!l){console.error("Interviews grid element not found.");return}y();try{const e=await f();if(!e.length){I();return}v(e)}catch(e){console.error("Failed to load interviews:",e),L()}}async function f(){const{data:e,error:t}=await m.from("interviews").select(`
            id,
            title,
            description,
            category,
            interviewee,
            media_id,
            youtube_url,
            featured,
            published,
            created_at
        `).eq("published",!0).order("created_at",{ascending:!1});if(t)throw t;if(!e||e.length===0)return[];const r=[...new Set(e.map(n=>n.media_id).filter(Boolean))];let i=new Map;if(r.length>0){const{data:n,error:a}=await m.from("media").select("id, storage_path").in("id",r);if(a)throw a;n&&n.forEach(o=>{if(!o.storage_path)return;const{data:p}=m.storage.from("media").getPublicUrl(o.storage_path);p?.publicUrl&&i.set(o.id,p.publicUrl)})}return e.map(n=>({...n,imageUrl:i.get(n.media_id)||b(n.youtube_url)}))}function v(e){l.innerHTML=e.map(w).join(""),$()}function w(e){const t=e.title||"Untitled Interview",r=e.category||"Interview",i=e.interviewee||"",n=e.description||"Watch this interview and discover the story behind Telugu Christian hymn heritage.",a=e.youtube_url||"#",o=e.imageUrl||"https://placehold.co/1280x720?text=Interview";return`
        <article class="interview-card">

            <div class="video-embed-container">

                ${a!=="#"?`
                            <a
                                href="${s(a)}"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Watch ${s(t)} on YouTube"
                            >
                                <img
                                    src="${s(o)}"
                                    alt="${s(t)}"
                                    loading="lazy"
                                    onerror="this.src='https://placehold.co/1280x720?text=Interview';"
                                >

                                <span
                                    class="interview-play-button"
                                    aria-hidden="true"
                                >
                                    <svg
                                        viewBox="0 0 24 24"
                                        width="28"
                                        height="28"
                                        fill="currentColor"
                                    >
                                        <path d="M8 5v14l11-7z"></path>
                                    </svg>
                                </span>
                            </a>
                        `:`
                            <img
                                src="${s(o)}"
                                alt="${s(t)}"
                                loading="lazy"
                                onerror="this.src='https://placehold.co/1280x720?text=Interview';"
                            >
                        `}

            </div>


            <div class="interview-content">

                <span class="interview-category">
                    ${d(r)}
                </span>


                <h3>
                    ${d(t)}
                </h3>


                ${i?`
                            <p class="interview-interviewee">
                                ${d(i)}
                            </p>
                        `:""}


                <p>
                    ${d(n)}
                </p>


                ${a!=="#"?`
                            <a
                                href="${s(a)}"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="author-link"
                            >
                                Watch Interview on YouTube →
                            </a>
                        `:""}

            </div>

        </article>
    `}function b(e){if(!e)return null;try{const t=new URL(e);let r=null;if(t.hostname==="youtu.be")r=t.pathname.split("/").filter(Boolean)[0];else if(t.hostname.includes("youtube.com")){if(r=t.searchParams.get("v"),!r){const i=t.pathname.match(/\/embed\/([^/?]+)/);i&&(r=i[1])}if(!r){const i=t.pathname.match(/\/shorts\/([^/?]+)/);i&&(r=i[1])}}return r?`https://img.youtube.com/vi/${r}/maxresdefault.jpg`:null}catch(t){return console.warn("Unable to generate YouTube thumbnail:",t),null}}function y(){l.innerHTML="",c?.classList.remove("hidden"),u?.classList.add("hidden"),h?.classList.add("hidden")}function L(){l.innerHTML="",c?.classList.add("hidden"),u?.classList.remove("hidden"),h?.classList.add("hidden")}function I(){l.innerHTML="",c?.classList.add("hidden"),u?.classList.add("hidden"),h?.classList.remove("hidden")}function $(){c?.classList.add("hidden"),u?.classList.add("hidden"),h?.classList.add("hidden")}function d(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function s(e){return d(e)}
