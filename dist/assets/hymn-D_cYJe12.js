import{s as c}from"./main-wrhIyWzb.js";const d=new URLSearchParams(window.location.search),l=Number(d.get("id"));async function g(){const{data:e,error:t}=await c.from("hymns").select(`
            *,
            authors(name),
            books(name),
            categories(name)
        `).eq("number",l).single();if(t||!e){console.error(t),document.querySelector("main").innerHTML=`
            <section class="container" style="padding:80px 0;text-align:center;">

                <h2>Hymn not found</h2>

                <p>
                    The requested hymn does not exist.
                </p>

                <a href="hymns.html" class="back-link">

                    ← Back to Hymns

                </a>

            </section>
        `;return}h(e)}function h(e){document.getElementById("hymnNumber").textContent=`Hymn No. ${e.number}`,document.getElementById("hymnTitle").textContent=e.title_telugu||"Untitled",document.getElementById("hymnEnglishTitle").textContent=e.title_english||"";const t=document.getElementById("metaAuthor");t&&(t.textContent=e.authors?.name||"Unknown Author");const n=document.getElementById("authorEnglishName");n&&(n.textContent="");const o=document.getElementById("authorImage");o&&(o.src="assets/authors/default-author.jpg");const r=document.getElementById("authorCard");r&&(r.href="#");const a=document.getElementById("metaNumber");a&&(a.textContent=e.number);const s=document.getElementById("recordingCount");s&&(s.textContent=e.youtube_links?.length||0);const u=document.getElementById("youtubeLinks");e.youtube_links&&e.youtube_links.length>0?u.innerHTML=e.youtube_links.map((i,m)=>`

                    <div class="youtube-card">

                        <div>

                            <strong>

                                Recording ${m+1}

                            </strong>

                        </div>

                        <a
                            href="${i}"
                            target="_blank"
                            rel="noopener noreferrer">

                            ▶ Watch on YouTube

                        </a>

                    </div>

                `).join(""):u.innerHTML=`

            <div class="metadata-card">

                No recordings available yet.

            </div>

        `}g();
