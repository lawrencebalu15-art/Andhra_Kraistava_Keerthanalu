import { supabase } from "../supabase.js";

/* ==========================================================
   DOM ELEMENTS
========================================================== */

const interviewsGrid = document.getElementById("interviewsGrid");
const loadingState = document.getElementById("interviewsLoading");
const errorState = document.getElementById("interviewsError");
const emptyState = document.getElementById("interviewsEmpty");


/* ==========================================================
   INITIALIZE
========================================================== */

init();


async function init() {

    if (!interviewsGrid) {
        console.error("Interviews grid element not found.");
        return;
    }

    showLoading();

    try {

        const interviews = await loadInterviews();

        if (!interviews.length) {
            showEmpty();
            return;
        }

        renderInterviews(interviews);

    } catch (error) {

        console.error("Failed to load interviews:", error);

        showError();
    }
}


/* ==========================================================
   LOAD INTERVIEWS
========================================================== */

async function loadInterviews() {

    /*
     * Public users should only receive published interviews.
     *
     * The database RLS policy also enforces this, but keeping
     * the filter here makes the public-page intent explicit.
     */

    const {
        data: interviews,
        error: interviewsError
    } = await supabase
        .from("interviews")
        .select(`
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
        `)
        .eq("published", true)
        .order("created_at", {
            ascending: false
        });

    if (interviewsError) {
        throw interviewsError;
    }

    if (!interviews || interviews.length === 0) {
        return [];
    }


    /* ======================================================
       LOAD MEDIA
    ====================================================== */

    const mediaIds = [
        ...new Set(
            interviews
                .map(interview => interview.media_id)
                .filter(Boolean)
        )
    ];


    let mediaMap = new Map();


    if (mediaIds.length > 0) {

        const {
            data: media,
            error: mediaError
        } = await supabase
            .from("media")
            .select("id, storage_path")
            .in("id", mediaIds);

        if (mediaError) {
            throw mediaError;
        }


        /*
         * Convert media rows into:
         *
         * media.id -> public image URL
         */

        if (media) {

            media.forEach(item => {

                if (!item.storage_path) {
                    return;
                }

                const {
                    data: publicUrlData
                } = supabase
                    .storage
                    .from("media")
                    .getPublicUrl(item.storage_path);

                if (publicUrlData?.publicUrl) {

                    mediaMap.set(
                        item.id,
                        publicUrlData.publicUrl
                    );
                }

            });
        }
    }


    /* ======================================================
       COMBINE INTERVIEW + MEDIA DATA
    ====================================================== */

    return interviews.map(interview => ({

        ...interview,

        imageUrl:
            mediaMap.get(interview.media_id) ||
            getYouTubeThumbnail(interview.youtube_url)

    }));

}


/* ==========================================================
   RENDER INTERVIEWS
========================================================== */

function renderInterviews(interviews) {

    interviewsGrid.innerHTML = interviews
        .map(createInterviewCard)
        .join("");

    hideAllStates();
}


/* ==========================================================
   CREATE INTERVIEW CARD
========================================================== */

function createInterviewCard(interview) {

    const title =
        interview.title ||
        "Untitled Interview";

    const category =
        interview.category ||
        "Interview";

    const interviewee =
        interview.interviewee ||
        "";

    const description =
        interview.description ||
        "Watch this interview and discover the story behind Telugu Christian hymn heritage.";

    const youtubeUrl =
        interview.youtube_url ||
        "#";

    const imageUrl =
        interview.imageUrl ||
        "https://placehold.co/1280x720?text=Interview";


    return `
        <article class="interview-card">

            <div class="video-embed-container">

                ${
                    youtubeUrl !== "#"
                        ? `
                            <a
                                href="${escapeAttribute(youtubeUrl)}"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Watch ${escapeAttribute(title)} on YouTube"
                            >
                                <img
                                    src="${escapeAttribute(imageUrl)}"
                                    alt="${escapeAttribute(title)}"
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
                        `
                        : `
                            <img
                                src="${escapeAttribute(imageUrl)}"
                                alt="${escapeAttribute(title)}"
                                loading="lazy"
                                onerror="this.src='https://placehold.co/1280x720?text=Interview';"
                            >
                        `
                }

            </div>


            <div class="interview-content">

                <span class="interview-category">
                    ${escapeHtml(category)}
                </span>


                <h3>
                    ${escapeHtml(title)}
                </h3>


                ${
                    interviewee
                        ? `
                            <p class="interview-interviewee">
                                ${escapeHtml(interviewee)}
                            </p>
                        `
                        : ""
                }


                <p>
                    ${escapeHtml(description)}
                </p>


                ${
                    youtubeUrl !== "#"
                        ? `
                            <a
                                href="${escapeAttribute(youtubeUrl)}"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="author-link"
                            >
                                Watch Interview on YouTube →
                            </a>
                        `
                        : ""
                }

            </div>

        </article>
    `;
}


/* ==========================================================
   YOUTUBE THUMBNAIL
========================================================== */

function getYouTubeThumbnail(url) {

    if (!url) {
        return null;
    }

    try {

        const parsedUrl = new URL(url);

        let videoId = null;


        /* ----------------------------------------------
           youtu.be/VIDEO_ID
        ---------------------------------------------- */

        if (parsedUrl.hostname === "youtu.be") {

            videoId =
                parsedUrl.pathname
                    .split("/")
                    .filter(Boolean)[0];

        }


        /* ----------------------------------------------
           youtube.com/watch?v=VIDEO_ID
        ---------------------------------------------- */

        else if (
            parsedUrl.hostname.includes("youtube.com")
        ) {

            videoId =
                parsedUrl.searchParams.get("v");


            /* ------------------------------------------
               /embed/VIDEO_ID
            ------------------------------------------ */

            if (!videoId) {

                const embedMatch =
                    parsedUrl.pathname.match(
                        /\/embed\/([^/?]+)/
                    );

                if (embedMatch) {
                    videoId = embedMatch[1];
                }
            }


            /* ------------------------------------------
               /shorts/VIDEO_ID
            ------------------------------------------ */

            if (!videoId) {

                const shortsMatch =
                    parsedUrl.pathname.match(
                        /\/shorts\/([^/?]+)/
                    );

                if (shortsMatch) {
                    videoId = shortsMatch[1];
                }
            }

        }


        if (!videoId) {
            return null;
        }


        /*
         * maxresdefault provides the highest-quality
         * standard YouTube thumbnail when available.
         */

        return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

    } catch (error) {

        console.warn(
            "Unable to generate YouTube thumbnail:",
            error
        );

        return null;
    }
}


/* ==========================================================
   UI STATES
========================================================== */

function showLoading() {

    interviewsGrid.innerHTML = "";

    loadingState?.classList.remove("hidden");
    errorState?.classList.add("hidden");
    emptyState?.classList.add("hidden");
}


function showError() {

    interviewsGrid.innerHTML = "";

    loadingState?.classList.add("hidden");
    errorState?.classList.remove("hidden");
    emptyState?.classList.add("hidden");
}


function showEmpty() {

    interviewsGrid.innerHTML = "";

    loadingState?.classList.add("hidden");
    errorState?.classList.add("hidden");
    emptyState?.classList.remove("hidden");
}


function hideAllStates() {

    loadingState?.classList.add("hidden");
    errorState?.classList.add("hidden");
    emptyState?.classList.add("hidden");
}


/* ==========================================================
   SECURITY / HTML HELPERS
========================================================== */

/*
 * Interview data comes from Supabase and may contain user-
 * entered text. Escape HTML before injecting it into the DOM.
 */

function escapeHtml(value) {

    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


function escapeAttribute(value) {

    return escapeHtml(value);
}