import { supabase } from "../supabase.js";


/* ==========================================================
   DOM ELEMENTS
========================================================== */

const authorsGrid =
    document.getElementById("interviewAuthors");

const interviewsGrid =
    document.getElementById("interviewsGrid");

const authorHeader =
    document.getElementById("authorHeader");

const backToAuthors =
    document.getElementById("backToAuthors");

const loadingState =
    document.getElementById("interviewsLoading");

const errorState =
    document.getElementById("interviewsError");

const emptyState =
    document.getElementById("interviewsEmpty");


/* ==========================================================
   INITIALIZE
========================================================== */

init();


async function init() {

    showLoading();


    try {

        const params =
            new URLSearchParams(window.location.search);

        const authorId =
            params.get("author");


        /*
         * If an author ID exists in the URL,
         * show that author's interviews.
         */

        if (authorId) {

            await loadAuthorInterviews(authorId);

            return;

        }


        /*
         * Otherwise show the author list.
         */

        await loadAuthorsWithInterviews();


    } catch (error) {

        console.error(
            "Failed to load interviews:",
            error
        );

        showError();

    }

}


/* ==========================================================
   LOAD AUTHORS WITH INTERVIEWS
========================================================== */

async function loadAuthorsWithInterviews() {


    const {
        data: interviews,
        error
    } = await supabase

        .from("interviews")

        .select(`
            author_id
        `)

        .eq("published", true)

        .not("author_id", "is", null);


    if (error) {
        throw error;
    }


    if (!interviews || interviews.length === 0) {

        showEmpty();

        return;

    }


    /*
     * Get unique author IDs.
     */

    const authorIds = [
        ...new Set(
            interviews
                .map(item => item.author_id)
                .filter(Boolean)
        )
    ];


    if (!authorIds.length) {

        showEmpty();

        return;

    }


    /*
     * Load the actual authors from
     * the existing authors table.
     */

    const {
        data: authors,
        error: authorsError
    } = await supabase

        .from("authors")

        .select(`
            id,
            name,
            photo_url,
            is_active
        `)

        .in("id", authorIds)

        .eq("is_active", true)

        .order("name");


    if (authorsError) {
        throw authorsError;
    }


    if (!authors || authors.length === 0) {

        showEmpty();

        return;

    }


    /*
     * Count interviews per author.
     */

    const interviewCounts = new Map();


    interviews.forEach(interview => {

        const id = interview.author_id;

        interviewCounts.set(
            id,
            (interviewCounts.get(id) || 0) + 1
        );

    });


    /*
     * Combine author + interview count.
     */

    const authorsWithCounts =
        authors.map(author => ({

            ...author,

            interviewCount:
                interviewCounts.get(author.id) || 0

        }));


    renderAuthors(authorsWithCounts);

}


/* ==========================================================
   RENDER AUTHOR LIST
========================================================== */

function renderAuthors(authors) {

    authorsGrid.innerHTML =
        authors
            .map(createAuthorCard)
            .join("");


    authorsGrid.classList.remove("hidden");

    interviewsGrid.classList.add("hidden");

    authorHeader.classList.add("hidden");

    backToAuthors.classList.add("hidden");

    hideAllStates();

}


/* ==========================================================
   CREATE AUTHOR CARD
========================================================== */

function createAuthorCard(author) {

    const name =
        author.name ||
        "Unknown Author";


    const count =
        author.interviewCount || 0;


    const interviewText =
        count === 1
            ? "1 Interview"
            : `${count} Interviews`;


    const photo =
        author.photo_url;


    const initials =
        getInitials(name);


    return `

        <a
            href="interviews.html?author=${encodeURIComponent(author.id)}"
            class="interview-author-card"
            aria-label="View interviews with ${escapeAttribute(name)}"
        >

            ${
                photo
                    ? `

                        <img
                            src="${escapeAttribute(photo)}"
                            alt="${escapeAttribute(name)}"
                            class="interview-author-photo"
                            loading="lazy"
                            onerror="this.style.display='none'; this.nextElementSibling.classList.remove('hidden');"
                        >

                        <span
                            class="interview-author-placeholder hidden"
                            aria-hidden="true"
                        >
                            ${escapeHtml(initials)}
                        </span>

                    `
                    : `

                        <span
                            class="interview-author-placeholder"
                            aria-hidden="true"
                        >
                            ${escapeHtml(initials)}
                        </span>

                    `
            }


            <div class="interview-author-info">

                <h3>
                    ${escapeHtml(name)}
                </h3>

                <div class="interview-author-count">
                    ${interviewText}
                </div>

            </div>


            <span
                class="interview-author-arrow"
                aria-hidden="true"
            >
                →
            </span>

        </a>

    `;

}


/* ==========================================================
   LOAD ONE AUTHOR + INTERVIEWS
========================================================== */

async function loadAuthorInterviews(authorId) {


    /*
     * Load author.
     */

    const {
        data: author,
        error: authorError
    } = await supabase

        .from("authors")

        .select(`
            id,
            name,
            photo_url,
            is_active
        `)

        .eq("id", authorId)

        .eq("is_active", true)

        .single();


    if (authorError) {
        throw authorError;
    }


    /*
     * Load this author's published interviews.
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
            created_at,
            author_id
        `)

        .eq("author_id", authorId)

        .eq("published", true)

        .order("created_at", {
            ascending: false
        });


    if (interviewsError) {
        throw interviewsError;
    }


    if (!interviews || interviews.length === 0) {

        showEmpty();

        return;

    }


    /*
     * Load media images.
     */

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
                    .getPublicUrl(
                        item.storage_path
                    );


                if (
                    publicUrlData?.publicUrl
                ) {

                    mediaMap.set(
                        item.id,
                        publicUrlData.publicUrl
                    );

                }

            });

        }

    }


    /*
     * Add image URL.
     */

    const interviewsWithImages =
        interviews.map(interview => ({

            ...interview,

            imageUrl:
                mediaMap.get(
                    interview.media_id
                ) ||
                getYouTubeThumbnail(
                    interview.youtube_url
                )

        }));


    renderAuthorInterviews(
        author,
        interviewsWithImages
    );

}


/* ==========================================================
   RENDER AUTHOR INTERVIEWS
========================================================== */

function renderAuthorInterviews(
    author,
    interviews
) {

    const name =
        author.name ||
        "Unknown Author";


    const initials =
        getInitials(name);


    /*
     * Author header.
     */

    authorHeader.innerHTML = `

        ${
            author.photo_url
                ? `

                    <img
                        src="${escapeAttribute(author.photo_url)}"
                        alt="${escapeAttribute(name)}"
                    >

                `
                : `

                    <span class="placeholder">
                        ${escapeHtml(initials)}
                    </span>

                `
        }


        <div>

            <h2>
                ${escapeHtml(name)}
            </h2>

            <p>
                ${
                    interviews.length === 1
                        ? "1 Interview"
                        : `${interviews.length} Interviews`
                }
            </p>

        </div>

    `;


    /*
     * Interview cards.
     */

    interviewsGrid.innerHTML =
        interviews
            .map(createInterviewCard)
            .join("");


    authorHeader.classList.remove("hidden");

    backToAuthors.classList.remove("hidden");

    interviewsGrid.classList.remove("hidden");

    authorsGrid.classList.add("hidden");

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


    const description =
        interview.description ||
        "Discover the story behind Telugu Christian hymn heritage.";


    const youtubeUrl =
        interview.youtube_url;


    const imageUrl =
        interview.imageUrl ||
        "https://placehold.co/1280x720?text=Interview";


    return `

        <article class="interview-card">


            <div class="interview-video">

                ${
                    youtubeUrl
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
                                    class="interview-play"
                                    aria-hidden="true"
                                >
                                    ▶
                                </span>

                            </a>

                        `
                        : `

                            <img
                                src="${escapeAttribute(imageUrl)}"
                                alt="${escapeAttribute(title)}"
                                loading="lazy"
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


                <p class="interview-description">
                    ${escapeHtml(description)}
                </p>


                ${
                    youtubeUrl
                        ? `

                            <a
                                href="${escapeAttribute(youtubeUrl)}"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="interview-youtube"
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

        const parsedUrl =
            new URL(url);


        let videoId = null;


        if (
            parsedUrl.hostname ===
            "youtu.be"
        ) {

            videoId =
                parsedUrl.pathname
                    .split("/")
                    .filter(Boolean)[0];

        }


        else if (
            parsedUrl.hostname.includes(
                "youtube.com"
            )
        ) {

            videoId =
                parsedUrl.searchParams.get("v");


            if (!videoId) {

                const embedMatch =
                    parsedUrl.pathname.match(
                        /\/embed\/([^/?]+)/
                    );


                if (embedMatch) {
                    videoId =
                        embedMatch[1];
                }

            }


            if (!videoId) {

                const shortsMatch =
                    parsedUrl.pathname.match(
                        /\/shorts\/([^/?]+)/
                    );


                if (shortsMatch) {
                    videoId =
                        shortsMatch[1];
                }

            }

        }


        if (!videoId) {
            return null;
        }


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

    authorsGrid?.classList.add("hidden");

    interviewsGrid?.classList.add("hidden");

    authorHeader?.classList.add("hidden");

    backToAuthors?.classList.add("hidden");

    loadingState?.classList.remove("hidden");

    errorState?.classList.add("hidden");

    emptyState?.classList.add("hidden");

}


function showError() {

    authorsGrid?.classList.add("hidden");

    interviewsGrid?.classList.add("hidden");

    authorHeader?.classList.add("hidden");

    backToAuthors?.classList.add("hidden");

    loadingState?.classList.add("hidden");

    errorState?.classList.remove("hidden");

    emptyState?.classList.add("hidden");

}


function showEmpty() {

    authorsGrid?.classList.add("hidden");

    interviewsGrid?.classList.add("hidden");

    authorHeader?.classList.add("hidden");

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
   HELPERS
========================================================== */

function getInitials(name) {

    return String(name || "A")
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map(word => word.charAt(0))
        .join("")
        .toUpperCase();

}


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