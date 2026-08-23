import { supabase } from "../../js/supabase.js";


/* ==========================================
   DOM
========================================== */

const grid =
    document.getElementById("interviewsGrid");

const loading =
    document.getElementById("interviewsLoading");

const errorState =
    document.getElementById("interviewsError");

const emptyState =
    document.getElementById("interviewsEmpty");


/* ==========================================
   HELPERS
========================================== */

function escapeHtml(value) {

    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* ==========================================
   GET MEDIA URL
========================================== */

function getMediaUrl(storagePath) {

    if (!storagePath) {

        return "";

    }


    const {
        data
    } = supabase.storage
        .from("media")
        .getPublicUrl(storagePath);


    return data?.publicUrl || "";

}


/* ==========================================
   LOAD INTERVIEWS
========================================== */

async function loadInterviews() {

    try {

        showLoading();


        /*
         * Load only published interviews.
         */

        const {
            data,
            error
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


        /*
         * Load media separately.
         *
         * This matches the CMS architecture
         * where interviews store media_id.
         */

        const mediaIds =
            data
                .map(
                    interview =>
                        interview.media_id
                )
                .filter(Boolean);


        let mediaList = [];


        if (mediaIds.length > 0) {

            const {
                data: mediaData,
                error: mediaError
            } = await supabase
                .from("media")
                .select(
                    "id,file_name,storage_path,file_type"
                )
                .in(
                    "id",
                    mediaIds
                );


            if (mediaError) {

                throw mediaError;

            }


            mediaList =
                mediaData || [];

        }


        /*
         * Render
         */

        renderInterviews(
            data,
            mediaList
        );


    } catch (error) {

        console.error(
            "Failed to load interviews:",
            error
        );


        showError();

    }

}


/* ==========================================
   RENDER INTERVIEWS
========================================== */

function renderInterviews(
    interviews,
    mediaList
) {

    grid.innerHTML = "";


    interviews.forEach(
        interview => {

            const media =
                mediaList.find(
                    item =>
                        String(item.id) ===
                        String(interview.media_id)
                );


            const imageUrl =
                media
                    ? getMediaUrl(
                        media.storage_path
                    )
                    : "";


            const card =
                document.createElement(
                    "article"
                );


            card.className =
                "interview-card";


            /*
             * Image
             */

            const imageHtml =
                imageUrl

                    ? `
                        <div class="interview-image">

                            <img
                                src="${escapeHtml(imageUrl)}"
                                alt="${escapeHtml(interview.title)}"
                                loading="lazy">

                        </div>
                      `

                    : `
                        <div class="interview-image">

                            <div
                                class="interview-image-placeholder">

                                Interview

                            </div>

                        </div>
                      `;


            /*
             * Featured badge
             */

            const featuredHtml =
                interview.featured

                    ? `
                        <span class="interview-featured">
                            Featured
                        </span>
                      `

                    : "";


            /*
             * Interviewee
             */

            const intervieweeHtml =
                interview.interviewee

                    ? `
                        <p class="interview-interviewee">

                            ${escapeHtml(
                                interview.interviewee
                            )}

                        </p>
                      `

                    : "";


            /*
             * YouTube button
             */

            const youtubeHtml =
                interview.youtube_url

                    ? `
                        <a
                            href="${escapeHtml(
                                interview.youtube_url
                            )}"
                            class="author-link"
                            target="_blank"
                            rel="noopener noreferrer">

                            Watch Interview →

                        </a>
                      `

                    : "";


            card.innerHTML = `

                ${imageHtml}


                <div class="interview-content">


                    <div class="interview-meta">

                        <span class="interview-category">

                            ${escapeHtml(
                                interview.category ||
                                "Interview"
                            )}

                        </span>


                        ${featuredHtml}

                    </div>


                    <h3>

                        ${escapeHtml(
                            interview.title
                        )}

                    </h3>


                    ${intervieweeHtml}


                    <p>

                        ${escapeHtml(
                            interview.description ||
                            "Discover the story and ministry behind this interview."
                        )}

                    </p>


                    ${youtubeHtml}


                </div>

            `;


            grid.appendChild(
                card
            );

        }
    );


    showContent();

}


/* ==========================================
   LOADING STATE
========================================== */

function showLoading() {

    loading.classList.remove(
        "hidden"
    );

    errorState.classList.add(
        "hidden"
    );

    emptyState.classList.add(
        "hidden"
    );

    grid.classList.add(
        "hidden"
    );

}


/* ==========================================
   CONTENT STATE
========================================== */

function showContent() {

    loading.classList.add(
        "hidden"
    );

    errorState.classList.add(
        "hidden"
    );

    emptyState.classList.add(
        "hidden"
    );

    grid.classList.remove(
        "hidden"
    );

}


/* ==========================================
   EMPTY STATE
========================================== */

function showEmpty() {

    loading.classList.add(
        "hidden"
    );

    errorState.classList.add(
        "hidden"
    );

    grid.classList.add(
        "hidden"
    );

    emptyState.classList.remove(
        "hidden"
    );

}


/* ==========================================
   ERROR STATE
========================================== */

function showError() {

    loading.classList.add(
        "hidden"
    );

    emptyState.classList.add(
        "hidden"
    );

    grid.classList.add(
        "hidden"
    );

    errorState.classList.remove(
        "hidden"
    );

}


/* ==========================================
   INITIALIZE
========================================== */

document.addEventListener(
    "DOMContentLoaded",
    loadInterviews
);