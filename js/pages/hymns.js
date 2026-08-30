import { supabase } from "../supabase.js";

let songsList = [];

async function loadSongs() {
    console.log("loadSongs started");

    try {
        const { data, error } = await supabase
            .from("hymns")
            .select(`
                *,
                authors(name),
                books(name),
                categories(name)
            `);

        console.log("Supabase response:", { data, error });

        if (error) {
            console.error("Supabase error:", error);
            return;
        }

        songsList = data.map(song => ({
            ...song,
            author: song.authors?.name || "Unknown",
            book: song.books?.name || "",
            category: song.categories?.name || "",
            titleTelugu: song.title_telugu,
            titleEnglish: song.title_english,
            youtubeLinks: song.youtube_links || []
        }));

        console.log("Loaded", songsList.length, "songs");

        initialize();
    } catch (err) {
        console.error("loadSongs crashed:", err);
    }
}

loadSongs();
import { setPageHeader } from "../components/page-header.js";

setPageHeader(
    "కీర్తనలు",
    "Browse Telugu and English Hymns"
);



/* ======================================================
DOM ELEMENTS
====================================================== */

const hymnsBody = document.getElementById("hymnsBody");

const searchInput = document.getElementById("searchInput");

const resultsText = document.getElementById("resultsText");

const languageContainer = document.getElementById("languageContainer");

const alphabetContainer = document.getElementById("alphabetContainer");

const sortSelect = document.getElementById("sortSelect");


/* ======================================================
   APPLICATION STATE
====================================================== */

const state = {

    language: "all",

    letter: "All",

    search: ""

};


/* ======================================================
   TELUGU ALPHABETS
====================================================== */

const TELUGU_LETTERS = [

    "All",

    "అ","ఆ","ఇ","ఈ","ఉ","ఊ","ఋ",

    "ఎ","ఏ","ఐ","ఒ","ఓ","ఔ",

    "క","ఖ","గ","ఘ","ఙ",

    "చ","ఛ","జ","ఝ","ఞ",

    "ట","ఠ","డ","ఢ","ణ",

    "త","థ","ద","ధ","న",

    "ప","ఫ","బ","భ","మ",

    "య","ర","ల","వ",

    "శ","ష","స","హ"

];

const ENGLISH_LETTERS = [

    "All",

    "A","B","C","D","E","F","G",

    "H","I","J","K","L","M","N",

    "O","P","Q","R","S","T","U",

    "V","W","X","Y","Z"

];


/* ======================================================
   HELPERS
====================================================== */

function getCurrentLetters() {

    return state.language === "english"

        ? ENGLISH_LETTERS

        : TELUGU_LETTERS;

}

function getAlphabetTitle() {

    return state.language === "english"

        ? "Browse by English Alphabet"

        : "Browse by Telugu Letter";

}

function getSongTitle(song) {

    const language = String(song.language || "")
        .trim()
        .toLowerCase();

    /* English hymn */
    if (
        language === "english" ||
        language === "en"
    ) {
        return String(
            song.titleEnglish ||
            song.title ||
            ""
        ).trim();
    }

    /* Telugu hymn */
    if (song.titleTelugu?.trim()) {
        return song.titleTelugu.trim();
    }

    /* Fallback */
    return `~~~${song.number}`;
}

/* ======================================================
   LANGUAGE FILTER
====================================================== */

function renderLanguageFilter() {

    languageContainer.innerHTML = `

        <div class="filter-group">

            <div class="filter-title">

                Collections

            </div>

            <div class="language-buttons">

                <button
                    class="language-btn ${state.language==="all"?"active":""}"
                    data-language="all">

                    📚 All Hymns

                </button>

                <button
                    class="language-btn ${state.language==="telugu"?"active":""}"
                    data-language="telugu">

                    📖 తెలుగు కీర్తనలు

                </button>

                <button
                    class="language-btn ${state.language==="english"?"active":""}"
                    data-language="english">

                    🌍 English Hymns

                </button>

            </div>

        </div>

    `;

    languageContainer

        .querySelectorAll(".language-btn")

        .forEach(button => {

            button.addEventListener("click", () => {

                state.language = button.dataset.language;

                state.letter = "All";

                renderLanguageFilter();

                renderAlphabetFilter();

                updateHymns();

            });

        });

}
/* ======================================================
   ALPHABET FILTER
====================================================== */

function renderAlphabetFilter() {

    const letters = getCurrentLetters();

    alphabetContainer.innerHTML = `

        <div class="filter-group">

            <div class="filter-title">

                ${getAlphabetTitle()}

            </div>

            <div class="filter-buttons">

                ${letters.map(letter => `

                    <button
                        class="filter-btn ${state.letter === letter ? "active" : ""}"
                        data-letter="${letter}">

                        ${letter}

                    </button>

                `).join("")}

            </div>

        </div>

    `;

    alphabetContainer
        .querySelectorAll(".filter-btn")
        .forEach(button => {

            button.addEventListener("click", () => {

                state.letter = button.dataset.letter;

                renderAlphabetFilter();

                updateHymns();

            });

        });

}


/* ======================================================
   SEARCH
====================================================== */

searchInput.addEventListener("input", (event) => {

    state.search = event.target.value
        .trim()
        .toLowerCase();

    /*
     * SEARCH TAKES PRIORITY OVER ALPHABET FILTER
     *
     * If the user starts searching while a Telugu
     * alphabet is selected, automatically clear the
     * alphabet filter so the search runs across the
     * complete hymn database.
     */
    if (state.search !== "" && state.letter !== "All") {

        state.letter = "All";

        renderAlphabetFilter();
    }

    updateHymns();
});


/* ======================================================
   APPLY FILTERS
====================================================== */
/* ======================================================
   APPLY FILTERS
   ====================================================== */

function applyFilters() {

    return songsList.filter(song => {

        /* -----------------------------
           NORMALIZE LANGUAGE
        ----------------------------- */

        const language = String(song.language || "")
            .trim()
            .toLowerCase();

        const hasTeluguTitle =
            String(song.titleTelugu || "").trim().length > 0;

        const hasEnglishTitle =
            String(song.titleEnglish || "").trim().length > 0;

        /* -----------------------------
           LANGUAGE FILTER
        ----------------------------- */

        let languageMatch = true;

        if (state.language === "telugu") {

            /*
             * Treat the hymn as Telugu when:
             * 1. language is explicitly Telugu
             * 2. language is "te"
             * 3. language is missing but a Telugu title exists
             */

            languageMatch =
                language === "telugu" ||
                language === "te" ||
                (
                    language === "" &&
                    hasTeluguTitle
                );

        } else if (state.language === "english") {

            /*
             * English hymns require an explicit
             * English language value.
             */

            languageMatch =
                language === "english" ||
                language === "en";

        }

        /* -----------------------------
           TITLE
        ----------------------------- */

        const title = getSongTitle(song);

        const englishTitle =
            String(song.titleEnglish || "");

        /* -----------------------------
           SEARCH
        ----------------------------- */
        const searchTerm = state.search.trim();

/*
 * If the search contains only numbers,
 * treat it as an exact hymn-number search.
 */
const isNumberSearch = /^\d+$/.test(searchTerm);

const searchMatch =

    searchTerm === "" ||

    (
        isNumberSearch
            ? String(song.number) === searchTerm
            : (
                title.toLowerCase().includes(searchTerm) ||
                englishTitle.toLowerCase().includes(searchTerm) ||
                String(song.author || "")
                    .toLowerCase()
                    .includes(searchTerm)
            )
    );
        /* -----------------------------
           ALPHABET FILTER
        ----------------------------- */

        const letterMatch =

            state.letter === "All" ||

            title
                .trim()
                .startsWith(state.letter);

        /* -----------------------------
           FINAL RESULT
        ----------------------------- */

        return (
            languageMatch &&
            searchMatch &&
            letterMatch
        );

    });

}
/* ======================================================
   CREATE HYMN ROW
====================================================== */
function createHymnRow(song) {

    const title = getSongTitle(song);

    const youtubeIcons = song.youtubeLinks?.length
        ? song.youtubeLinks
            .slice(0, 5)
            .map(link => `
                <a
                    href="${link}"
                    class="youtube-link"
                    target="_blank"
                    rel="noopener"
                    title="Watch on YouTube"
                    onclick="event.stopPropagation()">

                    <svg
                        class="youtube-icon"
                        viewBox="0 0 24 24"
                        fill="currentColor">

                        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8z"/>

                        <path
                            d="M10 15.5V8.5L16 12z"
                            fill="white"/>

                    </svg>

                </a>
            `)
            .join("")
        : "";

    return `

        <article class="hymn-row">

            <div class="hymn-number">
                ${song.number}
            </div>

            <a href="hymn.html?id=${song.number}" class="hymn-link">

                <div class="hymn-title">
                    ${title}
                </div>

            </a>

            <div class="hymn-author">
                ${song.author || "Unknown Writer"}
            </div>

            <div class="hymn-youtube">
                ${youtubeIcons}
            </div>

        </article>

    `;

}

/* ======================================================
   RENDER HYMNS
====================================================== */

function renderHymns(hymns) {

    resultsText.textContent = `Showing ${hymns.length} Hymns`;

    if (!hymns.length) {

        hymnsBody.innerHTML = `

            <div class="empty-state">

                <h2>Hymn Not Yet Uploaded</h2>

                <p>Try changing the search or filters.</p>

            </div>

        `;

        return;

    }

    hymnsBody.innerHTML = hymns
        .map(createHymnRow)
        .join("");

}


/* ======================================================
   SORT HYMNS
====================================================== */

function sortSongs(hymns) {

    const sorted = [...hymns];

    switch (sortSelect.value) {

        case "number-asc":

            sorted.sort((a, b) => Number(a.number) - Number(b.number));
            break;

        case "number-desc":

            sorted.sort((a, b) => Number(b.number) - Number(a.number));
            break;

        case "telugu-asc":

            sorted.sort((a, b) =>
                getSongTitle(a).localeCompare(
                    getSongTitle(b),
                    "te"
                )
            );
            break;

        case "telugu-desc":

            sorted.sort((a, b) =>
                getSongTitle(b).localeCompare(
                    getSongTitle(a),
                    "te"
                )
            );
            break;

        case "author-asc":

            sorted.sort((a, b) =>
                (a.author || "").localeCompare(
                    b.author || "",
                    "en",
                    { sensitivity: "base" }
                )
            );
            break;

        case "author-desc":

            sorted.sort((a, b) =>
                (b.author || "").localeCompare(
                    a.author || "",
                    "en",
                    { sensitivity: "base" }
                )
            );
            break;

        default:

            sorted.sort((a, b) => Number(a.number) - Number(b.number));

    }

    return sorted;

}
/* ======================================================
   UPDATE HYMNS
====================================================== */

function updateHymns() {

    // 1. Apply search and filters
    let hymns = applyFilters();

    // 2. Apply sorting
    hymns = sortSongs(hymns);

    // 3. Render results
    renderHymns(hymns);

}/* ======================================================
   EVENTS
====================================================== */

function attachEvents() {

    if (searchInput) {

        searchInput.addEventListener("input", (e) => {

            state.search = e.target.value.trim().toLowerCase();

            updateHymns();

        });

    }

    if (sortSelect) {

        sortSelect.addEventListener("change", () => {

            updateHymns();

        });

    }

}

/* ======================================================
   INITIALIZE APPLICATION
====================================================== */

function initialize() {

    console.log("Songs Loaded:", songsList.length);

    if (!Array.isArray(songsList) || songsList.length === 0) {

        console.error("songsList is empty.");

        resultsText.textContent = "Showing 0 Hymns";

        hymnsBody.innerHTML = `
            <div class="empty-state">
                <h2>Hymn Not Yet Uploaded </h2>
                <p>songsList is empty.</p>
            </div>
        `;

        return;

    }

    renderLanguageFilter();

    renderAlphabetFilter();

    attachEvents();

    if (sortSelect) {
        sortSelect.value = "number-asc";
    }

    updateHymns();

}

