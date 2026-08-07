/**
 * ===========================================
 * Andhra Kraistava Keerthanalu
 * Global Search (Supabase Version)
 * ===========================================
 */

import { supabase } from "./supabase.js";

let initialized = false;

/* ==========================================
   INITIALIZE
========================================== */

export function initializeGlobalSearch() {

    if (initialized) return;

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

        function openSearch() {

            modal.classList.add("active");
            document.body.style.overflow = "hidden";

            input.value = "";

            renderEmpty(resultsContainer);

            input.focus();

        }

        function closeSearch() {

            modal.classList.remove("active");
            document.body.style.overflow = "";

        }

        openButton.addEventListener("click", openSearch);

        closeButton.addEventListener("click", closeSearch);

        modal.addEventListener("click", (e) => {

            if (e.target === modal) {

                closeSearch();

            }

        });

        document.addEventListener("keydown", (e) => {

            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {

                e.preventDefault();
                openSearch();

            }

            if (e.key === "Escape") {

                closeSearch();

            }

        });

        /* ==========================================
           LIVE SEARCH
        ========================================== */

        let debounce;

        input.addEventListener("input", () => {

            clearTimeout(debounce);

            debounce = setTimeout(async () => {

                const query = input.value.trim();

                if (!query) {

                    renderEmpty(resultsContainer);
                    return;

                }

                const results = await searchSongs(query);

                renderResults(resultsContainer, results);

            }, 250);

        });

        renderEmpty(resultsContainer);

    }, 200);

}

/* ==========================================
   SEARCH DATABASE
========================================== */

async function searchSongs(query) {

    const isNumber = /^\d+$/.test(query);

    let request = supabase
        .from("hymns")
        .select(`
            number,
            title_telugu,
            title_english,
            authors(name)
        `);

    if (isNumber) {

        request = request.eq("number", Number(query));

    } else {

        // Search Telugu title first
        let response = await supabase
            .from("hymns")
            .select(`
                number,
                title_telugu,
                title_english,
                authors(name)
            `)
            .ilike("title_telugu", `%${query}%`)
            .limit(20);

        if (!response.error && response.data.length > 0) {

            return response.data.map(song => ({
                number: song.number,
                titleTelugu: song.title_telugu,
                titleEnglish: song.title_english,
                author: song.authors?.name || ""
            }));

        }

        // Search English title
        response = await supabase
            .from("hymns")
            .select(`
                number,
                title_telugu,
                title_english,
                authors(name)
            `)
            .ilike("title_english", `%${query}%`)
            .limit(20);

        if (!response.error && response.data.length > 0) {

            return response.data.map(song => ({
                number: song.number,
                titleTelugu: song.title_telugu,
                titleEnglish: song.title_english,
                author: song.authors?.name || ""
            }));

        }

        // Search author
        response = await supabase
            .from("hymns")
            .select(`
                number,
                title_telugu,
                title_english,
                authors(name)
            `)
            .limit(20);

        if (response.error) {

            console.error(response.error);
            return [];

        }

        return response.data
            .filter(song =>
                (song.authors?.name || "")
                    .toLowerCase()
                    .includes(query.toLowerCase())
            )
            .map(song => ({
                number: song.number,
                titleTelugu: song.title_telugu,
                titleEnglish: song.title_english,
                author: song.authors?.name || ""
            }));

    }

    const { data, error } = await request.limit(20);

    if (error) {

        console.error(error);
        return [];

    }

    return data.map(song => ({
        number: song.number,
        titleTelugu: song.title_telugu,
        titleEnglish: song.title_english,
        author: song.authors?.name || ""
    }));

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
                    ${song.titleEnglish ? ` • ${song.titleEnglish}` : ""}
                    ${song.author ? ` • ${song.author}` : ""}
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