import { supabase } from "../supabase.js";

/* =========================================================
   DOM ELEMENTS
========================================================= */

const authorLoading =
    document.getElementById("authorLoading");

const authorError =
    document.getElementById("authorError");

const authorErrorMessage =
    document.getElementById("authorErrorMessage");

const authorContent =
    document.getElementById("authorContent");

const authorName =
    document.getElementById("authorName");

const authorDates =
    document.getElementById("authorDates");

const authorCountry =
    document.getElementById("authorCountry");

const authorAvatar =
    document.getElementById("authorAvatar");

const authorPhoto =
    document.getElementById("authorPhoto");

const authorBio =
    document.getElementById("authorBio");

const authorHymnCount =
    document.getElementById("authorHymnCount");

const authorHymnsSubtitle =
    document.getElementById("authorHymnsSubtitle");

const authorHymns =
    document.getElementById("authorHymns");

const authorHistoricalArchive =
    document.getElementById(
        "authorHistoricalArchive"
    );

const authorHistoricalImage =
    document.getElementById(
        "authorHistoricalImage"
    );

const authorHistoricalView =
    document.getElementById(
        "authorHistoricalView"
    );


/* =========================================================
   INITIALIZE
========================================================= */

loadAuthor();


/* =========================================================
   GET AUTHOR ID FROM URL
========================================================= */

function getAuthorId() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    return params.get("id");
}


/* =========================================================
   LOAD AUTHOR
========================================================= */

async function loadAuthor() {

    showLoading();

    const authorId =
        getAuthorId();


    /* ---------------------------------------------------------
       No ID
    --------------------------------------------------------- */

    if (!authorId) {

        showError(
            "No Writer was specified."
        );

        return;
    }


    try {

        /* =====================================================
           LOAD AUTHOR
        ===================================================== */

        const {
            data: author,
            error
        } = await supabase
            .from("authors")
            .select(`
    id,
    name,
    photo_url,
    bio,
    birth_year,
    death_year,
    country,
    media_id,
    historical_media_id
`)
            .eq("id", authorId)
            .maybeSingle();


        /* -----------------------------------------------------
           DATABASE ERROR
        ----------------------------------------------------- */

        if (error) {

            console.error(
                "Author database error:",
                error
            );

            throw error;
        }


        /* -----------------------------------------------------
           Author doesn't exist
        ----------------------------------------------------- */

        if (!author) {

            showError(
                "This author could not be found in the archive."
            );

            return;
        }


        console.log(
            "Author loaded successfully:",
            author
        );


        /* =====================================================
           RENDER AUTHOR
        ===================================================== */

        await renderAuthor(author);


        /* =====================================================
           LOAD AUTHOR'S HYMNS
        ===================================================== */

        await loadAuthorHymns(
            author.id
        );


        /* =====================================================
           SHOW PAGE
        ===================================================== */

        showContent();


    } catch (error) {

        console.error(
            "Author loading error:",
            error
        );


        showError(
            "Unable to load author information."
        );

    }

}


/* =========================================================
   RENDER AUTHOR
========================================================= */
/* =========================================================
   RENDER AUTHOR
========================================================= */

async function renderAuthor(author) {

    const name =
        author.name ||
        "Unknown Writer";


    /* =====================================================
       NAME
    ===================================================== */

    if (authorName) {

        authorName.textContent =
            name;

    }


    /* =====================================================
       INITIALS FALLBACK
    ===================================================== */

    if (authorAvatar) {

        authorAvatar.textContent =
            getInitials(name);

    }


    /* =====================================================
       BIRTH / DEATH YEARS
    ===================================================== */

    const birthYear =
        author.birth_year;

    const deathYear =
        author.death_year;


    if (
        birthYear ||
        deathYear
    ) {

        let dates = "";


        if (
            birthYear &&
            deathYear
        ) {

            dates =
                `${birthYear} — ${deathYear}`;

        } else if (birthYear) {

            dates =
                `Born ${birthYear}`;

        } else {

            dates =
                `Died ${deathYear}`;

        }


        if (authorDates) {

            authorDates.textContent =
                dates;

            authorDates.classList.remove(
                "hidden"
            );

        }

    } else {

        if (authorDates) {

            authorDates.classList.add(
                "hidden"
            );

        }

    }


    /* =====================================================
       COUNTRY
    ===================================================== */

    if (authorCountry) {

        if (author.country) {

            const countryText =
                authorCountry.querySelector(
                    "span"
                );


            if (countryText) {

                countryText.textContent =
                    author.country;

            }


            authorCountry.classList.remove(
                "hidden"
            );

        } else {

            authorCountry.classList.add(
                "hidden"
            );

        }

    }


    /* =====================================================
       BIOGRAPHY
    ===================================================== */

    if (authorBio) {

        if (
            author.bio &&
            author.bio.trim()
        ) {

            const paragraphs =
                author.bio
                    .trim()
                    .split(/\n\s*\n/);


            authorBio.innerHTML =
                paragraphs
                    .map(
                        paragraph => `
                            <p>
                                ${escapeHtml(
                                    paragraph.trim()
                                )}
                            </p>
                        `
                    )
                    .join("");

        } else {

            authorBio.innerHTML = `
                <p>
                    Biography information is currently
                    being prepared for this archive.
                </p>
            `;

        }

    }


    /* =====================================================
       PHOTO
    ===================================================== */

    let photoUrl =
        author.photo_url ||
        "";


    /*
     * If photo_url doesn't exist,
     * try media_id.
     */

    if (
        !photoUrl &&
        author.media_id
    ) {

        const {
            data: media,
            error
        } = await supabase
            .from("media")
            .select("storage_path")
            .eq(
                "id",
                author.media_id
            )
            .maybeSingle();


        if (
            !error &&
            media?.storage_path
        ) {

            photoUrl =
                getPublicMediaUrl(
                    media.storage_path
                );

        }

    }


    /* ---------------------------------------------------------
       Display photo
    --------------------------------------------------------- */

    if (
        authorPhoto &&
        authorAvatar
    ) {

        if (photoUrl) {

            authorPhoto.src =
                photoUrl;

            authorPhoto.alt =
                `${name} - hymn writer`;

            authorPhoto.classList.remove(
                "hidden"
            );

            authorAvatar.classList.add(
                "hidden"
            );


            /*
             * If image fails to load,
             * return to initials.
             */

            authorPhoto.onerror =
                () => {

                    authorPhoto.classList.add(
                        "hidden"
                    );

                    authorAvatar.classList.remove(
                        "hidden"
                    );

                };

        } else {

            authorPhoto.classList.add(
                "hidden"
            );

            authorAvatar.classList.remove(
                "hidden"
            );

        }

    }


    /* =====================================================
       PAGE TITLE
    ===================================================== */

    document.title =
        `${name} | Andhra Kraistava Keerthanalu`;


    /* =====================================================
       META DESCRIPTION
    ===================================================== */

    let metaDescription =
        document.querySelector(
            'meta[name="description"]'
        );


    if (!metaDescription) {

        metaDescription =
            document.createElement(
                "meta"
            );

        metaDescription.name =
            "description";

        document.head.appendChild(
            metaDescription
        );

    }


    metaDescription.content =
        (
            author.bio?.trim() ||
            `Explore the biography and hymns of ${name}.`
        ).substring(0, 160);


    /* =====================================================
       HISTORICAL RECORD
    ===================================================== */

    /*
     * The historical image is optional.
     *
     * If the author has a historical_media_id,
     * find the corresponding media record,
     * generate its public Supabase Storage URL,
     * and display the Historical Record section.
     *
     * If there is no image, the entire section
     * remains hidden.
     */

    if (
        authorHistoricalArchive &&
        authorHistoricalImage
    ) {

        const historicalMediaId =
            author.historical_media_id;


        /* -----------------------------------------------------
           No historical image assigned
        ----------------------------------------------------- */

        if (!historicalMediaId) {

            authorHistoricalArchive.classList.add(
                "hidden"
            );

        }


        /* -----------------------------------------------------
           Historical image assigned
        ----------------------------------------------------- */

        else {

            const {
                data: historicalMedia,
                error: historicalMediaError
            } = await supabase
                .from("media")
                .select("storage_path")
                .eq(
                    "id",
                    historicalMediaId
                )
                .maybeSingle();


            /* -------------------------------------------------
               Media record found
            ------------------------------------------------- */

            if (
                !historicalMediaError &&
                historicalMedia?.storage_path
            ) {

                const historicalUrl =
                    getPublicMediaUrl(
                        historicalMedia.storage_path
                    );


                /* ---------------------------------------------
                   Public URL generated
                --------------------------------------------- */

                if (historicalUrl) {

                    authorHistoricalImage.src =
                        historicalUrl;

                    authorHistoricalImage.alt =
                        `${name} - historical record`;


                    authorHistoricalArchive.classList.remove(
                        "hidden"
                    );


                    /* -----------------------------------------
                       Full image link
                    ----------------------------------------- */

                    if (authorHistoricalView) {

                        authorHistoricalView.href =
                            historicalUrl;

                    }


                    /* -----------------------------------------
                       If image itself fails
                    ----------------------------------------- */

                    authorHistoricalImage.onerror =
                        () => {

                            console.error(
                                "Historical image failed to load:",
                                historicalUrl
                            );

                            authorHistoricalArchive.classList.add(
                                "hidden"
                            );

                        };

                }


                /* ---------------------------------------------
                   Could not generate public URL
                --------------------------------------------- */

                else {

                    console.error(
                        "Could not create historical image URL."
                    );

                    authorHistoricalArchive.classList.add(
                        "hidden"
                    );

                }

            }


            /* -------------------------------------------------
               Media lookup failed
            ------------------------------------------------- */

            else {

                console.error(
                    "Historical media lookup failed:",
                    historicalMediaError
                );

                authorHistoricalArchive.classList.add(
                    "hidden"
                );

            }

        }

    }

}


/* =========================================================
   LOAD AUTHOR HYMNS
========================================================= */

async function loadAuthorHymns(
    authorId
) {

    const {
        data: hymns,
        error
    } = await supabase
        .from("hymns")
        .select(`
            id,
            number,
            title_telugu,
            title_english,
            language
        `)
        .eq(
            "author_id",
            authorId
        )
        .order(
            "number",
            {
                ascending: true
            }
        );


    /* =====================================================
       ERROR
    ===================================================== */

    if (error) {

        console.error(
            "Author hymns error:",
            error
        );


        if (authorHymnCount) {

            authorHymnCount.textContent =
                "0";

        }


        if (authorHymns) {

            authorHymns.innerHTML = `
                <div class="author-empty">
                    <p>
                        Unable to load this author's hymns.
                    </p>
                </div>
            `;

        }


        return;
    }


    const hymnList =
        hymns || [];


    /* =====================================================
       COUNT
    ===================================================== */

    if (authorHymnCount) {

        authorHymnCount.textContent =
            hymnList.length;

    }


    /* =====================================================
       SUBTITLE
    ===================================================== */

    if (authorHymnsSubtitle) {

        authorHymnsSubtitle.textContent =
            hymnList.length === 1
                ? "1 hymn associated with this writer."
                : `${hymnList.length} hymns associated with this writer.`;

    }


    /* =====================================================
       NO HYMNS
    ===================================================== */

    if (
        hymnList.length === 0
    ) {

        if (authorHymns) {

            authorHymns.innerHTML = `
                <div class="author-empty">
                    <p>
                        No hymns are currently associated
                        with this author.
                    </p>
                </div>
            `;

        }


        return;
    }


    /* =====================================================
       RENDER HYMNS
    ===================================================== */

    if (authorHymns) {

        authorHymns.innerHTML =
            hymnList
                .map(createHymnRow)
                .join("");

    }

}


/* =========================================================
   CREATE HYMN ROW
========================================================= */

function createHymnRow(
    hymn
) {

    const number =
        hymn.number ?? "";


    const teluguTitle =
        hymn.title_telugu?.trim() ||
        "";


    const englishTitle =
        hymn.title_english?.trim() ||
        "";


    const title =
        teluguTitle ||
        englishTitle ||
        "Untitled Hymn";


    /*
     * Your existing hymn pages use
     * the hymn NUMBER in the URL.
     */

    const hymnUrl =
        `hymn.html?id=${encodeURIComponent(number)}`;


    return `
        <a
            href="${hymnUrl}"
            class="author-hymn"
        >

            <div class="author-hymn-number">

                ${escapeHtml(number)}

            </div>


            <div>

                <div class="author-hymn-title">

                    ${escapeHtml(title)}

                </div>


                ${
                    englishTitle
                        ? `
                            <div class="author-hymn-english">

                                ${escapeHtml(
                                    englishTitle
                                )}

                            </div>
                        `
                        : ""
                }

            </div>


            <div class="author-hymn-arrow">

                →

            </div>

        </a>
    `;

}


/* =========================================================
   PUBLIC STORAGE URL
========================================================= */

function getPublicMediaUrl(
    storagePath
) {

    if (!storagePath) {

        return "";

    }


    const {
        data
    } =
        supabase
            .storage
            .from("media")
            .getPublicUrl(
                storagePath
            );


    return (
        data?.publicUrl ||
        ""
    );

}


/* =========================================================
   INITIALS
========================================================= */

function getInitials(
    name
) {

    if (!name) {

        return "?";

    }


    const words =
        name
            .trim()
            .split(/\s+/)
            .filter(Boolean);


    if (
        words.length === 1
    ) {

        return words[0]
            .substring(0, 2)
            .toUpperCase();

    }


    return (
        words[0]
    ).toUpperCase();

}


/* =========================================================
   HTML ESCAPE
========================================================= */

function escapeHtml(
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


/* =========================================================
   PAGE STATES
========================================================= */

function showLoading() {

    if (authorLoading) {

        authorLoading.classList.remove(
            "hidden"
        );

    }


    if (authorError) {

        authorError.classList.add(
            "hidden"
        );

    }


    if (authorContent) {

        authorContent.classList.add(
            "hidden"
        );

    }

}


/* =========================================================
   SHOW ERROR
========================================================= */

function showError(
    message
) {

    if (authorLoading) {

        authorLoading.classList.add(
            "hidden"
        );

    }


    if (authorContent) {

        authorContent.classList.add(
            "hidden"
        );

    }


    if (authorErrorMessage) {

        authorErrorMessage.textContent =
            message;

    }


    if (authorError) {

        authorError.classList.remove(
            "hidden"
        );

    }

}


/* =========================================================
   SHOW CONTENT
========================================================= */

function showContent() {

    if (authorLoading) {

        authorLoading.classList.add(
            "hidden"
        );

    }


    if (authorError) {

        authorError.classList.add(
            "hidden"
        );

    }


    if (authorContent) {

        authorContent.classList.remove(
            "hidden"
        );

    }

}