import { supabase } from "../supabase.js";

let authors = [];
let filteredAuthors = [];
let hymns = [];

const authorsGrid = document.getElementById("authorsGrid");
const loading = document.getElementById("authorsLoading");
const empty = document.getElementById("authorsEmpty");

const searchInput = document.getElementById("authorSearch");
const sortSelect = document.getElementById("authorSort");

init();

async function init() {
    await loadData();

    updateStatistics();

    renderAuthors();

    setupEvents();
}

async function loadData() {

    loading.style.display = "block";
    authorsGrid.innerHTML = "";
    empty.style.display = "none";

    // Load Authors
    const { data: authorsData, error: authorError } = await supabase
        .from("authors")
        .select("*")
        .order("name");

    if (authorError) {
        console.error(authorError);
        loading.style.display = "none";
        return;
    }

    // Load Hymns
    const { data: hymnsData, error: hymnError } = await supabase
        .from("hymns")
        .select("id, author_id");

    if (hymnError) {
        console.error(hymnError);
        loading.style.display = "none";
        return;
    }

    authors = authorsData || [];
    hymns = hymnsData || [];

    filteredAuthors = [...authors];

    loading.style.display = "none";

    console.log(authors);
    console.log(hymns);
}

function updateStatistics() {

    document.getElementById("totalAuthors").textContent = authors.length;

    document.getElementById("totalHymns").textContent = hymns.length;

    document.getElementById("totalBooks").textContent = 0;
}

function renderAuthors() {

    if (filteredAuthors.length === 0) {

        authorsGrid.innerHTML = "";
        empty.style.display = "block";
        return;
    }

    empty.style.display = "none";

    authorsGrid.innerHTML = filteredAuthors
        .map(createAuthorCard)
        .join("");
}

function createAuthorCard(author) {

    const hymnCount = hymns.filter(
        hymn => hymn.author_id === author.id
    ).length;

    const image =
        author.photo_url ||
        "https://placehold.co/400x400?text=Author";

    return `
        <div class="author-card">

            <div class="author-image">
                <img
                    src="${image}"
                    alt="${author.name}">
            </div>

            <div class="author-content">

                <h3>${author.name}</h3>

                <p>
                    ${author.bio || "Biography coming soon..."}
                </p>

                <div class="author-meta">
                    🎵 ${hymnCount} Hymns
                </div>

                <a
                    href="author.html?id=${author.id}"
                    class="btn btn-primary">

                    View Author

                </a>

            </div>

        </div>
    `;
}

function setupEvents() {

    if (searchInput) {
        searchInput.addEventListener("input", filterAuthors);
    }

    if (sortSelect) {
        sortSelect.addEventListener("change", filterAuthors);
    }
}

function filterAuthors() {

    const keyword = searchInput.value.toLowerCase().trim();

    filteredAuthors = authors.filter(author => {

        const name = (author.name || "").toLowerCase();
        const bio = (author.bio || "").toLowerCase();

        return (
            name.includes(keyword) ||
            bio.includes(keyword)
        );
    });

    if (sortSelect.value === "za") {

        filteredAuthors.sort((a, b) =>
            b.name.localeCompare(a.name)
        );

    } else {

        filteredAuthors.sort((a, b) =>
            a.name.localeCompare(b.name)
        );
    }

    renderAuthors();
}