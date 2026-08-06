import { supabase } from "../supabase.js";

/* ==========================================
   GET HYMN ID
========================================== */

const params = new URLSearchParams(window.location.search);
const hymnId = Number(params.get("id"));

/* ==========================================
   LOAD HYMN
========================================== */

async function loadHymn() {

    const { data: hymn, error } = await supabase
        .from("hymns")
        .select(`
            *,
            authors(name),
            books(name),
            categories(name)
        `)
        .eq("number", hymnId)
        .single();


    if (error || !hymn) {

        console.error(error);

        document.querySelector("main").innerHTML = `
            <section class="container" style="padding:80px 0;text-align:center;">

                <h2>Hymn not found</h2>

                <p>
                    The requested hymn does not exist.
                </p>

                <a href="hymns.html" class="back-link">

                    ← Back to Hymns

                </a>

            </section>
        `;

        return;

    }

    renderHymn(hymn);

}

/* ==========================================
   RENDER HYMN
========================================== */

function renderHymn(hymn) {
    /* Hero */

    document.getElementById("hymnNumber").textContent =
        `Hymn No. ${hymn.number}`;

    document.getElementById("hymnTitle").textContent =
        hymn.title_telugu || "Untitled";

    document.getElementById("hymnEnglishTitle").textContent =
        hymn.title_english || "";

    /* Author */

    //document.getElementById("authorName").textContent =
        //hymn.authors?.name || "Unknown Author";

    const metaAuthor = document.getElementById("metaAuthor");

if (metaAuthor) {
    metaAuthor.textContent =
        hymn.authors?.name || "Unknown Author";
}

const authorEnglishName = document.getElementById("authorEnglishName");
if (authorEnglishName) {
    authorEnglishName.textContent = "";
}

const authorImage = document.getElementById("authorImage");
if (authorImage) {
    authorImage.src = "assets/authors/default-author.jpg";
}

const authorCard = document.getElementById("authorCard");
if (authorCard) {
    authorCard.href = "#";
}

const metaNumber = document.getElementById("metaNumber");
if (metaNumber) {
    metaNumber.textContent = hymn.number;
}

const recordingCount = document.getElementById("recordingCount");
if (recordingCount) {
    recordingCount.textContent = hymn.youtube_links?.length || 0;
}

    /* YouTube */

    const youtubeContainer =
        document.getElementById("youtubeLinks");

    if (
        hymn.youtube_links &&
        hymn.youtube_links.length > 0
    ) {

        youtubeContainer.innerHTML =
            hymn.youtube_links
                .map((link, index) => `

                    <div class="youtube-card">

                        <div>

                            <strong>

                                Recording ${index + 1}

                            </strong>

                        </div>

                        <a
                            href="${link}"
                            target="_blank"
                            rel="noopener noreferrer">

                            ▶ Watch on YouTube

                        </a>

                    </div>

                `)
                .join("");

    } else {

        youtubeContainer.innerHTML = `

            <div class="metadata-card">

                No recordings available yet.

            </div>

        `;

    }

}

/* ==========================================
   START
========================================== */

loadHymn();