/**
 * ==========================================
 * Visitor Counter
 * ==========================================
 */

document.addEventListener("DOMContentLoaded", () => {

    const container = document.getElementById("visitorCounter");

    if (!container) return;

    const STORAGE_KEY = "akk-visitor-count";

    let count = Number(localStorage.getItem(STORAGE_KEY));

    if (Number.isNaN(count) || count <= 0) {
        count = 1;
    } else {
        count++;
    }

    localStorage.setItem(STORAGE_KEY, count);

    container.innerHTML = `
        <div class="visitor-counter">
            <span class="visitor-counter-icon">👁</span>
            <span>Visitors</span>
            <span class="visitor-counter-number">${count.toLocaleString()}</span>
        </div>
    `;

});