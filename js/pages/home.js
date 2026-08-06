// home.js
// ==========================================
// Andhra Kraistava Keerthanalu
// Home Page
// ==========================================

import { songsList, authorsList } from "../../data/hymns-data.js";

import { initThree } from "../three/index.js";

/* ==========================================
   INITIALIZE HOME PAGE
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    initThree();

    initializeCounters();

});

/* ==========================================
   COUNTER ANIMATION
========================================== */

function initializeCounters() {

    const counters = document.querySelectorAll(".stat-card h2");

    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            if (!entry.isIntersecting) return;

            const counter = entry.target;

            const target = parseInt(counter.textContent);

            if (isNaN(target)) return;

            let current = 0;

            const increment = Math.ceil(target / 80);

            const timer = setInterval(() => {

                current += increment;

                if (current >= target) {

                    current = target;

                    clearInterval(timer);

                }

                counter.textContent = `${current}+`;

            }, 20);

            observer.unobserve(counter);

        });

    });

    counters.forEach(counter => observer.observe(counter));

}
import { setPageHeader } from "../components/page-header.js";

setPageHeader(
    "ఆంధ్ర క్రైస్తవ కీర్తనలు",
    "Telugu & English Christian Hymns"
);