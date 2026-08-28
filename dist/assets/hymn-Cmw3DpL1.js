import{s as b}from"./supabase-C4TjTvDq.js";import"./main-DZT5cO3Q.js";const f=new URLSearchParams(window.location.search),p=Number(f.get("id"));async function k(){const{data:e,error:t}=await b.from("hymns").select(`
            *,
            authors(name),
            books(name),
            categories(name)
        `).eq("number",p).single();if(t||!e){console.error(t),document.querySelector("main").innerHTML=`
            <section class="container" style="padding:80px 0;text-align:center;">

                <h2>Hymn not found</h2>

                <p>
                    The requested hymn does not exist.
                </p>

                <a href="hymns.html" class="back-link">

                    ← Back to Hymns

                </a>

            </section>
        `;return}E(e)}function E(e){document.getElementById("hymnNumber").textContent=`Hymn No. ${e.number}`,document.getElementById("hymnTitle").textContent=e.title_telugu||"Untitled",document.getElementById("hymnEnglishTitle").textContent=e.title_english||"";const t=e.title_telugu||"Untitled Hymn",n=e.title_english||"",d=e.authors?.name||"Unknown Author";document.title=`Hymn ${e.number} - ${t} | Andhra Kraistava Keerthanalu`;const h=`Hymn No. ${e.number}: ${t}${n?` (${n})`:""} by ${d}. Explore this Telugu Christian hymn from Andhra Kraistava Keerthanalu.`;let o=document.querySelector('meta[name="description"]');o&&o.setAttribute("content",h);let a=document.querySelector('link[rel="canonical"]');a&&a.setAttribute("href",`https://andhrakraistavakeerthanalukavulu.com/hymn.html?id=${encodeURIComponent(e.number)}`);const r=document.getElementById("metaAuthor");r&&(r.textContent=e.authors?.name||"Unknown Author");const i=document.getElementById("authorEnglishName");i&&(i.textContent="");const u=document.getElementById("authorImage");u&&(u.src="assets/authors/default-author.jpg");const s=document.getElementById("authorCard");s&&(s.href="#");const l=document.getElementById("metaNumber");l&&(l.textContent=e.number);const c=document.getElementById("recordingCount");c&&(c.textContent=e.youtube_links?.length||0);const m=document.getElementById("youtubeLinks");e.youtube_links&&e.youtube_links.length>0?m.innerHTML=e.youtube_links.map((g,y)=>`

                    <div class="youtube-card">

                        <div>

                            <strong>

                                Recording ${y+1}

                            </strong>

                        </div>

                        <a
                            href="${g}"
                            target="_blank"
                            rel="noopener noreferrer">

                            ▶ Watch on YouTube

                        </a>

                    </div>

                `).join(""):m.innerHTML=`

            <div class="metadata-card">

                No recordings available yet.

            </div>

        `}k();
