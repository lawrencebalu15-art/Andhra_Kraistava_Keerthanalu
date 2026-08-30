/* =========================================================
   ADMIN BOOKS
   Andhra Kraistava Keerthanalu CMS

   Books use the existing Media library for cover images.
   No local file upload is used here.
========================================================= */

import { supabase } from "./supabase.js";
import { showToast } from "./utils.js";
import { requireAuth } from "./auth.js";

let books = [];
let filteredBooks = [];
let mediaItems = [];
let editingBook = null;
let bookToDelete = null;
let selectedMediaUrl = null;

const $ = (id) => document.getElementById(id);

const addBookButton = $("addBookButton");
const emptyAddBookButton = $("emptyAddBookButton");
const retryButton = $("retryButton");
const searchInput = $("searchInput");

const loadingState = $("loadingState");
const errorState = $("errorState");
const errorMessage = $("errorMessage");
const emptyState = $("emptyState");
const emptyMessage = $("emptyMessage");
const tableContainer = $("tableContainer");
const booksTableBody = $("booksTableBody");

const bookModal = $("bookModal");
const bookForm = $("bookForm");
const bookFormTitle = $("bookFormTitle");
const closeModal = $("closeModal");
const cancelModal = $("cancelModal");
const saveButton = $("saveButton");
const bookId = $("bookId");
const bookName = $("bookName");
const bookSlug = $("bookSlug");
const bookDescription = $("bookDescription");
const bookMedia = $("bookMedia");
const bookCoverPreview = $("bookCoverPreview");
const bookCoverPreviewImage = $("bookCoverPreviewImage");

const confirmModal = $("confirmModal");
const confirmMessage = $("confirmMessage");
const cancelDelete = $("cancelDelete");
const confirmDelete = $("confirmDelete");

/* =========================================================
   INITIALIZE
========================================================= */

document.addEventListener("DOMContentLoaded", async () => {
    try {
        await requireAuth();
        setupEvents();
        await loadMedia();
        await loadBooks();
    } catch (error) {
        console.error("Books initialization error:", error);
        showError(error?.message || "Unable to initialize the Books page.");
    }
});

/* =========================================================
   EVENTS
========================================================= */

function setupEvents() {
    addBookButton?.addEventListener("click", openAddBook);
    emptyAddBookButton?.addEventListener("click", openAddBook);
    retryButton?.addEventListener("click", loadBooks);

    searchInput?.addEventListener("input", () => {
        applySearch();
    });

    bookForm?.addEventListener("submit", handleSubmit);
    closeModal?.addEventListener("click", closeBookModal);
    cancelModal?.addEventListener("click", closeBookModal);

    bookModal?.addEventListener("click", (event) => {
        if (event.target === bookModal) {
            closeBookModal();
        }
    });

    bookMedia?.addEventListener("change", () => {
        selectedMediaUrl = getSelectedMediaUrl();
        updateCoverPreview(selectedMediaUrl);
    });

    bookName?.addEventListener("input", () => {
        if (!editingBook && bookSlug) {
            bookSlug.value = generateSlug(bookName.value);
        }
    });

    cancelDelete?.addEventListener("click", closeDeleteModal);
    confirmDelete?.addEventListener("click", confirmBookDelete);

    confirmModal?.addEventListener("click", (event) => {
        if (event.target === confirmModal) {
            closeDeleteModal();
        }
    });
}

/* =========================================================
   MEDIA LIBRARY

   We intentionally read the existing Media records instead
   of uploading a new file from the user's computer.

   The mapper supports the common URL/name field variants so
   it can consume the existing Media table without changing
   the Books table's current cover_url column.
========================================================= */

async function loadMedia() {
    if (!bookMedia) return;

    bookMedia.innerHTML = `<option value="">Loading Media...</option>`;
    bookMedia.disabled = true;

    const { data, error } = await supabase
        .from("media")
        .select("id,file_name,storage_path,file_type,created_at")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Failed to load media:", error);
        bookMedia.innerHTML = `<option value="">Unable to load Media</option>`;
        return;
    }

    mediaItems = (data || [])
        .filter((item) => item?.storage_path)
        .map((item) => ({
            ...item,
            name: item.file_name || "Untitled media",
            url: getPublicMediaUrl(item.storage_path)
        }))
        .filter((item) => item.url);

    renderMediaOptions();
}

function getPublicMediaUrl(storagePath) {
    if (!storagePath) return "";

    // Already a complete URL.
    if (/^https?:\/\//i.test(String(storagePath))) {
        return String(storagePath);
    }

    const { data } = supabase.storage
        .from("media")
        .getPublicUrl(String(storagePath));

    return data?.publicUrl || "";
}

function resolveBookCoverUrl(value) {
    if (!value) return "";

    const raw = String(value).trim();
    if (!raw) return "";

    // A previously stored full URL should continue to work.
    if (/^https?:\/\//i.test(raw)) {
        return raw;
    }

    // If the value is a media UUID, resolve it through the loaded Media library.
    const mediaById = mediaItems.find(
        (media) => String(media.id) === raw
    );
    if (mediaById?.url) {
        return mediaById.url;
    }

    // Current Books records may contain the Storage path in cover_url.
    return getPublicMediaUrl(raw);
}

function renderMediaOptions(selectedValue = "") {
    if (!bookMedia) return;

    bookMedia.innerHTML = "";

    const noCover = document.createElement("option");
    noCover.value = "";
    noCover.textContent = "No Cover";
    bookMedia.appendChild(noCover);

    mediaItems.forEach((media) => {
        const option = document.createElement("option");
        option.value = String(media.id);
        option.textContent = media.name;
        option.dataset.url = media.url;
        option.dataset.storagePath = media.storage_path;
        bookMedia.appendChild(option);
    });

    bookMedia.disabled = false;

    if (selectedValue) {
        const raw = String(selectedValue);
        const selectedMedia = mediaItems.find(
            (media) =>
                String(media.id) === raw ||
                String(media.storage_path) === raw ||
                String(media.url) === raw
        );

        if (selectedMedia) {
            bookMedia.value = String(selectedMedia.id);
        }
    }

    selectedMediaUrl = getSelectedMediaUrl();
}

function getSelectedMediaUrl() {
    if (!bookMedia || !bookMedia.value) return null;

    const selectedOption = bookMedia.options[bookMedia.selectedIndex];
    return selectedOption?.dataset?.url || null;
}

function getSelectedMediaStoragePath() {
    if (!bookMedia || !bookMedia.value) return null;

    const selectedOption = bookMedia.options[bookMedia.selectedIndex];
    return selectedOption?.dataset?.storagePath || null;
}

function updateCoverPreview(url) {
    if (!bookCoverPreview || !bookCoverPreviewImage) return;

    if (!url) {
        bookCoverPreviewImage.removeAttribute("src");
        bookCoverPreview.classList.add("hidden");
        return;
    }

    bookCoverPreviewImage.src = url;
    bookCoverPreview.classList.remove("hidden");

    bookCoverPreviewImage.onerror = () => {
        console.error("Book cover failed to load:", url);
        bookCoverPreview.classList.add("hidden");
        bookCoverPreviewImage.removeAttribute("src");
    };
}

/* =========================================================
   BOOKS
========================================================= */

async function loadBooks() {
    showLoading();

    try {
        const { data, error } = await supabase
            .from("books")
            .select("id, name, slug, description, cover_url, created_at")
            .order("created_at", { ascending: false });

        if (error) throw error;

        books = data || [];
        applySearch();
    } catch (error) {
        console.error("Failed to load books:", error);
        showError(error?.message || "Unable to load books.");
    }
}

function applySearch() {
    const term = searchInput?.value.trim().toLowerCase() || "";

    filteredBooks = books.filter((book) => {
        if (!term) return true;

        return [book.name, book.slug, book.description]
            .some((value) => String(value || "").toLowerCase().includes(term));
    });

    renderBooks();
}

function renderBooks() {
    if (!filteredBooks.length) {
        if (books.length) {
            showEmpty(`No books match “${searchInput?.value.trim() || ""}”.`);
        } else {
            showEmpty("Your book collection is currently empty.");
        }
        return;
    }

    hideStates();

    booksTableBody.innerHTML = filteredBooks
        .map((book, index) => createBookRow(book, index))
        .join("");

    tableContainer.classList.remove("hidden");

    document.querySelectorAll(".edit-book").forEach((button) => {
        button.addEventListener("click", () => {
            const book = filteredBooks[Number(button.dataset.index)];
            if (book) openEditBook(book);
        });
    });

    document.querySelectorAll(".delete-book").forEach((button) => {
        button.addEventListener("click", () => {
            const book = filteredBooks[Number(button.dataset.index)];
            if (book) openDeleteModal(book);
        });
    });
}

function createBookRow(book, index) {
    const coverUrl = resolveBookCoverUrl(book.cover_url);

    const cover = coverUrl
        ? `<img class="book-table-cover" src="${escapeAttribute(coverUrl)}" alt="${escapeAttribute(book.name || "Book cover")}" loading="lazy" onerror="this.onerror=null;this.style.display='none';this.nextElementSibling.style.display='flex';"><div class="book-table-cover-placeholder" style="display:none;">📚</div>`
        : `<div class="book-table-cover-placeholder">📚</div>`;

    const description = book.description
        ? truncate(book.description, 110)
        : "No description";

    return `
        <tr>
            <td>${index + 1}</td>
            <td>${cover}</td>
            <td>
                <strong>${escapeHtml(book.name || "Untitled Book")}</strong>
                <div class="book-slug">${escapeHtml(book.slug || "—")}</div>
            </td>
            <td>${escapeHtml(description)}</td>
            <td>${formatDate(book.created_at)}</td>
            <td>
                <div class="table-actions">
                    <button type="button" class="btn btn-sm btn-secondary edit-book" data-index="${index}">Edit</button>
                    <button type="button" class="btn btn-sm btn-danger delete-book" data-index="${index}">Delete</button>
                </div>
            </td>
        </tr>
    `;
}

/* =========================================================
   ADD / EDIT
========================================================= */

function openAddBook() {
    editingBook = null;
    selectedMediaUrl = null;

    bookForm?.reset();
    if (bookId) bookId.value = "";
    if (bookFormTitle) bookFormTitle.textContent = "Add New Book";
    if (saveButton) saveButton.textContent = "Save Book";

    renderMediaOptions();
    updateCoverPreview(null);
    openModal(bookModal);

    setTimeout(() => bookName?.focus(), 100);
}

function openEditBook(book) {
    editingBook = book;

    if (bookId) bookId.value = book.id || "";
    if (bookName) bookName.value = book.name || "";
    if (bookSlug) bookSlug.value = book.slug || "";
    if (bookDescription) bookDescription.value = book.description || "";

    if (bookFormTitle) bookFormTitle.textContent = "Edit Book";
    if (saveButton) saveButton.textContent = "Update Book";

    renderMediaOptions(book.cover_url || "");
    selectedMediaUrl = resolveBookCoverUrl(book.cover_url);
    updateCoverPreview(selectedMediaUrl);
    openModal(bookModal);
}

function closeBookModal() {
    editingBook = null;
    selectedMediaUrl = null;
    bookForm?.reset();
    updateCoverPreview(null);
    closeModalElement(bookModal);
}

async function handleSubmit(event) {
    event.preventDefault();

    const name = bookName?.value.trim() || "";
    const description = bookDescription?.value.trim() || "";
    const slug = bookSlug?.value.trim() || generateSlug(name);
    // Books keep the Media Storage path in cover_url for compatibility
    // with the existing Books table. The image URL is generated at runtime.
    const coverStoragePath = getSelectedMediaStoragePath();

    if (!name) {
        showNotification("Please enter the book name.", "error");
        bookName?.focus();
        return;
    }

    if (!slug) {
        showNotification("Unable to generate a valid slug.", "error");
        return;
    }

    setSavingState(true);

    try {
        const payload = {
            name,
            slug,
            description: description || null,
            cover_url: coverStoragePath || null
        };

        let error = null;

        if (editingBook) {
            ({ error } = await supabase
                .from("books")
                .update(payload)
                .eq("id", editingBook.id));
        } else {
            ({ error } = await supabase
                .from("books")
                .insert(payload));
        }

        if (error) {
            if (error.code === "23505") {
                throw new Error("That slug is already being used. Please choose another slug.");
            }
            throw error;
        }

        showNotification(
            editingBook ? "Book updated successfully." : "Book added successfully.",
            "success"
        );

        closeBookModal();
        await loadBooks();
    } catch (error) {
        console.error("Book save error:", error);
        showNotification(error?.message || "Unable to save the book.", "error");
    } finally {
        setSavingState(false);
    }
}

/* =========================================================
   DELETE
========================================================= */

function openDeleteModal(book) {
    bookToDelete = book;
    if (confirmMessage) {
        confirmMessage.textContent = `Are you sure you want to delete “${book.name || "this book"}”?`;
    }
    openModal(confirmModal);
}

function closeDeleteModal() {
    bookToDelete = null;
    closeModalElement(confirmModal);
}

async function confirmBookDelete() {
    if (!bookToDelete) return;

    confirmDelete.disabled = true;

    try {
        const { error } = await supabase
            .from("books")
            .delete()
            .eq("id", bookToDelete.id);

        if (error) throw error;

        showNotification("Book deleted successfully.", "success");
        closeDeleteModal();
        await loadBooks();
    } catch (error) {
        console.error("Book deletion error:", error);
        showNotification(error?.message || "Unable to delete the book.", "error");
    } finally {
        confirmDelete.disabled = false;
    }
}

/* =========================================================
   MODAL HELPERS
========================================================= */

function openModal(modal) {
    if (!modal) return;
    modal.classList.add("active");
}

function closeModalElement(modal) {
    if (!modal) return;
    modal.classList.remove("active");
}

function setSavingState(saving) {
    if (!saveButton) return;
    saveButton.disabled = saving;
    saveButton.textContent = saving
        ? (editingBook ? "Updating..." : "Saving...")
        : (editingBook ? "Update Book" : "Save Book");
}

/* =========================================================
   STATES
========================================================= */

function showLoading() {
    loadingState?.classList.remove("hidden");
    errorState?.classList.add("hidden");
    emptyState?.classList.add("hidden");
    tableContainer?.classList.add("hidden");
}

function showEmpty(message) {
    loadingState?.classList.add("hidden");
    errorState?.classList.add("hidden");
    emptyState?.classList.remove("hidden");
    tableContainer?.classList.add("hidden");
    if (emptyMessage) emptyMessage.textContent = message;
}

function showError(message) {
    loadingState?.classList.add("hidden");
    emptyState?.classList.add("hidden");
    tableContainer?.classList.add("hidden");
    errorState?.classList.remove("hidden");
    if (errorMessage) errorMessage.textContent = message;
}

function hideStates() {
    loadingState?.classList.add("hidden");
    errorState?.classList.add("hidden");
    emptyState?.classList.add("hidden");
}

/* =========================================================
   HELPERS
========================================================= */

function generateSlug(value) {
    return String(value || "")
        .toLowerCase()
        .trim()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-+|-+$/g, "");
}

function formatDate(value) {
    if (!value) return "—";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "—";

    return new Intl.DateTimeFormat("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    }).format(date);
}

function truncate(value, length) {
    const text = String(value || "");
    return text.length <= length ? text : `${text.slice(0, length).trim()}...`;
}

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

function showNotification(message, type = "success") {
    try {
        showToast(message, type);
    } catch {
        console.log(message);
    }
}
