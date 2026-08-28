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

    if (!hymnId || Number.isNaN(hymnId)) {

        console.error("Invalid hymn ID:", hymnId);

        showHymnNotFound();

        return;
    }

    const { data: hymn, error } = await supabase
        .from("hymns")
        .select(`
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
        `)
        .eq("number", hymnId)
        .single();

    if (error || !hymn) {

        console.error("Failed to load hymn:", error);

        showHymnNotFound();

        return;
    }

    console.log("Hymn loaded successfully:", hymn);

    renderHymn(hymn);
}

/* ==========================================
   HYMN NOT FOUND
========================================== */

function showHymnNotFound() {

    const main = document.querySelector("main");

    if (!main) return;

    main.innerHTML = `
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
    `;
}

/* ==========================================
   RENDER HYMN
========================================== */

function renderHymn(hymn) {

    /* ==========================================
       BASIC HYMN INFORMATION
    ========================================== */

    const hymnNumberElement =
        document.getElementById("hymnNumber");

    if (hymnNumberElement) {

        hymnNumberElement.textContent =
            `Hymn No. ${hymn.number}`;
    }


    const hymnTitleElement =
        document.getElementById("hymnTitle");

    if (hymnTitleElement) {

        hymnTitleElement.textContent =
            hymn.title_telugu || "Untitled";
    }


    const hymnEnglishTitleElement =
        document.getElementById("hymnEnglishTitle");

    if (hymnEnglishTitleElement) {

        hymnEnglishTitleElement.textContent =
            hymn.title_english || "";
    }


    /* ==========================================
       SEO METADATA
    ========================================== */

    const titleTelugu =
        hymn.title_telugu || "Untitled Hymn";

    const titleEnglish =
        hymn.title_english || "";

    const seoAuthorName =
        hymn.authors?.name || "Unknown Author";


    document.title =
        `Hymn ${hymn.number} - ${titleTelugu} | Andhra Kraistava Keerthanalu`;


    const description =
        `Hymn No. ${hymn.number}: ${titleTelugu}` +
        `${titleEnglish ? ` (${titleEnglish})` : ""}` +
        ` by ${seoAuthorName}. Explore this Telugu Christian hymn from Andhra Kraistava Keerthanalu.`;


    const descriptionTag =
        document.querySelector(
            'meta[name="description"]'
        );


    if (descriptionTag) {

        descriptionTag.setAttribute(
            "content",
            description
        );
    }


    const canonicalTag =
        document.querySelector(
            'link[rel="canonical"]'
        );


    if (canonicalTag) {

        canonicalTag.setAttribute(
            "href",
            `https://andhrakraistavakeerthanalukavulu.com/hymn.html?id=${encodeURIComponent(hymn.number)}`
        );
    }


    /* ==========================================
       AUTHOR
    ========================================== */

    const authorName =
        hymn.authors?.name || "Unknown Author";


    /* ------------------------------------------
       Author Name
    ------------------------------------------ */

    const authorNameElement =
        document.getElementById("authorName");


    if (authorNameElement) {

        authorNameElement.textContent =
            authorName;
    }


    /* ------------------------------------------
       Meta Author
    ------------------------------------------ */

    const metaAuthor =
        document.getElementById("metaAuthor");


    if (metaAuthor) {

        metaAuthor.textContent =
            authorName;
    }


    /* ------------------------------------------
       Author English Name
    ------------------------------------------ */

    const authorEnglishName =
        document.getElementById(
            "authorEnglishName"
        );


    if (authorEnglishName) {

        authorEnglishName.textContent =
            "";
    }


    /* ------------------------------------------
       Author Image
    ------------------------------------------ */

    const authorImage =
        document.getElementById(
            "authorImage"
        );


    if (authorImage) {

        if (hymn.authors?.photo_url) {

            authorImage.src =
                hymn.authors.photo_url;

        } else {

            authorImage.src =
                "assets/authors/default-author.jpg";
        }

        authorImage.alt =
            authorName;
    }


    /* ------------------------------------------
       Author Profile Link
    ------------------------------------------ */

    const authorCard =
        document.getElementById(
            "authorCard"
        );


    if (authorCard) {

        if (hymn.authors?.id) {

            authorCard.href =
                `author.html?id=${encodeURIComponent(hymn.authors.id)}`;

        } else {

            authorCard.href =
                "#";
        }
    }


    /* ==========================================
       METADATA
    ========================================== */

    const metaNumber =
        document.getElementById(
            "metaNumber"
        );


    if (metaNumber) {

        metaNumber.textContent =
            hymn.number;
    }


    const recordingCount =
        document.getElementById(
            "recordingCount"
        );


    if (recordingCount) {

        recordingCount.textContent =
            Array.isArray(hymn.youtube_links)
                ? hymn.youtube_links.length
                : 0;
    }


    /* ==========================================
       YOUTUBE RECORDINGS
    ========================================== */

    const youtubeContainer =
        document.getElementById(
            "youtubeLinks"
        );


    if (!youtubeContainer) {

        return;
    }


    const youtubeLinks =
        Array.isArray(hymn.youtube_links)
            ? hymn.youtube_links.filter(Boolean)
            : [];


    if (youtubeLinks.length > 0) {

        youtubeContainer.innerHTML =
            youtubeLinks
                .map(
                    (link, index) => `

                        <div class="youtube-card">

                            <div>

                                <strong>
                                    Recording ${index + 1}
                                </strong>

                            </div>

                            <a
                                href="${escapeAttribute(link)}"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                ▶ Watch on YouTube
                            </a>

                        </div>

                    `
                )
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
   ESCAPE ATTRIBUTE
========================================== */

function escapeAttribute(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

/* ==========================================
   START
========================================== */

loadHymn();