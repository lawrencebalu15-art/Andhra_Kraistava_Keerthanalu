// ==========================================
// Andhra Kraistava Keerthanalu
// Components Loader
// ==========================================

import {
    initializeNavigation,
    setActiveNavLink
} from "./navigation.js";

import {
    initializeGlobalSearch
} from "./global-search.js";

/* ==========================================
   LOAD SINGLE COMPONENT
========================================== */

async function loadComponent(id, file) {

    const element = document.getElementById(id);

    if (!element) return;

    try {

        const response = await fetch(file);

        if (!response.ok) {
            throw new Error(`Unable to load ${file}`);
        }

        element.innerHTML = await response.text();

    } catch (error) {

        console.error(`Error loading ${file}:`, error);

    }

}

/* ==========================================
   LOAD ALL COMPONENTS
========================================== */

async function loadComponents() {

    await Promise.all([
        loadComponent("pageHeaderContainer", "/components/page-header.html"),

        loadComponent("navbar", "/components/navbar.html"),

        loadComponent(
            "searchModalContainer",
            "/components/global-search.html"
        ),

        loadComponent("footer", "/components/footer.html")

    ]);

}

/* ==========================================
   INITIALIZE APP
========================================== */

document.addEventListener("DOMContentLoaded", async () => {

    await loadComponents();

    initializeNavigation();

    setActiveNavLink();

    initializeGlobalSearch();

});