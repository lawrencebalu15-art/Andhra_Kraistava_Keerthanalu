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
   INITIALIZE
========================================================== */

loadBooks();


/* ==========================================================
   LOAD BOOKS
========================================================== */

async function loadBooks() {

    showLoading();

    try {

        console.log("[Books] Loading books from Supabase...");


        const {
            data,
            error
        } = await supabase
            .from("books")
            .select(`
                id,
                name,
                description,
                category,
                author,
                media_id,
                created_at
            `)
            .order("created_at", {
                ascending: false
            });


        if (error) {

            console.error(
                "[Books] Supabase books query failed:",
                error
            );

            throw error;

        }


        console.log(
            "[Books] Books received:",
            data
        );


        if (!data || data.length === 0) {

            books = [];
            filteredBooks = [];

            showEmpty();

            return;

        }


        /* ==================================================
           LOAD MEDIA

           Media failure should NOT prevent books from
           appearing.
        ================================================== */

        const mediaIds = [
            ...new Set(
                data
                    .map(book => book.media_id)
                    .filter(Boolean)
            )
        ];


        const mediaMap = new Map();


        if (mediaIds.length > 0) {

            const {
                data: media,
                error: mediaError
            } = await supabase
                .from("media")
                .select(`
                    id,
                    storage_path
                `)
                .in("id", mediaIds);


            if (mediaError) {

                console.warn(
                    "[Books] Media query failed. Books will still be displayed:",
                    mediaError
                );

            } else if (media) {

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
                        publicUrlData &&
                        publicUrlData.publicUrl
                    ) {

                        mediaMap.set(
                            item.id,
                            publicUrlData.publicUrl
                        );

                    }

                });

            }

        }


        /* ==================================================
           COMBINE BOOK + MEDIA DATA
        ================================================== */

        books = data.map(book => ({

            ...book,

            imageUrl:
                mediaMap.get(book.media_id) || null

        }));


        filteredBooks = [...books];


        console.log(
            "[Books] Final books:",
            books
        );


        renderBooks();


    } catch (error) {

        console.error(
            "[Books] Failed to load books:",
            error
        );

        showError();

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


    const category =
        book.category ||
        "Publication";


    const description =
        book.description ||
        "A publication documenting Telugu Christian hymn heritage.";


    const author =
        book.author ||
        "";


    const imageUrl =
        book.imageUrl ||
        "assets/images/books/book-placeholder.jpg";


    return `

        <article class="book-card">

            <div class="book-cover">

                <img
                    src="${escapeAttribute(imageUrl)}"
                    alt="${escapeAttribute(title)}"
                    loading="lazy"
                    onerror="
                        this.onerror=null;
                        this.src='assets/images/books/book-placeholder.jpg';
                    "
                >

            </div>


            <div class="book-content">

                <span class="book-category">
                    ${escapeHtml(category)}
                </span>


                <h3>
                    ${escapeHtml(title)}
                </h3>


                ${
                    author
                        ? `
                            <p
                                style="
                                    margin-bottom:8px;
                                    font-weight:600;
                                "
                            >
                                ${escapeHtml(author)}
                            </p>
                        `
                        : ""
                }


                <p>
                    ${escapeHtml(description)}
                </p>

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
                (book.name || "")
                    .toLowerCase();


            const description =
                (book.description || "")
                    .toLowerCase();


            const category =
                (book.category || "")
                    .toLowerCase();


            const author =
                (book.author || "")
                    .toLowerCase();


            return (
                name.includes(query) ||
                description.includes(query) ||
                category.includes(query) ||
                author.includes(query)
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

    booksGrid.classList.add("hidden");

    loadingState.classList.remove("hidden");

    errorState.classList.add("hidden");

    emptyState.classList.add("hidden");

}


function showError() {

    booksGrid.classList.add("hidden");

    loadingState.classList.add("hidden");

    errorState.classList.remove("hidden");

    emptyState.classList.add("hidden");

}


function showEmpty() {

    booksGrid.classList.add("hidden");

    loadingState.classList.add("hidden");

    errorState.classList.add("hidden");

    emptyState.classList.remove("hidden");

    emptyMessage.textContent =
        "Books and publications will appear here as they are added to the library.";

}


function showSearchEmpty() {

    booksGrid.classList.add("hidden");

    loadingState.classList.add("hidden");

    errorState.classList.add("hidden");

    emptyState.classList.remove("hidden");

    emptyMessage.textContent =
        "No books match your search.";

}


function hideStates() {

    loadingState.classList.add("hidden");

    errorState.classList.add("hidden");

    emptyState.classList.add("hidden");

}


/* ==========================================================
   SECURITY HELPERS
========================================================== */

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