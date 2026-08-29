import { supabase } from "../supabase.js";

/* ==========================================
   DOM ELEMENTS
========================================== */

const totalHymnsEl =
    document.getElementById("totalHymns");

const totalAuthorsEl =
    document.getElementById("totalAuthors");

const totalBooksEl =
    document.getElementById("totalBooks");

const authorSearch =
    document.getElementById("authorSearch");

const authorSort =
    document.getElementById("authorSort");

const authorsList =
    document.getElementById("authorsList");

const loading =
    document.getElementById("authorsLoading");

const empty =
    document.getElementById("authorsEmpty");


/* ==========================================
   DATA
========================================== */

let authors = [];
let hymns = [];
let books = [];

let filteredAuthors = [];

let selectedSort = "az";


/* ==========================================
   INITIAL LOAD
========================================== */

document.addEventListener(
    "DOMContentLoaded",
    async () => {

        await loadPageData();

        setupEvents();

    }
);


/* ==========================================
   LOAD DATA
========================================== */

async function loadPageData() {

    try {

        showLoading(true);

        const [
            authorsRes,
            hymnsRes,
            booksRes
        ] = await Promise.all([

            supabase
    .from("authors")
    .select("*")
    .eq("is_active", true)
    .order("name", {
        ascending: true
    }),
            supabase
                .from("hymns")
                .select("id, author_id"),

            supabase
                .from("books")
                .select("id")

        ]);


        /* ----------------------------------
           ERROR HANDLING
        ---------------------------------- */

        if (authorsRes.error) {
            throw authorsRes.error;
        }

        if (hymnsRes.error) {
            throw hymnsRes.error;
        }

        if (booksRes.error) {
            throw booksRes.error;
        }


        /* ----------------------------------
           STORE DATA
        ---------------------------------- */

        authors =
            authorsRes.data || [];

        hymns =
            hymnsRes.data || [];

        books =
            booksRes.data || [];


        filteredAuthors =
            [...authors];


        /* ----------------------------------
           STATISTICS
        ---------------------------------- */

        if (totalHymnsEl) {

            totalHymnsEl.textContent =
                hymns.length;

        }


        if (totalAuthorsEl) {

            totalAuthorsEl.textContent =
                authors.length;

        }


        if (totalBooksEl) {

            totalBooksEl.textContent =
                books.length;

        }


        /* ----------------------------------
           RENDER
        ---------------------------------- */

        renderAuthors();

    }

    catch (error) {

        console.error(
            "Failed to load authors:",
            error
        );

        showError();

    }

    finally {

        showLoading(false);

    }

}


/* ==========================================
   EVENTS
========================================== */

function setupEvents() {


    /* ----------------------------------
       SEARCH
    ---------------------------------- */

    if (authorSearch) {

        authorSearch.addEventListener(
            "input",
            () => {

                applyFilters();

            }
        );

    }


    /* ----------------------------------
       SORT
    ---------------------------------- */

    if (authorSort) {

        authorSort.addEventListener(
            "change",
            () => {

                selectedSort =
                    authorSort.value || "az";

                applyFilters();

            }
        );

    }

}


/* ==========================================
   FILTER + SORT
========================================== */

function applyFilters() {

    const searchTerm =
        (
            authorSearch?.value ||
            ""
        )
            .trim()
            .toLowerCase();


    /* ----------------------------------
       SEARCH
    ---------------------------------- */

    filteredAuthors =
        authors.filter(author => {

            const name =
                (
                    author.name ||
                    ""
                )
                    .toLowerCase();

            return name.includes(
                searchTerm
            );

        });


    /* ----------------------------------
       SORT
    ---------------------------------- */

    filteredAuthors.sort(
        (a, b) => {

            const nameA =
                (
                    a.name ||
                    ""
                )
                    .toLowerCase();

            const nameB =
                (
                    b.name ||
                    ""
                )
                    .toLowerCase();


            if (selectedSort === "za") {

                return nameB.localeCompare(
                    nameA
                );

            }


            return nameA.localeCompare(
                nameB
            );

        }
    );


    renderAuthors();

}


/* ==========================================
   CREATE AUTHOR ROW
========================================== */
function createAuthorRow(author, index) {

    const hymnCount =
        hymns.filter(
            hymn =>
                String(hymn.author_id) ===
                String(author.id)
        ).length;


    const authorName =
        escapeHtml(
            author.name ||
            "Unknown Author"
        );


    const authorEnglishName =
        escapeHtml(
            author.english_name ||
            ""
        );


    const authorUrl =
        `author.html?id=${encodeURIComponent(
            author.id
        )}`;


    return `
        <a
            href="${authorUrl}"
            class="author-list-row"
        >

            <div class="author-list-number">
                ${index + 1}
            </div>


            <div class="author-list-name">

                <span class="author-telugu-name">
                    ${authorName}
                </span>

                ${
                    authorEnglishName
                        ? `
                            <span class="author-english-name">
                                ${authorEnglishName}
                            </span>
                          `
                        : ""
                }

            </div>


            <div class="author-list-count">

                <i class="fas fa-music"></i>

                <span>
                    ${hymnCount}
                    ${
                        hymnCount === 1
                            ? "Hymn"
                            : "Hymns"
                    }
                </span>

            </div>


            <div class="author-list-arrow">

                <i class="fas fa-arrow-right"></i>

            </div>

        </a>
    `;
}

/* ==========================================
   RENDER AUTHORS
========================================== */

function renderAuthors() {

    if (!authorsList) {
        return;
    }


    /* ----------------------------------
       EMPTY
    ---------------------------------- */

    if (
        filteredAuthors.length === 0
    ) {

        authorsList.innerHTML = "";


        if (empty) {

            empty.style.display =
                "block";

        }

        return;

    }


    if (empty) {

        empty.style.display =
            "none";

    }


    /* ----------------------------------
       RENDER
    ---------------------------------- */

    authorsList.innerHTML =
        filteredAuthors
            .map(
                (author, index) =>
                    createAuthorRow(
                        author,
                        index
                    )
            )
            .join("");

}


/* ==========================================
   LOADING
========================================== */

function showLoading(
    isLoading
) {

    if (!loading) {
        return;
    }


    loading.style.display =
        isLoading
            ? "block"
            : "none";

}


/* ==========================================
   ERROR
========================================== */

function showError() {

    if (!authorsList) {
        return;
    }


    authorsList.innerHTML = `
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


/* ==========================================
   ESCAPE HTML
========================================== */

function escapeHtml(value) {

    return String(value)

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