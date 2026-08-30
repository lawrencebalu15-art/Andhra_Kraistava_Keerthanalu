import{s as C}from"./supabase-C4TjTvDq.js";import"./main-yLevhNtv.js";const A=new URLSearchParams(window.location.search),o=Number(A.get("id"));async function _(){if(!o||Number.isNaN(o)){console.error("Invalid hymn ID:",o),E();return}const{data:e,error:t}=await C.from("hymns").select(`
            *,
            authors(
                id,
                name,
                photo_url,
                bio,
                birth_year,
                death_year,
                country
            ),
            books(name),
            categories(name)
        `).eq("number",o).single();if(t||!e){console.error("Failed to load hymn:",t),E();return}console.log("Hymn loaded successfully:",e),B(e)}function E(){const e=document.querySelector("main");e&&(e.innerHTML=`
        <section
            class="container"
            style="
                padding:80px 20px;
                text-align:center;
                min-height:500px;
                display:flex;
                flex-direction:column;
                justify-content:center;
                align-items:center;
            "
        >

            <h2>
                Hymn Not Found
            </h2>

            <p>
                The requested hymn does not exist.
            </p>

            <a
                href="hymns.html"
                class="back-link"
            >
                ← Back to Hymns
            </a>

        </section>
    `)}function B(e){const t=document.getElementById("hymnNumber");t&&(t.textContent=`Hymn No. ${e.number}`);const u=document.getElementById("hymnTitle");u&&(u.textContent=e.title_telugu||"Untitled");const s=document.getElementById("hymnEnglishTitle");s&&(s.textContent=e.title_english||"");const l=e.title_telugu||"Untitled Hymn",c=e.title_english||"",N=e.authors?.name||"Unknown Author";document.title=`Hymn ${e.number} - ${l} | Andhra Kraistava Keerthanalu`;const I=`Hymn No. ${e.number}: ${l}${c?` (${c})`:""} by ${N}. Explore this Telugu Christian hymn from Andhra Kraistava Keerthanalu.`,m=document.querySelector('meta[name="description"]');m&&m.setAttribute("content",I);const d=document.querySelector('link[rel="canonical"]');d&&d.setAttribute("href",`https://andhrakraistavakeerthanalukavulu.com/hymn.html?id=${encodeURIComponent(e.number)}`);const r=e.authors?.name||"Unknown Author",h=document.getElementById("authorName");h&&(h.textContent=r);const g=document.getElementById("metaAuthor");g&&(g.textContent=r);const y=document.getElementById("authorEnglishName");y&&(y.textContent="");const n=document.getElementById("authorImage");n&&(e.authors?.photo_url?n.src=e.authors.photo_url:n.src="assets/authors/default-author.jpg",n.alt=r);const a=document.getElementById("authorCard");a&&(e.authors?.id?a.href=`author.html?id=${encodeURIComponent(e.authors.id)}`:a.href="#");const f=document.getElementById("metaNumber");f&&(f.textContent=e.number);const b=document.getElementById("recordingCount");b&&(b.textContent=Array.isArray(e.youtube_links)?e.youtube_links.length:0);const i=document.getElementById("youtubeLinks");if(!i)return;const p=Array.isArray(e.youtube_links)?e.youtube_links.filter(Boolean):[];p.length>0?i.innerHTML=p.map((k,x)=>`

                        <div class="youtube-card">

                            <div>

                                <strong>
                                    Recording ${x+1}
                                </strong>

                            </div>

                            <a
                                href="${H(k)}"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                ▶ Watch on YouTube
                            </a>

                        </div>

                    `).join(""):i.innerHTML=`

            <div class="metadata-card">

                No recordings available yet.

            </div>

        `}function H(e){return String(e).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}_();
