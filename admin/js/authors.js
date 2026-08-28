import { supabase } from "./supabase.js";
import { showToast } from "./utils.js";
import { requireAuth, logout } from "./auth.js";

/* =========================================================
   STATE
========================================================= */

let authors = [];
let filteredAuthors = [];
let authorMediaList = [];

let editingAuthor = null;
let authorToDelete = null;

const PAGE_SIZE = 50;
let currentPage = 1;


/* =========================================================
   DOM ELEMENTS
========================================================= */

const modal = document.getElementById("authorModal");

const addButton = document.getElementById("addAuthorButton");
const closeButton = document.getElementById("closeModal");
const cancelButton = document.getElementById("cancelModal");

const authorForm = document.getElementById("authorForm");

const authorName = document.getElementById("authorName");
const authorMedia = document.getElementById("authorMedia");

const authorBio =
    document.getElementById("authorBio");

const authorBirthYear =
    document.getElementById("authorBirthYear");

const authorDeathYear =
    document.getElementById("authorDeathYear");

const authorCountry =
    document.getElementById("authorCountry");

const authorPhotoPreview =
    document.getElementById("authorPhotoPreview");

const authorPhotoPreviewImage =
    document.getElementById("authorPhotoPreviewImage");

const modalTitle =
    document.getElementById("authorModalTitle");

const saveButton =
    document.getElementById("saveButton");

const loadingState =
    document.getElementById("loadingState");

const errorState =
    document.getElementById("errorState");

const emptyState =
    document.getElementById("emptyState");

const tableContainer =
    document.getElementById("tableContainer");

const tableBody =
    document.getElementById("authorsTableBody");

const pagination =
    document.getElementById("pagination");

const prevPage =
    document.getElementById("prevPage");

const nextPage =
    document.getElementById("nextPage");

const pageInfo =
    document.getElementById("pageInfo");

const searchInput =
    document.getElementById("searchInput");


/* =========================================================
   DELETE MODAL
========================================================= */

const confirmModal =
    document.getElementById("confirmModal");

const confirmMessage =
    document.getElementById("confirmMessage");

const cancelDelete =
    document.getElementById("cancelDelete");

const confirmDelete =
    document.getElementById("confirmDelete");


/* =========================================================
   HELPERS
========================================================= */

function notify(message, type = "success") {
    try {
        showToast(message, type);
    } catch {
        try {
            showToast(message);
        } catch {
            console.log(message);
        }
    }
}


function escapeHtml(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


function getMediaById(mediaId) {
    if (!mediaId) {
        return null;
    }

    return authorMediaList.find(
        media =>
            String(media.id) === String(mediaId)
    );
}


function getPublicMediaUrl(storagePath) {
    if (!storagePath) {
        return "";
    }

    const { data } =
        supabase.storage
            .from("media")
            .getPublicUrl(storagePath);

    return data?.publicUrl || "";
}


function getAuthorPhotoUrl(author) {
    /*
     * First preference:
     * existing photo_url stored in authors table.
     */
    if (author?.photo_url) {
        return author.photo_url;
    }

    /*
     * Second preference:
     * media_id -> media table -> storage_path.
     */
    const media = getMediaById(author?.media_id);

    if (media?.storage_path) {
        return getPublicMediaUrl(
            media.storage_path
        );
    }

    return "";
}


/* =========================================================
   MODAL
========================================================= */

function openModal() {
    modal.classList.add("active");
}


function resetAuthorForm() {
    authorForm.reset();

    editingAuthor = null;

    modalTitle.textContent =
        "Add New Author";

    saveButton.textContent =
        "Save Author";

    saveButton.disabled = false;

    authorPhotoPreview.classList.add(
        "hidden"
    );

    authorPhotoPreviewImage.src = "";
}


function closeModal() {
    modal.classList.remove("active");

    resetAuthorForm();
}


/* =========================================================
   ADD AUTHOR
========================================================= */

addButton.addEventListener(
    "click",
    async () => {

        resetAuthorForm();

        await loadAuthorMedia();

        openModal();
    }
);


/* =========================================================
   CLOSE MODAL
========================================================= */

closeButton.addEventListener(
    "click",
    closeModal
);


cancelButton.addEventListener(
    "click",
    closeModal
);




/*
 * Escape key
 */
document.addEventListener(
    "keydown",
    event => {

        if (event.key !== "Escape") {
            return;
        }

        if (
            modal.classList.contains("active")
        ) {
            closeModal();
        }

        if (
            confirmModal.classList.contains(
                "active"
            )
        ) {
            closeDeleteModal();
        }

    }
);


/* =========================================================
   MEDIA
========================================================= */

async function loadAuthorMedia() {

    authorMedia.innerHTML = `
        <option value="">
            No Photo
        </option>
    `;

    try {

        const {
            data,
            error
        } = await supabase
            .from("media")
            .select(
                "id,file_name,storage_path,file_type"
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

        authorMediaList =
            (data || []).filter(
                media =>
                    media.file_type?.startsWith(
                        "image/"
                    )
            );

        authorMediaList.forEach(
            media => {

                const option =
                    document.createElement(
                        "option"
                    );

                option.value =
                    media.id;

                option.textContent =
                    media.file_name;

                option.dataset.storagePath =
                    media.storage_path;

                authorMedia.appendChild(
                    option
                );

            }
        );

    } catch (error) {

        console.error(
            "Error loading media:",
            error
        );

        authorMediaList = [];

        notify(
            "Unable to load author photos.",
            "error"
        );
    }
}


/* =========================================================
   PHOTO PREVIEW
========================================================= */

function updateAuthorPhotoPreview() {

    const selectedOption =
        authorMedia.options[
            authorMedia.selectedIndex
        ];

    const storagePath =
        selectedOption?.dataset?.storagePath;

    if (!storagePath) {

        authorPhotoPreview.classList.add(
            "hidden"
        );

        authorPhotoPreviewImage.src = "";

        return;
    }

    const publicUrl =
        getPublicMediaUrl(
            storagePath
        );

    if (!publicUrl) {

        authorPhotoPreview.classList.add(
            "hidden"
        );

        authorPhotoPreviewImage.src = "";

        return;
    }

    authorPhotoPreviewImage.src =
        publicUrl;

    authorPhotoPreview.classList.remove(
        "hidden"
    );
}


authorMedia.addEventListener(
    "change",
    updateAuthorPhotoPreview
);


/* =========================================================
   LOAD AUTHORS
========================================================= */

async function loadAuthors() {

    showLoading();

    try {

        /*
         * ---------------------------------------------------
         * LOAD AUTHORS
         * ---------------------------------------------------
         */

        const {
            data: authorData,
            error: authorError
        } = await supabase
            .from("authors")
            .select("*")
            .order(
                "id",
                {
                    ascending: true
                }
            );

        if (authorError) {
            throw authorError;
        }


        /*
         * ---------------------------------------------------
         * LOAD MEDIA
         * ---------------------------------------------------
         */

        const {
            data: mediaData,
            error: mediaError
        } = await supabase
            .from("media")
            .select(
                "id,file_name,storage_path,file_type"
            );

        if (mediaError) {
            throw mediaError;
        }

        authorMediaList =
            mediaData || [];


        /*
         * ---------------------------------------------------
         * LOAD HYMNS
         * ---------------------------------------------------
         *
         * We use author_id to calculate how many
         * hymns belong to each author.
         */

        const {
            data: hymnData,
            error: hymnError
        } = await supabase
            .from("hymns")
            .select("author_id");

        if (hymnError) {
            throw hymnError;
        }


        /*
         * ---------------------------------------------------
         * COUNT HYMNS PER AUTHOR
         * ---------------------------------------------------
         */

        const hymnCounts = {};

        (hymnData || []).forEach(
            hymn => {

                if (!hymn.author_id) {
                    return;
                }

                const authorId =
                    String(
                        hymn.author_id
                    );

                hymnCounts[authorId] =
                    (
                        hymnCounts[
                            authorId
                        ] || 0
                    ) + 1;

            }
        );


        /*
         * ---------------------------------------------------
         * COMBINE AUTHOR DATA
         * ---------------------------------------------------
         */

        authors =
            (authorData || []).map(
                author => {

                    const photoUrl =
                        getAuthorPhotoUrl(
                            author
                        );

                    return {
                        ...author,

                        hymnCount:
                            hymnCounts[
                                String(
                                    author.id
                                )
                            ] || 0,

                        photoUrl
                    };

                }
            );


        /*
         * ---------------------------------------------------
         * INITIAL STATE
         * ---------------------------------------------------
         */

        filteredAuthors =
            [...authors];

        currentPage = 1;


        if (authors.length === 0) {

            showEmpty(
                "No authors found."
            );

            return;
        }


        renderCurrentPage();

    } catch (error) {

        console.error(
            "Error loading authors:",
            error
        );

        showError(
            error?.message ||
            "Unable to load authors."
        );
    }
}


/* =========================================================
   RENDER TABLE
========================================================= */

function renderTable(authorList) {

    tableBody.innerHTML =
        authorList
            .map(
                (author, index) => {

                    const originalIndex =
    authors.findIndex(
        originalAuthor => originalAuthor.id === author.id
    ) + 1;

                    const photoUrl =
                        author.photoUrl;


                    return `
                        <tr>

                            <td>
                                ${originalIndex}
                            </td>

                            <td>

                                ${
                                    photoUrl
                                        ? `
                                            <img
                                                src="${escapeHtml(
                                                    photoUrl
                                                )}"
                                                alt="Author"
                                                class="author-table-photo"
                                                loading="lazy"
                                            >
                                        `
                                        : `
                                            <div class="author-table-placeholder">
                                                —
                                            </div>
                                        `
                                }

                            </td>

                            <td>
                                ${escapeHtml(
                                    author.name ||
                                    "-"
                                )}
                            </td>

                            <td>
                                ${
                                    author.hymnCount
                                }
                            </td>

                            <td>

                                <button
                                    type="button"
                                    class="table-btn edit-btn"
                                    data-id="${author.id}"
                                >
                                    Edit
                                </button>

                                <button
                                    type="button"
                                    class="table-btn delete-btn"
                                    data-id="${author.id}"
                                >
                                    Delete
                                </button>

                            </td>

                        </tr>
                    `;

                }
            )
            .join("");


    attachEditEvents();
    attachDeleteEvents();


    loadingState.classList.add(
        "hidden"
    );

    errorState.classList.add(
        "hidden"
    );

    emptyState.classList.add(
        "hidden"
    );

    tableContainer.classList.remove(
        "hidden"
    );
}


/* =========================================================
   EDIT EVENTS
========================================================= */

function attachEditEvents() {

    document
        .querySelectorAll(
            ".edit-btn"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        startEdit(
                            button.dataset.id
                        );

                    }
                );

            }
        );
}


/* =========================================================
   START EDIT
========================================================= */

async function startEdit(
    authorId
) {

    const author =
        authors.find(
            item =>
                String(item.id) ===
                String(authorId)
        );

    if (!author) {
        return;
    }


    /*
     * Set edit state FIRST.
     */
    editingAuthor =
        author.id;


    /*
     * Set modal information.
     */
    modalTitle.textContent =
        "Edit Author";

    saveButton.textContent =
        "Update Author";


    /*
     * IMPORTANT:
     * Populate the name field.
     */
authorName.value =
    author.name || "";

authorBio.value =
    author.bio || "";

authorBirthYear.value =
    author.birth_year ?? "";

authorDeathYear.value =
    author.death_year ?? "";

authorCountry.value =
    author.country || "";

await loadAuthorMedia();

authorMedia.value =
    author.media_id || "";

updateAuthorPhotoPreview();


    openModal();
}


/* =========================================================
   SAVE / UPDATE AUTHOR
========================================================= */

authorForm.addEventListener(
    "submit",
    async event => {

        event.preventDefault();


        const name =
            authorName.value.trim();


        /*
         * Validation
         */
        if (!name) {

            notify(
                "Please enter an author name.",
                "error"
            );

            authorName.focus();

            return;
        }


        /*
         * Prevent duplicate submissions.
         */
        if (saveButton.disabled) {
            return;
        }


        saveButton.disabled = true;


        const isEditing =
            editingAuthor !== null;


        saveButton.textContent =
            isEditing
                ? "Updating..."
                : "Saving...";


        try {

            const selectedMediaId =
                authorMedia.value ||
                null;


            /*
             * Get selected media.
             */
            const selectedMedia =
                getMediaById(
                    selectedMediaId
                );


            /*
             * Build photo URL.
             *
             * We keep both media_id and
             * photo_url synchronized.
             */
            let photoUrl = null;


            if (
                selectedMedia?.storage_path
            ) {

                photoUrl =
                    getPublicMediaUrl(
                        selectedMedia.storage_path
                    );
            }


            const payload = {
    name,

    media_id:
        selectedMediaId,

    photo_url:
        photoUrl,

    bio:
        authorBio.value.trim() || null,

    birth_year:
        authorBirthYear.value
            ? Number(authorBirthYear.value)
            : null,

    death_year:
        authorDeathYear.value
            ? Number(authorDeathYear.value)
            : null,

    country:
        authorCountry.value.trim() || null
};

            /*
             * UPDATE
             */
            if (isEditing) {

                const {
                    error
                } = await supabase
                    .from("authors")
                    .update(payload)
                    .eq(
                        "id",
                        editingAuthor
                    );


                if (error) {
                    throw error;
                }


                notify(
                    "Author updated successfully.",
                    "success"
                );

            }


            /*
             * INSERT
             */
            else {

                const {
                    error
                } = await supabase
                    .from("authors")
                    .insert(
                        [payload]
                    );


                if (error) {
                    throw error;
                }


                notify(
                    "Author added successfully.",
                    "success"
                );
            }


            /*
             * Close modal and refresh data.
             */
            closeModal();

            await loadAuthors();

        } catch (error) {

            console.error(
                "Author save error:",
                error
            );


            /*
             * RLS error gets a clearer message.
             */
            if (
                error?.code ===
                    "42501" ||
                error?.code ===
                    "PGRST301"
            ) {

                notify(
                    "Supabase blocked this operation because of the authors table RLS policy.",
                    "error"
                );

            } else {

                notify(
                    error?.message ||
                    "Unable to save author.",
                    "error"
                );
            }

        } finally {

            /*
             * Always unlock button.
             */
            saveButton.disabled = false;

            saveButton.textContent =
                editingAuthor !== null
                    ? "Update Author"
                    : "Save Author";
        }

    }
);


/* =========================================================
   DELETE EVENTS
========================================================= */

function attachDeleteEvents() {

    document
        .querySelectorAll(
            ".delete-btn"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        openDeleteModal(
                            button.dataset.id
                        );

                    }
                );

            }
        );
}


/* =========================================================
   OPEN DELETE MODAL
========================================================= */

function openDeleteModal(
    authorId
) {

    const author =
        authors.find(
            item =>
                String(item.id) ===
                String(authorId)
        );

    if (!author) {
        return;
    }


    authorToDelete =
        author;


    confirmMessage.textContent =
        `Are you sure you want to delete "${author.name}"? This action cannot be undone.`;


    confirmModal.classList.add(
        "active"
    );
}


/* =========================================================
   CLOSE DELETE MODAL
========================================================= */

function closeDeleteModal() {

    authorToDelete = null;

    confirmModal.classList.remove(
        "active"
    );
}


/* =========================================================
   CANCEL DELETE
========================================================= */

cancelDelete.addEventListener(
    "click",
    closeDeleteModal
);


/* =========================================================
   CONFIRM DELETE
========================================================= */

confirmDelete.addEventListener(
    "click",
    async () => {

        if (!authorToDelete) {
            return;
        }


        if (confirmDelete.disabled) {
            return;
        }


        confirmDelete.disabled = true;

        confirmDelete.textContent =
            "Deleting...";


        try {

            const authorId =
                authorToDelete.id;


            const {
                error
            } = await supabase
                .from("authors")
                .delete()
                .eq(
                    "id",
                    authorId
                );


            if (error) {
                throw error;
            }


            closeDeleteModal();


            notify(
                "Author deleted successfully.",
                "success"
            );


            /*
             * Reload everything so:
             *
             * - author list updates
             * - hymn counts update
             * - pagination updates
             */
            await loadAuthors();

        } catch (error) {

            console.error(
                "Author delete error:",
                error
            );


            notify(
                error?.message ||
                "Unable to delete author. Make sure the author is not being used by any hymns.",
                "error"
            );

        } finally {

            confirmDelete.disabled =
                false;

            confirmDelete.textContent =
                "Delete";

        }

    }
);


/* =========================================================
   SEARCH
========================================================= */

searchInput.addEventListener(
    "input",
    searchAuthors
);


function searchAuthors() {

    const query =
        searchInput.value
            .trim()
            .toLowerCase();


    /*
     * Empty search
     */
    if (!query) {

        filteredAuthors =
            [...authors];

        currentPage = 1;

        renderCurrentPage();

        return;
    }


    /*
     * Filter authors.
     */
    filteredAuthors =
        authors.filter(
            author => {

                const name =
                    (
                        author.name ||
                        ""
                    ).toLowerCase();


                return name.includes(
                    query
                );

            }
        );


    currentPage = 1;


    if (
        filteredAuthors.length ===
        0
    ) {

        showEmpty(
            "No authors match your search."
        );

        return;
    }


    renderCurrentPage();
}


/* =========================================================
   PAGINATION
========================================================= */

function renderCurrentPage() {

    const start =
        (
            currentPage -
            1
        ) *
        PAGE_SIZE;


    const end =
        start +
        PAGE_SIZE;


    const pageData =
        filteredAuthors.slice(
            start,
            end
        );


    renderTable(
        pageData
    );


    updatePagination();
}


function updatePagination() {

    const totalPages =
        Math.ceil(
            filteredAuthors.length /
            PAGE_SIZE
        );


    /*
     * No pagination needed.
     */
    if (totalPages <= 1) {

        pagination.classList.add(
            "hidden"
        );

        return;
    }


    pagination.classList.remove(
        "hidden"
    );


    pageInfo.textContent =
        `Page ${currentPage} of ${totalPages}`;


    prevPage.disabled =
        currentPage === 1;


    nextPage.disabled =
        currentPage ===
        totalPages;
}


/* =========================================================
   PREVIOUS PAGE
========================================================= */

prevPage.addEventListener(
    "click",
    () => {

        if (currentPage <= 1) {
            return;
        }

        currentPage--;

        renderCurrentPage();

    }
);


/* =========================================================
   NEXT PAGE
========================================================= */

nextPage.addEventListener(
    "click",
    () => {

        const totalPages =
            Math.ceil(
                filteredAuthors.length /
                PAGE_SIZE
            );


        if (
            currentPage >=
            totalPages
        ) {
            return;
        }


        currentPage++;

        renderCurrentPage();

    }
);


/* =========================================================
   UI STATES
========================================================= */

function showLoading() {

    loadingState.classList.remove(
        "hidden"
    );

    errorState.classList.add(
        "hidden"
    );

    emptyState.classList.add(
        "hidden"
    );

    tableContainer.classList.add(
        "hidden"
    );

    pagination.classList.add(
        "hidden"
    );
}


function showError(
    message
) {

    loadingState.classList.add(
        "hidden"
    );

    errorState.classList.remove(
        "hidden"
    );

    emptyState.classList.add(
        "hidden"
    );

    tableContainer.classList.add(
        "hidden"
    );

    pagination.classList.add(
        "hidden"
    );


    const errorText =
        errorState.querySelector(
            "p"
        );


    if (errorText) {

        errorText.textContent =
            message ||
            "Something went wrong while loading the authors.";

    }
}


function showEmpty(
    message = "No authors found."
) {

    loadingState.classList.add(
        "hidden"
    );

    errorState.classList.add(
        "hidden"
    );

    emptyState.classList.remove(
        "hidden"
    );

    tableContainer.classList.add(
        "hidden"
    );

    pagination.classList.add(
        "hidden"
    );


    const emptyMessage =
        document.getElementById(
            "emptyMessage"
        );


    if (emptyMessage) {

        emptyMessage.textContent =
            message;
    }
}


/* =========================================================
   CONFIRM MODAL BACKDROP
========================================================= */

confirmModal.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            confirmModal
        ) {
            closeDeleteModal();
        }

    }
);


/* =========================================================
   LOGOUT
========================================================= */

const logoutButton =
    document.getElementById(
        "logoutButton"
    );


if (logoutButton) {

    logoutButton.addEventListener(
        "click",
        async () => {

            try {

                await logout();

            } catch (error) {

                console.error(
                    "Logout error:",
                    error
                );

            }

        }
    );

}


/* =========================================================
   INITIALIZE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    async () => {

        try {

            /*
             * Make sure the user is authenticated
             * before accessing the authors data.
             */
            await requireAuth();

            await loadAuthors();

        } catch (error) {

            console.error(
                "Authors initialization error:",
                error
            );

            showError(
                error?.message ||
                "Unable to initialize Authors page."
            );

        }

    }
);