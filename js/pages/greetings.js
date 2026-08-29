import { supabase } from "../supabase.js";


/* =========================================================
   DOM ELEMENTS
========================================================= */

const greetingsGrid =
    document.getElementById("greetingsGrid");

const greetingsLoading =
    document.getElementById("greetingsLoading");

const greetingsError =
    document.getElementById("greetingsError");

const greetingsEmpty =
    document.getElementById("greetingsEmpty");


/* =========================================================
   HTML ESCAPE
========================================================= */

function escapeHtml(value) {

    return String(value ?? "")

        .replace(/&/g, "&amp;")

        .replace(/</g, "&lt;")

        .replace(/>/g, "&gt;")

        .replace(/"/g, "&quot;")

        .replace(/'/g, "&#039;");
}


/* =========================================================
   YOUTUBE VIDEO ID
========================================================= */

function getYouTubeId(url) {

    if (!url) {
        return "";
    }

    try {

        const parsed =
            new URL(url);

        /* YouTube Shorts
           /shorts/VIDEO_ID
        */

        if (
            parsed.hostname.includes("youtube.com") &&
            parsed.pathname.startsWith("/shorts/")
        ) {

            return parsed.pathname
                .split("/shorts/")[1]
                .split("/")[0];

        }


        /* Normal YouTube
           ?v=VIDEO_ID
        */

        if (
            parsed.hostname.includes("youtube.com") &&
            parsed.searchParams.get("v")
        ) {

            return parsed.searchParams.get("v");

        }


        /* youtu.be/VIDEO_ID */

        if (
            parsed.hostname === "youtu.be"
        ) {

            return parsed.pathname
                .replace("/", "")
                .split("/")[0];

        }

    } catch (error) {

        console.warn(
            "Invalid YouTube URL:",
            url
        );

    }

    return "";
}


/* =========================================================
   YOUTUBE EMBED URL
========================================================= */

function getYouTubeEmbedUrl(url) {

    const videoId =
        getYouTubeId(url);

    if (!videoId) {
        return "";
    }

    return (
        `https://www.youtube.com/embed/${encodeURIComponent(videoId)}` +
        `?rel=0`
    );
}


/* =========================================================
   LOAD GREETINGS
========================================================= */

async function loadGreetings() {

    showLoading();

    try {

        const {
            data,
            error
        } = await supabase

            .from("greetings")

            .select(`
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
            `)

            .eq(
                "is_active",
                true
            )

            .eq(
                "published",
                true
            )

            .order(
                "created_at",
                {
                    ascending: false
                }
            );


        if (error) {
            throw error;
        }


        if (
            !data ||
            data.length === 0
        ) {

            showEmpty();

            return;

        }


        renderGreetings(data);

    } catch (error) {

        console.error(
            "Greetings loading error:",
            error
        );

        showError(
            error?.message ||
            "Unable to load greetings."
        );

    }

}


/* =========================================================
   RENDER GREETINGS
========================================================= */

function renderGreetings(
    greetings
) {

    if (!greetingsGrid) {
        return;
    }


    greetingsGrid.innerHTML =
        greetings
            .map(
                createGreetingCard
            )
            .join("");


    hideStates();

}


/* =========================================================
   CREATE GREETING CARD
========================================================= */

function createGreetingCard(
    greeting
) {

    const title =
        escapeHtml(
            greeting.title ||
            "Greeting"
        );


    const description =
        escapeHtml(
            greeting.description ||
            ""
        );


    const category =
        escapeHtml(
            greeting.category ||
            "Greeting"
        );


    const sender =
        escapeHtml(
            greeting.sender_name ||
            ""
        );


    const youtubeUrl =
        greeting.youtube_url ||
        "";


    const embedUrl =
        getYouTubeEmbedUrl(
            youtubeUrl
        );


    /*
     * We use the YouTube video itself.
     *
     * This means we don't need to create
     * a fake placeholder image when there
     * is no thumbnail.
     */

    let mediaHtml = "";


    if (embedUrl) {

        mediaHtml = `
            <div class="greeting-video">

                <iframe
                    src="${escapeHtml(embedUrl)}"
                    title="${title}"
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
        `;

    } else if (
        greeting.thumbnail_url
    ) {

        mediaHtml = `
            <div class="greeting-video">

                <img
                    src="${escapeHtml(
                        greeting.thumbnail_url
                    )}"
                    alt="${title}"
                    loading="lazy"
                    style="
                        width:100%;
                        height:100%;
                        object-fit:cover;
                    "
                >

            </div>
        `;

    } else {

        /*
         * No image and no valid YouTube URL.
         *
         * We intentionally don't show
         * an "Rd", initials, or fake avatar.
         */

        mediaHtml = `
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
        `;

    }


    return `
        <article
            class="greeting-card"
        >

            ${mediaHtml}


            <div class="greeting-content">

                <span class="greeting-category">
                    ${category}
                </span>


                <h3>
                    ${title}
                </h3>


                ${
                    description
                        ? `
                            <p>
                                ${description}
                            </p>
                        `
                        : ""
                }


                ${
                    sender
                        ? `
                            <div
                                class="greeting-sender"
                            >
                                From:
                                ${sender}
                            </div>
                        `
                        : ""
                }


                ${
                    youtubeUrl
                        ? `
                            <a
                                href="${escapeHtml(
                                    youtubeUrl
                                )}"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="greeting-watch"
                            >
                                Watch on YouTube
                                →
                            </a>
                        `
                        : ""
                }

            </div>

        </article>
    `;

}


/* =========================================================
   LOADING
========================================================= */

function showLoading() {

    if (greetingsLoading) {

        greetingsLoading.classList.remove(
            "hidden"
        );

    }


    if (greetingsError) {

        greetingsError.classList.add(
            "hidden"
        );

    }


    if (greetingsEmpty) {

        greetingsEmpty.classList.add(
            "hidden"
        );

    }


    if (greetingsGrid) {

        greetingsGrid.innerHTML = "";

    }

}


/* =========================================================
   EMPTY
========================================================= */

function showEmpty() {

    if (greetingsLoading) {

        greetingsLoading.classList.add(
            "hidden"
        );

    }


    if (greetingsError) {

        greetingsError.classList.add(
            "hidden"
        );

    }


    if (greetingsEmpty) {

        greetingsEmpty.classList.remove(
            "hidden"
        );

    }


    if (greetingsGrid) {

        greetingsGrid.innerHTML = "";

    }

}


/* =========================================================
   ERROR
========================================================= */

function showError(
    message
) {

    if (greetingsLoading) {

        greetingsLoading.classList.add(
            "hidden"
        );

    }


    if (greetingsEmpty) {

        greetingsEmpty.classList.add(
            "hidden"
        );

    }


    if (greetingsError) {

        greetingsError.classList.remove(
            "hidden"
        );

        greetingsError.textContent =
            message;

    }


    if (greetingsGrid) {

        greetingsGrid.innerHTML = "";

    }

}


/* =========================================================
   HIDE STATES
========================================================= */

function hideStates() {

    if (greetingsLoading) {

        greetingsLoading.classList.add(
            "hidden"
        );

    }


    if (greetingsError) {

        greetingsError.classList.add(
            "hidden"
        );

    }


    if (greetingsEmpty) {

        greetingsEmpty.classList.add(
            "hidden"
        );

    }

}


/* =========================================================
   INITIALIZE
========================================================= */

loadGreetings();