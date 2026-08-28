/* =========================================================
   ADMIN BOOKS
   Andhra Kraistava Keerthanalu CMS
========================================================= */

import { supabase } from "./supabase.js";
import { showToast } from "./utils.js";
import { requireAuth } from "./auth.js";


/* =========================================================
   STATE
========================================================= */

let books = [];
let filteredBooks = [];

let editingBook = null;


/* =========================================================
   DOM
========================================================= */

const addBookButton =
    document.getElementById("addBookButton");

const emptyAddBookButton =
    document.getElementById("emptyAddBookButton");

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

const bookDescription =
    document.getElementById("bookDescription");

const saveBookButton =
    document.getElementById("saveBookButton");

const cancelBookButton =
    document.getElementById("cancelBookButton");

const booksLoading =
    document.getElementById("booksLoading");

const booksEmpty =
    document.getElementById("booksEmpty");

const booksError =
    document.getElementById("booksError");

const booksErrorMessage =
    document.getElementById("booksErrorMessage");

const booksTableWrapper =
    document.getElementById("booksTableWrapper");

const booksTableBody =
    document.getElementById("booksTableBody");

const booksCount =
    document.getElementById("booksCount");

const bookCover =
    document.getElementById("bookCover");

const bookCoverPreview =
    document.getElementById("bookCoverPreview");

const bookCoverPreviewImage =
    document.getElementById("bookCoverPreviewImage");

let selectedCoverFile = null;


/* =========================================================
   CREATE SLUG FIELD
   =========================================================

   Your database has a slug column, so we create the
   field dynamically if it is not already present in HTML.

========================================================= */

let bookSlug = document.getElementById("bookSlug");


function ensureSlugField() {

    if (bookSlug) {
        return;
    }

    if (!bookName) {
        return;
    }

    const nameGroup =
        bookName.closest(".form-group") ||
        bookName.parentElement;


    if (!nameGroup) {
        return;
    }


    const slugGroup =
        document.createElement("div");

    slugGroup.className =
        "form-group";


    slugGroup.innerHTML = `

        <label for="bookSlug">
            Slug
        </label>

        <input
            type="text"
            id="bookSlug"
            name="slug"
            placeholder="book-name"
            autocomplete="off"
        >

        <small>
            Used for the book's web address.
        </small>

    `;


    nameGroup.insertAdjacentElement(
        "afterend",
        slugGroup
    );


    bookSlug =
        document.getElementById(
            "bookSlug"
        );

}


/* =========================================================
   REMOVE UNSUPPORTED FIELDS
=========================================================

   The current database does NOT contain:

   author
   category
   media_id

   Therefore these fields should not be used.

   This also makes the current HTML safe while we
   transition it to the simpler Books structure.

========================================================= */

function removeUnsupportedFields() {

    const unsupportedIds = [
    "bookAuthor",
    "bookCategory"
];

    unsupportedIds.forEach(id => {

        const element =
            document.getElementById(id);


        if (!element) {
            return;
        }


        const group =
            element.closest(".form-group") ||
            element.parentElement;


        if (group) {
            group.remove();
        }

    });

}


/* =========================================================
   INITIALIZE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    async () => {

        try {

            await requireAuth();

            ensureSlugField();

            removeUnsupportedFields();

            setupEvents();

            await loadBooks();

        } catch (error) {

            console.error(
                "Books initialization error:",
                error
            );

            showError(
                error?.message ||
                "Unable to initialize the Books page."
            );

        }

    }
);


/* =========================================================
   EVENTS
========================================================= */

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

    bookCover?.addEventListener(
    "change",
    handleCoverSelection
);

    bookForm?.addEventListener(
        "submit",
        handleSubmit
    );


    bookName?.addEventListener(
        "input",
        () => {

            /*
             * Only automatically update the slug
             * while adding a new book.
             *
             * During editing, we don't unexpectedly
             * change an existing slug.
             */

            if (
                !editingBook &&
                bookSlug
            ) {

                bookSlug.value =
                    generateSlug(
                        bookName.value
                    );

            }

        }
    );

}



function handleCoverSelection(event) {

    const file = event.target.files?.[0];

    if (!file) {
        selectedCoverFile = null;
        return;
    }

    if (!file.type.startsWith("image/")) {

        showNotification(
            "Please select an image file.",
            "error"
        );

        event.target.value = "";

        return;
    }

    const maxSize =
        5 * 1024 * 1024;

    if (file.size > maxSize) {

        showNotification(
            "Book cover must be smaller than 5 MB.",
            "error"
        );

        event.target.value = "";

        return;
    }

    selectedCoverFile = file;

    const previewUrl =
        URL.createObjectURL(file);

    if (bookCoverPreviewImage) {
        bookCoverPreviewImage.src =
            previewUrl;
    }

    if (bookCoverPreview) {
        bookCoverPreview.hidden = false;
    }
}


async function uploadBookCover(file) {

    if (!file) {
        return null;
    }

    const extension =
        file.name
            .split(".")
            .pop()
            .toLowerCase();

    const safeExtension =
        ["jpg", "jpeg", "png", "webp"].includes(extension)
            ? extension
            : "jpg";

    const fileName =
        `book-${Date.now()}-${crypto.randomUUID()}.${safeExtension}`;

    const filePath =
        `covers/${fileName}`;


    const {
        error: uploadError
    } = await supabase.storage
        .from("book-covers")
        .upload(
            filePath,
            file,
            {
                cacheControl: "3600",
                upsert: false,
                contentType: file.type
            }
        );


    if (uploadError) {
        throw uploadError;
    }


    const {
        data
    } = supabase.storage
        .from("book-covers")
        .getPublicUrl(filePath);


    return data.publicUrl;
}
/* =========================================================
   LOAD BOOKS
========================================================= */

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
            throw error;
        }


        books =
            data || [];


        filteredBooks =
            [...books];


        if (!books.length) {

            showEmpty();

            return;

        }


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


/* =========================================================
   RENDER BOOKS
========================================================= */

function renderBooks() {

    booksCount.textContent =
        filteredBooks.length;


    booksTableBody.innerHTML =
        filteredBooks
            .map(
                (book, index) =>
                    createBookRow(
                        book,
                        index
                    )
            )
            .join("");


    hideStates();


    booksTableWrapper.hidden =
        false;


    attachRowEvents();

}


/* =========================================================
   CREATE TABLE ROW
========================================================= */

function createBookRow(
    book,
    index
) {

    const description =
        book.description
            ? escapeHtml(
                truncate(
                    book.description,
                    100
                )
            )
            : "No description";


    return `

        <tr>

            <td>

                <strong>
                    ${escapeHtml(
                        book.name ||
                        "Untitled Book"
                    )}
                </strong>

            </td>


            <td>

                <code>
                    ${escapeHtml(
                        book.slug ||
                        "—"
                    )}
                </code>

            </td>


            <td>

                <span>
                    ${description}
                </span>

            </td>


            <td>

                ${formatDate(
                    book.created_at
                )}

            </td>


            <td>

                <div
                    class="table-actions"
                >

                    <button
                        type="button"
                        class="btn btn-sm btn-secondary edit-book"
                        data-index="${index}"
                    >
                        Edit
                    </button>


                    <button
                        type="button"
                        class="btn btn-sm btn-danger delete-book"
                        data-index="${index}"
                    >
                        Delete
                    </button>

                </div>

            </td>

        </tr>

    `;

}


/* =========================================================
   ROW EVENTS
========================================================= */

function attachRowEvents() {

    document
        .querySelectorAll(
            ".edit-book"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const index =
                        Number(
                            button.dataset.index
                        );


                    const book =
                        filteredBooks[index];


                    if (book) {
                        openEditBook(
                            book
                        );
                    }

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

                    const index =
                        Number(
                            button.dataset.index
                        );


                    const book =
                        filteredBooks[index];


                    if (book) {
                        deleteBook(
                            book
                        );
                    }

                }
            );

        });

}


/* =========================================================
   OPEN ADD FORM
========================================================= */

function openAddBookForm() {

    editingBook = null;


    bookForm?.reset();


    if (bookId) {
        bookId.value = "";
    }


    ensureSlugField();


    if (bookSlug) {
        bookSlug.value = "";
    }


    if (bookFormTitle) {

        bookFormTitle.textContent =
            "Add Book";

    }


    if (saveBookButton) {

        saveBookButton.textContent =
            "Save Book";

    }


    if (bookFormPanel) {

        bookFormPanel.hidden =
            false;


        bookFormPanel.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }


    setTimeout(
        () => bookName?.focus(),
        200
    );

}


/* =========================================================
   OPEN EDIT FORM
========================================================= */

function openEditBook(
    book
) {

    editingBook =
        book;


    ensureSlugField();


    if (bookId) {
        bookId.value =
            book.id;
    }


    if (bookName) {

        bookName.value =
            book.name || "";

    }


    if (bookSlug) {

        bookSlug.value =
            book.slug || "";

    }


    if (bookDescription) {

        bookDescription.value =
            book.description || "";

    }


    if (bookFormTitle) {

        bookFormTitle.textContent =
            "Edit Book";

    }


    if (saveBookButton) {

        saveBookButton.textContent =
            "Update Book";

    }


    if (bookFormPanel) {

        bookFormPanel.hidden =
            false;


        bookFormPanel.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }

    if (bookCoverPreviewImage) {

    if (book.cover_url) {

        bookCoverPreviewImage.src =
            book.cover_url;

        if (bookCoverPreview) {
            bookCoverPreview.hidden = false;
        }

    } else {

        bookCoverPreviewImage.src = "";

        if (bookCoverPreview) {
            bookCoverPreview.hidden = true;
        }

    }selectedCoverFile = null;
}
}


/* =========================================================
   CLOSE FORM
========================================================= */

function closeBookForm() {

    editingBook = null;


    bookForm?.reset();


    if (bookId) {
        bookId.value = "";
    }


    if (bookFormTitle) {

        bookFormTitle.textContent =
            "Add Book";

    }


    if (saveBookButton) {

        saveBookButton.textContent =
            "Save Book";

    }


    if (bookFormPanel) {

        bookFormPanel.hidden =
            true;

    }

}


/* =========================================================
   SUBMIT
========================================================= */

async function handleSubmit(
    event
) {

    event.preventDefault();


    const name =
        bookName?.value.trim() || "";


    const description =
        bookDescription?.value.trim() || "";


    let slug =
        bookSlug?.value.trim() || "";


    if (!name) {

        showNotification(
            "Please enter the book name.",
            "error"
        );


        bookName?.focus();

        return;

    }


    /*
     * Generate slug if the user leaves it empty.
     */

    if (!slug) {

        slug =
            generateSlug(
                name
            );

    }


    /*
     * Make sure the slug is valid.
     */

    if (!slug) {

        showNotification(
            "Unable to generate a valid slug.",
            "error"
        );

        return;

    }


    setSavingState(
        true
    );


    try {

    let coverUrl =
    editingBook?.cover_url || null;


if (selectedCoverFile) {

    coverUrl =
        await uploadBookCover(
            selectedCoverFile
        );
}

       const payload = {

    name,

    slug,

    description:
        description || null,

    cover_url:
        coverUrl

};


        let error = null;


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

            /*
             * Friendly message for duplicate slug.
             */

            if (
                error.code ===
                "23505"
            ) {

                throw new Error(
                    "That slug is already being used. Please choose another slug."
                );

            }


            throw error;

        }


        showNotification(
            editingBook
                ? "Book updated successfully."
                : "Book added successfully.",
            "success"
        );


        closeBookForm();


        await loadBooks();


    } catch (error) {

        console.error(
            "Book save error:",
            error
        );


        showNotification(
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


/* =========================================================
   DELETE BOOK
========================================================= */

async function deleteBook(
    book
) {

    const confirmed =
        window.confirm(
            `Delete "${book.name}"?\n\nThis action cannot be undone.`
        );


    if (!confirmed) {
        return;
    }


    try {

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


        showNotification(
            "Book deleted successfully.",
            "success"
        );


        await loadBooks();


    } catch (error) {

        console.error(
            "Book deletion error:",
            error
        );


        showNotification(
            error?.message ||
            "Unable to delete the book.",
            "error"
        );

    }

}


/* =========================================================
   SLUG GENERATOR
========================================================= */

function generateSlug(
    value
) {

    return String(
        value || ""
    )

        .toLowerCase()

        .trim()

        .normalize(
            "NFD"
        )

        .replace(
            /[\u0300-\u036f]/g,
            ""
        )

        .replace(
            /[^a-z0-9\s-]/g,
            ""
        )

        .replace(
            /\s+/g,
            "-"
        )

        .replace(
            /-+/g,
            "-"
        )

        .replace(
            /^-+|-+$/g,
            ""
        );

}


/* =========================================================
   STATES
========================================================= */

function showLoading() {

    if (booksLoading) {
        booksLoading.hidden =
            false;
    }


    if (booksEmpty) {
        booksEmpty.hidden =
            true;
    }


    if (booksError) {
        booksError.hidden =
            true;
    }


    if (booksTableWrapper) {
        booksTableWrapper.hidden =
            true;
    }

}


function showEmpty() {

    if (booksLoading) {
        booksLoading.hidden =
            true;
    }


    if (booksEmpty) {
        booksEmpty.hidden =
            false;
    }


    if (booksError) {
        booksError.hidden =
            true;
    }


    if (booksTableWrapper) {
        booksTableWrapper.hidden =
            true;
    }

}


function showError(
    message
) {

    if (booksLoading) {
        booksLoading.hidden =
            true;
    }


    if (booksEmpty) {
        booksEmpty.hidden =
            true;
    }


    if (booksError) {
        booksError.hidden =
            false;
    }


    if (booksTableWrapper) {
        booksTableWrapper.hidden =
            true;
    }


    if (booksErrorMessage) {

        booksErrorMessage.textContent =
            message;

    }

}


function hideStates() {

    if (booksLoading) {
        booksLoading.hidden =
            true;
    }


    if (booksEmpty) {
        booksEmpty.hidden =
            true;
    }


    if (booksError) {
        booksError.hidden =
            true;
    }

}


/* =========================================================
   SAVE STATE
========================================================= */

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


/* =========================================================
   TOAST
========================================================= */

function showNotification(
    message,
    type = "success"
) {

    try {

        showToast(
            message,
            type
        );

    } catch {

        try {

            showToast(
                message
            );

        } catch {

            console.log(
                message
            );

        }

    }

}


/* =========================================================
   HELPERS
========================================================= */

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
        text
            .slice(
                0,
                length
            )
            .trim() +
        "..."
    );

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