import { supabase } from "./supabase.js";
import { showToast } from "./utils.js";
import { requireAuth, logout } from "./auth.js";


/* =========================================================
   STATE
========================================================= */

let interviews = [];
let filteredInterviews = [];
let mediaList = [];

let editingInterview = null;
let interviewToDelete = null;

const PAGE_SIZE = 20;
let currentPage = 1;


/* =========================================================
   DOM ELEMENTS
========================================================= */

const modal =
    document.getElementById("interviewModal");

const addButton =
    document.getElementById("addInterviewButton");

const closeButton =
    document.getElementById("closeModal");

const cancelButton =
    document.getElementById("cancelModal");

const interviewForm =
    document.getElementById("interviewForm");


const interviewTitle =
    document.getElementById("interviewTitle");

const interviewee =
    document.getElementById("interviewee");

const category =
    document.getElementById("category");

const description =
    document.getElementById("description");

const interviewMedia =
    document.getElementById("interviewMedia");

const youtubeUrl =
    document.getElementById("youtubeUrl");

const featured =
    document.getElementById("featured");

const published =
    document.getElementById("published");


const interviewPhotoPreview =
    document.getElementById("interviewPhotoPreview");

const interviewPhotoPreviewImage =
    document.getElementById("interviewPhotoPreviewImage");


const modalTitle =
    document.getElementById("interviewModalTitle");

const saveButton =
    document.getElementById("saveButton");


const loadingState =
    document.getElementById("loadingState");

const errorState =
    document.getElementById("errorState");

const emptyState =
    document.getElementById("emptyState");

const emptyMessage =
    document.getElementById("emptyMessage");

const tableContainer =
    document.getElementById("tableContainer");

const tableBody =
    document.getElementById("interviewsTableBody");


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


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHtml(value) {

    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =========================================================
   GET MEDIA
========================================================= */

function getMediaById(mediaId) {

    if (!mediaId) {

        return null;

    }


    return mediaList.find(
        media =>
            String(media.id) === String(mediaId)
    );

}


/* =========================================================
   PUBLIC MEDIA URL
========================================================= */

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


/* =========================================================
   GET INTERVIEW IMAGE
========================================================= */

function getInterviewImageUrl(interview) {

    if (!interview?.media_id) {

        return "";

    }


    const media =
        getMediaById(interview.media_id);


    if (!media?.storage_path) {

        return "";

    }


    return getPublicMediaUrl(
        media.storage_path
    );

}


/* =========================================================
   MODAL
========================================================= */

function openModal() {

    modal.classList.add("active");

}


function closeModal() {

    modal.classList.remove("active");

    resetForm();

}


/* =========================================================
   RESET FORM
========================================================= */

function resetForm() {

    interviewForm.reset();

    editingInterview = null;


    modalTitle.textContent =
        "Add New Interview";


    saveButton.textContent =
        "Save Interview";


    saveButton.disabled = false;


    category.value =
        "Interview";


    featured.value =
        "false";


    published.value =
        "true";


    interviewPhotoPreview.classList.add(
        "hidden"
    );


    interviewPhotoPreviewImage.src =
        "";

}


/* =========================================================
   ADD INTERVIEW BUTTON
========================================================= */

addButton.addEventListener(
    "click",
    async () => {

        resetForm();

        await loadMedia();

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


/* =========================================================
   CLOSE MODAL ON BACKDROP
========================================================= */

modal.addEventListener(
    "click",
    event => {

        if (event.target === modal) {

            closeModal();

        }

    }
);


/* =========================================================
   ESCAPE KEY
========================================================= */

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
            confirmModal.classList.contains("active")
        ) {

            closeDeleteModal();

        }

    }
);


/* =========================================================
   LOAD MEDIA
========================================================= */

async function loadMedia() {

    interviewMedia.innerHTML = `
        <option value="">
            No Thumbnail
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


        mediaList =
            (data || []).filter(
                media =>
                    media.file_type?.startsWith(
                        "image/"
                    )
            );


        mediaList.forEach(
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


                interviewMedia.appendChild(
                    option
                );

            }
        );


    } catch (error) {

        console.error(
            "Error loading media:",
            error
        );


        mediaList = [];


        notify(
            "Unable to load media.",
            "error"
        );

    }

}


/* =========================================================
   IMAGE PREVIEW
========================================================= */

function updatePhotoPreview() {

    const selectedOption =
        interviewMedia.options[
            interviewMedia.selectedIndex
        ];


    const storagePath =
        selectedOption?.dataset?.storagePath;


    if (!storagePath) {

        interviewPhotoPreview.classList.add(
            "hidden"
        );

        interviewPhotoPreviewImage.src =
            "";

        return;

    }


    const publicUrl =
        getPublicMediaUrl(
            storagePath
        );


    if (!publicUrl) {

        interviewPhotoPreview.classList.add(
            "hidden"
        );

        interviewPhotoPreviewImage.src =
            "";

        return;

    }


    interviewPhotoPreviewImage.src =
        publicUrl;


    interviewPhotoPreview.classList.remove(
        "hidden"
    );

}


interviewMedia.addEventListener(
    "change",
    updatePhotoPreview
);


/* =========================================================
   LOAD INTERVIEWS
========================================================= */

async function loadInterviews() {

    showLoading();


    try {

        /*
         * LOAD INTERVIEWS
         */

        const {
            data,
            error
        } = await supabase
            .from("interviews")
            .select("*")
            .order(
                "created_at",
                {
                    ascending: false
                }
            );


        if (error) {

            throw error;

        }


        interviews =
            data || [];


        /*
         * LOAD MEDIA
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


        mediaList =
            mediaData || [];


        /*
         * INITIAL STATE
         */

        filteredInterviews =
            [...interviews];


        currentPage =
            1;


        if (interviews.length === 0) {

            showEmpty(
                "No interviews found."
            );

            return;

        }


        renderCurrentPage();


    } catch (error) {

        console.error(
            "Error loading interviews:",
            error
        );


        showError(
            error?.message ||
            "Unable to load interviews."
        );

    }

}


/* =========================================================
   RENDER TABLE
========================================================= */

function renderTable(interviewList) {

    tableBody.innerHTML =
        interviewList
            .map(
                (interview, index) => {

                    /*
                     * Find original position
                     * so search results don't
                     * always display as No. 1.
                     */

                    const originalIndex =
                        interviews.findIndex(
                            item =>
                                item.id ===
                                interview.id
                        ) + 1;


                    const imageUrl =
                        getInterviewImageUrl(
                            interview
                        );


                    const featuredBadge =
                        interview.featured
                            ? `
                                <span class="status-badge success">
                                    Yes
                                </span>
                              `
                            : `
                                <span class="status-badge">
                                    No
                                </span>
                              `;


                    const publishedBadge =
                        interview.published
                            ? `
                                <span class="status-badge success">
                                    Published
                                </span>
                              `
                            : `
                                <span class="status-badge warning">
                                    Draft
                                </span>
                              `;


                    return `

                        <tr>


                            <!-- NUMBER -->

                            <td>
                                ${originalIndex}
                            </td>


                            <!-- THUMBNAIL -->

                            <td>

                                ${
                                    imageUrl

                                        ? `

                                            <img
                                                src="${escapeHtml(
                                                    imageUrl
                                                )}"
                                                alt="Interview"
                                                class="author-table-photo"
                                                loading="lazy">

                                          `

                                        : `

                                            <div class="author-table-placeholder">
                                                —
                                            </div>

                                          `
                                }

                            </td>


                            <!-- TITLE -->

                            <td>

                                <strong>
                                    ${escapeHtml(
                                        interview.title
                                    )}
                                </strong>

                            </td>


                            <!-- INTERVIEWEE -->

                            <td>

                                ${escapeHtml(
                                    interview.interviewee ||
                                    "-"
                                )}

                            </td>


                            <!-- CATEGORY -->

                            <td>

                                ${escapeHtml(
                                    interview.category ||
                                    "Interview"
                                )}

                            </td>


                            <!-- FEATURED -->

                            <td>

                                ${featuredBadge}

                            </td>


                            <!-- PUBLISHED -->

                            <td>

                                ${publishedBadge}

                            </td>


                            <!-- ACTIONS -->

                            <td>

                                <button
                                    type="button"
                                    class="table-btn edit-btn"
                                    data-id="${interview.id}">

                                    Edit

                                </button>


                                <button
                                    type="button"
                                    class="table-btn delete-btn"
                                    data-id="${interview.id}">

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
        .querySelectorAll(".edit-btn")
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
    interviewId
) {

    const interview =
        interviews.find(
            item =>
                String(item.id) ===
                String(interviewId)
        );


    if (!interview) {

        return;

    }


    editingInterview =
        interview.id;


    modalTitle.textContent =
        "Edit Interview";


    saveButton.textContent =
        "Update Interview";


    /*
     * Populate fields
     */

    interviewTitle.value =
        interview.title || "";


    interviewee.value =
        interview.interviewee || "";


    category.value =
        interview.category ||
        "Interview";


    description.value =
        interview.description || "";


    youtubeUrl.value =
        interview.youtube_url || "";


    featured.value =
        interview.featured
            ? "true"
            : "false";


    published.value =
        interview.published
            ? "true"
            : "false";


    /*
     * Load media
     */

    await loadMedia();


    interviewMedia.value =
        interview.media_id || "";


    updatePhotoPreview();


    openModal();

}


/* =========================================================
   SAVE / UPDATE
========================================================= */

interviewForm.addEventListener(
    "submit",
    async event => {

        event.preventDefault();


        /*
         * GET VALUES
         */

        const title =
            interviewTitle.value.trim();


        const intervieweeValue =
            interviewee.value.trim();


        const categoryValue =
            category.value.trim() ||
            "Interview";


        const descriptionValue =
            description.value.trim();


        const youtubeValue =
            youtubeUrl.value.trim();


        const selectedMediaId =
            interviewMedia.value ||
            null;


        const featuredValue =
            featured.value === "true";


        const publishedValue =
            published.value === "true";


        /*
         * VALIDATION
         */

        if (!title) {

            notify(
                "Please enter an interview title.",
                "error"
            );


            interviewTitle.focus();

            return;

        }


        /*
         * PREVENT DOUBLE SUBMIT
         */

        if (saveButton.disabled) {

            return;

        }


        saveButton.disabled =
            true;


        const isEditing =
            editingInterview !== null;


        saveButton.textContent =
            isEditing
                ? "Updating..."
                : "Saving...";


        try {

            /*
             * PAYLOAD
             */

            const payload = {

                title,

                description:
                    descriptionValue ||
                    null,

                category:
                    categoryValue,

                interviewee:
                    intervieweeValue ||
                    null,

                media_id:
                    selectedMediaId,

                youtube_url:
                    youtubeValue ||
                    null,

                featured:
                    featuredValue,

                published:
                    publishedValue

            };


            /*
             * UPDATE
             */

            if (isEditing) {

                const {
                    error
                } = await supabase
                    .from("interviews")
                    .update({
                        ...payload,
                        updated_at:
                            new Date().toISOString()
                    })
                    .eq(
                        "id",
                        editingInterview
                    );


                if (error) {

                    throw error;

                }


                notify(
                    "Interview updated successfully.",
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
                    .from("interviews")
                    .insert([
                        payload
                    ]);


                if (error) {

                    throw error;

                }


                notify(
                    "Interview added successfully.",
                    "success"
                );

            }


            /*
             * CLOSE + REFRESH
             */

            closeModal();


            await loadInterviews();


        } catch (error) {

            console.error(
                "Interview save error:",
                error
            );


            if (
                error?.code === "42501" ||
                error?.code === "PGRST301"
            ) {

                notify(
                    "Supabase blocked this operation because of the interviews table RLS policy.",
                    "error"
                );

            } else {

                notify(
                    error?.message ||
                    "Unable to save interview.",
                    "error"
                );

            }


        } finally {

            saveButton.disabled =
                false;


            saveButton.textContent =
                editingInterview !== null
                    ? "Update Interview"
                    : "Save Interview";

        }

    }
);


/* =========================================================
   DELETE EVENTS
========================================================= */

function attachDeleteEvents() {

    document
        .querySelectorAll(".delete-btn")
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
    interviewId
) {

    const interview =
        interviews.find(
            item =>
                String(item.id) ===
                String(interviewId)
        );


    if (!interview) {

        return;

    }


    interviewToDelete =
        interview;


    confirmMessage.textContent =
        `Are you sure you want to delete "${interview.title}"? This action cannot be undone.`;


    confirmModal.classList.add(
        "active"
    );

}


/* =========================================================
   CLOSE DELETE MODAL
========================================================= */

function closeDeleteModal() {

    interviewToDelete =
        null;


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

        if (!interviewToDelete) {

            return;

        }


        if (confirmDelete.disabled) {

            return;

        }


        confirmDelete.disabled =
            true;


        confirmDelete.textContent =
            "Deleting...";


        try {

            const interviewId =
                interviewToDelete.id;


            const {
                error
            } = await supabase
                .from("interviews")
                .delete()
                .eq(
                    "id",
                    interviewId
                );


            if (error) {

                throw error;

            }


            closeDeleteModal();


            notify(
                "Interview deleted successfully.",
                "success"
            );


            await loadInterviews();


        } catch (error) {

            console.error(
                "Interview delete error:",
                error
            );


            notify(
                error?.message ||
                "Unable to delete interview.",
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
    searchInterviews
);


function searchInterviews() {

    const query =
        searchInput.value
            .trim()
            .toLowerCase();


    /*
     * EMPTY SEARCH
     */

    if (!query) {

        filteredInterviews =
            [...interviews];


        currentPage =
            1;


        renderCurrentPage();

        return;

    }


    /*
     * SEARCH TITLE
     * OR INTERVIEWEE
     * OR CATEGORY
     */

    filteredInterviews =
        interviews.filter(
            interview => {

                const title =
                    (
                        interview.title ||
                        ""
                    ).toLowerCase();


                const person =
                    (
                        interview.interviewee ||
                        ""
                    ).toLowerCase();


                const categoryName =
                    (
                        interview.category ||
                        ""
                    ).toLowerCase();


                return (
                    title.includes(query) ||
                    person.includes(query) ||
                    categoryName.includes(query)
                );

            }
        );


    currentPage =
        1;


    if (
        filteredInterviews.length === 0
    ) {

        showEmpty(
            "No interviews match your search."
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
            currentPage - 1
        ) * PAGE_SIZE;


    const end =
        start + PAGE_SIZE;


    const pageData =
        filteredInterviews.slice(
            start,
            end
        );


    renderTable(
        pageData
    );


    updatePagination();

}


/* =========================================================
   UPDATE PAGINATION
========================================================= */

function updatePagination() {

    const totalPages =
        Math.ceil(
            filteredInterviews.length /
            PAGE_SIZE
        );


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
        currentPage === totalPages;

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
                filteredInterviews.length /
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


/* =========================================================
   SHOW ERROR
========================================================= */

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
        errorState.querySelector("p");


    if (errorText) {

        errorText.textContent =
            message ||
            "Something went wrong while loading interviews.";

    }

}


/* =========================================================
   SHOW EMPTY
========================================================= */

function showEmpty(
    message = "No interviews found."
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
             * Check authentication
             */

            await requireAuth();


            /*
             * Load interviews
             */

            await loadInterviews();


        } catch (error) {

            console.error(
                "Interviews initialization error:",
                error
            );


            showError(
                error?.message ||
                "Unable to initialize Interviews page."
            );

        }

    }
);