/**
 * ==========================================
 * Andhra Kraistava Keerthanalu
 * Custom Cursor
 * ==========================================
 */

document.addEventListener("DOMContentLoaded", () => {

    // Disable on touch devices
    if (
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0
    ) {
        return;
    }

    const cursor = document.createElement("div");
    cursor.className = "custom-cursor";

    document.body.appendChild(cursor);

    /* ==========================================
       CURSOR POSITION
    ========================================== */

    document.addEventListener("mousemove", (event) => {

        cursor.style.left = `${event.clientX}px`;
        cursor.style.top = `${event.clientY}px`;

    });

    /* ==========================================
       HOVER EFFECT
    ========================================== */

    const hoverElements = document.querySelectorAll(
        `
        a,
        button,
        input,
        textarea,
        select,
        .card,
        .btn,
        .nav-link,
        .search-result
        `
    );

    hoverElements.forEach(element => {

        element.addEventListener("mouseenter", () => {

            cursor.classList.add("cursor-hover");

        });

        element.addEventListener("mouseleave", () => {

            cursor.classList.remove("cursor-hover");

        });

    });

    /* ==========================================
       CLICK EFFECT
    ========================================== */

    document.addEventListener("mousedown", () => {

        cursor.classList.add("cursor-click");

    });

    document.addEventListener("mouseup", () => {

        cursor.classList.remove("cursor-click");

    });

    /* ==========================================
       HIDE WHEN LEAVING WINDOW
    ========================================== */

    document.addEventListener("mouseleave", () => {

        cursor.style.opacity = "0";

    });

    document.addEventListener("mouseenter", () => {

        cursor.style.opacity = "1";

    });

});