/* ==========================================================
   ADMIN BOOKS
   Andhra Kraistava Keerthanalu CMS
========================================================== */

import { supabase } from "./supabase.js";
import { showToast } from "./utils.js";
import { requireAuth, logout } from "./auth.js";


/* ==========================================================
   DOM
========================================================== */

const addBookButton =
    document.getElementById("addBookButton");

const emptyAddBookButton =
    document.getElementById("emptyAddBookButton");

const cancelBookButton =
    document.getElementById("cancelBookButton");

const retryBooksButton =
    document.getElementById("retryBooksButton");

const bookFormPanel =
    document.getElementById("bookFormPanel");

const bookForm =
    document.getElementById("bookForm");

const bookFormTitle =
    document.getElementById("bookFormTitle");

const bookId =
    document.getElementById("bookId");

const bookName =
    document.getElementById("bookName");

const bookAuthor =
    document.getElementById("bookAuthor");

const bookCategory =
    document.getElementById("bookCategory");

const bookDescription =
    document.getElementById("bookDescription");

const bookCover =
    document.getElementById("bookCover");

const bookCoverPreview =
    document.getElementById("bookCoverPreview");

const bookCoverPreviewImage =
    document.getElementById(
        "bookCoverPreviewImage"
    );

const saveBookButton =
    document.getElementById("saveBookButton");

const booksLoading =
    document.getElementById("booksLoading");

const booksEmpty =
    document.getElementById("booksEmpty");

const booksError =
    document.getElementById("booksError");

const booksErrorMessage =
    document.getElementById("booksErrorMessage");

const booksTableWrapper =
    document.getElementById(
        "booksTableWrapper"
    );

const booksTableBody =
    document.getElementById(
        "booksTableBody"
    );

const booksCount =
    document.getElementById("booksCount");


/* ==========================================================
   STATE
========================================================== */

let books = [];

let editingBook = null;


/* ==========================================================
   INITIALIZE
========================================================== */

document.addEventListener(
    "DOMContentLoaded",
    initializeBooks
);


async function initializeBooks() {

    try {

        await requireAuth();

    } catch (error) {

        console.error(
            "Authentication failed:",
            error
        );

        return;

    }


    setupEvents();

    await loadBooks();

}


/* ==========================================================
   EVENTS
========================================================== */

function setupEvents() {

    addBookButton?.addEventListener(
        "click",
        openAddBookForm
    );


    emptyAddBookButton?.addEventListener(
        "click",
        openAddBookForm
    );


    cancelBookButton?.addEventListener(
        "click",
        closeBookForm
    );


    retryBooksButton?.addEventListener(
        "click",
        loadBooks
    );


    bookForm?.addEventListener(
        "submit",
        handleBookSubmit
    );


    bookCover?.addEventListener(
        "change",
        handleCoverPreview
    );

}


/* ==========================================================
   LOAD BOOKS
========================================================== */

async function loadBooks() {

    showLoading();


    try {

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

            .order(
                "created_at",
                {
                    ascending: false
                }
            );


        if (error) {
            throw error;
        }


        books = data || [];


        /*
         * Load media records separately.
         *
         * This avoids relying on a particular
         * foreign-key relationship name.
         */

        await attachMediaToBooks();


        renderBooks();

    } catch (error) {

        console.error(
            "Failed to load books:",
            error
        );

        showError(
            error?.message ||
            "Unable to load books."
        );

    }

}


/* ==========================================================
   ATTACH MEDIA
========================================================== */

async function attachMediaToBooks() {

    const mediaIds =
        books

            .map(book => book.media_id)

            .filter(Boolean);


    if (!mediaIds.length) {
        return;
    }


    const {
        data,
        error
    } = await supabase

        .from("media")

        .select(`
            id,
            file_name,
            storage_path,
            file_type
        `)

        .in(
            "id",
            mediaIds
        );


    if (error) {

        console.warn(
            "Could not load book media:",
            error
        );

        return;

    }


    const mediaMap =
        new Map(
            (data || []).map(
                media => [
                    media.id,
                    media
                ]
            )
        );


    books =
        books.map(book => {

            const media =
                mediaMap.get(
                    book.media_id
                );


            if (!media) {
                return book;
            }


            const {
                data: publicUrlData
            } =
                supabase
                    .storage
                    .from("media")
                    .getPublicUrl(
                        media.storage_path
                    );


            return {

                ...book,

                media,

                coverUrl:
                    publicUrlData?.publicUrl ||
                    ""

            };

        });

}


/* ==========================================================
   RENDER
========================================================== */

function renderBooks() {

    booksCount.textContent =
        books.length;


    if (!books.length) {

        showEmpty();

        return;

    }


    booksTableBody.innerHTML =
        books
            .map(
                (book, index) =>
                    createBookRow(
                        book,
                        index
                    )
            )
            .join("");


    attachRowEvents();


    hideStates();

    booksTableWrapper.hidden =
        false;

}


/* ==========================================================
   BOOK ROW
========================================================== */

function createBookRow(
    book,
    index
) {

    const cover =
        book.coverUrl
            ? `
                <img
                    src="${escapeAttribute(book.coverUrl)}"
                    alt="${escapeAttribute(
                        book.name ||
                        "Book cover"
                    )}"
                    class="book-table-cover"
                    loading="lazy"
                >
            `
            : `
                <div class="book-table-placeholder">
                    <span>📖</span>
                </div>
            `;


    return `

        <tr>

            <td>
                ${cover}
            </td>


            <td>

                <div class="book-table-title">

                    <strong>
                        ${escapeHtml(
                            book.name ||
                            "Untitled Book"
                        )}
                    </strong>


                    ${
                        book.description
                            ? `
                                <small>
                                    ${escapeHtml(
                                        truncate(
                                            book.description,
                                            90
                                        )
                                    )}
                                </small>
                            `
                            : ""
                    }

                </div>

            </td>


            <td>

                ${
                    book.author
                        ? escapeHtml(
                            book.author
                        )
                        : "—"
                }

            </td>


            <td>

                ${
                    book.category
                        ? `
                            <span class="book-category-badge">
                                ${escapeHtml(
                                    book.category
                                )}
                            </span>
                        `
                        : "—"
                }

            </td>


            <td>

                ${formatDate(
                    book.created_at
                )}

            </td>


            <td>

                <div
                    class="table-actions"
                    data-book-index="${index}"
                >

                    <button
                        type="button"
                        class="btn btn-sm btn-secondary edit-book"
                        data-id="${book.id}"
                    >
                        Edit
                    </button>


                    <button
                        type="button"
                        class="btn btn-sm btn-danger delete-book"
                        data-id="${book.id}"
                    >
                        Delete
                    </button>

                </div>

            </td>

        </tr>

    `;

}


/* ==========================================================
   ROW EVENTS
========================================================== */

function attachRowEvents() {

    document
        .querySelectorAll(
            ".edit-book"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const id =
                        Number(
                            button.dataset.id
                        );

                    openEditBook(
                        id
                    );

                }
            );

        });


    document
        .querySelectorAll(
            ".delete-book"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const id =
                        Number(
                            button.dataset.id
                        );

                    deleteBook(
                        id
                    );

                }
            );

        });

}


/* ==========================================================
   ADD BOOK
========================================================== */

function openAddBookForm() {

    editingBook = null;


    bookForm.reset();


    bookId.value = "";


    bookFormTitle.textContent =
        "Add Book";


    saveBookButton.textContent =
        "Save Book";


    clearCoverPreview();


    bookCover.required =
        false;


    bookFormPanel.hidden =
        false;


    bookFormPanel.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });


    setTimeout(
        () => bookName?.focus(),
        250
    );

}


/* ==========================================================
   EDIT BOOK
========================================================== */

function openEditBook(id) {

    const book =
        books.find(
            item =>
                Number(item.id) ===
                Number(id)
        );


    if (!book) {

        showToast(
            "Book could not be found.",
            "error"
        );

        return;

    }


    editingBook =
        book;


    bookId.value =
        book.id;


    bookName.value =
        book.name || "";


    bookAuthor.value =
        book.author || "";


    bookCategory.value =
        book.category || "";


    bookDescription.value =
        book.description || "";


    bookCover.value =
        "";


    bookFormTitle.textContent =
        "Edit Book";


    saveBookButton.textContent =
        "Update Book";


    bookCover.required =
        false;


    if (book.coverUrl) {

        showCoverPreview(
            book.coverUrl
        );

    } else {

        clearCoverPreview();

    }


    bookFormPanel.hidden =
        false;


    bookFormPanel.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


/* ==========================================================
   CLOSE FORM
========================================================== */

function closeBookForm() {

    editingBook = null;


    bookForm.reset();


    bookId.value = "";


    bookFormTitle.textContent =
        "Add Book";


    saveBookButton.textContent =
        "Save Book";


    clearCoverPreview();


    bookFormPanel.hidden =
        true;

}


/* ==========================================================
   SUBMIT
========================================================== */

async function handleBookSubmit(
    event
) {

    event.preventDefault();


    const name =
        bookName.value.trim();


    const author =
        bookAuthor.value.trim();


    const category =
        bookCategory.value.trim();


    const description =
        bookDescription.value.trim();


    if (!name) {

        showToast(
            "Please enter the book name.",
            "error"
        );

        bookName.focus();

        return;

    }


    setSavingState(
        true
    );


    try {

        let mediaId =
            editingBook?.media_id ||
            null;


        /*
         * Upload a new cover only when
         * the administrator selected one.
         */

        if (
            bookCover.files &&
            bookCover.files.length
        ) {

            mediaId =
                await uploadBookCover(
                    bookCover.files[0]
                );

        }


        const payload = {

            name,

            description:
                description || null,

            category:
                category || null,

            author:
                author || null,

            media_id:
                mediaId

        };


        let error;


        if (editingBook) {

            ({
                error
            } = await supabase

                .from("books")

                .update(
                    payload
                )

                .eq(
                    "id",
                    editingBook.id
                ));

        } else {

            ({
                error
            } = await supabase

                .from("books")

                .insert(
                    payload
                ));

        }


        if (error) {
            throw error;
        }


        showToast(
            editingBook
                ? "Book updated successfully."
                : "Book added successfully.",
            "success"
        );


        closeBookForm();


        await loadBooks();


    } catch (error) {

        console.error(
            "Book save failed:",
            error
        );


        showToast(
            error?.message ||
            "Unable to save the book.",
            "error"
        );

    } finally {

        setSavingState(
            false
        );

    }

}


/* ==========================================================
   UPLOAD COVER
========================================================== */

async function uploadBookCover(
    file
) {

    if (
        !file ||
        !file.type.startsWith(
            "image/"
        )
    ) {

        throw new Error(
            "Please select a valid image file."
        );

    }


    /*
     * Keep file names unique.
     */

    const extension =
        getFileExtension(
            file.name
        );


    const safeName =
        slugify(
            file.name
                .replace(
                    /\.[^/.]+$/,
                    ""
                )
        );


    const filePath =
        `books/${Date.now()}-${safeName}.${extension}`;


    const {
        error: uploadError
    } = await supabase

        .storage

        .from("media")

        .upload(
            filePath,
            file,
            {
                cacheControl:
                    "3600",

                upsert:
                    false

            }
        );


    if (uploadError) {
        throw uploadError;
    }


    /*
     * Register the uploaded file in the
     * existing media table.
     *
     * We intentionally keep this aligned
     * with the project's existing media
     * architecture.
     */

    const {
        data: mediaRecord,
        error: mediaError
    } = await supabase

        .from("media")

        .insert({

            file_name:
                file.name,

            file_type:
                file.type,

            storage_path:
                filePath

        })

        .select(
            "id"
        )

        .single();


    if (mediaError) {

        /*
         * If the media database record fails,
         * remove the orphaned Storage file.
         */

        await supabase

            .storage

            .from("media")

            .remove([
                filePath
            ]);


        throw mediaError;

    }


    return mediaRecord.id;

}


/* ==========================================================
   DELETE BOOK
========================================================== */

async function deleteBook(
    id
) {

    const book =
        books.find(
            item =>
                Number(item.id) ===
                Number(id)
        );


    if (!book) {
        return;
    }


    const confirmed =
        window.confirm(
            `Delete "${book.name}"?\n\nThis action cannot be undone.`
        );


    if (!confirmed) {
        return;
    }


    try {

        /*
         * Delete the database record first.
         */

        const {
            error
        } = await supabase

            .from("books")

            .delete()

            .eq(
                "id",
                book.id
            );


        if (error) {
            throw error;
        }


        /*
         * If the book has a media record,
         * remove the media database record
         * and Storage file as well.
         *
         * This prevents unused book covers
         * from accumulating.
         */

        if (
            book.media &&
            book.media.storage_path
        ) {

            await supabase

                .storage

                .from("media")

                .remove([
                    book.media.storage_path
                ]);

        }


        if (book.media_id) {

            const {
                error: mediaDeleteError
            } = await supabase

                .from("media")

                .delete()

                .eq(
                    "id",
                    book.media_id
                );


            if (mediaDeleteError) {

                console.warn(
                    "Book deleted, but media record could not be removed:",
                    mediaDeleteError
                );

            }

        }


        showToast(
            "Book deleted successfully.",
            "success"
        );


        await loadBooks();


    } catch (error) {

        console.error(
            "Book deletion failed:",
            error
        );


        showToast(
            error?.message ||
            "Unable to delete the book.",
            "error"
        );

    }

}


/* ==========================================================
   COVER PREVIEW
========================================================== */

function handleCoverPreview() {

    const file =
        bookCover.files?.[0];


    if (!file) {

        /*
         * When editing, keep the existing
         * cover visible if there is one.
         */

        if (
            editingBook?.coverUrl
        ) {

            showCoverPreview(
                editingBook.coverUrl
            );

        } else {

            clearCoverPreview();

        }

        return;

    }


    if (
        !file.type.startsWith(
            "image/"
        )
    ) {

        showToast(
            "Please select an image file.",
            "error"
        );

        bookCover.value = "";

        return;

    }


    const objectUrl =
        URL.createObjectURL(
            file
        );


    showCoverPreview(
        objectUrl
    );


    bookCoverPreviewImage.onload =
        () => {

            URL.revokeObjectURL(
                objectUrl
            );

        };

}


function showCoverPreview(
    url
) {

    bookCoverPreviewImage.src =
        url;


    bookCoverPreview.hidden =
        false;

}


function clearCoverPreview() {

    bookCoverPreview.hidden =
        true;

    bookCoverPreviewImage.src =
        "";

}


/* ==========================================================
   STATES
========================================================== */

function showLoading() {

    booksLoading.hidden =
        false;

    booksEmpty.hidden =
        true;

    booksError.hidden =
        true;

    booksTableWrapper.hidden =
        true;

}


function showEmpty() {

    booksLoading.hidden =
        true;

    booksEmpty.hidden =
        false;

    booksError.hidden =
        true;

    booksTableWrapper.hidden =
        true;

}


function showError(
    message
) {

    booksLoading.hidden =
        true;

    booksEmpty.hidden =
        true;

    booksError.hidden =
        false;

    booksTableWrapper.hidden =
        true;


    if (booksErrorMessage) {

        booksErrorMessage.textContent =
            message;

    }

}


function hideStates() {

    booksLoading.hidden =
        true;

    booksEmpty.hidden =
        true;

    booksError.hidden =
        true;

}


/* ==========================================================
   SAVE STATE
========================================================== */

function setSavingState(
    saving
) {

    if (!saveBookButton) {
        return;
    }


    saveBookButton.disabled =
        saving;


    saveBookButton.textContent =
        saving
            ? (
                editingBook
                    ? "Updating..."
                    : "Saving..."
            )
            : (
                editingBook
                    ? "Update Book"
                    : "Save Book"
            );

}


/* ==========================================================
   HELPERS
========================================================== */

function formatDate(
    value
) {

    if (!value) {
        return "—";
    }


    const date =
        new Date(value);


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {
        return "—";
    }


    return new Intl.DateTimeFormat(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    ).format(
        date
    );

}


function truncate(
    value,
    length
) {

    const text =
        String(
            value || ""
        );


    if (
        text.length <= length
    ) {

        return text;

    }


    return (
        text.slice(
            0,
            length
        ).trim() +
        "..."
    );

}


function getFileExtension(
    fileName
) {

    const parts =
        String(
            fileName || ""
        ).split(".");


    return (
        parts.length > 1
            ? parts.pop()
            : "jpg"
    )
        .toLowerCase()
        .replace(
            /[^a-z0-9]/g,
            ""
        );

}


function slugify(
    value
) {

    return String(
        value || "book"
    )

        .toLowerCase()

        .trim()

        .replace(
            /[^a-z0-9]+/g,
            "-"
        )

        .replace(
            /^-+|-+$/g,
            ""
        )

        || "book";

}


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


function escapeAttribute(
    value
) {

    return escapeHtml(
        value
    );

}