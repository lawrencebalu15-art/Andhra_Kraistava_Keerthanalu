import { supabase } from "../supabase.js";

/* ==========================================================
   PUBLIC BOOKS PAGE
   Andhra Kraistava Keerthanalu

   - Loads books from Supabase
   - Resolves Supabase Storage paths to public URLs
   - Renders responsive book cards
   - Supports search
   - Opens covers in a dynamically-created lightbox
   - Handles missing/broken cover images gracefully
========================================================== */


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
        console.error("[Books] #booksGrid was not found.");
        return;
    }

    createBookLightbox();
    setupEvents();
    loadBooks();
});


/* ==========================================================
   EVENTS
========================================================== */

function setupEvents() {
    searchInput?.addEventListener("input", handleSearch);

    retryButton?.addEventListener("click", () => {
        loadBooks();
    });

    /*
     * Event delegation is used because book cards are generated
     * dynamically after the Supabase request completes.
     */
    booksGrid.addEventListener("click", handleGridClick);
}


/* ==========================================================
   LOAD BOOKS FROM SUPABASE
========================================================== */

async function loadBooks() {
    showLoading();

    console.log("[Books] Loading books from Supabase...");

    try {
        const { data, error } = await supabase
            .from("books")
            .select(`
                id,
                name,
                slug,
                description,
                cover_url,
                created_at
            `)
            .order("created_at", {
                ascending: false
            });

        if (error) {
            throw error;
        }

        /*
         * The CMS may store cover_url as:
         *
         * 1. A complete public URL
         * 2. A Supabase Storage path
         * 3. A relative URL
         *
         * Normalize all three cases before rendering.
         */
        books = (data || []).map(book => ({
            ...book,
            coverUrl: getPublicCoverUrl(book.cover_url)
        }));

        filteredBooks = [...books];

        console.log("[Books] Books received:", books);

        if (!books.length) {
            showEmpty();
            return;
        }

        renderBooks();

    } catch (error) {
        console.error("[Books] Failed to load books:", error);

        showError(
            error?.message ||
            "Unable to load books. Please try again."
        );
    }
}


/* ==========================================================
   COVER URL RESOLUTION
========================================================== */

/**
 * Converts a stored cover value into a browser-usable URL.
 *
 * Supabase Storage uses the "media" bucket in this project.
 * If cover_url already contains a complete URL, it is preserved.
 */
function getPublicCoverUrl(value) {
    if (!value) {
        return "";
    }

    const rawValue = String(value).trim();

    if (!rawValue) {
        return "";
    }

    /*
     * Already a complete URL.
     */
    if (
        rawValue.startsWith("http://") ||
        rawValue.startsWith("https://") ||
        rawValue.startsWith("data:") ||
        rawValue.startsWith("blob:")
    ) {
        return rawValue;
    }

    /*
     * Protocol-relative URL.
     */
    if (rawValue.startsWith("//")) {
        return `${window.location.protocol}${rawValue}`;
    }

    /*
     * Supabase Storage URL saved as a relative path.
     *
     * Example:
     * /storage/v1/object/public/media/books/cover.jpg
     */
    if (rawValue.startsWith("/")) {
        if (rawValue.includes("/storage/v1/")) {
            return new URL(
                rawValue,
                window.location.origin
            ).href;
        }

        /*
         * Other relative website assets.
         */
        return new URL(
            rawValue,
            window.location.origin
        ).href;
    }

    /*
     * If this is a Storage path such as:
     *
     * books/cover.jpg
     *
     * convert it using the existing Supabase client.
     */
    try {
        const { data } = supabase.storage
            .from("media")
            .getPublicUrl(rawValue);

        return data?.publicUrl || rawValue;

    } catch (error) {
        console.warn(
            "[Books] Could not resolve Storage path:",
            rawValue,
            error
        );

        return rawValue;
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

    booksGrid.innerHTML = filteredBooks
        .map((book, index) => createBookCard(book, index))
        .join("");

    hideStates();

    booksGrid.classList.remove("hidden");

    /*
     * Attach image error handlers after dynamically
     * creating the book cards.
     */
    booksGrid
        .querySelectorAll(".book-cover-image")
        .forEach(image => {
            image.addEventListener(
                "error",
                handleCoverImageError,
                { once: true }
            );
        });
}


/* ==========================================================
   BOOK CARD
========================================================== */

function createBookCard(book, index) {
    const title =
        book.name ||
        "Untitled Book";

    const description =
        book.description ||
        "A publication documenting Telugu Christian hymn heritage.";

    const coverUrl =
        book.coverUrl ||
        "";

    return `
        <article class="book-card">

            <div class="book-cover">

                ${
                    coverUrl
                        ? `
                            <button
                                type="button"
                                class="book-cover-trigger"
                                data-book-index="${index}"
                                aria-label="View full cover of ${escapeAttribute(title)}"
                            >

                                <img
                                    src="${escapeAttribute(coverUrl)}"
                                    alt="${escapeAttribute(title)}"
                                    class="book-cover-image"
                                    loading="lazy"
                                    decoding="async"
                                >

                                <span
                                    class="book-cover-overlay"
                                    aria-hidden="true"
                                >
                                    <i class="fa-solid fa-expand"></i>
                                    <span>View Cover</span>
                                </span>

                            </button>
                        `
                        : `
                            <div
                                class="book-cover-placeholder"
                                aria-label="No cover available"
                            >
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
                                href="book.html?slug=${encodeURIComponent(book.slug)}"
                                class="book-link"
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
   BROKEN IMAGE HANDLING
========================================================== */

function handleCoverImageError(event) {
    const image = event.currentTarget;

    if (!image || image.dataset.failed === "true") {
        return;
    }

    image.dataset.failed = "true";

    const trigger = image.closest(
        ".book-cover-trigger"
    );

    if (!trigger) {
        return;
    }

    /*
     * Replace a broken image with the same visual
     * placeholder used when there is no cover.
     */
    trigger.outerHTML = `
        <div
            class="book-cover-placeholder"
            aria-label="Book cover unavailable"
        >
            <span>📖</span>
        </div>
    `;
}


/* ==========================================================
   BOOK COVER LIGHTBOX
========================================================== */

/*
 * The lightbox is created dynamically, so you do not
 * need additional lightbox HTML in books.html.
 */

let lightbox = null;
let lightboxImage = null;
let lightboxTitle = null;


function createBookLightbox() {
    /*
     * If books.html already contains a lightbox,
     * reuse it instead of creating another one.
     */
    if (
        document.getElementById(
            "bookCoverLightbox"
        )
    ) {
        lightbox =
            document.getElementById(
                "bookCoverLightbox"
            );

        lightboxImage =
            document.getElementById(
                "bookCoverLightboxImage"
            );

        lightboxTitle =
            document.getElementById(
                "bookCoverLightboxTitle"
            );

        setupLightboxEvents();

        return;
    }


    const wrapper =
        document.createElement("div");

    wrapper.id =
        "bookCoverLightbox";

    wrapper.className =
        "book-cover-lightbox";

    wrapper.setAttribute(
        "aria-hidden",
        "true"
    );


    wrapper.innerHTML = `
        <div
            class="book-cover-lightbox-backdrop"
            data-book-cover-close
        ></div>


        <div
            class="book-cover-lightbox-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="bookCoverLightboxTitle"
        >

            <button
                type="button"
                id="bookCoverLightboxClose"
                class="book-cover-lightbox-close"
                aria-label="Close book cover"
                data-book-cover-close
            >
                <i class="fa-solid fa-xmark"></i>
            </button>


            <div class="book-cover-lightbox-content">

                <img
                    id="bookCoverLightboxImage"
                    class="book-cover-lightbox-image"
                    src=""
                    alt=""
                >


                <div
                    id="bookCoverLightboxTitle"
                    class="book-cover-lightbox-title"
                ></div>

            </div>

        </div>
    `;


    document.body.appendChild(wrapper);


    lightbox =
        wrapper;

    lightboxImage =
        wrapper.querySelector(
            "#bookCoverLightboxImage"
        );

    lightboxTitle =
        wrapper.querySelector(
            "#bookCoverLightboxTitle"
        );


    setupLightboxEvents();
}


function setupLightboxEvents() {
    if (!lightbox) {
        return;
    }

    /*
     * Prevent duplicate event listeners.
     */
    if (lightbox.dataset.eventsReady === "true") {
        return;
    }

    lightbox.dataset.eventsReady = "true";


    /* ======================================================
       CLOSE BUTTON
    ====================================================== */

    const closeButton = document.getElementById(
        "bookCoverLightboxClose"
    );

    if (closeButton) {
        closeButton.addEventListener("click", function (event) {
            event.preventDefault();
            event.stopPropagation();

            closeBookCoverLightbox();
        });
    }


    /* ======================================================
       BACKDROP CLICK
    ====================================================== */

    const backdrop = lightbox.querySelector(
        ".book-cover-lightbox-backdrop"
    );

    if (backdrop) {
        backdrop.addEventListener("click", function (event) {
            event.preventDefault();
            event.stopPropagation();

            closeBookCoverLightbox();
        });
    }


    /* ======================================================
       LIGHTBOX CONTAINER
    ====================================================== */

    lightbox.addEventListener("click", function (event) {

        /*
         * If the actual lightbox background itself is clicked,
         * close it.
         */
        if (event.target === lightbox) {
            closeBookCoverLightbox();
        }

    });


    /* ======================================================
       IMAGE ERROR
    ====================================================== */

    if (lightboxImage) {
        lightboxImage.addEventListener("error", function () {

            lightboxImage.alt =
                "Book cover unavailable";

            lightboxImage.removeAttribute("src");

            lightboxImage.classList.add(
                "image-error"
            );

        });
    }
}

function openBookCoverLightbox(
    imageUrl,
    title
) {
    if (
        !lightbox ||
        !lightboxImage ||
        !imageUrl
    ) {
        return;
    }


    lightboxImage.classList.remove(
        "image-error"
    );


    lightboxImage.src =
        imageUrl;


    lightboxImage.alt =
        title
            ? `${title} — full cover`
            : "Full book cover";


    if (lightboxTitle) {
        lightboxTitle.textContent =
            title || "";
    }


    lightbox.classList.add(
        "is-open"
    );


    lightbox.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.classList.add(
        "book-cover-lightbox-open"
    );


    /*
     * Prevent the page from scrolling behind
     * the lightbox.
     */
    document.body.style.overflow =
        "hidden";
}


function closeBookCoverLightbox() {

    if (!lightbox) {
        return;
    }


    /* Remove visible state */
    lightbox.classList.remove(
        "is-open"
    );


    /* Update accessibility state */
    lightbox.setAttribute(
        "aria-hidden",
        "true"
    );


    /* Restore page scrolling */
    document.body.classList.remove(
        "book-cover-lightbox-open"
    );

    document.body.style.overflow = "";


    /* Clear image */
    if (lightboxImage) {

        lightboxImage.removeAttribute(
            "src"
        );

        lightboxImage.alt = "";

        lightboxImage.classList.remove(
            "image-error"
        );
    }


    /* Clear title */
    if (lightboxTitle) {
        lightboxTitle.textContent = "";
    }
}

/* ==========================================================
   BOOK GRID CLICK HANDLER
========================================================== */

function handleGridClick(event) {
    const trigger =
        event.target.closest(
            ".book-cover-trigger"
        );


    if (!trigger) {
        return;
    }


    event.preventDefault();


    const index =
        Number(
            trigger.dataset.bookIndex
        );


    const book =
        filteredBooks[index];


    if (
        !book ||
        !book.coverUrl
    ) {
        return;
    }


    openBookCoverLightbox(
        book.coverUrl,
        book.name || "Book cover"
    );
}


/* ==========================================================
   KEYBOARD HANDLING
========================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            lightbox?.classList.contains(
                "is-open"
            )
        ) {
            closeBookCoverLightbox();
        }

    }
);


/* ==========================================================
   SEARCH
========================================================== */

function handleSearch(event) {
    const query =
        event.target.value
            .trim()
            .toLowerCase();


    /*
     * Empty search restores all books.
     */
    if (!query) {
        filteredBooks =
            [...books];

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
   UI STATES
========================================================== */

function showLoading() {
    booksGrid?.classList.add(
        "hidden"
    );

    loadingState?.classList.remove(
        "hidden"
    );

    errorState?.classList.add(
        "hidden"
    );

    emptyState?.classList.add(
        "hidden"
    );
}


function showError(message) {
    booksGrid?.classList.add(
        "hidden"
    );

    loadingState?.classList.add(
        "hidden"
    );

    emptyState?.classList.add(
        "hidden"
    );

    errorState?.classList.remove(
        "hidden"
    );


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
    booksGrid?.classList.add(
        "hidden"
    );

    loadingState?.classList.add(
        "hidden"
    );

    errorState?.classList.add(
        "hidden"
    );

    emptyState?.classList.remove(
        "hidden"
    );


    if (emptyMessage) {
        emptyMessage.textContent =
            "Books and publications will appear here as they are added to the library.";
    }
}


function showSearchEmpty() {
    booksGrid?.classList.add(
        "hidden"
    );

    loadingState?.classList.add(
        "hidden"
    );

    errorState?.classList.add(
        "hidden"
    );

    emptyState?.classList.remove(
        "hidden"
    );


    if (emptyMessage) {
        emptyMessage.textContent =
            "No books match your search.";
    }
}


function hideStates() {
    loadingState?.classList.add(
        "hidden"
    );

    errorState?.classList.add(
        "hidden"
    );

    emptyState?.classList.add(
        "hidden"
    );
}


/* ==========================================================
   SECURITY HELPERS
========================================================== */

function escapeHtml(value) {
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


function escapeAttribute(value) {
    return escapeHtml(value);
}