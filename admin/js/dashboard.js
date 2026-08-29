import { requireAuth, logout } from "./auth.js";
import { supabase } from "./supabase.js";
/* ==========================================
   START
========================================== */

init();

async function init() {

    const user = await requireAuth();

    if (!user) return;

    await loadComponents();

    loadUser(user);

    setupEvents();

    await loadStatistics();

    await loadRecentHymns();

}

/* ==========================================
   LOAD COMPONENTS
========================================== */

async function loadComponents() {

const sidebarHTML = await fetch("./components/sidebar.html")
    .then(res => res.text());

document.getElementById("sidebar").innerHTML = sidebarHTML;

const navbarHTML = await fetch("./components/navbar.html")
    .then(res => res.text());

document.getElementById("navbar").innerHTML = navbarHTML;

}

/* ==========================================
   LOAD USER
========================================== */

function loadUser(user) {

    document.getElementById("adminName").textContent =
        user.email.split("@")[0];

    document.getElementById("adminEmail").textContent =
        user.email;

}

/* ==========================================
   EVENTS
========================================== */

function setupEvents() {

    document.addEventListener("click", (event) => {

        if (event.target.id === "logoutButton") {

            logout();

        }

    });

}

/* ==========================================
   DASHBOARD STATS
========================================== */

async function loadStatistics() {

    const [

        hymns,

        authors,

        books,

        interviews

    ] = await Promise.all([

        supabase
            .from("hymns")
            .select("*", { count: "exact", head: true }),

        supabase
            .from("authors")
            .select("*", { count: "exact", head: true }),

        supabase
            .from("books")
            .select("*", { count: "exact", head: true }),

        supabase
            .from("interviews")
            .select("*", { count: "exact", head: true })

    ]);

    document.getElementById("totalHymns").textContent =
        hymns.count ?? 0;

    document.getElementById("totalAuthors").textContent =
        authors.count ?? 0;

    document.getElementById("totalBooks").textContent =
        books.count ?? 0;

    document.getElementById("totalInterviews").textContent =
        interviews.count ?? 0;

}

/* ==========================================
   RECENT HYMNS
========================================== */

async function loadRecentHymns() {

    const { data, error } = await supabase

        .from("hymns")

        .select(`
            number,
            title_telugu,
            authors(name)
        `)

        .order("number", { ascending: false })

        .limit(10);

    if (error) {

        console.error(error);

        return;

    }

    const container =
        document.getElementById("recentHymns");

    container.innerHTML = `

        <table class="recent-table">

            <thead>

                <tr>

                    <th>No.</th>

                    <th>Title</th>

                    <th>Author</th>

                </tr>

            </thead>

            <tbody>

                ${data.map(hymn => `

                    <tr>

                        <td>${hymn.number}</td>

                        <td>${hymn.title_telugu}</td>

                        <td>${hymn.authors?.name || "-"}</td>

                    </tr>

                `).join("")}

            </tbody>

        </table>

    `;

}