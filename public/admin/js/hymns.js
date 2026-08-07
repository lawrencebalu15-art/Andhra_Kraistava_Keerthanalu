let hymns = [];
let filteredHymns = [];

const PAGE_SIZE = 50;

let currentPage = 1;
let editingHymn = null;
import { showToast } from "./utils.js";


import { supabase } from "./supabase.js";

/* ==========================================
MODAL
========================================== */

const modal = document.getElementById("hymnModal");

const addButton = document.getElementById("addHymnButton");

const closeButton = document.getElementById("closeModal");

const cancelButton = document.getElementById("cancelModal");


const confirmModal = document.getElementById("confirmModal");
const confirmDelete = document.getElementById("confirmDelete");
const cancelDelete = document.getElementById("cancelDelete");
const confirmMessage = document.getElementById("confirmMessage");

const englishTitleInput = document.getElementById("title_english");
const slugInput = document.getElementById("slug");
let slugEdited = false;

slugInput.addEventListener("input", () => {

    slugEdited = true;

});

englishTitleInput.addEventListener("input", () => {

    if (slugEdited) return;

    slugInput.value = generateSlug(
        englishTitleInput.value
    );

});

let hymnToDelete = null;

function openModal() {

    if (!editingHymn) {

        hymnForm.reset();

        document.getElementById("saveButton").textContent = "Save Hymn";
slugEdited = false;
    }

    modal.classList.add("active");

}

function closeModal() {

    editingHymn = null;

    hymnForm.reset();

    document.getElementById("saveButton").textContent = "Save Hymn";
    slugEdited = false;
    modal.classList.remove("active");

}

addButton.addEventListener("click", openModal);

closeButton.addEventListener("click", closeModal);

cancelButton.addEventListener("click", closeModal);

/* Close when clicking outside */

modal.addEventListener("click", (e) => {

    if (e.target === modal) {

        closeModal();

    }

});

/* Close with Escape */

document.addEventListener("keydown", (e) => {

    if (e.key === "Escape") {

        closeModal();

    }

});
/* ==========================================
SAVE HYMN
========================================== */

const hymnForm = document.getElementById("hymnForm");

hymnForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const saveButton = document.getElementById("saveButton");

setButtonLoading(
    saveButton,
    editingHymn
        ? "Updating..."
        : "Saving..."
);

    const hymn = {

        number: Number(document.getElementById("number").value),

        title_telugu: document.getElementById("title_telugu").value,

        title_english: document.getElementById("title_english").value,

        author_id: Number(document.getElementById("author").value) || null,

book_id: Number(document.getElementById("book").value) || null,

category_id: Number(document.getElementById("category").value) || null,
        language: document.getElementById("language").value,

        slug: document.getElementById("slug").value,

        youtube_links: document
            .getElementById("youtube_links")
            .value
            .split("\n")
            .filter(link => link.trim() !== ""),

        is_featured: document.getElementById("featured").checked

    };

if (!(await validateForm(hymn))) {

    resetButton(saveButton);

    return;

}

    console.log(hymn);

    let data;
    let error;

if (editingHymn) {

const { data, error } = await supabase
    .from("hymns")
    .update(hymn)
    .eq("id", editingHymn)
    .select();

console.log("Editing ID:", editingHymn);
console.log("Sending:", hymn);
console.log("Returned:", data);
console.log("Error:", error);
}
else {

    ({ error } = await supabase
        .from("hymns")
        .insert([hymn]));

}

    if (error) {

        console.error(error);

        alert(error.message);

        resetButton(saveButton);

        return;

    }
 const message = editingHymn
    ? "Successfully updated hymn."
    : "Hymn added successfully.";

showToast(message, "success");

    closeModal();

hymnForm.reset();

await loadHymns();


});

const loadingState = document.getElementById("loadingState");
const errorState = document.getElementById("errorState");
const emptyState = document.getElementById("emptyState");
const tableContainer = document.getElementById("tableContainer");
const tableBody = document.getElementById("hymnsTableBody");
const pagination = document.getElementById("pagination");
const prevPage = document.getElementById("prevPage");
const nextPage = document.getElementById("nextPage");
const pageInfo = document.getElementById("pageInfo");

document.addEventListener("DOMContentLoaded", async () => {

    await loadAuthors();

    await loadBooks();

    await loadCategories();

    await loadHymns();

    resetButton(saveButton);
});

async function loadHymns() {

    showLoading();

    try {

        const { data, error } = await supabase
            .from("hymns")
            .select(`
    id,
    number,
    title_telugu,
    title_english,
    author_id,
    book_id,
    category_id,
    language,
    slug,
    youtube_links,
    is_featured,
    authors(name)
`)
            .order("number", { ascending: true });

        if (error) throw error;

        if (!data || data.length === 0) {
            showEmpty();
            resetButton(saveButton);
            return;
        }

        hymns = data;
        filteredHymns = [...data];
        renderCurrentPage();

    } catch (error) {

        console.error(error);

        showError();

    }

}

function renderTable(hymns) {

    tableBody.innerHTML = hymns.map(hymn => `

        <tr>

            <td>${hymn.number}</td>

            <td>${hymn.title_telugu ?? "-"}</td>

            <td>${hymn.title_english ?? "-"}</td>

            <td>${hymn.authors?.name ?? "Unknown"}</td>

            <td>${capitalize(hymn.language)}</td>

            <td>

                <button class="table-btn edit-btn"
                    data-number="${hymn.number}">
                        Edit 
                </button>

                <button
    class="table-btn delete-btn"
    data-id="${hymn.id}"
    data-number="${hymn.number}">
    Delete
</button>

            </td>

        </tr>

    `).join("");
    attachEditEvents();
    attachDeleteEvents();

    loadingState.classList.add("hidden");
    errorState.classList.add("hidden");
    emptyState.classList.add("hidden");
    tableContainer.classList.remove("hidden");
    

}

function attachEditEvents() {

    document.querySelectorAll(".edit-btn").forEach(button => {

        button.addEventListener("click", () => {

    startEdit(button.dataset.number);

});

    });

}
async function startEdit(hymnNumber) {

    const { data, error } = await supabase
        .from("hymns")
        .select("*")
        .eq("number", hymnNumber)
        .single();

    if (error) {

        console.error(error);
        resetButton(saveButton);
        return;

    }

    editingHymn = data.id;
    console.log("Loaded hymn:", data);
console.log("Editing hymn id:", editingHymn);

    document.getElementById("number").value = data.number;
    document.getElementById("title_telugu").value = data.title_telugu ?? "";
    document.getElementById("title_english").value = data.title_english ?? "";
    document.getElementById("author").value = data.author_id ?? "";
    document.getElementById("book").value = data.book_id ?? "";
    document.getElementById("category").value = data.category_id ?? "";
    document.getElementById("language").value = data.language ?? "telugu";
    document.getElementById("slug").value = data.slug ?? "";

    document.getElementById("youtube_links").value =
        (data.youtube_links || []).join("\n");

    document.getElementById("featured").checked =
        data.is_featured ?? false;

    document.getElementById("saveButton").textContent = "Update Hymn";

    openModal();

}

function attachDeleteEvents() {

    document.querySelectorAll(".delete-btn").forEach(button => {

        button.addEventListener("click", () => {

            hymnToDelete = {

                id: button.dataset.id,

                number: button.dataset.number

            };

            confirmMessage.textContent =
                `Are you sure you want to delete Hymn #${hymnToDelete.number}? This action cannot be undone.`;

            confirmModal.classList.add("active");

        });

    });

}
function renderCurrentPage() {

    const start = (currentPage - 1) * PAGE_SIZE;

    const end = start + PAGE_SIZE;

    const pageData = filteredHymns.slice(start, end);

    renderTable(pageData);
    updatePagination();

}

function updatePagination() {

    const totalPages = Math.ceil(filteredHymns.length / PAGE_SIZE);

if (totalPages <= 1) {

    pagination.classList.add("hidden");
    resetButton(saveButton);
    return;

}

pagination.classList.remove("hidden");

    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;

    prevPage.disabled = currentPage === 1;

    nextPage.disabled = currentPage === totalPages;

}
function showLoading() {

    loadingState.classList.remove("hidden");

    errorState.classList.add("hidden");

    emptyState.classList.add("hidden");

    tableContainer.classList.add("hidden");

}

function showError() {

    loadingState.classList.add("hidden");

    errorState.classList.remove("hidden");

    emptyState.classList.add("hidden");

    tableContainer.classList.add("hidden");

}

function showEmpty(message = "No hymns found.") {

    document.getElementById("emptyMessage").textContent = message;

    loadingState.classList.add("hidden");

    errorState.classList.add("hidden");

    emptyState.classList.remove("hidden");

    tableContainer.classList.add("hidden");

}

function capitalize(value) {

    if (!value) return "-";

    return value.charAt(0).toUpperCase() + value.slice(1);

}
const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", searchHymns);

function searchHymns() {

    const query = searchInput.value
        .trim()
        .toLowerCase();

    if (!query) {

        filteredHymns = [...hymns];

        currentPage = 1;
        renderCurrentPage();
        resetButton(saveButton);
        return;

    }

    filteredHymns = hymns.filter(hymn => {

        const number = String(hymn.number);

        const telugu = (hymn.title_telugu || "")
            .toLowerCase();

        const english = (hymn.title_english || "")
            .toLowerCase();

        const author = (hymn.authors?.name || "")
            .toLowerCase();

        return (

            number.includes(query) ||

            telugu.includes(query) ||

            english.includes(query) ||

            author.includes(query)

        );

    });

    if (filteredHymns.length === 0) {

        showEmpty("No hymns match your search.");
        resetButton(saveButton);
        return;

    }

    renderCurrentPage();

}
prevPage.addEventListener("click", () => {

    if (currentPage > 1) {

        currentPage--;

        renderCurrentPage();

    }

});

nextPage.addEventListener("click", () => {

    const totalPages = Math.ceil(filteredHymns.length / PAGE_SIZE);

    if (currentPage < totalPages) {

        currentPage++;

        renderCurrentPage();

    }

});


/* ==========================================
LOAD AUTHORS
========================================== */

async function loadAuthors() {

    const authorSelect = document.getElementById("author");

    authorSelect.innerHTML = `
        <option value="">Select Author</option>
    `;

    const { data, error } = await supabase
        .from("authors")
        .select("id,name")
        .order("name");

    if (error) {

        console.error(error);
        resetButton(saveButton);
        return;

    }

    data.forEach(author => {

        authorSelect.innerHTML += `

            <option value="${author.id}">

                ${author.name}

            </option>

        `;

    });

}
/* ==========================================
   LOAD BOOKS
========================================== */

async function loadBooks() {

    const bookSelect = document.getElementById("book");

    bookSelect.innerHTML = `
        <option value="">Select Book</option>
    `;

    const { data, error } = await supabase
        .from("books")
        .select("id,name")
        .order("name");

    if (error) {
        console.error(error);
        resetButton(saveButton);
        return;
    }

    data.forEach(book => {

        bookSelect.innerHTML += `
            <option value="${book.id}">
                ${book.name}
            </option>
        `;

    });

}
/* ==========================================
   LOAD CATEGORIES
========================================== */

async function loadCategories() {

    const categorySelect = document.getElementById("category");

    categorySelect.innerHTML = `
        <option value="">Select Category</option>
    `;

    const { data, error } = await supabase
        .from("categories")
        .select("id,name")
        .order("name");

    if (error) {
        console.error(error);
        resetButton(saveButton);
        return;
    }

    data.forEach(category => {

        categorySelect.innerHTML += `
            <option value="${category.id}">
                ${category.name}
            </option>
        `;

    });

}

cancelDelete.addEventListener("click", () => {

    setButtonLoading(
    confirmDelete,
    "Deleting..."
);

    confirmModal.classList.remove("active");

    hymnToDelete = null;

});

confirmDelete.addEventListener("click", async () => {

    if (!hymnToDelete) return;

    const { error } = await supabase
        .from("hymns")
        .delete()
        .eq("id", hymnToDelete.id);

    if (error) {

        showToast(error.message, "error");
        resetButton(saveButton);
        return;

    }

    confirmModal.classList.remove("active");

    showToast("Hymn deleted successfully.", "success");

    hymnToDelete = null;


    await loadHymns();

    resetButton(saveButton);
});

confirmModal.addEventListener("click", (e) => {

    if (e.target === confirmModal) {

        confirmModal.classList.remove("active");

        hymnToDelete = null;

    }

});


/* ==========================================
BUTTON LOADING
========================================== */

function setButtonLoading(button, text) {

    button.disabled = true;

    button.dataset.originalText = button.textContent;

    button.textContent = text;

}

function resetButton(button) {

    button.disabled = false;

    button.textContent = button.dataset.originalText;

}



/* ==========================================
   SLUG GENERATOR
========================================== */

function generateSlug(text) {

    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");

}


/* ==========================================
VALIDATION
========================================== */

async function validateForm(hymn) {

    if (!hymn.number) {

        showToast("Hymn number is required.", "error");

        return false;

    }

    if (!hymn.title_english.trim()) {

        showToast("English title is required.", "error");

        return false;

    }

    if (!hymn.title_telugu.trim()) {

        showToast("Telugu title is required.", "error");

        return false;

    }
    if (await hymnNumberExists(hymn.number)) {

    showToast(
        "This hymn number already exists.",
        "error"
    );

    return false;

}

    return true;

}

async function hymnNumberExists(number) {

    const { data } = await supabase

        .from("hymns")

        .select("id")

        .eq("number", number)

        .maybeSingle();

    if (!data) return false;

    if (editingHymn && data.id === editingHymn) {

        return false;

    }

    return true;

}