import{t as e}from"./main-5cy74Aj2.js";var t=new URLSearchParams(window.location.search),n=Number(t.get(`id`)),r=e.find(e=>e.number===n);if(!r)throw document.querySelector(`main`).innerHTML=`
        <section class="container" style="padding:80px 0;text-align:center;">
            <h2>Hymn not found</h2>
            <p>The requested hymn does not exist.</p>
            <a href="hymns.html" class="back-link">
                ← Back to Hymns
            </a>
        </section>
    `,Error(`Hymn not found`);document.getElementById(`hymnNumber`).textContent=`Hymn No. ${r.number}`,document.getElementById(`hymnTitle`).textContent=r.titleTelugu||`Untitled`,document.getElementById(`hymnEnglishTitle`).textContent=r.titleEnglish||``,document.getElementById(`authorName`).textContent=r.author||`Unknown Author`,document.getElementById(`authorEnglishName`).textContent=``,document.getElementById(`authorImage`).src=`assets/authors/default-author.jpg`,document.getElementById(`authorCard`).href=`#`,document.getElementById(`metaNumber`).textContent=r.number,document.getElementById(`recordingCount`).textContent=r.youtubeLinks?.length||0;var i=document.getElementById(`youtubeLinks`);r.youtubeLinks&&r.youtubeLinks.length>0?i.innerHTML=r.youtubeLinks.map((e,t)=>`
                <div class="youtube-card">

                    <div>

                        <strong>
                            Recording ${t+1}
                        </strong>

                    </div>

                    <a
                        href="${e}"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        ▶ Watch on YouTube
                    </a>

                </div>
            `).join(``):i.innerHTML=`
        <div class="metadata-card">

            No recordings available yet.

        </div>
    `;