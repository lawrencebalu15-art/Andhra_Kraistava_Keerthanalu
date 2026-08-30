import{s as m}from"./supabase-C4TjTvDq.js";import"./main-BdfaFlrx.js";const r=document.getElementById("greetingsGrid"),n=document.getElementById("greetingsLoading"),i=document.getElementById("greetingsError"),s=document.getElementById("greetingsEmpty");function a(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function f(e){if(!e)return"";try{const t=new URL(e);if(t.hostname.includes("youtube.com")&&t.pathname.startsWith("/shorts/"))return t.pathname.split("/shorts/")[1].split("/")[0];if(t.hostname.includes("youtube.com")&&t.searchParams.get("v"))return t.searchParams.get("v");if(t.hostname==="youtu.be")return t.pathname.replace("/","").split("/")[0]}catch{console.warn("Invalid YouTube URL:",e)}return""}function h(e){const t=f(e);return t?`https://www.youtube.com/embed/${encodeURIComponent(t)}?rel=0`:""}async function p(){v();try{const{data:e,error:t}=await m.from("greetings").select(`
                id,
                title,
                description,
                category,
                youtube_url,
                thumbnail_url,
                sender_name,
                published,
                is_active,
                created_at
            `).eq("is_active",!0).eq("published",!0).order("created_at",{ascending:!1});if(t)throw t;if(!e||e.length===0){L();return}y(e)}catch(e){console.error("Greetings loading error:",e),w(e?.message||"Unable to load greetings.")}}function y(e){r&&(r.innerHTML=e.map(b).join(""),$())}function b(e){const t=a(e.title||"Greeting"),c=a(e.description||""),g=a(e.category||"Greeting"),l=a(e.sender_name||""),d=e.youtube_url||"",u=h(d);let o="";return u?o=`
            <div class="greeting-video">

                <iframe
                    src="${a(u)}"
                    title="${t}"
                    loading="lazy"
                    allow="
                        accelerometer;
                        autoplay;
                        clipboard-write;
                        encrypted-media;
                        gyroscope;
                        picture-in-picture;
                        web-share
                    "
                    allowfullscreen>
                </iframe>

            </div>
        `:e.thumbnail_url?o=`
            <div class="greeting-video">

                <img
                    src="${a(e.thumbnail_url)}"
                    alt="${t}"
                    loading="lazy"
                    style="
                        width:100%;
                        height:100%;
                        object-fit:cover;
                    "
                >

            </div>
        `:o=`
            <div
                class="greeting-video"
                style="
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    color:#777;
                "
            >
                Video unavailable
            </div>
        `,`
        <article
            class="greeting-card"
        >

            ${o}


            <div class="greeting-content">

                <span class="greeting-category">
                    ${g}
                </span>


                <h3>
                    ${t}
                </h3>


                ${c?`
                            <p>
                                ${c}
                            </p>
                        `:""}


                ${l?`
                            <div
                                class="greeting-sender"
                            >
                                From:
                                ${l}
                            </div>
                        `:""}


                ${d?`
                            <a
                                href="${a(d)}"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="greeting-watch"
                            >
                                Watch on YouTube
                                →
                            </a>
                        `:""}

            </div>

        </article>
    `}function v(){n&&n.classList.remove("hidden"),i&&i.classList.add("hidden"),s&&s.classList.add("hidden"),r&&(r.innerHTML="")}function L(){n&&n.classList.add("hidden"),i&&i.classList.add("hidden"),s&&s.classList.remove("hidden"),r&&(r.innerHTML="")}function w(e){n&&n.classList.add("hidden"),s&&s.classList.add("hidden"),i&&(i.classList.remove("hidden"),i.textContent=e),r&&(r.innerHTML="")}function $(){n&&n.classList.add("hidden"),i&&i.classList.add("hidden"),s&&s.classList.add("hidden")}p();
