/* ==========================================================
   LATEST UPDATES TICKER
   Andhra Kraistava Keerthanalu

   Automatically displays recently added:
   - Interviews
   - Hymns
   - Books

   No separate CMS/table required.
   ========================================================== */

import { supabase } from "../supabase.js";


/* ==========================================================
   CONFIGURATION
   ========================================================== */

const MAX_ITEMS_PER_SOURCE = 8;
const MAX_DISPLAY_ITEMS = 10;


/* ==========================================================
   INITIALIZE
   ========================================================== */

document.addEventListener(
    "DOMContentLoaded",
    initializeLatestUpdates
);


async function initializeLatestUpdates() {

    const ticker =
        document.getElementById(
            "latestUpdatesTicker"
        );

    const track =
        document.getElementById(
            "latestUpdatesTrack"
        );


    if (!ticker || !track) {
        return;
    }


    ticker.hidden = false;
    ticker.classList.add("is-loading");


    track.innerHTML = `
        <span class="latest-updates-loading">
            Loading latest updates...
        </span>
    `;


    try {

        const updates =
            await loadLatestUpdates();


        if (!updates.length) {

            /*
             * Nothing recent/available.
             * Hide the ticker completely so it
             * never leaves an empty strip.
             */
            ticker.hidden = true;

            return;
        }


        renderLatestUpdates(
            ticker,
            track,
            updates
        );


    } catch (error) {

        console.error(
            "[Latest Updates] Failed to initialize:",
            error
        );

        /*
         * Do not show a broken ticker.
         */
        ticker.hidden = true;

    }

}


/* ==========================================================
   LOAD ALL SOURCES
   ========================================================== */

async function loadLatestUpdates() {

    /*
     * Each source is loaded independently.
     *
     * This is intentional:
     * if one table has a problem, the ticker
     * can still display the other sources.
     */

    const results =
        await Promise.allSettled([
            loadLatestInterviews(),
            loadLatestHymns(),
            loadLatestBooks()
        ]);


    const updates = [];


    results.forEach(result => {

        if (
            result.status === "fulfilled" &&
            Array.isArray(result.value)
        ) {

            updates.push(
                ...result.value
            );

        }

    });


    /*
     * Newest first.
     */
    updates.sort(
        (a, b) =>
            new Date(b.createdAt) -
            new Date(a.createdAt)
    );


    /*
     * Keep the ticker compact.
     */
    return updates.slice(
        0,
        MAX_DISPLAY_ITEMS
    );

}


/* ==========================================================
   INTERVIEWS
   ========================================================== */

async function loadLatestInterviews() {

    const {
        data,
        error
    } = await supabase
        .from("interviews")
        .select(`
            id,
            title,
            interviewee,
            category,
            created_at,
            published
        `)
        .eq(
            "published",
            true
        )
        .order(
            "created_at",
            {
                ascending: false
            }
        )
        .limit(
            MAX_ITEMS_PER_SOURCE
        );


    if (error) {

        console.error(
            "[Latest Updates] Interviews:",
            error
        );

        return [];

    }


    return (data || []).map(
        interview => ({

            type: "Interview",

            icon: "fa-microphone",

            title:
                interview.title ||
                (
                    interview.interviewee
                        ? `Interview with ${interview.interviewee}`
                        : "New Interview"
                ),

            createdAt:
                interview.created_at,

            url:
                "interviews.html"

        })
    );

}


/* ==========================================================
   HYMNS
   ========================================================== */

async function loadLatestHymns() {

    const {
        data,
        error
    } = await supabase
        .from("hymns")
        .select(`
            id,
            number,
            title_telugu,
            title_english,
            created_at
        `)
        .order(
            "created_at",
            {
                ascending: false
            }
        )
        .limit(
            MAX_ITEMS_PER_SOURCE
        );


    if (error) {

        console.error(
            "[Latest Updates] Hymns:",
            error
        );

        return [];

    }


    return (data || []).map(
        hymn => {

            const title =
                hymn.title_telugu ||
                hymn.title_english ||
                `Hymn ${hymn.number || ""}`;


            return {

                type: "Hymn",

                icon: "fa-music",

                title: `Hymn ${hymn.number || ""} — ${title}`,

                createdAt:
                    hymn.created_at,

                url:
                    hymn.number !== null &&
                    hymn.number !== undefined
                        ? `hymn.html?id=${encodeURIComponent(hymn.number)}`
                        : "hymns.html"

            };

        }
    );

}


/* ==========================================================
   BOOKS
   ========================================================== */

async function loadLatestBooks() {

    const {
        data,
        error
    } = await supabase
        .from("books")
        .select(`
            id,
            name,
            slug,
            created_at
        `)
        .order(
            "created_at",
            {
                ascending: false
            }
        )
        .limit(
            MAX_ITEMS_PER_SOURCE
        );


    if (error) {

        console.error(
            "[Latest Updates] Books:",
            error
        );

        return [];

    }


    return (data || []).map(
        book => ({

            type: "Publication",

            icon: "fa-book-open",

            title:
                book.name ||
                "New Publication",

            createdAt:
                book.created_at,

            /*
             * We deliberately use the existing
             * public books page instead of inventing
             * a detail-page URL.
             */
            url:
                "books.html"

        })
    );

}


/* ==========================================================
   RENDER
   ========================================================== */

function renderLatestUpdates(
    ticker,
    track,
    updates
) {

    ticker.classList.remove(
        "is-loading"
    );


    /*
     * We duplicate the items.
     *
     * The first copy scrolls out while the
     * second copy enters, creating an
     * apparently infinite ticker.
     */
    const items =
        updates
            .map(
                createUpdateItem
            )
            .join("");


    track.innerHTML =
        items +
        items;


    /*
     * Make sure animation starts from
     * the beginning after DOM insertion.
     */
    track.style.animation = "none";

    void track.offsetWidth;

    track.style.animation = "";

}


/* ==========================================================
   CREATE ITEM
   ========================================================== */

function createUpdateItem(
    update
) {

    const type =
        escapeHTML(
            update.type
        );


    const title =
        escapeHTML(
            update.title
        );


    const url =
        escapeAttribute(
            update.url
        );


    const icon =
        escapeAttribute(
            update.icon
        );


    const isNew =
        isRecentlyAdded(
            update.createdAt
        );


    return `
        <a
            class="latest-update-item"
            href="${url}"
            aria-label="${type}: ${title}"
        >

            <i
                class="fa-solid ${icon}"
                aria-hidden="true"
            ></i>

            <span
                class="latest-update-type"
            >
                ${type}
            </span>

            <span
                class="latest-update-title"
            >
                ${title}
            </span>

            ${
                isNew
                    ? `
                        <span
                            class="latest-update-new"
                        >
                            New
                        </span>
                    `
                    : ""
            }

            <span
                class="latest-update-separator"
                aria-hidden="true"
            >
                •
            </span>

        </a>
    `;

}


/* ==========================================================
   RECENTLY ADDED
   ========================================================== */

function isRecentlyAdded(
    createdAt
) {

    if (!createdAt) {
        return false;
    }


    const created =
        new Date(createdAt);


    if (
        Number.isNaN(
            created.getTime()
        )
    ) {
        return false;
    }


    const now =
        Date.now();


    const age =
        now -
        created.getTime();


    const fourteenDays =
        14 *
        24 *
        60 *
        60 *
        1000;


    return (
        age >= 0 &&
        age <= fourteenDays
    );

}


/* ==========================================================
   HTML SAFETY
   ========================================================== */

function escapeHTML(
    value
) {

    return String(
        value ?? ""
    )
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


function escapeAttribute(
    value
) {

    return escapeHTML(
        value
    );

}