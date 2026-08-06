/**
 * ==========================================
 * Andhra Kraistava Keerthanalu
 * Global Search
 * ==========================================
 */

import { searchSongs } from "./utils/hymn-utils.js";

let initialized = false;

/* ==========================================
   INITIALIZE GLOBAL SEARCH
========================================== */

export function initializeGlobalSearch() {

    if (initialized) return;

    // Wait until navbar and modal are loaded
    setTimeout(() => {

        const openButton = document.getElementById("openSearch");
        const modal = document.getElementById("globalSearchModal");
        const closeButton = document.getElementById("closeSearch");
        const input = document.getElementById("globalSearchInput");
        const resultsContainer = document.getElementById("searchResults");

        if (
            !openButton ||
            !modal ||
            !closeButton ||
            !input ||
            !resultsContainer
        ) {
            console.error("Global Search: Required elements not found.");
            return;
        }

        initialized = true;

        /* ==========================================
           OPEN SEARCH
        ========================================== */

        function openSearch() {

            modal.classList.add("active");

            document.body.style.overflow = "hidden";

            input.value = "";

            renderEmpty(resultsContainer);

            input.focus();

        }

        /* ==========================================
           CLOSE SEARCH
        ========================================== */

        function closeSearch() {

            modal.classList.remove("active");

            document.body.style.overflow = "";

        }

        /* ==========================================
           BUTTON EVENTS
        ========================================== */

        openButton.addEventListener("click", openSearch);

        closeButton.addEventListener("click", closeSearch);

        modal.addEventListener("click", (event) => {

            if (event.target === modal) {

                closeSearch();

            }

        });

        document.addEventListener("keydown", (event) => {

            if (
                (event.ctrlKey || event.metaKey) &&
                event.key.toLowerCase() === "k"
            ) {

                event.preventDefault();

                openSearch();

            }

            if (event.key === "Escape") {

                closeSearch();

            }

        });

        /* ==========================================
           LIVE SEARCH
        ========================================== */

        input.addEventListener("input", () => {

            const query = input.value
                .trim()
                .toLowerCase();

            if (!query) {

                renderEmpty(resultsContainer);

                return;

            }

            const results = searchSongs(query => {

                return (

                    String(song.number ?? "")
                        .includes(query)

                    ||

                    (song.titleTelugu ?? "")
                        .toLowerCase()
                        .includes(query)

                    ||

                    (song.titleEnglish ?? "")
                        .toLowerCase()
                        .includes(query)

                    ||

                    (song.author ?? "")
                        .toLowerCase()
                        .includes(query)

                );

            });

            renderResults(resultsContainer, results);

        });

        renderEmpty(resultsContainer);

    }, 200);

}

/* ==========================================
   RENDER RESULTS
========================================== */

function renderResults(container, results) {

    if (!results.length) {

        container.innerHTML = `

            <div class="search-empty">

                <h2>No Results Found</h2>

                <p>Try another search term.</p>

            </div>

        `;

        return;

    }

    container.innerHTML = results.map(song => `

        <a
            href="hymn.html?id=${song.number}"
            class="search-result">

            <div class="result-icon">

                🎵

            </div>

            <div class="result-content">

                <h4>${song.titleTelugu || "Untitled"}</h4>

                <small>

                    Hymn ${song.number}

                    ${song.titleEnglish ? `• ${song.titleEnglish}` : ""}

                </small>

            </div>

        </a>

    `).join("");

}

/* ==========================================
   EMPTY STATE
========================================== */

function renderEmpty(container) {

    container.innerHTML = `

        <div class="search-empty">

            <h2>Search Everything</h2>

            <p>

                Search hymns, authors, books, interviews and more.

            </p>

        </div>

    `;

}