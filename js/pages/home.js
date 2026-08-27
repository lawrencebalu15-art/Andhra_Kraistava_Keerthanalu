// home.js
// ==========================================
// Andhra Kraistava Keerthanalu
// Home Page
// ==========================================

import { supabase } from "../supabase.js";
import { initThree } from "../three/index.js";
import { setPageHeader } from "../components/page-header.js";

/* ==========================================
   INITIALIZE HOME PAGE
========================================== */

document.addEventListener("DOMContentLoaded", async () => {

    initThree();

    setPageHeader(
        "ఆంధ్ర క్రైస్తవ కీర్తనలు",
        "Telugu & English Christian Hymns"
    );

    await loadFeaturedHymns();
    await loadFeaturedAuthors();

    initializeCounters();

});


/* ==========================================
   FEATURED HYMNS
========================================== */

async function loadFeaturedHymns() {

    const container = document.getElementById("featuredHymnsGrid");

    if (!container) return;

    try {

        const { data, error } = await supabase
            .from("hymns")
            .select(`
                id,
                number,
                title_telugu,
                title_english,
                author_id,
                authors (
                    id,
                    name
                )
            `)
            .order("number", { ascending: true })
            .limit(3);

        if (error) throw error;

        if (!data || data.length === 0) {

            container.innerHTML = `
                <p class="empty-state">
                    No hymns available yet.
                </p>
            `;

            return;
        }

        container.innerHTML = data.map(hymn => {

            const authorName =
                hymn.authors?.name || "Unknown Author";

            return `
                <article class="card">

                    <span class="card-number">
                        Hymn ${escapeHTML(hymn.number)}
                    </span>

                    <h3>
                        ${escapeHTML(
                            hymn.title_telugu || "Untitled Hymn"
                        )}
                    </h3>

                    <p>
                        ${escapeHTML(
                            hymn.title_english || ""
                        )}
                    </p>

                    <small>
                        ${escapeHTML(authorName)}
                    </small>

                    <a
                        href="hymn.html?id=${encodeURIComponent(hymn.number)}"
                        class="author-link"
                    >
                        View Hymn →
                    </a>

                </article>
            `;

        }).join("");

    } catch (error) {

        console.error(
            "[Home] Failed to load featured hymns:",
            error
        );

        container.innerHTML = `
            <p class="empty-state">
                Unable to load hymns right now.
            </p>
        `;
    }
}


/* ==========================================
   FEATURED AUTHORS
========================================== */

async function loadFeaturedAuthors() {

    const container =
        document.getElementById("featuredAuthorsGrid");

    if (!container) return;

    try {

        const { data, error } = await supabase
            .from("authors")
            .select(`
                id,
                name,
                photo_url,
                bio
            `)
            .order("id", { ascending: true })
            .limit(3);

        if (error) throw error;

        if (!data || data.length === 0) {

            container.innerHTML = `
                <p class="empty-state">
                    No authors available yet.
                </p>
            `;

            return;
        }

        container.innerHTML = data.map(author => {

            const name =
                author.name || "Unknown Author";

            const initials =
                getInitials(name);

            const description =
                author.bio ||
                "Information about this hymn writer is being collected and preserved in the archive.";

            const avatar = author.photo_url
                ? `
                    <div class="author-avatar">
                        <img
                            src="${escapeAttribute(author.photo_url)}"
                            alt="${escapeAttribute(name)}"
                            loading="lazy"
                        >
                    </div>
                  `
                : `
                    <div class="author-avatar">
                        ${escapeHTML(initials)}
                    </div>
                  `;

            return `
                <article class="author-card">

                    ${avatar}

                    <h3>
                        ${escapeHTML(name)}
                    </h3>

                    <p class="author-role">
                        Hymn Writer
                    </p>

                    <p class="author-description">
                        ${escapeHTML(description)}
                    </p>

                    <a
                        href="author.html?id=${encodeURIComponent(author.id)}"
                        class="author-link"
                    >
                        View Profile →
                    </a>

                </article>
            `;

        }).join("");

    } catch (error) {

        console.error(
            "[Home] Failed to load authors:",
            error
        );

        container.innerHTML = `
            <p class="empty-state">
                Unable to load authors right now.
            </p>
        `;
    }
}


/* ==========================================
   INITIALS
========================================== */

function getInitials(name) {

    const words = name
        .trim()
        .split(/\s+/)
        .filter(Boolean);

    if (!words.length) return "?";

    if (words.length === 1) {
        return words[0]
            .substring(0, 2)
            .toUpperCase();
    }

    return (
        words[0].charAt(0) +
        words[words.length - 1].charAt(0)
    ).toUpperCase();
}


/* ==========================================
   HTML SAFETY
========================================== */

function escapeHTML(value) {

    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


function escapeAttribute(value) {

    return escapeHTML(value);
}


/* ==========================================
   COUNTER ANIMATION
========================================== */

function initializeCounters() {

    const counters =
        document.querySelectorAll(".stat-card h2");

    if (!counters.length) return;

    const observer =
        new IntersectionObserver((entries) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) return;

                const counter = entry.target;

                const target =
                    parseInt(counter.textContent);

                if (isNaN(target)) return;

                let current = 0;

                const increment =
                    Math.ceil(target / 80);

                const timer =
                    setInterval(() => {

                        current += increment;

                        if (current >= target) {

                            current = target;

                            clearInterval(timer);
                        }

                        counter.textContent =
                            `${current}+`;

                    }, 20);

                observer.unobserve(counter);
            });

        });

    counters.forEach(counter =>
        observer.observe(counter)
    );
}