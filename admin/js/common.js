/* ==========================================
   ADMIN COMMON
   Shared Sidebar + Navbar
========================================== */
import { supabase } from "./supabase.js";
document.addEventListener("DOMContentLoaded", async () => {

    await loadSidebar();
    await loadNavbar();
    await loadAdminUser();

    setActiveSidebar();
    setPageTitle();

});


/* ==========================================
   LOAD SIDEBAR
========================================== */

async function loadSidebar() {

    const sidebar = document.getElementById("sidebar");

    if (!sidebar) return;

    try {

        const response = await fetch("/admin/components/sidebar.html");

        if (!response.ok) {
            throw new Error(
                `Sidebar failed to load: ${response.status}`
            );
        }

        sidebar.innerHTML = await response.text();

    } catch (error) {

        console.error("Sidebar error:", error);

    }

}

/* ==========================================
   LOAD ADMIN USER
========================================== */

async function loadAdminUser() {

    const adminName = document.getElementById("adminName");
    const adminEmail = document.getElementById("adminEmail");

    if (!adminName || !adminEmail) return;

    try {

        const { data, error } = await supabase.auth.getUser();

        if (error) {
            throw error;
        }

        const user = data?.user;

        if (!user) {
            adminName.textContent = "Administrator";
            adminEmail.textContent = "Not signed in";
            return;
        }

        adminEmail.textContent = user.email || "";

        const displayName =
            user.user_metadata?.full_name ||
            user.user_metadata?.name ||
            "Administrator";

        adminName.textContent = displayName;

    } catch (error) {

        console.error("Failed to load admin user:", error);

        adminName.textContent = "Administrator";
        adminEmail.textContent = "Unable to load";

    }

}
/* ==========================================
   LOAD NAVBAR
========================================== */

async function loadNavbar() {

    const navbar = document.getElementById("navbar");

    if (!navbar) return;

    try {

        const response = await fetch("/admin/components/navbar.html");

        if (!response.ok) {
            throw new Error(
                `Navbar failed to load: ${response.status}`
            );
        }

        navbar.innerHTML = await response.text();

    } catch (error) {

        console.error("Navbar error:", error);

    }

}


/* ==========================================
   ACTIVE SIDEBAR
========================================== */

function setActiveSidebar() {

    const currentPath = window.location.pathname;

    const navLinks = document.querySelectorAll(
        "#sidebar .nav-link"
    );

    navLinks.forEach(link => {

        link.classList.remove("active");

        const linkPath = new URL(
            link.href,
            window.location.origin
        ).pathname;

        if (linkPath === currentPath) {

            link.classList.add("active");

        }

    });

}


/* ==========================================
   PAGE TITLE
========================================== */

function setPageTitle() {

    const pageTitle = document.getElementById("pageTitle");

    if (!pageTitle) return;

    const path = window.location.pathname;

    if (path.includes("/pages/hymns.html")) {
        pageTitle.textContent = "Hymns";
    }

    else if (path.includes("/pages/authors.html")) {
        pageTitle.textContent = "Authors";
    }

    else if (path.includes("/pages/books.html")) {
        pageTitle.textContent = "Books";
    }

    else if (path.includes("/pages/categories.html")) {
        pageTitle.textContent = "Categories";
    }

    else if (path.includes("/pages/media.html")) {
        pageTitle.textContent = "Media";
    }

    else if (path.includes("/pages/settings.html")) {
        pageTitle.textContent = "Settings";
    }

    else if (path.includes("/dashboard.html")) {
        pageTitle.textContent = "Dashboard";
    }

}