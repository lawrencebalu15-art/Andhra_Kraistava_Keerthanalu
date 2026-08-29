import { supabase } from "../supabase.js";


/* ==========================================================
   STATE
========================================================== */

let authors = [];
let filteredAuthors = [];
let hymns = [];


/* ==========================================================
   DOM ELEMENTS
========================================================== */

const authorsGrid =
    document.getElementById("authorsGrid");

const loading =
    document.getElementById("authorsLoading");

const empty =
    document.getElementById("authorsEmpty");

const searchInput =
    document.getElementById("authorSearch");

const sortSelect =
    document.getElementById("authorSort");


/* ==========================================================
   INITIALIZE
========================================================== */

init();


async function init() {

    await loadData();

    updateStatistics();

    renderAuthors();

    setupEvents();

}


/* ==========================================================
   LOAD DATA
========================================================== */

async function loadData() {

    if (loading) {
        loading.style.display = "block";
    }

    if (authorsGrid) {
        authorsGrid.innerHTML = "";
    }

    if (empty) {
        empty.style.display = "none";
    }


    try {

        /* ======================================================
           LOAD AUTHORS
        ====================================================== */

        const {
    data: authorsData,
    error: authorError
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
        media_id
    `)
    .order("name", {
        ascending: true
    });


        if (authorError) {
            throw authorError;
        }


        /* ======================================================
           LOAD HYMNS
        ====================================================== */

        const {
            data: hymnsData,
            error: hymnError
        } = await supabase
            .from("hymns")
            .select("id, author_id");


        if (hymnError) {
            throw hymnError;
        }


        authors =
            authorsData || [];

        hymns =
            hymnsData || [];

        filteredAuthors =
            [...authors];


        console.log(
            "Loaded authors:",
            authors
        );

        console.log(
            "Loaded hymns:",
            hymns
        );


    } catch (error) {

        console.error(
            "Failed to load authors:",
            error
        );


        if (authorsGrid) {

            authorsGrid.innerHTML = `
                <div class="author-load-error">

                    <i class="fas fa-circle-exclamation"></i>

                    <h3>
                        Unable to Load Hymn Writers
                    </h3>

                    <p>
                        Please refresh the page and try again.
                    </p>

                </div>
            `;

        }

        authors = [];
        hymns = [];
        filteredAuthors = [];


    } finally {

        if (loading) {
            loading.style.display = "none";
        }

    }

}


/* ==========================================================
   STATISTICS
========================================================== */

function updateStatistics() {

    const totalAuthors =
        document.getElementById("totalAuthors");

    const totalHymns =
        document.getElementById("totalHymns");

    const totalBooks =
        document.getElementById("totalBooks");


    if (totalAuthors) {
        totalAuthors.textContent =
            authors.length;
    }


    if (totalHymns) {
        totalHymns.textContent =
            hymns.length;
    }


    /*
     * Books are not currently loaded
     * on this page.
     *
     * Keep existing behaviour until
     * the Books integration is implemented.
     */

    if (totalBooks) {
        totalBooks.textContent = "0";
    }

}


/* ==========================================================
   RENDER AUTHORS
========================================================== */

function renderAuthors() {

    if (!authorsGrid) {
        return;
    }


    if (filteredAuthors.length === 0) {

        authorsGrid.innerHTML = "";

        if (empty) {
            empty.style.display = "block";
        }

        return;
    }


    if (empty) {
        empty.style.display = "none";
    }


    authorsGrid.innerHTML =
        filteredAuthors
            .map(createAuthorCard)
            .join("");

}


/* ==========================================================
   CREATE AUTHOR CARD
========================================================== */

function createAuthorCard(author) {

    const hymnCount =
        hymns.filter(
            hymn =>
                String(hymn.author_id) ===
                String(author.id)
        ).length;


    /*
     * Use the database photo when available.
     * Otherwise show a simple local fallback.
     */

    const image =
        author.photo_url ||
        "https://placehold.co/400x400?text=Hymn Writer";


    const name =
        escapeHtml(
            author.name ||
            "Unknown Hymn Writer"
        );


    const bio =
        escapeHtml(
            author.bio ||
            "Biography coming soon..."
        );


    const country =
        author.country
            ? escapeHtml(author.country)
            : "";


    const birthYear =
        author.birth_year || "";


    const deathYear =
        author.death_year || "";


    let dates = "";


    if (birthYear && deathYear) {

        dates =
            `${birthYear} — ${deathYear}`;

    } else if (birthYear) {

        dates =
            `Born ${birthYear}`;

    } else if (deathYear) {

        dates =
            `Died ${deathYear}`;

    }


    /*
     * IMPORTANT:
     *
     * The author's database ID is passed
     * to author.html.
     *
     * Example:
     *
     * author.html?id=12
     */

    const authorUrl =
        `author.html?id=${encodeURIComponent(author.id)}`;


    return `
        <article
            class="author-card"
            onclick="window.location.href='${authorUrl}'"
            role="link"
            tabindex="0"
            aria-label="View ${name}"
        >

            <div class="author-image-wrapper">

                <img
                    src="${escapeHtml(image)}"
                    alt="${name}"
                    loading="lazy"
                    onerror="this.src='https://placehold.co/400x400?text=Hymn Writer';"
                >

            </div>


            <div class="author-content">

                <h3>
                    ${name}
                </h3>


                ${
                    dates
                        ? `
                            <p class="author-dates">
                                ${escapeHtml(dates)}
                            </p>
                        `
                        : ""
                }


                ${
                    country
                        ? `
                            <p class="author-country">
                                <i class="fas fa-location-dot"></i>
                                ${country}
                            </p>
                        `
                        : ""
                }


                <p class="bio-coming">
                    ${bio}
                </p>


                <div class="author-hymn-count">

                    <i class="fas fa-music"></i>

                    ${hymnCount}

                    ${hymnCount === 1 ? "Hymn" : "Hymns"}

                </div>


                <span class="view-author-link">

                    View Hymn Writer

                    <i class="fas fa-arrow-right"></i>

                </span>

            </div>

        </article>
    `;
}


/* ==========================================================
   SEARCH + SORT EVENTS
========================================================== */

function setupEvents() {

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            filterAuthors
        );

    }


    if (sortSelect) {

        sortSelect.addEventListener(
            "change",
            filterAuthors
        );

    }


    /*
     * Allow keyboard users to open
     * an author card with Enter/Space.
     */

    if (authorsGrid) {

        authorsGrid.addEventListener(
            "keydown",
            event => {

                const card =
                    event.target.closest(
                        ".author-card"
                    );


                if (!card) {
                    return;
                }


                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    card.click();

                }

            }
        );

    }

}


/* ==========================================================
   FILTER AUTHORS
========================================================== */

function filterAuthors() {

    const keyword =
        searchInput
            ? searchInput.value
                .toLowerCase()
                .trim()
            : "";


    filteredAuthors =
        authors.filter(author => {

            const name =
                String(author.name || "")
                    .toLowerCase();


            const bio =
                String(author.bio || "")
                    .toLowerCase();


            const country =
                String(author.country || "")
                    .toLowerCase();


            return (
                name.includes(keyword) ||
                bio.includes(keyword) ||
                country.includes(keyword)
            );

        });


    /*
     * Sort A-Z / Z-A
     */

    const sortValue =
        sortSelect
            ? sortSelect.value
            : "az";


    filteredAuthors.sort(
        (a, b) => {

            const nameA =
                String(a.name || "");


            const nameB =
                String(b.name || "");


            const comparison =
                nameA.localeCompare(
                    nameB,
                    undefined,
                    {
                        sensitivity: "base"
                    }
                );


            return sortValue === "za"
                ? -comparison
                : comparison;

        }
    );


    renderAuthors();

}


/* ==========================================================
   HTML ESCAPE
========================================================== */

function escapeHtml(value) {

    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}