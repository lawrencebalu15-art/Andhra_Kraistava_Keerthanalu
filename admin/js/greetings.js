import { supabase } from "./supabase.js";
import { showToast } from "./utils.js";
import { requireAuth, logout } from "./auth.js";


/* =========================================================
   STATE
========================================================= */

let greetings = [];
let filteredGreetings = [];

let editingGreeting = null;
let greetingToArchive = null;

const PAGE_SIZE = 50;

let currentPage = 1;

let greetingStatusFilter = "active";


/* =========================================================
   DOM ELEMENTS
========================================================= */

const modal =
    document.getElementById("greetingModal");

const addButton =
    document.getElementById("addGreetingButton");

const closeButton =
    document.getElementById("closeModal");

const cancelButton =
    document.getElementById("cancelModal");

const greetingForm =
    document.getElementById("greetingForm");

const greetingTitle =
    document.getElementById("greetingTitle");

const senderName =
    document.getElementById("senderName");

const greetingCategory =
    document.getElementById("greetingCategory");

const youtubeUrl =
    document.getElementById("youtubeUrl");

const greetingDescription =
    document.getElementById("greetingDescription");

const thumbnailUrl =
    document.getElementById("thumbnailUrl");

const modalTitle =
    document.getElementById("greetingModalTitle");

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
    document.getElementById("greetingsTableBody");

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
   STATUS FILTER
========================================================= */

function createGreetingStatusFilter() {

    const toolbar =
        document.querySelector(".toolbar");

    if (!toolbar) {
        return;
    }

    const existing =
        document.getElementById(
            "greetingStatusFilter"
        );

    if (existing) {
        return;
    }

    const select =
        document.createElement("select");

    select.id =
        "greetingStatusFilter";

    select.className =
        "search-input";

    select.style.maxWidth =
        "220px";

    select.innerHTML = `

        <option value="active">
            Active Greetings
        </option>

        <option value="archived">
            Archived Greetings
        </option>

        <option value="all">
            All Greetings
        </option>

    `;

    toolbar.appendChild(select);

    select.addEventListener(
        "change",
        () => {

            greetingStatusFilter =
                select.value;

            applyGreetingFilters();

        }
    );
}


/* =========================================================
   FILTER
========================================================= */

function applyGreetingFilters() {

    const query =
        searchInput.value
            .trim()
            .toLowerCase();

    let result =
        [...greetings];


    /* STATUS */

    if (
        greetingStatusFilter ===
        "active"
    ) {

        result =
            result.filter(
                greeting =>
                    greeting.is_active !== false
            );

    } else if (
        greetingStatusFilter ===
        "archived"
    ) {

        result =
            result.filter(
                greeting =>
                    greeting.is_active === false
            );

    }


    /* SEARCH */

    if (query) {

        result =
            result.filter(
                greeting => {

                    const title =
                        (
                            greeting.title ||
                            ""
                        ).toLowerCase();

                    const sender =
                        (
                            greeting.sender_name ||
                            ""
                        ).toLowerCase();

                    const category =
                        (
                            greeting.category ||
                            ""
                        ).toLowerCase();

                    return (
                        title.includes(query) ||
                        sender.includes(query) ||
                        category.includes(query)
                    );

                }
            );

    }


    filteredGreetings =
        result;

    currentPage = 1;


    if (
        filteredGreetings.length === 0
    ) {

        const message =
            greetingStatusFilter ===
            "archived"

                ? "No archived greetings found."

                : greetingStatusFilter ===
                  "active"

                    ? "No active greetings found."

                    : "No greetings found.";

        showEmpty(message);

        return;
    }


    renderCurrentPage();
}


/* =========================================================
   SEARCH
========================================================= */

searchInput.addEventListener(
    "input",
    applyGreetingFilters
);


/* =========================================================
   HELPERS
========================================================= */

function notify(
    message,
    type = "success"
) {

    try {

        showToast(
            message,
            type
        );

    } catch {

        console.log(message);

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


/* =========================================================
   MODAL
========================================================= */

function openModal() {

    modal.classList.add("active");

}


function resetGreetingForm() {

    greetingForm.reset();

    editingGreeting = null;

    modalTitle.textContent =
        "Add New Greeting";

    saveButton.textContent =
        "Save Greeting";

    saveButton.disabled =
        false;

}


function closeModal() {

    modal.classList.remove("active");

    resetGreetingForm();

}


/* =========================================================
   ADD GREETING
========================================================= */

addButton.addEventListener(
    "click",
    () => {

        resetGreetingForm();

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
   ESCAPE KEY
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key !== "Escape"
        ) {
            return;
        }

        if (
            modal.classList.contains(
                "active"
            )
        ) {

            closeModal();

        }

        if (
            confirmModal.classList.contains(
                "active"
            )
        ) {

            closeArchiveModal();

        }

    }
);


/* =========================================================
   LOAD GREETINGS
========================================================= */

async function loadGreetings() {

    showLoading();

    try {

        const {
            data,
            error
        } = await supabase

            .from("greetings")

            .select("*")

            .order(
                "id",
                {
                    ascending: true
                }
            );


        if (error) {
            throw error;
        }


        greetings =
            data || [];

        filteredGreetings =
            [...greetings];

        currentPage = 1;


        if (
            greetings.length === 0
        ) {

            showEmpty(
                "No greetings found."
            );

            return;
        }


        renderCurrentPage();


    } catch (error) {

        console.error(
            "Error loading greetings:",
            error
        );

        showError(
            error?.message ||
            "Unable to load greetings."
        );

    }

}


/* =========================================================
   RENDER TABLE
========================================================= */

function renderTable(
    greetingList
) {

    tableBody.innerHTML =
        greetingList
            .map(
                (
                    greeting,
                    index
                ) => {

                    const originalIndex =
                        greetings.findIndex(
                            originalGreeting =>
                                originalGreeting.id ===
                                greeting.id
                        ) + 1;


                    const thumbnail =
                        greeting.thumbnail_url ||
                        "";


                    return `

                        <tr>

                            <td>
                                ${originalIndex}
                            </td>


                            <td>

                                ${
                                    thumbnail

                                        ? `

                                            <img
                                                src="${escapeHtml(thumbnail)}"
                                                alt="Greeting"
                                                style="
                                                    width:70px;
                                                    height:90px;
                                                    object-fit:cover;
                                                    border-radius:8px;
                                                "
                                            >

                                        `

                                        : `

                                            <div
                                                style="
                                                    width:70px;
                                                    height:90px;
                                                    border-radius:8px;
                                                    background:#f1f5f9;
                                                    display:flex;
                                                    align-items:center;
                                                    justify-content:center;
                                                    color:#94a3b8;
                                                "
                                            >
                                                —
                                            </div>

                                        `
                                }

                            </td>


                            <td>

                                ${escapeHtml(
                                    greeting.title ||
                                    "-"
                                )}

                            </td>


                            <td>

                                ${escapeHtml(
                                    greeting.sender_name ||
                                    "-"
                                )}

                            </td>


                            <td>

                                ${escapeHtml(
                                    greeting.category ||
                                    "-"
                                )}

                            </td>


                            <td>

                                ${
                                    greeting.is_active === false

                                        ? `

                                            <span
                                                class="status-badge archived"
                                            >
                                                Archived
                                            </span>

                                        `

                                        : `

                                            <span
                                                class="status-badge active"
                                            >
                                                Active
                                            </span>

                                        `
                                }

                            </td>


                            <td>


                                <button
                                    type="button"
                                    class="table-btn edit-btn"
                                    data-id="${greeting.id}"
                                >
                                    Edit
                                </button>


                                ${
                                    greeting.is_active === false

                                        ? `

                                            <button
                                                type="button"
                                                class="table-btn restore-btn"
                                                data-id="${greeting.id}"
                                            >
                                                Restore
                                            </button>

                                        `

                                        : `

                                            <button
                                                type="button"
                                                class="table-btn delete-btn"
                                                data-id="${greeting.id}"
                                            >
                                                Archive
                                            </button>

                                        `
                                }


                            </td>

                        </tr>

                    `;

                }
            )
            .join("");


    attachEditEvents();

    attachArchiveEvents();

    attachRestoreEvents();


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

function startEdit(
    greetingId
) {

    const greeting =
        greetings.find(
            item =>
                String(item.id) ===
                String(greetingId)
        );


    if (!greeting) {
        return;
    }


    editingGreeting =
        greeting.id;


    modalTitle.textContent =
        "Edit Greeting";

    saveButton.textContent =
        "Update Greeting";


    greetingTitle.value =
        greeting.title || "";

    senderName.value =
        greeting.sender_name || "";

    greetingCategory.value =
        greeting.category || "";

    youtubeUrl.value =
        greeting.youtube_url || "";

    greetingDescription.value =
        greeting.description || "";

    thumbnailUrl.value =
        greeting.thumbnail_url || "";


    openModal();

}


/* =========================================================
   SAVE / UPDATE
========================================================= */

greetingForm.addEventListener(
    "submit",
    async event => {

        event.preventDefault();


        const title =
            greetingTitle.value.trim();

        const sender =
            senderName.value.trim();

        const category =
            greetingCategory.value.trim();

        const youtube =
            youtubeUrl.value.trim();

        const description =
            greetingDescription.value.trim();

        const thumbnail =
            thumbnailUrl.value.trim();


        if (!title) {

            notify(
                "Please enter a greeting title.",
                "error"
            );

            return;

        }


        if (!sender) {

            notify(
                "Please enter the sender name.",
                "error"
            );

            return;

        }


        if (!youtube) {

            notify(
                "Please enter the YouTube Shorts URL.",
                "error"
            );

            return;

        }


        saveButton.disabled =
            true;


        try {

            const payload = {

                title,

                sender_name:
                    sender,

                category:
                    category || null,

                youtube_url:
                    youtube,

                description:
                    description || null,

                thumbnail_url:
                    thumbnail || null,

                published:
                    true

            };


            let error;


            /* UPDATE */

            if (editingGreeting) {

                const result =
                    await supabase

                        .from("greetings")

                        .update(payload)

                        .eq(
                            "id",
                            editingGreeting
                        );


                error =
                    result.error;


                if (!error) {

                    notify(
                        "Greeting updated successfully.",
                        "success"
                    );

                }

            }


            /* INSERT */

            else {

                payload.is_active =
                    true;

                payload.featured =
                    false;


                const result =
                    await supabase

                        .from("greetings")

                        .insert(
                            payload
                        );


                error =
                    result.error;


                if (!error) {

                    notify(
                        "Greeting added successfully.",
                        "success"
                    );

                }

            }


            if (error) {
                throw error;
            }


            closeModal();

            await loadGreetings();


        } catch (error) {

            console.error(
                "Greeting save error:",
                error
            );

            notify(
                error?.message ||
                "Unable to save greeting.",
                "error"
            );


        } finally {

            saveButton.disabled =
                false;

        }

    }
);


/* =========================================================
   ARCHIVE
========================================================= */

const confirmModal =
    document.getElementById(
        "confirmModal"
    );

const confirmMessage =
    document.getElementById(
        "confirmMessage"
    );

const cancelDelete =
    document.getElementById(
        "cancelDelete"
    );

const confirmDelete =
    document.getElementById(
        "confirmDelete"
    );


function attachArchiveEvents() {

    document
        .querySelectorAll(
            ".delete-btn"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        openArchiveModal(
                            button.dataset.id
                        );

                    }
                );

            }
        );

}


function openArchiveModal(
    greetingId
) {

    const greeting =
        greetings.find(
            item =>
                String(item.id) ===
                String(greetingId)
        );


    if (!greeting) {
        return;
    }


    greetingToArchive =
        greeting;


    confirmMessage.textContent =
        `Are you sure you want to archive "${greeting.title}"? You can restore it later from Archived Greetings.`;

    confirmDelete.textContent =
        "Archive";


    confirmModal.classList.add(
        "active"
    );

}


function closeArchiveModal() {

    greetingToArchive =
        null;

    confirmModal.classList.remove(
        "active"
    );

}


cancelDelete.addEventListener(
    "click",
    closeArchiveModal
);


confirmModal.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            confirmModal
        ) {

            closeArchiveModal();

        }

    }
);


/* =========================================================
   CONFIRM ARCHIVE
========================================================= */

confirmDelete.addEventListener(
    "click",
    async () => {

        if (!greetingToArchive) {
            return;
        }


        if (
            confirmDelete.disabled
        ) {
            return;
        }


        confirmDelete.disabled =
            true;

        confirmDelete.textContent =
            "Archiving...";


        try {

            const greetingId =
                greetingToArchive.id;


            const {
                error
            } = await supabase

                .from("greetings")

                .update({
                    is_active: false
                })

                .eq(
                    "id",
                    greetingId
                );


            if (error) {
                throw error;
            }


            notify(
                "Greeting archived successfully.",
                "success"
            );


            closeArchiveModal();

            await loadGreetings();


        } catch (error) {

            console.error(
                "Greeting archive error:",
                error
            );

            notify(
                error?.message ||
                "Unable to archive greeting.",
                "error"
            );


        } finally {

            confirmDelete.disabled =
                false;

            confirmDelete.textContent =
                "Archive";

        }

    }
);


/* =========================================================
   RESTORE
========================================================= */

function attachRestoreEvents() {

    document
        .querySelectorAll(
            ".restore-btn"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    async () => {

                        await restoreGreeting(
                            button.dataset.id
                        );

                    }
                );

            }
        );

}


async function restoreGreeting(
    greetingId
) {

    try {

        const {
            error
        } = await supabase

            .from("greetings")

            .update({
                is_active: true
            })

            .eq(
                "id",
                greetingId
            );


        if (error) {
            throw error;
        }


        notify(
            "Greeting restored successfully.",
            "success"
        );


        await loadGreetings();


    } catch (error) {

        console.error(
            "Greeting restore error:",
            error
        );

        notify(
            error?.message ||
            "Unable to restore greeting.",
            "error"
        );

    }

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
        filteredGreetings.slice(
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
            filteredGreetings.length /
            PAGE_SIZE
        );


    if (
        totalPages <= 1
    ) {

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


prevPage.addEventListener(
    "click",
    () => {

        if (
            currentPage <= 1
        ) {
            return;
        }

        currentPage--;

        renderCurrentPage();

    }
);


nextPage.addEventListener(
    "click",
    () => {

        const totalPages =
            Math.ceil(
                filteredGreetings.length /
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
            "Something went wrong while loading greetings.";

    }

}


function showEmpty(
    message =
        "No greetings found."
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

            await requireAuth();

            createGreetingStatusFilter();

            await loadGreetings();


        } catch (error) {

            console.error(
                "Greetings initialization error:",
                error
            );

            showError(
                error?.message ||
                "Unable to initialize Greetings page."
            );

        }

    }
);