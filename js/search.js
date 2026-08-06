/**
 * ==========================================
 * Search Modal
 * ==========================================
 */
console.log("Search JS Loaded");
function initializeSearch() {

    const openButton = document.getElementById("openSearch");
    const closeButton = document.getElementById("closeSearch");
    const modal = document.getElementById("searchModal");
    const input = document.getElementById("globalSearch");

    if (!openButton || !modal) {
        console.warn("Search elements not found.");
        return;
    }

    // Open Search
    openButton.addEventListener("click", () => {

        modal.classList.add("active");

        input?.focus();

        document.body.classList.add("modal-open");

    });

    // Close Button
    closeButton?.addEventListener("click", closeSearch);

    // Click Outside
    modal.addEventListener("click", (event) => {

        if (event.target === modal) {

            closeSearch();

        }

    });

    // Escape Key
    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            closeSearch();

        }

    });

    function closeSearch() {

        modal.classList.remove("active");

        document.body.classList.remove("modal-open");

    }


function performSearch(query) {

    if (!query.trim()) return;

    window.location.href =
        `hymns.html?search=${encodeURIComponent(query.trim())}`;

}

}