import { supabase } from "../supabase.js";


/* ==========================================================
   DOM ELEMENTS
========================================================== */

const booksGrid = document.getElementById("booksGrid");
const loadingState = document.getElementById("booksLoading");
const errorState = document.getElementById("booksError");
const emptyState = document.getElementById("booksEmpty");
const emptyMessage = document.getElementById("booksEmptyMessage");
const searchInput = document.getElementById("bookSearch");
const retryButton = document.getElementById("booksRetry");


/* ==========================================================
   STATE
========================================================== */

let books = [];
let filteredBooks = [];


/* ==========================================================
   INITIALIZATION
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    if (!booksGrid) {

        console.error(
            "[Books] booksGrid element was not found."
        );

        return;

    }

    loadBooks();

});


/* ==========================================================
   LOAD BOOKS FROM SUPABASE
========================================================== */

async function loadBooks() {

    showLoading();

    console.log(
        "[Books] Loading books from Supabase..."
    );


    try {

        const {
            data,
            error
        } = await supabase

            .from("books")

            .select(`
    id,
    name,
    slug,
    description,
    cover_url,
    created_at
`)

            .order(
                "created_at",
                {
                    ascending: false
                }
            );


        if (error) {

            console.error(
                "[Books] Supabase query failed:",
                error
            );

            throw error;

        }


        console.log(
            "[Books] Books received:",
            data
        );


        books = data || [];

        filteredBooks = [...books];


        if (books.length === 0) {

            showEmpty();

            return;

        }


        renderBooks();


    } catch (error) {

        console.error(
            "[Books] Failed to load books:",
            error
        );

        showError(
            error?.message ||
            "Unable to load books."
        );

    }

}


/* ==========================================================
   RENDER BOOKS
========================================================== */

function renderBooks() {

    if (!filteredBooks.length) {

        showSearchEmpty();

        return;

    }


    booksGrid.innerHTML =
        filteredBooks
            .map(createBookCard)
            .join("");


    hideStates();

    booksGrid.classList.remove("hidden");

}


/* ==========================================================
   BOOK CARD
========================================================== */

function createBookCard(book) {

    const title =
        book.name ||
        "Untitled Book";


    const description =
        book.description ||
        "A publication documenting Telugu Christian hymn heritage.";


    return `

        <article class="book-card">

           <div class="book-cover">

    ${
        book.cover_url
            ? `
                <img
                    src="${escapeAttribute(book.cover_url)}"
                    alt="${escapeAttribute(title)}"
                    class="book-cover-image"
                    loading="lazy"
                >
            `
            : `
                <div class="book-cover-placeholder">
                    <span>📖</span>
                </div>
            `
    }

</div>


            <div class="book-content">

                <span class="book-category">
                    Publication
                </span>


                <h3>
                    ${escapeHtml(title)}
                </h3>


                <p>
                    ${escapeHtml(description)}
                </p>


                ${
                    book.slug
                        ? `
                            <a
                                href="#"
                                class="book-link"
                                data-slug="${escapeAttribute(book.slug)}"
                            >
                                View Publication
                            </a>
                        `
                        : ""
                }

            </div>

        </article>

    `;

}


/* ==========================================================
   SEARCH
========================================================== */

if (searchInput) {

    searchInput.addEventListener(
        "input",
        handleSearch
    );

}


function handleSearch(event) {

    const query =
        event.target.value
            .trim()
            .toLowerCase();


    if (!query) {

        filteredBooks = [...books];

        renderBooks();

        return;

    }


    filteredBooks =
        books.filter(book => {

            const name =
                String(
                    book.name || ""
                ).toLowerCase();


            const slug =
                String(
                    book.slug || ""
                ).toLowerCase();


            const description =
                String(
                    book.description || ""
                ).toLowerCase();


            return (
                name.includes(query) ||
                slug.includes(query) ||
                description.includes(query)
            );

        });


    renderBooks();

}


/* ==========================================================
   RETRY
========================================================== */

if (retryButton) {

    retryButton.addEventListener(
        "click",
        loadBooks
    );

}


/* ==========================================================
   UI STATES
========================================================== */

function showLoading() {

    if (booksGrid) {
        booksGrid.classList.add("hidden");
    }

    if (loadingState) {
        loadingState.classList.remove("hidden");
    }

    if (errorState) {
        errorState.classList.add("hidden");
    }

    if (emptyState) {
        emptyState.classList.add("hidden");
    }

}


function showError(message) {

    if (booksGrid) {
        booksGrid.classList.add("hidden");
    }

    if (loadingState) {
        loadingState.classList.add("hidden");
    }

    if (errorState) {
        errorState.classList.remove("hidden");
    }

    if (emptyState) {
        emptyState.classList.add("hidden");
    }


    const errorMessage =
        document.getElementById(
            "booksErrorMessage"
        );


    if (errorMessage) {

        errorMessage.textContent =
            message;

    }

}


function showEmpty() {

    if (booksGrid) {
        booksGrid.classList.add("hidden");
    }

    if (loadingState) {
        loadingState.classList.add("hidden");
    }

    if (errorState) {
        errorState.classList.add("hidden");
    }

    if (emptyState) {
        emptyState.classList.remove("hidden");
    }


    if (emptyMessage) {

        emptyMessage.textContent =
            "Books and publications will appear here as they are added to the library.";

    }

}


function showSearchEmpty() {

    if (booksGrid) {
        booksGrid.classList.add("hidden");
    }

    if (loadingState) {
        loadingState.classList.add("hidden");
    }

    if (errorState) {
        errorState.classList.add("hidden");
    }

    if (emptyState) {
        emptyState.classList.remove("hidden");
    }


    if (emptyMessage) {

        emptyMessage.textContent =
            "No books match your search.";

    }

}


function hideStates() {

    if (loadingState) {
        loadingState.classList.add("hidden");
    }

    if (errorState) {
        errorState.classList.add("hidden");
    }

    if (emptyState) {
        emptyState.classList.add("hidden");
    }

}


/* ==========================================================
   SECURITY HELPERS
========================================================== */

function escapeHtml(value) {

    return String(value ?? "")

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


function escapeAttribute(value) {

    return escapeHtml(value);

}